import { LogGeneralFiltering } from '../../filtering/log/general';
import { EventLog } from '../../../objects/log/EventLog';
import { GeneralLogStatistics } from '../../../statistics/log/general';
import { Trace } from '../../../objects/log/Trace';
import { Event } from '../../../objects/log/Event';
import { Attribute } from '../../../objects/log/Attribute';
import { FrequencyDfgDiscovery } from '../dfg/algorithm';
import { ProcessTree, ProcessTreeOperator } from '../../../objects/process_tree/process_tree';
import { InductiveMinerExclusiveCutDetector } from './InductiveMinerExclusiveCutDetector';
import { InductiveMinerParallelCutDetector } from './InductiveMinerParallelCutDetector';
import { InductiveMinerLoopCutDetector } from './InductiveMinerLoopCutDetector';
import { InductiveMinerActivityOncePerTraceFallthrough } from './InductiveMinerActivityOncePerTraceFallthrough';
import { InductiveMinerStrictTauLoopFallthrough } from './InductiveMinerStrictTauLoopFallthrough';
import { InductiveMinerTauLoopFallthrough } from './InductiveMinerTauLoopFallthrough';
import { InductiveMinerGeneralUtilities } from './InductiveMinerGeneralUtilities';
import { FrequencyDfg } from '../../../objects/dfg/frequency/obj';


export class InductiveMiner {
	static applyPlugin(eventLog, activityKey="concept:name", threshold=0.0, removeNoise=false) {
		return InductiveMiner.apply(eventLog, activityKey, threshold, null, removeNoise);
	}

	static applyPluginDFG(frequencyDfg, activityKey="concept:name", threshold=0.0, removeNoise=false) {
		return InductiveMiner.apply(null, activityKey, threshold, frequencyDfg, removeNoise);
	}

	static apply(eventLog, activityKey="concept:name", threshold=0.0, freqDfg=null, removeNoise=false) {
		let tree = InductiveMiner.inductiveMiner(eventLog, null, activityKey, removeNoise, threshold, freqDfg);
		if (eventLog == null) {
			//Pm4JS.registerObject(tree, "Process Tree (Inductive Miner DFG)");
		}
		else {
			//Pm4JS.registerObject(tree, "Process Tree (Inductive Miner)");
		}
		return tree;
	}

	static keepOneTracePerVariant(log, activityKey) {
		let newEventLog = new EventLog();
		let variants = GeneralLogStatistics.getVariants(log, activityKey);
		for (let vari in variants) {
			let activ = vari.split(",");
			let newTrace = new Trace();
			for (let act of activ) {
				if (act.length > 0) {
					let newEvent = new Event();
					newEvent.attributes[activityKey] = new Attribute(act);
					newTrace.events.push(newEvent);
				}
			}
			newEventLog.traces.push(newTrace);
		}
		return newEventLog;
	}

	static inductiveMiner(log, treeParent, activityKey, removeNoise, threshold, freqDfg=null, skippable=false) {
		if (log != null) {
			if (threshold == 0) {
				log = InductiveMiner.keepOneTracePerVariant(log, activityKey);
			}
			freqDfg = FrequencyDfgDiscovery.apply(log, activityKey);
			if (threshold > 0 && removeNoise) {
				freqDfg = InductiveMiner.removeNoiseFromDfg(freqDfg, threshold);
			}
			let emptyTraces = InductiveMiner.countEmptyTraces(log);
			if (emptyTraces > threshold * log.traces.length) {
				let xor = new ProcessTree(treeParent, ProcessTreeOperator.EXCLUSIVE, null);
				let skip = new ProcessTree(xor, null, null);
				xor.children.push(InductiveMiner.inductiveMiner(InductiveMiner.filterNonEmptyTraces(log), xor, activityKey, false, threshold));
				xor.children.push(skip);
				return xor;
			}
		}
		else if (threshold > 0 && removeNoise) {
			freqDfg = InductiveMiner.removeNoiseFromDfg(freqDfg, threshold);
		}
		if (skippable) {
			let xor = new ProcessTree(treeParent, ProcessTreeOperator.EXCLUSIVE, null);
			let skip = new ProcessTree(xor, null, null);
			xor.children.push(InductiveMiner.inductiveMiner(null, xor, activityKey, false, threshold, freqDfg));
			xor.children.push(skip);
			return xor;
		}
		if (Object.keys(freqDfg.pathsFrequency).length == 0) {
			return InductiveMiner.baseCase(freqDfg, treeParent);
		}
		let detectedCut = InductiveMiner.detectCut(log, freqDfg, treeParent, activityKey, threshold);
		if (detectedCut != null) {
			return detectedCut;
		}
		if (log != null) {
			if (!(removeNoise)) {
				let detectedFallthrough = InductiveMiner.detectFallthroughs(log, freqDfg, treeParent, activityKey, threshold);
				if (detectedFallthrough != null) {
					return detectedFallthrough;
				}
			}
		}
		if (!(removeNoise) && threshold > 0) {
			return InductiveMiner.inductiveMiner(log, treeParent, activityKey, true, threshold, freqDfg, skippable);
		}
		return InductiveMiner.mineFlower(freqDfg, treeParent);
	}

	static removeNoiseFromDfg(freqDfg, threshold) {
		let maxPerActivity = {};
		for (let ea in freqDfg.endActivities) {
			maxPerActivity[ea] = freqDfg.endActivities[ea];
		}
		for (let path in freqDfg.pathsFrequency) {
			let pf = freqDfg.pathsFrequency[path];
			let act1 = path.split(",")[0];
			if (!(act1 in maxPerActivity)) {
				maxPerActivity[act1] = pf;
			}
			else {
				maxPerActivity[act1] = Math.max(pf, maxPerActivity[act1]);
			}
		}
		for (let path in freqDfg.pathsFrequency) {
			let pf = freqDfg.pathsFrequency[path];
			let act1 = path.split(",")[0];
			if (pf < (1 - threshold)*maxPerActivity[act1]) {
				delete freqDfg.pathsFrequency[path];
			}
		}
		return freqDfg;
	}

	static detectCut(log, freqDfg, treeParent, activityKey, threshold) {
		if (freqDfg == null) {
			freqDfg = FrequencyDfgDiscovery.apply(log, activityKey);
		}
		let seqCut = InductiveMinerSequenceCutDetector.detect(freqDfg, activityKey);
		let vect = null;
		let subdfgs = null;
		let skippable = null;
		if (seqCut != null) {
			//console.log("InductiveMinerSequenceCutDetector");
			let seqNode = new ProcessTree(treeParent, ProcessTreeOperator.SEQUENCE, null);
			vect = InductiveMinerSequenceCutDetector.projectDfg(freqDfg, seqCut);
			subdfgs = vect[0];
			skippable = vect[1];
			if (log != null) {
				let logs = InductiveMinerSequenceCutDetector.project(log, seqCut, activityKey);
				for (let sublog of logs) {
					let child = InductiveMiner.inductiveMiner(sublog, seqNode, activityKey, false, threshold);
					seqNode.children.push(child);
				}
			}
			else {
				for (let idx in subdfgs) {
					let child = InductiveMiner.inductiveMiner(null, seqNode, activityKey, false, threshold, subdfgs[idx], skippable[idx]);
					seqNode.children.push(child);
				}
			}
			return seqNode;
		}
		let xorCut = InductiveMinerSequenceCutDetector.detect(freqDfg, activityKey);
		if (xorCut != null) {
			//console.log("InductiveMinerExclusiveCutDetector");
			let xorNode = new ProcessTree(treeParent, ProcessTreeOperator.EXCLUSIVE, null);
			vect = InductiveMinerExclusiveCutDetector.projectDfg(freqDfg, xorCut);
			subdfgs = vect[0];
			skippable = vect[1];
			if (log != null) {
				let logs = InductiveMinerExclusiveCutDetector.project(log, xorCut, activityKey);
				for (let sublog of logs) {
					let child = InductiveMiner.inductiveMiner(sublog, xorNode, activityKey, false, threshold);
					xorNode.children.push(child);
				}
			}
			else {
				for (let idx in subdfgs) {
					let child = InductiveMiner.inductiveMiner(null, xorNode, activityKey, false, threshold, subdfgs[idx], skippable[idx]);
					xorNode.children.push(child);
				}
			}
			return xorNode;
		}
		let andCut = InductiveMinerParallelCutDetector.detect(freqDfg, activityKey);
		if (andCut != null) {
			//console.log("InductiveMinerParallelCutDetector");
			let parNode = new ProcessTree(treeParent, ProcessTreeOperator.PARALLEL, null);
			vect = InductiveMinerParallelCutDetector.projectDfg(freqDfg, andCut);
			subdfgs = vect[0];
			skippable = vect[1];
			if (log != null) {
				let logs = InductiveMinerParallelCutDetector.project(log, andCut, activityKey);
				for (let sublog of logs) {
					let child = InductiveMiner.inductiveMiner(sublog, parNode, activityKey, false, threshold);
					parNode.children.push(child);
				}
			}
			else {
				for (let idx in subdfgs) {
					let child = InductiveMiner.inductiveMiner(null, parNode, activityKey, false, threshold, subdfgs[idx], skippable[idx]);
					parNode.children.push(child);
				}
			}
			return parNode;
		}
		let loopCut = InductiveMinerLoopCutDetector.detect(freqDfg, activityKey);
		if (loopCut != null) {
			//console.log("InductiveMinerLoopCutDetector");
			let loopNode = new ProcessTree(treeParent, ProcessTreeOperator.LOOP, null);
			vect = InductiveMinerLoopCutDetector.projectDfg(freqDfg, loopCut);
			subdfgs = vect[0];
			skippable = vect[1];
			if (log != null) {
				let logs = InductiveMinerLoopCutDetector.project(log, loopCut, activityKey);
				loopNode.children.push(InductiveMiner.inductiveMiner(logs[0], loopNode, activityKey, false, threshold));
				loopNode.children.push(InductiveMiner.inductiveMiner(logs[1], loopNode, activityKey, false, threshold));
			}
			else {
				loopNode.children.push(InductiveMiner.inductiveMiner(null, loopNode, activityKey, false, threshold, subdfgs[0], skippable[0]));
				loopNode.children.push(InductiveMiner.inductiveMiner(null, loopNode, activityKey, false, threshold, subdfgs[1], skippable[1]));
			}
			return loopNode;
		}
		return null;
	}

	static detectFallthroughs(log, freqDfg, treeParent, activityKey, threshold) {
		let activityOncePerTraceCandidate = InductiveMinerActivityOncePerTraceFallthrough.detect(log, freqDfg, activityKey);
		if (activityOncePerTraceCandidate != null) {
			//console.log("InductiveMinerActivityOncePerTraceFallthrough");
			let sublog = InductiveMinerActivityOncePerTraceFallthrough.project(log, activityOncePerTraceCandidate, activityKey);
			let parNode = new ProcessTree(treeParent, ProcessTreeOperator.PARALLEL, null);
			let actNode = new ProcessTree(parNode, null, activityOncePerTraceCandidate);
			parNode.children.push(actNode);
			parNode.children.push(InductiveMiner.inductiveMiner(sublog, parNode, activityKey, false, threshold));
			return parNode;
		}
		let activityConcurrentCut: any[] = InductiveMinerActivityConcurrentFallthrough.detect(log, freqDfg, activityKey, threshold);
		if (activityConcurrentCut != null) {
			//console.log("InductiveMinerActivityConcurrentFallthrough");
			let parNode = new ProcessTree(treeParent, ProcessTreeOperator.PARALLEL, null);
			let filteredLog = LogGeneralFiltering.filterEventsHavingEventAttributeValues(log, [activityConcurrentCut[0]], true, true, activityKey);
			parNode.children.push(InductiveMiner.inductiveMiner(filteredLog, parNode, activityKey, false, threshold));
			activityConcurrentCut[1].parentNode = parNode;
			parNode.children.push(activityConcurrentCut[1]);
			return parNode;
		}
		let strictTauLoop = InductiveMinerStrictTauLoopFallthrough.detect(log, freqDfg, activityKey);
		if (strictTauLoop != null) {
			//console.log("InductiveMinerStrictTauLoopFallthrough");
			let loop = new ProcessTree(treeParent, ProcessTreeOperator.LOOP, null);
			let redo = new ProcessTree(loop, null, null);
			loop.children.push(InductiveMiner.inductiveMiner(strictTauLoop, loop, activityKey, false, threshold));
			loop.children.push(redo);
			return loop;
		}
		let tauLoop = InductiveMinerTauLoopFallthrough.detect(log, freqDfg, activityKey);
		if (tauLoop != null) {
			//console.log("InductiveMinerTauLoopFallthrough");
			let loop = new ProcessTree(treeParent, ProcessTreeOperator.LOOP, null);
			let redo = new ProcessTree(loop, null, null);
			loop.children.push(InductiveMiner.inductiveMiner(tauLoop, loop, activityKey, false, threshold));
			loop.children.push(redo);
			return loop;
		}
		return null;
	}

	static mineFlower(freqDfg, treeParent) {
		let loop = new ProcessTree(treeParent, ProcessTreeOperator.LOOP, null);
		let xor = new ProcessTree(loop, ProcessTreeOperator.EXCLUSIVE, null);
		let redo = new ProcessTree(loop, null, null);
		loop.children.push(xor);
		loop.children.push(redo);
		for (let act in freqDfg.activities) {
			let actNode = new ProcessTree(xor, null, act);
			xor.children.push(actNode);
		}
		return loop;
	}

	static baseCase(freqDfg, treeParent) {
		if (Object.keys(freqDfg.activities).length == 0) {
			return new ProcessTree(treeParent, null, null);
		}
		else if (Object.keys(freqDfg.activities).length == 1) {
			let activities = Object.keys(freqDfg.activities);
			return new ProcessTree(treeParent, null, activities[0]);
		}
		else {
			let xor = new ProcessTree(treeParent, ProcessTreeOperator.EXCLUSIVE, null);
			for (let act in freqDfg.activities) {
				let actNode = new ProcessTree(xor, null, act);
				xor.children.push(actNode);
			}
			return xor;
		}
	}

	static countEmptyTraces(eventLog) {
		let ret = 0;
		for (let trace of eventLog.traces) {
			if (trace.events.length == 0) {
				ret++;
			}
		}
		return ret;
	}

	static filterNonEmptyTraces(eventLog) {
		let filteredLog = new EventLog();
		for (let trace of eventLog.traces) {
			if (trace.events.length > 0) {
				filteredLog.traces.push(trace);
			}
		}
		return filteredLog;
	}
}

class InductiveMinerSequenceCutDetector {
    // Basic Steps:
    // 1. create a group per activity
    // 2. merge pairwise reachable nodes (based on transitive relations)
    // 3. merge pairwise unreachable nodes (based on transitive relations)
    // 4. sort the groups based on their reachability
	static detect(freqDfg, activityKey) {
		let actReach = InductiveMinerGeneralUtilities.activityReachability(freqDfg);
		let groups = [];
		for (let act in actReach) {
			groups.push([act]);
		}
		let groupsSize = null;
		while (groupsSize != groups.length) {
			groupsSize = groups.length;
			groups = InductiveMinerSequenceCutDetector.mergeGroups(groups, actReach);
		}
		groups = InductiveMinerSequenceCutDetector.sortBasedOnReachability(groups, actReach);
		if (groups.length > 1) {
			return groups;
		}
		return null;
	}

	static mergeGroups(groups, actReach) {
		let i = 0;
		while (i < groups.length) {
			let j = i + 1;
			while (j < groups.length) {
				if (InductiveMinerSequenceCutDetector.checkMergeCondition(groups[i], groups[j], actReach)) {
					groups[i] = [...groups[i], ...groups[j]];
					groups.splice(j, 1);
					continue;
				}
				j++;
			}
			i++;
		}
		return groups;
	}

	static checkMergeCondition(g1, g2, actReach) {
		for (let a1 of g1) {
			for (let a2 of g2) {
				if ((a2 in actReach[a1] && a1 in actReach[a2]) || (!(a2 in actReach[a1]) && !(a1 in actReach[a2]))) {
					return true;
				}
			}
		}
		return false;
	}

	static sortBasedOnReachability(groups, actReach) {
		let cont = true;
		while (cont) {
			cont = false;
			let i = 0;
			while (i < groups.length) {
				let j = i + 1;
				while (j < groups.length) {
					for (let act1 of groups[i]) {
						for (let act2 of groups[j]) {
							if (act1 in actReach[act2]) {
								let temp = groups[i];
								groups[i] = groups[j];
								groups[j] = temp;
								cont = true;
								break;
							}
						}
						if (cont) {
							break;
						}
					}
					if (cont) {
						break;
					}
					j++;
				}
				if (cont) {
					break;
				}
				i++;
			}
		}
		return groups;
	}

	static projectDfg(dfg, groups) {
		let startActivities = [];
		let endActivities = [];
		let activities = [];
		let dfgs = [];
		let skippable = [];
		for (let g of groups) {
			skippable.push(false);
		}
		let activitiesIdx = {};
		for (let gind in groups) {
			let g = groups[gind]
			for (let act of g) {
				activitiesIdx[act] = parseInt(gind);
			}
		}
		let i = 0;
		while (i < groups.length) {
			let toSuccArcs = {};
			let fromPrevArcs = {};
			if (i < groups.length - 1) {
				for (let arc0 in dfg.pathsFrequency) {
					let arc = arc0.split(",");
					if (groups[i].includes(arc[0]) && groups[i+1].includes(arc[1])) {
						if (!(arc[0] in toSuccArcs)) {
							toSuccArcs[arc[0]] = 0;
						}
						toSuccArcs[arc[0]] += dfg.pathsFrequency[arc0];
					}
				}
			}
			if (i > 0) {
				for (let arc0 in dfg.pathsFrequency) {
					let arc = arc0.split(",");
					if (groups[i-1].includes(arc[0]) && groups[i].includes(arc[1])) {
						if (!(arc[1] in fromPrevArcs)) {
							fromPrevArcs[arc[1]] = 0;
						}
						fromPrevArcs[arc[1]] += dfg.pathsFrequency[arc0];
					}
				}
			}

			if (i == 0) {
				startActivities.push({});
				for (let act in dfg.startActivities) {
					if (groups[i].includes(act)) {
						startActivities[i][act] = dfg.startActivities[act];
					}
					else {
						let j = i;
						while (j < activitiesIdx[act]) {
							skippable[j] = true;
							j++;
						}
					}
				}
			}
			else {
				startActivities.push(fromPrevArcs);
			}

			if (i == groups.length - 1) {
				endActivities.push({});
				for (let act in dfg.endActivities) {
					if (groups[i].includes(act)) {
						endActivities[i][act] = dfg.endActivities[act];
					}
					else {
						let j = activitiesIdx[act] + 1;
						while (j <= i) {
							skippable[j] = true;
							j++;
						}
					}
				}
			}
			else {
				endActivities.push(toSuccArcs);
			}
			activities.push({});
			for (let act of groups[i]) {
				activities[i][act] = dfg.activities[act];
			}
			dfgs.push({});
			for (let arc0 in dfg.pathsFrequency) {
				let arc = arc0.split(",");
				if (groups[i].includes(arc[0]) && groups[i].includes(arc[1])) {
					dfgs[i][arc0] = dfg.pathsFrequency[arc0];
				}
			}
			i++;
		}
		i = 0;
		while (i < dfgs.length) {
			dfgs[i] = new FrequencyDfg(activities[i], startActivities[i], endActivities[i], dfgs[i]);
			i++;
		}
		for (let arc0 in dfg.pathsFrequency) {
			let arc = arc0.split(",");
			let z = activitiesIdx[arc[1]];
			let j = activitiesIdx[arc[0]] + 1;
			while (j < z) {
				skippable[j] = false;
				j++;
			}
		}
		return [dfgs, skippable];
	}

	static project(log, groups, activityKey) {
		let logs = [];
		for (let g of groups) {
			logs.push(new EventLog());
		}
		for (let trace of log.traces) {
			let i = 0;
			let splitPoint = 0;
			let actUnion = [];
			while (i < groups.length) {
				let newSplitPoint = InductiveMinerSequenceCutDetector.findSplitPoint(trace, groups[i], splitPoint, actUnion, activityKey);
				let tracei = new Trace();
				let j = splitPoint;
				while (j < newSplitPoint) {
					if (groups[i].includes(trace.events[j].attributes[activityKey].value)) {
						tracei.events.push(trace.events[j]);
					}
					j++;
				}
				logs[i].traces.push(tracei);
				splitPoint = newSplitPoint;
				for (let act of groups[i]) {
					actUnion.push(act);
				}
				i++;
			}
		}
		return logs;
	}

	static findSplitPoint(trace, group, start, ignore, activityKey) {
		let leastCost = 0
		let positionWithLeastCost = start;
		let cost = 0;
		let i = start;
		while (i < trace.events.length) {
			if (group.includes(trace.events[i].attributes[activityKey].value)) {
				cost = cost - 1
			}
			else if (!(ignore.includes(trace.events[i].attributes[activityKey].value))) {
				cost = cost + 1
			}
			if (cost < leastCost) {
				leastCost = cost;
				positionWithLeastCost = i + 1;
			}
			i++;
		}
		return positionWithLeastCost;
	}
}

class InductiveMinerActivityConcurrentFallthrough {
	static detect(log, freqDfg, activityKey, threshold) {
		if (Object.keys(freqDfg.activities).length > 1) {
			for (let act in freqDfg.activities) {
				let sublog = LogGeneralFiltering.filterEventsHavingEventAttributeValues(log, [act], true, false, activityKey);
				let detectedCut = InductiveMiner.detectCut(sublog, null, null, activityKey, threshold);
				if (detectedCut != null) {
					return [act, detectedCut];
				}
			}
		}
		return null;
	}

	static project(log, act, activityKey) {
		return LogGeneralFiltering.filterEventsHavingEventAttributeValues(log, [act], true, false, activityKey);
	}
}
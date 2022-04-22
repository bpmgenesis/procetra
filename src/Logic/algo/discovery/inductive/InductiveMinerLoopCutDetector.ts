import { InductiveMinerGeneralUtilities } from './InductiveMinerGeneralUtilities';
import { EventLog } from '../../../objects/log/EventLog';
import { Trace } from '../../../objects/log/Trace';
import { FrequencyDfg } from '../../../objects/dfg/frequency/obj';

export class InductiveMinerLoopCutDetector {
	// 1. merge all start and end activities in one group ('do' group)
    // 2. remove start/end activities from the dfg
    // 3. detect connected components in (undirected representative) of the reduced graph
    // 4. check if each component meets the start/end criteria of the loop cut definition (merge with the 'do' group if not)
    // 5. return the cut if at least two groups remain
	static detect(freqDfg0, activityKey) {
		let freqDfg = Object();
		freqDfg.pathsFrequency = {};
		for (let path in freqDfg0.pathsFrequency) {
			let act1 = path.split(",")[0];
			let act2 = path.split(",")[1];
			if (!(act1 in freqDfg0.startActivities || act2 in freqDfg0.startActivities || act1 in freqDfg0.endActivities || act2 in freqDfg0.endActivities)) {
				freqDfg.pathsFrequency[path] = freqDfg0.pathsFrequency[path];
			}
		}
		let doPart = [];
		let redoPart = [];
		let remainingActivities = {};
		for (let act in freqDfg0.activities) {
			if (act in freqDfg0.startActivities || act in freqDfg0.endActivities) {
				doPart.push(act);
			}
			else {
				remainingActivities[act] = freqDfg0.activities[act];
			}
		}
		freqDfg.activities = remainingActivities;
		let actReach = InductiveMinerGeneralUtilities.activityReachability(freqDfg0);
		let connComp = InductiveMinerGeneralUtilities.getConnectedComponents(freqDfg);
		for (let conn of connComp) {
			let isRedo = true;
			for (let act in freqDfg0.startActivities) {
				for (let act2 of conn) {
					if (!(act2 in actReach[act])) {
						isRedo = false;
						break;
					}
				}
			}
			if (isRedo) {
				for (let act in freqDfg0.endActivities) {
					for (let act2 of conn) {
						if (!(act2 in actReach[act])) {
							isRedo = false;
							break;
						}
					}
				}
			}
			if (isRedo) {
				for (let act of conn) {
					for (let sa in freqDfg0.startActivities) {
						if (!(sa in freqDfg0.endActivities)) {
							if (!(([act, sa] as any) in freqDfg0.pathsFrequency)) {
								isRedo = false;
								break;
							}
						}
					}
				}
			}
			if (isRedo) {
				for (let act of conn) {
					for (let ea in freqDfg0.endActivities) {
						if (!(ea in freqDfg0.startActivities)) {
							if (!(([ea, act] as any) in freqDfg0.pathsFrequency)) {
								isRedo = false;
								break;
							}
						}
					}
				}
			}
			for (let act of conn) {
				if (isRedo) {
					redoPart.push(act);
				}
				else {
					doPart.push(act);
				}
			}
		}
		if (redoPart.length > 0) {
			return [doPart, redoPart];
		}
		return null;
	}

	static project(log, groups, activityKey) {
		let sublogs = [new EventLog(), new EventLog()];
		for (let trace of log.traces) {
			let i = 0;
			let j = 0;
			let subtraceDo = new Trace();
			let subtraceRedo = new Trace();
			while (i < trace.events.length) {
				let thisAct = trace.events[i].attributes[activityKey].value;
				if (groups[0].includes(thisAct)) {
					if (j == 1) {
						sublogs[1].traces.push(subtraceRedo);
						subtraceRedo = new Trace();
					}
					j = 0;

				}
				else if (groups[1].includes(thisAct)) {
					if (j == 0) {
						sublogs[0].traces.push(subtraceDo);
						subtraceDo = new Trace();
					}
					j = 1;
				}
				else {
					i++;
					continue;
				}
				if (j == 0) {
					subtraceDo.events.push(trace.events[i]);
				}
				else {
					subtraceRedo.events.push(trace.events[i]);
				}
				i++;
			}
			if (j == 0) {
				sublogs[0].traces.push(subtraceDo);
			}
		}
		return sublogs;
	}

	static projectDfg(frequencyDfg, groups) {
		let dfgs = [];
		let skippable = [false, false];
		for (let gind in groups) {
			let g = groups[gind];
			let activities = {};
			let startActivities = {};
			let endActivities = {};
			let pathsFrequency = {};
			for (let act in frequencyDfg.activities) {
				if (g.includes(act)) {
					activities[act] = frequencyDfg.activities[act];
				}
			}
			for (let arc0 in frequencyDfg.pathsFrequency) {
				let arc = arc0.split(",");
				if (g.includes(arc[0]) && g.includes(arc[1])) {
					pathsFrequency[arc0] = frequencyDfg.pathsFrequency[arc0];
				}
				if (arc[1] in frequencyDfg.startActivities && arc[0] in frequencyDfg.endActivities) {
					skippable[1] = true;
				}
			}
			if ((gind as any) == 0) {
				for (let act in frequencyDfg.startActivities) {
					if (g.includes(act)) {
						startActivities[act] = frequencyDfg.startActivities[act];
					}
					else {
						skippable[0] = true;
					}
				}
				for (let act in frequencyDfg.endActivities) {
					if (g.includes(act)) {
						endActivities[act] = frequencyDfg.endActivities[act];
					}
					else {
						skippable[0] = true;
					}
				}
			}
			else if ((gind as any) == 1) {
				for (let act of g) {
					startActivities[act] = 1;
					endActivities[act] = 1;
				}
			}
			dfgs.push(new FrequencyDfg(activities, startActivities, endActivities, pathsFrequency));
		}
		return [dfgs, skippable];
	}
}
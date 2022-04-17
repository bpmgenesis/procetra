import { Trace } from '../../../objects/log/Trace';
import { FrequencyDfg } from '../../../objects/dfg/frequency/obj';
import { EventLog } from '../../../objects/log/EventLog';
import { InductiveMinerGeneralUtilities } from './InductiveMinerGeneralUtilities';

export class InductiveMinerExclusiveCutDetector {
	static detect(freqDfg, activityKey) {
		let connComp = InductiveMinerGeneralUtilities.getConnectedComponents(freqDfg);
		if (connComp.length > 1) {
			return connComp;
		}
		return null;
	}

	static projectDfg(frequencyDfg, groups) {
		let dfgs = [];
		let skippable = [];
		for (let gind in groups) {
			let g = groups[gind];
			let startActivities = {};
			let endActivities = {};
			let activities = {};
			let pathsFrequency = {};
			for (let act in frequencyDfg.startActivities) {
				if (g.includes(act)) {
					startActivities[act] = frequencyDfg.startActivities[act];
				}
			}
			for (let act in frequencyDfg.endActivities) {
				if (g.includes(act)) {
					endActivities[act] = frequencyDfg.endActivities[act];
				}
			}
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
			}
			dfgs.push(new FrequencyDfg(activities, startActivities, endActivities, pathsFrequency));
			skippable.push(false);
		}
		return [dfgs, skippable];
	}

	static project(log, groups, activityKey) {
		let ret = [];
		for (let g of groups) {
			ret.push(new EventLog());
		}
		for (let trace of log.traces) {
			let gc = {};
			let i = 0;
			while (i < groups.length) {
				gc[i] = 0;
				i++;
			}
			let activ = [];
			for (let eve of trace.events) {
				activ.push(eve.attributes[activityKey].value);
			}
			let maxv = -1;
			let maxi = 0;
			i = 0;
			while (i < groups.length) {
				for (let act of groups[i]) {
					if (activ.includes(act)) {
						gc[i]++;
						if (gc[i] > maxv) {
							maxv = gc[i];
							maxi = i;
						}
					}
				}
				i++;
			}
			let projectedTrace = new Trace();
			for (let eve of trace.events) {
				let act = eve.attributes[activityKey].value;
				if (groups[maxi].includes(act)) {
					projectedTrace.events.push(eve);
				}
			}
			ret[maxi].traces.push(projectedTrace);
		}
		return ret;
	}
}
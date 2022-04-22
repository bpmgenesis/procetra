import { FrequencyDfg } from '../../../objects/dfg/frequency/obj';
import { LogGeneralFiltering } from '../../filtering/log/general';

export class InductiveMinerParallelCutDetector {
	static detect(freqDfg, activityKey) {
		let ret = [];
		for (let act in freqDfg.activities) {
			ret.push([act]);
		}
		let cont = true;
		while (cont) {
			cont = false;
			let i = 0;
			while (i < ret.length) {
				let j = i + 1;
				while (j < ret.length) {
					for (let act1 of ret[i]) {
						if (ret[j] != null) {
							for (let act2 of ret[j]) {
								if ((!(([act1, act2] as any) in freqDfg.pathsFrequency)) || (!(([act2, act1] as any) in freqDfg.pathsFrequency))) {
									ret[i] = [...ret[i], ...ret[j]];
									ret.splice(j, 1);
									cont = true;
									break;
								}
							}
							if (cont) {
								break;
							}
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
		ret.sort(function(a, b) {
			if (a.length < b.length) {
				return -1;
			}
			else if (a.length > b.length) {
				return 1;
			}
			return 0;
		});
		if (ret.length > 1) {
			let i = 0;
			while (i < ret.length) {
				let containsSa = false;
				let containsEa = false;
				for (let sa in freqDfg.startActivities) {
					if (ret[i].includes(sa)) {
						containsSa = true;
						break;
					}
				}
				for (let ea in freqDfg.endActivities) {
					if (ret[i].includes(ea)) {
						containsEa = true;
						break;
					}
				}
				if (!(containsSa && containsEa)) {
					let targetIdx = i-1;
					if (targetIdx < 0) {
						targetIdx = i+1;
					}
					if (targetIdx < ret.length) {
						ret[targetIdx] = [...ret[targetIdx], ...ret[i]];
					}
					ret.splice(i, 1);
					continue;
				}
				i++;
			}
			if (ret.length > 1) {
				return ret;
			}
		}
		return null;
	}

	static project(log, groups, activityKey) {
		let ret = [];
		for (let g of groups) {
			ret.push(LogGeneralFiltering.filterEventsHavingEventAttributeValues(log, g, true, true, activityKey));
		}
		return ret;
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
}
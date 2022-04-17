import { TString } from '@tuval/core';
import { ActivityStatistics } from '../../utils/test';

export class FrequencyDfgGraphvizVisualizer {
	static uuidv4() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}

	static nodeUuid() {
		let uuid = FrequencyDfgGraphvizVisualizer.uuidv4();
		return "n" + uuid.replace(/-/g, "");
	}

	static apply(frequencyDfg) {
		let ret = [];
		let uidMap = { };
		ret.push("digraph G {");
		for (let act in frequencyDfg.activities) {
			let nUid = FrequencyDfgGraphvizVisualizer.nodeUuid();
			uidMap[act] = nUid;
			ret.push(TString.Format('{0} [shape=box, label="{1}\n{2}", width=\"2\", fontname=\"Ubuntu\", fontsize="10", style=filled,colorscheme=pubu6, color={3}]',
				nUid, act, frequencyDfg.activities[act], ActivityStatistics.GetFrequencyDfgActivityWeight(frequencyDfg, frequencyDfg.activities[act], 6)));
				/* console.log(TString.Format('{0} [shape=box, label="{1}\n{2}", fontname="Tahoma", fontsize="10pt", style=filled,colorscheme=pubu6, color={3}]',
				nUid, act, frequencyDfg.activities[act], ActivityStatistics.GetFrequencyDfgActivityWeight(frequencyDfg, frequencyDfg.activities[act], 6))); */
		}
		let startNodeUid = FrequencyDfgGraphvizVisualizer.nodeUuid();
		let endNodeUid = FrequencyDfgGraphvizVisualizer.nodeUuid();
		ret.push(startNodeUid + " [shape=circle, label=\" \", style=filled, fillcolor=green]");
		ret.push(endNodeUid + " [shape=circle, label=\" \", style=filled, fillcolor=orange]");
		for (let sa in frequencyDfg.startActivities) {
			let occ = frequencyDfg.startActivities[sa];
			let penwidth = 0.5 + Math.log10(occ);
			ret.push(startNodeUid + " -> " + uidMap[sa] + " [label=\"" + occ + "\", penwidth=\"" + penwidth + "\"]");
		}
		for (let ea in frequencyDfg.endActivities) {
			let occ = frequencyDfg.endActivities[ea];
			let penwidth = 0.5 + Math.log10(occ);
			ret.push(uidMap[ea] + " -> " + endNodeUid + " [label=\"" + occ + "\", penwidth=\"" + penwidth + "\"]");
		}
		for (let arc in frequencyDfg.pathsFrequency) {
			let act1 = arc.split(",")[0];
			let act2 = arc.split(",")[1];
			let occ = frequencyDfg.pathsFrequency[arc];
			let penwidth = 0.5 + Math.log10(occ);
			ret.push(uidMap[act1] + " -> " + uidMap[act2] + " [label=\"" + occ + "\", penwidth=\"" + penwidth + "\"]");
		}
		ret.push("}");
		return ret.join("\n");
	}
}

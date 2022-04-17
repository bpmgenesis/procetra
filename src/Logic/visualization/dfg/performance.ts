import { humanizeDuration } from '../../utils/generic/humanize-duration';
import { Convert } from '@tuval/core';

export class PerformanceDfgGraphvizVisualizer {
	static uuidv4() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}

	static nodeUuid() {
		let uuid = PerformanceDfgGraphvizVisualizer.uuidv4();
		return "n" + uuid.replace(/-/g, "");
	}

	static apply(performanceDfg) {
		let ret = [];
		let uidMap = {};
		ret.push("digraph G {");
		for (let act in performanceDfg.activities) {
			let nUid = PerformanceDfgGraphvizVisualizer.nodeUuid();
			uidMap[act] = nUid;
			let st = performanceDfg.sojournTimes[act];
			ret.push(nUid + " [shape=box, style=\"filled\" colorscheme=blues5, color=3 fillcolor=2 fontname=\"Ubuntu\" width=\"2\"  fontsize=\"10\" label=\"" + act + "\n(" + humanizeDuration(st * 1000, { units: ["d", "h", "m"], round: true }) + ")\"]");
		}
		let startNodeUid = PerformanceDfgGraphvizVisualizer.nodeUuid();
		let endNodeUid = PerformanceDfgGraphvizVisualizer.nodeUuid();
		ret.push(startNodeUid + " [shape=circle, label=\" \", style=filled, fillcolor=green]");
		ret.push(endNodeUid + " [shape=circle, label=\" \", style=filled, fillcolor=orange]");
		for (let sa in performanceDfg.startActivities) {
			ret.push(startNodeUid + " -> " + uidMap[sa] + " [color=\"gray\" style=\"dotted\"]");
		}
		for (let ea in performanceDfg.endActivities) {
			ret.push(uidMap[ea] + " -> " + endNodeUid) + " [color=\"gray\" style=\"dotted\"]";
		}
		for (let arc in performanceDfg.pathsPerformance) {
			let act1 = arc.split(",")[0];
			let act2 = arc.split(",")[1];
			let perf = performanceDfg.pathsPerformance[arc];
			let penwidth = Convert.ToInt32(Math.max(1, (0.5 + 0.3 * Math.log10(1 + perf))));
			penwidth = isNaN(penwidth) ? 1 : penwidth;
			console.log(penwidth);
			ret.push(uidMap[act1] + " -> " + uidMap[act2] + " [color=\"dodgerblue2\"  fontname=\"Ubuntu\"  fontsize=\"10\" label=\"   " + humanizeDuration(Math.round(perf * 1000), { units: ["d", "h", "m"], round: true }) + "\", penwidth=\"" + penwidth + "\"]");
		}
		ret.push("}");
		return ret.join("\n");
	}
}
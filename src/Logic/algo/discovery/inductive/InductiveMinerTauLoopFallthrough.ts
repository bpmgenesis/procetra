import { Trace } from '../../../objects/log/Trace';
import { EventLog } from '../../../objects/log/EventLog';

export class InductiveMinerTauLoopFallthrough {
	static detect(log, freqDfg, activityKey) {
		let proj = new EventLog();
		for (let trace of log.traces) {
			let x = 0;
			let i = 1;
			while (i < trace.events.length) {
				let act_curr = trace.events[i].attributes[activityKey].value;
				if (act_curr in freqDfg.startActivities) {
					let subtrace = new Trace();
					let j = x;
					while (j < i) {
						subtrace.events.push(trace.events[j]);
						j++;
					}
					proj.traces.push(subtrace);
					x = i;
				}
				i++;
			}
			let j = x;
			let subtrace = new Trace();
			while (j < trace.events.length) {
				subtrace.events.push(trace.events[j]);
				j++;
			}
			proj.traces.push(subtrace);
		}
		if (proj.traces.length > log.traces.length) {
			return proj;
		}
		return null;
	}
}

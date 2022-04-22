import { PriorityQueue } from '../../../conformance/alignments/heapq';
import { EventLog } from '../../../../objects/log/EventLog';
import { Trace } from '../../../../objects/log/Trace';
import { Attribute } from '../../../../objects/log/Attribute';
import { Event } from '../../../../objects/log/Event';

export class DfgPlayout {
	static apply(freqDfg, numDesideredTraces=1000, activityKey="concept:name") {
		let vect = freqDfg.getArtificialDfg();
		let outgoing = {};
		for (let act in vect[0]) {
			outgoing[act] = {};
		}
		for (let edge0 in vect[1]) {
			let edge = edge0.split(",");
			outgoing[edge[0]][edge[1]] = -Math.log(vect[1][edge0] / (0.0 + vect[0][edge[0]]));
		}
		let comparator = function(a,b) {
			return a[1] < b[1];
		};
		let queue = new PriorityQueue(comparator);
		let start = [["▶"], 0];
		queue.push(start);
		let count = 0;
		let eventLog = new EventLog();
		while (true) {
			if (count >= numDesideredTraces) {
				break;
			}
			let el = queue.pop();
			let activities = el[0];
			let lastActivity = activities[activities.length-1];
			if (lastActivity == "■") {
				let prob = Math.exp(-el[1]);
				let trace = new Trace();
				trace.attributes["@@prob"] = new Attribute(prob);
				trace.attributes["concept:name"] = new Attribute(""+count);
				eventLog.traces.push(trace);
				let i = 1;
				while (i < activities.length - 1) {
					let newEve = new Event();
					trace.events.push(newEve);
					newEve.attributes[activityKey] = new Attribute(activities[i]);
					i++;
				}
				count++;
			}
			for (let act in outgoing[lastActivity]) {
				let newActivities = activities.slice();
				newActivities.push(act);
				queue.push([newActivities, el[1] + outgoing[lastActivity][act]]);
			}
		}
		return eventLog;
	}
}
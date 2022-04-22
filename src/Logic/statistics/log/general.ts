import { is } from '@tuval/core';
import { parseFormat } from '../../../date/parseFormat';

declare var moment;

export class GeneralLogStatistics {
	static getStartActivities(log, activityKey = "concept:name") {
		let ret = {};
		for (let trace of log.traces) {
			if (trace.events.length > 0) {
				if (activityKey in trace.events[0].attributes) {
					let act = trace.events[0].attributes[activityKey].value;
					let count = ret[act]
					if (count == null) {
						ret[act] = 1;
					}
					else {
						ret[act] = count + 1;
					}
				}
			}
		}
		return ret;
	}

	static getEndActivities(log, activityKey = "concept:name") {
		let ret = {};
		for (let trace of log.traces) {
			if (trace.events.length > 0) {
				if (activityKey in trace.events[trace.events.length - 1].attributes) {
					let act = trace.events[trace.events.length - 1].attributes[activityKey].value;
					let count = ret[act]
					if (count == null) {
						ret[act] = 1;
					}
					else {
						ret[act] = count + 1;
					}
				}
			}
		}
		return ret;
	}

	static getAttributeValues(log, attributeKey) {
		let ret = {};
		for (let trace of log.traces) {
			for (let eve of trace.events) {
				if (attributeKey in eve.attributes) {
					let val = eve.attributes[attributeKey].value;
					let count = ret[val];
					if (count == null) {
						ret[val] = 1;
					}
					else {
						ret[val] = count + 1;
					}
				}
			}
		}
		return ret;
	}

	static getTraceAttributeValues(log, attributeKey) {
		let ret = {};
		for (let trace of log.traces) {
			if (attributeKey in trace.attributes) {
				let val = trace.attributes[attributeKey].value;
				let count = ret[val];
				if (count == null) {
					ret[val] = 1;
				}
				else {
					ret[val] = count + 1;
				}
			}
		}
		return ret;
	}

	static getVariants(log, activityKey = "concept:name") {
		let ret = {};
		for (let trace of log.traces) {
			let activities: any = [];
			for (let eve of trace.events) {
				if (activityKey in eve.attributes) {
					let act = eve.attributes[activityKey].value;
					activities.push(act);
				}
			}
			activities = activities.toString();
			let count = ret[activities];
			if (count == null) {
				ret[activities] = {
					count: 1,
					traces: [trace]
				}
			}
			else {
				ret[activities].count = count.count + 1;
				ret[activities].traces.push(trace);
			}

		}
		return ret;
	}

	static getEventAttributesList(log) {
		let ret = {};
		for (let trace of log.traces) {
			for (let eve of trace.events) {
				for (let attr in eve.attributes) {
					ret[attr] = 0;
				}
			}
		}
		return Object.keys(ret);
	}

	static getCaseAttributesList(log) {
		let ret = {};
		for (let trace of log.traces) {
			for (let attr in trace.attributes) {
				ret[attr] = 0;
			}
		}
		return Object.keys(ret);
	}

	static getEventAttributesWithType(log) {
		let ret = {};
		for (let trace of log.traces) {
			for (let eve of trace.events) {
				for (let attr in eve.attributes) {
					if (!(attr in ret)) {
						ret[attr] = typeof eve.attributes[attr].value;
					}
				}
			}
		}
		return ret;
	}

	static getTraceAttributesWithType(log) {
		let ret = {};
		for (let trace of log.traces) {
			for (let attr in trace.attributes) {
				ret[attr] = typeof trace.attributes[attr].value;
			}
		}
		return ret;
	}

	static numEvents(log) {
		let ret = 0;
		for (let trace of log.traces) {
			ret += trace.events.length;
		}
		return ret;
	}

	static calculateMean(array) {
		let sum = 0.0;
		for (let el of array) {
			sum += el;
		}
		return sum / array.length;
	}

	static calculateStdev(array) {
		let mean = GeneralLogStatistics.calculateMean(array);
		let sum = 0.0;
		for (let el of array) {
			sum += (el - mean) * (el - mean);
		}
		return Math.sqrt(sum / array.length);
	}

	static calculateMin(array) {
		let minValue = Number.MAX_SAFE_INTEGER;
		for (let el of array) {
			minValue = Math.min(minValue, el);
		}
		return minValue;
	}

	static calculateMax(array) {
		let maxValue = Number.MIN_SAFE_INTEGER;
		for (let el of array) {
			maxValue = Math.max(maxValue, el);
		}
		return maxValue;
	}

	static calculateMedian(array) {
		array.sort(function(a, b){return a - b});
		return array[Math.floor(array.length / 2)];
	}

	static calculateSum(array) {
		let ret = 0.0;
		for (let el of array) {
			ret += el;
		}
		return ret;
	}
	static getAverageSojournTime(log, activityKey = "concept:name", completeTimestamp = "time:timestamp", startTimestamp = "time:timestamp", aggregationMeasure = "mean") {
		let sojTime = {}
		for (let trace of log.traces) {
			for (let eve of trace.events) {
				if (activityKey in eve.attributes && startTimestamp in eve.attributes && completeTimestamp in eve.attributes) {
					let acti = eve.attributes[activityKey].value;
					if (!(acti in sojTime)) {
						sojTime[acti] = [];
					}

					let st, et;

					if (eve.attributes[startTimestamp] instanceof Date) {
						st = eve.attributes[startTimestamp].getTime();
					} else if (is.string(eve.attributes[startTimestamp].value)) {
						const dateFormat = parseFormat(eve.attributes[startTimestamp].value);
						const date = moment(eve.attributes[startTimestamp].value, dateFormat).toDate();
						st = date.getTime();
					} else {
						st = eve.attributes[startTimestamp].value.getTime();
					}

					if (eve.attributes[completeTimestamp] instanceof Date) {
						et = eve.attributes[completeTimestamp].getTime();
					} else if (is.string(eve.attributes[completeTimestamp].value)) {
						const dateFormat = parseFormat(eve.attributes[completeTimestamp].value);
						const date = moment(eve.attributes[completeTimestamp].value, dateFormat).toDate();
						et = date.getTime();
					} else {
						et = eve.attributes[completeTimestamp].value.getTime();
					}

					let diff = (et - st) / 1000/* 1000 */;
					sojTime[acti].push(diff);
				}
			}
		}
		for (let acti in sojTime) {
			if (aggregationMeasure === "mean") {
				sojTime[acti] = GeneralLogStatistics.calculateMean(sojTime[acti]);
			}
			if (aggregationMeasure === "stdev") {
				sojTime[acti] = GeneralLogStatistics.calculateStdev(sojTime[acti]);
			}
			if (aggregationMeasure === "min") {
				sojTime[acti] = GeneralLogStatistics.calculateMin(sojTime[acti]);
			}
			if (aggregationMeasure === "max") {
				sojTime[acti] = GeneralLogStatistics.calculateMax(sojTime[acti]);
			}
			if (aggregationMeasure === "sum") {
				sojTime[acti] = GeneralLogStatistics.calculateSum(sojTime[acti]);
			}
			if (aggregationMeasure === "median") {
				sojTime[acti] = GeneralLogStatistics.calculateMedian(sojTime[acti]);
			}
			/* let sum = 0.0;
			for (let val of sojTime[acti]) {
				sum += val;
			}
			sojTime[acti] = sum / sojTime[acti].length; */
		}
		return sojTime;
	}
}

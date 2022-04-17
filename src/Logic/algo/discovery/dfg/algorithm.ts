import { GeneralLogStatistics } from '../../../statistics/log/general';
import { FrequencyDfg } from '../../../objects/dfg/frequency/obj';
import { PerformanceDfg } from '../../../objects/dfg/performance/obj';
import { DateTime, CultureInfo } from '@tuval/core';
import { parse } from '../../../../date/parse';
import defaultLocale from '../../../../date/locale/tr';
import { parseFormat } from '../../../../date/parseFormat';
import { is } from '@tuval/core';

declare var moment;

function formatDate(dateString: string, sperator: string) {
	const data: string = dateString.split(' ')[0];
	let dd = data.split(sperator)[0];
	let mm = data.split(sperator)[1];
	const yy = data.split(sperator)[2];
	if (dd.length === 1) {
		dd = '0' + dd;
	}
	if (mm.length === 1) {
		mm = '0' + mm;
	}

	return `${dd}${sperator}${mm}${sperator}${yy} ${dateString.split(' ')[1]}`
}

export class FrequencyDfgDiscovery {
	static applyPlugin(eventLog, activityKey = "concept:name") {
		return FrequencyDfgDiscovery.apply(eventLog, activityKey, true);
	}

	static apply(eventLog, activityKey = "concept:name", addObject = false) {
		let sa = GeneralLogStatistics.getStartActivities(eventLog, activityKey);
		let ea = GeneralLogStatistics.getEndActivities(eventLog, activityKey);
		let activities = GeneralLogStatistics.getAttributeValues(eventLog, activityKey);
		let paths = {};
		for (let trace of eventLog.traces) {
			let i = 0;
			while (i < trace.events.length - 1) {
				if (activityKey in trace.events[i].attributes && activityKey in trace.events[i + 1].attributes) {
					let act1 = trace.events[i].attributes[activityKey].value;
					let act2 = trace.events[i + 1].attributes[activityKey].value;
					let path = act1 + "," + act2;
					let pathOcc = paths[path];
					if (pathOcc == null) {
						paths[path] = 1;
					}
					else {
						paths[path] = paths[path] + 1;
					}
				}
				i++;
			}
		}
		let ret = new FrequencyDfg(activities, sa, ea, paths);
		if (addObject) {
			//Pm4JS.registerObject(ret, "Frequency Directly-Follows Graph");
		}
		return ret;
	}
}

export class PerformanceDfgDiscovery {
	static applyPlugin(eventLog, activityKey = "concept:name", timestampKey = "time:timestamp", aggregationMeasure = "mean", startTimestampKey = "time:timestamp") {
		return PerformanceDfgDiscovery.apply(eventLog, activityKey, timestampKey, aggregationMeasure, startTimestampKey, true);
	}

	public static apply(eventLog, activityKey = "concept:name", timestampKey = "time:timestamp", aggregationMeasure = "mean", startTimestampKey = "time:timestamp", addObject = false) {
		let freqDfg = FrequencyDfgDiscovery.apply(eventLog, activityKey);
		let sa = freqDfg.startActivities;
		let ea = freqDfg.endActivities;
		let activities = freqDfg.activities;
		let pathsFrequency = freqDfg.pathsFrequency;
		let paths = {};
		for (let trace of eventLog.traces) {
			let i = 0;
			while (i < trace.events.length - 1) {
				if (activityKey in trace.events[i].attributes && activityKey in trace.events[i + 1].attributes) {
					let act1 = trace.events[i].attributes[activityKey].value;
					let act2 = trace.events[i + 1].attributes[activityKey].value;
					let path = act1 + "," + act2;

					/* let formatedDate = formatDate(trace.events[i].attributes[timestampKey].value , '.');
					const ts1: any = parse(formatedDate, 'DD.MM.YY HH:mm', { locale: defaultLocale }); */
					//parse(trace.events[i].attributes[timestampKey].value, 'DD.MM.YY HH:mm', { locale: defaultLocale });


					/* formatedDate = formatDate(trace.events[i + 1].attributes[startTimestampKey].value , '.');
					const ts2: any = parse(formatedDate, 'DD.MM.YY HH:mm', { locale: defaultLocale }); */

					/* const provider:CultureInfo = new CultureInfo('tr-TR');
					const date = DateTime.ParseExact(trace.events[i].attributes[timestampKey].value,'dd.MM.yyyy HH:mm',provider); */

					let ts1, ts2;
					if (trace.events[i].attributes[timestampKey] instanceof Date) {
						ts1 = trace.events[i].attributes[timestampKey].getTime();
					} else if (is.string(trace.events[i].attributes[timestampKey].value)) {
						const dateFormat = parseFormat(trace.events[i].attributes[timestampKey].value);
						const date = moment(trace.events[i].attributes[timestampKey].value, dateFormat).toDate();
						ts1 = date.getTime();
					} else {
						try {
							ts1 = trace.events[i].attributes[timestampKey].value.getTime();
						} catch {
						}
					}

					if (trace.events[i + 1].attributes[startTimestampKey] instanceof Date) {
						ts2 = trace.events[i + 1].attributes[startTimestampKey].getTime();
					} else if (is.string(trace.events[i + 1].attributes[startTimestampKey].value)) {
						const dateFormat = parseFormat(trace.events[i + 1].attributes[startTimestampKey].value);
						const date = moment(trace.events[i + 1].attributes[startTimestampKey].value, dateFormat).toDate();
						ts2 = date.getTime();
					} else {
						ts2 = trace.events[i + 1].attributes[startTimestampKey].value.getTime();
					}

					let diff = (ts2 - ts1) / 1000;
					if (!(path in paths)) {
						paths[path] = [];
					}
					paths[path].push(diff);
				}
				i++;
			}
		}
		for (let path in paths) {
			if (aggregationMeasure === "stdev") {
				paths[path] = PerformanceDfgDiscovery.calculateStdev(paths[path]);
			}
			else if (aggregationMeasure === "min") {
				paths[path] = PerformanceDfgDiscovery.calculateMin(paths[path]);
			}
			else if (aggregationMeasure === "max") {
				paths[path] = PerformanceDfgDiscovery.calculateMax(paths[path]);
			}
			else if (aggregationMeasure === "median") {
				paths[path] = PerformanceDfgDiscovery.calculateMedian(paths[path]);
			}
			else if (aggregationMeasure === "sum") {
				paths[path] = PerformanceDfgDiscovery.calculateSum(paths[path]);
			}
			else {
				paths[path] = PerformanceDfgDiscovery.calculateMean(paths[path]);
			}
		}
		let sojournTimes = GeneralLogStatistics.getAverageSojournTime(eventLog, activityKey, timestampKey, startTimestampKey, aggregationMeasure);
		let ret = new PerformanceDfg(activities, sa, ea, pathsFrequency, paths, sojournTimes);
		if (addObject) {
			//Pm4JS.registerObject(ret, "Performance Directly-Follows Graph");
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
		let mean = PerformanceDfgDiscovery.calculateMean(array);
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
		array.sort();
		return array[Math.floor(array.length / 2)];
	}

	static calculateSum(array) {
		let ret = 0.0;
		for (let el of array) {
			ret += el;
		}
		return ret;
	}
}

import { GeneralLogStatistics } from '../../../../statistics/log/general';
export class CsvExporter {

    public static DEFAULT_CASE_ID = "case:concept:name";
    public static DEFAULT_ACTIVITY = "concept:name";
    public static DEFAULT_TIMESTAMP = "time:timestamp";
    public static DEFAULT_CASE_ID_AS_TRACE_ATTRIBUTE = "concept:name";
    public static DEFAULT_CASE_PREFIX = "case:";
    public static DEFAULT_SEPARATOR = ',';
    public static DEFAULT_QUOTECHAR = '"';

    static apply(eventLog, sep = CsvExporter.DEFAULT_SEPARATOR, quotechar = CsvExporter.DEFAULT_QUOTECHAR, casePrefix = CsvExporter.DEFAULT_CASE_PREFIX) {
        let caseAttributes = GeneralLogStatistics.getCaseAttributesList(eventLog);
        let eventAttributes0 = GeneralLogStatistics.getEventAttributesList(eventLog);
        let eventAttributes = [];
        for (let ea of eventAttributes0) {
            if (!(ea.startsWith(casePrefix))) {
                eventAttributes.push(ea);
            }
        }
        let ret: any = [];
        let header = "";
        for (let ca of caseAttributes) {
            header += casePrefix + ca + sep;
        }
        for (let ea of eventAttributes) {
            header += ea + sep;
        }
        header = header.slice(0, -1);
        ret.push(header);
        for (let trace of eventLog.traces) {
            let pref = "";
            for (let ca of caseAttributes) {
                let val = trace.attributes[ca];
                if (val != null) {
                    val = val.value;
                    if (typeof val == "string" && val.includes(sep)) {
                        pref += quotechar + val + quotechar + sep;
                    }
                    else if (typeof val == "object") {
                        pref += val.toISOString() + sep;
                    }
                    else {
                        pref += val + sep;
                    }
                }
                else {
                    pref += sep;
                }
            }
            for (let eve of trace.events) {
                let eveStr = "" + pref;
                for (let ea of eventAttributes) {
                    let val = eve.attributes[ea];
                    if (val != null) {
                        val = val.value;
                        if (typeof val == "string" && val.includes(sep)) {
                            eveStr += quotechar + val + quotechar + sep;
                        }
                        else if (typeof val == "object") {
                            eveStr += val.toISOString() + sep;
                        }
                        else {
                            eveStr += val + sep;
                        }
                    }
                    else {
                        eveStr += sep;
                    }
                }
                eveStr = eveStr.slice(0, -1);
                ret.push(eveStr);
            }
        }
        ret = ret.join('\n');
        return ret;
    }
}

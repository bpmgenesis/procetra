import { Attribute } from "../../Attribute";
import { EventLog } from "../../EventLog";
import { Event } from "../../Event";
import { Trace } from "../../Trace";
import { DateTime, CultureInfo, is, moment } from '@tuval/core';
import { parseFormat } from '../../../../../date/parseFormat';
import { Desktop } from '@tuval/forms';
import { ProjectSettings } from '../../../../../ProjectSettings';


export class CsvImporter {
    public static DEFAULT_CASE_ID = "case:concept:name";
    public static DEFAULT_ACTIVITY = "concept:name";
    public static DEFAULT_TIMESTAMP = "time:timestamp";
    public static DEFAULT_STARTDATE = "time:startdate";
    public static DEFAULT_CASE_ID_AS_TRACE_ATTRIBUTE = "concept:name";
    public static DEFAULT_CASE_PREFIX = "case:";
    public static DEFAULT_SEPARATOR = ',';
    public static DEFAULT_QUOTECHAR = '\'';

    static apply(str, sep = CsvImporter.DEFAULT_SEPARATOR, quotechar = CsvImporter.DEFAULT_QUOTECHAR, caseId = CsvImporter.DEFAULT_CASE_ID,
        activity = CsvImporter.DEFAULT_ACTIVITY,
        timestamp = CsvImporter.DEFAULT_TIMESTAMP, startDate = ''): EventLog {
        let csvArray = CsvImporter.parseCSV(str, sep = sep, quotechar = quotechar);

        /*    if (!is.nullOrEmpty(Desktop.User) && ProjectSettings.AdminEMails.indexOf(Desktop.User) === -1 ) {
               csvArray= csvArray.slice(0,ProjectSettings.CommunityLimit);
               alert('Community Edition has 500 row limit. First 500 rows added.');
           } */

        let traces = {};
        let i = 1;
        let j = 0;
        let log = new EventLog();
        const formats = {};
        while (i < csvArray.length) {
            let eve = new Event();
            j = 0;
            while (j < csvArray[i].length) {
                if (csvArray[0][j] ===  timestamp || csvArray[0][j] === startDate) {
                   const format = parseFormat(csvArray[i][j]);
                   if (formats[format] === undefined) {
                    formats[format] = 1;
                   } else {
                    formats[format]++;
                   }
                }
                j++;
            }
            i++;
        }

        console.log(formats);

        traces = {};
        i = 1;
        j = 0;
        log = new EventLog();
        while (i < csvArray.length) {
            let eve = new Event();
            j = 0;
            while (j < csvArray[i].length) {
                eve.attributes[csvArray[0][j]] = new Attribute(csvArray[i][j]);
                j++;
            }
            eve.attributes[CsvImporter.DEFAULT_ACTIVITY] = eve.attributes[activity];

            try {
                const dateFormat = parseFormat(eve.attributes[timestamp].value);
                const date = moment(eve.attributes[timestamp].value, dateFormat);
                if (eve.attributes[CsvImporter.DEFAULT_TIMESTAMP] == null) {
                    eve.attributes[CsvImporter.DEFAULT_TIMESTAMP] = new Attribute(date.toDate());
                } else {
                    eve.attributes[CsvImporter.DEFAULT_TIMESTAMP].value = date.toDate();
                }

                if (!is.nullOrEmpty(startDate)) {
                    const _dateFormat = parseFormat(eve.attributes[startDate].value);
                    const _date = moment(eve.attributes[startDate].value, _dateFormat);

                    if (eve.attributes[CsvImporter.DEFAULT_STARTDATE] == null) {
                        eve.attributes[CsvImporter.DEFAULT_STARTDATE] = new Attribute(_date.toDate());
                    } else {
                        eve.attributes[CsvImporter.DEFAULT_STARTDATE].value = _date.toDate();
                    }
                }

            }
            catch {
                console.log('Date Error');
                console.log(eve.attributes);
                console.log(timestamp)
            }
            /*  if (dateFormat != null) {
                 const date = DateTime.ParseExact(eve.attributes[timestamp].value, dateFormat, CultureInfo.InvariantCulture);
                 eve.attributes[CsvImporter.DEFAULT_TIMESTAMP] = new Attribute(new Date(date.Year, date.Month - 1, date.Day, date.Hour, date.Minute, date.Second));
             } else {
                 eve.attributes[CsvImporter.DEFAULT_TIMESTAMP] = new Attribute(new Date(eve.attributes[timestamp].value));
             } */
            let thisCaseId = eve.attributes[caseId].value;
            let trace = null;
            if (thisCaseId in traces) {
                trace = traces[thisCaseId];
            }
            else {
                trace = new Trace();
                trace.attributes[CsvImporter.DEFAULT_CASE_ID_AS_TRACE_ATTRIBUTE] = new Attribute(thisCaseId);
                traces[thisCaseId] = trace;
                log.traces.push(trace);
            }
            trace.events.push(eve);
            i++;
        }
        // Pm4JS.registerObject(log, "Log imported from a CSV file");
        return log;
    }

    public static parseCSV(str, sep = CsvImporter.DEFAULT_SEPARATOR, quotechar = CsvImporter.DEFAULT_QUOTECHAR) {
        var arr = [];
        var quote = false;  // 'true' means we're inside a quoted field

        // Iterate over each character, keep track of current row and column (of the returned array)
        for (var row = 0, col = 0, c = 0; c < str.length; c++) {
            var cc = str[c], nc = str[c + 1];        // Current character, next character
            arr[row] = arr[row] || [];             // Create a new row if necessary
            arr[row][col] = arr[row][col] || '';   // Create a new column (start with empty string) if necessary

            // If the current character is a quotation mark, and we're inside a
            // quoted field, and the next character is also a quotation mark,
            // add a quotation mark to the current column and skip the next character
            if (cc == quotechar && quote && nc == quotechar) { arr[row][col] += cc; ++c; continue; }

            // If it's just one quotation mark, begin/end quoted field
            if (cc == quotechar) { quote = !quote; continue; }

            // If it's a comma and we're not in a quoted field, move on to the next column
            if (cc == sep && !quote) { ++col; continue; }

            // If it's a newline (CRLF) and we're not in a quoted field, skip the next character
            // and move on to the next row and move to column 0 of that new row
            if (cc == '\r' && nc == '\n' && !quote) { ++row; col = 0; ++c; continue; }

            // If it's a newline (LF or CR) and we're not in a quoted field,
            // move on to the next row and move to column 0 of that new row
            if (cc == '\n' && !quote) { ++row; col = 0; continue; }
            if (cc == '\r' && !quote) { ++row; col = 0; continue; }

            // Otherwise, append the current character to the current column
            arr[row][col] += cc;
        }
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                if (typeof arr[i][j] === 'string') {
                    arr[i][j] = arr[i][j].trim();
                }
            }
        }
        return arr;
    }
}


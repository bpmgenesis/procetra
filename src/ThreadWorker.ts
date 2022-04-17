import { EventLog } from './Logic/objects/log/EventLog';
import { Trace } from './Logic/objects/log/Trace';
import {
    ThreadWorkerObject, ThreadWorker, Message, is, Thread, int, clone, TStorage,
    TuvalStorage, List, Encoding, TCompress, Exception, Guid, moment, TMath, Convert, foreach
} from '@tuval/core';
import { CsvImporter } from './Logic/objects/log/importer/csv/importer';
import { CvsToJson } from './Logic/utils/csv2json';
import { Project } from './Bussiness/Project';
import { DataSet } from './Bussiness/DataSet';
import { XesImporter } from './Logic/objects/log/importer/xes/importer';
import { IProject } from './Bussiness/IProject';
import { IActivityInfoBag, IDataSet } from './Bussiness/IDataSet';
import { IProjectService, ThreadResult } from './Services/IProjectService';
import { GeneralLogStatistics } from './Logic/statistics/log/general';
import { DataSetUtils } from './Bussiness/DatasetUtils';
import { humanizeDuration } from './Logic/utils/generic/humanize-duration';
import { Attribute } from './Logic/objects/log/Attribute';
import { CostTypes, IActivityInfo } from './Bussiness/IActivityInfo';

const IPC_BASE = 100;
const IPC_GETPROJECTBYID = IPC_BASE + 1;
const IPC_GETDATASETBYID = IPC_BASE + 2;
const IPC_GETDATASETS = IPC_BASE + 3;
const IPC_LOADPROJECT = IPC_BASE + 4;
const IPC_SAVEPROJECT = IPC_BASE + 5;
const IPC_CONVERTCSVTOJSON = IPC_BASE + 6;
const IPC_CREATEDATASETFROMCSV = IPC_BASE + 7;
const IPC_DATASETFROMCSV = IPC_BASE + 8;
const IPC_DATASETFROMXES = IPC_BASE + 9;
const IPC_CLONEDATASET = IPC_BASE + 10;
const IPC_CREATEPROJECT = IPC_BASE + 11;
const IPC_CLOSEPROJECT = IPC_BASE + 12;
const IPC_ADDDATASET = IPC_BASE + 13;
const IPC_GETPROJECTLISTFROMSTORAGE = IPC_BASE + 14;
const IPC_GETDATASETVARIANTS = IPC_BASE + 15;
const IPC_GETDATASETASDATA = IPC_BASE + 16;
const IPC_GETDATASETEVENTSCOUNT = IPC_BASE + 17;
const IPC_CASESSTARTEDPERDAY = IPC_BASE + 18;
const IPC_ACTIVITIESSTARTEDPERDAY = IPC_BASE + 19;
const IPC_ACTIVITIESPERCASE = IPC_BASE + 20;
const IPC_VARIANTSINFO = IPC_BASE + 21;
const IPC_EVENTSOVERTIME = IPC_BASE + 22;
const IPC_GETSTARTEVENTS = IPC_BASE + 23;
const IPC_GETENDEVENTS = IPC_BASE + 24;
const IPC_GETTRACECOUNT = IPC_BASE + 25;
const IPC_GETEVENTCOUNT = IPC_BASE + 26;
const IPC_GETACTIVITIES = IPC_BASE + 27;
const IPC_GETMEDIANCASEDURATION = IPC_BASE + 28;
const IPC_GETMEANCASEDURATION = IPC_BASE + 29;
const IPC_GETDATASETNAME = IPC_BASE + 30;
const IPC_SETACTIVITYINFO = IPC_BASE + 31;
const IPC_GETACTIVITYINFO = IPC_BASE + 32;
const IPC_GETAVERAGECOSTOFDATASET = IPC_BASE + 33;
const IPC_GETTOTALCOSTOFDATASET = IPC_BASE + 34;
const IPC_SETDATASETFILTEREDDATA = IPC_BASE + 35;
const IPC_SETDATASETCONDITION = IPC_BASE + 36;

const DateDiff = {

    inMiliseconds: function (d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return t2 - t1;
    },

    inDays: function (d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2 - t1) / (24 * 3600 * 1000) as any);
    },

    inWeeks: function (d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7) as any);
    },

    inMonths: function (d1, d2) {
        var d1Y = d1.getFullYear();
        var d2Y = d2.getFullYear();
        var d1M = d1.getMonth();
        var d2M = d2.getMonth();

        return (d2M + 12 * d2Y) - (d1M + 12 * d1Y);
    },

    inYears: function (d1, d2) {
        return d2.getFullYear() - d1.getFullYear();
    }
}

interface IVariant {
    count: int;
    traces: Trace[];
    eventCount: int;
}
const separators = [",", ";", "\t"];
function detectSeparator(csv) {
    var counts = {},
        sepMax;
    separators.forEach(function (sep, i) {
        var re = new RegExp(sep, 'g');
        counts[sep] = (csv.match(re) || []).length;
        sepMax = !sepMax || counts[sep] > counts[sepMax] ? sep : sepMax;
    });
    return sepMax;
}

export function _ThreadWorkerObject<T extends { new(...args: any[]): {} }>(constructor: T) {
    /* const hobbit = new Hobbit()

    const { width, height, weight, armour, type} = hobbit

    return class extends constructor {
        width = width
        height = height
        weight = weight
        armour = armour
        type = type
    } */
    if (is.workerContext()) {
        const globalObject = self;/* Context.Current.get('global') */;
        if (globalObject) {
            globalObject["ThreadWorker"] = constructor;
        }
    } else {
        constructor.prototype.constructor = clone(Thread);
        constructor.prototype.constructor.prototype.promiseMap = {};
        constructor.prototype.constructor.prototype.ThreadProc = function (msg: int, wParam: any, lParam: any) {
            // super.ThreadProc(msg, wParam, lParam);
            //console.log('************** Mesaj geldi. ' + IPC[msg]);
            if (this.promiseMap[msg]) {
                const p = this.promiseMap[msg];
                delete this.promiseMap[msg];
                p(wParam);
            }
        }

        const props = constructor['__THREAD__'];
        for (let key in props) {
            constructor.prototype.constructor.prototype[key] = props[key];
        }
        constructor.prototype.constructor.prototype.SendMessageAsync = function (msg: any, ...params: any[]): Promise<any> {
            return new Promise((resolve, reject) => {
                this.SendMessage(msg, ...params);
                this.promiseMap[msg] = resolve;
            });
        }
    }
}

@_ThreadWorkerObject
export class PMThreadWorker extends ThreadWorker implements IProjectService {
    private ProjectStorage: TuvalStorage = new TuvalStorage({ name: 'BPMG_P2M', storeName: 'ProjectStorage' });
    private Projects: List<Project> = new List();
    constructor() {
        super();
    }

    @Message(IPC_GETPROJECTBYID)
    public GetProjectById(id: string): ThreadResult<IProject> {
        const project = this.Projects.Find(e => e.Id === id);
        if (project) {
            return project;
        }
        return null;
    }

    @Message(IPC_GETDATASETBYID)
    public GetDatasetById(projectId: string, id: string): ThreadResult<IDataSet> {
        const project = this.Projects.Find(e => e.Id === projectId);
        if (project) {
            const dataset = project.DataSets.find(e => e.Id === id);
            if (dataset) {
                return dataset;
            }
        }
        return null;
    }

    @Message(IPC_GETDATASETS)
    public GetDatasets(projectId: string): ThreadResult<IDataSet[]> {
        const project = this.GetProjectById(projectId);
        if (project != null) {
            return project.DataSets;
        }
        return null;
    }

    @Message(IPC_LOADPROJECT)
    public LoadProject(name: string): ThreadResult<IProject> {
        return new Promise((resolve, reject) => {
            this.ProjectStorage.GetUint8Array(name).then(bytes => {
                const deCompressedBytes = TCompress.DeCompressBytes(bytes);
                const fileData = Encoding.UTF8.GetString(deCompressedBytes);

                const projectObject: any = JSON.parse(fileData);
                console.log(projectObject);
                const project: IProject = new Project(projectObject.projectName);
                project.Id = projectObject.projectId;
                for (let i = 0; i < projectObject.datasets.length; i++) {
                    const dataset = this.DeserializeDataset(project.Id, projectObject.datasets[i]);
                    if (dataset) {
                        project.DataSets.push(dataset);
                    }
                }
                this.Projects.Add(project as any);
                resolve(project);

            });
        });
    }

    @Message(IPC_SAVEPROJECT)
    public SaveProject(projectId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const project = this.GetProjectById(projectId);
            if (project != null) {
                const datasets: IDataSet[] = this.GetDatasets(projectId);
                let datasetArray = [];
                if (datasets != null) {
                    datasetArray = datasets.map((dataset: IDataSet) => this.SerializeDataset(projectId, dataset.Id));
                }

                const fileData = JSON.stringify({
                    projectId: project.Id,
                    projectName: project.Name,
                    lastModified: new Date().toString(),
                    datasets: datasetArray
                });
                const fileBytes = Encoding.UTF8.GetBytes(fileData);
                const compressedBytes = TCompress.CompressBytes(fileBytes);
                return this.ProjectStorage.SaveUint8Array(project.Name, compressedBytes).then(data => {
                    resolve(true);
                });
            }
        });

    }
    /*  public WorkerProc(msg: number, wParam: number, lParam: number) {
         super.WorkerProc(msg, wParam, lParam);

     } */

    @Message(IPC_CONVERTCSVTOJSON)
    public ConvertCsvToJson(csv: string): any {
        TStorage.SaveString('Saved In Worker', csv);
        const data = CvsToJson.Convert(csv, { parseNumbers: true });
        return data;
    }
    @Message(IPC_CREATEDATASETFROMCSV)
    public CreateDatasetFromCsv(wParam: any): any {
        const { csv, sep, caseId, activity, timestamp, startDate } = wParam as any;
        const eventLogs = CsvImporter.apply(csv, sep, "'", caseId, activity, timestamp, startDate);
        //this.SendMessage(55, eventLogs as any, 0);
        return eventLogs;
    }

    @Message(IPC_DATASETFROMCSV)
    public DataSetFromCvs(projectId: string,datasetId: string, datasetName: string, csv: string,
        case_column: string,
        activity_column: string,
        time_stamp: string,
        start_date: string,
        date_format: string): ThreadResult<IDataSet> {

        const project = this.GetProjectById(projectId);
        if (project == null) {
            throw new Exception('Project Not Found');
        }
        //const data = CvsToJson.Convert(csv, { parseNumbers: true });
        const dataset = new DataSet(projectId);
        dataset.Id = datasetId; // Guid.NewGuid().ToString();
        dataset.Name = datasetName;
        dataset.Separator = detectSeparator(csv);
        /*   dataset.CaseColumn = case_column;
          dataset.ActivityColumn = activity_column;
          dataset.TimeStampColumn = time_stamp;
          dataset.StartDateColumn = start_date;
          dataset.DateFormat = date_format; */

        const eventLog = this.CreateDatasetFromCsv({
            csv: csv,
            sep: dataset.Separator,
            caseId: case_column,
            activity: activity_column,
            timestamp: time_stamp,
            startDate: start_date
        });
        dataset.EventLog = eventLog;
        project.DataSets.push(dataset);
        return dataset;
    }

    @Message(IPC_DATASETFROMXES)
    public DataSetFromXes(projectId: string, datasetName: string, xes: string): ThreadResult<IDataSet> {
        const project = this.GetProjectById(projectId);
        if (project == null) {
            throw new Exception('Project Not Found');
        }
        //const data = CvsToJson.Convert(csv, { parseNumbers: true });
        const dataset = new DataSet(projectId);
        dataset.Id = Guid.NewGuid().ToString();
        dataset.Name = datasetName;
        //dataset.CsvString = csv;
        //dataset.Separator = detectSeparator(csv);
        //dataset.CaseColumn = case_column;
        //dataset.ActivityColumn = 'concept:name';
        dataset.TimeStampColumn = 'time:timestamp';
        dataset.StartDateColumn = 'time:timestamp';
        // dataset.DateFormat = date_format;

        const eventLog = XesImporter.apply(xes);
        dataset.EventLog = eventLog;


        /*  if (!is.nullOrEmpty(Desktop.User) && ProjectSettings.AdminEMails.indexOf(Desktop.User) === -1) {
             dataset.EventLog.traces = dataset.EventLog.traces.slice(0, ProjectSettings.CommunityLimit);
             alert('Community Edition has 500 row limit. First 500 rows added.');
         } */

        project.DataSets.push(dataset);
        return dataset;
    }

    @Message(IPC_CLONEDATASET)
    public CloneDataSet(projectId: string, datasetId: string): ThreadResult<IDataSet> {
        const project = this.GetProjectById(projectId);
        const dataset = this.GetDatasetById(projectId, datasetId);
        if (project == null || dataset == null) {
            throw new Exception('Project Not Found');
        }

        const clonedDataset = DataSetUtils.Clone(dataset);
        project.DataSets.push(clonedDataset);
        return clonedDataset;
    }

    @Message(IPC_CREATEPROJECT)
    public CreateProject(name: string): ThreadResult<IProject> {
        const project = new Project(name);
        this.Projects.Add(project);
        return project;
    }

    @Message(IPC_CLOSEPROJECT)
    public CloseProject(id: string): ThreadResult<void> {
        const project = this.GetProjectById(id);
        this.Projects.Remove(project);
    }

    @Message(IPC_ADDDATASET)
    public AddDataSet(dataset: IDataSet): ThreadResult<void> {
        throw new Error('Method not implemented.');
    }

    @Message(IPC_GETPROJECTLISTFROMSTORAGE)
    public GetProjectListFromStorage(): ThreadResult<string[]> {
        return this.ProjectStorage.Keys();
    }

    @Message(IPC_GETDATASETVARIANTS)
    public GetDatasetVariants(wParam: any): any {
        const { i } = wParam as any;

    }

    @Message(IPC_GETDATASETASDATA)
    public GetDatasetAsData(projectId: string, datasetId: string): ThreadResult<any> {
        const dataset: IDataSet = this.GetDatasetById(projectId, datasetId);
        if (dataset == null) {
            return null;
        }

        if (dataset.FilteredData) {
            return dataset.FilteredData;
        }

        const eventLog = dataset.EventLog;
        const data = [];

        for (let i = 0; i < eventLog.traces.length; i++) {
            for (let j = 0; j < eventLog.traces[i].events.length; j++) {
                const row = {};
                for (let key in eventLog.traces[i].events[j].attributes) {
                    if (eventLog.traces[i].events[j].attributes[key] instanceof Date) {
                        row[key] = eventLog.traces[i].events[j].attributes[key];
                    } else {
                        row[key] = eventLog.traces[i].events[j].attributes[key].value;
                    }
                }
                data.push(row);
            }
        }
        return data;
    }

    @Message(IPC_GETDATASETEVENTSCOUNT)
    public GetDatasetEventCount(projectId: string, datasetId: string): ThreadResult<int> {
        return 100;
    }

    @Message(IPC_CASESSTARTEDPERDAY)
    public CasesStartedPerDay(projectId: string, datasetId: string): ThreadResult<int> {
        const dataset: IDataSet = this.GetDatasetById(projectId, datasetId);
        if (dataset) {
            const eventLogs = dataset.EventLog;
            const startDate = dataset.EventLog.traces[0].events[0].attributes[dataset.TimeStampColumn].value;
            const endDate = dataset.EventLog.traces[dataset.EventLog.traces.length - 1].events[dataset.EventLog.traces[dataset.EventLog.traces.length - 1].events.length - 1].attributes[dataset.TimeStampColumn].value;
            var date1 = moment(startDate);
            var date2 = moment(endDate);
            const days = date2.diff(date1, 'days');
            return TMath.round(dataset.EventLog.traces.length / days, 2);
        }
        return 0;
    }

    @Message(IPC_ACTIVITIESSTARTEDPERDAY)
    public ActivitiesStartedPerDay(projectId: string, datasetId: string): ThreadResult<int> {
        const dataset: IDataSet = this.GetDatasetById(projectId, datasetId);
        if (dataset) {
            const eventLogs = dataset.EventLog;
            const startDate = dataset.EventLog.traces[0].events[0].attributes[dataset.TimeStampColumn].value;
            const endDate = dataset.EventLog.traces[dataset.EventLog.traces.length - 1].events[dataset.EventLog.traces[dataset.EventLog.traces.length - 1].events.length - 1].attributes[dataset.TimeStampColumn].value;
            var date1 = moment(startDate);
            var date2 = moment(endDate);
            const days = date2.diff(date1, 'days');
            const eventsCount = this.getEventsCount(eventLogs);
            if (eventsCount > 0) {
                return TMath.round(eventsCount / days, 2);
            }
            return 0;

        }
        return 0;
    }

    @Message(IPC_ACTIVITIESPERCASE)
    public ActivitiesPerCase(projectId: string, datasetId: string): ThreadResult<int> {
        const dataset: IDataSet = this.GetDatasetById(projectId, datasetId);
        if (dataset) {
            const eventLogs = dataset.EventLog;
            const eventsCount = this.getEventsCount(eventLogs);
            if (eventsCount > 0) {
                return TMath.round(eventsCount / eventLogs.traces.length, 2);
            }
            return 0;

        }
        return 0;
    }

    @Message(IPC_VARIANTSINFO)
    public GetVariantsInfo(projectId: string, datasetId: string): ThreadResult<any> {
        const dataset: IDataSet = this.GetDatasetById(projectId, datasetId);

        const getVariantEventCount = (variant: IVariant) => {
            if (variant.count > 0 && variant.traces.length > 0 && variant.traces[0].events.length > 0) {
                return variant.traces[0].events.length;
            }
        }

        const getVariantTotalEventCount = (variant: IVariant) => {
            if (variant.count > 0 && variant.traces.length > 0 && variant.traces[0].events.length > 0) {
                return variant.count * variant.traces.length * variant.traces[0].events.length;
            }
        }


        const getVariantAvgTime = (variant: IVariant) => {
            let sum = 0;
            for (let i = 0; i < variant.traces.length; i++) {
                sum += getTraceTotalTime(variant.traces[i]);
            }
            return sum / variant.count;
        }

        const getVariantTotalTime = (variant: IVariant) => {
            let sum = 0;
            for (let i = 0; i < variant.traces.length; i++) {
                sum += getTraceTotalTime(variant.traces[i]);
            }
            return sum;
        }

        const getTraceTotalTime = (trace: Trace) => {
            let startTime = trace.events[0].attributes[dataset.StartDateColumn].value;
            let endTime = trace.events[trace.events.length - 1].attributes[dataset.TimeStampColumn].value;
            for (let i = 0; i < trace.events.length; i++) {
                if (trace.events[i].attributes[dataset.StartDateColumn].value < startTime) {
                    startTime = trace.events[i].attributes[dataset.StartDateColumn].value;
                }
                if (trace.events[i].attributes[dataset.TimeStampColumn].value > startTime) {
                    endTime = trace.events[i].attributes[dataset.TimeStampColumn].value;
                }
            }
            return DateDiff.inMiliseconds(startTime, endTime);
        }

        if (dataset) {
            const variantsArray = [];
            const variants = GeneralLogStatistics.getVariants(dataset.EventLog, dataset.ActivityColumn);
            for (let key in variants) {
                const variantInfo = {
                    activities: key.split(','),
                    traces: variants[key].traces,
                    traceCount: variants[key].traces.length,
                    eventCountPerTrace: getVariantEventCount(variants[key]),
                    totalEventCount: getVariantTotalEventCount(variants[key]),
                    totalTime: getVariantTotalTime(variants[key]),
                    avgTime: getVariantAvgTime(variants[key])
                };
                /*  variants[key].eventCount = getVariantEventCount(variants[key]);
                 variants[key].totalTime = getVariantTotalTime(variants[key]);
                 variants[key].avgTime = getVariantAvgTime(variants[key]); */
                variantsArray.push(variantInfo);
            }

            variantsArray.sort((a, b) => {
                return b.traceCount - a.traceCount;
            });

            return {
                variants: variantsArray,
                datasetEventCount: variantsArray.reduce((partial_sum, a) => partial_sum + a.totalEventCount, 0),
                totalTime: variantsArray.reduce((partial_sum, a) => partial_sum + a.totalTime, 0)
            };
        }
        return null;
    }

    @Message(IPC_EVENTSOVERTIME)
    public GetEventsOverTime(projectId: string, datasetId: string): ThreadResult<any> {
        const dataset: IDataSet = this.GetDatasetById(projectId, datasetId);
        if (dataset) {
            const datearray = [];
            const startDate = dataset.EventLog.traces[0].events[0].attributes[dataset.StartDateColumn].value;
            const endDate = dataset.EventLog.traces[dataset.EventLog.traces.length - 1].events[dataset.EventLog.traces[dataset.EventLog.traces.length - 1].events.length - 1].attributes[dataset.TimeStampColumn].value;
            const diff = endDate - startDate;
            const step = Convert.ToInt32(diff / (24 * 60 * 60 * 1000));
            for (let i = 1; i < step + 1; i++) {
                datearray.push({
                    start: moment(startDate).add(((24 * 60 * 60 * 1000)) * (i - 1)).toDate(),
                    end: moment(startDate).add(((24 * 60 * 60 * 1000)) * i).toDate(),
                    count: 0
                });
            }
            for (let i = 0; i < dataset.EventLog.traces.length; i++) {
                for (let j = 0; j < dataset.EventLog.traces[i].events.length; j++) {
                    for (let k = 0; k < datearray.length; k++) {
                        const eventStartDate = dataset.EventLog.traces[i].events[j].attributes[dataset.StartDateColumn].value;
                        if (eventStartDate >= datearray[k].start && eventStartDate <= datearray[k].end) {
                            datearray[k].count++;
                        }
                    }
                }
            }
            return datearray;
        }
        return null;
    }

    @Message(IPC_GETSTARTEVENTS)
    public GetStartEvents(projectId: string, datasetId: string): ThreadResult<any> {
        const dataset: IDataSet = this.GetDatasetById(projectId, datasetId);
        if (dataset) {
            const result = GeneralLogStatistics.getStartActivities(dataset.EventLog, dataset.ActivityColumn);
            return result;
        }
        return null;
    }
    @Message(IPC_GETENDEVENTS)
    public GetEndEvents(projectId: string, datasetId: string): ThreadResult<any> {
        const dataset: IDataSet = this.GetDatasetById(projectId, datasetId);
        if (dataset) {
            const result = GeneralLogStatistics.getEndActivities(dataset.EventLog, dataset.ActivityColumn);
            return result;
        }
        return null;
    }

    @Message(IPC_GETTRACECOUNT)
    public GetTraceCount(projectId: string, datasetId: string): ThreadResult<any> {
        const dataset: IDataSet = this.GetDatasetById(projectId, datasetId);
        if (dataset) {
            return dataset.EventLog.traces.length;
        }
        return null;
    }
    @Message(IPC_GETEVENTCOUNT)
    public GetEventCount(projectId: string, datasetId: string): ThreadResult<any> {
        const dataset: IDataSet = this.GetDatasetById(projectId, datasetId);
        if (dataset) {
            return GeneralLogStatistics.numEvents(dataset.EventLog);
        }
        return null;
    }

    @Message(IPC_GETMEANCASEDURATION)
    public GetMeanCaseDuration(projectId: string, datasetId: string): ThreadResult<any> {
        const dataset: IDataSet = this.GetDatasetById(projectId, datasetId);
        if (dataset) {
            const array = [];
            for (let i = 0; i < dataset.EventLog.traces.length; i++) {
                const caseStartDate = dataset.EventLog.traces[i].events[0].attributes[dataset.StartDateColumn].value;
                const caseEndDate = dataset.EventLog.traces[i].events[dataset.EventLog.traces[i].events.length - 1].attributes[dataset.TimeStampColumn].value;
                array.push(caseEndDate - caseStartDate);
            }
            const median = GeneralLogStatistics.calculateMean(array);
            const hum = humanizeDuration(median, { units: ["d", "h", "m"], round: true });
            console.log(hum);
            return hum;
        }
        return null;
    }

    @Message(IPC_GETMEDIANCASEDURATION)
    public GetMedianCaseDuration(projectId: string, datasetId: string): ThreadResult<any> {
        const dataset: IDataSet = this.GetDatasetById(projectId, datasetId);
        if (dataset) {
            const array = [];
            for (let i = 0; i < dataset.EventLog.traces.length; i++) {
                const caseStartDate = dataset.EventLog.traces[i].events[0].attributes[dataset.StartDateColumn].value;
                const caseEndDate = dataset.EventLog.traces[i].events[dataset.EventLog.traces[i].events.length - 1].attributes[dataset.TimeStampColumn].value;
                array.push(caseEndDate - caseStartDate);
            }
            const median = GeneralLogStatistics.calculateMedian(array);
            const hum = humanizeDuration(median, { units: ["d", "h", "m"], round: true });
            console.log(hum);
            return hum;
        }
        return null;
    }

    @Message(IPC_GETAVERAGECOSTOFDATASET)
    public GetAverageCostOfDataset(projectId: string, datasetId: string): ThreadResult<any> {
        const dataset: IDataSet = this.GetDatasetById(projectId, datasetId);
        let sum: int = 0;
        if (dataset) {
            for (let i = 0; i < dataset.EventLog.traces.length; i++) {
                const events = dataset.EventLog.traces[i].events;
                for (let j = 0; j < events.length; j++) {
                    const event = events[j];
                    if (event.attributes[dataset.CostColumn] != null && is.int(event.attributes[dataset.CostColumn].value)) {
                        sum += Convert.ToInt32(event.attributes[dataset.CostColumn].value);
                    }
                }

            }
            return Convert.ToInt32(sum / dataset.EventLog.traces.length);
        }
        return null;
    }
    @Message(IPC_GETTOTALCOSTOFDATASET)
    public GetTotalCostOfDataset(projectId: string, datasetId: string): ThreadResult<any> {
        const dataset: IDataSet = this.GetDatasetById(projectId, datasetId);
        let sum: int = 0;
        if (dataset) {
            for (let i = 0; i < dataset.EventLog.traces.length; i++) {
                const events = dataset.EventLog.traces[i].events;
                for (let j = 0; j < events.length; j++) {
                    const event = events[j];
                    if (event.attributes[dataset.CostColumn] != null && is.int(event.attributes[dataset.CostColumn].value)) {
                        sum += Convert.ToInt32(event.attributes[dataset.CostColumn].value);
                    }
                }

            }
            return Convert.ToInt32(sum);
        }
        return null;
    }

    @Message(IPC_GETDATASETNAME)
    public GetDatasetName(projectId: string, datasetId: string): ThreadResult<any> {
        const dataset: IDataSet = this.GetDatasetById(projectId, datasetId);
        if (dataset) {
            return dataset.Name;
        }
        return null;
    }



    @Message(IPC_GETACTIVITIES)
    public GetActivities(projectId: string, datasetId: string): ThreadResult<any> {
        const activitySet = new Set();
        const activities = [];
        const dataset: IDataSet = this.GetDatasetById(projectId, datasetId);
        if (dataset) {
            for (let i = 0; i < dataset.EventLog.traces.length; i++) {
                for (let j = 0; j < dataset.EventLog.traces[i].events.length; j++) {
                    const value = dataset.EventLog.traces[i].events[j].attributes[dataset.ActivityColumn].value;
                    if (activities.indexOf(value) === -1) {
                        activities.push(value);
                    }
                }
            }
            return activities;
        }
        return null;
    }

    @Message(IPC_SETACTIVITYINFO)
    public SetActivityInfo(projectId: string, datasetId: string, activityInfos: IActivityInfo[]): ThreadResult<any> {
        const activitySet = new Set();
        const activityInfo = {};
        const dataset: IDataSet = this.GetDatasetById(projectId, datasetId);
        if (dataset) {
            for (let i = 0; i < activityInfos.length; i++) {
                activityInfo[activityInfos[i].name] = activityInfos[i];
            }
            for (let i = 0; i < dataset.EventLog.traces.length; i++) {
                for (let j = 0; j < dataset.EventLog.traces[i].events.length; j++) {
                    const ai: IActivityInfo = activityInfo[dataset.EventLog.traces[i].events[j].attributes[dataset.ActivityColumn].value];
                    if (ai && ai.costType === CostTypes.Fixed && ai.amount > 0) {
                        dataset.EventLog.traces[i].events[j].attributes[dataset.CostColumn] = new Attribute(ai.amount);
                    }
                }
            }

            dataset.ActivityInfo = activityInfo;
            console.log(dataset);
            return true;
        }
        return false;
    }

    @Message(IPC_GETACTIVITYINFO)
    public GetActivityInfo(projectId: string, datasetId: string): ThreadResult<IActivityInfoBag> {
        const activitySet = new Set();
        const activityInfo = {};
        const dataset: IDataSet = this.GetDatasetById(projectId, datasetId);
        if (dataset) {
            if (dataset.ActivityInfo == null) {
                dataset.ActivityInfo = {};
            }
            return dataset.ActivityInfo;
        }
        return false;
    }

    @Message(IPC_SETDATASETFILTEREDDATA)
    public SetDatasetFilteredData(projectId: string, datasetId: string, filteredData: any[]): ThreadResult<boolean> {
        const dataset: IDataSet = this.GetDatasetById(projectId, datasetId);
        if (dataset) {
            dataset.FilteredData = filteredData;
            return true;
        }
        return false;
    }

    @Message(IPC_SETDATASETCONDITION)
    public SetDatasetCondition(projectId: string, datasetId: string, condition: string): ThreadResult<boolean> {
        const dataset: IDataSet = this.GetDatasetById(projectId, datasetId);
        if (dataset) {
            dataset.ConditionRules = condition;
            return true;
        }
        return false;
    }


    private getTraceEventsCount(trace: Trace): int {
        if (trace) {
            return trace.events.length;
        }
        return 0;
    }

    private getEventsCount(eventLog: EventLog): int {
        let eventsCount = 0;
        if (eventLog) {
            for (let i = 0; i < eventLog.traces.length; i++) {
                eventsCount += this.getTraceEventsCount(eventLog.traces[i]);
            }
            return eventsCount;
        }
        return 0;
    }

    public SerializeDataset(projectId: string, datasetId: string): any {
        const dataset: IDataSet = this.GetDatasetById(projectId, datasetId);
        return {
            Id: dataset.Id,
            Name: dataset.Name,
            Separator: dataset.Separator,
            CaseColumn: dataset.CaseColumn,
            ActivityColumn: dataset.ActivityColumn,
            TimeStampColumn: dataset.TimeStampColumn,
            StartDateColumn: dataset.StartDateColumn,
            CostColumn: dataset.CostColumn,
            EventLog: dataset.EventLog,
            ActivityInfo: dataset.ActivityInfo
        };
    }
    public DeserializeDataset(projectId: string, data: any): ThreadResult<IDataSet> {
        const dataset: DataSet = new DataSet(projectId);
        dataset.Id = data.Id;
        dataset.Name = data.Name;
        dataset.Separator = data.Separator;
        dataset.CaseColumn = data.CaseColumn;
        dataset.ActivityColumn = data.ActivityColumn;
        dataset.TimeStampColumn = data.TimeStampColumn;
        dataset.StartDateColumn = data.StartDateColumn;
        dataset.EventLog = data.EventLog;
        dataset.CostColumn = data.CostColumn;
        dataset.ActivityInfo = data.ActivityInfo;
        return dataset;
    }
}
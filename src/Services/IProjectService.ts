import { IProject } from '../Bussiness/IProject';
import { IActivityInfoBag, IDataSet } from '../Bussiness/IDataSet';
import { int } from '@tuval/core';
import { IActivityInfo } from '../Bussiness/IActivityInfo';

export type ThreadResult<T> = any;

export interface IProjectService {
    CreateProject(name: string): Promise<IProject>;
    GetProjectById(session_id: string, org_name: string, project_id: string): Promise<any>;
    AddDataSet(dataset: IDataSet): void;
    DataSetFromCvs(projectId: string,datasetId: string, datasetName: string, csv: string, case_column: string, activity_column: string, time_stamp: string, start_date: string, date_format: string): Promise<IDataSet>;
    DataSetFromXes(projectId: string, datasetName: string, xes: string): ThreadResult<IDataSet>;
    CloneDataSet(projectId: string, datasetName: string): ThreadResult<IDataSet>;
    GetDatasetById(projectId: string, id: string): ThreadResult<IDataSet>;
    SaveProject(projectId: string): ThreadResult<string>;
    GetProjectListFromStorage(): Promise<string[]>;
    LoadProject(name: string): Promise<IProject>;
    CloseProject(id: string): void;
    ConvertCsvToJson(csv: string): ThreadResult<any>;
    GetDatasetAsData(projectId: string, datasetId: string): ThreadResult<any>;
    GetDatasetEventCount(projectId: string, datasetId: string): ThreadResult<int>;
    CasesStartedPerDay(projectId: string, datasetId: string): ThreadResult<int>;
    ActivitiesStartedPerDay(projectId: string, datasetId: string): ThreadResult<int>;
    ActivitiesPerCase(projectId: string, datasetId: string): ThreadResult<int>;
    GetVariantsInfo(projectId: string, datasetId: string): ThreadResult<any>;
    GetEventsOverTime(projectId: string, datasetId: string): ThreadResult<any>;
    GetStartEvents(projectId: string, datasetId: string): ThreadResult<any>;
    GetEndEvents(projectId: string, datasetId: string): ThreadResult<any>;
    GetTraceCount(projectId: string, datasetId: string): ThreadResult<any>;
    GetEventCount(projectId: string, datasetId: string): ThreadResult<any>;
    GetActivities(projectId: string, datasetId: string): ThreadResult<any>;
    GetMedianCaseDuration(projectId: string, datasetId: string): ThreadResult<any>;
    GetMeanCaseDuration(projectId: string, datasetId: string): ThreadResult<any>;
    GetDatasetName(projectId: string, datasetId: string):ThreadResult<any>;
    SetActivityInfo(projectId: string, datasetId: string, activityInfos: IActivityInfo[]): ThreadResult<any>;
    GetActivityInfo(projectId: string, datasetId: string): ThreadResult<IActivityInfoBag>;
    GetAverageCostOfDataset(projectId: string, datasetId: string): ThreadResult<any>;
    GetTotalCostOfDataset(projectId: string, datasetId: string): ThreadResult<any>;
    SetDatasetFilteredData(projectId: string, datasetId: string, filteredData: any[]): ThreadResult<boolean>;
    SetDatasetCondition(projectId: string, datasetId: string, condition: string): ThreadResult<boolean>;
}
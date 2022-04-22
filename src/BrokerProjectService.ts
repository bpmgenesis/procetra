import { MIProject } from './Domains/Project/Models/ProjectModel';
import { IActivityInfo } from "./Bussiness/IActivityInfo";
import { IDataSet } from "./Bussiness/IDataSet";
import { IProject } from "./Bussiness/IProject";
import { Project } from "./Bussiness/Project";
import { IProjectService } from "./Services/IProjectService";
import { StateService } from "./Services/StateService";
import { MiningBrokerClient, ICreateProjectResponse } from './BrokerClients/MiningBrokerClient';
import { MIProjectItem } from './Domains/Project/Models/MIProjectItem';

export class BrokerProjectService implements IProjectService {
    public CreateProject(name: string): Promise<IProject> {
        return new Promise((resolve, reject) => {
            const session_id = StateService.GetSessionId();
            if (session_id == null) {
                throw 'Invalid session.'
            }
            MiningBrokerClient.CreateProject(session_id, 'bpmgenesis', name).then((project: ICreateProjectResponse) => {
                resolve({
                    Id: project.project_id,
                    Name: project.project_name
                });
            });
        });

    }

    AddDataSet(dataset: IDataSet): Promise<any> {
        throw new Error("Method not implemented.");
    }
    DataSetFromCvs(projectId: string, datasetId: string, datasetName: string,
        csv: string, case_column: string, activity_column: string, time_stamp: string,
        start_date: string, date_format: string): Promise<IDataSet> {
        return new Promise((resolve, reject) => {
            const datasetObject = {
                ProjectId: projectId,
                Id: datasetId
            }
            resolve(datasetObject as any);
        });
    }
    DataSetFromXes(projectId: string, datasetName: string, xes: string):Promise<any> {
        throw new Error("Method not implemented.");
    }
    CloneDataSet(projectId: string, datasetName: string) :Promise<any>{
        throw new Error("Method not implemented.");
    }
    GetDatasetById(projectId: string, id: string):Promise<any> {
        throw new Error("Method not implemented.");
    }
    SaveProject(projectId: string):Promise<any> {
        throw new Error("Method not implemented.");
    }
    GetProjectListFromStorage(): Promise<string[]> {
        throw new Error("Method not implemented.");
    }
    public LoadProject(name: string): Promise<IProject> {
        throw new Error("Method not implemented.");
    }
    CloseProject(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    ConvertCsvToJson(csv: string): Promise<string> {
        return new Promise((resolve, reject) => {
            /* const data = CvsToJson.Convert(csv, { parseNumbers: true }); */
            return resolve(null);
        });

    }
    GetDatasetAsData(projectId: string, datasetId: string):Promise<any> {
        throw new Error("Method not implemented.");
    }
    GetDatasetEventCount(projectId: string, datasetId: string):Promise<any> {
        throw new Error("Method not implemented.");
    }
    CasesStartedPerDay(projectId: string, datasetId: string):Promise<any> {
        throw new Error("Method not implemented.");
    }
    ActivitiesStartedPerDay(projectId: string, datasetId: string):Promise<any> {
        throw new Error("Method not implemented.");
    }
    ActivitiesPerCase(projectId: string, datasetId: string):Promise<any> {
        throw new Error("Method not implemented.");
    }
    GetVariantsInfo(projectId: string, datasetId: string):Promise<any> {
        throw new Error("Method not implemented.");
    }
    GetEventsOverTime(projectId: string, datasetId: string): Promise<any> {
        debugger;
        return new Promise((resolve, reject) => {

        });
    }
    GetStartEvents(projectId: string, datasetId: string):Promise<any> {
        throw new Error("Method not implemented.");
    }
    GetEndEvents(projectId: string, datasetId: string):Promise<any> {
        throw new Error("Method not implemented.");
    }
    GetTraceCount(projectId: string, datasetId: string):Promise<any> {
        throw new Error("Method not implemented.");
    }
    GetEventCount(projectId: string, datasetId: string) :Promise<any>{
        throw new Error("Method not implemented.");
    }
    GetActivities(projectId: string, datasetId: string):Promise<any> {
        throw new Error("Method not implemented.");
    }
    GetMedianCaseDuration(projectId: string, datasetId: string) :Promise<any>{
        throw new Error("Method not implemented.");
    }
    GetMeanCaseDuration(projectId: string, datasetId: string):Promise<any> {
        throw new Error("Method not implemented.");
    }
    GetDatasetName(projectId: string, datasetId: string):Promise<any> {
        throw new Error("Method not implemented.");
    }
    SetActivityInfo(projectId: string, datasetId: string, activityInfos: IActivityInfo[]):Promise<any> {
        throw new Error("Method not implemented.");
    }
    GetActivityInfo(projectId: string, datasetId: string):Promise<any> {
        throw new Error("Method not implemented.");
    }
    GetAverageCostOfDataset(projectId: string, datasetId: string):Promise<any> {
        throw new Error("Method not implemented.");
    }
    GetTotalCostOfDataset(projectId: string, datasetId: string):Promise<any> {
        throw new Error("Method not implemented.");
    }
    SetDatasetFilteredData(projectId: string, datasetId: string, filteredData: any[]): Promise<any> {
        throw new Error("Method not implemented.");
    }
    SetDatasetCondition(projectId: string, datasetId: string, condition: string):Promise<any> {
        throw new Error("Method not implemented.");
    }

    //#region Project Methods
    public GetProjects(session_id: string, org_name: string): Promise<MIProject[]> {
        return MiningBrokerClient.GetProjects(session_id, org_name);
    }

    public GetProjectItems(session_id: string, org_name: string, project_id: string): Promise<MIProjectItem[]> {
        //return MiningBrokerClient.GetProjectItems(session_id, org_name, project_id);
        return new Promise((resolve,reject)=>{
            resolve(
                [
                    {
                        project_item_id: '1',
                        name: 'Test Dataset 2',
                        type: 'Dataset'
                    },
                    {
                        project_item_id: '2',
                        name: 'İnsan kaynakları',
                        type: 'Dashboard'
                    }
                ]
            );
        });
    }

    public GetProjectById(session_id: string, org_name: string, project_id: string): Promise<any> {
        return MiningBrokerClient.GetProjectById(session_id, org_name, project_id);
    }
    //#endregion

}
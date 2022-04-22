import { Delegate, Event } from '@tuval/core';
import { MiningBrokerClient } from '../BrokerClients/MiningBrokerClient';


export class CurrentProjectChangedArgs {
    public ProjectId: string;
    public constructor(projectId: string) {
        this.ProjectId = projectId;
    }
}
export class CurrentDatasetChangedArgs {
    public ProjectId: string;
    public DatasetId: string;
    public constructor(projectId: string, datasetId: string) {
        this.ProjectId = projectId;
        this.DatasetId = datasetId;
    }
}


export class CurrentProjectChangedHandler extends Delegate<(args: CurrentProjectChangedArgs) => void> { }
export class CurrentDatasetChangedHandler extends Delegate<(args: CurrentDatasetChangedArgs) => void> { }

export class StateService {
    public static CurrentProjectChanged: Event<CurrentProjectChangedHandler> = new Event();
    public static CurrentDatasetChanged: Event<CurrentDatasetChangedHandler> = new Event();
    private static CurrentProjectId: string;
    private static CurrentDatasetId: string;

    private static CurrentActivityOverview: any;

    private static stateBag: any = {};

    public static SetStateVariable(key: string, value: any) {
        this.stateBag[key] = value;
    }

    public static GetStateVariable(key: string): any {
        return this.stateBag[key];
    }

    public static GetAndDeleteStateVariable(key: string): any {
        const value = this.stateBag[key];
        delete this.stateBag[key];
        return value;
    }

    public static SetCurrentProject(projectId: string): void {
        if (StateService.CurrentProjectId !== projectId) {
            StateService.CurrentProjectId = projectId;
            StateService.CurrentProjectChanged(new CurrentProjectChangedArgs(projectId));
        }
    }

    public static SetCurrentDataset(projectId: string, datasetId: string): void {
        if (StateService.CurrentDatasetId !== datasetId) {
            StateService.SetCurrentProject(projectId);
            StateService.CurrentDatasetId = datasetId;
            StateService.CurrentDatasetChanged(new CurrentDatasetChangedArgs(projectId, datasetId));
        }
    }

    public static GetCurrentProject(): string {
        return StateService.CurrentProjectId;
    }

    public static GetCurrentDataset(): string {
        return StateService.CurrentDatasetId;
    }

    /*  public static SetCurrentActivityInfo(data: any): void {
         StateService.CurrentActivityOverview = data;
     } */

    public static GetCurrentActivityInfo(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (StateService.CurrentActivityOverview != null) {
                resolve(StateService.CurrentActivityOverview);
            } else {
                const log_id = StateService.CurrentDatasetId;
                MiningBrokerClient.GetActivityOverview(log_id).then(data => {
                    StateService.CurrentActivityOverview = data;
                    resolve(data);
                });
            }
        });
    }

    public static SetSessionId(value: string): void {
        this.SetStateVariable('session_id', value);
    }

    public static GetSessionId(): string {
        return this.GetStateVariable('session_id');
    }
}
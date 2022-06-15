import { HttpClient } from '@tuval/core';
import { ConfigService } from '@procetra/common';

export interface IEbaProject {
    Name: string;
    Caption: string;
    CreatorUserId: string;
    CreationDate: Date;
    Version: string;
    Type: string;
    FastApprove: boolean
    MultiLanguage: boolean
    ManagerRoleType: boolean
    ManagerRoleID: string
    ShowParentHistory: boolean
}

export interface IEbaProcess {
    Id: string;
    Name: string;
    UserId: string;
    StartDate: Date;
    FinishDate; Date;
    Finished: boolean;
}

export interface IEbaServer {
    Name: string;
}

export class eBABrokerClient {
    public static async GetProjects(): Promise<IEbaProject[]> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('user','');
            form.append('password','');
            form.append('lang','');
            HttpClient.Post(ConfigService.GetEbaBrokerUrl() + '/process/GetProjects', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }

    public static async GetProcesses(process_name: string): Promise<IEbaProcess[]> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('user','');
            form.append('password','');
            form.append('process_name',process_name);
            form.append('lang','');
            HttpClient.Post(ConfigService.GetEbaBrokerUrl() + '/process/GetProcesses', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }

    public static async GetProcessHistory(process_id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('user','');
            form.append('password','');
            form.append('user_id','admin');
            form.append('process_id',process_id);
            form.append('lang','');
            HttpClient.Post(ConfigService.GetEbaBrokerUrl() + '/process/GetProcessHistory', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }

    public static async GetProcessAllHistory(process_name: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('user','');
            form.append('password','');
            form.append('process_name',process_name);
            form.append('lang','');
            HttpClient.Post(ConfigService.GetEbaBrokerUrl() + '/process/GetProcessAllHistory/json', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }
}
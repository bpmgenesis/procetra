import { HttpClient } from '@tuval/core';
import { ConfigService } from '@procetra/common';

export class EbaProject {
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

export class EnsembleBrokerClient {
    public static async Login(): Promise<string> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('user_name','');
            form.append('password','');
            form.append('lang','');
            // const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };
            HttpClient.Post(ConfigService.GetEnsembleUrl() + '/process/Login', form)
                .then(response => {
                    resolve(response.data.Result);
                });
        });
    }

    public static async GetProcesses(token: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('token',token);
            // const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };
            HttpClient.Post(ConfigService.GetEnsembleUrl() + '/process/GetProcesses', form)
                .then(response => {
                    resolve(response.data.Result);
                });
        });
    }

    public static async GetProcessSteps(token: string, process_id: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('token',token);
            form.append('process_id',process_id);
            // const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };
            HttpClient.Post(ConfigService.GetEnsembleUrl() + '/process/GetProcessSteps', form)
                .then(response => {
                    resolve(response.data.Result);
                });
        });
    }

   /*  public static async GetProcesses(process_name: string): Promise<EbaProject[]> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('user','cvx');
            form.append('password','xcv');
            form.append('process_name',process_name);
            form.append('lang','xcv');
            HttpClient.Post(ConfigService.GetEbaBrokerUrl() + '/process/GetProcesses', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }

    public static async GetProcessHistory(process_id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('user','cvx');
            form.append('password','xcv');
            form.append('user_id','admin');
            form.append('process_id',process_id);
            form.append('lang','xcv');
            HttpClient.Post(ConfigService.GetEbaBrokerUrl() + '/process/GetProcessHistory', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }

    public static async GetProcessAllHistory(process_name: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('user','cvx');
            form.append('password','xcv');
            form.append('process_name',process_name);
            form.append('lang','xcv');
            HttpClient.Post(ConfigService.GetEbaBrokerUrl() + '/process/GetProcessAllHistory/json', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    } */
}
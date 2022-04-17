import { HttpClient } from '@tuval/core';
import { ConfigService } from "../../../../Services/ConfigService";
import { detectSeparator } from '../../../../Services/LocalProjectService';
import { MIProject } from '../../../../../dist_types/types/UI/Models/ProjectModel';

export interface ICreateProjectResponse {
    project_id: string;
    project_name: string;
    creator: string;
}

export class MiningBrokerClient {
    public static async LoadCsv(csv: string,
        case_id: string,
        activity_key: string,
        timestamp_key: string,
        start_timestamp_key: string,
        resource_key: string,
        cost_key: string): Promise<any[]> {

        return new Promise((resolve, reject) => {
            const data = new FormData();
            data.append('case_column_name', case_id);
            data.append('activity_column_name', activity_key);
            data.append('timestamp_key', timestamp_key);
            data.append('start_timestamp_key', start_timestamp_key);
            data.append('resource_key', resource_key);
            data.append('cost_key', cost_key);
            data.append('sep', detectSeparator(csv));


            var parts = [
                new Blob([csv], { type: 'text/plain' })
            ];
            var file = new File(parts, 'csv.txt')

            data.append('file', file, 'test.csv');

            HttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'LoadCsv', data, {
                headers: {
                    "Content-Encoding": "gzip"
                }
            })
                .then(response => {
                    resolve(response.data);
                });
        });
    }

    public static async ImportCsvFile(
        csv: string,
        org_name: string,
        case_column_name: string,
        activity_column_name: string,
        timestamp_key: string,
        start_timestamp_key: string,
        resource_key: string,
        cost_key: string): Promise<any[]> {

        return new Promise((resolve, reject) => {
            const data = new FormData();
            data.append('case_column_name', case_column_name);
            data.append('activity_column_name', activity_column_name);
            data.append('timestamp_key', timestamp_key);
            data.append('start_timestamp_key', start_timestamp_key);
            data.append('resource_key', resource_key);
            data.append('cost_key', cost_key);
            data.append('sep', detectSeparator(csv));


            var parts = [
                new Blob([csv], { type: 'text/plain' })
            ];
            var file = new File(parts, 'csv.txt')

            data.append('file', file, 'test.csv');

            HttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'ImportCsvFile', data, {
                headers: {
                    "Content-Encoding": "gzip"
                }
            })
                .then(response => {
                    resolve(response.data);
                });
        });
    }

    public static async GetStatistics(log_id: string, activity_name: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('log_id', log_id);
            form.append('activity_name', activity_name);

            HttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'GetStatistics', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }
    public static async GetActivityOverview(log_id: string,): Promise<any[]> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('log_id', log_id);

            HttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'GetActivityStatistics', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }
    public static async GetItemOverview(log_id: string, item_name: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('log_id', log_id);
            form.append('activity_name', item_name);
            HttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'GetStatistics', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }

    public static async GetStartActivities(log_id: string,): Promise<any> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('log_id', log_id);

            HttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'GetStartActivities', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }

    public static async GetStartItems(log_id: string, item_name: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('log_id', log_id);
            form.append('item_name', item_name);
            HttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'GetStartItems', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }

    public static async GetEndActivities(log_id: string,): Promise<any> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('log_id', log_id);

            HttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'GetEndActivities', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }
    public static async GetEndItems(log_id: string, item_name: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('log_id', log_id);
            form.append('item_name', item_name);
            HttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'GetEndItems', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }
    public static async GetLog(log_id: string,): Promise<any> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('log_id', log_id);

            HttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'GetLog', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }

    public static async GetEventsOverTime(log_id: string,): Promise<any> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('log_id', log_id);

            HttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'GetEventsOverTime', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }

    public static async GetEventDataInfo(log_id: string,): Promise<any> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('log_id', log_id);

            HttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'GetEventDataInfo', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }

    public static async GetResourceOverview(log_id: string,): Promise<ICreateProjectResponse> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('log_id', log_id);

            HttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'GetResourceOverview', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }

    public static async Login(user: string, password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('user', user);
            form.append('password', password);

            HttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'LoginService', form)
                .then(response => {
                    resolve(response.data.sessionId);
                });
        });
    }

    public static async CreateProject(session_id: string, org_name: string, project_name: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('session_id', session_id);
            form.append('org_name', org_name);
            form.append('project_name', project_name);

            HttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'CreateProject', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }

    public static async GetProjects(session_id: string, org_name: string): Promise<MIProject[]> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('session_id', session_id);
            form.append('org_name', org_name);

            HttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'GetProjects', form)
                .then(response => {
                    resolve(response.data.projects);
                });
        });
    }

    public static async GetProjectById(session_id: string, org_name: string, project_id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('session_id', session_id);
            form.append('org_name', org_name);
            form.append('project_id', org_name);

            HttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'GetProjectById', form)
                .then(response => {
                    resolve(response.data.projects);
                });
        });
    }

    public static async CreateProjectItems(session_id: string, org_name: string, project_id: string, item_type: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('session_id', session_id);
            form.append('org_name', org_name);
            form.append('project_id', org_name);
            form.append('item_type', org_name);

            HttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'CreateProjectItem', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }

    public static async GetProjectItems(session_id: string, org_name: string, project_id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('session_id', session_id);
            form.append('org_name', org_name);
            form.append('project_id', org_name);

            HttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'GetProjectItems', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }

}
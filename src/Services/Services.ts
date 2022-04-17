import { StateService } from './StateService';
import { IProjectService } from "./IProjectService";
import { instance as container } from '@tuval/core';
import { BrokerProjectService } from '../BrokerProjectService';

export class Services {
    public static get ProjectService(): BrokerProjectService/* IProjectService */ {
        try {
            return container.resolve<IProjectService>('IProjectService_Thread') as any;
        } catch {
            throw 'Project Service Not Found.';
        }
    }
    public static get StateService() {
        return StateService;
    }
}
import { IView, TController, Message, Controller, IpcMessage } from '@tuval/forms';
import { MiningBrokerClient } from '../../Dialogs/ConnectorDialog/eBA/MiningBrokerClient';
import { IDataSet } from "../../../Bussiness/IDataSet";
import { StateService } from "../../../Services/StateService";
import { ProjectItemsListMenuView, ProjectItemsListMenuViewMessages } from "./ProjectItemsListMenuView";
import { int } from '@tuval/core';
import { Services } from '../../../Services/Services';


@Controller
export class ProjectItemsMenuController extends TController {
    private MessageMap = {};
    private project_id: string;
    private org_name: string;
    public constructor(project_id: string, org_name: string) {
        super();
        this.project_id = project_id;
        this.org_name = org_name;
    }

    public AddEventDataSetItem(dataset: IDataSet) {
        this.SendMessageToView('addEventDataSetItem', dataset);
        // (this._view as any).AddEventDataSetItem(dataset);
    }

    @IpcMessage
    private Cm_Test(value: int) {
        console.log(value);
    }

    public LoadProjectItems(project_id: string) {
        const session_id = StateService.GetSessionId();
        if (session_id == null) {
            throw 'Invalid session.';
        }

        Services.ProjectService.GetProjectItems(session_id, this.org_name, this.project_id).then(projects => {
            const _projects = (projects as any).projects;
            for (let i = 0; i < _projects.length; i++) {
                this.AddEventDataSetItem({ Id: _projects[i].project_id, Name: _projects[i].project_name } as any);
            }
        });
    }
}
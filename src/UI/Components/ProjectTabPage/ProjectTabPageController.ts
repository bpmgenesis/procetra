import { ProjectItemsMenuController } from '../ProjectItemsListMenu/ProjectItemsMenuController';
import { ProjectTabPageView } from './ProjectTabPageView';
import { TController, IView, Controller } from '@tuval/forms';

@Controller
export class ProjectTabPageController extends TController {
    private project_id: string;
    private org_name: string;
    private _listMenuController: ProjectItemsMenuController;
    public constructor(project_id: string, org_name: string) {
        super();
        this.project_id = project_id;
        this.org_name = org_name;
        this._listMenuController = new ProjectItemsMenuController(this.project_id, this.org_name);

    }
    public SetTabTitle(text: string) {
        this.SendMessageToView('Ipcm_SetTabTitle', text);
    }

    public SetView(view: any) {
        super.SetView(view);
        this.SendMessageToView('Ipcm_SetProjectItemsListMenuController', this._listMenuController);

        this._listMenuController.LoadProjectItems('');
    }

    public LoadProject(project_id: string) {

    }
}
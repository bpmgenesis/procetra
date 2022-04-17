import { IProject } from './Bussiness/IProject';
import { MainView } from './MainView';
import { Services } from './Services/Services';
import { ProjectUIService } from './UI/UIServices/ProjectUIService';
import { ProjectTabPageController } from './UI/Components/ProjectTabPage/ProjectTabPageController';
import { IpcMessage, IView, TController, Controller } from '@tuval/forms';
import { Dictionary } from '@tuval/core';
import { ProjectTabController } from './UI/Components/ProjectTabControl/ProjectTabController';

@Controller
export class MainController  extends TController{
    private _projectTabController: ProjectTabController;
    public constructor() {
        super();
    }

    //#region View Message

    @IpcMessage
    private Ipcm_RequestController(view: IView) {
        this._projectTabController = new ProjectTabController();
        this._projectTabController.SetView(view);
    }

    @IpcMessage
    private Ipcm_SelectNewProject() {
       this.SelectNewProject();
    }
    //#endregion

    public SelectNewProject() {
        ProjectUIService.NewProject().then(processInfo => {
            Services.ProjectService.CreateProject(processInfo.name).then(project => {
               this._projectTabController.CreateNewProject(project);
            });
        });
    }

    public Save() {
        console.log('project saved.');
    }

    public OpenProject(): void {
        ProjectUIService.OpenProjectDialog().then(project_id => {
            Services.ProjectService.GetProjectById(Services.StateService.GetSessionId(), 'bpmgenesis', project_id).then((project: IProject) => {
               /*  this._view.pmTab.Visible = true;
                this._view.pmTab.AddProject(project); */
            });
        });
    }
}
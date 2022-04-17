import { TController, Controller, IpcMessage, IView, Control } from '@tuval/forms';
import { Dictionary } from '@tuval/core';

@Controller
export class ProjectTabController extends TController {

    private pageControllers: Dictionary<string, ProjectTabController> = new Dictionary();

    //#region View Message

    @IpcMessage
    private Ipcm_RequestController(view: Control<any>) {
        const controller = new ProjectTabController();
        controller.SetView(view);
        this.pageControllers.Add(view.Handle, controller);
    }

    //#endregion

    public CreateNewProject(project: any) {
        this.SendMessageToView('Wm_AddTab', 'test');
    }
}
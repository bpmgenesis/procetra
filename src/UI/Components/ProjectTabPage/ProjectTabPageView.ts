import { LayoutPanel, SizingModes, TController, TTabPage, View, IpcMessage } from '@tuval/forms';
import { ProjectItemsListMenuView } from '../ProjectItemsListMenu/ProjectItemsListMenuView';

@View
export class ProjectTabPageView extends TTabPage {
    private projectItemsListMenuView: ProjectItemsListMenuView;
    private layoutPanel: LayoutPanel;
    public constructor() {
        super();

        this.layoutPanel = new LayoutPanel();
        this.layoutPanel.SizingMode = SizingModes.LeftFixed;

        this.projectItemsListMenuView = new ProjectItemsListMenuView();
        this.layoutPanel.LeftControl = this.projectItemsListMenuView;
        this.layoutPanel.LeftSize = 200;

        this.Controls.Add(this.layoutPanel);
    }

    @IpcMessage
    private Ipcm_SetProjectItemsListMenuController(controller: TController) {
        controller.SetView(this.projectItemsListMenuView);
    }

    @IpcMessage
    private Ipcm_SetTabTitle(title: string) {
        this.Text = title;
    }

}
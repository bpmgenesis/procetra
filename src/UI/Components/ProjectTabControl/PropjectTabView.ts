import { TTabControl, View, IpcMessage } from '@tuval/forms';
import { ProjectTabPageView } from '../ProjectTabPage/ProjectTabPageView';

@View
export class ProjectTabView extends TTabControl {

    @IpcMessage
    private Wm_AddTab(name: string) {
        const test = new ProjectTabPageView();
        this.SendMessageToController('Ipcm_RequestController', this);
        this.TabPages.Add(test);
    }
}
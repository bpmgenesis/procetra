import { TFlexColumnContainer, ListMenu, IView, Message, TController, View, IpcMessage } from '@tuval/forms';
import { DataSetsBottomMenu } from '../../DataSetTabPage/DataSetsBottomMenu';
import { EventDatasetMenuItem } from './ProjectItemsListMenuItem/EventDatasetMenuItem';
import { IDataSet } from '../../../Bussiness/IDataSet';

export enum ProjectItemsListMenuViewMessages {
    WM_ADD_EVENTDATASET_ITEM = 1000
}


@View
export class ProjectItemsListMenuView extends TFlexColumnContainer {

    private listMenu: ListMenu;
    private bottomMenu: DataSetsBottomMenu;

    public constructor() {
        super();

        this.Appearance.Width = '250px';
        this.Appearance.Height = `417px`;
        this.listMenu = new ListMenu();
        this.listMenu.Appearance.BackgroundColor = 'white';

        this.bottomMenu = new DataSetsBottomMenu();

        this.Controls.Add(this.listMenu);
        this.Controls.Add(this.bottomMenu);
    }
    Controller: any;

    @IpcMessage
    private addEventDataSetItem(dataset: IDataSet) {
        const item = new EventDatasetMenuItem(dataset);
        this.listMenu.Items.Add(item);
        debugger;
        this.SendMessageToController('Cm_Test', 1);
    }
}


import { Event } from '@tuval/core';
import { Dialog, ListBox } from '@tuval/forms';
import { MapColumnSettingsController } from './Controllers/MapColumnSettingsController';



export class MapColumnSettingsDialog extends Dialog {
    public OkButtonClicked: any = new Event();

    private mapColumnSettingsController:MapColumnSettingsController;

    public override InitComponents() {
        this.Text = '';
        this.Width = 300;
        this.Height = 300;

        this.mapColumnSettingsController = new MapColumnSettingsController();
        this.mapColumnSettingsController.Bind(this);
        this.Controls.Add(this.mapColumnSettingsController);


    }

    public override OnShown(): void {
        //this.uploadDataDialogController.LoadProjects();
    }


    private OnOKClick() {
        this.ShowDialogAsyncResolve(/* this.projectList.SelectedItem.Tag */);
        this.OkButtonClicked(/* this.projectList.SelectedItem.Text */);
        this.Hide();
    }

}

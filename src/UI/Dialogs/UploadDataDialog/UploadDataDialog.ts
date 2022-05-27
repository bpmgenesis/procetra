import { Event } from '@tuval/core';
import { Dialog, ListBox } from '@tuval/forms';
import { MIProject } from '../../../models/MIProject';
import { UploadDataDialogController } from './Controllers/UploadDataDialogController';

export class UploadDataDialog extends Dialog {
    public OkButtonClicked: any = new Event();

    private uploadDataDialogController: UploadDataDialogController;

    public override InitComponents() {
        this.Text = 'Open Project';
        this.Width = 1200;
        this.Height = 930;



        /*   this.projectList = new ListBox();
          this.projectList.Height = 360;

          this.Controls.Add(this.projectList);

          const btnOK = new Button();
          btnOK.Text = 'OK';
          btnOK.Color = 2;
          btnOK.Clicked = (() => {
              this.OnOKClick();

          }) as any;

          const btnCancel = new Button();
          btnCancel.Text = 'Cancel';
          btnCancel.Color = 1;
          btnCancel.Clicked = (() => {
              this.Hide();
          }) as any;
          this.FooterControls.AddRange([btnOK, btnCancel]); */

    }

    public SetProject(project:MIProject) {
        this.uploadDataDialogController = new UploadDataDialogController();
        this.uploadDataDialogController.Bind(project);
        this.Controls.Add(this.uploadDataDialogController);
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

import { CreateNewProjectController } from './Controllers/CreateNewProjectController';
import { Event } from '@tuval/core';
import { Dialog, ListBox } from '@tuval/forms';



export class CreateNewProjectDialog extends Dialog {
    public OkButtonClicked: any = new Event();
    projectList: ListBox;

    private createNewProjectDialogController: CreateNewProjectController;

    public override InitComponents() {
        this.Text = 'Open Project';
        this.Width = 500;
        this.Height = 250;

        this.createNewProjectDialogController = new CreateNewProjectController();
        this.createNewProjectDialogController.Bind(this);
        this.Controls.Add(this.createNewProjectDialogController);

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

    public override OnShown(): void {
        //this.createNewProjectDialogController.LoadProjects();
    }


    public OnOKClick(value: string) {
        this.ShowDialogAsyncResolve(value);
        this.Hide();
    }

    public OnCancel() {
        this.Hide();
    }

}

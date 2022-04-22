import { Event } from '@tuval/core';
import { Dialog, ListBox } from '@tuval/forms';

import { OpenProjectDialogController } from './OpenProjectDialogController';



export class OpenProjectDialog extends Dialog {
    public OkButtonClicked: any = new Event();
    projectList: ListBox;

    private openProjectDialogController:OpenProjectDialogController;

    public override InitComponents() {
        this.Text = 'Open Project';
        this.Width = 600;
        this.Height = 530;

        this.openProjectDialogController = new OpenProjectDialogController();
        this.openProjectDialogController.Bind(this);
        this.Controls.Add(this.openProjectDialogController);

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
        this.openProjectDialogController.LoadProjects();
    }


    private OnOKClick() {
        this.ShowDialogAsyncResolve(this.projectList.SelectedItem.Tag);
        this.OkButtonClicked(this.projectList.SelectedItem.Text);
        this.Hide();
    }

}

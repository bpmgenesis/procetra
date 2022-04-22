import { Dialog, TTextBox, FormLayout, Button } from '@tuval/forms';
import { Delegate, Event, instance as container } from '@tuval/core';
import { NewProjectListView } from './NewProjectListView';

export class NewProjectDialog extends Dialog {
    public OKButtonClick: any = new Event();
    public txtName: TTextBox;
    private processProviderDialog: Dialog;
    processProviderListView: NewProjectListView;
    public override InitComponents() {
        this.Text = 'Select New Project Provider';
        this.Width = 800;
        this.Height = 600;


        this.processProviderListView = new NewProjectListView();
        this.processProviderListView.ProcessSelected.add((processInfo) => {

            this.ShowDialogAsyncResolve(processInfo);
            this.OKButtonClick(processInfo);
            this.Hide();

        });
        this.Controls.Add(this.processProviderListView);

        const btnOK = new Button();
        btnOK.Text = 'OK';
        btnOK.Color = 2;
        btnOK.Clicked = (() => {

        }) as any;

        const btnCancel = new Button();
        btnCancel.Text = 'Cancel';
        btnCancel.Color = 1;
        btnCancel.Clicked = (() => {
            this.Hide();
        }) as any;

        this.FooterControls.AddRange([btnOK, btnCancel]);

    }

}
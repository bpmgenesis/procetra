import { Event } from '@tuval/core';
import { cTopLeading, cTrailing, Dialog, HStack, State, Text, UIController, UIScene, UIView, VStack } from '@tuval/forms';

import { Bindable } from '../../../Domains/ProcessOverview/Controllers/Overview/Bindable';
import { AcceptButton, CancelButton } from '../../Views/Buttons';
import { RegularTextBox } from '../../Views/RegularTextBox';


export class AddEditAnalyseModelNameDialog extends Dialog {
    private openProjectDialogController: AddEditAnalyseModelNameController;

    public override InitComponents() {
        this.Text = 'New Analyse Model';
        this.Width = 600;
        this.Height = 230;

        this.openProjectDialogController = new AddEditAnalyseModelNameController();
        this.openProjectDialogController.Bind(this);
        this.Controls.Add(this.openProjectDialogController);
    }

    public override OnShown(): void {

    }
    public OnOKClick(value: string) {
        this.ShowDialogAsyncResolve(value);
        this.Hide();
    }
}
class AddEditAnalyseModelNameController extends UIController {

    private dialog: AddEditAnalyseModelNameDialog;

    private $txtName: Bindable<string>;

    protected InitController() {
        this.$txtName = new Bindable('', this);
    }

    public OnBindModel(dialog: AddEditAnalyseModelNameDialog) {
        this.dialog = dialog;
    }
    public LoadView(): UIView {
        return (
            UIScene(
                VStack({ alignment: cTopLeading })(
                    Text('New Analyse Model').fontSize('24px').fontWeight('700').marginBottom('50px'),
                    VStack(
                        RegularTextBox({ value: this.$txtName })
                    ).height(), //auto
                    HStack({ alignment: cTrailing })(
                        AcceptButton('OK').action(() => this.dialog.OnOKClick(this.$txtName.get())),
                        CancelButton('Cancel')
                    )
                )
            ).padding(10)

        )
    }
}
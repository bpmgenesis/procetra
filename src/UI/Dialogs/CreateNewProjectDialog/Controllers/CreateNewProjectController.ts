import { Bindable } from '../../../../modules/ProcessOverview/Controllers/Overview/Bindable';
import { CreateNewProjectDialog } from './../CreateNewProjectDialog';
import { Text, UIController, UIView, UIScene, VStack, cTopLeading, HStack, cTrailing, cLeading } from '@tuval/forms';
import { RegularTextBox } from '../../../Views/RegularTextBox';
import { AcceptButton, CancelButton } from '../../../Views/Buttons';
import { RegularText } from '../../../Views/Texts';

export class CreateNewProjectController extends UIController {
    private dialog: CreateNewProjectDialog;

    private $txtName: Bindable<string>;

    public InitController() {
        this.$txtName = new Bindable('', this);
    }

    public OnBindModel(dialog: CreateNewProjectDialog) {
        this.dialog = dialog;
    }

    public LoadView(): UIView {
        return (
            UIScene(
                VStack({ spacing: 10 })(
                    HStack({ alignment: cLeading, spacing: 5 })(
                        // Icon('\\d1fe').size(24).foregroundColor('#263238'),
                        RegularText('Create new project').fontSize(20).fontFamily("'Source Sans Pro', Arial, sans-serif")
                    ).minHeight('64px').maxHeight('64px').background('#eceff1').foregroundColor('#263238').paddingLeft('10px'),
                    VStack({ alignment: cTopLeading, spacing: 20 })(
                        VStack(
                            RegularTextBox({ icon:'\\d277', value: this.$txtName }),
                        ).height(), //auto

                        // Select Repository Button
                        //SelectButton('Select Repository'),

                        HStack(
                            CancelButton('Cancel').action(()=>this.dialog.OnCancel()),
                            AcceptButton('OK').action(() => this.dialog.OnOKClick(this.$txtName.get()))
                        )
                    ).padding(10)
                )
            )
        )
    }
}
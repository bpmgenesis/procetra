import { Bindable } from './../../../../Domains/ProcessOverview/Controllers/Overview/Bindable';
import { CreateNewProjectDialog } from './../CreateNewProjectDialog';
import { Text, UIController, UIView, UIScene, VStack, cTopLeading, HStack, cTrailing, cLeading } from '@tuval/forms';
import { RegularTextBox } from '../../../Views/RegularTextBox';
import { AcceptButton, CancelButton } from '../../../Views/Buttons';

export class CreateNewProjectController extends UIController {
    private dialog: CreateNewProjectDialog;

    private $txtName: Bindable<string>;

    public LoadView(): UIView {
        return (
            UIScene(
                VStack({ alignment: cTopLeading })(
                    HStack({ alignment: cLeading })(
                        Text('Create new project').fontSize('24px').fontWeight('700').marginBottom('50px'),
                    ).padding(10),
                    VStack(
                        RegularTextBox({ value: this.$txtName })
                    ).padding(10),
                    HStack({ alignment: cTrailing })(
                        AcceptButton('OK').action(() => this.dialog.OnOKClick(this.$txtName.get())),
                        CancelButton('Cancel')
                    )
                )
            )
        )
    }
}
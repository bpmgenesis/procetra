import { Event } from '@tuval/core';
import { cTopLeading, cTrailing, Dialog, HStack, State, Text, UIController, UIScene, UIView, VStack } from '@tuval/forms';

import { Bindable } from '../../../Domains/ProcessOverview/Controllers/Overview/Bindable';
import { AcceptButton, CancelButton } from '../../Views/Buttons';
import { RegularTextBox } from '../../Views/RegularTextBox';
import { SelectFilterController } from './Controllers/SelectFilterController';


export class SelectFilterDialog extends Dialog {
    private openProjectDialogController: SelectFilterController;

    public override InitComponents() {
        this.Text = 'New Analyse Model';
        this.Width = 772;
        this.Height = 600;

        this.openProjectDialogController = new SelectFilterController();
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

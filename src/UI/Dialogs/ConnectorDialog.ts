import { Event } from '@tuval/core';
import { Dialog } from '@tuval/forms';
import { IActivityInfo } from '../../Bussiness/IActivityInfo';

import { eBADatasetConnectorDialog } from './eBA/eBADatasetConnectorDialog';
import { ConnectorDialogController } from './ConnectorDialogController';

export class ConnectorDialog extends Dialog {
    public OkButtonClicked: any = new Event();
    private activityInfo: IActivityInfo;
    public Selected: Event<any>;
    public XlsxSelected: Event<any>;
    public DPFSelected: Event<any>;
    public eBASelected: Event<any>;

    private eBAConnectorDialog: eBADatasetConnectorDialog;

    private InitNonVisualComponent() {

        this.eBAConnectorDialog = new eBADatasetConnectorDialog();
        this.Controls.Add(this.eBAConnectorDialog);

    }
    public override InitComponents() {
        //this.InitNonVisualComponent();
        this.Text = 'Select Item';
        this.Width = 1000;
        this.Height = 700;

        const controller = new ConnectorDialogController();
        controller.Bind(this);
        this.Controls.Add(controller);
    }

    private clearForm() {
        /*  this.costTabPage.chkFixedCost.Checked = false;
         this.costTabPage.chkAmount.Checked = false;
         this.costTabPage.txtAmount.Text = ''; */
    }
    public SetActivityInfo(activityInfo: IActivityInfo) {
        this.clearForm();
        this.activityInfo = activityInfo;
        // this.costTabPage.SetActivityInfo(activityInfo);
    }
    private OnOKClick() {
        this.OkButtonClicked();
        this.Hide();
    }

}
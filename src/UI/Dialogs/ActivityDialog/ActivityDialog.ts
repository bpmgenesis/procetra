import { Event, Convert } from '@tuval/core';
import { Button, Dialog, FormLayout, RadioButtonGroup, TTabControl, TTextBox } from '@tuval/forms';
import { Services } from '../../../Services/Services';
import { CostTabPage } from './CostTabPage';
import { CostTypes, IActivityInfo } from '../../../Bussiness/IActivityInfo';

export class ActivityDialog extends Dialog {
    public OkButtonClicked: any = new Event();
    private costTabPage: CostTabPage;
    private activityInfo: IActivityInfo;
    public override InitComponents() {
        this.Text = 'Activity Info';
        this.Width = 500;
        this.Height = 630;

        const tabControl = new TTabControl();
        this.costTabPage = new CostTabPage();
        tabControl.TabPages.Add(this.costTabPage);
        this.Controls.Add(tabControl);

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

        this.FooterControls.AddRange([btnOK, btnCancel]);
    }

    private clearForm() {
        this.costTabPage.chkFixedCost.Checked = false;
        this.costTabPage.chkAmount.Checked = false;
        this.costTabPage.txtAmount.Text = '';
    }
    public SetActivityInfo(activityInfo: IActivityInfo) {
        this.clearForm();
        this.activityInfo = activityInfo;
        this.costTabPage.SetActivityInfo(activityInfo);
    }
    private OnOKClick() {
        if (this.costTabPage.chkFixedCost.Checked) {
            this.activityInfo.costType = CostTypes.Fixed;
            try {
                this.activityInfo.amount = Convert.ToInt32(this.costTabPage.txtAmount.Text);
            } catch { }
        }
        this.OkButtonClicked();
        this.Hide();
    }

}
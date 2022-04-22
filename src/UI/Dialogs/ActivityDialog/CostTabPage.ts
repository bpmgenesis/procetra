import { TTabPage, FormLayout, RadioButtonGroup, TTextBox, Checkbox, Panel } from '@tuval/forms';
import { IActivityInfo, CostTypes } from '../../../Bussiness/IActivityInfo';
export class CostTabPage extends TTabPage {
    public chkFixedCost: Checkbox;
    public txtAmount: TTextBox;
    chkAmount: Checkbox;
    chkFromAttribute: Checkbox;
    txtFromAttribute: TTextBox;
    public override InitComponents() {
        this.Text = 'Cost';

        const layout = new FormLayout();

        this.chkFixedCost = new Checkbox();
        this.chkFixedCost.Text = 'Fixed cost ($)';
        this.chkFixedCost.CheckedChanged.add(this.chkFixedCost_CheckedChanged.bind(this));
        layout.Controls.Add(this.chkFixedCost);

        const panel = new Panel();

        this.chkAmount = new Checkbox();
        this.chkAmount.Text = 'Amount';
        this.chkAmount.CheckedChanged.add(this.chkFixedCost_CheckedChanged.bind(this));
        panel.Controls.Add(this.chkAmount);

        this.txtAmount = new TTextBox();
        this.txtAmount.Disabled = true;
        panel.Controls.Add(this.txtAmount);

       /*  this.chkFromAttribute = new Checkbox();
        this.chkFromAttribute.Text = 'From Attribute';
        this.chkFromAttribute.CheckedChanged.add(this.chkFixedCost_CheckedChanged.bind(this));
        panel.Controls.Add(this.chkFromAttribute);

        this.txtFromAttribute = new TTextBox();
        this.txtFromAttribute.Disabled = true;
        panel.Controls.Add(this.txtFromAttribute); */

        layout.Controls.Add(panel);

        this.Controls.Add(layout);
    }
    public SetActivityInfo(activityInfo: IActivityInfo) {
        if (activityInfo.costType === CostTypes.Fixed) {
            this.chkFixedCost.Checked = true;
        }
    }

    private chkFixedCost_CheckedChanged(state: boolean) {
        this.txtAmount.Disabled = !state;
    }
}
import { AppAndServicesListView } from './AppAndServicesListView';
import { ProductConnectorListView } from './ProductConnectorListView';
import { Checkbox, TTabPage, TTextBox } from '@tuval/forms';
import { CostTypes, IActivityInfo } from '../../../Bussiness/IActivityInfo';
import { FileConnectorListView } from './FileConnectorListView';
import { Event} from '@tuval/core';
import { SalesConnectorListView } from './SalesConnectorListView';

export class AppAndServicesTabPage extends TTabPage {

    public chkFixedCost: Checkbox;
    public txtAmount: TTextBox;
    chkAmount: Checkbox;
    chkFromAttribute: Checkbox;
    txtFromAttribute: TTextBox;
    public DPFSelected:Event<any>

    public override InitComponents() {
        this.Text = 'Cost';

        this.DPFSelected = new Event();
        const listview = new AppAndServicesListView();
        listview.DPFSelected.add(() => this.DPFSelected());
        this.Controls.Add(listview);
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
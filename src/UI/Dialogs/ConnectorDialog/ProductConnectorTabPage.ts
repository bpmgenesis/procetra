import { ProductConnectorListView } from './ProductConnectorListView';
import { Checkbox, TTabPage, TTextBox } from '@tuval/forms';
import { CostTypes, IActivityInfo } from '../../../Bussiness/IActivityInfo';
import { FileConnectorListView } from './FileConnectorListView';
import { Event } from '@tuval/core';

export class ProductConnectorTabPage extends TTabPage {

    public chkFixedCost: Checkbox;
    public txtAmount: TTextBox;
    chkAmount: Checkbox;
    chkFromAttribute: Checkbox;
    txtFromAttribute: TTextBox;
    public CsvFileClick: Event<any>
    public eBAConnectorSelected: Event<any>;

    public override InitComponents() {
        this.Text = 'Cost';

        this.CsvFileClick = new Event();
        this.eBAConnectorSelected = new Event();
        const listview = new ProductConnectorListView();
        listview.Selected.add(() => this.CsvFileClick());
        listview.eBAConnectorSelected.add(() => this.eBAConnectorSelected());
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
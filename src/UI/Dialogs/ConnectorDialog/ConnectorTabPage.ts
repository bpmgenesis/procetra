import { TTabPage, FormLayout, RadioButtonGroup, TTextBox, Checkbox, Panel } from '@tuval/forms';
import { IActivityInfo, CostTypes } from '../../../Bussiness/IActivityInfo';
import { ConnectorListView } from './ConnectorListView';
import {Event} from '@tuval/core';
export class ConnectorTabPage extends TTabPage {

    public chkFixedCost: Checkbox;
    public txtAmount: TTextBox;
    chkAmount: Checkbox;
    chkFromAttribute: Checkbox;
    txtFromAttribute: TTextBox;

    public MSSQLConnectorSelected:Event<any>;
    public MYSQLConnectorSelected:Event<any>;
    public PostgreSQLConnectorSelected:Event<any>;
    OracleConnectorSelected: Event<any>;
    MONGODBConnectorSelected: Event<any>;

    public override InitComponents() {
        this.Text = 'Cost';

        const listview = new ConnectorListView();
        this.Controls.Add(listview);

        this.MSSQLConnectorSelected = new Event();
        listview.MSSQLConnectorSelected.add(() => this.MSSQLConnectorSelected());

        this.MYSQLConnectorSelected = new Event();
        listview.MYSQLConnectorSelected.add(() => this.MYSQLConnectorSelected());

        this.PostgreSQLConnectorSelected = new Event();
        listview.PostgreSQLConnectorSelected.add(() => this.PostgreSQLConnectorSelected());

        this.OracleConnectorSelected = new Event();
        listview.OracleConnectorSelected.add(() => this.OracleConnectorSelected());

        this.MONGODBConnectorSelected = new Event();
        listview.MONGODBConnectorSelected.add(() => this.MONGODBConnectorSelected());
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
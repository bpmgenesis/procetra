import { MiningBrokerClient } from './ConnectorDialog/eBA/MiningBrokerClient';
import { GridView } from '@tuval/components/grids';
import { Event, instance as container, HttpClient } from '@tuval/core';
import { Button, GridColumn, ComboBox, Dialog, FormLayout, FormLayoutModes, MultiComboBox } from '@tuval/forms';
import { ProcessMining } from '../../Application';
import { CvsToJson } from '../../Logic/utils/csv2json';
import { IProjectService } from '../../Services/IProjectService';
import { detectSeparator } from '../../Services/LocalProjectService';
import { Services } from '../../Services/Services';

declare var d3;
export class ColumnMatchDialog extends Dialog {
    public OkButtonClicked: any = new Event();
    private csv: string;
    private caseCombo: ComboBox;
    private activityCombo: ComboBox;
    public override InitComponents() {
        this.Text = 'Match Event Data';
        this.Width = 900;
        this.Height = 630;

        this.caseCombo = new ComboBox();
        this.caseCombo.Label = 'Resource Column';

        this.activityCombo = new ComboBox();
        this.activityCombo.Label = 'Cost Column';

        const layout = new FormLayout();
        layout.Layout = FormLayoutModes.Vertical;

        layout.Controls.Add(this.caseCombo);
        layout.Controls.Add(this.activityCombo);

        this.Controls.Add(layout);

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
        this.caseCombo.Items.Clear();
        this.activityCombo.Items.Clear();
    }
    public SetCsvData(cols: string[]) {
        this.clearForm();
        //this.grid.Visible = false;

        for (let i = 0; i < cols.length; i++) {
            this.caseCombo.Items.Add(cols[i]);
            this.activityCombo.Items.Add(cols[i]);
        }
        /*   console.log('Convert pasladı', performance.now());
          const data = CvsToJson.Convert(csv, { parseNumbers: true });
          console.log('Convert convert bitti', performance.now()); */
    }
    private async OnOKClick() {
        const result = {};

        if (this.caseCombo.SelectedItem != null) {
            result['resource_key'] = this.caseCombo.SelectedItem.Text;
        }

        if (this.activityCombo.SelectedItem != null) {
            result['cost_key'] = this.activityCombo.SelectedItem.Text;
        }
        this.OkButtonClicked(result);
        this.Hide();
        //}
    }
}


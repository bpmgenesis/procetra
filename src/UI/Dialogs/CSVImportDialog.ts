import { MiningBrokerClient } from './ConnectorDialog/eBA/MiningBrokerClient';
import { GridView } from '@tuval/components/grids';
import { Event, instance as container, HttpClient } from '@tuval/core';
import { Button, GridColumn, ComboBox, Dialog, FormLayout, FormLayoutModes, MultiComboBox } from '@tuval/forms';
import { ProcessMining } from '../../Application';
import { CvsToJson } from '../../Logic/utils/csv2json';
import { IProjectService } from '../../Services/IProjectService';
import { detectSeparator } from '../../Services/LocalProjectService';
import { Services } from '../../Services/Services';
import { ColumnMatchDialog } from './ColumnMatch';

declare var d3;
export class CSVImportDialog extends Dialog {
    public OkButtonClicked: any = new Event();
    private csv: string;
    private grid: GridView;
    private caseCombo: ComboBox;
    private caseMultiSelect: MultiComboBox;
    private activityMultiSelect: MultiComboBox;
    private timestampCombo: ComboBox;
    private activityCombo: ComboBox;
    private startDateCombo: ComboBox;
    dateFormatCombo: ComboBox;
    private columns: string[] = [];
    private other_columns: any = {};
    public override InitComponents() {
        this.Text = 'Import Event Data';
        this.Width = 900;
        this.Height = 630;

        const matchDialog = new ColumnMatchDialog();
        this.Controls.Add(matchDialog);

        this.caseMultiSelect = new MultiComboBox();
        this.caseMultiSelect.Label = 'Case Column(s)';
        this.caseMultiSelect.Placeholder = '';

        this.activityMultiSelect = new MultiComboBox();
        this.activityMultiSelect.Label = 'Activity Column(s)';
        this.activityMultiSelect.Placeholder = '';
        //this.Controls.Add(this.caseMultiSelect);

        this.caseCombo = new ComboBox();
        this.caseCombo.Label = 'Case Column';

        this.activityCombo = new ComboBox();
        this.activityCombo.Label = 'Activity Column';

        this.timestampCombo = new ComboBox();
        this.timestampCombo.Label = 'Time Stamp';
        let lastFormat = '';
        /*  this.timestampCombo.OnChanged.add(()=>{
             const data = CvsToJson.Convert(this.csv, { parseNumbers: true });
             for(let i =0;i<data.length;i++) {
                 const timeString = data[i][this.timestampCombo.SelectedItem.Text];
                 const format = parseFormat(timeString);
                 if (lastFormat !== format) {
                     this.dateFormatCombo.Items.Add(format);
                     lastFormat = format;
                 }
             }
         }); */

        this.startDateCombo = new ComboBox();
        this.startDateCombo.Label = 'Start Date';

        /*  this.dateFormatCombo = new ComboBox();
         this.dateFormatCombo.Label = 'Date Format';
         this.dateFormatCombo.Items.Add('d.M.yy H:mm'); */

        const btnShowMatchDialog = new Button();
        btnShowMatchDialog.Text = 'Other...';
        btnShowMatchDialog.Color = 1;
        btnShowMatchDialog.Clicked = (() => {
            matchDialog.OkButtonClicked = (match) => {
                this.other_columns = match;
            };
            matchDialog.SetCsvData(this.columns);
            matchDialog.ShowDialog();
        }) as any;

        const layout = new FormLayout();
        layout.Layout = FormLayoutModes.VerticalGrid;
        layout.Controls.Add(this.caseMultiSelect);
        layout.Controls.Add(this.activityMultiSelect);
        //layout.Controls.Add(this.caseCombo);
        //layout.Controls.Add(this.activityCombo);
        layout.Controls.Add(this.timestampCombo);
        layout.Controls.Add(this.startDateCombo);
        layout.Controls.Add(btnShowMatchDialog);
        // layout.Controls.Add(this.dateFormatCombo);

        this.Controls.Add(layout);


        this.grid = new GridView();
        this.grid.Height = 300;
        this.Controls.Add(this.grid);

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
        this.timestampCombo.Items.Clear();
        this.startDateCombo.Items.Clear();

        this.caseMultiSelect.Items.Clear();
        this.activityMultiSelect.Items.Clear();
    }
    public SetCsvData(csv: string) {
        this.csv = csv;
        this.clearForm();
        this.grid.Loading = true;
        //this.grid.Visible = false;
        Services.ProjectService.ConvertCsvToJson(csv).then((data: any) => {
            for (let key in data[0]) {
                this.caseMultiSelect.Items.Add(key);
                this.activityMultiSelect.Items.Add(key);
                this.caseCombo.Items.Add(key);
                this.activityCombo.Items.Add(key);
                this.timestampCombo.Items.Add(key);
                this.startDateCombo.Items.Add(key);
                this.columns.push(key);

                const col = new GridColumn(key);
                col.field = key;
                this.grid.Columns.Add(col);
            }

            //this.grid.Visible = true;
            this.grid.DataSource = data;
            this.grid.Loading = false;
        });
        /*   console.log('Convert pasladı', performance.now());
          const data = CvsToJson.Convert(csv, { parseNumbers: true });
          console.log('Convert convert bitti', performance.now()); */
    }
    private async OnOKClick() {
        /*  if (this.caseCombo.SelectedItem != null && this.activityCombo.SelectedItem != null &&
             this.timestampCombo.SelectedItem != null && this.startDateCombo.SelectedItem != null) { */


        const data = new FormData();
        data.append('case_id', this.caseMultiSelect.SelectedItems.map(item => item.Text).join(';'));
        data.append('activity_key', this.activityMultiSelect.SelectedItems.map(item => item.Text).join(';'));
        data.append('timestamp_key', this.timestampCombo.SelectedItem.Text);
        data.append('start_timestamp_key', this.startDateCombo.SelectedItem.Text);
        data.append('resource_key', this.other_columns['resource_key']);
        data.append('cost_key', this.other_columns['cost_key']);
        data.append('sep', detectSeparator(this.csv));


        var parts = [
            new Blob([this.csv], { type: 'text/plain' })
        ];
        var file = new File(parts, 'csv.txt')

        data.append('file', file, 'test.csv');
        // data.append('csv', this.csv);

        /*  await HttpClient.Post('https://bpmgenesis.com/broker/mining/session/create_session/test');
         const res: any = await HttpClient.Post('https://bpmgenesis.com/broker/mining/v1/LoadCsv', data); */
        //await HttpClient.Post('https://bpmgenesis.com/broker/mining/session/create_session/test');
        const res: any = await MiningBrokerClient.ImportCsvFile(
            this.csv,
            'bpmgenesis',
            this.caseMultiSelect.SelectedItems.map(item => item.Text).join(';'),
            this.activityMultiSelect.SelectedItems.map(item => item.Text).join(';'),
            this.timestampCombo.SelectedItem.Text,
            this.startDateCombo.SelectedItem.Text,
            this.other_columns['resource_key'],
            this.other_columns['cost_key']
        );
        console.log(res);
        this.OkButtonClicked(res.log_id, res.csv,
            'case:concept:name',
            'concept:name',
            'time:timestamp',
            this.timestampCombo.SelectedItem.Text === this.startDateCombo.SelectedItem.Text ? 'time:timestamp' : 'start_timestamp',
                /* this.dateFormatCombo.SelectedItem != null ? this.dateFormatCombo.SelectedItem.Text :  */null);
        this.Hide();
        //}
    }
}


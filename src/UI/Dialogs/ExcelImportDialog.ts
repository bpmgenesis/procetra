import { ConfigService } from './../../Services/ConfigService';
import { Dialog, FormLayout, ComboBox, FormLayoutModes, Button, GridColumn, MultiComboBox } from '@tuval/forms';
import { Event, instance as container, ByteArray, HttpClient } from '@tuval/core';
import { IProjectService } from '../../Services/IProjectService';
import { CvsToJson } from '../../Logic/utils/csv2json';
import { GridView } from '@tuval/components/grids';
import { parseFormat } from '../../date/parseFormat';
import { ColumnMatchDialog } from './ColumnMatch';
declare var XLSX;
export class ExcelImportDialog extends Dialog {
    public OkButtonClicked: any = new Event();
    private csv: string;
    private grid: GridView;
    private sheetCombo: ComboBox;
    private caseCombo: MultiComboBox;
    private timestampCombo: ComboBox;
    private activityCombo: MultiComboBox;
    private startDateCombo: ComboBox;
    dateFormatCombo: ComboBox;
    private exelFileObject: File;
    private columns: string[] = [];
    other_columns: any = {};
    public override InitComponents() {
        this.Text = 'Import CSV';
        this.Width = 900;
        this.Height = 630;

        const matchDialog = new ColumnMatchDialog();
        this.Controls.Add(matchDialog);

        this.sheetCombo = new ComboBox();
        this.sheetCombo.Label = 'Sheets';

        this.caseCombo = new MultiComboBox();
        this.caseCombo.Label = 'Case Column';

        this.activityCombo = new MultiComboBox();
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
        layout.Controls.Add(this.sheetCombo);
        layout.Controls.Add(this.caseCombo);
        layout.Controls.Add(this.activityCombo);
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
        this.sheetCombo.Items.Clear();
        this.caseCombo.Items.Clear();
        this.activityCombo.Items.Clear();
        this.timestampCombo.Items.Clear();
        this.startDateCombo.Items.Clear();
    }
    public SetExcelData(excel: ByteArray, file: File) {
        this.exelFileObject = file;
        var workbook = XLSX.read(excel, { type: "array" });

        this.clearForm();

        for (let key in workbook.Sheets) {
            this.sheetCombo.Items.Add(key);
        }
        this.sheetCombo.SelectedItem = this.sheetCombo.Items.Get(0);

        this.csv = XLSX.utils.sheet_to_csv(workbook.Sheets[this.sheetCombo.Items.Get(0).Text]);
        const data = CvsToJson.Convert(this.csv, { parseNumbers: true });

        for (let key in data[0]) {
            this.caseCombo.Items.Add(key);
            this.activityCombo.Items.Add(key);
            this.timestampCombo.Items.Add(key);
            this.startDateCombo.Items.Add(key);
            this.columns.push(key);

            const col = new GridColumn(key);
            col.field = key;
            this.grid.Columns.Add(col);
        }

        this.grid.DataSource = data;

    }
    private async OnOKClick() {
        if (this.caseCombo.SelectedItems.length > 0 && this.activityCombo.SelectedItems.length > 0 &&
            this.timestampCombo.SelectedItem != null && this.startDateCombo.SelectedItem != null) {
            const data = new FormData();
            data.append('case_column_name', this.caseCombo.SelectedItems.map(item => item.Text).join(';'));
            data.append('activity_column_name', this.activityCombo.SelectedItems.map(item => item.Text).join(';'));
            data.append('timestamp_key', this.timestampCombo.SelectedItem.Text);
            data.append('start_timestamp_key', this.startDateCombo.SelectedItem.Text);
            data.append('sheet_name', this.sheetCombo.SelectedItem.Text);

            data.append('resource_key',  this.other_columns['resource_key']);
            data.append('cost_key', this.other_columns['cost_key']);

            data.append('file', this.exelFileObject, this.exelFileObject.name);

            // await HttpClient.Post('https://bpmgenesis.com/broker/mining/session/create_session/test');
            const res: any = await HttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'LoadXlsx', data, {
                headers: {
                    "Content-Encoding": "gzip"
                }
            });
            console.log(res);
            this.OkButtonClicked(res.data.log_id, res.data.csv,
                'case:concept:name',
                'concept:name',
                'time:timestamp',
                this.timestampCombo.SelectedItem.Text === this.startDateCombo.SelectedItem.Text ? 'time:timestamp' : 'start_timestamp',
                        /* this.dateFormatCombo.SelectedItem != null ? this.dateFormatCombo.SelectedItem.Text :  */null);
            this.Hide();
        }
    }
}
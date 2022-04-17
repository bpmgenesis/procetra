import { GridView } from '@tuval/components/grids';
import { ColumnsModel, QueryBuilderEx } from '@tuval/components/query-builder';
import { Event } from '@tuval/core';
import { Button, ComboBox, Dialog } from '@tuval/forms';
import { IDataSet } from '../../Bussiness/IDataSet';
import { IProject } from '../../Bussiness/IProject';
import { Services } from '../../Services/Services';


export class FilterDialog extends Dialog {
    public OkButtonClicked: any = new Event();
    private csv: string;
    private grid: GridView;
    private caseCombo: ComboBox;
    private timestampCombo: ComboBox;
    private activityCombo: ComboBox;
    private startDateCombo: ComboBox;
    dateFormatCombo: ComboBox;
    private queryBuilder: QueryBuilderEx;
    private dataset: IDataSet;
    private project: IProject;
    public override InitComponents() {
        this.Text = 'Filter Dataset';
        this.Width = 900;
        this.Height = 630;

        this.queryBuilder = new QueryBuilderEx();
        this.queryBuilder.Rule = null;
        this.Controls.Add(this.queryBuilder);

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
        this.queryBuilder.DataSource = null;
        this.queryBuilder.Rule = null;
        this.queryBuilder.Columns = null;
        /*  this.caseCombo.Items.Clear();
         this.activityCombo.Items.Clear();
         this.timestampCombo.Items.Clear();
         this.startDateCombo.Items.Clear(); */
    }
    private columnText: string = '';
    public SetDataset(project: IProject, dataset: IDataSet) {
        this.project = project;
        this.dataset = dataset;
        let data;
        if (dataset.ParentDataSetId) {
            Services.ProjectService.GetDatasetAsData(dataset.ProjectId, dataset.ParentDataSetId).then(data => {


                this.clearForm();

                let columnData: ColumnsModel[] = [
                    /*  { field: 'EmployeeID', label: 'Employee ID', type: 'number' },
                     { field: 'FirstName', label: 'First Name', type: 'string' },
                     { field: 'TitleOfCourtesy', label: 'Title Of Courtesy', type: 'boolean', values: ['Mr.', 'Mrs.'] },
                     { field: 'Title', label: 'Title', type: 'string' },
                     { field: 'HireDate', label: 'Hire Date', type: 'date', format: 'dd/MM/yyyy' },
                     { field: 'Country', label: 'Country', type: 'string' },
                     { field: 'City', label: 'City', type: 'string' } */
                ];

                 for (let key in data[0]) {
                    if (key === dataset.StartDateColumn || key === dataset.TimeStampColumn) {
                        columnData.push({ field: key, label: key, type: 'date', format: 'YYYY-MM-DD' });
                    } else {
                        columnData.push({ field: key, label: key, type: 'string' });
                    }
                    this.columnText += key + ',';
                }
                this.queryBuilder.DataSource = data;
                this.queryBuilder.Columns = columnData;
                /* if (dataset.ConditionRules) {
                    this.queryBuilder.Rule = JSON.parse(dataset.ConditionRules);
                } */
            });


        }
    }
    private OnOKClick() {
        this.queryBuilder.GetFilteredRecords().then((data) => {

            Services.ProjectService.SetDatasetFilteredData(this.dataset.ProjectId, this.dataset.Id, data.result).then(result=>{
                this.Hide();

                this.OkButtonClicked(this.dataset);
            });
           /*  this.dataset.FilteredData = data.result;
            this.dataset.ConditionRules = this.queryBuilder.ToJSON(); */


        });

    }
}
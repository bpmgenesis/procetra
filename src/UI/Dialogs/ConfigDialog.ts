import { ActivityDialog } from './ActivityDialog/ActivityDialog';
import { GridView } from '@tuval/components/grids';
import { Event, instance as container } from '@tuval/core';
import { Button, ComboBox, Dialog, FormLayout, FormLayoutModes, TTabControl, TTabPage, GridColumn, TextAlign } from '@tuval/forms';
import { ProcessMining } from '../../Application';
import { CvsToJson } from '../../Logic/utils/csv2json';
import { IProjectService } from '../../Services/IProjectService';
import { Services } from '../../Services/Services';
import { IActivityInfo, CostTypes } from '../../Bussiness/IActivityInfo';
import { IActivityInfoBag } from '../../Bussiness/IDataSet';

var str = "Java Script Object Notation";

function getAcronym(str: string): string {
    var matches = str.match(/\b(\w)/g); // ['J','S','O','N']
    var acronym = matches.join(''); // JSON
    return acronym;
}
export class ConfigDialog extends Dialog {
    public OkButtonClicked: any = new Event();
    private grid: GridView;
    private costDialog: ActivityDialog;
    private Data: IActivityInfo[] = [];
    public override InitComponents() {
        this.Text = 'Dataset Config';
        this.Width = 700;
        this.Height = 630;

        this.InitNanVisualComponents();

        const tabControl = new TTabControl();

        const costTabPage = new TTabPage();
        costTabPage.Text = 'Activities';


        this.costDialog.OkButtonClicked = () => {
            this.grid.Refresh();
        };

        this.grid = new GridView();
        const indexCol = new GridColumn('index', 'Index');
        indexCol.headerTextAlign = TextAlign.Center;
        indexCol.textAlign = TextAlign.Center;
        indexCol.width = 80;

        const iconCol = new GridColumn('icon', 'Icon');
        iconCol.width = 80;
        iconCol.formatter = {
            getValue: (column: any, data: IActivityInfo): Object => {
                return `
                <svg width="30" height="30">
  <circle cx="15" cy="15" r="12" fill="#aeaeae" />
  <text x="50%" y="50%" text-anchor="middle" fill="white" font-size="12px" font-family="Arial" dy=".3em">${getAcronym(data.name)}</text>
Sorry, your browser does not support inline SVG.
</svg>
`;
            }
        }
        const nameCol = new GridColumn('name', 'Activity Name');

        const fixedCostCol = new GridColumn('fixedCost', 'Fixed Cost');
        fixedCostCol.textAlign = TextAlign.Center;
        fixedCostCol.formatter = {
            getValue: (column: any, data: IActivityInfo): Object => {
                return data.costType === CostTypes.Fixed ? `<i class="pi pi-check"></i>` : '<i></i>';
            }
        }
        const timeBaseCostCol = new GridColumn('timeBaseCost', 'Time Base Cost');

        this.grid.Columns.Add(indexCol);
        this.grid.Columns.Add(iconCol);
        this.grid.Columns.Add(nameCol);

        this.grid.Columns.Add(fixedCostCol);
        this.grid.Columns.Add(timeBaseCostCol);

        this.grid.RecordDoubleClicked = (e) => {
            console.log(e);
            this.costDialog.SetActivityInfo(e.rowData);
            this.costDialog.ShowDialog();
        };
        this.grid.Height = 360;
        costTabPage.Controls.Add(this.grid);

        tabControl.AddTabPage(costTabPage);

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
    private InitNanVisualComponents() {
        this.costDialog = new ActivityDialog();
        this.Controls.Add(this.costDialog);
    }

    private clearForm() {

    }
    public SetDataset(projectId: string, datasetId: string) {
        this.grid.Loading = true;
        Services.ProjectService.GetActivities(projectId, datasetId).then((activities: string[]) => {
            Services.ProjectService.GetActivityInfo(projectId, datasetId).then((activityInfoBag: IActivityInfoBag) => {
                for (let i = 0; i < activities.length; i++) {
                    this.Data.push({
                        'index': i,
                        'icon': 'IC',
                        'name': activities[i],
                        'costType': activityInfoBag[activities[i]]?.costType ?? CostTypes.None
                    });
                }
            });
            /* for (let key in data[0]) {
                this.caseCombo.Items.Add(key);
                this.activityCombo.Items.Add(key);
                this.timestampCombo.Items.Add(key);
                this.startDateCombo.Items.Add(key);

                const col = new Column(key);
                col.Field = key;
                this.grid.Columns.Add(col);
            } */


            this.grid.DataSource = this.Data;
            this.grid.Loading = false;
        });

    }
    private OnOKClick() {

        this.OkButtonClicked(this.grid.DataSource);

    }

}
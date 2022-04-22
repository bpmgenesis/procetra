import { GridView } from '@tuval/components/grids';
import { int } from '@tuval/core';
import { Padding, PaddingApplies, TTabControl, TTabPage, Button } from '@tuval/forms';
import { IDataSet } from '../../Bussiness/IDataSet';
import { Services } from '../../Services/Services';
import { CasesTabPage } from './CasesTabPage/CasesTabPage';
import { DashboardTabPage } from './DashboardTabPage/DashboardTabPage';
import { FiltersTabPage } from './FiltersTabPage/FiltersTabPage';
import { ModelTabPage } from './ModelTabPage/ModelTabPage';
import { StatisticTabPage } from './StatisticTabPage/StatisticTabPage';
import { VariantsTabPage } from './VariantsTabPage/VariantsTabPage';
export class DataSetTabPage extends TTabPage {
    private DataSet: IDataSet;
    private grid: GridView;
    tabPageStatistic: StatisticTabPage;
    tabPageModel: ModelTabPage;
    variantsTabPage: VariantsTabPage;
    tabPageCases: CasesTabPage;
    private tabControl: TTabControl;
    tabPageDashboard: DashboardTabPage;
    public constructor() {
        super();
        this.tabControl = new TTabControl();
        this.tabControl.Padding = new Padding(0, 10, 0, 0, PaddingApplies.Top);
        this.tabControl.SelectedIndexChanged.add(this.OnTabControlSelectedIndexChanged.bind(this));
        this.Controls.Add(this.tabControl);

        const tabPageDataSet = new TTabPage();
        tabPageDataSet.Text = 'Data';
        this.tabControl.TabPages.Add(tabPageDataSet);

        const tabPageFilters = new FiltersTabPage();
        tabPageFilters.Text = 'Filters';
        this.tabControl.TabPages.Add(tabPageFilters);

        this.tabPageDashboard = new DashboardTabPage();
        this.tabPageDashboard.Text = 'Dashboard';
        this.tabControl.TabPages.Add(this.tabPageDashboard);


        this.tabPageModel = new ModelTabPage();
        this.tabPageModel.Text = 'Process Explorer';
        this.tabControl.TabPages.Add(this.tabPageModel);

        this.tabPageStatistic = new StatisticTabPage();
        this.tabPageStatistic.Text = 'Statistic';
        this.tabControl.TabPages.Add(this.tabPageStatistic);

        this.variantsTabPage = new VariantsTabPage();
        this.tabControl.TabPages.Add(this.variantsTabPage);

        this.tabPageCases = new CasesTabPage();
        this.tabPageCases.Text = 'Case Explorer';
        this.tabControl.TabPages.Add(this.tabPageCases);


        /*  this.fielsCombo = new ComboBox();
         this.Controls.Add(this.fielsCombo); */


         const button = new Button();
         button.Text = 'Export';
         //tabPageDataSet.Controls.Add(button);
         button.Clicked.add(() => {
             this.grid.ExportCsv();
         });


        this.grid = new GridView();
        this.grid.Height = 290;
        this.grid.AutoGenerateColumns = false;
        this.grid.AllowExcelExport = true;
        tabPageDataSet.Controls.Add(this.grid);
        /*
                EventBus.Default.on('tuval.desktop.onresize', (e) => {
                    if (e.name === 'ProcessMaining::MainForm') {

                    }
                }); */

        setTimeout(() => this.SendResizeRequest(), 100);

    }

    private OnTabControlSelectedIndexChanged(index: int) {
        if (index === 2 && !this.tabPageDashboard.Tag) {
            this.tabPageDashboard.Tag = true;
            this.tabPageDashboard.SetDataSet(this.DataSet);
        }

        if (index === 3 && !this.tabPageStatistic.Tag) {
            this.tabPageModel.Tag = true;
            this.tabPageModel.SetDataSet(this.DataSet);

        }
        if (index === 4 && !this.tabPageStatistic.Tag) {
            this.tabPageStatistic.Tag = true;
            this.tabPageStatistic.SetDataSet(this.DataSet);
        }
        if (index === 5 && !this.variantsTabPage.Tag) {
            this.variantsTabPage.Tag = true;
            this.variantsTabPage.SetDataSet(this.DataSet);
        }
        if (index === 6 && !this.tabPageCases.Tag) {
            this.tabPageCases.Tag = true;
            this.tabPageCases.SetDataSet(this.DataSet);
        }
    }
    public SetDataSet(dataset: IDataSet): void {
        this.DataSet = dataset;
        this.grid.Loading = true;
        Services.ProjectService.GetDatasetAsData(dataset.ProjectId, dataset.Id).then(data => {
            this.grid.DataSource = data;
            this.grid.Loading = false;
        });
    }
    public override OnFormResized(w: int, h: int) {
        super.OnFormResized(w, h);
        if (this.grid) {
            this.grid.Height = h - 320;
        }
    }
}
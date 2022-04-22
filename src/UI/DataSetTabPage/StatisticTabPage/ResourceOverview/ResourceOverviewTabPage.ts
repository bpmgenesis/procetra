import { TTabPage, SelectButton, ScrollPanel } from '@tuval/forms';
import { Convert, int } from '@tuval/core';
import { IDataSet } from '../../../../Bussiness/IDataSet';
import { MiningBrokerClient } from '../../../Dialogs/ConnectorDialog/eBA/MiningBrokerClient';
import { ResourceOverviewGrid } from './ResourceOverviewGrid';
import { ResourceOverviewChartTabControl } from './ResourceOverviewChartTabControl';

export class ResourceOverviewTabPage extends TTabPage {
    grid: ResourceOverviewGrid;
    panel: ScrollPanel;
    chartTab: ResourceOverviewChartTabControl;
    gridTypeSelect: SelectButton;
    data: any[];
    startActs: any[];
    endActs: any[];
    private freqChartRefreshed: boolean = false;
    private meanChartRefreshed: boolean = false;
    private meadianChartRefreshed: boolean = false;
    private durationChartRefreshed: boolean = false;
    private eventOverTimeChartRefreshed: boolean = false;

    protected InitComponents(): void {

        const selectButton1 = new SelectButton();
        selectButton1.OptionLabel = 'name';
        selectButton1.OptionValue = 'value';
        selectButton1.Value = '0';
        selectButton1.Changed.add((value) => {
            this.chartTab.SetActiveChart(Convert.ToInt32(value));
        });
        selectButton1.Options = [
            {
                name: 'Frequency',
                value: "0"
            },
            {
                name: 'Mean duration',
                value: "1"
            },
            {
                name: 'Median duration',
                value: "2"
            },
            {
                name: 'Duration range',
                value: "3"
            },
            {
                name: 'Events overtime',
                value: "4"
            }];

        // this.Controls.Add(selectButton1);


        // this.Controls.Add(this.chart);

        this.grid = new ResourceOverviewGrid();

        // this.Controls.Add(this.grid);

        this.chartTab = new ResourceOverviewChartTabControl();
        this.chartTab.ShowHeader = false;
        let refreshed = false;


        this.gridTypeSelect = new SelectButton();
        this.gridTypeSelect.OptionLabel = 'name';
        this.gridTypeSelect.OptionValue = 'value';
        this.gridTypeSelect.Value = '0';
        this.gridTypeSelect.Changed.add((value) => {
            if (value === '0') {
                this.grid.DataSource = this.data;
            } else if (value === '1') {
                this.grid.DataSource = this.data.filter(item => this.startActs.indexOf(item['concept:name']) > -1);
            } else if (value === '2') {
                this.grid.DataSource = this.data.filter(item => this.endActs.indexOf(item['concept:name']) > -1);
            }

            this.grid.Refresh();
        });


        this.panel = new ScrollPanel();
        this.panel.Height = 500;
        this.panel.Controls.Add(selectButton1);
        this.panel.Controls.Add(this.chartTab);
        this.panel.Controls.Add(this.gridTypeSelect);
        this.panel.Controls.Add(this.grid);
        //this.Controls.Add(this.panel);

        this.Controls.Add(this.panel);
    }
    public async Bind(dataset: IDataSet) {
        //this.chart1();
        this.data = await MiningBrokerClient.GetResourceOverview(dataset.Id) as any;
        this.chartTab.Bind(this.data);
        this.grid.DataSource = this.data;

        const startact = await MiningBrokerClient.GetStartItems(dataset.Id, 'org:resource');
        const endact = await MiningBrokerClient.GetEndItems(dataset.Id, 'org:resource');
        this.startActs = [];
        this.endActs = [];
        for (let key in startact) {
            this.startActs.push(key);
        }

        for (let key in endact) {
            this.endActs.push(key);
        }
        this.gridTypeSelect.Options = [
            {
                name: `All Resources (${this.data.length})`,
                value: '0'
            },
            {
                name: `First In Case (${this.startActs.length})`,
                value: '1'
            },
            {
                name: `Last In Case (${this.endActs.length})`,
                value: '2'
            }];
    }
    public override OnFormResized(w: int, h: int) {
        if (this.panel) {
            this.panel.Height = h - 220;
        }
    }
}
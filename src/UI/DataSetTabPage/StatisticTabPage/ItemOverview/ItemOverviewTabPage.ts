import { ItemFrequencyChart } from './ItemFrequencyChart';
import { TTabPage, SelectButton, ScrollPanel } from '@tuval/forms';
import { Convert, int } from '@tuval/core';
import { IDataSet } from '../../../../Bussiness/IDataSet';
import { MiningBrokerClient } from '../../../Dialogs/ConnectorDialog/eBA/MiningBrokerClient';
import { ItemOverviewGrid } from './ItemOverviewGrid';

export class ItemOverviewTabPage extends TTabPage {
    grid: ItemOverviewGrid;
    panel: ScrollPanel;

    gridTypeSelect: SelectButton;
    data: any[];
    startActs: any[];
    endActs: any[];
    private item_name: string;
    private freqChartRefreshed: boolean = false;
    private meanChartRefreshed: boolean = false;
    private meadianChartRefreshed: boolean = false;
    private durationChartRefreshed: boolean = false;
    private eventOverTimeChartRefreshed: boolean = false;
    chart: ItemFrequencyChart;

    protected InitComponents(): void {



        this.grid = new ItemOverviewGrid();
        this.gridTypeSelect = new SelectButton();
        this.gridTypeSelect.OptionLabel = 'name';
        this.gridTypeSelect.OptionValue = 'value';
        this.gridTypeSelect.Value = '0';
        this.gridTypeSelect.Changed.add((value) => {
            if (value === '0') {
                this.grid.DataSource = this.data;
            } else if (value === '1') {

                this.grid.DataSource = this.data.filter(item => this.startActs.indexOf(item['item_name']) > -1);
            } else if (value === '2') {
                this.grid.DataSource = this.data.filter(item => this.endActs.indexOf(item['item_name']) > -1);
            }

            this.grid.Refresh();
        });

        this.chart = new ItemFrequencyChart();

        this.panel = new ScrollPanel();
        this.panel.Height = 500;

        this.panel.Controls.Add(this.chart);
        this.panel.Controls.Add(this.gridTypeSelect);
        this.panel.Controls.Add(this.grid);
        //this.Controls.Add(this.panel);

        this.Controls.Add(this.panel);
    }
    public async Bind(dataset: IDataSet, item_name: string) {

        //this.chart1();
        this.data = await MiningBrokerClient.GetItemOverview(dataset.Id, item_name);

        this.item_name = item_name;

        this.chart.Bind(this.data, this.item_name);

        this.grid.DataSource = this.data;

        const startact = await MiningBrokerClient.GetStartItems(dataset.Id, item_name);
        const endact = await MiningBrokerClient.GetEndItems(dataset.Id, item_name);

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
                name: `All Items (${this.data.length})`,
                value: '0'
            },
            {
                name: `Start Items (${this.startActs.length})`,
                value: '1'
            },
            {
                name: `End Items (${this.endActs.length})`,
                value: '2'
            }];
    }
    public override OnFormResized(w: int, h: int) {
        if (this.panel) {
            this.panel.Height = h - 220;
        }
    }
    public Refresh() {
        this.chart.IsHide = true;
        setTimeout(()=>{
            this.chart.Refresh();
            this.chart.IsHide = false;
        }, 10);
    }
}
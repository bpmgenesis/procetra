import { TTabPage, SelectButton, ScrollPanel } from '@tuval/forms';
import { Convert, int } from '@tuval/core';
import { IDataSet } from '../../../../Bussiness/IDataSet';
import { CaseOverviewChartTabControl } from './CaseOverviewChartTabControl';
import { CaseOverviewGrid } from './CaseOverviewGrid';
import { MiningBrokerClient } from '../../../Dialogs/ConnectorDialog/eBA/MiningBrokerClient';

export class CaseOverviewTabPage extends TTabPage {
    grid: CaseOverviewGrid;
    panel: ScrollPanel;
    chartTab: CaseOverviewChartTabControl;
    gridTypeSelect: SelectButton;
    data: any;
    startActs: any[];
    endActs: any[];

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
                name: 'Events overtime',
                value: "0"
            },
            /* {
                name: 'Active cases overtime',
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
            } */];

        // this.Controls.Add(selectButton1);


        // this.Controls.Add(this.chart);

        this.grid = new CaseOverviewGrid();

        // this.Controls.Add(this.grid);

        this.chartTab = new CaseOverviewChartTabControl();
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
        this.data = await MiningBrokerClient.GetEventDataInfo(dataset.Id);
        this.chartTab.Bind(dataset.Id);
        this.grid.DataSource = this.data.CaseInfo;

        const startact = await MiningBrokerClient.GetStartActivities(dataset.Id);
        const endact = await MiningBrokerClient.GetEndActivities(dataset.Id);
        this.startActs = [];
        this.endActs = [];
        for (let key in startact) {
            this.startActs.push(key);
        }

        for (let key in endact) {
            this.endActs.push(key);
        }
        //alert(JSON.stringify(this.data));
        this.gridTypeSelect.Options = [
            {
                name: `Cases (${this.data.CaseInfo.length})`,
                value: '0'
            }/* ,
            {
                name: `Start Activities (${this.startActs.length})`,
                value: '1'
            },
            {
                name: `End Activities (${this.endActs.length})`,
                value: '2'
            } */];
    }
    public override OnFormResized(w: int, h: int) {
        if (this.panel) {
            this.panel.Height = h - 220;
        }
    }
}
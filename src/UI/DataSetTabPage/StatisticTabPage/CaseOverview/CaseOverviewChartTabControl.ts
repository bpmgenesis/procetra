import { TTabControl, TTabPage } from '@tuval/forms';
import { EventsOverTimeChart } from './Charts/EventsOverTimeChart';
import { int } from '@tuval/core';
import { MiningBrokerClient } from '../../../Dialogs/ConnectorDialog/eBA/MiningBrokerClient';

export class CaseOverviewChartTabControl extends TTabControl {
    eventsOverTimeChart: EventsOverTimeChart;
    data: any;
    public constructor() {
        super();
       /*  this.chart = new FrequencyChart();

        const freqChartTabPage = new TTabPage();
        freqChartTabPage.Text = 'Frequency';
        freqChartTabPage.Controls.Add(this.chart);
        this.TabPages.Add(freqChartTabPage);

        this.meanChart = new MeanChart();
        this.meanChart.Visible = false;

        const meanChartTabPage = new TTabPage();
        meanChartTabPage.Text = 'Mean duration';
        meanChartTabPage.Controls.Add(this.meanChart);
        this.TabPages.Add(meanChartTabPage);


        this.medianChart = new MedianChart();
        this.medianChart.Visible = false;

        const medianChartTabPage = new TTabPage();
        medianChartTabPage.Text = 'Median duration';
        medianChartTabPage.Controls.Add(this.medianChart);
        this.TabPages.Add(medianChartTabPage);


        this.durationChart = new DurationChart();

        const durationChartTabPage = new TTabPage();
        durationChartTabPage.Text = 'Median duration';
        durationChartTabPage.Controls.Add(this.durationChart);
        this.TabPages.Add(durationChartTabPage); */

        this.eventsOverTimeChart = new EventsOverTimeChart();
        this.eventsOverTimeChart.Height = 400;

        const eventsOverTimeTabPage = new TTabPage();
        eventsOverTimeTabPage.Text = 'Events Overtime';
        eventsOverTimeTabPage.Controls.Add(this.eventsOverTimeChart);
        this.TabPages.Add(eventsOverTimeTabPage);

        this.SelectedIndexChanged.add((index) => {
            if (index === 0) {
                alert('');
                this.eventsOverTimeChart.Refresh();
            }
        });
        //alert('component init');
    }

    public async Bind(log_id: string) {
        const data = await MiningBrokerClient.GetEventsOverTime(log_id)
        this.data = data;
        this.eventsOverTimeChart.SetChartData(this.data);
    }

    public SetActiveChart(index: int) {
        this.ActiveIndex = index;
        if (index === 0) {
            this.eventsOverTimeChart.IsHide = true;
            setTimeout(() => {
                this.eventsOverTimeChart.Refresh();
                this.eventsOverTimeChart.IsHide = false;
            }, 10);
        } else if (index === 1) {
           /*  this.meanChart.IsHide = true;
            setTimeout(() => {
                this.meanChart.Refresh();
                this.meanChart.IsHide = false;
            }, 10); */
        } else if (index === 2) {
          /*   this.medianChart.IsHide = true;
            setTimeout(() => {
                this.medianChart.Refresh();
                this.medianChart.IsHide = false;
            }, 10); */
        } else if (index === 3) {
           /*  this.durationChart.IsHide = true;
            setTimeout(() => {
                this.durationChart.Refresh();
                this.durationChart.IsHide = false;
            }, 10); */
        }
    }

}
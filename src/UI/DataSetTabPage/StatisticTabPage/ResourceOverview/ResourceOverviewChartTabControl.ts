import { TTabControl, TTabPage } from '@tuval/forms';
import { EventsOverTimeChart } from '../CaseOverview/Charts/EventsOverTimeChart';
import { int } from '@tuval/core';
import { FrequencyChart } from './Charts/FrequencyChart';
import { MeanChart } from './Charts/MeanChart';

export class ResourceOverviewChartTabControl extends TTabControl {
    data: any;
    chart: FrequencyChart;
    meanChart: MeanChart;
    public constructor() {
        super();
        this.chart = new FrequencyChart();

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

        this.SelectedIndexChanged.add((index) => {
            if (index === 0) {
                alert('');
                this.chart.Refresh();
            }
        });
    }

    public Bind(data: any) {
        this.data = data;
        this.chart.SetChartData(this.data);
        this.meanChart.SetChartData(this.data);

    }

    public SetActiveChart(index: int) {
        this.ActiveIndex = index;
        if (index === 0) {
            this.chart.IsHide = true;
            setTimeout(() => {
                this.chart.Refresh();
                this.chart.IsHide = false;
            }, 10);
        } else if (index === 1) {
            this.meanChart.IsHide = true;
            setTimeout(() => {
                this.meanChart.Refresh();
                this.meanChart.IsHide = false;
            }, 10);
        } else if (index === 2) {
            /* this.medianChart.IsHide = true;
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
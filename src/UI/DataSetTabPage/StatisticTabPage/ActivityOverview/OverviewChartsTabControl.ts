import { TTabControl, TTabPage } from '@tuval/forms';
import { DurationChart } from './Charts/DurationChart';
import { EventsOverTimeChart } from '../CaseOverview/Charts/EventsOverTimeChart';
import { FrequencyChart } from './Charts/FrequencyChart';
import { MeanChart } from './Charts/MeanChart';
import { MedianChart } from './Charts/MedianChart';
import { int } from '@tuval/core';

export class OverviewChartTabControl extends TTabControl {
    chart: FrequencyChart;
    meanChart: MeanChart;
    medianChart: MedianChart;
    durationChart: DurationChart;
    eventsOverTimeChart: EventsOverTimeChart;
    data: any;
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
        this.TabPages.Add(durationChartTabPage);

        this.eventsOverTimeChart = new EventsOverTimeChart();
        this.eventsOverTimeChart.Height = 400;

        const eventsOverTimeTabPage = new TTabPage();
        eventsOverTimeTabPage.Text = 'Events Overtime';
        eventsOverTimeTabPage.Controls.Add(this.eventsOverTimeChart);
        this.TabPages.Add(eventsOverTimeTabPage);

        this.SelectedIndexChanged.add((index) => {
            if (index === 0) {
                alert('');
                this.chart.Refresh();
            }
        });
        //alert('component init');
    }

    public Bind(data: any) {
        this.data = data;
        this.chart.SetChartData(this.data);
        this.meanChart.SetChartData(this.data);
        this.meanChart.Title = 'Mean Activity Count';
        this.medianChart.SetChartData(this.data);
        this.durationChart.SetChartData(this.data);
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
            this.medianChart.IsHide = true;
            setTimeout(() => {
                this.medianChart.Refresh();
                this.medianChart.IsHide = false;
            }, 10);
        } else if (index === 3) {
            this.durationChart.IsHide = true;
            setTimeout(() => {
                this.durationChart.Refresh();
                this.durationChart.IsHide = false;
            }, 10);
        }
    }

}
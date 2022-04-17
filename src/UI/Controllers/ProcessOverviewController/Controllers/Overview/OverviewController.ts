import { int } from '@tuval/core';
import { TvChart } from '@tuval/components/charts';
import { UIController, UIView, VStack, PositionTypes, Alignment, State } from '@tuval/forms';
import { EventsOverTimeChart } from '../../../../DataSetTabPage/StatisticTabPage/CaseOverview/Charts/EventsOverTimeChart';
import { ActivitySection } from './Views/ActivitySection';
import { HappyPathSection } from './Views/HappyPathSection';
import { MetricsSection } from './Views/MetricsSection';

export class OverviewController extends UIController {
    @State()
    private chart: EventsOverTimeChart;

    protected InitController(): void {
        this.chart = new EventsOverTimeChart();

        const map = new Map<int, any>();

        // this.map = [];
        for (let i = 0; i < 100; i++) {
            map[i] = i;
        }

        this.chart.SetChartData(map);
    }

    public LoadView(): UIView {
        return (
            VStack(
                MetricsSection({ chart: this.chart }),
                HappyPathSection(),
                ActivitySection(['Activity 1', 'Activity 2', 'Activity 3', 'Activity 4', 'Activity 5'])
            ).position(PositionTypes.Absolute).alignment(Alignment.topLeading)
        )
    }
}
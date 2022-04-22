import { UIController, UIView, Text, VStack, PositionTypes, Alignment } from '@tuval/forms';
import { BottleneckSection } from './View/BottleneckSection';
import { ThroughputTimeSection } from './View/ThroughputTimeSection';
import { EventsOverTimeChart } from './../../../../UI/Controls/EventsOverTimeChart/EventsOverTimeChart';
import { int } from '@tuval/core';

export class ThroughputTimesController extends UIController {

    public chart:EventsOverTimeChart;
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
            VStack({ spacing: 20 })(
                ThroughputTimeSection(this.chart),
                BottleneckSection(),
                /* HappyPathSection(),
                ActivitySection(['Activity 1', 'Activity 2', 'Activity 3', 'Activity 4', 'Activity 5']) */
            )
                .position(PositionTypes.Absolute)
                .alignment(Alignment.topLeading)
        )
    }
}
import { MVIActivityBox } from './Views/ActivityBox';
import { int } from '@tuval/core';
import { TvChart } from '@tuval/components/charts';
import { UIController, UIView, VStack, PositionTypes, Alignment, State } from '@tuval/forms';
import { EventsOverTimeChart } from '../../../../DataSetTabPage/StatisticTabPage/CaseOverview/Charts/EventsOverTimeChart';
import { ActivitySection } from './Views/ActivitySection';
import { HappyPathSection } from './Views/HappyPathSection';
import { MetricsSection } from './Views/MetricsSection';

const testActivitySectionModel: MVIActivityBox[] = [
    {
        activityName: 'Activity 1',
        casePercentage: 14,
        eventCount: 40463
    },
    {
        activityName: 'Activity 2',
        casePercentage: 14,
        eventCount: 40463
    },
    {
        activityName: 'Activity 3',
        casePercentage: 14,
        eventCount: 40463
    },
    {
        activityName: 'Activity 4',
        casePercentage: 14,
        eventCount: 40463
    },
    {
        activityName: 'Activity 5',
        casePercentage: 14,
        eventCount: 40463
    }
]
export class OverviewController extends UIController {
    @State()
    private chart: EventsOverTimeChart;

    @State()
    private activitySectionModel: MVIActivityBox[];

    protected InitController(): void {
        this.chart = new EventsOverTimeChart();

        const map = new Map<int, any>();

        // this.map = [];
        for (let i = 0; i < 100; i++) {
            map[i] = i;
        }

        this.chart.SetChartData(map);

        this.activitySectionModel = testActivitySectionModel;
    }

    public LoadView(): UIView {
        return (
            VStack(
                MetricsSection({ chart: this.chart }),
                HappyPathSection(),
                ActivitySection(this.activitySectionModel)
            ).position(PositionTypes.Absolute).alignment(Alignment.topLeading)
        )
    }
}
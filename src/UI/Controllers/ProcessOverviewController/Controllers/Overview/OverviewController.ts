import { Bindable } from './Bindable';
import { MVIActivityBox } from './Views/ActivityBox';
import { int } from '@tuval/core';
import { TvChart } from '@tuval/components/charts';
import { UIController, UIView, VStack, PositionTypes, Alignment, State } from '@tuval/forms';
import { ActivitySection } from './Views/ActivitySection';
import { HappyPathSection, MVIHappyPathSectionModel } from './Views/HappyPathSection';
import { MetricsSection, MVIMetricSection } from './Views/MetricsSection';
import { MVIHappyPathDiagramItem } from './Views/HappyPathDiagram';
import { MVIHappyPathAbsoluteBoxModel } from './Views/HappyPathBox';
import { EventsOverTimeChart } from '../../../../Controls/EventsOverTimeChart/EventsOverTimeChart';


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

const happyPathBAbsoluteBoxTestModel: MVIHappyPathAbsoluteBoxModel = {
    title: 'Happy path in absolute numbers',
    value: 107688,
    totalValue: 279020
}

const happyPathDiagramModelTest: MVIHappyPathDiagramItem[] = [
    {
        name: 'Test 1'
    },
    {
        name: 'Test 1'
    },
    {
        name: 'Test 1'
    }
]

const happyPathSectionTestModel: MVIHappyPathSectionModel = {
    happyPathAbsoluteBoxModel: happyPathBAbsoluteBoxTestModel,
    happyPathDiagramItems: happyPathDiagramModelTest
}



export class OverviewController extends UIController {
    @State()
    private chart: EventsOverTimeChart;

    @State()
    private metricSectionModel: MVIMetricSection;

    @State()
    private activitySectionModel: MVIActivityBox[];

    @State()
    private happPathSectionModel: MVIHappyPathSectionModel;

    protected InitController(): void {
        this.chart = new EventsOverTimeChart();

        const map = new Map<int, any>();

        // this.map = [];
        for (let i = 0; i < 100; i++) {
            map[i] = i;
        }

        this.chart.SetChartData(map);

        this.activitySectionModel = testActivitySectionModel;

        this.happPathSectionModel = happyPathSectionTestModel;

        this.metricSectionModel = {
            metricBoxNodels: [
                {
                    title: 'Cases per day',
                    value: '694',
                    subTitle: 'Total number of cases per day',
                    showMenu: new Bindable(false, this)
                },
                {
                    title: 'Events per day',
                    value: '4.215',
                    subTitle: 'Total number of events per day',
                    showMenu: new Bindable(false, this)
                },
                {
                    title: 'Throughput time',
                    value: '26 DAYS',
                    subTitle: 'Average case duration from process start to process end without extreme outliers',
                    showMenu: new Bindable(false, this)
                }
            ],
            chart: this.chart
        }
    }

    public LoadView(): UIView {
        return (
            VStack(
                MetricsSection(this.metricSectionModel),
                HappyPathSection(this.happPathSectionModel),
                ActivitySection(this.activitySectionModel)
            ).position(PositionTypes.Absolute).alignment(Alignment.topLeading)
        )
    }
}
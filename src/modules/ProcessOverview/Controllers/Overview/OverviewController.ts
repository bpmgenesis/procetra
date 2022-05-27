import { int } from '@tuval/core';
import { cTopLeading, PositionTypes, State, UIController, UIView, VStack } from '@tuval/forms';

import { EventsOverTimeChart } from '../../../../UI/Controls/EventsOverTimeChart/EventsOverTimeChart';
import { MVIActivityBox } from './Views/ActivityBox';
import { ActivitySection } from './Views/ActivitySection';
import { MVIHappyPathAbsoluteBoxModel } from './Views/HappyPathBox';
import { MVIHappyPathDiagramItem } from './Views/HappyPathDiagram';
import { HappyPathSection, MVIHappyPathSectionModel } from './Views/HappyPathSection';
import { MetricsSection, MVIMetricSection } from './Views/MetricsSection';


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
                    /*  showMenu: new Bindable(false, this), */
                    chart: {
                        dataSource: [
                            { x: 1, xval: 'Jan', yval: 34 },
                            { x: 2, xval: 'Feb', yval: 36 },
                            { x: 3, xval: 'Mar', yval: 32 },
                            { x: 4, xval: 'Apr', yval: 35 },
                            { x: 5, xval: 'May', yval: 40 },
                            { x: 6, xval: 'Jun', yval: 38 },
                            { x: 7, xval: 'Jul', yval: 33 },
                            { x: 8, xval: 'Aug', yval: 37 },
                            { x: 9, xval: 'Sep', yval: 34 },
                            { x: 10, xval: 'Oct', yval: 31 },
                            { x: 11, xval: 'Nov', yval: 30 },
                            { x: 12, xval: 'Dec', yval: 29 },
                        ],
                        xName: 'xval',
                        yName: 'yval',

                    }
                },
                {
                    title: 'Events per day',
                    value: '4.215',
                    subTitle: 'Total number of events per day',
                    /* showMenu: new Bindable(false, this), */
                    chart: {

                        dataSource: [
                            { x: 1, xval: 'Jan', yval: 12 },
                            { x: 2, xval: 'Feb', yval: 36 },
                            { x: 3, xval: 'Mar', yval: 56 },
                            { x: 4, xval: 'Apr', yval: 76 },
                            { x: 5, xval: 'May', yval: 34 },
                            { x: 6, xval: 'Jun', yval: 39 },
                            { x: 7, xval: 'Jul', yval: 50 },
                            { x: 8, xval: 'Aug', yval: 43 },
                            { x: 9, xval: 'Sep', yval: 34 },
                            { x: 10, xval: 'Oct', yval: 17 },
                            { x: 11, xval: 'Nov', yval: 30 },
                            { x: 12, xval: 'Dec', yval: 56 },
                        ],
                        xName: 'xval', yName: 'yval',

                    }
                },
                {
                    title: 'Throughput time',
                    value: '26 DAYS',
                    subTitle: 'Average case duration from process start to process end without extreme outliers',
                    /* showMenu: new Bindable(false, this), */
                    chart: {

                        dataSource: [
                            { x: 1, xval: 'Jan', yval: 23 },
                            { x: 2, xval: 'Feb', yval: 35 },
                            { x: 3, xval: 'Mar', yval: 43 },
                            { x: 4, xval: 'Apr', yval: 35 },
                            { x: 5, xval: 'May', yval: 40 },
                            { x: 6, xval: 'Jun', yval: 53 },
                            { x: 7, xval: 'Jul', yval: 33 },
                            { x: 8, xval: 'Aug', yval: 12 },
                            { x: 9, xval: 'Sep', yval: 20 },
                            { x: 10, xval: 'Oct', yval: 31 },
                            { x: 11, xval: 'Nov', yval: 30 },
                            { x: 12, xval: 'Dec', yval: 29 },
                        ],
                        xName: 'xval', yName: 'yval',

                    }
                }
            ],
            chart: this.chart
        }
    }

    public LoadView(): UIView {
        return (
            VStack({ alignment: cTopLeading })(
                MetricsSection(this.metricSectionModel),
                HappyPathSection(this.happPathSectionModel),
                ActivitySection(this.activitySectionModel)
            )
                .position(PositionTypes.Absolute)
        )
    }
}
import { UIController, UIView, UIScene, Text, VStack, HStack, Spacer, UIButton, Icon, cTopLeading, _ForEach, State, TApplication, cLeading, ScrollView, cVertical, If, PositionTypes } from '@tuval/forms';
import { int, foreach } from '@tuval/core';
import { EventsOverTimeChart } from '../../../UI/Controls/EventsOverTimeChart/EventsOverTimeChart';
import { RegularText, SectionHeadline, SectionSubHeadline } from '../../../UI/Views/Texts';
import { TileBox } from '../../../UI/Views/TileBox';
import { Sparkline, SparklineModel } from '@tuval/components/charts';

const overviewTypes = [
    'Events over time',
    'Active cases over time',
    'Case variants',
    'Events per case',
    'Case duration',
    'Case utilization',
    'Mean activity duration',
    'Mean waiting time'
];

const staticticInfos = [
    {
        title: 'start time',
        value: '19.09.2012'
    },
    {
        title: 'end time',
        value: '19.09.2012'
    },
    {
        title: 'cases',
        value: '968'
    },
    {
        title: 'variants',
        value: '79'
    },
    {
        title: 'process step types',
        value: '12'
    },
    {
        title: 'total process steps',
        value: '7416'
    }
]

interface MVIMetricData {
    name: string,
    chart: SparklineModel,
    value: string,
    subValue: string
}
const metrics: MVIMetricData[] = [
    {
        name: 'Unique Variants',
        chart: {
            type: 'Column',
            valueType: 'Numeric',
            dataSource: [
                { x: 1, yval: 5 },
                { x: 2, yval: 6 },
                { x: 3, yval: 5 },
                { x: 4, yval: 7 },
                { x: 5, yval: 4 },
                { x: 6, yval: 3 },
                { x: 7, yval: 9 },
                { x: 8, yval: 5 }
            ],
            xName: 'x',
            yName: 'yval'
        },
        value: '57.14 %',
        subValue: '(+57.1 %)'
    },
    {
        name: 'Cases with (self)loops',
        chart: {
            type: 'Line',
            lineWidth: 5,
            width:'100%',
            height:'100%',
            padding: {
                left: 10,
                right: 10
            },
            valueType: 'Numeric',
            dataSource: [
                { x: 1, yval: 5 },
                { x: 2, yval: 6 },
                { x: 3, yval: 5 },
                { x: 4, yval: 7 },
                { x: 5, yval: 4 },
                { x: 6, yval: 3 },
                { x: 7, yval: 9 },
                { x: 8, yval: 5 },
                { x: 9, yval: 6 },
                { x: 10, yval: 5 },
                { x: 11, yval: 7 },
                { x: 12, yval: 8 },
                { x: 13, yval: 4 },
                { x: 14, yval: 5 },
                { x: 15, yval: 3 },
                { x: 16, yval: 4 },
                { x: 17, yval: 11 },
                { x: 18, yval: 10 },
                { x: 19, yval: 2 },
                { x: 20, yval: 12 },
                { x: 21, yval: 4 },
                { x: 22, yval: 7 },
                { x: 23, yval: 6 },
                { x: 24, yval: 8 },
            ],
            xName: 'x',
            yName: 'yval',
            markerSettings: {
                visible: ['All'],
                border: {
                    color: '#00BDAE',
                    width: 5
                },
                fill: 'white',
                size: 10,
            }
        },
        value: '20.00 %',
        subValue: '(-75.6 %)'
    },
    {
        name: 'Automation rate',
        chart: {
            type: 'Pie'
        },
        value: '2.78 %',
        subValue: '(+2.8 %)'
    },
    {
        name: 'Cases with long lead time',
        chart: {
            type: 'Line'
        },
        value: '13.33 %',
        subValue: '(-4.4 %)'
    },
    {
        name: 'Cases with many process steps',
        chart: {
            type: 'Line'
        },
        value: '13.33 %',
        subValue: '(+57.1 %)'
    },
    {
        name: 'Number of resources per process step',
        chart: {
            type: 'Line'
        },
        value: '2.63 %',
        subValue: '(+57.1 %)'
    }
]

function MetricSelectionButtons(buttons: string[], selectedIndex: int, onSelectedAction: (index: int) => void): UIView {
    return (
        HStack(
            ..._ForEach(buttons)((name, index) =>
                UIButton(
                    Text(name).fontSize('13px')
                )
                    .action(() => onSelectedAction(index))
                    .height(30)
                    .border('solid 1px #ccc')
                    .padding(5)
                    .paddingLeft('10px')
                    .paddingRight('10px')
                    .cornerRadius(index === 0 ? '15px 0px 0px 15px' : (index === buttons.length - 1 ? '0px 15px 15px 0px' : ''))
                    .background(index === selectedIndex ? 'rgb(120,120,120,20%)' : '')
            )
        )
    )
}
export class OverviewController extends UIController {

    @State()
    private chart: EventsOverTimeChart;

    @State()
    private chart1: EventsOverTimeChart;

    @State()
    private selectedIndex: int;
    protected InitController() {
        this.selectedIndex = 0;
        this.chart = new EventsOverTimeChart();

        const map = new Map<int, any>();

        // this.map = [];
        for (let i = 0; i < 100; i++) {
            map[i] = i;
        }

        const map1 = new Map<int, any>();

        // this.map = [];
        for (let i = 0; i < 10; i++) {
            map1[i] = i;
        }


        /*  this.chart.SetChartData(map);
         foreach(metrics, item => item.chart.SetChartData(map1)) */
    }

    public LoadView(): UIView {
        return (
            UIScene(
                VStack({ alignment: cTopLeading, spacing: 10 })(
                    HStack(
                        SectionHeadline('Overview'),
                        Spacer(),
                        /*  PortalFilterBarWidget({ value: 23 }) */

                    )
                        // We prevent this stack to large more than its content
                        .height(),
                    SectionSubHeadline('Global statistics'),

                    HStack({ alignment: cLeading, spacing: 10 })(
                        ..._ForEach(staticticInfos)(info =>
                            TileBox(
                                VStack(
                                    RegularText(info.value).fontSize('27px').fontWeight('500').foregroundColor('#14a9d5'),
                                    RegularText(info.title).textTransform('uppercase').fontSize('11px').foregroundColor('#999')
                                ).padding(20)
                            ).maxHeight('120px')
                        )
                    ).height(),

                    MetricSelectionButtons(overviewTypes, this.selectedIndex, (index) => this.selectedIndex = index).visible(false),
                    // Chart
                    TileBox(
                        VStack(
                            RegularText(overviewTypes[this.selectedIndex])
                                .fontSize('30px')
                                .cursor('pointer')
                                .border('dashed 1px var(--sub-border-color)')
                                .transition('border .3s')
                        )
                            .padding()
                            .height(),
                        HStack({ spacing: 10 })(
                            VStack({ spacing: 10 })(
                                ..._ForEach(overviewTypes)((name, index) =>
                                    UIButton(
                                        Text(name)
                                    )
                                        .action(() => this.selectedIndex = index)
                                        .background(index === this.selectedIndex ? 'rgb(120,120,120,20%)' : '')
                                        .width(180)
                                        .height(30)
                                        .border('solid 1px #ccc')
                                        .padding()
                                        .cornerRadius(12)
                                )
                            ).width(250).padding(10),
                            this.chart as any
                        )
                    ).visible(false)
                        .height(400)
                        .variable('--sub-border-color', { default: 'transparent', hover: '#14a9d5' }),
                    // Metrics
                    VStack({ spacing: 10 })(
                        ..._ForEach([0, 1])(indexJ =>
                            HStack({ spacing: 10 })(
                                ..._ForEach([0, 1, 2])(indexI =>
                                    TileBox(
                                        VStack(
                                            RegularText(metrics[(indexJ * 3) + indexI].name).paddingTop('30px').fontSize(20).foregroundColor('#333'),
                                            HStack({ spacing: 10 })(
                                                RegularText(metrics[(indexJ * 3) + indexI].value).fontSize('30px').foregroundColor('#666'),
                                                RegularText(metrics[(indexJ * 3) + indexI].subValue).fontSize('20px').fontWeight('600').foregroundColor('#888')
                                                    .position(PositionTypes.Absolute).right('30px')
                                            ).marginTop('20px').height(),
                                            Sparkline()
                                                .model(metrics[(indexJ * 3) + indexI].chart)
                                                .padding(10)
                                        )
                                    ).height(290)
                                )
                            )
                        )
                    ).height()
                )
            )
        )
    }
}
import { UIController, UIView, UIScene, Text, VStack, HStack, Spacer, UIButton, Icon, cTopLeading, _ForEach, State, TApplication, cLeading, ScrollView, cVertical, If, PositionTypes } from '@tuval/forms';
import { RegularText, SectionHeadline, SectionSubHeadline } from '../../../../../Views/Texts';
import { TileBox } from '../../../../../Views/TileBox';
import { int, foreach } from '@tuval/core';
import { PortalFilterBarWidget } from '../../../../AppController/Views/PortalFilterBarWidget';
import { EventsOverTimeChart } from '../../../../../Controls/EventsOverTimeChart/EventsOverTimeChart';

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

const metrics = [
    {
        name: 'Unique Variants',
        chart: new EventsOverTimeChart(),
        value: '57.14 %',
        subValue: '(+57.1 %)'
    },
    {
        name: 'Cases with (self)loops',
        chart: new EventsOverTimeChart(),
        value: '20.00 %',
        subValue: '(-75.6 %)'
    },
    {
        name: 'Automation rate',
        chart: new EventsOverTimeChart(),
        value: '2.78 %',
        subValue: '(+2.8 %)'
    },
    {
        name: 'Cases with long lead time',
        chart: new EventsOverTimeChart(),
        value: '13.33 %',
        subValue: '(-4.4 %)'
    },
    {
        name: 'Cases with many process steps',
        chart: new EventsOverTimeChart(),
        value: '13.33 %',
        subValue: '(+57.1 %)'
    },
    {
        name: 'Number of resources per process step',
        chart: new EventsOverTimeChart(),
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


        this.chart.SetChartData(map);
        foreach(metrics, item => item.chart.SetChartData(map1))
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
                        ..._ForEach([1, 2])(indexI =>
                            HStack({ spacing: 10 })(
                                ..._ForEach([1, 2, 3])(indexJ =>
                                    TileBox(
                                        VStack(
                                            RegularText(metrics[indexI * indexJ - 1].name).paddingTop('30px').fontSize(20).foregroundColor('#333'),
                                            HStack({ spacing: 10 })(
                                                RegularText(metrics[indexI * indexJ - 1].value).fontSize('30px').foregroundColor('#666'),
                                                RegularText(metrics[indexI * indexJ - 1].subValue).fontSize('20px').fontWeight('600').foregroundColor('#888')
                                                    .position(PositionTypes.Absolute).right('30px')
                                            ).marginTop('20px').height(),
                                            metrics[indexI * indexJ - 1].chart
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
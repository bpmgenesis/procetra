import { UIController, UIView, UIScene, Text, VStack, HStack, Spacer, UIButton, Icon, cTopLeading, _ForEach, State, TApplication, cLeading, ScrollView, cVertical, If, PositionTypes, ZStack, AnimationStack } from '@tuval/forms';
import { int, foreach } from '@tuval/core';
import { EventsOverTimeChart } from '../../../UI/Controls/EventsOverTimeChart/EventsOverTimeChart';
import { RegularText, SectionHeadline, SectionSubHeadline } from '../../../UI/Views/Texts';
import { TileBox } from '../../../UI/Views/TileBox';
import { Sparkline, SparklineModel } from '@tuval/components/charts';
import { TileBoxHeaderText, MetricBoxValueText } from '../../../UI/Views/Title';
import { MVIMetricData } from '../../Monitoring/Models/MVIMetricData';
import { ListBounceAnimation } from '../../../UI/Animations/ListBounce';

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
        value: '19.09.2013'
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

    @State()
    private showMenu: boolean;

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
                    SectionSubHeadline('Global metrics for monitoring.'),

                    HStack({ alignment: cLeading, spacing: 10 })(
                        ..._ForEach(staticticInfos)(info =>
                            TileBox(
                                VStack(
                                    RegularText(info.value).fontSize('27px').fontWeight('500').foregroundColor('#14a9d5'),
                                    RegularText(info.title).textTransform('uppercase').fontSize('16px').foregroundColor('#999').fontWeight('600')
                                ).padding(20)
                            ).maxHeight('120px')
                        )
                    ).height(),

                    //MetricSelectionButtons(overviewTypes, this.selectedIndex, (index) => this.selectedIndex = index).visible(true),
                    // Chart
                    ZStack(
                        TileBox(
                            VStack(
                                RegularText(overviewTypes[this.selectedIndex])
                                    .fontSize('30px')
                                    .cursor('pointer')
                                    .border('dashed 1px var(--sub-border-color)')
                                    .transition('border .3s')
                                    .onClick(() => this.showMenu = true)

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
                        )
                            .visible(true)
                            .variable('--sub-border-color', { default: 'transparent', hover: '#14a9d5' }),
                        AnimationStack(
                            VStack(
                                ..._ForEach(overviewTypes)((name, index) =>
                                    Text(name).cursor('pointer').width('100%').height('100%').shadow('inset 0 -1px 0 0 #e4e4e4').backgroundColor({ hover: '#f9f9f9' })
                                        .padding(10)
                                        .onClick(() => { this.selectedIndex = index; this.showMenu = false }),
                                )
                            )
                        )
                            .height(400)
                            .overflow('hidden')
                            .backgroundColor('white')
                            .animation(ListBounceAnimation, '.3s')
                            .visible(this.showMenu)
                    )

                )
            )
        )
    }
}
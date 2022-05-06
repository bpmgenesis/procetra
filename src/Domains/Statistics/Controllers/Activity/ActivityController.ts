import { UIController, UIView, UIScene, Text, VStack, HStack, Spacer, UIButton, Icon, cTopLeading, ForEach, State, TApplication, cTop } from '@tuval/forms';
import { RegularText, SectionHeadline, SectionSubHeadline } from '../../../../UI/Views/Texts';
import { TileBox } from '../../../../UI/Views/TileBox';
import { int } from '@tuval/core';
import { EventsOverTimeChart } from '../../../../UI/Controls/EventsOverTimeChart/EventsOverTimeChart';
import { PortalFilterBarWidget } from '../../../Application/Views/PortalFilterBarWidget';

const overviewTypes = [
    'Frequency',
    'Median duration',
    'Mean duration',
    'Duration range',
    'Aggreate duration'
];
function MetricSelectionButtons(buttons: string[], selectedIndex: int, onSelectedAction: (index: int) => void): UIView {
    return (
        HStack(
            ...ForEach(buttons)((name, index) =>
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
export class ActivityController extends UIController {

    @State()
    private chart: EventsOverTimeChart;

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

        this.chart.SetChartData(map);
    }

    public LoadView(): UIView {
        return (
            UIScene(
                VStack({ alignment: cTopLeading, spacing: 10 })(
                    HStack(
                        SectionHeadline('Overview'),
                        Spacer(),
                        PortalFilterBarWidget({ value: 23 })
                        /* UIButton(
                            Icon('\\f04a').size(20).foregroundColor({ default: 'rgb(120,120,120, 50%)', hover: 'rgb(120,120,120, 80%)' }),
                        ) */
                    )
                        // We prevent this stack to large more than its content
                        .height(),
                    SectionSubHeadline('Global statistics'),
                    MetricSelectionButtons(overviewTypes, this.selectedIndex, (index) => this.selectedIndex = index).visible(false),
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
                        HStack({ spacing: 5 })(
                            VStack({ alignment: cTop, spacing: 10 })(
                                ...ForEach(overviewTypes)((name, index) =>
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
                            ).minWidth('200px').maxWidth('200px'),
                            this.chart as any
                        )

                    )
                        .height(400)
                        .variable('--sub-border-color', { default: 'transparent', hover: '#14a9d5' })
                )

            )
        )
    }
}
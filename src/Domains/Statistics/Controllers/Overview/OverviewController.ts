import { BarSerie, ChartView } from '@tuval/components/charts';
import { int } from '@tuval/core';
import {
    _ForEach,
    AnimationStack,
    cTopLeading,
    HStack,
    State,
    Text,
    UIButton,
    UIController,
    UIScene,
    UIView,
    VStack,
    ZStack,
    cTrailing
} from '@tuval/forms';

import { ListBounceAnimation } from '../../../../UI/Animations/ListBounce';
import { RegularText } from '../../../../UI/Views/Texts';
import { TileBox } from '../../../../UI/Views/TileBox';
import { CasesGrid } from '../../Views/CasesGrid';
import { cTop } from '@tuval/forms';
import { EventsOverViewChart } from '../../Views/EventsOverTimeChart';
import { ActiveCasesOverTime } from '../../Views/ActiveCasesOverTime';

let datas = [
    [
        { x: 'Jan', y: 532.2 }, { x: 'Feb', y: 453.4 },
        { x: 'Mar', y: 422.8 }, { x: 'Apr', y: 531.6 },
        { x: 'May', y: 532.2 }, { x: 'Jun', y: 453.4 },
        { x: 'July', y: 422.8 }, { x: 'Agu', y: 531.6 },
        { x: 'Sep', y: 532.2 }, { x: 'Oct', y: 453.4 },
        { x: 'Nov', y: 422.8 }
    ],
    [
        { x: new Date(2021, 1, 1), y: 252.2 }, { x: new Date(2021, 2, 1), y: 243.4 },
        { x: new Date(2021, 3, 1), y: 142.8 }, { x: new Date(2021, 4, 1), y: 331.6 },
        { x: new Date(2021, 5, 1), y: 262.3 }, { x: new Date(2021, 6, 1), y: 142.5 },
        { x: new Date(2021, 7, 1), y: 142.9 }, { x: new Date(2021, 8, 1), y: 145.8 },
        { x: new Date(2021, 9, 1), y: 251.4 }, { x: new Date(2021, 10, 1), y: 143.1 }
    ]
];

const overviewTypes = [
    {
        title: 'Events over time',
        builder: EventsOverViewChart,
        data: [
            { x: 'Jan', y: 532.2 }, { x: 'Feb', y: 453.4 },
            { x: 'Mar', y: 422.8 }, { x: 'Apr', y: 531.6 },
            { x: 'May', y: 532.2 }, { x: 'Jun', y: 453.4 },
            { x: 'July', y: 422.8 }, { x: 'Agu', y: 531.6 },
            { x: 'Sep', y: 532.2 }, { x: 'Oct', y: 453.4 },
            { x: 'Nov', y: 422.8 }
        ]
    },
    {
        title: 'Active cases over time',
        builder: ActiveCasesOverTime,
        data: [
            { x: 'Jan', y: 532.2 }, { x: 'Feb', y: 453.4 },
            { x: 'Mar', y: 422.8 }, { x: 'Apr', y: 531.6 },
            { x: 'May', y: 532.2 }, { x: 'Jun', y: 453.4 },
            { x: 'July', y: 422.8 }, { x: 'Agu', y: 531.6 },
            { x: 'Sep', y: 532.2 }, { x: 'Oct', y: 453.4 },
            { x: 'Nov', y: 422.8 }
        ]
    },
    {
        title: 'Case variants',
        builder: EventsOverViewChart,
        data: [
            { x: 'Jan', y: 532.2 }, { x: 'Feb', y: 453.4 },
            { x: 'Mar', y: 422.8 }, { x: 'Apr', y: 531.6 },
            { x: 'May', y: 532.2 }, { x: 'Jun', y: 453.4 },
            { x: 'July', y: 422.8 }, { x: 'Agu', y: 531.6 },
            { x: 'Sep', y: 532.2 }, { x: 'Oct', y: 453.4 },
            { x: 'Nov', y: 422.8 }
        ]
    },
    {
        title: 'Events per case',
        builder: EventsOverViewChart,
        data: [
            { x: 'Jan', y: 532.2 }, { x: 'Feb', y: 453.4 },
            { x: 'Mar', y: 422.8 }, { x: 'Apr', y: 531.6 },
            { x: 'May', y: 532.2 }, { x: 'Jun', y: 453.4 },
            { x: 'July', y: 422.8 }, { x: 'Agu', y: 531.6 },
            { x: 'Sep', y: 532.2 }, { x: 'Oct', y: 453.4 },
            { x: 'Nov', y: 422.8 }
        ]
    },
    {
        title: 'Case duration',
        builder: EventsOverViewChart,
        data: [
            { x: 'Jan', y: 532.2 }, { x: 'Feb', y: 453.4 },
            { x: 'Mar', y: 422.8 }, { x: 'Apr', y: 531.6 },
            { x: 'May', y: 532.2 }, { x: 'Jun', y: 453.4 },
            { x: 'July', y: 422.8 }, { x: 'Agu', y: 531.6 },
            { x: 'Sep', y: 532.2 }, { x: 'Oct', y: 453.4 },
            { x: 'Nov', y: 422.8 }
        ]
    },
    {
        title: 'Case utilization',
        builder: EventsOverViewChart,
        data: [
            { x: 'Jan', y: 532.2 }, { x: 'Feb', y: 453.4 },
            { x: 'Mar', y: 422.8 }, { x: 'Apr', y: 531.6 },
            { x: 'May', y: 532.2 }, { x: 'Jun', y: 453.4 },
            { x: 'July', y: 422.8 }, { x: 'Agu', y: 531.6 },
            { x: 'Sep', y: 532.2 }, { x: 'Oct', y: 453.4 },
            { x: 'Nov', y: 422.8 }
        ]
    },
    {
        title: 'Mean activity duration',
        builder: EventsOverViewChart,
        data: [
            { x: 'Jan', y: 532.2 }, { x: 'Feb', y: 453.4 },
            { x: 'Mar', y: 422.8 }, { x: 'Apr', y: 531.6 },
            { x: 'May', y: 532.2 }, { x: 'Jun', y: 453.4 },
            { x: 'July', y: 422.8 }, { x: 'Agu', y: 531.6 },
            { x: 'Sep', y: 532.2 }, { x: 'Oct', y: 453.4 },
            { x: 'Nov', y: 422.8 }
        ]
    },
    {
        title: 'Mean waiting time',
        builder: EventsOverViewChart,
        data: [
            { x: 'Jan', y: 532.2 }, { x: 'Feb', y: 453.4 },
            { x: 'Mar', y: 422.8 }, { x: 'Apr', y: 531.6 },
            { x: 'May', y: 532.2 }, { x: 'Jun', y: 453.4 },
            { x: 'July', y: 422.8 }, { x: 'Agu', y: 531.6 },
            { x: 'Sep', y: 532.2 }, { x: 'Oct', y: 453.4 },
            { x: 'Nov', y: 422.8 }
        ]
    }
];

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
    private selectedIndex: int;

    @State()
    private showMenu: boolean;

    protected InitController() {
        this.selectedIndex = 0;
    }

    public LoadView(): UIView {
        return (
            UIScene(
                VStack({ alignment: cTopLeading, spacing: 10 })(
                    // Chart
                    ZStack(
                        TileBox(
                            VStack(
                                RegularText(overviewTypes[this.selectedIndex].title)
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
                                            Text(name.title)
                                        )
                                            .action(() => this.selectedIndex = index)
                                            .background(index === this.selectedIndex ? 'rgb(120,120,120,20%)' : '')
                                            .width(180)
                                            .height(30)
                                            .border('solid 1px #ccc')
                                            .padding()
                                            .cornerRadius(12)
                                    )
                                ).width(250).padding(10).visible(false),
                                // Chart here
                                overviewTypes[this.selectedIndex].builder(overviewTypes[this.selectedIndex].data)
                            )
                        )
                            .visible(true)
                            .variable('--sub-border-color', { default: 'transparent', hover: '#14a9d5' }),
                        AnimationStack(
                            VStack(
                                ..._ForEach(overviewTypes)((name, index) =>
                                    Text(name.title).cursor('pointer').width('100%').height('100%').shadow('inset 0 -1px 0 0 #e4e4e4').backgroundColor({ hover: '#f9f9f9' })
                                        .padding(10)
                                        .onClick(() => { this.selectedIndex = index; this.showMenu = false }),
                                )
                            )
                        )
                            .overflow('hidden')
                            .backgroundColor('white')
                            .animation(ListBounceAnimation, '.3s')
                            .visible(this.showMenu)
                    )
                        .minHeight('350px'),

                    // Grid
                    TileBox(
                        VStack({ alignment: cTop })(
                            HStack({ alignment: cTrailing, spacing: -2 })(
                                UIButton(
                                    RegularText('Cases (31)').fontSize('13px').fontWeight('600').padding('0 20px').height(30)
                                ).background('rgb(255,255,255,30%)').border('solid 2px #ccc').foregroundColor('#444').cornerRadius('5px 0 0 5px'),
                                UIButton(
                                    RegularText('Variants (8)').fontSize('13px').fontWeight('600').padding('0 20px').height(30)
                                ).background('rgb(255,255,255,30%)').border('solid 2px #ccc').foregroundColor('#444').cornerRadius('0 5px 5px 0')
                            ),
                            CasesGrid()
                        )

                    )
                )
            )
        )
    }
}
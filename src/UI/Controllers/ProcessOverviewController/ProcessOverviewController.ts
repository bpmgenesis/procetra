import { TvChart } from '@tuval/components/charts';
import { int } from '@tuval/core';
import {
    Alignment,
    ForEach,
    HDivider,
    HStack,
    Icon,
    Spacer,
    State,
    TApplication,
    Text,
    UIButton,
    UIController,
    UIScene,
    UIView,
    VStack,
} from '@tuval/forms';

import { PageTitle } from '../../Views/PageHeader';
import { MVIPortalSideMenuItem, PortalSideMenu } from '../../Views/PortalSideMenu';
import { OverviewController } from './Controllers/Overview/OverviewController';
import { ThroughputTimesController } from './Controllers/ThroughputTimes/ThroughputTimesController';


function getMax(array: any[]) {
    let max: int = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i].data > max) {
            max = array[i].data;
        }
    }
    return max;
}

const sideMenu: MVIPortalSideMenuItem[] = [
    {
        name: 'Process overview',
        icon: '\\f0b6',
        controller: new OverviewController()
    },
    {
        name: 'Throughput times',
        icon: '\\f144',
        controller:new ThroughputTimesController()
    },
    {
        name: 'Activities',
        icon: '\\f0d5',
        controller:new ThroughputTimesController()
    }
]

export class ProcessOverviewController extends UIController {

    @State()
    private chart1: TvChart;

    @State()
    private chart2: TvChart;

    @State()
    private chart3: TvChart;

    @State()
    private chartData: Map<any, any>;

    @State()
    private map: any[] = [];


    @State()
    private refresh: string;

    @State()
    private selectedIndex: int;

    @State()
    private currentController: UIController;

    protected InitController(): void {


        this.Appearance.OverflowX = 'hidden';
        this.Appearance.OverflowY = 'auto';

        this.refresh = '1';


        this.chart1 = new TvChart();
        this.chart1.Appearance.Width = '100%';
        this.chart1.Appearance.Height = '100px';

        this.chart2 = new TvChart();
        this.chart2.Appearance.Width = '100%';
        this.chart2.Appearance.Height = '100px';

        this.chart3 = new TvChart();
        this.chart3.Appearance.Width = '100%';
        this.chart3.Appearance.Height = '100px';

        this.OnControllerChanged(0);


    }

    private OnControllerChanged(index:int) {
        this.selectedIndex = index;
        this.currentController = sideMenu[index].controller;

    }
    private GetView() {
        return (
            UIScene(
                HStack(
                    PortalSideMenu(
                        {
                            items: sideMenu,
                            selectedIndex: this.selectedIndex,
                            selectedAction: (index) => this.OnControllerChanged(index),
                            second: true
                        }
                    ),
                    VStack(
                        HStack(
                            PageTitle(sideMenu[this.selectedIndex].icon, sideMenu[this.selectedIndex].name),
                            Spacer(),

                            // View Buttons Overview, Throuthput Times
                            // Only Desktop
                            HStack(
                                ...ForEach(sideMenu, (item: MVIPortalSideMenuItem, index: int) =>
                                    UIButton(
                                        Icon(item.icon).size(14).foregroundColor('gray'),
                                        Text(item.name).paddingLeft('5px')
                                    )
                                        .action(() => this.OnControllerChanged(index))
                                        .border('solid 1px gray')
                                        .cornerRadius('10px')
                                        .padding('3px 10px 3px 10px')
                                        .background(this.selectedIndex === index ? 'rgb(120,120,120,20%)' : '')
                                )
                            )
                                .width() // auto width
                                .spacing(5)
                                .visible(TApplication.IsDesktop),

                            // Portal
                            HStack(
                                VStack(
                                    Text('traces').foregroundColor('#495057').textTransform('uppercase').fontWeight('700').fontSize('14px').fontFamily('Roboto, sans-serif'),
                                    Text('0').foregroundColor('#999').fontWeight('700').fontSize('27px').fontFamily('Roboto, sans-serif'),
                                ),
                                VStack(
                                    Text('events').foregroundColor('#495057').textTransform('uppercase').fontWeight('700').fontSize('14px').fontFamily('Roboto, sans-serif'),
                                    Text('0').foregroundColor('#2ca3c0').fontWeight('700').fontSize('27px').fontFamily('Roboto, sans-serif'),
                                ),
                                VStack(
                                    Text('variants').foregroundColor('#495057').textTransform('uppercase').fontWeight('700').fontSize('14px').fontFamily('Roboto, sans-serif'),
                                    Text('0').foregroundColor('#b40404').fontWeight('700').fontSize('27px').fontFamily('Roboto, sans-serif'),
                                )
                            )
                                .spacing(30)
                                .width() //auto width
                                .visible(TApplication.IsPortal)

                        ).alignment(Alignment.leading).spacing(10).height(),
                        HDivider().height('1px').backgroundColor('rgb(120,120,120,20%)'),
                        VStack( // For scrolling
                            this.currentController
                        ).overflowX('hidden').overflowY('auto')
                    )
                        .padding('10px')
                        .alignment(Alignment.topLeading)
                        .spacing(10)
                        .background(TApplication.IsPortal ? '#f1f1f1' : '')


                )

            )
        )
    }
    public LoadView(): UIView {
        return this.GetView();
    }
}
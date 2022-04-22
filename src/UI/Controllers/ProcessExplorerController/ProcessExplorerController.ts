import {
    UIController, UIView, Text, UIScene, VStack, HStack, Icon, Spacer, ForEach, UIButton, Case,
    Alignment, HDivider, VStackDividerTypes
} from '@tuval/forms';
import { ActivitySliderView } from './Views/ActivitySliderView';
import { ConnectionSliderView } from './Views/ConnectionSliderView';
import { int } from '@tuval/core';
import { State, PositionTypes } from '@tuval/forms';
import { FrequencyMapController } from '../FrequencyMapController';
import { PerformanceMapController } from '../PerformanceMapController';
import { PageTitle } from '../../Views/PageHeader';
import { MVIPortalSideMenuItem, PortalSideMenu } from '../../Views/PortalSideMenu';


const sideMenu: MVIPortalSideMenuItem[] = [
    {
        name: 'Frequency Map',
        icon: '\\f0a7',
        controller: new FrequencyMapController()
    },
    {
        name: 'Performance Map',
        icon: '\\f0a8',
        controller: new PerformanceMapController()
    },
    {
        name: 'Resource Map',
        icon: '\\f098',
        controller: new PerformanceMapController()
    }
]

export class ProcessExplorerController extends UIController {

    @State()
    private currentController: UIController;

    @State()
    private selectedIndex: int;

    protected InitController(): void {

        this.OnControllerSelected(0);

    }

    private OnControllerSelected(index: int) {
        this.selectedIndex = index;
        const controller = sideMenu[index].controller;
        this.currentController = controller;
    }

    public LoadView(): UIView {
        return (
            UIScene(
                HStack(
                    PortalSideMenu(
                        {
                            items: sideMenu,
                            selectedIndex: this.selectedIndex,
                            selectedAction: (index) => this.OnControllerSelected(index),
                            second: true
                        }
                    ),

                    VStack(
                        // Header
                        HStack(
                            PageTitle('\\f0a4', 'Process explorer'),
                            Spacer(),
                            HStack(
                                ...ForEach(sideMenu, (item: MVIPortalSideMenuItem, index: int) =>
                                    UIButton(
                                        Icon(item.icon),
                                        Text(item.name)
                                    )
                                        .background(this.selectedIndex === index ? 'rgb(120,120,120,20%)' : '')
                                        .border('solid 1px gray')
                                        .cornerRadius('10px')
                                        .padding('3px 10px 3px 10px')
                                        .action(() => this.OnControllerSelected(index))
                                )
                            ).width().spacing('5px')
                        ).alignment(Alignment.leading).spacing('10px').height(),
                        HDivider().height('1px').backgroundColor('rgb(120,120,120,20%)'),
                        // Body
                        this.currentController

                    )
                        .padding(10)
                        .alignment(Alignment.topLeading)
                        .spacing(10)
                ).alignment(Alignment.topLeading)
            )
        )
    }
}
import { int } from '@tuval/core';
import {
    cLeading,
    cTopLeading,
    ForEach,
    HDivider,
    HStack,
    Icon,
    Spacer,
    State,
    Text,
    UIButton,
    UIController,
    UIScene,
    UIView,
    VStack,
} from '@tuval/forms';

import { PageTitle } from '../../../UI/Views/PageHeader';
import { MVIPortalSideMenuItem, PortalSideMenu } from '../../../UI/Views/PortalSideMenu';
import { FrequencyMapController } from './FrequencyMapController';
import { PerformanceMapController } from './PerformanceMapController';


const sideMenu: MVIPortalSideMenuItem[] = [
    {
        name: 'Frequency Map',
        icon: '\\f0a7',
        controller: new FrequencyMapController(),
        isVisible: ()=>true
    },
    {
        name: 'Performance Map',
        icon: '\\f0a8',
        controller: new PerformanceMapController(),
        isVisible: ()=>true
    },
    {
        name: 'Resource Map',
        icon: '\\f098',
        controller: new PerformanceMapController(),
        isVisible: ()=>true
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
                HStack({alignment:cTopLeading})(
                    PortalSideMenu(
                        {
                            items: sideMenu,
                            selectedAction: (index) => this.OnControllerSelected(index),
                            second: true
                        }
                    ),

                    VStack({ alignment: cTopLeading, spacing: 10 })(
                        // Header
                        HStack({ alignment: cLeading, spacing: 10 })(
                            PageTitle('\\f0a4', 'Process explorer'),
                            Spacer(),
                            HStack({ spacing: 5 })(
                                ...ForEach(sideMenu)((item: MVIPortalSideMenuItem, index: int) =>
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
                            ).width()
                        ).height(),
                        HDivider().height('1px').backgroundColor('rgb(120,120,120,20%)'),
                        // Body
                        this.currentController as any

                    )
                        .padding(10)
                )
            )
        )
    }
}
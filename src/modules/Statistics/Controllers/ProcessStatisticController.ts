import { int } from '@tuval/core';
import {
    cLeading,
    cTopLeading,
    cVertical,
    ForEach,
    HDivider,
    HStack,
    Icon,
    ScrollView,
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

import { PageTitle } from '../../../UI/Views/PageHeader';
import { PortalSideMenu } from '../../../UI/Views/PortalSideMenu';
import { sideMenuModel } from '../Models/SideMenu';
import { ActivityController } from './Activity/ActivityController';
import { MultiOverviewController } from './Overview/MultiOverviewController';


const controllers = [new MultiOverviewController, new ActivityController]

export class _ProcessStatisticController extends UIController {

    @State()
    private currentController: UIController;

    @State()
    private selectedIndex: int;
    protected InitController(): void {
        this.selectedIndex = 0;
        this.currentController = controllers[0];
    }

    private OnControllerChanged(index: int) {
        this.selectedIndex = index;
        this.currentController = sideMenuModel[index].controller;

    }

    public LoadView(): UIView {
        return (
            UIScene(
                HStack({ alignment: cTopLeading })(
                    PortalSideMenu(
                        {
                            items: sideMenuModel,
                            selectedAction: (index) => this.OnControllerChanged(index),
                            second: true
                        }
                    ),
                    VStack({ alignment: cTopLeading, spacing: 10 })(
                        HStack({ alignment: cLeading, spacing: 10 })(
                            PageTitle(sideMenuModel[this.selectedIndex].icon, sideMenuModel[this.selectedIndex].name + ' statistics'),
                            Spacer(),
                            HStack({ spacing: 5 })(
                                ...ForEach(sideMenuModel)((item, index) =>
                                    UIButton(
                                        Icon(item.icon).size(14).foregroundColor('gray').marginRight('5px'),
                                        Text(item.name)
                                    )
                                        .action(() => this.OnControllerChanged(index))
                                        .border('solid 1px gray').cornerRadius('10px').padding('3px 10px 3px 10px')
                                        .visible(TApplication.IsDesktop)
                                )
                            ).width()
                        ).height(),
                        HDivider().height(1).backgroundColor('rgb(120,120,120,20%)'),
                        ScrollView({ axes: cVertical })(
                            this.currentController as any,
                        )


                    ).padding('10px')
                )
                    .background(TApplication.IsPortal ? '#f1f1f1' : '')
            )
        )
    }
}
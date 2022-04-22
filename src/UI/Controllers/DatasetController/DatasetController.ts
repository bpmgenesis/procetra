import { int } from '@tuval/core';
import { MVIProjectItem } from './../../Models/MIProjectItem';
import {
    UIController, UIView, Text, State, UIScene, PositionTypes,
    TApplication, ApplicationModes, HStack, VStack, Icon, ForEach, Alignment
} from '@tuval/forms';
import { MVIDatasetTabModel } from './Models/MVIDatasetTabModel';
import { DatasetTabView } from './Views/DatasetTabView';
import { ProcessOverviewController } from '../ProcessOverviewController/ProcessOverviewController';
import { ProcessDashboardController } from '../ProcessDashboardController/ProcessDashboardController';
import { MIProject } from '../../Models/ProjectModel';
import { ProcessExplorerController } from './Controllers/ProcessExplorerController/ProcessExplorerController';
import { ProcessStatisticController } from './Controllers/ProcessStatisticController/ProcessStatisticController';
import { VariantExplorerController } from './Controllers/VariantExplorerController/VariantExplorerController';
import { CaseExplorerController } from './Controllers/CaseExplorerController/CaseExplorerController';
import { FilterController } from './Controllers/FilterController/FilterController';
import { PortalSideMenu } from '../../Views/PortalSideMenu';

export class DatasetController extends UIController {

    @State()
    private projectItem: MVIProjectItem;

    @State()
    private tabModels: MVIDatasetTabModel[];

    @State()
    private selectedTabIndex: int;


    protected InitController(): void {
        this.selectedTabIndex = 0;

    }

    private OnTabSelected(index: int) {
        this.selectedTabIndex = index;
        const tabModel = this.tabModels[index];

        if (tabModel != null && !tabModel.controller.IsModelBind) {
            tabModel.controller.Bind(this.projectItem);
        }
    }

    public OnBindModel(model: MVIProjectItem) {
        this.projectItem = model;

        this.tabModels = [
            {
                icon: '\\f0b4',
                name: 'Process Overview',
                controller: new ProcessOverviewController().Bind(this.projectItem) // Default Controller
            },
            {
                icon: '\\f0b3',
                name: 'Dashboard',
                controller: new ProcessDashboardController()
            },
            {
                icon: '\\f0f8',
                name: 'Discovery',
                controller: new ProcessExplorerController()
            },
            {
                icon: '\\f0a1',
                name: 'Monitoring',
                controller: new ProcessStatisticController()
            },
            {
                icon: '\\f0f2',
                name: 'Statistics',
                controller: new ProcessStatisticController()
            },
            {
                icon: '\\f13b',
                name: 'Variant Explorer',
                controller: new VariantExplorerController()
            },
            {
                icon: '\\f096',
                name: 'Loops',
                controller: new CaseExplorerController()
            },
            {
                icon: '\\f049',
                name: 'Automation',
                controller: new VariantExplorerController()
            },
            {
                icon: '\\f033',
                name: 'Case Explorer',
                controller: new CaseExplorerController()
            },
            {
                icon: '\\f130',
                name: 'Filter',
                controller: new FilterController()
            }
        ];

        this.selectedTabIndex = 0;

    }

    private LoadPortalView(): UIView {

        return (
            UIScene(
                HStack(
                    PortalSideMenu( { items: this.tabModels, selectedIndex:this.selectedTabIndex, selectedAction: (index) => this.OnTabSelected(index) }),
                    this.tabModels[this.selectedTabIndex].controller
                )
            )
        )
    }

    public LoadDesktopView(): UIView {
        return (
            UIScene(
                DatasetTabView({
                    tabModel: this.tabModels,
                    selectedTabIndex: this.selectedTabIndex,
                    onTabSelected: (index: int) => this.OnTabSelected(index)
                })
            ).position(PositionTypes.Absolute)
        )
    }
    public LoadView(): UIView {
        if (TApplication.ApplicationMode === ApplicationModes.Desktop) {
            return this.LoadDesktopView();
        } else {
            return this.LoadPortalView();
        }
    }
}
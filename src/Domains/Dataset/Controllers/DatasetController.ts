import { int } from '@tuval/core';
import { ApplicationModes, HStack, PositionTypes, State, TApplication, UIController, UIScene, UIView } from '@tuval/forms';

import { PortalSideMenu } from '../../../UI/Views/PortalSideMenu';
import { CaseExplorerController } from '../../CaseExplorer/Controllers/CaseExplorerController';
import { ProcessDashboardController } from '../../Dashboard/Controllers/ProcessDashboardController';
import { ProcessExplorerController } from '../../Discovery/Controllers/ProcessExplorerController';
import { FilterController } from '../../Filter/Controllers/FilterController';
import { ProcessOverviewController } from '../../ProcessOverview/Controllers/ProcessOverviewController';
import { MVIProjectItem } from '../../Project/Models/MIProjectItem';
import { ProcessStatisticController } from '../../Statistics/Controllers/ProcessStatisticController';
import { VariantExplorerController } from '../../VariantExplorer/Controllers/VariantExplorerController';
import { MVIDatasetTabModel } from '../Models/MVIDatasetTabModel';
import { DatasetTabView } from '../Views/DatasetTabView';
import { MonitoringController } from '../../Monitoring/Controllers/MonitoringController';
import { LoopsController } from '../../Loops/Controllers/LoopsController';
import { AutomationController } from '../../Automation/Controllers/AutomationController';

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
                controller: new MonitoringController()
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
                controller: new LoopsController()
            },
            {
                icon: '\\f049',
                name: 'Automation',
                controller: new AutomationController()
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
                    PortalSideMenu( { items: this.tabModels, selectedAction: (index) => this.OnTabSelected(index) }),
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
                    /* selectedTabIndex: this.selectedTabIndex, */
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
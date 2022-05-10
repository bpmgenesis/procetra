import { int } from '@tuval/core';
import { ApplicationModes, HStack, PositionTypes, State, TApplication, UIController, UIScene, UIView, Context } from '@tuval/forms';

import { PortalSideMenu } from '../../../UI/Views/PortalSideMenu';
import { MVIProjectItem } from '../../Project/Models/MIProjectItem';
import { MVIDatasetTabModel } from '../Models/MVIDatasetTabModel';
import { DatasetTabView } from '../Views/DatasetTabView';
import { topModels } from './../Models/MVIDatasetTabModel';

export class DatasetController extends UIController {

    @State()
    private projectItem: MVIProjectItem;

    @State()
    private tabModels: MVIDatasetTabModel[];

    @State()
    private selectedTabIndex: int;

    @State()
    private currentController: UIController;


    protected InitController(): void {
        this.selectedTabIndex = 0;
        this.tabModels = [...topModels];
    }

    @Context()
    private OnNewAnalyse(value: MVIDatasetTabModel) {
        this.tabModels = [...this.tabModels, value];
        this.OnTabSelected(this.tabModels.length - 1);
    }

    private OnTabSelected(index: int) {
        this.selectedTabIndex = index;
        const tabModel = this.tabModels[index];
        if (tabModel != null) {
            this.currentController = tabModel.controller;
            if (this.currentController.IsModelBind) {
                this.currentController.Bind(this.projectItem);
            }
        }
    }

    public OnBindModel(model: MVIProjectItem) {
        this.projectItem = model;
        this.selectedTabIndex = 0;
        this.OnTabSelected(0);
    }

    private LoadPortalView(): UIView {
        return (
            UIScene(
                HStack(
                    PortalSideMenu({ items: this.tabModels, selectedAction: (index) => this.OnTabSelected(index) }),
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
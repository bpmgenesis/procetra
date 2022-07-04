import { IMiningModelModel, IProjectModel, MiningBrokerClient, Services } from '@procetra/common';
import { foreach, int } from '@tuval/core';
import {
    ApplicationModes,
    Context,
    HStack,
    PositionTypes,
    Spinner,
    State,
    TApplication,
    UIController,
    UIScene,
    UIView,
} from '@tuval/forms';

import { PortalSideMenu } from '../../../UI/Views/PortalSideMenu';
import { MVINewAnalyseModelSelection } from '../../NewAnalyse/Models/MVINewAnalyseModelSelection';
import { NewAnalyseTypes } from '../../NewAnalyse/Models/NewAnalyseTypes';
import { MVIDatasetTabModel, topModels } from '../Models/MVIDatasetTabModel';
import { DatasetTabView } from '../Views/DatasetTabView';

export interface DatasetControllerBindingModel {
    project: IProjectModel;
    miningModel: IMiningModelModel;
}
export class DatasetControllerClass extends UIController<DatasetControllerBindingModel> {

    private project: IProjectModel;
    private miningModel: IMiningModelModel;

    @State()
    private tabModels: MVIDatasetTabModel[];

    @State()
    private selectedTabIndex: int;

    @State()
    private currentController: UIController;

    @State()
    private DataBinded: boolean;


    protected InitController(): void {
        this.selectedTabIndex = 0;
        this.tabModels = [...topModels];
    }

    // MARK: On New Analyse Added
    @Context()
    private OnNewAnalyseAdded(value: MVIDatasetTabModel) {
        console.log(value);

        MiningBrokerClient.CreateProjectItem(Services.StateService.GetSessionId(), this.project.project_id, this.miningModel.model_id, value.id).then(nodata => {
            this.tabModels = [...this.tabModels, value];
            this.OnTabSelected(this.tabModels.length - 1);
        });

    }

    private OnTabSelected(index: int) {
        this.selectedTabIndex = index;
        const tabModel = this.tabModels[index];
        if (tabModel != null) {
            this.currentController = tabModel.controller;

            // if (!this.currentController.IsModelBind) {
            this.currentController.Bind(this.project);
            // }
        }
    }

    public OnBindModel(bindingModel: DatasetControllerBindingModel) {

        debugger;
        this.DataBinded = false;
       // this.tabModels = [...topModels];

        this.BeginUpdate();
        this.project = bindingModel.project;
        this.miningModel = bindingModel.miningModel;
        this.selectedTabIndex = 0;

        MiningBrokerClient.GetProjectItems(Services.StateService.GetSessionId(), this.project.project_id, this.miningModel.model_id).then((project_items: any[]) => {
            const result = [];
            foreach(project_items, project_item => {
                const item: MVINewAnalyseModelSelection = NewAnalyseTypes.find(item => item.id === project_item.item_id);
                if (item != null) {
                    result.push({
                        id: item.id,
                        icon: item.icon,
                        name: item.title,
                        isRight: false,
                        controller: item.controller,
                        isVisible: () => true
                    });
                }

            })
            this.tabModels = [...topModels, ...result];
            if (result.length > 0) {
                this.OnTabSelected(2);
            } else {
                this.OnTabSelected(0);
            }

            this.EndUpdate();
            this.DataBinded = true;
        });

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
        if (this.DataBinded) {
            if (TApplication.ApplicationMode === ApplicationModes.Desktop) {
                return this.LoadDesktopView();
            } else {
                return this.LoadPortalView();
            }
        } else {
            return (
                UIScene(
                    Spinner()
                )
            )
        }
    }
}

export function DatasetController(project: IProjectModel, miningModel: IMiningModelModel): DatasetControllerClass {
    return new DatasetControllerClass().Bind({ project, miningModel });
}
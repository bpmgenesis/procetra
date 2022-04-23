import { int } from '@tuval/core';
import { Fonts, RoundedRectangle, State, Text, UIButton, UIController, UIScene, UIView, VStack, ZStack } from '@tuval/forms';

import { Services } from '../../../Services/Services';
import { ConnectorDialog } from '../../../UI/Dialogs/ConnectorDialog';
import { AppController } from '../../Application/Controllers/AppController';
import { Binding } from '../../Binding';
import { CreateMVIProjectItem, MIProjectItem, MVIProjectItem } from '../Models/MIProjectItem';
import { MIProject } from '../Models/ProjectModel';
import { DesktopView } from '../Views/DesktopView';

class StackController extends UIController {
    @State()
    public title: string;

    @State()
    private array: int[];



    protected InitController() {

        this.array = [1, 2, 3];
        this.title = 'Hello Controller';
    }

    public override LoadView(): UIView {
        return VStack(
            Text(this.title).foregroundColor('blue').font(Fonts.title),
        )
    }
}


export class ProjectControllerClass extends UIController {
    @State()
    private parentAppController: AppController;

    @State()
    private title: string;

    @State()
    private array: int[];

    @State()
    private projects: any[];

    @State()
    private selectedProject: MIProject;

    @State()
    private selectedProjectItem: MVIProjectItem;

    @State()
    private selectedProjectItems: MVIProjectItem[];

    @State()
    private selectedProjectItemController: UIController;

    @State()
    private selectedTab: string;

    @State()
    private stackController: StackController;

    public SetParentAppController(value: AppController): this {
        this.parentAppController = value;
        return this;
    }

    public $(value: any): Binding {
        const propertyName = this.GetLastEnteredPropertyName();
        return {
            get: () => {
                return this[propertyName];
            },
            set: (value) => {
                this[propertyName] = value;
            }
        }
        console.log();
    }
    protected InitController() {
        this.array = [1, 2, 3, 4, 5, 6];
        this.stackController = new StackController();
        this.selectedTab = 'Process Explorer';
    }

    public OnBindModel(project: MIProject): this {
        this.selectedProject = project;
        const session_id = Services.StateService.GetSessionId();
        Services.ProjectService.GetProjectItems(session_id, 'bpmgenesis', '').then((projectItems: MIProjectItem[]) => {
            this.selectedProjectItems = projectItems.map(projectItem => CreateMVIProjectItem(projectItem));
            this.OnProjectItemSelected(this.selectedProjectItems[0]);
        });
        return this;
    }

    //When user click add button that under list
    private OnNewProjectItem() {
         const connectorDialog = new ConnectorDialog();
         connectorDialog.ShowDialog();
    }

    // When user select items froım list
    private OnProjectItemSelected(projectItem: MVIProjectItem) {
        this.selectedProjectItem = projectItem;
        this.selectedProjectItemController = projectItem.controller;
        if (!this.selectedProjectItemController.IsModelBind) {
            this.selectedProjectItemController.Bind(projectItem);
        }
    }
    public LoadProjects(): void {
        const session_id = Services.StateService.GetSessionId();
        Services.ProjectService.GetProjects(session_id, 'bpmgenesis').then(projects => {
            console.log('Load Project :', projects);

            this.projects = projects;
            this.ForceUpdate();
        });
    }


    private LoadDesktopView(): UIView {
        return DesktopView({
            selectedProjectItems: this.selectedProjectItems,
            selectedProjectItem: this.selectedProjectItem,
            selectedProjectItemController: this.selectedProjectItemController,
            NewProjectItemAction: this.OnNewProjectItem.bind(this),
            ProjectItemSelectedAction: this.OnProjectItemSelected.bind(this)
        });
    }

    private TestZStack(): UIView {
        return UIScene(
            UIButton(
                Text('Test')
            )
                .background(
                    ZStack(
                        RoundedRectangle().background('yellow').cornerRadius('8px'),
                    )
                )
        );
    }
    public override LoadView(): UIView {
        return this.LoadDesktopView()
    }
}

export function ProjectController(appController: AppController, model: MIProject): ProjectControllerClass {
    return new ProjectControllerClass().SetParentAppController(appController).Bind(model);
}
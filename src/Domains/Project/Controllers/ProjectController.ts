import { MIProject } from '../../../UI/Models/ProjectModel';
import {
    TApplication, TForm, UIScene, UIButton, UIController, UIView, UITextField, State, VStack,
    Text, ForEach, HStack, IFont, Icon, Spacer, Alignment, ZStack, RoundedRectangle, VDivider, Button, IControl, Fonts, TwoColumnWithHeaderFooterLayout, TwoColumnWithHeaderLayout, Case
} from '@tuval/forms';
import { ModuleLoader, instance as container, TuvalStorage, Thread, Console, TStorage, int } from '@tuval/core';
import { Services } from '../../../Services/Services';
import { TabView, TabViewItem } from '../../../UI/Views/TabView';
import { Binding } from '../../../UI/Controllers/Binding';
import { AppController } from '../../Application/Controllers/AppController';
import { CreateMVIProjectItem, MIProjectItem, MVIProjectItem } from '../../../UI/Models/MIProjectItem';
import { ListFooterButton } from '../Views/ListFooterButton';

import { ListView, ListViewItem, ListViewItemClass } from '../../../UI/Views/ListView';
import { ApplicationModes } from '@tuval/forms';

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


function MyButton(text: string, action: Function) {
    return UIButton(
        HStack(
            Icon('\\f178').size(15),
            Text(text)
        )
            .spacing('5px')
            .border('solid 2px maroon')
            .cornerRadius('40px')
            .paddingLeft('10px')
            .paddingRight('10px')
            .cursor('pointer')
    ).action(() => { action() })
}

class Tab1Controller1 extends UIController {



    @State()
    private title: string;

    @State()
    private button: Button;
    protected InitController(): void {
        this.Appearance.Display = 'flex';
        this.Appearance.Width = '100%';
        this.Appearance.Height = '100%';
        this.title = '__Tes_';
        setTimeout(() => this.title = 'sdfsdfdsfsdf', 5000);
        this.button = new Button();
        this.button.Text = 'asdka';
    }
    public override LoadView(): UIView {
        return VStack(
            this.button
        );
    }
}
class Tab1Controller2 extends UIController {
    protected InitController(): void {
        this.Appearance.Display = 'flex';
        this.Appearance.Width = '100%';
        this.Appearance.Height = '100%';
    }
    public override LoadView(): UIView {
        return Text('Tab1Controller 2')
    }
}


let tabModel: any[] = [];

function DatasetListView(projectItem: MVIProjectItem): ListViewItemClass {
    return (
        ListViewItem(
            HStack(
                VStack(
                    HStack(
                        Icon(projectItem.icon).size(20).width('auto'),
                        Text(projectItem.name),
                    ).alignment(Alignment.leading).spacing('5px'),
                    HStack(
                       /*  gauge as any */
                    ).alignment(Alignment.leading)
                ).spacing('5px').padding('5px'),
                VStack(
                    // Filter Icon
                    Icon('\\f130').size(20),
                    // Filter Badge
                    Text('2')
                        .alignment(Alignment.center)
                        .fontWeight('bold')
                        .padding('5px')
                        .backgroundColor('#27B764')
                        .width('20px')
                        .height('20px')
                        .cornerRadius('5px')
                        .foregroundColor('white')

                ).width('auto').spacing('5px')
            )
        ).minHeight('80px')
    )
}

function DashboardListView(projectItem: MVIProjectItem): ListViewItemClass {
    return (
        ListViewItem(
            Icon(projectItem.icon).size(20).width('auto'),
            Text(projectItem.name)
        ).minHeight('50px')
    )
}

export class ProjectControllerClass extends UIController {
    @State()
    private parentAppController: AppController;

    @State()
    private tab1: Tab1Controller1;

    @State()
    private tab2: Tab1Controller2;

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
       /*  const connectorDialog = new ConnectorDialog();
        connectorDialog.ShowDialog(); */
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
        return UIScene(
            TwoColumnWithHeaderLayout({
                header: [
                    /*   Text(this.selectedProject?.project_name).fontSize('24px'),
                      UIButton(
                          Text('Close')
                      ).action(() => this.parentAppController.CLoseProject()) */
                ],
                left: [
                    VStack(
                        HStack(
                            Icon('\\f112').size(15),
                            Text('insan kaynakları süreci').textTransform('uppercase')
                        ).height(),
                        HStack(
                            VStack(
                                Text('100%'),
                                Spacer(),
                                RoundedRectangle().width(40).height('80%').background('#14A9D5').cornerRadius(5).shadow('rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;'),
                                Text('Project').textTransform('uppercase'),
                                Text('31.123').textTransform('uppercase').fontSize('10px')
                            ).spacing(10),
                            VStack(
                                Text('100%'),
                                Spacer(),
                                RoundedRectangle().width(40).height('100%').background('rgb(59,210,115)').cornerRadius(5).shadow('rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;'),
                                Text('Set').textTransform('uppercase'),
                                Text('Set').textTransform('uppercase')
                            ).spacing(10),
                            VStack(
                                Text('100%'),
                                Spacer(),
                                RoundedRectangle().width(40).height('100%').background('rgb(250,112,3)').cornerRadius(5).shadow('rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;'),
                                Text('Current').textTransform('uppercase')
                            ).spacing(10)
                        ).height('500px').width('200px').padding('20px').spacing('10px'),

                        //Project Title
                        HStack(
                            Text('Project Items')
                                .font(Fonts.title3)
                                .padding('8px')
                                .fontWeight('bold')
                                .foregroundColor('black')
                        ).height('auto').visible(false),
                        // Poject items list view
                        ListView(
                            ...ForEach(this.selectedProjectItems, (projectItem: MVIProjectItem) =>
                                Case<ListViewItemClass>(projectItem.type, {
                                    'Dataset': DatasetListView(projectItem),
                                    'Dashboard': DashboardListView(projectItem)
                                })
                                    .borderBottom('solid 1px rgb(200,200,200,10%)')
                                    .cornerRadius('5px')
                                    .transition('all 0.35s')
                                    .shadow(this.selectedProjectItem?.project_item_id === projectItem.project_item_id ? 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px' : '')
                                    .background(this.selectedProjectItem?.project_item_id === projectItem.project_item_id, 'rgb(255,255,255,50%)', 'rgb(255,255,255,10%)')
                                    .onSelected(() => this.OnProjectItemSelected(projectItem))
                            )

                        ).width('200px').background('rgb(255,255,255,10%)').grow(),
                        // Project items buttons
                        HStack(
                            ListFooterButton('\\efff').action(() => this.OnNewProjectItem()),
                            ListFooterButton('\\effd'),
                            ListFooterButton('\\f04a'),
                            ListFooterButton('\\f0bb')
                        ).height('auto').width('100%').alignment(Alignment.center).spacing('5px'),
                    ).spacing('5px')
                        .visible(TApplication.ApplicationMode === ApplicationModes.Desktop)
                ],
                right: [
                    VStack(
                        /*  this.TestTabView(), */
                        this.selectedProjectItemController
                    ).grow()
                ],
                /*  footer: [
                     Text('Test').fontSize('24px')
                 ] */
            })
        )
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
import { int, Event } from '@tuval/core';
import { Fonts, RoundedRectangle, State, Text, UIButton, UIController, UIScene, UIView, VStack, ZStack, TwoColumnWithHeaderLayout, HStack, cLeading, Icon, VDivider, Spacer, UIContextMenu, ForEach, TApplication, Case, cCenter, HDivider } from '@tuval/forms';

import { Services } from '../../../Services/Services';
import { ConnectorDialog } from '../../../UI/Dialogs/ConnectorDialog';
import { AppController } from '../../Application/Controllers/AppController';
import { Binding } from '../../Binding';
import { CreateMVIProjectItem, MIProjectItem, MVIProjectItem } from '../Models/MIProjectItem';
import { MIProject } from '../../../models/MIProject';
import { DesktopView } from '../Views/DesktopView';
import { FilterUIService } from '../../../UI/UIServices/FiltersUIService';
import { MVIMiningModel } from '../../Project/Models/MVIAnalyseModel';
import { AnimHeadline5, RegularText } from '../../../UI/Views/Texts';
import { ListView, ListViewItemClass } from '../../../UI/Views/ListView';
import { ProjectUIService } from '../../../UI/UIServices/ProjectUIService';

/* class StackController extends UIController {
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
} */





const queryMenu = [
    {
        icon: '',
        iconColor: 'black',
        title: 'All cases',
        onClick: (item) => console.log(item)
    },
    {
        icon: '',
        iconColor: 'black',
        title: 'Open',
        onClick: (item) => console.log(item)
    },
    {
        icon: '',
        iconColor: 'black',
        title: 'Save',
        onClick: (item) => console.log(item)
    },
    {
        icon: '',
        iconColor: 'black',
        title: 'Save as',
        onClick: (item) => console.log(item)
    },
    {
        icon: '',
        iconColor: 'black',
        title: 'Export',
        onClick: (item) => console.log(item)
    }
]

export class MiningModelControllerClass extends UIController {
    @State()
    private parentAppController: AppController;

    @State()
    public MiningModelClosed: Event<any>;

    @State()
    private title: string;

    @State()
    private array: int[];

    @State()
    private projects: any[];

    @State()
    private miningModel: MVIMiningModel;

    @State()
    private selectedProjectItem: MVIProjectItem;

    @State()
    private selectedProjectItems: MVIProjectItem[];

    @State()
    private selectedProjectItemController: UIController;

    @State()
    private selectedTab: string;

    @State()
    private menu: { seperator?: boolean, icon?: string; iconColor?: string; title?: string; action?: (item: any) => void; }[];

    @State()
    private modelMenu: { icon?: string; iconColor?: string; title: string; onClick?: (item: any) => void; }[];



    /*     @State()
        private stackController: StackController; */

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
        //this.stackController = new StackController();
        this.selectedTab = 'Process Explorer';
        this.MiningModelClosed = new Event();

        this.menu = [
            {
                title: 'New'
            },
            {
                title: 'Open'
            },
            {
                title: 'Details'
            },
            { seperator: true },
            {
                title: 'Upload data',
                icon: '\\d2c8',
                iconColor: 'black',
                action: (item) => ProjectUIService.UploadDataDialog(this.miningModel.project)
            }
        ];

        this.modelMenu = [
            {
                icon: '\\d2c8',
                iconColor: 'black',
                title: 'Rename',
                onClick: (item) => console.log(item)
            },
            {
                icon: '\\d2a4',
                iconColor: 'black',
                title: 'Permissions',
                onClick: (item) => console.log(item)
            },
            {
                icon: '\\d3a4',
                iconColor: 'black',
                title: 'Duplicate',
                onClick: (item) => console.log(item)
            },
            {
                icon: '\\d2da',
                iconColor: 'black',
                title: 'Tags',
                onClick: (item) => console.log(item)
            },
            {
                icon: '\\d299',
                iconColor: 'black',
                title: 'Move To',
                onClick: (item) => console.log(item)
            },
            {
                icon: '\\e5cd',
                iconColor: 'red',
                title: 'Close',
                onClick: (item) => { alert(''); this.MiningModelClosed() }
            }
        ]
    }

    public OnBindModel(miningModel: MVIMiningModel): this {
        this.miningModel = miningModel;
        const session_id = Services.StateService.GetSessionId();
        Services.ProjectService.GetProjectItems(session_id, 'bpmgenesis', '').then((projectItems: MIProjectItem[]) => {
            this.selectedProjectItems = projectItems.map(projectItem => CreateMVIProjectItem(projectItem));
            this.OnProjectItemSelected(this.selectedProjectItems[0]);
        });
        return this;
    }

    //When user click add button that under list
    private OnNewProjectItem() {
        FilterUIService.SelectFilter();
        /* const connectorDialog = new ConnectorDialog();
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


    private LoadDesktopView() {
        return DesktopView({
            miningModel: this.miningModel,
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
    public override LoadView() {
        return (
            UIScene(
                TwoColumnWithHeaderLayout({
                    header: [
                        HStack({ alignment: cLeading, spacing: 10 })(
                            Icon('\\d1fd').size(30).marginBottom('10px'),
                            VStack({ alignment: cLeading })(
                                AnimHeadline5(this.miningModel?.project?.project_name).lineHeight(35).whiteSpace('nowrap'),
                                RegularText(this.miningModel?.name).whiteSpace('nowrap'),
                            ).marginLeft('5px').marginRight('10px').width(),
                            VDivider().width(1).height('60%').backgroundColor('rgb(120,120,120,50%)'),
                            HStack({ spacing: 10 })(
                                UIContextMenu(
                                    ...ForEach(this.menu)(item =>
                                        item.seperator ?
                                            HDivider()
                                            :
                                            HStack({ alignment: cLeading, spacing: 10 })(
                                                RegularText(item.title)
                                            ).onClick(() => { item.action(item) })

                                    )
                                )(
                                    HStack(
                                        RegularText('Project').fontSize(16).fontWeight('500'),
                                        Icon('\\e5c5').size(16)
                                    ).padding(5).backgroundColor({ focus: 'rgb(120,120,120,50%)' }).tabIndex(0).cornerRadius(5)
                                ).cursor('pointer').border('solid 1px var(--sub-border-color)').transition('border .3s'),
                                UIContextMenu(
                                    ...ForEach(this.modelMenu)(menuItem =>
                                        HStack({ alignment: cLeading, spacing: 10 })(
                                            Icon(menuItem.icon).size(16),
                                            Text(menuItem.title)
                                        ).onClick(() => { menuItem.onClick(menuItem) })
                                    )
                                )(
                                    HStack(
                                        RegularText('Model').fontSize(16).fontWeight('500'),
                                        Icon('\\e5c5').size(16)
                                    ).padding(5).backgroundColor({ focus: 'rgb(120,120,120,50%)' }).tabIndex(0).cornerRadius(5)
                                ).cursor('pointer').border('solid 1px var(--sub-border-color)').transition('border .3s'),

                                // Query Menu
                                UIContextMenu(
                                    ...ForEach(queryMenu)(menuItem =>
                                        HStack({ alignment: cLeading, spacing: 10 })(
                                            Icon(menuItem.icon).size(16),
                                            Text(menuItem.title)
                                        )
                                    )
                                )(
                                    HStack(
                                        RegularText('Query').fontSize(16).fontWeight('500'),
                                        Icon('\\e5c5').size(16)
                                    ).padding(5).backgroundColor({ focus: 'rgb(120,120,120,50%)' }).tabIndex(0).cornerRadius(5)
                                ).cursor('pointer').border('solid 1px var(--sub-border-color)').transition('border .3s')
                            ).width().height(), //auto,
                            VDivider().width(1).height('60%').backgroundColor('rgb(120,120,120,50%)'),
                            Icon('\\e153').size(24).foregroundColor('#666'),
                            VStack({ alignment: cLeading })(
                                RegularText('7.500').fontFamily("'Source Sans Pro', Arial, sans-serif").fontWeight('600').fontSize(25).foregroundColor('#666').lineHeight('1em'),
                                RegularText('EVENTS').fontFamily("'Source Sans Pro', Arial, sans-serif").fontWeight('600').fontSize(14).foregroundColor('#666'),
                            ).width(),
                            VDivider().height('60%').backgroundColor('rgb(120,120,120,50%)'),
                            Icon('\\d25b').size(24).foregroundColor('#666'),
                            VStack({ alignment: cLeading })(
                                RegularText('3.124').fontFamily("'Source Sans Pro', Arial, sans-serif").fontWeight('600').fontSize(25).foregroundColor('#666').lineHeight('1em'),
                                RegularText('CASES').fontFamily("'Source Sans Pro', Arial, sans-serif").fontWeight('600').fontSize(14).foregroundColor('#666'),
                            ).width(),
                            Spacer(),
                            HStack({ spacing: 10 })(
                                UIContextMenu(
                                    ...ForEach(this.menu)(item =>
                                        HDivider()
                                        /*  item.seperator ?
                                             HDivider()
                                             :
                                             HStack({ alignment: cLeading, spacing: 10 })(
                                                 RegularText(item.title)
                                             ) */
                                    )

                                )(
                                    HStack(
                                        RegularText('Project').fontSize(16).fontWeight('500'),
                                        Icon('\\e5c5').size(16)
                                    ).padding(5).backgroundColor({ focus: 'rgb(120,120,120,50%)' }).tabIndex(0).cornerRadius(5)
                                ).cursor('pointer').border('solid 1px var(--sub-border-color)').transition('border .3s'),
                                UIContextMenu(
                                    ...ForEach(this.modelMenu)(menuItem =>
                                        HStack({ alignment: cLeading, spacing: 10 })(
                                            Icon(menuItem.icon).size(16),
                                            Text(menuItem.title)
                                        ).onClick(() => { menuItem.onClick(menuItem) })
                                    )
                                )(
                                    HStack(
                                        RegularText('Model').fontSize(16).fontWeight('500'),
                                        Icon('\\e5c5').size(16)
                                    ).padding(5).backgroundColor({ focus: 'rgb(120,120,120,50%)' }).tabIndex(0).cornerRadius(5)
                                ).cursor('pointer').border('solid 1px var(--sub-border-color)').transition('border .3s'),

                                // Query Menu
                                UIContextMenu(
                                    ...ForEach(queryMenu)(menuItem =>
                                        HStack({ alignment: cLeading, spacing: 10 })(
                                            Icon(menuItem.icon).size(16),
                                            Text(menuItem.title)
                                        )
                                    )
                                )(
                                    HStack(
                                        RegularText('Query').fontSize(16).fontWeight('500'),
                                        Icon('\\e5c5').size(16)
                                    ).padding(5).backgroundColor({ focus: 'rgb(120,120,120,50%)' }).tabIndex(0).cornerRadius(5)
                                ).cursor('pointer').border('solid 1px var(--sub-border-color)').transition('border .3s')
                            ).visible(false).width(), //auto,
                        )
                            .height(80)
                            .shadow('0 0 8px 0 #ccc')
                            .background('rgb(255,255,255,20%)')
                            .marginBottom('10px')
                            .visible(TApplication.IsDesktop)
                    ],
                    left: [
                        VStack({ spacing: 5 })(
                            HStack({ spacing: 10 })(
                                VStack({ spacing: 10 })(
                                    Text('100%'),
                                    Spacer(),
                                    RoundedRectangle()
                                        .width(40)
                                        .height().initial({ height: '0%' }).animate({ height: '100%' }).__transition({ duration: 2 })
                                        .background('#14A9D5').cornerRadius(5).shadow('rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;'),
                                    VStack(
                                        Text('Process').textTransform('uppercase'),
                                        Text('31.123').textTransform('uppercase').fontSize('12px')
                                    ).height()
                                ),
                                VStack({ spacing: 10 })(
                                    Text('100%'),
                                    Spacer(),
                                    RoundedRectangle().width(40)
                                        .height().initial({ height: '0%' }).animate({ height: '100%' }).__transition({ delay: 1, duration: 2 })
                                        .background('rgb(59,210,115)').cornerRadius(5).shadow('rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;'),
                                    VStack(
                                        Text('Model').textTransform('uppercase'),
                                        Text('31.123').textTransform('uppercase').fontSize('12px')
                                    ).height()
                                ),
                                VStack({ spacing: 10 })(
                                    Text('100%'),
                                    Spacer(),
                                    RoundedRectangle().width(40)
                                        .height().initial({ height: '0%' }).animate({ height: '100%' }).__transition({ delay: 2, duration: 2 })
                                        .background('rgb(250,112,3)').cornerRadius(5).shadow('rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;'),
                                    VStack(
                                        Text('Query').textTransform('uppercase'),
                                        Text('31.123').textTransform('uppercase').fontSize('12px')
                                    ).height()
                                )
                            ).height(500).width(200).padding(20).visible(true),

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
                                /*  ...ForEach(this.selectedProjectItems)((projectItem: MVIProjectItem) =>
                                     Case<ListViewItemClass>(projectItem.type, {
                                         'Dataset': DatasetListView(projectItem),
                                         'Dashboard': DashboardListView(projectItem)
                                     })
                                         .borderBottom('solid 1px rgb(200,200,200,10%)')
                                         .cornerRadius('5px')
                                         .transition('all 0.35s')
                                         .shadow(this.selectedProjectItem?.project_item_id === projectItem.project_item_id ? 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px' : '')
                                         .background(this.selectedProjectItem?.project_item_id === projectItem.project_item_id, 'rgb(255,255,255,50%)', 'rgb(255,255,255,10%)')
                                         .onSelected(() => ProjectItemSelectedAction(projectItem))
                                 ) */

                            ).width('200px').background('rgb(255,255,255,10%)').grow(),
                            // Project items buttons
                            HStack({ alignment: cCenter, spacing: 5 })(
                                /*    ListFooterButton('\\e145').action(() => NewProjectItemAction()),
                                   ListFooterButton('\\effd'),
                                   ListFooterButton('\\f04a'),
                                   ListFooterButton('\\f0bb') */
                            ).height('auto').width('100%')
                        )
                            .visible(false)
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
        )
    }
}

export function MiningModelController(appController: AppController, model: MVIMiningModel): MiningModelControllerClass {
    return new MiningModelControllerClass().SetParentAppController(appController).Bind(model);
}
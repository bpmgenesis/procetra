import {
    Case,
    cCenter,
    cLeading,
    Fonts,
    ForEach,
    HStack,
    Icon,
    RoundedRectangle,
    Spacer,
    TApplication,
    Text,
    TwoColumnWithHeaderLayout,
    UIContextMenu,
    UIController,
    UIScene,
    VDivider,
    VStack,
} from '@tuval/forms';

import { ListView, ListViewItem, ListViewItemClass } from '../../../UI/Views/ListView';
import { AnimHeadline5, RegularText } from '../../../UI/Views/Texts';
import { MVIProjectItem } from '../Models/MIProjectItem';
import { ListFooterButton } from './ListFooterButton';
import { IMiningModelModel, IProjectModel } from '@procetra/common';

function DatasetListView(projectItem: MVIProjectItem): ListViewItemClass {
    return (
        ListViewItem(
            HStack(
                VStack({ spacing: 5 })(
                    HStack({ alignment: cLeading, spacing: 5 })(
                        Icon(projectItem.icon).size(20).width('auto'),
                        Text(projectItem.name),
                    ),
                    HStack({ alignment: cLeading })(
                        /*  gauge as any */
                    )
                ).padding('5px'),
                VStack({ spacing: 5 })(
                    // Filter Icon
                    Icon('\\f130').size(20),
                    // Filter Badge
                    Text('2')
                       /*  .alignment(Alignment.center) */
                        .fontWeight('bold')
                        .padding('5px')
                        .backgroundColor('#27B764')
                        .width('20px')
                        .height('20px')
                        .cornerRadius('5px')
                        .foregroundColor('white')

                ).width() // auto
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

export interface DesctopViewParams {
    project: IProjectModel;
    miningModel: IMiningModelModel;
    /* selectedProjectItem: MVIProjectItem,
    selectedProjectItems: MVIProjectItem[], */
    ProjectItemSelectedAction: Function,
    NewProjectItemAction: Function,
    selectedProjectItemController: UIController
}

const menu = [
    {
        title: 'New'
    },
    {
        title: 'Open'
    },
    {
        title: 'Details'
    },
    {
        title: 'Upload data',
        icon: '\\d2c8',
        iconColor: 'black',
        onClick: (item) => console.log(item)
    }
]

const modelMenu = [
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
        onClick: (item) => console.log(item)
    }
]

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
export function DesktopView({ project, miningModel,/*  selectedProjectItem, selectedProjectItems, */ ProjectItemSelectedAction, NewProjectItemAction, selectedProjectItemController }: DesctopViewParams) {
    return ({ onCloseProject }) => {
        return UIScene(
            TwoColumnWithHeaderLayout({
                header: [
                    HStack({ alignment: cLeading, spacing: 10 })(
                        Icon('\\d1fd').size(30).marginBottom('10px'),
                        VStack({ alignment: cLeading })(
                            AnimHeadline5(project?.project_name).lineHeight(35).whiteSpace('nowrap'),
                            //AnimHeadline5(miningModel?.name).fontSize('14px').textTransform('uppercase'),
                            HStack({ spacing: 10 })(
                                UIContextMenu(
                                    ...ForEach(menu)(item =>
                                        HStack({ alignment: cLeading, spacing: 10 })(
                                            RegularText(item.title)
                                        )
                                    )

                                )(
                                    HStack(
                                        RegularText('Project').fontSize(16).fontWeight('500'),
                                        Icon('\\e5c5').size(16)
                                    ).padding(5).backgroundColor({ focus: 'rgb(120,120,120,50%)' }).tabIndex(0).cornerRadius(5)
                                ).cursor('pointer').border('solid 1px var(--sub-border-color)').transition('border .3s'),
                                UIContextMenu(
                                    ...ForEach(modelMenu)(menuItem =>
                                        HStack({ alignment: cLeading, spacing: 10 })(
                                            Icon(menuItem.icon).size(16),
                                            Text(menuItem.title)
                                        )
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
                            ).width() //auto,
                        ).marginLeft('5px').marginRight('10px').width(),
                        VDivider().height('80%').backgroundColor('rgb(120,120,120,50%)'),
                        Icon('\\e153').size(24).foregroundColor('#666'),
                        VStack({ alignment: cLeading })(
                            RegularText('7.500').fontFamily("'Source Sans Pro', Arial, sans-serif").fontWeight('600').fontSize(25).foregroundColor('#666').lineHeight('1em'),
                            RegularText('EVENTS').fontFamily("'Source Sans Pro', Arial, sans-serif").fontWeight('600').fontSize(14).foregroundColor('#666'),
                        ).width(),
                        VDivider().height('80%').backgroundColor('rgb(120,120,120,50%)'),
                        Icon('\\d25b').size(24).foregroundColor('#666'),
                        VStack({ alignment: cLeading })(
                            RegularText('3.124').fontFamily("'Source Sans Pro', Arial, sans-serif").fontWeight('600').fontSize(25).foregroundColor('#666').lineHeight('1em'),
                            RegularText('CASES').fontFamily("'Source Sans Pro', Arial, sans-serif").fontWeight('600').fontSize(14).foregroundColor('#666'),
                        ).width(),
                        Spacer(),

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
                     /*    // Poject items list view
                        ListView(
                            ...ForEach(selectedProjectItems)((projectItem: MVIProjectItem) =>
                                Case<ListViewItemClass>(projectItem.type, {
                                    'Dataset': DatasetListView(projectItem),
                                    'Dashboard': DashboardListView(projectItem)
                                })
                                    .borderBottom('solid 1px rgb(200,200,200,10%)')
                                    .cornerRadius('5px')
                                    .transition('all 0.35s')
                                    .shadow(selectedProjectItem?.project_item_id === projectItem.project_item_id ? 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px' : '')
                                    .background(selectedProjectItem?.project_item_id === projectItem.project_item_id, 'rgb(255,255,255,50%)', 'rgb(255,255,255,10%)')
                                    .onSelected(() => ProjectItemSelectedAction(projectItem))
                            )

                        ).width('200px').background('rgb(255,255,255,10%)').grow(), */
                        // Project items buttons
                        HStack({ alignment: cCenter, spacing: 5 })(
                            ListFooterButton('\\e145').action(() => NewProjectItemAction()),
                            ListFooterButton('\\effd'),
                            ListFooterButton('\\f04a'),
                            ListFooterButton('\\f0bb')
                        ).height('auto').width('100%')
                    )
                        .visible(false)
                ],
                right: [
                    VStack(
                        /*  this.TestTabView(), */
                        selectedProjectItemController
                    ).grow()
                ],
                /*  footer: [
                     Text('Test').fontSize('24px')
                 ] */
            })
        )
    }
}
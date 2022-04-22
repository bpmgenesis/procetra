import { UIView, UIScene, TwoColumnWithHeaderLayout, VStack, HStack, Icon, Text, Spacer, RoundedRectangle, Fonts, ForEach, Case, cLeading, Alignment, TApplication, cCenter, UIController } from '@tuval/forms';
import { ListView, ListViewItemClass, ListViewItem } from '../../../UI/Views/ListView';
import { MVIProjectItem } from '../Models/MIProjectItem';
import { ListFooterButton } from './ListFooterButton';

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
                        .alignment(Alignment.center)
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
    selectedProjectItem: MVIProjectItem,
    selectedProjectItems: MVIProjectItem[],
    ProjectItemSelectedAction: Function,
    NewProjectItemAction: Function,
    selectedProjectItemController: UIController
}
export function DesktopView({ selectedProjectItem, selectedProjectItems, ProjectItemSelectedAction, NewProjectItemAction, selectedProjectItemController }: DesctopViewParams): UIView {
    return UIScene(
        TwoColumnWithHeaderLayout({
            header: [
                /*   Text(this.selectedProject?.project_name).fontSize('24px'),
                  UIButton(
                      Text('Close')
                  ).action(() => this.parentAppController.CLoseProject()) */
            ],
            left: [
                VStack({ spacing: 5 })(
                    HStack(
                        Icon('\\f112').size(19).marginRight('10px').foregroundColor('#ccc'),
                        Text('insan kaynakları süreci').textTransform('uppercase')
                    ).height(),
                    HStack({ spacing: 10 })(
                        VStack({ spacing: 10 })(
                            Text('100%'),
                            Spacer(),
                            RoundedRectangle().width(40).height('80%').background('#14A9D5').cornerRadius(5).shadow('rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;'),
                            VStack(
                                Text('Project').textTransform('uppercase'),
                                Text('31.123').textTransform('uppercase').fontSize('12px')
                            ).height()
                        ),
                        VStack({ spacing: 10 })(
                            Text('100%'),
                            Spacer(),
                            RoundedRectangle().width(40).height('100%').background('rgb(59,210,115)').cornerRadius(5).shadow('rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;'),
                            VStack(
                                Text('Set').textTransform('uppercase'),
                                Text('31.123').textTransform('uppercase').fontSize('12px')
                            ).height()
                        ),
                        VStack({ spacing: 10 })(
                            Text('100%'),
                            Spacer(),
                            RoundedRectangle().width(40).height('100%').background('rgb(250,112,3)').cornerRadius(5).shadow('rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;'),
                            VStack(
                                Text('Current').textTransform('uppercase'),
                                Text('31.123').textTransform('uppercase').fontSize('12px')
                            ).height()
                        )
                    ).height(500).width(200).padding(20),

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
                        ...ForEach(selectedProjectItems, (projectItem: MVIProjectItem) =>
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

                    ).width('200px').background('rgb(255,255,255,10%)').grow(),
                    // Project items buttons
                    HStack({ alignment: cCenter, spacing: 5 })(
                        ListFooterButton('\\efff').action(() => NewProjectItemAction()),
                        ListFooterButton('\\effd'),
                        ListFooterButton('\\f04a'),
                        ListFooterButton('\\f0bb')
                    ).height('auto').width('100%')
                )
                    .visible(TApplication.IsDesktop)
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
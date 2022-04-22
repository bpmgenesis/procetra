import { int } from '@tuval/core';
import { UIView, UIScene, ForEach, HStack, VDivider, VStack, Icon, Text } from '@tuval/forms';
import { TabView, TabViewItem } from '../../../UI/Views/TabView';
import { MVIDatasetTabModel } from '../Models/MVIDatasetTabModel';

export interface DatasetTabViewParams {
    tabModel: MVIDatasetTabModel[];
    selectedTabIndex: int;
    onTabSelected: (tabname: int) => void;
}
export function DatasetTabView(datasetTabViewParams: DatasetTabViewParams): UIView {
    return (
        UIScene(
            TabView(
                ...ForEach(datasetTabViewParams.tabModel, (tabItem: MVIDatasetTabModel, index) =>
                    TabViewItem({
                        name: tabItem.name,
                        header: (
                            HStack(
                                VDivider().visible(index === 0).height('70%').background('rgb(120,120,120,30%)'),
                                HStack({ spacing: 5 })(
                                    Icon(tabItem.icon).size(25).width('auto'),
                                    Text(tabItem.name.toUpperCase()).fontSize('8pt').textAlign('center')
                                )
                                    .wrap('wrap')
                                    .borderTop(datasetTabViewParams.selectedTabIndex === index ? 'solid 2px blue' : 'solid 2px transparent')
                                    .foregroundColor(datasetTabViewParams.selectedTabIndex === index ? 'gray' : 'rgb(120,120,120,50%)')
                                    /*  .cornerRadius('10px') */
                                    .padding(10)

                                    /* .borderBottom(this.selectedTab === tabItem.name ? 'solid 1px blue' : 'solid 0px') */
                                    /* .shadow(datasetTabViewParams.selectedTabIndex === index ? 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px' : '') */
                                    .background(datasetTabViewParams.selectedTabIndex === index, 'rgb(255,255,255,50%)', 'rgb(255,255,255,10%)')
                                    .transition('all 0.35s')
                                    .If(datasetTabViewParams.selectedTabIndex === index, (_: UIView) => {
                                        //  _.foregroundColor('blue');
                                    }),
                                VDivider().height('70%').background('rgb(120,120,120,30%)')
                            )
                        ),
                        content: tabItem.controller as any
                    }).onSelected(() => datasetTabViewParams.onTabSelected(index)),
                )
            ).selectedTabIndex(datasetTabViewParams.selectedTabIndex)
        )
    )
}
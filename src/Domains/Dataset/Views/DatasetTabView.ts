import { int } from '@tuval/core';
import { UIView, UIScene, ForEach, HStack, VDivider, VStack, Icon, Text, bindState } from '@tuval/forms';
import { TabView, TabViewItem } from '../../../UI/Views/TabView';
import { MVIDatasetTabModel } from '../Models/MVIDatasetTabModel';

export interface DatasetTabViewParams {
    tabModel: MVIDatasetTabModel[];
    //selectedTabIndex: int;
    onTabSelected: (tabname: int) => void;
}
export function DatasetTabView(datasetTabViewParams: DatasetTabViewParams): UIView {
    const [selectedIndex, setSelectedIndex] = bindState(0);
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
                                    .borderTop(selectedIndex === index ? 'solid 2px blue' : 'solid 2px transparent')
                                    .foregroundColor(selectedIndex === index ? 'gray' : 'rgb(120,120,120,50%)')
                                    .padding(10)
                                    .background(selectedIndex === index, 'rgb(255,255,255,50%)', 'rgb(255,255,255,10%)')
                                    .transition('all 0.35s'),

                                VDivider().height('70%').background('rgb(120,120,120,30%)')
                            )
                        ),
                        content: tabItem.controller as any
                    }).onSelected(() => { datasetTabViewParams.onTabSelected(index); setSelectedIndex(index) }),
                )
            ).selectedTabIndex(selectedIndex)
        )
    )
}
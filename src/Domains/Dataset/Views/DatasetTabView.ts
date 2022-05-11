import { int } from '@tuval/core';
import { UIView, UIScene, HStack, VDivider, VStack, Icon, Text, bindState, ForEach, cLeading } from '@tuval/forms';
import { TabView, TabViewItem } from '../../../UI/Views/TabView';
import { MVIDatasetTabModel } from '../Models/MVIDatasetTabModel';

export interface DatasetTabViewParams {
    tabModel: MVIDatasetTabModel[];
    selectedTabIndex: int;
    onTabSelected: (tabname: int) => void;
}
export function DatasetTabView(datasetTabViewParams: DatasetTabViewParams): UIView {
    // const [selectedIndex, setSelectedIndex] = bindState(0);
    console.log(datasetTabViewParams.tabModel);
    return (
        UIScene(
            TabView(
                ...ForEach(datasetTabViewParams.tabModel)((tabItem: MVIDatasetTabModel, index) =>
                    TabViewItem({
                        name: tabItem.name,
                        header: (
                            HStack(
                                VDivider().visible(index === 0).height('70%').background('rgb(120,120,120,30%)'),
                                VStack({ spacing: 1 })(
                                    Icon(tabItem.icon).size(25).width('auto'),
                                    Text(tabItem.name.toUpperCase()).fontSize('8pt').textAlign('center')
                                )
                                    .borderTop(datasetTabViewParams.selectedTabIndex === index ? 'solid 2px blue' : 'solid 2px transparent')
                                    .foregroundColor(datasetTabViewParams.selectedTabIndex === index ? 'gray' : 'rgb(120,120,120,50%)')
                                    .padding(10)
                                    .background(datasetTabViewParams.selectedTabIndex === index, 'rgb(255,255,255,50%)', 'rgb(255,255,255,10%)')
                                    .transition('all 0.35s'),

                                VDivider().height('70%').background('rgb(120,120,120,30%)')
                            ).maxWidth('100px').minHeight('78px').visible(!tabItem.isRight)
                        ),
                        rightHeader: (
                            HStack(
                                VDivider().visible(index === 0).height('70%').background('rgb(120,120,120,30%)'),
                                VStack({ spacing: 1 })(
                                    Icon(tabItem.icon).size(25).width('auto'),
                                    Text(tabItem.name.toUpperCase()).fontSize('8pt').textAlign('center')
                                )
                                    .height(78)
                                    .borderTop(datasetTabViewParams.selectedTabIndex === index ? 'solid 2px blue' : 'solid 2px transparent')
                                    .foregroundColor(datasetTabViewParams.selectedTabIndex === index ? 'gray' : 'rgb(120,120,120,50%)')
                                    .padding(10)
                                    .background(datasetTabViewParams.selectedTabIndex === index, 'rgb(255,255,255,50%)', 'rgb(255,255,255,10%)')
                                    .transition('all 0.35s'),

                                VDivider().height('70%').background('rgb(120,120,120,30%)')
                            ).maxWidth('100px').minHeight('78px').visible(tabItem.isRight)
                        ),
                        content: tabItem.controller as any
                    }).onSelected(() => { datasetTabViewParams.onTabSelected(index); }),
                )
            ).selectedTabIndex(datasetTabViewParams.selectedTabIndex)
        )
    )
}
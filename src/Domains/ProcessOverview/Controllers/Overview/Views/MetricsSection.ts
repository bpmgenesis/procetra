import { int } from '@tuval/core';
import { TvChart, ChartView, AreaSerie, MyControlBody } from '@tuval/components/charts';
import { UIView, VStack, HStack, Text, Alignment, Spacer, UIButton, Icon, ForEach, cTopLeading, useState, bindState } from '@tuval/forms';
import { TileBox } from '../../../../../UI/Views/TileBox';
import { TileBoxHeaderText } from '../../../../../UI/Views/Title';
import { MetricBox, MVIMetricBox } from './MetricBox';

let data = [
    { x: new Date(2021, 1, 1), y: 532.2 }, { x: new Date(2021, 2, 1), y: 453.4 },
    { x: new Date(2021, 3, 1), y: 422.8 }, { x: new Date(2021, 4, 1), y: 531.6 },
    { x: new Date(2021, 5, 1), y: 642.3 }, { x: new Date(2021, 6, 1), y: 432.5 },
    { x: new Date(2021, 7, 1), y: 462.9 }, { x: new Date(2021, 8, 1), y: 445.8 },
    { x: new Date(2021, 9, 1), y: 561.4 }, { x: new Date(2021, 10, 1), y: 433.1 }
];
export interface MVIMetricSection {
    metricBoxNodels: MVIMetricBox[];
    chart: TvChart;
}
export function MetricsSection(params: MVIMetricSection): UIView {
    const [selectedIndex, setSelectedIndex] = bindState(0);
    return (
        // We want to space 10px between every vertical block
        VStack({ alignment: cTopLeading, spacing: 10 })(
            HStack(
                Text('Metrics').paddingTop('5px').height(38).fontFamily('Proxima Nova').fontSize(20).foregroundColor('#333333'),
                Spacer(),
                UIButton(
                    Icon('\\f04a').size(20).foregroundColor({ default: 'rgb(120,120,120, 50%)', hover: 'rgb(120,120,120, 80%)' }),
                )
            )
                // We prevent this stack to large more than its content
                .height(),
            HStack({ spacing: 10 })(
                ...ForEach(params.metricBoxNodels, (metricBoxModel: MVIMetricBox, index: int) =>
                    MetricBox(metricBoxModel, selectedIndex === index).onClick(() => setSelectedIndex(index)),
                )
            ).height(150),
            TileBox(
                VStack({ alignment: cTopLeading })(
                    TileBoxHeaderText('Daily cases per month').marginBottom('10px'),
                    VStack(
                        ChartView()(
                            AreaSerie().xName('x').yName('y').border({ color: '#FBCD4E', width: 3 })
                                .marker({ visible: true, width: 10, height: 10, fill: '#FBB90A', border: { color: 'white' } })
                                .fill('#FBCD4E55')
                                .data(data)
                        )
                            .xAxis({
                                labelStyle: {
                                    fontFamily: 'Ubuntu, sans-serif',
                                    size: '14px'
                                },
                                valueType: 'DateTime',
                                labelFormat: 'MMM',
                                majorGridLines: { width: 0 },
                                intervalType: 'Months',
                                edgeLabelPlacement: 'Shift'
                            })
                            .yAxis({
                                labelStyle: {
                                    fontFamily: 'Ubuntu, sans-serif',
                                    size: '14px'
                                },
                                labelFormat: '{value}',
                                lineStyle: { width: 0 },

                                majorTickLines: { width: 0 },
                                minorTickLines: { width: 0 }
                            })
                            .backgroundColor('transparent')
                    )
                )
            ).height('300px')
        )
    )
}


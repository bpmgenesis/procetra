import { ChartView, ChartViewClass, BarSerie, AreaSerie } from '@tuval/components/charts';

export function EventsOverViewChart(data): ChartViewClass {
    return (
        ChartView()(
            AreaSerie().xName('x').yName('y')
                .columnWidth(0.5)
                .fill('#FFD062')
                .data(data)
        )
            .xAxis({
                labelStyle: {
                    fontFamily: 'Ubuntu, sans-serif',
                    size: '14px'
                },
                valueType: 'Category',
                labelFormat: 'MMM',
                majorGridLines: { width: 0 },
                intervalType: 'Months'
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
}
import { Sparkline, SparklineModel, SparklineViewClass } from '@tuval/components/charts';


export function TileSparkLine(model: SparklineModel): SparklineViewClass {
    return (
        Sparkline().model(model)
            .slType('Area')
            .slWidth('100%')
            .slHeight('50px')
            .slPadding({
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            })
            .slLineWidth(1)
            .slOpacity(1)
            .slFill('#b2cfff')
            .slBorder({ color: '#3C78EF', width: 2 })
            .slValueType('Category')
            .marginBottom('-4px')
    )
}
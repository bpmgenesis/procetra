import { TvChart, sort, ITooltipRenderEventArgs, IPointRenderEventArgs } from '@tuval/components/charts';
import { humanizeDuration } from '../../../../../Logic/utils/generic/humanize-duration';
import { Convert } from '@tuval/core';

const isInteger = Number.isInteger || function (value) {
    return typeof value === 'number' &&
        isFinite(value) &&
        Math.floor(value) === value;
};

export class MedianChart extends TvChart {
    overTotal: number;
    public override InitComponents() {
        this.Width = 900;
        this.Height = 300;

        this.PrimaryXAxis = {
            title: 'Activities',
            titleStyle: {
                fontFamily: 'Ubuntu',
                size: '14px',
                color: '#333'
            },
            valueType: 'Category',
            interval: 1,
            visible: true,
            labelStyle: { color: 'transparent' },
            majorGridLines: { width: 1 },
            majorTickLines: { width: 0 },
            stripLines: [{
                startFromAxis: true,
                size: 5,
                sizeType: 'Years',
                isRepeat: true,
                repeatEvery: 10,
                visible: true,
                color: 'rgba(167,169,171, 0.1)'
            }]
        };

        this.PrimaryYAxis = {
            title: 'Median duration',
            titleStyle: {
                fontFamily: 'Ubuntu',
                size: '14px',
                color: '#333'
            },
            majorGridLines: { width: 1 },
            majorTickLines: { width: 0 },
            lineStyle: { width: 1 },
            labelStyle: { color: 'transparent' },
        };

        this.TooltipRender.add((args: ITooltipRenderEventArgs) => {
            if (args.series.name === 'Median') {
                args.text = `${args.data.pointX}<br>Median duration: ${humanizeDuration(Convert.ToInt32(args.data.pointY as any) * 1000, { units: ["d", "h", "m", "s"], round: true })}`;
            } else {
                let sc: any = ((args.data.pointY as any) / this.overTotal) * 100;
                if (!isInteger(sc)) {
                    sc = sc.toFixed(2);
                }
                args.text = `Cumulative: ${sc}%`;
            }
            args.headerText = '';
            args.textStyle = {
                fontFamily: 'Ubuntu',
                size: '14px'
            };
        });

        const colors = ['#357CD2', '#548CD1'];
        this.PointRender.add((args: IPointRenderEventArgs) => {
            args.fill = colors[args.point.index % 2];
        });
    }

    public SetChartData(chartData: any[]) {
        chartData = sort(chartData, ['median'], true);
        const data = []
        const data1 = [];
        let total = 0;
        this.overTotal = 0;
        for (let i = 0; i < chartData.length; i++) {
            this.overTotal += chartData[i]['median'];
        }
        for (let i = 0; i < chartData.length; i++) {
            total += chartData[i]['median'];
            data.push({
                x: chartData[i]['concept:name'],
                y: chartData[i]['median'],
            });
            data1.push({
                x: chartData[i]['concept:name'],
                y: total,
            });
        }

        this.Series = [
            {
                type: 'Column',
                dataSource: data /* sort(data, ['y'], true) */,
                columnSpacing: -0.4,
                name: 'Median',
                xName: 'x',
                width: 2,
                yName: 'y',
                cornerRadius: {
                    topLeft: 5, topRight: 5
                },

                marker: {
                    dataLabel: {
                        visible: false,
                        position: 'Top',
                        font: {
                            fontFamily: 'Ubuntu',
                            size: '12px',
                            fontWeight: '600', color: '#ffffff'
                        }
                    }
                },

            },
            {
                type: 'Line',
                dataSource: data1,
                xName: 'x', width: 2,
                name: 'Rate',
                marker: {
                    visible: true,
                    width: 10,
                    height: 10
                },
                yName: 'y',
            }
        ];
    }
}
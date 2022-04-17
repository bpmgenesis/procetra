import { TvChart, sort, ITooltipRenderEventArgs, IPointRenderEventArgs } from '@tuval/components/charts';
export class ItemFrequencyChart extends TvChart {
    public override InitComponents() {
        this.Width = 900;
        this.Height = 300;



        this.PrimaryYAxis = {
            title: 'Frequency',
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
            if (args.series.name === 'Count') {
                args.text = `${args.data.pointX}<br>Frequency: ${args.data.pointY}`;
            } else {
                args.text = `Cumulative: ${args.data.pointY}%`;
            }
            args.headerText = '';
            args.textStyle = {
                fontFamily: 'Ubuntu',
                size: '14px'
            };
        });

        const colors = ['#357CD2', '#548CD1'];
        this.PointRender.add((args: IPointRenderEventArgs) => {
            if (args.series.type === 'Column') {
                args.fill = colors[args.point.index % 2];
            }
        });
    }

    public Bind(chartData: any[], item_name: string) {

        this.PrimaryXAxis = {
            title: item_name,
            titleStyle: {
                fontFamily: 'Ubuntu',
                size: '14px',
                color: '#333'
            },
            valueType: 'Category',
            crosshairTooltip: { enable: true },
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


        chartData = sort(chartData, ['count'], true);
        const data = []
        const data1 = [];
        let total = 0;
        for (let i = 0; i < chartData.length; i++) {
            total += chartData[i]['rate'];
            data.push({
                x: chartData[i]['item_name'],
                y: chartData[i]['count'],
            });
            data1.push({
                x: chartData[i]['item_name'],
                y: total,
            });
        }

        this.Series = [
            {
                type: 'Column',
                dataSource: data /* sort(data, ['y'], true) */,
                columnSpacing: -0.4,
                name: 'Count',
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
                xName: 'x',
                fill: '#B80000',
                width: 4,
                name: 'Rate',
                marker: {
                    visible: true,
                    width: 10,
                    height: 10,
                    fill: 'white'
                },
                yName: 'y',
            }
        ];
    }
}
import { TvChart, sort, ITooltipRenderEventArgs, IPointRenderEventArgs } from '@tuval/components/charts';
import { humanizeDuration } from '../../../../../Logic/utils/generic/humanize-duration';
import { Convert } from '@tuval/core';
declare var moment;
const isInteger = Number.isInteger || function (value) {
    return typeof value === 'number' &&
        isFinite(value) &&
        Math.floor(value) === value;
};

const colors = ['#357CD2', '#548CD1'];

export class EventsOverTimeChart extends TvChart {
    overTotal: number;
    public override InitComponents() {
        this.Appearance.Width = '98%';
        this.Appearance.Height = '95%';

        this.CreateFrameElement = false;
        this.Appearance.Background = 'transparent';

        this.PrimaryXAxis = {
           /*  title: 'Timeline', */
            titleStyle: {
                fontFamily: 'Ubuntu',
                size: '14px',
                color: '#333'
            },
            valueType: 'Category',
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
           /*  title: 'Events', */
            titleStyle: {
                fontFamily: 'Proxima Nova',
                size: '14px',
                color: '#333'
            },
            majorGridLines: { width: 1 },
            majorTickLines: { width: 0 },
            lineStyle: { width: 1 },
            labelStyle: { color: 'transparent' },
        };

        this.TooltipRender.add((args: ITooltipRenderEventArgs) => {
            /*  if (args.series.name === 'Count') {
                 args.text = `${args.data.pointX}<br>Frequency: ${args.data.pointY}`;
             } else {
                 args.text = `Cumulative: ${args.data.pointY}%`;
             } */
            args.text = moment((args.data.pointX as any) / 1000000).format()
            args.headerText = '';
            args.textStyle = {
                fontFamily: 'Ubuntu',
                size: '14px'
            };
        });


        this.PointRender.add((args: IPointRenderEventArgs) => {
            args.fill = colors[0];
        });
    }

    public SetChartData(chartData: any) {
        // chartData = sort(chartData, ['median'], true);
        const data = []
        for (let key in chartData) {
            data.push({
                x: key,
                y: chartData[key],
            });
        }

        this.Series = [

            {
                type: 'Column',
                dataSource: data /* sort(data, ['y'], true) */,
                fill:colors[0],
                name: 'Median',
                xName: 'x',
                yName: 'y',
                opacity:0.5
            },

        ];
    }
}
import { TvChart, ChartView } from '@tuval/components/charts';
import { UIView, VStack, HStack, Text, Alignment, Spacer, UIButton, Icon, ForEach, cTopLeading } from '@tuval/forms';
import { MetricBox, MVIMetricBox } from './MetricBox';

export interface MVIMetricSection {
    metricBoxNodels: MVIMetricBox[];
    chart: TvChart;
}
export function MetricsSection(params: MVIMetricSection): UIView {
    return (
        // We want to space 10px between every vertical block
        VStack({ alignment: cTopLeading, spacing: 10 })(
            HStack(
                Text('Metrics').paddingTop('5px').height('38px').fontFamily('Proxima Nova').fontSize('20px').foregroundColor('#333333'),
                Spacer(),
                UIButton(
                    Icon('\\f04a').size(20).foregroundColor({ default: 'rgb(120,120,120, 50%)', hover: 'rgb(120,120,120, 80%)' }),
                )
            )
                // We prevent this stack to large more than its content
                .height('auto'),
            HStack({ spacing: 10 })(
                ...ForEach(params.metricBoxNodels, (metricBoxModel: MVIMetricBox) =>
                    MetricBox(metricBoxModel),
                )
            ).height(150),
            VStack({ alignment: cTopLeading })(
                Text('Daily cases per month').padding('20px 30px 0 30px').fontFamily('Proxima Nova').fontSize('14px').foregroundColor('#888888'),
                VStack(
                    /* params.chart */
                    ChartView().backgroundColor('transparent')
                )

            )
                .backgroundColor('rgb(255,255,255,60%)')
                .cornerRadius('12px')
                .height('300px')
                .shadow({ default: '0 1px 3px 0 rgb(0 0 0 / 10%), 0 2px 5px 0 rgb(0 0 0 / 5%)', focus: '0 0 3px 1px #00c3ff' })
                .tabIndex(0)
        )
    )
}
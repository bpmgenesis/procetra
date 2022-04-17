import { TvChart } from '@tuval/components/charts';
import { UIView, VStack, HStack, Text, Alignment, Spacer, UIButton, Icon } from '@tuval/forms';
import { MetricBox } from './MetricBox';


export function MetricsSection(params: { chart: TvChart }): UIView {
    return (
        VStack(
            HStack(
                Text('Metrics').paddingTop('5px').height('38px').fontFamily('Proxima Nova').fontSize('20px').foregroundColor('#333333'),
                Spacer(),
                UIButton(
                    Icon('\\f04a').size(20).foregroundColor({ default: 'rgb(120,120,120, 50%)', hover: 'rgb(120,120,120, 80%)' }),
                )
            )
                // We prevent this stack to large more than its content
                .height('auto'),
            HStack(
                MetricBox({ title: 'Cases per date', value: '694', subTitle: 'Total number of cases per day' }),
                MetricBox({ title: 'Cases per date', value: '694', subTitle: 'Total number of cases per day' }),
                MetricBox({ title: 'Cases per date', value: '694', subTitle: 'Total number of cases per day' })
            ).height('auto').spacing('10px'),
            VStack(
                Text('Daily cases per month').padding('20px 30px 0 30px').fontFamily('Proxima Nova').fontSize('14px').foregroundColor('#888888'),
                VStack(
                    params.chart
                )

            ).backgroundColor('rgb(255,255,255,60%)').cornerRadius('12px').height('200px').alignment(Alignment.topLeading)
        )
            .alignment(Alignment.topLeading)
            // We want to space 10px between every vertical block
            .spacing('10px')
    )
}
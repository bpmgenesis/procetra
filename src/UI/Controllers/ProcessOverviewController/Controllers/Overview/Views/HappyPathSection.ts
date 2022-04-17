import { TvChart } from '@tuval/components/charts';
import { UIView, VStack, HStack, Text, Alignment } from '@tuval/forms';
import { MetricBox } from './MetricBox';
import { HappyPathBox2, HappyPathBox3 } from './HappyPathBox';


export function HappyPathSection(): UIView {
    return (
        VStack(
            Text('Happy path').paddingTop('5px').height('38px').fontFamily('Proxima Nova').fontSize('20px').foregroundColor('#333333'),
            HStack(
                MetricBox({ title: 'Cases per date', value: '694', subTitle: 'Total number of cases per day' }),
                HappyPathBox2(),
                HappyPathBox3()
            ).height('auto').spacing('10px'),
            VStack(
                Text('Algorithmic happy path').padding('20px 30px 0 30px').fontFamily('Proxima Nova').fontSize('14px').fontWeight('500').foregroundColor('#888888'),
                VStack(

                )

            ).backgroundColor('rgb(255,255,255,60%)').cornerRadius('12px').height('200px').alignment(Alignment.topLeading)
        )
            .alignment(Alignment.topLeading)
            // We want to space 10px between every vertical block
            .spacing('10px')
    )
}
import { TvChart } from '@tuval/components/charts';
import { UIView, VStack, HStack, Text, Alignment, Spacer, UIButton, Icon, _ForEach, cTopLeading } from '@tuval/forms';
import { MetricBox } from './MetricBox';
import { ActivityBox, MVIActivityBox } from './ActivityBox';


export function ActivitySection(activities: MVIActivityBox[]): UIView {
    return (
        // We want to space 10px between every vertical block
        VStack({ alignment: cTopLeading, spacing: 10 })(
            HStack(
                Text('Other frequent activities')
                    .marginTop('30px')
                    .paddingTop('5px')
                    /*    .height('38px') */
                    .fontFamily('Proxima Nova')
                    .fontSize('20px')
                    .foregroundColor('#333333'),
                Spacer(),
                UIButton(
                    Icon('\\f04a').size(20).foregroundColor({ default: 'rgb(120,120,120, 50%)', hover: 'rgb(120,120,120, 80%)' }),
                )
            )
                // We prevent this stack to large more than its content
                .height('auto'),
            HStack(
                ..._ForEach(activities)(activity =>
                    ActivityBox({ activityName: activity.activityName, casePercentage: activity.casePercentage, eventCount: activity.eventCount }),
                )
            ).height('auto').wrap('wrap').alignment(Alignment.topLeading),
        )

    )
}
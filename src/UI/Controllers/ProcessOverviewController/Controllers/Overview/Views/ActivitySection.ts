import { TvChart } from '@tuval/components/charts';
import { UIView, VStack, HStack, Text, Alignment, Spacer, UIButton, Icon, ForEach } from '@tuval/forms';
import { MetricBox } from './MetricBox';
import { ActivityBox, MVIActivityBox } from './ActivityBox';


export function ActivitySection(activities: MVIActivityBox[]): UIView {
    return (
        VStack(
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
                ...ForEach(activities, (activity: MVIActivityBox) =>
                    ActivityBox({ activityName: activity.activityName, casePercentage: activity.casePercentage, eventCount: activity.eventCount }),
                )
            ).height('auto').wrap('wrap').alignment(Alignment.topLeading),
        )
            .alignment(Alignment.topLeading)
            // We want to space 10px between every vertical block
            .spacing(10)
    )
}
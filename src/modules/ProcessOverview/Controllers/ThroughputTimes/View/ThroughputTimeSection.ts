import { cTop, cTopLeading, HStack, Icon, Spacer, UIButton, UIView, VStack } from '@tuval/forms';

import { RegularText, SectionHeadline, SectionSubHeadline } from '../../../../../UI/Views/Texts';
import { TileBox } from '../../../../../UI/Views/TileBox';

function DurationHeadline(value: string): UIView {
    return (
        RegularText(value)
            .cursor('pointer')
            .border('dashed 1px var(--sub-border-color)')
            .transition('border .3s')
    )
}

function DurationText(value: string): UIView {
    return (
        RegularText(value).fontSize(40).foregroundColor('#666')
    )
}

function DurationUnitText(value: string): UIView {
    return (
        RegularText(value).fontSize(20).foregroundColor('#666')
            .cursor('pointer')
            .border('dashed 1px var(--sub-border-color)')
            .transition('border .3s')
    )
}

function ProcessStartEnd(): UIView {
    return (
        HStack({ spacing: 10 })(
            RegularText('Process start').fontWeight('bold').foregroundColor('#555'),
            Icon('\\f084').size(20).marginBottom('3px'),
            RegularText('Process end').fontWeight('bold').foregroundColor('#555')
        )
            .cursor('pointer')
            .border({ default: 'dashed 1px var(--sub-border-color)', hover: 'solid 1px #2ca3c0' })
            .height() //auto
            .width() //auto
    )
}

export function ThroughputTimeSection(chart: any): UIView {
    return (
        VStack({ alignment: cTopLeading })(
            HStack(
                SectionHeadline('Throughput Time Search'),
                Spacer(),
                UIButton(
                    Icon('\\f04a').size(20).foregroundColor({ default: 'rgb(120,120,120, 50%)', hover: 'rgb(120,120,120, 80%)' }),
                )
            )
                // We prevent this stack to large more than its content
                .height('auto'),
            SectionSubHeadline('Select any two activities to see throughput time between them'),

            TileBox(
                VStack({ alignment: cTop })(
                    DurationHeadline('Average Throughput time'),
                    HStack(
                        DurationText('24'),
                        DurationUnitText('Days')
                    ),
                    ProcessStartEnd()
                )
                    .padding(10)
                    .height(),
                VStack(
                    chart
                )
            )
                .variable('--sub-border-color', { default: 'transparent', hover: '#14a9d5' })
                .alignment(cTop)
        )
        // We want to space 10px between every vertical block

    )
}
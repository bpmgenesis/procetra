import { UIView, HStack, Icon, Text } from '@tuval/forms';


function TimeText(value: string): UIView {
    return (
        Text(value).padding('5px 5px').fontFamily('Ubuntu,sans-serif').fontSize('16px').fontWeight('700').foregroundColor('#989898')
    )
}

export function TimeLineFilter(): UIView {
    return (
        HStack({ spacing: 5 })(
            Icon('\\f043').size(20).foregroundColor('#777'),
            TimeText('1H'),
            TimeText('8H'),
            TimeText('24H'),
            TimeText('3D'),
            TimeText('7D'),
            TimeText('All'),
            TimeText('Custom'),
        )
            .width() // auto

    )
}
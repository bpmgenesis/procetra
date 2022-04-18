import { UIView, VStack, HStack, Icon, Text, Alignment } from '@tuval/forms';


export function FilterView(): UIView {
    return (
        VStack(
            VStack(
                HStack(
                    Icon('\\f121').size(25).foregroundColor('#55606c'),
                    Text('Add Filter').fontFamily('Ubuntu,sans-serif').fontSize('15px').fontWeight('700').foregroundColor('#999')
                )
                    .spacing(10)
                    .padding('5px 10px')
                    .alignment(Alignment.leading)
            )
                .height() //auto
                .backgroundColor('#141719')
                .border('1px solid transparent')
                .cornerRadius(6)
        )

    )
}
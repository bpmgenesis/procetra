import { cLeading, HStack, Icon, Text, UIView, VStack } from '@tuval/forms';


/**
 * Portal menude en tepedeki filtre görünümüdür.
 * @returns
 */
export function FilterView(): UIView {
    return (
        VStack(
            VStack(
                HStack({ alignment: cLeading, spacing: 10 })(
                    Icon('\\d349').size(25).foregroundColor('#55606c'),
                    Text('Add Filter').fontFamily('Ubuntu,sans-serif').fontSize('15px').fontWeight('700').foregroundColor('#999')
                ).padding('5px 10px')
            )
                .height() //auto
                .backgroundColor('#141719')
                .border('1px solid transparent')
                .cornerRadius(6)
        )

    )
}
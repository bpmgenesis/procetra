import { UIButton, Text, CornerRadiusTypes, UIButtonClass, Icon } from '@tuval/forms';

export function SliderButton(text: string): UIButtonClass {
    return (
        UIButton(
            Text(text)
        )
            .background('#fff')
            .foregroundColor('#888')
            .border('1px solid #ccc')
            .borderBottom('2px solid #ccc')
            .padding('4px 10px')
            .cornerRadius(CornerRadiusTypes.Rounded)
            .fontSize('12px')
            .height(25)

    )
}

export function SliderIconButton(icon: string,text: string): UIButtonClass {
    return (
        UIButton(
            Text(text),
            Icon(icon).size(14).foregroundColor('#888').marginLeft('5px'),
        )
            .background('#fff')
            .foregroundColor('#888')
            .border('1px solid #ccc')
            .borderBottom('2px solid #ccc')
            .padding('4px 10px')
            .cornerRadius(CornerRadiusTypes.Rounded)
            .fontSize('12px')
            .height(25)

    )
}
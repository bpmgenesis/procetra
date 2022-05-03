import { UIButtonClass, UIButton, Text, Icon, TApplication } from '@tuval/forms';
import { is } from '@tuval/core';

export function HeadLineButton(title: string, icon?: string): UIButtonClass {
    return (
        UIButton(
            is.nullOrEmpty(icon) ? null : Icon(icon).size(14).foregroundColor('gray').marginRight('5px'),
            is.nullOrEmpty(title) ? null :  Text(title)
        )
            .border({
                default: 'solid 1px #C8D2DC',
                hover: 'solid 1px #B4BEC8',
                active: 'solid 1px #B4BEC8'
            })
            .backgroundColor({
                default: '#EBF0F5',
                hover: '#E7ECF1',
                active: '#E1E6EB'
            })
            .cornerRadius(10)
            .padding('3px 10px 3px 10px')
            .visible(TApplication.IsDesktop)
    )
}
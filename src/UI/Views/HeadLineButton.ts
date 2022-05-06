import { UIButtonClass, UIButton, Text, Icon, TApplication } from '@tuval/forms';
import { is } from '@tuval/core';

export function HeadLineButton(title: string, icon?: string): UIButtonClass {
    return (
        UIButton(
            is.nullOrEmpty(icon) ? null : Icon(icon).size(14).foregroundColor('gray'),
            is.nullOrEmpty(title) ? null : Text(title)
        )
            .border({
                default: 'solid 1px #CCC',
                hover: 'solid 1px #B4BEC8',
                active: 'solid 1px #B4BEC8'
            })
            .backgroundColor({
                default: '#FFFFFFAA',
                /*   hover: '#E7ECF1',
                  active: '#E1E6EB' */
            })
            //.initial({ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' })
            .hover({ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px' })
            .minHeight('25px')
            .cornerRadius(5)
            .padding('3px 5px 3px 5px')
            .visible(TApplication.IsDesktop)
    )
}
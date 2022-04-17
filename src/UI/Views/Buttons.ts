import { UIView, UIButton, Text, UIButtonClass } from '@tuval/forms';

export function AcceptButton(...content: UIView[]): UIButtonClass {
    return (
        UIButton(
            ...content
        )
            .foregroundColor('white')
            .border({
                default: 'solid 1px #1687D9',
                hover: 'solid 1px #07c',
                active: 'solid 1px #07c'
            })
            .backgroundImage({
                default: ' linear-gradient(#32AAFF, #1994EB)',
                hover: 'linear-gradient(#25A4FF, #028AEB)',
                active: 'linear-gradient(#1897F2, #0182DF)'
            })
            .backgroundColor({
                default: '#1994EB',
                hover: '#028AEB',
                active: '#0182DF'
            })
            .height('27px')
            .minWidth('90px')
            .margin('8px 10px 8px 0px')
            .cornerRadius('3px')
    )
}

export function CancelButton(...content: UIView[]): UIButtonClass {
    return (
        UIButton(
            ...content
        )
            .foregroundColor('#505A64')
            .border({
                default: 'solid 1px #C8D2DC',
                hover: 'solid 1px #B4BEC8',
                active: 'solid 1px #B4BEC8'
            })
            .backgroundImage({
                default: 'linear-gradient(#f5faff, #ebf0f5)',
                hover: 'linear-gradient(#f5faff, #e7ecf1)',
                active: 'linear-gradient(#ebf0f5, #e1e6eb)'
            })
            .backgroundColor({
                default: '#EBF0F5',
                hover: '#E7ECF1',
                active: '#E1E6EB'
            })
            .height('27px')
            .minWidth('90px')
            .margin('8px 10px 8px 0px')
            .cornerRadius('3px')
    )
}


export function DefaultButton(...content: UIView[]): UIButtonClass {
    return (
        UIButton(
            ...content
        )
            .foregroundColor('#505A64')
            .border({
                default: 'solid 1px #C8D2DC',
                hover: 'solid 1px #B4BEC8',
                active: 'solid 1px #B4BEC8'
            })
            .backgroundImage({
                default: 'linear-gradient(#f5faff, #ebf0f5)',
                hover: 'linear-gradient(#f5faff, #e7ecf1)',
                active: 'linear-gradient(#ebf0f5, #e1e6eb)'
            })
            .backgroundColor({
                default: '#EBF0F5',
                hover: '#E7ECF1',
                active: '#E1E6EB'
            })
            .height('27px')
            .width('90px')
            .margin('8px 10px 8px 0px')
            .cornerRadius('3px')
    )
}
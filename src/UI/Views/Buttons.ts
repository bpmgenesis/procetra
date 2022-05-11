import { UIView, UIButton, Text, UIButtonClass, TApplication } from '@tuval/forms';


export function SelectButton(value: string): UIButtonClass {
    return (
        UIButton(
            Text(value).fontSize(TApplication.IsPortal ? '16px' : '')
        )
            .height('34px')
            .padding('15px 15px')
            .cornerRadius(3)
            .lineHeight('24px')
            .minHeight('24px')
            .shadow({ default: '0 2px 5px 0 rgb(0 0 0 / 26%)', active: '0 4px 8px 0 rgb(0 0 0 / 40%)' })
            .foregroundColor('rgba(255,255,255,0.87)')
            .backgroundColor({ default: 'rgb(43,170,181)', hover: 'rgb(127,217,225)' })
    )
}
export function AcceptButton(value: string): UIButtonClass {
    return (
        UIButton(
            Text(value).fontSize(TApplication.IsPortal ? '16px' : '')
        )
            .foregroundColor(TApplication.IsPortal ? '#eee' : 'white')
            .border({
                default: 'solid 1px #1687D9',
                hover: 'solid 1px #07c',
                active: 'solid 1px #07c'
            })
            .backgroundImage({
                default: TApplication.IsDesktop ? ' linear-gradient(#32AAFF, #1994EB)' : '',
                hover: TApplication.IsDesktop ? 'linear-gradient(#25A4FF, #028AEB)' : '',
                active: TApplication.IsDesktop ? 'linear-gradient(#1897F2, #0182DF)' : ''
            })
            .backgroundColor({
                default: TApplication.IsPortal ? '#288ae2' : '#1994EB',
                hover: TApplication.IsPortal ? '#1a70bd' : '#028AEB',
                active: '#0182DF'
            })
            .height('27px')
            .minWidth(TApplication.IsPortal ? '140px' : '90px')
            .minHeight(TApplication.IsPortal ? '33px' : '')
            .margin('8px 10px 8px 0px')
            .cornerRadius('3px')
    )
}

export function CancelButton(value: string): UIButtonClass {
    return (
        UIButton(
            Text(value).fontSize(TApplication.IsPortal ? '16px' : '')
        )
            .foregroundColor(TApplication.IsPortal ? '#ddd' : '#505A64')
            .border({
                default: TApplication.IsPortal ? '1px solid #55606c' : 'solid 1px #C8D2DC',
                hover: TApplication.IsPortal ? '1px solid #55606c' : 'solid 1px #B4BEC8',
                active: TApplication.IsPortal ? '1px solid #55606c' : 'solid 1px #B4BEC8'
            })
            .backgroundImage({
                default: TApplication.IsPortal ? '' : 'linear-gradient(#f5faff, #ebf0f5)',
                hover: TApplication.IsPortal ? '' : 'linear-gradient(#f5faff, #e7ecf1)',
                active: TApplication.IsPortal ? '' : 'linear-gradient(#ebf0f5, #e1e6eb)'
            })
            .backgroundColor({
                default: TApplication.IsPortal ? 'transparent' : '#EBF0F5',
                hover: TApplication.IsPortal ? '#354251' : '#E7ECF1',
                active: '#E1E6EB'
            })
            .height('27px')
            .minWidth(TApplication.IsPortal ? '140px' : '90px')
            .minHeight(TApplication.IsPortal ? '33px' : '')
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
import { UIView, UIButton, VStack, Icon } from '@tuval/forms';

export function MenuButton(title: string, icon: string, action: Function): UIView {
    return (
        UIButton(
            VStack(
                Icon(icon).size(30)
            )
        )
            .width(64).height(64)
            .transition('all 0.35s')
            .background('rgb(255,255,255,50%)')
            .padding(8)
            .border('solid 1px rgb(120,120,120,20%)')
            .cornerRadius(12)
            .shadow('rgba(100, 100, 111, 0.2) 0px 7px 29px 0px')
            .action(() => action())
    )
}

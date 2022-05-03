import { UIView, UIButton, VStack, Icon, UIMotion } from '@tuval/forms';

/**
 * Desktop görünümünde ana sayfadaki temel fonksiyon butonlarının görünümüdür.
 * @param title
 * @param icon
 * @param action
 * @returns
 */
export function MenuButton(title: string, icon: string, action: Function): UIView {
    return (

        UIButton(
            VStack(
                Icon(icon).size(30)
            )
        )
            .initial({ scale: 1, boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' })
            .hover({ scale: 1.1, boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px' })
            .width(64).height(64)
            .background('rgb(255,255,255,50%)')
            .padding(8)
            .border('solid 1px rgb(120,120,120,20%)')
            .cornerRadius(12)
            /* .shadow('rgba(100, 100, 111, 0.2) 0px 7px 29px 0px') */
            .action(() => action())

    )
}

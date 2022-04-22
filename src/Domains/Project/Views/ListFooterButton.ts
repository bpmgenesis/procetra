import { UIView, UIButton, Icon, UIButtonClass } from '@tuval/forms';
import { DefaultButton } from '../../../UI/Views/Buttons';

/* export function ListFooterButton(iconContent: string): UIButtonClass {
    return (
        UIButton(
            Icon(iconContent).size(15)
        )
            .padding('5px')
            .backgroundImage('linear-gradient(#f5faff, #ebf0f5)')
            .background('#EBF0F5')
            .border('solid 1px #C8D2DC')
            .cornerRadius('5px')
            .width('32px')
            .height('32px')
            .opacity('0.8')
    );
} */

export function ListFooterButton(iconContent: string): UIButtonClass {
    return (
        DefaultButton(
            Icon(iconContent).size(15)
        )
            .border('solid 1px #C8D2DC')
            .cornerRadius('5px')
            .width('32px')
            .height('32px')
            .opacity('0.8')
    );
}
import { UIView, VStack, Text } from '@tuval/forms';

export function VariantActivityShapeView(text: string): UIView {
    return (
        VStack(
            VStack(
                Text(text)
                .marginLeft('5px')
                .marginRight('20px')
            )
                .width('150px')
                .height('80px')
                .clipPath('polygon(0% 0%, 75% 0%, 95% 50%, 75% 100%, 0% 100%)')
                .background('yellow')
        ).width('auto').height('auto').filter('drop-shadow(-1px 6px 3px rgba(50, 50, 0, 0.5))')
    )
}
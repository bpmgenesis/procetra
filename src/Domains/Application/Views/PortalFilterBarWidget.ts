import { int } from '@tuval/core';
import { cLeading, HStack, Text, UIView, VStack } from '@tuval/forms';

export interface IPortalFilterBarWidgetParams {
    value: int;
}
export function PortalFilterBarWidget(params: IPortalFilterBarWidgetParams): UIView {
    return (
        VStack({ alignment: cLeading })(
            HStack({ alignment: cLeading, spacing: 10 })(
                Text(params.value.toString()).fontSize('40px').foregroundColor('rgb(147,205,221)'),
                VStack({ alignment: cLeading })(
                    Text('monts').foregroundColor('rgb(251,192,1)').fontSize('10px').fontWeight('700'),
                    Text('AVG').foregroundColor('#AAA')
                )
            ),
            VStack({ alignment: cLeading })(
                Text('Duration').foregroundColor('rgb(147,205,221)'),
                Text('15 - 40 monts').foregroundColor('#AAA')
            )
        )
            .paddingRight('50px')
            .width() //auto
    )
}
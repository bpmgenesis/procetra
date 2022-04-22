import { int } from '@tuval/core';
import { VStack, HStack, UIView, Text, Alignment } from '@tuval/forms';

export interface IPortalFilterBarWidgetParams {
    value: int;
}
export function PortalFilterBarWidget(params: IPortalFilterBarWidgetParams): UIView {
    return (
        VStack(
            HStack(
                Text(params.value.toString()).fontSize('40px').foregroundColor('rgb(147,205,221)'),
                VStack(
                    Text('monts').foregroundColor('rgb(251,192,1)').fontSize('10px').fontWeight('700'),
                    Text('AVG').foregroundColor('#AAA')
                ).alignment(Alignment.leading)
            )
                .spacing(10)
                .alignment(Alignment.leading),
            VStack(
                Text('Duration').foregroundColor('rgb(147,205,221)'),
                Text('15 - 40 monts').foregroundColor('#AAA')
            )
                .alignment(Alignment.leading)
        )
            .paddingRight('50px')
            .width() //auto
            .alignment(Alignment.leading)
    )
}
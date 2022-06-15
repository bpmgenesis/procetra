import {
    cLeading,
    Color,
    cTopLeading,
    ForEach,
    HStack,
    Icon,
    Spacer,
    Text,
    TextAlignment,
    UIContextMenu,
    UIView,
    VStack,
    ZStack,
} from '@tuval/forms';

import { IMiningModelModel } from '@procetra/common';
import { RegularText } from '../../../UI/Views/Texts';
import { MVITitleMenu } from '../Models/MVITitleMenu';



export function AnalyseModelTileBox(params: IMiningModelModel, menuItems: MVITitleMenu[]): UIView {
    return (
        VStack({ alignment: cTopLeading })(
            ZStack(
                // Icon('\\d271').size(100).foregroundColor('rgb(120,120,120,10%)').left('10px').bottom('0'),
                Icon('\\d1fd').size(100).foregroundColor('rgb(120,120,120,10%)').right('-13px').bottom('-2px'),
                HStack({ spacing: 10 })(
                    Icon('\\d31a').size(20),
                    RegularText(params.model_name).fontSize('18px').lineHeight('20px').multilineTextAlignment(TextAlignment.leading),
                    Spacer(),
                    UIContextMenu(
                        ...ForEach(menuItems)(item =>
                            HStack({ alignment: cLeading, spacing: 10 })(
                                Icon(item.icon).size(16).foregroundColor(item.iconColor),
                                Text(item.title).foregroundColor(item.iconColor)
                            ).onClick((e) => { item.onClick(params) })
                        )
                    )(
                        Icon('\\d2c6').size(20),
                    ).cursor('pointer').border('solid 1px var(--sub-border-color)').transition('border .3s'),
                ).width('100%').height().padding(15)
            )
        )
            .alias('AnalyseModelTileBox')
            .initial({ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' })
            .hover({ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px' })
            .margin('10px')
            .cornerRadius(5)
            // .shadow('rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px')
            .minWidth('250px')
            .minHeight('130px')
            .maxWidth('250px')
            .maxHeight('130px')
            .background(Color.white.opacity(0.3))
            .variable('--sub-border-color', { default: 'transparent', hover: '#14a9d5' })
    )

}
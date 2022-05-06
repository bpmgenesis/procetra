import { UIView, VStack, cTopLeading, ZStack, Icon, HStack, Color, UIContextMenu, Spacer, Text, ForEach, cLeading } from '@tuval/forms';
import { RegularText } from '../../../UI/Views/Texts';
import { MVIAnalyseModel } from '../Models/MVIAnalyseModel';
import { MVITitleMenu } from '../Models/MVITitleMenu';



export function AnalyseModelTileBox(params: MVIAnalyseModel, menuItems: MVITitleMenu[]): UIView {
    return (
        VStack({ alignment: cTopLeading })(
            ZStack(
                Icon('\\f0f1').size(80).foregroundColor('rgb(120,120,120,10%)').left('10px').bottom('0'),
                Icon('\\f08f').size(90).foregroundColor('rgb(120,120,120,10%)').right('10px').bottom('10px'),
                HStack({ spacing: 10 })(
                    Icon('\\f0f2').size(20),
                    RegularText(params.name).fontSize('18px').lineHeight('20px'),
                    Spacer(),
                    UIContextMenu(
                        ...ForEach(menuItems)(item =>
                            HStack({ alignment: cLeading, spacing: 10 })(
                                Icon(item.icon).size(16),
                                Text(item.title)
                            ).onClick((e) => { item.onClick(params) })
                        )
                    )(
                        Icon('\\f09e').size(20),
                    ).cursor('pointer').border('solid 1px var(--sub-border-color)').transition('border .3s'),
                ).width('100%').height().padding(15)
            )
        )
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
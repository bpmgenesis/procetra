import {
    cLeading,
    Color,
    cTopLeading,
    FontSizeTypes,
    ForEach,
    HStack,
    Icon,
    PositionTypes,
    Text,
    UIView,
    VStack,
} from '@tuval/forms';

import { MIPaletteCategory } from '../Models/MIPaletteCategory';
import { MIPaletteItem } from '../Models/MIPaletteItem';





export function PaletteView(paletteData: MIPaletteCategory[]): UIView {
    return (
        VStack({ alignment: cTopLeading })( // For better scrolling
            VStack({ alignment: cTopLeading, spacing: 10 })(
                ...ForEach(paletteData)((paletteCategory: MIPaletteCategory) =>
                    VStack({ alignment: cTopLeading })(
                        /*  HDivider().height('1px').background('#e4e4e4'), */
                        Text(paletteCategory.name)
                            .fontSize(FontSizeTypes.Small)
                            .textTransform('uppercase')
                            .fontFamily('Proxima Nova')
                            .foregroundColor('#0D6B87')
                            /* .background('#f1f1f1') */
                            .padding(10),
                        ...ForEach(paletteCategory.items)((paletteItem: MIPaletteItem) =>
                            VStack({ alignment: cTopLeading })(
                                /*  HDivider().height('1px').background('#e4e4e4'), */
                                HStack({ alignment: cLeading, spacing: 10 })(
                                    Icon(paletteItem.icon).size(20).foregroundColor('gray'),
                                    Text(paletteItem.label)
                                        .fontFamily('Proxima Nova')
                                )
                                    .cornerRadius()
                                    .background({ hover: 'rgb(120,120,120,20%)' })
                                    .padding(10)
                            )
                        )
                    )
                        .background(Color.white.opacity(0.5))
                        .cornerRadius(12)
                        .padding() // Default padding 5px
                        .height() // uto height relative to its content

                )
            )
                // For Scrolling
                .position(PositionTypes.Absolute)
        )
            .width(270)
            .overflowX('hidden')
            .overflowY('auto')
    )
}
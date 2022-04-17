
import { UIView, Text, ForEach, VStack, Icon, HStack, Alignment, HDivider, FontSizeTypes, PositionTypes, Color, CornerRadiusTypes } from '@tuval/forms';
import { MIPaletteCategory } from '../Models/MIPaletteCategory';
import { MIPaletteItem } from '../Models/MIPaletteItem';




export function PaletteView(paletteData: MIPaletteCategory[]): UIView {
    return (
        VStack( // For better scrolling
            VStack(
                ...ForEach(paletteData, (paletteCategory: MIPaletteCategory) =>
                    VStack(
                        /*  HDivider().height('1px').background('#e4e4e4'), */
                        Text(paletteCategory.name)
                            .fontSize(FontSizeTypes.Small)
                            .textTransform('uppercase')
                            .fontFamily('Proxima Nova')
                            .foregroundColor('#0D6B87')
                            /* .background('#f1f1f1') */
                            .padding(10),
                        ...ForEach(paletteCategory.items, (paletteItem: MIPaletteItem) =>
                            VStack(
                                /*  HDivider().height('1px').background('#e4e4e4'), */
                                HStack(
                                    Icon(paletteItem.icon).size(20).foregroundColor('gray'),
                                    Text(paletteItem.label)
                                        .fontFamily('Proxima Nova')
                                )
                                    .cornerRadius()
                                    .background({ hover: 'rgb(120,120,120,20%)' })
                                    .spacing(10)
                                    .padding(10)
                                    .alignment(Alignment.leading)
                            )
                                /*  .background('white') */
                                .alignment(Alignment.topLeading)
                        )
                    )
                        .background(Color.white.opacity(0.5))
                        .cornerRadius(12)
                        .padding() // Default padding 5px
                        .height() // uto height relative to its content
                        .alignment(Alignment.topLeading)

                )
            )
                .spacing(10)
                .alignment(Alignment.topLeading)
                // For Scrolling
                .position(PositionTypes.Absolute)
        )
            .width(270)
            .alignment(Alignment.topLeading)
            .overflowX('hidden')
            .overflowY('auto')
    )
}
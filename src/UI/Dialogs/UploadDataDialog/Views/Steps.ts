import { int } from '@tuval/core';
import { HStack, ForEach, If, VStack, cLeading, Text, RoundedRectangle, cTrailing, cTop, Icon } from '@tuval/forms';
export function Steps(items: string[], selectedIndex: int) {
    return (
        HStack(
            ...ForEach(items)((item, index) =>
                If(index === 0)(
                    VStack({ alignment: cLeading })(
                        HStack({ spacing: 10 })(
                            // Eğer bu adımı geçtiysek ok icon gözüksün
                            selectedIndex > index ?
                                HStack(
                                    Icon('\\e5ca').size(20)
                                )
                                    .width()
                                    .height()
                                    .backgroundColor(selectedIndex >= index ? '#2baab5' : '#7f7f7f')
                                    .cornerRadius(30).minWidth('30px').minHeight('30px')
                                    .lineHeight('30px').fontSize('16px').transition('background-color 1000ms ease-in-out')
                                    .foregroundColor('#fff')
                                :
                                Text((index + 1).toString()).backgroundColor(selectedIndex >= index ? '#2baab5' : '#7f7f7f')
                                    .cornerRadius(30).minWidth('30px').minHeight('30px')
                                    .lineHeight('30px').fontSize('16px').transition('background-color 1000ms ease-in-out')
                                    .foregroundColor('#fff'),

                            RoundedRectangle().height(2).backgroundColor(selectedIndex > index ? '#2baab5' : '#E0E0E0').transition('background-color 1000ms ease-in-out')
                        ),
                        Text(item).foregroundColor(selectedIndex >= index ? '#2baab5' : '#7f7f7f').whiteSpace('nowrap').marginTop('5px')
                    ).width('50%'),
                ).else(
                    If(index === items.length - 1)(
                        VStack({ alignment: cTrailing })(
                            HStack({ spacing: 10 })(
                                RoundedRectangle().height(2).backgroundColor(selectedIndex === items.length - 1 ? '#2baab5' : '#E0E0E0').transition('background-color 1000ms ease-in-out'),
                                Text((index + 1).toString()).backgroundColor(index === selectedIndex ? '#2baab5' : '#7f7f7f')
                                    .cornerRadius(30).minWidth('30px').minHeight('30px')
                                    .lineHeight('30px').fontSize('16px')
                                    .foregroundColor('#fff'),
                            ),
                            Text(item).foregroundColor(selectedIndex === items.length - 1 ? '#2baab5' : '#E0E0E0').whiteSpace('nowrap').marginTop('5px')
                        ).width('50%')
                    ).else(
                        VStack({ alignment: cTop })(
                            HStack({ spacing: 10 })(
                                RoundedRectangle().height(2).backgroundColor((selectedIndex === index || selectedIndex > index) ? '#2baab5' : '#E0E0E0').transition('background-color 1000ms ease-in-out'),
                                Text((index + 1).toString()).backgroundColor(selectedIndex >= index ? '#2baab5' : '#7f7f7f')
                                    .cornerRadius(30).minWidth('30px').minHeight('30px')
                                    .lineHeight('30px').fontSize('16px').transition('background-color 1000ms ease-in-out')
                                    .foregroundColor('#fff'),
                                RoundedRectangle().height(2).backgroundColor(selectedIndex > index ? '#2baab5' : '#E0E0E0').transition('background-color 1000ms ease-in-out')
                            ),
                            Text(item).foregroundColor((selectedIndex === index || selectedIndex > index) ? '#2baab5' : '#E0E0E0').whiteSpace('nowrap').marginTop('5px')
                        )
                    )
                )

            )
        ).padding(10).height()
    )
}
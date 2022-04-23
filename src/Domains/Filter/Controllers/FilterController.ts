import { UIController, UIView, Text, UIScene, VStack, HStack, Icon, Spacer, ForEach, UIButton, Alignment, HDivider, cLeading, cTopLeading } from '@tuval/forms';

export class FilterController extends UIController {
    protected InitController(): void {

    }

    public LoadView(): UIView {
        return (
            UIScene(
                VStack({ alignment: cTopLeading, spacing: 10 })(
                    HStack({ alignment: cLeading, spacing: 10 })(
                        Icon('\\f130').size(30).foregroundColor('gray'),
                        Text('Filter')
                            .fontFamily('Proxima Nova').fontSize('22px')
                            .foregroundColor('#333333'),
                        Spacer(),
                        HStack({ spacing: 5 })(
                            ...ForEach(['Overview', 'Throughput times', 'Activities'], (name) =>
                                UIButton(
                                    Text(name)
                                ).border('solid 1px gray').cornerRadius('10px').padding('3px 10px 3px 10px')
                            )
                        ).width()
                    ),
                    HDivider().height('1px').backgroundColor('rgb(120,120,120,20%)'),

                ).padding('10px').height()
            ).alignment(Alignment.topLeading)
        )
    }
}
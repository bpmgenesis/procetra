import {
    cLeading,
    cTopLeading,
    ForEach,
    HDivider,
    HStack,
    Icon,
    Spacer,
    Text,
    UIButton,
    UIController,
    UIScene,
    UIView,
    VStack,
} from '@tuval/forms';

export class CaseExplorerController extends UIController {
    protected InitController(): void {

    }

    public LoadView(): UIView {
        return (
            UIScene(
                VStack({ alignment: cTopLeading, spacing: 10 })(
                    HStack({ alignment: cLeading, spacing: 10 })(
                        Icon('\\d25b').size(30).foregroundColor('gray'),
                        Text('Case explorer')
                            .fontFamily('Proxima Nova').fontSize('22px')
                            .foregroundColor('#333333'),
                        Spacer(),
                        HStack({ spacing: 5 })(
                            ...ForEach(['Overview', 'Throughput times', 'Activities'])((name) =>
                                UIButton(
                                    Text(name)
                                ).border('solid 1px gray').cornerRadius('10px').padding('3px 10px 3px 10px')
                            )
                        ).width()
                    ),
                    HDivider().height(1).backgroundColor('rgb(120,120,120,20%)'),

                ).padding('10px').height()
            ).alignment(cTopLeading)
        )
    }
}
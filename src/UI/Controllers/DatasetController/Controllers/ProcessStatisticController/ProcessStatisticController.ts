import { UIController, UIView, Text, UIScene, VStack, HStack, Icon, Spacer, ForEach, UIButton, Alignment, HDivider } from '@tuval/forms';
import { PageTitle } from '../../../../Views/PageHeader';
export class ProcessStatisticController extends UIController {
    protected InitController(): void {

    }

    public LoadView(): UIView {
        return (
            UIScene(
                VStack(
                    HStack(
                        PageTitle('\\f0f2','Process statistics'),
                        Spacer(),
                        HStack(
                            ...ForEach(['Overview', 'Throughput times', 'Activities'], (name) =>
                                UIButton(
                                    Text(name)
                                ).border('solid 1px gray').cornerRadius('10px').padding('3px 10px 3px 10px')
                            )
                        ).width('auto').spacing('5px')
                    ).alignment(Alignment.leading).spacing('10px').height(),
                    HDivider().height('1px').backgroundColor('rgb(120,120,120,20%)'),

                ).padding('10px').alignment(Alignment.topLeading).spacing('10px').height('auto')
            ).alignment(Alignment.topLeading)
        )
    }
}
import { UIController, UIView, Text, UIScene, VStack, HStack, Icon, Spacer, ForEach, UIButton, Alignment, HDivider } from '@tuval/forms';

export class CaseExplorerController extends UIController {
    protected InitController(): void {

    }

    public LoadView(): UIView {
        return (
            UIScene(
                VStack(
                    HStack(
                        Icon('\\f033').size(30).foregroundColor('gray'),
                        Text('Case explorer')
                            .fontFamily('Proxima Nova').fontSize('22px')
                            .foregroundColor('#333333'),
                        Spacer(),
                        HStack(
                            ...ForEach(['Overview', 'Throughput times', 'Activities'], (name) =>
                                UIButton(
                                    Text(name)
                                ).border('solid 1px gray').cornerRadius('10px').padding('3px 10px 3px 10px')
                            )
                        ).width('auto').spacing('5px')
                    ).alignment(Alignment.leading).spacing('10px'),
                    HDivider().height('1px').backgroundColor('rgb(120,120,120,20%)'),

                ).padding('10px').alignment(Alignment.topLeading).spacing('10px').height('auto')
            ).alignment(Alignment.topLeading)
        )
    }
}
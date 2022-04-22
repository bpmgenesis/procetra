import { UIController, UIView, Text, UIScene, VStack, HStack, Icon, Spacer, ForEach, UIButton, Alignment, HDivider, Gauge, Range } from '@tuval/forms';
import { VariantActivityShapeView } from './Views/VariantActivityShape';
import { PageTitle } from '../../Views/PageHeader';

export class VariantExplorerController extends UIController {
    protected InitController(): void {

    }

    public LoadView(): UIView {
        return (
            UIScene(
                VStack(
                    HStack(
                        PageTitle('\\f13c', 'Variant explorer'),
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
                    VStack(
                        ...ForEach([1, 2, 3, 4, 5], (index) =>
                            HStack(
                                Text('Variant 1').fontSize('24px').fontFamily('Ubuntu, sans-serif').fontWeight('700').minWidth('200px'),
                                Gauge(
                                    Range()
                                ).color('#14a9d5').maskColor('rgb(120,120,120,20%)').radius(30).stroke(7).value(67).height(55),
                                Gauge(
                                    Range()
                                ).color('#14a9d5').maskColor('rgb(120,120,120,20%)').radius(30).stroke(7).value(67).height(55),
                                HStack(
                                    VariantActivityShapeView('Satınalma onayının verilmesi'),
                                    VariantActivityShapeView('Gerekli kontrollerin Sağlanması'),
                                    VariantActivityShapeView('İzin talebi başladı')
                                )
                                    .alignment(Alignment.leading)
                                    .spacing(10)
                            )
                                .padding('20px')
                              /*   .shadow('rgba(0, 0, 0, 0.16) 0px 1px 4px') */
                                .alignment(Alignment.leading)
                                .spacing(20)
                        )
                    ).spacing(20)

                ).padding('10px').alignment(Alignment.topLeading).spacing('10px').height('auto')
            )
                .backgroundColor('#f1f1f1')
                .alignment(Alignment.topLeading)
        )
    }
}
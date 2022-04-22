import { UIController, UIView, Text, UIScene, VStack, HStack, Icon, Spacer, ForEach, UIButton, Alignment, HDivider, Gauge, Range, cLeading, cTopLeading } from '@tuval/forms';
import { VariantActivityShapeView } from '../Views/VariantActivityShape';
import { PageTitle } from '../../../UI/Views/PageHeader';

export class VariantExplorerController extends UIController {
    protected InitController(): void {

    }

    public LoadView(): UIView {
        return (
            UIScene(
                VStack({ alignment: cTopLeading, spacing: 10 })(
                    HStack({ alignment: cLeading, spacing: 10 })(
                        PageTitle('\\f13c', 'Variant explorer'),
                        Spacer(),
                        HStack({ spacing: 5 })(
                            ...ForEach(['Overview', 'Throughput times', 'Activities'], (name) =>
                                UIButton(
                                    Text(name)
                                ).border('solid 1px gray').cornerRadius('10px').padding('3px 10px 3px 10px')
                            )
                        ).width()
                    ).alignment(Alignment.leading),
                    HDivider().height('1px').backgroundColor('rgb(120,120,120,20%)'),
                    VStack({ spacing: 20 })(
                        ...ForEach([1, 2, 3, 4, 5], (index) =>
                            HStack({ alignment: cLeading, spacing: 20 })(
                                Text('Variant 1').fontSize('24px').fontFamily('Ubuntu, sans-serif').fontWeight('700').minWidth('200px'),
                                Gauge(
                                    Range()
                                ).color('#14a9d5').maskColor('rgb(120,120,120,20%)').radius(30).stroke(7).value(67).height(55),
                                Gauge(
                                    Range()
                                ).color('#14a9d5').maskColor('rgb(120,120,120,20%)').radius(30).stroke(7).value(67).height(55),
                                HStack({ alignment: cLeading, spacing: 10 })(
                                    VariantActivityShapeView('Satınalma onayının verilmesi'),
                                    VariantActivityShapeView('Gerekli kontrollerin Sağlanması'),
                                    VariantActivityShapeView('İzin talebi başladı')
                                )
                            ).padding(20)

                        )
                    )

                ).padding(10).height()
            )
                .backgroundColor('#f1f1f1')
                .alignment(Alignment.topLeading)
        )
    }
}
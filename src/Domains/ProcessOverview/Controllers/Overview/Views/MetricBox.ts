import { Bindable } from '../Bindable';
import { UIView, VStack, Text, Alignment, TApplication, ApplicationModes, HStack, ZStack, AnimationStack } from '@tuval/forms';
import { ListBounceAnimation } from '../../../../../UI/Animations/ListBounce';
import { Headline5, Headline4, Overline } from '../../../../../UI/Views/Texts';

export interface MVIMetricBox {
    title: string,
    value: string,
    subTitle: string,
    showMenu: Bindable<boolean>;
}

function MetricBoxHeaderText(value: string): UIView {
    return (
        Headline5(value).padding('20px 30px 0 30px').fontWeight('700').foregroundColor('#495057DD')
    )
}

function MetricBoxValueText(value: string): UIView {
    return (
        Headline4(value).fontFamily('Proxima Nova, sans serif').fontWeight('500').foregroundColor('#14a9d5')
    )
}

function CalculationMethodText(value: string): UIView {
    return (
        Headline5(value).fontFamily('Proxima Nova, sans serif').foregroundColor('#AAA')
    )
}

export function PortalMetricBox(params: MVIMetricBox): UIView {
    return (
        ZStack(
            VStack(
                MetricBoxHeaderText(params.title),
                HStack(
                    MetricBoxValueText(params.value.toString()),
                    /* Text(params.value.toString()).fontSize('40px').fontFamily('Proxima Nova, sans serif').fontWeight('500').foregroundColor('#14a9d5'), */
                    VStack(
                        /* Text('monts').foregroundColor('rgb(251,192,1)').fontSize('10px').fontWeight('700'), */
                        CalculationMethodText('AVG')
                            .onClick(() => params.showMenu.set(true))
                            .padding()
                            .cornerRadius(5)
                            .cursor('pointer')
                            .border('dashed 1px var(--sub-border-color)')
                            .transition('border .3s')

                    ).alignment(Alignment.leading)
                )
                    .paddingLeft('30px')
                    .paddingTop('10px')
                    .alignment(Alignment.leading),
                VStack(
                    Text('Duration').foregroundColor('#b40404'),
                    Text('15 - 40 monts').foregroundColor('#AAA')
                )
                    .marginLeft('32px')
                    .marginBottom('5px')
                    .alignment(Alignment.leading),

                /*  Text(params.value).padding('10px 30px 0 30px;').fontFamily('Proxima Nova').fontSize('27px').fontWeight('500').foregroundColor('#14a9d5'),
                 Text(params.subTitle).paddingLeft('30px').fontFamily('Proxima Nova').fontSize('12px').foregroundColor('#666'), */
            )
                .height(148)
                .backgroundColor('rgb(255,255,255,60%)')
                .cornerRadius('12px')
                .shadow({ default: '0 1px 3px 0 rgb(0 0 0 / 10%), 0 2px 5px 0 rgb(0 0 0 / 5%)', focus: '0 0 3px 1px #00c3ff' })
                .alignment(Alignment.topLeading)
                .tabIndex(0)
                // Üzerine geldiğimizde alt text border için.
                .variable('--sub-border-color', { default: 'transparent', hover: '#14a9d5' }),

            AnimationStack(
                VStack(
                    Text('Mean').cursor('pointer').width('100%').height('100%').shadow('inset 0 -1px 0 0 #e4e4e4').backgroundColor({ hover: '#f9f9f9' }).padding(10).onClick(() => params.showMenu.set(false)),
                    Text('Median').cursor('pointer').width('100%').height('100%').shadow('inset 0 -1px 0 0 #e4e4e4').backgroundColor({ hover: '#f9f9f9' }).padding(10).onClick(() => params.showMenu.set(false)),
                    Text('Max').cursor('pointer').width('100%').height('100%').shadow('inset 0 -1px 0 0 #e4e4e4').backgroundColor({ hover: '#f9f9f9' }).padding(10).onClick(() => params.showMenu.set(false)),
                    Text('Min').cursor('pointer').width('100%').height('100%').shadow('inset 0 -1px 0 0 #e4e4e4').backgroundColor({ hover: '#f9f9f9' }).padding(10).onClick(() => params.showMenu.set(false)),
                )
            )
                .backgroundColor('white')
                .animation(ListBounceAnimation, '.3s')
                .visible(params.showMenu.get())
        )
    )
}
export function DesktopMetricBox(params: MVIMetricBox): UIView {
    return (
        VStack(
            Text(params.title).padding('20px 30px 0 30px').fontFamily('Proxima Nova').fontSize('14px').foregroundColor('#888888'),
            Text(params.value).padding('10px 30px 0 30px;').fontFamily('Proxima Nova').fontSize('27px').fontWeight('500').foregroundColor('#14a9d5'),
            Text(params.subTitle).paddingLeft('30px').fontFamily('Proxima Nova').fontSize('12px').foregroundColor('#666'),
        )
            .height('148px')
            .backgroundColor('rgb(255,255,255,60%)')
            .cornerRadius('12px')
            .shadow({ default: '0 1px 3px 0 rgb(0 0 0 / 10%), 0 2px 5px 0 rgb(0 0 0 / 5%)', focus: '0 0 3px 1px #00c3ff' })
            .tabIndex(0)
            .alignment(Alignment.topLeading)
    )
}

export function MetricBox(params: MVIMetricBox): UIView {
    if (TApplication.ApplicationMode === ApplicationModes.Desktop) {
        return DesktopMetricBox(params);
    } else {
        return PortalMetricBox(params);
    }
}
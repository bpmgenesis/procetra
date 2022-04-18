import { Bindable } from './../Bindable';
import { UIView, VStack, Text, Alignment, TApplication, ApplicationModes, HStack, ZStack } from '@tuval/forms';

export interface MVIMetricBox {
    title: string,
    value: string,
    subTitle: string,
    showMenu: Bindable<boolean>;
}
export function PortalMetricBox(params: MVIMetricBox): UIView {
    return (
        ZStack(
            VStack(
                Text(params.title).padding('20px 30px 0 30px').fontFamily('Ubuntu, sans-serif').fontSize('24px').fontWeight('700').foregroundColor('#495057'),
                HStack(
                    Text(params.value.toString()).fontSize('40px').fontFamily('Proxima Nova').fontWeight('500').foregroundColor('#14a9d5'),
                    VStack(
                        /* Text('monts').foregroundColor('rgb(251,192,1)').fontSize('10px').fontWeight('700'), */
                        Text('AVG')
                            .onClick(() => params.showMenu.set(true))
                            .padding()
                            .cornerRadius(5)
                            .fontFamily('Proxima Nova')
                            .fontSize('20px')
                            .cursor('pointer')
                            .foregroundColor(params.showMenu.get() ? 'yellow' : '#AAA')
                            .border('dashed 1px var(--sub-border-color)')

                    ).alignment(Alignment.leading)
                )
                    .paddingLeft('30px')
                    .paddingTop('10px')
                    .alignment(Alignment.leading),
                VStack(
                    Text('Duration').foregroundColor('rgb(147,205,221)'),
                    Text('15 - 40 monts').foregroundColor('#AAA')
                )
                    .alignment(Alignment.leading),

                /*  Text(params.value).padding('10px 30px 0 30px;').fontFamily('Proxima Nova').fontSize('27px').fontWeight('500').foregroundColor('#14a9d5'),
                 Text(params.subTitle).paddingLeft('30px').fontFamily('Proxima Nova').fontSize('12px').foregroundColor('#666'), */
            )
                .height('148px')
                .backgroundColor('rgb(255,255,255,60%)')
                .cornerRadius('12px')
                .shadow({ default: '0 1px 3px 0 rgb(0 0 0 / 10%), 0 2px 5px 0 rgb(0 0 0 / 5%)', focus: '0 0 3px 1px #00c3ff' })
                .alignment(Alignment.topLeading)
                .tabIndex(0)
                .variable('--sub-border-color', { default: 'transparent', hover: 'gray' })
                .visible(!params.showMenu.get()),
            VStack(
                Text('AVG').padding(10).onClick(() => params.showMenu.set(false)),
                Text('Total').padding(10).onClick(() => params.showMenu.set(false)),
            ).visible(params.showMenu.get())
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
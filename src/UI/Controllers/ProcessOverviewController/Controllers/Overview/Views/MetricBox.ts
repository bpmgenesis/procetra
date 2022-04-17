import { UIView, VStack, Text, Alignment, TApplication, ApplicationModes } from '@tuval/forms';

export function PortalMetricBox(params: { title: string, value: string, subTitle: string }): UIView {
    return (
        VStack(
            Text(params.title).padding('20px 30px 0 30px').fontFamily('Ubuntu, sans-serif').fontSize('24px').fontWeight('700').foregroundColor('#495057'),
            Text(params.value).padding('10px 30px 0 30px;').fontFamily('Proxima Nova').fontSize('27px').fontWeight('500').foregroundColor('#14a9d5'),
            Text(params.subTitle).paddingLeft('30px').fontFamily('Proxima Nova').fontSize('12px').foregroundColor('#666'),
        )
            .height('148px')
            .backgroundColor('rgb(255,255,255,60%)')
            .cornerRadius('12px')
            .shadow('0 4px 9px 0 rgb(0 0 0 / 15%)')
            .alignment(Alignment.topLeading)
    )
}
export function DesktopMetricBox(params: { title: string, value: string, subTitle: string }): UIView {
    return (
        VStack(
            Text(params.title).padding('20px 30px 0 30px').fontFamily('Proxima Nova').fontSize('14px').foregroundColor('#888888'),
            Text(params.value).padding('10px 30px 0 30px;').fontFamily('Proxima Nova').fontSize('27px').fontWeight('500').foregroundColor('#14a9d5'),
            Text(params.subTitle).paddingLeft('30px').fontFamily('Proxima Nova').fontSize('12px').foregroundColor('#666'),
        )
            .height('148px')
            .backgroundColor('rgb(255,255,255,60%)')
            .cornerRadius('12px')
            .shadow('0 1px 3px 0 rgb(0 0 0 / 10%), 0 2px 5px 0 rgb(0 0 0 / 5%)')
            .alignment(Alignment.topLeading)
    )
}

export function MetricBox(params: { title: string, value: string, subTitle: string }): UIView {
    if (TApplication.ApplicationMode === ApplicationModes.Desktop) {
        return DesktopMetricBox(params);
    } else {
        return PortalMetricBox(params);
    }
}
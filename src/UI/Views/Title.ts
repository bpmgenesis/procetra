import { Text, TApplication, ApplicationModes, UIView } from '@tuval/forms';
import { Headline4, Headline5, Subtitle1 } from './Texts';

export function Title(value: string): UIView {
    return (
        Text(value)
            .fontFamily(TApplication.ApplicationMode === ApplicationModes.Desktop ? "Proxima Nova" : "Ubuntu, sans-serif")
    )
}

export function TileBoxHeaderText(value: string): UIView {
    if (TApplication.IsPortal) {
        return (
            Headline5(value).fontFamily('Ubuntu, sans-serif').padding('20px 30px 0 30px').fontWeight('700').foregroundColor('#495057DD')
        )
    } else {
        return (
            Text(value).padding('20px 30px 0 30px').fontFamily('Proxima Nova').fontSize('14px').foregroundColor('#888888')
        )
    }
}

export function TileBoxValueCaption(value: string): UIView {
    if (TApplication.IsPortal) {
        return (
            Subtitle1(value)
            //Headline5(value).fontFamily('Ubuntu, sans-serif').padding('20px 30px 0 30px').fontWeight('700').foregroundColor('#495057DD')
        )
    } else {
        return (
            Text(value).padding('20px 30px 0 30px').fontFamily('Proxima Nova').fontSize('14px').foregroundColor('#888888')
        )
    }
}

export function MetricBoxValueText(value: string): UIView {
    return (
        Headline4(value).fontFamily('Proxima Nova, sans serif').fontWeight('500').foregroundColor('#14a9d5').whiteSpace('nowrap')
    )
}

export function CalculationMethodText(value: string): UIView {
    return (
        Headline5(value).fontFamily('Proxima Nova, sans serif').foregroundColor('#AAA')
    )
}
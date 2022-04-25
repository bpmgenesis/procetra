import { Text, TApplication, ApplicationModes, UIView } from '@tuval/forms';
import { Headline4, Headline5 } from './Texts';

export function Title(value: string): UIView {
    return (
        Text(value)
            .fontFamily(TApplication.ApplicationMode === ApplicationModes.Desktop ? "Proxima Nova" : "Ubuntu, sans-serif")
    )
}

export function TileBoxHeaderText(value: string): UIView {
    return (
        Headline5(value).padding('20px 30px 0 30px').fontWeight('700').foregroundColor('#495057DD')
    )
}

export function MetricBoxValueText(value: string): UIView {
    return (
        Headline4(value).fontFamily('Proxima Nova, sans serif').fontWeight('500').foregroundColor('#14a9d5')
    )
}

export function CalculationMethodText(value: string): UIView {
    return (
        Headline5(value).fontFamily('Proxima Nova, sans serif').foregroundColor('#AAA')
    )
}
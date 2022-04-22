import { Text, TApplication, ApplicationModes, UIView } from '@tuval/forms';

export function Title(value: string): UIView {
    return (
        Text(value)
            .fontFamily(TApplication.ApplicationMode === ApplicationModes.Desktop ? "Proxima Nova" : "Ubuntu, sans-serif")
    )
}
import { UIView, HStack, Icon, Text, TApplication, ApplicationModes } from '@tuval/forms';

function PortalPageTitle(icon: string, text: string): UIView {
    return (
        HStack(
            Icon(icon).size(30).foregroundColor('#333333'),
            Text(text)
                .fontWeight('700')
                .fontFamily('Ubuntu, sans-serif')
                .fontSize('30px')
                .foregroundColor('#495057')

        )
            .marginLeft('10px')
            .spacing(10)
            .width() //auto
    )
}
function DesktopPageTitle(icon: string, text: string): UIView {
    return (
        HStack(
            Icon(icon).size(30).foregroundColor('gray'),
            Text(text)
                .fontFamily('Proxima Nova')
                .fontSize('22px')
                .foregroundColor('#333333')
        )
            .spacing(10)
            .width() //auto
    )
}

export function PageTitle(icon: string, text: string): UIView {
    if (TApplication.ApplicationMode === ApplicationModes.Desktop) {
        return DesktopPageTitle(icon, text);
    } else {
        return PortalPageTitle(icon, text);
    }
}
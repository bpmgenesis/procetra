import { UIView, Text } from '@tuval/forms';


export function Headline1(value: string): UIView {
    return (
        Text(value).fontFamily('Ubuntu, sans-serif').fontWeight('lighter').fontSize('97.8462px').kerning('-1.5px')
    )
}

export function Headline2(value: string): UIView {
    return (
        Text(value).fontFamily('Ubuntu, sans-serif').fontWeight('lighter').fontSize('61.1538px').kerning('-0.5px')
    )
}

export function Headline3(value: string): UIView {
    return (
        Text(value).fontFamily('Ubuntu, sans-serif').fontWeight('normal').fontSize('48.9231px').kerning('0px')
    )
}
export function Headline4(value: string): UIView {
    return (
        Text(value).fontFamily('Ubuntu, sans-serif').fontWeight('normal').fontSize('34.6538px').kerning('0.25px')
    )
}

export function Headline5(value: string): UIView {
    return (
        Text(value).fontFamily('Ubuntu, sans-serif').fontWeight('normal').fontSize('24.4615px').kerning('0px')
    )
}

export function Headline6(value: string): UIView {
    return (
        Text(value).fontFamily('Ubuntu, sans-serif').fontWeight('500').fontSize('20.3846px').kerning('0.15px')
    )
}

export function Subtitle1(value: string): UIView {
    return (
        Text(value).fontFamily('Ubuntu, sans-serif').fontWeight('normal').fontSize('16.3077px').kerning('0.15px')
    )
}

export function Subtitle2(value: string): UIView {
    return (
        Text(value).fontFamily('Ubuntu, sans-serif').fontWeight('500').fontSize('14.2692px').kerning('0.1px')
    )
}

export function Body1(value: string): UIView {
    return (
        Text(value).fontFamily('Ubuntu, sans-serif').fontWeight('normal').fontSize('16.3077px').kerning('0.5px')
    )
}

export function Body2(value: string): UIView {
    return (
        Text(value).fontFamily('Ubuntu, sans-serif').fontWeight('normal').fontSize('14.2692px').kerning('0.25px')
    )
}

export function ButtonText(value: string): UIView {
    return (
        Text(value).fontFamily('Ubuntu, sans-serif').fontWeight('500').fontSize('14.2692px').kerning('1.25px').textTransform('uppercase')
    )
}

export function Caption(value: string): UIView {
    return (
        Text(value).fontFamily('Ubuntu, sans-serif').fontWeight('normal').fontSize('12.2308px').kerning('0.4px')
    )
}

export function Overline(value: string): UIView {
    return (
        Text(value).fontFamily('Ubuntu, sans-serif').fontWeight('normal').fontSize('10.1923px').kerning('1.5px').textTransform('uppercase')
    )
}



export function RegularText(value: string): UIView {
    return (
        Text(value).fontFamily('"Proxima Nova","Helvetica Neue",Helvetica,Arial,sans-serif').fontSize('14px').lineHeight('1.42857').foregroundColor('#333')
    )
}

export function SectionTitle(value: string): UIView {
    return (
        RegularText(value).fontWeight('500')
    )
}

export function SectionContent(value: string): UIView {
    return (
        RegularText(value)
    )
}


export function SectionHeadline(value: string): UIView {
    return (
        Text(value).fontFamily('"Proxima Nova","Helvetica Neue",Helvetica,Arial,sans-serif').fontSize('20px').lineHeight('1.42857').foregroundColor('#333')
    )
}

export function SectionSubHeadline(value: string): UIView {
    return (
        Text(value).fontFamily('"Proxima Nova","Helvetica Neue",Helvetica,Arial,sans-serif').fontSize('16px').fontWeight('normal').lineHeight('1.42857').foregroundColor('#666666')
    )
}
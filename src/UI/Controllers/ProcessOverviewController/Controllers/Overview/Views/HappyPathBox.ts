import { UIView, VStack, Text, Alignment, HStack, VDivider, RoundedRectangle, HDivider, Gauge, Range } from '@tuval/forms';


export function HappyPathGaugeBox(params: { title: string }): UIView {
    return (
        VStack(
            Text(params.title).padding('20px 30px 0 30px').fontFamily('Proxima Nova').fontSize('14px').foregroundColor('#888888'),
            VStack(
                Gauge(
                    Range()
                ).color('rgb(118,209,187)').maskColor('rgb(120,120,120,20%)')
                    .radius(80)
                    .stroke(10)
                    .value(67)
                    .height(155)
            )
        )
            .height('245px')
            .backgroundColor('rgb(255,255,255,60%)')
            .cornerRadius('12px')
            .shadow('0 1px 3px 0 rgb(0 0 0 / 10%), 0 2px 5px 0 rgb(0 0 0 / 5%)')
    )
}

export function HappyPathBox1(params: { title: string, value: string, subTitle: string }): UIView {
    return (
        VStack(
            Text('Happy path in percentages').padding('20px 30px 0 30px').fontFamily('Proxima Nova').fontSize('14px').foregroundColor('#888888'),
            Text(params.value).padding('10px 30px 0 30px;').fontFamily('Proxima Nova').fontSize('27px').fontWeight('500').foregroundColor('#14a9d5'),
            Text(params.subTitle).paddingLeft('30px').fontFamily('Proxima Nova').fontSize('12px').foregroundColor('#666'),
        ).height('148px').backgroundColor('rgb(255,255,255,60%)').cornerRadius('12px').alignment(Alignment.topLeading)
    )
}

export function HappyPathBox2(): UIView {
    return (
        VStack(
            Text('Happy path in percentages').padding('20px 30px 0 30px').fontFamily('Proxima Nova').fontSize('14px').foregroundColor('#888888'),
            HStack(
                VDivider().width('1px').background('gray'),
                VStack(
                    RoundedRectangle().background('transparent').height('10px'),
                    RoundedRectangle().background({ default: '#14A9D5', hover: 'gray' }).height('20px').width('50%'),
                    RoundedRectangle().background('#E4E4E4').height('20px'),
                    RoundedRectangle().background('transparent').height('10px'),
                ).alignment(Alignment.leading)
            ).padding('30px').width('70%'),
            Text('107,688').fontFamily('Proxima Nova').fontWeight('500').fontSize('27px').foregroundColor('#14a9d5'),
            Text('of 279,020 Cases')
                .marginBottom('15px')
                .fontFamily('Proxima Nova')
                .fontWeight('500')
                .fontSize('20px')
                .foregroundColor('#888888'),
        )
            .height('245px')
            .backgroundColor('rgb(255,255,255,60%)')
            .cornerRadius('12px')
            .shadow('0 1px 3px 0 rgb(0 0 0 / 10%), 0 2px 5px 0 rgb(0 0 0 / 5%)')
    )
}

export function HappyPathBox3(): UIView {
    return (
        VStack(
            Text('Happy path in percentages').padding('20px 30px 0 30px').fontFamily('Proxima Nova').fontSize('14px').foregroundColor('#888888'),
            VStack(
                HStack(
                    RoundedRectangle().background('transparent').width('10px'),
                    RoundedRectangle().background('#14A9D5').width('20px').height('50%'),
                    RoundedRectangle().background('#E4E4E4').width('20px'),
                    RoundedRectangle().background('transparent').width('10px'),
                ).alignment(Alignment.bottom),
                HDivider().height('1px').background('gray'),
            ).padding('30px').width('70%'),
            Text('107,688').fontFamily('Proxima Nova').fontWeight('500').fontSize('27px').foregroundColor('#14a9d5'),
            Text('of 279,020 Cases')
                .marginBottom('15px')
                .fontFamily('Proxima Nova')
                .fontSize('20px')
                .foregroundColor('#888888'),
        )
            .height('245px')
            .backgroundColor('rgb(255,255,255,60%)')
            .cornerRadius('12px')
            .shadow('0 1px 3px 0 rgb(0 0 0 / 10%), 0 2px 5px 0 rgb(0 0 0 / 5%)')
    )
}
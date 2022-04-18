import { UIView, VStack, Text, Alignment, HStack, VDivider, RoundedRectangle, HDivider, Gauge, Range } from '@tuval/forms';
import { int } from '@tuval/core';

export interface MVIHappyPathAbsoluteBoxModel {
    title: string;
    value: int;
    totalValue: int;
}

export function HappyPathGaugeBox(params: MVIHappyPathAbsoluteBoxModel): UIView {
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
            .shadow({ default: '0 1px 3px 0 rgb(0 0 0 / 10%), 0 2px 5px 0 rgb(0 0 0 / 5%)', focus: '0 0 3px 1px #00c3ff' })
            .marginHorizontal('2px')
            .tabIndex(0)
    )
}

export function HappyPathBox2(params: MVIHappyPathAbsoluteBoxModel): UIView {
    return (
        VStack(
            Text(params.title).padding('20px 30px 0 30px').fontFamily('Proxima Nova').fontSize('14px').foregroundColor('#888888'),
            HStack(
                VDivider().width('1px').background('gray'),
                VStack(
                    RoundedRectangle().background('transparent').height('10px'),
                    RoundedRectangle().background({ default: '#14A9D5', hover: 'gray' }).height('20px').width(`${(params.value / params.totalValue) * 100}%`),
                    RoundedRectangle().background('#E4E4E4').height('20px'),
                    RoundedRectangle().background('transparent').height('10px'),
                ).alignment(Alignment.leading)
            ).padding('30px').width('70%'),
            Text(params.value.toString()).fontFamily('Proxima Nova').fontWeight('500').fontSize('27px').foregroundColor('#14a9d5'),
            Text(`of ${params.totalValue} Cases`)
                .marginBottom('15px')
                .fontFamily('Proxima Nova')
                .fontWeight('500')
                .fontSize('20px')
                .foregroundColor('#888888'),
        )
            .height('245px')
            .backgroundColor('rgb(255,255,255,60%)')
            .cornerRadius('12px')
            .shadow({ default: '0 1px 3px 0 rgb(0 0 0 / 10%), 0 2px 5px 0 rgb(0 0 0 / 5%)', focus: '0 0 3px 1px #00c3ff' })
            .marginHorizontal('2px')
            .tabIndex(0)
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
                HDivider().height('1px').background('gray').width('50%'),
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
            .shadow({ default: '0 1px 3px 0 rgb(0 0 0 / 10%), 0 2px 5px 0 rgb(0 0 0 / 5%)', focus: '0 0 3px 1px #00c3ff' })
            .marginHorizontal('2px')
            .tabIndex(0)
    )
}
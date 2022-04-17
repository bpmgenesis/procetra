import { UIView, VStack, Text, Alignment, Icon } from '@tuval/forms';


export function ActivityBox(params: { activityName: string, value: string, subTitle: string }): UIView {
    return (
        VStack(
            VStack(
                Icon('\\f0e1').size(30),
                Text(params.activityName).padding('20px 30px 0 30px').fontFamily('Proxima Nova').fontSize('14px').foregroundColor('#888888'),
                Text(params.value).padding('10px 30px 0 30px;').fontFamily('Proxima Nova').fontSize('27px').fontWeight('500').foregroundColor('#14a9d5'),
                Text(params.subTitle).paddingLeft('30px').fontFamily('Proxima Nova').fontSize('12px').foregroundColor('#666'),
            )
                .padding('20px')
                .backgroundColor('rgb(255,255,255,60%)')
                .cornerRadius('12px')
                .shadow('0 1px 3px 0 rgb(0 0 0 / 10%), 0 2px 5px 0 rgb(0 0 0 / 5%)')
        )
            .height('180px')
            .padding('10px')
            .width('auto')
            .maxWidth('25%')
    )
}
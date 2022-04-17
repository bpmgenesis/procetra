import { int } from '@tuval/core';
import { UIView, VStack, Text, Alignment, Icon } from '@tuval/forms';

export interface MVIActivityBox {
    activityName: string;
    casePercentage:int;
    eventCount:int;
}
export function ActivityBox(params: MVIActivityBox): UIView {
    return (
        VStack(
            VStack(
                Icon('\\f0e1').size(30).foregroundColor('#14A9D5'),
                Text(params.activityName).padding(10).fontFamily('Proxima Nova').fontWeight('500').fontSize('14px').foregroundColor('#333'),
                Text(`In ${params.casePercentage} of cases`).fontFamily('Proxima Nova').fontSize('14px').foregroundColor('#333'),
                Text(`${params.casePercentage} Events`).fontFamily('Proxima Nova').fontSize('14px').foregroundColor('#888'),
            )
                .padding('20px')
                .backgroundColor('rgb(255,255,255,60%)')
                .cornerRadius('12px')
                .shadow('0 1px 3px 0 rgb(0 0 0 / 10%), 0 2px 5px 0 rgb(0 0 0 / 5%)')
        )
            .height('180px')
            .padding('10px')
            .maxWidth('25%')
    )
}
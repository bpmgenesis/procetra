import { UIView, VStack, _ForEach, HStack, cTopLeading, cLeading, If, RoundedRectangle } from '@tuval/forms';
import { int, Convert, is } from '@tuval/core';
import { RegularText } from '../../../UI/Views/Texts';

interface IGridColumn {
    title: string;
    key: string;
    width: int;
    builder?: (row) => UIView
}
const columns: IGridColumn[] = [
    {
        key: 'caseId',
        title: 'Case ID',
        width: 120
    },
    {
        key: 'events',
        title: 'Events',
        width: 120,
        builder: (row) =>
            HStack(
                RegularText(row['events']).marginRight('10px'),
                RoundedRectangle().width('100%').height(15).background('#7A9BCD')
            )
    },
    {
        key: 'variant',
        title: 'Variant',
        width: 20
    },
    {
        key: 'started',
        title: 'Started',
        width: 20
    },
    {
        key: 'finished',
        title: 'Finished',
        width: 20
    },
    {
        key: 'duration',
        title: 'Duration',
        width: 30,
        builder: (row) =>
            HStack(
                RegularText(row['duration']).marginRight('10px').whiteSpace('nowrap'),
                RoundedRectangle().width('100%').height(15).background('#7A9BCD')
            )
    }
]
const data = [
    {
        caseId: '1000-2645004',
        events: 5,
        variant: 'variant 5',
        started: '12/3/2019 16:17:43',
        finished: '01/02/2020 10:25:05',
        duration: '1 day, 18 hours'
    },
    {
        caseId: '1000-2653046',
        events: 5,
        variant: 'variant 5',
        started: '12/3/2019 16:17:43',
        finished: '01/02/2020 10:25:05',
        duration: '1 day, 18 hours'
    },
    {
        caseId: '1000-2653046',
        events: 5,
        variant: 'variant 5',
        started: '12/3/2019 16:17:43',
        finished: '01/02/2020 10:25:05',
        duration: '1 day, 18 hours'
    },
    {
        caseId: '1000-2691872',
        events: 5,
        variant: 'variant 5',
        started: '12/3/2019 16:17:43',
        finished: '01/02/2020 10:25:05',
        duration: '1 day, 18 hours'
    },
    {
        caseId: '1000-2691873',
        events: 5,
        variant: 'variant 5',
        started: '12/3/2019 16:17:43',
        finished: '01/02/2020 10:25:05',
        duration: '1 day, 18 hours'
    },
    {
        caseId: '1000-2653046',
        events: 5,
        variant: 'variant 5',
        started: '12/3/2019 16:17:43',
        finished: '01/02/2020 10:25:05',
        duration: '1 day, 18 hours'
    },
    {
        caseId: '1000-2691872',
        events: 5,
        variant: 'variant 5',
        started: '12/3/2019 16:17:43',
        finished: '01/02/2020 10:25:05',
        duration: '1 day, 18 hours'
    },
    {
        caseId: '1000-2691873',
        events: 5,
        variant: 'variant 5',
        started: '12/3/2019 16:17:43',
        finished: '01/02/2020 10:25:05',
        duration: '1 day, 18 hours'
    },
    {
        caseId: '1000-2653046',
        events: 5,
        variant: 'variant 5',
        started: '12/3/2019 16:17:43',
        finished: '01/02/2020 10:25:05',
        duration: '1 day, 18 hours'
    },
    {
        caseId: '1000-2691872',
        events: 5,
        variant: 'variant 5',
        started: '12/3/2019 16:17:43',
        finished: '01/02/2020 10:25:05',
        duration: '1 day, 18 hours'
    },
    {
        caseId: '1000-2691873',
        events: 5,
        variant: 'variant 5',
        started: '12/3/2019 16:17:43',
        finished: '01/02/2020 10:25:05',
        duration: '1 day, 18 hours'
    }

]

function GridHeader(columnInfo: IGridColumn[]) {
    const width = Convert.ToInt32(100 / columnInfo.length);
    return (
        HStack({ alignment: cLeading })(
            ..._ForEach(columnInfo)(cInfo =>
                RegularText(cInfo.title)
                    .fontSize('12px')
                    .fontWeight('500')
                    .textTransform('uppercase')
                    .whiteSpace('nowrap')
                    .width(width + '%')
                    .textOverflow('ellipsis')
                    .padding('0 10px')
                    .borderRight('2px solid transparent')
            )
        ).height(40).borderBottom('2px solid #e4e4e4')
    )
}

function GridRow(columnInfo: IGridColumn[], row: any) {
    const width = Convert.ToInt32(100 / columnInfo.length);
    debugger;
    return (
        HStack({ alignment: cLeading })(
            ..._ForEach(columnInfo)(cInfo =>
                VStack({ alignment: cLeading })(
                    is.function(cInfo.builder) ? cInfo.builder(row) :
                        RegularText(row[cInfo.key])
                            .width('100%')
                            .whiteSpace('nowrap')
                            .textOverflow('ellipsis')

                ).borderTop('1px solid #e4e4e4').padding('5px 10px').width(width + '%')
            )
        ).height()
    )
}
export function CasesGrid(): UIView {
    return (
        VStack({ alignment: cTopLeading })(
            GridHeader(columns),
            ..._ForEach(data)((row =>
                GridRow(columns, row)
            ))
        )
    )

}
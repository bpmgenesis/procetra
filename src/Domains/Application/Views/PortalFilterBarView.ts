import { HStack, Text, Alignment, UIView, Icon, VStack, Spacer, VDivider, Gauge, Range, cLeading } from '@tuval/forms';
import { PortalFilterBarWidget } from './PortalFilterBarWidget';
import { TimeLineFilter } from './TimeLineFilter';
import { FilterView } from './FilterView';

export interface PortalFilterBarViewParams {
    projectName: string
    selectProjectAction: Function;
}

export function PortalFilterBarView(params: PortalFilterBarViewParams): UIView {
    return (
        HStack({alignment:cLeading, spacing:10})(
            Icon('\\f148').size(20).foregroundColor('#aaa'),
            VStack({ spacing: 3 })(
                Text('Projects').textTransform('uppercase').fontWeight('700').fontFamily('Ubuntu, sans-serif').fontSize('10px').foregroundColor('#777'),
                HStack({ spacing: 10 })(
                    Text(params.projectName || 'Select').fontFamily('Ubuntu, sans-serif').fontWeight('700').fontSize('14px').foregroundColor('#aaa'),
                    Icon('\\f0fc').size(10).foregroundColor('#aaa'),
                ).onClick(() => params.selectProjectAction())
            )
                .alignment(Alignment.leading)
                .cursor('pointer')
                .height()
                .width(),
            /*  Gauge(
                 Range()
             ).color('#14a9d5').maskColor('rgb(120,120,120,20%)').radius(40).stroke(7).value(67).height(75), */
            Spacer(),
            FilterView(),
            TimeLineFilter()
            /*   HStack(
                  PortalFilterBarWidget({ value: 3 }),
                  VDivider().height('70%').width(1).background('rgb(255,255,255,50%)'),
                  PortalFilterBarWidget({ value: 23 })
              )
                  .paddingBottom('5px')
                  .width() // auto
                  .spacing(20)
                  .alignment(Alignment.leading) */
        )
            .zIndex(3000)
            .paddingLeft('10px')
            .shadow('0 1px 5px 1px rgb(0 0 0 / 30%)')
            .height() // auto height
            .minHeight('50px')
            .backgroundColor('#212932')
            .foregroundColor('white')
    ).height()

}
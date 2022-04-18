import { TvChart } from '@tuval/components/charts';
import { UIView, VStack, HStack, Text, Alignment } from '@tuval/forms';
import { MetricBox } from './MetricBox';
import { HappyPathBox2, HappyPathBox3, HappyPathGaugeBox, MVIHappyPathAbsoluteBoxModel } from './HappyPathBox';
import { HappyPathDiagram, MVIHappyPathDiagramItem } from './HappyPathDiagram';

export interface MVIHappyPathSectionModel {
    happyPathAbsoluteBoxModel: MVIHappyPathAbsoluteBoxModel;
    happyPathDiagramItems: MVIHappyPathDiagramItem[];
}


export function HappyPathSection(params: MVIHappyPathSectionModel): UIView {
    return (
        VStack(
            Text('Happy path')
                .marginTop('30px')
                .paddingTop('5px')
                .height('38px')
                .fontFamily('Proxima Nova')
                .fontSize('20px')
                .foregroundColor('#333333'),
            HStack(
                HappyPathGaugeBox({ title: 'Happy path in percentages' } as any),
                HappyPathBox2(params.happyPathAbsoluteBoxModel),
                HappyPathBox3()
            ).height('auto').spacing('10px'),
            HappyPathDiagram(params.happyPathDiagramItems)
        )
            .alignment(Alignment.topLeading)
            // We want to space 10px between every vertical block
            .spacing('10px')
    )
}
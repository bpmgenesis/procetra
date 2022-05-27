import { cTopLeading, HStack, Text, UIView, VStack } from '@tuval/forms';

import { HappyPathBox2, HappyPathBox3, HappyPathGaugeBox, MVIHappyPathAbsoluteBoxModel } from './HappyPathBox';
import { HappyPathDiagram, MVIHappyPathDiagramItem } from './HappyPathDiagram';

export interface MVIHappyPathSectionModel {
    happyPathAbsoluteBoxModel: MVIHappyPathAbsoluteBoxModel;
    happyPathDiagramItems: MVIHappyPathDiagramItem[];
}


export function HappyPathSection(params: MVIHappyPathSectionModel): UIView {
    return (
        // We want to space 10px between every vertical block
        VStack({ alignment: cTopLeading, spacing: 10 })(
            Text('Happy path')
                .marginTop('30px')
                .paddingTop('5px')
                .height('38px')
                .fontFamily('Proxima Nova')
                .fontSize('20px')
                .foregroundColor('#333333'),
            HStack({ spacing: 10 })(
                HappyPathGaugeBox({ title: 'Happy path in percentages' } as any),
                HappyPathBox2(params.happyPathAbsoluteBoxModel),
                HappyPathBox3()
            ).height(), //auto height,
            HappyPathDiagram(params.happyPathDiagramItems)
        )
    )
}
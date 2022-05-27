import { int, TMath } from '@tuval/core';
import {
    CornerRadiusTypes,
    cTopLeading,
    Gauge,
    HStack,
    Icon,
    Range,
    Spacer,
    Text,
    UISlider,
    UIView,
    VStack,
} from '@tuval/forms';

import { SliderButton, SliderIconButton } from './SliderButton';



export function ConnectionSliderView(sliderValue: int, onChange: Function): UIView {
    return (
        VStack({ alignment: cTopLeading })(
            HStack({ spacing: 10 })(
                Icon('\\f13d').size(30).foregroundColor('#14A9D5'),
                Text('Connections').fontSize('16px').foregroundColor('#333'),
                Spacer(),
                SliderButton('List View')
            )
                .padding(5)
                .height(), // auto

            HStack(
                VStack(
                    UISlider().value(sliderValue).action((e) => onChange(e)),
                )
                    .width() //auto
                    .padding(15),
                VStack({ spacing: 10 })(
                    Gauge(
                        Range()
                    ).color('#14a9d5').maskColor('rgb(120,120,120,20%)').radius(50).stroke(7).value(sliderValue).height(95),
                    Text('of connections'),
                    SliderButton('Reset').action(() => onChange(50)),
                    HStack({ spacing: 10 })(
                        SliderIconButton('\\f087', 'Less').action(() => { onChange(TMath.max(sliderValue - 10, 0)) }),
                        SliderIconButton('\\f091', 'More').action(() => { onChange(TMath.min(sliderValue + 10, 100)) }),
                    )
                )
                    .height() // auto
            )
        )
            .background('rgb(255,255,255,30%)')
            .padding(10)
            .cornerRadius(CornerRadiusTypes.Medium)
    )

}
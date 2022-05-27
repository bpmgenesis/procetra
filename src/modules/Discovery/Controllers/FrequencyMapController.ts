import { int } from '@tuval/core';
import { cTopLeading, HStack, PositionTypes, State, Text, UIController, UIView, VStack } from '@tuval/forms';

import { ActivitySliderView } from '../Views/ActivitySliderView';
import { ConnectionSliderView } from '../Views/ConnectionSliderView';


export class FrequencyMapController extends UIController {

    @State()
    private actionSliderValue: int;

    @State()
    private connectionSliderValue: int;

    protected InitController(): void {
        this.actionSliderValue = 50;
        this.connectionSliderValue = 50;
    }

    public LoadView(): UIView {
        return (
            HStack(
                VStack(
                    Text('Frequency Map')
                ).grow(),
                VStack( // For scrolling container
                    VStack({ alignment: cTopLeading, spacing: 10 })(
                        ActivitySliderView(this.actionSliderValue, (e) => this.actionSliderValue = e),
                        ConnectionSliderView(this.connectionSliderValue, (e) => this.connectionSliderValue = e)
                    )
                        .position(PositionTypes.Absolute) // For scrolling
                    // auto width

                )

                    .minWidth('260px')
                    .maxWidth('260px')
                    .overflowY('auto').overflowX('hidden')

            )
        )
    }
}
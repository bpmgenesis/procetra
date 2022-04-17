import { UIController, UIView, HStack, VStack, Text, Alignment, PositionTypes, State } from '@tuval/forms';
import { ActivitySliderView } from '../Views/ActivitySliderView';
import { ConnectionSliderView } from '../Views/ConnectionSliderView';
import { int } from '@tuval/core';


export class PerformanceMapController extends UIController {

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
                    Text('Performance Map')
                ).grow(),
                VStack( // For scrolling container
                    VStack(
                        ActivitySliderView(this.actionSliderValue, (e) => this.actionSliderValue = e),
                        ConnectionSliderView(this.connectionSliderValue, (e) => this.connectionSliderValue = e)
                    )
                        .alignment(Alignment.topLeading)
                        .position(PositionTypes.Absolute) // For scrolling
                        .spacing(10)
                    // auto width

                )

                    .minWidth('260px')
                    .maxWidth('260px')
                    .overflowY('auto').overflowX('hidden')

            )
        )
    }
}
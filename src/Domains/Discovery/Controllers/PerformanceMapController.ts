import { UIController, UIView, HStack, VStack, Text, Alignment, PositionTypes, State, cTopLeading } from '@tuval/forms';
import { int } from '@tuval/core';
import { ActivitySliderView } from '../Views/ActivitySliderView';
import { ConnectionSliderView } from '../Views/ConnectionSliderView';


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
                    VStack({ alignment: cTopLeading, spacing: 10 })(
                        ActivitySliderView(this.actionSliderValue, (e) => this.actionSliderValue = e),
                        ConnectionSliderView(this.connectionSliderValue, (e) => this.connectionSliderValue = e)
                    )
                        .position(PositionTypes.Absolute) // For scrolling
                )
                    .minWidth('260px')
                    .maxWidth('260px')
                    .overflowY('auto').overflowX('hidden')

            )
        )
    }
}
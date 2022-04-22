import { UIController, UIView, Text, VStack, PositionTypes, Alignment } from '@tuval/forms';
import { BottleneckSection } from './View/BottleneckSection';
import { ThroughputTimeSection } from './View/ThroughputTimeSection';

export class ThroughputTimesController extends UIController {
    protected InitController(): void {

    }

    public LoadView(): UIView {
        return (
            VStack(
                ThroughputTimeSection(),
                BottleneckSection(),
                /* HappyPathSection(),
                ActivitySection(['Activity 1', 'Activity 2', 'Activity 3', 'Activity 4', 'Activity 5']) */
            )
                .spacing(20)
                .position(PositionTypes.Absolute)
                .alignment(Alignment.topLeading)
        )
    }
}
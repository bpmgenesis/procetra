import { UIController, UIView, VStack, cTopLeading, Text } from '@tuval/forms';


export class ActivityController extends UIController {
    public LoadView(): UIView {
        return (
            VStack({ alignment: cTopLeading })(
                Text('Activity Controller')
            )
        )
    }
}
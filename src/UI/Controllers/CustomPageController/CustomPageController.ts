import { UIController, UIView, Text } from '@tuval/forms';

export class CustomPageController extends UIController {
    protected InitController(): void {

    }
    public LoadView(): UIView {
        return Text('Custom page controller')
    }
}
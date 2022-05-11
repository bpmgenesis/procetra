import { UIController, UIView, HStack, ForEach, State, Text, cTopLeading, VStack, Spacer, UIButton, Icon } from '@tuval/forms';
import { OverviewController } from './OverviewController';
import { List } from '@tuval/core';

class ControllerList extends List<UIController> {
    private parentController: UIController;
    public constructor(parentController: UIController) {
        super();
        this.parentController = parentController;
    }
    public override Add(item: UIController): number {
        super.Add(item);
        this.parentController.ForceUpdate();
        return 1;
    }
}
export class MultiOverviewController extends UIController {

    @State()
    private controllerList: List<UIController>;

    protected InitController() {
        this.controllerList = new ControllerList(this);
        this.controllerList.Add(new OverviewController());
    }

    public LoadView(): UIView {
        return (
            VStack({ alignment: cTopLeading })(
                HStack(
                    Text('Metrics').paddingTop('5px').height(38).fontFamily('Proxima Nova').fontSize(20).foregroundColor('#333333'),
                    Spacer(),
                    UIButton(
                        Icon('\\f078').size(20).foregroundColor({ default: 'rgb(51,51,51, 70%)', hover: 'rgb(51,51,51, 90%)' }),
                    ).action(() => this.controllerList.Add(new OverviewController()))
                ),
                HStack({ alignment: cTopLeading })(
                    ...ForEach(this.controllerList.ToArray())(item =>
                        VStack(
                            item
                        )
                    )
                )
            )

        )
    }
}
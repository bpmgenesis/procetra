import { UIController, UIView, Text, UIScene, VStack, HStack, Icon, Spacer, ForEach, UIButton, Alignment, HDivider, State, ScrollView, TApplication, _ForEach, cVertical } from '@tuval/forms';
import { PageTitle } from '../../../UI/Views/PageHeader';
import { ActivityController } from './ActivityController';
import { OverviewController } from './OverviewController';


const controllers = [new OverviewController, new ActivityController]

export class ProcessStatisticController extends UIController {

    @State()
    private currentController: UIController;
    protected InitController(): void {
        this.currentController = controllers[0];
    }

    public LoadView(): UIView {
        return (
            UIScene(
                VStack(
                    HStack(
                        PageTitle('\\f0f2', 'Process statistics'),
                        Spacer(),
                        HStack(
                            ..._ForEach(['Overview', 'Throughput times', 'Activities'])((name, index) =>
                                UIButton(
                                    Text(name)
                                )
                                    .action(() => this.currentController = controllers[index])
                                    .border('solid 1px gray').cornerRadius('10px').padding('3px 10px 3px 10px')
                            )
                        ).width('auto').spacing('5px')
                    ).alignment(Alignment.leading).spacing('10px').height(),
                    HDivider().height('1px').backgroundColor('rgb(120,120,120,20%)'),
                    ScrollView({ axes: cVertical })(
                        this.currentController as any
                    )


                ).padding('10px').alignment(Alignment.topLeading).spacing('10px')
            )
                .background(TApplication.IsPortal ? '#f1f1f1' : '')
                .alignment(Alignment.topLeading)
        )
    }
}
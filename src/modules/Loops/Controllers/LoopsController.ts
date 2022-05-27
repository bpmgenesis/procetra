import {
    cLeading,
    cTopLeading,
    cVertical,
    HDivider,
    HStack,
    ScrollView,
    Spacer,
    TApplication,
    UIController,
    UIScene,
    UIView,
    VStack,
} from '@tuval/forms';

import { PageTitle } from '../../../UI/Views/PageHeader';

export class LoopsController extends UIController {
    public LoadView(): UIView {
        return (
            UIScene(
                VStack({ alignment: cTopLeading, spacing: 10 })(
                    HStack({ alignment: cLeading, spacing: 10 })(
                        PageTitle('\\f096', 'Loops'),
                        Spacer(),
                    ).height(),
                    HDivider().height('1px').backgroundColor('rgb(120,120,120,20%)'),
                    ScrollView({ axes: cVertical })(

                    )


                ).padding('10px')
            )
                .background(TApplication.IsPortal ? '#f1f1f1' : '')
        )
    }
}
import { UIController, UIView, UIScene, VStack, cTopLeading, HStack, cTrailing, Text, ScrollView, ForEach, Icon } from '@tuval/forms';
import { Bindable } from '../../../../modules/ProcessOverview/Controllers/Overview/Bindable';
import { AcceptButton, CancelButton } from '../../../Views/Buttons';
import { RegularTextBox } from '../../../Views/RegularTextBox';
import { SelectFilterDialog } from '../SelectFilterDialog';
import { RegularText } from '../../../Views/Texts';

const filtersModel = [
    {
        title: 'Attribute filter',
        description: 'Select cases based on specified attributes.',
        iconColor: 'rgb(196, 132, 243)',
        icon: '\\f07d',
        background: 'linear-gradient(rgb(187, 103, 255) 0%, rgb(196, 132, 243) 100%)'
    },
    {
        title: 'Activity filter',
        description: 'Select cases based on specified attributes.',
        iconColor: 'rgb(252, 146, 157)',
        icon: '\\f0e7',
        background: 'linear-gradient(rgb(255, 145, 157) 0%, rgb(252, 146, 157) 100%)'
    },
    {
        title: 'Timeframe filter',
        description: 'Select cases where duration between two activities is faster/slower than defined period of time.',
        iconColor: '#6EBF8B',
        icon: '\\f104',
        background: 'linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255, 202, 113) -46.42%)'
    },
    {
        title: 'Performance filter',
        description: 'Select cases where duration between two activities is faster/slower than defined period of time.',
        iconColor: '#F56D91',
        icon: '\\d36b',
        background: `linear-gradient(
            90deg,
            hsl(48deg 48% 72%) 0%,
            hsl(48deg 48% 72%) 13%,
            hsl(48deg 48% 72%) 25%,
            hsl(48deg 48% 72%) 37%,
            hsl(48deg 48% 72%) 50%,
            hsl(48deg 48% 72%) 63%,
            hsl(48deg 48% 72%) 75%,
            hsl(48deg 48% 72%) 87%,
            hsl(48deg 48% 72%) 100%
          )`
    },

    {
        title: 'Rework filter',
        description: 'Select cases where duration between two activities is faster/slower than defined period of time.',
        iconColor: '#C93838',
        icon: '\\f096',
        background: ``
    },
    {
        title: 'Resource filter',
        description: 'Select cases where duration between two activities is faster/slower than defined period of time.',
        iconColor: '#F5A25D',
        icon: '\\f007',
        background: ``
    },
    {
        title: 'Variant filter',
        description: 'Select cases where duration between two activities is faster/slower than defined period of time.',
        iconColor: '#4E89AE',
        icon: '\\f145',
        background: ``
    },
    {
        title: 'Process flow filter',
        description: 'Select cases where duration between two activities is faster/slower than defined period of time.',
        iconColor: '#525E75',
        icon: '\\f0eb',
        background: ``
    },
]

export class SelectFilterController extends UIController {

    private dialog: SelectFilterDialog;

    private $txtName: Bindable<string>;

    protected InitController() {
        this.$txtName = new Bindable('', this);
    }

    public OnBindModel(dialog: SelectFilterDialog) {
        this.dialog = dialog;
    }
    public LoadView(): UIView {
        return (
            UIScene(
                VStack({ alignment: cTopLeading })(
                    RegularText('Select Filter').fontSize(18).fontWeight('700').marginBottom('10px'),
                    ScrollView(
                        HStack({ alignment: cTopLeading })(
                            ...ForEach(filtersModel)(filterInfo =>
                                VStack(
                                    Icon(filterInfo.icon).foregroundColor(filterInfo.iconColor).size(40)/* .filter(`drop-shadow(2px 4px 6px ${filterInfo.iconColor})`) */,
                                    Text(filterInfo.title).fontSize(20).fontWeight('500').marginTop('10px'),
                                    Text(filterInfo.description).marginTop('10px')
                                )
                                    .initial({ opacity: 0 }).animate({ opacity: 1 })
                                    .margin(10)
                                    .width(350)
                                    .height(170)
                                    .cornerRadius(10)
                                    .shadow('rgba(0, 0, 0, 0.16) 0px 1px 4px')
                                    .backgroundColor('white')
                            )
                        ).wrap('wrap')
                    ),
                    HStack({ alignment: cTrailing })(
                        AcceptButton('OK').action(() => this.dialog.OnOKClick(this.$txtName.get())),
                        CancelButton('Cancel')
                    ).height() //auto
                )
            ).padding(10).background('#f1f1f1')

        )
    }
}
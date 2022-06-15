
import { VStack, HStack, UIContextMenu, cTrailing, ForEach, cLeading, Icon, Text, Spacer, Case } from '@tuval/forms';
import { RegularText } from '../../../UI/Views/Texts';
import { menuItems } from '../Models/menuItems';
import { MVINewAnalyseModelSelection } from '../Models/MVINewAnalyseModelSelection';
import { Badge } from '@procetra/common';

export function NewAnalyseModelTitleBox(tag: string, { id, icon, title, description, controller, badge }: MVINewAnalyseModelSelection) {
    return ({ OnNewAnalyseAdded }) => {
        return (
            VStack(
                // Menu stack
                HStack(
                    // Badge('New', '#22C55E99', '#ffffff66'),
                    Case(badge, {
                        'New': Badge(badge, 'white', '#22C55E99'),
                        'Updated': Badge(badge, 'white', '#3B82F699'),
                        'Preview': Badge(badge, 'white', '#F59E0B99')
                    }),
                    Spacer(),
                    UIContextMenu(
                        ...ForEach(menuItems)(item =>
                            HStack({ alignment: cLeading, spacing: 10 })(
                                Icon(item.icon).size(16),
                                Text(item.title)
                            ).onClick((e) => { item.onClick(null) })
                        )
                    )(
                        Icon('\\d2c6').size(20),
                    )
                        .cursor('pointer')
                        .border('solid 1px var(--sub-border-color)')
                        .transition('border .3s')
                        .cornerRadius(5)
                        .marginRight('10px')
                ).height(), //auto

                // Analysis Icon
                icon && Icon(icon).size(50).foregroundColor('var(--sub-icon-color)').marginBottom('10px'),
                // Analysis Name
                RegularText(title).fontSize('18px').searchWords([tag]),
                // Analysis Description
                description && RegularText(description).fontSize('12px')
            )

                .marginTop('10px')
                .marginRight('10px')
                .cornerRadius(10)
                .width(240).height(150)
                .backgroundColor('rgba(255,255,255,0.3)')
                .shadow('rgb(0 0 0 / 2%) 0px 1px 3px 0px, rgb(27 31 35 / 15%) 0px 0px 0px 1px')
                .initial({ opacity: 0 }).animate({ opacity: 1 })
                .onClick(() => OnNewAnalyseAdded({
                    id: id,
                    icon: icon,
                    name: title,
                    isRight: false,
                    controller: controller,
                    isVisible: () => true
                }))
                .variable('--sub-border-color', { default: 'transparent', hover: '#14a9d5' })
                .variable('--sub-icon-color', { default: '#33333366', hover: '#2baab5' })
                .variable('--sub-icon-size', { default: '50px', hover: '60px' })
                .cursor('pointer')
        )
    }

}
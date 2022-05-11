import { Bindable } from '../../modules/ProcessOverview/Controllers/Overview/Bindable';
import { UIView, HStack, Icon, TextField } from '@tuval/forms';

export function RegularTextBox({ icon, value }: { icon?: string, value: Bindable<string> }): UIView {
    return (
        HStack(
            icon && Icon(icon)
                .size(15)
                .padding(10),
            TextField().fontSize('1rem')
                .foregroundColor('#495057')
                .padding('0.75rem 0.75rem 0.75rem 0rem')
                .onTextChange((text) => { value.set(text); console.log(text) })
        )
            .paddingRight('5px')
            .overflow('hidden')
            .cornerRadius(10)
            .border({ default: '1px solid #ced4da', focus: 'solid 1px #6366F1' })
            .shadow({ default: '', focus: '0 0 0 0.2rem #c7d2fe' })
            .transition('background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s')
            .height()
            .tabIndex(0)
    )
}
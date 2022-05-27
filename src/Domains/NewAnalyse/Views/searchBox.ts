import { HStack, Icon, TextField } from '@tuval/forms';
export function searchBox(): any {
    return ({ onSearchTextChanged }) => {
        return (
            HStack(
                HStack(
                    Icon('\\d22c')
                        .size(20)
                        .paddingRight('10px')
                        .paddingLeft('10px'),
                    TextField().fontSize('1rem')
                        .backgroundColor('transparent')
                        .foregroundColor('#495057')
                        .padding('0.75rem 0.75rem 0.75rem 0rem')
                        .onTextChange((text) => { setTimeout(() => onSearchTextChanged(text), 100) })
                )
                    .width()
                    .initial({ width: '50%', backgroundColor: 'rgba(255,255,255,0.3)' }).animate({ width: '50%' }).focus({ width: '80%', backgroundColor: 'rgba(255,255,255,0.6)' })
                    .paddingRight('5px')
                    .overflow('hidden')
                    .cornerRadius(20)
                    .border({ default: '1px solid #ced4da', focus: 'solid 1px #6366F1' })
                    .shadow({ default: '', focus: '0 0 0 0.2rem #c7d2fe' })
                    //.transition('background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s')
                    //.backgroundColor('rgba(255,255,255,0.3)')
                    .height()
                    .tabIndex(0)
            ).height()
        )
    }

}
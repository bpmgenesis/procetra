import { ListMenuItem, TLabel, ListMenuItemBase } from '@tuval/forms';

export class FilterListMenuItem extends ListMenuItemBase {
    public override get Selectable(): boolean {
        return false;
    }
    public constructor() {
        super();
        const label = new TLabel();
        label.Text = 'Filter';
        this.Controls.Add(label);
    }
}
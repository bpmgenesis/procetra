import { CGColor } from '@tuval/cg';
import { ListMenuItemBase, FontIcon, TFlexColumnContainer, TLabel } from '@tuval/forms';
import { ProcetraFontIcon } from '../ProcetraFontIconControl/ProcetraFontIcon';

export class FilterListMenuItemBase extends ListMenuItemBase {
    public constructor() {
        super();

        this.Appearance.BackgroundColor = 'white';
        this.Appearance.Height = '60px';
        this.Appearance.Display = 'flex';
        this.Appearance.AlignItems = 'center';
        this.Appearance.BorderBottom = '1px solid #ccc';
    }

    protected OnGotSelection(): void {
        this.Appearance.BackgroundColor = '#f9f9f9'; //this.SelectedItemColor;
        this.Appearance.BoxShadow = 'inset 4px 0 0 0 #14a9d5';
    }

    protected OnLostSelection(): void {
        this.Appearance.BackgroundColor = this.Parent.ItemColor;
        this.Appearance.BoxShadow = '';
    }
}
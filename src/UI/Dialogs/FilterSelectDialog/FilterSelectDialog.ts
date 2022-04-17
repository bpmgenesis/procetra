import { SelectFilterListMenu } from './../../Components/SelectFilterListMenu/SelectFilterListMenu';
import { Dialog } from '@tuval/forms';

export class FilterSelectDialog extends Dialog {
    protected InitComponents(): void {
        this.Text = 'Select Filter';
        this.Width = 810;
        this.Height = 600;
        const selectFilterListMenu = new SelectFilterListMenu();
        selectFilterListMenu.Appearance.Width = '100%';
        selectFilterListMenu.Appearance.Height = '400px';
        this.Controls.Add(selectFilterListMenu);
    }
}
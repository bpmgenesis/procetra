import { FilterListMenuItemBase } from './FilterListMenuItemBase';
import { CGColor } from '@tuval/cg';
import { ListMenuItemBase, FontIcon, TFlexColumnContainer, TLabel } from '@tuval/forms';
import { ProcetraFontIcon } from '../ProcetraFontIconControl/ProcetraFontIcon';

export class TimeFrameFilterListItem extends FilterListMenuItemBase {
    public constructor() {
        super();

        const icon = new ProcetraFontIcon();
        icon.Appearance.MarginLeft = '10px';
        icon.Appearance.PaddingBottom = '3px';
        icon.Size = 24;
        icon.Color = CGColor.FromRgba(108, 117, 125);
        icon.Content = '\\f104';

        this.Controls.Add(icon);

        const labelContainer = new TFlexColumnContainer();
        labelContainer.Appearance.MarginLeft = '5px';
        const label1 = new TLabel();
        label1.Text = 'Timeframe';

        labelContainer.Controls.Add(label1);

        const label2 = new TLabel();
        label2.Text = 'Filters by timestamp';
        label2.Appearance.FontSize = '80%';

        labelContainer.Controls.Add(label2);

        this.Controls.Add(labelContainer);

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
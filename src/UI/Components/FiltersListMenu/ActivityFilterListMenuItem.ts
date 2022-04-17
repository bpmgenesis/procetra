import { FilterListMenuItemBase } from './FilterListMenuItemBase';
import { CGColor } from '@tuval/cg';
import { ListMenuItemBase, FontIcon, TFlexColumnContainer, TLabel } from '@tuval/forms';
import { ProcetraFontIcon } from '../ProcetraFontIconControl/ProcetraFontIcon';

export class ActivityFilterListMenuItem extends FilterListMenuItemBase {
    public constructor() {
        super();

        const icon = new ProcetraFontIcon();
        icon.Appearance.MarginLeft = '10px';
        icon.Appearance.PaddingBottom = '3px';
        icon.Size = 24;
        icon.Color = CGColor.FromRgba(108, 117, 125);
        icon.Content = '\\f0e7';

        this.Controls.Add(icon);

        const labelContainer = new TFlexColumnContainer();
        labelContainer.Appearance.MarginLeft = '5px';
        const label1 = new TLabel();
        label1.Text = 'Activity';

        labelContainer.Controls.Add(label1);

        const label2 = new TLabel();
        label2.Text = 'Filters events by activity';
        label2.Appearance.FontSize = '80%';

        labelContainer.Controls.Add(label2);

        this.Controls.Add(labelContainer);

    }
}
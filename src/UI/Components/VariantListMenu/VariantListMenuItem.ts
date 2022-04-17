import { ListMenuItemBase, TVirtualContainer, TLabel } from '@tuval/forms';

export class VariantListMenuItem extends ListMenuItemBase {
    private leftLabel: TLabel;
    private container: TVirtualContainer;
    private rightLabel: TLabel;

    public constructor() {
        super();

        this.leftLabel = new TLabel();
        this.leftLabel.Text = '#1';
        this.leftLabel.Appearance.FontSize = '16px';
        this.leftLabel.Appearance.FontWeight = '500';
        this.leftLabel.Appearance.Padding = '10px';

        this.container = new TVirtualContainer();
        this.container.Appearance.Display = 'flex';
        this.container.Appearance.FlexDirection = 'column';
        this.container.Appearance.FlexGrow = '1';
        this.container.Appearance.FlexShrink = '0';

        const title = new TLabel();
        title.Text = '39% of cases';
        title.Appearance.FontSize = '14px';

        const subtitle = new TLabel();
        subtitle.Text = '6 events per case on average';
        subtitle.Appearance.FontSize = '12px';

        this.container.Controls.Add(title);
        this.container.Controls.Add(subtitle);


        this.rightLabel = new TLabel();
        this.rightLabel.Text = 'Filter';
        this.rightLabel.Appearance.Padding = '10px';

        this.Appearance.Padding = '8px 15px 5px 15px';
        this.Appearance.Cursor = 'pointer';
        this.Appearance.Color = '#333';
        this.Appearance.Height = '50px';
        this.Appearance.BorderBottom = '1px solid #ccc';

        this.Controls.Add(this.leftLabel);
        this.Controls.Add(this.container);
        this.Controls.Add(this.rightLabel);
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
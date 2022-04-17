import { CGColor } from '@tuval/cg';
import { ProcetraFontIcon } from './../ProcetraFontIconControl/ProcetraFontIcon';
import { ListMenuItemBase, TFlexColumnContainer, TLabel } from '@tuval/forms';
export class SelectFilterListMenuIten extends ListMenuItemBase {

    private icon:ProcetraFontIcon;
    private titleLabel:TLabel;
    private descLabel:TLabel;

    public set Icon(value: string) {
        this.icon.Content = value;
    }
    public set IconColor(value: CGColor) {
        this.icon.Color = value;
    }

    public set Title(value: string) {
        this.titleLabel.Text = value;
    }

    public set Description(value: string) {
        this.descLabel.Text = value;
    }

    public constructor() {
        super();

        this.Appearance.Display = 'inline-block';
        this.Appearance.Width = '350px';
        this.Appearance.Height = '170px';
        this.Appearance.BorderRadius = '10px';
        this.Appearance.BackgroundColor = 'white';
        this.Appearance.Margin = '10px';
        this.Appearance.BoxShadow = '0 1px 10px -1px rgb(0 0 0 / 22%), 1px 0px 6px -4px rgb(0 0 0 / 32%)';


        const container = new TFlexColumnContainer();
        container.Appearance.Display = 'flex';
        container.Appearance.FlexDirection = 'column';
        container.Appearance.FlexGrow = '1';

        this.icon = new ProcetraFontIcon();
        this.icon.Appearance.MarginTop = '10px';
        this.icon.Appearance.Display = 'flex';
        this.icon.Appearance.JustifyContent = 'center';
        this.icon.Appearance.FlexGrow = '1';

        this.icon.Size = 48;
        container.Controls.Add(this.icon);

        this.titleLabel = new TLabel();
        this.titleLabel.Appearance.MarginTop = '10px';
        this.titleLabel.Appearance.Display = 'flex';
        this.titleLabel.Appearance.JustifyContent = 'center';
        this.titleLabel.Appearance.FontSize = '20px';

        container.Controls.Add(this.titleLabel);

        this.descLabel = new TLabel();
        this.descLabel.Appearance.Margin = '10px';
        this.descLabel.Appearance.Padding = '10px';
        this.descLabel.Appearance.FontSize = '13px';

        container.Controls.Add(this.descLabel);

        this.Controls.Add(container);
    }

    protected OnGotSelection(): void {
        this.Appearance.BackgroundColor = '#f9f9f9'; //this.SelectedItemColor;
        this.Appearance.BoxShadow = '0 0 3px 1px #00c3ff';
    }

    protected OnLostSelection(): void {
        this.Appearance.BackgroundColor = 'white';
        this.Appearance.BoxShadow = '0 1px 10px -1px rgb(0 0 0 / 22%), 1px 0px 6px -4px rgb(0 0 0 / 32%)';
    }
}
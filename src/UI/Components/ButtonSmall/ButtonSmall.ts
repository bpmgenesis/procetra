import { Control, ControlHtmlRenderer, FontIcon, TLabel, TVirtualContainer } from '@tuval/forms';

import { CGColor } from '@tuval/cg';
export class ButtonSmall extends TVirtualContainer {
    private icon: FontIcon;
    private label: TLabel;

    public get Icon(): string {
        return this.icon.Content;
    }
    public set Icon(value: string) {
        this.icon.Content = value;
    }

    public get Text(): string {
        return this.label.Text;
    }
    public set Text(value: string) {
        this.label.Text = value;
    }
    public constructor() {
        super();

        this.icon = new FontIcon();
        this.icon.FontFamily = 'TuvalProcetraIcons';
        this.icon.Color = CGColor.FromRgba(0x88, 0x88, 0x88);
        this.icon.Appearance.MarginLeft = '5px';
        this.icon.Appearance.Display = 'inline-block';

        this.label = new TLabel();
        this.label.Appearance.Display = 'inline-block';

        this.Appearance.PaddingLeft = '10px';
        this.Appearance.PaddingRight = '10px';

        this.Appearance.FontSize = '12px';
        this.Appearance.BorderRadius = '3px';
        this.Appearance.Height = '25px';
        this.Appearance.Color = '#888';
        this.Appearance.BackgroundColor = '#fff';
        this.Appearance.BorderColor = '#ccc';
        this.Appearance.Border = '1px solid #ccc';
        this.Appearance.BorderBottom = '2px solid #ccc';
        this.Appearance.Display = 'flex';
        this.Appearance.AlignItems = 'center';
        this.Appearance.Cursor = 'pointer';

        this.HoverAppearance.Color = 'red';
        this.FocusAppearance.BorderColor = 'blue';

        this.Controls.Add(this.label);
        this.Controls.Add(this.icon);
    }
    /* protected override GetRenderer(): any {
        return class SliderButtonRenderer extends ControlHtmlRenderer<ButtonSmall> {
            public get UseShadowDom(): boolean {
                return true;
            }

            public GenerateBody(obj: ButtonSmall): void {
                this.WriteControl(obj.label);
                if (obj.icon.Content != null) {
                    this.WriteControl(obj.icon);
                }
            }
        }
    } */
}
import { Control,TVirtualContainer, Teact, ControlHtmlRenderer, FontIcon, TLabel } from '@tuval/forms';
import { CGColor } from '@tuval/cg';

export class Title extends TVirtualContainer {
    private icon: FontIcon;
    private label: TLabel;
    public override get Text():string {
        return this.label.Text;
    }
    public override set Text(value: string) {
        this.label.Text = value;
    }

    public get Icon(): string {
        return this.icon.Content;
    }
    public set Icon(value: string) {
        this.icon.Content = value;;
    }

    public constructor() {
        super();

        this.icon = new FontIcon();
        this.icon.FontFamily = 'TuvalProcetraIcons';
        this.icon.Size = 24;
        this.icon.Color = CGColor.FromRgba(0x14, 0xa9, 0xd5);
        this.icon.Appearance.Padding = '5px';

        this.label = new TLabel();
        this.label.Appearance.Padding = '5px';

        this.Appearance.Display = 'flex';
        this.Appearance.AlignItems = 'center';
        this.Appearance.FlexGrow = '1';

        this.Controls.Add(this.icon);
        this.Controls.Add(this.label);

    }
   /*  protected override GetRenderer(): any {
        return class TitleRenderer extends ControlHtmlRenderer<Title> {

            private writeText(obj: Title) {
                this.WriteStartElement('span');
                this.WriteStyleAttrVal('font-size', '16px');
                this.WriteStyleAttrVal('padding-left', '5px');
                this.WriteTextBody(obj.Text);
                this.WriteEndElement();
            }
            public GenerateBody(obj: Title): void {
                this.WriteStartElement('div');
                this.WriteStyleAttrVal('display', 'flex');
                this.WriteStyleAttrVal('flex-direction', 'row');
                this.WriteStyleAttrVal('padding', '15px');
                // this.WriteStyleAttrVal('background-color', this.TranslateColor(obj.BackColor));
                this.WriteControl(obj.icon);
                this.writeText(obj);
                this.WriteEndElement();
            }

        }
    } */
}
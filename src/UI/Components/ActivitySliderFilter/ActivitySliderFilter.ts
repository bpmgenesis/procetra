import { TVirtualContainer, LayoutPanel, Slider, TFlexColumnContainer, TFlexContainer, TLabel } from '@tuval/forms';
import { Title } from './Title';
import { CGColor } from '@tuval/cg';
import { ButtonSmall } from '../ButtonSmall/ButtonSmall';
export class SliderFilter extends TFlexColumnContainer {
    private title: Title;
    public get Text(): string {
        return this.title.Text;
    }
    public set Text(value: string) {
        this.title.Text = value;
    }

    public get Icon(): string {
        return this.title.Icon;
    }
    public set Icon(value: string) {
        this.title.Icon = value;
    }

    public constructor() {
        super();

        this.Appearance.BackgroundColor = '#f1f1f1';

        this.title = new Title();
        this.title.Appearance.PaddingLeft = '10px';
        this.title.Appearance.Height = '50px';
        this.Controls.Add(this.title);


        const layoutPanel = new TVirtualContainer();
        ///layoutPanel.BackColor = CGColor.FromRgba(0xf1, 0xf1, 0xf1);
        layoutPanel.Appearance.Height = 'calc(100% - 50px)';
        const slider = new Slider();

        slider.Appearance.Left = '0px';
        slider.Appearance.Top = '0px';
        slider.Appearance.Bottom = '0px';
        slider.Appearance.Width = '55px';
        // slider.Appearance.Padding = '15px';
        slider.Appearance.PaddingBottom = '20px';
        slider.Visible = true;
        slider.Value = 50;
        layoutPanel.Controls.Add(slider);

       const buttonsContainer = new TFlexColumnContainer();
       buttonsContainer.Appearance.Position='absolute';
       buttonsContainer.Appearance.Left = '56px';
       buttonsContainer.Appearance.Top = '0px';
       buttonsContainer.Appearance.Bottom = '0px';
       buttonsContainer.Appearance.Right = '0px';
        buttonsContainer.Appearance.Padding='20px';
        buttonsContainer.Appearance.PaddingRight='15px';
        buttonsContainer.Appearance.PaddingTop='15px';
        buttonsContainer.Appearance.PaddingLeft='0px';

        const labelContainer = new TFlexContainer();
        labelContainer.Appearance.JustifyContent = 'center';
        labelContainer.Appearance.MarginTop = '20px';

        const label = new TLabel();
        label.Text = '90%';
        label.Appearance.FontSize = '35px';
        label.Appearance.Color = 'rgb(20, 169, 213)';
        labelContainer.Controls.Add(label);


        buttonsContainer.Controls.Add(labelContainer);

        const resetContainer = new TFlexContainer();
        resetContainer.Appearance.JustifyContent = 'center';
        resetContainer.Appearance.AlignItems = 'center';
        resetContainer.Appearance.MarginTop = '10px';

        const resetButton = new ButtonSmall();
        resetButton.Text = 'Reset';
        resetContainer.Controls.Add(resetButton);

        buttonsContainer.Controls.Add(resetContainer);

       const lessMoreContainer = new TVirtualContainer();
        lessMoreContainer.Appearance.Display = 'flex';
        lessMoreContainer.Appearance.JustifyContent = 'center';
        lessMoreContainer.Appearance.AlignItems = 'center';
        lessMoreContainer.Appearance.MarginTop = '10px';

        const button = new ButtonSmall();
        button.Icon = '\\f087';
        button.Text = 'Less';
        lessMoreContainer.Controls.Add(button);

        const button1 = new ButtonSmall();
        button1.Icon = '\\f091';
        button1.Text = 'More';
        button1.Appearance.MarginLeft = '10px';
        lessMoreContainer.Controls.Add(button1);

        buttonsContainer.Controls.Add(lessMoreContainer);

        layoutPanel.Controls.Add(buttonsContainer);

        this.Controls.Add(layoutPanel);
        //slider.SlideEnd.add(() => this.freqModel.createModel(this.dataset.ProjectId, this.dataset.Id, TMath.map(this.txt.Value, 0, 100, 0, 1)));
    }
}
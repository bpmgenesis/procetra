import { TVirtualContainer, LayoutPanel, Slider } from '@tuval/forms';
import { Title } from './Title';
import { CGColor } from '@tuval/cg';
export class ConnectionSliderControl extends TVirtualContainer {
    public constructor() {
        super();
        const title = new Title();
        title.Text = 'Connections';
        title.BackColor = CGColor.FromRgba(0xf1, 0xf1, 0xf1);
        title.Icon = "\\f13d";
        title._Height = '50px';
        this.Controls.Add(title);

        const layoutPanel = new TVirtualContainer();
        layoutPanel.BackColor = CGColor.FromRgba(0xf1, 0xf1, 0xf1);
        layoutPanel._Height = 'calc(100% - 50px)';
        const slider = new Slider();
        // slider._Height = 'calc(100% - 20px)'; //paddingleri çıkarıyoruz.
        slider.Left = '0px';
        slider.Top = '0px';
        slider.Bottom = '0px';
        slider._Width = '55px';
        slider.PaddingAll = '15px';
        slider.PaddingBottom = '20px';
        slider.Visible = true;
        slider.Value = 50;
        layoutPanel.Controls.Add(slider);

        this.Controls.Add(layoutPanel);
        //slider.SlideEnd.add(() => this.freqModel.createModel(this.dataset.ProjectId, this.dataset.Id, TMath.map(this.txt.Value, 0, 100, 0, 1)));
    }
}



import { TVirtualContainer, LayoutPanel, Slider, RadioButtonGroup, RadioButtonGroupItem, TFlexContainer, TFlexColumnContainer } from '@tuval/forms';

import { CGColor } from '@tuval/cg';
import { Title } from '../ActivitySliderFilter/Title';
export class CalcMethodControl extends TFlexColumnContainer {
    formulaSelectGroup: RadioButtonGroup;
    public constructor() {
        super();

        this.Appearance.BackgroundColor = '#f1f1f1';

        const title = new Title();
        title.Text = 'Calculation';
        title.Icon = "\\f0e8";
        title._Height = '50px';
        this.Controls.Add(title);

        const layoutPanel = new TVirtualContainer();
        layoutPanel.BackColor = CGColor.FromRgba(0xf1, 0xf1, 0xf1);
        layoutPanel._Height = 'calc(100% - 50px)';
        layoutPanel.PaddingAll = '15px';
        layoutPanel.PaddingBottom = '20px';

        this.formulaSelectGroup = new RadioButtonGroup();
        this.formulaSelectGroup.Items.Add('mean', 'Mean');
        this.formulaSelectGroup.Items.Add('sum', 'Sum');
        this.formulaSelectGroup.Items.Add('median', 'Median');
        this.formulaSelectGroup.Items.Add('stdev', 'Stdev');
        this.formulaSelectGroup.Items.Add('max', 'Max');
        this.formulaSelectGroup.Items.Add('min', 'Min');
        this.formulaSelectGroup.Value$.subscribe((value: RadioButtonGroupItem) => {
            if (value) {
               // this.createModel(this.dataset, value.Key);
            }
        });


        this.formulaSelectGroup.Left = '0px';
        this.formulaSelectGroup.Top = '0px';
        this.formulaSelectGroup.Bottom = '0px';
        this.formulaSelectGroup._Width = '55px';
        this.formulaSelectGroup.PaddingAll = '15px';
        this.formulaSelectGroup.PaddingBottom = '20px';
        this.formulaSelectGroup.Visible = true;

        layoutPanel.Controls.Add(this.formulaSelectGroup);



        this.Controls.Add(layoutPanel);
        //slider.SlideEnd.add(() => this.freqModel.createModel(this.dataset.ProjectId, this.dataset.Id, TMath.map(this.txt.Value, 0, 100, 0, 1)));
    }
}
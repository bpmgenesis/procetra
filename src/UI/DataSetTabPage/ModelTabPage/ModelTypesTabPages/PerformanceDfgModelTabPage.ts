import { CGColor } from '@tuval/cg';
import { int, TMath } from '@tuval/core';
import { TVirtualContainer, Accordion, LayoutPanel, ScrollPanel, SizingModes, Slider, TTabPage, RadioButtonGroup, RadioButtonGroupItem } from '@tuval/forms';
import { IDataSet } from '../../../../Bussiness/IDataSet';
import { ConnectionSliderControl } from '../../../Components/ActivitySliderFilter/ConnectionSliderControl';
import { CalcMethodControl } from '../../../Components/CalcMethodControl/CalcMethodControl';
import { PerformanceMapControl } from '../../../Components/PerformanceMapControl/PerformanceMapControl';
import { SliderFilter } from './../../../Components/ActivitySliderFilter/ActivitySliderFilter';

declare var Viz;
export class PerformanceDfgModelTabPage extends TTabPage {
    txt: Slider;
    freqModel: PerformanceMapControl;
    dataset: IDataSet;
    layoutPanel: LayoutPanel;
    scrollPanel: ScrollPanel;
    formulaSelectGroup: CalcMethodControl;
    public override InitComponents() {

        this.layoutPanel = new LayoutPanel();
        this.layoutPanel.SizingMode = SizingModes.RightFixed;

        this.freqModel = new PerformanceMapControl();
        this.freqModel.Width = 500;
        this.freqModel.Height = 500;

        this.scrollPanel = new ScrollPanel();
        this.scrollPanel.Width = 300;
        this.scrollPanel.Height = 300;
        //this.scrollPanel.Controls.Add(this.freqModel);

        this.layoutPanel.LeftControl = this.freqModel;

        const container = new TVirtualContainer();
        container.Appearance.FlexDirection = 'column';
        container._Height = '100%';


        this.formulaSelectGroup = new CalcMethodControl();
        this.formulaSelectGroup._Height = '270px';
        this.formulaSelectGroup.Appearance.MinHeight = '270px';
        this.formulaSelectGroup.Appearance.BorderBottomColor = '#ccc';
        this.formulaSelectGroup.Appearance.BorderBottomStyle = 'Solid' as any;
        this.formulaSelectGroup.Appearance.BorderBottomWidth = '1px';

        container.Controls.Add(this.formulaSelectGroup);

        const cont1 = new SliderFilter();
        cont1.Text = 'Activities';
        cont1.Icon = '\\f0e1';
        cont1._Height = 'calc(100% - 270px)';
        cont1.Appearance.BorderBottomColor = '#ccc';
        cont1.Appearance.BorderBottomStyle = 'Solid' as any;
        cont1.Appearance.BorderBottomWidth = '1px';
        container.Controls.Add(cont1);


        this.layoutPanel.RightControl = container;
        // this.layoutPanel.RightControl._Height =
        this.layoutPanel.LeftSize = 250;

        this.Controls.Add(this.layoutPanel);

        setTimeout(() => this.SendResizeRequest(), 150);
    }

    public SetDataset(dataset: IDataSet) {
        this.dataset = dataset;

    }

    public override OnFormResized(w: int, h: int) {

        const rect = this.layoutPanel.GetLeftPanelRect();
        this.freqModel.Height = h - 215;
        if (rect != null && rect.width > 0) {
            this.freqModel.Width = rect.width;
        }

    }
    public override OnActivate() {
        if (this.dataset != null) {
            this.freqModel.createModel(this.dataset.ProjectId, this.dataset.Id, 0.5);
        }
        this.SendResizeRequest();
    }
}
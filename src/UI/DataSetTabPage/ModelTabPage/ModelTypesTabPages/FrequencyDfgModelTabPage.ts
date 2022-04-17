import { CGColor } from '@tuval/cg';
import { SliderFilter } from './../../../Components/ActivitySliderFilter/ActivitySliderFilter';
import { Convert, float, int, TMath } from '@tuval/core';
import { Accordion, Slider, TTabPage, LayoutPanel, SizingModes, ScrollPanel, TVirtualContainer,BorderAppearanceStyle } from '@tuval/forms';
import { IDataSet } from '../../../../Bussiness/IDataSet';
import { FrequencyDfgDiscovery } from '../../../../Logic/algo/discovery/dfg/algorithm';
import { DfgSliders } from '../../../../Logic/objects/dfg/util/sliders';
import { FrequencyDfgGraphvizVisualizer } from '../../../../Logic/visualization/dfg/frequency';
import { FregMapControl } from '../../../Components/FregMapControl/FregMapControl';
import { FlexLayout } from '../../../controls/layout/FlexLayout';
import { JustifyContents } from '../../../controls/layout/JustifyContents';
import { SvgViewer } from '../../../controls/SvgViewer';
import { ConnectionSliderControl } from '../../../Components/ActivitySliderFilter/ConnectionSliderControl';

declare var Viz;
export class FrequencyDfgModelTabPage extends TTabPage {
    txt: Slider;
    freqModel: FregMapControl;
    dataset: IDataSet;
    layoutPanel: LayoutPanel;
    scrollPanel: ScrollPanel;
    public override InitComponents() {

        this.layoutPanel = new LayoutPanel();
        this.layoutPanel.SizingMode = SizingModes.RightFixed;

        this.freqModel = new FregMapControl();
        this.freqModel.Width = 500;
        this.freqModel.Height = 500;


        const accordion = new Accordion();
        accordion.Width = 200;


        this.txt = new Slider();
        this.txt.Visible = true;
        this.txt.Value = 50;
        this.txt.SlideEnd.add(() => this.freqModel.createModel(this.dataset.ProjectId, this.dataset.Id, TMath.map(this.txt.Value, 0, 100, 0, 1)));

        const tab1 = accordion.Tabs.Add('Activities');
        /* tab1.Controls.Add(new ActivitySliderControl());
        tab1.Controls.Add(this.txt); */

        accordion.ActiveIndexes = [0, 1];

        this.scrollPanel = new ScrollPanel();
        this.scrollPanel.Width = 300;
        this.scrollPanel.Height = 300;
        //this.scrollPanel.Controls.Add(this.freqModel);

        this.layoutPanel.LeftControl = this.freqModel;

        const container = new TVirtualContainer();
        container.Appearance.Height = '100%';
        container.Appearance.FlexDirection = 'column';

        const cont1 = new SliderFilter();
        cont1.Text = 'Activities';
        cont1.Icon = '\\f0e1';
        cont1._Height = '50%';

        cont1.Appearance.BorderBottomColor = '#ccc';
        cont1.Appearance.BorderBottomStyle = 'Solid' as any;
        cont1.Appearance.BorderBottomWidth = '1px';
        container.Controls.Add(cont1);

        const cont2 = new SliderFilter();
        cont2.Text = 'Connections';
        cont2.Icon = '\\f13d';
        cont2._Height = '50%';
        container.Controls.Add(cont2);

        this.layoutPanel.RightControl = container;
        // this.layoutPanel.RightControl._Height =
        this.layoutPanel.LeftSize = 220;

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
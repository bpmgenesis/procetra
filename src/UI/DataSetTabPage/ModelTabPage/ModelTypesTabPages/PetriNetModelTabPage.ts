import { int } from '@tuval/core';
import { TVirtualContainer, LayoutPanel, ScrollPanel, SizingModes, Slider, TTabPage } from '@tuval/forms';
import { IDataSet } from '../../../../Bussiness/IDataSet';
import { ConnectionSliderControl } from '../../../Components/ActivitySliderFilter/ConnectionSliderControl';
import { PetrinetMapControl } from '../../../Components/PetrinetMapControl/PetrinetMapControl';
import { SliderFilter } from './../../../Components/ActivitySliderFilter/ActivitySliderFilter';

declare var Viz;
export class PetriNetModelTabPage extends TTabPage {
  txt: Slider;
  freqModel: PetrinetMapControl;
  dataset: IDataSet;
  layoutPanel: LayoutPanel;
  scrollPanel: ScrollPanel;
  public override InitComponents() {

    this.layoutPanel = new LayoutPanel();
    this.layoutPanel.SizingMode = SizingModes.RightFixed;

    this.freqModel = new PetrinetMapControl();
    this.freqModel.Width = 500;
    this.freqModel.Height = 500;


    this.layoutPanel.LeftControl = this.freqModel;

    const container = new TVirtualContainer();
    container._Height = '100%';
    const cont1 = new SliderFilter();
    cont1._Height = '50%';
    container.Controls.Add(cont1);

    const cont2 = new ConnectionSliderControl();
    cont2._Height = '50%';
    container.Controls.Add(cont2);

    this.layoutPanel.RightControl = container;
    this.layoutPanel.LeftSize = 250;

    this.Controls.Add(this.layoutPanel);

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
      this.freqModel.createModel(this.dataset);
    }
    this.SendResizeRequest();
  }
}
import { BarChart } from '@tuval/components/charts';
import { int } from '@tuval/core';
import { Button, ListMenu, Slider, TTabControl, TTabPage, LayoutPanel, ListMenuItem } from '@tuval/forms';
import { IDataSet } from '../../../Bussiness/IDataSet';
import { Resources } from '../../../Resources/Resources';
import { FlexLayout } from '../../controls/layout/FlexLayout';
import { BPMNModelTabPage } from './ModelTypesTabPages/BPMNModelTabPage';
import { FrequencyDfgModelTabPage } from './ModelTypesTabPages/FrequencyDfgModelTabPage';
import { PerformanceDfgModelTabPage } from './ModelTypesTabPages/PerformanceDfgModelTabPage';
import { PetriNetModelTabPage } from './ModelTypesTabPages/PetriNetModelTabPage';
import { ResourcePerformanceModelTabPage } from './ModelTypesTabPages/ResourcePerformanceModelTabPage';
import { ResourceFreqModelTabPage } from './ModelTypesTabPages/ResourceFreqModelTabPage';


declare var Viz;

class ModelListMenuItem extends ListMenuItem {
    public constructor() {
        super();
        this.Icon.FontFamily = 'TuvalProcetraIcons';
        this.IconRight.FontFamily = 'TuvalProcetraIcons';
    }
    protected override OnGotSelection(): void {
        super.OnGotSelection();
        this.IconRight.Content = '\\f016';
        this.IconRight.Size = 14;
        this.IconRight.Appearance.Padding = '10px';
    }
    protected override OnLostSelection(): void {
         super.OnLostSelection();
        this.IconRight.Content = '';
    }
}

export class ModelTabPage extends TTabPage {
    private dataset: IDataSet;
    chart: BarChart;
    txt: Slider;
    btnCreateModel: Button;
    listMenu: ListMenu;
    frequencyDfgModelTabPage: FrequencyDfgModelTabPage;
    performanceDfgModelTabPage: PerformanceDfgModelTabPage;
    petriNetModelTabPage: PetriNetModelTabPage;
    bpmnModelTabPage: BPMNModelTabPage;
    resourcePerformanceModelTabPage: ResourcePerformanceModelTabPage;
    resourceFreqModelTabPage: ResourceFreqModelTabPage;
    modelsTab: TTabControl<TTabPage>;
    public override InitComponents() {

        const flexPanel = new LayoutPanel();
        this.listMenu = new ListMenu();
        this.listMenu.Width = 210;
        this.listMenu.Height = 500;
        this.listMenu.ItemHeight = 50;
        this.listMenu.HeaderText = 'Model Types';

        this.listMenu.BackgroundColor = '#E6E6E6';
        this.listMenu.ItemColor = '#FFFFFF';
        this.listMenu.SelectedItemColor = '#4071BB';
        this.listMenu.ItemBorder.AddBottomBorder('#DCDCDC');

        flexPanel.LeftControl = this.listMenu;
        flexPanel.LeftSize = 210;
        this.Controls.Add(flexPanel);

        const liFreqMap = new ModelListMenuItem();
        liFreqMap.Text = 'Frequency Map';
        liFreqMap.Icon.Content = '\\f0a4';
        this.listMenu.Items.Add(liFreqMap);


        const liPerfMap = new ModelListMenuItem();
        liPerfMap.Text = 'Performance Map';
        liPerfMap.Icon.Content = '\\f0a4';
        this.listMenu.Items.Add(liPerfMap);

        const liPetriMap = new ModelListMenuItem();
        liPetriMap.Text = 'Petri Net Model';
        liPetriMap.Icon.Content = '\\f141';
        this.listMenu.Items.Add(liPetriMap);


        const liResourceFreqMap = new ModelListMenuItem();
        liResourceFreqMap.Text = 'Resource Perf. Model';
        liResourceFreqMap.Icon.Content = '\\f007';
        this.listMenu.Items.Add(liResourceFreqMap);


        this.listMenu.Items.Add('Resource Freq. Model'/* , Resources.Icons.MapIcon,
            Resources.Icons.MapSelectedIcon,
            Resources.Icons.RightArrowIcon,
            Resources.Icons.RightArrowSelectedIcon */);

        this.listMenu.SelectedIndex = 0;

        this.modelsTab = new TTabControl();
        this.modelsTab.ActiveIndex = -1;
        this.modelsTab.ShowHeader = false;
        this.frequencyDfgModelTabPage = new FrequencyDfgModelTabPage();
        this.frequencyDfgModelTabPage.Text = '1';
        this.modelsTab.TabPages.Add(this.frequencyDfgModelTabPage);

        this.performanceDfgModelTabPage = new PerformanceDfgModelTabPage();
        this.performanceDfgModelTabPage.Text = '2';
        this.modelsTab.TabPages.Add(this.performanceDfgModelTabPage);

        this.petriNetModelTabPage = new PetriNetModelTabPage();
        this.petriNetModelTabPage.Text = '3';
        this.modelsTab.TabPages.Add(this.petriNetModelTabPage);

        this.resourcePerformanceModelTabPage = new ResourcePerformanceModelTabPage();
        this.resourcePerformanceModelTabPage.Text = '4';
        this.modelsTab.TabPages.Add(this.resourcePerformanceModelTabPage);

        this.resourceFreqModelTabPage = new ResourceFreqModelTabPage();
        this.resourceFreqModelTabPage.Text = '5';
        this.modelsTab.TabPages.Add(this.resourceFreqModelTabPage);

        /*   this.bpmnModelTabPage = new BPMNModelTabPage();
           this.bpmnModelTabPage.Text = '4';
           modelsTab.TabPages.Add(this.bpmnModelTabPage); */

        flexPanel.RightControl = this.modelsTab;

        debugger;

        //this.modelsTab.ActiveIndex$ = this.listMenu.SelectedIndex$;

        this.listMenu.SelectedIndexChanged =((index:int) =>{
            this.modelsTab.ActiveIndex = index;
        }) as any;

        setTimeout(() => this.SendResizeRequest(), 100);
    }
    public SetDataSet(dataset: IDataSet) {
        this.dataset = dataset;
        this.frequencyDfgModelTabPage.SetDataset(dataset);
        this.performanceDfgModelTabPage.SetDataset(dataset);


        this.petriNetModelTabPage.SetDataset(dataset);
        this.resourcePerformanceModelTabPage.SetDataset(dataset);
        this.resourceFreqModelTabPage.SetDataset(dataset);
    }

    public override OnFormResized(w: int, h: int) {
        super.OnFormResized(w, h);
        this.listMenu.Appearance.Height =`${h - 225}px`;
    }
    public override OnActivate() {
        if (this.modelsTab != null) {
            this.modelsTab.ActiveIndex = 0;
        }
        this.SendResizeRequest();
    }
}
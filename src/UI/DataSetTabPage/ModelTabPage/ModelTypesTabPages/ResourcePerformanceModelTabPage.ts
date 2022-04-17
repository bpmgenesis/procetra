import { TMath, int } from '@tuval/core';
import { Accordion, RadioButtonGroup, RadioButtonGroupItem, Slider, TTabPage } from '@tuval/forms';
import { IDataSet } from '../../../../Bussiness/IDataSet';
import { PerformanceDfgDiscovery } from '../../../../Logic/algo/discovery/dfg/algorithm';
import { DfgSliders } from '../../../../Logic/objects/dfg/util/sliders';
import { PerformanceDfgGraphvizVisualizer } from '../../../../Logic/visualization/dfg/performance';
import { FlexLayout } from '../../../controls/layout/FlexLayout';
import { JustifyContents } from '../../../controls/layout/JustifyContents';
import { SvgViewer } from '../../../controls/SvgViewer';


declare var Viz;
export class ResourcePerformanceModelTabPage extends TTabPage {
    txt: Slider;
    svgViewer: any;
    dataset: IDataSet;
    private formulaSelectGroup: RadioButtonGroup;
    public override InitComponents() {
        const layoutPanel = new FlexLayout()

        const accordion = new Accordion();
        accordion.Width = 200;

        this.svgViewer = new SvgViewer();

        const flexItem = layoutPanel.AddFlexItem(this.svgViewer);
        flexItem.Shrink = true;
        flexItem.Grow = true;
        flexItem.JustifyContent = JustifyContents.Center;

        flexItem.ResizeEvent.add((size) => {
            this.svgViewer.Width = size.width - 10;
        });

        this.txt = new Slider();
        this.txt.Visible = true;
        this.txt.Value = 50;
        this.txt.SlideEnd.add(() => this.createModel(this.dataset, this.formulaSelectGroup.Value ? this.formulaSelectGroup.Value.Key : 'mean'));

        this.formulaSelectGroup = new RadioButtonGroup();
        this.formulaSelectGroup.Items.Add('mean', 'Mean');
        this.formulaSelectGroup.Items.Add('sum', 'Sum');
        this.formulaSelectGroup.Items.Add('median', 'Median');
        this.formulaSelectGroup.Items.Add('stdev', 'Stdev');
        this.formulaSelectGroup.Items.Add('max', 'Max');
        this.formulaSelectGroup.Items.Add('min', 'Min');
        this.formulaSelectGroup.Value$.subscribe((value: RadioButtonGroupItem) => {
            if (value) {
                this.createModel(this.dataset, value.Key);
            }
        });

        const tab = accordion.Tabs.Add('Aggregation Method ');
        tab.Controls.Add(this.formulaSelectGroup);

        const tab1 = accordion.Tabs.Add('Activities');
        tab1.Controls.Add(this.txt);

        accordion.ActiveIndexes = [0, 1];
        layoutPanel.AddFlexItem(accordion);



        this.Controls.Add(layoutPanel);
    }

    public SetDataset(dataset: IDataSet) {
        try {
            this.dataset = dataset;
            this.createModel(dataset);
        }catch(e) {
            alert(e.toString());
        }
    }
    private createModel(dataset: IDataSet, calculationModel: string = 'mean') {
        let frequencyDfg = PerformanceDfgDiscovery.apply(dataset.EventLog, 'org:resource'/* dataset.ActivityColumn */, dataset.TimeStampColumn, calculationModel, dataset.StartDateColumn);
        frequencyDfg = DfgSliders.filterDfgOnPercActivities(frequencyDfg, TMath.map(this.txt.Value, 0, 100, 0, 1));
        const pathFreq = frequencyDfg['pathsFrequency'];
        const endact = frequencyDfg['endActivities'];
        const startact = frequencyDfg['startActivities'];
        const activities = frequencyDfg['activities'];

        let gv = PerformanceDfgGraphvizVisualizer.apply(frequencyDfg);
        this.svgViewer.SvgString = Viz(gv, { format: "svg" });
    }
    public override OnFormResized(w: int, h: int) {
        if (this.svgViewer) {
            this.svgViewer.Height = h - 220;
        }
    }
}
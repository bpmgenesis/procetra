import { Teact, DomHandler, Control, Property, Slider, Orientations, Margin, MarginApplies } from '@tuval/forms';
import { TvChart, sort } from '@tuval/components/charts';
import { Services } from '../../../../Services/Services';
import { CurrentDatasetChangedArgs } from '../../../../Services/StateService';
import { GridView } from '@tuval/components/grids';
import { FrequencyDfgDiscovery, PerformanceDfgDiscovery } from '../../../../Logic/algo/discovery/dfg/algorithm';
import { IDataSet } from '../../../../Bussiness/IDataSet';
import { DfgSliders } from '../../../../Logic/objects/dfg/util/sliders';
import { PerformanceDfgGraphvizVisualizer } from '../../../../Logic/visualization/dfg/performance';
import { SvgViewer } from '../../../controls/SvgViewer';
import { int, classNames, TMath, float } from '@tuval/core';
import { FrequencyDfgGraphvizVisualizer } from '../../../../Logic/visualization/dfg/frequency';
import { PortalSideFilterControl } from '../../PortalSideControl/PortalSideFilterControl';
import { H4 } from '../../../GeneralControls/H4';

declare var Viz;

export class FreqModelPage extends Control<FreqModelPage> {

    @Property()
    private menuActive: boolean;

    @Property()
    private svgViewer: SvgViewer;

    @Property()
    private filter: PortalSideFilterControl;

    @Property()
    private slider: Slider;

    public SetupControlDefaults(): void {
        super.SetupControlDefaults();
        this.svgViewer = new SvgViewer();
        this.svgViewer.Width = -100;
        this.svgViewer.Height = 700;
        this.menuActive = false;

        this.slider = new Slider();
        this.slider.Orientation = Orientations.Horizontal;
        this.slider.Visible = true;
        this.slider.Value = 50;


        this.filter = new PortalSideFilterControl();
        const sidePanel1 = this.filter.Items.Add('', 'pi pi-filter');
        sidePanel1.Width = 300;
        const h4 = new H4();
        h4.Margin = new Margin(0,50,0,20, MarginApplies.All);

        h4.Text = 'Activity Precision';
        sidePanel1.Controls.Add(h4);
        sidePanel1.Controls.Add(this.slider);

    }
    public SetDataSet(projectId: string, datasetId: string) {
        this.createModel(projectId, datasetId, 0.5);
        this.slider.SlideEnd.add(() => this.createModel(projectId, datasetId, TMath.map(this.slider.Value, 0, 100, 0, 1)));
    }

    private createModel(projectId: string, datasetId: string, presicion: float) {

        Services.ProjectService.GetDatasetById(projectId, datasetId).then((dataset: IDataSet) => {
            let frequencyDfg = FrequencyDfgDiscovery.apply(dataset.EventLog, dataset.ActivityColumn/*  "concept:name" */);
            frequencyDfg = DfgSliders.filterDfgOnPercActivities(frequencyDfg, presicion);
            const pathFreq = frequencyDfg['pathsFrequency'];
            const endact = frequencyDfg['endActivities'];
            const startact = frequencyDfg['startActivities'];
            const activities = frequencyDfg['activities'];


            let gv = FrequencyDfgGraphvizVisualizer.apply(frequencyDfg);
            this.svgViewer.SvgString = Viz(gv, { format: "svg" });
        });
    }

    public override OnFormResized(w: int, h: int) {
        if (this.svgViewer) {
            this.svgViewer.Height = h - 220;
        }
    }

    public CreateElements() {
        const className = classNames('layout-config', { 'layout-config-active': this.menuActive } as any);

        return (
            <div>
                {(this.filter as any).CreateMainElement()}
                <div class="dashboard" style="margin-bottom: 100px;">
                    <div id="dashboard-header" class="clearfix">
                        <h2 class="page-header">
                            <i class="fa fa-sitemap"></i>&nbsp;Frequency Model&nbsp;&nbsp;
                        </h2>

                    </div>
                    <div class="row">
                        {(this.svgViewer as any).CreateMainElement()}
                    </div>
                </div>
            </div>
        );
    }

}
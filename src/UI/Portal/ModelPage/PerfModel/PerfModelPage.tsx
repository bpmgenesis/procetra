import { Teact, DomHandler, Control, Property, Slider, Margin,Orientations,MarginApplies, RadioButtonGroup, RadioButtonGroupItem } from '@tuval/forms';
import { TvChart, sort } from '@tuval/components/charts';
import { Services } from '../../../../Services/Services';
import { CurrentDatasetChangedArgs } from '../../../../Services/StateService';
import { GridView } from '@tuval/components/grids';
import { PerformanceDfgDiscovery } from '../../../../Logic/algo/discovery/dfg/algorithm';
import { IDataSet } from '../../../../Bussiness/IDataSet';
import { DfgSliders } from '../../../../Logic/objects/dfg/util/sliders';
import { PerformanceDfgGraphvizVisualizer } from '../../../../Logic/visualization/dfg/performance';
import { SvgViewer } from '../../../controls/SvgViewer';
import { int, classNames, TMath, float } from '@tuval/core';
import { PortalSideFilterControl } from '../../PortalSideControl/PortalSideFilterControl';
import { H4 } from '../../../GeneralControls/H4';
import { parse } from '../../../../Svg/parser/svgparser';

declare var Viz;

export class PerfModelPage extends Control<PerfModelPage> {

    @Property()
    private menuActive: boolean;

    @Property()
    private svgViewer: SvgViewer;

    @Property()
    private filter: PortalSideFilterControl;

    @Property()
    private slider: Slider;

    @Property()
    private formulaSelectGroup: RadioButtonGroup;

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

        h4.Text = 'Activity Precision';
        h4.Margin = new Margin(0,50,0,20, MarginApplies.All);
        sidePanel1.Controls.Add(h4);
        sidePanel1.Controls.Add(this.slider);

        this.formulaSelectGroup = new RadioButtonGroup();
        this.formulaSelectGroup.Items.Add('mean', 'Mean');
        this.formulaSelectGroup.Items.Add('sum', 'Sum');
        this.formulaSelectGroup.Items.Add('median', 'Median');
        this.formulaSelectGroup.Items.Add('stdev', 'Stdev');
        this.formulaSelectGroup.Items.Add('max', 'Max');
        this.formulaSelectGroup.Items.Add('min', 'Min');

        const title = new H4();
        title.Margin = new Margin(0,30,0,20, MarginApplies.All);
        title.Text = 'Aggregation Method';
        sidePanel1.Controls.Add(title);
        sidePanel1.Controls.Add(this.formulaSelectGroup);


    }
    public SetDataSet(projectId: string, datasetId: string) {
        this.createModel(projectId, datasetId);
        this.slider.SlideEnd.add(() => this.createModel(projectId, datasetId, TMath.map(this.slider.Value, 0, 100, 0, 1)));

        this.formulaSelectGroup.Value$.subscribe((value: RadioButtonGroupItem) => {
            if (value) {
                this.createModel(projectId, datasetId, TMath.map(this.slider.Value, 0, 100, 0, 1), value.Key);
            }
        });
    }

    private createModel(projectId: string, datasetId: string, presicion: float = 0.5, calculationModel: string = 'mean') {
        Services.ProjectService.GetDatasetById(projectId, datasetId).then((dataset: IDataSet) => {
            let frequencyDfg = PerformanceDfgDiscovery.apply(dataset.EventLog, dataset.ActivityColumn, dataset.TimeStampColumn, calculationModel, dataset.StartDateColumn);
            frequencyDfg = DfgSliders.filterDfgOnPercActivities(frequencyDfg, presicion/* TMath.map(this.txt.Value, 0, 100, 0, 1) */);
            const pathFreq = frequencyDfg['pathsFrequency'];
            const endact = frequencyDfg['endActivities'];
            const startact = frequencyDfg['startActivities'];
            const activities = frequencyDfg['activities'];

            let gv = PerformanceDfgGraphvizVisualizer.apply(frequencyDfg);
            const str = Viz(gv, { format: "svg" });
            console.log(parse(str));
            this.svgViewer.SvgString = str;
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
                            <i class="fa fa-sitemap"></i>&nbsp;Performance Model&nbsp;&nbsp;
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
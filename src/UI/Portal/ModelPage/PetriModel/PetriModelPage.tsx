import { Teact, DomHandler, Control, Property } from '@tuval/forms';
import { TvChart, sort } from '@tuval/components/charts';
import { Services } from '../../../../Services/Services';
import { CurrentDatasetChangedArgs } from '../../../../Services/StateService';
import { GridView } from '@tuval/components/grids';
import { PerformanceDfgDiscovery } from '../../../../Logic/algo/discovery/dfg/algorithm';
import { IDataSet } from '../../../../Bussiness/IDataSet';
import { DfgSliders } from '../../../../Logic/objects/dfg/util/sliders';
import { PerformanceDfgGraphvizVisualizer } from '../../../../Logic/visualization/dfg/performance';
import { SvgViewer } from '../../../controls/SvgViewer';
import { int } from '@tuval/core';
import { InductiveMiner } from '../../../../Logic/algo/discovery/inductive/algorithm';
import { ProcessTreeToPetriNetConverter } from '../../../../Logic/objects/conversion/process_tree/to_petri_net';
import { PetriNetVanillaVisualizer } from '../../../../Logic/visualization/petri_net/vanilla_graphviz';

declare var Viz;

export class PetriModelPage extends Control<PetriModelPage> {

    @Property()
    private svgViewer: SvgViewer;

    public SetupControlDefaults(): void {
        super.SetupControlDefaults();
        this.svgViewer = new SvgViewer();
        this.svgViewer.Width = -100;
        this.svgViewer.Height = 900;

    }
    public SetDataSet(projectId: string, datasetId: string) {
        this.createModel(projectId, datasetId);
    }

    private createModel(projectId: string, datasetId: string, calculationModel: string = 'mean') {

        Services.ProjectService.GetDatasetById(projectId, datasetId).then((dataset: IDataSet) => {
            let processTree = InductiveMiner.apply(dataset.EventLog, dataset.ActivityColumn, 0.5);
            let acceptingPetriNet = ProcessTreeToPetriNetConverter.apply(processTree);

            let gv = PetriNetVanillaVisualizer.apply(acceptingPetriNet);
            this.svgViewer.SvgString = Viz(gv, { format: "svg" });
        });


    }
    public override OnFormResized(w: int, h: int) {
        if (this.svgViewer) {
            this.svgViewer.Height = h - 220;
        }
    }

    public CreateElements() {
        return (
            <div class="dashboard" style="margin-bottom: 100px;">
                  <div id="dashboard-header" class="clearfix">
                    <h2 class="page-header">
                        <i class="fa fa-sitemap"></i>&nbsp;Petri Net Model&nbsp;&nbsp;
                    </h2>

                </div>
                <div class="row">
                    {(this.svgViewer as any).CreateMainElement()}
                </div>
            </div>
        );
    }

}
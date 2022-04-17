import { Control } from '@tuval/forms';
import { IDataSet } from '../../../Bussiness/IDataSet';
import { FrequencyDfgDiscovery, PerformanceDfgDiscovery } from '../../../Logic/algo/discovery/dfg/algorithm';
import { Services } from '../../../Services/Services';
import { SvgViewer } from '../../controls/SvgViewer';
import { float, TMath } from '@tuval/core';
import { DfgSliders } from '../../../Logic/objects/dfg/util/sliders';
import { FrequencyDfgGraphvizVisualizer } from '../../../Logic/visualization/dfg/frequency';
import { PerformanceDfgGraphvizVisualizer } from '../../../Logic/visualization/dfg/performance';
import { parse } from '../../../Svg/parser/svgparser';
import { InductiveMiner } from '../../../Logic/algo/discovery/inductive/algorithm';
import { ProcessTreeToPetriNetConverter } from '../../../Logic/objects/conversion/process_tree/to_petri_net';
import { PetriNetVanillaVisualizer } from '../../../Logic/visualization/petri_net/vanilla_graphviz';

declare var Viz;

export class PetrinetMapControl extends SvgViewer {
    private PetrinetMapControl() {
        this.Width = -100;
        this.Height = 700;
    }
    public SetDataSet(dataset: IDataSet) {
        this.createModel(dataset);
        //this.slider.SlideEnd.add(() => this.createModel(projectId, datasetId, TMath.map(this.slider.Value, 0, 100, 0, 1)));
    }

    public createModel(dataset: IDataSet) {
        let processTree = InductiveMiner.apply(dataset.EventLog, dataset.ActivityColumn, TMath.map(50, 0, 100, 0, 1));
        let acceptingPetriNet = ProcessTreeToPetriNetConverter.apply(processTree);

        let gv = PetriNetVanillaVisualizer.apply(acceptingPetriNet);
        this.SvgString = Viz(gv, { format: "svg" });

    }
}
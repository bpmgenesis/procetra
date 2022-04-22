import { Control } from '@tuval/forms';
import { IDataSet } from '../../../Bussiness/IDataSet';
import { FrequencyDfgDiscovery } from '../../../Logic/algo/discovery/dfg/algorithm';
import { Services } from '../../../Services/Services';
import { SvgViewer } from '../../controls/SvgViewer';
import { float } from '@tuval/core';
import { DfgSliders } from '../../../Logic/objects/dfg/util/sliders';
import { FrequencyDfgGraphvizVisualizer } from '../../../Logic/visualization/dfg/frequency';

declare var Viz;

export class FregMapControl extends SvgViewer {
    private FregMapControl() {
        this.Width = -100;
        this.Height = 700;
    }
    public SetDataSet(projectId: string, datasetId: string) {
        this.createModel(projectId, datasetId, 0.5);
        //this.slider.SlideEnd.add(() => this.createModel(projectId, datasetId, TMath.map(this.slider.Value, 0, 100, 0, 1)));
    }

    public createModel(projectId: string, datasetId: string, presicion: float) {

        Services.ProjectService.GetDatasetById(projectId, datasetId).then((dataset: IDataSet) => {
            let frequencyDfg = FrequencyDfgDiscovery.apply(dataset.EventLog, dataset.ActivityColumn/*  "concept:name" */);
            frequencyDfg = DfgSliders.filterDfgOnPercActivities(frequencyDfg, presicion);
            const pathFreq = frequencyDfg['pathsFrequency'];
            const endact = frequencyDfg['endActivities'];
            const startact = frequencyDfg['startActivities'];
            const activities = frequencyDfg['activities'];

            let gv = FrequencyDfgGraphvizVisualizer.apply(frequencyDfg);
           const a = Viz(gv, { format: "svg" });

            this.SvgString = a;

        });
    }
}
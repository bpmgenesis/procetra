import { Control } from '@tuval/forms';
import { IDataSet } from '../../../Bussiness/IDataSet';
import { FrequencyDfgDiscovery, PerformanceDfgDiscovery } from '../../../Logic/algo/discovery/dfg/algorithm';
import { Services } from '../../../Services/Services';
import { SvgViewer } from '../../controls/SvgViewer';
import { float } from '@tuval/core';
import { DfgSliders } from '../../../Logic/objects/dfg/util/sliders';
import { FrequencyDfgGraphvizVisualizer } from '../../../Logic/visualization/dfg/frequency';
import { PerformanceDfgGraphvizVisualizer } from '../../../Logic/visualization/dfg/performance';
//import { parse } from '../../../Svg/parser/svgparser';

declare var Viz;

export class PerformanceMapControl extends SvgViewer {
    private FregMapControl() {
        this.Width = -100;
        this.Height = 700;
    }
    public SetDataSet(projectId: string, datasetId: string) {
        this.createModel(projectId, datasetId, 0.5);
        //this.slider.SlideEnd.add(() => this.createModel(projectId, datasetId, TMath.map(this.slider.Value, 0, 100, 0, 1)));
    }

    public createModel(projectId: string, datasetId: string, presicion: float = 0.5, calculationModel: string = 'mean') {
        Services.ProjectService.GetDatasetById(projectId, datasetId).then((dataset: IDataSet) => {
            let frequencyDfg = PerformanceDfgDiscovery.apply(dataset.EventLog, dataset.ActivityColumn, dataset.TimeStampColumn, calculationModel, dataset.StartDateColumn);
            frequencyDfg = DfgSliders.filterDfgOnPercActivities(frequencyDfg, presicion);
            const pathFreq = frequencyDfg['pathsFrequency'];
            const endact = frequencyDfg['endActivities'];
            const startact = frequencyDfg['startActivities'];
            const activities = frequencyDfg['activities'];

            let gv = PerformanceDfgGraphvizVisualizer.apply(frequencyDfg);
            const str = Viz(gv, { format: "svg" });
            //console.log(parse(str));
            this.SvgString = str;
        });

    }
}
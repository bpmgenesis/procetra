import { TTabPage } from '@tuval/forms';
import { IDataSet } from '../../../../Bussiness/IDataSet';
import { PerformanceDfgDiscovery } from '../../../../Logic/algo/discovery/dfg/algorithm';
import { DfgSliders } from '../../../../Logic/objects/dfg/util/sliders';
import { EventLog } from '../../../../Logic/objects/log/EventLog';
import { PerformanceDfgGraphvizVisualizer } from '../../../../Logic/visualization/dfg/performance';
import { SvgViewer } from '../../../controls/SvgViewer';

declare var Viz;

export class VariantPerfModelTabPage extends TTabPage {
    svgViewer: any;
    protected override InitComponents(): void {
        this.svgViewer = new SvgViewer();
        this.svgViewer.Width = 850;
        this.svgViewer.Height = 370;
        this.Controls.Add(this.svgViewer);
    }
    public SetVariantInfo(dataset: IDataSet, variantInfo: any) {
        const eventLog = new EventLog();
        eventLog.traces = variantInfo.traces;
        let frequencyDfg = PerformanceDfgDiscovery.apply(eventLog,
            dataset.ActivityColumn, dataset.TimeStampColumn, 'mean', dataset.StartDateColumn);
        frequencyDfg = DfgSliders.filterDfgOnPercActivities(frequencyDfg, 1);

        let gv = PerformanceDfgGraphvizVisualizer.apply(frequencyDfg);
        const svg = Viz(gv, { format: "svg" });

        setTimeout(() => {
            this.svgViewer.SvgString = svg;
        }, 100);


    }
}
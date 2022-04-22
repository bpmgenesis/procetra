import { TTabPage, Slider, LayoutPanel } from '@tuval/forms';
import { int, is, TMath } from '@tuval/core';
import { SvgViewer } from '../../../controls/SvgViewer';
import { DataSet } from '../../../../Bussiness/DataSet';
import { Tokens } from '../../../../Bussiness/Tokens';
import { CsvImporter } from '../../../../Logic/objects/log/importer/csv/importer';
import { GeneralLogStatistics } from '../../../../Logic/statistics/log/general';
import { FrequencyDfgDiscovery } from '../../../../Logic/algo/discovery/dfg/algorithm';
import { DfgSliders } from '../../../../Logic/objects/dfg/util/sliders';
import { FrequencyDfgGraphvizVisualizer } from '../../../../Logic/visualization/dfg/frequency';
import { XesImporter } from '../../../../Logic/objects/log/importer/xes/importer';
import { InductiveMiner } from '../../../../Logic/algo/discovery/inductive/algorithm';
import { ProcessTreeToPetriNetConverter } from '../../../../Logic/objects/conversion/process_tree/to_petri_net';
import { PetriNetVanillaVisualizer } from '../../../../Logic/visualization/petri_net/vanilla_graphviz';
import { PetriNetBpmnVisualizer } from '../../../../Logic/visualization/petri_net/bpmn';
import { IDataSet } from '../../../../Bussiness/IDataSet';

declare var Viz;
export class BPMNModelTabPage extends TTabPage {
    txt: Slider;
    svgViewer: any;
    dataset: IDataSet;
    public override InitComponents() {
        const layoutPanel = new LayoutPanel();
        layoutPanel.LeftSize = 200;

        this.txt = new Slider();
        this.txt.Visible = true;
        this.txt.Value = 50;
        this.txt.Value$.subscribe(x => {
            setTimeout(() => this.createModel(this.dataset), 1000);
        });

        layoutPanel.LeftControl = this.txt;

        this.svgViewer = new SvgViewer();

        layoutPanel.RightControl = this.svgViewer;
        this.Controls.Add(layoutPanel);
    }

    public SetDataset(dataset: IDataSet) {
        this.dataset = dataset;
        this.createModel(dataset);
    }
    private createModel(dataset: IDataSet) {
           const eventLog = dataset.EventLog; /* CsvImporter.apply(dataset.CsvString, dataset.Separator, '"', dataset.CaseColumn, dataset.ActivityColumn,
                dataset.TimeStampColumn, dataset.DateFormat); */

            let processTree = InductiveMiner.apply(eventLog, dataset.ActivityColumn, TMath.map(this.txt.Value, 0, 100, 0, 1));
            let acceptingPetriNet = ProcessTreeToPetriNetConverter.apply(processTree);

            let gv = PetriNetBpmnVisualizer.apply(acceptingPetriNet);
            this.svgViewer.SvgString = Viz(gv, { format: "svg" });

            /* const frequencyDfg = PerformanceDfgDiscovery.apply(eventLog, dataset.ActivityColumn, dataset.TimeStampColumn, 'mean', dataset.StartDateColumn);
            let gv = PerformanceDfgGraphvizVisualizer.apply(frequencyDfg);
            this.svgViewer.SvgString = Viz(gv, { format: "svg" }); */

            this.svgViewer.SvgString = Viz(gv, { format: "svg" });

         /* else if (is.typeof<XesDataSet>(dataset, Tokens.XesDataSet)) {
            const eventLog = XesImporter.apply(dataset.XesString);

            let processTree = InductiveMiner.apply(eventLog, 'case:concept', 0.2);
            let acceptingPetriNet = ProcessTreeToPetriNetConverter.apply(processTree);
            let gv = PetriNetBpmnVisualizer.apply(acceptingPetriNet);
            this.svgViewer.SvgString = Viz(gv, { format: "svg" });
        } */
        /*

                const stringBuilder: StringBuilder = new StringBuilder();
                let columns: string = '';
                if (this.dataset.Data && this.dataset.Data[0]) {
                    for (let key in this.dataset.Data[0]) {
                        columns += key + ',';
                    }
                    stringBuilder.AppendLine(columns.substr(0, columns.length - 1));

                    for (let i = 1; i < this.dataset.Data.length; i++) {
                        let row: string = '';
                        for (let key in this.dataset.Data[i]) {
                            row += this.dataset.Data[i][key] + ',';
                        }
                        stringBuilder.AppendLine(row.substr(0, row.length - 1));
                    }
                }
                const csv = stringBuilder.ToString(); */





        /*  console.log(GeneralLogStatistics.getEventAttributesList(eventLog));
         console.log(GeneralLogStatistics.getCaseAttributesList(eventLog));
         console.log(GeneralLogStatistics.getAverageSojournTime(eventLog, "Activity", "End Date", "Start Date"));
  */

    }
    public override OnFormResized(w: int, h: int) {
        this.svgViewer.Height = h - 220;
    }
}
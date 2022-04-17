import { Convert, float, int, TMath } from '@tuval/core';
import { Accordion, Slider, TTabPage } from '@tuval/forms';
import { IDataSet } from '../../../../Bussiness/IDataSet';
import { FrequencyDfgDiscovery } from '../../../../Logic/algo/discovery/dfg/algorithm';
import { DfgSliders } from '../../../../Logic/objects/dfg/util/sliders';
import { FrequencyDfgGraphvizVisualizer } from '../../../../Logic/visualization/dfg/frequency';
import { FlexLayout } from '../../../controls/layout/FlexLayout';
import { JustifyContents } from '../../../controls/layout/JustifyContents';
import { SvgViewer } from '../../../controls/SvgViewer';

declare var Viz;
export class ResourceFreqModelTabPage extends TTabPage {
    txt: Slider;
    svgViewer: any;
    dataset: IDataSet;
    public override InitComponents() {

        const layoutPanel = new FlexLayout();

        const accordion = new Accordion();
        accordion.Width = 200;

        this.svgViewer = new SvgViewer();


        const flexItem = layoutPanel.AddFlexItem(this.svgViewer);
        flexItem.Shrink = true;
        flexItem.Grow = true;
        flexItem.JustifyContent = JustifyContents.Center;

        flexItem.ResizeEvent.add((size) => {
            this.svgViewer.Width = Convert.ToInt32(size.width) - 10;
        });

        this.txt = new Slider();
        this.txt.Visible = true;
        this.txt.Value = 50;
        this.txt.SlideEnd.add(() => this.createModel(this.dataset, TMath.map(this.txt.Value, 0, 100, 0, 1)));

        const tab1 = accordion.Tabs.Add('Activities');
        tab1.Controls.Add(this.txt);

        accordion.ActiveIndexes = [0, 1];
        layoutPanel.AddFlexItem(accordion);

        this.Controls.Add(layoutPanel);

    }

    public SetDataset(dataset: IDataSet) {
        try {
            this.dataset = dataset;
            this.createModel(dataset, 0.5);
        }catch(e) {
            alert(e.toString())
        }
    }
    private createModel(dataset: IDataSet, perc: float) {

        /*  const eventLog = CsvImporter.apply(dataset.CsvString, dataset.Separator, '"', dataset.CaseColumn, dataset.ActivityColumn,
             dataset.TimeStampColumn, dataset.DateFormat); */

        let frequencyDfg = FrequencyDfgDiscovery.apply(dataset.EventLog, 'org:resource' /* dataset.ActivityColumn *//*  "concept:name" */);
        frequencyDfg = DfgSliders.filterDfgOnPercActivities(frequencyDfg, perc);
        const pathFreq = frequencyDfg['pathsFrequency'];
        const endact = frequencyDfg['endActivities'];
        const startact = frequencyDfg['startActivities'];
        const activities = frequencyDfg['activities'];


        let gv = FrequencyDfgGraphvizVisualizer.apply(frequencyDfg);
        this.svgViewer.SvgString = Viz(gv, { format: "svg" });

        /*   let processTree = InductiveMiner.apply(eventLog, dataset.ActivityColumn, 0.2);
          let acceptingPetriNet = ProcessTreeToPetriNetConverter.apply(processTree);

         let gv = ProcessTreeVanillaVisualizer.apply(processTree);
          this.svgViewer.SvgString = Viz(gv, { format: "svg" }); */

        /* const frequencyDfg = PerformanceDfgDiscovery.apply(eventLog, dataset.ActivityColumn, dataset.TimeStampColumn, 'mean', dataset.StartDateColumn);
        let gv = PerformanceDfgGraphvizVisualizer.apply(frequencyDfg);
        this.svgViewer.SvgString = Viz(gv, { format: "svg" }); */

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
        if (this.svgViewer) {
            this.svgViewer.Height = h - 220;
        }
    }
}
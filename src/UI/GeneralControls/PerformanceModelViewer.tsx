import { TTabPage, Panel, Control, Property, Teact } from '@tuval/forms';
import { IDataSet } from '../../Bussiness/IDataSet';
import { PerformanceDfgDiscovery } from '../../Logic/algo/discovery/dfg/algorithm';
import { DfgSliders } from '../../Logic/objects/dfg/util/sliders';
import { EventLog } from '../../Logic/objects/log/EventLog';
import { PerformanceDfgGraphvizVisualizer } from '../../Logic/visualization/dfg/performance';
import { SvgViewer } from '../controls/SvgViewer';

declare var Viz;

export class PerformanceModelViewer extends Control<PerformanceModelViewer> {

  @Property()
  private svg: string;

  @Property()
  private svgViewer: SvgViewer;

  public override SetupControlDefaults(): void {
    super.SetupControlDefaults();
    this.svgViewer = new SvgViewer();
    this.svgViewer.Width = -100;
    this.svgViewer.Height = -100;
    //this.Controls.Add(this.svgViewer);
  }
  public SetVariantInfo(dataset: IDataSet, variantInfo: any) {
    console.log(variantInfo);
    const eventLog = new EventLog();
    eventLog.traces = variantInfo.traces;
    let frequencyDfg = PerformanceDfgDiscovery.apply(eventLog,
      dataset.ActivityColumn, dataset.TimeStampColumn, 'mean', dataset.StartDateColumn);
    frequencyDfg = DfgSliders.filterDfgOnPercActivities(frequencyDfg, 1);

    let gv = PerformanceDfgGraphvizVisualizer.apply(frequencyDfg);
    const svg = Viz(gv, { format: "svg" });

    this.svgViewer.SvgString = svg;
    this.svg = svg;
  }
  public override CreateElements(): any {
    return (
      <div style='width:100%;height:100%;'>
        {(this.svgViewer as any).CreateMainElement()}
      </div>
    );
  }
}
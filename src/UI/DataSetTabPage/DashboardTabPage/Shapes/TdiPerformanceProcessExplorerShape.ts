import { TuDashboardShape } from "../TuDashboardShape";
import { Control, State } from '@tuval/forms';
import { ClassInfo, typeOf } from '@tuval/core';
import {CGRectangle} from '@tuval/cg'
;
import { _Types } from '../../../../__manifest__/__types__';
import { MeanChart } from "../../StatisticTabPage/ActivityOverview/Charts/MeanChart";
import { MedianChart } from "../../StatisticTabPage/ActivityOverview/Charts/MedianChart";
import { PreviewControl } from "../PreviewControl";
import { FregMapControl } from "../../../Components/FregMapControl/FregMapControl";
import { PerformanceMapControl } from "../../../Components/PerformanceMapControl/PerformanceMapControl";

 @ClassInfo({
    fullName: _Types.TdiPerformanceProcessExplorerShape,
    name: 'TdiPerformanceProcessExplorerShape',
    instanceof: [_Types.TdiPerformanceProcessExplorerShape]
})
export class TdiPerformanceProcessExplorerShape extends TuDashboardShape {

    @State()
    private freqModel: PerformanceMapControl;

    private TdiPerformanceProcessExplorerShape() {
        this.Width = 400;
        this.Height = 250;
    }

    public SetDataSet(projectId: string, datasetId: string) {
        this.freqModel.SetDataSet(projectId, datasetId);
        this.renderedNode = this.Control.CreateMainElement();
    }
    public GetControl(): Control<any> {
        this.freqModel = new PerformanceMapControl();
        return this.freqModel;
    }

    public GetPreviewControl(): PreviewControl {
        const previewControl = new PreviewControl();
        previewControl.Title = 'Process Performance Explorer';
        previewControl.SubTitle = 'You have no data yet';
        previewControl.ClassName = 'icon-list-palette-process-explorer placeholder-icon';
        return previewControl;
    }
    protected override  OnBoundsChanged(old: CGRectangle): void {
        super.OnBoundsChanged(old);
        this.freqModel.FitToViewer();
    }
}
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

 @ClassInfo({
    fullName: _Types.TdiFregProcessExplorerShape,
    name: 'TdiActivityMeanDurationChart',
    instanceof: [_Types.TdiFregProcessExplorerShape]
})
export class TdiFregProcessExplorerShape extends TuDashboardShape {

    @State()
    private freqModel: FregMapControl;

    private TdiFregProcessExplorerShape() {

    }

    public SetDataSet(projectId: string, datasetId: string) {
        //alert(projectId + ';' + datasetId);
        this.freqModel.SetDataSet(projectId, datasetId);
        this.renderedNode = this.Control.CreateMainElement();
    }
    public GetControl(): Control<any> {
        this.freqModel = new FregMapControl();
       /*  chart.Height = -90; //%
        chart.Title = 'Activity Median Duration'; */
        return this.freqModel;
    }

    public GetPreviewControl(): PreviewControl {
        const previewControl = new PreviewControl();
        previewControl.Title = 'Process Frequency Explorer';
        previewControl.SubTitle = 'You have no data yet';
        previewControl.ClassName = 'icon-list-palette-process-explorer placeholder-icon';
        return previewControl;
    }
    protected override  OnBoundsChanged(old: CGRectangle): void {
        super.OnBoundsChanged(old);
        this.freqModel.FitToViewer();
    }
}
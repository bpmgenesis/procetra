import { TuDashboardShape } from "../TuDashboardShape";
import { Control, State } from '@tuval/forms';
import { ClassInfo, typeOf } from '@tuval/core';
import { _Types } from '../../../../__manifest__/__types__';
import { MeanChart } from "../../StatisticTabPage/ActivityOverview/Charts/MeanChart";
import { MedianChart } from "../../StatisticTabPage/ActivityOverview/Charts/MedianChart";
import { PreviewControl } from "../PreviewControl";

 @ClassInfo({
    fullName: _Types.TdiActivityMedianDurationChart,
    name: 'TdiActivityMeanDurationChart',
    instanceof: [_Types.TdiActivityMedianDurationChart]
})
export class TdiActivityMedianDurationChart extends TuDashboardShape {

    private TdiActivityMedianDurationChart() {

    }
    public GetControl(): Control<any> {
        const chart = new MedianChart();
        chart.Height = -90; //%
        chart.Title = 'Activity Median Duration';
        return chart;
    }

    public GetPreviewControl(): PreviewControl {
        const previewControl = new PreviewControl();
        previewControl.Title = 'Activity Median Chart';
        previewControl.SubTitle = 'You have no data yet';
        previewControl.ClassName = 'icon-list-palette-line-chart rotate-270 placeholder-icon';
        return previewControl;
    }
}
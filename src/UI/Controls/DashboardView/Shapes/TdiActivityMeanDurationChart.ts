import { TuDashboardShape } from "../TuDashboardShape";
import { Control, State } from '@tuval/forms';
import { ClassInfo, typeOf } from '@tuval/core';
import { _Types } from '../../../../__manifest__/__types__';


 @ClassInfo({
    fullName: _Types.TdiActivityMeanDurationChart,
    name: 'TdiActivityMeanDurationChart',
    instanceof: [_Types.TdiActivityMeanDurationChart]
})
export class TdiActivityMeanDurationChart extends TuDashboardShape {

    private TdiActivityMeanDurationChart() {

    }
    public GetControl(): Control<any> {
       /*  const chart = new MeanChart();
        chart.Height = -90; //%
        chart.Title = 'Activity Mean Duration';
        return chart; */
        return null;
    }
}
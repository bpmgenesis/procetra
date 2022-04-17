import { TuDashboardShape } from "../TuDashboardShape";
import { Control, State } from '@tuval/forms';
import { ClassInfo, typeOf } from '@tuval/core';
import { CGRectangle, CGColor } from '@tuval/cg';
;
import { _Types } from '../../../../__manifest__/__types__';
import { MeanChart } from "../../StatisticTabPage/ActivityOverview/Charts/MeanChart";
import { MedianChart } from "../../StatisticTabPage/ActivityOverview/Charts/MedianChart";
import { PreviewControl } from "../PreviewControl";
import { FregMapControl } from "../../../Components/FregMapControl/FregMapControl";
import { SliderFilter } from '../../../Components/ActivitySliderFilter/ActivitySliderFilter';
import { TSpreadsheet } from '@tuval/components/spreadsheet';

@ClassInfo({
    fullName: _Types.TdiActivitySlider,
    name: 'TdiActivitySlider',
    instanceof: [_Types.TdiActivitySlider]
})
export class TdiActivitySlider extends TuDashboardShape {

    @State()
    private sliderControl: TSpreadsheet;

    private TdiActivitySlider() {
        this.Width = 220;
        this.Height = 350;
        this.BrushColor = CGColor.FromRgba(0xf1, 0xf1, 0xf1);
        this.renderedNode = this.Control.CreateMainElement();
    }

    public SetDataSet(projectId: string, datasetId: string) {

    }
    public GetControl(): Control<any> {
        this.sliderControl = new TSpreadsheet();
        this.sliderControl.Height = 100;
        return this.sliderControl;
    }

    public GetPreviewControl(): PreviewControl {
        const previewControl = new PreviewControl();
        previewControl.Title = 'Activity Filter';
        previewControl.SubTitle = 'You have no data yet';
        previewControl.ClassName = 'icon-list-palette-process-explorer placeholder-icon';
        return previewControl;
    }


}
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
import { ConnectionSliderControl } from '../../../Components/ActivitySliderFilter/ConnectionSliderControl';

@ClassInfo({
    fullName: _Types.TdiConnectionSlider,
    name: 'TdiConnectionSlider',
    instanceof: [_Types.TdiConnectionSlider]
})
export class TdiConnectionSlider extends TuDashboardShape {

    @State()
    private sliderControl: ConnectionSliderControl;

    private TdiConnectionSlider() {
        this.Width = 220;
        this.Height = 350;
        this.BrushColor = CGColor.FromRgba(0xf1, 0xf1, 0xf1);
        this.renderedNode = this.Control.CreateMainElement();
    }

    public SetDataSet(projectId: string, datasetId: string) {

    }
    public GetControl(): Control<any> {
        this.sliderControl = new ConnectionSliderControl();
        this.sliderControl._Height = '100%';
        return this.sliderControl;
    }

    public GetPreviewControl(): PreviewControl {
        const previewControl = new PreviewControl();
        previewControl.Title = 'Connection Filter';
        previewControl.SubTitle = 'You have no data yet';
        previewControl.ClassName = 'icon-list-palette-process-explorer placeholder-icon';
        return previewControl;
    }

}
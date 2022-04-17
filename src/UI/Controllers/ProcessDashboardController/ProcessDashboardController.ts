import { TuRectangle } from './../../../Svg/TuRectangle/TuRectangle';
import { Pens, Brushes } from '@tuval/graphics';
import {
    UIController, UIView, Text, UIScene, VStack,
    HStack, Icon, Spacer, ForEach, UIButton, Alignment, HDivider, State, TwoColumnLayout2
} from '@tuval/forms';
import { ViewRenderingMode } from '../../../Svg/TuView/ViewRenderingMode';
import { DashboardView } from '../../DataSetTabPage/DashboardTabPage/DashboardView';
import { CGSize } from '@tuval/cg';
import { TuViewSnapStyle } from '../../../Svg/TuView/TuViewSnapStyle';
import { TuViewGridStyle } from '../../../Svg/TuGrid/TuViewGridStyle';
import { PaletteView } from './Views/PaletteView';
import { MIPaletteCategory } from './Models/MIPaletteCategory';
import { PaletteModel } from './Models/MDPalette';
import { PageTitle } from '../../Views/PageHeader';
export class ProcessDashboardController extends UIController {

    private palettedata: MIPaletteCategory[];
    @State()
    private svg: DashboardView;

    protected InitController(): void {

        this.svg = new DashboardView();
        /*  svg.pId = dataset.ProjectId;
         svg.dId = dataset.Id; */
        this.svg.beginUpdate();
        this.svg.RenderingMode = ViewRenderingMode.Html;
        this.svg.ResizeHandleSize = new CGSize(10, 10);
        this.svg.Width = 1800;
        this.svg.Height = 1500;
        this.svg.GridCellSize = new CGSize(20, 20);
        this.svg.GridLineWidth = 1;
        this.svg.GridMajorLineWidth = 1;
        this.svg.GridSnapDrag = TuViewSnapStyle.Jump;
        this.svg.GridSnapResize = TuViewSnapStyle.Jump;
        this.svg.GridStyle = TuViewGridStyle.Line;
        this.svg.GridMajorLineColor = this.svg.GridLineColor.clone();

        const rect = new TuRectangle();
        rect.Left = 50;
        rect.Top = 50;
        rect.Width = 150;
        rect.Height = 105;
        rect.Pen = Pens.Black;
        rect.Brush = Brushes.White;

        this.svg.Document.Add(rect);

        this.palettedata = PaletteModel;
    }

    public LoadView(): UIView {
        return (
            UIScene(
                VStack(
                    HStack(
                        PageTitle('\\f0b3','Dashboard'),
                        Spacer(),
                        HStack(
                            ...ForEach(['Overview', 'Throughput times', 'Activities'], (name) =>
                                UIButton(
                                    Text(name)
                                ).border('solid 1px gray').cornerRadius('10px').padding('3px 10px 3px 10px')
                            )
                        ).width('auto').spacing('5px')
                    ).alignment(Alignment.topLeading).spacing('10px').height()/* .height('20px') */,
                    HDivider().height('1px').backgroundColor('rgb(120,120,120,20%)'),
                    TwoColumnLayout2(
                        {
                            left: [
                                VStack(
                                    VStack(
                                        this.svg as any
                                    ).position('absolute').alignment(Alignment.topLeading)
                                ).overflowX('auto').overflowY('auto').alignment(Alignment.topLeading)

                            ],
                            right: [
                                PaletteView(this.palettedata)
                            ]
                        }
                    )

                ).padding('10px').alignment(Alignment.topLeading).spacing('10px')
            ).alignment(Alignment.topLeading)
        )
    }
}
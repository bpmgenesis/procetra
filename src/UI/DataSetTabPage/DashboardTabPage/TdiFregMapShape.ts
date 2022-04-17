import { _Types } from "../../../__manifest__/__types__";
import { ClassInfo, as } from '@tuval/core';
import { TuRectangle } from "../../../Svg/TuRectangle/TuRectangle";
import { State, DropArea, DropEventArgs } from '@tuval/forms';
import { FregMapControl } from "../../Components/FregMapControl/FregMapControl";
import { CGColor, CGRectangle } from '@tuval/cg';
import { TuHtmlRenderer } from "../../../Svg/Xml/TuHtmlRenderer";
import { TuView } from "../../../Svg/TuView/TuView";
import { GraphicTypes, SolidBrush } from '@tuval/graphics';


@ClassInfo({
    fullName: _Types.TdiFregMapShape,
    name: 'TuObject',
    instanceof: [_Types.TdiFregMapShape]
})
export class TdiFregMapShape extends TuRectangle {
    @State()
    freqModel: FregMapControl;

    @State()
    public renderedNode: any;

    @State()
    public dropTarget: DropArea;

    private TdiFregMapShape(): void {
        this.dropTarget = new DropArea();
        this.dropTarget.Text = 'Drop Dataset Here';
        this.dropTarget.Drop.add(((e: DropEventArgs) => {
            debugger;
            const [projectId, datasetId] = e.nativeEvent.dataTransfer.getData('text').split(';');
            this.SetDataSet(projectId, datasetId);
        }));

        this.freqModel = new FregMapControl();
        this.BrushColor = CGColor.White;
        this.HtmlRenderer = new class extends TuHtmlRenderer<TdiFregMapShape> {
            public DecideCache(view: TuView, obj: TdiFregMapShape): void {

            }
            public GenerateElement(view: TuView, obj: TdiFregMapShape): boolean {
                this.WriteStartElement('TdiFregMapShape');
                return true;
            }
            public GenerateAttributes(view: TuView, obj: TdiFregMapShape): void {

            }
            public GenerateBody(view: TuView, rectangleObject: TdiFregMapShape): void {
                const bounds: CGRectangle = rectangleObject.Bounds;

                let fillColor: string = 'transparent';

                if (rectangleObject.Brush != null) {
                    const brush: SolidBrush = as(rectangleObject.Brush, GraphicTypes.SolidBrush);
                    if (brush != null) {
                        fillColor = brush.Color.toString('#rrggbb');
                    }
                }

                const pen = rectangleObject.Pen;
                let strokeColor = 'transparent';
                let strokeWidth = 0;
                if (rectangleObject.Pen != null) {
                    strokeColor = pen.Color.toString('#rrggbb');
                    strokeWidth = pen.Width;
                }

                this.WriteStartElement('div');
                const style = {};
                this.WriteStyleAttrVal('position', 'absolute');
                this.WriteStyleAttrVal('left', bounds.X + 'px');
                this.WriteStyleAttrVal('top', bounds.Y + 'px');
                this.WriteStyleAttrVal('width', bounds.Width + 'px');
                this.WriteStyleAttrVal('height', bounds.Height + 'px');
                this.WriteStyleAttrVal('padding', '20px');
                this.WriteStyleAttrVal('backgroundColor', fillColor);
                /*   style['borderColor'] = strokeColor;
                  style['borderWidth'] = strokeWidth;
                  style['borderStyle'] = 'solid'; */
                this.WriteStyleAttrVal('overflow', 'hidden');
                this.WriteStyleAttrVal('box-shadow', 'rgb(0 0 0 / 12%) 0px 1px 1px, rgb(0 0 0 / 12%) 0px 2px 2px, rgb(0 0 0 / 12%) 0px 4px 4px, rgb(0 0 0 / 12%) 0px 8px 8px, rgb(0 0 0 / 12%) 0px 16px 16px');

                this.WriteStyleAttrVal('border-radius', '20px');
                this.WriteStyleAttrVal('outline', 'none medium');
                //style['box-shadow'] = '0 0 6px #8dc4ff!important';
                this.WriteStyleAttrVal('border', '1px solid #3c9df7!important');


                if (rectangleObject.renderedNode == null) {
                    this.writeDropTarget(rectangleObject);
                } else {
                    this.WriteComponent(rectangleObject.renderedNode);
                    this.writeMask(rectangleObject.Bounds);
                }
                this.WriteEndElement();
            }

            private writeDropTarget(rectangleObject: TdiFregMapShape) {
                this.WriteControl(rectangleObject.dropTarget);
            }

            private writeMask(bounds: CGRectangle) {
                this.WriteStartElement('div');
                this.WriteStyleAttrVal('position', 'absolute');
                this.WriteStyleAttrVal('left', '0px');
                this.WriteStyleAttrVal('top', '0px');
                this.WriteStyleAttrVal('width', bounds.Width + 'px');
                this.WriteStyleAttrVal('height', bounds.Height + 'px');
                this.WriteStyleAttrVal('backgroundColor', 'transparent');
                this.WriteStyleAttrVal('borderColor', 'transparent');
                this.WriteStyleAttrVal('borderWidth', 0);
                this.WriteEndElement();
            }
            public GenerateElementFinish(view: TuView, obj: TdiFregMapShape): void {
                this.WriteEndElement();
            }

        }();

    }
    /* public CreateElements(param: any) {
        const view: TuView = param;
        const result = [];
        if (view.RenderingMode === ViewRenderingMode.Html) {
            TuDashboardShapeHtmlRenderer.Apply(result, this);
        }
        return result;
    } */

    public SetDataSet(projectId: string, datasetId: string) {
        this.freqModel.SetDataSet(projectId, datasetId);
        this.renderedNode = this.freqModel.CreateMainElement();

    }

    /*    protected  override  OnBoundsChanged(old: CGRectangle): void {

           if (this.Width !== old.Width || this.Height !== old.Height) {
               console.log('New width: ', this.Width, ' Old Width : ', old.Width);
               console.log('New X: ', this.Left, ' Old C : ', old.X);

               this.button.Width = this.Width - 40;
               this.button.Height = this.Height - 40;
           }
       } */

    /*    public override OnDoubleClick(evt: TuInputEventArgs, view: TuView): boolean {
           this.dialog.ShowDialog();
           return false;
       } */

}
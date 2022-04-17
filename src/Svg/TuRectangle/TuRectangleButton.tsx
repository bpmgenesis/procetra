import { ClassInfo, as, is } from '@tuval/core';
import { TuShape } from '../TuShape/TuShape';
import { Graphics, Brush, Pen, GraphicTypes, SolidBrush } from '@tuval/graphics';
import { Teact, Button, State } from '@tuval/forms';
import { TuView } from '../TuView/TuView';
import { CGSize, CGRectangle } from '@tuval/cg';
import { Types } from '../types';
import { TuRectangleSvgRenderer } from './TuRectangleSvgRenderer';
import { TuLayer } from '../TuLayer/TuLayer';
import { ITuLayerCollectionContainer } from '../TuLayer/ITuLayerCollectionContainer';
import { ViewRenderingMode } from '../TuView/ViewRenderingMode';
import { TuRectangleHtmlRenderer } from './TuRectangleHtmlRenderer';
import { TuRectangleButtonHtmlRenderer } from './TuRectangleButtonHtmlRenderer';
import { TuRectangle } from './TuRectangle';
import { TuShapeSvgRenderer } from '../Xml/TuShapeSvgRenderer';


@ClassInfo({
    fullName: Types.TuRectangle,
    instanceof: [
        Types.TuRectangle
    ]
})
export class TuRectangleButton extends TuRectangle {

    @State()
    public button: Button;
    protected SetupControlDefaults(): void {
        super.SetupControlDefaults();
        this.button = new Button();
        this.button.Text = 'Set Width';
        this.button.Color = 1;
    }
    public CreateElements(param: any) {
        const view: TuView = param;
        const result = [];
        if (view.RenderingMode === ViewRenderingMode.Svg) {
            TuRectangleSvgRenderer.Apply(result, this);
        } else if (view.RenderingMode === ViewRenderingMode.Html) {
            TuRectangleButtonHtmlRenderer.Apply(result, this);
        }


        /* const bounds: CGRectangle = this.Bounds;

        let fillColor: string = 'transparent';

        if (this.Brush != null) {
            const brush: SolidBrush = as(this.Brush, GraphicTypes.SolidBrush);
            if (brush != null) {
                fillColor = brush.Color.toString('#rrggbb');
            }
        }

        const pen = this.Pen;
        let strokeColor = 'transparent';
        let strokeWidth = 0;
        if (this.Pen != null) {
            strokeColor = pen.Color.toString('#rrggbb');
            strokeWidth = pen.Width;
        }

        return (
            <rect
                x={bounds.X}
                y={bounds.Y}
                rx={0}
                ry={0}
                width={bounds.Width}
                height={bounds.Height}
                stroke={strokeColor}
                stroke-width={strokeWidth}
                fill={fillColor}>
            </rect>
        ); */

        return result;
    }
    public /* override */ Paint(g: Graphics, view: TuView): void {
        const brush: Brush = this.Brush;
        const bounds: CGRectangle = this.Bounds;
        if (this.Shadowed) {
            const shadowOffset: CGSize = this.GetShadowOffset(view);
            if (brush != null) {
                const shadowBrush: Brush = this.GetShadowBrush(view);
                TuShape.DrawRectangle(g, view, undefined, shadowBrush, bounds.X + shadowOffset.Width, bounds.Y + shadowOffset.Height, bounds.Width, bounds.Height);
            }
            else if (this.Pen != null) {
                const shadowPen: Pen = this.GetShadowPen(view, this.PenWidth);
                TuShape.DrawRectangle(g, view, shadowPen, null, bounds.X + shadowOffset.Width, bounds.Y + shadowOffset.Height, bounds.Width, bounds.Height);
            }
        }
        TuShape.DrawRectangle(g, view, this.Pen, brush, bounds.X, bounds.Y, bounds.Width, bounds.Height);


        /*   const ctx: CanvasRenderingContext2D = (<any>g.context).canvasContext;
          ctx.beginPath();
          (<any>ctx).lineWidth = "5";
          ctx.strokeStyle = "green"; // Green path
          ctx.moveTo(this.Bounds.X, this.Bounds.Y);
          ctx.lineTo(100, 100);
          ctx.stroke(); // Draw it

          ctx.beginPath();
          ctx.strokeStyle = "purple"; // Purple path
          ctx.moveTo(this.Bounds.X + 10, this.Bounds.Y +10);
          ctx.lineTo(90, 90);
          ctx.stroke(); // Draw it */
    }
}
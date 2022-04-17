import { ClassInfo, as, is } from '@tuval/core';
import { TuShape } from '../TuShape/TuShape';
import { Graphics, Brush, Pen, GraphicTypes, SolidBrush } from '@tuval/graphics';
import { Teact } from '@tuval/forms';
import { TuView } from '../TuView/TuView';
import { CGSize, CGRectangle } from '@tuval/cg';
import { Types } from '../types';
import { TuRectangleSvgRenderer } from './TuRectangleSvgRenderer';
import { TuLayer } from '../TuLayer/TuLayer';
import { ITuLayerCollectionContainer } from '../TuLayer/ITuLayerCollectionContainer';
import { ViewRenderingMode } from '../TuView/ViewRenderingMode';
import { TuRectangleHtmlRenderer } from './TuRectangleHtmlRenderer';
import { TuShapeSvgRenderer } from '../Xml/TuShapeSvgRenderer';


@ClassInfo({
    fullName: Types.TuRectangle,
    instanceof: [
        Types.TuRectangle
    ]
})
export class TuRectangle extends TuShape {
   /*   public CreateElements(param: any) {
        const view: TuView = param;
        const result = [];
        if (view.RenderingMode === ViewRenderingMode.Svg) {
            //TuRectangleSvgRenderer.Apply(result, this);

            const renderer = new TuShapeSvgRenderer();
            renderer.Render(result,view, this);

        } else if (view.RenderingMode === ViewRenderingMode.Html) {
            TuRectangleHtmlRenderer.Apply(result, this);
        }




        return result;
    } */
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
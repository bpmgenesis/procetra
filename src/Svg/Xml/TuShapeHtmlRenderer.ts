import { TuShape } from '../TuShape/TuShape';
import { TuSvgRenderer } from './TuSvgRenderer';
import { typeOf, as } from '@tuval/core';
import { Types } from '../types';
import { GraphicsPath, Brush, Pen } from '@tuval/graphics';
import { TuView } from '../TuView/TuView';
import { CGSize } from '@tuval/cg';
import { TuRoundedRectangle } from '../TuRoundedRectangle/TuRoundedRectangle';
import { TuHtmlRenderer } from './TuHtmlRenderer';

export class TuShapeHtmlRenderer extends TuHtmlRenderer<TuShape> {
    public DecideCache(): void {
        this.InvalidateCache();
    }
    public override  GenerateElement(view: TuView, obj: TuShape): boolean {
        return true;
    }
    public GenerateAttributes(view: TuView, obj: TuShape): void {

    }
    public GenerateElementFinish(view: TuView, obj: TuShape): void {

    }

    public override  GenerateBody(view: TuView, obj: TuShape): void {
        // super.GenerateBody(obj);
        const goShape: TuShape = obj;
        const graphicsPath: GraphicsPath = goShape.makePath();
        if (graphicsPath == null || graphicsPath.PointCount <= 0) {
            return;
        }
        const str: string = this.TranslateGraphicsPath(graphicsPath);
        let shadowBrush: Brush = null;
        let shadowPen: Pen = null;
        if (goShape.Shadowed && this.View != null) {
            const shadowOffset: CGSize = goShape.GetShadowOffset(this.View);
            this.WriteStartElement("div");
            const strArrays: any[] = ["translate(", shadowOffset.Width, ",", shadowOffset.Height, ")"];
            this.WriteStyleAttrVal("transform", strArrays.join(''));
            if (goShape.Brush != null || goShape.Pen == null) {
                shadowBrush = goShape.GetShadowBrush(this.View);
            }
            else {
                shadowPen = goShape.GetShadowPen(this.View, goShape.PenWidth);
            }
            if (goShape.GetType() === typeOf(Types.TuRoundedRectangle)) {
                const goRoundedRectangle: TuRoundedRectangle = as(goShape, Types.TuRoundedRectangle);
                const corner: CGSize = goRoundedRectangle.Corner;
                if (goRoundedRectangle.RoundedCornerSpots !== 30 as any) {
                    this.WritePath(shadowPen, shadowBrush, str);
                }
                else {
                    this.WriteRectangle(shadowPen, shadowBrush, goShape.Bounds, corner);
                }
            }
            else if (goShape.GetType() === typeOf(Types.TuRectangle)) {
                this.WriteRectangle(shadowPen, shadowBrush, goShape.Bounds, new CGSize(0, 0));
            }
            else if (goShape.GetType() !== typeOf(Types.TuEllipse)) {
                this.WritePath(shadowPen, shadowBrush, str);
            }
            else {
                this.WriteEllipse(shadowPen, shadowBrush, goShape.Bounds);
            }
            super.WriteEndElement();
        }
        shadowBrush = goShape.Brush;
        shadowPen = goShape.Pen;
        if (goShape.GetType() !== typeOf(Types.TuRoundedRectangle)) {
            if (goShape.GetType() === typeOf(Types.TuRectangle)) {
                this.WriteRectangle(shadowPen, shadowBrush, goShape.Bounds, new CGSize(0, 0));
                return;
            }
            if (goShape.GetType() !== typeOf(Types.TuEllipse)) {
                this.WritePath(shadowPen, shadowBrush, str);
                return;
            }
            this.WriteEllipse(shadowPen, shadowBrush, goShape.Bounds);
            return;
        }
        const goRoundedRectangle1: TuRoundedRectangle = goShape as TuRoundedRectangle;
        const sizeF: CGSize = goRoundedRectangle1.Corner;
        if (goRoundedRectangle1.RoundedCornerSpots !== 30 as any) {
            this.WritePath(shadowPen, shadowBrush, str);
            return;
        }
        this.WriteRectangle(shadowPen, shadowBrush, goShape.Bounds, sizeF);
    }

    /* public override void GenerateDefinitions(object obj)
    {
        base.GenerateDefinitions(obj);
        GoShape goShape = (GoShape)obj;
        Brush brush = goShape.Brush;
        if (brush != null)
        {
            base.Writer.DefineObject(brush);
        }
        Pen pen = goShape.Pen;
        if (pen != null && pen.Color != Color.Empty)
        {
            base.Writer.DefineObject(pen);
        }
    } */
}
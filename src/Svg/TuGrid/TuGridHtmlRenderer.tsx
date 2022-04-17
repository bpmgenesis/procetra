import { TuView } from "../TuView/TuView";
import { TuGrid } from "./TuGrid";
import { CGRectangle, CGSize, CGPoint, CGColor } from '@tuval/cg';
import { Brush, Region, SolidBrush, Pen, DashStyle } from '@tuval/graphics';
import { float, TArray } from '@tuval/core';
import { Teact } from '@tuval/forms';
import { TuShape } from "../TuShape/TuShape";
import { GeomUtilities } from "../GeomUtilities";
import { TuViewGridStyle } from "./TuViewGridStyle";

export class TuGridHtmlRenderer {

    private static drawGridLines(result: any[],grid:TuGrid, view: TuView, clipRect: CGRectangle) {

        let origin: CGPoint;
        const width: float = grid.CellSize.Width;
        const height: float = grid.CellSize.Height;
        const lineColor: CGColor = grid.LineColor;
        const majorLineColor: CGColor = grid.MajorLineColor;
        const pen: Pen = new Pen(lineColor, grid.LineWidth);
        if (grid.LineDashStyle === DashStyle.Custom) {
            pen.DashPattern = grid.LineDashPattern;
        }
        pen.DashStyle = grid.LineDashStyle;
        const majorLineDashPattern: Pen = new Pen(majorLineColor, grid.MajorLineWidth);
        if (grid.MajorLineDashStyle === DashStyle.Custom) {
            majorLineDashPattern.DashPattern = grid.MajorLineDashPattern;
        }
        majorLineDashPattern.DashStyle = grid.MajorLineDashStyle;
        if (pen.DashStyle !== DashStyle.Solid || majorLineDashPattern.DashStyle !== DashStyle.Solid) {
            clipRect = GeomUtilities.UnionRect(clipRect, view.DocPosition);
        }
        const x: float = clipRect.X - width;
        const y: float = clipRect.Y - height;
        const single: float = clipRect.X + clipRect.Width + width;
        const y1: float = clipRect.Y + clipRect.Height + height;
        const pointF: CGPoint = (grid as any).findNearestInfiniteGridPoint(new CGPoint(x, y), 0, 0);
        const pointF1: CGPoint = (grid as any).findNearestInfiniteGridPoint(new CGPoint(single, y1), 0, 0);
        if (grid.Style !== TuViewGridStyle.HorizontalLine) {
            const int32 = grid.MajorLineFrequency.Width;
            if (int32 > 0) {
                const x1: float = pointF.X;
                origin = grid.Origin;
                let int321: number = (Math.floor(((x1 - origin.X) / width))) % int32;
                if (int321 < 0) {
                    int321 = int321 + int32;
                }
                for (let i = pointF.X; i < pointF1.X; i = i + width) {
                    let pen1: Pen = pen;
                    if (int321 === 0) {
                        pen1 = majorLineDashPattern;
                    }

                    if (view.DocScale > (grid as any).myPaintMinorScale || int321 == 0) {
                        TuShape.DrawHtmlLine(result, view, pen1, i, pointF.Y, i, pointF1.Y);
                    }
                    int321++;
                    if (int321 >= int32) {
                        int321 = 0;
                    }
                }
            }
            else if (view.DocScale > (grid as any).myPaintMinorScale) {
                for (let j = pointF.X; j < pointF1.X; j = j + width) {
                    TuShape.DrawHtmlLine(result, view, pen, j, pointF.Y, j, pointF1.Y);
                }
            }
        }
        if (grid.Style !== TuViewGridStyle.VerticalLine) {
            const height1: number = grid.MajorLineFrequency.Height;
            if (height1 > 0) {
                const single1: float = pointF.Y;
                origin = grid.Origin;
                let int322: number = (Math.floor(((single1 - origin.Y) / height))) % height1;
                if (int322 < 0) {
                    int322 = int322 + height1;
                }
                for (let k = pointF.Y; k < pointF1.Y; k = k + height) {
                    let pen2: Pen = pen;
                    if (int322 === 0) {
                        pen2 = majorLineDashPattern;
                    }
                    if (view.DocScale > (grid as any).myPaintMinorScale || int322 == 0) {
                        TuShape.DrawHtmlLine(result, view, pen2, pointF.X, k, pointF1.X, k);
                    }
                    int322++;
                    if (int322 >= height1) {
                        int322 = 0;
                    }
                }
            }
            else if (view.DocScale > (grid as any).myPaintMinorScale) {
                for (let l = pointF.Y; l < pointF1.Y; l = l + height) {
                    TuShape.DrawHtmlLine(result, view, pen, pointF.X, l, pointF1.X, l);
                }
            }
        }
        pen.Dispose();
        majorLineDashPattern.Dispose();

    }

    private static fillGrid(result: any[],grid: TuGrid, view: TuView, clipRect: CGRectangle): void {
        const cellColors: CGColor[][] = grid.CellColors;
        const upperBound: number = TArray.GetUpperBound(cellColors, 0) + 1;
        const int32: number = TArray.GetUpperBound(cellColors, 1) + 1;
        if (upperBound > 0 && int32 > 0 && (upperBound !== 1 || int32 !== 1 || !cellColors[0][0].Equals(CGColor.Empty))) {
            const width: float = grid.CellSize.Width;
            const height: float = grid.CellSize.Height;
            const x: float = clipRect.X - width;
            const y: float = clipRect.Y - height;
            const single: float = clipRect.X + clipRect.Width + width;
            const y1: float = clipRect.Y + clipRect.Height + height;
            const pointF: CGPoint = (grid as any).findNearestInfiniteGridPoint(new CGPoint(x, y), 0, 0);
            const pointF1: CGPoint = (grid as any).findNearestInfiniteGridPoint(new CGPoint(single, y1), 0, 0);
            const x1: float = pointF.X;
            let origin: CGPoint = grid.Origin;
            let int321: number = (~~Math.floor(((x1 - origin.X) / width))) % upperBound;
            const single1: float = pointF.Y;
            origin = grid.Origin;
            let int322: number = (Math.floor(((single1 - origin.Y) / height))) % int32;
            if (int321 < 0) {
                int321 = (int321 + upperBound);
            }
            if (int322 < 0) {
                int322 = int322 + int32;
            }
            const int323: number = int321;
            const solidBrush: SolidBrush = new SolidBrush(CGColor.White);
            for (let i = pointF.Y; i < pointF1.Y; i = i + height) {
                for (let j = pointF.X; j < pointF1.X; j = j + width) {
                    const color: CGColor = cellColors[int321][int322];
                    if (!color.Equals(CGColor.Empty)) {
                        solidBrush.Color = color;
                        TuShape.DrawHtmlRectangle(result, view, undefined, solidBrush, j, i, width, height);
                    }
                    int321++;
                    if (int321 >= upperBound) {
                        int321 = 0;
                    }
                }
                int321 = int323;
                int322++;
                if (int322 >= int32) {
                    int322 = 0;
                }
            }
            solidBrush.Dispose();
        }
    }
    public static Apply(view:TuView,grid: TuGrid): any[] {

        const result = [];
        const clipBounds: CGRectangle = view.ClientRectangle; //g.ClipBounds;
        const rectangleF: CGRectangle = (grid as any).computeInfiniteBounds(grid.Bounds.clone());
        const rectangleF1: CGRectangle = (grid as any).computeFiniteBounds(rectangleF, view.DocExtent);
        const brush: Brush = grid.Brush;
        if (grid.Shadowed && brush != null) {
            const shadowOffset: CGSize = grid.GetShadowOffset(view);
            const width: float = shadowOffset.Width;
            const height: float = shadowOffset.Height;
            if (shadowOffset.Width !== 0 || shadowOffset.Height !== 0) {
                const x: float = rectangleF1.X;
                const y: float = rectangleF1.Y;
                const single: float = rectangleF1.X + rectangleF1.Width;
                const y1: float = rectangleF1.Y + rectangleF1.Height;
                const pointF: CGPoint = new CGPoint(x, y);
                const pointF1: CGPoint = new CGPoint(single, y);
                const pointF2: CGPoint = new CGPoint(single, y1);
                const pointF3: CGPoint = new CGPoint(x, y1);
                const pointF4: CGPoint = new CGPoint(x + width, y + height);
                const pointF5: CGPoint = new CGPoint(single + width, y + height);
                const pointF6: CGPoint = new CGPoint(single + width, y1 + height);
                const pointF7: CGPoint = new CGPoint(x + width, y1 + height);
                const shadowBrush: Brush = grid.GetShadowBrush(view);
                if (width > 0) {
                    if (height > 0) {
                        const pointFArray: CGPoint[] = view.allocTempPointArray(6);
                        pointFArray[0] = pointF5;
                        pointFArray[1] = pointF6;
                        pointFArray[2] = pointF7;
                        pointFArray[3] = new CGPoint(x + width, y1);
                        pointFArray[4] = pointF2;
                        pointFArray[5] = new CGPoint(single, y + height);
                        TuShape.DrawHtmlPolygon(result, view, undefined, shadowBrush, pointFArray);
                        view.freeTempPointArray(pointFArray);
                    }
                    else if (height >= 0) {
                        TuShape.DrawHtmlRectangle(result, view, null, shadowBrush, pointF1.X, pointF1.Y, width, rectangleF1.Height);
                    }
                    else {
                        const pointFArray1: CGPoint[] = view.allocTempPointArray(6);
                        pointFArray1[0] = pointF4;
                        pointFArray1[1] = pointF5;
                        pointFArray1[2] = pointF6;
                        pointFArray1[3] = new CGPoint(single, y1 + height);
                        pointFArray1[4] = pointF1;
                        pointFArray1[5] = new CGPoint(x + width, y);
                        TuShape.DrawHtmlPolygon(result, view, undefined, shadowBrush, pointFArray1);
                        view.freeTempPointArray(pointFArray1);
                    }
                }
                else if (width < 0) {
                    if (height > 0) {
                        const pointFArray2: CGPoint[] = view.allocTempPointArray(6);
                        pointFArray2[0] = pointF6;
                        pointFArray2[1] = pointF7;
                        pointFArray2[2] = pointF4;
                        pointFArray2[3] = new CGPoint(x, y + height);
                        pointFArray2[4] = pointF3;
                        pointFArray2[5] = new CGPoint(single + width, y1);
                        TuShape.DrawHtmlPolygon(result, view, undefined, shadowBrush, pointFArray2);
                        view.freeTempPointArray(pointFArray2);
                    }
                    else if (height >= 0) {
                        TuShape.DrawHtmlRectangle(result, view, undefined, shadowBrush, pointF4.X, pointF4.Y, -width, rectangleF1.Height);
                    }
                    else {
                        const pointFArray3: CGPoint[] = view.allocTempPointArray(6);
                        pointFArray3[0] = pointF7;
                        pointFArray3[1] = pointF4;
                        pointFArray3[2] = pointF5;
                        pointFArray3[3] = new CGPoint(single + width, y);
                        pointFArray3[4] = pointF;
                        pointFArray3[5] = new CGPoint(x, y1 + height);
                        TuShape.DrawHtmlPolygon(result, view, undefined, shadowBrush, pointFArray3);
                        view.freeTempPointArray(pointFArray3);
                    }
                }
                else if (height > 0) {
                    TuShape.DrawHtmlRectangle(result, view, undefined, shadowBrush, pointF3.X, pointF3.Y, rectangleF1.Width, height);
                }
                else if (height < 0) {
                    TuShape.DrawHtmlRectangle(result, view, undefined, shadowBrush, pointF4.X, pointF4.Y, rectangleF1.Width, -height);
                }
            }
        }
        if (brush != null) {
            TuShape.DrawSvgRectangle(result, view, undefined, brush, rectangleF1.X, rectangleF1.Y, rectangleF1.Width, rectangleF1.Height);
        }
        const rectangleF2: CGRectangle = GeomUtilities.IntersectionRect(rectangleF1, clipBounds);
        if (rectangleF2.Width > 0 && rectangleF2.Height > 0) {
            //const clip: Region = g.Clip;
            // TODO: clip kontrol edilecek, alternatif aranacak.
            //g.intersectClip(rectangleF2);
            TuGridHtmlRenderer.fillGrid(result, grid, view, rectangleF2);
            switch (grid.Style) {
                case TuViewGridStyle.None:
                    {
                        //g.Clip = clip;
                        break;
                    }
                case TuViewGridStyle.Dot:
                    {
                       // grid.drawGridDots(g, view, rectangleF2);
                       // g.Clip = clip;
                        break;
                    }
                case TuViewGridStyle.Cross:
                    {
                       // grid.drawGridCrosses(g, view, new CGSize(6, 6), rectangleF2);
                       // g.Clip = clip;
                        break;
                    }
                case TuViewGridStyle.Line:
                case TuViewGridStyle.HorizontalLine:
                case TuViewGridStyle.VerticalLine:
                    {
                        TuGridHtmlRenderer.drawGridLines(result,grid, view, rectangleF2);
                        //g.Clip = clip;
                        break;
                    }
                default:
                    {
                        //g.Clip = clip;
                        break;
                    }
            }
        }
        if (grid.Pen != null) {
            TuShape.DrawHtmlRectangle(result, view, grid.Pen, undefined, rectangleF1.X, rectangleF1.Y, rectangleF1.Width, rectangleF1.Height);
        }
        return (
            <div class='TuGrid'>
                {result}
            </div>
        );

    }
}
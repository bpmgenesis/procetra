import { GraphicsPath, FillMode, Graphics } from '@tuval/graphics';
import { GeomUtilities } from './../GeomUtilities';
import { TuView } from './../TuView/TuView';
import { RotateHelper } from './../RotateHelper';
import { CGPoint, CGRectangle, Matrix } from '@tuval/cg';
import { TuHandle } from './TuHandle';
import { Types } from './../types';
import { ClassInfo, float, Out } from '@tuval/core';
import { TuShape } from '../TuShape/TuShape';

@ClassInfo({
    fullName: Types.TuHandleRotated,
    instanceof: [
        Types.TuHandleRotated
    ]
})
export class TuHandleRotated extends TuHandle {

    private myAngle: float;

    //#region [Property] Figure
    public get Angle(): float {
        return this.getAngle();
    }
    public set Angle(value: float) {
        this.setAngle(value);
    }

    protected /*virtual*/ getAngle(): float {
        return this.myAngle;
    }
    protected /*virtual*/ setAngle(value: float) {
        this.myAngle = value;
    }
    //#endregion

    public /*override*/ containsPoint(p: CGPoint): boolean {
        return super.containsPoint(RotateHelper.RotatePoint(p, this.Center, -this.Angle));
    }
    public /*override*/  ExpandPaintBounds(rect: CGRectangle, view: TuView): CGRectangle {
        const rotatedBounds: Out<CGRectangle> = { value: RotateHelper.GetRotatedBounds(rect, this.Angle) };
        const penWidth: float = this.PenWidth;
        GeomUtilities.InflateRect(rotatedBounds, penWidth, penWidth);
        return CGRectangle.Union(rect, rotatedBounds.value);
    }

    public /*override*/ makePath(): GraphicsPath {
        const graphicsPath: GraphicsPath = new GraphicsPath(FillMode.Winding);
        graphicsPath.addRectangle(this.Bounds);
        if (this.Angle !== 0) {
            const matrix: Matrix = new Matrix();
            matrix.rotateAt(this.Angle, this.Center);
            graphicsPath.transform(matrix);
            matrix.Dispose();
        }
        return graphicsPath;
    }

    public /*override*/ Paint(g: Graphics, view: TuView): void {
        TuShape.DrawPath(g, view, this.Pen, this.Brush, super.getPath());
    }
}
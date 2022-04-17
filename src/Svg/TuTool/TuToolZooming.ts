import { ClassInfo, Type, typeOf } from '@tuval/core';
import { TuView } from '../TuView/TuView';
import { TuToolRubberBanding } from './TuToolRubberBanding';
import { Types } from '../types';
import { CGRectangle, CGPoint, CGSize } from '@tuval/cg';
import { TuTool } from './TuTool';

@ClassInfo({
    fullName: Types.TuToolZooming,
    instanceof: [
        Types.TuToolZooming
    ]
})
export class TuToolZooming extends TuToolRubberBanding {
    public GetType(): Type {
        return typeOf(Types.TuToolZooming);
    }
    private myZoomedView: TuView;

    //#region [Property] ZoomedView
    public get ZoomedgetView(): TuView {
        return this.getZoomedgetView();
    }
    public set ZoomedView(value: TuView) {
        this.setZoomedView(value);
    }

    protected /*virtual*/ getZoomedgetView(): TuView {
        return this.myZoomedView;
    }
    protected /*virtual*/ setZoomedView(value: TuView) {
        this.myZoomedView = value;
    }
    //#endregion

    public constructor(v: TuView) {
        super(v);
        this.myZoomedView = v;
    }

    public /*override*/ canStart(): boolean {
        if (this.FirstInput.IsContextButton) {
            return false;
        }
        return this.View.pickObject(true, false, this.FirstInput.DocPoint, true) == null;
    }

    public /*override*/ computeRubberBandBox(): CGRectangle {
        let x: number;
        let y: number;
        const viewPoint: CGPoint = this.FirstInput.ViewPoint;
        const point = this.LastInput.ViewPoint;
        const ınt32: number = point.X - viewPoint.X;
        const y1: number = point.Y - viewPoint.Y;
        const zoomedView: TuView = this.ZoomedView;
        if (zoomedView == null || zoomedView.DisplayRectangle.Height === 0 || y1 === 0) {
            return new CGRectangle({ x: Math.min(point.X, viewPoint.X), y: Math.min(point.Y, viewPoint.Y), width: Math.abs(point.X - viewPoint.X), height: Math.abs(point.Y - viewPoint.Y) });
        }
        const displayRectangle: CGRectangle = zoomedView.DisplayRectangle;
        const width: number = displayRectangle.Width / displayRectangle.Height;
        if (Math.abs(ınt32 / y1) >= width) {
            x = (viewPoint.X + ((Math.ceil((Math.abs(y1) * width))) * (ınt32 < 0 ? -1 : 1)));
            y = (viewPoint.Y + y1);
        }
        else {
            x = (viewPoint.X + ınt32);
            y = (viewPoint.Y + ((Math.ceil((Math.abs(ınt32) / width))) * (y1 < 0 ? -1 : 1)));
        }
        return new CGRectangle({ x: Math.min(x, viewPoint.X), y: Math.min(y, viewPoint.Y), width: Math.abs((x - viewPoint.X)), height: Math.abs((y - viewPoint.Y)) });
    }

    public /*override*/ doRubberBand(box: CGRectangle): void {
        const dragSize: CGSize = TuTool.DragSize;
        if (box.Width < dragSize.Width && box.Height < dragSize.Height) {
            return;
        }
        const zoomedView: TuView = this.ZoomedView;
        if (zoomedView == null) {
            return;
        }
        const doc: CGRectangle = this.View.convertViewToDoc(box);
        const displayRectangle: CGRectangle = zoomedView.DisplayRectangle;
        zoomedView.DocScale = displayRectangle.Width / doc.Width;
        zoomedView.DocPosition = new CGPoint({ x: doc.X, y: doc.Y });
    }
}
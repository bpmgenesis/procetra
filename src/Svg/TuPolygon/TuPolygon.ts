import { TuInputState } from './../TuInputState';
import { GraphicsPath, FillMode } from '@tuval/graphics';
import { GeomUtilities } from './../GeomUtilities';
import { NullRect } from './../Globals';
import { CGPoint, CGRectangle, CGSize } from '@tuval/cg';
import { Types } from './../types';
import { ClassInfo, float, as, TArray, Out, New, ArgumentException, trace , TString} from '@tuval/core';
import { TuShape } from '../TuShape/TuShape';
import { TuPolygonStyle } from './TuPolygonStyle';
import { TuSelection } from '../TuSelection/TuSelection';
import { TuObject } from '../TuObject/TuObject';
import { TuView } from '../TuView/TuView';
import { TuChangedEventArgs } from '../TuChangedEventArgs';
import { HitTester } from '../HitTester';
import { TuCopyDictionary } from '../TuCopyDictionary';

class ContextMenu {
    constructor(...args: any[]) {
        throw 'ContextMenu';
    }
}
@ClassInfo({
    fullName: Types.TuPolygon,
    instanceof: [
        Types.TuPolygon
    ]
})
export class TuPolygon extends TuShape {

    private myStyle: TuPolygonStyle = TuPolygonStyle.Line;
    private myPointsCount: number = 0;
    private myPoints: CGPoint[] = new Array(6);

    //#region [Property] PointsCount
    public get PointsCount(): number {
        return this.getPointsCount();
    }
    /**
    * @hidden
    */
    protected /*virtual*/ getPointsCount(): number {
        return this.myPointsCount;
    }
    //#endregion

    //#region [Property] Style
    public get Style(): TuPolygonStyle {
        return this.getStyle();
    }
    public set Style(value: TuPolygonStyle) {
        this.setStyle(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getStyle(): TuPolygonStyle {
        return this.myStyle;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setStyle(value: TuPolygonStyle) {
        const goPolygonStyle: TuPolygonStyle = this.myStyle;
        if (goPolygonStyle !== value) {
            this.myStyle = value;
            this.resetPath();
            if (!this.Initializing) {
                this.InvalidBounds = true;
            }
            this.Changed(1414, 0, goPolygonStyle, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    public constructor() {
        super();
        this.InternalFlags = this.InternalFlags | 512;
        for (let i = 0; i < this.myPoints.length; i++) {
            this.myPoints[i] = new CGPoint();
        }
    }

    public /* virtual */ addPoint(x: float, t: float): number;
    public /* virtual */ addPoint(p: CGPoint): number;
    public /* virtual */ addPoint(...args: any[]): number {
        if (args.length === 1 && args[0] instanceof CGPoint) {
            const p: CGPoint = args[0];
            return this.internalInsertPoint(this.myPointsCount, p.clone());
        } else if (args.length === 2 && typeof args[0] === 'number' && typeof args[1] === 'number') {
            const x: number = args[0];
            const y: number = args[1];
            return this.addPoint(new CGPoint(x, y));
        }
    }

    public /* override */ AddSelectionHandles(sel: TuSelection, selectedObj: TuObject): void {
        const view: TuView = sel.View;
        const flag: boolean = (view == null ? true : view.CanResizeObjects());
        const flag1: boolean = (view == null ? true : view.CanReshapeObjects());
        if (!(this.CanResize() && flag) || !this.CanReshape() || !flag1) {
            super.AddSelectionHandles(sel, selectedObj);
            return;
        }
        sel.removeHandles(this);
        const pointsCount: number = this.PointsCount - 1;
        for (let i = 0; i <= pointsCount; i = (i + 1)) {
            const point: CGPoint = this.getPoint(i);
            sel.createResizeHandle(this, selectedObj, point, (8192 + i), true);
        }
    }

    public /* override */ ChangeValue(e: TuChangedEventArgs, undo: boolean): void {
        let newRect: CGRectangle = new CGRectangle();
        const subHint: number = e.SubHint;
        if (subHint > 1403) {
            if (subHint === 1412) {
                this.setPoints(e.getValue(undo));
                return;
            }
            if (subHint === 1414) {
                this.Style = e.getValue(undo);
                return;
            }
        }
        else {
            if (subHint == 1001) {
                super.ChangeValue(e, undo);
                const rect: CGRectangle = e.getRect(!undo);
                const rectangleF: CGRectangle = e.getRect(undo);
                if (rect.Width === rectangleF.Width && rect.Height === rectangleF.Height) {
                    const x: float = rectangleF.X - rect.X;
                    const y: float = rectangleF.Y - rect.Y;
                    GeomUtilities.TranslatePoints(this.myPoints, x, y);
                }
                return;
            }
            switch (subHint) {
                case 1401:
                    {
                        if (undo) {
                            this.internalRemovePoint(e.OldInt);
                            return;
                        }
                        const oldInt: number = e.OldInt;
                        const single: float = e.NewRect.X;
                        newRect = e.NewRect;
                        this.internalInsertPoint(oldInt, new CGPoint(single, newRect.Y));
                        return;
                    }
                case 1402:
                    {
                        if (!undo) {
                            this.internalRemovePoint(e.OldInt);
                            return;
                        }
                        const ınt32: number = e.OldInt;
                        const x1: float = e.OldRect.X;
                        newRect = e.OldRect;
                        this.internalInsertPoint(ınt32, new CGPoint(x1, newRect.Y));
                        return;
                    }
                case 1403:
                    {
                        if (undo) {
                            const oldInt1: number = e.OldInt;
                            const single1: float = e.OldRect.X;
                            newRect = e.OldRect;
                            this.internalSetPoint(oldInt1, new CGPoint(single1, newRect.Y));
                            return;
                        }
                        const ınt321: number = e.OldInt;
                        const x2: float = e.NewRect.X;
                        newRect = e.NewRect;
                        this.internalSetPoint(ınt321, new CGPoint(x2, newRect.Y));
                        return;
                    }
            }
        }
        super.ChangeValue(e, undo);
    }

    public /* virtual */ clearPoints(): void {
        if (this.PointsCount <= 0) {
            return;
        }
        this.Changing(1412);
        this.resetPath();
        this.myPointsCount = 0;
        if (!this.Initializing) {
            this.InvalidBounds = true;
        }
        this.Changed(1412, 0, undefined, NullRect, 0, null, NullRect);
    }

    protected /* override */  ComputeBounds(): CGRectangle {
        const pointsCount: number = this.PointsCount;
        if (pointsCount <= 0) {
            const position: CGPoint = this.Position;
            return new CGRectangle(position.X, position.Y, 0, 0);
        }
        let point: CGPoint = this.getPoint(0);
        let x: float = point.X;
        let y: float = point.Y;
        let single: float = point.X;
        let y1: float = point.Y;
        if (this.Style !== TuPolygonStyle.Bezier) {
            for (let i = 1; i < pointsCount; i = (i + 1)) {
                point = this.getPoint(i);
                x = Math.min(x, point.X);
                y = Math.min(y, point.Y);
                single = Math.max(single, point.X);
                y1 = Math.max(y1, point.Y);
            }
        }
        else {
            for (let j = 3; j < this.myPointsCount; j = (j + 3)) {
                const pointF: CGPoint = this.getPoint(j - 3);
                const point1: CGPoint = this.getPoint(j - 2);
                if ((j + 3) >= this.myPointsCount) {
                    j = this.myPointsCount - 1;
                }
                const pointF1: CGPoint = this.getPoint(j - 1);
                const point2: CGPoint = this.getPoint(j);
                const rectangleF: CGRectangle = GeomUtilities.BezierBounds(pointF, point1, pointF1, point2, 0.1);
                x = Math.min(x, rectangleF.X);
                y = Math.min(y, rectangleF.Y);
                single = Math.max(single, rectangleF.X + rectangleF.Width);
                y1 = Math.max(y1, rectangleF.Y + rectangleF.Height);
            }
        }
        return new CGRectangle(x, y, single - x, y1 - y);
    }

    public /* override */ containsPoint(p: CGPoint): boolean {
        if (!super.containsPoint(p)) {
            return false;
        }
        const path: GraphicsPath = super.getPath();

        const hitTester: HitTester = new HitTester(path);
        const flag: boolean = hitTester.test(p);
        super.disposePath(path);
        return flag;
    }

    public /* override */ CopyNewValueForRedo(e: TuChangedEventArgs): void {
        if (e.SubHint !== 1412) {
            super.CopyNewValueForRedo(e);
            return;
        }
        if (!e.IsBeforeChanging) {
            e.NewValue = this.copyPointsArray();
        }
    }

    public /* override */ copyObject(env: TuCopyDictionary): TuObject {
        const goPolygon: TuPolygon = as(super.copyObject(env), Types.TuPolygon);
        if (goPolygon != null) {
            goPolygon.myPoints = TArray.Clone(this.myPoints);
        }
        return goPolygon;
    }

    public /* override */ CopyOldValueForUndo(e: TuChangedEventArgs): void {
        if (e.SubHint != 1412) {
            super.CopyOldValueForUndo(e);
            return;
        }
        if (e.IsBeforeChanging) {
            e.OldValue = this.copyPointsArray();
        }
    }

    public /* virtual */ copyPointsArray(): CGPoint[] {
        const pointFArray: CGPoint[] = new Array(this.myPointsCount);
        TArray.Copy(this.myPoints, 0, pointFArray, 0, this.myPointsCount);
        return pointFArray;
    }

    public /* override */ DoResize(view: TuView, origRect: CGRectangle, newPoint: CGPoint, whichHandle: number, evttype: TuInputState, min: CGSize, max: CGSize): void {
        if (whichHandle >= 8192 && (this.ResizesRealtime || evttype === TuInputState.Finish || evttype === TuInputState.Cancel)) {
            this.setPoint((whichHandle - 8192), newPoint);
            return;
        }
        super.DoResize(view, origRect, newPoint, whichHandle, evttype, min, max);
    }

    public /* override */ GetNearestIntersectionPoint(p1: CGPoint, p2: CGPoint, result: Out<CGPoint>): boolean {
        let pointF: Out<CGPoint> = New.Out(new CGPoint());
        const bounds: CGRectangle = this.Bounds;
        const penWidth: float = this.PenWidth / 2;
        let single: float = 1E+21;
        let pointF1: CGPoint = new CGPoint();
        if (this.Style !== TuPolygonStyle.Bezier) {
            for (let i = 0; i < this.PointsCount; i = i + 1) {
                if (GeomUtilities.NearestIntersectionOnLine(GeomUtilities.ExpandPointOnEdge(this.getPoint(i), bounds, penWidth), GeomUtilities.ExpandPointOnEdge(this.getPoint(((i + 1) < this.PointsCount ? (i + 1) : 0)), bounds, penWidth), p1, p2, pointF)) {
                    const x: float = (pointF.value.X - p1.X) * (pointF.value.X - p1.X) + (pointF.value.Y - p1.Y) * (pointF.value.Y - p1.Y);
                    if (x < single) {
                        single = x;
                        pointF1 = pointF.value;
                    }
                }
            }
        }
        else {
            for (let j = 3; j < this.myPointsCount; j = j + 3) {
                const point: CGPoint = this.getPoint(j - 3);
                const point1: CGPoint = this.getPoint(j - 2);
                if ((j + 3) >= this.myPointsCount) {
                    j = this.myPointsCount - 1;
                }
                if (GeomUtilities.BezierNearestIntersectionOnLine(point.clone(), point1.clone(), this.getPoint(j - 1), this.getPoint(j), p1.clone(), p2.clone(), penWidth, pointF)) {
                    const x1: float = (pointF.value.X - p1.X) * (pointF.value.X - p1.X) + (pointF.value.Y - p1.Y) * (pointF.value.Y - p1.Y);
                    if (x1 < single) {
                        single = x1;
                        pointF1 = pointF.value;
                    }
                }
            }
        }
        result.value = pointF1.clone();
        return single < 1E+21;
    }

    public /* virtual */ getPoint(i: number): CGPoint {
        if (i < 0 || i >= this.myPointsCount) {
            throw new ArgumentException("TuPolygon.GetPoint given an invalid index");
        }
        return this.myPoints[i].clone();
    }

    public getSegmentNearPoint(pnt: CGPoint, pickMargin: float): number {
        const bounds: CGRectangle = this.Bounds;
        let single: float = Math.max(this.PenWidth, 0.1);
        const single1: float = Math.max(pickMargin, 0);
        single += single1;
        if (pnt.X < bounds.X - single || pnt.X > bounds.X + bounds.Width + single || pnt.Y < bounds.Y - single || pnt.Y > bounds.Y + bounds.Height + single) {
            return -1;
        }
        const pointsCount: number = this.PointsCount;
        if (pointsCount <= 1) {
            return -1;
        }
        single = single - single1 / 2;
        if (this.Style !== TuPolygonStyle.Bezier || pointsCount < 4) {
            for (let i = 0; i < pointsCount - 1; i = i + 1) {
                if (GeomUtilities.LineContainsPoint(this.getPoint(i), this.getPoint(i + 1), single, pnt.clone())) {
                    return i;
                }
            }
        }
        else {
            single *= Math.max(1, Math.max(bounds.Width, bounds.Height) / 1000);
            for (let j = 3; j < pointsCount; j = j + 3) {
                const ınt32: number = j - 3;
                const point: CGPoint = this.getPoint(j - 3);
                const pointF: CGPoint = this.getPoint(j - 2);
                if (j + 3 >= pointsCount) {
                    j = pointsCount - 1;
                }
                if (GeomUtilities.BezierContainsPoint(point, pointF, this.getPoint(j - 1), this.getPoint(j), single, pnt)) {
                    return ınt32;
                }
            }
        }
        const point1: CGPoint = this.getPoint(pointsCount - 1);
        const pointF1: CGPoint = this.getPoint(0);
        if (!(point1.notEquals(pointF1)) || !GeomUtilities.LineContainsPoint(point1, pointF1, single, pnt)) {
            return -1;
        }
        return pointsCount - 1;
    }

    public /* virtual */ insertPoint(i: number, p: CGPoint): void {
        this.internalInsertPoint(i, p);
    }

    private internalInsertPoint(i: number, p: CGPoint): number {
        if (i < 0) {
            throw new ArgumentException("GoPolygon.InsertPoint given an invalid index, less than zero");
        }
        if (i > this.myPointsCount) {
            i = this.myPointsCount;
        }
        this.resetPath();
        const length: number = this.myPoints.length;
        if (this.myPointsCount >= length) {
            const pointFArray: CGPoint[] = new Array(Math.max(length * 2, this.myPointsCount + 1));
            TArray.Copy(this.myPoints, 0, pointFArray, 0, length);
            this.myPoints = pointFArray;
        }
        if (this.myPointsCount > i) {
            TArray.Copy(this.myPoints, i, this.myPoints, (i + 1), (this.myPointsCount - i));
        }
        this.myPointsCount = this.myPointsCount + 1;
        this.myPoints[i] = p;
        if (!this.Initializing) {
            this.InvalidBounds = true;
        }
        this.Changed(1401, i, undefined, GeomUtilities.MakeRect(p), i, undefined, GeomUtilities.MakeRect(p));
        return i;
    }

    private internalRemovePoint(i: number): void {
        if (i < 0 || i >= this.myPointsCount) {
            return;
        }
        this.resetPath();
        const pointF: CGPoint = this.myPoints[i];
        if (this.myPointsCount > i + 1) {
            TArray.Copy(this.myPoints, (i + 1), this.myPoints, i, ((this.myPointsCount - i) - 1));
        }
        this.myPointsCount = this.myPointsCount - 1;
        if (!this.Initializing) {
            this.InvalidBounds = true;
        }
        this.Changed(1402, i, undefined, GeomUtilities.MakeRect(pointF), i, undefined, GeomUtilities.MakeRect(pointF));
    }

    private internalSetPoint(i: number, p: CGPoint): void {
        if (i < 0 || i >= this.myPointsCount) {
            throw new ArgumentException("TuPolygon.setPoint given an invalid index");
        }
        const pointF: CGPoint = this.myPoints[i].clone();
        if (pointF.Equals(p)) {
            return;
        }
        this.resetPath();
        this.myPoints[i] = p.clone();
        if (!this.Initializing) {
            this.InvalidBounds = true;
        }
        this.Changed(1403, i, undefined, GeomUtilities.MakeRect(pointF), i, undefined, GeomUtilities.MakeRect(p));
    }

    public /* override */  makePath(): GraphicsPath {
        const graphicsPath: GraphicsPath = new GraphicsPath(FillMode.Winding);
        const pointsCount: number = this.PointsCount;
        const point: CGPoint[] = new Array(pointsCount);
        for (let i = 0; i < pointsCount; i = i + 1) {
            point[i] = this.getPoint(i);
        }
        let style: boolean = this.Style === TuPolygonStyle.Bezier;
        if (style && pointsCount % 3 !== 1) {
            trace(TString.Concat("Polygon has wrong number of points: ", pointsCount.toString(), "; should have 3n+1 points"));
            style = false;
        }
        if (!style) {
            graphicsPath.addLines(point);
        }
        else {
            graphicsPath.addBeziers(point);
        }
        graphicsPath.closeAllFigures();
        return graphicsPath;
    }

    protected /* override */ OnBoundsChanged(old: CGRectangle): void {
        super.OnBoundsChanged(old);
        const pointsCount: number = this.PointsCount;
        const bounds: CGRectangle = this.Bounds;
        if (old.Width !== bounds.Width || old.Height != bounds.Height) {
            this.Changing(1412);
            GeomUtilities.RescalePoints(this.myPoints, old, bounds);
            this.InvalidBounds = false;
            this.Changed(1412, 0, undefined, old, 0, undefined, bounds);
            return;
        }
        const x: float = bounds.X - old.X;
        const y: float = bounds.Y - old.Y;
        if (x === 0 && y === 0) {
            return;
        }
        GeomUtilities.TranslatePoints(this.myPoints, x, y);
        this.InvalidBounds = false;
    }

    public /* virtual */ removePoint(i: number): void {
        this.internalRemovePoint(i);
    }

    public /* virtual */ setPoint(i: number, p: CGPoint): void {
        this.internalSetPoint(i, p);
    }
    public /* virtual */ setPoints(points: CGPoint[]): void {
        if (points == null) {
            return;
        }
        this.Changing(1412);
        this.resetPath();
        const length: number = points.length;
        if (length > this.myPoints.length) {
            this.myPoints = new Array(length);
        }
        TArray.Copy(points, 0, this.myPoints, 0, length);
        this.myPointsCount = length;
        if (!this.Initializing) {
            this.InvalidBounds = true;
        }
        this.Changed(1412, 0, undefined, NullRect, 0, undefined, NullRect);
    }

    public /* override */ GetContextMenuStrip(view: TuView): ContextMenu {

        const items = [
            {
                label: 'File',
                icon: 'pi pi-fw pi-file',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                        /*  items:[
                           {
                              label:'Bookmark',
                              icon:'pi pi-fw pi-bookmark'
                           },
                           {
                              label:'Video',
                              icon:'pi pi-fw pi-video'
                           },

                        ] */
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-fw pi-trash'
                    },
                    {
                        separator: true
                    },
                    {
                        label: 'Export',
                        icon: 'pi pi-fw pi-external-link'
                    }
                ]
            },
              {
                label:'Edit',
                icon:'pi pi-fw pi-pencil',
                items:[
                   {
                      label:'Left',
                      icon:'pi pi-fw pi-align-left'
                   },
                   {
                      label:'Right',
                      icon:'pi pi-fw pi-align-right'
                   },
                   {
                      label:'Center',
                      icon:'pi pi-fw pi-align-center'
                   },
                   {
                      label:'Justify',
                      icon:'pi pi-fw pi-align-justify'
                   },

                ]
             },
             {
                label:'Users',
                icon:'pi pi-fw pi-user',
                items:[
                   {
                      label:'New',
                      icon:'pi pi-fw pi-user-plus',

                   },
                   {
                      label:'Delete',
                      icon:'pi pi-fw pi-user-minus',

                   },
                   {
                      label:'Search',
                      icon:'pi pi-fw pi-users',
                      items:[
                         {
                            label:'Filter',
                            icon:'pi pi-fw pi-filter',
                            items:[
                               {
                                  label:'Print',
                                  icon:'pi pi-fw pi-print'
                               }
                            ]
                         },
                         {
                            icon:'pi pi-fw pi-bars',
                            label:'List'
                         }
                      ]
                   }
                ]
             },
             {
                label:'Events',
                icon:'pi pi-fw pi-calendar',
                items:[
                   {
                      label:'Edit',
                      icon:'pi pi-fw pi-pencil',
                      items:[
                         {
                            label:'Save',
                            icon:'pi pi-fw pi-calendar-plus'
                         },
                         {
                            label:'Delete',
                            icon:'pi pi-fw pi-calendar-minus'
                         },

                      ]
                   },
                   {
                      label:'Archieve',
                      icon:'pi pi-fw pi-calendar-times',
                      items:[
                         {
                            label:'Remove',
                            icon:'pi pi-fw pi-calendar-minus'
                         }
                      ]
                   }
                ]
             },
             {
                separator:true
             },
             {
                label:'Quit',
                icon:'pi pi-fw pi-power-off'
             }
        ];

        /* var menu = new Tuval.Menu({
            model:items
        }); */

        return new ContextMenu({
            model: items
        });
    }
}
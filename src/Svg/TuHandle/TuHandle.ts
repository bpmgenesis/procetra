import { Brushes_Yellow } from './../Globals';
import { GraphicsPath, FillMode, Graphics } from '@tuval/graphics';
import { CGSize, CGPoint, CGRectangle } from '@tuval/cg';
import { ClassInfo, Out, New, initArray, as, is } from '@tuval/core';
import { GeomUtilities } from '../GeomUtilities';
import { Spot } from '../Spot';
import { TuCopyDictionary } from '../TuCopyDictionary';
import { TuSelection } from '../TuSelection/TuSelection';
import { Types } from '../types';
import { TuHandleStyle } from './TuHandleStyle';
import { ITuHandle } from './ITuHandle';
import { TuShape } from '../TuShape/TuShape';
import { TuDocument } from '../TuDocument/TuDocument';
import { TuObject } from '../TuObject/TuObject';
import { TuView } from '../TuView/TuView';
import { ViewRenderingMode } from '../TuView/ViewRenderingMode';
import { TuHandleSvgRenderer } from './TuHandleSvgRenderer';
import { State } from '@tuval/forms';
import { TuHandleHtmlRenderer } from './TuHandleHtmlRenderer';
import { HtmlRenderer } from './Renderers/HtmlRenderer';

@ClassInfo({
    fullName: Types.TuHandle,
    instanceof: [
        Types.TuHandle,
        Types.ITuHandle
    ]
})
export class TuHandle extends TuShape implements ITuHandle {
    /* CreateElements(param: any) {
        const view: TuView = param;
        const result = [];
        if (view.RenderingMode === ViewRenderingMode.Svg) {
            TuHandleSvgRenderer.Apply(result, this);
        } else if (view.RenderingMode === ViewRenderingMode.Html) {
            TuHandleHtmlRenderer.Apply(result, this);
        }

        return result;
    } */

    @State()
    private myHandleID: number;

    @State()
    private mySelectedObject: TuObject;

    @State()
    private myStyle: TuHandleStyle;

    @State()
    private myCursorName: string;


    //#region [Property] CursorName

    public get CursorName(): string {
        return this.myCursorName;
    }
    public set CursorName(value: string) {
        this.myCursorName = value;
    }
    //#endregion

    //#region [Property] TuObject

    public get TuObject(): TuObject {
        return this.getTuObject();
    }

    protected /*virtual*/  getTuObject(): TuObject {
        return this;
    }

    //#endregion

    //#region [Property] HandledObject
    public get HandledObject(): TuObject {
        if (this.SelectedObject == null) {
            return undefined;
        }
        return this.SelectedObject.SelectionObject;
    }
    //#endregion

    //#region [Property] HandleID
    public get HandleID(): number {
        return this.myHandleID;
    }
    public set HandleID(value: number) {
        this.myHandleID = value;
    }
    //#endregion

    //#region [Property] SelectedObject
    public get SelectedObject(): TuObject {
        return this.mySelectedObject;
    }
    public set SelectedObject(value: TuObject) {
        this.mySelectedObject = value;
    }
    //#endregion

    //#region [Property] SelectionObject
    public get SelectionObject(): TuObject {
        return undefined;
    }

    //#endregion

    //#region [Property] Style
    public get Style(): TuHandleStyle {
        return this.myStyle;
    }
    public set Style(value: TuHandleStyle) {
        this.myStyle = value;
    }
    //#endregion

    protected setBounds(value:CGRectangle) {
        //console.log('TuHandle : ' + value);
        super.setBounds(value);
    }
    public SetupControlDefaults() {
        super.SetupControlDefaults();
        this.HtmlRenderer = new HtmlRenderer();
        this.myHandleID = -1;
        this.myStyle = TuHandleStyle.Ellipse;

        this.Size = new CGSize(0, 0);
    }
    public /* override */ AddSelectionHandles(sel: TuSelection, selectedObj: TuObject): void {

    }

    private computeTrianglePoints(v: CGPoint[]): void {
        const bounds: CGRectangle = this.Bounds.clone();
        switch (this.Style) {
            case TuHandleStyle.TriangleTopLeft:
                {
                    v[0].X = bounds.X + bounds.Width / 2;
                    v[0].Y = bounds.Y + bounds.Height;
                    v[1].X = bounds.X;
                    v[1].Y = bounds.Y;
                    v[2].X = bounds.X + bounds.Width;
                    v[2].Y = bounds.Y + bounds.Height / 2;
                    return;
                }
            case TuHandleStyle.TriangleTopRight:
                {
                    v[0].X = bounds.X;
                    v[0].Y = bounds.Y + bounds.Height / 2;
                    v[1].X = bounds.X + bounds.Width;
                    v[1].Y = bounds.Y;
                    v[2].X = bounds.X + bounds.Width / 2;
                    v[2].Y = bounds.Y + bounds.Height;
                    return;
                }
            case TuHandleStyle.TriangleBottomRight:
                {
                    v[0].X = bounds.X + bounds.Width / 2;
                    v[0].Y = bounds.Y;
                    v[1].X = bounds.X + bounds.Width;
                    v[1].Y = bounds.Y + bounds.Height;
                    v[2].X = bounds.X;
                    v[2].Y = bounds.Y + bounds.Height / 2;
                    return;
                }
            case TuHandleStyle.TriangleBottomLeft:
                {
                    v[0].X = bounds.X + bounds.Width;
                    v[0].Y = bounds.Y + bounds.Height / 2;
                    v[1].X = bounds.X;
                    v[1].Y = bounds.Y + bounds.Height;
                    v[2].X = bounds.X + bounds.Width / 2;
                    v[2].Y = bounds.Y;
                    return;
                }
            case TuHandleStyle.TriangleMiddleTop:
                {
                    v[0].X = bounds.X;
                    v[0].Y = bounds.Y + bounds.Height;
                    v[1].X = bounds.X + bounds.Width / 2;
                    v[1].Y = bounds.Y;
                    v[2].X = bounds.X + bounds.Width;
                    v[2].Y = bounds.Y + bounds.Height;
                    return;
                }
            case TuHandleStyle.TriangleMiddleRight:
                {
                    v[0].X = bounds.X;
                    v[0].Y = bounds.Y;
                    v[1].X = bounds.X + bounds.Width;
                    v[1].Y = bounds.Y + bounds.Height / 2;
                    v[2].X = bounds.X;
                    v[2].Y = bounds.Y + bounds.Height;
                    return;
                }
            case TuHandleStyle.TriangleMiddleBottom:
                {
                    v[0].X = bounds.X + bounds.Width;
                    v[0].Y = bounds.Y;
                    v[1].X = bounds.X + bounds.Width / 2;
                    v[1].Y = bounds.Y + bounds.Height;
                    v[2].X = bounds.X;
                    v[2].Y = bounds.Y;
                    return;
                }
            case TuHandleStyle.TriangleMiddleLeft:
                {
                    v[0].X = bounds.X + bounds.Width;
                    v[0].Y = bounds.Y + bounds.Height;
                    v[1].X = bounds.X;
                    v[1].Y = bounds.Y + bounds.Height / 2;
                    v[2].X = bounds.X + bounds.Width;
                    v[2].Y = bounds.Y;
                    return;
                }
            default:
                {
                    return;
                }
        }
    }

    public /* override */ containsPoint(p: CGPoint): boolean {
        const bounds: Out<CGRectangle> = New.Out(this.Bounds.clone());
        const penWidth: number = this.PenWidth;
        GeomUtilities.InflateRect(bounds, penWidth / 2, penWidth / 2);
        if (!GeomUtilities.ContainsRect(bounds.value, p)) {
            return false;
        }
        if (this.HandleID !== 0) {
            return true;
        }
        GeomUtilities.InflateRect(bounds, -penWidth, -penWidth);
        return !GeomUtilities.ContainsRect(bounds.value, p);
    }

    public /* override */ copyObject(env: TuCopyDictionary): TuObject {
        return undefined;
    }

    public /* override */ GetCursorName(view: TuView): string {
        const handledObject: TuObject = this.HandledObject;
        if (handledObject == null || view != null && !view.CanResizeObjects() || !handledObject.CanResize() && !handledObject.CanReshape()) {
            return undefined;
        }
        return this.CursorName || TuHandle.GetCursorNameForHandleID(new Spot(-1, -1, this.HandleID));
    }

		/* internal */ static GetCursorNameForHandleID(id: Spot): string {
        if (id.ID <= 64) {
            if (id.ID > 16) {
                if (id.ID == 32) {
                    return "n-resize";
                }
                if (id.ID == 64) {
                    return "e-resize";
                }
            }
            else {
                switch (id.ID) {
                    case 0:
                        {
                            return null;
                        }
                    case 1:
                        {
                            return "move";
                        }
                    case 2:
                        {
                            return "nw-resize";
                        }
                    case 3:
                    case 5:
                    case 6:
                    case 7:
                        {
                            break;
                        }
                    case 4:
                        {
                            return "ne-resize";
                        }
                    case 8:
                        {
                            return "se-resize";
                        }
                    default:
                        {
                            if (id.ID == 16) {
                                return "sw-resize";
                            }
                            break;
                        }
                }
            }
        }
        else if (id.ID > 256) {
            if (id.ID == 1024) {
                return "hand";
            }
            if (id.ID == 1025) {
                return "hand";
            }
        }
        else {
            if (id.ID == 128) {
                return "s-resize";
            }
            if (id.ID == 256) {
                return "w-resize";
            }
        }
        return "move";
    }

    public /* override */  makePath(): GraphicsPath {
        const graphicsPath: GraphicsPath = new GraphicsPath(FillMode.Winding);
        const bounds: CGRectangle = this.Bounds.clone();
        switch (this.Style) {
            case TuHandleStyle.None:
                {
                    graphicsPath.addLine(bounds.X, bounds.Y, bounds.X, bounds.Y);
                    break;
                }
            case TuHandleStyle.Ellipse:
                {
                    graphicsPath.addEllipse(bounds.X, bounds.Y, bounds.Width, bounds.Height);
                    break;
                }
            case TuHandleStyle.Diamond:
                {
                    const x: CGPoint[] = new CGPoint[4];
                    x[0].X = bounds.X + bounds.Width / 2;
                    x[0].Y = bounds.Y;
                    x[1].X = bounds.X + bounds.Width;
                    x[1].Y = bounds.Y + bounds.Height / 2;
                    x[2].X = x[0].X;
                    x[2].Y = bounds.Y + bounds.Height;
                    x[3].X = bounds.X;
                    x[3].Y = x[1].Y;
                    graphicsPath.addPolygon(x);
                    break;
                }
            case TuHandleStyle.TriangleTopLeft:
            case TuHandleStyle.TriangleTopRight:
            case TuHandleStyle.TriangleBottomRight:
            case TuHandleStyle.TriangleBottomLeft:
            case TuHandleStyle.TriangleMiddleTop:
            case TuHandleStyle.TriangleMiddleRight:
            case TuHandleStyle.TriangleMiddleBottom:
            case TuHandleStyle.TriangleMiddleLeft:
                {
                    const pointFArray: CGPoint[] = initArray(3, () => new CGPoint());
                    this.computeTrianglePoints(pointFArray);
                    graphicsPath.addPolygon(pointFArray);
                    break;
                }
            default:
                {
                    graphicsPath.addRectangle(bounds);
                    break;
                }
        }
        return graphicsPath;
    }

    public /* override */  Paint(g: Graphics, view: TuView): void {
        const bounds: CGRectangle = this.Bounds.clone();
        switch (this.Style) {
            case TuHandleStyle.None:
                {
                    return;
                }
            case TuHandleStyle.Ellipse:
                {
                    TuShape.DrawEllipse(g, view, this.Pen, this.Brush, bounds.X, bounds.Y, bounds.Width, bounds.Height);
                    return;
                }
            case TuHandleStyle.Diamond:
                {
                    const x: CGPoint[] = view.allocTempPointArray(4);
                    x[0].X = bounds.X + bounds.Width / 2;
                    x[0].Y = bounds.Y;
                    x[1].X = bounds.X + bounds.Width;
                    x[1].Y = bounds.Y + bounds.Height / 2;
                    x[2].X = x[0].X;
                    x[2].Y = bounds.Y + bounds.Height;
                    x[3].X = bounds.X;
                    x[3].Y = x[1].Y;
                    TuShape.DrawPolygon(g, view, this.Pen, this.Brush, x);
                    view.freeTempPointArray(x);
                    return;
                }
            case TuHandleStyle.TriangleTopLeft:
            case TuHandleStyle.TriangleTopRight:
            case TuHandleStyle.TriangleBottomRight:
            case TuHandleStyle.TriangleBottomLeft:
            case TuHandleStyle.TriangleMiddleTop:
            case TuHandleStyle.TriangleMiddleRight:
            case TuHandleStyle.TriangleMiddleBottom:
            case TuHandleStyle.TriangleMiddleLeft:
                {
                    const pointFArray: CGPoint[] = view.allocTempPointArray(3);
                    this.computeTrianglePoints(pointFArray);
                    TuShape.DrawPolygon(g, view, this.Pen, this.Brush, pointFArray);
                    view.freeTempPointArray(pointFArray);
                    return;
                }
            default:
                {
                    TuShape.DrawRectangle(g, view, this.Pen, this.Brush, bounds.X, bounds.Y, bounds.Width, bounds.Height);
                    return;
                }
        }
    }
}

TuObject.prototype.CreateBoundingHandle = function (): ITuHandle {
    const goHandle: TuHandle = new TuHandle();
    const bounds: Out<CGRectangle> = { value: this.Bounds.clone() };
    const sizeF: CGSize = new CGSize(1, 1);
    const document: TuDocument = this.Document;
    if (document != null) {
        const worldScale: CGSize = document.WorldScale;
        sizeF.Width = sizeF.Width / worldScale.Width;
        sizeF.Height = sizeF.Height / worldScale.Height;
    }
    GeomUtilities.InflateRect(bounds, sizeF.Width, sizeF.Height);
    goHandle.Bounds = bounds.value;
    return goHandle;
}
TuObject.prototype.CreateResizeHandle = function (handleid: number): ITuHandle {
    return new TuHandle();
}

TuObject.prototype.MakeDiamondResizeHandle = function (handle: ITuHandle, spot: Spot): void {
    const goObject: TuHandle = as(handle.TuObject, Types.TuHandle);
    if (goObject != null) {
        goObject.Style = TuHandleStyle.Diamond;
        if (!is.typeof(goObject.SelectedObject, Types.ITuLink)) {
            goObject.Brush = Brushes_Yellow;
        }
        const bounds: Out<CGRectangle> = New.Out(goObject.Bounds.clone());
        GeomUtilities.InflateRect(bounds, bounds.value.Width / 6, bounds.value.Height / 6);
        goObject.Bounds = bounds.value;
        goObject.CursorName = TuHandle.GetCursorNameForHandleID(spot);
    }
}
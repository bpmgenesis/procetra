import { GeomUtilities } from '../GeomUtilities';
import { TuShapeEvents } from './TuShapeEvents';
import { TuBrushType } from './TuBrushType';
import { CGRectangle, CGColor, CGSize, CGPoint, Matrix } from '@tuval/cg';
import {
    GraphicsPath, Brush, Pen, Graphics, PathGradientBrush, TextureBrush,
    LinearGradientBrush, SolidBrush, GraphicTypes, FillMode, HatchStyle
} from '@tuval/graphics';
import { Types } from '../types';
import { ClassInfo, float, ArgumentOutOfRangeException, Out, as, New } from '@tuval/core';
import { TuPenInfo } from './TuPenInfo';
import { TuBrushInfo } from './TuBrushInfo';
import { Brushes_Black, Brushes_Gray, Brushes_LightGray, Brushes_White, makeRoundedRectangularPath, NullRect, Pens_Black } from '../Globals';
import { TuBrushStyle } from './TuBrushStyle';
import { BottomCenter, MiddleBottom, MiddleLeft, MiddleRight, MiddleTop, Spot, TopCenter, TopLeft, TopRight } from '../Spot';
import { TuChangedEventArgs } from '../TuChangedEventArgs';
import { TuCopyDictionary } from '../TuCopyDictionary';
import { TuView } from '../TuView/TuView';
import { TuObject } from '../TuObject/TuObject';
import { State, Teact } from '@tuval/forms';
import { SvgMatrix } from '../Matrix';
import { TuShapeSvgRenderer } from '../Xml/TuShapeSvgRenderer';
import { TuShapeHtmlRenderer } from '../Xml/TuShapeHtmlRenderer';


@ClassInfo({
    fullName: Types.TuShape,
    instanceof: [
        Types.TuShape
    ]
})
export abstract class TuShape extends TuObject {
    public static PenInfo_Black: TuPenInfo;
    public static BrushInfo_Black: TuBrushInfo;
    public static BrushInfo_Gray: TuBrushInfo;
    public static BrushInfo_LightGray: TuBrushInfo;
    public static BrushInfo_White: TuBrushInfo;

    @State()
    private myPenInfo: TuPenInfo = TuShape.GetPenInfo(Pens_Black);

    @State()
    private myBrushInfo: TuBrushInfo;

    @State()
    public /* internal */  myPath: GraphicsPath;

    @State()
    public /* internal */  myBrush: Brush;

    protected SetupControlDefaults(): void {
        super.SetupControlDefaults();
        this.SvgRenderer = new TuShapeSvgRenderer();
        this.HtmlRenderer = new TuShapeHtmlRenderer();
        this.myPenInfo = TuShape.GetPenInfo(Pens_Black);
    }

    //#region [Property] AutoRescales
    protected /*override*/  getBounds(): CGRectangle {
        return super.getBounds();
    }
    protected /*override*/ setBounds(value: CGRectangle) {
        this.resetPath();
        super.setBounds(value);
    }
    //#endregion

    //#region [Property] Brush
    public get Brush(): Brush {
        return this.getBrush();
    }

    public set Brush(value: Brush) {
        this.setBrush(value);
    }

    protected /*virtual*/ getBrush(): Brush {
        if (this.myBrushInfo == null) {
            return undefined;
        }
        if (this.myBrush == null) {
            this.myBrush = this.myBrushInfo.getBrush(this);
        }
        return this.myBrush;
    }

    protected /*virtual*/ setBrush(value: Brush) {
        this.BrushInfo = TuShape.GetBrushInfo(value, this);
    }
    //#endregion

    //#region [Property] BrushColor
    public get BrushColor(): CGColor {
        return this.getBrushColor();
    }

    public set BrushColor(value: CGColor) {
        this.setBrushColor(value);
    }

    protected /*virtual*/ getBrushColor(): CGColor {
        const brushInfo: TuBrushInfo = this.BrushInfo;
        if (brushInfo == null) {
            return CGColor.Empty;
        }
        return brushInfo.Color;
    }

    protected /*virtual*/ setBrushColor(value: CGColor) {
        const brushInfo: TuBrushInfo = this.BrushInfo;
        if (brushInfo == null || !(brushInfo.Color.notEquals(value))) {
            if (brushInfo == null && value != CGColor.Empty) {
                this.BrushInfo = new TuBrushInfo(brushInfo);
                this.BrushInfo.Color = value;
            }
            return;
        }
        if (value.Equals(CGColor.Empty) && brushInfo.BrushType === TuBrushType.Solid) {
            this.BrushInfo = undefined;
            return;
        }
        const tempBrushInfo: TuBrushInfo = new TuBrushInfo(brushInfo);
        tempBrushInfo.Color = value;
        this.BrushInfo = tempBrushInfo;
    }
    //#endregion

    //#region [Property] BrushFocusScales
    public get BrushFocusScales(): CGSize {
        return this.getBrushFocusScales();
    }

    public set BrushFocusScales(value: CGSize) {
        this.setBrushFocusScales(value);
    }

    protected /*virtual*/ getBrushFocusScales(): CGSize {
        const brushInfo: TuBrushInfo = this.BrushInfo;
        if (brushInfo == null) {
            return new CGSize();
        }
        return new CGSize(brushInfo.StartOrFocusScales.X, brushInfo.StartOrFocusScales.Y);
    }

    protected /*virtual*/ setBrushFocusScales(value: CGSize) {
        const brushInfo: TuBrushInfo = this.BrushInfo;
        const sizeF: CGSize = value;
        if (sizeF.Width < 0) {
            sizeF.Width = 0;
        }
        else if (sizeF.Width > 1) {
            sizeF.Width = 1;
        }
        if (sizeF.Height < 0) {
            sizeF.Height = 0;
        }
        else if (sizeF.Height > 1) {
            sizeF.Height = 1;
        }
        if (brushInfo != null && (brushInfo.StartOrFocusScales.X !== sizeF.Width || brushInfo.StartOrFocusScales.Y !== sizeF.Height)) {
            const goBrushInfo: TuBrushInfo = new TuBrushInfo(brushInfo);
            goBrushInfo.StartOrFocusScales = new CGPoint(sizeF.Width, sizeF.Height);
            this.BrushInfo = goBrushInfo;
            return;
        }
        if (brushInfo == null) {
            if (!sizeF.IsEmpty) {
                const goBrushInfo1: TuBrushInfo = new TuBrushInfo(brushInfo)
                goBrushInfo1.BrushStyle = TuBrushStyle.None;
                goBrushInfo1.StartOrFocusScales = new CGPoint(sizeF.Width, sizeF.Height);
                this.BrushInfo = goBrushInfo1;
            }
        }
    }
    //#endregion

    //#region [Property] BrushForeColor
    public get BrushForeColor(): CGColor {
        return this.getBrushForeColor();
    }

    public set BrushForeColor(value: CGColor) {
        this.setBrushForeColor(value);
    }

    protected /*virtual*/ getBrushForeColor(): CGColor {
        const brushInfo: TuBrushInfo = this.BrushInfo;
        if (brushInfo == null) {
            return CGColor.Empty;
        }
        return brushInfo.ForeColor;
    }

    protected /*virtual*/ setBrushForeColor(value: CGColor) {
        const brushInfo: TuBrushInfo = this.BrushInfo;
        if (brushInfo != null && brushInfo.ForeColor !== value) {
            this.BrushInfo = new TuBrushInfo(brushInfo);
            this.BrushInfo.ForeColor = value;
            return;
        }
        if (brushInfo == null && value !== CGColor.Empty) {
            const goBrushInfo: TuBrushInfo = new TuBrushInfo(brushInfo);
            goBrushInfo.BrushStyle = TuBrushStyle.None;
            goBrushInfo.ForeColor = value
            this.BrushInfo = goBrushInfo;
        }
    }
    //#endregion

    //#region [Property] BrushInfo
    private get BrushInfo(): TuBrushInfo {
        return this.getBrushInfo();
    }

    private set BrushInfo(value: TuBrushInfo) {
        this.setBrushInfo(value);
    }

    protected /*virtual*/ getBrushInfo(): TuBrushInfo {
        return this.myBrushInfo;
    }

    protected /*virtual*/ setBrushInfo(value: TuBrushInfo) {
        const goBrushInfo: TuBrushInfo = this.myBrushInfo;
        const goBrushInfo1: TuBrushInfo = value;
        if (goBrushInfo !== goBrushInfo1 && (goBrushInfo == null || !goBrushInfo.equals(goBrushInfo1))) {
            this.myBrushInfo = goBrushInfo1;
            this.myBrush = undefined;
            this.Changed(TuShapeEvents.ChangedBrush, 0, goBrushInfo, NullRect, 0, goBrushInfo1, NullRect);
        }
    }
    //#endregion

    //#region [Property] BrushMidColor
    public get BrushMidColor(): CGColor {
        return this.getBrushMidColor();
    }

    public set BrushMidColor(value: CGColor) {
        this.setBrushMidColor(value);
    }

    protected /*virtual*/ getBrushMidColor(): CGColor {
        const brushInfo: TuBrushInfo = this.BrushInfo;
        if (brushInfo == null) {
            return CGColor.Empty;
        }
        return brushInfo.MidColor;
    }

    protected /*virtual*/ setBrushMidColor(value: CGColor) {
        const brushInfo: TuBrushInfo = this.BrushInfo;
        if (brushInfo != null && brushInfo.MidColor !== value) {
            this.BrushInfo = new TuBrushInfo(brushInfo);
            this.BrushInfo.MidColor = value
            return;
        }
        if (brushInfo == null && !value.IsEmpty) {
            const goBrushInfo: TuBrushInfo = new TuBrushInfo(brushInfo);
            goBrushInfo.BrushStyle = TuBrushStyle.None;
            goBrushInfo.MidColor = value;
            this.BrushInfo = goBrushInfo;
        }
    }
    //#endregion

    //#region [Property] BrushMidFraction
    public get BrushMidFraction(): float {
        return this.getBrushMidFraction();
    }

    public set BrushMidFraction(value: float) {
        this.setBrushMidFraction(value);
    }

    protected /*virtual*/ getBrushMidFraction(): float {
        const brushInfo: TuBrushInfo = this.BrushInfo;
        if (brushInfo == null) {
            return Number.NaN;
        }
        return brushInfo.MidFraction;
    }

    protected /*virtual*/ setBrushMidFraction(value: float) {
        const brushInfo: TuBrushInfo = this.BrushInfo;
        let single: float = value;
        if (!Number.isNaN(single)) {
            if (single < 0) {
                single = 0;
            }
            else if (single > 1) {
                single = 1;
            }
        }
        if (brushInfo != null && brushInfo.MidFraction !== single) {
            this.BrushInfo = new TuBrushInfo(brushInfo);
            this.BrushInfo.MidFraction = single
            return;
        }
        if (brushInfo == null && single !== Number.NaN) {
            const goBrushInfo: TuBrushInfo = new TuBrushInfo(brushInfo);
            goBrushInfo.BrushStyle = TuBrushStyle.None;
            goBrushInfo.MidFraction = single;
            this.BrushInfo = goBrushInfo;
        }
    }
    //#endregion

    //#region [Property] BrushPoint
    public get BrushPoint(): CGPoint {
        return this.getBrushPoint();
    }

    public set BrushPoint(value: CGPoint) {
        this.setBrushPoint(value);
    }

    protected /*virtual*/ getBrushPoint(): CGPoint {
        const brushInfo: TuBrushInfo = this.BrushInfo;
        if (brushInfo != null) {
            return brushInfo.Point;
        }
        return new CGPoint();
    }

    protected /*virtual*/ setBrushPoint(value: CGPoint) {
        const brushInfo: TuBrushInfo = this.BrushInfo;
        const pointF: CGPoint = value;
        if (pointF.X < -1) {
            pointF.X = -1;
        }
        else if (pointF.X > 2) {
            pointF.X = 2;
        }
        if (pointF.Y < -1) {
            pointF.Y = -1;
        }
        else if (pointF.Y > 2) {
            pointF.Y = 2;
        }
        if (brushInfo != null && brushInfo.Point.notEquals(pointF)) {
            this.BrushInfo = new TuBrushInfo(brushInfo);
            this.BrushInfo.Point = pointF
            return;
        }
        if (brushInfo == null) {
            if (!pointF.IsEmpty) {
                const goBrushInfo: TuBrushInfo = new TuBrushInfo(brushInfo);
                goBrushInfo.BrushStyle = TuBrushStyle.None;
                goBrushInfo.Point = pointF;
                this.BrushInfo = goBrushInfo;
            }
        }
    }
    //#endregion

    //#region [Property] BrushStartPoint
    public get BrushStartPoint(): CGPoint {
        return this.getBrushStartPoint();
    }

    public set BrushStartPoint(value: CGPoint) {
        this.setBrushStartPoint(value);
    }

    protected /*virtual*/ getBrushStartPoint(): CGPoint {
        const brushInfo: TuBrushInfo = this.BrushInfo;
        if (brushInfo != null) {
            return brushInfo.StartOrFocusScales;
        }
        return new CGPoint();
    }

    protected /*virtual*/ setBrushStartPoint(value: CGPoint) {
        const brushInfo: TuBrushInfo = this.BrushInfo;
        const pointF: CGPoint = value;
        if (pointF.X < -1) {
            pointF.X = -1;
        }
        else if (pointF.X > 2) {
            pointF.X = 2;
        }
        if (pointF.Y < -1) {
            pointF.Y = -1;
        }
        else if (pointF.Y > 2) {
            pointF.Y = 2;
        }
        if (brushInfo != null && brushInfo.Point !== pointF) {
            this.BrushInfo = new TuBrushInfo(brushInfo);
            this.BrushInfo.StartOrFocusScales = pointF
            return;
        }
        if (brushInfo == null) {
            if (!pointF.IsEmpty) {
                const goBrushInfo: TuBrushInfo = new TuBrushInfo(brushInfo);
                goBrushInfo.BrushStyle = TuBrushStyle.None;
                goBrushInfo.StartOrFocusScales = pointF;
                this.BrushInfo = goBrushInfo;
            }
        }
    }
    //#endregion

    //#region [Property] BrushStyle
    public get BrushStyle(): TuBrushStyle {
        return this.getBrushStyle();
    }

    public set BrushStyle(value: TuBrushStyle) {
        this.setBrushStyle(value);
    }

    protected /*virtual*/ getBrushStyle(): TuBrushStyle {
        const brushInfo: TuBrushInfo = this.BrushInfo;
        if (brushInfo == null) {
            return TuBrushStyle.None;
        }
        return brushInfo.BrushStyle;
    }

    protected /*virtual*/ setBrushStyle(value: TuBrushStyle) {
        const brushInfo: TuBrushInfo = this.BrushInfo;
        if (brushInfo != null && brushInfo.BrushStyle === value) {
            return;
        }
        if (brushInfo == null && value === TuBrushStyle.None) {
            return;
        }
        this.BrushInfo = TuShape.ModifyBrushStyle(brushInfo, value);
    }
    //#endregion

    //#region [Property] Pen

    public get Pen(): Pen {
        return this.getPen();
    }

    public set Pen(value: Pen) {
        this.setPen(value);
    }

    protected getPen(): Pen {

        if (!this.myPenInfo) {
            return undefined;
        }
        return this.myPenInfo.getPen();
    }

    protected setPen(value: Pen) {
        this.PenInfo = TuShape.GetPenInfo(value);
    }
    //#endregion

    //#region [Property] PenColor
    public get PenColor(): CGColor {
        return this.getPenColor();
    }

    public set PenColor(value: CGColor) {
        this.setPenColor(value);
    }

    protected /*virtual*/ getPenColor(): CGColor {
        const penInfo: TuPenInfo = this.PenInfo;
        if (penInfo == null) {
            return CGColor.Empty;
        }
        return penInfo.Color;
    }

    protected /*virtual*/ setPenColor(value: CGColor) {
        const penInfo: TuPenInfo = this.PenInfo;
        let goPenInfo: TuPenInfo = undefined;
        if (penInfo != null) {
            if (penInfo.Color === value) {
                return;
            }
            if (!value.IsEmpty) {
                goPenInfo = new TuPenInfo(penInfo);
                goPenInfo.Color = value
            }
        }
        else if (!value.IsEmpty) {
            goPenInfo = new TuPenInfo();
            goPenInfo.Width = this.PenWidth;
            goPenInfo.Color = value;
        }
        this.PenInfo = goPenInfo;
    }
    //#endregion

    //#region [Property] PenInfo

    public get PenInfo(): TuPenInfo {
        return this.getPenInfo();
    }

    public set PenInfo(value: TuPenInfo) {
        this.setPenInfo(value);
    }

    protected /*virtual*/ getPenInfo(): TuPenInfo {
        return this.myPenInfo;
    }

    protected /*virtual*/ setPenInfo(value: TuPenInfo) {
        const goPenInfo = this.myPenInfo;
        const goPenInfo1 = value;
        if (goPenInfo !== goPenInfo1 && (!goPenInfo || !goPenInfo.equals(goPenInfo1))) {
            this.InvalidateViews();
            this.myPenInfo = goPenInfo1;
            this.Changed(TuShapeEvents.ChangedPen, 0, goPenInfo, NullRect, 0, goPenInfo1, NullRect);
            if (this.Parent) {
                this.Parent.invalidatePaintBounds();
            }
        }
    }
    //#endregion

    //#region [Property] PenWidth

    public get PenWidth(): float {
        return this.getPenWidth();
    }

    public set PenWidth(value: float) {
        this.setPenWidth(value);
    }

    protected /*virtual*/ getPenWidth(): float {
        const penInfo: TuPenInfo = this.PenInfo;
        if (penInfo == null) {
            return 0;
        }
        return penInfo.Width;
    }

    protected /*virtual*/ setPenWidth(value: float) {
        let penInfo: TuPenInfo = this.PenInfo;
        let width: float = 0;
        if (penInfo == null) {
            penInfo = TuShape.PenInfo_Black;
        }
        else {
            width = penInfo.Width;
        }
        if (width !== value) {
            this.PenInfo = new TuPenInfo(penInfo);
            this.PenInfo.Width = value;
        }
    }
    //#endregion

    private CanonicalizeLinearGradientSpot(spot: Spot): Spot {
        if (spot.ID > 4) {
            if (spot === MiddleTop || spot === TopCenter) {
                return MiddleTop;
            }
            if (spot === MiddleLeft) {
                return MiddleLeft;
            }
        }
        else {
            if (spot === TopLeft) {
                return TopLeft;
            }
            if (spot === TopRight) {
                return TopRight;
            }
        }
        throw new ArgumentOutOfRangeException("spot", "spot must be one of: MiddleTop, MiddleLeft, TopLeft, or TopRight");
    }

    public /*override*/ ChangeValue(e: TuChangedEventArgs, undo: boolean): void {
        const subHint: number = e.SubHint;
        if (subHint === TuShapeEvents.ChangedBounds) {
            super.ChangeValue(e, undo);
            this.resetPath();
            return;
        }
        if (subHint === TuShapeEvents.ChangedPen) {
            const value: Pen | TuPenInfo = e.getValue(undo);
            if (value instanceof Pen) {
                this.Pen = value;
                return;
            }
            if (value instanceof TuPenInfo) {
                this.PenInfo = value;
            }
            return;
        }
        if (subHint !== TuShapeEvents.ChangedBrush) {
            super.ChangeValue(e, undo);
            return;
        }
        const obj: Brush | TuBrushInfo = e.getValue(undo);
        if (obj instanceof Brush) {
            this.Brush = obj;
            return;
        }
        if (obj instanceof TuBrushInfo) {
            this.BrushInfo = obj;
        }
    }

    public /* override */  ContainedByRectangle(r: CGRectangle): boolean {
        const bounds: Out<CGRectangle> = { value: this.Bounds.clone() };
        const penWidth: float = this.PenWidth;
        GeomUtilities.InflateRect(bounds, penWidth / 2, penWidth / 2);
        if (r.Width <= 0 || r.Height <= 0 || bounds.value.Width < 0 || bounds.value.Height < 0 || bounds.value.X < r.X || bounds.value.Y < r.Y || bounds.value.X + bounds.value.Width > r.X + r.Width) {
            return false;
        }
        return bounds.value.Y + bounds.value.Height <= r.Y + r.Height;
    }
    public /* override */ containsPoint(p: CGPoint): boolean {
        const bounds: Out<CGRectangle> = { value: this.Bounds.clone() };
        const penWidth: float = this.PenWidth;
        GeomUtilities.InflateRect(bounds, penWidth / 2, penWidth / 2);
        return GeomUtilities.ContainsRect(bounds.value, p);
    }

    public /* override */ copyObject(env: TuCopyDictionary): TuObject {
        const goShape: TuShape = as(super.CopyObject(env), Types.TuShape);
        if (goShape != null) {
            goShape.myPath = null;
            goShape.myBrush = null;
        }
        return goShape;
    }
    private static DarkerIntenser(c: CGColor): CGColor {
        let single: Out<float> = New.Out();
        let single1: Out<float> = New.Out();
        let single2: Out<float> = New.Out();
        let single3: Out<float> = New.Out();
        let single4: Out<float> = New.Out();
        let single5: Out<float> = New.Out();
        TuShape.RgbToHsb(c.R / 255, c.G / 255, c.B / 255, single, single1, single2);
        single2.value = single2.value / 1.4;
        if (single2.value < 0) {
            single2.value = 0;
        }
        else if (single2.value > 1) {
            single2.value = 1;
        }
        single1.value = single1.value * 1.4;
        if (single1.value < 0) {
            single1.value = 0;
        }
        else if (single1.value > 1) {
            single1.value = 1;
        }
        TuShape.HsbToRgb(single.value, single1.value, single2.value, single3, single4, single5);
        return CGColor.FromRgba(~~(single3.value * 255), ~~(single4.value * 255), ~~(single5.value * 255), ~~c.A);
    }

    public /* internal */ disposePath(path: GraphicsPath): void {
        if (path != this.myPath) {
            path.Dispose();
        }
    }
    public static DrawArc(g: Graphics, view: TuView, pen: Pen, x: float, y: float, width: float, height: float, startangle: float, sweepangle: float): void {
        try {
            if (pen != null) {
                g.drawArc(pen, x, y, width, height, startangle, sweepangle);
            }
        }
        catch (exception) {
            console.error(exception);
        }
    }
    public static DrawBezier(g: Graphics, view: TuView, pen: Pen, x1: float, y1: float, x2: float, y2: float, x3: float, y3: float, x4: float, y4: float): void {
        try {
            if (pen != null) {
                g.drawBezier(pen, x1, y1, x2, y2, x3, y3, x4, y4);
            }
        }
        catch (exception) {
            console.error(exception);
        }
    }

    public static DrawEllipse(g: Graphics, view: TuView, pen: Pen, brush: Brush, x: float, y: float, width: float, height: float): void {
        try {
            if (brush != null) {
                const linearGradientBrush: LinearGradientBrush = as(brush, GraphicTypes.LinearGradientBrush);
                if (linearGradientBrush != null) {
                    if (!TuShape.IsExtremelySmall(width, height, view)) {
                        g.translateTransform(x, y);
                        g.FillEllipse(brush, 0, 0, width, height);
                        g.translateTransform(-x, -y);
                    }
                    else {
                        const solidBrush: SolidBrush = new SolidBrush(linearGradientBrush.LinearColors[0]);
                        g.FillEllipse(solidBrush, x, y, width, height);
                        solidBrush.Dispose();
                    }
                }
                else if (brush instanceof PathGradientBrush && TuShape.IsExtremelySized(width, height, view)) {
                    const solidBrush1: SolidBrush = new SolidBrush(brush.CenterColor);
                    g.FillEllipse(solidBrush1, x, y, width, height);
                    solidBrush1.Dispose();
                }
                else if (!(brush instanceof TextureBrush)) {
                    g.FillEllipse(brush, x, y, width, height);
                }
                else {
                    g.translateTransform(x, y);
                    g.FillEllipse(brush, 0, 0, width, height);
                    g.translateTransform(-x, -y);
                }
            }
            if (pen != null) {
                g.DrawEllipse(pen, x, y, width, height);
            }
        }
        catch (exception) {
            console.error(exception);
        }
    }

    public static DrawHtmlLine(result: any[], view: TuView, pen: Pen, ax: float, ay: float, bx: float, by: float): void {
        const color = pen.Color.toString('#rrggbb');
        const width = pen.Width;

        if (ax > bx) {
            bx = ax + bx;
            ax = bx - ax;
            bx = bx - ax;
            by = ay + by;
            ay = by - ay;
            by = by - ay;
        }

        var angle = Math.atan((ay - by) / (bx - ax));
       // console.log('angle: ' + angle);

        angle = (angle * 180 / Math.PI);
     //   console.log('angle: ' + angle);
        angle = -angle;
     //   console.log('angle: ' + angle);

        var length = Math.sqrt((ax - bx) * (ax - bx) + (ay - by) * (ay - by));
        //console.log('length: ' + length);

        let style = ""
        style += "left:" + (ax) + "px;"
        style += "top:" + (ay) + "px;"
        style += "width:" + length + "px;"
        style += "height:" + width + 'px;'
        style += "background-color:" + color + ';'
        style += "position:absolute;"
        style += "transform:rotate(" + angle + "deg);"
        style += "-ms-transform:rotate(" + angle + "deg);"
        style += "transform-origin:0% 0%;"
        style += "-moz-transform:rotate(" + angle + "deg);"
        style += "-moz-transform-origin:0% 0%;"
        style += "-webkit-transform:rotate(" + angle + "deg);"
        style += "-webkit-transform-origin:0% 0%;"
        style += "-o-transform:rotate(" + angle + "deg);"
        style += "-o-transform-origin:0% 0%;"
      //  style += "-webkit-box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, .1);"
      //  style += "box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, .1);"
        //style += "z-index:99;"

        /* style['position'] = 'absolute';
        style['left'] = x1 + 'px';
        style['top'] = y1 + 'px';
        style['width'] = x1 + 'px';
        style['top'] = y1 + 'px';
        style['border-color'] = color;
        style['border-width'] = width + 'px'; */

        result.push(<div style={style}></div>);
    }

    public static DrawSvgLine(result: any[], view: TuView, pen: Pen, x1: float, y1: float, x2: float, y2: float): void {
        const color = pen.Color.toString('#rrggbb');
        const width = pen.Width;
        const style = {};

        style['stroke'] = color;
        style['stroke-width'] = width;

        result.push(<line x1={x1} y1={y1} x2={x2} y2={y2} style={style} shape-rendering="crispEdges"/>);
    }
    public static DrawLine(g: Graphics, view: TuView, pen: Pen, x1: float, y1: float, x2: float, y2: float): void {

        if (pen != null) {
            g.DrawLine(pen, x1, y1, x2, y2);
        }
    }

    public static DrawLines(g: Graphics, view: TuView, pen: Pen, points: CGPoint[]): void {
        if (pen != null) {
            g.drawLines(pen, points);
        }
    }

    public static DrawPath(g: Graphics, view: TuView, pen: Pen, brush: Brush, path: GraphicsPath) {
        try {
            if (brush != null) {
                const linearGradientBrush: LinearGradientBrush = as(brush, GraphicTypes.LinearGradientBrush);
                if (linearGradientBrush != null) {
                    const bounds: CGRectangle = path.getBounds();
                    if (!TuShape.IsExtremelySmall(bounds.Width, bounds.Height, view)) {
                        g.translateTransform(bounds.X, bounds.Y);
                        const matrix: Matrix = new Matrix(1, 0, 0, 1, -bounds.X, -bounds.Y);
                        path.transform(matrix);
                        g.fillPath(brush, path);
                        matrix.translate(bounds.X * 2, bounds.Y * 2);
                        path.transform(matrix);
                        matrix.Dispose();
                        g.translateTransform(-bounds.X, -bounds.Y);
                    }
                    else {
                        const solidBrush: Brush = new SolidBrush(linearGradientBrush.LinearColors[0]);
                        g.fillPath(solidBrush, path);
                        solidBrush.Dispose();
                    }
                }
                else if (brush instanceof PathGradientBrush) {
                    const pathGradientBrush: PathGradientBrush = as(brush, GraphicTypes.PathGradientBrush);
                    const rectangleF: CGRectangle = path.getBounds();
                    if (!TuShape.IsExtremelySized(rectangleF.Width, rectangleF.Height, view)) {
                        g.fillPath(brush, path);
                    }
                    else {
                        const solidBrush1: Brush = new SolidBrush(pathGradientBrush.CenterColor);
                        g.fillPath(solidBrush1, path);
                        solidBrush1.Dispose();
                    }
                }
                else if (!(brush instanceof TextureBrush)) {
                    g.fillPath(brush, path);
                }
                else {
                    const bounds1: CGRectangle = path.getBounds();
                    g.translateTransform(bounds1.X, bounds1.Y);
                    const matrix1: Matrix = new Matrix(1, 0, 0, 1, -bounds1.X, -bounds1.Y);
                    path.transform(matrix1);
                    g.fillPath(brush, path);
                    matrix1.translate(bounds1.X * 2, bounds1.Y * 2);
                    path.transform(matrix1);
                    matrix1.Dispose();
                    g.translateTransform(-bounds1.X, -bounds1.Y);
                }
            }
            if (pen != null) {
                g.drawPath(pen, path);
            }
        }
        catch (exception) {
            console.error(exception);
        }
    }


    public static DrawPie(g: Graphics, view: TuView, pen: Pen, brush: Brush, x: float, y: float, width: float, height: float, startangle: float, sweepangle: float): void {
        try {
            if (brush != null) {
                const linearGradientBrush: LinearGradientBrush = as(brush, GraphicTypes.LinearGradientBrush);
                if (linearGradientBrush != null) {
                    if (!TuShape.IsExtremelySmall(width, height, view)) {
                        g.translateTransform(x, y);
                        g.fillPie(brush, 0, 0, width, height, startangle, sweepangle);
                        g.translateTransform(-x, -y);
                    }
                    else {
                        const solidBrush: Brush = new SolidBrush(linearGradientBrush.LinearColors[0]);
                        g.fillPie(solidBrush, x, y, width, height, startangle, sweepangle);
                        solidBrush.Dispose();
                    }
                }
                else if (brush instanceof PathGradientBrush && TuShape.IsExtremelySized(width, height, view)) {
                    const solidBrush1: Brush = new SolidBrush(brush.CenterColor);
                    g.fillPie(solidBrush1, x, y, width, height, startangle, sweepangle);
                    solidBrush1.Dispose();
                }
                else if (!(brush instanceof TextureBrush)) {
                    g.fillPie(brush, x, y, width, height, startangle, sweepangle);
                }
                else {
                    g.translateTransform(x, y);
                    g.fillPie(brush, 0, 0, width, height, startangle, sweepangle);
                    g.translateTransform(-x, -y);
                }
            }
            if (pen != null) {
                g.drawPie(pen, x, y, width, height, startangle, sweepangle);
            }
        }
        catch (exception) {
            console.error(exception);
        }

    }

    public static DrawHtmlPolygon(result: any[], view: TuView, pen: Pen, brush: Brush, points: CGPoint[]): void {

    }

    public static DrawSvgPolygon(result: any[], view: TuView, pen: Pen, brush: Brush, points: CGPoint[]): void {
        try {
            if (brush != null && points.length > 2) {
                const linearGradientBrush: LinearGradientBrush = as(brush, GraphicTypes.LinearGradientBrush);
                if (linearGradientBrush != null) {
                    let pointF: CGPoint = points[0];
                    let x: float = pointF.X;
                    let single: float = pointF.X;
                    let y: float = pointF.Y;
                    let y1: float = pointF.Y;
                    for (let i = 1; i < points.length; i++) {
                        pointF = points[i];
                        if (pointF.X < x) {
                            x = pointF.X;
                        }
                        else if (pointF.X > single) {
                            single = pointF.X;
                        }
                        if (pointF.Y < y) {
                            y = pointF.Y;
                        }
                        else if (pointF.Y > y1) {
                            y1 = pointF.Y;
                        }
                    }
                    if (!TuShape.IsExtremelySmall(single - x, y1 - y, view)) {
                        let matrix: SvgMatrix = new SvgMatrix();
                        matrix = matrix.translate(x, y);
                        //g.translateTransform(x, y);
                        const pointFArray: CGPoint[] = points.slice();
                        let pointsString = pointFArray[0].X + ',' + pointFArray[0].Y;
                        for (let j = 0; j < pointFArray.length; j++) {
                            pointsString = ' ' + pointFArray[j].X + ',' + pointFArray[j].Y
                            /*  pointFArray[j].X = pointFArray[j].X - x;
                             pointFArray[j].Y = pointFArray[j].Y - y; */
                        }

                        const color = linearGradientBrush.LinearColors[0].toString('#rrggbb');
                        const style = {};
                        style['fill'] = color;
                        style['stroke'] = pen != null ? pen.Color.toString('#rrggbb') : 'transparent';
                        style['stroke-width'] = pen != null ? pen.Width : 0;

                        result.push(
                            <g transform={matrix.transformString}>
                                <polygon
                                    points={pointsString}
                                    style={style} />
                            </g>);
                    }
                    else {
                        //const solidBrush: Brush = new SolidBrush(linearGradientBrush.LinearColors[0]);
                        const pointFArray: CGPoint[] = points.slice();
                        let pointsString = pointFArray[0].X + ',' + pointFArray[0].Y;
                        for (let j = 0; j < pointFArray.length; j++) {
                            pointsString = ' ' + pointFArray[j].X + ',' + pointFArray[j].Y
                            /*  pointFArray[j].X = pointFArray[j].X - x;
                             pointFArray[j].Y = pointFArray[j].Y - y; */
                        }

                        const color = linearGradientBrush.LinearColors[0].toString('#rrggbb');
                        const style = {};
                        style['fill'] = color;
                        style['stroke'] = pen != null ? pen.Color.toString('#rrggbb') : 'transparent';
                        style['stroke-width'] = pen != null ? pen.Width : 0;

                        result.push(
                            <polygon
                                points={pointsString}
                                style={style} />
                        );
                    }
                }
                else if (brush instanceof PathGradientBrush) {
                    const pathGradientBrush: PathGradientBrush = brush;
                    let pointF1: CGPoint = points[0];
                    let x1: float = pointF1.X;
                    let single1: float = pointF1.X;
                    let y2: float = pointF1.Y;
                    let single2: float = pointF1.Y;
                    for (let k = 1; k < points.length; k++) {
                        pointF1 = points[k];
                        if (pointF1.X < x1) {
                            x1 = pointF1.X;
                        }
                        else if (pointF1.X > single1) {
                            single1 = pointF1.X;
                        }
                        if (pointF1.Y < y2) {
                            y2 = pointF1.Y;
                        }
                        else if (pointF1.Y > single2) {
                            single2 = pointF1.Y;
                        }
                    }
                    if (!TuShape.IsExtremelySized(single1 - x1, single2 - y2, view)) {
                        //g.fillPolygon(brush, points);
                    }
                    else {
                        const solidBrush1: Brush = new SolidBrush(pathGradientBrush.CenterColor);
                        //g.fillPolygon(solidBrush1, points);
                        solidBrush1.Dispose();
                    }
                }
                else if (!(brush instanceof TextureBrush)) {
                    //g.fillPolygon(brush, points);
                }
                else {
                    let pointF2: CGPoint = points[0];
                    let x2: float = pointF2.X;
                    let y3: float = pointF2.Y;
                    for (let l = 1; l < points.length; l++) {
                        pointF2 = points[l];
                        if (pointF2.X < x2) {
                            x2 = pointF2.X;
                        }
                        if (pointF2.Y < y3) {
                            y3 = pointF2.Y;
                        }
                    }
                    let matrix: SvgMatrix = new SvgMatrix();
                    matrix = matrix.translate(x2, y3);
                    //g.translateTransform(x, y);
                    const pointFArray: CGPoint[] = points.slice();
                    let pointsString = pointFArray[0].X + ',' + pointFArray[0].Y;
                    for (let j = 0; j < pointFArray.length; j++) {
                        pointsString = ' ' + pointFArray[j].X + ',' + pointFArray[j].Y
                        /*  pointFArray[j].X = pointFArray[j].X - x;
                         pointFArray[j].Y = pointFArray[j].Y - y; */
                    }

                    const color = linearGradientBrush.LinearColors[0].toString('#rrggbb');
                    const style = {};
                    style['fill'] = color;
                    style['stroke'] = pen != null ? pen.Color.toString('#rrggbb') : 'transparent';
                    style['stroke-width'] = pen != null ? pen.Width : 0;

                    result.push(
                        <g transform={matrix.transformString}>
                            <polygon
                                points={pointsString}
                                style={style} />
                        </g>);
                }
            }
            if (pen != null) {
                // g.drawPolygon(pen, points);
            }
        }
        catch (exception) {
            console.error(exception);
        }
    }

    public static DrawPolygon(g: Graphics, view: TuView, pen: Pen, brush: Brush, points: CGPoint[]): void {
        try {
            if (brush != null && points.length > 2) {
                const linearGradientBrush: LinearGradientBrush = as(brush, GraphicTypes.LinearGradientBrush);
                if (linearGradientBrush != null) {
                    let pointF: CGPoint = points[0];
                    let x: float = pointF.X;
                    let single: float = pointF.X;
                    let y: float = pointF.Y;
                    let y1: float = pointF.Y;
                    for (let i = 1; i < points.length; i++) {
                        pointF = points[i];
                        if (pointF.X < x) {
                            x = pointF.X;
                        }
                        else if (pointF.X > single) {
                            single = pointF.X;
                        }
                        if (pointF.Y < y) {
                            y = pointF.Y;
                        }
                        else if (pointF.Y > y1) {
                            y1 = pointF.Y;
                        }
                    }
                    if (!TuShape.IsExtremelySmall(single - x, y1 - y, view)) {
                        g.translateTransform(x, y);
                        const pointFArray: CGPoint[] = points.slice();
                        for (let j = 0; j < pointFArray.length; j++) {
                            pointFArray[j].X = pointFArray[j].X - x;
                            pointFArray[j].Y = pointFArray[j].Y - y;
                        }
                        g.fillPolygon(brush, pointFArray);
                        g.translateTransform(-x, -y);
                    }
                    else {
                        const solidBrush: Brush = new SolidBrush(linearGradientBrush.LinearColors[0]);
                        g.fillPolygon(solidBrush, points);
                        solidBrush.Dispose();
                    }
                }
                else if (brush instanceof PathGradientBrush) {
                    const pathGradientBrush: PathGradientBrush = brush;
                    let pointF1: CGPoint = points[0];
                    let x1: float = pointF1.X;
                    let single1: float = pointF1.X;
                    let y2: float = pointF1.Y;
                    let single2: float = pointF1.Y;
                    for (let k = 1; k < points.length; k++) {
                        pointF1 = points[k];
                        if (pointF1.X < x1) {
                            x1 = pointF1.X;
                        }
                        else if (pointF1.X > single1) {
                            single1 = pointF1.X;
                        }
                        if (pointF1.Y < y2) {
                            y2 = pointF1.Y;
                        }
                        else if (pointF1.Y > single2) {
                            single2 = pointF1.Y;
                        }
                    }
                    if (!TuShape.IsExtremelySized(single1 - x1, single2 - y2, view)) {
                        g.fillPolygon(brush, points);
                    }
                    else {
                        const solidBrush1: Brush = new SolidBrush(pathGradientBrush.CenterColor);
                        g.fillPolygon(solidBrush1, points);
                        solidBrush1.Dispose();
                    }
                }
                else if (!(brush instanceof TextureBrush)) {
                    g.fillPolygon(brush, points);
                }
                else {
                    let pointF2: CGPoint = points[0];
                    let x2: float = pointF2.X;
                    let y3: float = pointF2.Y;
                    for (let l = 1; l < points.length; l++) {
                        pointF2 = points[l];
                        if (pointF2.X < x2) {
                            x2 = pointF2.X;
                        }
                        if (pointF2.Y < y3) {
                            y3 = pointF2.Y;
                        }
                    }
                    g.translateTransform(x2, y3);
                    const pointFArray1: CGPoint[] = points.slice();
                    for (let m = 0; m < pointFArray1.length; m++) {
                        pointFArray1[m].X = pointFArray1[m].X - x2;
                        pointFArray1[m].Y = pointFArray1[m].Y - y3;
                    }
                    g.fillPolygon(brush, pointFArray1);
                    g.translateTransform(-x2, -y3);
                }
            }
            if (pen != null) {
                g.drawPolygon(pen, points);
            }
        }
        catch (exception) {
            console.error(exception);
        }
    }

    public static DrawHtmlRectangle(result: any[], view: TuView, pen: Pen, brush: Brush, x: float, y: float, width: float, height: float): void {
    }

    public static DrawSvgRectangle(result: any[], view: TuView, pen: Pen, brush: Brush, x: float, y: float, width: float, height: float): void {
        try {
            if (brush != null) {
                const linearGradientBrush: LinearGradientBrush = as(brush, GraphicTypes.LinearGradientBrush);
                if (linearGradientBrush != null) {
                    if (!TuShape.IsExtremelySmall(width, height, view)) {
                        /*  g.translateTransform(x, y);
                         g.FillRectangle(brush, 0, 0, width, height);
                         g.translateTransform(-x, -y); */
                    }
                    else {
                        const solidBrush: SolidBrush = new SolidBrush(linearGradientBrush.LinearColors[0]);
                        const strokeColor = pen == null ? 'transparent' : pen.Color.toString('#rrggbb');
                        const strokeWidth = pen == null ? 0 : pen.Width;
                        const style = {};
                        style['fill'] = solidBrush.Color.toString('#rrggbb');
                        style['stroke'] = strokeColor;
                        style['stroke-width'] = strokeWidth;

                        result.push(<rect
                            x={x}
                            y={y}
                            width={width}
                            height={height}
                            style={style} />);
                        //g.FillRectangle(solidBrush, x, y, width, height);
                        solidBrush.Dispose();
                    }
                }
                else if (brush instanceof PathGradientBrush && TuShape.IsExtremelySized(width, height, view)) {
                    const solidBrush1 = new SolidBrush(brush.CenterColor);

                    const strokeColor = pen == null ? 'transparent' : pen.Color.toString('#rrggbb');
                    const strokeWidth = pen == null ? 0 : pen.Width;
                    const style = {};
                    style['fill'] = solidBrush1.Color.toString('#rrggbb');
                    style['stroke'] = strokeColor;
                    style['stroke-width'] = strokeWidth;

                    result.push(<rect
                        x={x}
                        y={y}
                        width={width}
                        height={height}
                        style={style} />);

                    // g.FillRectangle(solidBrush1, x, y, width, height);
                    solidBrush1.Dispose();
                }
                else if (!(brush instanceof TextureBrush)) {
                    // g.FillRectangle(brush, x, y, width, height);
                }
                else {
                    let matrix = new SvgMatrix();
                    matrix = matrix.translate(x, y);
                    const strokeColor = pen == null ? 'transparent' : pen.Color.toString('#rrggbb');
                    const strokeWidth = pen == null ? 0 : pen.Width;
                    const style = {};
                    style['fill'] = (brush as any).Color.toString('#rrggbb');
                    style['stroke'] = strokeColor;
                    style['stroke-width'] = strokeWidth;

                    result.push(
                        <g transform={matrix.transformString}>
                            <rect
                                x={0}
                                y={0}
                                width={width}
                                height={height}
                                style={style} />
                        </g>);

                    /*  g.translateTransform(x, y);
                     g.FillRectangle(brush, 0, 0, width, height);
                     g.translateTransform(-x, -y); */
                }
            } else if (pen != null) {
                const strokeColor = pen == null ? 'transparent' : pen.Color.toString('#rrggbb');
                const strokeWidth = pen == null ? 0 : pen.Width;
                const style = {};
                style['fill'] = 'transparent';
                style['stroke'] = strokeColor;
                style['stroke-width'] = strokeWidth;

                result.push(<rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    style={style} />);
                //g.DrawRectangle(pen, x, y, width, height);
            }
        }
        catch (exception) {
            console.error(exception);
        }

    }
    public static DrawRectangle(g: Graphics, view: TuView, pen: Pen, brush: Brush, x: float, y: float, width: float, height: float): void {
        try {
            if (brush != null) {
                const linearGradientBrush: LinearGradientBrush = as(brush, GraphicTypes.LinearGradientBrush);
                if (linearGradientBrush != null) {
                    if (!TuShape.IsExtremelySmall(width, height, view)) {
                        g.translateTransform(x, y);
                        g.FillRectangle(brush, 0, 0, width, height);
                        g.translateTransform(-x, -y);
                    }
                    else {
                        const solidBrush: Brush = new SolidBrush(linearGradientBrush.LinearColors[0]);
                        g.FillRectangle(solidBrush, x, y, width, height);
                        solidBrush.Dispose();
                    }
                }
                else if (brush instanceof PathGradientBrush && TuShape.IsExtremelySized(width, height, view)) {
                    const solidBrush1 = new SolidBrush(brush.CenterColor);
                    g.FillRectangle(solidBrush1, x, y, width, height);
                    solidBrush1.Dispose();
                }
                else if (!(brush instanceof TextureBrush)) {
                    g.FillRectangle(brush, x, y, width, height);
                }
                else {
                    g.translateTransform(x, y);
                    g.FillRectangle(brush, 0, 0, width, height);
                    g.translateTransform(-x, -y);
                }
            }
            if (pen != null) {
                g.DrawRectangle(pen, x, y, width, height);
            }
        }
        catch (exception) {
            console.error(exception);
        }

    }

    public static DrawRoundedRectangle(g: Graphics, view: TuView, pen: Pen, brush: Brush, x: float, y: float, w: float, h: float, cw: float, ch: float): void {
        const graphicsPath: GraphicsPath = new GraphicsPath();
        makeRoundedRectangularPath(graphicsPath, 0, 0, new CGRectangle(x, y, w, h), new CGSize(cw, ch));
        TuShape.DrawPath(g, view, pen, brush, graphicsPath);
        graphicsPath.Dispose();
    }

    public /* override */  ExpandPaintBounds(rect: CGRectangle, view: TuView): CGRectangle {
        const penInfo: TuPenInfo = this.PenInfo;
        if (penInfo != null) {
            const single: float = Math.max(penInfo.Width, 1) / 2 * penInfo.MiterLimit + 1;
            const single1: float = single;
            const outRect: Out<CGRectangle> = { value: rect.clone() };
            GeomUtilities.InflateRect(outRect, single1 + 2, single1 + 2);
            rect = outRect.value;
        }
        if (this.Shadowed) {
            const shadowOffset: CGSize = this.GetShadowOffset(view);
            if (shadowOffset.Width >= 0) {
                rect.Width = rect.Width + shadowOffset.Width;
            }
            else {
                rect.X = rect.X + shadowOffset.Width;
                rect.Width = rect.Width - shadowOffset.Width;
            }
            if (shadowOffset.Height >= 0) {
                rect.Height = rect.Height + shadowOffset.Height;
            }
            else {
                rect.Y = rect.Y + shadowOffset.Height;
                rect.Height = rect.Height - shadowOffset.Height;
            }
        }
        return rect;
    }



    public fillDoubleEdge(start: CGColor, center: CGColor, spot: Spot): void;
    public fillDoubleEdge(start: CGColor): void;
    public fillDoubleEdge(start: CGColor, center?: CGColor, spot?: Spot): void {
        if (center == null && spot == null) {
            return this.fillDoubleEdge(start, CGColor.White, MiddleTop);
        }

        spot = this.CanonicalizeLinearGradientSpot(spot);
        let goBrushInfo: TuBrushInfo = undefined;
        if (spot.ID > 4) {
            if (spot === MiddleTop || spot !== MiddleLeft) {
                goBrushInfo = TuShape.ModifyBrushStyle(this.BrushInfo, TuBrushStyle.DoubleEdgeGradientVertical);
                goBrushInfo.ForeColor = start;
                goBrushInfo.Color = center;
                goBrushInfo.MidFraction = 0.2;
                this.BrushInfo = goBrushInfo;
                return;
            }
            goBrushInfo = TuShape.ModifyBrushStyle(this.BrushInfo, TuBrushStyle.DoubleEdgeGradientHorizontal);
            goBrushInfo.ForeColor = start;
            goBrushInfo.Color = center;
            goBrushInfo.MidFraction = 0.2;
            this.BrushInfo = goBrushInfo;
            return;
        }
        else if (spot === TopLeft) {
            goBrushInfo = TuShape.ModifyBrushStyle(this.BrushInfo, TuBrushStyle.DoubleEdgeGradientForwardDiagonal);
            goBrushInfo.ForeColor = start;
            goBrushInfo.Color = center;
            goBrushInfo.MidFraction = 0.2;
            this.BrushInfo = goBrushInfo;
            return;
        }
        else {
            if (spot !== TopRight) {
                goBrushInfo = TuShape.ModifyBrushStyle(this.BrushInfo, TuBrushStyle.DoubleEdgeGradientVertical);
                goBrushInfo.ForeColor = start;
                goBrushInfo.Color = center;
                goBrushInfo.MidFraction = 0.2;
                this.BrushInfo = goBrushInfo;
                return;
            }
            goBrushInfo = TuShape.ModifyBrushStyle(this.BrushInfo, TuBrushStyle.DoubleEdgeGradientBackwardDiagonal);
            goBrushInfo.ForeColor = start;
            goBrushInfo.Color = center;
            goBrushInfo.MidFraction = 0.2;
            this.BrushInfo = goBrushInfo;
            return;
        }
        goBrushInfo = TuShape.ModifyBrushStyle(this.BrushInfo, TuBrushStyle.DoubleEdgeGradientVertical);
        goBrushInfo.ForeColor = start;
        goBrushInfo.Color = center;
        goBrushInfo.MidFraction = 0.2;
        this.BrushInfo = goBrushInfo;

    }

    public fillEllipseGradient(start: CGColor, center: CGColor): void;
    public fillEllipseGradient(color: CGColor): void;
    public fillEllipseGradient(start: CGColor, center?: CGColor) {
        if (center == null) {
            center = TuShape.VeryLight(start);
        }
        const pointF: TuBrushInfo = TuShape.ModifyBrushStyle(this.BrushInfo, TuBrushStyle.EllipseGradient);
        pointF.ForeColor = start;
        pointF.Color = center;
        pointF.Point = new CGPoint(0.5, 0.5);
        pointF.StartOrFocusScales = new CGPoint(0, 0);
        this.BrushInfo = pointF;
    }


    public fillHalfGradient(color: CGColor): void;
    public fillHalfGradient(color: CGColor, spot: Spot): void;
    public fillHalfGradient(start: CGColor, mid: CGColor, spot: Spot): void;
    public fillHalfGradient(...args: any[]): void {
        if (args.length === 1) {
            const color: CGColor = args[0];
            const color1: CGColor = color.clone();
            this.fillMiddleGradient(TuShape.VeryLight(color), color1, color1, MiddleTop);
        } else if (args.length === 2) {
            const color: CGColor = args[0];
            const spot: Spot = args[1];
            const color1: CGColor = color.clone();
            this.fillMiddleGradient(TuShape.VeryLight(color), color1, color1, spot);
        }
    }


    public fillMiddleGradient(color: CGColor): void;
    public fillMiddleGradient(color: CGColor, spot: Spot): void;
    public fillMiddleGradient(color: CGColor, mid: CGColor, spot: Spot): void;
    public fillMiddleGradient(start: CGColor, mid: CGColor, end: CGColor, spot: Spot): void;
    public fillMiddleGradient(...args: any[]): void {
        if (args.length === 1) {
            const color: CGColor = args[0];
            this.fillMiddleGradient(TuShape.VeryLight(color), TuShape.LighterSofter(color), TuShape.VeryLight(color), MiddleTop);
        } else if (args.length === 2) {
            const color: CGColor = args[0];
            const spot: Spot = args[1];
            this.fillMiddleGradient(TuShape.VeryLight(color), TuShape.LighterSofter(color), TuShape.VeryLight(color), spot);
        } else if (args.length === 3) {
            const color: CGColor = args[0];
            const mid: CGColor = args[1];
            const spot: Spot = args[2];
            this.fillMiddleGradient(TuShape.VeryLight(color), mid, TuShape.VeryLight(color), spot);
        } else if (args.length === 4) {
            const start: CGColor = args[0];
            const mid: CGColor = args[1];
            const end: CGColor = args[2];
            let spot: Spot = args[3];

            spot = this.CanonicalizeLinearGradientSpot(spot);
            let goBrushInfo: TuBrushInfo = undefined;
            if (spot.ID > 4) {
                if (spot === MiddleTop || spot === TopCenter || spot !== MiddleLeft) {
                    goBrushInfo = TuShape.ModifyBrushStyle(this.BrushInfo, TuBrushStyle.MiddleGradientVertical);
                    goBrushInfo.ForeColor = start;
                    goBrushInfo.MidColor = mid;
                    goBrushInfo.Color = end;
                    goBrushInfo.MidFraction = 0.5;
                    this.BrushInfo = goBrushInfo;
                    return;
                }
                goBrushInfo = TuShape.ModifyBrushStyle(this.BrushInfo, TuBrushStyle.MiddleGradientHorizontal);
                goBrushInfo.ForeColor = start;
                goBrushInfo.MidColor = mid;
                goBrushInfo.Color = end;
                goBrushInfo.MidFraction = 0.5;
                this.BrushInfo = goBrushInfo;
                return;
            }
            else if (spot === TopLeft) {
                goBrushInfo = TuShape.ModifyBrushStyle(this.BrushInfo, TuBrushStyle.MiddleGradientForwardDiagonal);
                goBrushInfo.ForeColor = start;
                goBrushInfo.MidColor = mid;
                goBrushInfo.Color = end;
                goBrushInfo.MidFraction = 0.5;
                this.BrushInfo = goBrushInfo;
                return;
            }
            else {
                if (spot !== TopRight) {
                    goBrushInfo = TuShape.ModifyBrushStyle(this.BrushInfo, TuBrushStyle.MiddleGradientVertical);
                    goBrushInfo.ForeColor = start;
                    goBrushInfo.MidColor = mid;
                    goBrushInfo.Color = end;
                    goBrushInfo.MidFraction = 0.5;
                    this.BrushInfo = goBrushInfo;
                    return;
                }
                goBrushInfo = TuShape.ModifyBrushStyle(this.BrushInfo, TuBrushStyle.MiddleGradientBackwardDiagonal);
                goBrushInfo.ForeColor = start;
                goBrushInfo.MidColor = mid;
                goBrushInfo.Color = end;
                goBrushInfo.MidFraction = 0.5;
                this.BrushInfo = goBrushInfo;
                return;
            }
            goBrushInfo = TuShape.ModifyBrushStyle(this.BrushInfo, TuBrushStyle.MiddleGradientVertical);
            goBrushInfo.ForeColor = start;
            goBrushInfo.MidColor = mid;
            goBrushInfo.Color = end;
            goBrushInfo.MidFraction = 0.5;
            this.BrushInfo = goBrushInfo;
        }
    }

    public fillRectangleGradient(color: CGColor): void;
    public fillRectangleGradient(start: CGColor, center: CGColor): void;
    public fillRectangleGradient(...args: any[]): void {
        if (args.length === 1) {
            const color: CGColor = args[0];
            this.fillRectangleGradient(color, TuShape.VeryLight(color));
        } else if (args.length === 2) {
            const start: CGColor = args[0];
            const center: CGColor = args[1];

            const brushInfo: TuBrushInfo = TuShape.ModifyBrushStyle(this.BrushInfo, TuBrushStyle.RectangleGradient);
            brushInfo.ForeColor = start;
            brushInfo.Color = center;
            brushInfo.Point = new CGPoint(0.5, 0.5);
            brushInfo.StartOrFocusScales = new CGPoint(0, 0);
            this.BrushInfo = brushInfo;
        }
    }

    public fillShadedGradient(color: CGColor): void;
    public fillShadedGradient(color: CGColor, spot: Spot): void;
    public fillShadedGradient(start: CGColor, color: CGColor, spot: Spot): void;
    public fillShadedGradient(...args: any[]): void {
        if (args.length === 1) {
            const color: CGColor = args[0];
            this.fillMiddleGradient(TuShape.VeryLight(color), TuShape.LighterSofter(color), TuShape.DarkerIntenser(color), MiddleTop);
        } else if (args.length === 2) {
            const color: CGColor = args[0];
            const spot: Spot = args[1];
            this.fillMiddleGradient(TuShape.VeryLight(color), TuShape.LighterSofter(color), TuShape.DarkerIntenser(color), spot);
        } else if (args.length === 3) {
            const start: CGColor = args[0];
            const color: CGColor = args[1];
            const spot: Spot = args[2];
            this.fillMiddleGradient(start, TuShape.LighterSofter(color), TuShape.DarkerIntenser(color), spot);
        }
    }

    public fillShapeFringe(start: CGColor): void;
    public fillShapeFringe(start: CGColor, center: CGColor): void;
    public fillShapeFringe(...args: any[]): void {
        if (args.length === 1) {
            const start: CGColor = args[0];
            this.fillShapeFringe(start, CGColor.White);
        } else if (args.length === 2) {
            const start: CGColor = args[0];
            const center: CGColor = args[1];
            const goBrushInfo: TuBrushInfo = TuShape.ModifyBrushStyle(this.BrushInfo, TuBrushStyle.ShapeFringeGradient);
            goBrushInfo.ForeColor = start;
            goBrushInfo.Color = center;
            goBrushInfo.MidFraction = 0.2;
            this.BrushInfo = goBrushInfo;
        }
    }

    public fillShapeGradient(color: CGColor): void;
    public fillShapeGradient(start: CGColor, center: CGColor): void;
    public fillShapeGradient(...args: any[]): void {
        if (args.length === 1) {
            const color: CGColor = args[0];
            this.fillShapeGradient(color, TuShape.VeryLight(color));
        } else if (args.length === 2) {
            const start: CGColor = args[0];
            const center: CGColor = args[1];
            const brushInfo: TuBrushInfo = TuShape.ModifyBrushStyle(this.BrushInfo, TuBrushStyle.ShapeSimpleGradient);
            brushInfo.ForeColor = start;
            brushInfo.Color = center;
            brushInfo.StartOrFocusScales = new CGPoint(0.15, 0.15);
            this.BrushInfo = brushInfo;
        }
    }

    public fillShapeHighlight(start: CGColor): void;
    public fillShapeHighlight(start: CGColor, center: CGColor): void;
    public fillShapeHighlight(...args: any[]): void {
        if (args.length === 1) {
            const start: CGColor = args[0];
            this.fillShapeHighlight(start, CGColor.White);
        } else if (args.length === 2) {
            const start: CGColor = args[0];
            const center: CGColor = args[1];
            const brushInfo: TuBrushInfo = TuShape.ModifyBrushStyle(this.BrushInfo, TuBrushStyle.ShapeHighlightGradient);
            brushInfo.ForeColor = start;
            brushInfo.Color = center;
            brushInfo.Point = new CGPoint(0.15, 0.15);
            brushInfo.StartOrFocusScales = new CGPoint(0.1, 0.1);
            this.BrushInfo = brushInfo;
        }
    }

    public fillSimpleGradient(color: CGColor): void;
    public fillSimpleGradient(color: CGColor, spot: Spot): void;
    public fillSimpleGradient(start: CGColor, end: CGColor, spot: Spot): void;
    public fillSimpleGradient(...args: any[]): void {
        if (args.length === 1) {
            const color: CGColor = args[0];
            this.fillSimpleGradient(TuShape.VeryLight(color), color, MiddleTop);
        } else if (args.length === 2) {
            const color: CGColor = args[0];
            const spot: Spot = args[1];
            this.fillSimpleGradient(TuShape.VeryLight(color), color, spot);
        } else if (args.length === 3) {
            const start: CGColor = args[0];
            const end: CGColor = args[1];
            let spot: Spot = args[2];
            spot = this.CanonicalizeLinearGradientSpot(spot);
            let goBrushInfo: TuBrushInfo = undefined;
            if (spot.ID > 4) {
                if (spot === MiddleTop || spot === TopCenter || spot !== MiddleLeft) {
                    goBrushInfo = TuShape.ModifyBrushStyle(this.BrushInfo, TuBrushStyle.SimpleGradientVertical);
                    goBrushInfo.ForeColor = start;
                    goBrushInfo.Color = end;
                    this.BrushInfo = goBrushInfo;
                    return;
                }
                goBrushInfo = TuShape.ModifyBrushStyle(this.BrushInfo, TuBrushStyle.SimpleGradientHorizontal);
                goBrushInfo.ForeColor = start;
                goBrushInfo.Color = end;
                this.BrushInfo = goBrushInfo;
                return;
            }
            else if (spot === TopLeft) {
                goBrushInfo = TuShape.ModifyBrushStyle(this.BrushInfo, TuBrushStyle.SimpleGradientForwardDiagonal);
                goBrushInfo.ForeColor = start;
                goBrushInfo.Color = end;
                this.BrushInfo = goBrushInfo;
                return;
            }
            else {
                if (spot !== TopRight) {
                    goBrushInfo = TuShape.ModifyBrushStyle(this.BrushInfo, TuBrushStyle.SimpleGradientVertical);
                    goBrushInfo.ForeColor = start;
                    goBrushInfo.Color = end;
                    this.BrushInfo = goBrushInfo;
                    return;
                }
                goBrushInfo = TuShape.ModifyBrushStyle(this.BrushInfo, TuBrushStyle.SimpleGradientBackwardDiagonal);
                goBrushInfo.ForeColor = start;
                goBrushInfo.Color = end;
                this.BrushInfo = goBrushInfo;
                return;
            }
            goBrushInfo = TuShape.ModifyBrushStyle(this.BrushInfo, TuBrushStyle.SimpleGradientVertical);
            goBrushInfo.ForeColor = start;
            goBrushInfo.Color = end;
            this.BrushInfo = goBrushInfo;
        }
    }

    public fillSingleEdge(start: CGColor): void;
    public fillSingleEdge(start: CGColor, center: CGColor, spot: Spot): void;
    public fillSingleEdge(...args: any[]): void {
        if (args.length === 1) {
            const start: CGColor = args[0];
            this.fillSingleEdge(start, CGColor.White, MiddleTop);
        } else if (args.length === 2) {
            const start: CGColor = args[0];
            const center: CGColor = args[1];
            let spot: Spot = args[2];
            if ((spot !== MiddleTop || spot !== TopCenter) && spot !== MiddleLeft && spot !== MiddleRight && (spot !== MiddleBottom || spot !== BottomCenter)) {
                throw new ArgumentOutOfRangeException("spot", "spot must be one of: MiddleTop, MiddleLeft, MiddleRight, or MiddleBottom");
            }
            let goBrushInfo: TuBrushInfo = undefined;
            if (spot.ID <= 64) {
                if (spot !== MiddleTop || spot !== TopCenter) {
                    if (spot !== MiddleRight) {
                        goBrushInfo = TuShape.ModifyBrushStyle(this.BrushInfo, TuBrushStyle.SingleEdgeGradientTop);
                        goBrushInfo.ForeColor = start;
                        goBrushInfo.Color = center;
                        goBrushInfo.MidFraction = 0.1;
                        this.BrushInfo = goBrushInfo;
                        return;
                    }
                    goBrushInfo = TuShape.ModifyBrushStyle(this.BrushInfo, TuBrushStyle.SingleEdgeGradientRight);
                    goBrushInfo.ForeColor = start;
                    goBrushInfo.Color = center;
                    goBrushInfo.MidFraction = 0.1;
                    this.BrushInfo = goBrushInfo;
                    return;
                }
            }
            else if (spot === MiddleBottom || spot === BottomCenter) {
                goBrushInfo = TuShape.ModifyBrushStyle(this.BrushInfo, TuBrushStyle.SingleEdgeGradientBottom);
                goBrushInfo.ForeColor = start;
                goBrushInfo.Color = center;
                goBrushInfo.MidFraction = 0.1;
                this.BrushInfo = goBrushInfo;
                return;
            }
            else {
                if (spot !== MiddleLeft) {
                    goBrushInfo = TuShape.ModifyBrushStyle(this.BrushInfo, TuBrushStyle.SingleEdgeGradientTop);
                    goBrushInfo.ForeColor = start;
                    goBrushInfo.Color = center;
                    goBrushInfo.MidFraction = 0.1;
                    this.BrushInfo = goBrushInfo;
                    return;
                }
                goBrushInfo = TuShape.ModifyBrushStyle(this.BrushInfo, TuBrushStyle.SingleEdgeGradientLeft);
                goBrushInfo.ForeColor = start;
                goBrushInfo.Color = center;
                goBrushInfo.MidFraction = 0.1;
                this.BrushInfo = goBrushInfo;
                return;
            }
            goBrushInfo = TuShape.ModifyBrushStyle(this.BrushInfo, TuBrushStyle.SingleEdgeGradientTop);
            goBrushInfo.ForeColor = start;
            goBrushInfo.Color = center;
            goBrushInfo.MidFraction = 0.1;
            this.BrushInfo = goBrushInfo;
        }
    }
    public /*internal*/ static GetBrushInfo(b: Brush, shapeorpath: TuShape | GraphicsPath): TuBrushInfo {
        if (b == null) {
            return undefined;
        }
        if (TuShape.BrushInfo_Black == null) {
            TuShape.BrushInfo_Black = new TuBrushInfo(Brushes_Black);
            TuShape.BrushInfo_Gray = new TuBrushInfo(Brushes_Gray);
            TuShape.BrushInfo_LightGray = new TuBrushInfo(Brushes_LightGray);
            TuShape.BrushInfo_White = new TuBrushInfo(Brushes_White);
        }
        if (b === Brushes_Black) {
            return TuShape.BrushInfo_Black;
        }
        if (b === Brushes_Gray) {
            return TuShape.BrushInfo_Gray;
        }
        if (b === Brushes_LightGray) {
            return TuShape.BrushInfo_LightGray;
        }
        if (b === Brushes_White) {
            return TuShape.BrushInfo_White;
        }
        const goBrushInfo: TuBrushInfo = new TuBrushInfo();
        goBrushInfo.setBrush(b, shapeorpath);
        return goBrushInfo;
    }

    public /*override*/ GetNearestIntersectionPoint(p1: CGPoint, p2: CGPoint, result: Out<CGPoint>): boolean {
        const bounds: CGRectangle = this.Bounds.clone();
        const penWidth: float = this.PenWidth;
        GeomUtilities.InflateRect({ value: bounds }, penWidth / 2, penWidth / 2);
        return GeomUtilities.GetNearestIntersectionPoint(bounds, p1, p2, result);
    }


    protected getPath(): GraphicsPath {
        if (this.myPath == null) {
            this.myPath = this.makePath();
        }
        return this.myPath;
    }

    public /*internal*/ static GetPenColor(p: Pen, def: CGColor): CGColor {
        let color: CGColor;
        if (p == null) {
            return def;
        }
        try {
            color = p.Color;
        }
        catch (exception) {
            color = def;
        }
        return color;
    }

    public /*internal*/ static GetPenInfo(p: Pen): TuPenInfo {
        if (p == null) {
            return undefined;
        }
        if (TuShape.PenInfo_Black == null) {
            TuShape.PenInfo_Black = new TuPenInfo(Pens_Black);
        }
        if (p === Pens_Black) {
            return TuShape.PenInfo_Black;
        }

        const goPenInfo: TuPenInfo = new TuPenInfo();
        goPenInfo.setPen(p);
        return goPenInfo;
    }

    public /*internal*/ static GetPenWidth(pen: Pen, view: TuView): number;
    public /*internal*/ static GetPenWidth(pen: Pen): number;
    public /*internal*/ static GetPenWidth(...args: any[]): number {
        if (args.length === 1) {
            const pen: Pen = args[0];
            let width: number;
            if (!pen) {
                return 0;
            }
            try {
                width = pen.Width ? pen.Width : 0;
            }
            catch (e) {
                width = 1;
            }
            return width;
        } else if (args.length === 2) {
            const pen: Pen = args[0];
            const view: TuView = args[1];
            if (pen == null) {
                return 0;
            }
            const width: float = TuShape.GetPenInfo(pen).Width;
            if (width !== 0 || view == null || view.DocScale <= 0) {
                return width;
            }
            return 1 / view.DocScale;
        }
    }

    private static HsbToRgb(hue: float, saturation: float, brightness: float, red: Out<float>, green: Out<float>, blue: Out<float>): void {
        if (saturation === 0) {
            red.value = brightness;
            green.value = brightness;
            blue.value = brightness;
            return;
        }
        const ınt32: number = (Math.floor(hue / 60) % 6);
        const single: float = hue / 60 - ınt32;
        const single1: float = brightness * (1 - saturation);
        const single2: float = brightness * (1 - single * saturation);
        const single3: float = brightness * (1 - (1 - single) * saturation);
        switch (ınt32) {
            case 1:
                {
                    red.value = single2;
                    green.value = brightness;
                    blue.value = single1;
                    return;
                }
            case 2:
                {
                    red.value = single1;
                    green.value = brightness;
                    blue.value = single3;
                    return;
                }
            case 3:
                {
                    red.value = single1;
                    green.value = single2;
                    blue.value = brightness;
                    return;
                }
            case 4:
                {
                    red.value = single3;
                    green.value = single1;
                    blue.value = brightness;
                    return;
                }
            case 5:
                {
                    red.value = brightness;
                    green.value = single1;
                    blue.value = single2;
                    return;
                }
            default:
                {
                    red.value = brightness;
                    green.value = single3;
                    blue.value = single1;
                    return;
                }
        }
    }

    private static IsExtremelySized(w: float, h: float, view: TuView): boolean {
        const worldScale: CGSize = view.WorldScale;
        const docScale: float = view.DocScale;
        const single: float = w * h * docScale * docScale * worldScale.Width * worldScale.Height;
        if (single < 2) {
            return true;
        }
        return single > 9999999;
    }

    private static IsExtremelySmall(w: float, h: float, view: TuView): boolean {
        const worldScale: CGSize = view.WorldScale;
        const docScale: float = view.DocScale;
        return w * h * docScale * docScale * worldScale.Width * worldScale.Height < 2;
    }

    private static LighterSofter(c: CGColor): CGColor {
        let single: Out<float>;
        let single1: Out<float>;
        let single2: Out<float>;
        let single3: Out<float>;
        let single4: Out<float>;
        let single5: Out<float>;
        TuShape.RgbToHsb(c.R / 255, c.G / 255, c.B / 255, single, single1, single2);
        single2.value = single2.value * 1.4;
        if (single2.value < 0) {
            single2.value = 0;
        }
        else if (single2.value > 1) {
            single2.value = 1;
        }
        single1.value = single1.value / 1.4;
        if (single1.value < 0) {
            single1.value = 0;
        }
        else if (single1.value > 1) {
            single1.value = 1;
        }
        TuShape.HsbToRgb(single.value, single1.value, single2.value, single3, single4, single5);
        return CGColor.FromRgba(~~(single3.value * 255), ~~(single4.value * 255), ~~(single5.value * 255), ~~c.A);
    }

    public /*virtual*/  makePath(): GraphicsPath {
        const graphicsPath: GraphicsPath = new GraphicsPath(FillMode.Winding);
        graphicsPath.addRectangle(this.Bounds);
        return graphicsPath;
    }

    public static ModifyBrushStyle(info: TuBrushInfo, style: TuBrushStyle): TuBrushInfo {
        const goBrushInfo: TuBrushInfo = new TuBrushInfo(info);
        goBrushInfo.BrushStyle = style;
        switch (style) {
            case TuBrushStyle.SimpleGradientVertical:
            case TuBrushStyle.MiddleGradientVertical:
            case TuBrushStyle.SingleEdgeGradientTop:
                {
                    goBrushInfo.StartOrFocusScales = new CGPoint(0, 0);
                    goBrushInfo.Point = new CGPoint(0, 1);
                    break;
                }
            case TuBrushStyle.SimpleGradientHorizontal:
            case TuBrushStyle.MiddleGradientHorizontal:
            case TuBrushStyle.SingleEdgeGradientLeft:
                {
                    goBrushInfo.StartOrFocusScales = new CGPoint(0, 0);
                    goBrushInfo.Point = new CGPoint(1, 0);
                    break;
                }
            case TuBrushStyle.SimpleGradientForwardDiagonal:
            case TuBrushStyle.MiddleGradientForwardDiagonal:
                {
                    goBrushInfo.StartOrFocusScales = new CGPoint(0, 0);
                    goBrushInfo.Point = new CGPoint(1, 1);
                    break;
                }
            case TuBrushStyle.SimpleGradientBackwardDiagonal:
            case TuBrushStyle.MiddleGradientBackwardDiagonal:
                {
                    goBrushInfo.StartOrFocusScales = new CGPoint(1, 0);
                    goBrushInfo.Point = new CGPoint(0, 1);
                    break;
                }
            case TuBrushStyle.SingleEdgeGradientRight:
                {
                    goBrushInfo.StartOrFocusScales = new CGPoint(1, 0);
                    goBrushInfo.Point = new CGPoint(0, 0);
                    break;
                }
            case TuBrushStyle.SingleEdgeGradientBottom:
                {
                    goBrushInfo.StartOrFocusScales = new CGPoint(0, 1);
                    goBrushInfo.Point = new CGPoint(0, 0);
                    break;
                }
            case TuBrushStyle.DoubleEdgeGradientVertical:
                {
                    goBrushInfo.StartOrFocusScales = new CGPoint(0, 0);
                    goBrushInfo.Point = new CGPoint(0, 0.5);
                    break;
                }
            case TuBrushStyle.DoubleEdgeGradientHorizontal:
                {
                    goBrushInfo.StartOrFocusScales = new CGPoint(0, 0);
                    goBrushInfo.Point = new CGPoint(0.5, 0);
                    break;
                }
            case TuBrushStyle.DoubleEdgeGradientForwardDiagonal:
                {
                    goBrushInfo.StartOrFocusScales = new CGPoint(0, 0);
                    goBrushInfo.Point = new CGPoint(0.5, 0.5);
                    break;
                }
            case TuBrushStyle.DoubleEdgeGradientBackwardDiagonal:
                {
                    goBrushInfo.StartOrFocusScales = new CGPoint(1, 0);
                    goBrushInfo.Point = new CGPoint(0.5, 0.5);
                    break;
                }
            case TuBrushStyle.ShapeSimpleGradient:
                {
                    goBrushInfo.Point = new CGPoint(0.5, 0.5);
                    goBrushInfo.StartOrFocusScales = new CGPoint(0.15, 0.15);
                    break;
                }
            case TuBrushStyle.ShapeFringeGradient:
                {
                    goBrushInfo.Point = new CGPoint(0.5, 0.5);
                    goBrushInfo.StartOrFocusScales = new CGPoint(0, 0);
                    break;
                }
            case TuBrushStyle.ShapeHighlightGradient:
                {
                    goBrushInfo.Point = new CGPoint(0.15, 0.15);
                    goBrushInfo.StartOrFocusScales = new CGPoint(0.1, 0.1);
                    break;
                }
            case TuBrushStyle.RectangleGradient:
                {
                    goBrushInfo.Point = new CGPoint(0.5, 0.5);
                    goBrushInfo.StartOrFocusScales = new CGPoint(0, 0);
                    break;
                }
            case TuBrushStyle.EllipseGradient:
                {
                    goBrushInfo.Point = new CGPoint(0.5, 0.5);
                    goBrushInfo.StartOrFocusScales = new CGPoint(0, 0);
                    break;
                }
        }
        switch (style) {
            case TuBrushStyle.MiddleGradientVertical:
            case TuBrushStyle.MiddleGradientHorizontal:
            case TuBrushStyle.MiddleGradientForwardDiagonal:
            case TuBrushStyle.MiddleGradientBackwardDiagonal:
                {
                    goBrushInfo.MidBlendFactor = 1;
                    goBrushInfo.MidFraction = 0.5;
                    break;
                }
            case TuBrushStyle.SingleEdgeGradientTop:
            case TuBrushStyle.SingleEdgeGradientLeft:
            case TuBrushStyle.SingleEdgeGradientRight:
            case TuBrushStyle.SingleEdgeGradientBottom:
                {
                    goBrushInfo.MidBlendFactor = 1;
                    goBrushInfo.MidFraction = 0.1;
                    break;
                }
            case TuBrushStyle.DoubleEdgeGradientVertical:
            case TuBrushStyle.DoubleEdgeGradientHorizontal:
            case TuBrushStyle.DoubleEdgeGradientForwardDiagonal:
            case TuBrushStyle.DoubleEdgeGradientBackwardDiagonal:
                {
                    goBrushInfo.MidBlendFactor = 1;
                    goBrushInfo.MidFraction = 0.2;
                    break;
                }
            case TuBrushStyle.ShapeSimpleGradient:
            case TuBrushStyle.ShapeHighlightGradient:
                {
                    goBrushInfo.MidBlendFactor = Number.NaN;
                    goBrushInfo.MidFraction = Number.NaN;
                    break;
                }
            case TuBrushStyle.ShapeFringeGradient:
                {
                    goBrushInfo.MidBlendFactor = 1;
                    goBrushInfo.MidFraction = 0.2;
                    break;
                }
            case TuBrushStyle.RectangleGradient:
            case TuBrushStyle.EllipseGradient:
                {
                    goBrushInfo.MidBlendFactor = 0.5;
                    goBrushInfo.MidFraction = 0.5;
                    break;
                }
            default:
                {
                    goBrushInfo.MidBlendFactor = Number.NaN;
                    goBrushInfo.MidFraction = Number.NaN;
                    break;
                }
        }
        return goBrushInfo;
    }

    public static NewPen(color: CGColor, width: number): Pen {
        return new Pen(color, width);
    }

    public /*override*/  Paint(g: Graphics, view: TuView): void {
        this.paintPath(g, view, this.getPath());
    }

    public /*internal*/  paintPath(g: Graphics, view: TuView, path: GraphicsPath): void {
        const brush: Brush = this.Brush;
        const pen: Pen = this.Pen;
        if (this.Shadowed) {
            const shadowOffset: CGSize = this.GetShadowOffset(view);
            if (brush != null) {
                const shadowBrush: Brush = this.GetShadowBrush(view);
                try {
                    view.translateTransform(g, shadowOffset.Width, shadowOffset.Height);
                    TuShape.DrawPath(g, view, null, shadowBrush, path);
                }
                finally {
                    view.translateTransform(g, -shadowOffset.Width, -shadowOffset.Height);
                }
            }
            else if (pen != null) {
                const shadowPen: Pen = this.GetShadowPen(view, this.PenWidth);
                try {
                    view.translateTransform(g, shadowOffset.Width, shadowOffset.Height);
                    TuShape.DrawPath(g, view, shadowPen, null, path);
                }
                finally {
                    view.translateTransform(g, -shadowOffset.Width, -shadowOffset.Height);
                }
            }
        }
        TuShape.DrawPath(g, view, pen, brush, path);
    }

    public /*internal*/ paintPolygon(g: Graphics, view: TuView, pts: CGPoint[]): void {
        const brush: Brush = this.Brush;
        const pen: Pen = this.Pen;
        const shadowOffset: CGSize = this.GetShadowOffset(view);
        if (this.Shadowed) {
            if (brush != null) {
                const shadowBrush: Brush = this.GetShadowBrush(view);
                try {
                    view.translateTransform(g, shadowOffset.Width, shadowOffset.Height);
                    TuShape.DrawPolygon(g, view, undefined, shadowBrush, pts);
                }
                finally {
                    view.translateTransform(g, -shadowOffset.Width, -shadowOffset.Height);
                }
            }
            else if (pen != null) {
                const shadowPen: Pen = this.GetShadowPen(view, this.PenWidth);
                try {
                    view.translateTransform(g, shadowOffset.Width, shadowOffset.Height);
                    TuShape.DrawPolygon(g, view, shadowPen, undefined, pts);
                }
                finally {
                    view.translateTransform(g, -shadowOffset.Width, -shadowOffset.Height);
                }
            }
        }
        TuShape.DrawPolygon(g, view, pen, brush, pts);
    }

    protected /*virtual*/ resetPath(): void {
        if (this.myPath != null) {
            this.myPath.Dispose();
            this.myPath = undefined;
        }
        if (this.myBrush != null) {
            if (this.myBrushInfo != null && !this.myBrushInfo.HasBrush) {
                this.myBrush.Dispose();
            }
            this.myBrush = undefined;
        }
    }

    private static RgbToHsb(red: float, green: float, blue: float, outHue: Out<float>, outSaturation: Out<float>, outBrightness: Out<float>): void {
        let hue, saturation, brightness: float;

        brightness = Math.max(red, Math.max(green, blue));
        const single: float = Math.min(red, Math.min(green, blue));
        if (brightness === single) {
            hue = 0;
        }
        else if (brightness === red) {
            if (green >= blue) {
                hue = 60 * ((green - blue) / (brightness - single));
            }
            else {
                hue = 60 * ((green - blue) / (brightness - single)) + 360;
            }
        }
        else if (brightness !== green) {
            hue = 60 * ((red - green) / (brightness - single)) + 240;
        }
        else {
            hue = 60 * ((blue - red) / (brightness - single)) + 120;
        }
        if (brightness === 0) {
            saturation = 0;
            return;
        }
        saturation = (brightness - single) / brightness;

        outHue.value = hue;
        outSaturation.value = saturation;
        outBrightness.value = brightness;

    }

    public static ToBrushStyle(s: HatchStyle): TuBrushStyle {
        return (s + 256);
    }
    public static ToHatchStyle(s: TuBrushStyle): HatchStyle {
        return (s - TuBrushStyle.HatchHorizontal);
    }


    private static VeryLight(c: CGColor): CGColor {
        let single: Out<float> = New.Out();
        let single1: Out<float> = New.Out();
        let single2: Out<float> = New.Out();
        let single3: Out<float> = New.Out();
        let single4: Out<float> = New.Out();
        let single5: Out<float> = New.Out();
        TuShape.RgbToHsb(c.R / 255, c.G / 255, c.B / 255, single, single1, single2);
        TuShape.HsbToRgb(single.value, Math.min(single1.value / 2, 0.1), Math.max(1 - (1 - single2.value) / 2, 0.9), single3, single4, single5);
        return CGColor.FromRgba(~~(single3.value * 255), ~~(single4.value * 255), ~~(single5.value * 255), ~~c.A);
    }
}
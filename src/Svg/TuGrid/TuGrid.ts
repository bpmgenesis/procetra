import { TuShape } from './../TuShape/TuShape';
import { TuChangedEventArgs } from './../TuChangedEventArgs';
import { ClassInfo, float, ArgumentException, TArray, error, is, Out, as } from '@tuval/core';
import { ITuDragSnapper } from '../ITuDragSnapper';
import { Types } from '../types';
import { TuViewGridStyle } from './TuViewGridStyle';
import { CGColor, CGPoint, CGSize, CGRectangle } from '@tuval/cg';
import { Spot, NoSpot, TopLeft } from '../Spot';
import { DashStyle, Graphics, Pen, SolidBrush, Brush, Region } from '@tuval/graphics';
import { TuViewSnapStyle } from '../TuView/TuViewSnapStyle';
import { TuGridEvents } from './TuGridEvents';
import { NullRect } from '../Globals';
import { GeomUtilities } from '../GeomUtilities';
import { TuRectangle } from '../TuRectangle/TuRectangle';
import { TuObject } from '../TuObject/TuObject';
import { TuView } from '../TuView/TuView';
import { TuInputState } from '../TuInputState';
import { TuSheet } from '../TuSheet/TuSheet';
import { State } from '@tuval/forms';
import { ViewRenderingMode } from '../TuView/ViewRenderingMode';
import { TuGridSvgRenderer } from './TuGridSvgRenderer';
import { TuGridHtmlRenderer } from './TuGridHtmlRenderer';

const flagOriginRelative: number = 1048576;
const flagSnapOpaque: number = 2097152;
const flagSnapDragWhole: number = 4194304;

export interface TuGridConfig {
    [key: string]: any;
}

@ClassInfo({
    fullName: Types.TuGrid,
    instanceof: [
        Types.TuGrid,
        Types.ITuDragSnapper
    ]
})
export class TuGrid extends TuRectangle implements ITuDragSnapper {
    private static readonly flagOriginRelative: number = 1048576;
    private static readonly flagSnapOpaque: number = 2097152;
    private static readonly flagSnapDragWhole: number = 4194304;
    private /*internal*/ static readonly DefaultCellColors: CGColor[][];
    public /*internal*/  static readonly DefaultLineDashPattern: float[];
    public /*internal*/  static readonly DefaultMajorLineDashPattern: float[];

    @State()
    private myStyle: TuViewGridStyle;

    @State()
    private myOrigin: CGPoint;

    @State()
    private myCellSize: CGSize;

    @State()
    private myUnboundedSpots: Spot;

    @State()
    private myLineColor: CGColor;

    @State()
    private myMajorLineColor: CGColor;

    @State()
    private myMajorLineFrequency: CGSize;

    @State()
    private myCellColors: CGColor[][];

    @State()
    private myLineWidth: float;

    @State()
    private myLineDashStyle: DashStyle;

    @State()
    private myLineDashPattern: float[];

    @State()
    private myMajorLineWidth: float;

    @State()
    private myMajorLineDashStyle: DashStyle;

    @State()
    private myMajorLineDashPattern: float[];

    @State()
    private mySnapDrag: TuViewSnapStyle;

    @State()
    private mySnapResize: TuViewSnapStyle;

    @State()
    private mySnapCellSpot: Spot;

    @State()
    private myPaintMinorScale: float = 0;

    //#region [Property] CellColors
    public get CellColors(): CGColor[][] {
        return this.getCellColors();
    }
    public set CellColors(value: CGColor[][]) {
        this.setCellColors(value);
    }

    protected /*virtual*/ getCellColors(): CGColor[][] {
        return this.myCellColors;
    }
    protected /*virtual*/ setCellColors(value: CGColor[][]) {
        const colorArray = this.myCellColors;
        if (value != null && !TArray.Equals(colorArray, value)) {
            this.myCellColors = TArray.Clone(value);
            this.Changed(TuGridEvents.ChangedCellColors, 0, colorArray, NullRect, 0, TArray.Clone(this.myCellColors), NullRect);
        }
    }
    //#endregion

    //#region [Property] CellSize
    public get CellSize(): CGSize {
        return this.getCellSize();
    }
    public set CellSize(value: CGSize) {
        this.setCellSize(value);
    }

    protected /*virtual*/ getCellSize(): CGSize {
        return this.myCellSize;
    }
    protected /*virtual*/ setCellSize(value: CGSize) {
        const sizeF: CGSize = this.myCellSize;
        if (!sizeF.Equals(value)) {
            if (value.Width <= 0 || value.Height <= 0) {
                throw new ArgumentException("New CGSize value for TuGrid.CellSize must have positive dimensions");
            }
            this.myCellSize = value;
            this.Changed(TuGridEvents.ChangedCellSize, 0, undefined, GeomUtilities.MakeRect(sizeF), 0, undefined, GeomUtilities.MakeRect(value));
        }
    }
    //#endregion

    public get Extent(): CGRectangle {
        return this.computeInfiniteBounds(this.Bounds.clone());
    }

    public get IsUnbounded(): boolean {
        return (this.UnboundedSpots.ID & 510) !== 0;
    }

    //#region [Property] LineColor
    public get LineColor(): CGColor {
        return this.getLineColor();
    }
    public set LineColor(value: CGColor) {
        this.setLineColor(value);
    }

    protected /*virtual*/ getLineColor(): CGColor {
        return this.myLineColor;
    }
    protected /*virtual*/ setLineColor(value: CGColor) {
        const color: CGColor = this.myLineColor;
        if (!color.Equals(value)) {
            this.myLineColor = value;
            this.Changed(TuGridEvents.ChangedLineColor, 0, color, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] LineDashPattern
    public get LineDashPattern(): float[] {
        return this.getLineDashPattern();
    }
    public set LineDashPattern(value: float[]) {
        this.setLineDashPattern(value);
    }

    protected /*virtual*/ getLineDashPattern(): float[] {
        return this.myMajorLineDashPattern;
    }
    protected /*virtual*/ setLineDashPattern(value: float[]) {
        const singleArray: float[] = this.myLineDashPattern;
        if (value != null && value.length >= 2 && !TArray.Equals(singleArray, value)) {
            this.myLineDashPattern = TArray.Clone(value);
            this.Changed(TuGridEvents.ChangedLineDashPattern, 0, singleArray, NullRect, 0, TArray.Clone(value), NullRect);
        }
    }
    //#endregion

    //#region [Property] LineDashStyle
    public get LineDashStyle(): DashStyle {
        return this.getLineDashStyle();
    }
    public set LineDashStyle(value: DashStyle) {
        this.setLineDashStyle(value);
    }

    protected /*virtual*/ getLineDashStyle(): DashStyle {
        return this.myLineDashStyle;
    }
    protected /*virtual*/ setLineDashStyle(value: DashStyle) {
        const dashStyle: DashStyle = this.myLineDashStyle;
        if (dashStyle !== value) {
            this.myLineDashStyle = value;
            this.Changed(TuGridEvents.ChangedLineDashStyle, dashStyle, undefined, NullRect, value, undefined, NullRect);
        }
    }
    //#endregion

    //#region [Property] LineWidth
    public get LineWidth(): DashStyle {
        return this.getLineWidth();
    }
    public set LineWidth(value: DashStyle) {
        this.setLineWidth(value);
    }

    protected /*virtual*/ getLineWidth(): DashStyle {
        return this.myLineWidth;
    }
    protected /*virtual*/ setLineWidth(value: DashStyle) {
        const single: float = this.myLineWidth;
        if (single !== value) {
            this.myLineWidth = value;
            this.Changed(TuGridEvents.ChangedLineWidth, 0, undefined, GeomUtilities.MakeRect(single), 0, undefined, GeomUtilities.MakeRect(value));
        }
    }
    //#endregion

    //#region [Property] MajorLineColor
    public get MajorLineColor(): CGColor {
        return this.getMajorLineColor();
    }
    public set MajorLineColor(value: CGColor) {
        this.setMajorLineColor(value);
    }

    protected /*virtual*/ getMajorLineColor(): CGColor {
        return this.myMajorLineColor;
    }
    protected /*virtual*/ setMajorLineColor(value: CGColor) {
        const color: CGColor = this.myMajorLineColor;
        if (!color.Equals(value)) {
            this.myMajorLineColor = value;
            this.Changed(TuGridEvents.ChangedMajorLineColor, 0, color, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] MajorLineDashPattern
    public get MajorLineDashPattern(): float[] {
        return this.getMajorLineDashPattern();
    }
    public set MajorLineDashPattern(value: float[]) {
        this.setMajorLineDashPattern(value);
    }

    protected /*virtual*/ getMajorLineDashPattern(): float[] {
        return this.myMajorLineDashPattern;
    }
    protected /*virtual*/ setMajorLineDashPattern(value: float[]) {
        const singleArray: float[] = this.myMajorLineDashPattern;
        if (value != null && value.length >= 2 && !TArray.Equals(singleArray, value)) {
            this.myMajorLineDashPattern = TArray.Clone(value);
            this.Changed(TuGridEvents.ChangedMajorLineDashPattern, 0, singleArray, NullRect, 0, TArray.Clone(value), NullRect);
        }
    }
    //#endregion

    //#region [Property] MajorLineDashStyle
    public get MajorLineDashStyle(): DashStyle {
        return this.getMajorLineDashStyle();
    }
    public set MajorLineDashStyle(value: DashStyle) {
        this.setMajorLineDashStyle(value);
    }

    protected /*virtual*/ getMajorLineDashStyle(): DashStyle {
        return this.myMajorLineDashStyle;
    }
    protected /*virtual*/ setMajorLineDashStyle(value: DashStyle) {
        const dashStyle: DashStyle = this.myMajorLineDashStyle;
        if (dashStyle !== value) {
            this.myMajorLineDashStyle = value;
            this.Changed(TuGridEvents.ChangedMajorLineDashStyle, dashStyle, undefined, NullRect, value, undefined, NullRect);
        }
    }
    //#endregion

    //#region [Property] MajorLineFrequency
    public get MajorLineFrequency(): CGSize {
        return this.getMajorLineFrequency();
    }
    public set MajorLineFrequency(value: CGSize) {
        this.setMajorLineFrequency(value);
    }

    protected /*virtual*/ getMajorLineFrequency(): CGSize {
        return this.myMajorLineFrequency;
    }
    protected /*virtual*/ setMajorLineFrequency(value: CGSize) {
        const size: CGSize = this.myMajorLineFrequency;
        if (!size.Equals(value)) {
            this.myMajorLineFrequency = value;
            this.Changed(TuGridEvents.ChangedMajorLineFrequency, 0, size, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] MajorLineWidth
    public get MajorLineWidth(): float {
        return this.getMajorLineWidth();
    }
    public set MajorLineWidth(value: float) {
        this.setMajorLineWidth(value);
    }

    protected /*virtual*/ getMajorLineWidth(): float {
        return this.myMajorLineWidth;
    }
    protected /*virtual*/ setMajorLineWidth(value: float) {
        const single: float = this.myMajorLineWidth;
        if (single !== value) {
            this.myMajorLineWidth = value;
            this.Changed(TuGridEvents.ChangedMajorLineWidth, 0, undefined, GeomUtilities.MakeRect(single), 0, undefined, GeomUtilities.MakeRect(value));
        }
    }
    //#endregion

    //#region [Property] Origin
    public get Origin(): CGPoint {
        return this.getOrigin();
    }
    public set Origin(value: CGPoint) {
        this.setOrigin(value);
    }

    protected /*virtual*/ getOrigin(): CGPoint {
        const x: CGPoint = this.myOrigin;
        if (this.OriginRelative) {
            x.X = x.X + this.Left;
            x.Y = x.Y + this.Top;
        }
        return x;
    }
    protected /*virtual*/ setOrigin(value: CGPoint) {
        const x: CGPoint = value;
        if (this.OriginRelative) {
            x.X = x.X - this.Left;
            x.Y = x.Y - this.Top;
        }
        const pointF: CGPoint = this.myOrigin;
        if (pointF.Equals(x)) {
            this.myOrigin = x;
            this.Changed(TuGridEvents.ChangedOrigin, 0, undefined, GeomUtilities.MakeRect(pointF), 0, undefined, GeomUtilities.MakeRect(x));
        }
    }
    //#endregion

    //#region [Property] OriginRelative
    public get OriginRelative(): boolean {
        return this.getOriginRelative();
    }
    public set OriginRelative(value: boolean) {
        this.setOriginRelative(value);
    }

    protected /*virtual*/ getOriginRelative(): boolean {
        return (this.InternalFlags & flagOriginRelative) != 0;
    }
    protected /*virtual*/ setOriginRelative(value: boolean) {
        const internalFlags = (this.InternalFlags & flagOriginRelative) != 0;
        if (internalFlags !== value) {
            if (!value) {
                this.InternalFlags = this.InternalFlags & ~flagOriginRelative;
            }
            else {
                this.InternalFlags = this.InternalFlags | flagOriginRelative;
            }
            this.Changed(TuGridEvents.ChangedOriginRelative, 0, internalFlags, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] PaintMinorScale
    public get PaintMinorScale(): float {
        return this.getPaintMinorScale();
    }
    public set PaintMinorScale(value: float) {
        this.setPaintMinorScale(value);
    }

    protected /*virtual*/ getPaintMinorScale(): float {
        return this.myPaintMinorScale;
    }
    protected /*virtual*/ setPaintMinorScale(value: float) {
        const single: float = this.myPaintMinorScale;
        if (single !== value) {
            this.myPaintMinorScale = value;
            this.Changed(TuGridEvents.ChangedPaintMinorScale, 0, single, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] SnapCellSpot
    public get SnapCellSpot(): Spot {
        return this.getSnapCellSpot();
    }
    public set SnapCellSpot(value: Spot) {
        this.setSnapCellSpot(value);
    }

    protected /*virtual*/ getSnapCellSpot(): Spot {
        return this.mySnapCellSpot;
    }
    protected /*virtual*/ setSnapCellSpot(value: Spot) {
        const int32: Spot = this.mySnapCellSpot;
        if (int32 !== value) {
            this.mySnapCellSpot = value;
            this.Changed(TuGridEvents.ChangedSnapCellSpot, 0, int32, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] SnapDrag
    public get SnapDrag(): TuViewSnapStyle {
        return this.getSnapDrag();
    }
    public set SnapDrag(value: TuViewSnapStyle) {
        this.setSnapDrag(value);
    }

    protected /*virtual*/ getSnapDrag(): TuViewSnapStyle {
        return this.mySnapDrag;
    }
    protected /*virtual*/ setSnapDrag(value: TuViewSnapStyle) {
        const goViewSnapStyle: TuViewSnapStyle = this.mySnapDrag;
        if (goViewSnapStyle != value) {
            this.mySnapDrag = value;
            this.Changed(TuGridEvents.ChangedSnapDrag, goViewSnapStyle, undefined, NullRect, value, undefined, NullRect);
        }
    }
    //#endregion

    //#region [Property] SnapDragWhole
    public get SnapDragWhole(): boolean {
        return this.getSnapDragWhole();
    }
    public set SnapDragWhole(value: boolean) {
        this.setSnapDragWhole(value);
    }

    protected /*virtual*/ getSnapDragWhole(): boolean {
        return (this.InternalFlags & flagSnapDragWhole) !== 0;
    }
    protected /*virtual*/ setSnapDragWhole(value: boolean) {
        const internalFlags: boolean = (this.InternalFlags & flagSnapDragWhole) !== 0;
        if (internalFlags != value) {
            if (!value) {
                this.InternalFlags = this.InternalFlags & ~flagSnapDragWhole;
            }
            else {
                this.InternalFlags = this.InternalFlags | flagSnapDragWhole;
            }
            this.Changed(TuGridEvents.ChangedSnapDragWhole, 0, internalFlags, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] SnapOpaque
    public get SnapOpaque(): boolean {
        return this.getSnapOpaque();
    }
    public set SnapOpaque(value: boolean) {
        this.setSnapOpaque(value);
    }

    protected /*virtual*/ getSnapOpaque(): boolean {
        return (this.InternalFlags & flagSnapOpaque) !== 0;
    }
    protected /*virtual*/ setSnapOpaque(value: boolean) {
        const internalFlags: boolean = (this.InternalFlags & flagSnapOpaque) != 0;
        if (internalFlags != value) {
            if (!value) {
                this.InternalFlags = this.InternalFlags & ~flagSnapOpaque;
            }
            else {
                this.InternalFlags = this.InternalFlags | flagSnapOpaque;
            }
            this.Changed(TuGridEvents.ChangedSnapOpaque, 0, internalFlags, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] SnapResize
    public get SnapResize(): TuViewSnapStyle {
        return this.getSnapResize();
    }
    public set SnapResize(value: TuViewSnapStyle) {
        this.setSnapResize(value);
    }

    protected /*virtual*/ getSnapResize(): TuViewSnapStyle {
        return this.mySnapResize;
    }
    protected /*virtual*/ setSnapResize(value: TuViewSnapStyle) {
        const goViewSnapStyle: TuViewSnapStyle = this.mySnapResize;
        if (goViewSnapStyle !== value) {
            this.mySnapResize = value;
            this.Changed(TuGridEvents.ChangedSnapResize, goViewSnapStyle, undefined, NullRect, value, undefined, NullRect);
        }
    }
    //#endregion

    //#region [Property] Style
    public get Style(): TuViewGridStyle {
        return this.getStyle();
    }
    public set Style(value: TuViewGridStyle) {
        this.setStyle(value);
    }

    protected /*virtual*/ getStyle(): TuViewGridStyle {
        return this.myStyle;
    }
    protected /*virtual*/ setStyle(value: TuViewGridStyle) {
        const goViewGridStyle: TuViewGridStyle = this.myStyle;
        if (goViewGridStyle != value) {
            this.myStyle = value;
            this.Changed(TuGridEvents.ChangedStyle, goViewGridStyle, undefined, NullRect, value, undefined, NullRect);
        }
    }
    protected /*virtual*/ style(value?: TuViewGridStyle): TuViewGridStyle { throw error('Will Implement getter and setters'); }
    //#endregion

    //#region [Property] UnboundedSpots
    public get UnboundedSpots(): Spot {
        return this.getUnboundedSpots();
    }
    public set UnboundedSpots(value: Spot) {
        this.setUnboundedSpots(value);
    }

    protected /*virtual*/ getUnboundedSpots(): Spot {
        return this.myUnboundedSpots;
    }
    protected /*virtual*/ setUnboundedSpots(value: Spot) {
        const int32: Spot = this.myUnboundedSpots;
        if (int32 !== value) {
            this.myUnboundedSpots = value;
            this.Changed(TuGridEvents.ChangedUnboundedSpots, 0, int32, NullRect, 0, value, NullRect);
            if (this.Parent != null) {
                this.Parent.invalidatePaintBounds();
            }
            if (this.Document != null) {
                this.Document.InvalidateViews();
                return;
            }
            if (this.View != null) {
                this.View.updateView();
            }
        }

    }
    protected /*virtual*/ unboundedSpots(value?: Spot): Spot { throw error('Will Implement getter and setters'); }
    //#endregion

    protected SetupControlDefaults() {

        super.SetupControlDefaults();
        this.myStyle = TuViewGridStyle.None;
        this.myOrigin = new CGPoint(0, 0);
        this.myCellSize = new CGSize(50, 50);
        this.myUnboundedSpots = NoSpot;
        this.myLineColor = CGColor.LightGray;
        this.myMajorLineColor = CGColor.Gray;
        this.myMajorLineFrequency = new CGSize(4, 4);
        this.myCellColors = TuGrid.DefaultCellColors;
        this.myLineWidth = 1;
        this.myLineDashStyle = DashStyle.Solid;
        this.myLineDashPattern = TuGrid.DefaultLineDashPattern;
        this.myMajorLineWidth = 0;
        this.myMajorLineDashStyle = DashStyle.Solid;
        this.myMajorLineDashPattern = TuGrid.DefaultMajorLineDashPattern;
        this.mySnapDrag = TuViewSnapStyle.None;
        this.mySnapResize = TuViewSnapStyle.None;
        this.mySnapCellSpot = TopLeft;
        this.myPaintMinorScale = 0;



        // TODO: config nesnesini ayarla
        //super();
        /* if (config != null) {
            Object.assign(this, config);
        } */
        // TODO: InternalFlags düzeltilecek.
        this.InternalFlags = this.InternalFlags | 7340032;
        this.Size = new CGSize(100, 100);
        this.Pen = null;
        this.Brush = null;
    }

    public /*virtual*/ canSnapPoint(p: CGPoint, obj: TuObject, view: TuView): boolean {
        if (!this.CanView()) {
            return false;
        }
        if (view != null) {
            if (obj === this || super.isChildOf(obj)) {
                return false;
            }
            switch (!(is.typeof(view.Tool, Types.TuToolResizing)) ? this.SnapDrag : this.SnapResize) {
                case TuViewSnapStyle.None:
                    {
                        return false;
                    }
                case TuViewSnapStyle.Jump:
                    {
                        if (!view.Selection.Contains(this)) {
                            break;
                        }
                        return false;
                    }
                case TuViewSnapStyle.After:
                    {
                        if (view.LastInput.InputState === TuInputState.Finish) {
                            if (!view.Selection.Contains(this)) {
                                break;
                            }
                            return false;
                        }
                        return false;
                    }
                default:
                    {
                        if (!view.Selection.Contains(this)) {
                            break;
                        }
                        return false;
                    }
            }
        }
        const rectangleF: CGRectangle = this.computeInfiniteBounds(this.Bounds.clone());
        if (view == null || !is.typeof(view.Tool, Types.TuToolResizing) && !is.typeof(view.Tool, Types.TuToolDragging)) {
            return GeomUtilities.ContainsRect(rectangleF, p);
        }
        return GeomUtilities.ContainsRect(rectangleF, view.LastInput.DocPoint);
    }

    public /*override*/ ChangeValue(e: TuChangedEventArgs, undo: boolean): void {
        switch (e.SubHint) {
            case TuGridEvents.ChangedStyle:
                {
                    this.Style = e.getValue(undo);
                    return;
                }
            case TuGridEvents.ChangedOrigin:
                {
                    this.Origin = e.getPoint(undo);
                    return;
                }
            case TuGridEvents.ChangedOriginRelative:
                {
                    this.OriginRelative = e.getValue(undo);
                    return;
                }
            case TuGridEvents.ChangedCellSize:
                {
                    this.CellSize = e.getSize(undo);
                    return;
                }
            case TuGridEvents.ChangedLineColor:
                {
                    this.LineColor = e.getValue(undo);
                    return;
                }
            case TuGridEvents.ChangedLineWidth:
                {
                    this.LineWidth = e.getFloat(undo);
                    return;
                }
            case TuGridEvents.ChangedLineDashStyle:
                {
                    this.LineDashStyle = e.getValue(undo);
                    return;
                }
            case TuGridEvents.ChangedSnapDrag:
                {
                    this.SnapDrag = e.getValue(undo);
                    return;
                }
            case TuGridEvents.ChangedSnapResize:
                {
                    this.SnapResize = e.getValue(undo);
                    return;
                }
            case TuGridEvents.ChangedCellColors:
                {
                    this.CellColors = e.getValue(undo);
                    return;
                }
            case TuGridEvents.ChangedUnboundedSpots:
                {
                    this.UnboundedSpots = e.getValue(undo);
                    return;
                }
            case TuGridEvents.ChangedSnapDragWhole:
                {
                    this.SnapDragWhole = e.getValue(undo);
                    return;
                }
            case 1813:
                {
                    super.ChangeValue(e, undo);
                    return;
                }
            case TuGridEvents.ChangedSnapOpaque:
                {
                    this.SnapOpaque = e.getValue(undo);
                    return;
                }
            case TuGridEvents.ChangedSnapCellSpot:
                {
                    this.SnapCellSpot = e.getValue(undo);
                    return;
                }
            case TuGridEvents.ChangedMajorLineColor:
                {
                    this.MajorLineColor = e.getValue(undo);
                    return;
                }
            case TuGridEvents.ChangedMajorLineWidth:
                {
                    this.MajorLineWidth = e.getFloat(undo);
                    return;
                }
            case TuGridEvents.ChangedMajorLineDashStyle:
                {
                    this.MajorLineDashStyle = e.getValue(undo);
                    return;
                }
            case TuGridEvents.ChangedMajorLineFrequency:
                {
                    this.MajorLineFrequency = e.getValue(undo);
                    return;
                }
            case TuGridEvents.ChangedLineDashPattern:
                {
                    this.LineDashPattern = e.getValue(undo);
                    return;
                }
            case TuGridEvents.ChangedMajorLineDashPattern:
                {
                    this.MajorLineDashPattern = e.getValue(undo);
                    return;
                }
            case TuGridEvents.ChangedPaintMinorScale:
                {
                    this.PaintMinorScale = e.getValue(undo);
                    return;
                }
            default:
                {
                    super.ChangeValue(e, undo);
                    return;
                }
        }
    }

    private computeFiniteBounds(infRect: CGRectangle, viewRect: CGRectangle): CGRectangle {
        const rectangleF: Out<CGRectangle> = { value: viewRect };
        GeomUtilities.InflateRect(rectangleF, 100, 100);
        return GeomUtilities.IntersectionRect(infRect, rectangleF.value);
    }

    private computeInfiniteBounds(rect: CGRectangle): CGRectangle {
        if (!this.IsUnbounded) {
            return rect;
        }
        const single: float = 9.999E+07;
        const unboundedSpots: Spot = this.UnboundedSpots;
        if ((unboundedSpots.ID & 274) !== 0) {
            rect.X = rect.X + rect.Width - single;
            rect.Width = single;
        }
        if ((unboundedSpots.ID & 38) !== 0) {
            rect.Y = rect.Y + rect.Height - single;
            rect.Height = single;
        }
        if ((unboundedSpots.ID & 76) !== 0) {
            rect.Width = rect.Width + single;
        }
        if ((unboundedSpots.ID & 152) !== 0) {
            rect.Height = rect.Height + single;
        }
        return rect;
    }

    protected /*virtual*/ drawGridCrosses(g: Graphics, view: TuView, cross: CGSize, clipRect: CGRectangle): void {
        let flag: boolean;
        const width: float = this.CellSize.Width;
        const height: float = this.CellSize.Height;
        const lineColor: CGColor = this.LineColor;
        const majorLineColor: CGColor = this.MajorLineColor;
        const pen: Pen = new Pen(lineColor, this.LineWidth);
        const pen1: Pen = new Pen(majorLineColor, this.MajorLineWidth);
        const x: float = clipRect.X - width;
        const y: float = clipRect.Y - height;
        const single: float = clipRect.X + clipRect.Width + width;
        const y1: float = clipRect.Y + clipRect.Height + height;
        const pointF: CGPoint = this.findNearestInfiniteGridPoint(new CGPoint(x, y), 0, 0);
        const pointF1: CGPoint = this.findNearestInfiniteGridPoint(new CGPoint(single, y1), 0, 0);
        const int32: float = this.MajorLineFrequency.Width;
        const height1: float = this.MajorLineFrequency.Height;
        if (int32 > 0 && height1 > 0) {
            const x1: float = pointF.X;
            let origin: CGPoint = this.Origin;
            let int321: float = (~~Math.floor(((x1 - origin.X) / width))) % int32;
            const single1: float = pointF.Y;
            origin = this.Origin;
            let int322: number = (~~Math.floor(((single1 - origin.Y) / height))) % height1;
            if (int321 < 0) {
                int321 = (int321 + int32);
            }
            if (int322 < 0) {
                int322 = (int322 + height1);
            }
            const int323: number = int322;
            for (let i = pointF.X; i < pointF1.X; i = i + width) {
                for (let j = pointF.Y; j < pointF1.Y; j = j + height) {
                    let pen2: Pen = pen;
                    if (int321 === 0 && int322 === 0) {
                        pen2 = pen1;
                    }
                    if (view.DocScale > this.myPaintMinorScale) {
                        flag = true;
                    }
                    else {
                        flag = (int321 !== 0 ? false : int322 === 0);
                    }
                    const flag1: boolean = flag;
                    if (cross.Height > 0 && flag1) {
                        TuShape.DrawLine(g, view, pen2, i, j - cross.Height / 2, i, j + cross.Height / 2);
                    }
                    if (cross.Width > 0 && flag1) {
                        TuShape.DrawLine(g, view, pen2, i - cross.Width / 2, j, i + cross.Width / 2, j);
                    }
                    int322++;
                    if (int322 >= height1) {
                        int322 = 0;
                    }
                }
                int322 = int323;
                int321++;
                if (int321 >= int32) {
                    int321 = 0;
                }
            }
        }
        else if (view.DocScale > this.myPaintMinorScale) {
            for (let k = pointF.X; k < pointF1.X; k = k + width) {
                for (let l = pointF.Y; l < pointF1.Y; l = l + height) {
                    if (cross.Height > 0) {
                        TuShape.DrawLine(g, view, pen, k, l - cross.Height / 2, k, l + cross.Height / 2);
                    }
                    if (cross.Width > 0) {
                        TuShape.DrawLine(g, view, pen, k - cross.Width / 2, l, k + cross.Width / 2, l);
                    }
                }
            }
        }
        pen.Dispose();
        pen1.Dispose();
    }

    protected /*virtual*/ drawGridDots(g: Graphics, view: TuView, clipRect: CGRectangle): void {
        const width: float = this.CellSize.Width;
        const height: float = this.CellSize.Height;
        const lineColor: CGColor = this.LineColor;
        const majorLineColor: CGColor = this.MajorLineColor;
        let lineWidth: float = this.LineWidth;
        const pen: Pen = new Pen(lineColor, lineWidth);
        const pen1: Pen = new Pen(majorLineColor, this.MajorLineWidth);
        const x: float = clipRect.X - width;
        const y: float = clipRect.Y - height;
        const single: float = clipRect.X + clipRect.Width + width;
        const y1: float = clipRect.Y + clipRect.Height + height;
        const pointF: CGPoint = this.findNearestInfiniteGridPoint(new CGPoint(x, y), 0, 0);
        const pointF1: CGPoint = this.findNearestInfiniteGridPoint(new CGPoint(single, y1), 0, 0);
        if (lineWidth <= 0 && view != null) {
            lineWidth = 1 / view.DocScale;
        }
        const int32: number = this.MajorLineFrequency.Width;
        const height1: number = this.MajorLineFrequency.Height;
        if (int32 > 0 && height1 > 0) {
            const x1: float = pointF.X;
            let origin: CGPoint = this.Origin;
            let int321: number = (~~Math.floor(((x1 - origin.X) / width))) % int32;
            const single1: float = pointF.Y;
            origin = this.Origin;
            let int322 = (~~Math.floor(((single1 - origin.Y) / height))) % height1;
            if (int321 < 0) {
                int321 = int321 + int32;
            }
            if (int322 < 0) {
                int322 = int322 + height1;
            }
            const int323: number = int322;
            for (let i = pointF.X; i < pointF1.X; i = i + width) {
                for (let j = pointF.Y; j < pointF1.Y; j = j + height) {
                    let pen2: Pen = pen;
                    if (int321 === 0 && int322 === 0) {
                        pen2 = pen1;
                    }
                    if (view.DocScale > this.myPaintMinorScale || int321 === 0 && int322 === 0) {
                        TuShape.DrawLine(g, view, pen2, i - lineWidth / 2, j, i + lineWidth / 2, j);
                    }
                    int322++;
                    if (int322 >= height1) {
                        int322 = 0;
                    }
                }
                int322 = int323;
                int321++;
                if (int321 >= int32) {
                    int321 = 0;
                }
            }
        }
        else if (view.DocScale > this.myPaintMinorScale) {
            for (let k = pointF.X; k < pointF1.X; k = k + width) {
                for (let l = pointF.Y; l < pointF1.Y; l = l + height) {
                    TuShape.DrawLine(g, view, pen, k - lineWidth / 2, l, k + lineWidth / 2, l);
                }
            }
        }
        pen.Dispose();
        pen1.Dispose();
    }

    protected /*virtual*/ drawGridLines(g: Graphics, view: TuView, clipRect: CGRectangle) {

        let origin: CGPoint;
        const width: float = this.CellSize.Width;
        const height: float = this.CellSize.Height;
        const lineColor: CGColor = this.LineColor;
        const majorLineColor: CGColor = this.MajorLineColor;
        const pen: Pen = new Pen(lineColor, this.LineWidth);
        if (this.LineDashStyle === DashStyle.Custom) {
            pen.DashPattern = this.LineDashPattern;
        }
        pen.DashStyle = this.LineDashStyle;
        const majorLineDashPattern: Pen = new Pen(majorLineColor, this.MajorLineWidth);
        if (this.MajorLineDashStyle === DashStyle.Custom) {
            majorLineDashPattern.DashPattern = this.MajorLineDashPattern;
        }
        majorLineDashPattern.DashStyle = this.MajorLineDashStyle;
        if (pen.DashStyle !== DashStyle.Solid || majorLineDashPattern.DashStyle !== DashStyle.Solid) {
            clipRect = GeomUtilities.UnionRect(clipRect, view.DocPosition);
        }
        const x: float = clipRect.X - width;
        const y: float = clipRect.Y - height;
        const single: float = clipRect.X + clipRect.Width + width;
        const y1: float = clipRect.Y + clipRect.Height + height;
        const pointF: CGPoint = this.findNearestInfiniteGridPoint(new CGPoint(x, y), 0, 0);
        const pointF1: CGPoint = this.findNearestInfiniteGridPoint(new CGPoint(single, y1), 0, 0);
        if (this.Style !== TuViewGridStyle.HorizontalLine) {
            const int32 = this.MajorLineFrequency.Width;
            if (int32 > 0) {
                const x1: float = pointF.X;
                origin = this.Origin;
                let int321: number = (Math.floor(((x1 - origin.X) / width))) % int32;
                if (int321 < 0) {
                    int321 = int321 + int32;
                }
                for (let i = pointF.X; i < pointF1.X; i = i + width) {
                    let pen1: Pen = pen;
                    if (int321 === 0) {
                        pen1 = majorLineDashPattern;
                    }

                    if (view.DocScale > this.myPaintMinorScale || int321 == 0) {
                        TuShape.DrawLine(g, view, pen1, i, pointF.Y, i, pointF1.Y);
                    }
                    int321++;
                    if (int321 >= int32) {
                        int321 = 0;
                    }
                }
            }
            else if (view.DocScale > this.myPaintMinorScale) {
                for (let j = pointF.X; j < pointF1.X; j = j + width) {
                    TuShape.DrawLine(g, view, pen, j, pointF.Y, j, pointF1.Y);
                }
            }
        }
        if (this.Style !== TuViewGridStyle.VerticalLine) {
            const height1: number = this.MajorLineFrequency.Height;
            if (height1 > 0) {
                const single1: float = pointF.Y;
                origin = this.Origin;
                let int322: number = (Math.floor(((single1 - origin.Y) / height))) % height1;
                if (int322 < 0) {
                    int322 = int322 + height1;
                }
                for (let k = pointF.Y; k < pointF1.Y; k = k + height) {
                    let pen2: Pen = pen;
                    if (int322 === 0) {
                        pen2 = majorLineDashPattern;
                    }
                    if (view.DocScale > this.myPaintMinorScale || int322 == 0) {
                        TuShape.DrawLine(g, view, pen2, pointF.X, k, pointF1.X, k);
                    }
                    int322++;
                    if (int322 >= height1) {
                        int322 = 0;
                    }
                }
            }
            else if (view.DocScale > this.myPaintMinorScale) {
                for (let l = pointF.Y; l < pointF1.Y; l = l + height) {
                    TuShape.DrawLine(g, view, pen, pointF.X, l, pointF1.X, l);
                }
            }
        }
        pen.Dispose();
        majorLineDashPattern.Dispose();

    }

    public /*override*/ ExpandPaintBounds(rect: CGRectangle, view: TuView): CGRectangle {
        const rectangleF: CGRectangle = this.computeInfiniteBounds(rect);
        let width: Out<CGRectangle> = { value: rectangleF };
        if (view != null) {
            width.value = this.computeFiniteBounds(rectangleF, view.DocExtent);
        }
        const single: float = Math.max(this.PenWidth, 1);
        GeomUtilities.InflateRect(width, single, single);
        if (this.Shadowed) {
            const shadowOffset: CGSize = this.GetShadowOffset(view);
            if (shadowOffset.Width >= 0) {
                width.value.Width = width.value.Width + shadowOffset.Width;
            }
            else {
                width.value.X = width.value.X + shadowOffset.Width;
                width.value.Width = width.value.Width - shadowOffset.Width;
            }
            if (shadowOffset.Height >= 0) {
                width.value.Height = width.value.Height + shadowOffset.Height;
            }
            else {
                width.value.Y = width.value.Y + shadowOffset.Height;
                width.value.Height = width.value.Height - shadowOffset.Height;
            }
        }
        return width.value;
    }

    protected /*virtual*/ fillGrid(g: Graphics, view: TuView, clipRect: CGRectangle): void {
        const cellColors: CGColor[][] = this.CellColors;
        const upperBound: number = TArray.GetUpperBound(cellColors, 0) + 1;
        const int32: number = TArray.GetUpperBound(cellColors, 1) + 1;
        if (upperBound > 0 && int32 > 0 && (upperBound !== 1 || int32 !== 1 || !cellColors[0][0].Equals(CGColor.Empty))) {
            const width: float = this.CellSize.Width;
            const height: float = this.CellSize.Height;
            const x: float = clipRect.X - width;
            const y: float = clipRect.Y - height;
            const single: float = clipRect.X + clipRect.Width + width;
            const y1: float = clipRect.Y + clipRect.Height + height;
            const pointF: CGPoint = this.findNearestInfiniteGridPoint(new CGPoint(x, y), 0, 0);
            const pointF1: CGPoint = this.findNearestInfiniteGridPoint(new CGPoint(single, y1), 0, 0);
            const x1: float = pointF.X;
            let origin: CGPoint = this.Origin;
            let int321: number = (~~Math.floor(((x1 - origin.X) / width))) % upperBound;
            const single1: float = pointF.Y;
            origin = this.Origin;
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
                        TuShape.DrawRectangle(g, view, undefined, solidBrush, j, i, width, height);
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

    public /*virtual*/ findNearestGridPoint(p: CGPoint, obj: TuObject): CGPoint {
        let single: float = 0;
        let single1: float = 0;
        let single2: float = 0;
        let single3: float = 0;
        if (obj != null) {
            const location: CGPoint = obj.Location;
            single = Math.max(0, location.X - obj.Left);
            single1 = Math.max(0, obj.Right - location.X);
            single2 = Math.max(0, location.Y - obj.Top);
            single3 = Math.max(0, obj.Bottom - location.Y);
        }
        const cellSize: CGSize = this.CellSize;
        const rectangleSpotLocation: CGPoint = this.GetRectangleSpotLocation(new CGRectangle(0, 0, cellSize.Width, cellSize.Height), this.SnapCellSpot);
        const x: CGPoint = this.findNearestInfiniteGridPoint(p, rectangleSpotLocation.X, rectangleSpotLocation.Y);
        const rectangleF: CGRectangle = this.computeInfiniteBounds(this.Bounds.clone());
        if (x.X - single < rectangleF.Left) {
            x.X = x.X + cellSize.Width * (~~Math.ceil(((rectangleF.Left - (x.X - single)) / cellSize.Width)));
        }
        if (x.X + single1 > rectangleF.Right) {
            x.X = x.X - cellSize.Width * ((~~Math.ceil(((x.X + single1 - rectangleF.Right) / cellSize.Width))));
        }
        if (single1 > 0 && x.X - single < rectangleF.Left) {
            x.X = x.X + cellSize.Width * ((~~Math.ceil(((rectangleF.Left - (x.X - single)) / cellSize.Width))));
        }
        if (x.Y - single2 < rectangleF.Top) {
            x.Y = x.Y + cellSize.Height * ((~~Math.ceil(((rectangleF.Top - (x.Y - single2)) / cellSize.Height))));
        }
        if (x.Y + single3 > rectangleF.Bottom) {
            x.Y = x.Y - cellSize.Height * ((~~Math.ceil(((x.Y + single3 - rectangleF.Bottom) / cellSize.Height))));
        }
        if (single3 > 0 && x.Y - single2 < rectangleF.Top) {
            x.Y = x.Y + cellSize.Height * ((~~Math.ceil(((rectangleF.Top - (x.Y - single2)) / cellSize.Height))));
        }
        return x;
    }

    private findNearestInfiniteGridPoint(p: CGPoint, offx: float, offy: float): CGPoint {
        let x: float = p.X;
        let y: float = p.Y;
        const origin: CGPoint = this.Origin;
        const single: float = origin.X + offx;
        const y1: float = origin.Y + offy;
        const cellSize: CGSize = this.CellSize;
        const width: float = cellSize.Width;
        const height: float = cellSize.Height;
        const single1: float = Math.floor(((x - single) / width)) * width + single;
        const single2: float = Math.floor(((y - y1) / height)) * height + y1;
        let single3: float = single1;
        if (single1 + width - x < width / 2) {
            single3 = single1 + width;
        }
        let single4: float = single2;
        if (single2 + height - y < height / 2) {
            single4 = single2 + height;
        }
        return new CGPoint(single3, single4);
    }

    public /*override*/ GetShadowBrush(view: TuView): Brush {
        const parent: TuSheet = as(this.Parent, Types.TuSheet);
        if (parent != null && parent.Paper == this) {
            return parent.GetShadowBrush(view);
        }
        return super.GetShadowBrush(view);
    }

    public CreateElements(param: any): any[] {
        const view: TuView = param;
        const result = [];
        if (view.RenderingMode === ViewRenderingMode.Svg) {
            return TuGridSvgRenderer.Apply(view, this);
        } else if (view.RenderingMode === ViewRenderingMode.Html) {
            return TuGridHtmlRenderer.Apply(view, this);
        }

    }
    public /*override*/ Paint(g: Graphics, view: TuView): void {
        const clipBounds: CGRectangle = view.ClientRectangle; //g.ClipBounds;
        const rectangleF: CGRectangle = this.computeInfiniteBounds(this.Bounds.clone());
        const rectangleF1: CGRectangle = this.computeFiniteBounds(rectangleF, view.DocExtent);
        const brush: Brush = this.Brush;
        if (this.Shadowed && brush != null) {
            const shadowOffset: CGSize = this.GetShadowOffset(view);
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
                const shadowBrush: Brush = this.GetShadowBrush(view);
                if (width > 0) {
                    if (height > 0) {
                        const pointFArray: CGPoint[] = view.allocTempPointArray(6);
                        pointFArray[0] = pointF5;
                        pointFArray[1] = pointF6;
                        pointFArray[2] = pointF7;
                        pointFArray[3] = new CGPoint(x + width, y1);
                        pointFArray[4] = pointF2;
                        pointFArray[5] = new CGPoint(single, y + height);
                        TuShape.DrawPolygon(g, view, undefined, shadowBrush, pointFArray);
                        view.freeTempPointArray(pointFArray);
                    }
                    else if (height >= 0) {
                        TuShape.DrawRectangle(g, view, null, shadowBrush, pointF1.X, pointF1.Y, width, rectangleF1.Height);
                    }
                    else {
                        const pointFArray1: CGPoint[] = view.allocTempPointArray(6);
                        pointFArray1[0] = pointF4;
                        pointFArray1[1] = pointF5;
                        pointFArray1[2] = pointF6;
                        pointFArray1[3] = new CGPoint(single, y1 + height);
                        pointFArray1[4] = pointF1;
                        pointFArray1[5] = new CGPoint(x + width, y);
                        TuShape.DrawPolygon(g, view, undefined, shadowBrush, pointFArray1);
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
                        TuShape.DrawPolygon(g, view, undefined, shadowBrush, pointFArray2);
                        view.freeTempPointArray(pointFArray2);
                    }
                    else if (height >= 0) {
                        TuShape.DrawRectangle(g, view, undefined, shadowBrush, pointF4.X, pointF4.Y, -width, rectangleF1.Height);
                    }
                    else {
                        const pointFArray3: CGPoint[] = view.allocTempPointArray(6);
                        pointFArray3[0] = pointF7;
                        pointFArray3[1] = pointF4;
                        pointFArray3[2] = pointF5;
                        pointFArray3[3] = new CGPoint(single + width, y);
                        pointFArray3[4] = pointF;
                        pointFArray3[5] = new CGPoint(x, y1 + height);
                        TuShape.DrawPolygon(g, view, undefined, shadowBrush, pointFArray3);
                        view.freeTempPointArray(pointFArray3);
                    }
                }
                else if (height > 0) {
                    TuShape.DrawRectangle(g, view, undefined, shadowBrush, pointF3.X, pointF3.Y, rectangleF1.Width, height);
                }
                else if (height < 0) {
                    TuShape.DrawRectangle(g, view, undefined, shadowBrush, pointF4.X, pointF4.Y, rectangleF1.Width, -height);
                }
            }
        }
        if (brush != null) {
            TuShape.DrawRectangle(g, view, undefined, brush, rectangleF1.X, rectangleF1.Y, rectangleF1.Width, rectangleF1.Height);
        }
        const rectangleF2: CGRectangle = GeomUtilities.IntersectionRect(rectangleF1, clipBounds);
        if (rectangleF2.Width > 0 && rectangleF2.Height > 0) {
            const clip: Region = g.Clip;
            // TODO: clip kontrol edilecek, alternatif aranacak.
            //g.intersectClip(rectangleF2);
            this.fillGrid(g, view, rectangleF2);
            switch (this.Style) {
                case TuViewGridStyle.None:
                    {
                        g.Clip = clip;
                        break;
                    }
                case TuViewGridStyle.Dot:
                    {
                        this.drawGridDots(g, view, rectangleF2);
                        g.Clip = clip;
                        break;
                    }
                case TuViewGridStyle.Cross:
                    {
                        this.drawGridCrosses(g, view, new CGSize(6, 6), rectangleF2);
                        g.Clip = clip;
                        break;
                    }
                case TuViewGridStyle.Line:
                case TuViewGridStyle.HorizontalLine:
                case TuViewGridStyle.VerticalLine:
                    {
                        this.drawGridLines(g, view, rectangleF2);
                        g.Clip = clip;
                        break;
                    }
                default:
                    {
                        g.Clip = clip;
                        break;
                    }
            }
        }
        if (this.Pen != null) {
            TuShape.DrawRectangle(g, view, this.Pen, undefined, rectangleF1.X, rectangleF1.Y, rectangleF1.Width, rectangleF1.Height);
        }
    }

    public /*virtual*/ snapPoint(p: CGPoint, obj: TuObject, view: TuView): CGPoint {
        if (obj != null && view != null && this.SnapDragWhole && is.typeof(view.Tool, Types.TuToolDragging)) {
            return this.findNearestGridPoint(p, obj);
        }
        return this.findNearestGridPoint(p, undefined);
    }
}
(function staticConstructor() {

    (<any>TuGrid).DefaultCellColors = [[], []];
    (<any>TuGrid).DefaultLineDashPattern = [4, 4];
    (<any>TuGrid).DefaultMajorLineDashPattern = [4, 4];
})();
import { TuCopyDictionary } from './../TuCopyDictionary';
import { Brushes_Black, LastSpot } from './../Globals';
import { Pen, GraphicsPath, GraphicTypes, Brush, Graphics, DashStyle } from '@tuval/graphics';
import { CGPoint, CGColor, CGRectangle, CGSize } from '@tuval/cg';
import { ClassInfo, float, is, as, TArray, Out, FloatComparer, List, IEnumerator, New, ArgumentException } from '@tuval/core';
import { GeomUtilities } from '../GeomUtilities';
import { NullRect } from '../Globals';
import { TuPenInfo } from '../TuShape/TuPenInfo';
import { TuShape } from '../TuShape/TuShape';
import { Types } from '../types';
import { ArrowInfo } from './ArrowInfo';
import { TuStrokeArrowheadStyle } from './TuStrokeArrowheadStyle';
import { TuStrokeEvents } from './TuStrokeEvents';
import { TuStrokeStyle } from './TuStrokeStyle';
import { TuChangedEventArgs } from '../TuChangedEventArgs';
import { TuInputState } from '../TuInputState';
import { TuLayerCollectionEnumerator } from '../TuLayer/TuLayerCollectionEnumerator';
import { TuDocument } from '../TuDocument/TuDocument';
import { TuLayer } from '../TuLayer/TuLayer';
import { TuLayerCache } from '../TuLayer/TuLayerCache';
import { TuLayerEnumerator } from '../TuLayer/TuLayerEnumerator';
import { TuCollection } from '../TuCollection/TuCollection';
import { TuObject } from '../TuObject/TuObject';
import { TuSelection } from '../TuSelection/TuSelection';
import { TuView } from '../TuView/TuView';
import { TuLabeledLink } from '../TuLabeledLink/TuLabeledLink';

const flagStrokeArrowStart: number = 1048576;
const flagStrokeArrowEnd: number = 2097152;
const flagStrokeHighlight: number = 4194304;
const flagHighlightWhenSelected: number = 8388608;

@ClassInfo({
    fullName: Types.TuStroke,
    instanceof: [
        Types.TuStroke
    ]
})
export class TuStroke extends TuShape {

    private static myIntersections: float[];
    private myStyle: TuStrokeStyle = TuStrokeStyle.Line;
    private myPointsCount: number = 0;
    private myPoints: CGPoint[] = new Array(6);
    private myToArrowInfo: ArrowInfo;
    private myFromArrowInfo: ArrowInfo;
    private myCurviness: float = 10;
    private myHighlightPenInfo: TuPenInfo;

    //#region [Property] Curviness
    public get Curviness(): float {
        return this.getCurviness();
    }
    public set Curviness(value: float) {
        this.setCurviness(value);
    }

    protected /*virtual*/  getCurviness(): float {
        return this.myCurviness;
    }
    protected /*virtual*/ setCurviness(value: float) {
        const single: float = this.myCurviness;
        if (single !== value) {
            this.myCurviness = value;
            this.resetPath();
            this.Changed(TuStrokeEvents.ChangedCurviness, 0, undefined, GeomUtilities.MakeRect(single), 0, undefined, GeomUtilities.MakeRect(value));
        }
    }
    //#endregion

    //#region [Property] FirstPickIndex
    public get FirstPickIndex(): number {
        return this.getFirstPickIndex();
    }

    protected /*virtual*/  getFirstPickIndex(): float {
        return 0;
    }
    //#endregion

    //#region [Property] FromArrow
    public get FromArrow(): boolean {
        return this.getFromArrow();
    }
    public set FromArrow(value: boolean) {
        this.setFromArrow(value);
    }

    protected /*virtual*/  getFromArrow(): boolean {
        return (this.InternalFlags & flagStrokeArrowStart) !== 0;
    }
    protected /*virtual*/ setFromArrow(value: boolean) {
        const internalFlags: boolean = (this.InternalFlags & flagStrokeArrowStart) !== 0;
        if (internalFlags !== value) {
            if (!value) {
                this.InternalFlags = this.InternalFlags & ~flagStrokeArrowStart;
            }
            else {
                this.InternalFlags = this.InternalFlags | flagStrokeArrowStart;
            }
            this.resetPath();
            this.Changed(TuStrokeEvents.ChangedFromArrowHead, 0, internalFlags, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] FromArrowAnchorPoint
    public get FromArrowAnchorPoint(): CGPoint {
        return this.getFromArrowAnchorPoint();
    }

    protected /*virtual*/  getFromArrowAnchorPoint(): CGPoint {
        return this.getPoint(1);
    }
    //#endregion

    //#region [Property] FromArrowEndPoint
    public get FromArrowEndPoint(): CGPoint {
        return this.getFromArrowEndPoint();
    }

    protected /*virtual*/  getFromArrowEndPoint(): CGPoint {
        return this.getPoint(0);
    }
    //#endregion

    //#region [Property] FromArrowFilled
    public get FromArrowFilled(): boolean {
        return this.getFromArrowFilled();
    }
    public set FromArrowFilled(value: boolean) {
        this.setFromArrowFilled(value);
    }

    protected /*virtual*/  getFromArrowFilled(): boolean {
        if (this.myFromArrowInfo == null) {
            return true;
        }
        return this.myFromArrowInfo.Filled;
    }
    protected /*virtual*/ setFromArrowFilled(value: boolean) {
        let flag: boolean;
        flag = (this.myFromArrowInfo == null ? true : this.myFromArrowInfo.Filled);
        if (flag !== value) {
            if (this.myFromArrowInfo == null) {
                this.myFromArrowInfo = new ArrowInfo();
            }
            this.myFromArrowInfo.Filled = value;
            this.Changed(TuStrokeEvents.ChangedFromArrowFilled, 0, flag, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] FromArrowLength
    public get FromArrowLength(): float {
        return this.getFromArrowLength();
    }
    public set FromArrowLength(value: float) {
        this.setFromArrowLength(value);
    }

    protected /*virtual*/  getFromArrowLength(): float {

        if (this.myFromArrowInfo == null) {
            return 10;
        }
        return this.myFromArrowInfo.ArrowLength;
    }
    protected /*virtual*/ setFromArrowLength(value: float) {
        let single: float;
        single = (this.myFromArrowInfo == null ? 10 : this.myFromArrowInfo.ArrowLength);
        if (single != value) {
            if (this.myFromArrowInfo == null) {
                this.myFromArrowInfo = new ArrowInfo();
            }
            this.myFromArrowInfo.ArrowLength = value;
            this.resetPath();
            this.Changed(TuStrokeEvents.ChangedFromArrowLength, 0, undefined, GeomUtilities.MakeRect(single), 0, undefined, GeomUtilities.MakeRect(value));
        }
    }
    //#endregion

    //#region [Property] FromArrowShaftLength
    public get FromArrowShaftLength(): float {
        return this.getFromArrowShaftLength();
    }
    public set FromArrowShaftLength(value: float) {
        this.setFromArrowShaftLength(value);
    }

    protected /*virtual*/  getFromArrowShaftLength(): float {
        if (this.myFromArrowInfo == null) {
            return 8;
        }
        return this.myFromArrowInfo.ShaftLength;

    }
    protected /*virtual*/ setFromArrowShaftLength(value: float) {
        let single: float;
        single = (this.myFromArrowInfo == null ? 8 : this.myFromArrowInfo.ShaftLength);
        if (single != value) {
            if (this.myFromArrowInfo == null) {
                this.myFromArrowInfo = new ArrowInfo();
            }
            this.myFromArrowInfo.ShaftLength = value;
            this.resetPath();
            this.Changed(TuStrokeEvents.ChangedFromArrowShaftLength, 0, undefined, GeomUtilities.MakeRect(single), 0, undefined, GeomUtilities.MakeRect(value));
        }
    }
    //#endregion

    //#region [Property] FromArrowStyle
    public get FromArrowStyle(): TuStrokeArrowheadStyle {
        return this.getFromArrowStyle();
    }
    public set FromArrowStyle(value: TuStrokeArrowheadStyle) {
        this.setFromArrowStyle(value);
    }

    protected /*virtual*/  getFromArrowStyle(): TuStrokeArrowheadStyle {

        if (this.myFromArrowInfo == null) {
            return TuStrokeArrowheadStyle.Polygon;
        }
        return this.myFromArrowInfo.Style;
    }
    protected /*virtual*/ setFromArrowStyle(value: TuStrokeArrowheadStyle) {
        let goStrokeArrowheadStyle: TuStrokeArrowheadStyle;
        goStrokeArrowheadStyle = (this.myFromArrowInfo == null ? TuStrokeArrowheadStyle.Polygon : this.myFromArrowInfo.Style);
        if (goStrokeArrowheadStyle !== value) {
            if (this.myFromArrowInfo == null) {
                this.myFromArrowInfo = new ArrowInfo();
            }
            this.myFromArrowInfo.Style = value;
            this.resetPath();
            this.Changed(TuStrokeEvents.ChangedFromArrowStyle, 0, goStrokeArrowheadStyle, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] FromArrowWidth
    public get FromArrowWidth(): float {
        return this.getFromArrowWidth();
    }
    public set FromArrowWidth(value: float) {
        this.setFromArrowWidth(value);
    }

    protected /*virtual*/  getFromArrowWidth(): float {

        if (this.myFromArrowInfo == null) {
            return 8;
        }
        return this.myFromArrowInfo.Width;
    }
    protected /*virtual*/ setFromArrowWidth(value: float) {
        let single: float;
        single = (this.myFromArrowInfo == null ? 8 : this.myFromArrowInfo.Width);
        if (single !== value) {
            if (this.myFromArrowInfo == null) {
                this.myFromArrowInfo = new ArrowInfo();
            }
            this.myFromArrowInfo.Width = value;
            this.Changed(TuStrokeEvents.ChangedFromArrowWidth, 0, undefined, GeomUtilities.MakeRect(single), 0, undefined, GeomUtilities.MakeRect(value));
        }
    }
    //#endregion

    //#region [Property] Highlight
    public get Highlight(): boolean {
        return this.getHighlight();
    }
    public set Highlight(value: boolean) {
        this.setHighlight(value);
    }

    protected /*virtual*/  getHighlight(): boolean {
        return (this.InternalFlags & flagStrokeHighlight) !== 0;
    }
    protected /*virtual*/ setHighlight(value: boolean) {
        const internalFlags: boolean = (this.InternalFlags & flagStrokeHighlight) !== 0;
        if (internalFlags !== value) {
            if (!value) {
                this.InternalFlags = this.InternalFlags & ~flagStrokeHighlight;
            }
            else {
                this.InternalFlags = this.InternalFlags | flagStrokeHighlight;
            }
            this.Changed(TuStrokeEvents.ChangedHighlight, 0, internalFlags, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] HighlightPen
    public get HighlightPen(): Pen {
        return this.getHighlightPen();
    }
    public set HighlightPen(value: Pen) {
        this.setHighlightPen(value);
    }

    protected /*virtual*/  getHighlightPen(): Pen {
        if (this.HighlightPenInfo == null) {
            return null;
        }
        return this.HighlightPenInfo.getPen();
    }
    protected /*virtual*/ setHighlightPen(value: Pen) {
        this.HighlightPenInfo = TuShape.GetPenInfo(value);
    }
    //#endregion

    //#region [Property] HighlightPenColor
    public get HighlightPenColor(): CGColor {
        return this.getHighlightPenColor();
    }
    public set HighlightPenColor(value: CGColor) {
        this.setHighlightPenColor(value);
    }

    protected /*virtual*/  getHighlightPenColor(): CGColor {
        const highlightPenInfo: TuPenInfo = this.HighlightPenInfo;
        if (highlightPenInfo == null) {
            return CGColor.Empty;
        }
        return highlightPenInfo.Color;
    }
    protected /*virtual*/ setHighlightPenColor(value: CGColor) {
        const highlightPenInfo: TuPenInfo = this.HighlightPenInfo;
        let goPenInfo: TuPenInfo = undefined;
        if (highlightPenInfo != null) {
            if (highlightPenInfo.Color.Equals(value)) {
                return;
            }
            if (value != CGColor.Empty) {
                goPenInfo = new TuPenInfo(highlightPenInfo)
                goPenInfo.Color = value;
            }
        }
        else if (value.notEquals(CGColor.Empty)) {
            goPenInfo = new TuPenInfo();
            goPenInfo.Width = this.HighlightPenWidth;
            goPenInfo.Color = value;

        }
        this.HighlightPenInfo = goPenInfo;
    }
    //#endregion

     //#region [Property] HighlightPenInfo
     /* internal */ get HighlightPenInfo(): TuPenInfo {
        return this.getHighlightPenInfo();
    }
    /* internal */ set HighlightPenInfo(value: TuPenInfo) {
        this.setHighlightPenInfo(value);
    }

    protected /*virtual*/  getHighlightPenInfo(): TuPenInfo {
        return this.myHighlightPenInfo;
    }
    protected /*virtual*/ setHighlightPenInfo(value: TuPenInfo) {
        const goPenInfo: TuPenInfo = this.myHighlightPenInfo;
        const goPenInfo1: TuPenInfo = value;
        if (goPenInfo != goPenInfo1 && (goPenInfo == null || !goPenInfo.equals(goPenInfo1))) {
            this.InvalidateViews();
            this.myHighlightPenInfo = goPenInfo1;
            this.Changed(TuStrokeEvents.ChangedHighlightPen, 0, goPenInfo, NullRect, 0, goPenInfo1, NullRect);
            if (this.Parent != null) {
                this.Parent.invalidatePaintBounds();
            }
        }
    }
    //#endregion

    //#region [Property] HighlightPenWidth
    public get HighlightPenWidth(): float {
        return this.getHighlightPenWidth();
    }
    public set HighlightPenWidth(value: float) {
        this.setHighlightPenWidth(value);
    }

    protected /*virtual*/  getHighlightPenWidth(): float {
        const highlightPenInfo: TuPenInfo = this.HighlightPenInfo;
        if (highlightPenInfo == null) {
            return 0;
        }
        return highlightPenInfo.Width;
    }
    protected /*virtual*/ setHighlightPenWidth(value: float) {
        let highlightPenInfo: TuPenInfo = this.HighlightPenInfo;
        let width: float = 0;
        if (highlightPenInfo == null) {
            highlightPenInfo = TuShape.PenInfo_Black;
        }
        else {
            width = highlightPenInfo.Width;
        }
        if (width !== value) {
            const hpi = new TuPenInfo(highlightPenInfo);
            hpi.Width = value;
            this.HighlightPenInfo = hpi;
        }
    }
    //#endregion

    //#region [Property] HighlightWhenSelected
    public get HighlightWhenSelected(): boolean {
        return this.getHighlightWhenSelected();
    }
    public set HighlightWhenSelected(value: boolean) {
        this.setHighlightWhenSelected(value);
    }

    protected /*virtual*/  getHighlightWhenSelected(): boolean {
        return (this.InternalFlags & flagHighlightWhenSelected) !== 0;
    }
    protected /*virtual*/ setHighlightWhenSelected(value: boolean) {
        const internalFlags: boolean = (this.InternalFlags & flagHighlightWhenSelected) != 0;
        if (internalFlags != value) {
            if (!value) {
                this.InternalFlags = this.InternalFlags & ~flagHighlightWhenSelected;
            }
            else {
                this.InternalFlags = this.InternalFlags | flagHighlightWhenSelected;
            }
            this.Changed(TuStrokeEvents.ChangedHighlightWhenSelected, 0, internalFlags, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] LastPickIndex
    public get LastPickIndex(): number {
        return this.getLastPickIndex();
    }

    protected /*virtual*/  getLastPickIndex(): number {
        return this.PointsCount - 1;
    }
    //#endregion

    //#region [Property] PickMargin
    public get PickMargin(): number {
        return this.getPickMargin();
    }

    protected /*virtual*/  getPickMargin(): number {
        return 3;
    }
    //#endregion

    //#region [Property] PointsCount
    public get PointsCount(): number {
        return this.getPointsCount();
    }

    protected /*virtual*/  getPointsCount(): number {
        return this.myPointsCount;
    }
    //#endregion

    //#region [Property] Style
    public get Style(): TuStrokeStyle {
        return this.getStyle();
    }
    public set Style(value: TuStrokeStyle) {
        this.setStyle(value);
    }

    protected /*virtual*/  getStyle(): TuStrokeStyle {
        return this.myStyle;
    }
    protected /*virtual*/ setStyle(value: TuStrokeStyle) {
        const goStrokeStyle: TuStrokeStyle = this.myStyle;
        if (goStrokeStyle !== value) {
            this.myStyle = value;
            this.resetPath();
            if (!this.Initializing) {
                this.InvalidBounds = true;
            }
            this.Changed(TuStrokeEvents.ChangedStyle, 0, goStrokeStyle, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] ToArrow
    public get ToArrow(): boolean {
        return this.getToArrow();
    }
    public set ToArrow(value: boolean) {
        this.setToArrow(value);
    }

    protected /*virtual*/  getToArrow(): boolean {
        return (this.InternalFlags & flagStrokeArrowEnd) !== 0;
    }
    protected /*virtual*/ setToArrow(value: boolean) {
        const internalFlags: boolean = (this.InternalFlags & flagStrokeArrowEnd) !== 0;
        if (internalFlags !== value) {
            if (!value) {
                this.InternalFlags = this.InternalFlags & ~flagStrokeArrowEnd;
            }
            else {
                this.InternalFlags = this.InternalFlags | flagStrokeArrowEnd;
            }
            this.resetPath();
            this.Changed(TuStrokeEvents.ChangedToArrowHead, 0, internalFlags, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] ToArrowAnchorPoint
    public get ToArrowAnchorPoint(): CGPoint {
        return this.getToArrowAnchorPoint();
    }

    protected /*virtual*/  getToArrowAnchorPoint(): CGPoint {
        return this.getPoint(this.PointsCount - 2);
    }

    //#endregion

    //#region [Property] ToArrowEndPoint
    public get ToArrowEndPoint(): CGPoint {
        return this.getToArrowEndPoint();
    }

    protected /*virtual*/  getToArrowEndPoint(): CGPoint {
        return this.getPoint(this.PointsCount - 1);
    }

    //#endregion

    //#region [Property] ToArrowFilled
    public get ToArrowFilled(): boolean {
        return this.getToArrowFilled();
    }
    public set ToArrowFilled(value: boolean) {
        this.setToArrowFilled(value);
    }

    protected /*virtual*/  getToArrowFilled(): boolean {
        if (this.myToArrowInfo == null) {
            return true;
        }
        return this.myToArrowInfo.Filled;
    }
    protected /*virtual*/ setToArrowFilled(value: boolean) {
        let flag: boolean;
        flag = (this.myToArrowInfo == null ? true : this.myToArrowInfo.Filled);
        if (flag !== value) {
            if (this.myToArrowInfo == null) {
                this.myToArrowInfo = new ArrowInfo();
            }
            this.myToArrowInfo.Filled = value;
            this.Changed(TuStrokeEvents.ChangedToArrowFilled, 0, flag, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] ToArrowLength
    public get ToArrowLength(): float {
        return this.getToArrowLength();
    }
    public set ToArrowLength(value: float) {
        this.setToArrowLength(value);
    }

    protected /*virtual*/  getToArrowLength(): float {
        if (this.myToArrowInfo == null) {
            return 10;
        }
        return this.myToArrowInfo.ArrowLength;
    }
    protected /*virtual*/ setToArrowLength(value: float) {
        let single: float;
        single = (this.myToArrowInfo == null ? 10 : this.myToArrowInfo.ArrowLength);
        if (single !== value) {
            if (this.myToArrowInfo == null) {
                this.myToArrowInfo = new ArrowInfo();
            }
            this.myToArrowInfo.ArrowLength = value;
            this.resetPath();
            this.Changed(TuStrokeEvents.ChangedToArrowLength, 0, undefined, GeomUtilities.MakeRect(single), 0, undefined, GeomUtilities.MakeRect(value));
        }
    }
    //#endregion

    //#region [Property] ToArrowShaftLength
    public get ToArrowShaftLength(): float {
        return this.getToArrowShaftLength();
    }
    public set ToArrowShaftLength(value: float) {
        this.setToArrowShaftLength(value);
    }

    protected /*virtual*/  getToArrowShaftLength(): float {
        if (this.myToArrowInfo == null) {
            return 8;
        }
        return this.myToArrowInfo.ShaftLength;
    }
    protected /*virtual*/ setToArrowShaftLength(value: float) {
        let single: float;
        single = (this.myToArrowInfo == null ? 8 : this.myToArrowInfo.ShaftLength);
        if (single !== value) {
            if (this.myToArrowInfo == null) {
                this.myToArrowInfo = new ArrowInfo();
            }
            this.myToArrowInfo.ShaftLength = value;
            this.resetPath();
            this.Changed(TuStrokeEvents.ChangedToArrowShaftLength, 0, undefined, GeomUtilities.MakeRect(single), 0, undefined, GeomUtilities.MakeRect(value));
        }
    }
    //#endregion

    //#region [Property] ToArrowStyle
    public get ToArrowStyle(): TuStrokeArrowheadStyle {
        return this.getToArrowStyle();
    }
    public set ToArrowStyle(value: TuStrokeArrowheadStyle) {
        this.setToArrowStyle(value);
    }

    protected /*virtual*/  getToArrowStyle(): TuStrokeArrowheadStyle {
        if (this.myToArrowInfo == null) {
            return TuStrokeArrowheadStyle.Polygon;
        }
        return this.myToArrowInfo.Style;
    }
    protected /*virtual*/ setToArrowStyle(value: TuStrokeArrowheadStyle) {
        let goStrokeArrowheadStyle: TuStrokeArrowheadStyle;
        goStrokeArrowheadStyle = (this.myToArrowInfo == null ? TuStrokeArrowheadStyle.Polygon : this.myToArrowInfo.Style);
        if (goStrokeArrowheadStyle !== value) {
            if (this.myToArrowInfo == null) {
                this.myToArrowInfo = new ArrowInfo();
            }
            this.myToArrowInfo.Style = value;
            this.resetPath();
            this.Changed(TuStrokeEvents.ChangedToArrowStyle, 0, goStrokeArrowheadStyle, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] ToArrowWidth
    public get ToArrowWidth(): TuStrokeArrowheadStyle {
        return this.getToArrowWidth();
    }
    public set ToArrowWidth(value: TuStrokeArrowheadStyle) {
        this.setToArrowWidth(value);
    }

    protected /*virtual*/  getToArrowWidth(): TuStrokeArrowheadStyle {
        if (this.myToArrowInfo == null) {
            return 8;
        }
        return this.myToArrowInfo.Width;
    }
    protected /*virtual*/ setToArrowWidth(value: TuStrokeArrowheadStyle) {
        let single: float;
        single = (this.myToArrowInfo == null ? 8 : this.myToArrowInfo.Width);
        if (single !== value) {
            if (this.myToArrowInfo == null) {
                this.myToArrowInfo = new ArrowInfo();
            }
            this.myToArrowInfo.Width = value;
            this.Changed(TuStrokeEvents.ChangedToArrowShaftLength, 0, undefined, GeomUtilities.MakeRect(single), 0, undefined, GeomUtilities.MakeRect(value));
        }
    }
    //#endregion


    public constructor() {
        super();
        this.InternalFlags = this.InternalFlags | 512;
        this.Brush = Brushes_Black;
    }

    private addLine(path: GraphicsPath, offx: float, offy: float, from: CGPoint, to: CGPoint): void {
        if (this.Style !== TuStrokeStyle.RoundedLineWithJumpOvers && this.Style !== TuStrokeStyle.RoundedLineWithJumpGaps) {
            path.addLine(from.X + offx, from.Y + offy, to.X + offx, to.Y + offy);
            return;
        }
        const single: float = 10;
        const single1: float = single / 2;
        const singleArray: float[] = TuStroke.myIntersections;
        const intersections: number = this.getIntersections(from, to, singleArray);
        let pointF: CGPoint = from.clone();
        if (intersections > 0) {
            if (super.IsApprox(from.Y, to.Y)) {
                if (from.X >= to.X) {
                    let int32: number = intersections - 1;
                    while (int32 >= 0) {
                        const x: float = from.X;
                        const int321: number = int32;
                        int32 = int321 - 1;
                        const single2: float = Math.min(x, Math.max(singleArray[int321] + single1, to.X + single));
                        path.addLine(pointF.X + offx, pointF.Y + offy, single2 + offx, to.Y + offy);
                        pointF = new CGPoint(single2 + offx, to.Y + offy);
                        let single3: float = Math.max(single2 - single, to.X);
                        while (int32 >= 0) {
                            const single4: float = singleArray[int32];
                            if (single4 <= single3 - single) {
                                break;
                            }
                            int32 = int32 - 1;
                            single3 = Math.max(single4 - single1, to.X);
                        }
                        const pointF1: CGPoint = new CGPoint((single2 + single3) / 2, to.Y - single);
                        const pointF2: CGPoint = new CGPoint(single3, to.Y);
                        if (this.Style !== TuStrokeStyle.RoundedLineWithJumpOvers) {
                            path.startFigure();
                        }
                        else {
                            path.addBezier(pointF.X, pointF.Y, pointF.X, pointF1.Y, pointF2.X, pointF1.Y, pointF2.X, pointF2.Y);
                        }
                        pointF = pointF2;
                    }
                }
                else {
                    let int322: number = 0;
                    while (int322 < intersections) {
                        const x1: float = from.X;
                        const int323: number = int322;
                        int322 = int323 + 1;
                        const single5: float = Math.max(x1, Math.min(singleArray[int323] - single1, to.X - single));
                        path.addLine(pointF.X + offx, pointF.Y + offy, single5 + offx, to.Y + offy);
                        pointF = new CGPoint(single5 + offx, to.Y + offy);
                        let single6: float = Math.min(single5 + single, to.X);
                        while (int322 < intersections) {
                            const single7: float = singleArray[int322];
                            if (single7 >= single6 + single) {
                                break;
                            }
                            int322 = int322 + 1;
                            single6 = Math.min(single7 + single1, to.X);
                        }
                        const pointF3: CGPoint = new CGPoint((single5 + single6) / 2, to.Y - single);
                        const pointF4: CGPoint = new CGPoint(single6, to.Y);
                        if (this.Style !== TuStrokeStyle.RoundedLineWithJumpOvers) {
                            path.startFigure();
                        }
                        else {
                            path.addBezier(pointF.X, pointF.Y, pointF.X, pointF3.Y, pointF4.X, pointF3.Y, pointF4.X, pointF4.Y);
                        }
                        pointF = pointF4;
                    }
                }
            }
            else if (super.IsApprox(from.X, to.X)) {
                if (from.Y >= to.Y) {
                    let int324: number = intersections - 1;
                    while (int324 >= 0) {
                        const y: float = from.Y;
                        const int325: number = int324;
                        int324 = int325 - 1;
                        const single8: float = Math.min(y, Math.max(singleArray[int325] + single1, to.Y + single));
                        path.addLine(pointF.X + offx, pointF.Y + offy, to.X + offx, single8 + offy);
                        pointF = new CGPoint(to.X + offx, single8 + offy);
                        let single9: float = Math.max(single8 - single, to.Y);
                        while (int324 >= 0) {
                            const single10: float = singleArray[int324];
                            if (single10 <= single9 - single) {
                                break;
                            }
                            int324 = int324 - 1;
                            single9 = Math.max(single10 - single1, to.Y);
                        }
                        const pointF5: CGPoint = new CGPoint(to.X - single, (single8 + single9) / 2);
                        const pointF6: CGPoint = new CGPoint(to.X, single9);
                        if (this.Style !== TuStrokeStyle.RoundedLineWithJumpOvers) {
                            path.startFigure();
                        }
                        else {
                            path.addBezier(pointF.X, pointF.Y, pointF5.X, pointF.Y, pointF5.X, pointF6.Y, pointF6.X, pointF6.Y);
                        }
                        pointF = pointF6;
                    }
                }
                else {
                    let int326: number = 0;
                    while (int326 < intersections) {
                        const y1: float = from.Y;
                        const int327: number = int326;
                        int326 = int327 + 1;
                        const single11: float = Math.max(y1, Math.min(singleArray[int327] - single1, to.Y - single));
                        path.addLine(pointF.X + offx, pointF.Y + offy, to.X + offx, single11 + offy);
                        pointF = new CGPoint(to.X + offx, single11 + offy);
                        let single12: float = Math.min(single11 + single, to.Y);
                        while (int326 < intersections) {
                            const single13: float = singleArray[int326];
                            if (single13 >= single12 + single) {
                                break;
                            }
                            int326 = int326 + 1;
                            single12 = Math.min(single13 + single1, to.Y);
                        }
                        const pointF7: CGPoint = new CGPoint(to.X - single, (single11 + single12) / 2);
                        const pointF8: CGPoint = new CGPoint(to.X, single12);
                        if (this.Style !== TuStrokeStyle.RoundedLineWithJumpOvers) {
                            path.startFigure();
                        }
                        else {
                            path.addBezier(pointF.X, pointF.Y, pointF7.X, pointF.Y, pointF7.X, pointF8.Y, pointF8.X, pointF8.Y);
                        }
                        pointF = pointF8;
                    }
                }
            }
        }
        path.addLine(pointF.X + offx, pointF.Y + offy, to.X + offx, to.Y + offy);

    }

    private addLineAndCorner(path: GraphicsPath, offx: float, offy: float, a: CGPoint, b: CGPoint, c: CGPoint): CGPoint {
        let single: float;
        let single1: float;
        if (super.IsApprox(a.Y, b.Y) && super.IsApprox(b.X, c.X)) {
            let single2: float = Math.min(Math.abs(this.Curviness), Math.abs(b.X - a.X) / 2);
            const single3: float = Math.min(single2, Math.abs(c.Y - b.Y) / 2);
            single2 = single3;
            if (super.IsApprox(single2, 0)) {
                this.addLine(path, offx, offy, a.clone(), b.clone());
                return b.clone();
            }
            const x: CGPoint = b.clone();
            const y: CGPoint = b.clone();
            let single4: float = 90;
            const rectangleF: CGRectangle = new CGRectangle(0, 0, single2 * 2, single3 * 2);
            if (b.X <= a.X) {
                x.X = b.X + single2;
                if (c.Y <= b.Y) {
                    y.Y = b.Y - single3;
                    single = 90;
                    rectangleF.X = b.X;
                    rectangleF.Y = b.Y - single3 * 2;
                }
                else {
                    y.Y = b.Y + single3;
                    single = 270;
                    single4 = -90;
                    rectangleF.X = b.X;
                    rectangleF.Y = b.Y;
                }
            }
            else {
                x.X = b.X - single2;
                if (c.Y <= b.Y) {
                    y.Y = b.Y - single3;
                    single = 90;
                    single4 = -90;
                    rectangleF.X = b.X - single2 * 2;
                    rectangleF.Y = b.Y - single3 * 2;
                }
                else {
                    y.Y = b.Y + single3;
                    single = 270;
                    rectangleF.X = b.X - single2 * 2;
                    rectangleF.Y = b.Y;
                }
            }
            this.addLine(path, offx, offy, a, x);
            rectangleF.X = rectangleF.X + offx;
            rectangleF.Y = rectangleF.Y + offy;
            path.addArc(rectangleF, single, single4);
            return y;
        }
        if (!super.IsApprox(a.X, b.X) || !super.IsApprox(b.Y, c.Y)) {
            this.addLine(path, offx, offy, a, b);
            return b.clone();
        }
        let single5: float = Math.min(Math.abs(this.Curviness), Math.abs(b.Y - a.Y) / 2);
        const single6: float = Math.min(single5, Math.abs(c.X - b.X) / 2);
        single5 = single6;
        if (super.IsApprox(single6, 0)) {
            this.addLine(path, offx, offy, a, b);
            return b.clone();
        }
        const pointF: CGPoint = b.clone();
        const x1: CGPoint = b.clone();
        let single7: float = 90;
        const rectangleF1: CGRectangle = new CGRectangle(0, 0, single6 * 2, single5 * 2);
        if (b.Y <= a.Y) {
            pointF.Y = b.Y + single5;
            if (c.X <= b.X) {
                x1.X = b.X - single6;
                single1 = 0;
                single7 = -90;
                rectangleF1.Y = b.Y;
                rectangleF1.X = b.X - single6 * 2;
            }
            else {
                x1.X = b.X + single6;
                single1 = 180;
                rectangleF1.Y = b.Y;
                rectangleF1.X = b.X;
            }
        }
        else {
            pointF.Y = b.Y - single5;
            if (c.X <= b.X) {
                x1.X = b.X - single6;
                single1 = 0;
                rectangleF1.Y = b.Y - single5 * 2;
                rectangleF1.X = b.X - single6 * 2;
            }
            else {
                x1.X = b.X + single6;
                single1 = 180;
                single7 = -90;
                rectangleF1.Y = b.Y - single5 * 2;
                rectangleF1.X = b.X;
            }
        }
        this.addLine(path, offx, offy, a.clone(), pointF.clone());
        rectangleF1.X = rectangleF1.X + offx;
        rectangleF1.Y = rectangleF1.Y + offy;
        path.addArc(rectangleF1, single1, single7);
        return x1.clone();
    }


    public /* virtual */ addPoint(p: CGPoint): number;
    public addPoint(x: number, y: float): number;
    public addPoint(...args: any[]): number {
        if (args.length === 1) {
            const p: CGPoint = args[0];
            return this.internalInsertPoint(this.myPointsCount, p.clone());
        } else {
            return this.addPoint(new CGPoint(args[0], args[1]));
        }
    }

    public /* override */ AddSelectionHandles(sel: TuSelection, selectedObj: TuObject): void {
        sel.removeHandles(this);
        if (this.HighlightWhenSelected) {
            const skipsUndoManager: boolean = this.SkipsUndoManager;
            this.SkipsUndoManager = true;
            this.Highlight = true;
            this.SkipsUndoManager = skipsUndoManager;
            return;
        }
        const view: TuView = sel.View;
        const flag: boolean = (view == null ? true : view.CanResizeObjects());
        const flag1: boolean = (view == null ? true : view.CanReshapeObjects());
        const lastPickIndex: number = this.LastPickIndex;
        if (!(this.CanResize() && flag)) {
            for (let i = this.FirstPickIndex; i <= lastPickIndex; i = i + 1) {
                const point: CGPoint = this.getPoint(i);
                sel.createResizeHandle(this, selectedObj, point.clone(), 0, false);
            }
            return;
        }
        if (!(this.CanReshape() && flag1)) {
            super.AddSelectionHandles(sel, selectedObj);
            return;
        }
        for (let j = this.FirstPickIndex; j <= lastPickIndex; j = j + 1) {
            const pointF: CGPoint = this.getPoint(j);
            sel.createResizeHandle(this, selectedObj, pointF.clone(), LastSpot + j, true);
        }
    }

    private addStroke(path: GraphicsPath, offx: float, offy: float, fromPoly: CGPoint[], toPoly: CGPoint[]): void {
        let pointF: CGPoint;
        let pointF1: CGPoint;
        let pointF2: CGPoint;
        let pointF3: CGPoint;
        let pointsCount: number = this.PointsCount;
        if (this.Style === TuStrokeStyle.Bezier && pointsCount >= 4) {
            for (let i = 3; i < pointsCount; i = i + 3) {
                pointF = (fromPoly == null || (i - 3) !== 0 || this.FromArrowShaftLength <= 0 || !(fromPoly[2].Equals(this.getPoint(0))) ? this.getPoint(i - 3) : fromPoly[0].clone());
                const point: CGPoint = this.getPoint(i - 2);
                if ((i + 3) >= pointsCount) {
                    i = (pointsCount - 1);
                }
                const point1: CGPoint = this.getPoint((i - 1));
                pointF1 = (toPoly == null || i !== (pointsCount - 1) || this.ToArrowShaftLength <= 0 || !(toPoly[2].Equals(this.getPoint(i))) ? this.getPoint(i) : toPoly[0].clone());
                path.addBezier(pointF.X + offx, pointF.Y + offy, point.X + offx, point.Y + offy, point1.X + offx, point1.Y + offy, pointF1.X + offx, pointF1.Y + offy);
            }
            return;
        }
        if (pointsCount < 2) {
            return;
        }
        // TODO: any i kontrol et.
        if (pointsCount == 2 || this.Style === TuStrokeStyle.Line || this.Style === TuStrokeStyle.Bezier || super.IsApprox(this.Curviness, 0) && (this.Style !== TuStrokeStyle.RoundedLineWithJumpOvers || <any>this.Style !== TuStrokeStyle.RoundedLineWithJumpGaps)) {
            for (let j = 1; j < pointsCount; j = (j + 1)) {
                pointF2 = (fromPoly == null || (j - 1) !== 0 || this.FromArrowShaftLength <= 0 || !(fromPoly[2].Equals(this.getPoint(0))) ? this.getPoint((j - 1)) : fromPoly[0].clone());
                pointF3 = (toPoly == null || j !== (pointsCount - 1) || this.ToArrowShaftLength <= 0 || !(toPoly[2].Equals(this.getPoint(j))) ? this.getPoint(j) : toPoly[0].clone());
                path.addLine(pointF2.X + offx, pointF2.Y + offy, pointF3.X + offx, pointF3.Y + offy);
            }
            return;
        }
        let point2: CGPoint = this.getPoint(0);
        if (fromPoly != null && this.FromArrowShaftLength > 0 && fromPoly[2].Equals(point2)) {
            point2 = fromPoly[0].clone();
        }
        let int32: number = 1;
        while (int32 < pointsCount) {
            const int321: number = int32;
            int32 = this.furthestPoint(point2.clone(), int321, int321 > 1);
            let point3: CGPoint = this.getPoint(int32);
            if (int32 < (pointsCount - 1)) {
                const int322: number = this.furthestPoint(point3.clone(), (int32 + 1), int32 < (pointsCount - 3));
                let point4: CGPoint = this.getPoint(int322);
                if (toPoly != null && int322 === (pointsCount - 1) && this.ToArrowShaftLength > 0 && toPoly[2].Equals(point4)) {
                    point4 = toPoly[0].clone();
                }
                point2 = this.addLineAndCorner(path, offx, offy, point2.clone(), point3.clone(), point4.clone());
                int32 = int322;
            }
            else {
                if (toPoly != null && this.ToArrowShaftLength > 0 && toPoly[2].Equals(point3)) {
                    point3 = toPoly[0].clone();
                }
                if (point2.Equals(point3)) {
                    break;
                }
                this.addLine(path, offx, offy, point2.clone(), point3.clone());
                return;
            }
        }
    }

    public /* virtual */ calculateArrowhead(anchor: CGPoint, endPoint: CGPoint, atEnd: boolean, poly: CGPoint[]): void {
        let fromArrowLength: float;
        let fromArrowShaftLength: float;
        let fromArrowWidth: float;
        let fromArrowStyle: TuStrokeArrowheadStyle;
        let toArrowStyle: TuStrokeArrowheadStyle;
        const x: float = endPoint.X;
        const y: float = endPoint.Y;
        const single: float = x - anchor.X;
        const y1: float = y - anchor.Y;
        const single1: float = single;
        const single2: float = y1;
        const single3: float = Math.sqrt((single1 * single1 + single2 * single2));
        const length: number = poly.length;
        for (let i = 0; i < length; i = (i + 1)) {
            poly[i].X = x;
            poly[i].Y = y;
        }
        if (super.IsApprox(single3, 0) || length < 3) {
            return;
        }
        const single4: float = single / single3;
        const single5: float = y1 / single3;
        if (!atEnd) {
            fromArrowLength = this.FromArrowLength;
            fromArrowShaftLength = this.FromArrowShaftLength;
            fromArrowWidth = this.FromArrowWidth;
            fromArrowStyle = this.FromArrowStyle;
        }
        else {
            fromArrowLength = this.ToArrowLength;
            fromArrowShaftLength = this.ToArrowShaftLength;
            fromArrowWidth = this.ToArrowWidth;
            fromArrowStyle = this.ToArrowStyle;
        }
        fromArrowWidth /= 2;
        const single6: float = Math.max(fromArrowLength, fromArrowShaftLength);
        if (single6 > 0 && single3 < single6 && this.Style !== TuStrokeStyle.Bezier) {
            const single7: float = single3 / single6;
            fromArrowLength *= single7;
            fromArrowShaftLength *= single7;
            fromArrowWidth *= single7;
        }
        if (length >= 6) {
            const single8: float = -fromArrowShaftLength;
            const single9: float = 0;
            const single10: float = -fromArrowLength;
            const single11: float = -fromArrowWidth;
            const single12: float = -fromArrowLength + fromArrowShaftLength;
            const single13: float = -fromArrowWidth;
            const single14: float = -fromArrowLength + fromArrowShaftLength;
            const single15: float = fromArrowWidth;
            const single16: float = -fromArrowLength;
            const single17: float = fromArrowWidth;
            poly[0].X = x + (single4 * single8 - single5 * single9);
            poly[0].Y = y + (single5 * single8 + single4 * single9);
            poly[1].X = x + (single4 * single10 - single5 * single11);
            poly[1].Y = y + (single5 * single10 + single4 * single11);
            poly[2].X = x + (single4 * single12 - single5 * single13);
            poly[2].Y = y + (single5 * single12 + single4 * single13);
            poly[3].X = x;
            poly[3].Y = y;
            poly[4].X = x + (single4 * single14 - single5 * single15);
            poly[4].Y = y + (single5 * single14 + single4 * single15);
            poly[5].X = x + (single4 * single16 - single5 * single17);
            poly[5].Y = y + (single5 * single16 + single4 * single17);
            return;
        }
        if (length === 5) {
            const single18: float = -fromArrowShaftLength;
            const single19: float = 0;
            const single20: float = -fromArrowLength;
            const single21: float = -fromArrowWidth;
            const single22: float = -fromArrowLength + fromArrowShaftLength;
            const single23: float = -fromArrowWidth;
            poly[0].X = x + (single4 * single18 - single5 * single19);
            poly[0].Y = y + (single5 * single18 + single4 * single19);
            poly[1].X = x + (single4 * single20 - single5 * single21);
            poly[1].Y = y + (single5 * single20 + single4 * single21);
            poly[2].X = x + (single4 * single22 - single5 * single23);
            poly[2].Y = y + (single5 * single22 + single4 * single23);
            poly[3].X = x;
            poly[3].Y = y;
            poly[4].X = x;
            poly[4].Y = y;
            return;
        }
        if (length !== 4) {
            if (length === 3) {
                const single24: float = -fromArrowShaftLength;
                const single25: float = 0;
                let single26: float = -fromArrowLength;
                const single27: float = -fromArrowWidth;
                if (!atEnd) {
                    toArrowStyle = this.FromArrowStyle;
                    if (toArrowStyle === TuStrokeArrowheadStyle.Slash) {
                        single26 = -fromArrowLength / 2;
                    }
                    else if (toArrowStyle === TuStrokeArrowheadStyle.BackSlash) {
                        single26 = -fromArrowLength * 3 / 2;
                    }
                }
                else {
                    toArrowStyle = this.ToArrowStyle;
                    if (toArrowStyle === TuStrokeArrowheadStyle.Slash) {
                        single26 = -fromArrowLength / 2;
                    }
                    else if (toArrowStyle === TuStrokeArrowheadStyle.BackSlash) {
                        single26 = -fromArrowLength * 3 / 2;
                    }
                }
                poly[0].X = x + (single4 * single24 - single5 * single25);
                poly[0].Y = y + (single5 * single24 + single4 * single25);
                poly[1].X = x + (single4 * single26 - single5 * single27);
                poly[1].Y = y + (single5 * single26 + single4 * single27);
                poly[2].X = x;
                poly[2].Y = y;
            }
            return;
        }
        if (fromArrowStyle === TuStrokeArrowheadStyle.X) {
            const single28: float = fromArrowLength / 2;
            const single29: float = -fromArrowShaftLength - single28;
            const single30: float = -fromArrowWidth;
            const single31: float = -fromArrowShaftLength + single28;
            const single32: float = -fromArrowWidth;
            const single33: float = -fromArrowShaftLength - single28;
            const single34: float = fromArrowWidth;
            const single35: float = -fromArrowShaftLength + single28;
            const single36: float = fromArrowWidth;
            poly[0].X = x + (single4 * single29 - single5 * single30);
            poly[0].Y = y + (single5 * single29 + single4 * single30);
            poly[1].X = x + (single4 * single31 - single5 * single32);
            poly[1].Y = y + (single5 * single31 + single4 * single32);
            poly[2].X = x + (single4 * single33 - single5 * single34);
            poly[2].Y = y + (single5 * single33 + single4 * single34);
            poly[3].X = x + (single4 * single35 - single5 * single36);
            poly[3].Y = y + (single5 * single35 + single4 * single36);
            return;
        }
        const single37: float = -fromArrowShaftLength;
        const single38: float = 0;
        let single39: float = -fromArrowLength;
        const single40: float = -fromArrowWidth;
        let single41: float = -fromArrowLength;
        const single42: float = fromArrowWidth;
        if (!atEnd) {
            toArrowStyle = this.FromArrowStyle;
            if (toArrowStyle === TuStrokeArrowheadStyle.Slash) {
                single39 = -fromArrowLength / 2;
                single41 = -fromArrowLength * 3 / 2;
            }
            else if (toArrowStyle === TuStrokeArrowheadStyle.BackSlash) {
                single39 = -fromArrowLength * 3 / 2;
                single41 = -fromArrowLength / 2;
            }
        }
        else {
            toArrowStyle = this.ToArrowStyle;
            if (toArrowStyle === TuStrokeArrowheadStyle.Slash) {
                single39 = -fromArrowLength / 2;
                single41 = -fromArrowLength * 3 / 2;
            }
            else if (toArrowStyle === TuStrokeArrowheadStyle.BackSlash) {
                single39 = -fromArrowLength * 3 / 2;
                single41 = -fromArrowLength / 2;
            }
        }
        poly[0].X = x + (single4 * single37 - single5 * single38);
        poly[0].Y = y + (single5 * single37 + single4 * single38);
        poly[1].X = x + (single4 * single39 - single5 * single40);
        poly[1].Y = y + (single5 * single39 + single4 * single40);
        poly[2].X = x;
        poly[2].Y = y;
        poly[3].X = x + (single4 * single41 - single5 * single42);
        poly[3].Y = y + (single5 * single41 + single4 * single42);
    }

    public /* override */ ChangeValue(e: TuChangedEventArgs, undo: boolean): void {
        let newRect: CGRectangle;
        const subHint: number = e.SubHint;
        if (subHint > TuStrokeEvents.ChangedCurviness) {
            switch (subHint) {
                case TuStrokeEvents.ChangedHighlightPen:
                    {
                        const value: any = e.getValue(undo);
                        if (is.typeof<Pen>(value, GraphicTypes.Pen)) {
                            this.HighlightPen = value;
                            return;
                        }
                        if (is.typeof<TuPenInfo>(value, Types.TuPenInfo)) {
                            this.HighlightPenInfo = value;
                        }
                        return;
                    }
                case TuStrokeEvents.ChangedHighlight:
                    {
                        this.Highlight = e.getValue(undo);
                        return;
                    }
                case TuStrokeEvents.ChangedHighlightWhenSelected:
                    {
                        this.HighlightWhenSelected = e.getValue(undo);
                        return;
                    }
                default:
                    {
                        switch (subHint) {
                            case TuStrokeEvents.ChangedToArrowHead:
                                {
                                    this.ToArrow = e.getValue(undo);
                                    return;
                                }
                            case TuStrokeEvents.ChangedToArrowLength:
                                {
                                    this.ToArrowLength = e.getFloat(undo);
                                    return;
                                }
                            case TuStrokeEvents.ChangedToArrowShaftLength:
                                {
                                    this.ToArrowShaftLength = e.getFloat(undo);
                                    return;
                                }
                            case TuStrokeEvents.ChangedToArrowWidth:
                                {
                                    this.ToArrowWidth = e.getFloat(undo);
                                    return;
                                }
                            case TuStrokeEvents.ChangedToArrowFilled:
                                {
                                    this.ToArrowFilled = e.getValue(undo);
                                    return;
                                }
                            case TuStrokeEvents.ChangedToArrowStyle:
                                {
                                    this.ToArrowStyle = e.getValue(undo);
                                    return;
                                }
                            case TuStrokeEvents.ChangedFromArrowHead:
                                {
                                    this.FromArrow = e.getValue(undo);
                                    return;
                                }
                            case TuStrokeEvents.ChangedFromArrowLength:
                                {
                                    this.FromArrowLength = e.getFloat(undo);
                                    return;
                                }
                            case TuStrokeEvents.ChangedFromArrowShaftLength:
                                {
                                    this.FromArrowShaftLength = e.getFloat(undo);
                                    return;
                                }
                            case TuStrokeEvents.ChangedFromArrowWidth:
                                {
                                    this.FromArrowWidth = e.getFloat(undo);
                                    return;
                                }
                            case TuStrokeEvents.ChangedFromArrowFilled:
                                {
                                    this.FromArrowFilled = e.getValue(undo);
                                    return;
                                }
                            case TuStrokeEvents.ChangedFromArrowStyle:
                                {
                                    this.FromArrowStyle = e.getValue(undo);
                                    return;
                                }
                        }
                        break;
                    }
            }
        }
        else {
            if (subHint === 1001) {
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
                case TuStrokeEvents.AddedPoint:
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
                case TuStrokeEvents.RemovedPoint:
                    {
                        if (!undo) {
                            this.internalRemovePoint(e.OldInt);
                            return;
                        }
                        const int32: number = e.OldInt;
                        const x1: float = e.OldRect.X;
                        newRect = e.OldRect;
                        this.internalInsertPoint(int32, new CGPoint(x1, newRect.Y));
                        return;
                    }
                case TuStrokeEvents.ModifiedPoint:
                case TuStrokeEvents.ChangedModifiedPoint:
                    {
                        if (undo) {
                            const oldInt1: number = e.OldInt;
                            const single1: float = e.OldRect.X;
                            newRect = e.OldRect;
                            this.internalSetPoint(oldInt1, new CGPoint(single1, newRect.Y));
                            return;
                        }
                        const int321: number = e.OldInt;
                        const x2: float = e.NewRect.X;
                        newRect = e.NewRect;
                        this.internalSetPoint(int321, new CGPoint(x2, newRect.Y));
                        return;
                    }
                case TuStrokeEvents.ChangedAllPoints:
                    {
                        this.setPoints(e.getValue(undo));
                        return;
                    }
                case TuStrokeEvents.ChangedStyle:
                    {
                        this.Style = e.getValue(undo);
                        return;
                    }
                case TuStrokeEvents.ChangedCurviness:
                    {
                        this.Curviness = e.getFloat(undo);
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
        this.Changing(TuStrokeEvents.ChangedAllPoints);
        this.resetPath();
        this.myPointsCount = 0;
        if (!this.Initializing) {
            this.InvalidBounds = true;
        }
        this.Changed(TuStrokeEvents.ChangedAllPoints, 0, undefined, NullRect, 0, undefined, NullRect);
    }

    protected /* override */ ComputeBounds(): CGRectangle {
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
        if (this.Style !== TuStrokeStyle.Bezier || pointsCount < 4) {
            for (let i = 1; i < pointsCount; i = (i + 1)) {
                point = this.getPoint(i);
                x = Math.min(x, point.X);
                y = Math.min(y, point.Y);
                single = Math.max(single, point.X);
                y1 = Math.max(y1, point.Y);
            }
        }
        else {
            for (let j = 3; j < pointsCount; j = (j + 3)) {
                const pointF: CGPoint = this.getPoint(j - 3);
                const point1: CGPoint = this.getPoint(j - 2);
                if ((j + 3) >= pointsCount) {
                    j = (pointsCount - 1);
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
        return this.getSegmentNearPoint(p) >= 0;
    }

    public /* override */ CopyNewValueForRedo(e: TuChangedEventArgs): void {
        if (e.SubHint !== TuStrokeEvents.ChangedAllPoints) {
            super.CopyNewValueForRedo(e);
            return;
        }
        if (!e.IsBeforeChanging) {
            e.NewValue = this.copyPointsArray();
        }
    }

    public /* override */ copyObject(env: TuCopyDictionary): TuObject {
        const goStroke: TuStroke = as(super.copyObject(env), Types.TuStroke);
        if (goStroke != null) {
            goStroke.myPoints = TArray.Clone(this.myPoints);
            if (this.myToArrowInfo != null) {
                goStroke.myToArrowInfo = this.myToArrowInfo.clone();
            }
            if (this.myFromArrowInfo != null) {
                goStroke.myFromArrowInfo = this.myFromArrowInfo.clone();
            }
        }
        return goStroke;
    }
    public /* override */ CopyOldValueForUndo(e: TuChangedEventArgs): void {
        if (e.SubHint !== TuStrokeEvents.ChangedAllPoints) {
            super.CopyOldValueForUndo(e);
            return;
        }
        if (e.IsBeforeChanging) {
            e.OldValue = this.copyPointsArray();
        }
    }
    public /* virtual */  copyPointsArray(): CGPoint[] {
        const pointFArray: CGPoint[] = new Array(this.myPointsCount);
        TArray.Copy(this.myPoints, 0, pointFArray, 0, this.myPointsCount);
        return pointFArray;
    }

    public /* override */ DoResize(view: TuView, origRect: CGRectangle, newPoint: CGPoint, whichHandle: number, evttype: TuInputState, min: CGSize, max: CGSize): void {
        if (whichHandle >= LastSpot && (this.ResizesRealtime || evttype === TuInputState.Finish || evttype === TuInputState.Cancel)) {
            this.setPoint(whichHandle - LastSpot, newPoint);
            return;
        }
        super.DoResize(view, origRect, newPoint, whichHandle, evttype, min, max);
    }

    protected /* virtual */ drawArrowhead(g: Graphics, view: TuView, pen: Pen, brush: Brush, atEnd: boolean, offsetw: float, offseth: float, poly: CGPoint[]): void {
        let brush1: Brush = undefined;
        if (poly[0].notEquals(poly[2])) {
            if ((atEnd ? this.ToArrowFilled : this.FromArrowFilled)) {
                brush1 = brush;
            }
        }
        switch ((atEnd ? this.ToArrowStyle : this.FromArrowStyle)) {
            case TuStrokeArrowheadStyle.Polygon:
                {
                    if (offsetw === 0 && offseth === 0) {
                        TuShape.DrawPolygon(g, view, pen, brush1, poly);
                        return;
                    }
                    const length: number = poly.length;
                    for (let i = 0; i < length; i = (i + 1)) {
                        const x: CGPoint = poly[i];
                        x.X = x.X + offsetw;
                        const y: CGPoint = poly[i];
                        y.Y = y.Y + offseth;
                    }
                    TuShape.DrawPolygon(g, view, pen, brush1, poly);
                    for (let j = 0; j < length; j = (j + 1)) {
                        const pointFPointer: CGPoint = poly[j];
                        pointFPointer.X = pointFPointer.X - offsetw;
                        const y1: CGPoint = poly[j];
                        y1.Y = y1.Y - offseth;
                    }
                    return;
                }
            case TuStrokeArrowheadStyle.Circle:
                {
                    const single: float = poly[0].X;
                    const single1: float = poly[0].Y;
                    const x1: float = poly[2].X;
                    const y2: float = poly[2].Y;
                    const single2: float = (single + x1) / 2 + offsetw;
                    const single3: float = (single1 + y2) / 2 + offseth;
                    const single4: float = Math.sqrt(((single - x1) * (single - x1) + (single1 - y2) * (single1 - y2)));
                    const single5: float = single4;
                    TuShape.DrawEllipse(g, view, pen, brush1, single2 - single4 / 2, single3 - single4 / 2, single5, single5);
                    return;
                }
            case TuStrokeArrowheadStyle.Cross:
            case TuStrokeArrowheadStyle.Slash:
            case TuStrokeArrowheadStyle.BackSlash:
                {
                    const x2: float = poly[1].X + offsetw;
                    const y3: float = poly[1].Y + offseth;
                    const x3: float = poly[3].X + offsetw;
                    const y4: float = poly[3].Y + offseth;
                    TuShape.DrawLine(g, view, pen, x2, y3, x3, y4);
                    return;
                }
            case TuStrokeArrowheadStyle.X:
                {
                    let x4: float = poly[0].X + offsetw;
                    let y5: float = poly[0].Y + offseth;
                    let x5: float = poly[3].X + offsetw;
                    let y6: float = poly[3].Y + offseth;
                    TuShape.DrawLine(g, view, pen, x4, y5, x5, y6);
                    x4 = poly[1].X + offsetw;
                    y5 = poly[1].Y + offseth;
                    x5 = poly[2].X + offsetw;
                    y6 = poly[2].Y + offseth;
                    TuShape.DrawLine(g, view, pen, x4, y5, x5, y6);
                    return;
                }
            default:
                {
                    return;
                }
        }
    }

    public /* override */ ExpandPaintBounds(rect: CGRectangle, view: TuView): CGRectangle {
        let penInfo: TuPenInfo = this.PenInfo;
        if (penInfo != null) {
            let single: float = Math.max(penInfo.Width, 1) / 2 * penInfo.MiterLimit + 1;
            const highlightPenInfo: TuPenInfo = this.HighlightPenInfo;
            if (highlightPenInfo != null) {
                const single1: float = Math.max(highlightPenInfo.Width, 1) / 2 * highlightPenInfo.MiterLimit + 1;
                single = Math.max(single, single1);
            }
            if (this.ToArrow) {
                single = Math.max(single, Math.abs(this.ToArrowLength));
                single = Math.max(single, Math.abs(this.ToArrowWidth));
            }
            if (this.FromArrow) {
                single = Math.max(single, Math.abs(this.FromArrowLength));
                single = Math.max(single, Math.abs(this.FromArrowWidth));
            }
            const single2: float = single;
            const outRect: Out<CGRectangle> = { value: rect.clone() };
            GeomUtilities.InflateRect(outRect, single2, single2);
            rect = outRect.value.clone();

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
        }
        return rect;
    }

    private furthestPoint(a: CGPoint, i: number, oneway: boolean): number {
        // TODO: problem olursa kontrol et, label kullanilmişti.
        let point: CGPoint;
        let int32 = 0;
        const pointsCount = this.PointsCount;
        for (point = a.clone(); this.IsApprox(a.X, point.X) && this.IsApprox(a.Y, point.Y); point = this.getPoint(int32)) {
            if (i >= pointsCount) {
                return pointsCount - 1;
            }
            int32 = i;
            i = int32 + 1;
        }
        if (!this.IsApprox(a.X, point.X) && !this.IsApprox(a.Y, point.Y)) {
            return i - 1;
        }
        let pointF = point.clone();
        while (true) {
            if (this.IsApprox(a.X, point.X) && this.IsApprox(point.X, pointF.X)) {
                if (!oneway) {
                    if (i >= pointsCount) {
                        return pointsCount - 1;
                    }
                    const int321 = i;
                    i = (int321 + 1);
                    pointF = this.getPoint(int321);
                    continue;
                }
                else if ((a.Y >= point.Y ? point.Y >= pointF.Y : point.Y <= pointF.Y)) {
                    if (i >= pointsCount) {
                        return (pointsCount - 1);
                    }
                    const int321 = i;
                    i = (int321 + 1);
                    pointF = this.getPoint(int321);
                    continue;
                }
            }
            if (!this.IsApprox(a.Y, point.Y) || !this.IsApprox(point.Y, pointF.Y)) {
                break;
            }
            if (oneway) {
                if ((a.X >= point.X ? point.X < pointF.X : point.X > pointF.X)) {
                    break;
                }
            }

            if (i >= pointsCount) {
                return pointsCount - 1;
            }
            const int321 = i;
            i = (int321 + 1);
            pointF = this.getPoint(int321);
        }
        return (i - 2);
    }

    public /* virtual */ getArrowheadPointsCount(atEnd: boolean): number {
        return 4;
    }

    private getIntersections(A: CGPoint, B: CGPoint, v: float[]): number {
        let int32: number;
        const document: TuDocument = this.Document;
        if (document == null) {
            return 0;
        }
        const single: float = Math.min(A.X, B.X);
        const single1: float = Math.min(A.Y, B.Y);
        const single2: float = Math.max(A.X, B.X);
        const single3: float = Math.max(A.Y, B.Y);
        const rectangleF: CGRectangle = new CGRectangle(single, single1, single2 - single, single3 - single1);
        let intersections2: number = 0;
        const enumerator: TuLayerCollectionEnumerator = document.Layers.GetEnumerator();
        try {
            while (enumerator.MoveNext()) {
                const current: TuLayer = enumerator.Current;
                if (!current.CanViewObjects()) {
                    continue;
                }
                const goLayerCache: TuLayerCache = current.FindCache(rectangleF);
                if (goLayerCache == null) {
                    const goLayerEnumerators: TuLayerEnumerator = current.GetEnumerator();
                    try {
                        while (goLayerEnumerators.MoveNext()) {
                            const goObject: TuObject = goLayerEnumerators.Current;
                            let realLink: TuStroke = as(goObject, Types.TuStroke);
                            if (realLink == null) {
                                const goLabeledLink: TuLabeledLink = as(goObject, Types.TuLabeledLink);
                                if (goLabeledLink == null) {
                                    continue;
                                }
                                realLink = goLabeledLink.RealLink;
                            }
                            if (realLink.Style !== TuStrokeStyle.RoundedLineWithJumpOvers && realLink.Style !== TuStrokeStyle.RoundedLineWithJumpGaps || !realLink.CanView()) {
                                continue;
                            }
                            if (realLink !== this) {
                                intersections2 = this.getIntersections2(A, B, v, intersections2, realLink);
                            }
                            else {
                                TArray.Sort<float>(v, 0, intersections2, FloatComparer.Default);
                                int32 = intersections2;
                                return int32;
                            }
                        }
                    }
                    finally {
                        goLayerEnumerators.Dispose();
                    }
                }
                else {
                    let goStrokes: List<TuStroke> = undefined;
                    let enumerator1: IEnumerator<TuStroke> = goLayerCache.Strokes.GetEnumerator();
                    try {
                        while (enumerator1.MoveNext()) {
                            const goStroke: TuStroke = enumerator1.Current;
                            if (goStroke.Layer == null) {
                                if (goStrokes == null) {
                                    goStrokes = new List<TuStroke>();
                                }
                                goStrokes.Add(goStroke);
                            }
                            else if (goStroke != this) {
                                intersections2 = this.getIntersections2(A, B, v, intersections2, goStroke);
                            }
                            else {
                                if (goStrokes != null) {
                                    const enumerator2: IEnumerator<TuStroke> = goStrokes.GetEnumerator();
                                    try {
                                        while (enumerator2.MoveNext()) {
                                            const current1: TuStroke = enumerator2.Current;
                                            TuCollection.FastRemove<TuStroke>(goLayerCache.Strokes, current1);
                                        }
                                    }
                                    finally {
                                        enumerator2.Dispose();
                                    }
                                }
                                TArray.Sort<float>(v, 0, intersections2, FloatComparer.Default);
                                int32 = intersections2;
                                return int32;
                            }
                        }
                    }
                    finally {
                        enumerator1.Dispose();
                    }
                    if (goStrokes == null) {
                        continue;
                    }
                    enumerator1 = goStrokes.GetEnumerator();
                    try {
                        while (enumerator1.MoveNext()) {
                            const goStroke1: TuStroke = enumerator1.Current;
                            TuCollection.FastRemove<TuStroke>(goLayerCache.Strokes, goStroke1);
                        }
                    }
                    finally {
                        enumerator1.Dispose();
                    }
                }
            }
            TArray.Sort<float>(v, 0, intersections2, FloatComparer.Default);
            return intersections2;
        }
        finally {
            enumerator.Dispose();
        }
        return int32;
    }

    private getIntersections2(A: CGPoint, B: CGPoint, v: float[], numints: number, link: TuStroke): number {
        if (link.CanView()) {
            const pointsCount: number = link.PointsCount;
            for (let i = 1; i < pointsCount; i = (i + 1)) {
                const point: CGPoint = link.getPoint((i - 1));
                const pointF: CGPoint = link.getPoint(i);
                const pointF1: Out<CGPoint> = { value: new CGPoint() };
                if (this.getOrthoSegmentIntersection(A, B, point.clone(), pointF.clone(), pointF1) && numints < v.length) {
                    if (!super.IsApprox(A.Y, B.Y)) {
                        const int32: number = numints;
                        numints = (int32 + 1);
                        v[int32] = pointF1.value.Y;
                    }
                    else {
                        const int321: number = numints;
                        numints = (int321 + 1);
                        v[int321] = pointF1.value.X;
                    }
                }
            }
        }
        return numints;
    }

    public /* override */ GetNearestIntersectionPoint(p1: CGPoint, p2: CGPoint, result: Out<CGPoint>): boolean {
        let pointF: Out<CGPoint> = New.Out();
        const pointsCount: number = this.PointsCount;
        let single: float = 1E+21;
        let pointF1: CGPoint = new CGPoint();
        if (this.Style !== TuStrokeStyle.Bezier || pointsCount < 4) {
            for (let i = 0; i < (pointsCount - 1); i = (i + 1)) {
                if (GeomUtilities.NearestIntersectionOnLine(this.getPoint(i), this.getPoint((i + 1)), p1.clone(), p2.clone(), pointF)) {
                    const x: float = (pointF.value.X - p1.X) * (pointF.value.X - p1.X) + (pointF.value.Y - p1.Y) * (pointF.value.Y - p1.Y);
                    if (x < single) {
                        single = x;
                        pointF1 = pointF.value.clone();
                    }
                }
            }
        }
        else {
            const penWidth: float = this.PenWidth / 2;
            for (let j = 3; j < pointsCount; j = (j + 3)) {
                const point: CGPoint = this.getPoint(j - 3);
                const point1: CGPoint = this.getPoint(j - 2);
                if ((j + 3) >= pointsCount) {
                    j = (pointsCount - 1);
                }
                if (GeomUtilities.BezierNearestIntersectionOnLine(point, point1, this.getPoint(j - 1), this.getPoint(j), p1.clone(), p2.clone(), penWidth, pointF)) {
                    const x1: float = (pointF.value.X - p1.X) * (pointF.value.X - p1.X) + (pointF.value.Y - p1.Y) * (pointF.value.Y - p1.Y);
                    if (x1 < single) {
                        single = x1;
                        pointF1 = pointF.value.clone();
                    }
                }
            }
        }
        result.value = pointF1.clone();
        return single < 1E+21;
    }

    private getOrthoSegmentIntersection(A: CGPoint, B: CGPoint, C: CGPoint, D: CGPoint, result: Out<CGPoint>): boolean {
        if (!super.IsApprox(A.X, B.X)) {
            if (super.IsApprox(C.X, D.X) && Math.min(A.X, B.X) < C.X && Math.max(A.X, B.X) > C.X && Math.min(C.Y, D.Y) < A.Y && Math.max(C.Y, D.Y) > A.Y) {
                result.value = new CGPoint(C.X, A.Y);
                return true;
            }
        }
        else if (super.IsApprox(C.Y, D.Y) && Math.min(A.Y, B.Y) < C.Y && Math.max(A.Y, B.Y) > C.Y && Math.min(C.X, D.X) < A.X && Math.max(C.X, D.X) > A.X) {
            result.value = new CGPoint(A.X, C.Y);
            return true;
        }
        result.value = new CGPoint(0, 0);
        return false;
    }

    private _getPath(offx: float, offy: float, fromPoly: CGPoint[], toPoly: CGPoint[]): GraphicsPath {
        if (offx !== 0 || offy !== 0 || this.Style === TuStrokeStyle.RoundedLineWithJumpOvers || this.Style === TuStrokeStyle.RoundedLineWithJumpGaps) {
            const graphicsPath: GraphicsPath = new GraphicsPath();
            this.addStroke(graphicsPath, offx, offy, fromPoly, toPoly);
            return graphicsPath;
        }
        if (this.myPath == null) {
            this.myPath = new GraphicsPath();
            this.addStroke(this.myPath, 0, 0, fromPoly, toPoly);
        }
        return this.myPath;
    }

    public /* virtual */ getPoint(i: number): CGPoint {
        if (i < 0 || i >= this.myPointsCount) {
            throw new ArgumentException("TuStroke.getPoint given an invalid index");
        }
        return this.myPoints[i].clone();
    }

    public getSegmentNearPoint(pnt: CGPoint): number {
        const bounds: CGRectangle = this.Bounds;
        let single: float = Math.max(this.PenWidth, 0.1);
        const single1: float = Math.max(this.PickMargin, 0);
        single += single1;
        if (pnt.X < bounds.X - single || pnt.X > bounds.X + bounds.Width + single || pnt.Y < bounds.Y - single || pnt.Y > bounds.Y + bounds.Height + single) {
            return -1;
        }
        const pointsCount: float = this.PointsCount;
        if (pointsCount <= 1) {
            return -1;
        }
        single = single - single1 / 2;
        if (this.Style !== TuStrokeStyle.Bezier || pointsCount < 4) {
            for (let i = 0; i < (pointsCount - 1); i = (i + 1)) {
                if (GeomUtilities.LineContainsPoint(this.getPoint(i), this.getPoint(i + 1), single, pnt.clone())) {
                    return i;
                }
            }
        }
        else {
            single *= Math.max(1, Math.max(bounds.Width, bounds.Height) / 1000);
            for (let j = 3; j < pointsCount; j = (j + 3)) {
                const int32: number = j - 3;
                const point: CGPoint = this.getPoint(j - 3);
                const pointF: CGPoint = this.getPoint(j - 2);
                if (j + 3 >= pointsCount) {
                    j = pointsCount - 1;
                }
                if (GeomUtilities.BezierContainsPoint(point.clone(), pointF.clone(), this.getPoint(j - 1), this.getPoint(j), single, pnt.clone())) {
                    return int32;
                }
            }
        }
        return -1;
    }

    public /* virtual */ insertPoint(i: number, p: CGPoint): void {
        this.internalInsertPoint(i, p);
    }

    private internalInsertPoint(i: number, p: CGPoint): number {
        if (i < 0) {
            throw new ArgumentException("TuStroke.insertPoint given an invalid index, less than zero");
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
        this.myPointsCount = (this.myPointsCount + 1);
        this.myPoints[i] = p.clone();
        if (!this.Initializing) {
            this.InvalidBounds = true;
        }
        this.Changed(1201, i, undefined, GeomUtilities.MakeRect(p), i, undefined, GeomUtilities.MakeRect(p));
        return i;
    }

    private internalRemovePoint(i: number): void {
        if (i < 0 || i >= this.myPointsCount) {
            return;
        }
        this.resetPath();
        const pointF: CGPoint = this.myPoints[i].clone();
        if (this.myPointsCount > (i + 1)) {
            TArray.Copy(this.myPoints, (i + 1), this.myPoints, i, ((this.myPointsCount - i) - 1));
        }
        this.myPointsCount = (this.myPointsCount - 1);
        if (!this.Initializing) {
            this.InvalidBounds = true;
        }
        this.Changed(1202, i, undefined, GeomUtilities.MakeRect(pointF), i, undefined, GeomUtilities.MakeRect(pointF));
    }

    private internalSetPoint(i: number, p: CGPoint): void {
        if (i < 0 || i >= this.myPointsCount) {
            throw new ArgumentException("TuStroke.setPoint given an invalid index");
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
        this.Changed(1203, i, null, GeomUtilities.MakeRect(pointF), i, undefined, GeomUtilities.MakeRect(p));
    }

		/* internal */ static intersectingLines(a1: CGPoint, a2: CGPoint, b1: CGPoint, b2: CGPoint): boolean {
        if ((GeomUtilities.ComparePointWithLine(a1.clone(), a2.clone(), b1.clone()) * GeomUtilities.ComparePointWithLine(a1.clone(), a2.clone(), b2.clone())) > 0) {
            return false;
        }
        return (GeomUtilities.ComparePointWithLine(b1.clone(), b2.clone(), a1.clone()) * GeomUtilities.ComparePointWithLine(b1.clone(), b2.clone(), a2.clone())) <= 0;
    }

		/* internal */ intersectsRectangle(rect: CGRectangle): boolean {
        return TuStroke.StrokesIntersect(this, undefined, rect.clone());
    }

		/* internal */ intersectsStroke(stroke: TuObject): boolean {
        return TuStroke.StrokesIntersect(this, stroke, NullRect);
    }

    public /* override */ makePath(): GraphicsPath {
        return this._getPath(0, 0, undefined, undefined).Clone();
    }

    protected /* override */ OnBoundsChanged(old: CGRectangle): void {
        super.OnBoundsChanged(old.clone());
        const bounds: CGRectangle = this.Bounds;
        if (old.Width !== bounds.Width || old.Height !== bounds.Height) {
            this.Changing(1204);
            GeomUtilities.RescalePoints(this.myPoints, old.clone(), bounds.clone());
            this.InvalidBounds = false;
            this.Changed(1204, 0, null, old, 0, null, bounds);
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

    public /* override */  Paint(g: Graphics, view: TuView): void {
        const pen: Pen = this.Pen;
        if (pen == null) {
            return;
        }
        let pen1: Pen = pen;
        const brush: Brush = this.Brush;
        const pointsCount: number = this.PointsCount;
        let poly: CGPoint[] = undefined;
        let pointFArray: CGPoint[] = undefined;
        if (this.FromArrow && pointsCount >= 2) {
            if (this.myFromArrowInfo == null) {
                this.myFromArrowInfo = new ArrowInfo();
            }
            poly = this.myFromArrowInfo.getPoly(this.getArrowheadPointsCount(false));
            this.calculateArrowhead(this.FromArrowAnchorPoint.clone(), this.FromArrowEndPoint.clone(), false, poly);
        }
        if (this.ToArrow && pointsCount >= 2) {
            if (this.myToArrowInfo == null) {
                this.myToArrowInfo = new ArrowInfo();
            }
            pointFArray = this.myToArrowInfo.getPoly(this.getArrowheadPointsCount(true));
            this.calculateArrowhead(this.ToArrowAnchorPoint.clone(), this.ToArrowEndPoint.clone(), true, pointFArray);
        }
        if (this.Shadowed && this.Pen != null) {
            const shadowOffset: CGSize = this.GetShadowOffset(view);
            const shadowPen: Pen = this.GetShadowPen(view, this.PenWidth);
            if (shadowPen != null) {
                const path: GraphicsPath = this._getPath(shadowOffset.Width, shadowOffset.Height, poly, pointFArray);
                TuShape.DrawPath(g, view, shadowPen, undefined, path);
                super.disposePath(path);
            }
            const shadowBrush: Brush = this.GetShadowBrush(view);
            if (poly != null) {
                this.drawArrowhead(g, view, shadowPen, shadowBrush, false, shadowOffset.Width, shadowOffset.Height, poly);
            }
            if (pointFArray != null) {
                this.drawArrowhead(g, view, shadowPen, shadowBrush, true, shadowOffset.Width, shadowOffset.Height, pointFArray);
            }
        }
        const graphicsPath: GraphicsPath = this._getPath(0, 0, poly, pointFArray);
        const highlightPen: Pen = this.HighlightPen;
        if (highlightPen != null && this.Highlight) {
            TuShape.DrawPath(g, view, highlightPen, undefined, graphicsPath);
        }
        if (pen != null) {
            TuShape.DrawPath(g, view, pen, undefined, graphicsPath);
        }
        super.disposePath(graphicsPath);
        if (poly != null || pointFArray != null) {
            if (pen1.DashStyle !== DashStyle.Solid || pen1.Width > 1) {
                pen1 = new Pen(TuShape.GetPenColor(pen1, CGColor.Black));
                if (poly != null) {
                    this.drawArrowhead(g, view, pen1, brush, false, 0, 0, poly);
                }
                if (pointFArray != null) {
                    this.drawArrowhead(g, view, pen1, brush, true, 0, 0, pointFArray);
                }
                pen1.Dispose();
            }
            else {
                if (poly != null) {
                    this.drawArrowhead(g, view, pen1, brush, false, 0, 0, poly);
                }
                if (pointFArray != null) {
                    this.drawArrowhead(g, view, pen1, brush, true, 0, 0, pointFArray);
                }
            }
        }
        if (this.Layer != null && view != null && (this.Style === TuStrokeStyle.RoundedLineWithJumpOvers || this.Style === TuStrokeStyle.RoundedLineWithJumpGaps)) {
            const goLayerCache: TuLayerCache = this.Layer.FindCache(view);
            if (goLayerCache != null && !goLayerCache.Strokes.Contains(this)) {
                goLayerCache.Strokes.Add(this);
            }
        }
    }

    public /* virtual */ removePoint(i: number): void {
        this.internalRemovePoint(i);
    }
    public /* override */ removeSelectionHandles(sel: TuSelection): void {
        if (this.HighlightWhenSelected) {
            const skipsUndoManager: boolean = this.SkipsUndoManager;
            this.SkipsUndoManager = true;
            this.Highlight = false;
            this.SkipsUndoManager = skipsUndoManager;
        }
        super.RemoveSelectionHandles(sel);
    }


    public /* virtual */ setPoint(i: number, p: CGPoint): void {
        this.internalSetPoint(i, p);
    }

    public /* virtual */ setPoints(points: CGPoint[]): void {
        if (points == null) {
            return;
        }
        this.Changing(1204);
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
        this.Changed(1204, 0, undefined, NullRect, 0, undefined, NullRect);
    }

		/* internal */ static StrokesIntersect(a: TuObject, b: TuObject, br: CGRectangle): boolean {
        const bounds: CGRectangle = a.Bounds;
        if (b != null) {
            br = b.Bounds;
        }
        if (!GeomUtilities.IntersectsRect(bounds.clone(), br.clone())) {
            return false;
        }
        let realLink: TuStroke = as(a, Types.TuStroke);
        if (realLink == null && is.typeof<TuLabeledLink>(a, Types.TuLabeledLink)) {
            realLink = a.RealLink;
        }
        let goStroke: TuStroke = as(b, Types.TuStroke);
        if (goStroke == null && is.typeof<TuLabeledLink>(b, Types.TuLabeledLink)) {
            goStroke = b.RealLink;
        }
        if (realLink == null) {
            if (goStroke == null) {
                return true;
            }
            const single: float = Math.max(goStroke.PenWidth, goStroke.HighlightPenWidth);
            for (let i = 0; i < (goStroke.PointsCount - 1); i = (i + 1)) {
                if (GeomUtilities.IntersectsRect(bounds.clone(), GeomUtilities.RectFromLine(goStroke.getPoint(i), goStroke.getPoint((i + 1)), single))) {
                    return true;
                }
            }
            return false;
        }
        const single1: float = Math.max(realLink.PenWidth, realLink.HighlightPenWidth);
        for (let j = 0; j < (realLink.PointsCount - 1); j = (j + 1)) {
            const point: CGPoint = realLink.getPoint(j);
            const pointF: CGPoint = realLink.getPoint(j + 1);
            if (goStroke != null) {
                const single2: float = Math.max(goStroke.PenWidth, goStroke.HighlightPenWidth);
                for (let k = 0; k < (goStroke.PointsCount - 1); k = (k + 1)) {
                    const point1: CGPoint = goStroke.getPoint(k);
                    const pointF1: CGPoint = goStroke.getPoint(k + 1);
                    if (GeomUtilities.IntersectsRect(GeomUtilities.RectFromLine(point.clone(), pointF.clone(), single1), GeomUtilities.RectFromLine(point1.clone(), pointF1.clone(), single2))) {
                        return true;
                    }
                }
            }
            else if (GeomUtilities.IntersectsRect(br, GeomUtilities.RectFromLine(point.clone(), pointF.clone(), single1))) {
                return true;
            }
        }
        return false;
    }

}

(function staticConstructor() {
    (<any>TuStroke).myIntersections = Array(50);
    for (let i = 0; i < (<any>TuStroke).myIntersections.lenght; i++) {
        (<any>TuStroke).myIntersections[i] = 0;
    }
}
)();
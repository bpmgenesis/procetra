import { TuRoundedRectangle } from './../TuRoundedRectangle/TuRoundedRectangle';
import { TuInputState } from './../TuInputState';
import { ITuLink } from './../ITuLink';
import { TuView } from './../TuView/TuView';
import { GeomUtilities } from './../GeomUtilities';
import { TuSubGraphEvents } from './TuSubGraphEvents';
import { TuShape } from './../TuShape/TuShape';
import { Pen, GraphicTypes, Graphics, GraphicsPath, FillMode, Region, Brush, SolidBrush } from '@tuval/graphics';
import { NullRect } from './../Globals';
import { Spot, MiddleTop, MiddleBottom, Middle, TopLeft, TopRight, BottomRight, BottomLeft } from './../Spot';
import { CGColor, CGSize, CGRectangle, CGPoint } from '@tuval/cg';
import { TuSubGraphState } from './TuSubGraphState';
import { ClassInfo, float, Dictionary, is, foreach, as, CONTINUE, IKeyValuePair, TArray, Out } from '@tuval/core';
import { ITuCollapsible } from '../ITuCollapsible';
import { Types } from '../types';
import { TuSubGraphBase } from './TuSubGraphBase';
import { TuSubGraphHandle } from './TuSubGraphHandle';
import { TuText } from '../TuText/TuText';
import { TuPort } from '../TuPort/TuPort';
import { TuObject } from '../TuObject/TuObject';
import { TuPenInfo } from '../TuShape/TuPenInfo';
import { TuTool } from '../TuTool/TuTool';
import { TuSelection } from '../TuSelection/TuSelection';
import { TuChangedEventArgs } from '../TuChangedEventArgs';
import { TuDocument } from '../TuDocument/TuDocument';
import { TuGroup } from '../TuGroup/TuGroup';
import { TuCopyDictionary } from '../TuCopyDictionary';
import { TuLink } from '../TuLink/TuLink';
import { TuLabeledLink } from '../TuLabeledLink/TuLabeledLink';
import { TuStroke } from '../TuStroke/TuStroke';

const flagCollapsible: number = 33554432;
const flagExpandedResizable: number = 67108864;
const flagWasExpanded: number = 134217728;

@ClassInfo({
    fullName: Types.TuSubGraph,
    instanceof: [
        Types.TuSubGraph,
        Types.ITuCollapsible
    ]
})
export class TuSubGraph extends TuSubGraphBase implements ITuCollapsible {
    private myState: TuSubGraphState = TuSubGraphState.Expanded;
    private myHandle: TuSubGraphHandle;
    private myLabel: TuText;
    private myPort: TuPort;
    private myCollapsedObject: TuObject;
    private myBackgroundColor: CGColor = CGColor.LightBlue;
    private myOpacity: float = 25;
    private myLabelSpot: Spot = MiddleTop;
    private myCollapsedLabelSpot: Spot = Middle;
    private myCorner: CGSize = new CGSize();
    private myCollapsedCorner: CGSize;
    private myTopLeftMargin: CGSize = new CGSize(4, 4);
    private myBottomRightMargin: CGSize = new CGSize(4, 4);
    private myCollapsedTopLeftMargin: CGSize = new CGSize();
    private myCollapsedBottomRightMargin: CGSize = new CGSize();
    private myBorderPenInfo: TuPenInfo;
    private myBoundsHashtable: Dictionary<TuObject, CGRectangle> = new Dictionary<TuObject, CGRectangle>();
    private myPathsHashtable: Dictionary<TuObject, CGPoint[]> = new Dictionary<TuObject, CGPoint[]>();
    private mySavedBoundsInsideMargins: CGRectangle = new CGRectangle();
    private myOriginalResizeDecorationBounds: CGRectangle = new CGRectangle();

    //#region [Property] BackgroundColor
    public get BackgroundColor(): CGColor {
        return this.getBackgroundColor();
    }
    public set BackgroundColor(value: CGColor) {
        this.setBackgroundColor(value);
    }

    protected /*virtual*/ getBackgroundColor(): CGColor {
        return this.myBackgroundColor;
    }
    protected /*virtual*/ setBackgroundColor(value: CGColor) {
        const color: CGColor = this.myBackgroundColor;
        if (color.notEquals(value)) {
            this.myBackgroundColor = value;
            this.Changed(2704, 0, color, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] BorderPen
    public get BorderPen(): Pen {
        return this.getBorderPen();
    }
    public set BorderPen(value: Pen) {
        this.setBorderPen(value);
    }

    protected /*virtual*/ getBorderPen(): Pen {

        if (this.BorderPenInfo == null) {
            return undefined;
        }
        return this.BorderPenInfo.getPen();
    }
    protected /*virtual*/ setBorderPen(value: Pen) {
        this.BorderPenInfo = TuShape.GetPenInfo(value);
    }
    //#endregion

    //#region [Property] BorderPenColor
    public get BorderPenColor(): CGColor {
        return this.getBorderPenColor();
    }
    public set BorderPenColor(value: CGColor) {
        this.setBorderPenColor(value);
    }

    protected /*virtual*/ getBorderPenColor(): CGColor {
        const borderPenInfo: TuPenInfo = this.BorderPenInfo;
        if (borderPenInfo == null) {
            return CGColor.Empty;
        }
        return borderPenInfo.Color;

    }
    protected /*virtual*/ setBorderPenColor(value: CGColor) {
        const borderPenInfo: TuPenInfo = this.BorderPenInfo;
        let goPenInfo: TuPenInfo = undefined;
        if (borderPenInfo != null) {
            if (borderPenInfo.Color.Equals(value)) {
                return;
            }
            if (value.notEquals(CGColor.Empty)) {
                goPenInfo = new TuPenInfo(borderPenInfo);
                goPenInfo.Color = value
            }
            else if (value.notEquals(CGColor.Empty)) {
                goPenInfo = new TuPenInfo();
                goPenInfo.Width = this.BorderPenWidth;
                goPenInfo.Color = value;
            }
            this.BorderPenInfo = goPenInfo;
        }
    }
    //#endregion

    //#region [Property] BorderPenInfo
    public get BorderPenInfo(): TuPenInfo {
        return this.getBorderPenInfo();
    }
    public set BorderPenInfo(value: TuPenInfo) {
        this.setBorderPenInfo(value);
    }

    protected /*virtual*/ getBorderPenInfo(): TuPenInfo {
        return this.myBorderPenInfo;
    }
    protected /*virtual*/ setBorderPenInfo(value: TuPenInfo) {
        const goPenInfo: TuPenInfo = this.myBorderPenInfo;
        const goPenInfo1: TuPenInfo = value;
        if (goPenInfo !== goPenInfo1 && (goPenInfo == null || !goPenInfo.equals(goPenInfo1))) {
            this.myBorderPenInfo = goPenInfo1;
            this.Changed(TuSubGraphEvents.ChangedBorderPen, 0, goPenInfo, NullRect, 0, goPenInfo1, NullRect);
        }
    }
    //#endregion

    //#region [Property] BorderPenWidth
    public get BorderPenWidth(): float {
        return this.getBorderPenWidth();
    }
    public set BorderPenWidth(value: float) {
        this.setBorderPenWidth(value);
    }

    protected /*virtual*/ getBorderPenWidth(): float {
        const borderPenInfo: TuPenInfo = this.BorderPenInfo;
        if (borderPenInfo == null) {
            return 0;
        }
        return borderPenInfo.Width;
    }
    protected /*virtual*/ setBorderPenWidth(value: float) {
        let borderPenInfo: TuPenInfo = this.BorderPenInfo;
        let width: float = 0;
        if (borderPenInfo == null) {
            borderPenInfo = TuShape.PenInfo_Black;
        }
        else {
            width = borderPenInfo.Width;
        }
        if (width !== value) {
            const penInfo: TuPenInfo = new TuPenInfo(borderPenInfo);
            penInfo.Width = value;
            this.BorderPenInfo = penInfo;
        }
    }
    //#endregion

    //#region [Property] BottomRightMargin
    public get BottomRightMargin(): CGSize {
        return this.getBottomRightMargin();
    }
    public set BottomRightMargin(value: CGSize) {
        this.setBottomRightMargin(value);
    }

    protected /*virtual*/ getBottomRightMargin(): CGSize {
        return this.myBottomRightMargin;
    }
    protected /*virtual*/ setBottomRightMargin(value: CGSize) {
        const sizeF: CGSize = this.myBottomRightMargin;
        if (!sizeF.Equals(value) && value.Width >= 0 && value.Height >= 0) {
            this.myBottomRightMargin = value;
            if (!this.Initializing) {
                this.InvalidBounds = true;
            }
            this.Changed(TuSubGraphEvents.ChangedBottomRightMargin, 0, undefined, GeomUtilities.MakeRect(sizeF), 0, undefined, GeomUtilities.MakeRect(value));
        }
    }
    //#endregion

    //#region [Property] CollapsedBottomRightMargin
    public get CollapsedBottomRightMargin(): CGSize {
        return this.getCollapsedBottomRightMargin();
    }
    public set CollapsedBottomRightMargin(value: CGSize) {
        this.setCollapsedBottomRightMargin(value);
    }

    protected /*virtual*/ getCollapsedBottomRightMargin(): CGSize {
        return this.myCollapsedBottomRightMargin;
    }
    protected /*virtual*/ setCollapsedBottomRightMargin(value: CGSize) {
        const sizeF: CGSize = this.myCollapsedBottomRightMargin;
        if (!sizeF.Equals(value) && value.Width >= 0 && value.Height >= 0) {
            this.myCollapsedBottomRightMargin = value;
            if (!this.Initializing) {
                this.InvalidBounds = true;
            }
            this.Changed(2714, 0, undefined, GeomUtilities.MakeRect(sizeF), 0, undefined, GeomUtilities.MakeRect(value));
        }
    }
    //#endregion

    //#region [Property] CollapsedCorner
    public get CollapsedCorner(): CGSize {
        return this.getCollapsedCorner();
    }
    public set CollapsedCorner(value: CGSize) {
        this.setCollapsedCorner(value);
    }

    protected /*virtual*/ getCollapsedCorner(): CGSize {
        return this.myCollapsedCorner;
    }
    protected /*virtual*/ setCollapsedCorner(value: CGSize) {
        const sizeF: CGSize = this.myCollapsedCorner;
        if (!sizeF.Equals(value) && value.Width >= 0 && value.Height >= 0) {
            this.myCollapsedCorner = value;
            this.Changed(TuSubGraphEvents.ChangedCollapsedCorner, 0, undefined, GeomUtilities.MakeRect(sizeF), 0, undefined, GeomUtilities.MakeRect(value));
        }
    }
    //#endregion

    //#region [Property] CollapsedLabelSpot
    public get CollapsedLabelSpot(): Spot {
        return this.getCollapsedLabelSpot();
    }
    public set CollapsedLabelSpot(value: Spot) {
        this.setCollapsedLabelSpot(value);
    }

    protected /*virtual*/ getCollapsedLabelSpot(): Spot {
        return this.myCollapsedLabelSpot;
    }
    protected /*virtual*/ setCollapsedLabelSpot(value: Spot) {
        const int32: Spot = this.myCollapsedLabelSpot;
        if (int32 !== value) {
            this.myCollapsedLabelSpot = value;
            this.Changed(TuSubGraphEvents.ChangedCollapsedLabelSpot, 0, int32, NullRect, 0, value, NullRect);
            if (!this.Initializing) {
                this.layoutChildren(undefined);
            }
        }
    }
    //#endregion

    //#region [Property] CollapsedObject
    public get CollapsedObject(): TuObject {
        return this.getCollapsedObject();
    }
    public set CollapsedObject(value: TuObject) {
        this.setCollapsedObject(value);
    }

    protected /*virtual*/ getCollapsedObject(): TuObject {
        return this.myCollapsedObject;
    }
    protected /*virtual*/ setCollapsedObject(value: TuObject) {
        const goObject: TuObject = this.myCollapsedObject;
        if (goObject !== value) {
            if (goObject != null) {
                this.remove(goObject);
            }
            this.myCollapsedObject = value;
            if (value !== null) {
                this.insertBefore(null, value);
            }
            this.Changed(TuSubGraphEvents.ChangedCollapsedObject, 0, goObject, NullRect, 0, value, NullRect);
            if (!this.Initializing && this.CollapsedObject != null) {
                if (goObject != null) {
                    this.CollapsedObject.Visible = goObject.Visible;
                    this.CollapsedObject.Printable = goObject.Printable;
                    return;
                }
                this.CollapsedObject.Visible = !this.IsExpanded;
                this.CollapsedObject.Printable = !this.IsExpanded;
            }
        }
    }
    //#endregion

    //#region [Property] CollapsedTopLeftMargin
    public get CollapsedTopLeftMargin(): CGSize {
        return this.getCollapsedTopLeftMargin();
    }
    public set CollapsedTopLeftMargin(value: CGSize) {
        this.setCollapsedTopLeftMargin(value);
    }

    protected /*virtual*/ getCollapsedTopLeftMargin(): CGSize {
        return this.myCollapsedTopLeftMargin;
    }
    protected /*virtual*/ setCollapsedTopLeftMargin(value: CGSize) {
        const sizeF: CGSize = this.myCollapsedTopLeftMargin;
        if (!sizeF.Equals(value) && value.Width >= 0 && value.Height >= 0) {
            this.myCollapsedTopLeftMargin = value;
            if (!this.Initializing) {
                this.InvalidBounds = true;
            }
            this.Changed(TuSubGraphEvents.ChangedCollapsedTopLeftMargin, 0, undefined, GeomUtilities.MakeRect(sizeF), 0, undefined, GeomUtilities.MakeRect(value));
        }
    }
    //#endregion

    //#region [Property] Collapsible
    public get Collapsible(): boolean {
        return this.getCollapsible();
    }
    public set Collapsible(value: boolean) {
        this.setCollapsible(value);
    }

    protected /*virtual*/ getCollapsible(): boolean {
        return (this.InternalFlags & flagCollapsible) !== 0;
    }
    protected /*virtual*/ setCollapsible(value: boolean) {
        const internalFlags: boolean = (this.InternalFlags & flagCollapsible) !== 0;
        if (internalFlags != value) {
            if (!value) {
                this.InternalFlags = this.InternalFlags & ~flagCollapsible;
            }
            else {
                this.InternalFlags = this.InternalFlags | flagCollapsible;
            }
            this.Changed(2703, 0, internalFlags, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] Corner
    public get Corner(): CGSize {
        return this.getCorner();
    }
    public set Corner(value: CGSize) {
        this.setCorner(value);
    }

    protected /*virtual*/ getCorner(): CGSize {
        return this.myCorner;
    }
    protected /*virtual*/ setCorner(value: CGSize) {
        const sizeF: CGSize = this.myCorner;
        if (!sizeF.Equals(value) && value.Width >= 0 && value.Height >= 0) {
            this.myCorner = value;
            this.Changed(TuSubGraphEvents.ChangedCorner, 0, undefined, GeomUtilities.MakeRect(sizeF), 0, undefined, GeomUtilities.MakeRect(value));
        }
    }
    //#endregion

    //#region [Property] ExpandedResizable
    public get ExpandedResizable(): boolean {
        return this.getExpandedResizable();
    }
    public set ExpandedResizable(value: boolean) {
        this.setExpandedResizable(value);
    }

    protected /*virtual*/ getExpandedResizable(): boolean {
        return (this.InternalFlags & flagExpandedResizable) !== 0;
    }
    protected /*virtual*/ setExpandedResizable(value: boolean) {
        const internalFlags: boolean = (this.InternalFlags & flagExpandedResizable) != 0;
        if (internalFlags != value) {
            if (!value) {
                this.InternalFlags = this.InternalFlags & ~flagExpandedResizable;
            }
            else {
                this.InternalFlags = this.InternalFlags | flagExpandedResizable;
            }
            this.Changed(2722, 0, internalFlags, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    public get Handle(): TuSubGraphHandle {
        return this.myHandle;
    }

    public get IsExpanded(): boolean {
        return this.State === TuSubGraphState.Expanded;
    }
    public set IsExpanded(value: boolean) {
        if (!value && this.State === TuSubGraphState.Expanded) {
            this.collapse();
            return;
        }
        if (value && this.State === TuSubGraphState.Collapsed) {
            this.expand();
        }
    }

    //#region [Property] Label
    protected /*override*/ getLabel(): TuText {
        return this.myLabel;
    }
    protected /*override*/ setLabel(value: TuText) {
        const goText: TuText = this.myLabel;
        if (goText !== value) {
            if (goText != null) {
                this.Remove(goText);
            }
            this.myLabel = value;
            if (value != null) {
                this.Add(value);
            }
            this.Changed(TuSubGraphEvents.ChangedLabel, 0, goText, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] LabelSpot
    public get LabelSpot(): Spot {
        return this.getLabelSpot();
    }
    public set LabelSpot(value: Spot) {
        this.setLabelSpot(value);
    }

    protected /*virtual*/ getLabelSpot(): Spot {
        return this.myLabelSpot;
    }
    protected /*virtual*/ setLabelSpot(value: Spot) {
        const int32: Spot = this.myLabelSpot;
        if (int32 !== value) {
            this.myLabelSpot = value;
            this.Changed(TuSubGraphEvents.ChangedLabelSpot, 0, int32, NullRect, 0, value, NullRect);
            if (!this.Initializing) {
                this.layoutChildren(undefined);
            }
        }
    }
    //#endregion

    //#region [Property] Location
    protected /*override*/ getLocation(): CGPoint {
        if (this.Handle == null) {
            return this.Position;
        }
        return this.Handle.Position;
    }
    protected /*override*/ setLocation(value: CGPoint): void {
        if (this.Handle == null) {
            this.Position = value;
            return;
        }
        const sizeF: CGSize = TuTool.SubtractPoints(this.Handle.Position, this.Position);
        this.Position = new CGPoint(value.X - sizeF.Width, value.Y - sizeF.Height);
    }
    //#endregion

    //#region [Property] Opacity
    public get Opacity(): float {
        return this.getOpacity();
    }
    public set Opacity(value: float) {
        this.setOpacity(value);
    }

    protected /*virtual*/ getOpacity(): float {
        return this.myOpacity;
    }
    protected /*virtual*/ setOpacity(value: float) {
        const single: float = this.myOpacity;
        if (single != value && value >= 0 && value <= 100) {
            this.myOpacity = value;
            this.Changed(TuSubGraphEvents.ChangedOpacity, single, undefined, NullRect, value, undefined, NullRect);
        }
    }
    //#endregion

    //#region [Property] Port
    public get Port(): TuPort {
        return this.getPort();
    }
    public set Port(value: TuPort) {
        this.setPort(value);
    }

    protected /*virtual*/ getPort(): TuPort {
        return this.myPort;
    }
    protected /*virtual*/ setPort(value: TuPort) {
        const goPort: TuPort = this.myPort;
        if (goPort != value) {
            if (goPort != null) {
                this.remove(goPort);
            }
            this.myPort = value;
            if (value != null) {
                this.insertBefore(null, value);
            }
            this.Changed(TuSubGraphEvents.ChangedPort, 0, goPort, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    public get SavedBounds(): Dictionary<TuObject, CGRectangle> {
        return this.myBoundsHashtable;
    }

    public get SavedPaths(): Dictionary<TuObject, CGPoint[]> {
        return this.myPathsHashtable;
    }

    public get State(): TuSubGraphState {
        return this.myState;
    }

    public set State(value: TuSubGraphState) {
        const goSubGraphState: TuSubGraphState = this.myState;
        if (goSubGraphState != value) {
            this.myState = value;
            this.Changed(TuSubGraphEvents.ChangedState, goSubGraphState, undefined, NullRect, value, undefined, NullRect);
        }
    }

    //#region [Property] TopLeftMargin
    public get TopLeftMargin(): CGSize {
        return this.getTopLeftMargin();
    }
    public set TopLeftMargin(value: CGSize) {
        this.setTopLeftMargin(value);
    }

    protected /*virtual*/ getTopLeftMargin(): CGSize {
        return this.myTopLeftMargin;
    }
    protected /*virtual*/ setTopLeftMargin(value: CGSize) {
        const sizeF: CGSize = this.myTopLeftMargin;
        if (!sizeF.Equals(value) && value.Width >= 0 && value.Height >= 0) {
            this.myTopLeftMargin = value;
            if (!this.Initializing) {
                this.InvalidBounds = true;
            }
            this.Changed(TuSubGraphEvents.ChangedTopLeftMargin, 0, undefined, GeomUtilities.MakeRect(sizeF), 0, undefined, GeomUtilities.MakeRect(value));
        }
    }
    //#endregion

    //#region [Property] WasExpanded
    public get WasExpanded(): boolean {
        return this.getWasExpanded();
    }
    public set WasExpanded(value: boolean) {
        this.setWasExpanded(value);
    }

    protected /*virtual*/ getWasExpanded(): boolean {
        return (this.InternalFlags & flagWasExpanded) != 0;
    }
    protected /*virtual*/ setWasExpanded(value: boolean) {
        const internalFlags: boolean = (this.InternalFlags & flagWasExpanded) != 0;
        if (internalFlags != value) {
            if (!value) {
                this.InternalFlags = this.InternalFlags & ~flagWasExpanded;
            }
            else {
                this.InternalFlags = this.InternalFlags | flagWasExpanded;
            }
            this.Changed(2721, 0, internalFlags, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    constructor() {
        super();
        this.InternalFlags = this.InternalFlags | 33685504;
        this.InternalFlags = this.InternalFlags & -17;
        this.myHandle = this.createHandle();
        this.Add(this.myHandle);
        this.myCollapsedObject = this.createCollapsedObject();
        this.Add(this.myCollapsedObject);
        this.myLabel = this.createLabel();
        this.Add(this.myLabel);
        this.myPort = this.createPort();
        this.insertBefore(undefined, this.myPort);
        this.Initializing = false;
        this.layoutChildren(undefined);
    }

    public /* override */  Add(obj: TuObject): this {
        if (this.Handle == null || this.Count < 1) {
            super.Add(obj);
            return;
        }
        this.insertBefore(this.Handle, obj);
        return this;
    }

    public /*override*/ AddSelectionHandles(sel: TuSelection, selectedObj: TuObject): void {
        let flag: boolean;
        this.RemoveSelectionHandles(sel);
        const view: TuView = sel.View;
        flag = (view == null ? true : view.CanResizeObjects());
        if (this.CanResize() && flag) {
            sel.createBoundingHandle(this, selectedObj);
            return;
        }
        const rectangleF: CGRectangle = this.computeBorder();
        const x: float = rectangleF.X;
        const single: float = rectangleF.X + rectangleF.Width / 2;
        const x1: float = rectangleF.X + rectangleF.Width;
        const y: float = rectangleF.Y;
        const y1: float = rectangleF.Y + rectangleF.Height / 2;
        const single1: float = rectangleF.Y + rectangleF.Height;
        sel.createResizeHandle(this, selectedObj, new CGPoint(x, y), 2, true);
        sel.createResizeHandle(this, selectedObj, new CGPoint(x1, y), 4, true);
        sel.createResizeHandle(this, selectedObj, new CGPoint(x1, single1), 8, true);
        sel.createResizeHandle(this, selectedObj, new CGPoint(x, single1), 16, true);
        sel.createResizeHandle(this, selectedObj, new CGPoint(single, y), 32, true);
        sel.createResizeHandle(this, selectedObj, new CGPoint(x1, y1), 64, true);
        sel.createResizeHandle(this, selectedObj, new CGPoint(single, single1), 128, true);
        sel.createResizeHandle(this, selectedObj, new CGPoint(x, y1), 256, true);
    }

    private static BoundsWithoutMargins(sg: TuSubGraph): CGRectangle {
        let collapsedTopLeftMargin: CGSize = new CGSize();
        let collapsedBottomRightMargin: CGSize = new CGSize();;
        let bounds: CGRectangle = sg.Bounds;
        if (!sg.IsExpanded) {
            collapsedTopLeftMargin = sg.CollapsedTopLeftMargin;
            collapsedBottomRightMargin = sg.CollapsedBottomRightMargin;
        }
        else {
            collapsedTopLeftMargin = sg.TopLeftMargin;
            collapsedBottomRightMargin = sg.BottomRightMargin;
        }
        bounds.X = bounds.X + collapsedTopLeftMargin.Width;
        bounds.Y = bounds.Y + collapsedTopLeftMargin.Height;
        bounds.Width = bounds.Width - (collapsedTopLeftMargin.Width + collapsedBottomRightMargin.Width);
        bounds.Height = bounds.Height - (collapsedTopLeftMargin.Height + collapsedBottomRightMargin.Height);
        return bounds;
    }

    public /*override*/ ChangeValue(e: TuChangedEventArgs, undo: boolean): void {
        switch (e.SubHint) {
            case TuSubGraphEvents.ChangedLabel:
                {
                    this.Label = e.getValue(undo);
                    return;
                }
            case TuSubGraphEvents.ChangedCollapsible:
                {
                    this.Collapsible = e.getValue(undo);
                    return;
                }
            case TuSubGraphEvents.ChangedBackgroundColor:
                {
                    this.BackgroundColor = e.getValue(undo);
                    return;
                }
            case TuSubGraphEvents.ChangedOpacity:
                {
                    this.Opacity = e.getFloat(undo);
                    return;
                }
            case TuSubGraphEvents.ChangedLabelSpot:
                {
                    this.LabelSpot = e.getValue(undo);
                    return;
                }
            case TuSubGraphEvents.ChangedTopLeftMargin:
                {
                    this.TopLeftMargin = e.getSize(undo);
                    return;
                }
            case TuSubGraphEvents.ChangedBorderPen:
                {
                    const value: Pen | TuPenInfo = e.getValue(undo);
                    if (is.typeof<Pen>(value, GraphicTypes.Pen)) {
                        this.BorderPen = value;
                        return;
                    }
                    if (is.typeof<TuPenInfo>(value, Types.TuPenInfo)) {
                        this.BorderPenInfo = value;
                    }
                    return;
                }
            case 2709:
                {
                    super.ChangeValue(e, undo);
                    return;
                }
            case TuSubGraphEvents.ChangedCorner:
                {
                    this.Corner = e.getSize(undo);
                    return;
                }
            case TuSubGraphEvents.ChangedPort:
                {
                    this.Port = e.getValue(undo);
                    return;
                }
            case TuSubGraphEvents.ChangedBottomRightMargin:
                {
                    this.BottomRightMargin = e.getSize(undo);
                    return;
                }
            case TuSubGraphEvents.ChangedCollapsedTopLeftMargin:
                {
                    this.CollapsedTopLeftMargin = e.getSize(undo);
                    return;
                }
            case TuSubGraphEvents.ChangedCollapsedBottomRightMargin:
                {
                    this.CollapsedBottomRightMargin = e.getSize(undo);
                    return;
                }
            case TuSubGraphEvents.ChangedCollapsedCorner:
                {
                    this.CollapsedCorner = e.getSize(undo);
                    return;
                }
            case TuSubGraphEvents.ChangedCollapsedLabelSpot:
                {
                    this.CollapsedLabelSpot = e.getValue(undo);
                    return;
                }
            case TuSubGraphEvents.ChangedCollapsedObject:
                {
                    this.CollapsedObject = e.getValue(undo);
                    return;
                }
            case TuSubGraphEvents.ChangedState:
                {
                    this.State = e.getInt(undo);
                    return;
                }
            case TuSubGraphEvents.ChangedSavedBounds:
                {
                    const goObjects: Dictionary<TuObject, CGRectangle> = e.getValue(undo);
                    if (goObjects == null) {
                        this.myBoundsHashtable.Clear();
                        return;
                    }
                    this.myBoundsHashtable = new Dictionary<TuObject, CGRectangle>(goObjects);
                    return;
                }
            case TuSubGraphEvents.ChangedSavedPaths:
                {
                    const value1: Dictionary<TuObject, CGPoint[]> = e.getValue(undo);
                    if (value1 == null) {
                        this.myPathsHashtable.Clear();
                        return;
                    }
                    this.myPathsHashtable = new Dictionary<TuObject, CGPoint[]>(value1);
                    return;
                }
            case TuSubGraphEvents.ChangedWasExpanded:
                {
                    this.WasExpanded = e.getValue(undo);
                    return;
                }
            case TuSubGraphEvents.ChangedExpandedResizable:
                {
                    this.ExpandedResizable = e.getValue(undo);
                    return;
                }
            default:
                {
                    super.ChangeValue(e, undo);
                    return;
                }
        }
    }

    public /*virtual*/  collapse(): void {
        if (this.State !== TuSubGraphState.Expanded) {
            return;
        }
        if (!this.Collapsible) {
            return;
        }
        const document: TuDocument = this.Document;
        let suspendsRouting: boolean = false;
        if (document != null) {
            suspendsRouting = document.SuspendsRouting;
            document.SuspendsRouting = true;
        }
        this.State = TuSubGraphState.Collapsing;
        this.Changed(TuSubGraphEvents.ChangedInitializing, 0, false, NullRect, 0, true, NullRect);
        this.Changing(TuSubGraphEvents.ChangedSavedPaths);
        this.Changing(TuSubGraphEvents.ChangedSavedBounds);
        this.SavedBounds.Set(this, this.Bounds);
        this.markPortsInside(this, true);
        this.prepareCollapse();
        const rectangleF: CGRectangle = this.computeCollapsedRectangle(this.computeCollapsedSize(true));
        foreach(this, (goObject: TuObject) => {
            this.saveChildBounds(goObject, rectangleF);
        });

        foreach(this, (goObject1: TuObject) => {
            this.collapseChild(goObject1, rectangleF);
        });

        this.finishCollapse(rectangleF);
        this.State = TuSubGraphState.Collapsed;
        this.layoutChildren(undefined);
        this.InvalidBounds = true;
        this.Changed(TuSubGraphEvents.ChangedSavedBounds, 0, undefined, NullRect, 0, undefined, NullRect);
        this.Changed(TuSubGraphEvents.ChangedSavedPaths, 0, undefined, NullRect, 0, undefined, NullRect);
        this.Changed(TuSubGraphEvents.ChangedInitializing, 0, true, NullRect, 0, false, NullRect);
        if (document != null) {
            document.ResumeRouting(suspendsRouting, undefined);
        }
    }

    protected /*virtual*/ collapseChild(child: TuObject, sgrect: CGRectangle): void {
        if (child === this.Handle) {
            return;
        }
        if (child === this.Label) {
            return;
        }
        if (child === this.Port) {
            return;
        }
        if (child === this.CollapsedObject) {
            return;
        }
        if (!is.typeof<ITuLink>(child, Types.ITuLink)) {
            const goSubGraph: TuSubGraph = as(child, Types.TuSubGraph);
            if (goSubGraph != null && goSubGraph.IsExpanded) {
                goSubGraph.WasExpanded = true;
                goSubGraph.collapse();
            }
            const pointF: CGPoint = new CGPoint(sgrect.X + sgrect.Width / 2, sgrect.Y + sgrect.Height / 2);
            child.Position = new CGPoint(pointF.X - child.Width / 2, pointF.Y - child.Height / 2);
        }
        child.Visible = false;
        child.Printable = false;
    }

    public /*virtual*/  computeBorder(): CGRectangle {
        let collapsedTopLeftMargin: CGSize;
        let collapsedBottomRightMargin: CGSize;
        let bounds: CGRectangle = this.computeInsideMargins(undefined);
        if (bounds.Width <= 0 || bounds.Height <= 0) {
            bounds = this.Bounds;
        }
        else {
            if (!this.IsExpanded) {
                collapsedTopLeftMargin = this.CollapsedTopLeftMargin;
                collapsedBottomRightMargin = this.CollapsedBottomRightMargin;
            }
            else {
                collapsedTopLeftMargin = this.TopLeftMargin;
                collapsedBottomRightMargin = this.BottomRightMargin;
            }
            bounds.X = bounds.X - collapsedTopLeftMargin.Width;
            bounds.Y = bounds.Y - collapsedTopLeftMargin.Height;
            bounds.Width = bounds.Width + (collapsedTopLeftMargin.Width + collapsedBottomRightMargin.Width);
            bounds.Height = bounds.Height + (collapsedTopLeftMargin.Height + collapsedBottomRightMargin.Height);
        }
        return bounds.clone();
    }

    public /*override*/  ComputeBounds(): CGRectangle {
        let bounds: CGRectangle = new CGRectangle();
        let flag: boolean = false;
        foreach(this.GetEnumerator(), (enumerator: TuObject) => {
            if (!enumerator.Visible) {
                return CONTINUE;
            }
            const rectangleF: CGRectangle = enumerator.Bounds;
            if (flag) {
                bounds = GeomUtilities.UnionRect(bounds, rectangleF);
            }
            else {
                bounds = rectangleF;
                flag = true;
            }
        });

        if (!flag) {
            bounds = this.Bounds;
        }
        return GeomUtilities.UnionRect(bounds, this.computeBorder());
    }

    protected /*virtual*/ computeCollapsedRectangle(s: CGSize): CGRectangle {
        const pointF: CGPoint = this.computeReferencePoint();
        return new CGRectangle(pointF.X, pointF.Y, s.Width, s.Height);
    }

    public /*virtual*/ computeCollapsedSize(visible: boolean): CGSize {
        let sizeF: CGSize;
        let size: CGSize = new CGSize(0, 0);
        if (!visible || this.CollapsedObject == null) {
            foreach(this, (goObject: TuObject) => {
                if (this.computeCollapsedSizeSkip(goObject)) {
                    return CONTINUE;
                }
                const goSubGraph: TuSubGraph = as(goObject, Types.TuSubGraph);
                if (goSubGraph == null) {
                    sizeF = (goObject.SelectionObject == null ? goObject.Size : goObject.SelectionObject.Size);
                }
                else if (!goSubGraph.IsExpanded) {
                    const rectangleF: CGRectangle = TuSubGraph.BoundsWithoutMargins(goSubGraph);
                    sizeF = new CGSize(rectangleF.Width, rectangleF.Height);
                }
                else {
                    sizeF = goSubGraph.computeCollapsedSize(false);
                }
                size.Width = Math.max(size.Width, sizeF.Width);
                size.Height = Math.max(size.Height, sizeF.Height);
            });

        }
        else {
            size = this.CollapsedObject.Size;
        }
        return size;
    }

    protected /*virtual*/ computeCollapsedSizeSkip(child: TuObject): boolean {
        if (child === this.Handle) {
            return true;
        }
        if (child === this.Label) {
            return true;
        }
        if (child === this.Port) {
            return true;
        }
        if (child === this.CollapsedObject) {
            return true;
        }
        if (is.typeof<ITuLink>(child, Types.ITuLink)) {
            return true;
        }
        if (this.CollapsedObject != null && !child.Visible) {
            return true;
        }
        return false;
    }

    public /*virtual*/ computeInsideMargins(ignore: TuObject): CGRectangle {
        let rectangleF: CGRectangle = new CGRectangle();
        let flag: boolean = false;
        let flag1: boolean = false;
        foreach(this, (goObject: TuObject) => {
            if (ignore != null && goObject === ignore || this.computeInsideMarginsSkip(goObject)) {
                return CONTINUE;
            }
            let bounds: CGRectangle = goObject.Bounds;
            if (!goObject.Visible) {
                const goSubGraph: TuSubGraph = as(goObject, Types.TuSubGraph);
                if (goSubGraph != null) {
                    bounds = TuSubGraph.BoundsWithoutMargins(goSubGraph);
                }
                else if (goObject.SelectionObject != null) {
                    bounds = goObject.SelectionObject.Bounds;
                }
            }
            if (flag) {
                flag1 = true;
                rectangleF = GeomUtilities.UnionRect(rectangleF, bounds);
            }
            else {
                rectangleF = bounds;
                flag = true;
            }
        });

        if (!flag) {
            rectangleF = (this.CollapsedObject == null ? this.mySavedBoundsInsideMargins : this.CollapsedObject.Bounds);
        }
        else if (flag && !flag1) {
            this.mySavedBoundsInsideMargins = rectangleF;
        }
        return rectangleF.clone();
    }

    protected /*virtual*/ computeInsideMarginsSkip(child: TuObject): boolean {
        if (child === this.Handle) {
            return true;
        }
        if (child === this.Label) {
            return !child.Visible;
        }
        if (child === this.Port) {
            return true;
        }
        if (child === this.CollapsedObject) {
            return !child.Visible;
        }
        const goLink: ITuLink = as(child, Types.ITuLink);
        if (goLink != null) {
            if (!child.Visible || !this.IsExpanded) {
                return true;
            }
            if (this.Port != null && (goLink.FromPort === this.Port || goLink.ToPort === this.Port)) {
                return true;
            }
            if (goLink.FromPort != null && goLink.FromPort.TuObject.IsInView) {
                return true;
            }
            if (goLink.ToPort != null && goLink.ToPort.TuObject.IsInView) {
                return true;
            }
        }
        else if (this.CollapsedObject != null && !child.Visible && !this.IsExpanded) {
            return true;
        }
        return false;
    }

    protected /*virtual*/ computeReferencePoint(): CGPoint {
        let pointF: CGPoint;
        pointF = (this.Handle == null ? this.Position : this.Handle.Position);
        return pointF.clone();
    }

    protected /*override*/ copyChildren(newgroup: TuGroup, env: TuCopyDictionary): void {
        const goObjects: TuSubGraph = as(newgroup, Types.TuSubGraph);
        goObjects.myHandle = undefined;
        goObjects.myLabel = undefined;
        goObjects.myPort = undefined;
        goObjects.myCollapsedObject = undefined;
        foreach(this, (goObject: TuObject) => {
            env.copy(goObject);
        });

        foreach(this, (goObject1: TuObject) => {
            const item: TuObject = env.Get(goObject1);
            goObjects.Add(item);
            if (goObject1 === this.myHandle) {
                goObjects.myHandle = as(item, Types.TuSubGraphHandle);
            }
            else if (goObject1 === this.myLabel) {
                goObjects.myLabel = as(item, Types.TuText);
            }
            else if (goObject1 !== this.myPort) {
                if (goObject1 !== this.myCollapsedObject) {
                    return CONTINUE;
                }
                goObjects.myCollapsedObject = item;
            }
            else {
                goObjects.myPort = as(item, Types.TuPort);
            }
        });

        goObjects.myBoundsHashtable = new Dictionary<TuObject, CGRectangle>();
        foreach(this.myBoundsHashtable.GetEnumerator(), (keyValuePair: IKeyValuePair<TuObject, CGRectangle>) => {
            const item1: TuObject = env.Get(keyValuePair.key);
            if (item1 == null) {
                return CONTINUE;
            }
            const value: CGRectangle = keyValuePair.value;
            goObjects.myBoundsHashtable.Set(item1, value);
        });

        goObjects.myPathsHashtable = new Dictionary<TuObject, CGPoint[]>();
        foreach(this.myPathsHashtable.GetEnumerator(), (keyValuePair1: IKeyValuePair<TuObject, CGPoint[]>) => {
            const item2: TuObject = env.Get(keyValuePair1.key);
            if (item2 == null) {
                return CONTINUE;
            }
            const pointFArray: CGPoint[] = keyValuePair1.value;
            goObjects.myPathsHashtable.Set(item2, TArray.Clone(pointFArray));
        });

    }

    public /*override*/ CopyNewValueForRedo(e: TuChangedEventArgs): void {
        const subHint: number = e.SubHint;
        if (subHint == TuSubGraphEvents.ChangedSavedBounds) {
            if (!e.IsBeforeChanging) {
                e.NewValue = new Dictionary<TuObject, CGRectangle>(this.myBoundsHashtable);
            }
            return;
        }
        if (subHint != TuSubGraphEvents.ChangedSavedPaths) {
            super.CopyNewValueForRedo(e);
            return;
        }
        if (!e.IsBeforeChanging) {
            e.NewValue = new Dictionary<TuObject, CGPoint[]>(this.myPathsHashtable);
        }
    }

    protected /*virtual*/ createCollapsedObject(): TuObject {
        return undefined;
    }

    protected /*virtual*/ createHandle(): TuSubGraphHandle {
        return new TuSubGraphHandle();
    }

    protected /*virtual*/  createLabel(): TuText {
        const text: TuText = new TuText();
        text.Selectable = false;
        text.Alignment = MiddleBottom;
        text.Wrapping = true;
        text.Bold = true;
        text.Editable = true;
        return text;
    }

    protected /*virtual*/ createPort(): TuPort {
        return undefined;
    }

    public /*override*/ DoResize(view: TuView, origRect: CGRectangle, newPoint: CGPoint, whichHandle: number, evttype: TuInputState, min: CGSize, max: CGSize): void {
        let rectangleF: CGRectangle;
        if (evttype === TuInputState.Start) {
            this.myOriginalResizeDecorationBounds = this.computeBorder();
        }
        origRect = this.myOriginalResizeDecorationBounds;
        const rectangleF1: CGRectangle = this.computeInsideMargins(undefined);
        rectangleF = (evttype !== TuInputState.Cancel ? this.ComputeResize(origRect, newPoint, whichHandle, new CGSize(rectangleF1.Width, rectangleF1.Height), max, true) : origRect);
        if (this.ResizesRealtime || evttype === TuInputState.Cancel) {
            const sizeF: CGSize = new CGSize(Math.max(0, rectangleF.Right - rectangleF1.Right), Math.max(0, rectangleF.Bottom - rectangleF1.Bottom));
            const sizeF1: CGSize = new CGSize(Math.max(0, rectangleF1.X - rectangleF.X), Math.max(0, rectangleF1.Y - rectangleF.Y));
            if (!this.IsExpanded) {
                this.CollapsedBottomRightMargin = sizeF;
                this.CollapsedTopLeftMargin = sizeF1;
            }
            else {
                this.BottomRightMargin = sizeF;
                this.TopLeftMargin = sizeF1;
            }
            this.layoutChildren(undefined);
            return;
        }
        view.drawXorBox(view.convertDocToView(rectangleF), evttype !== TuInputState.Finish);
        if (evttype === TuInputState.Finish) {
            const sizeF2: CGSize = new CGSize(Math.max(0, rectangleF.Right - rectangleF1.Right), Math.max(0, rectangleF.Bottom - rectangleF1.Bottom));
            const sizeF3: CGSize = new CGSize(Math.max(0, rectangleF1.X - rectangleF.X), Math.max(0, rectangleF1.Y - rectangleF.Y));
            if (!this.IsExpanded) {
                this.CollapsedBottomRightMargin = sizeF2;
                this.CollapsedTopLeftMargin = sizeF3;
            }
            else {
                this.BottomRightMargin = sizeF2;
                this.TopLeftMargin = sizeF3;
            }
            this.layoutChildren(undefined);
        }
    }

    public /*virtual*/ expand(): void {
        if (this.State !== TuSubGraphState.Collapsed) {
            return;
        }
        if (!this.Collapsible) {
            return;
        }
        const document: TuDocument = this.Document;
        let suspendsRouting: boolean = false;
        if (document != null) {
            suspendsRouting = document.SuspendsRouting;
            document.SuspendsRouting = true;
        }
        this.State = TuSubGraphState.Expanding;
        this.Changed(TuSubGraphEvents.ChangedInitializing, 0, false, NullRect, 0, true, NullRect);
        this.Changing(TuSubGraphEvents.ChangedSavedPaths);
        this.Changing(TuSubGraphEvents.ChangedSavedBounds);
        this.markPortsInside(this, false);
        this.prepareExpand();
        const pointF: CGPoint = this.computeReferencePoint();
        foreach(this, (goObject: TuObject) => {
            if (is.typeof<ITuLink>(goObject, Types.ITuLink)) {
                return CONTINUE;
            }
            this.expandChild(goObject, pointF);
        });

        foreach(this, (goObject1: TuObject) => {
            if (!is.typeof<ITuLink>(goObject1, Types.ITuLink)) {
                return CONTINUE;
            }
            this.expandChild(goObject1, pointF);
        });

        const count: boolean = this.SavedBounds.Count <= 1;
        let item: CGRectangle = new CGRectangle();
        if (this.SavedBounds.ContainsKey(this)) {
            item = this.SavedBounds.Get(this);
        }
        this.finishExpand(pointF);
        this.State = TuSubGraphState.Expanded;
        this.layoutChildren(undefined);
        this.InvalidBounds = true;
        if (count) {
            this.Position = new CGPoint(item.X, item.Y);
        }
        this.Changed(TuSubGraphEvents.ChangedSavedBounds, 0, undefined, NullRect, 0, undefined, NullRect);
        this.Changed(TuSubGraphEvents.ChangedSavedPaths, 0, undefined, NullRect, 0, undefined, NullRect);
        this.Changed(TuSubGraphEvents.ChangedInitializing, 0, true, NullRect, 0, false, NullRect);
        if (document != null) {
            document.ResumeRouting(suspendsRouting, undefined);
        }
    }

    public /*virtual*/  expandAll(): void {
        this.expand();
        foreach(this, (goObject: TuObject) => {
            const goSubGraph: TuSubGraph = as(goObject, Types.TuSubGraph);
            if (goSubGraph == null) {
                return CONTINUE;
            }
            goSubGraph.expandAll();
        });

    }

    protected /*virtual*/ expandChild(child: TuObject, hpos: CGPoint): void {
        if (child === this.CollapsedObject) {
            return;
        }
        child.Visible = true;
        child.Printable = true;
        if (is.typeof<TuLink>(child, Types.TuLink) || is.typeof<TuLabeledLink>(child, Types.TuLabeledLink)) {
            let goStroke: TuStroke = undefined;
            goStroke = (!is.typeof<TuLink>(child, Types.TuLink) ? as<TuLabeledLink>(child, Types.TuLabeledLink).RealLink : as<TuLink>(child, Types.TuLink));
            if (goStroke != null && this.SavedPaths.ContainsKey(child)) {
                const item: CGPoint[] = this.SavedPaths.Get(child);
                const pointFArray: CGPoint[] =TArray.Clone(item);
                for (let i = 0; i < item.length; i++) {
                    const x: CGPoint = pointFArray[i].clone();
                    x.X = x.X + hpos.X;
                    x.Y = x.Y + hpos.Y;
                    pointFArray[i] = x.clone();
                }
                goStroke.setPoints(pointFArray);
                const document: TuDocument = child.Document;
                if (document != null) {
                    document.DelayedRoutings.Remove(child);
                    return;
                }
            }
        }
        else if (this.SavedBounds.ContainsKey(child)) {
            const rectangleF: CGRectangle = this.SavedBounds.Get(child);
            const goSubGraph: TuSubGraph = as(child, Types.TuSubGraph);
            if (goSubGraph != null && goSubGraph.WasExpanded) {
                goSubGraph.WasExpanded = false;
                goSubGraph.expand();
            }
            child.Position = new CGPoint(hpos.X + rectangleF.X, hpos.Y + rectangleF.Y);
        }
    }

    public /*override*/ ExpandPaintBounds(rect: CGRectangle, view: TuView): CGRectangle {
        let collapsedTopLeftMargin: CGSize;
        let collapsedBottomRightMargin: CGSize;
        if (!this.IsExpanded) {
            collapsedTopLeftMargin = this.CollapsedTopLeftMargin;
            collapsedBottomRightMargin = this.CollapsedBottomRightMargin;
        }
        else {
            collapsedTopLeftMargin = this.TopLeftMargin;
            collapsedBottomRightMargin = this.BottomRightMargin;
        }
        let single: float = Math.max(1, collapsedTopLeftMargin.Width);
        let single1: float = Math.max(1, collapsedBottomRightMargin.Width);
        let single2: float = Math.max(1, collapsedTopLeftMargin.Height);
        let single3: float = Math.max(1, collapsedBottomRightMargin.Height);
        if (this.Shadowed) {
            const shadowOffset: CGSize = this.GetShadowOffset(view);
            if (shadowOffset.Width >= 0) {
                single1 = Math.max(single1, shadowOffset.Width);
            }
            else {
                single = Math.max(single, -shadowOffset.Width);
            }
            if (shadowOffset.Height >= 0) {
                single3 = Math.max(single3, shadowOffset.Height);
            }
            else {
                single2 = Math.max(single2, -shadowOffset.Height);
            }
        }
        return new CGRectangle(rect.X - single, rect.Y - single2, rect.Width + single + single1, rect.Height + single2 + single3);
    }

    public /*override*/ findChild(name: string): TuObject {
        if (name === "Handle") {
            return this.Handle;
        }
        if (name === "Label") {
            return this.Label;
        }
        if (name === "Port") {
            return this.Port;
        }
        if (name === "CollapsedObject") {
            return this.CollapsedObject;
        }
        return super.findChild(name);
    }

    public /*override*/ findName(child: TuObject): string {
        if (child === this.Handle) {
            return "Handle";
        }
        if (child === this.Label) {
            return "Label";
        }
        if (child === this.Port) {
            return "Port";
        }
        if (child === this.CollapsedObject) {
            return "CollapsedObject";
        }
        return super.findName(child);
    }

    protected /*virtual*/ finishCollapse(sgrect: CGRectangle): void {
        if (this.CollapsedObject != null) {
            this.CollapsedObject.Visible = true;
            this.CollapsedObject.Printable = true;
        }
        if (this.Resizable) {
            this.ExpandedResizable = true;
            this.Resizable = false;
        }
    }

    protected /*virtual*/  finishExpand(hpos: CGPoint): void {
        if (this.CollapsedObject != null) {
            this.CollapsedObject.Visible = false;
            this.CollapsedObject.Printable = false;
        }
        if (this.ExpandedResizable) {
            this.ExpandedResizable = false;
            this.Resizable = true;
        }
        this.SavedBounds.Clear();
        this.SavedPaths.Clear();
    }

    public /*override*/ layoutChildren(childchanged: TuObject): void {
        if (this.Initializing) {
            return;
        }
        if (this.State === TuSubGraphState.Collapsing || this.State === TuSubGraphState.Expanding) {
            return;
        }
        if (childchanged === this.Handle && childchanged != null) {
            return;
        }
        if (childchanged === this.Port && childchanged != null) {
            return;
        }
        this.layoutCollapsedObject();
        this.layoutLabel();
        this.layoutHandle();
        if (this.Handle != null && this.Label != null && this.Handle.Position === this.Label.Position) {
            this.layoutLabel();
        }
        this.layoutPort();
    }

    public /*virtual*/  layoutCollapsedObject(): void {
        let rectangleF: CGRectangle;
        const collapsedObject: TuObject = this.CollapsedObject;
        if (collapsedObject == null) {
            return;
        }
        rectangleF = (!this.IsExpanded ? this.computeCollapsedRectangle(this.computeCollapsedSize(true)) : this.computeInsideMargins(collapsedObject));
        collapsedObject.Position = new CGPoint(rectangleF.X, rectangleF.Y);
    }

    public /*virtual*/ layoutHandle(): void {
        if (!this.IsExpanded) {
            return;
        }
        const handle: TuSubGraphHandle = this.Handle;
        if (handle != null) {
            const rectangleF: CGRectangle = this.computeInsideMargins(null);
            handle.Position = new CGPoint(rectangleF.X, rectangleF.Y);
        }
    }

    public /*virtual*/ layoutLabel(): void {
        let rectangleF: CGRectangle;
        let collapsedLabelSpot: Spot;
        const label: TuText = this.Label;
        if (label == null) {
            return;
        }
        if (!this.IsExpanded) {
            collapsedLabelSpot = this.CollapsedLabelSpot;
            const collapsedObject: TuObject = this.CollapsedObject;
            rectangleF = (collapsedObject == null ? this.computeCollapsedRectangle(this.computeCollapsedSize(true)) : collapsedObject.Bounds);
        }
        else {
            let int32: number = 0;
            if (this.Handle != null) {
                int32++;
            }
            if (this.Label != null) {
                int32++;
            }
            if (this.Port != null) {
                int32++;
            }
            if (this.CollapsedObject != null) {
                int32++;
            }
            if (int32 == this.Count) {
                return;
            }
            collapsedLabelSpot = this.LabelSpot;
            rectangleF = this.computeInsideMargins(label);
        }
        this.positionLabel(label, collapsedLabelSpot, this.GetRectangleSpotLocation(rectangleF, collapsedLabelSpot));
    }

    public /*virtual*/ layoutPort(): void {
        const port: TuPort = this.Port;
        if (port != null) {
            if (this.Handle != null) {
                port.Bounds = this.Handle.Bounds;
                return;
            }
            if (this.Label != null) {
                port.Bounds = this.Label.Bounds;
                return;
            }
            const rectangleF: CGRectangle = this.computeInsideMargins(undefined);
            port.Position = new CGPoint(rectangleF.X, rectangleF.Y);
        }
    }

    private markPortsInside(parent: TuGroup, inside: boolean): void {
        foreach(parent, (goObject: TuObject) => {
            const goPort: TuPort = as(goObject, Types.TuPort);
            if (goPort == null) {
                const goGroups: TuGroup = as(goObject, Types.TuGroup);
                if (goGroups == null || is.typeof(goGroups, Types.TuSubGraph)) {
                    return CONTINUE;
                }
                this.markPortsInside(goGroups, inside);
            }
            else {
                goPort.InsideCollapsedSubGraph = inside;
            }
        });
    }

    protected /*override*/ OnBoundsChanged(old: CGRectangle): void {
        super.OnBoundsChanged(old);
        if (this.State === TuSubGraphState.Collapsed) {
            const item: CGRectangle = this.SavedBounds.Get(this);
            item.X = item.X + (this.Left - old.X);
            item.Y = item.Y + (this.Top - old.Y);
            this.SavedBounds.Set(this, item);
        }
    }

    public /*override*/ Paint(g: Graphics, view: TuView): void {
        if (this.paintsDecoration(view)) {
            this.paintDecoration(g, view);
        }
        super.Paint(g, view);
    }

    protected /* virtual */ paintDecoration(g: Graphics, view: TuView): void {
        let sizeF: CGSize = new CGSize();
        sizeF = (!this.IsExpanded ? this.CollapsedCorner : this.Corner);
        const rectangleF: Out<CGRectangle> = { value: this.computeBorder() };
        const graphicsPath: GraphicsPath = new GraphicsPath(FillMode.Winding);
        if (this.Opacity > 0) {
            TuRoundedRectangle.MakeRoundedRectangularPath(graphicsPath, 0, 0, rectangleF.value, sizeF);
            if (this.Shadowed) {
                const shadowOffset: CGSize = this.GetShadowOffset(view);
                const graphicsPath1: GraphicsPath = new GraphicsPath(FillMode.Winding);
                TuRoundedRectangle.MakeRoundedRectangularPath(graphicsPath1, shadowOffset.Width, shadowOffset.Height, rectangleF.value, sizeF);
                const region: Region = new Region(graphicsPath1);
                region.exclude(graphicsPath);
                g.fillRegion(this.GetShadowBrush(view), region);
                region.dispose();
                graphicsPath1.Dispose();
            }
            const solidBrush: Brush = new SolidBrush(CGColor.FromRgba(this.BackgroundColor, Math.round((this.Opacity / 100 * 255))));
            TuShape.DrawPath(g, view, null, solidBrush, graphicsPath);
            solidBrush.Dispose();
            graphicsPath.reset();
        }
        if (this.BorderPen != null) {
            const single: float = (this.BorderPenInfo != null ? this.BorderPenInfo.Width : this.BorderPen.Width);
            GeomUtilities.InflateRect(rectangleF, -single / 2, -single / 2);
            TuRoundedRectangle.MakeRoundedRectangularPath(graphicsPath, 0, 0, rectangleF.value, sizeF);
            TuShape.DrawPath(g, view, this.BorderPen, null, graphicsPath);
        }
        graphicsPath.Dispose();
    }

    private positionLabel(lab: TuText, spot: Spot, pt: CGPoint): void {
        if (spot !== TopLeft) {
            if (spot === TopRight) {
                lab.Alignment = spot;
                lab.setSpotLocation(BottomRight, pt);
                return;
            }
            if (spot === BottomRight) {
                lab.Alignment = spot;
                lab.setSpotLocation(TopRight, pt);
                return;
            }
            if (spot === BottomLeft) {
                lab.Alignment = spot;
                lab.setSpotLocation(TopLeft, pt);
                return;
            }
            lab.Alignment = this.spotOpposite(spot);
            lab.setSpotLocation(this.spotOpposite(spot), pt);
        }
        else {
            lab.Alignment = spot;
            lab.setSpotLocation(BottomLeft, pt);
            if (this.Handle != null && this.Handle.Position.Equals(lab.Position)) {
                pt.X = pt.X + (this.Handle.Width + 2);
                lab.setSpotLocation(BottomLeft, pt);
                return;
            }
        }
    }

    public /* virtual */ paintsDecoration(view: TuView): boolean {
        if (this.CollapsedObject == null) {
            return true;
        }
        if (!view.IsPrinting) {
            return !this.CollapsedObject.CanView();
        }
        return !this.CollapsedObject.CanPrint();
    }

    protected /*virtual*/ prepareCollapse(): void {
    }

    protected /*virtual*/ prepareExpand(): void {
    }

    public /*override*/ remove(obj?: TuObject): boolean {
        const flag: boolean = super.Remove(obj);
        if (obj === this.myHandle) {
            this.myHandle = null;
        }
        else if (obj === this.myLabel) {
            this.myLabel = undefined;
        }
        else if (obj === this.myPort) {
            this.myPort = undefined;
        }
        else if (obj === this.myCollapsedObject) {
            this.myCollapsedObject = undefined;
        }
        if (this.SavedBounds.ContainsKey(obj)) {
            this.SavedBounds.Remove(obj);
        }
        if (this.SavedPaths.ContainsKey(obj)) {
            this.SavedPaths.Remove(obj);
        }
        return flag;
    }
    protected /*virtual*/ saveChildBounds(child: TuObject, sgrect: CGRectangle): void {
        if (child === this.Handle) {
            return;
        }
        if (child === this.Label) {
            return;
        }
        if (child === this.Port) {
            return;
        }
        if (child === this.CollapsedObject) {
            return;
        }
        const pointF: CGPoint = this.computeReferencePoint();
        if (is.typeof<TuLink>(child, Types.TuLink) || is.typeof<TuLabeledLink>(child, Types.TuLabeledLink)) {
            let goStroke: TuStroke = undefined;
            goStroke = (!is.typeof<TuLink>(child, Types.TuLink) ? (child).RealLink : child);
            if (goStroke != null) {
                const pointFArray: CGPoint[] = goStroke.copyPointsArray();
                for (let i = 0; i < pointFArray.length; i++) {
                    const x: CGPoint = pointFArray[i];
                    x.X = x.X - pointF.X;
                    x.Y = x.Y - pointF.Y;
                    pointFArray[i] = x;
                }
                this.SavedPaths.Set(child, pointFArray);
                return;
            }
        }
        else {
            const bounds: CGRectangle = child.Bounds;
            this.SavedBounds.Set(child, new CGRectangle(bounds.X - pointF.X, bounds.Y - pointF.Y, bounds.Width, bounds.Height));
        }
    }

    public toggle(): void {
        if (this.State === TuSubGraphState.Expanded) {
            this.collapse();
            return;
        }
        if (this.State === TuSubGraphState.Collapsed) {
            this.expand();
        }
    }
}
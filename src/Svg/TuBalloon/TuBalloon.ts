import { TuTool } from './../TuTool/TuTool';
import { TuInputState } from './../TuInputState';
import { TuView } from './../TuView/TuView';
import { TuPolygon } from './../TuPolygon/TuPolygon';
import { ITuHandle } from './../TuHandle/ITuHandle';
import { GeomUtilities } from './../GeomUtilities';
import { NullRect, Pens_LightGray, Brushes_LemonChiffon } from './../Globals';
import { TuBalloonEvents } from './TuBalloonEvents';
import { CGSize, CGPoint, CGRectangle } from '@tuval/cg';
import { Types } from './../types';
import { ClassInfo, float, Out, New, as } from '@tuval/core';
import { TuComment } from '../TuComment/TuComment';
import { ITuRoutable } from '../ITuRoutable';
import { TuObject } from '../TuObject/TuObject';
import { TuSelection } from '../TuSelection/TuSelection';
import { Middle } from '../Spot';
import { TuChangedEventArgs } from '../TuChangedEventArgs';
import { TuText } from '../TuText/TuText';
import { TuCopyDictionary } from '../TuCopyDictionary';
import { TuRectangle } from '../TuRectangle/TuRectangle';
import { TuPolygonEvents } from '../TuPolygon/TuPolygonEvents';
import { TuLayer } from '../TuLayer/TuLayer';
import { TuDocument } from '../TuDocument/TuDocument';

const flagReanchorable: number = 33554432;
const flagNoClearAnchors: number = 67108864;

@ClassInfo({
    fullName: Types.TuComment,
    instanceof: [
        Types.TuComment,
        Types.ITuRoutable
    ]
})
export class TuBalloon extends TuComment implements ITuRoutable {

    // DoResize da kullanmak üzere tutacak.
    public static readonly AnchorHandle: number = 1026;
    private myAnchor: TuObject;
    private myCorner: CGSize = new CGSize(4, 4);
    private myBaseWidth: float = 30;
    private myUnanchoredOffset: CGSize = new CGSize(-30, -30);
    private myTemporaryAnchor: TuObject;

    //#region [Property] Anchor
    public get Anchor(): TuObject {
        return this.getAnchor();
    }
    public set Anchor(value: TuObject) {
        this.setAnchor(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getAnchor(): TuObject {
        return this.myAnchor;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setAnchor(value: TuObject): TuBalloon {
        const goObject: TuObject = this.myAnchor;
        if (goObject !== value) {
            if (goObject != null) {
                goObject.removeObserver(this);
            }
            this.myAnchor = value;
            if (value != null) {
                value.AddObserver(this);
            }
            this.Changed(TuBalloonEvents.ChangedAnchor, 0, goObject, NullRect, 0, value, NullRect);
            if (!this.Initializing && !this.BeingRemoved) {
                this.updateRoute();
            }
        }
        return this;
    }
    //#endregion

    //#region [Property] BaseWidth
    public get BaseWidth(): number {
        return this.getBaseWidth();
    }
    public set BaseWidth(value: number) {
        this.setBaseWidth(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getBaseWidth(): number {
        return this.myBaseWidth;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setBaseWidth(value: number) {
        const single: float = this.myBaseWidth;
        if (single !== value && value > 0) {
            this.myBaseWidth = value;
            this.Changed(TuBalloonEvents.ChangedBaseWidth, 0, undefined, GeomUtilities.MakeRect(single), 0, undefined, GeomUtilities.MakeRect(value));
            if (!this.Initializing) {
                this.updateRoute();
            }
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

    /**
     * @hidden
     */
    protected /*virtual*/ getCorner(): CGSize {
        return this.myCorner;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setCorner(value: CGSize) {
        const sizeF: CGSize = this.myCorner;
        if (!sizeF.Equals(value) && value.Width >= 0 && value.Height >= 0) {
            this.myCorner = value;
            this.Changed(TuBalloonEvents.ChangedCorner, 0, undefined, GeomUtilities.MakeRect(sizeF), 0, undefined, GeomUtilities.MakeRect(value));
            if (!this.Initializing) {
                this.updateRoute();
            }
        }
    }
    //#endregion

    //#region [Property] NoClearAnchors
    public get NoClearAnchors(): boolean {
        return this.getNoClearAnchors();
    }
    public set NoClearAnchors(value: boolean) {
        this.setNoClearAnchors(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getNoClearAnchors(): boolean {
        return (this.InternalFlags & flagNoClearAnchors) !== 0;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setNoClearAnchors(value: boolean) {
        if (value) {
            this.InternalFlags = this.InternalFlags | flagNoClearAnchors;
            return;
        }
        this.InternalFlags = this.InternalFlags & ~flagNoClearAnchors;
    }
    //#endregion

    //#region [Property] Reanchorable
    public get Reanchorable(): boolean {
        return this.getReanchorable();
    }
    public set Reanchorable(value: boolean) {
        this.setReanchorable(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getReanchorable(): boolean {
        return (this.InternalFlags & flagReanchorable) !== 0;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setReanchorable(value: boolean) {
        const internalFlags: boolean = (this.InternalFlags & flagReanchorable) != 0;
        if (internalFlags != value) {
            if (!value) {
                this.InternalFlags = this.InternalFlags & ~flagReanchorable;
            }
            else {
                this.InternalFlags = this.InternalFlags | flagReanchorable;
            }
            this.Changed(TuBalloonEvents.ChangedReanchorable, 0, internalFlags, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] UnanchoredOffset
    public get UnanchoredOffset(): CGSize {
        return this.getUnanchoredOffset();
    }
    public set UnanchoredOffset(value: CGSize) {
        this.setUnanchoredOffset(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getUnanchoredOffset(): CGSize {
        return this.myUnanchoredOffset;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setUnanchoredOffset(value: CGSize) {
        const sizeF: CGSize = this.myUnanchoredOffset;
        if (!sizeF.Equals(value)) {
            this.myUnanchoredOffset = value;
            this.Changed(TuBalloonEvents.ChangedUnanchoredOffset, 0, undefined, GeomUtilities.MakeRect(sizeF), 0, undefined, GeomUtilities.MakeRect(value));
            if (!this.Initializing) {
                this.updateRoute();
            }
        }
    }
    //#endregion

    public /*override*/ AddSelectionHandles(sel: TuSelection, selectedObj: TuObject) {
        super.AddSelectionHandles(sel, selectedObj);
        if (this.Reanchorable) {
            const goHandle: ITuHandle = sel.createResizeHandle(this, selectedObj, this.computeAnchorPoint(), TuBalloon.AnchorHandle, true);
            super.MakeDiamondResizeHandle(goHandle, Middle);
        }
    }

    public /*virtual*/ calculateRoute(): void {
        this.layoutChildren(undefined);
    }

    public /*override*/ ChangeValue(e: TuChangedEventArgs, undo: boolean) {
        switch (e.SubHint) {
            case TuBalloonEvents.ChangedAnchor:
                {
                    this.Anchor = e.getValue(undo);
                    return;
                }
            case TuBalloonEvents.ChangedCorner:
                {
                    this.Corner = e.getSize(undo);
                    return;
                }
            case TuBalloonEvents.ChangedBaseWidth:
                {
                    this.BaseWidth = e.getInt(undo);
                    return;
                }
            case TuBalloonEvents.ChangedUnanchoredOffset:
                {
                    this.UnanchoredOffset = e.getSize(undo);
                    return;
                }
            case TuBalloonEvents.ChangedReanchorable:
                {
                    this.Reanchorable = e.getValue(undo);
                    return;
                }
        }
        super.ChangeValue(e, undo);
    }

    protected /*virtual*/ computeAnchorPoint(): CGPoint {
        let pointF: CGPoint = new CGPoint();
        let center: CGPoint = new CGPoint();
        const pointF1: Out<CGPoint> = New.Out();
        let unanchoredOffset: CGSize = new CGSize();
        pointF = (this.Label == null ? this.Center : this.Label.Center);
        if (this.Anchor != null) {
            center = this.Anchor.Center;
            if (this.Anchor.GetNearestIntersectionPoint(pointF, center, pointF1)) {
                return pointF1.value.clone();
            }
            return center.clone();
        }
        if (this.Label == null) {
            const x: number = pointF.X;
            unanchoredOffset = this.UnanchoredOffset;
            const width = x + unanchoredOffset.Width;
            const y = pointF.Y;
            unanchoredOffset = this.UnanchoredOffset;
            center = new CGPoint({ x: width, y: y + unanchoredOffset.Height });
        }
        else {

            const left = this.Label.Bounds.X;
            unanchoredOffset = this.UnanchoredOffset;
            const single = left + unanchoredOffset.Width;
            const top = this.Label.Bounds.Y;
            unanchoredOffset = this.UnanchoredOffset;
            center = new CGPoint({ x: single, y: top + unanchoredOffset.Height });
        }
        return center.clone();
    }

    public /*override*/ ComputeBounds(): CGRectangle {
        const label: TuText = this.Label;
        if (label == null) {
            return super.ComputeBounds();
        }
        const topLeftMargin: CGSize = this.TopLeftMargin;
        const bottomRightMargin: CGSize = this.BottomRightMargin;
        const labelBounds = label.Bounds;
        return new CGRectangle({ x: labelBounds.X - topLeftMargin.Width, y: labelBounds.Y - topLeftMargin.Height, width: labelBounds.Width + topLeftMargin.Width + bottomRightMargin.Width, height: labelBounds.Height + topLeftMargin.Height + bottomRightMargin.Height });
    }

    public /*override*/ copyObject(env: TuCopyDictionary): TuObject {
        const goBalloon: TuBalloon = as(super.CopyObject(env), Types.TuBalloon);
        if (goBalloon != null) {
            env.Delayeds.Add(this);
        }
        return goBalloon;
    }

    public /*override*/ CopyObjectDelayed(env: TuCopyDictionary, newobj: TuObject): void {
        super.CopyObjectDelayed(env, newobj);
        const item: TuBalloon = as(newobj, Types.TuBalloon);
        item.myAnchor = as(env.Get(this.myAnchor), Types.TuObject);
        item.updateRoute();
    }

    protected /*override*/ createBackground(): TuObject {
        const poly: TuPolygon = new TuPolygon();
        poly.Shadowed = true;
        poly.Selectable = false;
        poly.Pen = Pens_LightGray;
        poly.Brush = Brushes_LemonChiffon;
        return poly;
    }

    public /*override*/ DoResize(view: TuView, origRect: CGRectangle, newPoint: CGPoint, whichHandle: number, evttype: TuInputState, min: CGSize, max: CGSize): void {
        if (whichHandle !== TuBalloon.AnchorHandle) {
            super.DoResize(view, origRect, newPoint, whichHandle, evttype, min, max);
        }
        else {
            switch (evttype) {
                case TuInputState.Cancel:
                    {
                        this.myTemporaryAnchor = undefined;
                        this.pickNewAnchor(newPoint, view, evttype);
                        return;
                    }
                case TuInputState.Start:
                    {
                        break;
                    }
                case TuInputState.Continue:
                    {
                        if (this.myTemporaryAnchor == null) {
                            const goRectangle: TuObject = new TuRectangle();
                            const pointF = this.computeAnchorPoint();
                            goRectangle.Bounds = new CGRectangle({ x: pointF.X, y: pointF.Y, width: 0, height: 0 });
                            this.myTemporaryAnchor = goRectangle;
                        }
                        this.myTemporaryAnchor.Position = newPoint;
                        this.pickNewAnchor(newPoint, view, evttype);
                        this.updateRoute();
                        return;
                    }
                case TuInputState.Finish:
                    {
                        this.myTemporaryAnchor = undefined;
                        this.pickNewAnchor(newPoint, view, evttype);
                        this.updateRoute();
                        return;
                    }
                default:
                    {
                        return;
                    }
            }
        }
    }

    public /*override*/ ExpandPaintBounds(rect: CGRectangle, view: TuView): CGRectangle {
        const background: TuObject = this.Background;
        if (background != null) {
            rect = GeomUtilities.UnionRect(rect, background.Bounds);
            rect = background.ExpandPaintBounds(rect, view);
        }
        return rect;
    }

    public /*override*/ layoutChildren(childchanged: TuObject): void {
        let pointF: CGPoint;
        let outPointF1: Out<CGPoint> = New.Out();

        if (this.Initializing) {
            return;
        }
        const label: TuText = this.Label;
        if (label == null) {
            return;
        }
        const background: TuPolygon = as(this.Background, Types.TuPolygon);
        if (background != null && childchanged !== background) {
            let topLeftMargin: CGSize = this.TopLeftMargin;
            let bottomRightMargin: CGSize = this.BottomRightMargin;
            const labelBounds = label.Bounds;
            const rectangleF: CGRectangle = new CGRectangle({ x: labelBounds.X - topLeftMargin.Width, y: labelBounds.Y - topLeftMargin.Height, width: labelBounds.Width + topLeftMargin.Width + bottomRightMargin.Width, height: labelBounds.Height + topLeftMargin.Height + bottomRightMargin.Height });
            const corner: CGSize = this.Corner;
            let width = corner.Width;
            if (width > rectangleF.Width / 2) {
                width = rectangleF.Width / 2;
            }
            let height = corner.Height;
            if (height > rectangleF.Height / 2) {
                height = rectangleF.Height / 2;
            }
            const x = rectangleF.X;
            const y = rectangleF.Y;
            const single = x + width;
            const single1 = y + height;
            const width1 = x + rectangleF.Width / 2;
            const height1 = y + rectangleF.Height / 2;
            const width2 = x + rectangleF.Width - width;
            const height2 = y + rectangleF.Height - height;
            const single2 = x + rectangleF.Width;
            const height3 = y + rectangleF.Height;
            const bounds: CGRectangle = background.Bounds;
            const suspendsUpdates = background.SuspendsUpdates;
            if (!suspendsUpdates) {
                background.Changing(TuPolygonEvents.ChangedAllPoints);
            }
            background.SuspendsUpdates = true;
            background.clearPoints();
            const single3 = Math.min(rectangleF.Width - width, this.BaseWidth);
            const single4 = Math.min(rectangleF.Height - height, this.BaseWidth);
            const left: number = labelBounds.X;
            const top: number = labelBounds.Y;
            const right: number = labelBounds.X + labelBounds.Width;
            const bottom: number = labelBounds.Y + labelBounds.Height;
            const center: CGPoint = label.Center;
            pointF = (this.myTemporaryAnchor == null ? this.computeAnchorPoint() : this.myTemporaryAnchor.Center);
            label.GetNearestIntersectionPoint(pointF, center, outPointF1);
            const pointF1: CGPoint = outPointF1.value;
            if (pointF1.Y > top || pointF1.X >= width1) {
                background.addPoint(single, y);
            }
            else {
                background.addPoint(x, y);
                background.addPoint(pointF);
                background.addPoint(x + single3, y);
            }
            if (pointF1.Y > top || pointF1.X < width1) {
                background.addPoint(width2, y);
            }
            else {
                background.addPoint(single2 - single3, y);
                background.addPoint(pointF);
                background.addPoint(single2, y);
            }
            if (!(pointF1.X >= right && pointF1.Y < height1)) {
                background.addPoint(single2, single1);
            }
            else {
                background.addPoint(single2, y);
                background.addPoint(pointF);
                background.addPoint(single2, y + single4);
            }
            if (!(pointF1.X >= right && pointF1.Y >= height1)) {
                background.addPoint(single2, height2);
            }
            else {
                background.addPoint(single2, height3 - single4);
                background.addPoint(pointF);
                background.addPoint(single2, height3);
            }
            if (pointF1.Y < bottom || pointF1.X < width1) {
                background.addPoint(width2, height3);
            }
            else {
                background.addPoint(single2, height3);
                background.addPoint(pointF);
                background.addPoint(single2 - single3, height3);
            }
            if (pointF1.Y < bottom || pointF1.X >= width1) {
                background.addPoint(single, height3);
            }
            else {
                background.addPoint(x + single3, height3);
                background.addPoint(pointF);
                background.addPoint(x, height3);
            }
            if (pointF1.X > left || pointF1.Y < height1) {
                background.addPoint(x, height2);
            }
            else {
                background.addPoint(x, height3);
                background.addPoint(pointF);
                background.addPoint(x, height3 - single4);
            }
            if (pointF1.X > left || pointF1.Y >= height1) {
                background.addPoint(x, single1);
            }
            else {
                background.addPoint(x, y + single4);
                background.addPoint(pointF);
                background.addPoint(x, y);
            }
            background.SuspendsUpdates = suspendsUpdates;
            if (!suspendsUpdates) {
                background.Changed(TuPolygonEvents.ChangedAllPoints, 0, undefined, bounds, 0, undefined, background.Bounds);
            }
        }
    }

    protected /*override*/ moveChildren(old: CGRectangle): void {
        super.moveChildren(old);
        this.updateRoute();
    }

    protected /*override*/ OnLayerChanged(oldlayer: TuLayer, newlayer: TuLayer, mainObj: TuObject): void {
        super.OnLayerChanged(oldlayer, newlayer, mainObj);
        if (oldlayer != null && newlayer != null && !this.NoClearAnchors) {
            this.Anchor = undefined;
        }
    }

    protected /*override*/ OnObservedChanged(observed: TuObject, subInt: number, oldI: number, oldVal: any, oldRect: CGRectangle, newI: number, newVal: any, newRect: CGRectangle): void {
        super.OnObservedChanged(observed, subInt, oldI, oldVal, oldRect, newI, newVal, newRect);
        if (observed == this.Anchor) {
            if (subInt === 1001) {
                this.updateRoute();
                return;
            }
            if (subInt === 903 && !this.NoClearAnchors) {
                this.Anchor = undefined;
            }
        }
    }

    protected /*virtual*/ pickNewAnchor(p: CGPoint, view: TuView, evttype: TuInputState): void {
        if (evttype === TuInputState.Finish) {
            const goObject: TuObject = view.pickObject(true, false, p.clone(), true);
            if (goObject !== this) {
                this.Anchor = goObject;
                if (goObject == null) {
                    if (this.Label != null) {
                        this.UnanchoredOffset = TuTool.SubtractPoints(p.clone(), this.Label.Position);
                        return;
                    }
                    this.UnanchoredOffset = TuTool.SubtractPoints(p.clone(), this.Position);
                }
            }
        }
    }

    public /*virtual*/ updateRoute(): void {
        const document: TuDocument = this.Document;
        if (document == null) {
            this.calculateRoute();
            return;
        }
        document.UpdateRoute(this);
    }


}
import { ClassInfo, as, Type, typeOf } from '@tuval/core';
import { Types } from '../types';
import { TuTool } from './TuTool';
import { CGSize, CGRectangle, CGPoint } from '@tuval/cg';
import { ITuHandle } from '../TuHandle/ITuHandle';
import { TuInputState } from '../TuInputState';
import { TuInputEventArgs } from '../TuInputEventArgs';
import { Middle } from '../Spot';
import { TuObject } from '../TuObject/TuObject';

@ClassInfo({
    fullName:Types.TuToolResizing,
    instanceof: [
        Types.TuToolResizing,
        Types.TuTool,
        Types.ITuTool]
 })
export class TuToolResizing extends TuTool {
    public GetType(): Type {
        return typeOf(Types.TuToolResizing);
    }

    private myMinimumSize: CGSize = new CGSize({ width: 1, height: 1 });
    private myMaximumSize: CGSize = new CGSize({ width: 1E+21, height: 1E+21 });
    private myHidesSelectionHandles: boolean = true;
    private myResizeHandle: ITuHandle;
    private myOriginalBounds: CGRectangle = new CGRectangle();
    private myOriginalPoint: CGPoint = new CGPoint();
    private mySelectionHidden: boolean = false;
    private mySelectedObject: TuObject;
    private myRealObject: TuObject;

    //#region [Property] HidesSelectionHandles
    public get HidesSelectionHandles(): boolean {
        return this.getHidesSelectionHandles();
    }
    public set HidesSelectionHandles(value: boolean) {
        this.setHidesSelectionHandles(value);
    }

    protected /*virtual*/ getHidesSelectionHandles(): boolean {
        return this.myHidesSelectionHandles;
    }
    protected /*virtual*/ setHidesSelectionHandles(value: boolean) {
        this.myHidesSelectionHandles = value;
    }
    //#endregion

    //#region [Property] MaximumSize
    public get MaximumSize(): CGSize {
        return this.getMaximumSize();
    }
    public set MaximumSize(value: CGSize) {
        this.setMaximumSize(value);
    }

    protected /*virtual*/ getMaximumSize(): CGSize {
        return this.myMaximumSize;
    }
    protected /*virtual*/ setMaximumSize(value: CGSize) {
        this.myMaximumSize = value;
    }
    //#endregion

    //#region [Property] MinimumSize
    public get MinimumSize(): CGSize {
        return this.getMinimumSize();
    }
    public set MinimumSize(value: CGSize) {
        this.setMinimumSize(value);
    }

    protected /*virtual*/ getMinimumSize(): CGSize {
        return this.myMinimumSize;
    }
    protected /*virtual*/ setMinimumSize(value: CGSize) {
        this.myMinimumSize = value;
    }
    //#endregion

    //#region [Property] OriginalBounds
    public get OriginalBounds(): CGRectangle {
        return this.getOriginalBounds();
    }
    public set OriginalBounds(value: CGRectangle) {
        this.setOriginalBounds(value);
    }

    protected /*virtual*/ getOriginalBounds(): CGRectangle {
        return this.myOriginalBounds;
    }
    protected /*virtual*/ setOriginalBounds(value: CGRectangle) {
        this.myOriginalBounds = value;
    }
    //#endregion

    //#region [Property] OriginalPoint
    public get OriginalPoint(): CGPoint {
        return this.getOriginalPoint();
    }
    public set OriginalPoint(value: CGPoint) {
        this.setOriginalPoint(value);
    }

    protected /*virtual*/ getOriginalPoint(): CGPoint {
        return this.myOriginalPoint;
    }
    protected /*virtual*/ setOriginalPoint(value: CGPoint) {
        this.myOriginalPoint = value;
    }
    //#endregion

    //#region [Property] RealObject
    public get RealObject(): TuObject {
        return this.getRealObject();
    }
    public set RealObject(value: TuObject) {
        this.setRealObject(value);
    }

    protected /*virtual*/ getRealObject(): TuObject {
        return this.myRealObject;
    }
    protected /*virtual*/ setRealObject(value: TuObject) {
        this.myRealObject = value;
    }
    //#endregion

    //#region [Property] ResizeHandle
    public get ResizeHandle(): ITuHandle {
        return this.getResizeHandle();
    }
    public set ResizeHandle(value: ITuHandle) {
        this.setResizeHandle(value);
    }

    protected /*virtual*/ getResizeHandle(): ITuHandle {
        return this.myResizeHandle;
    }
    protected /*virtual*/ setResizeHandle(value: ITuHandle) {
        this.myResizeHandle = value;
    }
    //#endregion

    public /*override*/ canStart(): boolean {
        if (this.FirstInput.IsContextButton) {
            return false;
        }
        if (!this.View.CanResizeObjects()) {
            return false;
        }
        const goHandle: ITuHandle = this.pickResizeHandle(this.FirstInput.DocPoint);
        if (goHandle == null || goHandle.HandledObject == null) {
            return false;
        }
        if (goHandle.HandledObject.CanResize()) {
            return true;
        }
        return goHandle.HandledObject.CanReshape();
    }

    public /*override*/ doCancelMouse(): void {
        if (this.CurrentObject != null) {
            this.LastInput.InputState = TuInputState.Cancel;
            this.CurrentObject.DoResize(this.View, this.OriginalBounds, this.OriginalPoint, this.ResizeHandle.HandleID, TuInputState.Cancel, this.MinimumSize, this.MaximumSize);
        }
        this.TransactionResult = undefined;
        this.stopTool();
    }
    public /*override*/ doMouseMove(): void {
        this.LastInput.InputState = TuInputState.Continue;
        this.doResizing(TuInputState.Continue);
        this.View.batchDraw();
    }

    public /*override*/ doMouseUp(): void {
        this.LastInput.InputState = TuInputState.Finish;
        this.doResizing(TuInputState.Finish);
        this.TransactionResult = "Resize";
        this.View.raiseObjectResized(this.CurrentObject);
        this.stopTool();
        this.View.batchDraw();
    }

    public /*virtual*/ doResizing(evttype: TuInputState): void {
        if (this.CurrentObject == null) {
            return;
        }
        const lastInput: TuInputEventArgs = this.LastInput;
        lastInput.DocPoint = this.View.snapPoint(lastInput.DocPoint, this.CurrentObject);
        lastInput.ViewPoint = this.View.convertDocToView(lastInput.DocPoint);
        const currentObject: TuObject = this.CurrentObject;
        const bounds: CGRectangle = currentObject.Bounds;
        currentObject.DoResize(this.View, this.OriginalBounds, lastInput.DocPoint, this.ResizeHandle.HandleID, evttype, this.MinimumSize, this.MaximumSize);
        if (!this.mySelectionHidden && (bounds === currentObject.Bounds && currentObject.Document === this.View.Document || currentObject.View === this.View)) {
            currentObject.AddSelectionHandles(this.Selection, this.mySelectedObject);
        }

    }

    public /*virtual*/ pickResizeHandle(dc: CGPoint): ITuHandle {
        return as(this.View.pickObject(false, true, dc, true), Types.ITuHandle);
    }

    public /*override*/ start(): void {
        const goHandle: ITuHandle = this.pickResizeHandle(this.FirstInput.DocPoint);
        if (goHandle == null) {
            return;
        }
        const handledObject: TuObject = goHandle.HandledObject;
        if (handledObject == null) {
            return;
        }
        this.CurrentObject = handledObject;
        this.startTransaction();
        if (this.Selection.getHandleCount(handledObject) > 0) {
            this.mySelectedObject = goHandle.SelectedObject;
            if (this.HidesSelectionHandles) {
                this.mySelectionHidden = true;
                handledObject.RemoveSelectionHandles(this.Selection);
            }
        }
        this.ResizeHandle = goHandle;
        this.OriginalBounds = handledObject.Bounds;
        this.OriginalPoint = goHandle.TuObject.GetSpotLocation(Middle);
        this.LastInput.InputState = TuInputState.Start;
        this.doResizing(TuInputState.Start);
    }

    public /*override*/ stop(): void {
        this.View.drawXorBox( new CGRectangle({ x: 0, y: 0, width: 0, height: 0 }), false);
        if (this.mySelectionHidden) {
            this.mySelectionHidden = false;
            const currentObject: TuObject = this.CurrentObject;
            if (currentObject != null && currentObject.Document === this.View.Document) {
                if (this.Selection.Contains(this.mySelectedObject)) {
                    currentObject.AddSelectionHandles(this.Selection, this.mySelectedObject);
                }
                else {
                    this.Selection.Add(this.mySelectedObject);
                }
            }
        }
        this.mySelectedObject = undefined;
        this.CurrentObject = undefined;
        this.ResizeHandle = undefined;
        this.stopTransaction();
    }
}
import { ClassInfo, Type, typeOf } from '@tuval/core';
import { Types } from '../types';
import { TuTool } from './TuTool';
import { CGSize, CGRectangle, CGPoint } from '@tuval/cg';
import { TuView } from '../TuView/TuView';
import { Keys } from '../Forms/Keys';
import { TuObject } from '../TuObject/TuObject';

@ClassInfo({
    fullName: Types.TuToolCreating,
    instanceof: [
        Types.TuToolCreating,
        Types.TuTool,
        Types.ITuTool]
})
export class TuToolCreating extends TuTool {
    public GetType(): Type {
        return typeOf(Types.TuToolCreating);
    }

    private myModal: boolean = false;
    private myOneShot: boolean = true;
    private myAutoScrolling: boolean = true;
    private myPrototype: TuObject;
    private myMinimumSize: CGSize = new CGSize({ width: 10, height: 10 });
    private myMaximumSize: CGSize = new CGSize({ width: 999999, height: 999999 });
    private myResizesSelectionObject: boolean = true;
    private mySnapsToGrid: boolean = false;
    private myNewObject: TuObject;
    private myActive: boolean = false;

    //#region [Property] Active
    public get Active(): boolean {
        return this.getActive();
    }
    public set Active(value: boolean) {
        this.setActive(value);
    }

    protected /*virtual*/ getActive(): boolean {
        return this.myActive;
    }
    protected /*virtual*/ setActive(value: boolean) {
        this.myActive = value;
    }
    //#endregion

    //#region [Property] AutoScrolling
    public get AutoScrolling(): boolean {
        return this.getAutoScrolling();
    }
    public set AutoScrolling(value: boolean) {
        this.setAutoScrolling(value);
    }

    protected /*virtual*/ getAutoScrolling(): boolean {
        return this.myAutoScrolling;
    }
    protected /*virtual*/ setAutoScrolling(value: boolean) {
        this.myAutoScrolling = value;
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
        if (value.Width > 0 && value.Height > 0) {
            this.myMaximumSize = value;
        }
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
        if (value.Width > 0 && value.Height > 0) {
            this.myMinimumSize = value;
        }
    }
    //#endregion

    //#region [Property] Modal
    public get Modal(): boolean {
        return this.getModal();
    }
    public set Modal(value: boolean) {
        this.setModal(value);
    }

    protected /*virtual*/ getModal(): boolean {
        return this.myModal;
    }
    protected /*virtual*/ setModal(value: boolean) {
        this.myModal = value;
    }
    //#endregion

    //#region [Property] NewObject
    public get NewObject(): TuObject {
        return this.getNewObject();
    }
    public set NewObject(value: TuObject) {
        this.setNewObject(value);
    }

    protected /*virtual*/ getNewObject(): TuObject {
        return this.myNewObject;
    }
    protected /*virtual*/ setNewObject(value: TuObject) {
        this.myNewObject = value;
    }
    //#endregion

    //#region [Property] OneShot
    public get OneShot(): boolean {
        return this.getOneShot();
    }
    public set OneShot(value: boolean) {
        this.setOneShot(value);
    }

    protected /*virtual*/ getOneShot(): boolean {
        return this.myOneShot;
    }
    protected /*virtual*/ setOneShot(value: boolean) {
        this.myOneShot = value;
    }
    //#endregion

    //#region [Property] Prototype
    public get Prototype(): TuObject {
        return this.getPrototype();
    }
    public set Prototype(value: TuObject) {
        this.setPrototype(value);
    }

    protected /*virtual*/ getPrototype(): TuObject {
        return this.myPrototype;
    }
    protected /*virtual*/ setPrototype(value: TuObject) {
        this.myPrototype = value;
    }
    //#endregion

    //#region [Property] ResizesSelectionObject
    public get ResizesSelectionObject(): boolean {
        return this.getResizesSelectionObject();
    }
    public set ResizesSelectionObject(value: boolean) {
        this.setResizesSelectionObject(value);
    }

    protected /*virtual*/ getResizesSelectionObject(): boolean {
        return this.myResizesSelectionObject;
    }
    protected /*virtual*/ setResizesSelectionObject(value: boolean) {
        this.myResizesSelectionObject = value;
    }
    //#endregionc

    //#region [Property] SnapsToGrid
    public get SnapsToGrid(): boolean {
        return this.getSnapsToGrid();
    }
    public set SnapsToGrid(value: boolean) {
        this.setSnapsToGrid(value);
    }

    protected /*virtual*/ getSnapsToGrid(): boolean {
        return this.mySnapsToGrid;
    }
    protected /*virtual*/ setSnapsToGrid(value: boolean) {
        this.mySnapsToGrid = value;
    }
    //#endregionc

    constructor(view: TuView) {
        super(view);
    }

    private activate(): void {
        this.Active = true;
        if (!this.FirstInput.Shift && !this.Selection.IsEmpty) {
            this.Selection.Clear();
        }
    }

    public /*override*/ canStart(): boolean {
        if (!this.View.CanSelectObjects()) {
            return false;
        }
        if (this.LastInput.IsContextButton) {
            return false;
        }
        if (!this.isBeyondDragSize()) {
            return false;
        }
        return this.View.pickObject(true, false, this.FirstInput.DocPoint, true) == null;
    }

    public /*virtual*/ computeBox(): CGRectangle {
        let docPoint: CGPoint = this.FirstInput.DocPoint;
        let pointF: CGPoint = this.LastInput.DocPoint;
        if (this.SnapsToGrid) {
            docPoint = this.View.snapPoint(docPoint, this.NewObject);
            pointF = this.View.snapPoint(pointF, this.NewObject);
        }
        const rectangleF: CGRectangle = new CGRectangle({
            x: Math.min(pointF.X, docPoint.X),
            y: Math.min(pointF.Y, docPoint.Y),
            width: Math.abs(pointF.X - docPoint.X),
            height: Math.abs(pointF.Y - docPoint.Y)
        });

        const minimumSize: CGSize = this.MinimumSize;
        const maximumSize: CGSize = this.MaximumSize;
        if (rectangleF.Width < minimumSize.Width) {
            rectangleF.Width = minimumSize.Width;
        }
        else if (rectangleF.Width > maximumSize.Width) {
            rectangleF.Width = maximumSize.Width;
        }
        if (rectangleF.Height < minimumSize.Height) {
            rectangleF.Height = minimumSize.Height;
        }
        else if (rectangleF.Height > maximumSize.Height) {
            rectangleF.Height = maximumSize.Height;
        }
        return rectangleF;
    }

    public /*virtual*/ copyPrototype(): TuObject {
        if (this.Prototype == null) {
            return undefined;
        }
        return this.View.Document.createCopyDictionary().CopyComplete(this.Prototype);
    }

    public /*override*/ doCancelMouse(): void {
        if (!this.Active || !this.Modal || this.OneShot) {
            this.stopTool();
            return;
        }
        if (this.NewObject != null && this.NewObject.IsInView) {
            this.NewObject.Remove();
        }
        this.NewObject = undefined;
    }

    public /*virtual*/ doCreate(): void {
        const newObject: TuObject = this.NewObject;
        if (newObject != null) {
            newObject.Remove();
            if (this.Modal && !this.OneShot) {
                this.View.startTransaction();
            }
            if (!this.ResizesSelectionObject) {
                newObject.Bounds = this.computeBox();
            }
            else {
                newObject.SelectionObject.Bounds = this.computeBox();
            }
            this.View.Document.Add(newObject);
            this.View.Selection.select(newObject);
            if (this.Modal && !this.OneShot) {
                this.View.finishTransaction("Drag Created");
                return;
            }
            this.TransactionResult = "Drag Created";
        }
    }

    public /*override*/ doKeyDown(): void {
        if (this.Modal && !this.OneShot) {
            const control: boolean = this.LastInput.Control;
            const key: Keys = this.LastInput.Key;
            if (control && key === Keys.Z) {
                this.View.undo();
            }
            else if (control && key === Keys.Y) {
                this.View.redo();
            }
        }
        super.doKeyDown();
    }

    public /*override*/ doMouseDown(): void {
        this.activate();
    }

    public /*override*/ doMouseMove(): void {
        if (!this.Active) {
            if (this.Modal) {
                return;
            }
            this.activate();
        }
        if (this.NewObject == null) {
            this.NewObject = this.copyPrototype();
            if (this.NewObject == null) {
                return;
            }
            this.View.Layers.Default.Add(this.NewObject);
        }
        if (!this.ResizesSelectionObject) {
            this.NewObject.Bounds = this.computeBox();
        }
        else {
            this.NewObject.SelectionObject.Bounds = this.computeBox();
        }
        if (this.AutoScrolling) {
            this.View.doAutoScroll(this.LastInput.ViewPoint);
        }
    }

    public /*override*/ doMouseUp(): void {
        if (this.Active) {
            this.doCreate();
            this.NewObject = undefined;
            this.Active = false;
        }
        if (this.OneShot) {
            this.stopTool();
        }
    }

    public /*override*/ start(): void {
        if (!this.Modal || this.OneShot) {
            this.startTransaction();
        }
        this.View.CursorName = "crosshair";
    }

    public /*override*/  stop(): void {
        if (this.NewObject != null && this.NewObject.IsInView) {
            this.NewObject.Remove();
        }
        this.NewObject = undefined;
        this.View.stopAutoScroll();
        this.View.CursorName = "default";
        this.Active = false;
        if (!this.Modal || this.OneShot) {
            this.stopTransaction();
        }
    }
}
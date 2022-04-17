import { ClassInfo, ArgumentNullException, Type, typeOf } from '@tuval/core';
import { Types } from '../types';
import { ITuTool } from './ITuTool';
import { CGSize, CGPoint } from '@tuval/cg';
import { TuView } from '../TuView/TuView';
import { TuInputEventArgs } from '../TuInputEventArgs';
import { TuSelection } from '../TuSelection/TuSelection';
import { TuObject } from '../TuObject/TuObject';
import { Keys } from '../Forms/Keys';

@ClassInfo({
    fullName: Types.TuTool,
    instanceof: [
        Types.ITuTool
    ]
})
export abstract class TuTool implements ITuTool {
    private static myDragSize: CGSize;
    private myView: TuView;
    private myTransactionResult: string;
    private myCurrentObject: TuObject;
    private myCurrentObjectWasSelected: boolean;

    //#region [Property] CurrentObject

    /**
     * Gets or sets this tool's CurrentObject property.
     * <h4>Description</h4>
     * Often different methods of a tool will need to deal with the "current"
     * [[Node]] that the user is working with. This property is provided so each
     * tool doesn't need to define it. Not every tool uses this property.
     */
    public get CurrentObject(): TuObject {
        return this.getCurrentObject();
    }
    public set CurrentObject(value: TuObject) {
       /*  if (value == null) {
            console.log('Current object : ' + value);
        } */
        this.setCurrentObject(value);
    }

    protected /*virtual*/ getCurrentObject(): TuObject {
        return this.myCurrentObject;
    }
    protected /*virtual*/ setCurrentObject(value: TuObject) {
        this.myCurrentObject = value;
    }
    //#endregion

    //#region [Property] CurrentObjectWasSelected
    public get CurrentObjectWasSelected(): boolean {
        return this.getCurrentObjectWasSelected();
    }
    public set CurrentObjectWasSelected(value: boolean) {
        this.setCurrentObjectWasSelected(value);
    }

    protected /*virtual*/ getCurrentObjectWasSelected(): boolean {
        return this.myCurrentObjectWasSelected;
    }
    protected /*virtual*/ setCurrentObjectWasSelected(value: boolean) {
        this.myCurrentObjectWasSelected = value;
    }
    //#endregion

    //#region [Property] DragSize

    /**
     *  Gets or sets the dimensions, in pixels, of the rectangle that a drag operation must extend
     * to be considered a drag operation.
     * This <c>Size</c> is in view coordinates, not in document coordinates.
     * The default value is 4x4.
     * The rectangle is centered on the mouse-down point.
     */
    public static get DragSize(): CGSize {
        return TuTool.myDragSize;
    }
    public static set DragSize(value: CGSize) {
        TuTool.myDragSize = value;
    }
    //#endregion

    //#region [Property] FirstInput

    /**
     * Gets this view's FirstInput property.
     */
    public get FirstInput(): TuInputEventArgs {
        return this.View.FirstInput;
    }
    //#endregion

    //#region [Property] LastInput
    public get LastInput(): TuInputEventArgs {
        return this.View.LastInput;
    }
    //#endregion

    //#region [Property] Selection
    public get Selection(): TuSelection {
        return this.View.Selection;
    }
    //#endregion

    //#region [Property] View
    public get View(): TuView {
        return this.getView();
    }
    public set View(value: TuView) {
        this.setView(value);
    }

    protected /*virtual*/ getView(): TuView {
        return this.myView;
    }
    protected /*virtual*/ setView(value: TuView) {
        this.myView = value;
    }
    //#endregion

    //#region [Property] TransactionResult
    public get TransactionResult(): string {
        return this.getTransactionResult();
    }
    public set TransactionResult(value: string) {
        this.setTransactionResult(value);
    }

    protected /*virtual*/ getTransactionResult(): string {
        return this.myTransactionResult;
    }
    protected /*virtual*/ setTransactionResult(value: string) {
        this.myTransactionResult = value;
    }
    //#endregion

    constructor(view: TuView) {
        if (view == null) {
            throw new ArgumentNullException("view");
        }
        this.myView = view;
    }
    public abstract GetType(): Type ;

    public /*virtual*/  canStart(): boolean {
        return true;
    }

    public /*virtual*/  doCancelMouse(): void {
        this.stopTool();
    }

    public /*virtual*/ doClick(evt: TuInputEventArgs): boolean {
        if (evt.DoubleClick) {
            return this.View.doDoubleClick(evt);
        }
        return this.View.doSingleClick(evt);
    }

    public /*virtual*/ doKeyDown(): void {
        if (this.LastInput.Key === Keys.Escape) {
            this.doCancelMouse();
        }
    }

    public /*virtual*/ doMouseDown(): void {
    }

    public /*virtual*/ doMouseHover(): void {
    }

    public /*virtual*/ doMouseMove(): void {
    }
    public /*virtual*/ doMouseUp(): void {
        this.stopTool();
    }

    public /*virtual*/ doMouseWheel(): void {
    }

    public /*virtual*/ doSelect(evt: TuInputEventArgs) {
        this.CurrentObject = this.View.pickObject(true, false, evt.DocPoint, true);
        this.CurrentObjectWasSelected = this.View.Selection.Contains(this.CurrentObject);
        if (this.CurrentObject == null) {
            if (!evt.Control && !evt.Shift) {
                this.Selection.Clear();
            }
            return;
        }
        if (evt.Control) {
            this.Selection.toggle(this.CurrentObject);
            return;
        }
        if (evt.Shift) {
            this.Selection.Add(this.CurrentObject);
            return;
        }
        this.Selection.select(this.CurrentObject);
    }

    public /*virtual*/ isBeyondDragSize(): boolean {
        const viewPoint: CGPoint = this.View.FirstInput.ViewPoint;
        const point: CGPoint = this.View.LastInput.ViewPoint;
        if (Math.abs(point.X - viewPoint.X) > TuTool.DragSize.Width / 2) {
            return true;
        }
        return Math.abs(point.Y - viewPoint.Y) > TuTool.DragSize.Height / 2;
    }

    public /*virtual*/  start(): void {
    }

    public startTransaction(): boolean {
        this.TransactionResult = undefined;
        return this.View.startTransaction();
    }

    public /*virtual*/ stop(): void {
    }

    public stopTool(): void {
        if (this.View.Tool === this) {
            this.View.Tool = undefined;
        }
    }

    public stopTransaction(): boolean {
        if (this.TransactionResult == null) {
            return this.View.AbortTransaction();
        }
        return this.View.finishTransaction(this.TransactionResult);
    }

    public static SubtractPoints(a: CGPoint, b: CGPoint): CGSize;
    public static SubtractPoints(a: CGPoint, b: CGSize): CGSize;
    public static SubtractPoints(a: CGSize, b: CGPoint): CGSize;
    public static SubtractPoints(a: CGPoint | CGSize, b: CGPoint | CGSize): CGSize {

        if (a instanceof CGPoint && b instanceof CGPoint) {
            return new CGSize(a.X - b.X, a.Y - b.Y);
        }

        if (a instanceof CGPoint && b instanceof CGSize) {
            return new CGSize(a.X - b.Width, a.Y - b.Height);
        }

        if (a instanceof CGSize && b instanceof CGPoint) {
            return new CGSize(a.Width - b.X, a.Height - b.Y);
        }
    }
}

(function staticConstructorTool() {
    TuTool.DragSize = new CGSize(4, 4);
})();

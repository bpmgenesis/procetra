import { ITuUndoableEdit } from "./ITuUndoableEdit";
import { CGRectangle, CGPoint, CGSize } from '@tuval/cg';
import { as, float } from '@tuval/core';
import { Types } from './types';
import { TuObject } from "./TuObject/TuObject";
import { TuDocument } from "./TuDocument/TuDocument";

export class TuChangedEventArgs implements ITuUndoableEdit {
    private myIsBeforeChanging: boolean;
    private myDocument: TuDocument;
    private myHint: number;
    private mySubHint: number;
    private myObject: any;
    private myOldInt: number;
    private myOldValue: any;
    private myOldRect: CGRectangle;
    private myNewInt: number;
    private myNewValue: any;
    private myNewRect: CGRectangle;

    //#region [Property] Document

    /**
     * Gets or sets the [[Document]] that raised the Changed event described
     * by this <i>EventArgs</i>.
     * <h4>Description</h4>
     * This value must be the same as the [[Document]] <i>sender</i>
     * of a [[Document.changed]] event.
     */
    public get Document(): TuDocument {
        return this.GetDocument();
    }
    public set Document(value: TuDocument) {
        this.SetDocument(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ GetDocument(): TuDocument {
        return this.myDocument;
    }

    /**
     * @hidden
     * @param value
     */
    protected /*virtual*/ SetDocument(value: TuDocument) {
        this.myDocument = value;
    }
    //#endregion

    //#region [Property] Node

    /**
     * Gets the [[ChangedEventArgs.Object]] as a [[ChangedEventArgs.Node]]".
     * <h5><i>value</i></h5>
     * This should always be non-null when the [[ChangedEventArgs.Event]] is
     * [[Layer]]. [[Layer.changedObject]].
     */

    public get TuObject(): TuObject {
        return this.GetTuObject();
    }

    /**
     * @hidden
     */
    protected /*virtual*/ GetTuObject(): TuObject {
        return as(this.myObject, Types.TuObject);
    }

    //#endregion

    //#region [Property] Hint

    /**
     * Gets or sets the general category of document Changed event.
     * <h4>Description</h4>
     * Predefined Document, LayerCollection, and Layer events
     * See the complete list in the documentation for [[Document.raiseChanged]]".
     * One frequently used event is [[Layer.changedObject]], which uses many
     * different sunEvent describing the individual [[ChangedEventArgs.Node]]" changes.
     */

    public get Hint(): number {
        return this.GetEvent();
    }
    public set Hint(value: number) {
        this.SetEvent(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ GetEvent(): number {
        return this.myHint;
    }

    /**
     * @hidden
     * @param value
     */
    protected /*virtual*/ SetEvent(value: number) {
        this.myHint = value;
    }
    //#endregion

    //#region [Property] IsBeforeChanging

    /**
     * Gets or sets whether this event args/undoable edit was created by
     * a document Changed event that represents a call to
     * [[Document.raiseChanging]] or by a call to [[Document.raiseChanged]].
     */

    public get IsBeforeChanging(): boolean {
        return this.GetIsBeforeChanging();
    }
    public set IsBeforeChanging(value: boolean) {
        this.SetIsBeforeChanging(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ GetIsBeforeChanging(): boolean {
        return this.myIsBeforeChanging;
    }

    /**
     * @hidden
     * @param value
     */
    protected /*virtual*/ SetIsBeforeChanging(value: boolean) {
        this.myIsBeforeChanging = value;
    }
    //#endregion

    //#region [Property] NewInt

    /**
     * Gets or sets the new integer value information for a change.
     */
    public get NewInt(): number {
        return this.GetNewInt();
    }
    public set NewInt(value: number) {
        this.SetNewInt(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ GetNewInt(): number {
        return this.myNewInt;
    }

    /**
     * @hidden
     * @param value
     */
    protected /*virtual*/ SetNewInt(value: number) {
        this.myNewInt = value;
    }
    //#endregion

    //#region [Property] NewRect

    /**
     * Gets or sets the new number, Position, Size, or Rectangle value
     * information for a change.
     */
    public get NewRect(): CGRectangle {
        return this.getNewRect();
    }
    public set NewRect(value: CGRectangle) {
        this.setNewRect(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getNewRect(): CGRectangle {
        return this.myNewRect;
    }

    /**
     * @hidden
     * @param value
     */
    protected /*virtual*/ setNewRect(value: CGRectangle) {
        this.myNewRect = value;
    }
    //#endregion

    //#region [Property] NewValue

    /**
     * Gets or sets the new arbitrary object value information for a change,
     * including boolean values.
     */
    public get NewValue(): any {
        return this.getNewValue();
    }
    public set NewValue(value: any) {
        this.setNewValue(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getNewValue(): any {
        return this.myNewValue;
    }

    /**
     * @hidden
     * @param value
     */
    protected /*virtual*/ setNewValue(value: any) {
        this.myNewValue = value;
    }
    //#endregion

    //#region [Property] Object

    /**
     * Gets or sets the object that was changed by the document Changed event.
     * <h4>Description</h4>
     * This may be null when the [[ChangedEventArgs.Event]] implies the object, such
     * as for property changes on the document itself.
     */
    public get Object(): any {
        return this.getObject();
    }
    public set Object(value: any) {
        this.setObject(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getObject(): any {
        return this.myObject;
    }

    /**
     * @hidden
     * @param value
     */
    protected /*virtual*/ setObject(value: any) {
        this.myObject = value;
    }
    //#endregion


    //#region [Property] OldInt

    /**
     * Gets or sets the new integer value information for a change.
     */
    public get OldInt(): number {
        return this.getOldInt();
    }
    public set OldInt(value: number) {
        this.setOldInt(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getOldInt(): number {
        return this.myOldInt;
    }

    /**
     * @hidden
     * @param value
     */
    protected /*virtual*/ setOldInt(value: number) {
        this.myOldInt = value;
    }
    //#endregion

    //#region [Property] OldRect

    /**
     * Gets or sets the previous or old number, Position, Size, or Rectangle
     * value information for a change.
     */
    public get OldRect(): CGRectangle {
        return this.getOldRect();
    }
    public set OldRect(value: CGRectangle) {
        this.setOldRect(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getOldRect(): CGRectangle {
        return this.myOldRect;
    }

    /**
     * @hidden
     * @param value
     */
    protected /*virtual*/ setOldRect(value: CGRectangle) {
        this.myOldRect = value;
    }
    //#endregion

    //#region [Property] OldValue

    /**
     * Gets or sets the previous or old arbitrary object value information
     * for a change, including boolean values.
     */
    public get OldValue(): any {
        return this.getOldValue();
    }
    public set OldValue(value: any) {
        this.setOldValue(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getOldValue(): any {
        return this.myOldValue;
    }

    /**
     * @hidden
     * @param value
     */
    protected /*virtual*/ setOldValue(value: any) {
        this.myOldValue = value;
    }
    //#endregion

    //#region [Property] PresentationName

    /**
     * Gets the user-visible string description of this undoable edit.
     * <h4>Description</h4>
     * Currently this is just the event string, as a string.
     */
    public get PresentationName(): string {
        return this.getPresentationName();
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getPresentationName(): string {
        return this.myHint.toString();
    }

    //#endregion

    //#region [Property] SubHint

    /**
     * Gets or sets the more detailed kind of document Changed event, depending
     * on the particular [[GoChangedEventArgs.Event]] value.
     * <h4>Description</h4>
     * This property is commonly used to describe changes to individual objects
     * when the [[ChangedEventArgs.Event]] is <i>Layer.changedObject</i>,
     * for example <i>Node.changedBounds</i>.
     * See the complete list of predefined subhints for [[ChangedEventArgs.Node]]
     * changes in the documentation for [[Node.changed]].
     * However other [[ChangedEventArgs.Event]] values may use this <i>SubEvent</i> property for
     * additional disambiguation too.
     */

    public get SubHint(): number {
        return this.getSubEvent();
    }
    public set SubHint(value: number) {
        this.setSubEvent(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getSubEvent(): number {
        return this.mySubHint;
    }

    /**
     * @hidden
     * @param value
     */
    protected /*virtual*/ setSubEvent(value: number) {
        this.mySubHint = value;
    }
    //#endregion

    constructor(e?: TuChangedEventArgs) {

        if (e) {
            this.myIsBeforeChanging = e.IsBeforeChanging;
            this.myDocument = e.Document;
            this.myHint = e.Hint;
            this.mySubHint = e.SubHint;
            this.myObject = e.Object;
            this.myOldInt = e.OldInt;
            this.myOldValue = e.OldValue;
            this.myOldRect = e.OldRect;
            this.myNewInt = e.NewInt;
            this.myNewValue = e.NewValue;
            this.myNewRect = e.NewRect;
            if (this.myDocument) {
                this.myDocument.copyOldValueForUndo(this);
                this.myDocument.copyNewValueForRedo(this);
            }
        }
    }

    /**
     * This predicate returns true if you can call [[ChangedEventArgs.Redo]].
     */
    public CanRedo(): boolean {
        return this.Document ? true : false;
    }

    /**
     * This predicate returns true if you can call [[ChangedEventArgs.Undo]].
     */
    public CanUndo(): boolean {
        return this.Document ? true : false;
    }

    /**
     * Forget any references that this object may have.
     */
    public Clear() {
        this.myDocument = undefined;
        this.myObject = undefined;
        this.myOldValue = undefined;
        this.myNewValue = undefined;
    }

    /**
     * Search for a [[ChangedEventArgs]] that matches this
     * one's [[ChangedEventArgs.Document]], [[ChangedEventArgs.Event]], [[ChangedEventArgs.SubEvent]],
     * and [[ChangedEventArgs.Object]], and whose [[ChangedEventArgs.IsBeforeChanging]]
     * property is true.
     * <h4>Description</h4>
     * The assumption is that there are always pairs of calls to
     * [[Document.raiseChanging]] and [[Document.raiseChanged]],
     * resulting in pairs of [[ChangedEventArgs]].
     * This method is not called except when [[Document.raiseChanging]]
     * should have produced recently a [[ChangedEventArgs.IsBeforeChanging]] event args.
     * This searches <see cref="P:Northwoods.Go.GoUndoManager.CurrentEdit" /> backwards.
     */
    // TODO: Complete below method
    public FindBeforeChangingEdit(): TuChangedEventArgs {
        return undefined;
        /* if (this.IsBeforeChanging)
        {
            return null;
        }
        GoDocument document = this.Document;
        if (document == null)
        {
            return null;
        }
        GoUndoManager undoManager = document.UndoManager;
        if (undoManager == null)
        {
            return null;
        }
        GoUndoManagerCompoundEdit currentEdit = undoManager.CurrentEdit;
        if (currentEdit == null)
        {
            return null;
        }
        IList<IGoUndoableEdit> allEdits = currentEdit.AllEdits;
        for (int i = checked(allEdits.Count - 1); i >= 0; i = checked(i - 1))
        {
            GoChangedEventArgs ıtem = allEdits[i] as GoChangedEventArgs;
            if (ıtem != null && ıtem.IsBeforeChanging && ıtem.Document == this.Document && ıtem.Hint == this.Hint && ıtem.SubHint == this.SubHint && ıtem.Object == this.Object)
            {
                return ıtem;
            }
        }
        return null; */
    }

    /**
     * If undo is true, this returns the <i>x</i> part of [[ChangedEventArgs.OldRect]],
     * otherwise it returns the <i>x</i> part of [[ChangedEventArgs.NewRect]].
     * @param undo
     */
    public getFloat(undo: boolean): float {
        if (undo) {
            return this.OldInt;
        }
        return this.NewInt;
    }

    public getInt(undo: boolean): number {
        if (undo) {
            return ~~this.OldInt;
        }
        return ~~this.NewInt;
    }

    /**
     * If undo is true, this returns the <i>Location</i> part of [[ChangedEventArgs.OldRect]],
     * otherwise it returns the <i>Location</i> part of [[ChangedEventArgs.NewRect]].
     * @param undo
     */
    public getPoint(undo: boolean): CGPoint {

        if (undo) {
            return new CGPoint({ x: this.OldRect.X, y: this.OldRect.Y });
        }

        return new CGPoint({ x: this.NewRect.X, y: this.NewRect.Y });
    }

    /**
     * If undo is true, this returns [[ChangedEventArgs.OldRect]],
     * otherwise it returns [[ChangedEventArgs.NewRect]].
     * @param undo
     */
    public getRect(undo: boolean): CGRectangle {
        if (undo) {
            return this.OldRect;
        }
        return this.NewRect;
    }

    /**
     * If undo is true, this returns the <i>Size</i> part of [[ChangedEventArgs.OldRect]],
     * @param undo
     */
    public getSize(undo: boolean): CGSize {

        if (undo) {
            return new CGSize({ width: this.OldRect.Width, height: this.OldRect.Height });
        }
        return new CGSize({ width: this.NewRect.Width, height: this.NewRect.Height });
    }

    /**
     * If undo is true, this returns [[ChangedEventArgs.OldValue]],
     * otherwise it returns [[ChangedEventArgs.NewValue]].
     * @param undo
     */
    public getValue<T>(undo: boolean): T {
        if (undo) {
            return this.OldValue;
        }
        return this.NewValue;
    }

    /**
     * Re-perform the document change after an [[ChangedEventArgs.undo"
     * by calling [[Document.changeValue]].
     * <h4>Description</h4>
     * [[ChangedEventArgs.canRedo]] must be true for this method to call [[Document.ChangeValue]].
     */
    public Redo() {
        if (this.CanRedo()) {
            const document = this.Document;
            document.Initializing = true;
            document.ChangeValue(this, false);
            document.Initializing = false;
        }
    }

    //TODO: toString()

    /**
     * Reverse the effects of this document change
     * by calling [[Document.ChangeValue]].
     * <h4>Description</h4>
     * [[ChangedEventArgs.canUndo]] must be true for this method to call [[Document.changeValue]].
     */
    public Undo() {
        if (this.CanUndo()) {
            const document = this.Document;
            document.Initializing = true;
            document.ChangeValue(this, true);
            document.Initializing = false;
        }
    }
}
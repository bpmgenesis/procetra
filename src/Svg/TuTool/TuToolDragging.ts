import { ClassInfo, Dictionary, foreach, IList, List, CONTINUE, is, as, trace, TString, ICollection, Type, typeOf } from '@tuval/core';
import { TuSelection } from '../TuSelection/TuSelection';
import { Types } from '../types';
import { TuTool } from './TuTool';
import { CGSize, CGPoint, CGRectangle } from '@tuval/cg';
import { TuView } from '../TuView/TuView';
import { ITuLink } from '../ITuLink';
import { TuDragRectangle } from '../TuDragRectangle';
import { TuCollection } from '../TuCollection/TuCollection';
import { TuDocument } from '../TuDocument/TuDocument';
import { TuInputState } from '../TuInputState';
import { TuInputEventArgs } from '../TuInputEventArgs';
import { TuObject } from '../TuObject/TuObject';
import { ITuNode } from '../TuNode/ITuNode';
import { DragDropEffects } from '../Forms/DragDropEffects';
import { DragEventArgs } from '../Forms/DragEventArgs';

@ClassInfo({
    fullName: Types.TuToolDragging,
    instanceof: [
        Types.TuToolDragging,
        Types.TuTool,
        Types.ITuTool]
})
export class TuToolDragging extends TuTool {
    public GetType(): Type {
        return typeOf(Types.TuToolDragging);
    }
    private myCopiesEffectiveSelection: boolean = false;
    private myEffectiveSelectionIncludesLinks: boolean = true;
    private myHidesSelectionHandles: boolean = true;
    private myEffectiveSelection: TuSelection;
    private myDragSelection: TuSelection;
    private myDragSelectionOrigObj: TuObject;
    private myMoveOffset: CGSize = new CGSize();
    private mySelectionHidden: boolean = false;
    private mySelectsWhenStarts: boolean = true;
    private myLastObject: TuObject;
    private myModalDropped: boolean = false;

    //#region [Property] CopiesEffectiveSelection
    public get CopiesEffectiveSelection(): boolean {
        return this.getCopiesEffectiveSelection();
    }
    public set CopiesEffectiveSelection(value: boolean) {
        this.setCopiesEffectiveSelection(value);
    }

    protected /*virtual*/ getCopiesEffectiveSelection(): boolean {
        return this.myCopiesEffectiveSelection;
    }
    protected /*virtual*/ setCopiesEffectiveSelection(value: boolean) {
        this.myCopiesEffectiveSelection = value;
    }
    //#endregion

    //#region [Property] DragSelection
    public get DragSelection(): TuSelection {
        return this.getDragSelection();
    }
    public set DragSelection(value: TuSelection) {
        this.setDragSelection(value);
    }

    protected /*virtual*/ getDragSelection(): TuSelection {
        return this.myDragSelection;
    }
    protected /*virtual*/ setDragSelection(value: TuSelection) {
        this.myDragSelection = value;
    }
    //#endregion

    //#region [Property] DragSelectionOriginalObject
    public get DragSelectionOriginalObject(): TuObject {
        return this.getDragSelectionOriginalObject();
    }
    public set DragSelectionOriginalObject(value: TuObject) {
        this.setDragSelectionOriginalObject(value);
    }

    protected /*virtual*/ getDragSelectionOriginalObject(): TuObject {
        return this.myDragSelectionOrigObj;
    }
    protected /*virtual*/ setDragSelectionOriginalObject(value: TuObject) {
        this.myDragSelectionOrigObj = value;
    }
    //#endregion

    //#region [Property] EffectiveSelection
    public get EffectiveSelection(): TuSelection {
        return this.getEffectiveSelection();
    }

    protected /*virtual*/ getEffectiveSelection(): TuSelection {
        return this.myEffectiveSelection;
    }
    //#endregion

    //#region [Property] EffectiveSelectionIncludesLinks
    public get EffectiveSelectionIncludesLinks(): boolean {
        return this.getEffectiveSelectionIncludesLinks();
    }
    public set EffectiveSelectionIncludesLinks(value: boolean) {
        this.setEffectiveSelectionIncludesLinks(value);
    }

    protected /*virtual*/ getEffectiveSelectionIncludesLinks(): boolean {
        return this.myEffectiveSelectionIncludesLinks;
    }
    protected /*virtual*/ setEffectiveSelectionIncludesLinks(value: boolean) {
        this.myEffectiveSelectionIncludesLinks = value;
    }
    //#endregion

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

    //#region [Property] MoveOffset
    public get MoveOffset(): CGSize {
        return this.getMoveOffset();
    }
    public set MoveOffset(value: CGSize) {
        this.setMoveOffset(value);
    }

    protected /*virtual*/ getMoveOffset(): CGSize {
        return this.myMoveOffset;
    }
    protected /*virtual*/ setMoveOffset(value: CGSize) {
        this.myMoveOffset = value;
    }
    //#endregion

    //#region [Property] SelectsWhenStarts
    public get SelectsWhenStarts(): boolean {
        return this.getSelectsWhenStarts();
    }
    public set SelectsWhenStarts(value: boolean) {
        this.setSelectsWhenStarts(value);
    }

    protected /*virtual*/ getSelectsWhenStarts(): boolean {
        return this.mySelectsWhenStarts;
    }
    protected /*virtual*/ setSelectsWhenStarts(value: boolean) {
        this.mySelectsWhenStarts = value;
    }
    //#endregion

    constructor(view: TuView) {
        super(view);
    }

    private alreadyDragged(draggeds: Dictionary<TuObject, boolean>, o: TuObject): boolean {
        for (let i = o; i != null; i = i.Parent) {
            if (draggeds.ContainsKey(i)) {
                return true;
            }
        }
        return false;
    }

    public /*override*/ canStart(): boolean {
        if (!this.View.CanMoveObjects() && !this.View.CanCopyObjects() && !this.View.AllowDragOut) {
            return false;
        }
        if (this.LastInput.IsContextButton) {
            return false;
        }
        if (!this.isBeyondDragSize()) {
            return false;
        }
        const goObject: TuObject = this.View.pickObject(true, false, this.FirstInput.DocPoint, true);
        if (goObject == null) {
            return false;
        }
        if (!goObject.canMove() && !goObject.CanCopy()) {
            return false;
        }
        return true;
    }

    public /*virtual*/ clearDragSelection(): void {
        if (this.DragSelection != null) {
            foreach(this.DragSelection, (dragSelection: TuObject) => {
                dragSelection.Remove();
            });

            this.DragSelection = undefined;
            this.CurrentObject = this.DragSelectionOriginalObject;
            this.DragSelectionOriginalObject = undefined;
        }
    }

    public /*virtual*/ computeEffectiveSelection(coll: ICollection<TuObject>, move: boolean): TuSelection {
        const goObjects: Dictionary<TuObject, boolean> = new Dictionary<TuObject, boolean>();
        let goCollections: List<TuObject> = undefined;
        const goSelection: TuSelection = new TuSelection(undefined);
        foreach(coll, (goObject: TuObject) => {
            const draggingObject: TuObject = goObject.DraggingObject;
            if (draggingObject == null) {
                return CONTINUE;
            }
            if ((move ? !draggingObject.canMove() : !draggingObject.CanCopy()) || this.alreadyDragged(goObjects, draggingObject)) {
                return CONTINUE;
            }
            goObjects.Set(draggingObject, true);
            if (!draggingObject.IsTopLevel) {
                if (goCollections == null) {
                    goCollections = new List<TuObject>();
                }
                goCollections.Add(draggingObject);
            }
            goSelection.Add(draggingObject);
        });

        if (this.EffectiveSelectionIncludesLinks) {
            const goObjectArray: TuObject[] = goSelection.CopyArray();
            for (let i = 0; i < goObjectArray.length; i++) {
                const goNode: ITuNode = as(goObjectArray[i], Types.ITuNode);
                if (goNode != null) {
                    foreach(goNode.DestinationLinks, (destinationLink: ITuLink) => {
                        if (this.alreadyDragged(goObjects, destinationLink.TuObject) || destinationLink.ToPort != null
                            && !this.alreadyDragged(goObjects, destinationLink.ToPort.TuObject)) {
                            return CONTINUE;
                        }
                        goObjects.Set(destinationLink.TuObject, true);
                        goSelection.Add(destinationLink.TuObject);
                    });

                    foreach(goNode.SourceLinks, (sourceLink: ITuLink) => {
                        if (this.alreadyDragged(goObjects, sourceLink.TuObject) || sourceLink.FromPort != null
                            && !this.alreadyDragged(goObjects, sourceLink.FromPort.TuObject)) {
                            return CONTINUE;
                        }
                        goObjects.Set(sourceLink.TuObject, true);
                        goSelection.Add(sourceLink.TuObject);
                    });

                }
            }
        }
        if (goCollections != null) {
            let goCollections1: List<TuObject> = undefined;
            foreach(goSelection, (goObject1: TuObject) => {
                const draggingObject1: TuObject = goObject1.DraggingObject;
                if (!is.typeof(draggingObject1, Types.TuGroup)) {
                    return CONTINUE;
                }
                foreach(goCollections, (goCollection: TuObject) => {
                    if (!goCollection.isChildOf(draggingObject1)) {
                        return CONTINUE;
                    }
                    if (goCollections1 == null) {
                        goCollections1 = new List<TuObject>();
                    }
                    goCollections1.Add(goCollection);
                });
            });

            if (goCollections1 != null) {
                foreach(goCollections1, (goCollection1: TuObject) => {
                    goSelection.Remove(goCollection1);
                });

            }
        }
        return goSelection;
    }

    public /*virtual*/ createDragSelection(): TuSelection {
        const goSelection: TuSelection = new TuSelection(undefined);
        const position: CGPoint = this.CurrentObject.Position;
        const sizeF: CGSize = TuTool.SubtractPoints(this.CurrentObject.Location, position);
        const goDragRectangle: TuDragRectangle = new TuDragRectangle()

        goDragRectangle.Bounds = this.CurrentObject.Bounds,
            goDragRectangle.Offset = sizeF,
            goDragRectangle.Visible = false

        this.View.Layers.Default.Add(goDragRectangle);
        goSelection.Add(goDragRectangle);
        const goCollections: TuCollection = new TuCollection({
            internalChecksForDuplicates: false
        });

        foreach((this.EffectiveSelection != null ? this.EffectiveSelection : this.Selection), (goObject: TuObject) => {
            goCollections.Add(goObject.DraggingObject);
        });

        this.View.Document.Layers.SortByZOrder(goCollections);
        const rectangleF: CGRectangle = TuDocument.ComputeBounds(goCollections, this.View);
        let top = 1E+21;
        let left = 1E+21;
        foreach(goCollections, (goCollection: TuObject) => {
            if (goCollection.Top < top) {
                top = goCollection.Top;
            }
            if (goCollection.Left >= left) {
                return CONTINUE;
            }
            left = goCollection.Left;
        });

        let width = this.View.WorldScale.Width;
        if (rectangleF.Width * width > 2000 || rectangleF.Height * width > 2000) {
            width = width * Math.min(2000 / (rectangleF.Width * width), 2000 / (rectangleF.Height * width));
        }
        // TODO: Süreklemede bitmap hatası olduğu için rectangle a çecrildi
        /*  const bitmapFromCollection: Bitmap = this.View.getBitmapFromCollection(goCollections, rectangleF, width, false);
         const goDragImage: TuDragImage = new TuDragImage();
         goDragImage.Image = CGImage.FromBitmap(bitmapFromCollection);
         goDragImage.Bounds = new RectangleF({ x: rectangleF.X, y: rectangleF.Y, width: bitmapFromCollection.Width / width, height: bitmapFromCollection.Height / width }); */

        const rect = new TuDragRectangle();
        rect.Bounds = new CGRectangle({ x: rectangleF.X, y: rectangleF.Y, width: rectangleF.Width, height: rectangleF.Height });

        if (top >= 1E+21 || left >= 1E+21) {
            rect.Offset = sizeF;
        }
        else {
            rect.Offset = new CGSize({ width: left - rectangleF.X + sizeF.Width, height: top - rectangleF.Y + sizeF.Height });
        }
        this.View.Layers.Default.Add(rect);
        goSelection.Add(rect);
        return goSelection;
    }

    public /*override*/ doCancelMouse() {
        if (this.CurrentObject != null && this.DragSelection == null) {
            const sizeF: CGSize = TuTool.SubtractPoints(TuTool.SubtractPoints(this.FirstInput.DocPoint, this.MoveOffset), this.CurrentObject.Position);
            if (sizeF.Width !== 0 || sizeF.Height !== 0) {
                this.View.moveSelection((this.EffectiveSelection != null ? this.EffectiveSelection : this.Selection), sizeF, false);
            }
        }
        this.TransactionResult = undefined;
        this.stopTool();
    }

    public /*virtual*/ doDragDrop(coll: IList<TuObject>, allow: DragDropEffects) {
        (this.View as any).doDragDrop(coll, allow);
    }

    private static test: number = 0;
    public /*virtual*/ doDragging(evttype: TuInputState) {

        let x: CGSize;
        let location: CGPoint;
        let pointF: CGPoint;
        if (this.CurrentObject == null) {
            return;
        }
        const sizeF: CGSize = TuTool.SubtractPoints(this.LastInput.DocPoint, this.CurrentObject.Position);
        const width = sizeF.Width;
        let moveOffset: CGSize = this.MoveOffset;
        const single: number = width - moveOffset.Width;
        const height = sizeF.Height;
        moveOffset = this.MoveOffset;
        const sizeF1: CGSize = new CGSize({ width: single, height: height - moveOffset.Height });
        let flag: boolean = (!this.mayBeCopying() ? false : this.mustBeCopying());
        const flag1 = this.mayBeMoving();

        const dragEventArgs: DragEventArgs = this.LastInput.DragEventArgs;
        if (dragEventArgs != null && !this.View.isInternalDragDrop(dragEventArgs)) {
            flag = false;
        }
        if (this.EffectiveSelection == null) {
            this.myEffectiveSelection = this.computeEffectiveSelection(this.Selection, !flag);
        }
        if (evttype === TuInputState.Finish) {
            console.log('doDragging Finish.');
            let sizeF2: CGSize = sizeF1;
            if (this.DragSelection != null) {
                sizeF2 = TuTool.SubtractPoints(this.CurrentObject.Position, this.DragSelectionOriginalObject.Position);
                this.clearDragSelection();
            }
            if (flag) {
                if (!this.CopiesEffectiveSelection) {
                    this.View.copySelection(this.Selection, sizeF2, true);
                    return;
                }
                this.myEffectiveSelection = this.computeEffectiveSelection(this.Selection, false);
                this.View.copySelection(this.EffectiveSelection, sizeF2, true);
                return;
            }
            if (flag1) {
                if (this.EffectiveSelection == null) {
                    this.myEffectiveSelection = this.computeEffectiveSelection(this.Selection, true);
                }
                this.View.moveSelection(this.EffectiveSelection, sizeF2, true);
            }
        }
        else {
            let dragSelection: TuSelection = undefined;
            if (flag || !this.View.DragsRealtime) {
                this.makeDragSelection();
                dragSelection = this.DragSelection;
            }
            else if (flag1) {

                const a = this.mayBeMoving();
                this.clearDragSelection();
                dragSelection = this.EffectiveSelection;
            }
            if (dragSelection != null) {
                let goObject: TuObject = undefined;

                const enumerator = dragSelection.GetEnumerator();
                if (enumerator) {
                    while (enumerator.MoveNext()) {
                        let goObject1: TuObject = enumerator.Current;
                        if (is.typeof<ITuLink>(goObject1, Types.ITuLink) || !goObject1.canMove()) {
                            continue;
                        }
                        goObject = goObject1;
                        x = sizeF1;
                        if (goObject != null) {
                            location = goObject.Location;
                            pointF = new CGPoint({ x: location.X + sizeF1.Width, y: location.Y + sizeF1.Height });
                            pointF = this.View.snapPoint(pointF, goObject);
                            x.Width = pointF.X - location.X;
                            x.Height = pointF.Y - location.Y;
                        }
                        this.View.moveSelection(dragSelection, x, false);
                        return;
                    }
                }
                x = sizeF1;
                if (goObject != null) {
                    location = goObject.Location;
                    pointF = new CGPoint({ x: location.X + sizeF1.Width, y: location.Y + sizeF1.Height });
                    pointF = this.View.snapPoint(pointF, goObject);
                    x.Width = pointF.X - location.X;
                    x.Height = pointF.Y - location.Y;
                }
                this.View.moveSelection(dragSelection, x, false);
                return;
            }
        }

    }
    public /*override*/ doMouseMove() {

        const dragEventArgs: DragEventArgs = this.LastInput.DragEventArgs;
        if (dragEventArgs != null) {
            if (this.mustBeCopying() && this.mayBeCopying()) {
                dragEventArgs.Effect = DragDropEffects.Copy;
            }
            else if (!this.mayBeMoving()) {
                dragEventArgs.Effect = DragDropEffects.None;
            }
            else if (!this.View.PretendsInternalDrag) {
                dragEventArgs.Effect = DragDropEffects.Move;
            }
        }
        this.LastInput.InputState = TuInputState.Continue;
        if (dragEventArgs != null && this.View.doSelectionDropReject(this.LastInput)) {
            dragEventArgs.Effect = DragDropEffects.None;
        }
        this.doDragging(TuInputState.Continue);
        this.doMouseOver(this.LastInput);
        this.View.doAutoScroll(this.LastInput.ViewPoint);
        this.View.batchDraw();
    }

    public /*virtual*/ doMouseOver(evt: TuInputEventArgs) {
        const goObject: TuObject = this.myLastObject;
        const goObject1: TuObject = this.View.pickObjectExcluding(true, false, evt.DocPoint, false, this.Selection);
        if (goObject !== goObject1) {
            this.myLastObject = goObject1;
            this.View.doObjectEnterLeave(goObject, goObject1, evt);
        }
    }

    public /*override*/ doMouseUp() {
        let flag: boolean;
        this.myModalDropped = true;
        this.LastInput.InputState = TuInputState.Finish;
        if (!this.View.doSelectionDropReject(this.LastInput)) {
            flag = (!this.mustBeCopying() ? false : this.mayBeCopying());
            const flag1: boolean = this.mayBeMoving();
            this.doDragging(TuInputState.Finish);
            this.View.doSelectionDropped(this.LastInput);
            if (flag) {
                this.TransactionResult = "Copy Selection";
                this.View.raiseSelectionCopied();
                this.stopTool();
            }
            else if (!flag1) {
                this.doCancelMouse();
            }
            else {
                this.TransactionResult = "Move Selection";
                this.View.raiseSelectionMoved();
                this.stopTool();
            }
            this.doMouseOver(this.LastInput);
        }
        else {
            this.doCancelMouse();
            const dragEventArgs: DragEventArgs = this.LastInput.DragEventArgs;
            if (dragEventArgs != null && this.View.ExternalDragDropsOnEnter && !this.View.isInternalDragDrop(dragEventArgs)) {
                this.View.deleteSelection(this.View.Selection);
                return;
            }
        }

        this.View.batchDraw();
    }

    public /*virtual*/ makeDragSelection() {
        if (this.DragSelection == null) {
            this.DragSelectionOriginalObject = this.CurrentObject;
            this.DragSelection = this.createDragSelection();
            if (this.DragSelection == null || this.DragSelection.IsEmpty) {
                this.DragSelectionOriginalObject = undefined;
                this.DragSelection = undefined;
                return;
            }
            const sizeF: CGSize = TuTool.SubtractPoints(TuTool.SubtractPoints(this.FirstInput.DocPoint, this.MoveOffset), this.DragSelectionOriginalObject.Position);
            if (sizeF.Width !== 0 || sizeF.Height !== 0) {
                this.View.moveSelection((this.EffectiveSelection != null ? this.EffectiveSelection : this.Selection), sizeF, false);
            }
            if (this.CurrentObject.View !== this.View) {
                this.CurrentObject = this.DragSelection.Primary;
            }
        }
    }

    public /*virtual*/ mayBeCopying(): boolean {
        let flag: boolean;
        const dragEventArgs: DragEventArgs = this.LastInput.DragEventArgs;
        if (dragEventArgs != null && (dragEventArgs.AllowedEffect & DragDropEffects.Copy) !== DragDropEffects.Copy) {
            return false;
        }
        if (!this.View.CanInsertObjects()) {
            return false;
        }
        if (!this.View.CanCopyObjects()) {
            return false;
        }
        const enumerator = this.Selection.GetEnumerator();
        try {
            while (enumerator.MoveNext()) {
                if (!enumerator.Current.CanCopy()) {
                    continue;
                }
                flag = true;
                return flag;
            }
            return false;
        }
        finally {
            enumerator.Dispose();
        }
        return flag;
    }


    public /*virtual*/ mayBeMoving(): boolean {
        let flag: boolean;
        const dragEventArgs: DragEventArgs = this.LastInput.DragEventArgs;
        if (dragEventArgs != null && (dragEventArgs.AllowedEffect & DragDropEffects.Move) !== DragDropEffects.Move && !this.View.PretendsInternalDrag) {
            return false;
        }
        if (!this.View.CanMoveObjects()) {
            return false;
        }
        const enumerator = this.Selection.GetEnumerator();
        try {
            while (enumerator.MoveNext()) {
                if (!enumerator.Current.canMove()) {
                    continue;
                }
                flag = true;
                return flag;
            }
            return false;
        }
        finally {
            enumerator.Dispose();
        }
        return flag;
    }

    public /*virtual*/ mustBeCopying(): boolean {
        const dragEventArgs: DragEventArgs = this.LastInput.DragEventArgs;
        if (dragEventArgs != null && (dragEventArgs.AllowedEffect & DragDropEffects.Copy) !== DragDropEffects.Copy) {
            return false;
        }
        if (this.LastInput.Control) {
            return true;
        }
        return false;
    }

    public /*virtual*/mustBeMoving(): boolean {
        const dragEventArgs: DragEventArgs = this.LastInput.DragEventArgs;
        if (dragEventArgs != null && (dragEventArgs.AllowedEffect & DragDropEffects.Move) !== DragDropEffects.Move && !this.View.PretendsInternalDrag) {
            return false;
        }
        if (this.LastInput.Shift) {
            return true;
        }
        return false;
    }

    public /*override*/ start(): void {
        console.log('TuTool start');
        if (this.SelectsWhenStarts) {
            this.CurrentObject = this.View.pickObject(true, false, this.FirstInput.DocPoint, true);
            if (this.CurrentObject == null) {
                return;
            }
            this.MoveOffset = TuTool.SubtractPoints(this.FirstInput.DocPoint, this.CurrentObject.Position);
        }
        this.startTransaction();
        if (this.SelectsWhenStarts && !this.Selection.Contains(this.CurrentObject)) {
            if (this.FirstInput.Shift || this.FirstInput.Control) {
                this.Selection.Add(this.CurrentObject);
            }
            else {
                this.Selection.select(this.CurrentObject);
            }
        }
        if (!this.View.DragRoutesRealtime && this.View.DragsRealtime) {
            this.View.Document.SuspendsRouting = true;
        }
        if (this.HidesSelectionHandles) {
            this.mySelectionHidden = true;
            this.Selection.removeAllSelectionHandles();
        }
        if (this.View.AllowDragOut) {
            this.myModalDropped = false;
            try {
                try {
                    if (this.Selection.Primary != null) {
                        const sizeF: CGSize = TuTool.SubtractPoints(this.LastInput.DocPoint, this.Selection.Primary.Position);
                        this.Selection.HotSpot = sizeF;
                    }
                    this.doDragDrop(this.Selection, DragDropEffects.All);
                }
                catch (e) {
                    trace(TString.Concat("ToolDragging Start: ", e.toString()));
                }
            }
            finally {
                if (this.myModalDropped) {
                    this.stopTool();
                }
                else {
                    this.doCancelMouse();
                }
                this.Selection.HotSpot = new CGSize({ width: 0, height: 0 });
            }
        }
    }

    public /*override*/ stop(): void {
        console.log('TuTool stop');
        this.View.Document.SuspendsRouting = false;
        if (!this.View.DragRoutesRealtime && this.View.DragsRealtime && this.TransactionResult != null) {
            this.View.Document.DoDelayedRouting(this.EffectiveSelection);
        }
        this.View.stopAutoScroll();
        if (this.mySelectionHidden) {
            this.mySelectionHidden = false;
            this.Selection.addAllSelectionHandles();
        }
        this.clearDragSelection();
        this.myEffectiveSelection = undefined;
        this.MoveOffset = new CGSize({ width: 0, height: 0 });
        this.CurrentObject = undefined;
        this.SelectsWhenStarts = true;
        this.stopTransaction();
    }
}
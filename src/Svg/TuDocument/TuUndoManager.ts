import { ClassInfo, List, IList, IEnumerable, trace, TString, foreach } from '@tuval/core';
import { ITuUndoableEdit } from '../ITuUndoableEdit';
import { TuChangedEventArgs } from '../TuChangedEventArgs';
import { Types } from '../types';
import { TuDocument } from './TuDocument';
import { TuDocumentEvents } from './TuDocumentEvents';
import { TuUndoManagerCompoundEdit } from './TuUndoManagerCompoundEdit';
import { NullRect } from '../Globals';

type ResourceManager = any;
@ClassInfo({
    fullName: Types.TuUndoManager,
    instanceof: [
        Types.TuUndoManager
    ]
})
export class TuUndoManager {
    public static readonly CopySelectionName = "Copy Selection";
    public static readonly MoveSelectionName = "Move Selection";
    public static readonly DeleteSelectionName = "Delete Selection";
    public static readonly NewLinkName = "New Link";
    public static readonly RelinkName = "Relink";
    public static readonly ResizeName = "Resize";
    public static readonly CopyName = "Copy";
    public static readonly CutName = "Cut";
    public static readonly PasteName = "Paste";
    public static readonly DropName = "Drop";
    public static readonly TextEditName = "Text Edit";
    public static readonly CollapsedSubGraphName = "Collapsed SubGraph";
    public static readonly ExpandedSubGraphName = "Expanded SubGraph";
    public static readonly ExpandedAllSubGraphsName = "Expanded All SubGraphs";
    public static readonly CollapsedName = "Collapsed";
    public static readonly ExpandedName = "Expanded";
    public static readonly DragCreatedName = "Drag Created";
    private myCompoundEdits: List<ITuUndoableEdit> = new List<ITuUndoableEdit>();
    private myMaximumEditCount: number = -1;
    private myCurrentEditIndex: number = -1;
    private myIncompleteEdit: TuUndoManagerCompoundEdit;
    private myLevel: number;
    private myIsUndoing: boolean;
    private myIsRedoing: boolean;
    private myDocuments: List<TuDocument> = new List<TuDocument>();
    private myChecksTransactionLevel: boolean;
    private myResourceManager: ResourceManager;

    public get AllEdits(): IList<ITuUndoableEdit> {
        return this.getAllEdits();
    }

    protected /*virtual*/ getAllEdits(): IList<ITuUndoableEdit> {
        return this.myCompoundEdits;
    }

    public get ChecksTransactionLevel(): boolean {
        return this.getChecksTransactionLevel();
    }
    public set ChecksTransactionLevel(value: boolean) {
        this.setChecksTransactionLevel(value);
    }
    protected /*virtual*/ getChecksTransactionLevel(): boolean {
        return this.myChecksTransactionLevel;
    }
    protected /*virtual*/ setChecksTransactionLevel(value: boolean) {
        this.myChecksTransactionLevel = value;
    }

    public get CurrentEdit(): TuUndoManagerCompoundEdit {
        return this.getCurrentEdit();
    }
    public set CurrentEdit(value: TuUndoManagerCompoundEdit) {
        this.setCurrentEdit(value);
    }
    protected /*virtual*/ getCurrentEdit(): TuUndoManagerCompoundEdit {
        return this.myIncompleteEdit;
    }
    protected /*virtual*/ setCurrentEdit(value: TuUndoManagerCompoundEdit) {
        this.myIncompleteEdit = value;
    }

    public get Documents(): IEnumerable<TuDocument> {
        return this.getDocuments();
    }
    protected /*virtual*/ getDocuments(): IEnumerable<TuDocument> {
        return this.myDocuments;
    }


    public get EditToRedo(): ITuUndoableEdit {
        return this.getCurrentEdit();
    }
    protected /*virtual*/ getEditToRedo(): ITuUndoableEdit {
        if (this.myCurrentEditIndex >= this.myCompoundEdits.Count - 1) {
            return undefined;
        }
        return this.myCompoundEdits[this.myCurrentEditIndex + 1];
    }

    public get EditToUndo(): ITuUndoableEdit {
        return this.getEditToUndo();
    }
    protected /*virtual*/ getEditToUndo(): ITuUndoableEdit {
        if (this.myCurrentEditIndex < 0 || this.myCurrentEditIndex > this.myCompoundEdits.Count - 1) {
            return undefined;
        }
        return this.myCompoundEdits[this.myCurrentEditIndex];
    }

    public get IsRedoing(): boolean {
        return this.getIsRedoing();
    }
    protected /*virtual*/ getIsRedoing(): boolean {
        return this.myIsRedoing;
    }

    public get IsUndoing(): boolean {
        return this.getIsUndoing();
    }
    protected /*virtual*/ getIsUndoing(): boolean {
        return this.myIsUndoing;
    }

    public get MaximumEditCount(): number {
        return this.getMaximumEditCount();
    }
    public set MaximumEditCount(value: number) {
        this.setMaximumEditCount(value);
    }
    protected /*virtual*/ getMaximumEditCount(): number {
        return this.myMaximumEditCount;
    }
    protected /*virtual*/ setMaximumEditCount(value: number) {
        if (value === 0) {
            value = 1;
        }
        this.myMaximumEditCount = value;
    }

    public get RedoPresentationName(): string {
        return this.getRedoPresentationName();
    }
    protected /*virtual*/ getRedoPresentationName(): string {

        const editToRedo: ITuUndoableEdit = this.EditToRedo;
        if (editToRedo == null) {
            return '';
        }
        return editToRedo.PresentationName;
    }

    public get ResourceManager(): ResourceManager {
        return this.getResourceManager();
    }
    public set ResourceManager(value: ResourceManager) {
        this.setResourceManager(value);
    }
    protected /*virtual*/ getResourceManager(): ResourceManager {
        return this.myResourceManager
    }
    protected /*virtual*/ setResourceManager(value: ResourceManager) {
        this.myResourceManager = value;
    }

    public get TransactionLevel(): number {
        return this.getTransactionLevel();
    }
    protected /*virtual*/ getTransactionLevel(): number {
        return this.myLevel;
    }

    public get UndoEditIndex(): number {
        return this.getUndoEditIndex();
    }
    protected /*virtual*/ getUndoEditIndex(): number {
        return this.myCurrentEditIndex;
    }

    public get UndoPresentationName(): string {
        return this.getUndoPresentationName();
    }
    protected /*virtual*/ getUndoPresentationName(): string {
        const editToUndo: ITuUndoableEdit = this.EditToUndo;
        if (editToUndo == null) {
            return '';
        }
        return editToUndo.PresentationName;
    }

    public AbortTransaction(): boolean {
        return this.endTransaction(false, undefined, undefined);
    }

    public /*virtual*/ AddDocument(doc: TuDocument) {
        if (!this.myDocuments.Contains(doc)) {
            this.myDocuments.Add(doc);
        }
    }

    public /*virtual*/ CanRedo(): boolean {
        if (this.TransactionLevel > 0) {
            return false;
        }
        if (this.IsUndoing) {
            return false;
        }
        if (this.IsRedoing) {
            return false;
        }
        const editToRedo: ITuUndoableEdit = this.EditToRedo;
        if (editToRedo == null) {
            return false;
        }
        return editToRedo.CanRedo();
    }

    public /*virtual*/ CanUndo(): boolean {
        if (this.TransactionLevel > 0) {
            return false;
        }
        if (this.IsUndoing) {
            return false;
        }
        if (this.IsRedoing) {
            return false;
        }
        const editToUndo: ITuUndoableEdit = this.EditToUndo;
        if (editToUndo == null) {
            return false;
        }
        return editToUndo.CanUndo();
    }

    public /*virtual*/ Clear() {
        for (let i = this.myCompoundEdits.Count - 1; i >= 0; i--) {
            this.myCompoundEdits[i].clear();
        }
        this.myCompoundEdits.Clear();
        this.myCurrentEditIndex = -1;
        this.myIncompleteEdit = undefined;
        this.myLevel = 0;
        this.myIsUndoing = false;
        this.myIsRedoing = false;
    }

    public /*virtual*/  commitCompoundEdit(cedit: TuUndoManagerCompoundEdit): TuUndoManagerCompoundEdit {
        return cedit;
    }

    public /*virtual*/ documentChanged(sender: any, e: TuChangedEventArgs) {
        if (this.IsUndoing || this.IsRedoing) {
            return;
        }
        if (!this.SkipEvent(e)) {
            let currentEdit: TuUndoManagerCompoundEdit = this.CurrentEdit;
            if (currentEdit == null || currentEdit.IsComplete) {
                currentEdit = new TuUndoManagerCompoundEdit();
                this.CurrentEdit = currentEdit;
            }
            const goChangedEventArg: TuChangedEventArgs = new TuChangedEventArgs(e);
            currentEdit.addEdit(goChangedEventArg);
            if (this.ChecksTransactionLevel && this.TransactionLevel <= 0) {
                trace(TString.Concat("Change not within a transaction: ", goChangedEventArg.toString()));
            }
        }
    }

    public /*virtual*/ endTransaction(commit: boolean, tname: string, pname: string): boolean {
        const flag: boolean = this.myLevel === 1;
        if (this.myLevel > 0) {
            this.myLevel = this.myLevel - 1;
        }
        if (!flag) {
            return false;
        }
        const currentEdit: TuUndoManagerCompoundEdit = this.CurrentEdit;
        if (!commit || currentEdit == null) {
            foreach(this.Documents, (document: TuDocument) => {
                document.RaiseChanged(TuDocumentEvents.AbortedTransaction, 0, currentEdit, 0, tname, NullRect, 0, pname, NullRect);
            });

        }
        else {
            const goUndoManagerCompoundEdit: TuUndoManagerCompoundEdit = this.commitCompoundEdit(currentEdit);
            goUndoManagerCompoundEdit.IsComplete = true;
            if (pname != null) {
                goUndoManagerCompoundEdit.PresentationName = pname;
            }
            for (let i = this.myCompoundEdits.Count - 1; i > this.myCurrentEditIndex; i--) {
                this.myCompoundEdits[i].clear();
                this.myCompoundEdits.RemoveAt(i);
            }
            if (this.MaximumEditCount > 0 && this.myCompoundEdits.Count >= this.MaximumEditCount) {
                this.myCompoundEdits[0].clear();
                this.myCompoundEdits.RemoveAt(0);
                this.myCurrentEditIndex = this.myCurrentEditIndex - 1;
            }
            this.myCompoundEdits.Add(goUndoManagerCompoundEdit);
            this.myCurrentEditIndex = this.myCurrentEditIndex + 1;
            foreach(this.Documents, (goDocuments: TuDocument) => {
                goDocuments.RaiseChanged(TuDocumentEvents.FinishedTransaction, 0, goUndoManagerCompoundEdit, 0, tname, NullRect, 0, pname, NullRect);
            });

        }
        this.CurrentEdit = null;
        return true;
    }

    public finishTransaction(tname: string): boolean {
        if (tname == null) {
            tname = '';
        }
        return this.endTransaction(true, tname, this.getPresentationName(tname));
    }

    public /*virtual*/ getPresentationName(tname: string): string {
        if (tname == null) {
            return '';
        }
        let str: string = undefined;
        if (this.ResourceManager != null) {
            str = this.ResourceManager.getString(tname/*, CultureInfo.CurrentCulture*/);
        }
        if (str == null) {
            str = tname;
        }
        return str;
    }

    public /*virtual*/ redo() {
        if (!this.CanRedo()) {
            return;
        }
        const editToRedo: ITuUndoableEdit = this.EditToRedo;
        try {
            try {
                foreach(this.Documents, (document: TuDocument) => {
                    document.RaiseChanged(TuDocumentEvents.StartingRedo, 0, editToRedo, 0, undefined, NullRect, 0, undefined, NullRect);
                })

                this.myIsRedoing = true;
                this.myCurrentEditIndex = this.myCurrentEditIndex + 1;
                editToRedo.Redo();
            }
            catch (e) {
                trace(TString.Concat("Redo: ", e.toString()));
                throw e;
            }
        }
        finally {
            this.myIsRedoing = false;
            foreach(this.Documents, (goDocuments: TuDocument) => {
                goDocuments.RaiseChanged(TuDocumentEvents.FinishedRedo, 0, editToRedo, 0, undefined, NullRect, 0, undefined, NullRect);
            });
        }
    }

    public /*virtual*/ RemoveDocument(doc: TuDocument) {
        this.myDocuments.Remove(doc);
    }

    public /*virtual*/ SkipEvent(evt: TuChangedEventArgs): boolean {
        if (evt.Document == null || evt.Document.SkipsUndoManager /* || evt.Hint >= 0 && evt.Hint < 200 */) {
            return true;
        }
        if (evt.Hint == 901 && (evt.TuObject == null || evt.TuObject.SkipsUndoManager || evt.SubHint === 1000)) {
            return true;
        }
        return false;
    }

    public /*virtual*/ StartTransaction(): boolean {
        this.myLevel = this.myLevel + 1;
        const flag: boolean = this.myLevel === 1;
        if (flag) {
            foreach(this.Documents, (document: TuDocument) => {
                document.RaiseChanged(TuDocumentEvents.StartedTransaction, 0, undefined, 0, undefined, NullRect, 0, undefined, NullRect);
            });
        }
        return flag;
    }

    public /*virtual*/ Undo() {
        if (!this.CanUndo()) {
            return;
        }
        const editToUndo: ITuUndoableEdit = this.EditToUndo;
        try {
            try {
                foreach(this.Documents, (document: TuDocument) => {
                    document.RaiseChanged(TuDocumentEvents.StartingUndo, 0, editToUndo, 0, undefined, NullRect, 0, undefined, NullRect);
                });

                this.myIsUndoing = true;
                this.myCurrentEditIndex = this.myCurrentEditIndex - 1;
                editToUndo.Undo();
            }
            catch (exception) {
                trace(TString.Concat("Undo: ", exception.toString()));
                throw exception;
            }
        }
        finally {
            this.myIsUndoing = false;
            foreach(this.Documents, (goDocuments: TuDocument) => {
                goDocuments.RaiseChanged(TuDocumentEvents.FinishedUndo, 0, editToUndo, 0, undefined, NullRect, 0, undefined, NullRect);
            });
        }
    }
}
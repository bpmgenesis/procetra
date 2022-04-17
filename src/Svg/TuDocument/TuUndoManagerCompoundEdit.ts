import { ClassInfo, List, IList } from '@tuval/core';
import { ITuUndoableEdit } from '../ITuUndoableEdit';
import { Types } from '../types';

@ClassInfo({
    fullName: Types.TuUndoManagerCompoundEdit,
    instanceof: [
        Types.TuUndoManagerCompoundEdit
    ]
})
export class TuUndoManagerCompoundEdit implements ITuUndoableEdit {
    private myEdits: List<ITuUndoableEdit> = new List<ITuUndoableEdit>();
    private myIsComplete: boolean = false;
    private myName: string = '';

    public get AllEdits(): IList<ITuUndoableEdit> {
        return this.getAllEdits();
    }

    protected /*virtual*/  getAllEdits(): IList<ITuUndoableEdit> {
        return this.myEdits;
    }

    public get IsComplete(): boolean {
        return this.getIsComplete();
    }
    public set IsComplete(value: boolean) {
        this.setIsComplete(value);
    }
    protected /*virtual*/ getIsComplete(): boolean {
        return this.myIsComplete;
    }
    protected /*virtual*/ setIsComplete(value: boolean) {
        if (value) {
            this.myIsComplete = value;
        }
    }

    public get PresentationName(): string {
        return this.getPresentationName();
    }
    public set PresentationName(value: string) {
        this.setPresentationName(value);
    }
    protected /*virtual*/ getPresentationName(): string {
        return this.myName;
    }
    protected /*virtual*/ setPresentationName(value: string) {
        this.myName = value;
    }

    public /*virtual*/ addEdit(edit: ITuUndoableEdit): void {
        if (!this.IsComplete) {
            this.myEdits.Add(edit);
        }
    }

    public /*virtual*/ CanRedo(): boolean {
        return this.IsComplete;
    }

    public /*virtual*/ CanUndo(): boolean {
        return this.IsComplete;
    }

    public /*virtual*/ Clear(): void {
        for (let i = this.myEdits.Count - 1; i >= 0; i--) {
            this.myEdits[i].clear();
        }
        this.myEdits.Clear();
    }

    public /*virtual*/  Redo(): void {
        if (this.CanRedo()) {
            for (let i = 0; i <= this.myEdits.Count - 1; i++) {
                this.myEdits[i].redo();
            }
        }
    }

    public /*virtual*/ Undo(): void {
        if (this.CanUndo()) {
            for (let i = this.myEdits.Count - 1; i >= 0; i--) {
                this.myEdits[i].undo();
            }
        }
    }
}
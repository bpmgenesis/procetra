
export interface ITuUndoableEdit  {
    /**
     * Gets the user-visible string description of this undoable edit.
     */
    PresentationName: string;

    /**
     * Determine if this edit is ready to be and can be redone.
     */
    CanRedo(): boolean;

    /**
     * Determine if this edit is ready to be and can be undone.
     */
    CanUndo(): boolean;

    /**
     * Forget about any state remembered in this edit.
     */
    Clear(): void;

    /**
     * Restore the new state of this edit after having been undone.
     */
    Redo(): void;

    /**
     * Restore the previous state of this edit.
     */
    Undo(): void;
}
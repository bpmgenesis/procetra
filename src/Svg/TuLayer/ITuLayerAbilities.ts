
export interface ITuLayerAbilities {
    AllowCopy: boolean;
    AllowDelete: boolean;
    AllowEdit: boolean;
    AllowInsert: boolean;
    AllowLink: boolean
    AllowMove: boolean;
    AllowReshape: boolean;
    AllowResize: boolean;
    AllowSelect: boolean;
    CanCopyObjects(): boolean;
    CanDeleteObjects(): boolean;
    CanEditObjects(): boolean;
    CanInsertObjects(): boolean;
    CanLinkObjects(): boolean;
    CanMoveObjects(): boolean;
    CanReshapeObjects(): boolean;
    CanResizeObjects(): boolean;
    CanSelectObjects(): boolean;
    SetModifiable(b: boolean): void;
}
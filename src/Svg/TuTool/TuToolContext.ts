import { ClassInfo, Type, typeOf } from '@tuval/core';
import { TuInputEventArgs } from '../TuInputEventArgs';
import { TuView } from '../TuView/TuView';
import { Types } from '../types';
import { TuTool } from './TuTool';

type  ContextMenuStrip = any;
type ContextMenu = any;
@ClassInfo({
    fullName:Types.TuToolContext,
    instanceof: [
        Types.TuToolContext,
        Types.TuTool,
        Types.ITuTool]
 })
export class TuToolContext extends TuTool {
    public GetType(): Type {
        return typeOf(Types.TuToolContext);
    }

    private myBackgroundContextMenuStrip: ContextMenuStrip;
    private myBackgroundContextMenu: ContextMenu;
    private mySingleSelection: boolean = true;

    //#region [Property] BackgroundContextMenu
    public get BackgroundContextMenu(): ContextMenu {
        return this.myBackgroundContextMenu;
    }
    //#endregion

    //#region [Property] BackgroundContextMenuStrip
    public get BackgroundContextMenuStrip(): ContextMenuStrip {
        return this.myBackgroundContextMenuStrip;
    }
    //#endregion

    //#region [Property] SingleSelection
    public get SingleSelection(): boolean {
        return this.getSingleSelection();
    }
    public set SingleSelection(value: boolean) {
        this.setSingleSelection(value);
    }

    protected /*virtual*/ getSingleSelection(): boolean {
        return this.mySingleSelection;
    }
    protected /*virtual*/ setSingleSelection(value: boolean) {
        this.mySingleSelection = value;
    }
    //#endregion

    constructor(view: TuView) {
        super(view);
    }

    public /*override*/ canStart(): boolean {
        return this.LastInput.IsContextButton;
    }

    public /*override*/ doMouseUp(): void {
        this.doSelect(this.LastInput);
        this.View.doContextClick(this.LastInput);
        this.stopTool();
    }

    public /*override*/ doSelect(evt: TuInputEventArgs): void {
        if (this.SingleSelection || evt.Control || evt.Shift) {
            super.doSelect(evt);
            return;
        }
        this.CurrentObject = this.View.pickObject(true, false, evt.DocPoint, true);
        if (this.CurrentObject == null) {
            this.Selection.Clear();
            return;
        }
        if (!this.Selection.Contains(this.CurrentObject)) {
            this.Selection.select(this.CurrentObject);
        }
    }

    public /*override*/ start(): void {
        const contextMenu: ContextMenu = (this.View as any).ContextMenu;
        if (contextMenu == null) {
            const contextMenuStrip: ContextMenuStrip = (this.View as any).ContextMenuStrip;
            if (contextMenuStrip != null) {
                this.CurrentObject = this.View.pickObject(true, false, this.LastInput.DocPoint, false);
                if (this.CurrentObject != null) {
                    this.myBackgroundContextMenuStrip = contextMenuStrip;
                    (this.View as any).ContextMenuStrip = undefined;
                }
            }
        }
        else {
            this.CurrentObject = this.View.pickObject(true, false, this.LastInput.DocPoint, false);
            if (this.CurrentObject != null) {
                this.myBackgroundContextMenu = contextMenu;
                (this.View as any).ContextMenu = null;
                return;
            }
        }
    }

    public /*override*/ stop(): void {
        if (this.myBackgroundContextMenu != null) {
            (this.View as any).ContextMenu = this.myBackgroundContextMenu;
            this.myBackgroundContextMenu = undefined;
        }
        else if (this.myBackgroundContextMenuStrip != null) {
            (this.View as any).ContextMenuStrip = this.myBackgroundContextMenuStrip;
            this.myBackgroundContextMenuStrip = undefined;
        }
        this.CurrentObject = null;
    }
}
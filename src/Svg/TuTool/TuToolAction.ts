import { ClassInfo, as, Type, typeOf } from '@tuval/core';
import { TuObject } from '../TuObject/TuObject';
import { TuView } from '../TuView/TuView';
import { Types } from '../types';
import { IActionObject } from './IActionObject';
import { TuTool } from './TuTool';

@ClassInfo({
    fullName: Types.TuToolAction,
    instanceof: [
        Types.TuToolAction,
        Types.TuTool,
        Types.ITuTool]
})
export class TuToolAction extends TuTool {

    public GetType(): Type {
        return typeOf(Types.TuToolAction);
    }

    private myActionObject: IActionObject;
    private myAdjustedAutomatically: boolean;

    //#region [Property] CurrentObjectWasSelected
    public get ActionObject(): IActionObject {
        return this.getActionObject();
    }
    public set ActionObject(value: IActionObject) {
        this.setActionObject(value);
    }

    protected /*virtual*/ getActionObject(): IActionObject {
        return this.myActionObject;
    }
    protected /*virtual*/ setActionObject(value: IActionObject) {
        this.myActionObject = value;
    }
    //#endregion

    //#region [Property] AdjustedAutomatically
    public get AdjustedAutomatically(): boolean {
        return this.getAdjustedAutomatically();
    }
    public set AdjustedAutomatically(value: boolean) {
        this.setAdjustedAutomatically(value);
    }

    protected /*virtual*/ getAdjustedAutomatically(): boolean {
        return this.myAdjustedAutomatically;
    }
    protected /*virtual*/ setAdjustedAutomatically(value: boolean) {
        this.myAdjustedAutomatically = value;
    }
    //#endregion

    constructor(view: TuView) {
        super(view);
    }

    public autoAdjust(): void {
        if (this.ActionObject != null) {
            this.AdjustedAutomatically = true;
            this.ActionObject.onActionAdjusted(this.View, this.LastInput);
            this.AdjustedAutomatically = false;
        }
    }

    public /*override*/ canStart(): boolean {
        if (this.FirstInput.IsContextButton) {
            return false;
        }
        return this.pickActionObject() != null;
    }

    public /*override*/ doCancelMouse(): void {
        if (this.ActionObject != null) {
            this.ActionObject.onActionCancelled(this.View);
        }
        super.doCancelMouse();
    }

    public /*override*/ doMouseMove(): void {
        if (this.ActionObject != null) {
            this.ActionObject.onActionAdjusted(this.View, this.LastInput);
        }
    }

    public /*override*/ doMouseUp(): void {
        if (this.ActionObject != null) {
            this.ActionObject.onAction(this.View, this.LastInput);
        }
        this.stopTool();
    }

    public /*virtual*/  pickActionObject(): IActionObject {
        for (let i: TuObject = this.View.pickObject(true, false, this.LastInput.DocPoint, false); i != null; i = i.Parent) {
            const goActionObject: IActionObject = as(i, Types.IActionObject);
            if (goActionObject != null && goActionObject.ActionEnabled) {
                this.CurrentObject = i;
                return goActionObject;
            }
        }
        return undefined;
    }

    public /*override*/ start(): void {
        this.ActionObject = this.pickActionObject();
        if (this.ActionObject == null) {
            this.stopTool();
            return;
        }
        this.ActionObject.ActionActivated = true;
        this.ActionObject.onActionActivated(this.View, this.LastInput);
    }

    public /*virtual*/ startAutoAdjusting(): void {
        this.View.doAutoAction();
    }

    public /*override*/ stop(): void {
        this.stopAutoAdjusting();
        if (this.ActionObject != null) {
            this.ActionObject.ActionActivated = false;
        }
        this.ActionObject = undefined;
        this.CurrentObject = undefined;
    }

    public /*virtual*/ stopAutoAdjusting(): void {
        this.View.stopAutoScroll();
        this.AdjustedAutomatically = false;
    }
}
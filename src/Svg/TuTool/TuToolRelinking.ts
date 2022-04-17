import { TuView } from '../TuView/TuView';
import { TuToolLinking } from './TuToolLinking';
import { ClassInfo, is, as, Type, typeOf } from '@tuval/core';
import { Types } from '../types';
import { ITuHandle } from '../TuHandle/ITuHandle';
import { ITuLink } from '../ITuLink';
import { TuLink } from '../TuLink/TuLink';
import { CGPoint } from '@tuval/cg';
import { TuObject } from '../TuObject/TuObject';

@ClassInfo({
    fullName: Types.TuToolRelinking,
    instanceof: [
        Types.TuToolRelinking
    ]
})
export class TuToolRelinking extends TuToolLinking {

    public GetType(): Type {
        return typeOf(Types.TuToolRelinking);
    }

    private mySelectionHidden: boolean;

    public constructor(v: TuView) {
        super(v);
    }

    public /*override*/ canStart(): boolean {
        if (this.FirstInput.IsContextButton) {
            return false;
        }
        if (!this.View.CanLinkObjects()) {
            return false;
        }
        const goHandle: ITuHandle = this.pickRelinkHandle(this.FirstInput.DocPoint);
        if (goHandle == null) {
            return false;
        }
        if (goHandle.HandleID === 1024) {
            this.CurrentObject = goHandle.HandledObject;
            let selectedObject: ITuLink = as(goHandle.SelectedObject, Types.ITuLink);
            if (is.typeof<TuLink>(selectedObject, Types.TuLink)) {
                const goLink: TuLink = selectedObject;
                if (goLink.AbstractLink != null) {
                    selectedObject = goLink.AbstractLink;
                }
            }
            if (selectedObject == null) {
                return false;
            }
            this.Link = selectedObject;
            this.Forwards = false;
            return true;
        }
        if (goHandle.HandleID !== 1025) {
            return false;
        }
        this.CurrentObject = goHandle.HandledObject;
        let abstractLink: ITuLink = as(goHandle.SelectedObject, Types.ITuLink);
        if (is.typeof<TuLink>(abstractLink, Types.TuLink)) {
            const goLink1: TuLink = abstractLink;
            if (goLink1.AbstractLink != null) {
                abstractLink = goLink1.AbstractLink;
            }
        }
        if (abstractLink == null) {
            return false;
        }
        this.Link = abstractLink;
        this.Forwards = true;
        return true;
    }

    public /*virtual*/ pickRelinkHandle(dc: CGPoint): ITuHandle {
        return as(this.View.pickObject(false, true, dc, true), Types.ITuHandle);
    }

    public /*override*/ start(): void {
        super.start();
        const currentObject: TuObject = this.CurrentObject;
        if (currentObject != null && this.Selection.getHandleCount(currentObject) > 0) {
            this.mySelectionHidden = true;
            currentObject.RemoveSelectionHandles(this.Selection);
        }
        this.startRelink(this.Link, this.Forwards, this.LastInput.DocPoint);
    }

    public /*override*/ stop(): void {
        if (this.mySelectionHidden) {
            this.mySelectionHidden = false;
            const currentObject: TuObject = this.CurrentObject;
            if (currentObject != null && currentObject.Document === this.View.Document) {
                const goObject: TuObject = this.Link.TuObject;
                if (this.Selection.Contains(goObject)) {
                    currentObject.AddSelectionHandles(this.Selection, goObject);
                }
                else {
                    this.Selection.Add(goObject);
                }
            }
        }
        this.CurrentObject = undefined;
        super.stop();
    }
}
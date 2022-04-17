import { TuToolLinking } from "./TuToolLinking";
import { ClassInfo, Type, typeOf } from '@tuval/core';
import { Types } from '../types';
import { TuView } from "../TuView/TuView";
import { ITuPort } from "../ITuPort";


@ClassInfo({
    fullName: Types.TuToolLinkingNew,
    instanceof: [
        Types.TuToolLinkingNew
    ]
})
export class TuToolLinkingNew extends TuToolLinking {

    public GetType(): Type {
        return typeOf(Types.TuToolLinkingNew);
    }

    public constructor(view: TuView) {
        super(view);
    }
    public /*override*/ canStart(): boolean {
        if (this.FirstInput.IsContextButton) {
            return false;
        }
        if (!this.View.CanLinkObjects()) {
            return false;
        }
        const goPort: ITuPort = this.pickPort(this.FirstInput.DocPoint);
        this.OriginalStartPort = goPort;
        if (goPort == null) {
            return false;
        }
        if (this.isValidFromPort(goPort)) {
            return true;
        }
        return this.isValidToPort(goPort);
    }

    public /*override*/ start(): void {
        super.start();
        this.startNewLink(this.OriginalStartPort, this.LastInput.DocPoint);
    }
}
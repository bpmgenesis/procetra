import { TuInputEventArgs } from "./TuInputEventArgs";
import { TuObject } from './TuObject/TuObject';

export class TuObjectEnterLeaveEventArgs extends TuInputEventArgs {
    private myFrom: TuObject;
    private myTo: TuObject;

    public get From(): TuObject {
        return this.myFrom;
    }

    public get To(): TuObject {
        return this.myTo;
    }

    public constructor(from: TuObject, to: TuObject, evt: TuInputEventArgs) {
        super(evt);
        this.myFrom = from;
        this.myTo = to;
    }
}
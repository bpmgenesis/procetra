import { TuInputEventArgs } from "../TuInputEventArgs";
import { TuObject } from "./TuObject";

export class TuObjectEventArgs extends TuInputEventArgs {
    private myObject: TuObject;
    public get TuObject(): TuObject {
        return this.myObject;
    }
    public set TuObject(value: TuObject) {
        this.myObject = value;
    }

    public constructor(obj: TuObject, evt: TuInputEventArgs) {
        super(evt);
        this.myObject = obj;
    }
}
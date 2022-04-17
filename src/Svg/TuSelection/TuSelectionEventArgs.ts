import { TuObject } from "../TuObject/TuObject";

export class TuSelectionEventArgs {
    private myObject: TuObject;
    public get TuObject(): TuObject {
        return this.myObject;
    }
    public set TuObject(value: TuObject) {
        this.myObject = value;
    }

    public constructor(obj: TuObject) {
        this.myObject = obj;
    }
}
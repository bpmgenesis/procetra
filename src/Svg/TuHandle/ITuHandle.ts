import { TuObject } from "../TuObject/TuObject";


export interface ITuHandle {
    TuObject: TuObject;
    HandledObject: TuObject;
    HandleID: number;
    SelectedObject: TuObject;
}
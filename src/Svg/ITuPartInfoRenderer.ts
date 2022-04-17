import { TuObject } from "./TuObject/TuObject";
import { TuPartInfo } from "./TuPartInfo";

export interface ITuPartInfoRenderer {
    addPartInfo(obj: TuObject): void;
    associatePartInfo(obj: TuObject, info: TuPartInfo);
    createPartInfo(): TuPartInfo;
    getStandardPartInfo(obj: TuObject): TuPartInfo;
}
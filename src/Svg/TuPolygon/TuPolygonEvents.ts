import { TuShapeEvents } from './../TuShape/TuShapeEvents';
export class TuPolygonEvents extends TuShapeEvents {
    public static readonly AddedPoint = 1401;
    public static readonly ChangedAddPoint = 1401;
    public static readonly RemovedPoint = 1402;
    public static readonly ChangedRemovePoint = 1402;
    public static readonly ModifiedPoint = 1403;
    public static readonly ChangedModifiedPoint = 1403;
    public static readonly ChangedAllPoints = 1412;
    public static readonly ChangedStyle = 1414;
}
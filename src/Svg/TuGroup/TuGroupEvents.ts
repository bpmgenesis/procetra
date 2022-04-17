import { TuObjectEvents } from "../TuObjectEvents";


export class TuGroupEvents extends  TuObjectEvents{
    public static readonly InsertedObject = 1051;
    public static readonly RemovedObject = 1052;
    public static readonly ChangedZOrder = 1053;
    public static readonly ReplacedObject = 1054;
    public static readonly ChangedPickableBackground = 1055;
    public static readonly AddedChildName = 1056;
    public static readonly RemovedChildName = 1057;

    public static readonly 1051 = 'InsertedObject';
    public static readonly 1052 = 'RemovedObject';
    public static readonly 1053 = 'ChangedZOrder';
    public static readonly 1054 = 'ReplacedObject';
    public static readonly 1055 = 'ChangedPickableBackground';
    public static readonly 1056 = 'AddedChildName';
    public static readonly 1057 = 'RemovedChildName';
}

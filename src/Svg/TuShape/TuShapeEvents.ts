import { TuObjectEvents } from './../TuObjectEvents';
export class TuShapeEvents extends TuObjectEvents{
    public static readonly ChangedPen = 1101;
    public static readonly ChangedBrush = 1102;

    public static readonly 1101 = 'ChangedPen';
    public static readonly 1102 = 'ChangedBrush';
}
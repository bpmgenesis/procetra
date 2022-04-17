import { CGPoint } from '@tuval/cg';
import { TuObject } from './TuObject/TuObject';
import { TuView } from './TuView/TuView';
export interface ITuDragSnapper {
    SnapOpaque: boolean;
    canSnapPoint(p: CGPoint, obj: TuObject, view: TuView): boolean;
    snapPoint(p: CGPoint, obj: TuObject, view: TuView): CGPoint;
}
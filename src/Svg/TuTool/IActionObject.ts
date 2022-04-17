import { TuInputEventArgs } from '../TuInputEventArgs';
import { TuView } from '../TuView/TuView';
export interface IActionObject {
    ActionActivated: boolean;
    ActionEnabled: boolean;
    onAction(view: TuView, e: TuInputEventArgs): void;
    onActionActivated(view: TuView, e: TuInputEventArgs): void;
    onActionAdjusted(view: TuView, e: TuInputEventArgs): void;
    onActionCancelled(view: TuView): void;
}

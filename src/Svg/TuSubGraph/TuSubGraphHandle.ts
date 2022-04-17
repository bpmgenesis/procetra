import { Types } from './../types';
import { ClassInfo, as } from '@tuval/core';
import { TuCollapsibleHandle } from '../TuCollapsibleHandle/TuCollapsibleHandle';
import { TuInputEventArgs } from '../TuInputEventArgs';
import { TuView } from '../TuView/TuView';
import { TuSubGraph } from './TuSubGraph';

@ClassInfo({
    fullName: Types.TuSubGraphHandle,
    instanceof: [
        Types.TuSubGraphHandle
    ]
})
export class TuSubGraphHandle extends TuCollapsibleHandle {
    public /*override*/ OnSingleClick(evt: TuInputEventArgs, view: TuView): boolean {
        const parent: TuSubGraph = as(this.Parent, Types.TuSubGraph);
        if (parent == null || !parent.Collapsible) {
            return false;
        }
        if (view != null) {
            view.startTransaction();
        }
        let str: string;
        if (parent.IsExpanded) {
            parent.collapse();
            str = "Collapsed SubGraph";
        }
        else if (!evt.Control) {
            parent.expand();
            str = "Expanded SubGraph";
        }
        else {
            parent.expandAll();
            str = "Expanded All SubGraphs";
        }
        if (view != null) {
            view.finishTransaction(str);
        }
        return true;
    }
}
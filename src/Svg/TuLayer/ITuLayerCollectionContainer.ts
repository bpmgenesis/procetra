import { ITuLayerAbilities } from "./ITuLayerAbilities";
import { CGRectangle } from '@tuval/cg';
import { TuLayerCollection } from "./TuLayerCollection";

export interface ITuLayerCollectionContainer extends ITuLayerAbilities
{
    Layers: TuLayerCollection;
    RaiseChanged(hint: number, subhint: number,  obj: any, oldI: number, oldVal: any,  oldRect: CGRectangle,  newI: number, newVal: any,  newRect: CGRectangle): void;
}
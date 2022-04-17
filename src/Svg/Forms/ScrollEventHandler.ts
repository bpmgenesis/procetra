import { Delegate } from '@tuval/core';
import { ScrollEventArgs } from "./ScrollEventArgs";

type HandlerFunc = (sender: any, e: ScrollEventArgs) => void;
export class ScrollEventHandler extends Delegate<HandlerFunc> {
    public constructor(scope: any, func: HandlerFunc) {
        super(func);
    }
}
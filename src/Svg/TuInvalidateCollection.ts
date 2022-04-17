import { GeomUtilities } from './GeomUtilities';
import { CGRectangle } from '@tuval/cg';
import { List, foreach } from '@tuval/core';

export class TuInvalidateCollection extends List<CGRectangle> {
    public getInvalidateRectangle(): CGRectangle {
        let unionRect: CGRectangle;
        foreach(this, (rect: CGRectangle) => {
            if (unionRect == null) {
                unionRect = rect;
            } else {
                unionRect = GeomUtilities.UnionRect(unionRect, rect);
            }
        });

        this.Clear();
        return unionRect;
    }

    public get IsEmpty(): boolean {
        return this.Count === 0;
    }
}
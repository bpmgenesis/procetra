import { SegInfo } from "./SegInfo";
import { IComparer } from '@tuval/core';

export class SegInfoComparer implements IComparer<SegInfo>
{
    private static myDefaultComparer: SegInfoComparer;

    public static get Default(): SegInfoComparer {
        return SegInfoComparer.myDefaultComparer;
    }


    public Compare(a: SegInfo, b: SegInfo): number {
        if (a == null || b == null || a === b) {
            return 0;
        }
        if (a.Layer < b.Layer) {
            return -1;
        }
        if (a.Layer > b.Layer) {
            return 1;
        }
        if (a.ColumnMin < b.ColumnMin) {
            return -1;
        }
        if (a.ColumnMin > b.ColumnMin) {
            return 1;
        }
        if (a.ColumnMax < b.ColumnMax) {
            return -1;
        }
        if (a.ColumnMax > b.ColumnMax) {
            return 1;
        }
        return 0;
    }
}

(function SegInfoComparerStaticConstructor() {
    (<any>SegInfoComparer).myDefaultComparer = new SegInfoComparer();
})();
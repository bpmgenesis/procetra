import { SegInfo } from "./SegInfo";
import { IComparer } from '@tuval/core';

export class SegInfoComparer2 implements IComparer<SegInfo>
{
    private myFirst: boolean;

    private static myDefaultFirstComparer: SegInfoComparer2;

    private static myDefaultLastComparer: SegInfoComparer2;

    public static get DefaultFirst(): SegInfoComparer2 {

        return SegInfoComparer2.myDefaultFirstComparer;

    }

    public static get DefaultLast(): SegInfoComparer2 {
        return SegInfoComparer2.myDefaultLastComparer;
    }

    constructor(f: boolean) {
        this.myFirst = f;
    }

    public Compare(a: SegInfo, b: SegInfo): number {
        if (a == null || b == null || a === b) {
            return 0;
        }
        // TODO:
        // Trace.Assert(a.Layer == b.Layer);
        if (!this.myFirst) {
            if (a.Last < b.Last) {
                return -1;
            }
            if (a.Last > b.Last) {
                return 1;
            }
        }
        else {
            if (a.First < b.First) {
                return -1;
            }
            if (a.First > b.First) {
                return 1;
            }
        }
        if (a.Turns < b.Turns) {
            return 1;
        }
        if (a.Turns > b.Turns) {
            return -1;
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

function segInfoComparer2StaticConstructor() {
    (<any>SegInfoComparer2).myDefaultFirstComparer = new SegInfoComparer2(true);
    (<any>SegInfoComparer2).myDefaultLastComparer = new SegInfoComparer2(false);
}

segInfoComparer2StaticConstructor();
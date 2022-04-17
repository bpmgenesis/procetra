import { IComparer, as } from '@tuval/core';
import { ITuDragSnapper } from '../ITuDragSnapper';
import { TuGroup } from '../TuGroup/TuGroup';
import { TuGroupEnumerator } from '../TuGroup/TuGroupEnumerator';
import { TuObject } from '../TuObject/TuObject';
import { Types } from '../types';
import { TuLayer } from './TuLayer';

export class ZComparer implements IComparer<ITuDragSnapper>
{

    private aFirst(obj: TuObject, a: TuObject, b: TuObject): number {
        let int32: number;
        if (obj === a) {
            return -1;
        }
        if (obj === b) {
            return 1;
        }
        const goGroups: TuGroup = as(obj, Types.TuGroup);
        if (goGroups != null) {
            const enumerator: TuGroupEnumerator = goGroups.GetEnumerator().GetEnumerator();
            try {
                while (enumerator.MoveNext()) {
                    const int321: number = this.aFirst(enumerator.Current, a, b);
                    if (int321 === 0) {
                        continue;
                    }
                    int32 = int321;
                    return int32;
                }
                return 0;
            }
            finally {
                enumerator.Dispose();
            }
            return int32;
        }
        return 0;
    }

    public Compare(x: ITuDragSnapper, y: ITuDragSnapper): number {
        if (x == null || y == null || x === y) {
            return 0;
        }
        const goObject: TuObject = as(x, Types.TuObject);
        const goObject1: TuObject = as(y, Types.TuObject);
        const layer: TuLayer = goObject.Layer;
        const topLevelObject: TuObject = goObject.TopLevelObject;
        const int32: number = layer.IndexOf(topLevelObject);
        const int321: number = layer.IndexOf(goObject1.TopLevelObject);
        if (int32 < int321) {
            return -1;
        }
        if (int32 > int321) {
            return 1;
        }
        return this.aFirst(topLevelObject, goObject, goObject1);
    }
}

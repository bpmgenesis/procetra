import { ClassInfo, System, ICollection, IEnumerable, Dictionary, IKeyValuePair, BREAK, foreach, IEnumerator, IEnumerableOrArray } from '@tuval/core';
import { Types } from './types';

@ClassInfo({
    fullName: Types.TuCopyDelayedsCollection,
    instanceof: [
        Types.TuCopyDelayedsCollection,
        System.Types.Collections.ICollection,
        System.Types.Collections.Enumeration.IEnumerable
    ]
})
export class TuCopyDelayedsCollection implements ICollection<any>, IEnumerable<any> {
    private myObjects: Dictionary<any, boolean> = new Dictionary<any, boolean>();

    public get Count(): number {
        return this.getCount();
    }

    protected getCount(): number {
        return this.myObjects.Count;
    }

    public get IsEmpty(): boolean {
        return this.getIsEmpty();
    }

    protected getIsEmpty(): boolean {
        return this.Count === 0;
    }

    public get IsReadOnly(): boolean {
        return this.getIsReadOnly();
    }

    protected getIsReadOnly(): boolean {
        return false;
    }

    public /* virtual */ Add(obj: any): this {
        if (obj != null) {
            this.myObjects.Add(obj, true);
        }
        return this;
    }

    public /* virtual */  Clear(): void {
        this.myObjects.Clear();
    }

    public /* virtual */ Contains(obj: any): boolean {
        if (obj == null) {
            return false;
        }
        return this.myObjects.ContainsKey(obj);
    }

    public /* virtual */ CopyArray(): any[] {
        const objArray: any[] = new Array(this.Count);
        this.CopyTo(objArray, 0);
        return objArray;
    }

    public /* virtual */ CopyTo(array: any[], index: number): any[] {
        let ınt32: number = index;
        foreach(this.myObjects, (myObject: IKeyValuePair<any, boolean>) => {
            if (ınt32 < array.length) {
                const key: any = myObject.key;
                const ınt321: number = ınt32;
                ınt32 = (ınt321 + 1);
                array[ınt321] = key;
            }
            else {
                return BREAK;
            }
        });
        return array;

    }

    public /* virtual */ GetEnumerator(): IEnumerator<any> {
        return this.myObjects.Keys.GetEnumerator();
    }

    public /* virtual */ Remove(obj: any): boolean {
        if (obj == null) {
            return false;
        }
        this.myObjects.Remove(obj);
        return true;
    }

    public importEntries(entries: IEnumerableOrArray<any> | IEnumerator<any>): number {
        return 0;
    }
    public toArray(): any[] {
        return undefined;
    }
    public removeAt(index: number): void {

    }


}

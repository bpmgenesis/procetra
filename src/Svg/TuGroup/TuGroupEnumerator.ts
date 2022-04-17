import { ClassInfo, IEnumerator, IEnumerable, List, InvalidOperationException, int, System, IIteratorResult } from '@tuval/core';
import { TuObject } from '../TuObject/TuObject';

import { Types } from '../types';

@ClassInfo({
    fullName: Types.TuGroupEnumerator,
    instanceof: [
        Types.TuGroupEnumerator,
        System.Types.Collections.Enumeration.IEnumerator,
        System.Types.Collections.Enumeration.IEnumerable
    ]
})
export class TuGroupEnumerator implements IEnumerator<TuObject>, IEnumerable<TuObject>
{
    private myArray: List<TuObject>;
    private myForward: boolean = false;
    private myIndex: int = 0;

    /// <summary>
    ///  Gets the current object in the group.
    /// </summary>
    public get Current(): TuObject {
        if (this.myIndex < 0 || this.myIndex >= this.myArray.Count) {
            throw new InvalidOperationException("TuGroup.TuGroupEnumerator is not at a valid position for the List");
        }
        return this.myArray.Get((this as any).myIndex);
    }

             /* internal */ constructor(a: List<TuObject>, forward: boolean) {
        this.myArray = a;
        this.myForward = forward;
        this.myIndex = -1;
        this.Reset();
    }
    CanMoveNext?: boolean;
    TryMoveNext(out: (value: TuObject) => void): boolean {
        throw new Error("Method not implemented.");
    }
    End(): void {
        throw new Error("Method not implemented.");
    }
    NextValue(value?: any): TuObject {
        throw new Error("Method not implemented.");
    }
    Next(value?: any): IIteratorResult<TuObject> {
        throw new Error("Method not implemented.");
    }

    IsEndless?: boolean;

    public Dispose(): void {
    }

    public GetEnumerator(): TuGroupEnumerator {
        let goGroupEnumerators: TuGroupEnumerator = this;
        goGroupEnumerators.Reset();
        return goGroupEnumerators;
    }

    public MoveNext(): boolean {
        if (!this.myForward) {
            if ((this.myIndex - 1) < 0) {
                return false;
            }
            this.myIndex = (this.myIndex - 1);
            return true;
        }
        if ((this.myIndex + 1) >= this.myArray.Count) {
            return false;
        }
        this.myIndex = (this.myIndex + 1);
        return true;
    }

    public Reset(): void {
        if (this.myForward) {
            this.myIndex = -1;
            return;
        }
        this.myIndex = this.myArray.Count;
    }
}
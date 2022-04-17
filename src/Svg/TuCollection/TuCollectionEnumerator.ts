import { ClassInfo, System, DisposableBase, IEnumerator, IEnumerable, List, InvalidOperationException, TString, error, IIteratorResult } from '@tuval/core';
import { TuObject } from '../TuObject/TuObject';
import { Types } from '../types';
import { TuCollection } from './TuCollection';

@ClassInfo({
    fullName: Types.TuCollectionEnumerator,
    instanceof: [
        Types.TuCollectionEnumerator,
        System.Types.Disposable.DisposableBase,
        System.Types.Collections.Enumeration.IEnumerator,
        System.Types.Collections.Enumeration.IEnumerable
    ]
})
export class TuCollectionEnumerator extends DisposableBase implements IEnumerator<TuObject>, IEnumerable<TuObject> {
    /// <summary>
    /// Return an enumerator that doesn't iterate at all.
    /// </summary>
    public static readonly Empty: TuCollectionEnumerator;

    private myArray: List<TuObject>;

    private myForward: boolean = false;

    private myIndex: number = 0;

    private/* internal */  myOriginalChanges: number = 0;

    private/* internal */  myOriginalCollection: TuCollection;

    /// <summary>
    ///  Gets the current object in the collection for this enumerator.
    /// </summary>
    public get Current(): TuObject {
        if (this.myIndex < 0 || this.myIndex >= this.myArray.Count) {
            throw new InvalidOperationException("TuCollectionEnumerator is not at a valid position for the List");
        }
        return this.myArray[this.myIndex];
    }




    /// <summary>
    /// Construct an IEnumerator for iterating either forwards or backwards over a
    /// <see cref="T:System.Collections.Generic.List`1" />s.
    /// </summary>
    /// <param name="a"></param>
    /// <param name="forward"></param>
    public constructor(a: List<TuObject>, forward: boolean) {
        super();
        this.myArray = a;
        this.myForward = forward;
        this.myIndex = -1;
        this.myOriginalChanges = 0;
        this.myOriginalCollection = null;
        this.Reset();
    }


    public GetEnumerator(): TuCollectionEnumerator {
        const goCollectionEnumerators: TuCollectionEnumerator = this;
        goCollectionEnumerators.Reset();
        return goCollectionEnumerators;
    }

    /// <summary>
    /// Advance the enumerator to the next GoObject.
    /// </summary>
    /// <returns>True if there is a next GoObject; false if it has finished iterating over the collection.</returns>
    public MoveNext(): boolean {
        if (this.myOriginalCollection != null && this.myOriginalCollection.myChanges !== this.myOriginalChanges) {
            throw new InvalidOperationException(TString.Concat(this.myOriginalCollection/* .getType().FullName */, " was modified during enumeration."));
        }
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

    /// <summary>
    /// Reset the enumerator to its original position.
    /// </summary>
    public Reset(): void {
        if (this.myOriginalCollection != null && this.myOriginalCollection.myChanges != this.myOriginalChanges) {
            throw new InvalidOperationException(TString.Concat(this.myOriginalCollection/* .getType() .FullName*/, " was modified during enumeration."));
        }
        if (this.myForward) {
            this.myIndex = -1;
            return;
        }
        this.myIndex = this.myArray.Count;
    }

    public TryMoveNext(out: (value: any) => void): boolean {
        throw error('tryMoveNext not implemented in TuCollectionEnumerator');
    }

    public End() {
        throw error('end not implemented in TuCollectionEnumerator');
    }

    public NextValue(value?: any): any | undefined {
        throw error('nextValue not implemented in TuCollectionEnumerator');
    }

    public isEndless: boolean = false;

    public Next(value?: any): IIteratorResult<any> {
        throw error('next not implemented in TuCollectionEnumerator');
    }
    'return'?(value?: any): IIteratorResult<any> {
        throw error('return not implemented in TuCollectionEnumerator');
    }
    'throw'?(e?: any): IIteratorResult<any> {
        throw error('throw not implemented in TuCollectionEnumerator');
    }
}

(function staticConstructor() {
    (<any>TuCollectionEnumerator).Empty = new TuCollectionEnumerator(new List<TuObject>(), true);
})();
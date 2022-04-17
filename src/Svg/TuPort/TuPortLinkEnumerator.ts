import { ITuLink } from './../ITuLink';
import { Types } from './../types';
import { ClassInfo, System, DisposableBase, IEnumerator, IEnumerable, List, InvalidOperationException,error, IIteratorResult } from '@tuval/core';

@ClassInfo({
    fullName: Types.TuPortFilteredLinkEnumerator,
    instanceof: [
        Types.TuPortFilteredLinkEnumerator,
        System.Types.Disposable.DisposableBase,
        System.Types.Collections.Enumeration.IEnumerator,
        System.Types.Collections.Enumeration.IIterator,
        System.Types.Collections.Enumeration.IEnumerable
    ]
})
export class TuPortLinkEnumerator extends DisposableBase implements IEnumerator<ITuLink>, IEnumerable<ITuLink> {
    private myArray: List<ITuLink>;
    private myIndex: number;

    public get Current(): ITuLink {
        if (this.myIndex < 0 || this.myIndex >= this.myArray.Count) {
            throw new InvalidOperationException("TuPort.GoPortLinkEnumerator is not at a valid position for the List");
        }
        return this.myArray[this.myIndex];
    }

    public get First(): ITuLink {
        if (this.myArray.Count <= 0) {
            return undefined;
        }
        return this.myArray[0];
    }

    public get Last(): ITuLink {
        if (this.myArray.Count <= 0) {
            return undefined;
        }
        return this.myArray[this.myArray.Count - 1];
    }

    public constructor(a: List<ITuLink>) {
        super();
        this.myArray = a;
        this.myIndex = -1;
        this.Reset();
    }

    public GetEnumerator(): TuPortLinkEnumerator {
        const goPortLinkEnumerators: TuPortLinkEnumerator = this;
        goPortLinkEnumerators.Reset();
        return goPortLinkEnumerators;
    }

    /// <summary>
    /// Advance the enumerator to the next IGoLink.
    /// </summary>
    /// <returns>True if there is a next IGoLink; false if it has finished iterating over the collection.</returns>
    public MoveNext(): boolean {
        if (this.myIndex + 1 >= this.myArray.Count) {
            return false;
        }
        this.myIndex = this.myIndex + 1;
        return true;
    }

    /// <summary>
    /// Reset the enumerator to its original position.
    /// </summary>
    public Reset() {
        this.myIndex = -1;
    }

    public TryMoveNext(out: (value: any) => void): boolean {
        throw error('tryMoveNext not implemented in TuPortLinkEnumerator');
    }

    public End() {
        throw error('end not implemented in TuPortLinkEnumerator');
    }

    public NextValue(value?: any): any | undefined {
        throw error('nextValue not implemented in TuPortLinkEnumerator');
    }

    public isEndless: boolean = false;

    public Next(value?: any): IIteratorResult<any> {
        throw error('next not implemented in TuPortLinkEnumerator');
    }
    'return'?(value?: any): IIteratorResult<any> {
        throw error('return not implemented in TuPortLinkEnumerator');
    }
    'throw'?(e?: any): IIteratorResult<any> {
        throw error('throw not implemented in TuPortLinkEnumerator');
    }
}

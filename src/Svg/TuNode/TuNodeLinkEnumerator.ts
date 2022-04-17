import { ITuLink } from './../ITuLink';
import { Types } from './../types';
import { ClassInfo, System, DisposableBase, IEnumerator, IIterator, IEnumerable, List, InvalidOperationException, error, IIteratorResult } from '@tuval/core';
import { TuNode } from './TuNode';
import { TuNodeSearch } from './TuNodeSearch';

@ClassInfo({
    fullName: Types.TuNodeLinkEnumerator,
    instanceof: [
        Types.TuNodeLinkEnumerator,
        Types.DisposableBase,
        System.Types.Collections.Enumeration.IEnumerator,
        System.Types.Collections.Enumeration.IEnumerable,
        System.Types.Collections.Enumeration.IIterator
    ]
})
export class TuNodeLinkEnumerator extends DisposableBase implements IEnumerator<ITuLink>, IIterator<ITuLink>, IEnumerable<ITuLink> {
    private myNode: TuNode;
    private mySearch: TuNodeSearch;
    private myArray: List<ITuLink>;
    private myIndex: number = 0;

    public get Count(): number {
        return this.myArray.Count;
    }

    public get Current(): ITuLink {
        if (this.myIndex < 0 || this.myIndex >= this.myArray.Count) {
            throw new InvalidOperationException("TuNode.TuNodeLinkEnumerator is not at a valid position for the Collection");
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

    constructor(n: TuNode, s: TuNodeSearch) {
        super();
        this.myNode = n;
        this.mySearch = s;
        this.myArray = undefined;
        this.myIndex = -1;
        this.Reset();
    }

    public GetEnumerator(): TuNodeLinkEnumerator {
        return this;
    }

    public MoveNext(): boolean {
        if (this.myIndex + 1 >= this.myArray.Count) {
            return false;
        }
        this.myIndex = this.myIndex + 1;
        return true;
    }

    public Reset(): void {
        this.myArray = this.myNode.findAll<ITuLink>(this.mySearch);
        this.myIndex = -1;
    }

    public TryMoveNext(out: (value: ITuLink) => void): boolean {
        throw error('tryMoveNext not implemented in PortFilteredLinkEnumerator');
    }

    public End() {
        throw error('end not implemented in PortFilteredLinkEnumerator');
    }

    public NextValue(value?: any): ITuLink | undefined {
        throw error('nextValue not implemented in PortFilteredLinkEnumerator');
    }

    public isEndless: boolean = false;

    public Next(value?: any): IIteratorResult<ITuLink> {
        throw error('next not implemented in PortFilteredLinkEnumerator');
    }

    'return'?<ITuLink>(value?: ITuLink): IIteratorResult<ITuLink> {
        throw error('return not implemented in PortFilteredLinkEnumerator');
    }
    'throw'?(e?: any): IIteratorResult<ITuLink> {
        throw error('throw not implemented in PortFilteredLinkEnumerator');
    }
}
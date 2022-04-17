import { ClassInfo, System, DisposableBase, IEnumerator, IIterator, IEnumerable, List, InvalidOperationException , error,
    IIteratorResult} from '@tuval/core';
import { ITuPort } from '../ITuPort';
import { Types } from '../types';
import { TuNode } from './TuNode';
import { TuNodeSearch } from './TuNodeSearch';

@ClassInfo({
    fullName: Types.TuNodePortEnumerator,
    instanceof: [
        Types.TuNodePortEnumerator,
        Types.DisposableBase,
        System.Types.Collections.Enumeration.IEnumerator,
        System.Types.Collections.Enumeration.IEnumerable,
        System.Types.Collections.Enumeration.IIterator
    ]
})
export class TuNodePortEnumerator extends DisposableBase implements IEnumerator<ITuPort>, IIterator<ITuPort>, IEnumerable<ITuPort> {
    private myNode: TuNode;
    private mySearch: TuNodeSearch;
    private myArray: List<ITuPort>;
    private myIndex: number;

    public get Count(): number {
        return this.myArray.Count;
    }

    public get Current(): ITuPort {
        if (this.myIndex < 0 || this.myIndex >= this.myArray.Count) {
            throw new InvalidOperationException("TuNode.TuNodePortEnumerator is not at a valid position for the List");
        }
        return this.myArray[this.myIndex];
    }

    public get First(): ITuPort {
        if (this.myArray.Count <= 0) {
            return undefined;
        }
        return this.myArray[0];
    }

    public get Last(): ITuPort {
        if (this.myArray.Count <= 0) {
            return null;
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

    public GetEnumerator(): TuNodePortEnumerator {
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
        this.myArray = this.myNode.findAll<ITuPort>(this.mySearch);
        this.myIndex = -1;
    }

    public TryMoveNext(out: (value: ITuPort) => void): boolean {
        throw error('tryMoveNext not implemented in PortFilteredLinkEnumerator');
    }

    public End() {
        throw error('end not implemented in PortFilteredLinkEnumerator');
    }

    public NextValue(value?: any): ITuPort | undefined {
        throw error('nextValue not implemented in PortFilteredLinkEnumerator');
    }

    public isEndless: boolean = false;

    public Next(value?: any): IIteratorResult<ITuPort> {
        throw error('next not implemented in PortFilteredLinkEnumerator');
    }

    'return'?<ITuPort>(value?: ITuPort): IIteratorResult<ITuPort> {
        throw error('return not implemented in PortFilteredLinkEnumerator');
    }
    'throw'?(e?: any): IIteratorResult<ITuPort> {
        throw error('throw not implemented in PortFilteredLinkEnumerator');
    }
}
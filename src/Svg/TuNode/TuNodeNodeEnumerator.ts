import { ITuNode } from './ITuNode';
import { ClassInfo, System, DisposableBase, IEnumerator, IIterator, IEnumerable, List, InvalidOperationException, error, IIteratorResult } from '@tuval/core';
import { Types } from '../types';
import { TuNode } from './TuNode';
import { TuNodeSearch } from './TuNodeSearch';


@ClassInfo({
    fullName: Types.TuNodeNodeEnumerator,
    instanceof: [
        Types.TuNodeNodeEnumerator,
        Types.DisposableBase,
        System.Types.Collections.Enumeration.IEnumerator,
        System.Types.Collections.Enumeration.IEnumerable,
        System.Types.Collections.Enumeration.IIterator
    ]
})
export class TuNodeNodeEnumerator extends DisposableBase implements IEnumerator<ITuNode>, IIterator<ITuNode>,IEnumerable<ITuNode> {
    private myNode: TuNode;
    private mySearch: TuNodeSearch;
    private myArray: List<ITuNode>;
    private myIndex: number;

    public get Count(): number {
        return this.myArray.Count;
    }

    public get Current(): ITuNode {
        if (this.myIndex < 0 || this.myIndex >= this.myArray.Count) {
            throw new InvalidOperationException("TuNode.TuNodeNodeEnumerator is not at a valid position for the List");
        }
        return this.myArray[this.myIndex];
    }

    public get First(): ITuNode {
        if (this.myArray.Count <= 0) {
            return undefined;
        }
        return this.myArray[0];
    }

    public get Last(): ITuNode {
        if (this.myArray.Count <= 0) {
            return null;
        }
        return this.myArray[this.myArray.Count - 1];
    }

    public constructor(n: TuNode, s: TuNodeSearch) {
        super();
        this.myNode = n;
        this.mySearch = s;
        this.myArray = undefined;
        this.myIndex = -1;
        this.Reset();
    }


    public GetEnumerator(): TuNodeNodeEnumerator {
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
        this.myArray = this.myNode.findAll<ITuNode>(this.mySearch);
        this.myIndex = -1;
    }

    public TryMoveNext(out: (value: ITuNode) => void): boolean {
        throw error('tryMoveNext not implemented in PortFilteredLinkEnumerator');
    }

    public End() {
        throw error('end not implemented in PortFilteredLinkEnumerator');
    }

    public NextValue(value?: any): ITuNode | undefined {
        throw error('nextValue not implemented in PortFilteredLinkEnumerator');
    }

    public isEndless: boolean = false;

    public Next(value?: any): IIteratorResult<ITuNode> {
        throw error('next not implemented in PortFilteredLinkEnumerator');
    }

    'return'?<ITuNode>(value?: ITuNode): IIteratorResult<ITuNode> {
        throw error('return not implemented in PortFilteredLinkEnumerator');
    }
    'throw'?(e?: any): IIteratorResult<ITuNode> {
        throw error('throw not implemented in PortFilteredLinkEnumerator');
    }
}
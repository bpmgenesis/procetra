import { ITuLink } from './../ITuLink';
import { ClassInfo, System, DisposableBase, IEnumerator, IEnumerable, List, InvalidOperationException, error, IIteratorResult } from '@tuval/core';
import { Types } from '../types';
import { ITuPort } from '../ITuPort';

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
export class TuPortFilteredLinkEnumerator extends DisposableBase implements IEnumerator<ITuLink>, IEnumerable<ITuLink> {
    private myPort: ITuPort;
    private myArray: List<ITuLink>;
    private myIndex: number;
    private myDest: boolean;

    public get Current(): ITuLink {
        if (this.myIndex < 0 || this.myIndex >= this.myArray.Count) {
            throw new InvalidOperationException("Port.PortFilteredLinkEnumerator is not at a valid position for the List");
        }
        return this.myArray[this.myIndex];
    }

    public get First(): ITuLink {
        for (let i = 0; i < this.myArray.Count; i++) {
            const item: ITuLink = this.myArray[i];
            if (this.myDest) {
                if (item.FromPort === this.myPort) {
                    return item;
                }
            }
            else if (item.ToPort === this.myPort) {
                return item;
            }
        }
        return undefined;
    }

    public get Last(): ITuLink {
        for (let i = this.myArray.Count - 1; i >= 0; i++) {
            const item: ITuLink = this.myArray[i];
            if (this.myDest) {
                if (item.FromPort === this.myPort) {
                    return item;
                }
            }
            else if (item.ToPort === this.myPort) {
                return item;
            }
        }
        return undefined;
    }

    public constructor(p: ITuPort, a: List<ITuLink>, dest: boolean) {
        super();
        this.myPort = p;
        this.myArray = a;
        this.myIndex = -1;
        this.myDest = dest;
        this.Reset();
    }

    public GetEnumerator(): TuPortFilteredLinkEnumerator {
        const goPortFilteredLinkEnumerators: TuPortFilteredLinkEnumerator = this;
        goPortFilteredLinkEnumerators.Reset();
        return goPortFilteredLinkEnumerators;
    }

    public MoveNext(): boolean {
        if (this.myIndex + 1 >= this.myArray.Count) {
            return false;
        }
        this.myIndex = this.myIndex + 1;
        const item: ITuLink = this.myArray[this.myIndex];
        if (this.myDest) {
            if (item.FromPort !== this.myPort) {
                return this.MoveNext();
            }
        }
        else if (item.ToPort !== this.myPort) {
            return this.MoveNext();
        }
        return true;
    }

    /// <summary>
    /// Reset the enumerator to its original position.
    /// </summary>
    public Reset(): void {
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

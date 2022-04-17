import { ClassInfo, System, DisposableBase, IEnumerator, List, InvalidOperationException, error, IIteratorResult } from '@tuval/core';
import { TuObject } from '../TuObject/TuObject';
import { Types } from '../types';

@ClassInfo({
    fullName: Types.TuLayerEnumerator,
    instanceof: [
        Types.TuLayerEnumerator,
        System.Types.Disposable.DisposableBase,
        System.Types.Collections.Enumeration.IEnumerator,
        System.Types.Collections.Enumeration.IEnumerable
    ]
})
export class TuLayerEnumerator extends DisposableBase implements IEnumerator<TuObject> {

    public static Empty: TuLayerEnumerator;
    private myArray: List<TuObject>;
    private myForward: boolean;
    private myIndex: number;

    constructor(a: List<TuObject>, forward: boolean) {
        super();
        this.myArray = a;
        this.myForward = forward;
        this.myIndex = -1;
        this.Reset();
    }
    CanMoveNext?: boolean;
    End(): void {
        throw new Error('Method not implemented.');
    }
    NextValue(value?: any): TuObject {
        throw new Error('Method not implemented.');
    }
    IsEndless?: boolean;
    Next(value?: any): IIteratorResult<TuObject> {
        throw new Error('Method not implemented.');
    }
    /**
     * Gets the current object in the layer.
     */
    public get Current(): TuObject {
        if (this.myIndex < 0 || this.myIndex >= this.myArray.Count) {
            throw new InvalidOperationException("LayerEnumerator is not at a valid position for the List");
        }
        return this.myArray.Get(this.myIndex);
    }

    /**
     * Gets an enumerator for iterating over the GoObjects in this layer.
     */
    public GetEnumerator(): TuLayerEnumerator {
        const layerEnumerators = this;
        layerEnumerators.Reset();
        return layerEnumerators;
    }

    public MoveNext(): boolean {
        if (!this.myForward) {
            if (this.myIndex - 1 < 0) {
                return false;
            }
            this.myIndex = this.myIndex - 1;
            return true;
        }
        if (this.myIndex + 1 >= this.myArray.Count) {
            return false;
        }
        this.myIndex = this.myIndex + 1;
        return true;
    }

    public Reset() {
        if (this.myForward) {
            this.myIndex = -1;
            return;
        }
        this.myIndex = this.myArray.Count;
    }



    public TryMoveNext(out: (value: TuObject) => void): boolean {
        throw error('tryMoveNext not implemented in PortFilteredLinkEnumerator');
    }

    public end() {
        throw error('end not implemented in PortFilteredLinkEnumerator');
    }

    public nextValue(value?: any): TuObject | undefined {
        throw error('nextValue not implemented in PortFilteredLinkEnumerator');
    }

    public isEndless: boolean = false;

    public next(value?: any): IIteratorResult<TuObject> {
        throw error('next not implemented in PortFilteredLinkEnumerator');
    }
    'return'?<TuObject>(value?: TuObject): IIteratorResult<TuObject> {
        throw error('return not implemented in PortFilteredLinkEnumerator');
    }
    'throw'?(e?: any): IIteratorResult<TuObject> {
        throw error('throw not implemented in PortFilteredLinkEnumerator');
    }
}
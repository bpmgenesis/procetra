import { ClassInfo, System, DisposableBase, IEnumerator, IEnumerable, List, InvalidOperationException, as, error, IIteratorResult } from '@tuval/core';
import { TuObject } from '../TuObject/TuObject';
import { Types } from '../types';
import { TuLayer } from './TuLayer';
import { TuLayerEnumerator } from './TuLayerEnumerator';

@ClassInfo({
    fullName: Types.TuLayerCollectionObjectEnumerator,
    instanceof: [
        Types.TuLayerCollectionObjectEnumerator,
        System.Types.Disposable.DisposableBase,
        System.Types.Collections.Enumeration.IEnumerator,
        System.Types.Collections.Enumeration.IEnumerable
    ]
})
export class TuLayerCollectionObjectEnumerator extends DisposableBase implements IEnumerator<TuObject>, IEnumerable<TuObject>{
    private myArray: List<TuLayer>;
    private myForward: boolean;
    private myIndex: number;
    private myEnumeratorValid: boolean;
    private myEnumerator: TuLayerEnumerator;
    constructor(a: List<TuLayer>, forward: boolean) {
        super();
        this.myArray = a;
        this.myForward = forward;
        this.myIndex = -1;
        this.myEnumerator = TuLayerEnumerator.Empty;
        this.myEnumeratorValid = false;
        this.Reset();
    }

    public get Current(): TuObject {

        if (!this.myEnumeratorValid) {
            throw new InvalidOperationException("TuLayerCollectionObjectEnumerator is not at a valid position for the List of Layers");
        }
        return this.myEnumerator.Current;

    }

    public GetEnumerator(): TuLayerCollectionObjectEnumerator {
        const goLayerCollectionObjectEnumerators = this;
        goLayerCollectionObjectEnumerators.Reset();
        return goLayerCollectionObjectEnumerators;
    }

    public MoveNext(): boolean {
        if (this.myEnumeratorValid) {
            if (this.myEnumerator.MoveNext()) {
                return true;
            }
            this.myEnumeratorValid = false;
        }
        if (!this.myForward) {
            while ((this.myIndex - 1) >= 0) {
                this.myIndex = this.myIndex - 1;
                this.myEnumerator = this.myArray[this.myIndex].Backwards;
                this.myEnumeratorValid = true;
                if (!this.myEnumerator.MoveNext()) {
                    continue;
                }
                return true;
            }
            return false;
        }
        while ((this.myIndex + 1) < this.myArray.Count) {
            this.myIndex = (this.myIndex + 1);
            const ıtem: TuLayer = as(this.myArray[this.myIndex], Types.TuLayer);
            this.myEnumerator = ıtem.GetEnumerator();
            this.myEnumeratorValid = true;
            if (!this.myEnumerator.MoveNext()) {
                continue;
            }
            return true;
        }
        return false;
    }

    /// <summary>
    /// Reset the enumerator to its original position.
    /// </summary>
    public Reset() {
        if (!this.myForward) {
            this.myIndex = this.myArray.Count;
        }
        else {
            this.myIndex = -1;
        }
        this.myEnumeratorValid = false;
    }

    public TryMoveNext(out: (value: any) => void): boolean {
        throw error('tryMoveNext not implemented in LayerCollectionObjectEnumerator');
    }

    public End() {
        throw error('end not implemented in LayerCollectionObjectEnumerator');
    }

    public NextValue(value?: any): any | undefined {
        throw error('nextValue not implemented in LayerCollectionObjectEnumerator');
    }

    public isEndless: boolean = false;

    public Next(value?: any): IIteratorResult<any> {
        throw error('next not implemented in LayerCollectionObjectEnumerator');
    }
    'return'?(value?: any): IIteratorResult<any> {
        throw error('return not implemented in LayerCollectionObjectEnumerator');
    }
    'throw'?(e?: any): IIteratorResult<any> {
        throw error('throw not implemented in LayerCollectionObjectEnumerator');
    }

}
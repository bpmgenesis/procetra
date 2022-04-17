import { ClassInfo, System, DisposableBase, IEnumerator, IEnumerable, InvalidOperationException, List, error, IIteratorResult } from '@tuval/core';
import { Types } from '../types';
import { TuLayer } from './TuLayer';

@ClassInfo({
    fullName: Types.TuLayerCollectionEnumerator,
    instanceof: [
        Types.TuLayerCollectionEnumerator,
        System.Types.Disposable.DisposableBase,
        System.Types.Collections.Enumeration.IEnumerator,
        System.Types.Collections.Enumeration.IEnumerable

    ]
})
    export class TuLayerCollectionEnumerator extends DisposableBase implements IEnumerator<TuLayer>, IEnumerable<TuLayer> {
        private myArray: List<TuLayer>;
        private myForward: boolean;
        private myIndex: number;

        public get Current(): TuLayer {
            if (this.myIndex < 0 || this.myIndex >= this.myArray.Count) {
                throw new InvalidOperationException("TuLayerCollection.GoLayerCollectionEnumerator is not at a valid position for the List");
            }
            return this.myArray.Get(this.myIndex);
        }

        constructor(a: List<TuLayer>, forward: boolean) {
            super();
            this.myArray = a;
            this.myForward = forward;
            this.myIndex = -1;
            this.Reset();
        }
        public GetEnumerator(): TuLayerCollectionEnumerator {
            const goLayerCollectionEnumerators = this;
            goLayerCollectionEnumerators.Reset();
            return goLayerCollectionEnumerators;
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

        public Reset() {
            if (this.myForward) {
                this.myIndex = -1;
                return;
            }
            this.myIndex = this.myArray.Count;
        }

        public TryMoveNext(out: (value: any) => void): boolean {
            throw error('tryMoveNext not implemented in LayerCollectionEnumerator');
        }

        public End() {
            throw error('end not implemented in LayerCollectionEnumerator');
        }

        public NextValue(value?: any): any | undefined {
            throw error('nextValue not implemented in LayerCollectionEnumerator');
        }

        public isEndless: boolean = false;

        public Next(value?: any): IIteratorResult<any> {
            throw error('next not implemented in LayerCollectionEnumerator');
        }
        'return'?(value?: any): IIteratorResult<any> {
            throw error('return not implemented in LayerCollectionEnumerator');
        }
        'throw'?(e?: any): IIteratorResult<any> {
            throw error('throw not implemented in LayerCollectionEnumerator');
        }
    }
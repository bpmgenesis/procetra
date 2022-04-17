import { Types } from './../types';
import { ITuCollection } from "../ITuCollection";
import { ICollection, List, foreach, int, IComparer, IEnumerableOrArray, IEnumerator, IList, ClassInfo, System } from '@tuval/core';
import { TuCollectionEnumerator } from "./TuCollectionEnumerator";
import { TuObject } from "../TuObject/TuObject";
import { NullRect } from '../Globals';

export interface TuCollectionConfig {
    internalChecksForDuplicates?: boolean;
    entries?: TuObject[];
}

@ClassInfo({
    fullName:Types.TuCollection,
    instanceof: [
        Types.TuCollection,
        Types.ITuCollection,
        System.Types.Collections.ICollection,
        System.Types.Collections.Generics.IList
    ]
})
export class TuCollection implements ICollection<TuObject>, ITuCollection, IList<TuObject> {
    private myObjects: List<TuObject> = new List<TuObject>();
    private myInternalChecksForDuplicates: boolean = true;
    public /* internal */  myChanges: number = 0;

    public constructor(config?: TuCollectionConfig) {
        if (config != null) {
            this.myInternalChecksForDuplicates = config.internalChecksForDuplicates;
            if (Array.isArray(config.entries)) {
                this.importEntries(config.entries);
            }
        }
    }
    Get(index: number): TuObject {
        return this.myObjects.Get(index);
    }
    Set(index: number, value: TuObject): void {
        this.myObjects.Set(index, value);
    }
    IndexOf(item: TuObject): number {
        return this.myObjects.IndexOf(item);
    }
    Insert(index: number, item: TuObject): void {
        this.myObjects.Insert(index, item);
    }
    RemoveAt(index: number): void {
        this.myObjects.RemoveAt(index);
    }
    IsEndless?: boolean;
    public importEntries(entries: IEnumerableOrArray<TuObject> | IEnumerator<TuObject>): number {
        foreach(entries as any,(item: TuObject)=>{
            this.Add(item);
        });
        return 0;
    }


    /// <summary>
    /// Gets an enumerable whose enumerator will iterate over the GoObjects in reverse order.
    /// </summary>
    public /* virtual */  get Backwards(): TuCollectionEnumerator {
        return this.GetBackwards();
    }
    protected GetBackwards(): TuCollectionEnumerator {
        const goCollectionEnumerators: TuCollectionEnumerator = new TuCollectionEnumerator(this.myObjects, false);

        (<any>goCollectionEnumerators).myOriginalCollection = this,
            (<any>goCollectionEnumerators).myOriginalChanges = this.myChanges
        return goCollectionEnumerators;
    }


    /// <summary>
    /// Gets the number of objects in this collection.
    /// </summary>
    public /* virtual */ get Count(): int {
        return this.myObjects.Count;
    }



    /// <summary>
    /// Gets the first object in this collection.
    /// </summary>
    /// <value>
    /// If this collection is empty, this value is null.
    /// </value>
    public get First(): TuObject {
        if (this.IsEmpty) {
            return null;
        }
        return this.myObjects.Get(0);
    }

    /* internal */  get InternalChecksForDuplicates(): boolean {

        return this.myInternalChecksForDuplicates;
    }
    /* internal */  set InternalChecksForDuplicates(value: boolean) {
        this.myInternalChecksForDuplicates = value;
    }

    /// <summary>
    /// This predicate is true when there are no objects in this collection.
    /// </summary>
    public get IsEmpty(): boolean {
        return this.myObjects.Count === 0;
    }

    /// <summary>
    /// True when this collection may not be modified.
    /// </summary>
    public get IsReadOnly(): boolean {
        return false;
    }

    /// <summary>
    /// Gets the last object in this collection.
    /// </summary>
    /// <value>
    /// If this collection is empty, this value is null.
    /// </value>
    public get Last(): TuObject {
        if (this.IsEmpty) {
            return null;
        }
        return this.myObjects.Get(this.Count - 1);
    }




    /// <summary>
    /// Add an object to this collection.
    /// </summary>
    /// <param name="obj"></param>
    /// <remarks>
    /// Duplicates are not allowed.
    /// </remarks>
    public /* virtual */ Add(obj: TuObject): this {
        if (obj == null) {
            return;
        }
        if (!this.InternalChecksForDuplicates || !this.Contains(obj)) {
            this.myObjects.Add(obj);
            this.myChanges = (this.myChanges + 1);
        }
        return this;
    }

    /// <summary>
    /// Iterate over the <see cref="T:Northwoods.Go.GoObject" />s in the given collection <paramref name="coll" />
    /// and <see cref="M:Northwoods.Go.GoCollection.Add(Northwoods.Go.GoObject)" /> each one to this collection.
    /// </summary>
    /// <param name="coll"></param>
    public /* virtual */ AddRange(coll: ITuCollection): this {
        if (coll == null) {
            return;
        }
        foreach(coll, (goObject: TuObject) => {
            this.Add(goObject);
        });

    }

    /// <summary>
    /// Remove all of the objects in this collection.
    /// </summary>
    public /* virtual */ Clear(): number {
        for (let i = this.Count; i > 0; i = Math.min(i, this.Count)) {
            const goObjects: List<TuObject> = this.myObjects;
            const int32: number = i - 1;
            i = int32;
            this.Remove(goObjects[int32]);
        }
        return 0;
    }

    /// <summary>
    /// Determine if the given object is present in this collection.
    /// </summary>
    /// <param name="obj"></param>
    /// <returns></returns>
    public /* virtual */ Contains(obj: TuObject): boolean {
        if (obj == null) {
            return false;
        }
        return this.myObjects.Contains(obj);
    }

    /// <summary>
    /// Returns a newly allocated array of all of the GoObjects in the collection.
    /// </summary>
    public /* virtual */  CopyArray(): TuObject[] {
        return this.myObjects.ToArray();
    }

    /// <summary>
    /// Copy references to all of the objects in this collection into an array.
    /// </summary>
    /// <param name="array"></param>
    /// <param name="index"></param>
    public /* virtual */  CopyTo(array: TuObject[], index: int): void {
        this.myObjects.CopyTo(array, index);
    }

/* internal */ static FastRemove<T>(a: List<T>, o: T): number {
        let int32: int = -1;
        const count: int = a.Count;
        if (count > 1000) {
            int32 = a.IndexOf(o, count - 50);
        }
        if (int32 < 0) {
            int32 = a.IndexOf(o);
        }
        if (int32 >= 0) {
            a.RemoveAt(int32);
        }
        return int32;
    }

    /// <summary>
    /// Gets an enumerator for iterating over the GoObjects in this collection.
    /// </summary>
    public /* virtual */  GetEnumerator(): TuCollectionEnumerator {
        const goCollectionEnumerators: TuCollectionEnumerator = new TuCollectionEnumerator(this.myObjects, true);
        (<any>goCollectionEnumerators).myOriginalCollection = this;
        (<any>goCollectionEnumerators).myOriginalChanges = this.myChanges;
        return goCollectionEnumerators;
    }


    public /* virtual */ Remove(obj: TuObject): boolean {
        if (obj == null) {
            return false;
        }
        if (TuCollection.FastRemove<TuObject>(this.myObjects, obj) < 0) {
            return false;
        }
        this.myChanges = this.myChanges + 1;
        return true;
    }

/* internal */ Sort(comp: IComparer<TuObject>): void {
        if (this.Count > 1) {
            this.myObjects.Sort(comp);
            this.myChanges = (this.myChanges + 1);
        }
    }
}

 TuObject.prototype.AddObserver = function (obj: TuObject) {
    if (obj == null) {
        return;
    }
    if (this.myObservers == null) {
        this.myObservers = new TuCollection();
    }
    if (!this.myObservers.Contains(obj)) {
        this.myObservers.add(obj);
        this.Changed(1014, 0, null, NullRect, 0, obj, NullRect);
    }
}

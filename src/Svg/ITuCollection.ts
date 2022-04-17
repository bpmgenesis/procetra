import { IEnumerable, int, ICollection } from '@tuval/core';
import { TuObject } from './TuObject/TuObject';

/* export interface ITuCollection {
    get Backwards(): IEnumerable<TuObject>;
    get Count(): int;
    get IsEmpty(): boolean;
    get IsReadOnly(): boolean;
    Add(item: TuObject): void;
    ToArray():TuObject[];
} */

export interface ITuCollection extends ICollection<TuObject>, IEnumerable<TuObject> {
    /// <summary>
    /// Gets an enumerable whose enumerator will iterate over the <see cref="T:Northwoods.Go.GoObject" />s in reverse order.
    /// </summary>
    /// <remarks>
    /// The regular enumerator iterates over the <see cref="T:Northwoods.Go.GoObject" />s in this collection in forward order.
    /// </remarks>
    get Backwards(): IEnumerable<TuObject>;

    /// <summary>
    /// This predicate is true when there are no objects in this collection.
    /// </summary>
    get IsEmpty(): boolean;

    /// <summary>
    /// Returns a newly allocated array of all of the GoObjects in the collection.
    /// </summary>
    CopyArray(): TuObject[];
}

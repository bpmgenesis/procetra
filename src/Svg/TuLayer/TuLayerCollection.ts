import { NullRect } from './../Globals';
import { IComparer, as, ClassInfo, System, ICollection, IEnumerable, List, ArgumentException, InvalidOperationException, foreach, is, CONTINUE, BREAK, TArray, IEnumerableOrArray, IEnumerator } from '@tuval/core';
import { TuGroup } from '../TuGroup/TuGroup';
import { TuGroupEnumerator } from '../TuGroup/TuGroupEnumerator';
import { Types } from '../types';
import { ITuLayerCollectionContainer } from './ITuLayerCollectionContainer';
import { TuLayer } from './TuLayer';
import { TuLayerCollectionEnumerator } from './TuLayerCollectionEnumerator';
import { TuLayerCollectionObjectEnumerator } from './TuLayerCollectionObjectEnumerator';
import { TuCollection } from '../TuCollection/TuCollection';
import { TuDocument } from '../TuDocument/TuDocument';
import { TuObject } from '../TuObject/TuObject';
import { TuView } from '../TuView/TuView';

export class TuLayerCollectionEvents {
    public static readonly InsertedLayer = 801;
    public static readonly RemovedLayer = 802;
    public static readonly MovedLayer = 803;
    public static readonly ChangedDefault = 804;

    public static readonly 801 = 'InsertedLayer';
    public static readonly 802 = 'RemovedLayer';
    public static readonly 803 = 'MovedLayer';
    public static readonly 804 = 'ChangedDefault';
}

class ZOrderComparer implements IComparer<TuObject> {
    private myLayers: TuLayerCollection;

    public constructor(layers: TuLayerCollection) {
        this.myLayers = layers;
    }

    private aFirst(obj: TuObject, a: TuObject, b: TuObject): number {
        let int32: number;
        if (obj === a) {
            return -1;
        }
        if (obj === b) {
            return 1;
        }
        const goGroups: TuGroup = as(obj, Types.TuGroup);
        if (goGroups != null) {
            const enumerator: TuGroupEnumerator = goGroups.GetEnumerator().GetEnumerator();
            try {
                while (enumerator.MoveNext()) {
                    const int321: number = this.aFirst(enumerator.Current, a, b);
                    if (int321 === 0) {
                        continue;
                    }
                    int32 = int321;
                    return int32;
                }
                return 0;
            }
            finally {
                enumerator.Dispose();
            }
            return int32;
        }
        return 0;
    }

    public Compare(a: TuObject, b: TuObject): number {
        if (a === null || b === null || a === b) {
            return 0;
        }
        if (a.Layer !== b.Layer) {
            const int32: number = this.myLayers.IndexOf(a.Layer);
            const int321: number = this.myLayers.IndexOf(b.Layer);
            if (int32 < int321) {
                return -1;
            }
            if (int32 > int321) {
                return 1;
            }
        }
        if (a.Layer == null) {
            return 0;
        }
        const layer: TuLayer = a.Layer;
        const int322: number = layer.IndexOf(a.TopLevelObject);
        const int323: number = layer.IndexOf(b.TopLevelObject);
        if (int322 < int323) {
            return -1;
        }
        if (int322 > int323) {
            return 1;
        }
        return this.aFirst(a.TopLevelObject, a, b);
    }
}

@ClassInfo({
    fullName:Types.TuLayerCollection,
    instanceof: [
        Types.TuLayerCollection,
        System.Types.Collections.ICollection,
        System.Types.Collections.Enumeration.IEnumerable
    ]
})
export class TuLayerCollection implements ICollection<TuLayer>, IEnumerable<TuLayer> {
    private myLayerCollectionContainer: ITuLayerCollectionContainer;
    private myIsInDocument: boolean;
    private myLayers: List<TuLayer> = new List<TuLayer>();
    private myDefaultLayer: TuLayer;
    private myComparer: ZOrderComparer;

    //#region [Property] Backwards

    public get Backwards(): TuLayerCollectionEnumerator {
        return this.GetBackwards();
    }


    /**
    * @hidden
    */
    protected /*virtual*/  GetBackwards(): TuLayerCollectionEnumerator {
        return new TuLayerCollectionEnumerator(this.myLayers, false);
    }

    //#endregion

    //#region [Property] Bottom

    public get Bottom(): TuLayer {
        return this.GetBottom();
    }

    /**
    * @hidden
    */
    protected /*virtual*/  GetBottom(): TuLayer {
        return this.myLayers.Get(0);
    }

    //#endregion

    //#region [Property] Count

    public get Count(): number {
        return this.GetCount();
    }

    /**
    * @hidden
    */
    protected /*virtual*/  GetCount(): number {
        return this.myLayers.Count;
    }

    //#endregion

    //#region [Property] Default

    public get Default(): TuLayer {
        return this.GetDefault();
    }

    public set Default(value: TuLayer) {
        this.SetDefault(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  GetDefault(): TuLayer {
        return this.myDefaultLayer;
    }

    /**
    * @hidden
    */
    protected /*virtual*/  SetDefault(value: TuLayer) {
        const goLayers: TuLayer = this.myDefaultLayer;
        if (goLayers !== value) {
            if (value == null || value.LayerCollectionContainer !== this.LayerCollectionContainer) {
                throw new ArgumentException("The new TuLayerCollection.Default layer must belong to the same document or view.");
            }
            this.myDefaultLayer = value;
            this.LayerCollectionContainer.RaiseChanged(TuLayerCollectionEvents.ChangedDefault, 0, null, 0, goLayers, NullRect, 0, value, NullRect);
        }
    }

    //#endregion

    //#region [Property] Document

    public get Document(): TuDocument {
        return this.GetDocument();
    }

    /**
    * @hidden
    */
    protected /*virtual*/  GetDocument(): TuDocument {
        return as(this.myLayerCollectionContainer, Types.TuDocument);
    }

    //#endregion

    //#region [Property] IsInDocument

    public /* internal */ get IsInDocument(): boolean {
        return this.myIsInDocument;
    }

    //#endregion

    //#region [Property] IsReadOnly

    public get IsReadOnly(): boolean {
        return false;
    }

    //#endregion

    //#region [Property] LayerCollectionContainer

    public get LayerCollectionContainer(): ITuLayerCollectionContainer {
        return this.myLayerCollectionContainer;
    }

    //#endregion

    //#region [Property] Top
    public get Top(): TuLayer {
        return this.myLayers.Get(this.Count - 1);
    }
    //#endregion

    //#region [Property] View
    public get View(): TuView {
        return as(this.myLayerCollectionContainer, Types.TuView);
    }
    //#endregion

    public Add(layer: TuLayer): this {
        throw new InvalidOperationException("TuLayerCollection.Add");
    }

    public Clear(): number {
        throw new InvalidOperationException("TuLayerCollection.Clear");
    }
    public Contains(layer: TuLayer): boolean {
        return this.IndexOf(layer) >= 0;
    }

    public CopyArray(): TuLayer[] {
        return this.myLayers.ToArray();
    }

    public CopyTo(array: TuLayer[], index?: number): TuLayer[] {
        return this.myLayers.CopyTo(array, index);
    }

    public createNewLayerAfter(dest: TuLayer): TuLayer {
        if (dest != null && this.IndexOf(dest) < 0) {
            throw new ArgumentException("Cannot create a new layer after a layer that is not in this layer collection.");
        }
        const goLayers: TuLayer = new TuLayer();
        goLayers.Init(this.LayerCollectionContainer);
        this.InsertAfter(dest, goLayers);
        goLayers.Identifier = this.findUniqueIdentifier();
        return goLayers;
    }

    public CreateNewLayerBefore(dest: TuLayer): TuLayer {
        if (dest != null && this.IndexOf(dest) < 0) {
            throw new ArgumentException("Cannot create a new layer before a layer that is not in this layer collection.");
        }
        const goLayers = new TuLayer();
        goLayers.Init(this.LayerCollectionContainer);
        this.InsertBefore(dest, goLayers);
        goLayers.Identifier = this.findUniqueIdentifier();
        return goLayers;
    }

    public Find(identifier: any): TuLayer {
        let goLayers: TuLayer;
        if (identifier == null) {
            return null;
        }
        const enumerator: TuLayerCollectionEnumerator = this.Backwards.GetEnumerator();
        try {
            while (enumerator.MoveNext()) {
                const current: TuLayer = enumerator.Current;
                const _identifier: any = current.Identifier;
                if (identifier == null || _identifier !== identifier /* !identifier.equals(identifier) */) {
                    continue;
                }
                goLayers = current;
                return goLayers;
            }
            return null;
        }
        finally {
            enumerator.Dispose();
        }
        return goLayers;
    }

    private findUniqueIdentifier(): any {
        let count: number = this.Count;
        while (this.Find(count) != null) {
            count++;
        }
        return count;
    }

    private getComparer(): ZOrderComparer {
        if (this.myComparer == null) {
            this.myComparer = new ZOrderComparer(this);
        }
        foreach(this, (goLayers: TuLayer) => {
            goLayers.InitializeIndices();
        });
        return this.myComparer;
    }
    public GetEnumerator(): TuLayerCollectionEnumerator {
        return new TuLayerCollectionEnumerator(this.myLayers, true);
    }
    public GetObjectEnumerator(forward: boolean): TuLayerCollectionObjectEnumerator {
        return new TuLayerCollectionObjectEnumerator(this.myLayers, forward);
    }

    public /* internal */  IndexOf(layer: TuLayer): number {
        if (this.IsInDocument) {
            return layer.LayerCollectionIndex;
        }
        if (layer.IsInView) {
            return layer.LayerCollectionIndex;
        }
        return this.myLayers.IndexOf(layer);
    }

    public /* internal */ InsertAfter(dest: TuLayer, newlayer: TuLayer): void {
        if (dest == null) {
            dest = this.Top;
        }
        const int32: number = this.IndexOf(dest);
        if (int32 >= 0) {
            this.myLayers.Insert(int32 + 1, newlayer);
            this.updateLayerIndices();
            this.LayerCollectionContainer.RaiseChanged(801, 1, newlayer, int32, dest, NullRect, int32 + 1, newlayer, NullRect);
        }
    }

    public /* internal */ InsertBefore(dest: TuLayer, newlayer: TuLayer): void {
        if (dest == null) {
            dest = this.Bottom;
        }
        const int32: number = this.IndexOf(dest);
        if (int32 >= 0) {
            this.myLayers.Insert(int32, newlayer);
            this.updateLayerIndices();
            this.LayerCollectionContainer.RaiseChanged(TuLayerCollectionEvents.InsertedLayer, 0, newlayer, int32, dest, NullRect, int32, newlayer, NullRect);
        }
    }
    public InsertDocumentLayerAfter(dest: TuLayer, doclayer: TuLayer): void {
        if (this.IndexOf(doclayer) >= 0) {
            this.MoveAfter(dest, doclayer);
            return;
        }
        if (dest != null && this.IndexOf(dest) < 0) {
            throw new ArgumentException("Cannot insert a document layer after a layer that is not in this layer collection.");
        }
        const view: TuView = this.View;
        if (view == null) {
            throw new ArgumentException("Cannot insert a layer into a document layer collection.");
        }
        if (doclayer == null || !doclayer.IsInDocument || view.Document !== doclayer.Document) {
            throw new ArgumentException("Layer to be inserted into a view layer collection must be a document layer in the view's document.");
        }
        this.InsertAfter(dest, doclayer);
    }

    public InsertDocumentLayerBefore(dest: TuLayer, doclayer: TuLayer): void {
        if (this.IndexOf(doclayer) >= 0) {
            this.MoveBefore(dest, doclayer);
            return;
        }
        if (dest != null && this.IndexOf(dest) < 0) {
            throw new ArgumentException("Cannot insert a document layer before a layer that is not in this layer collection.");
        }
        const view: TuView = this.View;
        if (view == null) {
            throw new ArgumentException("Cannot insert a layer into a document layer collection.");
        }
        if (doclayer == null || !doclayer.IsInDocument || view.Document != doclayer.Document) {
            throw new ArgumentException("Layer to be inserted into a view layer collection must be a document layer in the view's document.");
        }
        this.InsertBefore(dest, doclayer);
    }

    public /* internal */  init(lcc: ITuLayerCollectionContainer): void {
        this.myLayerCollectionContainer = lcc;
        this.myIsInDocument = is.typeof(this.myLayerCollectionContainer, Types.TuDocument);
        this.myDefaultLayer = new TuLayer();
        this.myDefaultLayer.Init(this.myLayerCollectionContainer);
        this.myLayers.Add(this.myDefaultLayer);
        this.updateLayerIndices();
        this.myDefaultLayer.Identifier = 0;
    }

    public /* internal */  LayerAt(i: number): TuLayer {
        return this.myLayers.Get(i);
    }

    public MoveAfter(dest: TuLayer, moving: TuLayer): void {
        if (moving == null) {
            return;
        }
        if (this.Count <= 1) {
            return;
        }
        let count: number = -1;
        if (dest != null) {
            count = this.IndexOf(dest);
            if (count < 0) {
                throw new ArgumentException("MoveAfter destination layer must be in the GoLayerCollection");
            }
        }
        else {
            dest = this.Top;
            count = this.Count - 1;
            if (dest == moving) {
                return;
            }
        }
        const int32: number = this.IndexOf(moving);
        if (int32 < 0) {
            throw new ArgumentException("MoveAfter layer to be moved must be in the GoLayerCollection");
        }
        if ((count + 1) !== int32 && count !== int32) {
            if (count > int32) {
                count--;
            }
            this.MoveInCollection((count + 1), moving, int32, false);
        }
    }

    public MoveBefore(dest: TuLayer, moving: TuLayer): void {
        if (moving == null) {
            return;
        }
        if (this.Count <= 1) {
            return;
        }
        let int32: number = -1;
        if (dest != null) {
            int32 = this.IndexOf(dest);
            if (int32 < 0) {
                throw new ArgumentException("MoveBefore destination layer must be in the TuLayerCollection");
            }
        }
        else {
            dest = this.Bottom;
            int32 = 0;
            if (dest == moving) {
                return;
            }
        }
        const int321 = this.IndexOf(moving);
        if (int321 < 0) {
            throw new ArgumentException("MoveBefore layer to be moved must be in the GoLayerCollection");
        }
        if ((int32 - 1) !== int321 && int32 !== int321) {
            if (int32 > int321) {
                int32--;
            }
            this.MoveInCollection(int32, moving, int321, false);
        }
    }

    public /* internal */ MoveInCollection(newidx: number, moving: TuLayer, oldidx: number, undoing: boolean): void {
        if (oldidx >= 0 && oldidx < this.myLayers.Count && newidx >= 0 && newidx < this.myLayers.Count) {
            this.myLayers.RemoveAt(oldidx);
            this.myLayers.Insert(newidx, moving);
            this.updateLayerIndices();
        }
        this.LayerCollectionContainer.RaiseChanged(TuLayerCollectionEvents.MovedLayer, 0, this, oldidx, moving,NullRect, newidx, moving, NullRect);
    }

    public NextLayer(layer: TuLayer, relativeZorder: number): TuLayer {
        if (layer == null) {
            return null;
        }
        let int32: number = this.IndexOf(layer);
        if (int32 < 0) {
            return null;
        }
        int32 = (int32 + relativeZorder);
        if (int32 < 0 || int32 >= this.Count) {
            return null;
        }
        return this.myLayers.Get(int32);
    }

    public Remove(layer: TuLayer): boolean {
        let item: TuLayer;
        if (layer == null) {
            return false;
        }
        const int32: number = this.IndexOf(layer);
        if (int32 < 0) {
            return false;
        }
        const layerCollectionContainer: boolean = layer.LayerCollectionContainer === this.LayerCollectionContainer;
        if (layerCollectionContainer) {
            layer.Clear();
        }
        let goLayers: TuLayer = null;
        foreach(this.myLayers, (myLayer: TuLayer) => {
            if (myLayer === layer || myLayer.LayerCollectionContainer !== this.LayerCollectionContainer) {
                return CONTINUE;
            }
            goLayers = myLayer;
            if (goLayers == null) {
                return BREAK;
            }
            item = null;
            if ((int32 + 1) < this.myLayers.Count) {
                item = this.myLayers.Get(int32 + 1);
            }
            if (layerCollectionContainer) {
                layer.LayerCollectionIndex = -1;
            }
            this.myLayers.RemoveAt(int32);
            this.updateLayerIndices();
            try {
                this.LayerCollectionContainer.RaiseChanged(TuLayerCollectionEvents.RemovedLayer, 0, layer, 0, item,NullRect, 0, null, NullRect);
            }
            finally {
                if (layer === this.Default) {
                    this.Default = goLayers;
                }
            }
            return BREAK;
        });

        if (goLayers == null) {
            return false;
        }
        item = null;
        if ((int32 + 1) < this.myLayers.Count) {
            item = this.myLayers.Get(int32 + 1);
        }
        if (layerCollectionContainer) {
            layer.LayerCollectionIndex = -1;
        }
        this.myLayers.RemoveAt(int32);
        this.updateLayerIndices();
        try {
            this.LayerCollectionContainer.RaiseChanged(TuLayerCollectionEvents.RemovedLayer, 0, layer, 0, item, NullRect, 0, null, NullRect);
        }
        finally {
            if (layer === this.Default) {
                this.Default = goLayers;
            }
        }
        return true;
    }

    public SortByZOrder(c: TuCollection): void;
    public SortByZOrder(a: TuObject[]): void;
    public SortByZOrder(...args: any[]): void {

        if (args[0] instanceof TuCollection) {
            const c: TuCollection = args[0];
            if (c.IsEmpty) {
                return;
            }
            c.Sort(this.getComparer());
        } else {
            const a: TuObject[] = args[0];
            if (a.length <= 1) {
                return;
            }
            const comparer: ZOrderComparer = this.getComparer();
            TArray.Sort<TuObject>(a, 0, a.length, comparer);
        }

    }
    private updateLayerIndices(): void {
        for (let i = 0; i < this.myLayers.Count; i++) {
            const item: TuLayer = this.myLayers.Get(i);
            if (this.IsInDocument) {
                item.LayerCollectionIndex = i;
            }
            else if (item.IsInView) {
                item.LayerCollectionIndex = i;
            }
        }
    }

    public importEntries(entries:IEnumerableOrArray<TuLayer>|IEnumerator<TuLayer>):number{
        return 0;
    }
    public toArray(): TuLayer[] {
        return undefined;
    }
    public removeAt(index: number): void {

    }

}
import { ClassInfo, System, IComparer, List, ArgumentException, error, foreach, CONTINUE, is, IEnumerator, as, IEnumerableOrArray } from '@tuval/core';
import { ITuCollection } from '../ITuCollection';
import { Types } from '../types';
import { ITuLayerCollectionContainer } from './ITuLayerCollectionContainer';
import { CGPoint, CGRectangle } from '@tuval/cg';
import { TuLayerEvents } from './TuLayerEvents';
import { TuLayerEnumerator } from './TuLayerEnumerator';
import { TuLayerCache } from './TuLayerCache';
import { TuCollection } from '../TuCollection/TuCollection';
import { GeomUtilities } from '../GeomUtilities';
import { TuGroup } from '../TuGroup/TuGroup';
import { TuChangedEventArgs } from '../TuChangedEventArgs';
import { ITuDragSnapper } from '../ITuDragSnapper';
import { ZComparer } from './ZComparer';
import { TComponent, Teact, State } from '@tuval/forms';
import { TuDocument } from '../TuDocument/TuDocument';
import { TuView } from '../TuView/TuView';
import { TuObject } from '../TuObject/TuObject';
import { NullRect } from '../Globals';
import { Graphics } from '@tuval/graphics';
import { TuStroke } from '../TuStroke/TuStroke';
import { TuViewSvgRenderrer } from '../TuView/TuViewSvgRenderrer';
import { TuXmlTransformer } from '../Xml/TuXmlTransformer';


export enum TuPickInRectangleStyle {
    AnyContained = 1,
    AnyIntersectsBounds = 2,
    SelectableOnlyContained = 257,
    SelectableOnlyIntersectsBounds = 258
}

@ClassInfo({
    fullName: Types.TuLayer,
    instanceof: [
        Types.TuLayer,
        Types.ITuCollection,
        Types.ICollection,
        System.Types.Collections.Enumeration.IEnumerable
    ]
})
export class TuLayer extends TComponent implements ITuCollection {
    private static myZComparer: IComparer<ITuDragSnapper>;

    @State()
    private myLayerCollectionContainer: ITuLayerCollectionContainer;

    @State()
    private myIsInDocument: boolean;

    @State()
    private myDocument: TuDocument;

    @State()
    private myView: TuView;

    @State()
    private myObjects: List<TuObject>;

    @State()
    private myAllowView: boolean;

    @State()
    private myAllowPrint: boolean;

    @State()
    private myAllowSelect: boolean;

    @State()
    private myAllowMove: boolean;

    @State()
    private myAllowCopy: boolean;

    @State()
    private myAllowResize: boolean;

    @State()
    private myAllowReshape: boolean;

    @State()
    private myAllowDelete: boolean;

    @State()
    private myAllowInsert: boolean;

    @State()
    private myAllowLink: boolean;

    @State()
    private myAllowEdit: boolean;

    @State()
    private myIdentifier: any;

    @State()
    private myCaches: List<TuLayerCache>;

    @State()
    private myCachedPick: boolean;

    @State()
    private myCachedPickSelectable: boolean;

    @State()
    private myCachedPickPoint: CGPoint;

    @State()
    private myCachedPickObject: TuObject;

    @State()
    private myValidIndices: boolean;

    @State()
    private myLayerCollectionIndex: number;

    protected SetupControlDefaults(): void {
        this.myIsInDocument = false;
        this.myObjects = new List<TuObject>();
        this.myAllowView = true;
        this.myAllowPrint = true;
        this.myAllowSelect = true;
        this.myAllowMove = true;
        this.myAllowCopy = true;
        this.myAllowResize = true;
        this.myAllowReshape = true;
        this.myAllowDelete = true;
        this.myAllowInsert = true;
        this.myAllowLink = true;
        this.myAllowEdit = true;
        this.myCachedPickPoint = CGPoint.Empty;
        this.myValidIndices = false;
        this.myLayerCollectionIndex = -1;
    }

    //#region [Property] AllowCopy

    public get AllowCopy(): boolean {
        return this.GetAllowCopy();
    }
    public set AllowCopy(value: boolean) {
        this.SetAllowCopy(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  GetAllowCopy(): boolean {
        return this.myAllowCopy;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ SetAllowCopy(value: boolean) {
        const flag: boolean = this.myAllowCopy;
        if (flag !== value) {
            this.myAllowCopy = value;
            this.LayerCollectionContainer.RaiseChanged(TuLayerEvents.ChangedAllowCopy, 0, this, 0, flag, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] AllowDelete
    public get AllowDelete(): boolean {
        return this.GetAllowDelete();
    }
    public set AllowDelete(value: boolean) {
        this.SetAllowDelete(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  GetAllowDelete(): boolean {
        return this.myAllowDelete;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ SetAllowDelete(value: boolean) {
        const flag: boolean = this.myAllowDelete;
        if (flag !== value) {
            this.myAllowDelete = value;
            this.LayerCollectionContainer.RaiseChanged(TuLayerEvents.ChangedAllowDelete, 0, this, 0, flag, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] AllowEdit
    public get AllowEdit(): boolean {
        return this.GetAllowEdit();
    }
    public set AllowEdit(value: boolean) {
        this.SetAllowEdit(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  GetAllowEdit(): boolean {
        return this.myAllowEdit;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ SetAllowEdit(value: boolean) {
        const flag: boolean = this.myAllowEdit;
        if (flag !== value) {
            this.myAllowEdit = value;
            this.LayerCollectionContainer.RaiseChanged(TuLayerEvents.ChangedAllowEdit, 0, this, 0, flag, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] AllowInsert
    public get AllowInsert(): boolean {
        return this.GetAllowInsert();
    }
    public set AllowInsert(value: boolean) {
        this.SetAllowInsert(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  GetAllowInsert(): boolean {
        return this.myAllowInsert;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ SetAllowInsert(value: boolean) {
        const flag: boolean = this.myAllowInsert;
        if (flag !== value) {
            this.myAllowInsert = value;
            this.LayerCollectionContainer.RaiseChanged(TuLayerEvents.ChangedAllowInsert, 0, this, 0, flag, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] AllowLink
    public get AllowLink(): boolean {
        return this.GetAllowLink();
    }
    public set AllowLink(value: boolean) {
        this.SetAllowLink(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  GetAllowLink(): boolean {
        return this.myAllowLink;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ SetAllowLink(value: boolean) {
        const flag: boolean = this.myAllowLink;
        if (flag !== value) {
            this.myAllowLink = value;
            this.LayerCollectionContainer.RaiseChanged(TuLayerEvents.ChangedAllowLink, 0, this, 0, flag, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] AllowMove
    public get AllowMove(): boolean {
        return this.GetAllowMove();
    }
    public set AllowMove(value: boolean) {
        this.SetAllowMove(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  GetAllowMove(): boolean {
        return this.myAllowMove;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ SetAllowMove(value: boolean) {
        const flag: boolean = this.myAllowMove;
        if (flag !== value) {
            this.myAllowMove = value;
            this.LayerCollectionContainer.RaiseChanged(TuLayerEvents.ChangedAllowMove, 0, this, 0, flag, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] AllowPrint
    public get AllowPrint(): boolean {
        return this.GetAllowPrint();
    }
    public set AllowPrint(value: boolean) {
        this.SetAllowPrint(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  GetAllowPrint(): boolean {
        return this.myAllowPrint;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ SetAllowPrint(value: boolean) {
        const flag: boolean = this.myAllowPrint;
        if (flag !== value) {
            this.myAllowPrint = value;
            this.LayerCollectionContainer.RaiseChanged(TuLayerEvents.ChangedAllowPrint, 0, this, 0, flag, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] AllowReshape
    public get AllowReshape(): boolean {
        return this.GetAllowReshape();
    }
    public set AllowReshape(value: boolean) {
        this.SetAllowReshape(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  GetAllowReshape(): boolean {
        return this.myAllowReshape;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ SetAllowReshape(value: boolean) {
        const flag: boolean = this.myAllowReshape;
        if (flag !== value) {
            this.myAllowReshape = value;
            this.LayerCollectionContainer.RaiseChanged(TuLayerEvents.ChangedAllowReshape, 0, this, 0, flag, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] AllowResize
    public get AllowResize(): boolean {
        return this.GetAllowResize();
    }
    public set AllowResize(value: boolean) {
        this.SetAllowResize(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  GetAllowResize(): boolean {
        return this.myAllowResize;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ SetAllowResize(value: boolean) {
        const flag: boolean = this.myAllowResize;
        if (flag !== value) {
            this.myAllowResize = value;
            this.LayerCollectionContainer.RaiseChanged(TuLayerEvents.ChangedAllowResize, 0, this, 0, flag, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] AllowSelect
    public get AllowSelect(): boolean {
        return this.GetAllowSelect();
    }
    public set AllowSelect(value: boolean) {
        this.SetAllowSelect(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  GetAllowSelect(): boolean {
        return this.myAllowSelect;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ SetAllowSelect(value: boolean) {
        const flag: boolean = this.myAllowSelect;
        if (flag !== value) {
            this.myAllowSelect = value;
            this.LayerCollectionContainer.RaiseChanged(TuLayerEvents.ChangedAllowSelect, 0, this, 0, flag, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] AllowView
    public get AllowView(): boolean {
        return this.GetAllowView();
    }
    public set AllowView(value: boolean) {
        this.SetAllowView(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  GetAllowView(): boolean {
        return this.myAllowView;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ SetAllowView(value: boolean) {
        const flag: boolean = this.myAllowView;
        if (flag != value) {
            this.myAllowView = value;
            this.LayerCollectionContainer.RaiseChanged(TuLayerEvents.ChangedAllowView, 0, this, 0, flag, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] Backwards
    public get Backwards(): TuLayerEnumerator {
        return this.GetBackwards();
    }

    /**
    * @hidden
    */
    protected /*virtual*/  GetBackwards(): TuLayerEnumerator {
        return new TuLayerEnumerator(this.myObjects, false);
    }
    //#endregion

    //#region [Property] Caches
    public /*internal*/ get Caches(): List<TuLayerCache> {
        if (this.myCaches == null) {
            this.myCaches = new List<TuLayerCache>();
        }
        return this.myCaches;
    }
    //#endregion

    //#region [Property] Count
    public /*internal*/ get Count(): number {
        return this.myObjects.Count;
    }
    //#endregion

    //#region [Property] Document
    public /*internal*/ get Document(): TuDocument {
        return this.myDocument;
    }
    //#endregion

    //#region [Property] Identifier
    public get Identifier(): any {
        return this.myIdentifier;
    }
    public set Identifier(value: any) {
        const obj: any = this.myIdentifier;
        if (obj != value) {
            this.myIdentifier = value;
            this.LayerCollectionContainer.RaiseChanged(TuLayerEvents.ChangedIdentifier, 0, this, 0, obj, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] IsEmpty
    public /*internal*/ get IsEmpty(): boolean {
        return this.myObjects.Count === 0;
    }
    //#endregion

    //#region [Property] IsInDocument
    public /*internal*/ get IsInDocument(): boolean {
        return this.myIsInDocument;
    }
    //#endregion

    //#region [Property] IsInView
    public /*internal*/ get IsInView(): boolean {
        return !this.myIsInDocument;
    }
    //#endregion

    //#region [Property] IsReadOnly
    public /*internal*/ get IsReadOnly(): boolean {
        return false;
    }
    //#endregion

    //#region [Property] LayerCollectionContainer
    public /*internal*/ get LayerCollectionContainer(): ITuLayerCollectionContainer {
        return this.myLayerCollectionContainer;
    }
    //#endregion

    //#region [Property] LayerCollectionIndex
    public get LayerCollectionIndex(): number {
        return this.myLayerCollectionIndex;
    }
    public set LayerCollectionIndex(value: number) {
        this.myLayerCollectionIndex = value;
    }
    //#endregion

    //#region [Property] View
    public /*internal*/ get View(): TuView {
        return this.myView;
    }
    //#endregion

    public Add(obj: TuObject): this {
        if (obj == null) {
            return;
        }
        if (obj.Layer == null) {
            if (obj.Parent != null) {
                obj.Parent.Remove(obj);
            }
            this.AddToLayer(obj, false);
        }
        else {
            if (obj.Layer.LayerCollectionContainer !== this.LayerCollectionContainer) {
                throw new ArgumentException("Cannot add an object to a layer when it is already part of a different document's or view's layer.");
            }
            if (obj.Parent != null) {
                throw new ArgumentException("Cannot add an object to a layer when it is part of a group.");
            }
            const layer: TuLayer = obj.Layer;
            if (layer != this) {
                this.ChangeLayer(obj, layer, false);
                return;
            }
        }
    }

    private static SetAllNoClear(obj: TuObject, b: boolean): void {
        throw error('setAllNoClear static method must implemented by TuGroup.');
    }
    private static ReparentAllLinksToSubGraphs(coll: ITuCollection, behind: boolean, layer: TuLayer): void {
        throw error('ReparentAllLinksToSubGraphs static method must implemented by TuSubGraphBase.');
    }


    public AddCollection(coll: ITuCollection, reparentLinks: boolean): ITuCollection {
        const goCollections: TuCollection = new TuCollection(
            {
                internalChecksForDuplicates: false
            });
        goCollections.AddRange(coll);
        foreach(goCollections, (goCollection: TuObject) => {
            if (goCollection.Layer == this && goCollection.IsTopLevel || goCollection.Layer == null) {
                return CONTINUE;
            }
            TuLayer.SetAllNoClear(goCollection, true);
        });

        foreach(goCollections, (goObject: TuObject) => {
            if (goObject.Layer === this && goObject.IsTopLevel) {
                return CONTINUE;
            }
            goObject.Remove();
            this.Add(goObject);
        });

        foreach(goCollections, (goCollection1: TuObject) => {
            TuLayer.SetAllNoClear(goCollection1, false);
        });

        if (reparentLinks && this.IsInDocument) {
            TuLayer.ReparentAllLinksToSubGraphs(goCollections, true, this.Document.LinksLayer);
        }
        return goCollections;
    }

    public /* internal */ AddToLayer(obj: TuObject, undoing: boolean): void {
        obj.LayerIndex = this.myObjects.Count;
        this.myObjects.Add(obj);
        obj.setLayer(this, obj, undoing);
        this.InsertIntoCaches(obj);
        const bounds: CGRectangle = obj.Bounds;
        this.LayerCollectionContainer.RaiseChanged(TuLayerEvents.InsertedObject, 0, obj, 0, null, NullRect, 0, this, bounds);
    }

    private cacheWanted(view: TuView): boolean {
        if (!this.IsInDocument || !TuDocument.myCaching) {
            return false;
        }
        return !view.IsPrinting;
    }

    public CanCopyObjects(): boolean {
        if (!this.AllowCopy) {
            return false;
        }
        if (!this.IsInDocument) {
            return true;
        }
        return this.LayerCollectionContainer.CanCopyObjects();
    }

    public CanDeleteObjects(): boolean {
        if (!this.AllowDelete) {
            return false;
        }
        if (!this.IsInDocument) {
            return true;
        }
        return this.LayerCollectionContainer.CanDeleteObjects();
    }

    public CanEditObjects(): boolean {
        if (!this.AllowEdit) {
            return false;
        }
        if (!this.IsInDocument) {
            return true;
        }
        return this.LayerCollectionContainer.CanEditObjects();
    }

    public CanInsertObjects(): boolean {
        if (!this.AllowInsert) {
            return false;
        }
        if (!this.IsInDocument) {
            return true;
        }
        return this.LayerCollectionContainer.CanInsertObjects();
    }

    public CanLinkObjects(): boolean {
        if (!this.AllowLink) {
            return false;
        }
        if (!this.IsInDocument) {
            return true;
        }
        return this.LayerCollectionContainer.CanLinkObjects();
    }

    public CanMoveObjects(): boolean {
        if (!this.AllowMove) {
            return false;
        }
        if (!this.IsInDocument) {
            return true;
        }
        return this.LayerCollectionContainer.CanMoveObjects();
    }

    public CanPrintObjects(): boolean {
        return this.AllowPrint;
    }

    public CanReshapeObjects(): boolean {
        if (!this.AllowReshape) {
            return false;
        }
        if (!this.IsInDocument) {
            return true;
        }
        return this.LayerCollectionContainer.CanReshapeObjects();
    }

    public CanResizeObjects(): boolean {
        if (!this.AllowResize) {
            return false;
        }
        if (!this.IsInDocument) {
            return true;
        }
        return this.LayerCollectionContainer.CanResizeObjects();
    }

    public CanSelectObjects(): boolean {
        if (!this.AllowSelect) {
            return false;
        }
        if (!this.IsInDocument) {
            return true;
        }
        return this.LayerCollectionContainer.CanSelectObjects();
    }

    public CanViewObjects(): boolean {
        return this.AllowView;
    }

    public /* internal */  ChangeLayer(obj: TuObject, oldLayer: TuLayer, undoing: boolean): void {
        oldLayer.removeFromCaches(obj);
        const int32: number = TuCollection.FastRemove<TuObject>(oldLayer.myObjects, obj);
        if (int32 < oldLayer.myObjects.Count) {
            oldLayer.resetIndices();
        }
        obj.LayerIndex = this.myObjects.Count;
        this.myObjects.Add(obj);
        obj.setLayer(this, obj, undoing);
        this.InsertIntoCaches(obj);
        const bounds: CGRectangle = obj.Bounds;
        this.LayerCollectionContainer.RaiseChanged(TuLayerEvents.ChangedObjectLayer, 0, obj, int32, oldLayer, bounds, -1, this, bounds);
    }

    public Clear(): boolean {
        for (let i = this.myObjects.Count; i > 0; i = Math.min(i, this.myObjects.Count)) {
            const goObjects: List<TuObject> = this.myObjects;
            const int32: number = (i - 1);
            i = int32;
            return this.Remove(goObjects[int32]);
        }
    }

    public Contains(obj: TuObject): boolean {
        if (obj == null) {
            return false;
        }
        return obj.Layer === this;
    }

    public CopyArray(): TuObject[] {
        return this.myObjects.ToArray();
    }

    /// <summary>
    /// Copy references to all of the objects in this collection into an array.
    /// </summary>
    /// <param name="array"></param>
    /// <param name="index"></param>
    public CopyTo(array: TuObject[], index: number): TuObject[] {
        return this.myObjects.CopyTo(array, index);
    }

    public FindCache(view: TuView): TuLayerCache;
    public FindCache(r: CGRectangle): TuLayerCache;
    public FindCache(r: CGPoint): TuLayerCache;
    public FindCache(...args: any[]): TuLayerCache {
        if (is.typeof<TuView>(args[0], Types.TuView)) {
            const view: TuView = args[0];
            let goLayerCache: TuLayerCache;
            const enumerator: IEnumerator<TuLayerCache> = this.Caches.GetEnumerator();
            try {
                while (enumerator.MoveNext()) {
                    const current: TuLayerCache = enumerator.Current;
                    if (current.View !== view) {
                        continue;
                    }
                    goLayerCache = current;
                    return goLayerCache;
                }
                return undefined;
            }
            finally {
                enumerator.Dispose();
            }
            return goLayerCache;
        } else if (args[0] instanceof CGRectangle) {
            const r: CGRectangle = args[0];
            let goLayerCache: TuLayerCache = undefined;
            foreach(this.Caches, (cach: TuLayerCache) => {

                if (!GeomUtilities.ContainsRect(cach.Rect, r) || goLayerCache != null && cach.Objects.Count >= goLayerCache.Objects.Count) {
                    return CONTINUE;
                }
                goLayerCache = cach;
            });

            return goLayerCache;
        } else if (args[0] instanceof CGPoint) {
            const p: CGPoint = args[0];
            let goLayerCache: TuLayerCache = undefined;
            foreach(this.Caches, (cach: TuLayerCache) => {
                if (!GeomUtilities.ContainsRect(cach.Rect, p) || goLayerCache != null && cach.Objects.Count >= goLayerCache.Objects.Count) {
                    return CONTINUE;
                }
                goLayerCache = cach;
            });

            return goLayerCache;
        }
    }

    public GetEnumerator(): TuLayerEnumerator {
        return new TuLayerEnumerator(this.myObjects, true);
    }

    public /* internal */ IndexOf(obj: TuObject): number {
        if (obj.Layer !== this) {
            throw new ArgumentException("TuObject doesn't belong to TuLayer");
        }
        if (this.myValidIndices) {
            return obj.LayerIndex;
        }
        return this.myObjects.IndexOf(obj);
    }

    public /* internal */ InitializeIndices(): void {
        if (!this.myValidIndices) {
            this.myValidIndices = true;
            for (let i = 0; i < this.myObjects.Count; i++) {
                this.myObjects[i].LayerIndex = i;
            }
        }
    }

    private insertIntoCache1(cache: TuLayerCache, obj: TuObject): void {
        const goDragSnapper: ITuDragSnapper = as(obj, Types.ITuDragSnapper);
        if (goDragSnapper != null && !cache.Snappers.Contains(goDragSnapper)) {
            cache.Snappers.Add(goDragSnapper);
        }
        const goGroups: TuGroup = as(obj, Types.TuGroup);
        if (goGroups != null) {
            foreach(goGroups.GetEnumerator(), (enumerator: TuObject) => {
                this.insertIntoCache1(cache, enumerator);
            });

        }
    }

		/* internal */ InsertIntoCaches(obj: TuObject): void {
        this.resetPickCache();
        foreach(this.Caches, (cach: TuLayerCache) => {
            const rectangleF: CGRectangle = obj.ExpandPaintBounds(obj.Bounds.clone(), cach.View);
            if (!GeomUtilities.IntersectsRect(cach.Rect, rectangleF)) {
                return CONTINUE;
            }
            cach.Objects.Add(obj);
            this.insertIntoCache1(cach, obj);
            this.InitializeIndices();
            cach.Snappers.Sort(TuLayer.myZComparer);
        });

    }

		/* internal */ Init(lcc: ITuLayerCollectionContainer): void {
        this.myLayerCollectionContainer = lcc;
        this.myIsInDocument = is.typeof(lcc, Types.TuDocument);
        this.myDocument = as(lcc, Types.TuDocument);
        this.myView = as(lcc, Types.TuView);
    }

    public MoveAfter(dest: TuObject, moving: TuObject): void {
        if (moving == null) {
            return;
        }
        if (this.Count === 0) {
            return;
        }
        let count: number = -1;
        if (dest != null) {
            dest = dest.TopLevelObject;
            count = this.IndexOf(dest);
            if (count < 0) {
                throw new ArgumentException("MoveAfter destination object must be in the TuLayer");
            }
        }
        else {
            dest = this.myObjects[this.Count - 1];
            count = this.Count - 1;
            if (dest === moving) {
                return;
            }
        }
        if (moving.Parent != null) {
            throw new ArgumentException("Cannot change Z-order of a child object; call TuGroup.InsertAfter instead");
        }
        const int32: number = this.IndexOf(moving);
        if (int32 < 0) {
            throw new ArgumentException("MoveAfter object to be moved must be in the GoLayer");
        }
        if ((count + 1) !== int32 && count !== int32) {
            if (count > int32) {
                count--;
            }
            this.MoveInLayer((count + 1), moving, int32, false);
        }
    }

    public MoveBefore(dest: TuObject, moving: TuObject): void {
        if (moving == null) {
            return;
        }
        if (this.Count === 0) {
            return;
        }
        let int32: number = -1;
        if (dest != null) {
            dest = dest.TopLevelObject;
            int32 = this.IndexOf(dest);
            if (int32 < 0) {
                throw new ArgumentException("MoveBefore destination object must be in the TuLayer");
            }
        }
        else {
            dest = this.myObjects[0];
            int32 = 0;
            if (dest == moving) {
                return;
            }
        }
        if (moving.Parent != null) {
            throw new ArgumentException("Cannot change Z-order of a child object; call GoGroup.InsertBefore instead");
        }
        const int321: number = this.IndexOf(moving);
        if (int321 < 0) {
            throw new ArgumentException("MoveBefore object to be moved must be in the GoLayer");
        }
        if ((int32 - 1) !== int321 && int32 !== int321) {
            if (int32 > int321) {
                int32--;
            }
            this.MoveInLayer(int32, moving, int321, false);
        }
    }

        /* internal */  MoveInLayer(newidx: number, obj: TuObject, oldidx: number, undoing: boolean): void {
        this.MoveInLayerInternal(newidx, obj, oldidx);
        const bounds: CGRectangle = obj.Bounds;
        this.LayerCollectionContainer.RaiseChanged(TuLayerEvents.ChangedObjectZOrder, 0, obj, oldidx, obj, bounds, newidx, obj, bounds);
    }

		/* internal */  MoveInLayerInternal(newidx: number, obj: TuObject, oldidx: number): void {
        if (oldidx >= 0 && oldidx < this.myObjects.Count && newidx >= 0 && newidx < this.myObjects.Count) {
            this.myObjects.RemoveAt(oldidx);
            this.myObjects.Insert(newidx, obj);
            this.resetIndices();
            this.ResetCaches();
        }
    }

    public NextObject(obj: TuObject, relativeZorder: number): TuObject {
        if (obj == null) {
            return null;
        }
        let int32: number = this.IndexOf(obj.TopLevelObject);
        if (int32 < 0) {
            return null;
        }
        int32 = (int32 + relativeZorder);
        if (int32 < 0 || int32 >= this.Count) {
            return null;
        }
        return this.myObjects[int32];
    }

    private renderObjects(view: TuView, clipRect: CGRectangle) {
        const isPrinting: boolean = view.IsPrinting;
        if ((isPrinting ? !this.CanPrintObjects() : !this.CanViewObjects())) {
            return;
        }

        const result = [];
        foreach(this, (goObject1: TuObject) => {
            if ((isPrinting ? !goObject1.CanPrint() : !goObject1.CanView()) ||
                !GeomUtilities.IntersectsRect(goObject1.ExpandPaintBounds(goObject1.Bounds.clone(), view), clipRect)) {
                return CONTINUE;
            }
            /*  const renderer = view.myRenderers.Find((item: TuXmlTransformer<any>) => item.TransformerType === goObject1.GetType());
             if (renderer != null) {
                 result.push(renderer.Render(goObject1));
             } else { */
            result.push((goObject1 as any).CreateMainElement(view));
            //}
        });
        return result;
    }
    public CreateElements(params: any) {
        const view: TuView = params.view;
        const clipRect: CGRectangle = params.clipRect;

        return this.renderObjects(view, clipRect);
    }

    public Paint(g: Graphics, view: TuView, clipRect: CGRectangle): void {
        const isPrinting: boolean = view.IsPrinting;
        if ((isPrinting ? !this.CanPrintObjects() : !this.CanViewObjects())) {
            return;
        }
        const docExtent: CGRectangle = view.DocExtent;
        let goLayerCache: TuLayerCache = this.FindCache(view);
        if (goLayerCache == null || !(goLayerCache.Rect.isEqual(docExtent))) {
            if (this.cacheWanted(view)) {
                if (goLayerCache != null) {
                    goLayerCache.reset();
                }
                else {
                    goLayerCache = new TuLayerCache(view);
                    this.Caches.Add(goLayerCache);
                }
                goLayerCache.Rect = docExtent;
                foreach(this, (goObject: TuObject) => {

                    const bounds: CGRectangle = goObject.ExpandPaintBounds(goObject.Bounds.clone(), view);
                    if ((isPrinting ? goObject.CanPrint() : goObject.CanView()) && GeomUtilities.IntersectsRect(bounds.clone(), clipRect)) {
                        goObject.Paint(g, view);
                    }
                    if (!GeomUtilities.IntersectsRect(bounds.clone(), docExtent)) {
                        return CONTINUE;
                    }
                    goLayerCache.Objects.Add(goObject);
                    this.insertIntoCache1(goLayerCache, goObject);
                });

                this.InitializeIndices();
                goLayerCache.Snappers.Sort(TuLayer.myZComparer);
                return;
            }
            foreach(this, (goObject1: TuObject) => {
                if ((isPrinting ? !goObject1.CanPrint() : !goObject1.CanView()) ||
                    !GeomUtilities.IntersectsRect(goObject1.ExpandPaintBounds(goObject1.Bounds.clone(), view), clipRect)) {
                    return CONTINUE;
                }
                goObject1.Paint(g, view);
            });

        }
        else {
            foreach(goLayerCache.Objects, (object: TuObject) => {
                if ((isPrinting ? !object.CanPrint() : !object.CanView()) || !GeomUtilities.IntersectsRect(object.ExpandPaintBounds(object.Bounds.clone(), view), clipRect)) {
                    return CONTINUE;
                }
                object.Paint(g, view);
            });

        }
    }


    public PickObject(p: CGPoint, selectableOnly: boolean): TuObject {
        let goObject: TuObject;
        if (!this.CanViewObjects()) {
            return null;
        }
        if (selectableOnly && !this.CanSelectObjects()) {
            return null;
        }
        if (this.myCachedPickPoint.Equals(p) && this.myCachedPick && this.myCachedPickSelectable === selectableOnly) {
            return this.myCachedPickObject;
        }
        const goLayerCache: TuLayerCache = this.FindCache(p);
        if (goLayerCache == null) {
            const enumerator: TuLayerEnumerator = this.Backwards.GetEnumerator();
            try {
                while (enumerator.MoveNext()) {
                    const goObject1: TuObject = enumerator.Current.Pick(p, selectableOnly);
                    if (goObject1 == null) {
                        continue;
                    }
                    this.myCachedPick = true;
                    this.myCachedPickPoint = p;
                    this.myCachedPickSelectable = selectableOnly;
                    this.myCachedPickObject = goObject1;
                    goObject = goObject1;
                    return goObject;
                }
                this.myCachedPick = true;
                this.myCachedPickPoint = p;
                this.myCachedPickSelectable = selectableOnly;
                this.myCachedPickObject = null;
                return null;
            }
            finally {
                enumerator.Dispose();
            }
            return goObject;
        }
        else {
            const objects: List<TuObject> = goLayerCache.Objects;
            for (let i = (objects.Count - 1); i >= 0; i--) {
                const goObject2: TuObject = objects.Get(i).Pick(p, selectableOnly);
                if (goObject2 != null) {
                    this.myCachedPick = true;
                    this.myCachedPickPoint = p;
                    this.myCachedPickSelectable = selectableOnly;
                    this.myCachedPickObject = goObject2;
                    return goObject2;
                }
            }
        }
        this.myCachedPick = true;
        this.myCachedPickPoint = p;
        this.myCachedPickSelectable = selectableOnly;
        this.myCachedPickObject = null;
        return null;
    }

    public PickObjects(p: CGPoint, selectableOnly: boolean, coll: ITuCollection, max: number): ITuCollection {
        let goCollections: ITuCollection;
        if (coll == null) {
            coll = new TuCollection(
                {
                    internalChecksForDuplicates: false
                });
        }
        if (coll.Count >= max) {
            return coll;
        }
        if (!this.CanViewObjects()) {
            return coll;
        }
        if (selectableOnly && !this.CanSelectObjects()) {
            return coll;
        }
        const goLayerCache: TuLayerCache = this.FindCache(p);
        if (goLayerCache == null) {
            const enumerator: TuLayerEnumerator = this.Backwards.GetEnumerator();
            try {
                while (enumerator.MoveNext()) {
                    const current: TuObject = enumerator.Current;
                    const goGroups: TuGroup = as(current, Types.TuGroup);
                    if (goGroups == null) {
                        const goObject: TuObject = current.Pick(p, selectableOnly);
                        if (goObject == null) {
                            continue;
                        }
                        coll.Add(goObject);
                        if (coll.Count < max) {
                            continue;
                        }
                        goCollections = coll;
                        return goCollections;
                    }
                    else {
                        goGroups.pickObjects(p, selectableOnly, coll, max);
                    }
                }
                return coll;
            }
            finally {
                enumerator.Dispose();
            }
            return goCollections;
        }
        else {
            const objects: List<TuObject> = goLayerCache.Objects;
            for (let i = (objects.Count - 1); i >= 0; i--) {
                const item: TuObject = objects[i];
                const goGroups1: TuGroup = as(item, Types.TuGroup);
                if (goGroups1 == null) {
                    const goObject1: TuObject = item.Pick(p, selectableOnly);
                    if (goObject1 != null) {
                        coll.Add(goObject1);
                        if (coll.Count >= max) {
                            return coll;
                        }
                    }
                }
                else {
                    goGroups1.pickObjects(p, selectableOnly, coll, max);
                }
            }
        }
        return coll;
    }

    public PickObjectsInRectangle(rect: CGRectangle, pickstyle: TuPickInRectangleStyle, coll: ITuCollection, max: number): ITuCollection {
        let goCollections: ITuCollection;
        if (coll == null) {
            coll = new TuCollection(
                {
                    internalChecksForDuplicates: false
                });
        }
        if (coll.Count >= max) {
            return coll;
        }
        if (!this.CanViewObjects()) {
            return coll;
        }
        if ((TuPickInRectangleStyle.AnyIntersectsBounds & pickstyle) !== 0 && !this.CanSelectObjects()) {
            return coll;
        }
        const goLayerCache: TuLayerCache = this.FindCache(rect);
        if (goLayerCache == null) {
            const enumerator: TuLayerEnumerator = this.GetEnumerator();
            try {
                while (enumerator.MoveNext()) {
                    this.PickObjectsInRectangleInternal(enumerator.Current, rect, pickstyle, coll, max);
                    if (coll.Count < max) {
                        continue;
                    }
                    goCollections = coll;
                    return goCollections;
                }
                return coll;
            }
            finally {
                enumerator.Dispose();
            }
            return goCollections;
        }
        else {
            const objects: List<TuObject> = goLayerCache.Objects;
            const count = objects.Count;
            for (let i = 0; i < count; i++) {
                const item: TuObject = objects[i];
                this.PickObjectsInRectangleInternal(item, rect, pickstyle, coll, max);
                if (coll.Count >= max) {
                    return coll;
                }
            }
        }
        return coll;
    }

    private PickObjectsInRectangleInternal(obj: TuObject, rect: CGRectangle, pickstyle: TuPickInRectangleStyle, coll: ITuCollection, max: number): void {
        if (coll.Count >= max) {
            return;
        }
        if (!obj.CanView()) {
            return;
        }
        if ((pickstyle < TuPickInRectangleStyle.SelectableOnlyContained) || obj.CanSelect()) {
            const selectionObject: TuObject = obj.SelectionObject || obj;
            if ((pickstyle & TuPickInRectangleStyle.AnyContained) !== 0) {
                if (selectionObject.ContainedByRectangle(rect)) {
                    coll.Add(obj);
                    return;
                }
            }
            else if ((pickstyle & TuPickInRectangleStyle.AnyIntersectsBounds) !== 0 && GeomUtilities.IntersectsRect(selectionObject.Bounds, rect)) {
                coll.Add(obj);
                return;
            }
        }
        const goGroups: TuGroup = as(obj, Types.TuGroup);
        if (goGroups != null) {
            foreach(goGroups.GetEnumerator(), (enumerator: TuObject) => {
                this.PickObjectsInRectangleInternal(enumerator, rect, pickstyle, coll, max);
            });

        }
    }


    public Remove(obj: TuObject): boolean {
        if (obj == null) {
            return false;
        }
        const layer: TuLayer = obj.Layer;
        if (layer == null) {
            return false;
        }
        if (layer !== this) {
            throw new ArgumentException("Cannot remove an object from a layer if it does not belong to that layer.");
        }
        const parent: TuGroup = obj.Parent;
        if (parent == null) {
            this.removeFromLayer(obj, false);
        }
        else {
            parent.Remove(obj);
        }
        return true;
    }

    private removeFromCache1(cache: TuLayerCache, obj: TuObject): void {
        const goStroke: TuStroke = as(obj, Types.TuStroke);
        if (goStroke != null) {
            TuCollection.FastRemove<TuStroke>(cache.Strokes, goStroke);
        }
        const goDragSnapper: ITuDragSnapper = as(obj, Types.ITuDragSnapper);
        if (goDragSnapper != null) {
            TuCollection.FastRemove<ITuDragSnapper>(cache.Snappers, goDragSnapper);
        }
        const goGroups: TuGroup = as(obj, Types.TuGroup);
        if (goGroups != null) {
            foreach(goGroups.GetEnumerator(), (enumerator: TuObject) => {
                this.removeFromCache1(cache, enumerator);
            });
        }
    }

		/* internal */ removeFromCaches(obj: TuObject): void {
        this.resetPickCache();
        foreach(this.Caches, (cach: TuLayerCache) => {
            const rectangleF: CGRectangle = obj.ExpandPaintBounds(obj.Bounds.clone(), cach.View);
            if (!GeomUtilities.IntersectsRect(cach.Rect, rectangleF)) {
                return CONTINUE;
            }
            TuCollection.FastRemove<TuObject>(cach.Objects, obj);
            this.removeFromCache1(cach, obj);
        });

    }

		/* internal */  removeFromLayer(obj: TuObject, undoing: boolean): void {
        try {
            obj.setBeingRemoved(true);
            this.removeFromCaches(obj);
            const int32: number = TuCollection.FastRemove<TuObject>(this.myObjects, obj);
            if (int32 < this.myObjects.Count) {
                this.resetIndices();
            }
            const bounds: CGRectangle = obj.Bounds;
            this.LayerCollectionContainer.RaiseChanged(TuLayerEvents.RemovedObject, 0, obj, int32, this, bounds, 0, null, NullRect);
        }
        finally {
            obj.setLayer(undefined, obj, undoing);
            obj.setBeingRemoved(false);
        }
    }

		/* internal */ ResetCaches(): void {
        this.myCaches = new List<TuLayerCache>();
        this.resetPickCache();
    }

    private resetIndices(): void {
        this.myValidIndices = false;
    }

		/* internal */ resetPickCache(): void {
        this.myCachedPick = false;
        this.myCachedPickObject = null;
    }


    public SetModifiable(b: boolean): void {
        this.AllowMove = b;
        this.AllowResize = b;
        this.AllowReshape = b;
        this.AllowDelete = b;
        this.AllowInsert = b;
        this.AllowLink = b;
        this.AllowEdit = b;
    }

        /* internal */ updateCaches(obj: TuObject, evt: TuChangedEventArgs): void {
        this.resetPickCache();
        foreach(this.Caches, (cach: TuLayerCache) => {
            let oldRect: CGRectangle = evt.OldRect;
            oldRect = obj.ExpandPaintBounds(oldRect, cach.View);
            let newRect: CGRectangle = evt.NewRect;
            newRect = obj.ExpandPaintBounds(newRect.clone(), cach.View);
            if (!(!GeomUtilities.IntersectsRect(cach.Rect, oldRect) && GeomUtilities.IntersectsRect(cach.Rect, newRect))) {
                return CONTINUE;
            }
            if (!cach.Objects.Contains(obj)) {
                cach.Objects.Add(obj);
            }
            this.insertIntoCache1(cach, obj);
            this.InitializeIndices();
            cach.Snappers.Sort(TuLayer.myZComparer);
        });

    }

    public importEntries(entries: IEnumerableOrArray<TuObject> | IEnumerator<TuObject>): number {
        return 0;
    }
    public ToArray(): TuObject[] {
        return this.myObjects.ToArray();
    }
    public RemoveAt(index: number): void {

    }
}


(function constructor() {
    (TuLayer as any).myZComparer = new ZComparer();
})();

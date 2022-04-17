import { float, ClassInfo, DisposableBase, Dictionary, foreach, ArgumentException, is, as, Out, New, List, CONTINUE, TString, clone, IKeyValuePair, using, IEnumerator, BREAK, Event, IEnumerableOrArray } from '@tuval/core';
import { ITuCollection } from '../ITuCollection';
import { ITuLayerAbilities } from '../TuLayer/ITuLayerAbilities';
import { ITuLayerCollectionContainer } from '../TuLayer/ITuLayerCollectionContainer';
import { TuLayer, TuPickInRectangleStyle } from '../TuLayer/TuLayer';
import { TuLayerCollection, TuLayerCollectionEvents } from '../TuLayer/TuLayerCollection';
import { ITuNode } from '../TuNode/ITuNode';
import { Types } from '../types';
import { CGSize, CGPoint, CGColor, CGRectangle, CoreGraphicTypes } from '@tuval/cg';
import { TuChangedEventArgs } from '../TuChangedEventArgs';
import { TuUndoManager } from './TuUndoManager';
import { TuDocumentValidCycle } from './TuDocumentValidCycle';
import { TuCopyDelayedsCollection } from '../TuCopyDelayedsCollection';
import { TuRoutingTime } from './TuRoutingTime';
import { TuPositionArray } from './TuPositionArray';
import { TuObject } from '../TuObject/TuObject';
import { ITuIdentifiablePart } from '../ITuIdentifiablePart';
import { TuDocumentEvents } from './TuDocumentEvents';
import { NullRect } from '../Globals';
import { TuLayerCollectionObjectEnumerator } from '../TuLayer/TuLayerCollectionObjectEnumerator';
import { GeomUtilities } from '../GeomUtilities';
import { TuGroup } from '../TuGroup/TuGroup';
import { TuCollection } from '../TuCollection/TuCollection';
import { TuTool } from '../TuTool/TuTool';
import { SegInfo } from './SegInfo';
import { TuLink } from '../TuLink/TuLink';
import { TuStrokeStyle } from '../TuStroke/TuStrokeStyle';
import { SegInfoComparer } from './SegInfoComparer';
import { SegInfoComparer2 } from './SegInfoComparer2';
import { TuView } from '../TuView/TuView';
import { TuCopyDictionary } from '../TuCopyDictionary';
import { ITuRoutable } from '../ITuRoutable';
import { ITuLabeledPart } from '../TuLabeledNode/ITuLabeledPart';
import { TuSubGraphBase } from '../TuSubGraph/TuSubGraphBase';
import { TuLabeledLink } from '../TuLabeledLink/TuLabeledLink';
import { ITuLink } from '../ITuLink';
import { TuLayerEvents } from '../TuLayer/TuLayerEvents';
import { TuObjectEvents } from '../TuObjectEvents';
import { TuGroupEvents } from '../TuGroup/TuGroupEvents';
import { TuLayerCollectionEnumerator } from '../TuLayer/TuLayerCollectionEnumerator';
import { EventHandler } from '../Forms/EventHandler';
import { GraphicTypes } from '@tuval/graphics';

const LastHint: number = 10000;
const RIGHT: float = 0;
const DOWN: float = 90;
const LEFT: float = 180;
const UP: float = 270;

@ClassInfo({
    fullName: Types.TuDocument,
    instanceof: [
        Types.TuDocument,
        Types.DisposableBase,
        Types.ITuCollection,
        Types.ITuLayerCollectionContainer,
        Types.ITuLayerAbilities
    ]
})
export class TuDocument extends DisposableBase implements ITuCollection, ITuLayerCollectionContainer, ITuLayerAbilities {
    private static myCycleMap: Dictionary<ITuNode, boolean>;
    /* internal */ static myCaching: boolean;
    private myUserFlags: number;
    private myUserObject: any;
    private myLayers: TuLayerCollection = new TuLayerCollection();
    private myLinksLayer: TuLayer;
    private myName: string = '';
    private myDocumentSize: CGSize = new CGSize(0, 0);
    private myDocumentTopLeft: CGPoint = new CGPoint(0, 0);
    private myWorldScale: CGSize = new CGSize(1, 1);
    private myWorldEpsilon: float = 0.5;
    private myFixedSize: boolean;
    private myPaperColor: CGColor = CGColor.Empty;
    private myDataFormat: string;
    private myAllowSelect: boolean = true;
    private myAllowMove: boolean = true;
    private myAllowCopy: boolean = true;
    private myAllowResize: boolean = true;
    private myAllowReshape: boolean = true;
    private myAllowDelete: boolean = true;
    private myAllowInsert: boolean = true;
    private myAllowLink: boolean = true;
    private myAllowEdit: boolean = true;
    private mySuspendsUpdates: boolean;
    private mySkipsUndoManager: boolean;
    private mySerializesUndoManager: boolean;
    private myInitializing: boolean;
    private myChanged$: Event<EventHandler<TuChangedEventArgs>> = new Event();
    private myChangedEventArgs: TuChangedEventArgs;
    private myIsModified: boolean;
    private myUndoManager: TuUndoManager;
    private mySerializedUndoManager: TuUndoManager;
    private myUndoEditIndex: number = -2;
    private myValidCycle: TuDocumentValidCycle;
    private mySuspendsRouting: boolean;
    private myDelayedRoutings: TuCopyDelayedsCollection = new TuCopyDelayedsCollection();
    private myRoutingTime: TuRoutingTime = TuRoutingTime.Delayed;
    private myPositions: TuPositionArray;
    private mySkippedAvoidable: TuObject;
    private myLinkSpacing: float = 4;
    private myAvoidsOrthogonalLinks: boolean;
    private myMaintainsPartID: boolean;
    private myLastPartID: number = -1;
    private myParts: Dictionary<number, ITuIdentifiablePart>;

    //#region [Property] AllowCopy
    public get AllowCopy(): boolean {
        return this.getAllowCopy();
    }
    public set AllowCopy(value: boolean) {
        this.setAllowCopy(value);
    }

    protected /*virtual*/  getAllowCopy(): boolean {
        return this.myAllowCopy;
    }
    protected /*virtual*/ setAllowCopy(value: boolean) {
        const flag: boolean = this.myAllowCopy;
        if (flag !== value) {
            this.myAllowCopy = value;
            this.RaiseChanged(TuDocumentEvents.ChangedAllowCopy, 0, undefined, 0, flag, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] AllowDelete
    public get AllowDelete(): boolean {
        return this.getAllowDelete();
    }
    public set AllowDelete(value: boolean) {
        this.setAllowDelete(value);
    }

    protected /*virtual*/  getAllowDelete(): boolean {
        return this.myAllowDelete;
    }
    protected /*virtual*/ setAllowDelete(value: boolean) {
        const flag: boolean = this.myAllowDelete;
        if (flag != value) {
            this.myAllowDelete = value;
            this.RaiseChanged(TuDocumentEvents.ChangedAllowDelete, 0, undefined, 0, flag, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] AllowEdit
    public get AllowEdit(): boolean {
        return this.getAllowEdit();
    }
    public set AllowEdit(value: boolean) {
        this.setAllowEdit(value);
    }

    protected /*virtual*/  getAllowEdit(): boolean {
        return this.myAllowEdit;
    }
    protected /*virtual*/ setAllowEdit(value: boolean) {
        const flag: boolean = this.myAllowEdit;
        if (flag !== value) {
            this.myAllowEdit = value;
            this.RaiseChanged(TuDocumentEvents.ChangedAllowEdit, 0, undefined, 0, flag, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] AllowInsert
    public get AllowInsert(): boolean {
        return this.getAllowInsert();
    }
    public set AllowInsert(value: boolean) {
        this.setAllowInsert(value);
    }

    protected /*virtual*/  getAllowInsert(): boolean {
        return this.myAllowInsert;
    }
    protected /*virtual*/ setAllowInsert(value: boolean) {
        const flag: boolean = this.myAllowInsert;
        if (flag !== value) {
            this.myAllowInsert = value;
            this.RaiseChanged(TuDocumentEvents.ChangedAllowInsert, 0, undefined, 0, flag, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] AllowLink
    public get AllowLink(): boolean {
        return this.getAllowLink();
    }
    public set AllowLink(value: boolean) {
        this.setAllowLink(value);
    }

    protected /*virtual*/  getAllowLink(): boolean {
        return this.myAllowLink;
    }
    protected /*virtual*/ setAllowLink(value: boolean) {
        const flag: boolean = this.myAllowLink;
        if (flag != value) {
            this.myAllowLink = value;
            this.RaiseChanged(TuDocumentEvents.ChangedAllowLink, 0, undefined, 0, flag, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] AllowMove
    public get AllowMove(): boolean {
        return this.getAllowMove();
    }
    public set AllowMove(value: boolean) {
        this.setAllowMove(value);
    }

    protected /*virtual*/  getAllowMove(): boolean {
        return this.myAllowMove;
    }
    protected /*virtual*/ setAllowMove(value: boolean) {
        const flag: boolean = this.myAllowMove;
        if (flag !== value) {
            this.myAllowMove = value;
            this.RaiseChanged(TuDocumentEvents.ChangedAllowMove, 0, undefined, 0, flag, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] AllowReshape
    public get AllowReshape(): boolean {
        return this.getAllowReshape();
    }
    public set AllowReshape(value: boolean) {
        this.setAllowReshape(value);
    }

    protected /*virtual*/  getAllowReshape(): boolean {
        return this.myAllowReshape;
    }
    protected /*virtual*/ setAllowReshape(value: boolean) {
        const flag: boolean = this.myAllowReshape;
        if (flag !== value) {
            this.myAllowReshape = value;
            this.RaiseChanged(TuDocumentEvents.ChangedAllowReshape, 0, undefined, 0, flag, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] AllowResize
    public get AllowResize(): boolean {
        return this.getAllowResize();
    }
    public set AllowResize(value: boolean) {
        this.setAllowResize(value);
    }

    protected /*virtual*/  getAllowResize(): boolean {
        return this.myAllowResize;
    }
    protected /*virtual*/ setAllowResize(value: boolean) {
        const flag: boolean = this.myAllowResize;
        if (flag !== value) {
            this.myAllowResize = value;
            this.RaiseChanged(TuDocumentEvents.ChangedAllowResize, 0, undefined, 0, flag, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] AllowSelect
    public get AllowSelect(): boolean {
        return this.getAllowSelect();
    }
    public set AllowSelect(value: boolean) {
        this.setAllowSelect(value);
    }

    protected /*virtual*/  getAllowSelect(): boolean {
        return this.myAllowSelect;
    }
    protected /*virtual*/ setAllowSelect(value: boolean) {
        const flag: boolean = this.myAllowSelect;
        if (flag !== value) {
            this.myAllowSelect = value;
            this.RaiseChanged(TuDocumentEvents.ChangedAllowSelect, 0, this, 0, flag, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    public /* virtual */  get Backwards(): TuLayerCollectionObjectEnumerator {
        return this.Layers.GetObjectEnumerator(false);
    }

    //#region [Property] Bounds
    public get Bounds(): CGRectangle {
        return this.getBounds();
    }
    public set Bounds(value: CGRectangle) {
        this.setBounds(value);
    }

    protected /*virtual*/  getBounds(): CGRectangle {
        const topLeft: CGPoint = this.TopLeft;
        const size: CGSize = this.Size;
        return new CGRectangle(topLeft.X, topLeft.Y, size.Width, size.Height);
    }

    protected /*virtual*/ setBounds(value: CGRectangle) {
        this.TopLeft = new CGPoint(value.X, value.Y);
        this.Size = new CGSize(value.Width, value.Height);
    }
    //#endregion

    //#region [Property] Count
    public get Count(): number {
        return this.getCount();
    }

    protected /*virtual*/  getCount(): number {
        let count: number = 0;
        foreach(this.Layers, (layer: TuLayer) => {
            count = (count + layer.Count);
        });
        return count;

    }
    //#endregion

    //#region [Property] DataFormat
    public get DataFormat(): string {
        return this.getDataFormat();
    }
    public set DataFormat(value: string) {
        this.setDataFormat(value);
    }

    private getType() {
        return {
            FullName: 'TuDocuemnt'
        }
    }
    protected /*virtual*/  getDataFormat(): string {
        if (this.myDataFormat == null) {
            this.myDataFormat = this.getType().FullName;
        }
        return this.myDataFormat;
    }

    protected /*virtual*/ setDataFormat(value: string) {
        if (this.myDataFormat == null) {
            this.myDataFormat = this.getType().FullName;
        }
        const str: string = this.myDataFormat;
        if (value != null && str !== value) {
            this.myDataFormat = value;
            this.RaiseChanged(TuDocumentEvents.ChangedDataFormat, 0, undefined, 0, str, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] DefaultLayer
    public get DefaultLayer(): TuLayer {
        return this.getDefaultLayer();
    }
    public set DefaultLayer(value: TuLayer) {
        this.setDefaultLayer(value);
    }

    protected /*virtual*/  getDefaultLayer(): TuLayer {
        return this.Layers.Default;
    }

    protected /*virtual*/ setDefaultLayer(value: TuLayer) {
        this.Layers.Default = value;
    }
    //#endregion

    public get DelayedRoutings(): TuCopyDelayedsCollection {
        return this.myDelayedRoutings;
    }

    //#region [Property] FixedSize
    public get FixedSize(): boolean {
        return this.getFixedSize();
    }
    public set FixedSize(value: boolean) {
        this.setFixedSize(value);
    }

    protected /*virtual*/  getFixedSize(): boolean {
        return this.myFixedSize;
    }

    protected /*virtual*/ setFixedSize(value: boolean) {
        const flag: boolean = this.myFixedSize;
        if (flag !== value) {
            this.myFixedSize = value;
            this.RaiseChanged(TuDocumentEvents.ChangedFixedSize, 0, undefined, 0, flag, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] Initializing
    public get Initializing(): boolean {
        return this.getInitializing();
    }
    public set Initializing(value: boolean) {
        this.setInitializing(value);
    }

    protected /*virtual*/  getInitializing(): boolean {
        return this.myInitializing;
    }

    protected /*virtual*/ setInitializing(value: boolean) {
        this.myInitializing = value;
    }
    //#endregion

    public get IsEmpty(): boolean {
        return this.Count === 0;
    }

    //#region [Property] IsModified
    public get IsModified(): boolean {
        return this.getIsModified();
    }
    public set IsModified(value: boolean) {
        this.setIsModified(value);
    }

    protected /*virtual*/  getIsModified(): boolean {
        if (this.UndoManager == null) {
            return this.myIsModified;
        }
        if (this.UndoManager.CurrentEdit != null) {
            return true;
        }
        if (!this.myIsModified) {
            return false;
        }
        return this.myUndoEditIndex !== this.UndoManager.UndoEditIndex;
    }

    protected /*virtual*/ setIsModified(value: boolean) {
        const flag: boolean = this.myIsModified;
        this.myIsModified = value;
        if (!value && this.UndoManager != null) {
            this.myUndoEditIndex = this.UndoManager.UndoEditIndex;
        }
        if (flag !== value) {
            this.InvalidateViews();
        }
    }
    //#endregion

    public get IsReadOnly(): boolean {
        return false;
    }

    //#region [Property] LastPartID
    public get LastPartID(): number {
        return this.getLastPartID();
    }
    public set LastPartID(value: number) {
        this.setLastPartID(value);
    }

    protected /*virtual*/  getLastPartID(): number {
        return this.myLastPartID;
    }

    protected /*virtual*/ setLastPartID(value: number) {
        const int32: number = this.myLastPartID;
        if (int32 != value) {
            this.myLastPartID = value;
            this.RaiseChanged(TuDocumentEvents.ChangedLastPartID, 0, undefined, int32, undefined, NullRect, value, undefined, NullRect);
        }
    }
    //#endregion

    public get Layers(): TuLayerCollection {
        return this.myLayers;
    }

    //#region [Property] LinksLayer
    public get LinksLayer(): TuLayer {
        return this.getLinksLayer();
    }
    public set LinksLayer(value: TuLayer) {
        this.setLinksLayer(value);
    }

    protected /*virtual*/  getLinksLayer(): TuLayer {
        return this.myLinksLayer;
    }

    protected /*virtual*/ setLinksLayer(value: TuLayer) {
        const goLayers: TuLayer = this.myLinksLayer;
        if (goLayers !== value) {
            if (value == null || value.Document !== this) {
                throw new ArgumentException("The new value for TuDocument.LinksLayer must belong to this document.");
            }
            this.myLinksLayer = value;
            this.RaiseChanged(TuDocumentEvents.ChangedLinksLayer, 0, undefined, 0, goLayers, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] MaintainsPartID
    public get MaintainsPartID(): boolean {
        return this.getMaintainsPartID();
    }
    public set MaintainsPartID(value: boolean) {
        this.setMaintainsPartID(value);
    }

    protected /*virtual*/  getMaintainsPartID(): boolean {
        return this.myMaintainsPartID;
    }

    protected /*virtual*/ setMaintainsPartID(value: boolean) {
        const flag: boolean = this.myMaintainsPartID;
        if (flag !== value) {
            this.myMaintainsPartID = value;
            this.RaiseChanged(TuDocumentEvents.ChangedMaintainsPartID, 0, undefined, 0, flag, NullRect, 0, value, NullRect);
            if (!this.Initializing) {
                if (value) {
                    this.ensureUniquePartID();
                    return;
                }
                this.myParts = null;
            }
        }
    }
    //#endregion

    //#region [Property] Name
    public get Name(): string {
        return this.getName();
    }
    public set Name(value: string) {
        this.setName(value);
    }

    protected /*virtual*/  getName(): string {
        return this.myName;
    }

    protected /*virtual*/ setName(value: string) {
        const str: string = this.myName;
        if (value != null && str != value) {
            this.myName = value;
            this.RaiseChanged(TuDocumentEvents.ChangedName, 0, undefined, 0, str, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] PaperColor
    public get PaperColor(): CGColor {
        return this.getPaperColor();
    }
    public set PaperColor(value: CGColor) {
        this.setPaperColor(value);
    }

    protected /*virtual*/  getPaperColor(): CGColor {
        return this.myPaperColor;
    }

    protected /*virtual*/ setPaperColor(value: CGColor) {
        const color: CGColor = this.myPaperColor;
        if (color.notEquals(value)) {
            this.myPaperColor = value;
            this.RaiseChanged(TuDocumentEvents.ChangedPaperColor, 0, undefined, 0, color, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] RoutingTime
    public get RoutingTime(): TuRoutingTime {
        return this.getRoutingTime();
    }
    public set RoutingTime(value: TuRoutingTime) {
        this.setRoutingTime(value);
    }

    protected /*virtual*/  getRoutingTime(): TuRoutingTime {
        return this.myRoutingTime;
    }

    protected /*virtual*/ setRoutingTime(value: TuRoutingTime) {
        const goRoutingTime: TuRoutingTime = this.myRoutingTime;
        if (goRoutingTime !== value) {
            this.myRoutingTime = value;
            this.RaiseChanged(TuDocumentEvents.ChangedRoutingTime, 0, undefined, goRoutingTime, undefined, NullRect, value, undefined, NullRect);
        }
    }
    //#endregion

    //#region [Property] SerializesUndoManager
    public get SerializesUndoManager(): boolean {
        return this.getSerializesUndoManager();
    }
    public set SerializesUndoManager(value: boolean) {
        this.setSerializesUndoManager(value);
    }

    protected /*virtual*/  getSerializesUndoManager(): boolean {
        return this.mySerializesUndoManager;
    }

    protected /*virtual*/ setSerializesUndoManager(value: boolean) {
        this.mySerializesUndoManager = value;
        if (!value) {
            this.mySerializedUndoManager = undefined;
            return;
        }
        this.mySerializedUndoManager = this.myUndoManager;
    }
    //#endregion

    //#region [Property] Size
    public get Size(): CGSize {
        return this.getSize();
    }
    public set Size(value: CGSize) {
        this.setSize(value);
    }

    protected /*virtual*/  getSize(): CGSize {
        return this.myDocumentSize;
    }

    protected /*virtual*/ setSize(value: CGSize) {
        let worldScale: CGSize;
        if (value.Width >= 0) {
            const sizeF: CGSize = this.myDocumentSize;
            if (value.Width >= 0 && value.Height >= 0 && sizeF.NotEquals(value)) {
                this.myDocumentSize = value;
                this.RaiseChanged(TuDocumentEvents.ChangedSize, 0, undefined, 0, undefined, GeomUtilities.MakeRect(sizeF), 0, undefined, GeomUtilities.MakeRect(value));
            }
            return;
        }
        if (value.Width !== -23) {
            if (value.Width === -24) {
                this.WorldScale = new CGSize(value.Height, value.Height);
                return;
            }
            if (value.Width === -26) {
                const height: float = value.Height;
                worldScale = this.WorldScale;
                this.WorldScale = new CGSize(height, worldScale.Height);
                return;
            }
            if (value.Width === -27) {
                worldScale = this.WorldScale;
                this.WorldScale = new CGSize(worldScale.Width, value.Height);
                return;
            }
            if (value.Width === -25) {
                if (this.myPositions != null) {
                    const goPositionArray: TuPositionArray = this.myPositions;
                    const single: float = value.Height;
                    worldScale = this.WorldScale;
                    const width: float = single / worldScale.Width;
                    const height1: float = value.Height;
                    worldScale = this.WorldScale;
                    goPositionArray.CellSize = new CGSize(width, height1 / worldScale.Height);
                    return;
                }
            }
            else if (value.Width === -28) {
                if (this.myPositions != null) {
                    this.myPositions.WholeDocument = value.Height > 0;
                    return;
                }
            }
            else if (value.Width === -29) {
                if (this.myPositions != null) {
                    this.myPositions.SmallMargin = value.Height;
                    return;
                }
            }
            else if (value.Width !== -30) {
                if (value.Width === -31) {
                    this.myLinkSpacing = value.Height;
                    return;
                }
                if (value.Width === -32) {
                    this.myAvoidsOrthogonalLinks = true;
                    return;
                }
                if (value.Width === -33) {
                    this.myAvoidsOrthogonalLinks = false;
                }
            }
            else if (this.myPositions != null) {
                this.myPositions.LargeMargin = value.Height;
                return;
            }
        }
        else {
            if (value.Height === -23) {
                TuDocument.myCaching = true;
                return;
            }
            if (value.Height === -24) {
                TuDocument.myCaching = false;
                foreach(this.Layers, (layer: TuLayer) => {
                    layer.ResetCaches();
                });
            }
        }
    }
    //#endregion

    //#region [Property] SkipsUndoManager
    public get SkipsUndoManager(): boolean {
        return this.getSkipsUndoManager();
    }
    public set SkipsUndoManager(value: boolean) {
        this.setSkipsUndoManager(value);
    }

    protected /*virtual*/  getSkipsUndoManager(): boolean {
        return this.mySkipsUndoManager;
    }

    protected /*virtual*/ setSkipsUndoManager(value: boolean) {
        this.mySkipsUndoManager = value;
    }
    //#endregion

    //#region [Property] SuspendsRouting
    public get SuspendsRouting(): boolean {
        return this.getSuspendsRouting();
    }
    public set SuspendsRouting(value: boolean) {
        this.setSuspendsRouting(value);
    }

    protected /*virtual*/  getSuspendsRouting(): boolean {
        return this.mySuspendsRouting;
    }

    protected /*virtual*/ setSuspendsRouting(value: boolean) {
        this.mySuspendsRouting = value;
    }
    //#endregion

    //#region [Property] SuspendsUpdates
    public get SuspendsUpdates(): boolean {
        return this.getSuspendsUpdates();
    }
    public set SuspendsUpdates(value: boolean) {
        this.setSuspendsUpdates(value);
    }

    protected /*virtual*/  getSuspendsUpdates(): boolean {
        return this.mySuspendsUpdates;
    }

    protected /*virtual*/ setSuspendsUpdates(value: boolean) {
        this.mySuspendsUpdates = value;
        if (!value) {
            this.invalidatePositionArray(undefined);
            foreach(this.Layers, (layer: TuLayer) => {
                layer.ResetCaches();
            });
        }
    }
    //#endregion

    //#region [Property] TopLeft
    public get TopLeft(): CGPoint {
        return this.getTopLeft();
    }
    public set TopLeft(value: CGPoint) {
        this.setTopLeft(value);
    }

    protected /*virtual*/  getTopLeft(): CGPoint {
        return this.myDocumentTopLeft;
    }

    protected /*virtual*/ setTopLeft(value: CGPoint) {
        const pointF: CGPoint = this.myDocumentTopLeft;
        if (pointF.notEquals(value)) {
            this.myDocumentTopLeft = value;
            this.RaiseChanged(TuDocumentEvents.ChangedTopLeft, 0, undefined, 0, undefined, GeomUtilities.MakeRect(pointF), 0, undefined, GeomUtilities.MakeRect(value));
        }
    }
    //#endregion

    //#region [Property] UndoManager
    public get UndoManager(): TuUndoManager {
        return this.getUndoManager();
    }
    public set UndoManager(value: TuUndoManager) {
        this.setUndoManager(value);
    }

    protected /*virtual*/  getUndoManager(): TuUndoManager {
        return this.myUndoManager;
    }

    protected /*virtual*/ setUndoManager(value: TuUndoManager) {
        if (this.myUndoManager !== value) {
            if (this.myUndoManager != null) {
                this.myUndoManager.RemoveDocument(this);
            }
            this.myUndoManager = value;
            if (this.SerializesUndoManager) {
                this.mySerializedUndoManager = value;
            }
            this.myIsModified = false;
            this.myUndoEditIndex = -2;
            if (this.myUndoManager != null) {
                this.myUndoManager.AddDocument(this);
            }
        }
    }
    //#endregion

    //#region [Property] UserFlags
    public get UserFlags(): number {
        return this.getUserFlags();
    }
    public set UserFlags(value: number) {
        this.setUserFlags(value);
    }

    protected /*virtual*/  getUserFlags(): number {
        return this.myUserFlags;
    }

    protected /*virtual*/ setUserFlags(value: number) {
        const int32: number = this.myUserFlags;
        if (int32 !== value) {
            this.myUserFlags = value;
            this.RaiseChanged(TuDocumentEvents.ChangedUserFlags, 0, undefined, int32, undefined, NullRect, value, undefined, NullRect);
        }
    }
    //#endregion

    //#region [Property] UserObject
    public get UserObject(): any {
        return this.getUserObject();
    }
    public set UserObject(value: any) {
        this.setUserObject(value);
    }

    protected /*virtual*/  getUserObject(): any {
        return this.myUserObject;
    }

    protected /*virtual*/ setUserObject(value: any) {
        const obj: any = this.myUserObject;
        if (obj !== value) {
            this.myUserObject = value;
            this.RaiseChanged(TuDocumentEvents.ChangedUserObject, 0, undefined, 0, obj, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] ValidCycle
    public get ValidCycle(): TuDocumentValidCycle {
        return this.getValidCycle();
    }
    public set ValidCycle(value: TuDocumentValidCycle) {
        this.setUserObject(value);
    }

    protected /*virtual*/  getValidCycle(): TuDocumentValidCycle {
        return this.myValidCycle;
    }

    protected /*virtual*/ setValidCycle(value: TuDocumentValidCycle) {
        const goDocumentValidCycle: TuDocumentValidCycle = this.myValidCycle;
        if (goDocumentValidCycle !== value) {
            this.myValidCycle = value;
            this.RaiseChanged(TuDocumentEvents.ChangedValidCycle, 0, undefined, goDocumentValidCycle, undefined, NullRect, value, 0, NullRect);
        }
    }
    //#endregion

    /* internal */ get WorldEpsilon(): float {
        return this.myWorldEpsilon;
    }

    /* internal */ get WorldScale(): CGSize {
        return this.myWorldScale;
    }
	/* internal */ set WorldScale(value: CGSize) {
        const sizeF: CGSize = this.myWorldScale;
        if (sizeF.NotEquals(value) && value.Width > 0 && value.Height > 0) {
            this.myWorldScale = value;
            this.myWorldEpsilon = 0.5 / value.Width;
            if (this.myPositions != null) {
                const cellSize: CGSize = this.myPositions.CellSize;
                this.myPositions.CellSize = new CGSize(cellSize.Width * sizeF.Width / value.Width, cellSize.Height * sizeF.Height / value.Height);
            }
            this.invalidatePositionArray(undefined);
            this.RaiseChanged(TuDocumentEvents.ChangedWorldScale, 0, undefined, 0, undefined, GeomUtilities.MakeRect(sizeF), 0, undefined, GeomUtilities.MakeRect(value));
            if (!this.Initializing) {
                this.Bounds = this.computeBounds();
            }
        }
    }

    public constructor() {
        super();
        this.myLayers.init(this);
        this.myLinksLayer = this.myLayers.Default;
    }

    public /* virtual */ AbortTransaction(): boolean {
        const undoManager: TuUndoManager = this.UndoManager;
        if (undoManager == null) {
            return false;
        }
        return undoManager.AbortTransaction();
    }

    public /* virtual */ Add(obj: TuObject): this {
        if (is.typeof(obj, Types.ITuLink)) {
            this.LinksLayer.Add(obj);
            return;
        }
        this.DefaultLayer.Add(obj);
        return this;
    }

    /* internal */ addAllParts(obj: TuObject): void {
        const goIdentifiablePart: ITuIdentifiablePart = as(obj, Types.ITuIdentifiablePart);
        if (goIdentifiablePart != null) {
            this.addPart(goIdentifiablePart);
        }
        const goGroups: TuGroup = as(obj, Types.TuGroup);
        if (goGroups != null) {
            foreach(goGroups.GetEnumerator(), (enumerator: TuObject) => {
                this.addAllParts(enumerator);
            });

        }
    }
    public addCopy(obj: TuObject, loc: CGPoint): TuObject {
        const location: CGPoint = obj.Location;
        const goCollections: TuCollection = new TuCollection({
            entries: [obj]
        });

        const sizeF: CGSize = TuTool.SubtractPoints(loc, location);
        return as(this.CopyFromCollection(goCollections, false, false, sizeF, null).Get(obj), Types.TuObject);
    }

    /* internal */ addPart(p: ITuIdentifiablePart): void {
        let i: number;
        let goIdentifiablePart: Out<ITuIdentifiablePart> = New.Out();
        if (this.myParts == null) {
            this.myParts = new Dictionary<number, ITuIdentifiablePart>(1000);
        }
        const partID: number = p.PartID;
        if (partID !== -1) {
            if (!this.myParts.TryGetValue(partID, goIdentifiablePart)) {
                this.myParts[partID] = p;
                return;
            }
            if (goIdentifiablePart != null && goIdentifiablePart.value.PartID != partID) {
                this.myParts[partID] = p;
                goIdentifiablePart.value.PartID = -1;
                this.addPart(goIdentifiablePart.value);
            }
            return;
        }
        let int32: number = (this.myLastPartID + 1);
        this.myLastPartID = int32;
        for (i = int32; this.myParts.ContainsKey(i); i = int32) {
            int32 = (this.myLastPartID + 1);
            this.myLastPartID = int32;
        }
        this.myParts[i] = p;
        p.PartID = i;
    }

    private adjustOverlapsH(routables: ITuCollection): number {
        let int32: number = 0;
        let l: number = 0;
        let flag: boolean;
        let int321: number;
        const single: float = (this.myPositions != null ? this.myPositions.CellSize.Height : 8);
        let int322: number = 0;
        const segInfos: List<SegInfo> = new List<SegInfo>();
        foreach(routables, (routable: TuObject) => {
            const goLink: TuLink = as(routable, Types.TuLink);
            if (goLink == null || !goLink.Orthogonal || goLink.Style === TuStrokeStyle.Bezier) {
                return CONTINUE;
            }
            for (let i = 2; i < (goLink.PointsCount - 3); i++) {
                const point: CGPoint = goLink.getPoint(i);
                const pointF: CGPoint = goLink.getPoint(i + 1);
                if (TuDocument.IsApprox(point.Y, pointF.Y) && !TuDocument.IsApprox(point.X, pointF.X)) {
                    const segInfo: SegInfo = new SegInfo();
                    segInfo.Layer = Math.floor((point.Y / single));
                    const point1: CGPoint = goLink.getPoint(0);
                    const goLink1: TuLink = goLink;
                    const pointF1: CGPoint = goLink1.getPoint(goLink1.PointsCount - 1);
                    segInfo.First = point1.X * point1.X + point1.Y;
                    segInfo.Last = pointF1.X * pointF1.X + pointF1.Y;
                    segInfo.ColumnMin = Math.min(point.X, pointF.X);
                    segInfo.ColumnMax = Math.max(point.X, pointF.X);
                    segInfo.Index = i;
                    segInfo.Link = as(routable, Types.ITuLink);
                    if ((i + 2) < goLink.PointsCount) {
                        const point2: CGPoint = goLink.getPoint(i - 1);
                        const pointF2: CGPoint = goLink.getPoint(i + 2);
                        let int323: number = 0;
                        if (point2.Y < point.Y) {
                            if (pointF2.Y >= point.Y) {
                                int323 = (point.X >= pointF.X ? 1 : 2);
                            }
                            else {
                                int323 = 3;
                            }
                        }
                        else if (point2.Y > point.Y) {
                            if (pointF2.Y <= point.Y) {
                                int323 = (pointF.X >= point.X ? 1 : 2);
                            }
                            else {
                                int323 = 0;
                            }
                        }
                        segInfo.Turns = int323;
                    }
                    segInfos.Add(segInfo);
                }
            }
        });

        if (segInfos.Count > 1) {
            segInfos.Sort(SegInfoComparer.Default);
            for (let j = 0; j < segInfos.Count; j = int32) {
                const layer: float = segInfos[j].Layer;
                int32 = (j + 1);
                while (int32 < segInfos.Count && segInfos[int32].Layer === layer) {
                    int32++;
                }
                if ((int32 - j) > 1) {
                    for (let k = j; k < int32; k = l) {
                        let columnMax: float = segInfos[k].ColumnMax;
                        for (l = (j + 1); l < int32 && segInfos[l].ColumnMin < columnMax; l++) {
                            columnMax = Math.max(columnMax, segInfos[l].ColumnMax);
                        }
                        const int324: number = (l - k);
                        if (int324 > 1) {
                            segInfos.Sort(k, int324, SegInfoComparer2.DefaultLast);
                            let int325: number = 1;
                            let last: float = segInfos[k].Last;
                            for (let m = k; m < l; m++) {
                                const item: SegInfo = segInfos[m];
                                if (item.Last !== last) {
                                    int325++;
                                    last = item.Last;
                                }
                            }
                            segInfos.Sort(k, int324, SegInfoComparer2.DefaultFirst);
                            let int326 = 1;
                            last = segInfos[k].First;
                            for (let n = k; n < l; n++) {
                                const item1: SegInfo = segInfos[n];
                                if (item1.First !== last) {
                                    int326++;
                                    last = item1.First;
                                }
                            }
                            if (int325 >= int326) {
                                flag = true;
                                int321 = int326;
                                last = segInfos[k].First;
                            }
                            else {
                                flag = false;
                                int321 = int325;
                                last = segInfos[k].Last;
                                segInfos.Sort(k, int324, SegInfoComparer2.DefaultLast);
                            }
                            const single1: float = layer * single + single / 2;
                            let int327: number = 0;
                            for (let o = k; o < l; o++) {
                                const segInfo1: SegInfo = segInfos[o];
                                if ((flag ? segInfo1.First : segInfo1.Last) !== last) {
                                    int327++;
                                    last = (flag ? segInfo1.First : segInfo1.Last);
                                }
                                const stroke: TuLink = TuDocument.GetStroke(segInfo1.Link.TuObject);
                                const point3: CGPoint = stroke.getPoint(segInfo1.Index);
                                const pointF3: CGPoint = stroke.getPoint((segInfo1.Index + 1));
                                const single2: float = this.myLinkSpacing * (int327 - (int321 - 1) / 2);
                                if (!stroke.AvoidsNodes || this.isUnoccupied2(point3.X, single1 + single2, pointF3.X, single1 + single2)) {
                                    int322++;
                                    stroke.setPoint(segInfo1.Index, new CGPoint(point3.X, single1 + single2));
                                    stroke.setPoint((segInfo1.Index + 1), new CGPoint(pointF3.X, single1 + single2));
                                }
                            }
                        }
                    }
                }
            }
        }

        return int322;
    }

    private adjustOverlapsV(routables: ITuCollection): number {
        let int32: number = 0;
        let l: number = 0;
        let flag: boolean;
        let int321: number;
        const single: float = (this.myPositions != null ? this.myPositions.CellSize.Width : 8);
        let int322: number = 0;
        const segInfos: List<SegInfo> = new List<SegInfo>();
        foreach(routables, (routable: TuObject) => {
            const goLink: TuLink = as(routable, Types.TuLink);
            if (goLink == null || !goLink.Orthogonal || goLink.Style === TuStrokeStyle.Bezier) {
                return CONTINUE;
            }
            for (let i = 2; i < (goLink.PointsCount - 3); i++) {
                const point: CGPoint = goLink.getPoint(i);
                const pointF: CGPoint = goLink.getPoint((i + 1));
                if (TuDocument.IsApprox(point.X, pointF.X) && !TuDocument.IsApprox(point.Y, pointF.Y)) {
                    const segInfo: SegInfo = new SegInfo();
                    segInfo.Layer = Math.floor((point.X / single));
                    const point1: CGPoint = goLink.getPoint(0);
                    const goLink1: TuLink = goLink;
                    const pointF1: CGPoint = goLink1.getPoint(goLink1.PointsCount - 1);
                    segInfo.First = point1.X + point1.Y * point1.Y;
                    segInfo.Last = pointF1.X + pointF1.Y * pointF1.Y;
                    segInfo.ColumnMin = Math.min(point.Y, pointF.Y);
                    segInfo.ColumnMax = Math.max(point.Y, pointF.Y);
                    segInfo.Index = i;
                    segInfo.Link = as(routable, Types.ITuLink);
                    if ((i + 2) < goLink.PointsCount) {
                        const point2: CGPoint = goLink.getPoint(i - 1);
                        const pointF2: CGPoint = goLink.getPoint(i + 2);
                        let int323: number = 0;
                        if (point2.X < point.X) {
                            if (pointF2.X >= point.X) {
                                int323 = (point.Y >= pointF.Y ? 1 : 2);
                            }
                            else {
                                int323 = 3;
                            }
                        }
                        else if (point2.X > point.X) {
                            if (pointF2.X <= point.X) {
                                int323 = (pointF.Y >= point.Y ? 1 : 2);
                            }
                            else {
                                int323 = 0;
                            }
                        }
                        segInfo.Turns = int323;
                    }
                    segInfos.Add(segInfo);
                }
            }
        });
        {

        }
        if (segInfos.Count > 1) {
            segInfos.Sort(SegInfoComparer.Default);
            for (let j = 0; j < segInfos.Count; j = int32) {
                const layer: float = segInfos[j].Layer;
                int32 = (j + 1);
                while (int32 < segInfos.Count && segInfos[int32].Layer == layer) {
                    int32++;
                }
                if ((int32 - j) > 1) {
                    for (let k = j; k < int32; k = l) {
                        let columnMax: float = segInfos[k].ColumnMax;
                        for (l = (j + 1); l < int32 && segInfos[l].ColumnMin < columnMax; l++) {
                            columnMax = Math.max(columnMax, segInfos[l].ColumnMax);
                        }
                        const int324: number = (l - k);
                        if (int324 > 1) {
                            segInfos.Sort(k, int324, SegInfoComparer2.DefaultLast);
                            let int325: number = 1;
                            let last: float = segInfos[k].Last;
                            for (let m = k; m < l; m++) {
                                const item: SegInfo = segInfos[m];
                                if (item.Last !== last) {
                                    int325++;
                                    last = item.Last;
                                }
                            }
                            segInfos.Sort(k, int324, SegInfoComparer2.DefaultFirst);
                            let int326: number = 1;
                            last = segInfos[k].First;
                            for (let n = k; n < l; n++) {
                                const item1: SegInfo = segInfos[n];
                                if (item1.First !== last) {
                                    int326++;
                                    last = item1.First;
                                }
                            }
                            if (int325 >= int326) {
                                flag = true;
                                int321 = int326;
                                last = segInfos[k].First;
                            }
                            else {
                                flag = false;
                                int321 = int325;
                                last = segInfos[k].Last;
                                segInfos.Sort(k, int324, SegInfoComparer2.DefaultLast);
                            }
                            const single1: float = layer * single + single / 2;
                            let int327: number = 0;
                            for (let o = k; o < l; o++) {
                                let segInfo1: SegInfo = segInfos[o];
                                if ((flag ? segInfo1.First : segInfo1.Last) !== last) {
                                    int327++;
                                    last = (flag ? segInfo1.First : segInfo1.Last);
                                }
                                const stroke: TuLink = TuDocument.GetStroke(segInfo1.Link.TuObject);
                                const point3: CGPoint = stroke.getPoint(segInfo1.Index);
                                const pointF3: CGPoint = stroke.getPoint((segInfo1.Index + 1));
                                const single2: float = this.myLinkSpacing * (int327 - ((int321 - 1)) / 2);
                                if (!stroke.AvoidsNodes || this.isUnoccupied2(single1 + single2, point3.Y, single1 + single2, pointF3.Y)) {
                                    int322++;
                                    stroke.setPoint(segInfo1.Index, new CGPoint(single1 + single2, point3.Y));
                                    stroke.setPoint((segInfo1.Index + 1), new CGPoint(single1 + single2, pointF3.Y));
                                }
                            }
                        }
                    }
                }
            }
        }
        return int322;
    }

    private static alreadyCopied(copieds: Dictionary<TuObject, boolean>, o: TuObject): boolean {
        let flag: Out<boolean> = New.Out();
        for (let i: TuObject = o; i != null; i = i.Parent) {
            if (copieds.TryGetValue(i, flag)) {
                return true;
            }
        }
        return false;
    }

    private avoidOrthogonalOverlaps(routables: any[]): void {
        const goCollections: TuCollection = new TuCollection();
        const objArray: any[] = routables;
        for (let i = 0; i < objArray.length; i++) {
            goCollections.Add(objArray[i]);
        }
        const rectangleF: Out<CGRectangle> = { value: TuDocument.ComputeBounds(goCollections, undefined) };
        const sizeF: CGSize = (this.myPositions != null ? this.myPositions.CellSize : new CGSize(8, 8));
        GeomUtilities.InflateRect(rectangleF, sizeF.Width, sizeF.Height);
        goCollections.Clear();
        this.pickObjectsInRectangle(rectangleF.value, TuPickInRectangleStyle.AnyIntersectsBounds, goCollections, 999999);
        const goCollections1: TuCollection = new TuCollection();
        foreach(goCollections, (goCollection: TuObject) => {
            if (!is.typeof(goCollection, Types.ITuRoutable)) {
                return CONTINUE;
            }
            const stroke: TuLink = TuDocument.GetStroke(goCollection);
            if (stroke == null || !GeomUtilities.IntersectsRect(stroke.Bounds, rectangleF.value)) {
                return CONTINUE;
            }
            goCollections1.Add(stroke);
        });

        if (this.adjustOverlapsH(goCollections1) > 0 || this.adjustOverlapsV(goCollections1) > 0) {
            this.adjustOverlapsH(goCollections1);
            this.adjustOverlapsV(goCollections1);
        }
    }

    public beginUpdateViews(): void {
        this.RaiseChanged(TuDocumentEvents.BeginUpdateAllViews, 0, undefined, 0, undefined, NullRect, 0, undefined, NullRect);
    }

    public /* virtual */  CanCopyObjects(): boolean {
        return this.AllowCopy;
    }
    public /* virtual */ CanDeleteObjects(): boolean {
        return this.AllowDelete;
    }
    public /* virtual */ CanEditObjects(): boolean {
        return this.AllowEdit;
    }
    public /* virtual */ CanInsertObjects(): boolean {
        return this.AllowInsert;
    }

    public /* virtual */ CanLinkObjects(): boolean {
        return this.AllowLink;
    }

    public /* virtual */ CanMoveObjects(): boolean {
        return this.AllowMove;
    }

    public /* virtual */ CanRedo(): boolean {
        const undoManager: TuUndoManager = this.UndoManager;
        if (undoManager == null) {
            return false;
        }
        return undoManager.CanRedo();
    }
    public /* virtual */ CanReshapeObjects(): boolean {
        return this.AllowReshape;
    }

    public /* virtual */ CanResizeObjects(): boolean {
        return this.AllowResize;
    }
    public /* virtual */ CanSelectObjects(): boolean {
        return this.AllowSelect;
    }
    public /* virtual */ CanUndo(): boolean {
        const undoManager: TuUndoManager = this.UndoManager;
        if (undoManager == null) {
            return false;
        }
        return undoManager.CanUndo();
    }

    public /* virtual */ ChangeValue(e: TuChangedEventArgs, undo: boolean): void {
        let hint: number = e.Hint;
        switch (hint) {
            case 201:
                {
                    this.Name = e.getValue(undo);
                    return;
                }
            case 202:
                {
                    this.Size = e.getSize(undo);
                    return;
                }
            case 203:
                {
                    this.TopLeft = e.getPoint(undo);
                    return;
                }
            case 204:
                {
                    this.FixedSize = e.getValue(undo);
                    return;
                }
            case 205:
                {
                    this.PaperColor = e.getValue(undo);
                    return;
                }
            case 206:
                {
                    this.DataFormat = e.getValue(undo);
                    return;
                }
            case 207:
                {
                    this.AllowSelect = e.getValue(undo);
                    return;
                }
            case 208:
                {
                    this.AllowMove = e.getValue(undo);
                    return;
                }
            case 209:
                {
                    this.AllowCopy = e.getValue(undo);
                    return;
                }
            case 210:
                {
                    this.AllowResize = e.getValue(undo);
                    return;
                }
            case 211:
                {
                    this.AllowReshape = e.getValue(undo);
                    return;
                }
            case 212:
                {
                    this.AllowDelete = e.getValue(undo);
                    return;
                }
            case 213:
                {
                    this.AllowInsert = e.getValue(undo);
                    return;
                }
            case 214:
                {
                    this.AllowLink = e.getValue(undo);
                    return;
                }
            case 215:
                {
                    this.AllowEdit = e.getValue(undo);
                    return;
                }
            case 216:
            case 217:
            case 218:
            case 219:
            case 229:
            case 230:
            case 231:
            case 232:
            case 233:
            case 234:
            case 235:
            case 236:
            case 237:
            case 238:
            case 239:
            case 240:
                {
                    if (e.Hint >= 10000) {
                        hint = e.Hint;
                        throw new ArgumentException(TString.Concat("Unknown TuChangedEventArgs hint--override GoDocument.ChangeValue to handle the Hint: ", hint.toString()));
                    }
                    return;
                }
            case 220:
                {
                    this.internalArrange(e.getValue(undo));
                    this.InvalidateViews();
                    return;
                }
            case 221:
                {
                    this.UserFlags = e.getInt(undo);
                    return;
                }
            case 222:
                {
                    this.UserObject = e.getValue(undo);
                    return;
                }
            case 223:
                {
                    this.LinksLayer = e.getValue(undo);
                    return;
                }
            case 224:
                {
                    this.MaintainsPartID = e.getValue(undo);
                    return;
                }
            case 225:
                {
                    this.ValidCycle = e.getInt(undo);
                    return;
                }
            case 226:
                {
                    this.LastPartID = e.getInt(undo);
                    return;
                }
            case 227:
                {
                    this.WorldScale = e.getSize(undo);
                    return;
                }
            case 228:
                {
                    this.RoutingTime = e.getInt(undo);
                    return;
                }
            case 241:
                {
                    this.Initializing = e.getValue(undo);
                    return;
                }
            default:
                {
                    switch (hint) {
                        case 801:
                            {
                                const obj: TuLayer = e.Object;
                                if (undo) {
                                    this.Layers.Remove(obj);
                                    return;
                                }
                                const oldValue: TuLayer = e.OldValue;
                                if (e.SubHint === 1) {
                                    this.Layers.InsertAfter(oldValue, obj);
                                    return;
                                }
                                this.Layers.InsertBefore(oldValue, obj);
                                return;
                            }
                        case 802:
                            {
                                const goLayers: TuLayer = e.Object;
                                if (!undo) {
                                    this.Layers.Remove(goLayers);
                                    return;
                                }
                                const oldValue1: TuLayer = e.OldValue;
                                if (oldValue1 != null) {
                                    this.Layers.InsertBefore(oldValue1, goLayers);
                                    return;
                                }
                                this.Layers.InsertAfter(this.Layers.Top, goLayers);
                                return;
                            }
                        case 803:
                            {
                                const goLayers1: TuLayer = e.OldValue;
                                const oldInt: number = e.OldInt;
                                const newInt: number = e.NewInt;
                                if (undo) {
                                    this.Layers.MoveInCollection(oldInt, goLayers1, newInt, true);
                                    return;
                                }
                                this.Layers.MoveInCollection(newInt, goLayers1, oldInt, true);
                                return;
                            }
                        case 804:
                            {
                                const value: TuLayer = e.getValue(undo);
                                this.Layers.Default = value;
                                return;
                            }
                        default:
                            {
                                switch (hint) {
                                    case 901:
                                        {
                                            const goObject: TuObject = e.TuObject;
                                            const initializing: boolean = goObject.Initializing;
                                            goObject.Initializing = true;
                                            goObject.ChangeValue(e, undo);
                                            goObject.Initializing = initializing;
                                            return;
                                        }
                                    case 902:
                                        {
                                            const newValue: TuLayer = e.NewValue;
                                            const goObject1: TuObject = e.TuObject;
                                            if (undo) {
                                                newValue.removeFromLayer(goObject1, true);
                                                return;
                                            }
                                            newValue.AddToLayer(goObject1, true);
                                            return;
                                        }
                                    case 903:
                                        {
                                            const oldValue2: TuLayer = e.OldValue;
                                            const goObject2: TuObject = e.TuObject;
                                            if (!undo) {
                                                oldValue2.removeFromLayer(goObject2, true);
                                                return;
                                            }
                                            oldValue2.AddToLayer(goObject2, true);
                                            oldValue2.MoveInLayerInternal(e.OldInt, goObject2, (oldValue2.Count - 1));
                                            return;
                                        }
                                    case 904:
                                        {
                                            const goObject3: TuObject = e.TuObject;
                                            const goLayers2: TuLayer = e.OldValue;
                                            const newValue1: TuLayer = e.NewValue;
                                            if (undo) {
                                                goLayers2.ChangeLayer(goObject3, newValue1, true);
                                                return;
                                            }
                                            newValue1.ChangeLayer(goObject3, goLayers2, true);
                                            return;
                                        }
                                    case 905:
                                        {
                                            const oldValue3: TuObject = e.OldValue;
                                            const layer: TuLayer = oldValue3.Layer;
                                            const int32: number = e.OldInt;
                                            const newInt1: number = e.NewInt;
                                            if (undo) {
                                                layer.MoveInLayer(int32, oldValue3, newInt1, true);
                                                return;
                                            }
                                            layer.MoveInLayer(newInt1, oldValue3, int32, true);
                                            return;
                                        }
                                    case 906:
                                    case 907:
                                    case 908:
                                    case 909:
                                    case 920:
                                    case 921:
                                    case 922:
                                    case 923:
                                    case 924:
                                    case 925:
                                    case 926:
                                    case 927:
                                    case 928:
                                    case 929:
                                        {
                                            if (e.Hint >= 10000) {
                                                hint = e.Hint;
                                                throw new ArgumentException(TString.Concat("Unknown GoChangedEventArgs hint--override GoDocument.ChangeValue to handle the Hint: ", hint.toString()));
                                            }
                                            return;
                                        }
                                    case 910:
                                        {
                                            e.Object.AllowView = e.getValue(undo);
                                            return;
                                        }
                                    case 911:
                                        {
                                            e.Object.AllowSelect = e.getValue(undo);
                                            return;
                                        }
                                    case 912:
                                        {
                                            e.Object.AllowMove = e.getValue(undo);
                                            return;
                                        }
                                    case 913:
                                        {
                                            e.Object.AllowCopy = e.getValue(undo);
                                            return;
                                        }
                                    case 914:
                                        {
                                            e.Object.AllowResize = e.getValue(undo);
                                            return;
                                        }
                                    case 915:
                                        {
                                            e.Object.AllowReshape = e.getValue(undo);
                                            return;
                                        }
                                    case 916:
                                        {
                                            e.Object.AllowDelete = e.getValue(undo);
                                            return;
                                        }
                                    case 917:
                                        {
                                            e.Object.AllowInsert = e.getValue(undo);
                                            return;
                                        }
                                    case 918:
                                        {
                                            e.Object.AllowLink = e.getValue(undo);
                                            return;
                                        }
                                    case 919:
                                        {
                                            e.Object.AllowEdit = e.getValue(undo);
                                            return;
                                        }
                                    case 930:
                                        {
                                            e.Object.Identifier = e.getValue(undo);
                                            return;
                                        }
                                    default:
                                        {
                                            if (e.Hint >= 10000) {
                                                hint = e.Hint;
                                                throw new ArgumentException(TString.Concat("Unknown GoChangedEventArgs hint--override GoDocument.ChangeValue to handle the Hint: ", hint.toString()));
                                            }
                                            return;
                                        }
                                }
                                break;
                            }
                    }
                    break;
                }

        }
    }

    public /* virtual */ Clear(): number {
        this.myParts = null;
        this.invalidatePositionArray(undefined);
        foreach(this.Layers, (layer: TuLayer) => {
            layer.Clear();
        });
        return 1;
    }

    public static ComputeBounds(coll: ITuCollection, view: TuView): CGRectangle {
        let flag: boolean = false;
        let x: float = 0;
        let y: float = 0;
        let single: float = 0;
        let y1: float = 0;
        const flag1: boolean = (view != null ? view.IsPrinting : false);
        foreach(coll, (goObject: TuObject) => {
            if ((flag1 ? !goObject.CanPrint() : !goObject.CanView())) {
                return CONTINUE;
            }
            const rectangleF: CGRectangle = goObject.ExpandPaintBounds(goObject.Bounds.clone(), view);
            if (flag) {
                if (rectangleF.X < x) {
                    x = rectangleF.X;
                }
                if (rectangleF.Y < y) {
                    y = rectangleF.Y;
                }
                if (rectangleF.X + rectangleF.Width > single) {
                    single = rectangleF.X + rectangleF.Width;
                }
                if (rectangleF.Y + rectangleF.Height <= y1) {
                    return CONTINUE;
                }
                y1 = rectangleF.Y + rectangleF.Height;
            }
            else {
                flag = true;
                x = rectangleF.X;
                y = rectangleF.Y;
                single = rectangleF.X + rectangleF.Width;
                y1 = rectangleF.Y + rectangleF.Height;
            }
        });

        if (!flag) {
            return new CGRectangle();
        }
        return new CGRectangle(x, y, single - x, y1 - y);
    }
    public computeBounds(): CGRectangle {
        return TuDocument.ComputeBounds(this, null);
    }

    public /* virtual */ Contains(obj: TuObject): boolean {
        if (obj == null) {
            return false;
        }
        const layer: TuLayer = obj.Layer;
        if (layer == null) {
            return false;
        }
        return layer.Document === this;
    }

    public /* virtual */  copy(): TuDocument {
        const goLayerCollections: TuDocument = clone(this);
        goLayerCollections.myChanged$ = undefined;
        goLayerCollections.myChangedEventArgs = undefined;
        goLayerCollections.myPositions = undefined;
        goLayerCollections.mySkippedAvoidable = undefined;
        goLayerCollections.myParts = undefined;
        goLayerCollections.myUndoManager = undefined;
        goLayerCollections.mySerializedUndoManager = undefined;
        goLayerCollections.myUndoEditIndex = -2;
        goLayerCollections.myLayers = new TuLayerCollection();
        goLayerCollections.myLinksLayer = undefined;
        goLayerCollections.myLayers.init(goLayerCollections);
        goLayerCollections.DefaultLayer.Identifier = this.DefaultLayer.Identifier;
        goLayerCollections.MergeLayersFrom(this);
        if (goLayerCollections.Layers.Count > 1) {
            const defaultLayer: TuLayer = this.Layers.Default;
            const goLayers: TuLayer = this.Layers.NextLayer(defaultLayer, -1);
            if (goLayers == null || goLayers.Identifier == null) {
                const goLayers1: TuLayer = this.Layers.NextLayer(defaultLayer, 1);
                if (goLayers1 != null && goLayers1.Identifier != null) {
                    const goLayers2: TuLayer = goLayerCollections.Layers.Find(goLayers1.Identifier);
                    goLayerCollections.Layers.MoveBefore(goLayers2, goLayerCollections.Layers.Default);
                }
            }
            else {
                const goLayers3: TuLayer = goLayerCollections.Layers.Find(goLayers.Identifier);
                goLayerCollections.Layers.MoveAfter(goLayers3, goLayerCollections.Layers.Default);
            }
        }
        goLayerCollections.CopyFromCollection(this);
        goLayerCollections.myIsModified = false;
        return goLayerCollections;
    }

    public CopyArray(): TuObject[] {
        const goObjectArray: TuObject[] = new Array(this.Count);
        this.CopyTo(goObjectArray, 0);
        return goObjectArray;
    }

    public CopyFromCollection(coll: ITuCollection, copyableOnly: boolean, dragging: boolean, offset: CGSize, env: TuCopyDictionary): TuCopyDictionary;
    public CopyFromCollection(coll: ITuCollection): TuCopyDictionary;
    public /*virtual*/ CopyFromCollection(...args: any[]): TuCopyDictionary {
        if (args.length === 0) {
            const coll = args[0];
            const sizeF: CGSize = new CGSize();
            return this.CopyFromCollection(coll, false, false, sizeF, undefined);
        } else {
            const coll: ITuCollection = args[0];
            const copyableOnly: boolean = args[1];
            const dragging: boolean = args[2];
            const offset: CGSize = args[3];
            let env: TuCopyDictionary = args[4];

            if (env == null) {
                env = this.createCopyDictionary();
            }
            env.SourceCollection = coll;
            const goObjects: Dictionary<TuObject, boolean> = new Dictionary<TuObject, boolean>();
            let goCollections: TuCollection = null;
            const goCollections1: TuCollection = new TuCollection({
                internalChecksForDuplicates: false
            });

            let goCollections2: TuCollection = null;
            foreach(coll, (goObject: TuObject) => {
                const goObject1: TuObject = (dragging ? goObject.DraggingObject : goObject);
                if (goObject1 == null || copyableOnly && !goObject1.CanCopy() || TuDocument.alreadyCopied(goObjects, goObject1)) {
                    return CONTINUE;
                }
                if (goCollections != null && is.typeof(goObject1, Types.TuGroup)) {
                    foreach(goCollections, (goObject2: TuObject) => {
                        if (!goObject2.isChildOf(goObject1)) {
                            return CONTINUE;
                        }
                        goObjects.Remove(goObject2);
                        if (goCollections2 == null) {
                            goCollections2 = new TuCollection({
                                internalChecksForDuplicates: false
                            });
                        }
                        goCollections2.Add(goObject2);
                        goCollections1.Remove(goObject2);
                    });

                    if (goCollections2 != null && !goCollections2.IsEmpty) {
                        foreach(goCollections2, (goCollection: TuObject) => {
                            goCollections.Remove(goCollection);
                        });

                        goCollections2.Clear();
                    }
                }
                goObjects.Add(goObject1, true);
                if (!goObject1.IsTopLevel) {
                    if (goCollections == null) {
                        goCollections = new TuCollection(
                            {
                                internalChecksForDuplicates: false
                            });
                    }
                    goCollections.Add(goObject1);
                }
                goCollections1.Add(goObject1);
            });

            let location: CGPoint = new CGPoint();
            foreach(goCollections1, (goCollection1: TuObject) => {
                let item: TuObject = as(env.Get(goCollection1), Types.TuObject);
                if (item != null) {
                    return CONTINUE;
                }
                item = env.copy(goCollection1);
                if (item == null) {
                    return CONTINUE;
                }
                location = item.Location;
                const goObject3: TuObject = item;
                goObject3.Location = goObject3.ComputeMove(location, new CGPoint(location.X + offset.Width, location.Y + offset.Height));
                const layer: TuLayer = goCollection1.Layer;
                let defaultLayer: TuLayer = undefined;
                if (layer != null) {
                    defaultLayer = (layer.Document !== this ? this.Layers.Find(layer.Identifier) : layer);
                }
                if (defaultLayer == null) {
                    defaultLayer = this.DefaultLayer;
                }
                if (copyableOnly && !defaultLayer.CanInsertObjects()) {
                    return CONTINUE;
                }
                defaultLayer.Add(item);
            });

            env.finishDelayedCopies();
            return env;
        }
    }

    public /* virtual */  copyNewValueForRedo(e: TuChangedEventArgs): void {
        const hint: number = e.Hint;
        if (hint !== 220) {
            if (hint !== 901) {
                return;
            }
            e.TuObject.CopyNewValueForRedo(e);
            return;
        }
        if (!e.IsBeforeChanging) {
            e.NewValue = this.internalCopy();
        }
    }
    public /* virtual */ copyOldValueForUndo(e: TuChangedEventArgs): void {
        const hint: number = e.Hint;
        if (hint !== 220) {
            if (hint !== 901) {
                return;
            }
            e.TuObject.CopyOldValueForUndo(e);
            return;
        }
        if (e.IsBeforeChanging) {
            e.OldValue = this.internalCopy();
        }
    }

    public /* virtual */ CopyTo(array: TuObject[], index: number): TuObject[] {
        foreach(this.Layers, (layer: TuLayer) => {
            foreach(layer, (goObject: TuObject) => {
                if (index < array.length) {
                    const int32: number = index;
                    index = int32 + 1;
                    array[int32] = goObject;
                }
            });
        });
        return array;

    }

    public /* virtual */ createCopyDictionary(): TuCopyDictionary {
        return new TuCopyDictionary(
            {
                DestinationDocument: this
            });
    }

    public /*virtual*/ DoDelayedRouting(moved: ITuCollection) {
        if (moved && !moved.IsEmpty) {
            if ((this.RoutingTime & TuRoutingTime.AfterNodesDragged) === TuRoutingTime.AfterNodesDragged) {
                let goCollections: TuCollection = undefined;
                foreach(moved, (goObject: TuObject) => {
                    if (goObject.Document !== this || !this.isAvoidable(goObject)) {
                        return;
                    }
                    if (goCollections) {
                        goCollections.Clear();
                    }
                    else {
                        goCollections = new TuCollection();
                    }
                    const outBounds = { value: goObject.Bounds };
                    GeomUtilities.InflateRect(outBounds, 1, 1);
                    this.pickObjectsInRectangle(outBounds.value, TuPickInRectangleStyle.AnyIntersectsBounds, goCollections, 999999);
                    foreach(goCollections, (goCollection: TuObject) => {
                        const goRoutable: ITuRoutable = as(goCollection, Types.ITuRoutable);
                        if (goRoutable == null) {
                            return;
                        }
                        const stroke: TuLink = TuDocument.GetStroke(goCollection);
                        if (stroke == null) {
                            this.DelayedRoutings.Add(goRoutable);
                        }
                        else {
                            if (!stroke.intersectsRectangle(outBounds.value)) {
                                return;
                            }
                            this.DelayedRoutings.Add(goRoutable);
                        }
                    });
                });

            }
            if ((this.RoutingTime & TuRoutingTime.AfterLinksDragged) === TuRoutingTime.AfterLinksDragged) {
                foreach(moved, (goObject1: TuObject) => {
                    const goRoutable1: ITuRoutable = as(goObject1, Types.ITuRoutable);
                    if (goRoutable1 == null) {
                        return CONTINUE;
                    }
                    this.DelayedRoutings.Add(goRoutable1);
                });
            }
        }
        while (!this.DelayedRoutings.IsEmpty) {
            const objArray: any[] = this.DelayedRoutings.CopyArray();
            this.DelayedRoutings.Clear();
            const objArray1: any[] = objArray;
            for (let i = 0; i < objArray1.length; i++) {
                const goRoutable2: ITuRoutable = as(objArray1[i], Types.ITuRoutable);
                if (goRoutable2 != null) {
                    goRoutable2.calculateRoute();
                }
            }
            if (!this.myAvoidsOrthogonalLinks) {
                continue;
            }
            this.avoidOrthogonalOverlaps(objArray);
        }
    }

    public endUpdateViews(): void {
        this.RaiseChanged(TuDocumentEvents.EndUpdateAllViews, 0, undefined, 0, undefined, NullRect, 0, undefined, NullRect);
    }

    public /*virtual*/ ensureUniquePartID() {
        if (this.myParts == null) {
            // TODO: Set dictionarty kağpa
            this.myParts = new Dictionary<number, ITuIdentifiablePart>(/*1000*/);
        }
        const keyValuePairs: List<IKeyValuePair<number, ITuIdentifiablePart>> = new List<IKeyValuePair<number, ITuIdentifiablePart>>();
        foreach(this.myParts, (myPart: IKeyValuePair<number, ITuIdentifiablePart>) => {
            const key = myPart.key;
            if (myPart.value.PartID === key) {
                return;
            }
            keyValuePairs.Add(myPart);
        });

        foreach(keyValuePairs, (keyValuePair: IKeyValuePair<number, ITuIdentifiablePart>) => {
            const int32 = keyValuePair.key;
            const value: ITuIdentifiablePart = keyValuePair.value;
            const partID = value.PartID;
            if (this.myParts.ContainsKey(partID)) {
                value.PartID = int32;
            }
            else {
                this.myParts.Remove(int32);
                this.myParts.Set(partID, value);
            }
        });

        let int321 = -1;
        foreach(this, (goObject: TuObject) => {
            int321 = Math.max(int321, this.maxPartID(goObject));
        });

        this.myLastPartID = Math.max(this.myLastPartID, int321);
        foreach(this, (goObject1: TuObject) => {
            this.addAllParts(goObject1);
        });

    }


    public  /*virtual*/ findNode(s: string): TuObject;
    public /*virtual*/ findNode(s: string, prefix: boolean, ignorecase: boolean): TuObject;
    public /*virtual*/ findNode(s: string, prefix: boolean, ignorecase: boolean, insidesubgraph: boolean): TuObject;
    public /*virtual*/ findNode(...args: any[]): TuObject {
        if (args.length === 1) {
            return this.findNode(args[0], false, false, false);
        } else if (args.length === 3) {
            return this.findNode(args[0], args[1], args[2], false);
        } else if (args.length === 4) {
            const s: string = args[0];
            const prefix: boolean = args[1];
            const ignorecase: boolean = args[2];
            const insidesubgraph: boolean = args[3];
            if (s == null) {
                return null;
            }
            let upper: string = s;
            if (ignorecase) {
                upper = upper.toUpperCase();
            }
            return this.findNodeInternal(this, upper, prefix, ignorecase, insidesubgraph);
        }
    }

    private findNodeInternal(coll: ITuCollection, search: string, prefix: boolean, ignorecase: boolean, insidesubgraph: boolean): TuObject {
        let goObject: TuObject;
        using(coll.GetEnumerator(), (enumerator: IEnumerator<TuObject>) => {
            while (enumerator.MoveNext()) {
                const current: TuObject = enumerator.Current;
                const goLabeledPart: ITuLabeledPart = as(current, Types.ITuLabeledPart);
                if (goLabeledPart == null) {
                    continue;
                }
                let text = goLabeledPart.Text;
                if (ignorecase) {
                    text = text.toUpperCase();
                }
                if (prefix) {
                    if (text.startsWith(search)) {
                        goObject = current;
                        return goObject;
                    }
                }
                else if (text === search) {
                    goObject = current;
                    return goObject;
                }
                if (!insidesubgraph) {
                    continue;
                }
                const goSubGraphBase: TuSubGraphBase = as(current, Types.TuSubGraphBase);
                if (goSubGraphBase == null) {
                    continue;
                }
                const goObject1: TuObject = this.findNodeInternal(goSubGraphBase, search, prefix, ignorecase, insidesubgraph);
                if (goObject1 == null) {
                    continue;
                }
                goObject = goObject1;
                return goObject;
            }
            return undefined;
        });
        return goObject;
    }

    public findPart(id: number): ITuIdentifiablePart {
        let goIdentifiablePart: Out<ITuIdentifiablePart>;
        if (this.myParts == null) {
            return undefined;
        }
        if (!this.myParts.TryGetValue(id, goIdentifiablePart)) {
            return null;
        }
        return goIdentifiablePart.value;
    }


    public /*virtual*/ finishTransaction(tname: string): boolean {
        const undoManager: TuUndoManager = this.UndoManager;
        if (undoManager == null) {
            return false;
        }
        return undoManager.finishTransaction(tname);
    }

    public /*virtual*/ getAvoidableRectangle(obj: TuObject): CGRectangle {
        const bounds = obj.ExpandPaintBounds(obj.Bounds.clone(), undefined);
        return bounds;
    }

    public /*virtual*/  GetEnumerator(): TuLayerCollectionObjectEnumerator {
        return this.Layers.GetObjectEnumerator(true);
    }


    public getPositions(): TuPositionArray;
    public getPositions(clearunoccupied: boolean, skip: TuObject): TuPositionArray;
    public getPositions(...args: any[]): TuPositionArray {

        if (args.length === 0) {
            return this.getPositions(true, undefined);
        } else if (args.length === 2) {
            if (this.myPositions == null) {
                this.myPositions = new TuPositionArray();
            }
            if (this.myPositions.Invalid) {
                const rectangleF: Out<CGRectangle> = { value: this.computeBounds() };
                GeomUtilities.InflateRect(rectangleF, 200 * this.WorldEpsilon, 200 * this.WorldEpsilon);
                this.myPositions.initialize(rectangleF.value);
                foreach(this, (goObject: TuObject) => {
                    this.getPositions1(goObject, args[1]);
                });

                this.myPositions.Invalid = false;
            }
            else if (args[0]) {
                this.myPositions.clearAllUnoccupied();
            }
            return this.myPositions;
        }
    }

    private getPositions1(obj: TuObject, skip: TuObject) {
        if (obj === skip) {
            return;
        }
        const goSubGraphBase: TuSubGraphBase = as(obj, Types.TuSubGraphBase);
        if (goSubGraphBase) {
            foreach(goSubGraphBase, (goObject: TuObject) => {
                this.getPositions1(goObject, skip);
            });
        }
        else if (this.isAvoidable(obj)) {
            const avoidableRectangle: CGRectangle = this.getAvoidableRectangle(obj);
            const width = this.myPositions.CellSize.Width;
            const height = this.myPositions.CellSize.Height;
            const x = avoidableRectangle.X + avoidableRectangle.Width;
            const y = avoidableRectangle.Y + avoidableRectangle.Height;
            for (let i = avoidableRectangle.X; i < x; i = i + width) {
                for (let j = avoidableRectangle.Y; j < y; j = j + height) {
                    this.myPositions.setOccupied(i, j);
                }
                this.myPositions.setOccupied(i, y);
            }
            for (let k = avoidableRectangle.Y; k < y; k = k + height) {
                this.myPositions.setOccupied(x, k);
            }
            this.myPositions.setOccupied(x, y);
        }
    }

    private static GetStroke(obj: TuObject): TuLink {
        const goLink: TuLink = as(obj, Types.TuLink);
        if (goLink != null) {
            return goLink;
        }
        const goLabeledLink: TuLabeledLink = as(obj, Types.TuLabeledLink);
        if (goLabeledLink == null) {
            return undefined;
        }
        return goLabeledLink.RealLink;
    }

    private internalArrange(copy: List<IKeyValuePair<TuObject, any>>) {
        let item: IKeyValuePair<TuObject, any>;

        if (copy == null) {
            return;
        }
        const suspendsRouting = this.SuspendsRouting;
        try {
            if (!suspendsRouting) {
                this.DelayedRoutings.Clear();
            }
            this.SuspendsRouting = true;
            for (let i = 0; i < copy.Count; i++) {
                const key: TuObject = copy[i].key;
                const goLink: TuLink = as(key, Types.TuLink);
                if (goLink == null) {
                    const goLabeledLink: TuLabeledLink = as(key, Types.TuLabeledLink);
                    if (goLabeledLink == null) {
                        item = copy[i];
                        key.Bounds = as(item.value, CoreGraphicTypes.CGRectangle);
                        const goRoutable: ITuRoutable = as(key, Types.ITuRoutable);
                        if (goRoutable != null) {
                            goRoutable.updateRoute();
                        }
                    }
                    else {
                        item = copy[i];
                        const value: CGPoint[] = item.value as CGPoint[];
                        goLabeledLink.RealLink.setPoints(value);
                    }
                }
                else {
                    item = copy[i];
                    goLink.setPoints(item.value as CGPoint[]);
                }
            }
        }
        finally {
            this.SuspendsRouting = suspendsRouting;
            if (!suspendsRouting) {
                this.DoDelayedRouting(undefined);
            }
        }
    }

    private internalCopy(): List<IKeyValuePair<TuObject, any>> {
        const keyValuePairs: List<IKeyValuePair<TuObject, any>> = new List<IKeyValuePair<TuObject, any>>();
        foreach(this, (goObject: TuObject) => {
            if (is.typeof<ITuLink>(goObject, Types.ITuLink) || is.typeof<TuLabeledLink>(goObject, Types.TuLabeledLink)) {
                return CONTINUE;
            }
            keyValuePairs.Add({ key: goObject, value: goObject.Bounds });


        });

        foreach(this, (goObject1: TuObject) => {
            const goLink: TuLink = as(goObject1, Types.TuLink);
            if (goLink == null) {
                const goLabeledLink: TuLabeledLink = as(goObject1, Types.TuLabeledLink);
                if (goLabeledLink == null) {
                    return CONTINUE;
                }
                const pointFArray: CGPoint[] = goLabeledLink.RealLink.copyPointsArray();
                keyValuePairs.Add({ key: goObject1, value: pointFArray });
            }
            else {
                keyValuePairs.Add({ key: goObject1, value: goLink.copyPointsArray() });
            }
        });
        return keyValuePairs;
    }

    private invalidatePositionArray(obj: TuObject) {
        this.mySkippedAvoidable = undefined;
        if (this.myPositions && !this.myPositions.Invalid && (obj == null ||
            this.isAvoidable(obj))) {
            this.myPositions.Invalid = true;
        }
    }

    public InvalidateViews() {
        this.RaiseChanged(100, 0, undefined, 0, undefined, NullRect, 0, undefined, NullRect);
    }

    private static IsApprox(a: number, b: number): boolean {
        const single: number = a - b;
        if (single <= -1) {
            return false;
        }
        return single < 1;
    }

    public /*virtual*/  isAvoidable(obj: TuObject): boolean {
        return is.typeof<ITuNode>(obj, Types.ITuNode);
    }

    public isUnoccupied(r: CGRectangle, skip: TuObject): boolean {
        if (skip !== this.mySkippedAvoidable) {
            this.invalidatePositionArray(undefined);
            this.mySkippedAvoidable = skip;
        }
        return this.getPositions(false, skip).isUnoccupied(r.X, r.Y, r.Width, r.Height);
    }

    private isUnoccupied2(px: number, py: number, qx: number, qy: number): boolean {
        const single = Math.min(px, qx);
        const single1 = Math.min(py, qy);
        const single2 = Math.max(px, qx);
        const single3 = Math.max(py, qy);
        return this.isUnoccupied(new CGRectangle({ x: single, y: single1, width: single2 - single, height: single3 - single1 }), undefined);
    }

    private invokeOnChanged(hint: number, subhint: number, obj: any, oldI: number, oldVal: any, oldRect: CGRectangle,
        newI: number, newVal: any, newRect: CGRectangle, before: boolean) {
        if (this.SuspendsUpdates) {
            return;
        }
        let goChangedEventArg: TuChangedEventArgs;
        /* lock(this)
        { */
        goChangedEventArg = this.myChangedEventArgs;
        this.myChangedEventArgs = undefined;
        //}
        if (goChangedEventArg == null) {
            goChangedEventArg = new TuChangedEventArgs();
            goChangedEventArg.Document = this;

        }
        goChangedEventArg.IsBeforeChanging = before;
        goChangedEventArg.Hint = hint;
        goChangedEventArg.SubHint = subhint;
        goChangedEventArg.Object = obj;
        goChangedEventArg.OldInt = oldI;
        goChangedEventArg.OldValue = oldVal;
        goChangedEventArg.OldRect = oldRect;
        goChangedEventArg.NewInt = newI;
        goChangedEventArg.NewValue = newVal;
        goChangedEventArg.NewRect = newRect;
        this.onChanged(goChangedEventArg);
        this.myChangedEventArgs = goChangedEventArg;
        goChangedEventArg.Object = undefined;
        goChangedEventArg.OldValue = undefined;
        goChangedEventArg.NewValue = undefined;
    }

    public static MakesDirectedCycle(a: ITuNode, b: ITuNode): boolean {
        let flag: boolean;
        if (a === b) {
            return true;
        }
        /* lock (GoDocument.myCycleMap)
        { */
        TuDocument.myCycleMap.Clear();
        TuDocument.myCycleMap.Add(a, true);
        const flag1 = TuDocument.makesDirectedCycle1(a, b, TuDocument.myCycleMap);
        TuDocument.myCycleMap.Clear();
        flag = flag1;
        //}
        return flag;
    }
    private static makesDirectedCycle1(a: ITuNode, b: ITuNode, map: Dictionary<ITuNode, boolean>): boolean {
        const flag: Out<boolean> = New.Out();
        let flag1: boolean;
        if (a === b) {
            return true;
        }
        if (a == null) {
            return false;
        }
        if (b == null) {
            return false;
        }
        if (map.TryGetValue(b, flag)) {
            return false;
        }
        map.Add(b, true);
        using(b.Destinations.GetEnumerator(), (enumerator: IEnumerator<ITuNode>) => {
            while (enumerator.MoveNext()) {
                const current: ITuNode = enumerator.Current;
                if (current == b || !TuDocument.makesDirectedCycle1(a, current, map)) {
                    continue;
                }
                flag1 = true;
                return flag1;
            }
            return false;
        });

        return flag1;
    }

    public static MakesDirectedCycleFast(a: ITuNode, b: ITuNode): boolean {
        let flag: boolean;
        if (a === b) {
            return true;
        }
        if (a == null) {
            return false;
        }
        if (b == null) {
            return false;
        }
        using(b.Destinations.GetEnumerator(), (enumerator: IEnumerator<ITuNode>) => {
            while (enumerator.MoveNext()) {
                const current: ITuNode = enumerator.Current;
                if (current === b || !TuDocument.MakesDirectedCycleFast(a, current)) {
                    continue;
                }
                flag = true;
                return flag;
            }
            return false;
        });
        return flag;
    }

    public static MakesUndirectedCycle(a: ITuNode, b: ITuNode): boolean {
        let flag: boolean;
        if (a === b) {
            return true;
        }
        /* lock (GoDocument.myCycleMap)
        { */
        TuDocument.myCycleMap.Clear();
        TuDocument.myCycleMap.Add(a, true);
        const flag1: boolean = TuDocument.makesUndirectedCycle1(a, b, TuDocument.myCycleMap);
        TuDocument.myCycleMap.Clear();
        flag = flag1;
        /* } */
        return flag;
    }

    private static makesUndirectedCycle1(a: ITuNode, b: ITuNode, map: Dictionary<ITuNode, boolean>): boolean {
        let flag: Out<boolean> = New.Out(false);
        let flag1: boolean;
        if (a === b) {
            return true;
        }
        if (a == null) {
            return false;
        }
        if (b == null) {
            return false;
        }
        if (map.TryGetValue(b, flag)) {
            return false;
        }
        map.Add(b, true);
        using(b.Nodes.GetEnumerator(), (enumerator: IEnumerator<ITuNode>) => {
            while (enumerator.MoveNext()) {
                const current: ITuNode = enumerator.Current;
                if (current === b || !TuDocument.makesUndirectedCycle1(a, current, map)) {
                    continue;
                }
                flag1 = true;
                return flag1;
            }
            return false;
        });
        return flag1;
    }

    public maxPartID(obj: TuObject): number {
        let int32: number = -1;
        const goIdentifiablePart: ITuIdentifiablePart = as(obj, Types.ITuIdentifiablePart);
        if (goIdentifiablePart) {
            int32 = Math.max(int32, goIdentifiablePart.PartID);
        }
        const goGroups: TuGroup = as(obj, Types.TuGroup);
        if (goGroups) {
            foreach(goGroups.GetEnumerator(), (enumerator: TuObject) => {
                int32 = Math.max(int32, this.maxPartID(enumerator));
            });

        }
        return int32;
    }

    public /*virtual*/ MergeLayersFrom(other: TuDocument) {
        foreach(other.Layers, (layer: TuLayer) => {
            const identifier = layer.Identifier;
            if (identifier == null || this.Layers.Find(identifier)) {
                return CONTINUE;
            }
            this.Layers.createNewLayerAfter(this.Layers.Top).Identifier = identifier;
        });

        const obj = other.DefaultLayer.Identifier;
        const goLayers: TuLayer = this.Layers.Find(obj);
        if (goLayers) {
            this.DefaultLayer = goLayers;
        }
        const identifier1 = other.LinksLayer.Identifier;
        const goLayers1: TuLayer = this.Layers.Find(identifier1);
        if (goLayers1) {
            this.LinksLayer = goLayers1;
        }
    }

    protected /*virtual*/  onChanged(evt: TuChangedEventArgs) {
        if (this.myChanged$) {
            this.myChanged$(evt);
        }
        const hint = evt.Hint;
        if (!this.SkipsUndoManager) {
            const undoManager: TuUndoManager = this.UndoManager;
            if (undoManager) {
                undoManager.documentChanged(this, evt);
            }
            if ((hint < 0 || hint >= 200) && (hint != TuDocumentEvents.ChangedObject || evt.SubHint !== 1000)) {
                this.IsModified = true;
            }
        }
        if (hint !== TuLayerEvents.ChangedObject) {
            if (hint === TuLayerEvents.InsertedObject) {
                const goObject: TuObject = evt.TuObject;
                if (this.MaintainsPartID) {
                    this.addAllParts(goObject);
                }
                this.updateDocumentBounds(goObject);
                this.invalidatePositionArray(goObject);
                return;
            }
            if (hint === TuLayerEvents.RemovedObject) {
                const goObject1: TuObject = evt.TuObject;
                this.removeAllParts(goObject1);
                this.invalidatePositionArray(goObject1);
                return;
            }
            if (hint === TuLayerCollectionEvents.InsertedLayer) {
                this.invalidatePositionArray(null);
                return;
            }
            if (hint === TuLayerCollectionEvents.RemovedLayer) {
                this.invalidatePositionArray(null);
                if (evt.Object == this.LinksLayer) {
                    this.LinksLayer = this.DefaultLayer;
                }
            }
        }
        else if (evt.SubHint === TuObjectEvents.ChangedBounds) {
            const goObject2 = evt.TuObject;
            this.updateDocumentBounds(goObject2);
            this.invalidatePositionArray(goObject2);
            if (goObject2.IsTopLevel) {
                const layer: TuLayer = goObject2.Layer;
                if (layer) {
                    layer.updateCaches(goObject2, evt);
                    return;
                }
            }
        }
        else if (evt.SubHint === TuGroupEvents.InsertedObject) {
            const newValue: TuObject = as(evt.NewValue, Types.TuObject);
            if (newValue) {
                if (newValue.Layer) {
                    newValue.Layer.resetPickCache();
                }
                if (this.MaintainsPartID) {
                    this.addAllParts(newValue);
                    return;
                }
            }
        }
        else if (evt.SubHint === TuGroupEvents.RemovedObject) {
            const oldValue: TuObject = as(evt.OldValue, Types.TuObject);
            if (oldValue) {
                if (oldValue.Layer) {
                    oldValue.Layer.resetPickCache();
                }
                this.removeAllParts(oldValue);
                return;
            }
        }
        else if (evt.SubHint === TuObjectEvents.ChangedSelectable) {
            const goObject3: TuObject = evt.TuObject;
            if (goObject3 && goObject3.Layer) {
                goObject3.Layer.resetPickCache();
                return;
            }
        }
    }

    public /*virtual*/  pickObject(p: CGPoint, selectableOnly: boolean): TuObject {
        let goObject: TuObject;
        if (selectableOnly && !this.CanSelectObjects()) {
            return undefined;
        }
        const enumerator: TuLayerCollectionEnumerator = this.Layers.Backwards.GetEnumerator();
        try {
            while (enumerator.MoveNext()) {
                const goObject1: TuObject = enumerator.Current.PickObject(p, selectableOnly);
                if (goObject1 == null) {
                    continue;
                }
                goObject = goObject1;
                return goObject;
            }
            return null;
        }
        finally {
            enumerator.Dispose();
        }
        return goObject;
    }

    public /*virtual*/  pickObjects(p: CGPoint, selectableOnly: boolean, coll: ITuCollection, max: number): ITuCollection {
        let goCollections: ITuCollection;
        if (coll == null) {
            coll = new TuCollection({
                internalChecksForDuplicates: false
            });

        }
        if (selectableOnly && !this.CanSelectObjects()) {
            return coll;
        }
        const enumerator: TuLayerCollectionEnumerator = this.Layers.Backwards.GetEnumerator();
        try {
            while (enumerator.MoveNext()) {
                const current: TuLayer = enumerator.Current;
                if (coll.Count < max) {
                    current.PickObjects(p, selectableOnly, coll, max);
                }
                else {
                    goCollections = coll;
                    return goCollections;
                }
            }
            return coll;
        }
        finally {
            (enumerator).Dispose();
        }
        return goCollections;
    }

    public pickObjectsInRectangle(rect: CGRectangle, pickstyle: TuPickInRectangleStyle, coll: ITuCollection, max: number): ITuCollection {
        let goCollections: ITuCollection;
        if (coll == null) {
            coll = new TuCollection(
                {
                    internalChecksForDuplicates: false
                });
        }
        if (TuDocument.PickStyleSelectableOnly(pickstyle) && !this.CanSelectObjects()) {
            return coll;
        }
        const enumerator: TuLayerCollectionEnumerator = this.Layers.GetEnumerator();
        try {
            while (enumerator.MoveNext()) {
                const current: TuLayer = enumerator.Current;
                if (coll.Count < max) {
                    current.PickObjectsInRectangle(rect, pickstyle, coll, max);
                }
                else {
                    goCollections = coll;
                    return goCollections;
                }
            }
            return coll;
        }
        finally {
            // TODO: Implement dispose
            //((IDisposable)enumerator).Dispose();
        }
        return goCollections;
    }

    public static PickStyleAny(s: TuPickInRectangleStyle): boolean {
        return s < TuPickInRectangleStyle.SelectableOnlyContained;
    }

    public static PickStyleContained(s: TuPickInRectangleStyle): boolean {
        return (s & TuPickInRectangleStyle.AnyContained) !== 0;
    }

    public static PickStyleIntersectsBounds(s: TuPickInRectangleStyle): boolean {
        return (s & TuPickInRectangleStyle.AnyIntersectsBounds) !== 0;
    }

    public static PickStyleSelectableOnly(s: TuPickInRectangleStyle): boolean {
        return s >= TuPickInRectangleStyle.SelectableOnlyContained;
    }

    public /*virtual*/ RaiseChanged(hint: number, subhint: number, obj: any, oldI: number,
        oldVal: any, oldRect: CGRectangle, newI: number, newVal: any, newRect: CGRectangle) {
        this.invokeOnChanged(hint, subhint, obj, oldI, oldVal, oldRect, newI, newVal, newRect, false);
    }
    public /*virtual*/  RaiseChanging(hint: number, subhint: number, obj: any) {
        this.invokeOnChanged(hint, subhint, obj, 0, undefined, NullRect, 0, undefined, NullRect, true);
    }

    public /*virtual*/  Redo() {
        if (!this.CanRedo()) {
            return;
        }
        const undoManager: TuUndoManager = this.UndoManager;
        if (undoManager) {
            undoManager.redo();
        }
    }

    public /*virtual*/  Remove(obj?: TuObject): boolean {
        if (obj == null) {
            return false;
        }
        const layer: TuLayer = obj.Layer;
        if (layer == null) {
            return false;
        }
        if (layer.Document !== this) {
            throw new ArgumentException("Cannot remove object that does not belong to this document");
        }
        return layer.Remove(obj);
    }

    public removeAllParts(obj: TuObject) {
        if (this.myParts) {
            const goIdentifiablePart: ITuIdentifiablePart = as(obj, Types.ITuIdentifiablePart);
            if (goIdentifiablePart) {
                this.removePart(goIdentifiablePart);
            }
            const goGroups: TuGroup = as(obj, Types.TuGroup);
            if (goGroups) {
                foreach(goGroups.GetEnumerator(), (enumerator: TuObject) => {
                    this.removeAllParts(enumerator);
                });
            }
        }
    }
    public removePart(p: ITuIdentifiablePart) {
        if (this.myParts) {
            this.myParts.Remove(p.PartID);
        }
    }

    public ResumeRouting(old: boolean, moved: ITuCollection) {
        if (this.SuspendsRouting && !old) {
            let flag: boolean = false;
            if (moved != null) {
                foreach(moved, (goObject: TuObject) => {
                    if (goObject.Document != this) {
                        return CONTINUE;
                    }
                    flag = true;
                    if (flag || moved == null) {
                        this.DoDelayedRouting(moved);
                    }
                    return BREAK;
                });
            }
        }
        this.SuspendsRouting = old;
    }

    public /*virtual*/ SetModifiable(b: boolean) {
        this.AllowMove = b;
        this.AllowResize = b;
        this.AllowReshape = b;
        this.AllowDelete = b;
        this.AllowInsert = b;
        this.AllowLink = b;
        this.AllowEdit = b;
    }

    public /*virtual*/ StartTransaction(): boolean {
        const undoManager: TuUndoManager = this.UndoManager;
        if (undoManager == null) {
            return false;
        }
        return undoManager.StartTransaction();
    }

    public testSerialization(): TuDocument {
        /* MemoryStream memoryStream = new MemoryStream();
        ((IFormatter)(new BinaryFormatter())).Serialize(memoryStream, this);
        memoryStream.Position = (long)0;
        return ((IFormatter)(new BinaryFormatter())).Deserialize(memoryStream) as GoDocument; */
        return undefined;
    }

    public /*virtual*/ Undo() {
        if (!this.CanUndo()) {
            return;
        }
        const undoManager: TuUndoManager = this.UndoManager;
        if (undoManager) {
            undoManager.Undo();
        }
    }

    public /*virtual*/ updateDocumentBounds(obj: TuObject) {
        if (obj == null) {
            return;
        }
        if (this.FixedSize) {
            return;
        }
        const size: CGSize = this.Size;
        const topLeft: CGPoint = this.TopLeft;
        const bounds: CGRectangle = obj.Bounds;
        const single = Math.min(topLeft.X, bounds.X);
        const single1 = Math.min(topLeft.Y, bounds.Y);
        const single2 = Math.max(topLeft.X + size.Width, bounds.X + bounds.Width);
        const single3 = single2 - single;
        const single4 = Math.max(topLeft.Y + size.Height, bounds.Y + bounds.Height) - single1;
        if (single < topLeft.X || single1 < topLeft.Y) {
            this.TopLeft = new CGPoint({ x: single, y: single1 });
        }
        if (single3 > size.Width || single4 > size.Height) {
            this.Size = new CGSize({ width: single3, height: single4 });
        }
    }

    public /*virtual*/ UpdateRoute(obj: ITuRoutable) {
        if (!this.SuspendsRouting || (this.RoutingTime & TuRoutingTime.Delayed) === TuRoutingTime.Immediate) {
            obj.calculateRoute();
            return;
        }
        this.DelayedRoutings.Add(obj);
    }

    public updateViews() {
        this.RaiseChanged(TuDocumentEvents.UpdateAllViews, 0, undefined, 0, undefined, NullRect, 0, undefined, NullRect);
    }

    public get Changed$(): Event<EventHandler<TuChangedEventArgs>> {
        return this.myChanged$;
    }

    public set Changed$(value: Event<EventHandler<TuChangedEventArgs>>) {
        this.myChanged$ = value;
    }

    public importEntries(entries: IEnumerableOrArray<TuObject> | IEnumerator<TuObject>): number {
        return 0;
    }
    public toArray(): TuObject[] {
        return undefined;
    }
    public removeAt(index: number): void {

    }
}

(function staticConstructor() {
    (<any>TuDocument).myCycleMap = new Dictionary<ITuNode, boolean>();
    (<any>TuDocument).myCaching = true;
})();



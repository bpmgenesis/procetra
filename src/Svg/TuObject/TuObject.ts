import { TuObjectSvgRenderer } from './../Xml/TuObjectSvgRenderer';
import { TuPartInfo } from './../TuPartInfo';
import { TuObjectEventArgs } from './TuObjectEventArgs';
import { TuSelection } from './../TuSelection/TuSelection';
import { BottomCenter, BottomLeft, BottomRight, Middle, MiddleBottom, MiddleCenter, MiddleLeft, MiddleRight, MiddleTop, Spot, TopCenter, TopLeft, TopRight } from './../Spot';
import { Brush, Pen, Graphics } from '@tuval/graphics';
import { TuInputState } from './../TuInputState';
import { ITuHandle } from './../TuHandle/ITuHandle';
import { GeomUtilities } from './../GeomUtilities';
import { TuCopyDictionary } from './../TuCopyDictionary';
import { NullRect } from './../Globals';
import { CGRectangle, CGPoint, CGSize } from '@tuval/cg';
import { TComponent, State, React } from '@tuval/forms';
import { ClassInfo, Event, is, float, NotImplementedException, ArgumentException, TString, as, clone, foreach, Out } from '@tuval/core';
import { Types } from '../types';
import { TuLayer } from '../TuLayer/TuLayer';
import { TuGroup } from '../TuGroup/TuGroup';
import { TuCollection } from '../TuCollection/TuCollection';
import { EventHandler } from '../Forms/EventHandler';
import { TuObjectEvents } from '../TuObjectEvents';
import { TuDocument } from '../TuDocument/TuDocument';
import { TuControl } from '../TuControl/TuControl';
import { TuCollectionEnumerator } from '../TuCollection/TuCollectionEnumerator';
import { ITuLayerCollectionContainer } from '../TuLayer/ITuLayerCollectionContainer';
import { TuChangedEventArgs } from '../TuChangedEventArgs';
import { TuView } from '../TuView/TuView';
import { TuInputEventArgs } from '../TuInputEventArgs';
import { ITuPartInfoRenderer } from '../ITuPartInfoRenderer';
import { ITuNode } from '../TuNode/ITuNode';
import { TuXmlTransformer } from '../Xml/TuXmlTransformer';
import { TuSvgRenderer } from '../Xml/TuSvgRenderer';
import { ViewRenderingMode } from '../TuView/ViewRenderingMode';
import { TuHtmlRenderer } from '../Xml/TuHtmlRenderer';
import { TuObjectHtmlRenderer } from '../Xml/TuObjectHtmlRenderer';
/* internal */ const flagVisible: number = 1;
/* internal */ const flagSelectable: number = 2;
/* internal */ const flagMovable: number = 4;
/* internal */ const flagCopyable: number = 8;
/* internal */ const flagResizable: number = 16;
/* internal */ const flagReshapable: number = 32;
/* internal */ const flagDeletable: number = 64;
/* internal */ const flagEditable: number = 128;
/* internal */ const flagAutoRescales: number = 256;
/* internal */ const flagResizesRealtime: number = 512;
/* internal */ const flagShadowed: number = 1024;
/* internal */ const flagDragsNode: number = 2048;
/* internal */ const flagSuspendsUpdates: number = 4096;
/* internal */ const flagSkipsUndoManager: number = 8192;
/* internal */ const flagSkipsBoundsChanged: number = 16384;
/* internal */ const flagInvalidBounds: number = 32768;
/* internal */ const flagBeingRemoved: number = 65536;
/* internal */ const flagInitializing: number = 131072;
/* internal */ const flagReserved1: number = 262144;
/* internal */ const flagPrintable: number = 524288;
/* internal */ const flagObject1: number = 1048576;
/* internal */ const flagObject2: number = 2097152;
/* internal */ const flagObject3: number = 4194304;
/* internal */ const flagObject4: number = 8388608;
/* internal */ const flagObject5: number = 16777216;
/* internal */ const flagObject6: number = 33554432;
/* internal */ const flagObject7: number = 67108864;
/* internal */ const flagObject8: number = 134217728;
/* internal */ const flagObject9: number = 268435456;
/* internal */ const flagObject10: number = 536870912;
/* internal */ const flagObject11: number = 1073741824;

type ContextMenu = any;
@ClassInfo({
    fullName: Types.TuObject,
    name: 'TuObject',
    instanceof: [Types.TuObject]
})
export abstract class TuObject extends TComponent {

    @State()
    private myCachedSvgNode: any;

    @State()
    private myCachedHtmlNode: any;


    @State()
    private mySvgRenderer: TuSvgRenderer<TuObject>;

    @State()
    private myHtmlRenderer: TuHtmlRenderer<TuObject>;

    @State()
    private myLayer: TuLayer;

    @State()
    private myParent: TuGroup;

    @State()
    private myBounds: CGRectangle;

    @State()
    private myInternalFlags: number;

    @State()
    private myObservers: TuCollection;

    @State()
    private myLayerIndex: number;

    @State()
    private my$BoundsChanged: Event<EventHandler<CGRectangle>>;

    protected SetupControlDefaults(): void {
        super.SetupControlDefaults();
        this.mySvgRenderer = new TuObjectSvgRenderer();
        this.myHtmlRenderer = new TuObjectHtmlRenderer();
        this.myBounds = new CGRectangle(0, 0, 10, 10);
        this.myInternalFlags = 524671;
        this.my$BoundsChanged = new Event();
    }


    public get SvgRenderer(): TuSvgRenderer<TuObject> {
        return this.mySvgRenderer;
    }
    public set SvgRenderer(value: TuSvgRenderer<TuObject>) {
        this.mySvgRenderer = value;
    }

    public get HtmlRenderer(): TuHtmlRenderer<TuObject> {
        return this.myHtmlRenderer;
    }
    public set HtmlRenderer(value: TuHtmlRenderer<TuObject>) {
        this.myHtmlRenderer = value;
    }

    public CreateElements(param?: any) {
        const view: TuView = param;

     /*    if (view.RenderingMode === ViewRenderingMode.Svg && this.myCachedSvgNode != null) {
            return this.myCachedSvgNode;
        } else if (view.RenderingMode === ViewRenderingMode.Html && this.myCachedHtmlNode != null) {
            const cloned = React.cloneElement(this.myCachedHtmlNode);
            return cloned;
        } */

        const result = [];
        if (view.RenderingMode === ViewRenderingMode.Svg) {
            if (this.SvgRenderer != null) {
                this.SvgRenderer.Render(result, view, this);
                this.myCachedSvgNode = result;
            } else {
                console.log('Renderer is null.')
            }
        } else if (view.RenderingMode === ViewRenderingMode.Html) {
            if (this.HtmlRenderer != null) {
                this.BeginUpdate();
                this.HtmlRenderer.Render(result, view, this);
                this.myCachedHtmlNode = result;
                this.EndUpdate();
            } else {
                console.log('HTML Renderer is null.')
            }
        }
        return result;
    }

    //#region [Property] AutoRescales

    public get AutoRescales(): boolean {
        return this.getAutoRescales();
    }
    public set AutoRescales(value: boolean) {
        this.setAutoRescales(value);
    }

    protected /*virtual*/  getAutoRescales(): boolean {
        return (this.InternalFlags & flagAutoRescales) !== 0;
    }
    protected /*virtual*/ setAutoRescales(value: boolean) {
        const internalFlags: boolean = (this.InternalFlags & flagAutoRescales) !== 0;
        if (internalFlags !== value) {
            if (!value) {
                this.InternalFlags = this.InternalFlags & -257;
            }
            else {
                this.InternalFlags = this.InternalFlags | 256;
            }
            this.Changed(TuObjectEvents.ChangedAutoRescales, 0, internalFlags, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] BeingRemoved

    public get BeingRemoved(): boolean {
        return (this.InternalFlags & flagBeingRemoved) !== 0;
    }
    //#endregion

    //#region [Property] Bottom

    public get Bottom(): number {
        return this.getBottom();
    }
    public set Bottom(value: number) {
        this.setBottom(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getBottom(): number {
        const bounds: CGRectangle = this.Bounds.clone();
        return bounds.Y + bounds.Height;
    }

    /**
     * @hidden
     * @param value
     */
    protected /*virtual*/ setBottom(value: number) {
        const bounds: CGRectangle = this.Bounds.clone();
        bounds.Y = bounds.Y + (value - (bounds.Y + bounds.Height));
        this.Bounds = bounds;
    }

    //#endregion

    //#region [Property] Bounds

    public get Bounds(): CGRectangle {
        return this.getBounds();
    }

    public set Bounds(value: CGRectangle) {
        this.setBounds(value);
    }

    protected /*virtual*/ getBounds(): CGRectangle {
        if (this.InvalidBounds && !this.SkipsBoundsChanged) {
            this.InvalidBounds = false;
            this.SkipsBoundsChanged = true;
            this.Bounds = this.ComputeBounds();
            this.SkipsBoundsChanged = false;
        }
        return this.myBounds.clone();
    }
    protected /*virtual*/ setBounds(value: CGRectangle) {
        if (is.typeof(this, Types.TuStroke)) {
            const a = '';
        }
        const rectangleF: CGRectangle = this.myBounds.clone();
        if (value.Width >= 0 && value.Height >= 0 && !rectangleF.Equals(value)) {
            this.myBounds = value.clone();
            this.Changed(TuObjectEvents.ChangedBounds, 0, null, rectangleF, 0, null, value.clone());
            if (!this.SkipsBoundsChanged && !this.Initializing) {
                this.SkipsBoundsChanged = true;
                this.onBoundsChangedInternal(rectangleF.clone());
                if (this.InvalidBounds) {
                    this.InvalidBounds = false;
                    this.Bounds = this.ComputeBounds();
                }
            }
            this.SkipsBoundsChanged = false;
            const parent: TuGroup = this.Parent;
            if (parent != null) {
                parent.invalidatePaintBounds();
                if (!parent.SkipsBoundsChanged && !parent.Initializing && !this.Initializing) {
                    parent.SkipsBoundsChanged = true;
                    // TODO: Observable ekle
                    parent.onChildBoundsChanged(this, rectangleF);
                    if (parent.InvalidBounds) {
                        parent.InvalidBounds = false;
                        const goGroups: TuGroup = parent;
                        goGroups.Bounds = (<any>goGroups).computeBounds();
                    }
                    parent.SkipsBoundsChanged = false;
                }
            }
        }
    }
    //#endregion

    //#region [Property] Center

    public get Center(): CGPoint {
        return this.getCenter();
    }
    public set Center(value: CGPoint) {
        this.setCenter(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getCenter(): CGPoint {
        const bounds: CGRectangle = this.Bounds;
        return new CGPoint(bounds.X + bounds.Width / 2, bounds.Y + bounds.Height / 2);
    }

    /**
     * @hidden
     * @param value
     */
    protected /*virtual*/ setCenter(value: CGPoint) {
        const bounds: CGRectangle = this.Bounds;
        bounds.X = value.X - bounds.Width / 2;
        bounds.Y = value.Y - bounds.Height / 2;
        this.Bounds = bounds;
    }

    //#endregion

    //#region [Property] Copyable

    public get Copyable(): boolean {
        return this.getCopyable();
    }
    public set Copyable(value: boolean) {
        this.setCopyable(value);
    }

    protected /*virtual*/  getCopyable(): boolean {
        return (this.InternalFlags & flagCopyable) !== 0;
    }
    protected /*virtual*/ setCopyable(value: boolean) {
        const internalFlags: boolean = (this.InternalFlags & flagCopyable) !== 0;
        if (internalFlags !== value) {
            if (!value) {
                this.InternalFlags = this.InternalFlags & ~flagCopyable;
            }
            else {
                this.InternalFlags = this.InternalFlags | flagCopyable;
            }
            this.Changed(TuObjectEvents.ChangedCopyable, 0, internalFlags, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] Deletable

    public get Deletable(): boolean {
        return this.getDeletable();
    }
    public set Deletable(value: boolean) {
        this.setDeletable(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  getDeletable(): boolean {
        return (this.InternalFlags & flagDeletable) !== 0;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ setDeletable(value: boolean) {
        const internalFlags: boolean = (this.InternalFlags & flagDeletable) !== 0;
        if (internalFlags != value) {
            if (!value) {
                this.InternalFlags = this.InternalFlags & -65;
            }
            else {
                this.InternalFlags = this.InternalFlags | flagDeletable;
            }
            this.Changed(TuObjectEvents.ChangedDeletable, 0, internalFlags, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] Document
    public get Document(): TuDocument {
        return this.getDocument();
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getDocument(): TuDocument {
        const layer = this.Layer;
        if (!layer) {
            return undefined;
        }
        return layer.Document;
    }
    //#endregion

    //#region [Property] Document


    public get DraggingObject(): TuObject {
        return this.getDraggingObject();
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getDraggingObject(): TuObject {
        if (this.DragsNode) {
            for (let i: TuObject = this.Parent; i != null; i = i.Parent) {
                if (is.typeof<ITuNode>(i, Types.ITuNode)) {
                    return i;
                }
                if (i.Parent == null) {
                    return i;
                }
            }
        }
        return this;
    }
    //#endregion

    //#region [Property] DragsNode

    public get DragsNode(): boolean {
        return this.getDragsNode();
    }
    public set DragsNode(value: boolean) {
        this.setDragsNode(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  getDragsNode(): boolean {
        return (this.InternalFlags & flagDragsNode) !== 0;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ setDragsNode(value: boolean) {
        const internalFlags: boolean = (this.InternalFlags & flagDragsNode) !== 0;
        if (internalFlags != value) {
            if (!value) {
                this.InternalFlags = this.InternalFlags & -2049;
            }
            else {
                this.InternalFlags = this.InternalFlags | flagDragsNode;
            }
            this.Changed(TuObjectEvents.ChangedDragsNode, 0, internalFlags, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] Editable
    public get Editable(): boolean {
        return this.getEditable();
    }
    public set Editable(value: boolean) {
        this.setEditable(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  getEditable(): boolean {
        return (this.InternalFlags & flagEditable) != 0;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ setEditable(value: boolean) {
        const internalFlags: boolean = (this.InternalFlags & flagEditable) !== 0;
        if (internalFlags !== value) {
            if (!value) {
                this.InternalFlags = this.InternalFlags & -129;
            }
            else {
                this.InternalFlags = this.InternalFlags | flagEditable;
            }
            this.Changed(TuObjectEvents.ChangedEditable, 0, internalFlags, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] Editor

    public get Editor(): TuControl {
        return this.getEditor();
    }

    /**
    * @hidden
    */
    protected /*virtual*/  getEditor(): TuControl {
        return undefined;
    }
    //#endregion

    //#region [Property] Height
    public get Height(): float {
        return this.getHeight();
    }
    public set Height(value: float) {
        this.setHeight(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  getHeight(): float {
        return this.Bounds.Height;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ setHeight(value: float) {
        const bounds: CGRectangle = this.Bounds;
        bounds.Height = value;
        this.Bounds = bounds;
    }
    //#endregion

    //#region [Property] Initializing

    public get Initializing(): boolean {
        return this.getInitializing();
    }
    public set Initializing(value: boolean) {
        this.setInitializing(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  getInitializing(): boolean {
        return (this.InternalFlags & flagInitializing) !== 0;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ setInitializing(value: boolean) {
        if (value) {
            this.InternalFlags = this.InternalFlags | flagInitializing;
            return;
        }
        this.InternalFlags = this.InternalFlags & -131073;
    }
    //#endregion


    //#region [Property] InternalFlags
    protected get InternalFlags(): number {

        return this.myInternalFlags;
    }

    protected set InternalFlags(value: number) {
        this.myInternalFlags = value;
    }
    //#endregion

    //#region [Property] InvalidBounds

    public get InvalidBounds(): boolean {
        return this.getInvalidBounds();
    }
    public set InvalidBounds(value: boolean) {
        this.setInvalidBounds(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  getInvalidBounds(): boolean {
        return (this.InternalFlags & flagInvalidBounds) !== 0;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ setInvalidBounds(value: boolean) {
        if (value) {
            this.InternalFlags = this.InternalFlags | flagInvalidBounds;
            return;
        }
        this.InternalFlags = this.InternalFlags & -32769;
    }
    //#endregion

    //#region [Property] IsInDocument

    public get IsInDocument(): boolean {
        return this.getIsInDocument();
    }

    /**
    * @hidden
    */
    protected /*virtual*/  getIsInDocument(): boolean {
        const layer: TuLayer = this.Layer;
        if (layer == null) {
            return false;
        }
        return layer.IsInDocument;
    }
    //#endregion

    //#region [Property] IsInView

    public get IsInView(): boolean {
        return this.getIsInView();
    }

    /**
    * @hidden
    */
    protected /*virtual*/  getIsInView(): boolean {
        const layer: TuLayer = this.Layer;
        if (layer == null) {
            return false;
        }
        return layer.IsInView;
    }
    //#endregion

    //#region [Property] IsTopLevel

    public get IsTopLevel(): boolean {
        return this.getIsInView();
    }

    /**
    * @hidden
    */
    protected /*virtual*/  getIsTopLevel(): boolean {
        return this.myParent == null;
    }
    //#endregion

    //#region [Property] Layer
    public get Layer(): TuLayer {
        return this.getLayer();
    }

    /**
    * @hidden
    */
    protected /*virtual*/  getLayer(): TuLayer {
        return this.myLayer;
    }
    //#endregion

    //#region [Property] LayerIndex
    public get LayerIndex(): number {
        return this.getLayerIndex();
    }
    public set LayerIndex(value: number) {
        this.setLayerIndex(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  getLayerIndex(): number {
        return this.myLayerIndex;
    }

    protected /*virtual*/  setLayerIndex(value: number) {
        return this.myLayerIndex = value;
    }
    //#endregion

    //#region [Property] Left

    public get Left(): float {
        return this.getLeft();
    }
    public set Left(value: float) {
        this.setLeft(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getLeft(): float {
        return this.Bounds.X;
    }

    /**
     * @hidden
     * @param value
     */
    protected /*virtual*/ setLeft(value: float) {
        const bounds: CGRectangle = this.Bounds.clone();
        bounds.X = value;
        this.Bounds = bounds;
    }

    //#endregion

    //#region [Property] Location

    public get Location(): CGPoint {
        return this.getLocation();
    }
    public set Location(value: CGPoint) {
        this.setLocation(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getLocation(): CGPoint {
        return this.Position.clone();
    }

    /**
     * @hidden
     * @param value
     */
    protected /*virtual*/ setLocation(value: CGPoint) {
        this.Position = value.clone();
    }

    //#endregion


    //#region [Property] Movable

    public get Movable(): boolean {
        return this.getMovable();
    }
    public set Movable(value: boolean) {
        this.setMovable(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  getMovable(): boolean {
        return (this.InternalFlags & 4) !== 0;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ setMovable(value: boolean) {
        const internalFlags: boolean = (this.InternalFlags & flagMovable) !== 0;
        if (internalFlags != value) {
            if (!value) {
                this.InternalFlags = this.InternalFlags & -5;
            }
            else {
                this.InternalFlags = this.InternalFlags | flagMovable;
            }
            this.Changed(TuObjectEvents.ChangedMovable, 0, internalFlags, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] Observers

    public get Observers(): TuCollectionEnumerator {
        return this.getObservers();
    }


    /**
    * @hidden
    */
    protected /*virtual*/  getObservers(): TuCollectionEnumerator {
        if (this.myObservers == null) {
            return TuCollectionEnumerator.Empty;
        }
        return this.myObservers.GetEnumerator();
    }

    //#endregion

    //#region [Property] Parent
    public get Parent(): TuGroup {
        return this.getParent();
    }

    /**
    * @hidden
    */
    protected /*virtual*/  getParent(): TuGroup {
        return this.myParent;
    }
    //#endregion

    //#region [Property] Parent

    public get ParentNode(): TuObject {
        return this.getParentNode();
    }

    /**
    * @hidden
    */
    protected /*virtual*/  getParentNode(): TuObject {
        // TODO: implement in the TuSubGraphBase
        throw new NotImplementedException('TuObject.getParentNode not implemented. TuSubGraphBase must implement this.');
    }
    //#endregion

    //#region [Property] Position
    public get Position(): CGPoint {
        return this.getPosition();
    }
    public set Position(value: CGPoint) {
        this.setPosition(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getPosition(): CGPoint {
        const bounds: CGRectangle = this.Bounds;
        return new CGPoint(bounds.X, bounds.Y);
    }

    /**
     * @hidden
     * @param value
     */
    protected /*virtual*/ setPosition(value: CGPoint) {
        const bounds: CGRectangle = this.Bounds;
        bounds.X = value.X;
        bounds.Y = value.Y;
        this.Bounds = bounds;
    }
    //#endregion

    //#region [Property] Printable
    public get Printable(): boolean {
        return this.getPrintable();
    }
    public set Printable(value: boolean) {
        this.setPrintable(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  getPrintable(): boolean {
        return (this.InternalFlags & flagPrintable) != 0;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ setPrintable(value: boolean) {
        const internalFlags: boolean = (this.InternalFlags & flagPrintable) !== 0;
        if (internalFlags !== value) {
            if (!value) {
                this.InternalFlags = this.InternalFlags & ~flagPrintable;
            }
            else {
                this.InternalFlags = this.InternalFlags | flagPrintable;
            }
            this.Changed(TuObjectEvents.ChangedPrintable, 0, internalFlags, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] Reshapable
    public get Reshapable(): boolean {
        return this.getReshapable();
    }
    public set Reshapable(value: boolean) {
        this.setReshapable(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  getReshapable(): boolean {
        return (this.InternalFlags & flagReshapable) !== 0;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ setReshapable(value: boolean) {
        const internalFlags: boolean = (this.InternalFlags & flagReshapable) !== 0;
        if (internalFlags !== value) {
            if (!value) {
                this.InternalFlags = this.InternalFlags & ~flagReshapable;
            }
            else {
                this.InternalFlags = this.InternalFlags | flagReshapable;
            }
            this.Changed(TuObjectEvents.ChangedReshapable, 0, internalFlags, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] Resizable
    public get Resizable(): boolean {
        return this.getResizable();
    }
    public set Resizable(value: boolean) {
        this.setResizable(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  getResizable(): boolean {
        return (this.InternalFlags & flagResizable) !== 0;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ setResizable(value: boolean) {
        const internalFlags: boolean = (this.InternalFlags & flagResizable) != 0;
        if (internalFlags !== value) {
            if (!value) {
                this.InternalFlags = this.InternalFlags & ~flagResizable;
            }
            else {
                this.InternalFlags = this.InternalFlags | flagResizable;
            }
            this.Changed(TuObjectEvents.ChangedResizable, 0, internalFlags, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] ResizesRealtime
    public get ResizesRealtime(): boolean {
        return this.getResizesRealtime();
    }
    public set ResizesRealtime(value: boolean) {
        this.setResizesRealtime(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  getResizesRealtime(): boolean {
        return (this.InternalFlags & flagResizesRealtime) != 0;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ setResizesRealtime(value: boolean) {
        const internalFlags: boolean = (this.InternalFlags & flagResizesRealtime) !== 0;
        if (internalFlags !== value) {
            if (!value) {
                this.InternalFlags = this.InternalFlags & ~flagResizesRealtime;
            }
            else {
                this.InternalFlags = this.InternalFlags | flagResizesRealtime;
            }
            this.Changed(TuObjectEvents.ChangedResizesRealtime, 0, internalFlags, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] Right
    public get Right(): float {
        return this.getRight();
    }
    public set Right(value: float) {
        this.setRight(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getRight(): float {
        const bounds: CGRectangle = this.Bounds.clone();
        return bounds.X + bounds.Width;
    }

    /**
     * @hidden
     * @param value
     */
    protected /*virtual*/ setRight(value: float) {
        const bounds: CGRectangle = this.Bounds.clone();
        bounds.X = bounds.X + (value - (bounds.X + bounds.Width));
        this.Bounds = bounds;
    }
    //#endregion

    //#region [Property] Selectable
    public get Selectable(): boolean {
        return this.getSelectable();
    }
    public set Selectable(value: boolean) {
        this.setSelectable(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  getSelectable(): boolean {
        return (this.InternalFlags & flagSelectable) !== 0;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ setSelectable(value: boolean) {
        const internalFlags: boolean = (this.InternalFlags & flagSelectable) !== 0;
        if (internalFlags !== value) {
            if (!value) {
                this.InternalFlags = this.InternalFlags & ~flagSelectable;
            }
            else {
                this.InternalFlags = this.InternalFlags | flagSelectable;
            }
            this.Changed(TuObjectEvents.ChangedSelectable, 0, internalFlags, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] SelectionObject
    public get SelectionObject(): TuObject {
        return this.getSelectionObject();
    }


    /**
    * @hidden
    */
    protected /*virtual*/  getSelectionObject(): TuObject {
        return this;
    }
    //#endregion

    //#region [Property] Shadowed
    public get Shadowed(): boolean {
        return this.getShadowed();
    }
    public set Shadowed(value: boolean) {
        this.setShadowed(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  getShadowed(): boolean {
        return (this.InternalFlags & flagShadowed) !== 0;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ setShadowed(value: boolean) {
        const internalFlags: boolean = (this.InternalFlags & flagShadowed) != 0;
        if (internalFlags != value) {
            if (!value) {
                this.InternalFlags = this.InternalFlags & ~flagShadowed;
            }
            else {
                this.InternalFlags = this.InternalFlags | flagShadowed;
            }
            this.Changed(TuObjectEvents.ChangedShadowed, 0, internalFlags, NullRect, 0, value, NullRect);
            if (this.Parent != null) {
                this.Parent.invalidatePaintBounds();
            }
        }
    }
    //#endregion

    //#region [Property] Size
    public get Size(): CGSize {
        return this.getSize();
    }
    public set Size(value: CGSize) {
        this.setSize(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  getSize(): CGSize {
        const bounds: CGRectangle = this.Bounds;
        return new CGSize(bounds.Width, bounds.Height);
    }

    /**
    * @hidden
    */
    protected /*virtual*/ setSize(value: CGSize) {
        const bounds: CGRectangle = this.Bounds;
        bounds.Width = value.Width;
        bounds.Height = value.Height;
        this.Bounds = bounds;
    }
    //#endregion

    //#region [Property] SkipsBoundsChanged
    public get SkipsBoundsChanged(): boolean {
        return this.getSkipsBoundsChanged();
    }
    public set SkipsBoundsChanged(value: boolean) {
        this.setSkipsBoundsChanged(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  getSkipsBoundsChanged(): boolean {
        return (this.InternalFlags & flagSkipsBoundsChanged) !== 0;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ setSkipsBoundsChanged(value: boolean) {
        if (value) {
            this.InternalFlags = this.InternalFlags | flagSkipsBoundsChanged;
            return;
        }
        this.InternalFlags = this.InternalFlags & ~flagSkipsBoundsChanged;
    }
    //#endregion

    //#region [Property] SkipsUndoManager
    public get SkipsUndoManager(): boolean {
        return this.getSkipsUndoManager();
    }
    public set SkipsUndoManager(value: boolean) {
        this.setSkipsUndoManager(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  getSkipsUndoManager(): boolean {
        return (this.InternalFlags & flagSkipsUndoManager) != 0;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ setSkipsUndoManager(value: boolean) {
        if (value) {
            this.InternalFlags = this.InternalFlags | flagSkipsUndoManager;
            return;
        }
        this.InternalFlags = this.InternalFlags & ~flagSkipsUndoManager;
    }
    //#endregion

    //#region [Property] SuspendsUpdates
    public get SuspendsUpdates(): boolean {
        return this.getSuspendsUpdates();
    }
    public set SuspendsUpdates(value: boolean) {
        this.setSuspendsUpdates(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  getSuspendsUpdates(): boolean {
        return (this.InternalFlags & flagSuspendsUpdates) !== 0;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ setSuspendsUpdates(value: boolean) {
        if (value) {
            this.InternalFlags = this.InternalFlags | flagSuspendsUpdates;
            return;
        }
        this.InternalFlags = this.InternalFlags & ~flagSuspendsUpdates;
    }
    //#endregion

    //#region [Property] Top
    public get Top(): float {
        return this.getTop();
    }
    public set Top(value: float) {
        this.setTop(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getTop(): float {
        return this.Bounds.Y;
    }

    /**
     * @hidden
     * @param value
     */
    protected /*virtual*/ setTop(value: float) {
        const bounds: CGRectangle = this.Bounds.clone();
        bounds.Y = value;
        this.Bounds = bounds;
    }
    //#endregion

    //#region [Property] TopLevelObject
    public get TopLevelObject(): TuObject {
        return this.getTopLevelObject();
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getTopLevelObject(): TuObject {
        let parent: TuObject = this;
        while (parent.Parent != null) {
            parent = parent.Parent;
        }
        return parent;
    }
    //#endregion

    //#region [Property] View
    public get View(): TuView {
        return this.getView();
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getView(): TuView {
        const layer: TuLayer = this.Layer;
        if (layer == null) {
            return null;
        }
        return layer.View;
    }
    //#endregion

    //#region [Property] Visible
    public get Visible(): boolean {
        return this.getVisible();
    }
    public set Visible(value: boolean) {
        this.setVisible(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  getVisible(): boolean {
        return (this.InternalFlags & flagVisible) !== 0;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ setVisible(value: boolean) {
        const internalFlags: boolean = (this.InternalFlags & flagVisible) !== 0;
        if (internalFlags !== value) {
            if (!value) {
                this.InternalFlags = this.InternalFlags & ~flagVisible;
            }
            else {
                this.InternalFlags = this.InternalFlags | flagVisible;
            }
            this.Changed(TuObjectEvents.ChangedVisible, 0, internalFlags, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] Width
    public get Width(): float {
        return this.getWidth();
    }
    public set Width(value: float) {
        this.setWidth(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  getWidth(): float {
        return this.Bounds.Width;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ setWidth(value: float) {
        const bounds: CGRectangle = this.Bounds;
        bounds.Width = value;
        this.Bounds = bounds;
    }
    //#endregion

    //#region [Property] BoundsChanged$

    public get BoundsChanged$(): Event<EventHandler<CGRectangle>> {
        return this.getBoundsChanged$();
    }
    public set BoundsChanged$(value: Event<EventHandler<CGRectangle>>) {
        this.setBoundsChanged$(value);
    }

    protected /*virtual*/  getBoundsChanged$(): Event<EventHandler<CGRectangle>> {
        return this.my$BoundsChanged;
    }
    protected /*virtual*/ setBoundsChanged$(value: Event<EventHandler<CGRectangle>>) {
        this.my$BoundsChanged = value;
    }
    //#endregion


    public /* virtual */  AddObserver(obj: TuObject): void {
        // TODO: implement in the TuCollection
        throw new NotImplementedException('TuObject.addObserver not implemented. TuCollection must implement this.');
    }

    public /* virtual */ AddSelectionHandles(sel: TuSelection, selectedObj: TuObject): void {
        this.RemoveSelectionHandles(sel);
        const view: TuView = sel.View;
        const flag: boolean = (view == null ? true : view.CanResizeObjects());
        const flag1: boolean = (view == null ? true : view.CanReshapeObjects());
        if (!this.CanResize() || !flag) {
            sel.createBoundingHandle(this, selectedObj);
            return;
        }
        const bounds: CGRectangle = this.Bounds;
        const x: float = bounds.X;
        const single: float = bounds.X + bounds.Width / 2;
        const x1: float = bounds.X + bounds.Width;
        const y: float = bounds.Y;
        const y1: float = bounds.Y + bounds.Height / 2;
        const single1: float = bounds.Y + bounds.Height;
        sel.createResizeHandle(this, selectedObj, new CGPoint(x, y), 2, true);
        sel.createResizeHandle(this, selectedObj, new CGPoint(x1, y), 4, true);
        sel.createResizeHandle(this, selectedObj, new CGPoint(x1, single1), 8, true);
        sel.createResizeHandle(this, selectedObj, new CGPoint(x, single1), 16, true);
        if (this.CanReshape() && flag1) {
            sel.createResizeHandle(this, selectedObj, new CGPoint(single, y), 32, true);
            sel.createResizeHandle(this, selectedObj, new CGPoint(x1, y1), 64, true);
            sel.createResizeHandle(this, selectedObj, new CGPoint(single, single1), 128, true);
            sel.createResizeHandle(this, selectedObj, new CGPoint(x, y1), 256, true);
        }
    }

    public /* virtual */ CanCopy(): boolean {
        if (!this.Copyable) {
            return false;
        }
        if (this.Layer == null) {
            return true;
        }
        return this.Layer.CanCopyObjects();
    }

    public /* virtual */ CanDelete(): boolean {
        if (!this.Deletable) {
            return false;
        }
        if (this.Layer == null) {
            return true;
        }
        return this.Layer.CanDeleteObjects();
    }

    public /* virtual */ CanEdit(): boolean {
        if (!this.Editable) {
            return false;
        }
        if (this.Layer == null) {
            return true;
        }
        return this.Layer.CanEditObjects();
    }

    public /* virtual */ canMove(): boolean {
        if (!this.Movable) {
            return false;
        }
        if (this.Layer == null) {
            return true;
        }
        return this.Layer.CanMoveObjects();
    }

    public /* virtual */ CanPrint(): boolean {
        if (!this.Printable) {
            return false;
        }
        if (this.Parent != null) {
            return this.Parent.CanPrint();
        }
        if (this.Layer == null) {
            return true;
        }
        return this.Layer.CanPrintObjects();
    }

    public /* virtual */ CanReshape(): boolean {
        if (!this.Reshapable) {
            return false;
        }
        if (this.Layer == null) {
            return true;
        }
        return this.Layer.CanReshapeObjects();
    }

    public /* virtual */ CanResize(): boolean {
        if (!this.Resizable) {
            return false;
        }
        if (this.Layer == null) {
            return true;
        }
        return this.Layer.CanResizeObjects();
    }

    public /* virtual */ CanSelect(): boolean {
        if (!this.Selectable) {
            return false;
        }
        if (this.Layer == null) {
            return true;
        }
        return this.Layer.CanSelectObjects();
    }

    public /* virtual */  CanView(): boolean {
        if (!this.Visible) {
            return false;
        }
        if (this.Parent != null) {
            return this.Parent.CanView();
        }
        if (this.Layer == null) {
            return true;
        }
        return this.Layer.CanViewObjects();
    }

    public /* virtual */ Changed(subhint: number, oldI: number, oldVal: any, oldRect: CGRectangle, newI: number, newVal: any, newRect: CGRectangle) {
        if (this.SuspendsUpdates) {
            return;
        }

        this.myCachedHtmlNode = null;
        this.myCachedSvgNode = null;

        if (this.InvalidBounds) {
            const bounds: CGRectangle = this.Bounds;
        }
        const layer: TuLayer = this.Layer;
        if (layer != null) {
            const layerCollectionContainer: ITuLayerCollectionContainer = layer.LayerCollectionContainer;
            if (layerCollectionContainer != null) {
                layerCollectionContainer.RaiseChanged(901, subhint, this, oldI, oldVal, oldRect, newI, newVal, newRect);
            }
        }
        if (this.myObservers != null) {
            const goObjectArray: TuObject[] = this.myObservers.CopyArray();
            for (let i = 0; i < goObjectArray.length; i++) {
                goObjectArray[i].OnObservedChanged(this, subhint, oldI, oldVal, oldRect, newI, newVal, newRect);
            }
        }
    }

    public /* virtual */ ChangeValue(e: TuChangedEventArgs, undo: boolean): void {
        let subHint: number = e.SubHint;
        switch (subHint) {
            case 1000:
                {
                    return;
                }
            case 1001:
                {
                    this.Bounds = e.getRect(undo);
                    return;
                }
            case 1002:
                {
                    subHint = e.SubHint;
                    throw new ArgumentException(TString.Concat("Unknown TuChangedEventArgs.SubHint--override TuObject.ChangeValue to handle the case: ", subHint.toString()));
                }
            case 1003:
                {
                    this.Visible = e.getValue(undo);
                    return;
                }
            case 1004:
                {
                    this.Selectable = e.getValue(undo);
                    return;
                }
            case 1005:
                {
                    this.Movable = e.getValue(undo);
                    return;
                }
            case 1006:
                {
                    this.Copyable = e.getValue(undo);
                    return;
                }
            case 1007:
                {
                    this.Resizable = e.getValue(undo);
                    return;
                }
            case 1008:
                {
                    this.Reshapable = e.getValue(undo);
                    return;
                }
            case 1009:
                {
                    this.Deletable = e.getValue(undo);
                    return;
                }
            case 1010:
                {
                    this.Editable = e.getValue(undo);
                    return;
                }
            case 1011:
                {
                    this.AutoRescales = e.getValue(undo);
                    return;
                }
            case 1012:
                {
                    this.ResizesRealtime = e.getValue(undo);
                    return;
                }
            case 1013:
                {
                    this.Shadowed = e.getValue(undo);
                    return;
                }
            case 1014:
                {
                    const newValue: TuObject = as(e.NewValue, Types.TuObject);
                    if (undo) {
                        this.removeObserver(newValue);
                        return;
                    }
                    this.AddObserver(newValue);
                    return;
                }
            case 1015:
                {
                    const oldValue: TuObject = as(e.OldValue, Types.TuObject);
                    if (undo) {
                        this.AddObserver(oldValue);
                        return;
                    }
                    this.removeObserver(oldValue);
                    return;
                }
            case 1016:
                {
                    this.DragsNode = e.getValue(undo);
                    return;
                }
            case 1017:
                {
                    this.Printable = e.getValue(undo);
                    return;
                }
            default:
                {
                    if (subHint === 1041) {
                        this.Initializing = e.getValue(undo);
                        return;
                    }
                    subHint = e.SubHint;
                    throw new ArgumentException(TString.Concat("Unknown TuChangedEventArgs.SubHint--override TuObject.ChangeValue to handle the case: ", subHint.toString()));
                }
        }
    }

    public /* virtual */ Changing(subhint: number): void {
        if (this.SuspendsUpdates) {
            return;
        }
        const document: TuDocument = this.Document;
        if (document != null) {
            document.RaiseChanging(901, subhint, this);
        }
    }

    protected /* virtual */  ComputeBounds(): CGRectangle {
        return this.Bounds;
    }

    public /* virtual */ ComputeMove(origLoc: CGPoint, newLoc: CGPoint): CGPoint {
        return newLoc;
    }

    public /* virtual */  ComputeResize(origRect: CGRectangle, newPoint: CGPoint, handle: number, min: CGSize, max: CGSize, reshape: boolean): CGRectangle {
        const x: float = origRect.X;
        const y: float = origRect.Y;
        const single: float = origRect.X + origRect.Width;
        const y1: float = origRect.Y + origRect.Height;
        let single1: float = 1;
        if (!reshape) {
            let width: float = origRect.Width;
            let height: float = origRect.Height;
            if (width <= 0) {
                width = 1;
            }
            if (height <= 0) {
                height = 1;
            }
            single1 = height / width;
        }
        const rectangleF: CGRectangle = origRect.clone();
        if (handle <= 16) {
            if (handle <= 4) {
                if (handle === 2) {
                    rectangleF.X = Math.max(newPoint.X, single - max.Width);
                    rectangleF.X = Math.min(rectangleF.X, single - min.Width);
                    rectangleF.Width = single - rectangleF.X;
                    if (rectangleF.Width <= 0) {
                        rectangleF.Width = 1;
                    }
                    rectangleF.Y = Math.max(newPoint.Y, y1 - max.Height);
                    rectangleF.Y = Math.min(rectangleF.Y, y1 - min.Height);
                    rectangleF.Height = y1 - rectangleF.Y;
                    if (rectangleF.Height <= 0) {
                        rectangleF.Height = 1;
                    }
                    if (!reshape) {
                        if (single1 >= rectangleF.Height / rectangleF.Width) {
                            rectangleF.Width = rectangleF.Height / single1;
                            rectangleF.X = single - rectangleF.Width;
                        }
                        else {
                            rectangleF.Height = single1 * rectangleF.Width;
                            rectangleF.Y = y1 - rectangleF.Height;
                        }
                    }
                }
                else if (handle === 4) {
                    rectangleF.Width = Math.min(newPoint.X - x, max.Width);
                    rectangleF.Width = Math.max(rectangleF.Width, min.Width);
                    rectangleF.Y = Math.max(newPoint.Y, y1 - max.Height);
                    rectangleF.Y = Math.min(rectangleF.Y, y1 - min.Height);
                    rectangleF.Height = y1 - rectangleF.Y;
                    if (rectangleF.Height <= 0) {
                        rectangleF.Height = 1;
                    }
                    if (!reshape) {
                        if (single1 >= rectangleF.Height / rectangleF.Width) {
                            rectangleF.Width = rectangleF.Height / single1;
                        }
                        else {
                            rectangleF.Height = single1 * rectangleF.Width;
                            rectangleF.Y = y1 - rectangleF.Height;
                        }
                    }
                }
            }
            else if (handle === 8) {
                rectangleF.Width = Math.min(newPoint.X - x, max.Width);
                rectangleF.Width = Math.max(rectangleF.Width, min.Width);
                rectangleF.Height = Math.min(newPoint.Y - y, max.Height);
                rectangleF.Height = Math.max(rectangleF.Height, min.Height);
                if (!reshape) {
                    if (single1 >= rectangleF.Height / rectangleF.Width) {
                        rectangleF.Width = rectangleF.Height / single1;
                    }
                    else {
                        rectangleF.Height = single1 * rectangleF.Width;
                    }
                }
            }
            else if (handle === 16) {
                rectangleF.X = Math.max(newPoint.X, single - max.Width);
                rectangleF.X = Math.min(rectangleF.X, single - min.Width);
                rectangleF.Width = single - rectangleF.X;
                if (rectangleF.Width <= 0) {
                    rectangleF.Width = 1;
                }
                rectangleF.Height = Math.min(newPoint.Y - y, max.Height);
                rectangleF.Height = Math.max(rectangleF.Height, min.Height);
                if (!reshape) {
                    if (single1 >= rectangleF.Height / rectangleF.Width) {
                        rectangleF.Width = rectangleF.Height / single1;
                        rectangleF.X = single - rectangleF.Width;
                    }
                    else {
                        rectangleF.Height = single1 * rectangleF.Width;
                    }
                }
            }
        }
        else if (handle <= 64) {
            if (handle == 32) {
                rectangleF.Y = Math.max(newPoint.Y, y1 - max.Height);
                rectangleF.Y = Math.min(rectangleF.Y, y1 - min.Height);
                rectangleF.Height = y1 - rectangleF.Y;
                if (rectangleF.Height <= 0) {
                    rectangleF.Height = 1;
                }
            }
            else if (handle === 64) {
                rectangleF.Width = Math.min(newPoint.X - x, max.Width);
                rectangleF.Width = Math.max(rectangleF.Width, min.Width);
            }
        }
        else if (handle === 128) {
            rectangleF.Height = Math.min(newPoint.Y - y, max.Height);
            rectangleF.Height = Math.max(rectangleF.Height, min.Height);
        }
        else if (handle === 256) {
            rectangleF.X = Math.max(newPoint.X, single - max.Width);
            rectangleF.X = Math.min(rectangleF.X, single - min.Width);
            rectangleF.Width = single - rectangleF.X;
            if (rectangleF.Width <= 0) {
                rectangleF.Width = 1;
            }
        }
        return rectangleF;
    }

    public /* virtual */ ContainedByRectangle(r: CGRectangle): boolean {
        return GeomUtilities.ContainsRect(r.clone(), this.Bounds);
    }

    public /* virtual */  ContainsPoint(p: CGPoint): boolean {
        return GeomUtilities.ContainsRect(this.Bounds, p.clone());
    }

    public Copy(): TuObject {
        let goCopyDictionary: TuCopyDictionary;
        const document: TuDocument = this.Document;
        goCopyDictionary = (document == null ? new TuCopyDictionary() : document.createCopyDictionary());
        return goCopyDictionary.CopyComplete(this);
    }

    public /* virtual */ CopyNewValueForRedo(e: TuChangedEventArgs): void {
    }

    public /* virtual */ CopyObject(env: TuCopyDictionary): TuObject {
        let item: TuObject = as(env.Get(this), Types.TuObject);
        if (item != null) {
            return undefined;
        }
        item = clone(this);
        env.Set(this, item);
        item.myLayer = undefined;
        item.myParent = undefined;
        if (this.myObservers != null && this.myObservers.Count > 0) {
            env.Delayeds.Add(this);
        }
        item.myObservers = undefined;
        return item;
    }

    public /* virtual */ CopyObjectDelayed(env: TuCopyDictionary, newobj: TuObject): void {
        foreach(this.Observers, (observer: TuObject) => {
            newobj.AddObserver(as(env.Get(observer), Types.TuObject));
        });
    }

    public /* virtual */ CopyOldValueForUndo(e: TuChangedEventArgs): void {
    }

    public /* virtual */  CreateBoundingHandle(): ITuHandle {
        // TODO: implement in the TuHandle
        throw new NotImplementedException('TuObject.createBoundingHandle not implemented. TuHandle must implement this.');

    }

    public /* virtual */  CreateEditor(view: TuView): TuControl {
        return undefined;
    }

    public /* virtual */ CreateResizeHandle(handleid: number): ITuHandle {
        // TODO: implement in the TuHandle
        throw new NotImplementedException('TuObject.createResizeHandle not implemented. TuHandle must implement this.');
    }
    public /* virtual */ DoBeginEdit(view: TuView): void {
    }

    public /* virtual */ DoEndEdit(view: TuView): void {
    }

    public /* virtual */  DoMove(view: TuView, origLoc: CGPoint, newLoc: CGPoint): void {
        this.Location = this.ComputeMove(origLoc, newLoc);
    }

    public /* virtual */ DoResize(view: TuView, origRect: CGRectangle, newPoint: CGPoint, whichHandle: number, evttype: TuInputState, min: CGSize, max: CGSize): void {
        if (evttype === TuInputState.Cancel) {
            this.Bounds = origRect;
            return;
        }
        const rectangleF: CGRectangle = this.ComputeResize(origRect.clone(), newPoint.clone(), whichHandle, min, max, (!this.CanReshape() || !view.CanReshapeObjects() ? false : !view.LastInput.Shift));
        if (this.ResizesRealtime) {
            this.Bounds = rectangleF.clone();
            return;
        }
        view.drawXorBox(view.convertDocToView(rectangleF), evttype !== TuInputState.Finish);
        if (evttype === TuInputState.Finish) {
            this.Bounds = rectangleF.clone();
        }
    }

    public /* virtual */ ExpandPaintBounds(rect: CGRectangle, view: TuView): CGRectangle {
        return rect.clone();
    }

    public static FindCommonParent(a: TuObject, b: TuObject): TuObject {
        if (a === b) {
            return a;
        }
        if (a == null) {
            return undefined;
        }
        if (a.Parent === b) {
            return b;
        }
        if (b == null) {
            return undefined;
        }
        if (b.Parent === a) {
            return a;
        }
        if (a.Parent === b.Parent) {
            return a.Parent;
        }
        if (b.Parent == null) {
            for (let i: TuObject = a; i != null; i = i.Parent) {
                if (i === b) {
                    return b;
                }
            }
        }
        else if (a.Parent != null) {
            for (let j: TuObject = a; j != null; j = j.Parent) {
                for (let k: TuObject = b; k != null; k = k.Parent) {
                    if (k == j) {
                        return k;
                    }
                }
            }
        }
        else {
            for (let l: TuObject = b; l != null; l = l.Parent) {
                if (l === a) {
                    return a;
                }
            }
        }
        return undefined;
    }

    public /* virtual */ GetContextMenu(view: TuView): ContextMenu {
        return undefined;
    }

    public /* virtual */ GetContextMenuStrip(view: TuView): ContextMenu {
        return undefined;
    }

    public /* virtual */ GetCursorName(view: TuView): string {
        return undefined;
    }

    public /* virtual */ GetNearestIntersectionPoint(p1: CGPoint, p2: CGPoint, result: Out<CGPoint>): boolean {
        return GeomUtilities.GetNearestIntersectionPoint(this.Bounds, p1.clone(), p2.clone(), result);
    }



    public /* virtual */  GetPartInfo(view: TuView, renderer: ITuPartInfoRenderer): TuPartInfo {
        return renderer.getStandardPartInfo(this);
    }

    public /* virtual */ GetRectangleSpotLocation(r: CGRectangle, spot: Spot): CGPoint {
        return spot.getSpotLocation(r.clone());
    }

    public /* virtual */  GetShadowBrush(view: TuView): Brush {
        if (view == null) {
            return null;
        }
        return view.getShadowBrush(this);
    }

    public /* virtual */ GetShadowOffset(view: TuView): CGSize {
        if (view != null) {
            return view.ShadowOffset;
        }
        return new CGSize();
    }

    public /* virtual */ GetShadowPen(view: TuView, width: float): Pen {
        if (view == null) {
            return null;
        }
        return view.getShadowPen(this, width);
    }

    public /* virtual */ GetSpotLocation(spot: Spot): CGPoint {
        return spot.getSpotLocation(this.Bounds);
    }
    public /* virtual */ GetToolTip(view: TuView): string {
        return undefined;
    }

    public InvalidateViews(): void {
        if (this.Parent != null) {
            this.Parent.invalidatePaintBounds();
        }
        this.Changed(1000, 0, undefined, NullRect, 0, undefined, NullRect);
    }

    public /* internal */  IsApprox(x: float, y: float): boolean {
        let worldEpsilon: float = 0.5;
        const document: TuDocument = this.Document;
        if (document != null) {
            worldEpsilon = document.WorldEpsilon;
        }
        const single: float = x - y;
        if (single >= worldEpsilon) {
            return false;
        }
        return single > -worldEpsilon;
    }

    public isChildOf(obj: TuObject): boolean {
        if (is.typeof<TuGroup>(obj, Types.TuGroup)) {
            for (let i = this.Parent; i != null; i = i.Parent) {
                if (i === obj) {
                    return true;
                }
            }
        }
        return false;
    }

    public /* internal */ MakeDiamondResizeHandle(handle: ITuHandle, spot: Spot): void {
        // TODO: implement in the TuCollectionEnumerator
        throw new NotImplementedException('TuObject.makeDiamondResizeHandle not implemented. TuHandle must implement this.');
    }


    private onBoundsChangedInternal(old: CGRectangle): void {
        if (this.BoundsChanged$ != null) {
            this.BoundsChanged$(old);
        }

        this.OnBoundsChanged(old);
    }
    protected /* virtual */ OnBoundsChanged(old: CGRectangle): void {
    }

    public /* virtual */ OnContextClick(evt: TuInputEventArgs, view: TuView): boolean {
        return false;
    }

    public /* virtual */ OnDoubleClick(evt: TuInputEventArgs, view: TuView): boolean {
        return false;
    }

    public /* virtual */ OnEnterLeave(from: TuObject, to: TuObject, view: TuView): boolean {
        return false;
    }

    public /* virtual */ OnGotSelection(sel: TuSelection): void {

        if (this.IsInDocument && this.CanView()) {
            const selectionObject: TuObject = this.SelectionObject;
            if (selectionObject != null) {
                selectionObject.AddSelectionHandles(sel, this);
            }
        }
    }

    public /* virtual */ OnHover(evt: TuInputEventArgs, view: TuView): boolean {
        return false;
    }

    protected /* virtual */ OnLayerChanged(oldlayer: TuLayer, newlayer: TuLayer, mainObj: TuObject): void {
    }

    public /* virtual */ OnLostSelection(sel: TuSelection): void {
        const selectionObject: TuObject = this.SelectionObject;
        if (selectionObject != null) {
            selectionObject.RemoveSelectionHandles(sel);
        }
    }

    public /* virtual */ OnMouseOver(evt: TuInputEventArgs, view: TuView): boolean {
        const cursorName: string = this.GetCursorName(view);
        if (cursorName == null) {
            return false;
        }
        view.CursorName = cursorName;
        return true;
    }
    protected /* virtual */ OnObservedChanged(observed: TuObject, subhint: number, oldI: number, oldVal: any, oldRect: CGRectangle, newI: number, newVal: any, newRect: CGRectangle): void {
    }

    protected /* virtual */ OnParentChanged(oldgroup: TuGroup, newgroup: TuGroup): void {
    }

    public /* virtual */ OnSelectionDropped(evt: TuObjectEventArgs, view: TuView): boolean {
        return false;
    }

    public /* virtual */ OnSelectionDropReject(evt: TuObjectEventArgs, view: TuView): boolean {
        return false;
    }
    public /* virtual */ OnSingleClick(evt: TuInputEventArgs, view: TuView): boolean {
        return false;
    }

    public /* virtual */ Paint(g: Graphics, view: TuView): void {
    }

    public /* virtual */  Pick(p: CGPoint, selectableOnly: boolean): TuObject {
        //console.log('pick');
        if (!this.CanView()) {
            return undefined;
        }
        if (!this.ContainsPoint(p)) {
            return undefined;
        }
        if (!selectableOnly) {
            return this;
        }
        if (this.CanSelect()) {
            return this;
        }
        for (let i: TuObject = this.Parent; i != null; i = i.Parent) {
            if (i.CanSelect()) {
                return i;
            }
        }
        return undefined;
    }

    public Remove(obj?: TuObject): boolean {
        const layer: TuLayer = this.Layer;
        if (layer != null) {
            layer.Remove(this);
            //layer.ForceUpdate();
            return;
        }
        const parent: TuGroup = this.Parent;
        if (parent != null) {
            parent.Remove(this);
            //parent.ForceUpdate();
        }
        return true;
    }

    private isExist(): boolean {
        return this.Layer != null;
    }

    public /* virtual */ removeObserver(obj: TuObject): void {
        if (obj == null) {
            return;
        }
        if (this.myObservers != null && this.myObservers.Contains(obj)) {
            this.myObservers.Remove(obj);
            this.Changed(TuObjectEvents.ChangedRemovedObserver, 0, obj, NullRect, 0, undefined, NullRect);
        }
    }

    public /* virtual */ RemoveSelectionHandles(sel: TuSelection): void {
        sel.removeHandles(this);
    }

    public /* internal */ setBeingRemoved(value: boolean): void {
        if (value) {
            this.InternalFlags = this.InternalFlags | flagBeingRemoved;
            return;
        }
        this.InternalFlags = this.InternalFlags & ~flagBeingRemoved;
    }

    public /* internal */  setLayer(value: TuLayer, mainObj: TuObject, undoing: boolean): void {
        let goObjectArray: TuObject[];
        let i: number;
        const goGroups: TuGroup = as(this, Types.TuGroup);
        if (goGroups != null) {
            goObjectArray = goGroups.CopyArray();
            for (let i = 0; i < goObjectArray.length; i++) {
                goObjectArray[i].setLayer(value, mainObj, undoing);
            }
        }
        const goLayers: TuLayer = this.myLayer;
        const goLayers1: TuLayer = value;
        if (goLayers !== goLayers1) {
            if (goLayers1 == null) {
                if (!undoing || is.typeof<TuControl>(this, Types.TuControl)) {
                    this.OnLayerChanged(goLayers, undefined, mainObj);
                    if (this.myObservers != null && !this.SuspendsUpdates) {
                        const bounds: CGRectangle = this.Bounds;
                        goObjectArray = this.myObservers.CopyArray();
                        for (let i = 0; i < goObjectArray.length; i++) {
                            goObjectArray[i].OnObservedChanged(this, 903, 0, goLayers, bounds, 0, goLayers1, bounds);
                        }
                    }
                }
                this.myLayer = null;
                return;
            }
            this.myLayer = goLayers1;
            if (!undoing) {
                this.OnLayerChanged(goLayers, goLayers1, mainObj);
                if (this.myObservers != null && !this.SuspendsUpdates) {
                    const int32: number = (goLayers == null ? 902 : 904);
                    const rectangleF: CGRectangle = this.Bounds;
                    goObjectArray = this.myObservers.CopyArray();
                    for (i = 0; i < goObjectArray.length; i++) {
                        goObjectArray[i].OnObservedChanged(this, int32, 0, goLayers, rectangleF, 0, goLayers1, rectangleF);
                    }
                }
            }
        }
    }

    public /* internal */ setParent(value: TuGroup, undoing: boolean): void {
        const goGroups: TuGroup = this.myParent;
        const goGroups1: TuGroup = value;
        if (goGroups !== goGroups1) {
            if (goGroups1 == null) {
                if (!undoing) {
                    this.OnParentChanged(goGroups, undefined);
                }
                this.setLayer(undefined, this, undoing);
                this.myParent = null;
                return;
            }
            this.myParent = goGroups1;
            this.setLayer(goGroups1.Layer, this, undoing);
            if (!undoing) {
                this.OnParentChanged(goGroups, goGroups1);
            }
        }
    }

    public /* virtual */  setRectangleSpotLocation(r: CGRectangle, spot: Spot, p: CGPoint): CGRectangle {
        if (spot === MiddleCenter || spot === Middle) {
            r.X = p.X - r.Width / 2;
            r.Y = p.Y - r.Height / 2;
            return r;
        } else if (spot === TopLeft) {
            r.X = p.X;
            r.Y = p.Y;
            return r;
        } else if (spot === TopRight) {
            r.X = p.X - r.Width;
            r.Y = p.Y;
            return r;
        } else if (spot === BottomRight) {
            r.X = p.X - r.Width;
            r.Y = p.Y - r.Height;
            return r;
        } else if (spot === BottomLeft) {
            r.X = p.X;
            r.Y = p.Y - r.Height;
            return r;
        } else if (spot === MiddleTop || spot === TopCenter) {
            r.X = p.X - r.Width / 2;
            r.Y = p.Y;
            return r;
        } else if (spot === MiddleRight) {
            r.X = p.X - r.Width;
            r.Y = p.Y - r.Height / 2;
            return r;
        } else if (spot === MiddleBottom || spot === BottomCenter) {
            r.X = p.X - r.Width / 2;
            r.Y = p.Y - r.Height;
            return r;
        } else if (spot === MiddleLeft) {
            r.X = p.X;
            r.Y = p.Y - r.Height / 2;
            return r;
        }

        return r;
    }

    public /* virtual */ setSizeKeepingLocation(s: CGSize): void {
        this.Size = s;
    }
    public setSpotLocation(spot: Spot, newp: CGPoint): void;
    public setSpotLocation(spot: Spot, obj: TuObject, otherSpot: Spot): void;
    public setSpotLocation(spot: Spot, obj: TuObject, otherSpot: Spot, offset: CGSize): void;
    public setSpotLocation(spot: Spot, obj: TuObject, otherSpot: Spot, dx: float, dy: float): void;
    public /* virtual */  setSpotLocation(...args: any[]): void {
        if (args.length === 2) {
            const spot: Spot = args[0];
            const newp: CGPoint = args[1];
            const bounds: CGRectangle = this.Bounds;
            this.Bounds = this.setRectangleSpotLocation(bounds, spot, newp);
        } else if (args.length === 3) {
            const spot: Spot = args[0];
            const obj: TuObject = args[1];
            const otherSpot: Spot = args[2];
            this.setSpotLocation(spot, obj.GetSpotLocation(otherSpot));
        } else if (args.length === 4) {
            const spot: Spot = args[0];
            const obj: TuObject = args[1];
            const otherSpot: Spot = args[2];
            const offset: CGSize = args[3];
            const spotLocation: CGPoint = obj.GetSpotLocation(otherSpot);
            this.setSpotLocation(spot, new CGPoint(spotLocation.X + offset.Width, spotLocation.Y + offset.Height));
        } else if (args.length === 5) {
            const spot: Spot = args[0];
            const obj: TuObject = args[1];
            const otherSpot: Spot = args[2];
            const dx: float = args[3];
            const dy: float = args[4];
            const spotLocation: CGPoint = obj.GetSpotLocation(otherSpot);
            this.setSpotLocation(spot, new CGPoint(spotLocation.X + dx, spotLocation.Y + dy));
        }
    }

    public /*virtual*/ spotOpposite(spot: Spot): Spot {
        switch (spot) {
            case Middle:
            case MiddleCenter:
                {
                    return Middle;
                }
            case TopLeft:
                {
                    return BottomRight;
                }
            case TopRight:
                {
                    return BottomLeft;
                }
            case BottomRight: {
                return TopLeft;
            }
            case BottomLeft: {
                return TopRight;
            }
            case MiddleBottom:
            case BottomCenter:
                {
                    return TopCenter;
                }
            case MiddleLeft: {
                return TopCenter;
            }
            case MiddleTop:
            case TopCenter: {
                return MiddleBottom;
            }
            case MiddleRight: {
                return MiddleLeft;
            }

        }

        return spot;
    }
    public GetType() {
        return this.constructor['__type__'];
    }

    public InvalidateCache() {
        this.myCachedSvgNode = null;
        this.myCachedHtmlNode = null;
    }

    public override ForceUpdate(): void {
        this.InvalidateCache();
        super.ForceUpdate();
    }
}

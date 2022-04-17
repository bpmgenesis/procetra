import {
    float, ArgumentException, List, Event, ClassInfo, Dictionary, as, Type, Activator, is, error, TString, trace, foreach, CONTINUE, BREAK, StringBuilder, Console,
    IEnumerator, using, IKeyValuePair, IList, Out, NotImplementedException, Queue, ICollection, typeOf,
} from '@tuval/core';
import { CGRectangle, CGPoint, CGSize, CGColor, CoreGraphicTypes, CGImage } from '@tuval/cg';
import {
    CompositingQuality, SmoothingMode, TextRenderingHint,
    InterpolationMode, PixelOffsetMode, Bitmap
} from '@tuval/graphics';
import { Teact, Control, ContainerControl, TComponent, State } from '@tuval/forms';
import { TuDocument } from '../TuDocument/TuDocument';
import { GeomUtilities } from '../GeomUtilities';
import { TuLink } from '../TuLink/TuLink';
import { ITuTool } from '../TuTool/ITuTool';
import { TuViewSheetStyle } from './TuViewSheetStyle';
import { SolidBrush, Pen, DashStyle, GraphicTypes, Brushes, Graphics, GraphicsUnit, Brush, Pens } from '@tuval/graphics';
import { TuInputEventArgs } from '../TuInputEventArgs';
import { TuGrid } from '../TuGrid/TuGrid';
import { TuSheet } from '../TuSheet/TuSheet';
import { Types } from '../types';
import { ITuLayerCollectionContainer } from '../TuLayer/ITuLayerCollectionContainer';
import { TuRectangle } from '../TuRectangle/TuRectangle';
import { TuControl } from '../TuControl/TuControl';
import { TuSelection } from '../TuSelection/TuSelection';
import { TuPickInRectangleStyle } from '../TuPickInRectangleStyle';
import { TuViewDisableKeys } from '../TuViewDisableKeys';
import { TuLayerCollection } from '../TuLayer/TuLayerCollection';
import { TuLayer } from '../TuLayer/TuLayer';
import { TuToolContext } from '../TuTool/TuToolContext';
import { Spot, TopLeft, Middle } from '../Spot';
import { TuViewSnapStyle } from './TuViewSnapStyle';
import { TuViewGridStyle } from '../TuGrid/TuViewGridStyle';
import { TuToolAction } from '../TuTool/TuToolAction';
import { PaintEventArgs, TuToolPanning } from '../TuTool/TuToolPanning';
import { TuToolRelinking } from '../TuTool/TuToolRelinking';
import { TuToolResizing } from '../TuTool/TuToolResizing';
import { TuToolLinkingNew } from '../TuTool/TuToolLinkingNew';
import { TuToolRubberBanding } from '../TuTool/TuToolRubberBanding';
import { TuToolDragging } from '../TuTool/TuToolDragging';
import { TuToolSelecting } from '../TuTool/TuToolSelecting';
import { TuLabeledLink } from '../TuLabeledLink/TuLabeledLink';
import { ITuLink } from '../ITuLink';
import { TuTool } from '../TuTool/TuTool';
import { TuViewScrollBarVisibility } from './TuViewScrollBarVisibility';
import { TuCollection } from '../TuCollection/TuCollection';
import { TuCopyDictionary } from '../TuCopyDictionary';
import { ITuCollection } from '../ITuCollection';
import { ITuLabeledPart } from '../TuLabeledNode/ITuLabeledPart';
import { TuText } from '../TuText/TuText';
import { ITuPort } from '../ITuPort';
import { ITuRoutable } from '../ITuRoutable';
import { TuSubGraphBase } from '../TuSubGraph/TuSubGraphBase';
import { TuObjectEventArgs } from '../TuObject/TuObjectEventArgs';
import { TuInputState } from '../TuInputState';
import { TuUndoManager } from '../TuDocument/TuUndoManager';
import { TuUndoManagerCompoundEdit } from '../TuDocument/TuUndoManagerCompoundEdit';
import { TuShape } from '../TuShape/TuShape';
import { TuChangedEventArgs } from '../TuChangedEventArgs';
import { TuSelectionEventArgs } from '../TuSelection/TuSelectionEventArgs';
import { DragEventArgs } from '../Forms/DragEventArgs';
import { EventArgs } from '../Forms/EventArgs';
import { IDataObject } from '../Forms/IDataObject';
import { DataObject } from '../Forms/DataObject';
import { Clipboard } from '../Forms/Clipboard';
import { ScrollEventArgs } from '../Forms/ScrollEventArgs';
import { ITuLayerAbilities } from '../TuLayer/ITuLayerAbilities';
import { EventHandler } from '../Forms/EventHandler';
import { SystemInformation } from '../Forms/SystemInformation';
import { Border3DStyle } from '../Forms/Border3DStyle';
import { Cursor } from '../Forms/Cursor';
import { Cursors } from '../Forms/Cursors';
import { BorderStyle } from '../Forms/BorderStyle';
import { FormWindowState } from '../Forms/FormWindowState';
import { DataFormats } from '../Forms/DataFormats';
import { TuToolManager } from '../TuTool/TuToolManager';
import { PrintDocument } from '../Forms/PrintDocument';
import { CancelEventArgs } from '../Forms/CancelEventArgs';
import { DragDropEffects } from '../Forms/DragDropEffects';
import { ScrollEventHandler } from '../Forms/ScrollEventHandler';
import { Keys } from '../Forms/Keys';
import { TuDocumentEvents } from '../TuDocument/TuDocumentEvents';
import { MouseEventArgs } from '../Forms/MouseEventArgs';
import { TuLayerCollectionEnumerator } from '../TuLayer/TuLayerCollectionEnumerator';
import { PrintPageEventHandler } from '../Forms/PrintPageEventHandler';
import { DialogResult } from '../Forms/DialogResult';
import { Pens_Black, SystemPens_WindowFrame } from '../Globals';
import { PrintPageEventArgs } from '../Forms/PrintPageEventArgs';
import { PrintRange } from '../Forms/PrintRange';
import { TuLayerCache } from '../TuLayer/TuLayerCache';
import { TuLayerCollectionObjectEnumerator } from '../TuLayer/TuLayerCollectionObjectEnumerator';
import { ITuDragSnapper } from '../ITuDragSnapper';
import { TuGroupEnumerator } from '../TuGroup/TuGroupEnumerator';
import { TuGroup } from '../TuGroup/TuGroup';
import { TuInvalidateCollection } from '../TuInvalidateCollection';
import { TuChangedEventHandler } from '../TuChangedEventHandler';
import { TuDragImage } from '../TuDragImage';
import { FrameStyle } from '../Forms/FrameStyle';
import { ScrollEventType } from '../Forms/ScrollEventType';
import { SystemColors } from '../Forms/SystemColors';
import { TuObject } from '../TuObject/TuObject';
import { int } from '@tuval/core';
import { MouseButtons } from '../Forms/MouseButtons';
import { ControlPaint } from '../Forms/ControlPaint';
import { PropertyChangedEventArgs } from '../Forms/PropertyChangedEventArgs';
import { KeyEventArgs } from '../Forms/KeyEventArgs';
import { TuObjectEnterLeaveEventArgs } from '../TuObjectEnterLeaveEventArgs';
import { TuLayerEnumerator } from '../TuLayer/TuLayerEnumerator';
import { ViewRenderingMode } from './ViewRenderingMode';
import { TuViewSvgRenderrer } from './TuViewSvgRenderrer';
import { TuViewCanvasRenderrer } from './TuViewCanvasRenderrer';
import { TuViewHtmlRenderrer } from './TuViewHtmlRenderrer';
import { Animation } from './Animation';
import { TuXmlTransformer } from '../Xml/TuXmlTransformer';
import { TuObjectSvgRenderer } from '../Xml/TuObjectSvgRenderer';
import { TuRectangleSvgRenderer } from '../Xml/TuRectangleSvgRenderer';

type Timer = any;
type PrintInfo = any;
type ContextMenu = any;
type ImageList = any;
type ToolTip = any;
type TuHScrollBarElement = any;
type TuButtonElement = any;
type Slider = any;
type Subscription = any;

let doubleClickTimerHandle: any;
let switchCount: int = 0;

@ClassInfo({
    fullName: Types.TuView,
    instanceof: [
        Types.TuView,
        Types.Control,
        Types.TuElement,
        Types.DisposableBase,
        Types.ITuLayerCollectionContainer,
        Types.ITuLayerAbilities
    ]
})
export class TuView extends TComponent implements ITuLayerCollectionContainer, ITuLayerAbilities {

    @State()
    private myFrameWidth:int;

    public get FrameWidth():int {
        return this.myFrameWidth;
    }

    public set FrameWidth(value:int) {
        this.myFrameWidth = value;;
    }


    @State()
    private myFrameHeight:int;

    public get FrameHeight():int {
        return this.myFrameHeight;
    }

    public set FrameHeight(value:int) {
        this.myFrameHeight = value;;
    }

    @State()
    private myDragEntered: boolean;

    @State()
    private batchAnim;
    @State()
    private myRenderingMode: ViewRenderingMode;

    public get RenderingMode(): ViewRenderingMode {
        return this.myRenderingMode;
    }

    public set RenderingMode(value: ViewRenderingMode) {
        this.myRenderingMode = value;;
    }


    @State()
    private myBackColor: CGColor;

    public get BackColor(): CGColor {
        return this.myBackColor;
    }

    public set BackColor(value: CGColor) {
        this.myBackColor = value;;
    }


    public Ref: HTMLOrSVGElement;

    private _renderView() {
        if (this.RenderingMode === ViewRenderingMode.Svg) {
            const result = [];
            return TuViewSvgRenderrer.Apply(this);
        } else if (this.RenderingMode === ViewRenderingMode.Canvas) {
            const result = [];
            return TuViewCanvasRenderrer.Apply(this);
        } else if (this.RenderingMode === ViewRenderingMode.Html) {
            const result = [];
            return TuViewHtmlRenderrer.Apply(this);
        }
    }


    public CreateElements() {
        const style = {};
        style['width'] = this.Width + 'px';
        style['height'] = this.Height + 'px';
        style['cursor'] = this.Cursor.Name;
        //style['overflow'] = 'scroll';

        return (
            <div
                style={style}
                /* ondblclick={(evt: MouseEvent) => {
                    let mouseButtons: MouseButtons;
                    if (evt.button === 0) {
                        mouseButtons = MouseButtons.Left;
                    } else if (evt.button === 2) {
                        mouseButtons = MouseButtons.Right;
                    }
                    let mouseEvent;
                    if (this.RenderingMode === ViewRenderingMode.Canvas || this.RenderingMode === ViewRenderingMode.Svg) {
                        mouseEvent = new MouseEventArgs(mouseButtons, 1, evt.offsetX, evt.offsetY, 0, evt);

                    } else if (this.RenderingMode === ViewRenderingMode.Html) {
                        const rect: DOMRect = (this.Ref as any).getBoundingClientRect();
                        mouseEvent = new MouseEventArgs(mouseButtons, 1, evt.clientX - rect.x, evt.clientY - rect.y, 0, evt);
                    }

                    this.OnDoubleClick(mouseEvent);
                }} */
                ondragenter={(evt: DragEvent) => {
                    if (this.myDragEntered) {
                        return;
                    }

                    this.myDragEntered = true;
                    const dataTransfer: DataTransfer = evt.dataTransfer;
                    //  const id = currentDataObject; //evt.dataTransfer.getData('text');

                    if (DataObject.CurrentDataObject == null) {
                        dataTransfer.effectAllowed = 'none';
                        return;
                    }

                    const dataObject = DataObject.CurrentDataObject;//new DataObject(id, dataTransfer);

                    let mouseButtons: MouseButtons;
                    if (evt.button === 0) {
                        mouseButtons = MouseButtons.Left;
                    } else if (evt.button === 2) {
                        mouseButtons = MouseButtons.Right;
                    }

                    let mouseEvent = new MouseEventArgs(mouseButtons, 1, evt.offsetX, evt.offsetY, 0, evt);


                    if (this.RenderingMode === ViewRenderingMode.Canvas || this.RenderingMode === ViewRenderingMode.Svg) {
                        mouseEvent = new MouseEventArgs(mouseButtons, 1, evt.offsetX, evt.offsetY, 0, evt);

                    } else if (this.RenderingMode === ViewRenderingMode.Html) {
                        const rect: DOMRect = (this.Ref as any).getBoundingClientRect();
                        mouseEvent = new MouseEventArgs(mouseButtons, 1, evt.clientX - rect.x, evt.clientY - rect.y, 0, evt);
                        //console.log(evt.clientX - rect.x, evt.clientY - rect.y);
                    }

                    const dragEventArgs: DragEventArgs = new DragEventArgs(dataObject, 0, mouseEvent.X, mouseEvent.Y, DragDropEffects.All, DragDropEffects.All);
                    this.onDragEnter(dragEventArgs);
                }}
                ondragover={(evt: DragEvent) => {
                    const dataTransfer: DataTransfer = evt.dataTransfer;
                    //const id = currentDataObject; //evt.dataTransfer.getData('text');

                    if (DataObject.CurrentDataObject == null) {
                        dataTransfer.effectAllowed = 'none';
                        return;
                    }

                    const dataObject = DataObject.CurrentDataObject;//new DataObject(id, dataTransfer);

                    let mouseButtons: MouseButtons;
                    if (evt.button === 0) {
                        mouseButtons = MouseButtons.Left;
                    } else if (evt.button === 2) {
                        mouseButtons = MouseButtons.Right;
                    }

                    let mouseEvent = new MouseEventArgs(mouseButtons, 1, evt.offsetX, evt.offsetY, 0, evt);


                    if (this.RenderingMode === ViewRenderingMode.Canvas || this.RenderingMode === ViewRenderingMode.Svg) {
                        mouseEvent = new MouseEventArgs(mouseButtons, 1, evt.offsetX, evt.offsetY, 0, evt);

                    } else if (this.RenderingMode === ViewRenderingMode.Html) {
                        const rect: DOMRect = (this.Ref as any).getBoundingClientRect();
                        mouseEvent = new MouseEventArgs(mouseButtons, 1, evt.clientX - rect.x, evt.clientY - rect.y, 0, evt);
                        //console.log(evt.clientX - rect.x, evt.clientY - rect.y);
                    }

                    const dragEventArgs: DragEventArgs = new DragEventArgs(dataObject, 0, mouseEvent.X, mouseEvent.Y, DragDropEffects.All, DragDropEffects.All);
                    this.onDragOver(dragEventArgs);
                    if (evt.preventDefault) {
                        evt.preventDefault(); // Necessary. Allows us to drop.
                    }
                    return false;
                }}
                ondrop={(evt: DragEvent) => {
                    this.myDragEntered = false;
                    const dataTransfer: DataTransfer = evt.dataTransfer;
                    // const id = currentDataObject; //evt.dataTransfer.getData('text');

                    if (DataObject.CurrentDataObject == null) {
                        dataTransfer.effectAllowed = 'none';
                        return;
                    }

                    const dataObject = DataObject.CurrentDataObject;//new DataObject(id, dataTransfer);

                    let mouseButtons: MouseButtons;
                    if (evt.button === 0) {
                        mouseButtons = MouseButtons.Left;
                    } else if (evt.button === 2) {
                        mouseButtons = MouseButtons.Right;
                    }

                    let mouseEvent = new MouseEventArgs(mouseButtons, 1, evt.offsetX, evt.offsetY, 0, evt);


                    if (this.RenderingMode === ViewRenderingMode.Canvas || this.RenderingMode === ViewRenderingMode.Svg) {
                        mouseEvent = new MouseEventArgs(mouseButtons, 1, evt.offsetX, evt.offsetY, 0, evt);

                    } else if (this.RenderingMode === ViewRenderingMode.Html) {
                        const rect: DOMRect = (this.Ref as any).getBoundingClientRect();
                        mouseEvent = new MouseEventArgs(mouseButtons, 1, evt.clientX - rect.x, evt.clientY - rect.y, 0, evt);
                        //console.log(evt.clientX - rect.x, evt.clientY - rect.y);
                    }

                    const dragEventArgs: DragEventArgs = new DragEventArgs(dataObject, 0, mouseEvent.X, mouseEvent.Y, DragDropEffects.All, DragDropEffects.All);
                    this.onDragDrop(dragEventArgs);

                    DataObject.CurrentDataObject = null; // reset data object
                }}
                onmousedown={(evt: MouseEvent) => {

                    let mouseButtons: MouseButtons;
                    if (evt.button === 0) {
                        mouseButtons = MouseButtons.Left;
                    } else if (evt.button === 2) {
                        mouseButtons = MouseButtons.Right;
                    }


                    // const mouseEvent = new MouseEventArgs(mouseButtons, 1, evt.offsetX, evt.offsetY, 0, evt);

                    let mouseEvent;
                    if (this.RenderingMode === ViewRenderingMode.Canvas || this.RenderingMode === ViewRenderingMode.Svg) {
                        mouseEvent = new MouseEventArgs(mouseButtons, 1, evt.offsetX, evt.offsetY, 0, evt);

                    } else if (this.RenderingMode === ViewRenderingMode.Html) {
                        const rect: DOMRect = (this.Ref as any).getBoundingClientRect();
                        mouseEvent = new MouseEventArgs(mouseButtons, 1, evt.clientX - rect.x, evt.clientY - rect.y, 0, evt);
                        //console.log(evt.clientX - rect.x, evt.clientY - rect.y);
                    }

                    this.onMouseDown(mouseEvent);

                    if (switchCount === 0) {
                        doubleClickTimerHandle = setTimeout(() => {
                            switchCount = 0;
                        }, 500);
                        switchCount++;
                    } else {
                        switchCount++;
                    }
                }}
                onmousemove={(evt: MouseEvent) => {
                    let mouseButtons: MouseButtons = MouseButtons.Left;
                    let mouseEvent;
                    if (this.RenderingMode === ViewRenderingMode.Canvas || this.RenderingMode === ViewRenderingMode.Svg) {
                        mouseEvent = new MouseEventArgs(mouseButtons, 1, evt.offsetX, evt.offsetY, 0, evt);

                    } else if (this.RenderingMode === ViewRenderingMode.Html) {
                        const rect: DOMRect = (this.Ref as any).getBoundingClientRect();
                        mouseEvent = new MouseEventArgs(mouseButtons, 1, evt.clientX - rect.x, evt.clientY - rect.y, 0, evt);
                        //console.log(evt.clientX - rect.x, evt.clientY - rect.y);
                    }
                    //if (evt.shiftKey) {
                    this.onMouseMove(mouseEvent);
                }}
                onmouseup={(evt: MouseEvent) => {
                    let mouseButtons: MouseButtons = MouseButtons.Left;

                    let mouseEvent;
                    //const mouseEvent = new MouseEventArgs(mouseButtons, 1, evt.offsetX, evt.offsetY, 0, evt);
                    if (this.RenderingMode === ViewRenderingMode.Canvas || this.RenderingMode === ViewRenderingMode.Svg) {
                        mouseEvent = new MouseEventArgs(mouseButtons, 1, evt.offsetX, evt.offsetY, 0, evt);

                    } else if (this.RenderingMode === ViewRenderingMode.Html) {
                        const rect: DOMRect = (this.Ref as any).getBoundingClientRect();
                        mouseEvent = new MouseEventArgs(mouseButtons, 1, evt.clientX - rect.x, evt.clientY - rect.y, 0, evt);
                        // console.log(evt.clientX - rect.x, evt.clientY - rect.y);
                    }

                    if (switchCount === 0) { // timer is reseted.
                        this.onMouseUp(mouseEvent);
                    } else if (switchCount === 1) {
                        switchCount++;
                        this.onMouseUp(mouseEvent);
                    } else if (switchCount === 3) {
                        clearTimeout(doubleClickTimerHandle);
                        switchCount = 0;
                        this.OnDoubleClick(mouseEvent);
                    }
                }}>
                {this._renderView()}
            </div>
        );
        /*  return (
             <svg ref={(e) => this.Ref = e} width={this.Width} height={this.Height} viewBox={`0 0 ${this.Width} ${this.Height}`} xmlns="http://www.w3.org/2000/svg">
                 <defs>
                     <filter id="drop-shadow" height="200%" width="200%" x="-50%" y="-50%" filterUnits="objectBoundingBox">
                         <feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                         <feGaussianBlur stdDeviation="1.5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                         <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.075 0" in="shadowBlurOuter1" type="matrix" result="shadowMatrixOuter1"></feColorMatrix>
                         <feMerge><feMergeNode in="shadowMatrixOuter1"></feMergeNode>
                             <feMergeNode in="SourceGraphic"></feMergeNode></feMerge>
                     </filter>
                 </defs>
                 {this.renderCanvas()}
             </svg>
         ); */

    }
        /* internal */ static myVersion: float = 0;
		/* internal */ static myVersionMajor: number = 0;
		/* internal */ static myVersionMinor: number = 0;
		/* internal */ static myVersionAssembly: string;
    private static myLicenseKey: string;
        /* internal */ static myCAN: string;
    protected myDocumentChangedSubscription: Subscription;
    private static myClipboard: Dictionary<string, TuDocument>;
    private myUpdatingScrollBars: boolean = true;
    private myVertScrollHandler: ScrollEventHandler;
    private myHorizScrollHandler: ScrollEventHandler;
    private myShowVertScroll: TuViewScrollBarVisibility = TuViewScrollBarVisibility.IfNeeded;
    private myShowHorizScroll: TuViewScrollBarVisibility = TuViewScrollBarVisibility.IfNeeded;
    private myTopLeftCorner: Control;
    private myTopRightCorner: Control;
    private myBottomRightCorner: Control;
    private myBottomLeftCorner: Control;
    private myTopBar: Control;
    private myRightBar: Control;
    private myBottomBar: Control;
    private myLeftBar: Control;
    private mySafeOnDocumentChangedDelegate: EventHandler<any>;

    @State()
    private myQueuedEvents: Queue<TuChangedEventArgs>;

    @State()
    private myAllowDragOut: boolean;

    @State()
    private myExternalDragImage: TuObject;

    @State()
    private myPretendsInternalDrag: boolean;

    @State()
    private myExternalDragDropsOnEnter: boolean;
		/* internal */  myPaintEventArgs: PaintEventArgs;

    @State()
    private mySuppressPaint: number = 0;

    private myAutoScrollRegion: CGSize = new CGSize(SystemInformation.VerticalScrollBarWidth, SystemInformation.HorizontalScrollBarHeight);
    private myAutoScrollTime: number = 100;
    private myAutoScrollDelay: number = 1000;
    private myAutoScrollTimer: Timer;
    private myAutoScrollTimerEnabled: boolean = false;
    private myAutoScrollPoint: CGPoint = new CGPoint(0, 0);
    private myActioning: boolean = false;
    private myPanning: boolean = false;
    private myPanningOrigin: CGPoint = new CGPoint();
    private myToolTip: ToolTip;
    private myToolTipText: string = "";

    @State()
    private myDefaultCursor: Cursor;

    private myHoverTimer: Timer;
    private myHoverTimerEnabled: boolean = false;
    private myHoverDelay: number = 1000;
    private myHoverPoint: CGPoint = new CGPoint();
    private myWindowState: FormWindowState = FormWindowState.Normal;
    private myPrintInfo: PrintInfo;

    @State()
    private myPrintScale: float;

    @State()
    private myPrintsViewObjects: boolean;

    @State()
    private myDrawsXorMode: boolean;

    @State()
    private myPrevXorRect: CGRectangle;

    @State()
    private myPrevXorRectValid: boolean;

    @State()
    private myMarquee: TuRectangle;

    @State()
    private myEditControl: TuControl;

    @State()
    private myGoControls: List<TuControl>;

    @State()
    private myModalControl: Control;

    @State()
    private myCancelMouseDown: boolean;

    @State()
    private myImageList: ImageList;

    @State()
    private myBorderStyle: BorderStyle;

    @State()
    private myBorder3DStyle: Border3DStyle;

    @State()
    private myBorderSize: CGSize;

    public get BorderSize(): CGSize {
        return this.myBorderSize;
    }

    public set BorderSize(value: CGSize) {
        this.myBorderSize = value;
    }

    @State()
    private myDocument: TuDocument;

    @State()
    protected myDocChangedEventHandler: TuChangedEventHandler;

    @State()
    private mySelection: TuSelection;

    @State()
    private myMaximumSelectionCount: number;

    @State()
    private mySelectInRectangleStyle;

    @State()
    private myPrimarySelectionColor: CGColor;

    @State()
    private mySecondarySelectionColor: CGColor;


    @State()
    private myNoFocusSelectionColor: CGColor;

    @State()
    private myResizeHandleSize: CGSize;

    @State()
    private myResizeHandlePenWidth: float;

    @State()
    private myBoundingHandlePenWidth: float;

    @State()
    private myHidesSelection: boolean;

    @State()
    private myDisableKeys: TuViewDisableKeys;

    @State()
    private myArrowMoveSmall: float;

    @State()
    private myArrowMoveLarge: float;

    @State()
    private myLayers: TuLayerCollection;

    @State()
    private myBackgroundLayer: TuLayer;

    @State()
    private myScrollSmallChange: CGSize;

    @State()
    private myAutoPanRegion: CGSize;

    @State()
    private myShowsNegativeCoordinates: boolean;

    @State()
    private myOrigin: CGPoint;

    @State()
    private myHorizScale: float;

    @State()
    private myVertScale: float;

    @State()
    private myViewSize: CGSize;

    @State()
    private myDisplayRectangle: CGRectangle;

    @State()
    private myHorizWorld: float;

    @State()
    private myVertWorld: float;

    @State()
    private myPreviousCenter: CGPoint;

    @State()
    private mySmoothingMode: SmoothingMode;

    @State()
    private myTextRenderingHint: TextRenderingHint;

    @State()
    private myInterpolationMode: InterpolationMode;

    @State()
    private myCompositingQuality: CompositingQuality;

    @State()
    private myPixelOffsetMode: PixelOffsetMode; //PixelOffsetMode.HighQuality;

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
    private myAllowMouse: boolean;

    @State()
    private myAllowKey: boolean;

    // private GoView.DiagramLicense myCurrentResult;
    /* internal */  myBuffer: Bitmap;

    @State()
    private myBackgroundBrush: SolidBrush;

    public get BackgroundBrush(): SolidBrush {
        return this.myBackgroundBrush;
    }

    public set BackgroundBrush(value: SolidBrush) {
        this.myBackgroundBrush = value;
    }

    @State()
    private myTempArrays: CGPoint[][];

    @State()
    private myUpdateHandles: List<TuObject>;

    @State()
    private myIsRenderingBitmap: boolean;

    @State()
    private myFirstInput: TuInputEventArgs;

    @State()
    private myLastInput: TuInputEventArgs;

    @State()
    private myTool: ITuTool;

    @State()
    private myDefaultTool: ITuTool;

    @State()
    private myMouseDownTools: List<ITuTool>;

    @State()
    private myMouseMoveTools: List<ITuTool>;

    @State()
    private myMouseUpTools: List<ITuTool>;

    @State()
    private myDragsRealtime: boolean;

    @State()
    private myDragRoutesRealtime: boolean;

    @State()
    private mySelectionDropRejectOverValid: boolean;

    @State()
    private mySelectionDropRejectOver: TuObject;

    @State()
    private myPortGravity: float;

    @State()
    private myNewLinkPrototype: TuObject;

    @State()
    private myBackgroundGrid: TuGrid;

    @State()
    private mySheet: TuSheet;

    @State()
    private mySheetStyle: TuViewSheetStyle;

    @State()
    private mySheetRoom: CGSize;

    @State()
    private myShadowOffset: CGSize;

    @State()
    private myShadowColor: CGColor;

    @State()
    private myShadowBrush: SolidBrush;

    @State()
    private myShadowPen: Pen;

    @State()
    private myPaintNothingScale: float;

    @State()
    private myPaintGreekScale: float;

    @State()
    private myVisible: boolean;

    @State()
    private myWidth: int;

    @State()
    private myHeight: int;

    @State()
    private myControls: List<TComponent>;

    @State()
    private myCursor: Cursor;

    @State()
    private SelectionStarting: Event<EventHandler<EventArgs>>;

    @State()
    private SelectionMoved: Event<EventHandler<EventArgs>>;

    @State()
    private SelectionFinished: Event<EventHandler<EventArgs>>;

    @State()
    private SelectionDeleting: Event<EventHandler<CancelEventArgs>>;

    @State()
    private SelectionDeleted: Event<EventHandler<EventArgs>>;

    @State()
    private SelectionCopied: Event<EventHandler<EventArgs>>;

    @State()
    private ObjectSingleClicked: Event<EventHandler<TuObjectEventArgs>>;

    @State()
    private ObjectSelectionDropReject: Event<EventHandler<TuObjectEventArgs>>;

    @State()
    private ObjectSelectionDropped: Event<EventHandler<TuObjectEventArgs>>;

    @State()
    private ObjectResized: Event<EventHandler<TuSelectionEventArgs>>;

    @State()
    private ObjectLostSelection: Event<EventHandler<TuSelectionEventArgs>>;

    @State()
    private ObjectHover: Event<EventHandler<TuObjectEventArgs>>;

    @State()
    private ObjectGotSelection: Event<EventHandler<TuSelectionEventArgs>>;

    @State()
    private ObjectEnterLeave: Event<EventHandler<TuObjectEnterLeaveEventArgs>>;

    @State()
    private ObjectEdited: Event<EventHandler<TuSelectionEventArgs>>;

    @State()
    private ObjectContextClicked: Event<EventHandler<TuObjectEventArgs>>;

    @State()
    private ObjectDoubleClicked: Event<EventHandler<TuObjectEventArgs>>;

    @State()
    private LinkCreated: Event<EventHandler<TuSelectionEventArgs>>;

    @State()
    private LinkRelinked: Event<EventHandler<TuSelectionEventArgs>>;

    @State()
    private BackgroundContextClicked$: Event<EventHandler<TuInputEventArgs>>;

    @State()
    private BackgroundDoubleClicked$: Event<EventHandler<TuInputEventArgs>>;

    @State()
    private BackgroundHover$: Event<EventHandler<TuInputEventArgs>> = new Event();

    @State()
    private BackgroundSelectionDropped$: Event<EventHandler<TuInputEventArgs>>;

    @State()
    private BackgroundSelectionDropReject$: Event<EventHandler<TuInputEventArgs>>;

    @State()
    private BackgroundSingleClicked$: Event<EventHandler<TuInputEventArgs>>;

    @State()
    private ClipboardCopied$: Event<EventHandler<EventArgs>>;

    @State()
    private ClipboardPasted$: Event<EventHandler<EventArgs>>;

    @State()
    private DocumentChanged$: Event<EventHandler<TuChangedEventArgs>>;

    public get ClientRectangle(): CGRectangle {
        return new CGRectangle(0, 0, this.Width, this.Height);
    }

    public get Visible(): boolean {
        return this.myVisible;
    }
    public set Visible(value: boolean) {
        this.myVisible = value;
    }

    public get Width(): int {
        return this.myWidth;
    }
    public set Width(value: int) {
        this.myWidth = value;
    }

    public get Height(): int {
        return this.myHeight;
    }
    public set Height(value: int) {
        this.myHeight = value;
    }

    public get Controls(): List<TComponent> {
        return this.myControls;
    }
    public set Controls(value: List<TComponent>) {
        this.myControls = value;
    }

    public get Cursor(): Cursor {
        return this.myCursor;
    }
    public set Cursor(value: Cursor) {
        this.myCursor = value;
    }

    public get DefaultCursor(): Cursor {
        return this.getDefaultCursor();
    }
    public set DefaultCursor(value: Cursor) {
        this.setDefaultCursor(value);
    }


    public get DisplayRectangle(): CGRectangle {
        return new CGRectangle(0, 0, this.Width, this.Height);
    }

    //#region [Property] AllowCopy
    public get AllowCopy(): boolean {
        return this.getAllowCopy();
    }
    public set AllowCopy(value: boolean) {
        this.setAllowCopy(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  getAllowCopy(): boolean {
        return this.myAllowCopy;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ setAllowCopy(value: boolean) {
        if (this.myAllowCopy !== value) {
            this.myAllowCopy = value;
            this.raisePropertyChangedEvent("AllowCopy");
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

    /**
    * @hidden
    */
    protected /*virtual*/  getAllowDelete(): boolean {
        return this.myAllowDelete;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ setAllowDelete(value: boolean) {
        if (this.myAllowDelete !== value) {
            this.myAllowDelete = value;
            this.raisePropertyChangedEvent("AllowDelete");
        }
    }
    //#endregion

    //#region [Property] AllowDragOut
    public get AllowDragOut(): boolean {
        return this.getAllowDragOut();
    }
    public set AllowDragOut(value: boolean) {
        this.setAllowDragOut(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  getAllowDragOut(): boolean {
        return this.myAllowDragOut;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ setAllowDragOut(value: boolean) {
        if (this.myAllowDragOut !== value) {
            this.myAllowDragOut = value;
            this.raisePropertyChangedEvent("AllowDragOut");
        }
    }
    //#endregion

    //#region [Property] AllowDrop
    public get AllowDrop(): boolean {
        return this.getAllowDrop();
    }
    public set AllowDrop(value: boolean) {
        this.setAllowDrop(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  getAllowDrop(): boolean {
        throw new NotImplementedException('getAllowDrop');
        // return super.GetAllowDrop();
    }

    /**
    * @hidden
    */
    protected /*virtual*/ setAllowDrop(value: boolean) {
        try {
            this.AllowDragOut = false;
            //this.initAllowDrop2(value);
        }
        catch (exception) {
            this.AllowDragOut = false;
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

    /**
    * @hidden
    */
    protected /*virtual*/  getAllowEdit(): boolean {
        return this.myAllowEdit;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ setAllowEdit(value: boolean) {
        if (this.myAllowEdit !== value) {
            this.myAllowEdit = value;
            this.raisePropertyChangedEvent("AllowEdit");
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

    /**
    * @hidden
    */
    protected /*virtual*/  getAllowInsert(): boolean {
        return this.myAllowInsert;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ setAllowInsert(value: boolean) {
        if (this.myAllowInsert !== value) {
            this.myAllowInsert = value;
            this.raisePropertyChangedEvent("AllowInsert");
        }
    }
    //#endregion

    //#region [Property] AllowKey
    public get AllowKey(): boolean {
        return this.getAllowKey();
    }
    public set AllowKey(value: boolean) {
        this.setAllowKey(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  getAllowKey(): boolean {
        return this.myAllowKey;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ setAllowKey(value: boolean) {
        if (this.myAllowKey !== value) {
            this.myAllowKey = value;
            this.raisePropertyChangedEvent("AllowKey");
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

    /**
    * @hidden
    */
    protected /*virtual*/  getAllowLink(): boolean {
        return this.myAllowLink;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ setAllowLink(value: boolean) {
        if (this.myAllowLink !== value) {
            this.myAllowLink = value;
            this.raisePropertyChangedEvent("AllowLink");
        }
    }
    //#endregion

    //#region [Property] AllowMouse
    public get AllowMouse(): boolean {
        return this.getAllowMouse();
    }
    public set AllowMouse(value: boolean) {
        this.setAllowMouse(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  getAllowMouse(): boolean {
        return this.myAllowMouse;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ setAllowMouse(value: boolean) {
        if (this.myAllowMouse !== value) {
            this.myAllowMouse = value;
            this.raisePropertyChangedEvent("AllowMouse");
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

    /**
    * @hidden
    */
    protected /*virtual*/  getAllowMove(): boolean {
        return this.myAllowMove;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ setAllowMove(value: boolean) {
        if (this.myAllowMove !== value) {
            this.myAllowMove = value;
            this.raisePropertyChangedEvent("AllowMove");
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

    /**
    * @hidden
    */
    protected /*virtual*/  getAllowReshape(): boolean {
        return this.myAllowReshape;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ setAllowReshape(value: boolean) {
        if (this.myAllowReshape !== value) {
            this.myAllowReshape = value;
            this.raisePropertyChangedEvent("AllowReshape");
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

    /**
    * @hidden
    */
    protected /*virtual*/  getAllowResize(): boolean {
        return this.myAllowResize;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ setAllowResize(value: boolean) {
        if (this.myAllowResize !== value) {
            this.myAllowResize = value;
            this.raisePropertyChangedEvent("AllowResize");
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

    /**
    * @hidden
    */
    protected /*virtual*/  getAllowSelect(): boolean {
        return this.myAllowSelect;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ setAllowSelect(value: boolean) {
        if (this.myAllowSelect !== value) {
            this.myAllowSelect = value;
            this.raisePropertyChangedEvent("AllowSelect");
        }
    }
    //#endregion

    //#region [Property] ArrowMoveLarge
    public get ArrowMoveLarge(): float {
        return this.getArrowMoveLarge();
    }
    public set ArrowMoveLarge(value: float) {
        this.setArrowMoveLarge(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  getArrowMoveLarge(): float {
        return this.myArrowMoveLarge;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ setArrowMoveLarge(value: float) {
        if (this.myArrowMoveLarge !== value) {
            this.myArrowMoveLarge = value;
            this.raisePropertyChangedEvent("ArrowMoveLarge");
        }
    }
    //#endregion

    //#region [Property] ArrowMoveSmall
    public get ArrowMoveSmall(): float {
        return this.getArrowMoveSmall();
    }
    public set ArrowMoveSmall(value: float) {
        this.setArrowMoveSmall(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  getArrowMoveSmall(): float {
        return this.myArrowMoveSmall;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ setArrowMoveSmall(value: float) {
        if (this.myArrowMoveSmall !== value) {
            this.myArrowMoveSmall = value;
            this.raisePropertyChangedEvent("ArrowMoveSmall");
        }
    }
    //#endregion

    //#region [Property] AutoPanRegion
    public get AutoPanRegion(): CGSize {
        return this.getAutoPanRegion();
    }
    public set AutoPanRegion(value: CGSize) {
        this.setAutoPanRegion(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  getAutoPanRegion(): CGSize {
        return this.myAutoPanRegion;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ setAutoPanRegion(value: CGSize) {
        if (this.myAutoPanRegion.NotEquals(value)) {
            if (value.Width < 0 || value.Height < 0) {
                throw new ArgumentException("New Size value for TuView.AutoPanRegion must have non-negative dimensions");
            }
            this.myAutoPanRegion = value;
            this.raisePropertyChangedEvent("AutoPanRegion");
        }
    }
    //#endregion

    //#region [Property] AutoScrollDelay
    public get AutoScrollDelay(): number {
        return this.getAutoScrollDelay();
    }
    public set AutoScrollDelay(value: number) {
        this.setAutoScrollDelay(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  getAutoScrollDelay(): number {
        return this.myAutoScrollDelay;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ setAutoScrollDelay(value: number) {
        if (this.myAutoScrollDelay != value && value >= 0) {
            this.myAutoScrollDelay = value;
            this.raisePropertyChangedEvent("AutoScrollDelay");
        }
    }
    //#endregion

    //#region [Property] AutoScrollRegion
    public get AutoScrollRegion(): CGSize {
        return this.getAutoScrollRegion();
    }
    public set AutoScrollRegion(value: CGSize) {
        this.setAutoScrollRegion(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  getAutoScrollRegion(): CGSize {
        return this.myAutoScrollRegion;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ setAutoScrollRegion(value: CGSize) {
        if (this.myAutoScrollRegion.NotEquals(value)) {
            if (value.Width < 0 || value.Height < 0) {
                throw new ArgumentException("New Size value for TuView.AutoScrollRegion must have non-negative dimensions");
            }
            this.myAutoScrollRegion = value;
            this.raisePropertyChangedEvent("AutoScrollRegion");
        }
    }
    //#endregion

    //#region [Property] AutoScrollTime
    public get AutoScrollTime(): number {
        return this.getAutoScrollTime();
    }
    public set AutoScrollTime(value: number) {
        this.setAutoScrollTime(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  getAutoScrollTime(): number {
        return this.myAutoScrollTime;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ setAutoScrollTime(value: number) {
        if (this.myAutoScrollTime !== value && value >= 0) {
            this.myAutoScrollTime = value;
            this.raisePropertyChangedEvent("AutoScrollTime");
        }
    }
    //#endregion

    //#region [Property] BackgroundGrid
    public get BackgroundGrid(): TuGrid {
        return this.getBackgroundGrid();
    }
    public set BackgroundGrid(value: TuGrid) {
        this.setBackgroundGrid(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  getBackgroundGrid(): TuGrid {
        return this.myBackgroundGrid;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ setBackgroundGrid(value: TuGrid) {
        const goGrid: TuGrid = this.myBackgroundGrid;
        if (goGrid !== value) {
            let backgroundLayer: TuLayer = this.BackgroundLayer;
            if (goGrid != null) {
                if (goGrid.Layer != null) {
                    backgroundLayer = goGrid.Layer;
                }
                goGrid.Remove();
            }
            this.myBackgroundGrid = value;
            backgroundLayer.Add(this.myBackgroundGrid);
            if (goGrid != null && value != null) {
                value.Visible = goGrid.Visible;
                value.Printable = goGrid.Printable;
                value.Selectable = goGrid.Selectable;
            }
            this.raisePropertyChangedEvent("Grid");
        }
    }
    //#endregion

    //#region [Property] BackgroundHasSheet
    public get BackgroundHasSheet(): boolean {
        return this.getBackgroundHasSheet();
    }
    public set BackgroundHasSheet(value: boolean) {
        this.setBackgroundHasSheet(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  getBackgroundHasSheet(): boolean {
        return this.Sheet != null;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ setBackgroundHasSheet(value: boolean) {
        if (!value) {
            this.Sheet = null;
        }
        else if (this.Sheet == null) {
            this.Sheet = this.createSheet();
            if (this.Sheet != null) {
                this.myPreviousCenter = this.Sheet.Center;
            }
            this.updateExtent();
            return;
        }
    }
    //#endregion

    //#region [Property] BackgroundLayer
    public get BackgroundLayer(): TuLayer {
        return this.getBackgroundLayer();
    }
    public set BackgroundLayer(value: TuLayer) {
        this.setBackgroundLayer(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  getBackgroundLayer(): TuLayer {
        return this.myBackgroundLayer;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ setBackgroundLayer(value: TuLayer) {
        if (this.myBackgroundLayer !== value) {
            if (value == null || value.View != this) {
                throw new ArgumentException("The new value for TuView.BackgroundLayer must belong to this view.");
            }
            this.myBackgroundLayer = value;
            this.raisePropertyChangedEvent("BackgroundLayer");
        }
    }
    //#endregion

    //#region [Property] Border3DStyle
    public get Border3DStyle(): Border3DStyle {
        return this.getBorder3DStyle();
    }
    public set Border3DStyle(value: Border3DStyle) {
        this.setBorder3DStyle(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getBorder3DStyle(): Border3DStyle {
        return this.myBorder3DStyle;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setBorder3DStyle(value: Border3DStyle) {
        if (this.myBorder3DStyle != value) {
            this.myBorder3DStyle = value;
            this.raisePropertyChangedEvent("Border3DStyle");
        }
    }
    //#endregion

    //#region [Property] BorderStyle
    public get BorderStyle(): BorderStyle {
        return this.getBorderStyle();
    }
    public set BorderStyle(value: BorderStyle) {
        this.setBorderStyle(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getBorderStyle(): BorderStyle {
        return this.myBorderStyle;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setBorderStyle(value: BorderStyle) {
        if (this.myBorderStyle != value) {
            this.myBorderStyle = value;
            this.updateBorderWidths();
            this.raisePropertyChangedEvent("BorderStyle");
        }
    }
    //#endregion

    //#region [Property] BottomBar
    public get BottomBar(): Control {
        return this.getBottomBar();
    }
    public set BottomBar(value: Control) {
        this.setBottomBar(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getBottomBar(): Control {
        return this.myBottomBar;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setBottomBar(value: Control) {
        const control: Control = this.myBottomBar;
        if (control !== value) {
            if (value != null && (value as any).Parent != null) {
                throw new ArgumentException("new Control already belongs to a Control; remove it from there first");
            }
            if (control != null) {
                const hScrollBar: TuHScrollBarElement = as(control, Types.TuHScrollBarElement);
                if (hScrollBar != null) {
                    hScrollBar.Scroll.remove(this.myHorizScrollHandler);
                }
                this.Controls.Remove(control);
            }
            this.myBottomBar = value;
            if (value != null) {
                this.Controls.Add(value);
                const width: TuHScrollBarElement = as(value, Types.TuHScrollBarElement);
                if (width != null) {
                    width.SmallChange = this.ScrollSmallChange.Width;
                    width.Scroll.add(this.myHorizScrollHandler);
                }
            }
            this.layoutScrollBars(true);
            this.raisePropertyChangedEvent("BottomBar");
        }
    }
    //#endregion

    //#region [Property] BottomLeftCorner
    public get BottomLeftCorner(): Control {
        return this.getBottomLeftCorner();
    }
    public set BottomLeftCorner(value: Control) {
        this.setBottomLeftCorner(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getBottomLeftCorner(): Control {
        return this.myBottomLeftCorner;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setBottomLeftCorner(value: Control) {
        const control: Control = this.myBottomLeftCorner;
        if (control !== value) {
            if (value != null && (value as any).Parent != null) {
                throw new ArgumentException("new Control already belongs to a Control; remove it from there first");
            }
            if (control != null) {
                this.Controls.Remove(control);
            }
            this.myBottomLeftCorner = value;
            if (value != null) {
                // TODO
                this.Controls.Add(value);
            }
            this.layoutScrollBars(true);
            this.raisePropertyChangedEvent("BottomLeftCorner");
        }
    }
    //#endregion

    //#region [Property] BottomRightCorner
    public get BottomRightCorner(): Control {
        return this.getBottomRightCorner();
    }
    public set BottomRightCorner(value: Control) {
        this.setBottomRightCorner(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getBottomRightCorner(): Control {
        return this.myBottomLeftCorner;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setBottomRightCorner(value: Control) {
        const control: Control = this.myBottomRightCorner;
        if (control !== value) {
            if (value != null && (value as any).Parent != null) {
                throw new ArgumentException("new Control already belongs to a Control; remove it from there first");
            }
            if (control != null) {
                this.Controls.Remove(control);
            }
            this.myBottomRightCorner = value;
            if (value != null) {
                this.Controls.Add(value);
            }
            this.layoutScrollBars(true);
            this.raisePropertyChangedEvent("BottomRightCorner");
        }
    }
    //#endregion

    //#region [Property] BoundingHandlePenWidth
    public get BoundingHandlePenWidth(): float {
        return this.getBoundingHandlePenWidth();
    }
    public set BoundingHandlePenWidth(value: float) {
        this.setBoundingHandlePenWidth(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getBoundingHandlePenWidth(): float {
        return this.myBoundingHandlePenWidth;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setBoundingHandlePenWidth(value: float) {
        if (this.myBoundingHandlePenWidth !== value) {
            this.myBoundingHandlePenWidth = value;
            this.raisePropertyChangedEvent("BoundingHandlePenWidth");
        }
    }
    //#endregion

    //#region [Property] CompositingQuality
    public get CompositingQuality(): CompositingQuality {
        return this.getCompositingQuality();
    }
    public set CompositingQuality(value: CompositingQuality) {
        this.setCompositingQuality(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getCompositingQuality(): CompositingQuality {
        return this.myCompositingQuality;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setCompositingQuality(value: CompositingQuality) {
        if (this.myCompositingQuality !== value && value !== CompositingQuality.Invalid) {
            this.myCompositingQuality = value;
            this.raisePropertyChangedEvent("CompositingQuality");
        }
    }
    //#endregion

    //#region [Property] ContextClickSingleSelection
    public get ContextClickSingleSelection(): boolean {
        return this.getContextClickSingleSelection();
    }
    public set ContextClickSingleSelection(value: boolean) {
        this.setContextClickSingleSelection(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getContextClickSingleSelection(): boolean {
        const goToolContext: TuToolContext = as(this.findMouseTool(typeOf(Types.TuToolContext), true), Types.TuToolContext);
        if (goToolContext == null) {
            return true;
        }
        return goToolContext.SingleSelection;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setContextClickSingleSelection(value: boolean) {
        const goToolContext: TuToolContext = as(this.findMouseTool(typeOf(Types.TuToolContext), true), Types.TuToolContext);
        if (goToolContext != null) {
            goToolContext.SingleSelection = value;
        }
    }
    //#endregion

    //#region [Property] CursorName

    public get CursorName(): string {
        return this.getCursorName();
    }
    public set CursorName(value: string) {
        this.setCursorName(value);
    }

    /**
     * @hidden
     */
    public /*virtual*/ getCursorName(): string {
        const cursor: Cursor = this.Cursor;
        if (cursor == this.DefaultCursor) {
            return "default";
        }
        if (cursor == Cursors.AppStarting) {
            return "appstarting";
        }
        if (cursor == Cursors.Arrow) {
            return "arrow";
        }
        if (cursor == Cursors.Cross) {
            return "crosshair";
        }
        if (cursor == Cursors.Hand) {
            return "pointer";
        }
        if (cursor == Cursors.Help) {
            return "help";
        }
        if (cursor == Cursors.HSplit) {
            return "row-resize";
        }
        if (cursor == Cursors.IBeam) {
            return "text";
        }
        if (cursor == Cursors.No) {
            return "not-allowed";
        }
        if (cursor == Cursors.NoMove2D) {
            return "nomove2d";
        }
        if (cursor == Cursors.NoMoveHoriz) {
            return "nomovehoriz";
        }
        if (cursor == Cursors.NoMoveVert) {
            return "nomovevert";
        }
        if (cursor == Cursors.PanEast) {
            return "paneast";
        }
        if (cursor == Cursors.PanNE) {
            return "panne";
        }
        if (cursor == Cursors.PanNorth) {
            return "pannorth";
        }
        if (cursor == Cursors.PanNW) {
            return "pannw";
        }
        if (cursor == Cursors.PanSE) {
            return "panse";
        }
        if (cursor == Cursors.PanSouth) {
            return "pansouth";
        }
        if (cursor == Cursors.PanSW) {
            return "pansw";
        }
        if (cursor == Cursors.PanWest) {
            return "panwest";
        }
        if (cursor == Cursors.SizeAll) {
            return "move";
        }
        if (cursor == Cursors.SizeNESW) {
            return "ne-resize";
        }
        if (cursor == Cursors.SizeNS) {
            return "s-resize";
        }
        if (cursor == Cursors.SizeNWSE) {
            return "se-resize";
        }
        if (cursor == Cursors.SizeWE) {
            return "e-resize";
        }
        if (cursor == Cursors.UpArrow) {
            return "uparrow";
        }
        if (cursor == Cursors.VSplit) {
            return "col-resize";
        }
        if (cursor == Cursors.WaitCursor) {
            return "wait";
        }
        return undefined;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setCursorName(value: string) {
        let noMove2D: Cursor = undefined;
        const str: string = this.standardizeCursorName(value);
        if (str == "nomove2d") {
            noMove2D = Cursors.NoMove2D;
        } else if (str == "move") {
            noMove2D = Cursors.SizeAll;
        } else if (str == "help") {
            noMove2D = Cursors.Help;
        } else if (str == "n-resize") {
            noMove2D = Cursors.SizeNS;
        } else if (str == "appstarting") {
            noMove2D = Cursors.AppStarting;
        } else if (str == "pannorth") {
            noMove2D = Cursors.PanNorth;
        } else if (str == "sw-resize") {
            noMove2D = Cursors.SizeNESW;
        } else if (str == "s-resize") {
            noMove2D = Cursors.SizeNS;
        } else if (str == "nomovevert") {
            noMove2D = Cursors.NoMoveVert;
        } else if (str == "se-resize") {
            noMove2D = Cursors.SizeNWSE;
        } else if (str == "wait") {
            noMove2D = Cursors.WaitCursor;
        } else if (str == "arrow") {
            noMove2D = Cursors.Arrow;
        } else if (str == "default") {
            noMove2D = this.DefaultCursor;
        } else if (str == "e-resize") {
            noMove2D = Cursors.SizeWE;
        } else if (str == "pointer") {
            noMove2D = Cursors.Hand;
        } else if (str == "paneast") {
            noMove2D = Cursors.PanEast;
        } else if (str == "nw-resize") {
            noMove2D = Cursors.SizeNWSE;
        } else if (str == "nomovehoriz") {
            noMove2D = Cursors.NoMoveHoriz;
        } else if (str == "row-resize") {
            noMove2D = Cursors.HSplit;
        } else if (str == "panwest") {
            noMove2D = Cursors.PanWest;
        } else if (str == "panne") {
            noMove2D = Cursors.PanNE;
        } else if (str == "text") {
            noMove2D = Cursors.IBeam;
        } else if (str == "crosshair") {
            noMove2D = Cursors.Cross;
        } else if (str == "hand") {
            noMove2D = Cursors.Hand;
        } else if (str == "pannw") {
            noMove2D = Cursors.PanNW;
        } else if (str == "panse") {
            noMove2D = Cursors.PanSE;
        } else if (str == "pansouth") {
            noMove2D = Cursors.PanSouth;
        } else if (str == "not-allowed") {
            noMove2D = Cursors.No;
        } else if (str == "ne-resize") {
            noMove2D = Cursors.SizeNESW;
        }
        else if (str == "col-resize") {
            noMove2D = Cursors.VSplit;
        } else if (str == "pansw") {
            noMove2D = Cursors.PanSW;
        } else if (str == "w-resize") {
            noMove2D = Cursors.SizeWE;
        } else if (str == "uparrow") {
            noMove2D = Cursors.UpArrow;
        }
        this.Cursor = noMove2D;
    }
    //#endregion

    //#region [Property] DefaultCursor
    /**
  * @hidden
  */
    protected /*override*/ getDefaultCursor(): Cursor {
        //throw new NotImplementedException('getDefaultCursor');
        if (this.myDefaultCursor == null) {
            return Cursors.Default;
        }
        return this.myDefaultCursor;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*override*/ setDefaultCursor(value: Cursor) {
        if (this.myDefaultCursor !== value) {
            this.myDefaultCursor = value;
            this.raisePropertyChangedEvent("DefaultCursor");
        }
    }
    //#endregion

    //#region [Property] DefaultTool
    public get DefaultTool(): ITuTool {
        return this.getDefaultTool();
    }
    public set DefaultTool(value: ITuTool) {
        this.setDefaultTool(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getDefaultTool(): ITuTool {
        return this.myDefaultTool;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setDefaultTool(value: ITuTool) {
        if (this.myDefaultTool !== value) {
            if (value == null) {
                throw new ArgumentException("New value for TuView.DefaultTool must not be null");
            }
            this.myDefaultTool = value;
            this.raisePropertyChangedEvent("DefaultTool");
        }
    }
    //#endregion

    //#region [Property] DisableKeys
    public get DisableKeys(): TuViewDisableKeys {
        return this.getDisableKeys();
    }
    public set DisableKeys(value: TuViewDisableKeys) {
        this.setDisableKeys(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getDisableKeys(): TuViewDisableKeys {
        return this.myDisableKeys;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setDisableKeys(value: TuViewDisableKeys) {
        if (this.myDisableKeys !== value) {
            this.myDisableKeys = value;
            this.raisePropertyChangedEvent("DisableKeys");
        }
    }
    //#endregion

    //#region [Property] DisplayRectangle

    /**
     * @hidden
     */
    protected /*override*/ getDisplayRectangle(): CGRectangle {
        if (this.myViewSize.Width >= 0 && this.myViewSize.Height >= 0) {
            return new CGRectangle(this.myDisplayRectangle.X, this.myDisplayRectangle.Y, this.myViewSize.Width, this.myViewSize.Height);
        }
        if (this.myDisplayRectangle.Width >= 0 && this.myDisplayRectangle.Height >= 0) {
            return this.myDisplayRectangle;
        }
        return new CGRectangle(0, 0, this.Width, this.Height);
    }
    //#endregion

    //#region [Property] DocExtent
    public get DocExtent(): CGRectangle {
        return this.getDocExtent();
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getDocExtent(): CGRectangle {
        const docPosition: CGPoint = this.DocPosition;
        const docExtentSize: CGSize = this.DocExtentSize;
        return new CGRectangle(docPosition.X, docPosition.Y, docExtentSize.Width, docExtentSize.Height);
    }
    //#endregion

    //#region [Property] DocExtentCenter
    public get DocExtentCenter(): CGPoint {
        return this.getDocExtentCenter();
    }
    public set DocExtentCenter(value: CGPoint) {
        this.setDocExtentCenter(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getDocExtentCenter(): CGPoint {
        const docPosition: CGPoint = this.DocPosition;
        const docExtentSize: CGSize = this.DocExtentSize;
        return new CGPoint(docPosition.X + docExtentSize.Width / 2, docPosition.Y + docExtentSize.Height / 2);
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setDocExtentCenter(value: CGPoint) {
        const docExtentSize: CGSize = this.DocExtentSize;
        this.DocPosition = new CGPoint(value.X - docExtentSize.Width / 2, value.Y - docExtentSize.Height / 2);
    }
    //#endregion

    //#region [Property] DocExtentSize
    public get DocExtentSize(): CGSize {
        return this.getDocExtentSize();
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getDocExtentSize(): CGSize {
        return this.convertViewToDoc(this.DisplayRectangle.Size);
    }
    //#endregion

    //#region [Property] DocPosition
    public get DocPosition(): CGPoint {
        return this.getDocPosition();
    }
    public set DocPosition(value: CGPoint) {
        this.setDocPosition(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getDocPosition(): CGPoint {
        return this.myOrigin.clone();
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setDocPosition(value: CGPoint) {
        const pointF: CGPoint = this.myOrigin.clone();
        const pointF1: CGPoint = this.limitDocPosition(value.clone());
        if (pointF.notEquals(pointF1)) {
            this.myOrigin = pointF1.clone();
            this.raisePropertyChangedEvent("DocPosition");
            const docExtent: CGRectangle = this.DocExtent.clone();
            this.myPreviousCenter = new CGPoint(docExtent.X + docExtent.Width / 2, docExtent.Y + docExtent.Height / 2);
        }
    }
    //#endregion

    //#region [Property] DocScale
    public get DocScale(): float {
        return this.getDocScale();
    }
    public set DocScale(value: float) {
        this.setDocScale(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getDocScale(): float {
        return this.myHorizScale;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setDocScale(value: float) {
        const single: float = this.myHorizScale;
        const single1: float = Math.max(9E-09, this.limitDocScale(value));
        if (single !== single1 || this.myVertScale !== single1) {
            this.myHorizScale = single1;
            this.myVertScale = single1;
            this.raisePropertyChangedEvent("DocScale");
            const docExtent: CGRectangle = this.DocExtent;
            this.myPreviousCenter = new CGPoint(docExtent.X + docExtent.Width / 2, docExtent.Y + docExtent.Height / 2);
            if (this.myMarquee != null) {
                this.myMarquee.Pen = undefined;
            }
        }
    }
    //#endregion

    //#region [Property] Document
    public get Document(): TuDocument {
        return this.getDocument();
    }
    public set Document(value: TuDocument) {
        this.setDocument(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getDocument(): TuDocument {
        return this.myDocument;
    }

    private documentChangedSubscription: Subscription;
    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setDocument(value: TuDocument) {
        if (value == null) {
            throw new ArgumentException("New value for TuView.Document must not be null");
        }
        const document: TuDocument = this.Document;
        if (value !== document) {
            if (document != null && this.myDocChangedEventHandler != null) {
                this.documentChangedSubscription.unsubscribe();
            }
            if (this.Tool != null) {
                this.doCancelMouse();
            }
            this.myCancelMouseDown = false;
            this.doEndEdit();
            if (this.Selection != null) {
                this.Selection.Clear();
            }
            this.myDocument = value;
            this.myDocumentChangedSubscription = value.Changed$.add(this.myDocChangedEventHandler.bind(this));
            this.raisePropertyChangedEvent("Document");
            this.initializeLayersFromDocument();
        }
    }
    //#endregion

    //#region [Property] DocumentSize
    public get DocumentSize(): CGSize {
        return this.getDocumentSize();
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getDocumentSize(): CGSize {
        const size: CGSize = this.Document.Size;
        const width: float = size.Width;
        let shadowOffset: CGSize = this.ShadowOffset;
        size.Width = width + Math.abs(shadowOffset.Width);
        const height: float = size.Height;
        shadowOffset = this.ShadowOffset;
        size.Height = height + Math.abs(shadowOffset.Height);
        if (this.SheetStyle === TuViewSheetStyle.None) {
            if (!this.ShowsNegativeCoordinates) {
                const topLeft: CGPoint = this.Document.TopLeft;
                if (topLeft.X < 0) {
                    size.Width = size.Width + topLeft.X;
                }
                if (topLeft.Y < 0) {
                    size.Height = size.Height + topLeft.Y;
                }
            }
            return size;
        }
        if (this.Sheet == null) {
            const docExtentSize: CGSize = this.DocExtentSize;
            return new CGSize(size.Width + docExtentSize.Width, size.Height + docExtentSize.Height);
        }
        const center: CGPoint = this.Sheet.Center;
        const doc: CGSize = this.convertViewToDoc(this.DisplayRectangle.Size);
        const rectangleF: CGRectangle = new CGRectangle(center.X - doc.Width, center.Y - doc.Height, doc.Width * 2, doc.Height * 2);
        const pointF: CGPoint = this.Document.TopLeft;
        const rectangleF1: CGRectangle = GeomUtilities.UnionRect(GeomUtilities.UnionRect(rectangleF, new CGRectangle(pointF.X, pointF.Y, size.Width, size.Height)), this.Sheet.Bounds.clone());
        return new CGSize(rectangleF1.Width, rectangleF1.Height);
    }

    //#endregion

    //#region [Property] DocumentTopLeft
    public get DocumentTopLeft(): CGPoint {
        return this.getDocumentTopLeft();
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getDocumentTopLeft(): CGPoint {
        if (this.SheetStyle === TuViewSheetStyle.None) {
            if (!this.ShowsNegativeCoordinates) {
                return new CGPoint();
            }
            const topLeft: CGPoint = this.Document.TopLeft;
            const shadowOffset: CGSize = this.ShadowOffset;
            if (shadowOffset.Width < 0) {
                topLeft.X = topLeft.X + shadowOffset.Width;
            }
            if (shadowOffset.Height < 0) {
                topLeft.Y = topLeft.Y + shadowOffset.Height;
            }
            return topLeft;
        }
        if (this.Sheet == null) {
            const pointF: CGPoint = this.Document.TopLeft;
            const docExtentSize: CGSize = this.DocExtentSize;
            return new CGPoint(pointF.X - docExtentSize.Width / 2, pointF.Y - docExtentSize.Height / 2);
        }
        const size: CGSize = this.Document.Size;
        const width: float = size.Width;
        let sizeF: CGSize = this.ShadowOffset;
        size.Width = width + Math.abs(sizeF.Width);
        const height: float = size.Height;
        sizeF = this.ShadowOffset;
        size.Height = height + Math.abs(sizeF.Height);
        const center: CGPoint = this.Sheet.Center;
        const size1: CGSize = this.DisplayRectangle.Size;
        if (this.HorizontalScrollBar != null && this.HorizontalScrollBar.Visible && this.VerticalScrollBar != null) {
            size1.Width = size1.Width + this.VerticalScrollBar.Width;
        }
        if (this.VerticalScrollBar != null && this.VerticalScrollBar.Visible && this.HorizontalScrollBar != null) {
            size1.Height = size1.Height + this.HorizontalScrollBar.Height;
        }
        const doc: CGSize = this.convertViewToDoc(size1);
        const rectangleF: CGRectangle = new CGRectangle(center.X - doc.Width, center.Y - doc.Height, doc.Width * 2, doc.Height * 2);
        const topLeft1: CGPoint = this.Document.TopLeft;
        const rectangleF1: CGRectangle = GeomUtilities.UnionRect(GeomUtilities.UnionRect(rectangleF, new CGRectangle(topLeft1.X, topLeft1.Y, size.Width, size.Height)), this.Sheet.Bounds.clone());
        return new CGPoint(rectangleF1.X, rectangleF1.Y);
    }

    //#endregion

    //#region [Property] DragRoutesRealtime
    public get DragRoutesRealtime(): boolean {
        return this.getDragRoutesRealtime();
    }
    public set DragRoutesRealtime(value: boolean) {
        this.setDragRoutesRealtime(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getDragRoutesRealtime(): boolean {
        return this.myDragRoutesRealtime;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setDragRoutesRealtime(value: boolean) {
        this.myDragRoutesRealtime = value;
    }
    //#endregion

    //#region [Property] DragsRealtime
    public get DragsRealtime(): boolean {
        return this.getDragsRealtime();
    }
    public set DragsRealtime(value: boolean) {
        this.setDragsRealtime(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getDragsRealtime(): boolean {
        return this.myDragsRealtime;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setDragsRealtime(value: boolean) {
        if (this.myDragsRealtime != value) {
            this.myDragsRealtime = value;
            this.raisePropertyChangedEvent("DragsRealtime");
        }
    }
    //#endregion

    //#region [Property] DrawsXorMode
    public get DrawsXorMode(): boolean {
        return this.getDrawsXorMode();
    }
    public set DrawsXorMode(value: boolean) {
        this.setDrawsXorMode(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getDrawsXorMode(): boolean {
        return this.myDrawsXorMode;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setDrawsXorMode(value: boolean) {
        if (this.myDrawsXorMode !== value) {
            this.myDrawsXorMode = value;
            this.raisePropertyChangedEvent("DrawsXorMode");
        }
    }
    //#endregion

    //#region [Property] EditControl
    public get EditControl(): TuControl {
        return this.getEditControl();
    }
    public set EditControl(value: TuControl) {
        this.setEditControl(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getEditControl(): TuControl {
        return this.myEditControl;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setEditControl(value: TuControl) {
        const goControl: TuControl = this.myEditControl;
        if (goControl != value) {
            if (goControl != null && goControl.View === this) {
                goControl.Remove();
            }
            if (value != null) {
                this.myEditControl = value;
                this.Layers.Default.Add(value);
                this.myModalControl = value.getControl(this);
            }
        }
    }
    //#endregion

    //#region [Property] ExternalDragDropsOnEnter
    public get ExternalDragDropsOnEnter(): boolean {
        return this.getExternalDragDropsOnEnter();
    }
    public set ExternalDragDropsOnEnter(value: boolean) {
        this.setExternalDragDropsOnEnter(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getExternalDragDropsOnEnter(): boolean {
        return this.myExternalDragDropsOnEnter;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setExternalDragDropsOnEnter(value: boolean) {
        if (this.myExternalDragDropsOnEnter != value) {
            this.myExternalDragDropsOnEnter = value;
            this.raisePropertyChangedEvent("ExternalDragDropsOnEnter");
        }
    }
    //#endregion

    //#region [Property] FirstInput
    public get FirstInput(): TuInputEventArgs {
        return this.getFirstInput();
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getFirstInput(): TuInputEventArgs {
        return this.myFirstInput;
    }
    //#endregion

    //#region [Property] Grid
    public get Grid(): TuGrid {
        return this.getGrid();
    }
    public set Grid(value: TuGrid) {
        this.setGrid(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getGrid(): TuGrid {
        let grid: TuGrid = undefined;
        const sheet: TuSheet = this.Sheet;
        if (sheet != null) {
            grid = sheet.Grid;
        }
        if (grid == null) {
            grid = this.BackgroundGrid;
        }
        return grid;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setGrid(value: TuGrid) {
        const sheet: TuSheet = this.Sheet;
        if (sheet != null) {
            sheet.Grid = value;
            return;
        }
        this.BackgroundGrid = value;
    }
    //#endregion

    //#region [Property] GridCellSize
    public get GridCellSize(): CGSize {
        return this.getGridCellSize();
    }
    public set GridCellSize(value: CGSize) {
        this.setGridCellSize(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getGridCellSize(): CGSize {
        if (this.Grid != null) {
            return this.Grid.CellSize;
        }
        return new CGSize(50, 50);
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setGridCellSize(value: CGSize) {
        if (this.Grid != null) {
            this.Grid.CellSize = value;
        }
    }
    //#endregion

    //#region [Property] GridCellSizeHeight
    public get GridCellSizeHeight(): float {
        return this.getGridCellSizeHeight();
    }
    public set GridCellSizeHeight(value: float) {
        this.setGridCellSizeHeight(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getGridCellSizeHeight(): float {
        if (this.Grid == null) {
            return 50;
        }
        return this.Grid.CellSize.Height;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setGridCellSizeHeight(value: float) {
        if (this.Grid != null) {
            const grid: TuGrid = this.Grid;
            const cellSize: CGSize = this.Grid.CellSize;
            grid.CellSize = new CGSize(cellSize.Width, value);
        }
    }
    //#endregion

    //#region [Property] GridCellSizeWidth
    public get GridCellSizeWidth(): float {
        return this.getGridCellSizeWidth();
    }
    public set GridCellSizeWidth(value: float) {
        this.setGridCellSizeWidth(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getGridCellSizeWidth(): float {
        if (this.Grid == null) {
            return 50;
        }
        return this.Grid.CellSize.Width;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setGridCellSizeWidth(value: float) {
        if (this.Grid != null) {
            const grid: TuGrid = this.Grid;
            const cellSize: CGSize = this.Grid.CellSize;
            grid.CellSize = new CGSize(value, cellSize.Height);
        }
    }
    //#endregion

    //#region [Property] GridLineColor
    public get GridLineColor(): CGColor {
        return this.getGridLineColor();
    }
    public set GridLineColor(value: CGColor) {
        this.setGridLineColor(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getGridLineColor(): CGColor {
        if (this.Grid == null) {
            return CGColor.LightGray;
        }
        return this.Grid.LineColor;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setGridLineColor(value: CGColor) {
        if (this.Grid != null) {
            this.Grid.LineColor = value;
        }
    }
    //#endregion

    //#region [Property] GridLineDashPattern
    public get GridLineDashPattern(): float[] {
        return this.getGridLineDashPattern();
    }
    public set GridLineDashPattern(value: float[]) {
        this.setGridLineDashPattern(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getGridLineDashPattern(): float[] {
        if (this.Grid == null) {
            return TuGrid.DefaultLineDashPattern;
        }
        return this.Grid.LineDashPattern;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setGridLineDashPattern(value: float[]) {
        if (this.Grid != null) {
            this.Grid.LineDashPattern = value;
        }
    }
    //#endregion

    //#region [Property] GridLineDashStyle
    public get GridLineDashStyle(): DashStyle {
        return this.getGridLineDashStyle();
    }
    public set GridLineDashStyle(value: DashStyle) {
        this.setGridLineDashStyle(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getGridLineDashStyle(): DashStyle {
        if (this.Grid == null) {
            return DashStyle.Solid;
        }
        return this.Grid.LineDashStyle;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setGridLineDashStyle(value: DashStyle) {
        if (this.Grid != null) {
            this.Grid.LineDashStyle = value;
        }
    }
    //#endregion

    //#region [Property] GridLineWidth
    public get GridLineWidth(): float {
        return this.getGridLineWidth();
    }
    public set GridLineWidth(value: float) {
        this.setGridLineWidth(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getGridLineWidth(): float {
        if (this.Grid == null) {
            return 0;
        }
        return this.Grid.LineWidth;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setGridLineWidth(value: float) {
        if (this.Grid != null) {
            this.Grid.LineWidth = value;
        }
    }
    //#endregion

    //#region [Property] GridMajorLineColor
    public get GridMajorLineColor(): CGColor {
        return this.getGridMajorLineColor();
    }
    public set GridMajorLineColor(value: CGColor) {
        this.setGridMajorLineColor(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getGridMajorLineColor(): CGColor {
        if (this.Grid == null) {
            return CGColor.Gray;
        }
        return this.Grid.MajorLineColor;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setGridMajorLineColor(value: CGColor) {
        if (this.Grid != null) {
            this.Grid.MajorLineColor = value;
        }
    }
    //#endregion

    //#region [Property] GridMajorLineDashPattern
    public get GridMajorLineDashPattern(): float[] {
        return this.getGridMajorLineDashPattern();
    }
    public set GridMajorLineDashPattern(value: float[]) {
        this.setGridMajorLineDashPattern(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getGridMajorLineDashPattern(): float[] {
        if (this.Grid == null) {
            return TuGrid.DefaultMajorLineDashPattern;
        }
        return this.Grid.MajorLineDashPattern;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setGridMajorLineDashPattern(value: float[]) {
        if (this.Grid != null) {
            this.Grid.MajorLineDashPattern = value;
        }
    }
    //#endregion

    //#region [Property] GridMajorLineDashStyle
    public get GridMajorLineDashStyle(): DashStyle {
        return this.getGridMajorLineDashStyle();
    }
    public set GridMajorLineDashStyle(value: DashStyle) {
        this.setGridMajorLineDashStyle(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getGridMajorLineDashStyle(): DashStyle {
        if (this.Grid == null) {
            return DashStyle.Solid;
        }
        return this.Grid.MajorLineDashStyle;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setGridMajorLineDashStyle(value: DashStyle) {
        if (this.Grid != null) {
            this.Grid.MajorLineDashStyle = value;
        }
    }
    //#endregion

    //#region [Property] GridMajorLineFrequency
    public get GridMajorLineFrequency(): CGSize {
        return this.getGridMajorLineFrequency();
    }
    public set GridMajorLineFrequency(value: CGSize) {
        this.setGridMajorLineFrequency(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getGridMajorLineFrequency(): CGSize {
        if (this.Grid != null) {
            return this.Grid.MajorLineFrequency;
        }
        return new CGSize(0, 0);
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setGridMajorLineFrequency(value: CGSize) {
        if (this.Grid != null) {
            this.Grid.MajorLineFrequency = value;
        }
    }
    //#endregion

    //#region [Property] GridMajorLineWidth
    public get GridMajorLineWidth(): float {
        return this.getGridMajorLineWidth();
    }
    public set GridMajorLineWidth(value: float) {
        this.setGridMajorLineWidth(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getGridMajorLineWidth(): float {
        if (this.Grid == null) {
            return 0;
        }
        return this.Grid.MajorLineWidth;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setGridMajorLineWidth(value: float) {
        if (this.Grid != null) {
            this.Grid.MajorLineWidth = value;
        }
    }
    //#endregion

    //#region [Property] GridOrigin
    public get GridOrigin(): CGPoint {
        return this.getGridOrigin();
    }
    public set GridOrigin(value: CGPoint) {
        this.setGridOrigin(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getGridOrigin(): CGPoint {
        if (this.Grid != null) {
            return this.Grid.Origin;
        }
        return new CGPoint(0, 0);
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setGridOrigin(value: CGPoint) {
        if (this.Grid != null) {
            this.Grid.Origin = value;
        }
    }
    //#endregion

    //#region [Property] GridOriginRelative
    public get GridOriginRelative(): boolean {
        return this.getGridOriginRelative();
    }
    public set GridOriginRelative(value: boolean) {
        this.setGridOriginRelative(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getGridOriginRelative(): boolean {
        if (this.Grid == null) {
            return false;
        }
        return this.Grid.OriginRelative;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setGridOriginRelative(value: boolean) {
        if (this.Grid != null) {
            this.Grid.OriginRelative = value;
        }
    }
    //#endregion

    //#region [Property] GridOriginX
    public get GridOriginX(): float {
        return this.getGridOriginX();
    }
    public set GridOriginX(value: float) {
        this.setGridOriginX(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getGridOriginX(): float {
        if (this.Grid == null) {
            return 0;
        }
        return this.Grid.Origin.X;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setGridOriginX(value: float) {
        if (this.Grid != null) {
            const grid: TuGrid = this.Grid;
            const origin: CGPoint = this.Grid.Origin;
            grid.Origin = new CGPoint(value, origin.Y);
        }
    }
    //#endregion

    //#region [Property] GridOriginY
    public get GridOriginY(): float {
        return this.getGridOriginY();
    }
    public set GridOriginY(value: float) {
        this.setGridOriginY(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getGridOriginY(): float {
        if (this.Grid == null) {
            return 0;
        }
        return this.Grid.Origin.Y;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setGridOriginY(value: float) {
        if (this.Grid != null) {
            const grid: TuGrid = this.Grid;
            const origin: CGPoint = this.Grid.Origin;
            grid.Origin = new CGPoint(origin.X, value);
        }
    }
    //#endregion

    //#region [Property] GridSnapCellSpot
    public get GridSnapCellSpot(): Spot {
        return this.getGridSnapCellSpot();
    }
    public set GridSnapCellSpot(value: Spot) {
        this.setGridSnapCellSpot(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getGridSnapCellSpot(): Spot {
        if (this.Grid == null) {
            return TopLeft;
        }
        return this.Grid.SnapCellSpot;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setGridSnapCellSpot(value: Spot) {
        if (this.Grid != null) {
            this.Grid.SnapCellSpot = value;
        }
    }
    //#endregion

    //#region [Property] GridSnapDrag
    public get GridSnapDrag(): TuViewSnapStyle {
        return this.getGridSnapDrag();
    }
    public set GridSnapDrag(value: TuViewSnapStyle) {
        this.setGridSnapDrag(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getGridSnapDrag(): TuViewSnapStyle {
        if (this.Grid == null) {
            return TuViewSnapStyle.None;
        }
        return this.Grid.SnapDrag;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setGridSnapDrag(value: TuViewSnapStyle) {
        if (this.Grid != null) {
            this.Grid.SnapDrag = value;
        }
    }
    //#endregion

    //#region [Property] GridSnapOpaque
    public get GridSnapOpaque(): boolean {
        return this.getGridSnapOpaque();
    }
    public set GridSnapOpaque(value: boolean) {
        this.setGridSnapOpaque(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getGridSnapOpaque(): boolean {
        if (this.Grid == null) {
            return true;
        }
        return this.Grid.SnapOpaque;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setGridSnapOpaque(value: boolean) {
        if (this.Grid != null) {
            this.Grid.SnapOpaque = value;
        }
    }
    //#endregion

    //#region [Property] GridSnapResize
    public get GridSnapResize(): TuViewSnapStyle {
        return this.getGridSnapResize();
    }
    public set GridSnapResize(value: TuViewSnapStyle) {
        this.setGridSnapResize(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getGridSnapResize(): TuViewSnapStyle {
        if (this.Grid == null) {
            return TuViewSnapStyle.None;
        }
        return this.Grid.SnapResize;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setGridSnapResize(value: TuViewSnapStyle) {
        if (this.Grid != null) {
            this.Grid.SnapResize = value;
        }
    }
    //#endregion

    //#region [Property] GridStyle
    public get GridStyle(): TuViewGridStyle {
        return this.getGridStyle();
    }
    public set GridStyle(value: TuViewGridStyle) {
        this.setGridStyle(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getGridStyle(): TuViewGridStyle {
        if (this.Grid == null) {
            return TuViewGridStyle.None;
        }
        return this.Grid.Style;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setGridStyle(value: TuViewGridStyle) {
        if (this.Grid != null) {
            this.Grid.Style = value;
        }
    }
    //#endregion

    //#region [Property] GridUnboundedSpots
    public get GridUnboundedSpots(): Spot {
        return this.getGridUnboundedSpots();
    }
    public set GridUnboundedSpots(value: Spot) {
        this.setGridUnboundedSpots(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getGridUnboundedSpots(): Spot {
        if (this.Grid == null) {
            return new Spot(-1, -1, 10);
        }
        return this.Grid.UnboundedSpots;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setGridUnboundedSpots(value: Spot) {
        if (this.Grid != null) {
            this.Grid.UnboundedSpots = value;
        }
    }
    //#endregion

    //#region [Property] HidesSelection
    public get HidesSelection(): boolean {
        return this.getHidesSelection();
    }
    public set HidesSelection(value: boolean) {
        this.setHidesSelection(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getHidesSelection(): boolean {
        return this.myHidesSelection;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setHidesSelection(value: boolean) {
        if (this.myHidesSelection !== value) {
            this.myHidesSelection = value;
            this.raisePropertyChangedEvent("HidesSelection");
        }
    }
    //#endregion

    //#region [Property] HorizontalScrollBar
    public get HorizontalScrollBar(): Slider {
        return this.getHorizontalScrollBar();
    }
    public set HorizontalScrollBar(value: Slider) {
        this.setHorizontalScrollBar(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getHorizontalScrollBar(): Slider {
        if (is.typeof(this.BottomBar, Types.Slider)) {
            return as(this.BottomBar, Types.Slider);
        }
        return as(this.TopBar, Types.Slider);
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setHorizontalScrollBar(value: Slider) {
        if (is.typeof(this.BottomBar, Types.Slider)) {
            this.BottomBar = value;
            return;
        }
        this.TopBar = value;
    }
    //#endregion

    //#region [Property] HoverDelay
    public get HoverDelay(): number {
        return this.getHoverDelay();
    }
    public set HoverDelay(value: number) {
        this.setHoverDelay(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getHoverDelay(): number {
        return this.myHoverDelay;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setHoverDelay(value: number) {
        if (this.myHoverDelay !== value) {
            this.myHoverDelay = value;
            this.raisePropertyChangedEvent("HoverDelay");
        }
    }
    //#endregion

    //#region [Property] ImageList
    public get ImageList(): ImageList {
        return this.getImageList();
    }
    public set ImageList(value: ImageList) {
        this.setImageList(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getImageList(): ImageList {
        return this.myImageList;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setImageList(value: ImageList) {
        if (this.myImageList !== value) {
            this.myImageList = value;
            this.raisePropertyChangedEvent("ImageList");
        }
    }
    //#endregion

    //#region [Property] InterpolationMode
    public get InterpolationMode(): InterpolationMode {
        return this.getInterpolationMode();
    }
    public set InterpolationMode(value: InterpolationMode) {
        this.setInterpolationMode(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getInterpolationMode(): InterpolationMode {
        return this.myInterpolationMode;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setInterpolationMode(value: InterpolationMode) {
        if (this.myInterpolationMode != value && value !== InterpolationMode.Invalid) {
            this.myInterpolationMode = value;
            this.raisePropertyChangedEvent("InterpolationMode");
        }
    }
    //#endregion

    //#region [Property] IsEditing
    public get IsEditing(): boolean {
        return this.getIsEditing();
    }


    /**
     * @hidden
     */
    protected /*virtual*/ getIsEditing(): boolean {
        return this.EditControl != null;
    }
    //#endregion

    //#region [Property] IsPrinting
    public get IsPrinting(): boolean {
        return this.getIsPrinting();
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getIsPrinting(): boolean {
        return this.myPrintInfo != null;
    }
    //#endregion

    //#region [Property] IsRenderingBitmap
    public get IsRenderingBitmap(): boolean {
        return this.getIsRenderingBitmap();
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getIsRenderingBitmap(): boolean {
        return this.myIsRenderingBitmap;
    }
    //#endregion

    //#region [Property] LastInput
    public get LastInput(): TuInputEventArgs {
        return this.getLastInput();
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getLastInput(): TuInputEventArgs {
        return this.myLastInput;
    }
    //#endregion

    //#region [Property] Layers
    public get Layers(): TuLayerCollection {
        return this.getLayers();
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getLayers(): TuLayerCollection {
        return this.myLayers;
    }
    //#endregion

    //#region [Property] LeftBar
    public get LeftBar(): Control {
        return this.getLeftBar();
    }
    public set LeftBar(value: Control) {
        this.setLeftBar(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getLeftBar(): Control {
        return this.myLeftBar;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setLeftBar(value: Control) {
        throw new NotImplementedException('setLeftBar');
        /*  const control: Component = this.myLeftBar;
         if (control !== value) {
             if (value != null && value.Parent != null) {
                 throw new ArgumentException("new Control already belongs to a Control; remove it from there first");
             }
             if (control != null) {
                 const vScrollBar: TuVScrollBarElement = as(control, TuVScrollBarElement);
                 if (vScrollBar != null) {
                     vScrollBar.Scroll.remove(this.myVertScrollHandler);
                 }
                 this.Controls.Remove(control);
             }
             this.myLeftBar = value;
             if (value != null) {
                 this.Controls.Add(value);
                 const height: TuVScrollBarElement = as(value, TuVScrollBarElement);
                 if (height != null) {
                     height.SmallChange = this.ScrollSmallChange.Height;
                     height.Scroll.add(this.myVertScrollHandler);
                 }
             }
             this.layoutScrollBars(true);
             this.raisePropertyChangedEvent("LeftBar");
         } */
    }
    //#endregion

    //#region [Property] MaximumSelectionCount
    public get MaximumSelectionCount(): number {
        return this.getMaximumSelectionCount();
    }
    public set MaximumSelectionCount(value: number) {
        this.setMaximumSelectionCount(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getMaximumSelectionCount(): number {
        return this.myMaximumSelectionCount;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setMaximumSelectionCount(value: number) {
        if (value !== this.myMaximumSelectionCount && value >= 0) {
            this.myMaximumSelectionCount = value;
            this.raisePropertyChangedEvent("MaximumSelectionCount");
            if (this.Selection.Count > value) {
                this.raiseSelectionStarting();
                while (this.Selection.Count > value) {
                    const last: TuObject = this.Selection.Last;
                    this.Selection.Remove(last);
                }
                this.raiseSelectionFinished();
            }
        }
    }
    //#endregion

    //#region [Property] MouseDownTools
    public get MouseDownTools(): List<ITuTool> {
        return this.getMouseDownTools();
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getMouseDownTools(): List<ITuTool> {
        if (this.myMouseDownTools == null) {
            this.myMouseDownTools = new List<ITuTool>();
            this.myMouseDownTools.Add(new TuToolAction(this));
            this.myMouseDownTools.Add(new TuToolContext(this));
            this.myMouseDownTools.Add(new TuToolPanning(this));
            this.myMouseDownTools.Add(new TuToolRelinking(this));
            this.myMouseDownTools.Add(new TuToolResizing(this));
        }
        return this.myMouseDownTools;
    }

    //#endregion

    //#region [Property] MouseMoveTools
    public get MouseMoveTools(): List<ITuTool> {
        return this.getMouseMoveTools();
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getMouseMoveTools(): List<ITuTool> {
        if (this.myMouseMoveTools == null) {
            this.myMouseMoveTools = new List<ITuTool>();
            this.myMouseMoveTools.Add(new TuToolLinkingNew(this));
            this.myMouseMoveTools.Add(new TuToolDragging(this));
            this.myMouseMoveTools.Add(new TuToolRubberBanding(this));

        }
        return this.myMouseMoveTools;
    }

    //#endregion

    //#region [Property] MouseUpTools
    public get MouseUpTools(): List<ITuTool> {
        return this.getMouseUpTools();
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getMouseUpTools(): List<ITuTool> {
        if (this.myMouseUpTools == null) {
            this.myMouseUpTools = new List<ITuTool>();
            this.myMouseUpTools.Add(new TuToolSelecting(this));

        }
        return this.myMouseUpTools;
    }

    //#endregion

    //#region [Property] NewGoLabeledLink
    public get NewGoLabeledLink(): TuLabeledLink {
        return this.getNewGoLabeledLink();
    }
    public set NewGoLabeledLink(value: TuLabeledLink) {
        this.setNewGoLabeledLink(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getNewGoLabeledLink(): TuLabeledLink {
        return as(this.NewLinkPrototype, Types.TuLabeledLink);
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setNewGoLabeledLink(value: TuLabeledLink) {
        this.NewLinkPrototype = value;
    }
    //#endregion

    //#region [Property] NewGoLink
    public get NewGoLink(): TuLink {
        return this.getNewGoLink();
    }
    public set NewGoLink(value: TuLink) {
        this.setNewGoLink(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getNewGoLink(): TuLink {
        return as(this.NewLinkPrototype, Types.TuLink);
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setNewGoLink(value: TuLink) {
        this.NewLinkPrototype = value;
    }
    //#endregion

    //#region [Property] NewLinkClass
    public get NewLinkClass(): Type {
        return this.getNewLinkClass();
    }
    public set NewLinkClass(value: Type) {
        this.setNewLinkClass(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getNewLinkClass(): Type {
        const newLinkPrototype: TuObject = this.NewLinkPrototype;
        if (newLinkPrototype == null) {
            return null;
        }
        return (newLinkPrototype as any).GetType();
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setNewLinkClass(value: Type) {
        if (value != null) {
            this.NewLinkPrototype = Activator.CreateInstance(value);
        }
    }
    //#endregion

    //#region [Property] NewLinkPrototype
    public get NewLinkPrototype(): TuObject {
        return this.getNewLinkPrototype();
    }
    public set NewLinkPrototype(value: TuObject) {
        this.setNewLinkPrototype(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getNewLinkPrototype(): TuObject {
        return this.myNewLinkPrototype;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setNewLinkPrototype(value: TuObject) {
        if (this.myNewLinkPrototype != value && value != null) {
            if (!(is.typeof<ITuLink>(value, Types.ITuLink))) {
                throw new ArgumentException("New prototype object for GoView.NewLinkPrototype must implement ITuLink");
            }
            this.myNewLinkPrototype = value;
            this.raisePropertyChangedEvent("NewLinkPrototype");
        }
    }
    //#endregion

    //#region [Property] NoFocusSelectionColor
    public get NoFocusSelectionColor(): CGColor {
        return this.getNoFocusSelectionColor();
    }
    public set NoFocusSelectionColor(value: CGColor) {
        this.setNoFocusSelectionColor(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getNoFocusSelectionColor(): CGColor {
        return this.myNoFocusSelectionColor;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setNoFocusSelectionColor(value: CGColor) {
        if (this.myNoFocusSelectionColor.notEquals(value)) {
            this.myNoFocusSelectionColor = value;
            this.raisePropertyChangedEvent("NoFocusSelectionColor");
        }
    }
    //#endregion


    //#region [Property] PaintGreekScale
    public get PaintGreekScale(): float {
        return this.getPaintGreekScale();
    }
    public set PaintGreekScale(value: float) {
        this.setPaintGreekScale(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getPaintGreekScale(): float {
        return this.myPaintGreekScale;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setPaintGreekScale(value: float) {
        if (this.myPaintGreekScale != value) {
            this.myPaintGreekScale = value;
            this.raisePropertyChangedEvent("PaintGreekScale");
        }
    }
    //#endregion

    //#region [Property] PaintNothingScale
    public get PaintNothingScale(): float {
        return this.getPaintNothingScale();
    }
    public set PaintNothingScale(value: float) {
        this.setPaintNothingScale(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getPaintNothingScale(): float {
        return this.myPaintNothingScale;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setPaintNothingScale(value: float) {
        if (this.myPaintNothingScale !== value) {
            this.myPaintNothingScale = value;
            this.raisePropertyChangedEvent("PaintNothingScale");
        }
    }
    //#endregion

    //#region [Property] PixelOffsetMode
    public get PixelOffsetMode(): float {
        return this.getPixelOffsetMode();
    }
    public set PixelOffsetMode(value: float) {
        this.setPixelOffsetMode(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getPixelOffsetMode(): float {
        return this.myPixelOffsetMode;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setPixelOffsetMode(value: float) {
        if (this.myPixelOffsetMode !== value && value !== PixelOffsetMode.Invalid) {
            this.myPixelOffsetMode = value;
            this.raisePropertyChangedEvent("PixelOffsetMode");
        }
    }
    //#endregion

    //#region [Property] PortGravity
    public get PortGravity(): float {
        return this.getPortGravity();
    }
    public set PortGravity(value: float) {
        this.setPortGravity(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getPortGravity(): float {
        return this.myPortGravity;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setPortGravity(value: float) {
        if (this.myPortGravity !== value) {
            if (value <= 0) {
                throw new ArgumentException("New distance value for TuView.PortGravity must be positive");
            }
            this.myPortGravity = value;
            this.raisePropertyChangedEvent("PortGravity");
        }
    }
    //#endregion

    //#region [Property] PretendsInternalDrag
    public /* internal */ get PretendsInternalDrag(): boolean {
        return this.myPretendsInternalDrag;
    }
    public /* internal */ set PretendsInternalDrag(value: boolean) {
        this.myPretendsInternalDrag = value;
    }

    //#endregion

    //#region [Property] PrimarySelectionColor
    public get PrimarySelectionColor(): CGColor {
        return this.getPrimarySelectionColor();
    }
    public set PrimarySelectionColor(value: CGColor) {
        this.setPrimarySelectionColor(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getPrimarySelectionColor(): CGColor {
        return this.myPrimarySelectionColor;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setPrimarySelectionColor(value: CGColor) {
        if (this.myPrimarySelectionColor.notEquals(value)) {
            this.myPrimarySelectionColor = value;
            this.raisePropertyChangedEvent("PrimarySelectionColor");
        }
    }
    //#endregion

    //#region [Property] PrintDocumentSize
    public get PrintDocumentSize(): CGSize {
        return this.getPrintDocumentSize();
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getPrintDocumentSize(): CGSize {
        if (this.SheetStyle !== TuViewSheetStyle.None && this.Sheet != null) {
            const marginBounds: CGRectangle = this.Sheet.MarginBounds;
            return new CGSize(marginBounds.Width, marginBounds.Height);
        }
        const rectangleF: CGRectangle = this.computeDocumentBounds();
        return TuTool.SubtractPoints(new CGPoint(rectangleF.X + rectangleF.Width, rectangleF.Y + rectangleF.Height), this.PrintDocumentTopLeft);
    }
    //#endregion

    //#region [Property] PrintDocumentTopLeft
    public get PrintDocumentTopLeft(): CGPoint {
        return this.getPrintDocumentTopLeft();
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getPrintDocumentTopLeft(): CGPoint {
        if (this.SheetStyle !== TuViewSheetStyle.None && this.Sheet != null) {
            const marginBounds: CGRectangle = this.Sheet.MarginBounds;
            return new CGPoint(marginBounds.X, marginBounds.Y);
        }
        if (!this.ShowsNegativeCoordinates) {
            return new CGPoint();
        }
        return this.computeDocumentBounds().Location;
    }
    //#endregion

    //#region [Property] PrintScale
    public get PrintScale(): float {
        return this.getPrintScale();
    }
    public set PrintScale(value: float) {
        this.setPrintScale(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getPrintScale(): float {
        return this.myPrintScale;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setPrintScale(value: float) {
        const single: float = this.myPrintScale;
        if (single != value) {
            if (value <= 0) {
                throw new ArgumentException("New value for TuView.PrintScale must be positive");
            }
            this.myPrintScale = value;
            this.raisePropertyChangedEvent("PrintScale");
            const sheet: TuSheet = this.Sheet;
            if (sheet != null) {
                const single1: float = single / value;
                const sizeF: TuSheet = sheet;
                sizeF.Size = new CGSize(sizeF.Width * single1, sheet.Height * single1);
                const goSheet: TuSheet = sheet;
                let topLeftMargin: CGSize = goSheet.TopLeftMargin;
                const width: float = topLeftMargin.Width * single1;
                topLeftMargin = sheet.TopLeftMargin;
                goSheet.TopLeftMargin = new CGSize(width, topLeftMargin.Height * single1);
                const sizeF1: TuSheet = sheet;
                topLeftMargin = sizeF1.BottomRightMargin;
                const width1: float = topLeftMargin.Width * single1;
                topLeftMargin = sheet.BottomRightMargin;
                sizeF1.BottomRightMargin = new CGSize(width1, topLeftMargin.Height * single1);
            }
            this.updateExtent();
        }
    }
    //#endregion

    //#region [Property] PrintsViewObjects
    public get PrintsViewObjects(): boolean {
        return this.getPrintsViewObjects();
    }
    public set PrintsViewObjects(value: boolean) {
        this.setPrintsViewObjects(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getPrintsViewObjects(): boolean {
        return this.myPrintsViewObjects;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setPrintsViewObjects(value: boolean) {
        if (this.myPrintsViewObjects !== value) {
            this.myPrintsViewObjects = value;
            this.raisePropertyChangedEvent("PrintsViewObjects");
        }
    }
    //#endregion

    //#region [Property] ResizeHandleHeight
    public get ResizeHandleHeight(): float {
        return this.getResizeHandleHeight();
    }
    public set ResizeHandleHeight(value: float) {
        this.setResizeHandleHeight(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getResizeHandleHeight(): float {
        return this.ResizeHandleSize.Height;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setResizeHandleHeight(value: float) {
        this.ResizeHandleSize = new CGSize(this.ResizeHandleSize.Width, value);
    }
    //#endregion

    //#region [Property] ResizeHandlePenWidth
    public get ResizeHandlePenWidth(): float {
        return this.getResizeHandlePenWidth();
    }
    public set ResizeHandlePenWidth(value: float) {
        this.setResizeHandlePenWidth(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getResizeHandlePenWidth(): float {
        return this.myResizeHandlePenWidth;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setResizeHandlePenWidth(value: float) {
        if (this.myResizeHandlePenWidth !== value) {
            this.myResizeHandlePenWidth = value;
            this.raisePropertyChangedEvent("ResizeHandlePenWidth");
        }
    }
    //#endregion

    //#region [Property] ResizeHandleSize
    public get ResizeHandleSize(): CGSize {
        return this.getResizeHandleSize();
    }
    public set ResizeHandleSize(value: CGSize) {
        this.setResizeHandleSize(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getResizeHandleSize(): CGSize {
        return this.myResizeHandleSize;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setResizeHandleSize(value: CGSize) {
        if (this.myResizeHandleSize != value) {
            this.myResizeHandleSize = value;
            this.raisePropertyChangedEvent("ResizeHandleSize");
        }
    }
    //#endregion

    //#region [Property] ResizeHandleWidth
    public get ResizeHandleWidth(): float {
        return this.getResizeHandleWidth();
    }
    public set ResizeHandleWidth(value: float) {
        this.setResizeHandleWidth(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getResizeHandleWidth(): float {
        return this.ResizeHandleSize.Width;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setResizeHandleWidth(value: float) {
        this.ResizeHandleSize = new CGSize(value, this.ResizeHandleSize.Height);
    }
    //#endregion

    //#region [Property] RightBar
    public get RightBar(): Control {
        return this.getRightBar();
    }
    public set RightBar(value: Control) {
        this.setRightBar(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getRightBar(): Control {
        return this.myRightBar;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setRightBar(value: Control) {
        throw new NotImplementedException('setRightBar');
        /*  const control: Component = this.myRightBar;
         if (control !== value) {
             if (value != null && value.Parent != null) {
                 throw new ArgumentException("new Control already belongs to a Control; remove it from there first");
             }
             if (control != null) {
                 const vScrollBar: TuVScrollBarElement = as(control, TuVScrollBarElement);
                 if (vScrollBar != null) {
                     vScrollBar.Scroll.remove(this.myVertScrollHandler);
                 }
                 this.Controls.Remove(control);
             }
             this.myRightBar = value;
             if (value != null) {
                 this.Controls.Add(value);
                 const height: TuVScrollBarElement = as(value, TuVScrollBarElement);
                 if (height != null) {
                     height.SmallChange = this.ScrollSmallChange.Height;
                     height.Scroll.add(this.myVertScrollHandler);
                 }
             }
             this.layoutScrollBars(true);
             this.raisePropertyChangedEvent("RightBar");
         } */
    }
    //#endregion

    //#region [Property] ScrollSmallChange
    public get ScrollSmallChange(): CGSize {
        return this.getScrollSmallChange();
    }
    public set ScrollSmallChange(value: CGSize) {
        this.setScrollSmallChange(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getScrollSmallChange(): CGSize {
        return this.myScrollSmallChange;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setScrollSmallChange(value: CGSize) {
        throw new NotImplementedException('setScrollSmallChange');
        /* if (this.myScrollSmallChange != value) {
            if (value.Width <= 0 || value.Height <= 0) {
                throw new ArgumentException("New Size value for TuView.ScrollSmallChange must have positive dimensions");
            }
            this.myScrollSmallChange = value;
            const horizontalScrollBar: Slider = this.HorizontalScrollBar;
            if (horizontalScrollBar != null && horizontalScrollBar.SmallChange != this.myScrollSmallChange.Width) {
                horizontalScrollBar.SmallChange = this.myScrollSmallChange.Width;
            }
            const verticalScrollBar: Slider = this.VerticalScrollBar;
            if (verticalScrollBar != null && verticalScrollBar.SmallChange != this.myScrollSmallChange.Height) {
                verticalScrollBar.SmallChange = this.myScrollSmallChange.Height;
            }
            this.raisePropertyChangedEvent("ScrollSmallChange");
        } */
    }
    //#endregion

    //#region [Property] SecondarySelectionColor
    public get SecondarySelectionColor(): CGColor {
        return this.getSecondarySelectionColor();
    }
    public set SecondarySelectionColor(value: CGColor) {
        this.setSecondarySelectionColor(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getSecondarySelectionColor(): CGColor {
        return this.mySecondarySelectionColor;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setSecondarySelectionColor(value: CGColor) {
        if (this.mySecondarySelectionColor.notEquals(value)) {
            this.mySecondarySelectionColor = value;
            this.raisePropertyChangedEvent("SecondarySelectionColor");
        }
    }
    //#endregion

    //#region [Property] SelectInRectangleStyle
    public get SelectInRectangleStyle(): TuPickInRectangleStyle {
        return this.getSelectInRectangleStyle();
    }
    public set SelectInRectangleStyle(value: TuPickInRectangleStyle) {
        this.setSelectInRectangleStyle(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getSelectInRectangleStyle(): TuPickInRectangleStyle {
        return this.mySelectInRectangleStyle;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setSelectInRectangleStyle(value: TuPickInRectangleStyle) {
        if (this.mySelectInRectangleStyle != value && (value === TuPickInRectangleStyle.SelectableOnlyContained ||
            value === TuPickInRectangleStyle.SelectableOnlyIntersectsBounds)) {
            this.mySelectInRectangleStyle = value;
            this.raisePropertyChangedEvent("SelectInRectangleStyle");
        }
    }
    protected /*virtual*/ selectInRectangleStyle(value?: TuPickInRectangleStyle): TuPickInRectangleStyle { throw error('Will Implement getter and setters'); }
    //#endregion

    //#region [Property] Selection
    public get Selection(): TuSelection {
        return this.getSelection();
    }


    /**
     * @hidden
     */
    protected /*virtual*/ getSelection(): TuSelection {
        return this.mySelection;
    }
    //#endregion

    //#region [Property] ShadowColor
    public get ShadowColor(): CGColor {
        return this.getShadowColor();
    }
    public set ShadowColor(value: CGColor) {
        this.setShadowColor(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getShadowColor(): CGColor {
        return this.myShadowColor;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setShadowColor(value: CGColor) {
        if (this.myShadowColor.notEquals(value)) {
            this.myShadowColor = value;
            this.raisePropertyChangedEvent("ShadowColor");
        }
    }
    //#endregion

    //#region [Property] ShadowHeight
    public get ShadowHeight(): float {
        return this.getShadowHeight();
    }
    public set ShadowHeight(value: float) {
        this.setShadowHeight(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getShadowHeight(): float {
        return this.ShadowOffset.Height;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setShadowHeight(value: float) {
        this.ShadowOffset = new CGSize(this.ShadowOffset.Width, value);
    }
    //#endregion

    //#region [Property] ShadowOffset
    public get ShadowOffset(): CGSize {
        return this.getShadowOffset();
    }
    public set ShadowOffset(value: CGSize) {
        this.setShadowOffset(value);
    }

    /**
     * @hidden
     */
    public /*virtual*/ getShadowOffset(): CGSize {
        return this.myShadowOffset;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setShadowOffset(value: CGSize) {
        if (this.myShadowOffset.NotEquals(value)) {
            this.myShadowOffset = value;
            this.raisePropertyChangedEvent("ShadowOffset");
        }
    }
    //#endregion

    //#region [Property] ShadowWidth
    public get ShadowWidth(): float {
        return this.getShadowWidth();
    }
    public set ShadowWidth(value: float) {
        this.setShadowWidth(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getShadowWidth(): float {
        return this.ShadowOffset.Width;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setShadowWidth(value: float) {
        this.ShadowOffset = new CGSize(value, this.ShadowOffset.Height);
    }
    //#endregion

    //#region [Property] Sheet
    public get Sheet(): TuSheet {
        return this.getSheet();
    }
    public set Sheet(value: TuSheet) {
        this.setSheet(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getSheet(): TuSheet {
        return this.mySheet;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setSheet(value: TuSheet) {
        const goSheet: TuSheet = this.mySheet;
        if (goSheet !== value) {
            let backgroundLayer: TuLayer = this.BackgroundLayer;
            if (goSheet != null) {
                if (goSheet.Layer != null) {
                    backgroundLayer = goSheet.Layer;
                }
                goSheet.Remove();
            }
            this.mySheet = value;
            backgroundLayer.Add(this.mySheet);
            if (goSheet != null && value != null) {
                value.Visible = goSheet.Visible;
                value.Printable = goSheet.Printable;
                value.Selectable = goSheet.Selectable;
            }
            this.raisePropertyChangedEvent("Sheet");
        }
    }
    //#endregion

    //#region [Property] SheetBackgroundImageSpot
    public get SheetBackgroundImageSpot(): Spot {
        return this.getSheetBackgroundImageSpot();
    }
    public set SheetBackgroundImageSpot(value: Spot) {
        this.setSheetBackgroundImageSpot(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getSheetBackgroundImageSpot(): Spot {
        if (this.Sheet == null) {
            return Middle;
        }
        return this.Sheet.BackgroundImageSpot;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setSheetBackgroundImageSpot(value: Spot) {
        if (this.Sheet != null) {
            this.Sheet.BackgroundImageSpot = value;
        }
    }
    //#endregion

    //#region [Property] SheetBottomRightMargin
    public get SheetBottomRightMargin(): CGSize {
        return this.getSheetBottomRightMargin();
    }
    public set SheetBottomRightMargin(value: CGSize) {
        this.setSheetBottomRightMargin(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getSheetBottomRightMargin(): CGSize {
        if (this.Sheet != null) {
            return this.Sheet.BottomRightMargin;
        }
        return new CGSize();
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setSheetBottomRightMargin(value: CGSize) {
        if (this.Sheet != null) {
            this.Sheet.BottomRightMargin = value;
        }
    }
    //#endregion

    //#region [Property] SheetMarginBounds
    public get SheetMarginBounds(): CGRectangle {
        return this.getSheetMarginBounds();
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getSheetMarginBounds(): CGRectangle {
        if (this.Sheet != null) {
            return this.Sheet.MarginBounds;
        }
        return new CGRectangle();
    }
    //#endregion

    //#region [Property] SheetMarginColor
    public get SheetMarginColor(): CGColor {
        return this.getSheetMarginColor();
    }
    public set SheetMarginColor(value: CGColor) {
        this.setSheetMarginColor(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getSheetMarginColor(): CGColor {
        if (this.Sheet == null) {
            return TuSheet.DefaultMarginColor;
        }
        return this.Sheet.MarginColor;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setSheetMarginColor(value: CGColor) {
        if (this.Sheet != null) {
            this.Sheet.MarginColor = value;
        }
    }
    //#endregion

    //#region [Property] SheetPaperBounds
    public get SheetPaperBounds(): CGRectangle {
        return this.getSheetPaperBounds();
    }
    public set SheetPaperBounds(value: CGRectangle) {
        this.setSheetPaperBounds(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getSheetPaperBounds(): CGRectangle {
        if (this.Sheet == null) {
            return new CGRectangle();
        }
        return this.Sheet.Paper.Bounds.clone();
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setSheetPaperBounds(value: CGRectangle) {
        if (this.Sheet != null) {
            this.Sheet.Paper.Bounds = value;
        }
    }
    //#endregion

    //#region [Property] SheetRoom
    public get SheetRoom(): CGSize {
        return this.getSheetRoom();
    }
    public set SheetRoom(value: CGSize) {
        this.setSheetRoom(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getSheetRoom(): CGSize {
        return this.mySheetRoom;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setSheetRoom(value: CGSize) {
        if (this.mySheetRoom.NotEquals(value)) {
            this.mySheetRoom = value;
            this.raisePropertyChangedEvent("SheetRoom");
            this.updateExtent();
        }
    }
    //#endregion

    //#region [Property] SheetShowsMargins
    public get SheetShowsMargins(): boolean {
        return this.getSheetShowsMargins();
    }
    public set SheetShowsMargins(value: boolean) {
        this.setSheetShowsMargins(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getSheetShowsMargins(): boolean {
        if (this.Sheet == null) {
            return true;
        }
        return this.Sheet.ShowsMargins;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setSheetShowsMargins(value: boolean) {
        if (this.Sheet != null) {
            this.Sheet.ShowsMargins = value;
        }
    }
    //#endregion

    //#region [Property] SheetStyle
    public get SheetStyle(): TuViewSheetStyle {
        return this.getSheetStyle();
    }
    public set SheetStyle(value: TuViewSheetStyle) {
        this.setSheetStyle(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getSheetStyle(): TuViewSheetStyle {
        return this.mySheetStyle;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setSheetStyle(value: TuViewSheetStyle) {
        if (this.mySheetStyle !== value) {
            this.mySheetStyle = value;
            this.raisePropertyChangedEvent("SheetStyle");
            if (this.Sheet != null) {
                this.Sheet.Visible = value !== TuViewSheetStyle.None;
                this.myPreviousCenter = this.Sheet.Center;
            }
            this.updateExtent();
        }
    }
    //#endregion

    //#region [Property] SheetTopLeftMargin
    public get SheetTopLeftMargin(): CGSize {
        return this.getSheetTopLeftMargin();
    }
    public set SheetTopLeftMargin(value: CGSize) {
        this.setSheetTopLeftMargin(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getSheetTopLeftMargin(): CGSize {
        if (this.Sheet != null) {
            return this.Sheet.TopLeftMargin;
        }
        return new CGSize();
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setSheetTopLeftMargin(value: CGSize) {
        if (this.Sheet != null) {
            this.Sheet.TopLeftMargin = value;
        }
    }
    //#endregion

    //#region [Property] ShowHorizontalScrollBar
    public get ShowHorizontalScrollBar(): TuViewScrollBarVisibility {
        return this.getShowHorizontalScrollBar();
    }
    public set ShowHorizontalScrollBar(value: TuViewScrollBarVisibility) {
        this.setShowHorizontalScrollBar(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getShowHorizontalScrollBar(): TuViewScrollBarVisibility {
        return this.myShowHorizScroll;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setShowHorizontalScrollBar(value: TuViewScrollBarVisibility) {
        if (this.myShowHorizScroll != value) {
            this.myShowHorizScroll = value;
            this.layoutScrollBars(true);
            this.raisePropertyChangedEvent("ShowHorizontalScrollBar");
        }
    }
    //#endregion

    //#region [Property] ShowsNegativeCoordinates
    public get ShowsNegativeCoordinates(): boolean {
        return this.getShowsNegativeCoordinates();
    }
    public set ShowsNegativeCoordinates(value: boolean) {
        this.setShowsNegativeCoordinates(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getShowsNegativeCoordinates(): boolean {
        return this.myShowsNegativeCoordinates;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setShowsNegativeCoordinates(value: boolean) {
        if (this.myShowsNegativeCoordinates !== value) {
            this.myShowsNegativeCoordinates = value;
            this.raisePropertyChangedEvent("ShowsNegativeCoordinates");
        }
    }
    //#endregion

    //#region [Property] ShowVerticalScrollBar
    public get ShowVerticalScrollBar(): TuViewScrollBarVisibility {
        return this.getShowVerticalScrollBar();
    }
    public set ShowVerticalScrollBar(value: TuViewScrollBarVisibility) {
        this.setShowVerticalScrollBar(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getShowVerticalScrollBar(): TuViewScrollBarVisibility {
        return this.myShowVertScroll;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setShowVerticalScrollBar(value: TuViewScrollBarVisibility) {
        if (this.myShowVertScroll !== value) {
            this.myShowVertScroll = value;
            this.layoutScrollBars(true);
            this.raisePropertyChangedEvent("ShowVerticalScrollBar");
        }
    }
    //#endregion

    //#region [Property] SmoothingMode
    public get SmoothingMode(): SmoothingMode {
        return this.getSmoothingMode();
    }
    public set SmoothingMode(value: SmoothingMode) {
        this.setSmoothingMode(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getSmoothingMode(): SmoothingMode {
        return this.mySmoothingMode;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setSmoothingMode(value: SmoothingMode) {
        if (this.mySmoothingMode !== value && value != SmoothingMode.Invalid) {
            this.mySmoothingMode = value;
            this.raisePropertyChangedEvent("SmoothingMode");
        }
    }
    //#endregion

    private get SuppressingPaint(): boolean {
        return this.mySuppressPaint > 0;
    }

    //#region [Property] TextRenderingHint
    public get TextRenderingHint(): TextRenderingHint {
        return this.getTextRenderingHint();
    }
    public set TextRenderingHint(value: TextRenderingHint) {
        this.setTextRenderingHint(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getTextRenderingHint(): TextRenderingHint {
        return this.myTextRenderingHint;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setTextRenderingHint(value: TextRenderingHint) {

        if (this.myTextRenderingHint !== value) {
            this.myTextRenderingHint = value;
            this.raisePropertyChangedEvent("TextRenderingHint");
        }
    }
    protected /*virtual*/ textRenderingHint(value?: TextRenderingHint): TextRenderingHint { throw error('Will Implement getter and setters'); }
    //#endregion

    //#region [Property] Tool
    public get Tool(): ITuTool {
        return this.getTool();
    }
    public set Tool(value: ITuTool) {
        this.setTool(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getTool(): ITuTool {
        return this.myTool;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setTool(value: ITuTool) {
        if (this.myTool == value) {
            return;
        }
        if (this.myTool != null) {
            this.myTool.stop();
        }
        if (value != null) {
            this.myTool = value;
        }
        else {
            this.myTool = this.DefaultTool;
        }
        if (this.myTool != null) {
            this.myTool.start();
        }
        this.raisePropertyChangedEvent("Tool");
    }
    //#endregion

    //#region [Property] ToolTip
    public get ToolTip(): ToolTip {
        return this._getToolTip();
    }
    public set ToolTip(value: ToolTip) {
        this._setToolTip(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ _getToolTip(): ToolTip {
        return this.myToolTip;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ _setToolTip(value: ToolTip) {
        if (this.myToolTip != value) {
            this.myToolTip = value;
            this.raisePropertyChangedEvent("ToolTip");
        }
    }
    //#endregion

    //#region [Property] ToolTipText
    public get ToolTipText(): string {
        return this._getToolTipText();
    }
    public set ToolTipText(value: string) {
        this._setToolTipText(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ _getToolTipText(): string {
        return this.myToolTipText;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ _setToolTipText(value: string) {
        if (this.myToolTipText != value) {
            this.myToolTipText = value;
            this.raisePropertyChangedEvent("ToolTipText");
        }
    }
    //#endregion

    //#region [Property] TopBar
    public get TopBar(): Control {
        return this.getTopBar();
    }
    public set TopBar(value: Control) {
        this.setTopBar(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getTopBar(): Control {
        return this.myTopBar;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setTopBar(value: Control) {
        throw new NotImplementedException('setTopBar');
        /*  const control: Component = this.myTopBar;
         if (control != value) {
             if (value != null && value.Parent != null) {
                 throw new ArgumentException("new Control already belongs to a Control; remove it from there first");
             }
             if (control != null) {
                 const hScrollBar: TuHScrollBarElement = as(control, TuHScrollBarElement);
                 if (hScrollBar != null) {
                     hScrollBar.Scroll.remove(this.myHorizScrollHandler);
                 }
                 this.Controls.Remove(control);
             }
             this.myTopBar = value;
             if (value != null) {
                 this.Controls.Add(value);
                 const width: TuHScrollBarElement = as(value, TuHScrollBarElement);
                 if (width != null) {
                     width.SmallChange = this.ScrollSmallChange.Width;
                     width.Scroll.add(this.myHorizScrollHandler);
                 }
             }
             this.layoutScrollBars(true);
             this.raisePropertyChangedEvent("TopBar");
         } */
    }
    //#endregion

    //#region [Property] TopLeftCorner
    public get TopLeftCorner(): Control {
        return this.getTopLeftCorner();
    }
    public set TopLeftCorner(value: Control) {
        this.setTopLeftCorner(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getTopLeftCorner(): Control {
        return this.myTopLeftCorner;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setTopLeftCorner(value: Control) {
        const control: Control = this.myTopLeftCorner;
        if (control != value) {
            if (value != null && (value as any).Parent != null) {
                throw new ArgumentException("new Control already belongs to a Control; remove it from there first");
            }
            if (control != null) {
                this.Controls.Remove(control);
            }
            this.myTopLeftCorner = value;
            if (value != null) {
                this.Controls.Add(value);
            }
            this.layoutScrollBars(true);
            this.raisePropertyChangedEvent("TopLeftCorner");
        }
    }
    //#endregion

    //#region [Property] TopRightCorner
    public get TopRightCorner(): Control {
        return this.getTopRightCorner();
    }
    public set TopRightCorner(value: Control) {
        this.setTopRightCorner(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getTopRightCorner(): Control {
        return this.myTopRightCorner;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setTopRightCorner(value: Control) {
        const control: Control = this.myTopRightCorner;
        if (control != value) {
            if (value != null && (value as any).Parent != null) {
                throw new ArgumentException("new Control already belongs to a Control; remove it from there first");
            }
            if (control != null) {
                this.Controls.Remove(control);
            }
            this.myTopRightCorner = value;
            if (value != null) {
                this.Controls.Add(value);
            }
            this.layoutScrollBars(true);
            this.raisePropertyChangedEvent("TopRightCorner");
        }
    }
    //#endregion

    //#region [Property] Version
    public static get Version(): float {
        if (TuView.myVersion < 0) {
            let versionName: string = TuView.VersionName;
            const int32: number = versionName.indexOf('.');
            if (int32 >= 0) {
                const int321: number = versionName.indexOf('.', int32 + 1);
                if (int321 > 0) {
                    versionName = versionName.substring(0, int321);
                }
            }
            try {
                TuView.myVersion = Number.parseFloat(versionName);
            }
            catch (arithmeticException) {
                console.error(arithmeticException);
            }
        }
        return TuView.myVersion;
    }

    //#endregion

    //#region [Property] Version
    public static get VersionName(): string {
        if (TuView.myVersionAssembly == null || TuView.myVersionAssembly.length == 0) {
            const fullName: string = '';// Assembly.GetExecutingAssembly().FullName;
            TuView.myVersionAssembly = fullName.substring(0, fullName.indexOf(','));
            const versionName: string = '1.0.0.0';
            const int32: number = versionName.indexOf('.');
            const int321: number = versionName.indexOf('.', int32 + 1);
            TuView.myVersionMajor = Number.parseInt(versionName.substring(0, int32));
            TuView.myVersionMinor = Number.parseInt(versionName.substring(int32 + 1, (int321 - (int32 + 1))));
        }
        return "1.0.0.0";
    }
    //#endregion

    //#region [Property] VerticalScrollBar
    public get VerticalScrollBar(): Slider {
        return this.getVerticalScrollBar();
    }
    public set VerticalScrollBar(value: Slider) {
        this.setVerticalScrollBar(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getVerticalScrollBar(): Slider {
        if (is.typeof(this.RightBar, Types.Slider)) {
            return as(this.RightBar, Types.Slider);
        }
        return as(this.LeftBar, Types.Slider);
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setVerticalScrollBar(value: Slider) {
        if (is.typeof(this.RightBar, Types.Slider)) {
            this.RightBar = value;
            return;
        }
        this.LeftBar = value;
    }
    //#endregion

    public /* internal */  get WorldScale(): CGSize {
        return new CGSize(this.myHorizWorld, this.myVertWorld);
    }
    protected SetupControlDefaults() {
        this.myFrameWidth = 300;
        this.myFrameHeight = 300;
        this.myDragEntered = false;
        this.myAllowDragOut = false;
        this.myPretendsInternalDrag = true;
        this.myExternalDragDropsOnEnter = true;
        this.mySuppressPaint = 0;
        this.myDefaultCursor = Cursors.Default;
        this.myPrintScale = 0.8;
        this.myPrintsViewObjects = false;
        this.myDrawsXorMode = false;
        this.myPrevXorRect = new CGRectangle();
        this.myPrevXorRectValid = false;

        this.myBorderStyle = BorderStyle.Fixed3D;
        this.myBorder3DStyle = Border3DStyle.Etched;
        this.myBorderSize = SystemInformation.Border3DSize;

        this.myDocChangedEventHandler = new TuChangedEventHandler();
        this.myMaximumSelectionCount = 999999;
        this.mySelectInRectangleStyle = TuPickInRectangleStyle.SelectableOnlyContained;
        this.myPrimarySelectionColor = CGColor.Chartreuse;
        this.mySecondarySelectionColor = CGColor.Cyan;
        this.myNoFocusSelectionColor = CGColor.LightGray;
        this.myResizeHandleSize = new CGSize(6, 6);
        this.myResizeHandlePenWidth = 1;
        this.myBoundingHandlePenWidth = 2;
        this.myHidesSelection = false;
        this.myDisableKeys = TuViewDisableKeys.ArrowMove;
        this.myArrowMoveSmall = 1;
        this.myArrowMoveLarge = 10;
        this.myScrollSmallChange = new CGSize(16, 16);
        this.myAutoPanRegion = new CGSize(16, 16);
        this.myShowsNegativeCoordinates = true;
        this.myOrigin = new CGPoint(0, 0);
        this.myHorizScale = 1;
        this.myVertScale = 1;
        this.myViewSize = new CGSize(-1, -1);
        this.myDisplayRectangle = new CGRectangle(1, 1, -999999, -999999);
        this.myHorizWorld = 1;
        this.myVertWorld = 1;
        this.myPreviousCenter = new CGPoint(0, 0);
        this.mySmoothingMode = SmoothingMode.HighQuality;
        this.myTextRenderingHint = TextRenderingHint.ClearTypeGridFit;
        this.myInterpolationMode = InterpolationMode.HighQualityBicubic;
        this.myCompositingQuality = CompositingQuality.AssumeLinear;
        this.myPixelOffsetMode = 2;
        this.myAllowSelect = true;
        this.myAllowMove = true;
        this.myAllowCopy = true;
        this.myAllowResize = true;
        this.myAllowReshape = true;
        this.myAllowDelete = true;
        this.myAllowInsert = true;
        this.myAllowLink = true;
        this.myAllowEdit = true;
        this.myAllowMouse = true;
        this.myAllowKey = true;

        this.myUpdateHandles = new List<TuObject>();
        this.myIsRenderingBitmap = false;
        this.myFirstInput = new TuInputEventArgs();
        this.myLastInput = new TuInputEventArgs();

        this.myDragsRealtime = true;
        this.myDragRoutesRealtime = true;

        this.myPortGravity = 100;
        this.myNewLinkPrototype = new TuLink();

        this.mySheetStyle = TuViewSheetStyle.None;
        this.mySheetRoom = new CGSize(10, 10);
        this.myShadowOffset = new CGSize(5, 5);
        this.myShadowColor = CGColor.FromRgba(CGColor.Gray, 127);
        this.myPaintNothingScale = 0.13;
        this.myPaintGreekScale = 0.24;

        this.myVisible = true;
        this.myWidth = 100;
        this.myHeight = 100;
        this.myControls = new List();
        this.myCursor = Cursors.Default;

        this.SelectionStarting = new Event();
        this.SelectionMoved = new Event();
        this.SelectionFinished = new Event();
        this.SelectionDeleting = new Event();
        this.SelectionDeleted = new Event();
        this.SelectionCopied = new Event();
        this.ObjectSingleClicked = new Event();
        this.ObjectSelectionDropReject = new Event();
        this.ObjectSelectionDropped = new Event();
        this.ObjectResized = new Event();
        this.ObjectLostSelection = new Event();
        this.ObjectHover = new Event();
        this.ObjectGotSelection = new Event();
        this.ObjectEnterLeave = new Event();
        this.ObjectEdited = new Event();
        this.ObjectContextClicked = new Event();
        this.ObjectDoubleClicked = new Event();
        this.LinkCreated = new Event();
        this.LinkRelinked = new Event();
        this.BackgroundContextClicked$ = new Event();
        this.BackgroundDoubleClicked$ = new Event();
        this.BackgroundHover$ = new Event();
        this.BackgroundSelectionDropped$ = new Event();
        this.BackgroundSelectionDropReject$ = new Event();
        this.BackgroundSingleClicked$ = new Event();
        this.ClipboardCopied$ = new Event();
        this.ClipboardPasted$ = new Event();
        this.DocumentChanged$ = new Event();
        this.invalidateRects = new TuInvalidateCollection();
        this.myRenderingMode = ViewRenderingMode.Html;
        this.mySuppressPaint = 0;
        this.myCancelMouseDown = false;















        this.initView(undefined);
    }
    /* public constructor(doc?: TuDocument) {
        super();
        this.initView(doc);
    } */

    public /* virtual */ AbortTransaction(): boolean {
        return this.Document.AbortTransaction();
    }

    /* internal */ addTuControl(g: TuControl, c: Control): void {
        if (this.myGoControls == null) {
            this.myGoControls = new List<TuControl>();
        }
        this.myGoControls.Add(g);
        this.Controls.Add(c);
    }

    /* internal */  allocTempPointArray(len: number): CGPoint[] {
        if (this.myTempArrays == null || len >= this.myTempArrays.length) {
            this.myTempArrays = new Array(Math.max((len + 1), 10));
            for (let i = 0; i < this.myTempArrays.length; i++) {
                this.myTempArrays[i] = undefined;
            }
        }
        let pointFArray: CGPoint[] = this.myTempArrays[len];

        if (pointFArray != null) {
            this.myTempArrays[len] = undefined;
        }
        else {
            pointFArray = new Array(len);
            for (let i = 0; i < pointFArray.length; i++) {
                pointFArray[i] = new CGPoint();
            }
        }
        return pointFArray;
    }
    private autoScrollCallback(obj: any): void {
        throw new NotImplementedException('autoScrollCallback');
        /*  if (this.IsHandleCreated) {
             this.invoke(obj);
         } */
    }

    private autoScrollTick(sender: any, evt: EventArgs): void {
        if (this.myAutoScrollTimerEnabled) {
            if (this.myActioning) {
                const tool: TuToolAction = as(this.Tool, Types.TuToolAction);
                if (tool != null && tool.ActionObject != null) {
                    tool.autoAdjust();
                    this.myAutoScrollTimer.change(this.AutoScrollTime, -1);
                }
                return;
            }
            const pointF: CGPoint = (this.myPanning ? this.computeAutoPanDocPosition(this.myPanningOrigin, this.myAutoScrollPoint) : this.computeAutoScrollDocPosition(this.myAutoScrollPoint));
            if (pointF === this.DocPosition) {
                this.myAutoScrollTimer.change(this.AutoScrollDelay, -1);
                return;
            }
            if (this.DocPosition != pointF && this.DrawsXorMode) {
                this.drawXorBox(this.myPrevXorRect, false);
            }
            this.DocPosition = pointF;
            this.myAutoScrollTimer.change(this.AutoScrollTime, -1);
        }
    }

    public /* virtual */ beginUpdate(): void {
        this.mySuppressPaint = (this.mySuppressPaint + 1);
    }

    public /* virtual */ CanCopyObjects(): boolean {
        if (!this.AllowCopy) {
            return false;
        }
        return this.Document.CanCopyObjects();
    }

    public /* virtual */ CanDeleteObjects(): boolean {
        if (!this.AllowDelete) {
            return false;
        }
        return this.Document.CanDeleteObjects();
    }
    public /* virtual */ canEditCopy(): boolean {
        if (!this.CanCopyObjects()) {
            return false;
        }
        if (this.Selection.IsEmpty) {
            return false;
        }
        if (!this.Selection.Primary.CanCopy()) {
            return false;
        }
        return true;
    }

    public /* virtual */ canEditCut(): boolean {
        if (!this.CanCopyObjects()) {
            return false;
        }
        if (!this.CanDeleteObjects()) {
            return false;
        }
        if (this.Selection.IsEmpty) {
            return false;
        }
        const primary: TuObject = this.Selection.Primary;
        if (!primary.CanCopy()) {
            return false;
        }
        if (!primary.CanDelete()) {
            return false;
        }
        return true;
    }

    public /* virtual */ canEditDelete(): boolean {
        if (!this.CanDeleteObjects()) {
            return false;
        }
        if (this.Selection.IsEmpty) {
            return false;
        }
        if (!this.Selection.Primary.CanDelete()) {
            return false;
        }
        return true;
    }
    public /* virtual */ canEditEdit(): boolean {
        if (!this.CanEditObjects()) {
            return false;
        }
        if (this.Selection.IsEmpty) {
            return false;
        }
        if (!this.Selection.Primary.CanEdit()) {
            return false;
        }
        return true;
    }

    public /* virtual */ CanEditObjects(): boolean {
        if (!this.AllowEdit) {
            return false;
        }
        return this.Document.CanEditObjects();
    }

    public /* virtual */ canEditPaste(): boolean {
        let flag: boolean;
        if (!this.CanInsertObjects()) {
            return false;
        }
        let document: TuDocument = this.Document;
        if (document == null) {
            return false;
        }
        try {
            const dataObject: IDataObject = Clipboard.GetDataObject();
            flag = (dataObject != null ? dataObject.GetDataPresent(document.DataFormat) : false);
        }
        catch (verificationException) {
            trace(TString.Concat("TuView.CanEditPaste: ", verificationException.toString()));
            flag = TuView.myClipboard.ContainsKey(document.DataFormat);
        }

        return flag;
    }

    public /* virtual */ CanInsertObjects(): boolean {
        if (!this.AllowInsert) {
            return false;
        }
        return this.Document.CanInsertObjects();
    }
    public /* virtual */ CanLinkObjects(): boolean {
        if (!this.AllowLink) {
            return false;
        }
        return this.Document.CanLinkObjects();
    }

    public /* virtual */ CanMoveObjects(): boolean {
        if (!this.AllowMove) {
            return false;
        }
        return this.Document.CanMoveObjects();
    }
    public /* virtual */ canRedo(): boolean {
        return this.Document.CanRedo();
    }
    public /* virtual */ CanReshapeObjects(): boolean {
        if (!this.AllowReshape) {
            return false;
        }
        return this.Document.CanReshapeObjects();
    }
    public /* virtual */ CanResizeObjects(): boolean {
        if (!this.AllowResize) {
            return false;
        }
        return this.Document.CanResizeObjects();
    }

    public /* virtual */ canScroll(down: boolean, vertical: boolean): boolean {
        const docPosition: CGPoint = this.DocPosition;
        const docExtentSize: CGSize = this.DocExtentSize;
        const documentTopLeft: CGPoint = this.DocumentTopLeft;
        const documentSize: CGSize = this.DocumentSize;
        if (vertical) {
            if (!down) {
                docPosition.Y = docPosition.Y - 1;
                docPosition.Y = Math.max(docPosition.Y, documentTopLeft.Y);
            }
            else {
                docPosition.Y = docPosition.Y + 1;
                docPosition.Y = Math.min(docPosition.Y, Math.max(documentTopLeft.Y, documentTopLeft.Y + documentSize.Height - docExtentSize.Height));
            }
        }
        else if (!down) {
            docPosition.X = docPosition.X - 1;
            docPosition.X = Math.max(docPosition.X, documentTopLeft.X);
        }
        else {
            docPosition.X = docPosition.X + 1;
            docPosition.X = Math.min(docPosition.X, Math.max(documentTopLeft.X, documentTopLeft.X + documentSize.Width - docExtentSize.Width));
        }
        return docPosition.notEquals(this.DocPosition);
    }

    public /* virtual */ CanSelectObjects(): boolean {
        if (!this.AllowSelect) {
            return false;
        }
        return this.Document.CanSelectObjects();
    }

    public /* virtual */ canUndo(): boolean {
        return this.Document.CanUndo();
    }

    private cleanUpModalControl(): void {
        if (this.myEditControl != null && this.myModalControl != null) {
            const goControl: TuControl = this.myEditControl;
            const control: Control = this.myModalControl;
            this.myEditControl = null;
            this.myModalControl = null;
            goControl.disposeControl(control, this);
        }
    }

    public /* virtual */  computeAutoPanDocPosition(originPnt: CGPoint, viewPnt: CGPoint): CGPoint {
        const view: CGPoint = this.convertDocToView(this.DocPosition);
        const autoPanRegion: CGSize = this.AutoPanRegion;
        const width: number = this.ScrollSmallChange.Width;
        const height: number = this.ScrollSmallChange.Height;
        const displayRectangle: CGRectangle = this.DisplayRectangle;
        const x: number = viewPnt.X - originPnt.X;
        const y: number = viewPnt.Y - originPnt.Y;
        const int32: number = autoPanRegion.Width;
        const height1: number = autoPanRegion.Height;
        const int321: number = (2 * int32);
        const int322: number = (2 * height1);
        if (x < (0 - int321)) {
            const int323: number = ((x + int32) * (x + int32)) / 100;
            view.X = (view.X - Math.min(displayRectangle.Width, (width * int323)));
        }
        else if (x < (0 - int32)) {
            view.X = (view.X - width);
        }
        else if (x > int321) {
            const int324: number = ((x - int32) * (x - int32)) / 100;
            view.X = (view.X + Math.min(displayRectangle.Width, (width * int324)));
        }
        else if (x > int32) {
            view.X = (view.X + width);
        }
        if (y < (0 - int322)) {
            const int325: number = ((y + height1) * (y + height1)) / 100;
            view.Y = (view.Y - Math.min(displayRectangle.Height, (height * int325)));
        }
        else if (y < (0 - height1)) {
            view.Y = (view.Y - height);
        }
        else if (y > int322) {
            const int326: number = ((y - height1) * (y - height1)) / 100;
            view.Y = (view.Y + Math.min(displayRectangle.Height, (height * int326)));
        }
        else if (y > height1) {
            view.Y = (view.Y + height);
        }
        return this.convertViewToDoc(view);
    }

    public /* virtual */  computeAutoScrollDocPosition(viewPnt: CGPoint): CGPoint {
        const view: CGPoint = this.convertDocToView(this.DocPosition);
        const autoScrollRegion: CGSize = this.AutoScrollRegion;
        const width: number = this.ScrollSmallChange.Width;
        const height: number = this.ScrollSmallChange.Height;
        const displayRectangle: CGRectangle = this.DisplayRectangle;
        if (viewPnt.X >= displayRectangle.X && viewPnt.X < (displayRectangle.X + autoScrollRegion.Width)) {
            view.X = (view.X - width);
            if (viewPnt.X < (displayRectangle.X + autoScrollRegion.Width / 2)) {
                view.X = (view.X - width);
            }
            if (viewPnt.X < (displayRectangle.X + autoScrollRegion.Width / 4)) {
                view.X = (view.X - (4 * width));
            }
        }
        else if (viewPnt.X <= (displayRectangle.X + displayRectangle.Width) && viewPnt.X > ((displayRectangle.X + displayRectangle.Width) - autoScrollRegion.Width)) {
            view.X = (view.X + width);
            if (viewPnt.X > ((displayRectangle.X + displayRectangle.Width) - autoScrollRegion.Width / 2)) {
                view.X = (view.X + width);
            }
            if (viewPnt.X > ((displayRectangle.X + displayRectangle.Width) - autoScrollRegion.Width / 4)) {
                view.X = (view.X + (4 * width));
            }
        }
        if (viewPnt.Y >= displayRectangle.Y && viewPnt.Y < (displayRectangle.Y + autoScrollRegion.Height)) {
            view.Y = (view.Y - height);
            if (viewPnt.Y < (displayRectangle.Y + autoScrollRegion.Height / 2)) {
                view.Y = (view.Y - height);
            }
            if (viewPnt.Y < (displayRectangle.Y + autoScrollRegion.Height / 4)) {
                view.Y = (view.Y - (4 * height));
            }
        }
        else if (viewPnt.Y <= (displayRectangle.Y + displayRectangle.Height) && viewPnt.Y > ((displayRectangle.Y + displayRectangle.Height) - autoScrollRegion.Height)) {
            view.Y = (view.Y + height);
            if (viewPnt.Y > ((displayRectangle.Y + displayRectangle.Height) - autoScrollRegion.Height / 2)) {
                view.Y = (view.Y + height);
            }
            if (viewPnt.Y > ((displayRectangle.Y + displayRectangle.Height) - autoScrollRegion.Height / 4)) {
                view.Y = (view.Y + (4 * height));
            }
        }
        return this.convertViewToDoc(view);
    }

    public /* virtual */ computeDocumentBounds(): CGRectangle {
        return TuDocument.ComputeBounds(this.Document, this);
    }

    public /* virtual */ convertDocToView(p: CGSize): CGSize;
    public /* virtual */ convertDocToView(p: CGPoint): CGPoint;
    public /* virtual */ convertDocToView(p: CGRectangle): CGRectangle;
    public /* virtual */ convertDocToView(p: CGPoint | CGSize | CGRectangle): CGPoint | CGSize | CGRectangle {
        const docPosition: CGPoint = this.DocPosition;
        if (is.typeof<CGPoint>(p, CoreGraphicTypes.CGPoint)) {
            return new CGPoint(((~~Math.floor(((p.X - docPosition.X) * this.myHorizScale * this.myHorizWorld))) + this.myDisplayRectangle.X), ((~~Math.floor(((p.Y - docPosition.Y) * this.myVertScale * this.myVertWorld))) + this.myDisplayRectangle.Y));
        } else if (is.typeof<CGSize>(p, CoreGraphicTypes.CGSize)) {
            return new CGSize((~~Math.ceil((p.Width * this.myHorizScale * this.myHorizWorld))), (~~Math.ceil((p.Height * this.myVertScale * this.myVertWorld))));
        } else if (is.typeof<CGRectangle>(p, CoreGraphicTypes.CGRectangle)) {
            const docPosition: CGPoint = this.DocPosition;
            return new CGRectangle(((~~Math.floor(((p.X - docPosition.X) * this.myHorizScale * this.myHorizWorld))) + this.myDisplayRectangle.X), ((~~Math.floor(((p.Y - docPosition.Y) * this.myVertScale * this.myVertWorld))) + this.myDisplayRectangle.Y), (~~Math.ceil((p.Width * this.myHorizScale * this.myHorizWorld))), (~~Math.ceil((p.Height * this.myVertScale * this.myVertWorld))));
        }
    }


    public /* virtual */ convertViewToDoc(p: CGSize): CGSize;
    public /* virtual */ convertViewToDoc(p: CGPoint): CGPoint;
    public /* virtual */ convertViewToDoc(p: CGRectangle): CGRectangle;
    public /* virtual */ convertViewToDoc(p: CGPoint | CGSize | CGRectangle): CGPoint | CGSize | CGRectangle {
        if (is.typeof<CGPoint>(p, CoreGraphicTypes.CGPoint)) {
            const docPosition: CGPoint = this.DocPosition;
            return new CGPoint((p.X - this.myDisplayRectangle.X) / this.myHorizWorld / this.myHorizScale + docPosition.X, (p.Y - this.myDisplayRectangle.Y) / this.myVertWorld / this.myVertScale + docPosition.Y);
        } else if (is.typeof<CGSize>(p, CoreGraphicTypes.CGSize)) {
            return new CGSize(p.Width / this.myHorizWorld / this.myHorizScale, p.Height / this.myVertWorld / this.myVertScale);
        } else if (is.typeof<CGRectangle>(p, CoreGraphicTypes.CGRectangle)) {
            const docPosition: CGPoint = this.DocPosition;
            return new CGRectangle((p.X - this.myDisplayRectangle.X) / this.myHorizWorld / this.myHorizScale + docPosition.X, (p.Y - this.myDisplayRectangle.Y) / this.myVertWorld / this.myVertScale + docPosition.Y, p.Width / this.myHorizWorld / this.myHorizScale, p.Height / this.myVertWorld / this.myVertScale);

        }
    }

    public /* virtual */  copySelection(sel: TuSelection, offset: CGSize, grid: boolean): void {
        if (sel == null) {
            sel = this.Selection;
        }
        if (sel === this.Selection && !this.CanCopyObjects()) {
            return;
        }
        if (sel.IsEmpty) {
            return;
        }
        const document: TuDocument = this.Document;
        let str: string = undefined;
        const suspendsRouting: boolean = document.SuspendsRouting;
        try {
            this.startTransaction();
            document.SuspendsRouting = true;
            const goCollections: TuCollection = new TuCollection({
                internalChecksForDuplicates: false
            });

            goCollections.AddRange(sel);
            this.Layers.SortByZOrder(goCollections);
            const goCopyDictionary: TuCopyDictionary = document.createCopyDictionary();
            document.CopyFromCollection(goCollections, true, true, offset, goCopyDictionary);
            this.Selection.Clear();
            this.raiseSelectionStarting();
            foreach(goCollections, (goCollection: TuObject) => {
                const item: TuObject = as(goCopyDictionary.Get(goCollection), Types.TuObject);
                if (item == null || !item.IsTopLevel || item.Document !== document) {
                    return CONTINUE;
                }
                this.Selection.Add(item);
            });

            this.raiseSelectionFinished();
            if (grid) {
                let goObject: TuObject = undefined;
                foreach(this.Selection, (selection: TuObject) => {
                    if (is.typeof(selection, Types.ITuLink)) {
                        return CONTINUE;
                    }
                    goObject = selection;
                    return BREAK;
                });
                const x: CGSize = offset;
                if (goObject != null) {
                    const location: CGPoint = goObject.Location;
                    const pointF: CGPoint = this.snapPoint(location, goObject);
                    x.Width = pointF.X - location.X;
                    x.Height = pointF.Y - location.Y;
                    foreach(this.Selection, (selection1: TuObject) => {
                        if (!(is.typeof(selection1, Types.ITuLink))) {
                            return CONTINUE;
                        }
                        const pointF1: TuObject = selection1;
                        pointF1.Position = new CGPoint(pointF1.Left + x.Width, selection1.Top + x.Height);
                    });

                }
                foreach(this.Selection, (goObject1: TuObject) => {
                    if (is.typeof(goObject1, Types.ITuLink)) {
                        return CONTINUE;
                    }
                    const tuObject: TuObject = goObject1;
                    const location1: CGPoint = tuObject.Location;
                    tuObject.DoMove(this, location1, this.snapPoint(location1, goObject1));
                });

            }
            document.ResumeRouting(suspendsRouting, this.Selection);
            str = "Copy Selection";
        }
        finally {
            document.SuspendsRouting = suspendsRouting;
            this.finishTransaction(str);
        }
    }

    public /* virtual */ copyToClipboard(coll: TuCollection): void {
        if (coll == null || coll.Count === 0) {
            try {
                Clipboard.SetDataObject(new DataObject());
            }
            catch (verificationException) {
                trace(TString.Concat("GoView.CopyToClipboard: ", verificationException.toString()));
                TuView.myClipboard.Clear();
            }

            return;
        }
        const document: TuDocument = this.Document;
        if (document != null) {
            const goDocuments: TuDocument = Activator.CreateInstance((document as any).GetType());
            goDocuments.UndoManager = null;
            goDocuments.MergeLayersFrom(document);
            const goCollections: TuCollection = new TuCollection();
            /* {
                InternalChecksForDuplicates = false
            }; */
            goCollections.AddRange(coll);
            document.Layers.SortByZOrder(goCollections);
            const sizeF: CGSize = new CGSize();
            goDocuments.CopyFromCollection(goCollections, true, true, sizeF, null);
            try {
                Clipboard.SetDataObject(this.createDataObject(coll, goDocuments));
            }
            catch (verificationException1) {
                trace(TString.Concat("TuView.CopyToClipboard: ", verificationException1.toString()));
                TuView.myClipboard.Clear();
                TuView.myClipboard[goDocuments.DataFormat] = goDocuments;
            }
        }
    }

    protected /* virtual */  createDataObject(coll: ITuCollection, clipdoc: TuDocument): DataObject {
        const dataObject: DataObject = new DataObject();
        dataObject.SetData(clipdoc.DataFormat, clipdoc);
        const bitmapFromCollection: Bitmap = this.getBitmapFromCollection(clipdoc);
        dataObject.SetData(DataFormats.Bitmap, true, bitmapFromCollection);
        const stringBuilder: StringBuilder = new StringBuilder();
        foreach(clipdoc, (goObject: TuObject) => {
            let text: string = undefined;
            const goLabeledPart: ITuLabeledPart = as(goObject, Types.ITuLabeledPart);
            if (goLabeledPart == null) {
                const goText: TuText = as(goObject, Types.TuText);
                if (goText != null) {
                    text = goText.Text;
                }
            }
            else {
                text = goLabeledPart.Text;
            }
            if (text == null) {
                return CONTINUE;
            }
            if (stringBuilder.Length > 0) {
                stringBuilder.Append('<br\>');
            }
            stringBuilder.Append(text);
        });

        if (stringBuilder.Length > 0) {
            dataObject.SetData(DataFormats.UnicodeText, true, stringBuilder.ToString());
        }
        return dataObject;
    }

    public /* virtual */  createDefaultTool(): ITuTool {
        return new TuToolManager(this);
    }

    public /* virtual */ createDocument(): TuDocument {
        return new TuDocument();
    }

    public /* virtual */  createGrid(): TuGrid {
        const grid = new TuGrid();
        grid.OriginRelative = false;
        grid.UnboundedSpots = new Spot(-1, -1, 10);
        grid.Selectable = false;
        return grid;

    }

    public /* virtual */  createLink(fromPort: ITuPort, toPort: ITuPort): ITuLink {
        if (fromPort == null || toPort == null || fromPort.TuObject == null || toPort.TuObject == null) {
            return undefined;
        }
        if (this.NewLinkPrototype == null) {
            return undefined;
        }
        const goLink: ITuLink = as(this.Document.createCopyDictionary().CopyComplete(this.NewLinkPrototype), Types.ITuLink);
        if (goLink == null || goLink.TuObject == null) {
            return undefined;
        }
        goLink.FromPort = fromPort;
        goLink.ToPort = toPort;
        TuSubGraphBase.ReparentToCommonSubGraph(goLink.TuObject, fromPort.TuObject, toPort.TuObject, true, this.Document.LinksLayer);
        const goRoutable: ITuRoutable = as(goLink, Types.ITuRoutable);
        if (goRoutable != null) {
            goRoutable.updateRoute();
        }
        return goLink;
    }

    public /* virtual */  createSelection(): TuSelection {
        return new TuSelection(this);
    }

    public /* virtual */ createSheet(): TuSheet {
        const goSheet: TuSheet = new TuSheet();
        goSheet.Visible = this.SheetStyle !== TuViewSheetStyle.None;
        goSheet.Printable = false;
        goSheet.Selectable = false;
        try {
            goSheet.updateBounds((new PrintDocument()).DefaultPageSettings, this.PrintScale);
        }
        catch (exception) {
            trace(TString.Concat("CreateSheet: ", exception.toString()));
            goSheet.Bounds = new CGRectangle(0, 0, 850, 1100);
        }
        const paper: TuRectangle = goSheet.Paper;
        let paperColor: CGColor = this.Document.PaperColor;
        if (paperColor.Equals(CGColor.Empty)) {
            paperColor = CGColor.White;
        }
        paper.BrushColor = paperColor;
        return goSheet;
    }

    public /* virtual */ deleteSelection(sel: TuSelection): void {
        if (sel == null) {
            sel = this.Selection;
        }
        if (sel == this.Selection && !this.CanDeleteObjects()) {
            return;
        }
        if (sel.IsEmpty) {
            return;
        }
        let str: string = undefined;
        try {
            this.startTransaction();
            const cancelEventArg: CancelEventArgs = new CancelEventArgs();
            this.raiseSelectionDeleting(cancelEventArg);
            if (!cancelEventArg.Cancel) {
                this.raiseSelectionStarting();
                sel.removeAllSelectionHandles();
                const goObjectArray: TuObject[] = sel.CopyArray();
                this.Layers.SortByZOrder(goObjectArray);
                for (let i = (goObjectArray.length - 1); i >= 0; i--) {
                    const goObject: TuObject = goObjectArray[i];
                    if (goObject != null && goObject.CanDelete()) {
                        goObject.Remove();
                        sel.Remove(goObject);
                    }
                }
                this.raiseSelectionFinished();
                str = "Delete Selection";
                this.raiseSelectionDeleted();
            }
        }
        finally {
            this.finishTransaction(str);
        }
    }

    public /* virtual */ detectHover(viewPnt: CGPoint): void {

        // TODO: commentleri kaldir.
        /*   if (this.myHoverTimer == null) {
             this.myHoverTimer = new Timer(new TimerCallback(this.hoverCallback), new EventHandler(this.hoverTick), -1, -1);
             this.myHoverTimerEnabled = false;
         }
         if (this.myHoverPoint != viewPnt) {
             this.stopHoverTimer();
         }
         if (!this.myHoverTimerEnabled) {
             this.myHoverTimerEnabled = true;
             this.myHoverTimer.change(this.HoverDelay, -1);
         }
         this.myHoverPoint = viewPnt;  */

        //console.error('detectHover not implemented.');
    }

    public /* override */ dispose(disposing?: boolean): void {
        if (disposing) {
            if (this.myAutoScrollTimer != null) {
                this.myAutoScrollTimer.dispose();
                this.myAutoScrollTimer = null;
            }
            if (this.myHoverTimer != null) {
                this.myHoverTimer.dispose();
                this.myHoverTimer = null;
            }

            if (this.myModalControl != null) {
                (this.myModalControl as any).Dispose();
                this.myModalControl = null;
            }
            if (this.Document != null) {
                foreach(this.Document.Layers, (layer: TuLayer) => {
                    layer.ResetCaches();
                });

            }
        }
        // TODO: analize
        //(super).Dispose(/* disposing */);
        if (this.myDocumentChangedSubscription != null) {
            //this.myDocument.Changed$.remove(this.myDocChangedEventHandler);
            this.myDocumentChangedSubscription.unsubscribe();
        }

        if (this.myBuffer != null) {
            this.myBuffer.Dispose();
            this.myBuffer = null;
        }
        if (this.myBackgroundBrush != null) {
            this.myBackgroundBrush.Dispose();
            this.myBackgroundBrush = null;
        }
        if (this.myShadowBrush != null) {
            this.myShadowBrush.Dispose();
            this.myShadowBrush = null;
        }
        if (this.myShadowPen != null) {
            this.myShadowPen.Dispose();
            this.myShadowPen = null;
        }
    }

    public /* internal */ doAutoAction(): void {
        if (!this.myActioning) {
            this.myActioning = true;
            this.doInternalAutoScroll();
        }
    }

    public /* virtual */ doAutoPan(originPnt: CGPoint, viewPnt: CGPoint): void {
        this.myPanning = true;
        this.myPanningOrigin = originPnt;
        this.myAutoScrollPoint = viewPnt;
        this.doInternalAutoScroll();
    }

    public /* virtual */ doAutoScroll(viewPnt: CGPoint): void {
        this.myPanning = false;
        this.myAutoScrollPoint = viewPnt;
        this.doInternalAutoScroll();
    }

    public /* virtual */ doBackgroundMouseOver(evt: TuInputEventArgs): void {
        this.setCursor1(this.DefaultCursor);
    }

    public /* virtual */ doCancelMouse(): void {
        this.myCancelMouseDown = true;
        this.Tool.doCancelMouse();
    }

    private lastContextMenu: ContextMenu;
    public /* virtual */ doContextClick(evt: TuInputEventArgs): boolean {
        if (this.lastContextMenu != null) {
            this.lastContextMenu.hideMenu(evt.MouseEventArgs.HtmlEventObject);
            this.lastContextMenu.removeFromDOM();
        }

        let parent: TuObject = this.pickObject(true, false, evt.DocPoint, false);
        if (parent == null) {
            this.raiseBackgroundContextClicked(evt);
        }
        else {
            this.raiseObjectContextClicked(parent, evt);
            while (parent != null) {
                // TODO: Menu implementation
                const contextMenuStrip: ContextMenu = parent.GetContextMenuStrip(this);
                if (contextMenuStrip != null) {
                    this.lastContextMenu = contextMenuStrip;
                    contextMenuStrip.showMenu(evt.MouseEventArgs.HtmlEventObject/* this, evt.ViewPoint */);
                    return true;
                }
                /*  GoContextMenu contextMenu = parent.GetContextMenu(this);
                 if (contextMenu != null) {
                     contextMenu.Show(this, evt.ViewPoint);
                     return true;
                 } */
                if (parent.OnContextClick(evt, this)) {
                    return true;
                }
                parent = parent.Parent;
            }
        }
        return false;
    }

    public /* virtual */ doDoubleClick(evt: TuInputEventArgs): boolean {
        let parent: TuObject = this.pickObject(true, false, evt.DocPoint, false);
        if (parent == null) {
            this.raiseBackgroundDoubleClicked(evt);
        }
        else {
            this.raiseObjectDoubleClicked(parent, evt);
            while (parent != null) {
                if (parent.OnDoubleClick(evt, this)) {
                    return true;
                }
                parent = parent.Parent;
            }
        }
        return false;
    }

    public /* virtual */ doEndEdit(): void {
        const editControl: TuControl = this.EditControl;
        if (editControl != null) {
            editControl.DoEndEdit(this);
        }
    }

    protected /* virtual */ doExternalDrag(evt: DragEventArgs): void {
        this.followExternalDragImage(this.LastInput.DocPoint);
        if (!this.CanInsertObjects()) {
            evt.Effect = DragDropEffects.None;
            return;
        }
        evt.Effect = DragDropEffects.Copy;
        this.doAutoScroll(this.LastInput.ViewPoint);
    }

    protected /* virtual */  DoExternalDrop(evt: DragEventArgs): ITuCollection {
        const data: TuSelection = as(evt.Data.GetData(typeOf(Types.TuSelection)), Types.TuSelection) ?? as(evt.Data.GetData((this.Selection as any).GetType()), Types.TuSelection);
        if (data != null) {
            const document: TuDocument = this.Document;
            if (document != null) {
                const docPoint: CGPoint = this.LastInput.DocPoint;
                const primary: TuObject = data.Primary;
                if (primary != null) {
                    let str: string = undefined;
                    const suspendsRouting: boolean = document.SuspendsRouting;
                    const goCollections: TuCollection = new TuCollection();
                    /* {
                        InternalChecksForDuplicates = false
                    }; */
                    try {
                        this.startTransaction();
                        document.SuspendsRouting = true;
                        const left: float = primary.Left;
                        let hotSpot: CGSize = data.HotSpot;
                        const width: float = left + hotSpot.Width;
                        const top: float = primary.Top;
                        hotSpot = data.HotSpot;
                        const sizeF: CGSize = TuTool.SubtractPoints(docPoint, new CGPoint(width, top + hotSpot.Height));
                        const goCopyDictionary: TuCopyDictionary = document.CopyFromCollection(data, false, true, sizeF, null);
                        foreach(goCopyDictionary.Values, (value: any) => {
                            const goObject: TuObject = as(value, Types.TuObject);
                            if (goObject == null || !goObject.IsTopLevel || goObject.Document !== document) {
                                return CONTINUE;
                            }
                            goCollections.Add(goObject);
                            const location: CGPoint = goObject.Location;
                            goObject.DoMove(this, location, this.snapPoint(location, goObject));
                        });

                        const selection: TuSelection = this.Selection;
                        selection.Clear();
                        this.raiseSelectionStarting();
                        const item: TuObject = goCopyDictionary.Get(primary);
                        if (item != null && goCollections.Contains(item)) {
                            selection.Add(item);
                        }
                        foreach(goCollections, (goCollection: TuObject) => {
                            selection.Add(goCollection);
                        });

                        this.raiseSelectionFinished();
                        selection.HotSpot = data.HotSpot;
                        if (this.ExternalDragDropsOnEnter) {
                            str = "Drop";
                            this.raiseExternalObjectsDropped(this.LastInput);
                        }
                        else if (!this.doSelectionDropReject(this.LastInput)) {
                            this.doSelectionDropped(this.LastInput);
                            str = "Drop";
                            this.raiseExternalObjectsDropped(this.LastInput);
                        }
                        else {
                            this.deleteSelection(this.Selection);
                            str = null;
                        }
                        document.ResumeRouting(suspendsRouting, null);
                    }
                    finally {
                        document.SuspendsRouting = suspendsRouting;
                        this.finishTransaction(str);
                    }
                    return goCollections;
                }
            }
        }
        return undefined;
    }

    public /* virtual */  doHover(evt: TuInputEventArgs): boolean {
        let parent: TuObject = this.pickObject(true, false, evt.DocPoint, false);
        if (parent == null) {
            this.raiseBackgroundHover(evt);
        }
        else {
            this.raiseObjectHover(parent, evt);
            while (parent != null) {
                if (parent.OnHover(evt, this)) {
                    return true;
                }
                parent = parent.Parent;
            }
        }
        return false;
    }
    private doInternalAutoScroll(): void {
        // throw new NotImplementedException('doInternalAutoScroll');
        /*  if (this.myAutoScrollTimer == null) {
             this.myAutoScrollTimer = new Timer(this.autoScrollCallback.bind(this), this.autoScrollTick.bind(this), -1, -1);
             this.myAutoScrollTimerEnabled = false;
         }
         if (this.myActioning) {
             if (!this.myAutoScrollTimerEnabled) {
                 this.myAutoScrollTimerEnabled = true;
                 this.myAutoScrollTimer.change(this.AutoScrollDelay, -1);
             }
             return;
         }
         if ((this.myPanning ? this.computeAutoPanDocPosition(this.myPanningOrigin, this.myAutoScrollPoint) :
             this.computeAutoScrollDocPosition(this.myAutoScrollPoint)).notEquals(this.DocPosition)) {
             if (!this.myAutoScrollTimerEnabled) {
                 this.myAutoScrollTimerEnabled = true;
                 if (!this.Focused) {
                     this.myAutoScrollTimer.change(this.AutoScrollDelay, -1);
                     return;
                 }
                 this.myAutoScrollTimer.change(this.AutoScrollTime, -1);
                 return;
             }
         }
         else if (!this.myPanning) {
             this.stopAutoScroll();
         } */
    }

    protected /* virtual */ doInternalDrag(evt: DragEventArgs): void {
        this.doMouseMove();
    }

    protected /* virtual */ doInternalDrop(evt: DragEventArgs): void {
        this.doMouseUp();
    }

    public /* virtual */  doKeyDown(): void {
        this.Tool.doKeyDown();
    }

    public /* virtual */  doMouseDown(): void {
        Console.WriteLine("Mouse Down");
        const focused: boolean = (this as any).Focused;
        this.requestFocus();
        if (focused || !this.myCancelMouseDown) {
            this.Tool.doMouseDown();
        }
        this.myCancelMouseDown = false;
    }

    public /* virtual */ doMouseHover(): void {
        this.Tool.doMouseHover();
    }

    private static test: number = 0;
    public /* virtual */ doMouseMove(): void {
        TuView.test++;
        if (TuView.test === 10) {
            const a = '';
        }
        this.Tool.doMouseMove();
    }

    public /* virtual */  doMouseOver(evt: TuInputEventArgs): boolean {
        let parent: TuObject = this.pickObject(true, true, evt.DocPoint, false);
        if (parent != null) {
            //console.log(parent);
        }
        this.doToolTipObject(parent);
        let flag: boolean = false;
        while (parent != null) {
            if (!parent.OnMouseOver(evt, this)) {
                parent = parent.Parent;
            }
            else {
                flag = true;
                break;
            }
        }
        if (!flag) {
            this.doBackgroundMouseOver(evt);
        }
        this.detectHover(evt.ViewPoint);
        return flag;
    }

    public /* virtual */  doMouseUp(): void {
        Console.WriteLine("Mouse Up");
        this.Tool.doMouseUp();
    }

    public /* virtual */  doMouseWheel(): void {
        this.Tool.doMouseWheel();
    }

    public /* virtual */ doObjectEnterLeave(from: TuObject, to: TuObject, evt: TuInputEventArgs): void {
        this.raiseObjectEnterLeave(from, to, evt);
        let parent: TuObject = TuObject.FindCommonParent(from, to);
        while (from != null && from !== parent) {
            const goObject: TuObject = from;
            if (goObject.OnEnterLeave(goObject, to, this)) {
                break;
            }
            from = from.Parent;
        }
        let flag: boolean = false;
        while (to != null && to !== parent) {
            if (!to.OnEnterLeave(from, to, this)) {
                to = to.Parent;
            }
            else {
                flag = true;
                break;
            }
        }
        if (!flag) {
            while (parent != null && !parent.OnEnterLeave(from, to, this)) {
                parent = parent.Parent;
            }
        }
    }

    public /* virtual */ doSelectionDropped(evt: TuInputEventArgs): boolean {
        let parent: TuObject;
        parent = (!this.mySelectionDropRejectOverValid ? this.pickObjectExcluding(true, false, evt.DocPoint, false, this.Selection) :
            this.mySelectionDropRejectOver);

        this.mySelectionDropRejectOverValid = false;
        if (parent == null) {
            this.raiseBackgroundSelectionDropped(evt);
        }
        else {
            const goObjectEventArg: TuObjectEventArgs = new TuObjectEventArgs(parent, evt);
            this.onObjectSelectionDropped(goObjectEventArg);
            while (parent != null) {
                if (parent.OnSelectionDropped(goObjectEventArg, this)) {
                    return true;
                }
                if (goObjectEventArg.TuObject == null) {
                    return false;
                }
                parent = parent.Parent;
            }
        }
        return false;
    }

    public /* virtual */  doSelectionDropReject(evt: TuInputEventArgs): boolean {
        let parent: TuObject = this.pickObjectExcluding(true, false, evt.DocPoint, false, this.Selection);
        this.mySelectionDropRejectOverValid = true;
        this.mySelectionDropRejectOver = parent;
        if (parent == null) {
            const goInputEventArg: TuInputEventArgs = new TuInputEventArgs(evt);
            this.raiseBackgroundSelectionDropReject(goInputEventArg);
            if (goInputEventArg.InputState === TuInputState.Cancel) {
                return true;
            }
        }
        else {
            const goObjectEventArg: TuObjectEventArgs = new TuObjectEventArgs(parent, evt);
            this.raiseObjectSelectionDropReject(goObjectEventArg);
            if (goObjectEventArg.InputState === TuInputState.Cancel) {
                return true;
            }
            while (parent != null) {
                if (parent.OnSelectionDropReject(goObjectEventArg, this) || (goObjectEventArg as any).InputState === TuInputState.Cancel) {
                    return true;
                }
                if (goObjectEventArg.TuObject == null) {
                    return false;
                }
                parent = parent.Parent;
            }
        }
        return false;
    }

    public /* virtual */  doSingleClick(evt: TuInputEventArgs): boolean {
        let parent: TuObject = this.pickObject(true, false, evt.DocPoint, false);
        if (parent == null) {
            this.raiseBackgroundSingleClicked(evt);
        }
        else {
            this.raiseObjectSingleClicked(parent, evt);
            while (parent != null) {
                if (parent.OnSingleClick(evt, this)) {
                    return true;
                }
                parent = parent.Parent;
            }
        }
        return false;
    }

    public /* virtual */ doToolTipObject(obj: TuObject): void {
        if (this.ToolTip == null) {
            return;
        }
        const toolTip: string = this.ToolTip.getToolTip(this);
        let toolTipText: string = undefined;
        while (obj != null) {
            toolTipText = obj.GetToolTip(this);
            if (toolTipText != null) {
                break;
            }
            obj = obj.Parent;
        }
        if (toolTipText == null) {
            toolTipText = this.ToolTipText;
        }
        if (toolTipText == null) {
            toolTipText = '';
        }
        if (toolTipText !== toolTip) {
            this.ToolTip.setToolTip(this, toolTipText);
        }
    }

    /**
     * Perform the standard mouse wheel behavior for views.
     * @param evt
     * @description
     * <p>When the Control key is held down, rotating the mouse wheel changes the
     * [[TuView.DocScale]] to "zoom" the view in or out at the current mouse point.
     * Otherwise rotating the mouse wheel scrolls the view by calling @see [[TuView.ScrollLine]].
     * If the Shift key is held down, the scrolling is horizontal instead of vertical.</p>
     * <p>This is normally called from the @see [[TuToolManager]]. @see [[ToolManager.DoMouseWheel]]
     * method, to handle mouse wheel turns in the standard manner.</p>
     */
    public /* virtual */ doWheel(evt: TuInputEventArgs): void {
        if (evt.Delta == 0) {
            return;
        }
        if (this.EditControl != null) {
            this.requestFocus();
        }
        if (!evt.Control) {
            const delta: number = (0 - evt.Delta) / 120;
            if (evt.Shift) {
                this.scrollLine(delta, 0);
                return;
            }
            this.scrollLine(0, delta);
            return;
        }
        const docPosition: CGPoint = this.DocPosition;
        this.DocScale = this.DocScale * (1 + evt.Delta / 2400);
        const doc: CGPoint = this.convertViewToDoc(evt.ViewPoint);
        const x: float = docPosition.X;
        let docPoint: CGPoint = evt.DocPoint;
        const single: float = x + docPoint.X - doc.X;
        const y: float = docPosition.Y;
        docPoint = evt.DocPoint;
        this.DocPosition = new CGPoint(single, y + docPoint.Y - doc.Y);
    }

    /**
     * This convenience method erases any previous XOR-drawn rectangle and then
     * may draw a new one with the given dimensions.
     * @param rect
     * @param drawnew
     * @description
     * <p> This always erases any earlier rectangle drawn by this method.
     * It only draws a new rectangle if [[drawnew]] is true.</p>
     * <p>If [[TuView.DrawsXorMode]] is false, this draws a rectangle using a
     * checkerboard pen, instead of drawing in XOR mode.</p>
     */
    public /* virtual */ drawXorBox(rect: CGRectangle, drawnew: boolean): void {
        if (this.myPrevXorRectValid) {
            this.myPrevXorRectValid = false;
            try {
                this.drawXorRectangle(this.myPrevXorRect);
            }
            catch (verificationException) {
                this.DrawsXorMode = false;
            }

        }
        if (drawnew) {
            if (!this.DrawsXorMode) {
                if (this.myMarquee == null) {
                    this.myMarquee = new TuRectangle()
                    this.myMarquee.Brush = undefined;
                    this.myMarquee.Pen = undefined;
                }
                if (this.myMarquee.Pen == null) {
                    // TODO: hatch brush ile yap.
                    const pen: Pen = new Pen(Brushes.Black/* new HatchBrush(HatchStyle.SmallCheckerBoard, CGColor.Black, CGColor.White) */, 2 / this.DocScale);
                    this.myMarquee.Pen = pen;
                }
                this.myMarquee.Bounds = this.convertViewToDoc(rect);
                this.Layers.Top.Add(this.myMarquee);
                return;
            }
            try {
                this.drawXorRectangle(rect);
                this.myPrevXorRect = rect;
                this.myPrevXorRectValid = true;
            }
            catch (exception) {
                this.DrawsXorMode = false;
            }

        }
        else if (this.myMarquee != null) {
            this.myMarquee.Remove();
        }
    }

    public pointToScreen(p: CGPoint): CGPoint {
        return p;
    }

    public rectangleToScreen(r: CGRectangle): CGRectangle {
        return r;
    }
    /**
     * Draw a line on the screen in XOR mode.
     * @param ax
     * @param ay
     * @param bx
     * @param by
     * @description
     * The parameters are all in view coordinates.
     * You should call this method twice for each set of argument values--
     * once to draw the line and once to restore the original screen image.
     */
    public drawXorLine(ax: number, ay: number, bx: number, by: number): void {
        const point: CGPoint = new CGPoint(ax, ay);
        const point1: CGPoint = new CGPoint(bx, by);
        const screen: CGPoint = this.pointToScreen(point);
        const screen1: CGPoint = this.pointToScreen(point1);
        let paperColor: CGColor = this.Document.PaperColor;
        if (paperColor.Equals(CGColor.Empty)) {
            paperColor = this.BackColor;
        }
        ControlPaint.DrawReversibleLine(screen, screen1, paperColor);
    }

    /**
     * Draw a rectangle on the screen in XOR mode.
     * @param rect
     * @description
     * The parameter is in view coordinates.
     * You should call this method twice for each set of rectangular coordinates--
     * once to draw the rectangle and once to restore the original screen image.
     */
    public drawXorRectangle(rect: CGRectangle): void {
        const screen: CGRectangle = this.rectangleToScreen(rect);
        let paperColor: CGColor = this.Document.PaperColor;
        if (paperColor.Equals(CGColor.Empty)) {
            paperColor = this.BackColor;
        }
        ControlPaint.DrawReversibleFrame(screen, paperColor, FrameStyle.Thick);
    }

    /**
     * Copy the [[TuView.Selection]] to the clipboard.
     * @description
     * <p>This method does nothing if @see [[TuView.CanCopyObjects]] is false.
     * After calling [[TuView.CopyToClipboard]], this calls [[TuView.raiseClipboardCopied]].
     * All the actions occur within a transaction.</p>
     * <p>All of the objects in the selection will be copied by serializing them.
     * If any of the objects, or any of the objects that they refer to, are not
     * serializable, there will be a serialization exception, and the clipboard
     * might not a copy of the selection.
     * @see [[TuView.CopyToClipboard]] will log any exceptions to any trace listeners.
     * The User Guide discusses serialization and deserialization in more detail.</p>
     * @see [[TuView.CanEditCopy]]
     * @see [[TuView.DisableKeys]]
     */
    public /* virtual */  editCopy(): void {
        if (!this.CanCopyObjects()) {
            return;
        }
        let str: string = undefined;
        try {
            try {
                this.CursorName = "wait";
                this.startTransaction();
                this.copyToClipboard(this.Selection);
                str = "Copy";
                this.raiseClipboardCopied();
            }
            catch (exception) {
                trace(TString.Concat("EditCopy: ", exception.toString()));
                throw exception;
            }
        }
        finally {
            const undoManager: TuUndoManager = this.Document.UndoManager;
            if (undoManager != null && undoManager.CurrentEdit == null) {
                undoManager.CurrentEdit = new TuUndoManagerCompoundEdit();
            }
            this.finishTransaction(str);
            this.CursorName = "default";
        }
    }

    /**
     * Copy the current @see [[TuView.Selection]] to the clipboard and then delete it.
     * @description
     * This method does nothing if @see [[TuView.canCopyObjects]] or  @see [[TuView.canDeleteObjects]] is false.
     * After calling @see [[TuView.copyToClipboard]] and @see [[Tuiew.deleteSelection]] , this calls @see [[TuView.raiseClipboardCopied]]".
     * All the actions occur within a transaction.
     * @see [[TuView.CanEditCut]]
     * @see [[TuView.DisableKeys]]
     */
    public /* virtual */ editCut(): void {
        if (!this.CanCopyObjects()) {
            return;
        }
        if (!this.CanDeleteObjects()) {
            return;
        }
        let str: string = undefined;
        try {
            try {
                this.CursorName = "wait";
                this.startTransaction();
                this.copyToClipboard(this.Selection);
                this.deleteSelection(this.Selection);
                str = "Cut";
                this.raiseClipboardCopied();
            }
            catch (exception) {
                trace(TString.Concat("EditCut: ", exception.toString()));
                throw exception;
            }
        }
        finally {
            this.finishTransaction(str);
            this.CursorName = "default";
        }
    }

    public /* virtual */ editDelete(): void {
        try {
            this.CursorName = "wait";
            this.deleteSelection(this.Selection);
        }
        finally {
            this.CursorName = "default";
        }
    }

    public /* virtual */ editEdit(): void {
        this.editObject(this.Selection.Primary);
    }

    public /* virtual */  editObject(obj: TuObject): void {
        if (obj == null) {
            return;
        }
        if (!this.CanEditObjects()) {
            return;
        }
        if (obj.CanEdit()) {
            obj.DoBeginEdit(this);
        }
    }

    public /* virtual */  editPaste(): void {
        if (!this.CanInsertObjects()) {
            return;
        }
        const document: TuDocument = this.Document;
        let str: string = undefined;
        const suspendsRouting: boolean = document.SuspendsRouting;
        try {
            try {
                this.CursorName = "wait";
                this.startTransaction();
                document.SuspendsRouting = true;
                const goCopyDictionary: TuCopyDictionary = this.pasteFromClipboard();
                if (goCopyDictionary != null) {
                    let flag: boolean = false;
                    this.raiseSelectionStarting();
                    const sourceCollection: ICollection<TuObject> = goCopyDictionary.SourceCollection;
                    if (sourceCollection == null) {
                        const enumerator: IEnumerator<IKeyValuePair<any, any>> = goCopyDictionary.GetEnumerator();
                        while (enumerator.MoveNext()) {
                            const key: TuObject = as(enumerator.Current.key, Types.TuObject);
                            if (key == null || !key.IsTopLevel) {
                                continue;
                            }
                            const value: TuObject = as(enumerator.Current.value, Types.TuObject);
                            if (value == null || !value.IsTopLevel || value.Document !== document) {
                                continue;
                            }
                            if (!flag) {
                                flag = true;
                                this.Selection.Clear();
                            }
                            this.Selection.Add(value);
                        }
                    }
                    else {
                        foreach(sourceCollection, (goObject: TuObject) => {
                            const item: TuObject = as(goCopyDictionary.Get(goObject), Types.TuObject);
                            if (item == null || !item.IsTopLevel || item.Document !== document) {
                                return CONTINUE;
                            }
                            if (!flag) {
                                flag = true;
                                this.Selection.Clear();
                            }
                            this.Selection.Add(item);
                        });

                    }
                    this.raiseSelectionFinished();
                }
                str = "Paste";
                this.raiseClipboardPasted();
                document.ResumeRouting(suspendsRouting, this.Selection);
            }
            catch (exception) {
                trace(TString.Concat("EditPaste: ", exception.toString()));
                throw exception;
            }
        }
        finally {
            document.SuspendsRouting = suspendsRouting;
            this.finishTransaction(str);
            this.CursorName = "default";
        }
    }

    public /* virtual */  endUpdate(): void {
        if (this.mySuppressPaint > 0) {
            this.mySuppressPaint = this.mySuppressPaint - 1;
            //this.updateView();
        }
    }

    public /* virtual */ findMouseTool(tooltype: Type, subclass: boolean = false): ITuTool {
        // TODO: type ile ilgili konular düzeltilecek.
        let i: number;
        let mouseDownTools: IList<ITuTool> = this.MouseDownTools;
        for (i = 0; i < mouseDownTools.Count; i++) {
            if (mouseDownTools[i].GetType() === tooltype || subclass && mouseDownTools[i].GetType().IsSubclassOf(tooltype)) {
                return mouseDownTools[i];
            }
        }
        mouseDownTools = this.MouseMoveTools;
        for (i = 0; i < mouseDownTools.Count; i++) {
            if (mouseDownTools[i].GetType() === tooltype || subclass && mouseDownTools[i].GetType().IsSubclassOf(tooltype)) {
                return mouseDownTools[i];
            }
        }
        mouseDownTools = this.MouseUpTools;
        for (i = 0; i < mouseDownTools.Count; i++) {
            if (mouseDownTools[i].GetType() === tooltype || subclass && mouseDownTools[i].GetType().IsSubclassOf(tooltype)) {
                return mouseDownTools[i];
            }
        }
        return undefined;
    }

    public findNearestGridPoint(p: CGPoint): CGPoint {
        if (this.Grid == null) {
            return p;
        }
        return this.Grid.findNearestGridPoint(p, undefined);
    }

    public /* virtual */ finishTransaction(tname: string): boolean {
        return this.Document.finishTransaction(tname);
    }

    private followExternalDragImage(pt: CGPoint): void {
        if (this.myExternalDragImage != null) {
            this.myExternalDragImage.Location = pt;
        }
    }

    public /* internal */ freeTempPointArray(a: CGPoint[]): void {
        const length: number = a.length;
        if (this.myTempArrays != null && length < this.myTempArrays.length) {
            this.myTempArrays[length] = a;
        }
    }

    public /* virtual */  getBitmap(): Bitmap {
        let bitmap: Bitmap;

        const flag: boolean = this.myIsRenderingBitmap;
        this.myIsRenderingBitmap = true;
        const displayRectangle: CGRectangle = this.DisplayRectangle;
        const bitmap1: Bitmap = new Bitmap(displayRectangle.Width, displayRectangle.Height);
        const graphic: Graphics = Graphics.FromImage(bitmap1);
        graphic.PageUnit = GraphicsUnit.Pixel;
        graphic.ScaleTransform(this.DocScale, this.DocScale);
        const docPosition: CGPoint = this.DocPosition;
        graphic.translateTransform(-docPosition.X, -docPosition.Y);
        const rectangleF: CGRectangle = new CGRectangle(docPosition, this.convertViewToDoc(displayRectangle.Size));
        graphic.setClip(rectangleF);
        this.updateDelayedSelectionHandles();
        this.paintView(graphic, rectangleF);
        graphic.dispose();
        this.myIsRenderingBitmap = flag;
        bitmap = bitmap1;
        return bitmap;
    }


    public /* virtual */ getBitmapFromCollection(coll: ITuCollection, bounds: CGRectangle, scale: float, paper: boolean): Bitmap;
    public getBitmapFromCollection(coll: ITuCollection, bounds: CGRectangle, paper: boolean): Bitmap;
    public getBitmapFromCollection(coll: ITuCollection): Bitmap;
    public getBitmapFromCollection(...args: any[]): Bitmap {
        if (args.length === 1) {
            const rectangleF: CGRectangle = TuDocument.ComputeBounds(args[0], this);
            return this.getBitmapFromCollection(args[0], rectangleF, true);
        } else if (args.length === 3) {
            const coll: TuCollection = args[0];
            const bounds: CGRectangle = args[1];
            const paper: boolean = args[2];
            let single: float = 1;
            let worldScale: CGSize = this.WorldScale;
            const width: float = 2000 / worldScale.Width;
            worldScale = this.WorldScale;
            const height: float = 2000 / worldScale.Height;
            if (bounds.Width > width || bounds.Height > height) {
                single = Math.min(width / bounds.Width, height / bounds.Height);
            }
            return this.getBitmapFromCollection(coll, bounds, single, paper);
        } else if (args.length === 4) {
            const coll: IList<TuObject> = args[0];
            const bounds: CGRectangle = args[1];
            let scale: float = args[2];
            const paper: boolean = args[3];

            let bitmap: Bitmap;
            if (scale < 9E-09) {
                scale = 9E-09;
            }
            let int32: number = (~~Math.ceil((bounds.Width * scale)));
            let int321: number = (~~Math.ceil((bounds.Height * scale)));
            if (int32 < 1) {
                int32 = 1;
            }
            if (int321 < 1) {
                int321 = 1;
            }

            const bitmap1: Bitmap = new Bitmap(int32, int321);
            const smoothingMode: Graphics = Graphics.FromImage(bitmap1);
            smoothingMode.PageUnit = GraphicsUnit.Pixel;
            smoothingMode.SmoothingMode = this.SmoothingMode;
            //smoothingMode.TextRenderingHint = this.TextRenderingHint;
            smoothingMode.InterpolationMode = this.InterpolationMode;
            //smoothingMode.CompositingQuality = this.CompositingQuality;
            smoothingMode.PixelOffsetMode = this.PixelOffsetMode;
            const single: float = scale;
            smoothingMode.ScaleTransform(single, single);
            smoothingMode.translateTransform(-bounds.X, -bounds.Y);
            const pointF: CGPoint = this.myOrigin;
            const single1: float = this.myHorizScale;
            const single2: float = this.myVertScale;
            const size: CGSize = this.myBorderSize;
            const rectangle: CGRectangle = this.myDisplayRectangle;
            const flag: boolean = this.myIsRenderingBitmap;
            this.myOrigin = new CGPoint(bounds.X, bounds.Y);
            this.myHorizScale = scale;
            this.myVertScale = scale;
            this.myBorderSize = new CGSize(0, 0);
            this.myViewSize = new CGSize(int32, int321);
            this.myDisplayRectangle = new CGRectangle(0, 0, int32, int321);
            this.myIsRenderingBitmap = true;
            try {
                if (paper) {
                    const rectangleF: Out<CGRectangle> = { value: bounds };
                    GeomUtilities.InflateRect(rectangleF, 1, 1);
                    this.paintPaperColor(smoothingMode, rectangleF.value);
                }
                foreach(coll, (goObject: TuObject) => {
                    if (!goObject.CanView()) {
                        return CONTINUE;
                    }
                    goObject.Paint(smoothingMode, this);
                });

            }
            finally {
                this.myOrigin = pointF;
                this.myHorizScale = single1;
                this.myVertScale = single2;
                this.myBorderSize = size;
                this.myViewSize = new CGSize(-1, -1);
                this.myDisplayRectangle = rectangle;
                this.myIsRenderingBitmap = flag;
            }
            smoothingMode.dispose();
            bitmap = bitmap1;

            return bitmap;
        }
    }

    protected /* virtual */ getExternalDragImage(evt: DragEventArgs): TuObject {
        // TODO: fix below getData
        const data: TuSelection = as(evt.Data.GetData(typeOf(Types.TuSelection)), Types.TuSelection) || as(evt.Data.GetData((this.Selection as any).GetType()), Types.TuSelection);
        if (data == null) {
            return undefined;
        }
        const primary: TuObject = data.Primary;
        let goSelection: TuSelection = data;
        // TODO: findMouseTool u kontrol et.
        const goToolDragging: TuToolDragging = as(this.findMouseTool(typeOf(Types.TuToolDragging), true), Types.TuToolDragging);
        if (goToolDragging != null) {
            goSelection = goToolDragging.computeEffectiveSelection(data, false);
        }
        const rectangleF: CGRectangle = TuDocument.ComputeBounds(goSelection, undefined);
        const bitmapFromCollection: Bitmap = this.getBitmapFromCollection(goSelection, rectangleF, false);
        const goDragImage: TuDragImage = new TuDragImage()
        goDragImage.Image = (CGImage as any).FromBitmap(bitmapFromCollection);
        const sizeF: CGSize = TuTool.SubtractPoints(primary.Position, rectangleF.Location);
        const width: float = sizeF.Width;
        let hotSpot: CGSize = data.HotSpot;
        const single: float = width + hotSpot.Width;
        const height: float = sizeF.Height;
        hotSpot = data.HotSpot;
        goDragImage.Offset = new CGSize(single, height + hotSpot.Height);
        return goDragImage;
    }

    public /* virtual */  getShadowBrush(obj: TuObject): Brush {
        if (this.myShadowBrush == null || this.myShadowBrush.Color.notEquals(this.ShadowColor)) {
            if (this.myShadowBrush != null) {
                this.myShadowBrush.Dispose();
            }
            this.myShadowBrush = new SolidBrush(this.ShadowColor);
        }
        return this.myShadowBrush;
    }

    public /* virtual */ getShadowPen(obj: TuObject, width: float): Pen {
        if (this.myShadowPen == null || this.myShadowPen.Color.notEquals(this.ShadowColor) || TuShape.GetPenWidth(this.myShadowPen) !== width) {
            if (this.myShadowPen != null) {
                this.myShadowPen.Dispose();
            }
            this.myShadowPen = TuShape.NewPen(this.ShadowColor, width);
        }
        return this.myShadowPen;
    }

    public /* virtual */  handleScroll(sender: any, e: ScrollEventArgs): void {
        if (e.Type === ScrollEventType.EndScroll) {
            return;
        }
        const newValue: number = e.NewValue;
        this.requestFocus();
        const docPosition: CGPoint = this.DocPosition;
        const int32: number = newValue;
        const doc: CGSize = this.convertViewToDoc(new CGSize(int32, int32));
        if (sender == this.VerticalScrollBar) {
            docPosition.Y = doc.Height;
            this.DocPosition = docPosition;
            return;
        }
        if (sender == this.HorizontalScrollBar) {
            docPosition.X = doc.Width;
            this.DocPosition = docPosition;
        }
    }

    private hideExternalDragImage(): void {
        if (this.myExternalDragImage != null) {
            this.myExternalDragImage.Remove();
            this.myExternalDragImage = undefined;
        }
    }

    private hoverCallback(obj: any): void {
        /*  try {
             if (base.IsHandleCreated) {
                 base.Invoke((EventHandler)obj);
             }
         }
         catch (objectDisposedException) {
         } */
        throw new NotImplementedException('hoverCallback');
    }

    private hoverTick(sender: any, e: EventArgs): void {
        try {
            if (this.myHoverTimerEnabled) {
                const lastInput: TuInputEventArgs = this.LastInput;
                lastInput.ViewPoint = this.myHoverPoint;
                lastInput.DocPoint = this.convertViewToDoc(lastInput.ViewPoint);
                lastInput.Buttons = (Control as any).MouseButtons;
                lastInput.Modifiers = (Control as any).ModifierKeys;
                lastInput.Delta = 0;
                lastInput.Key = Keys.None;
                lastInput.InputState = TuInputState.Continue;
                this.doMouseHover();
            }
        }
        catch (objectDisposedException) {
        }
    }

    /* internal */ initAllowDrop(dnd: boolean): boolean {
        let flag: boolean;
        try {
            this.initAllowDrop2(dnd);
            return true;
        }
        catch (verificationException) {

            this.AllowDragOut = false;
            trace(TString.Concat("GoView.init: ", verificationException.toString()));
            flag = false;
        }

        return flag;
    }

    private initAllowDrop2(dnd: boolean): void {
        this.AllowDrop = dnd;
    }

    public /* virtual */  initializeLayersFromDocument(): void {
        if (this.Layers != null) {
            this.beginUpdate();
            const defaultLayer: TuLayer = this.Layers.Default;
            const backgroundLayer: TuLayer = this.BackgroundLayer;
            const backgroundGrid: TuGrid = this.BackgroundGrid;
            const sheet: TuSheet = this.Sheet;
            const goLayerArrays: TuLayer[] = this.Layers.CopyArray();
            for (let i = 0; i < goLayerArrays.length; i++) {
                const goLayers: TuLayer = goLayerArrays[i];
                if (!goLayers.IsInView) {
                    this.Layers.Remove(goLayers);
                }
                else {
                    goLayers.Clear();
                }
            }
            this.DocPosition = new CGPoint();
            foreach(this.Document.Layers, (layer: TuLayer) => {
                this.Layers.InsertDocumentLayerAfter(undefined, layer);
            });

            this.Layers.MoveAfter(undefined, defaultLayer);
            this.Layers.MoveBefore(undefined, backgroundLayer);
            backgroundLayer.Add(backgroundGrid);
            backgroundLayer.Add(sheet);
            this.endUpdate();
        }
    }

    private internalOnDocumentChanged(sender: any, e: EventArgs): void {
        if (this.myQueuedEvents != null) {
            let goChangedEventArg: TuChangedEventArgs = this.myQueuedEvents.Dequeue();

            if (goChangedEventArg != null) {
                this.onDocumentChanged(goChangedEventArg.Document, goChangedEventArg);
            }
        }
    }

    protected /* override */ isInputKey(k: Keys): boolean {
        if (k === Keys.Down || k === Keys.Up || k === Keys.Left || k === Keys.Right) {
            const disableKeys: TuViewDisableKeys = this.DisableKeys;
            if ((disableKeys & TuViewDisableKeys.ArrowMove) === TuViewDisableKeys.None || (disableKeys & TuViewDisableKeys.ArrowScroll) === TuViewDisableKeys.None) {
                return true;
            }
        }
        return false;
        //return this.isInputKey(k);
    }

    public /* virtual */  isInternalDragDrop(evt: DragEventArgs): boolean {
        if (!(is.typeof<TuToolDragging>(this.Tool, Types.TuToolDragging))) {
            return false;
        }
        return !this.PretendsInternalDrag;
    }

    private initView(doc: TuDocument): void {
        this.myDocChangedEventHandler.add(this.safeOnDocumentChanged.bind(this));
        this.myDocument = doc;
        this.myLayers = new TuLayerCollection();
        this.myLayers.init(this);



        this.myBackgroundLayer = this.myLayers.CreateNewLayerBefore(undefined);
        this.myBackgroundLayer.Identifier = -1;
        if (this.myDocument == null) {
            this.myDocument = this.createDocument();
        }



        this.myDocumentChangedSubscription = this.myDocument.Changed$.add(this.myDocChangedEventHandler);
        this.initializeLayersFromDocument();

        this.myBackgroundGrid = this.createGrid();
        this.BackgroundLayer.Add(this.myBackgroundGrid);
        this.mySelection = this.createSelection();
        this.myDefaultTool = this.createDefaultTool();
        this.myTool = this.DefaultTool;
        this.myTool.start();

        /* const version: float = TuView.Version;



        const vScrollBar: Slider = new Slider({ orientation: "vertical" });
        const hScrollBar: Slider = new Slider({ orientation: "horizantal" });
        vScrollBar.Width = SystemInformation.VerticalScrollBarWidth;
        hScrollBar.Height = SystemInformation.HorizontalScrollBarHeight;
        this.myTopBar = undefined;
        this.myRightBar = vScrollBar;
        this.myBottomBar = hScrollBar;
        this.myLeftBar = undefined;
        this.myTopLeftCorner = new Control();
        this.myTopLeftCorner.BackColor = SystemColors.Control;
        this.myTopRightCorner = new Control();
        this.myTopRightCorner.BackColor = SystemColors.Control;
        this.myBottomRightCorner = new Control();
        this.myBottomRightCorner.BackColor = SystemColors.Control;
        this.myBottomLeftCorner = new Control();
        this.myBottomLeftCorner.BackColor = SystemColors.Control;

        vScrollBar.SmallChange = this.ScrollSmallChange.Height;
        hScrollBar.SmallChange = this.ScrollSmallChange.Width;
        this.myToolTip = new ToolTip();
        const goView: TuView = this;
*/
        this.initAllowDrop(true);

        this.BackColor = CGColor.White;


        /* this.RegisterRenderer(new TuObjectSvgRenderer(this));
        this.RegisterRenderer(new TuRectangleSvgRenderer(this)); */

    }


    public /* virtual */  layoutScrollBars(update: boolean): void {
        console.warn("NotImplementedException('layoutScrollBars')");

        // throw new NotImplementedException('layoutScrollBars');
        /*  let scrollSmallChange: CGSize;
         if (this.myUpdatingScrollBars) {
             return;
         }
         let topBar: Component = null;
         let rightBar: Component = null;
         let bottomBar: Component = null;
         let leftBar: Component = null;
         let topLeftCorner: Component = null;
         let topRightCorner: Component = null;
         let bottomRightCorner: Component = null;
         let bottomLeftCorner: Component = null;
         if (this.TopBar != null && this.TopBar.Visible) {
             topBar = this.TopBar;
         }
         if (this.RightBar != null && this.RightBar.Visible) {
             rightBar = this.RightBar;
         }
         if (this.BottomBar != null && this.BottomBar.Visible) {
             bottomBar = this.BottomBar;
         }
         if (this.LeftBar != null && this.LeftBar.Visible) {
             leftBar = this.LeftBar;
         }
         if (this.TopLeftCorner != null) {
             topLeftCorner = this.TopLeftCorner;
         }
         if (this.TopRightCorner != null) {
             topRightCorner = this.TopRightCorner;
         }
         if (this.BottomRightCorner != null) {
             bottomRightCorner = this.BottomRightCorner;
         }
         if (this.BottomLeftCorner != null) {
             bottomLeftCorner = this.BottomLeftCorner;
         }
         const clientRectangle: CGRectangle = this.ClientRectangle;
         const point: CGPoint = new CGPoint((clientRectangle.X + this.myBorderSize.Width), (clientRectangle.Y + this.myBorderSize.Height));
         const y: CGPoint = new CGPoint(((clientRectangle.X + clientRectangle.Width) - this.myBorderSize.Width), (clientRectangle.Y + this.myBorderSize.Height));
         const x: CGPoint = new CGPoint(((clientRectangle.X + clientRectangle.Width) - this.myBorderSize.Width), ((clientRectangle.Y + clientRectangle.Height) - this.myBorderSize.Height));
         const point1: CGPoint = new CGPoint((clientRectangle.X + this.myBorderSize.Width), ((clientRectangle.Y + clientRectangle.Height) - this.myBorderSize.Height));
         if (topBar != null) {
             point.Y = (point.Y + topBar.Height);
             y.Y = (y.Y + topBar.Height);
         }
         if (rightBar != null) {
             y.X = (y.X - rightBar.Width);
             x.X = (x.X - rightBar.Width);
         }
         if (bottomBar != null) {
             x.Y = (x.Y - bottomBar.Height);
             point1.Y = (point1.Y - bottomBar.Height);
         }
         if (leftBar != null) {
             point1.X = (point1.X + leftBar.Width);
             point.X = (point.X + leftBar.Width);
         }
         this.myDisplayRectangle = new CGRectangle(point.X, point.Y, (x.X - point.X), (x.Y - point.Y));
         if (topLeftCorner != null) {
             if (topBar == null || leftBar == null) {
                 topLeftCorner.Visible = false;
             }
             else {
                 topLeftCorner.Bounds = new CGRectangle((point.X - leftBar.Width), (point.Y - topBar.Height), leftBar.Width, topBar.Height);
                 topLeftCorner.Visible = true;
             }
         }
         if (topRightCorner != null) {
             if (topBar == null || rightBar == null) {
                 topRightCorner.Visible = false;
             }
             else {
                 topRightCorner.Bounds = new CGRectangle(y.X, (y.Y - topBar.Height), rightBar.Width, topBar.Height);
                 topRightCorner.Visible = true;
             }
         }
         if (bottomRightCorner != null) {
             if (bottomBar == null || rightBar == null) {
                 bottomRightCorner.Visible = false;
             }
             else {
                 bottomRightCorner.Bounds = new CGRectangle(x.X, x.Y, rightBar.Width, bottomBar.Height);
                 bottomRightCorner.Visible = true;
             }
         }
         if (bottomLeftCorner != null) {
             if (bottomBar == null || leftBar == null) {
                 bottomLeftCorner.Visible = false;
             }
             else {
                 bottomLeftCorner.Bounds = new CGRectangle((point1.X - leftBar.Width), point1.Y, leftBar.Width, bottomBar.Height);
                 bottomLeftCorner.Visible = true;
             }
         }
         if (topBar != null) {
             const rectangle: CGRectangle = new CGRectangle(point.X, (point.Y - topBar.Height), (y.X - point.X), topBar.Height);
             if (topLeftCorner == null && leftBar != null) {
                 rectangle.X = (rectangle.X - leftBar.Width);
                 rectangle.Width = (rectangle.Width + leftBar.Width);
             }
             if (topRightCorner == null && rightBar != null) {
                 rectangle.Width = (rectangle.Width + rightBar.Width);
             }
             topBar.Bounds = rectangle;
         }
         if (rightBar != null) {
             const rectangle1: CGRectangle = new CGRectangle(y.X, y.Y, rightBar.Width, (x.Y - y.Y));
             rightBar.Bounds = rectangle1;
         }
         if (bottomBar != null) {
             const width: CGRectangle = new CGRectangle(point1.X, point1.Y, (x.X - point1.X), bottomBar.Height);
             if (bottomLeftCorner == null && leftBar != null) {
                 width.X = (width.X - leftBar.Width);
                 width.Width = (width.Width + leftBar.Width);
             }
             if (bottomRightCorner == null && rightBar != null) {
                 width.Width = (width.Width + rightBar.Width);
             }
             bottomBar.Bounds = width;
         }
         if (leftBar != null) {
             const rectangle2: CGRectangle = new CGRectangle((point.X - leftBar.Width), point.Y, leftBar.Width, (point1.Y - point.Y));
             leftBar.Bounds = rectangle2;
         }
         const verticalScrollBar: Slider = this.VerticalScrollBar;
         if (verticalScrollBar != null && verticalScrollBar.Visible) {
             const height: number = this.ScrollSmallChange.Height;
             const int32: number = verticalScrollBar.Height;
             scrollSmallChange = this.ScrollSmallChange;
             verticalScrollBar.LargeChange = Math.max(height, (int32 - scrollSmallChange.Height));
         }
         const horizontalScrollBar: Slider = this.HorizontalScrollBar;
         if (horizontalScrollBar != null && horizontalScrollBar.Visible) {
             const width1: number = this.ScrollSmallChange.Width;
             const int321: number = horizontalScrollBar.Width;
             scrollSmallChange = this.ScrollSmallChange;
             horizontalScrollBar.LargeChange = Math.max(width1, (int321 - scrollSmallChange.Width));
         }
         if (update) {
             this.updateScrollBars();
         } */
    }

    public /* virtual */ limitDocPosition(p: CGPoint): CGPoint {
        if (this.SheetStyle === TuViewSheetStyle.None) {
            const documentTopLeft: CGPoint = this.DocumentTopLeft;
            const documentSize: CGSize = this.DocumentSize;
            const docExtentSize: CGSize = this.DocExtentSize;
            const x: float = documentTopLeft.X + documentSize.Width - docExtentSize.Width;
            if (x < documentTopLeft.X) {
                p.X = documentTopLeft.X;
            }
            else if (p.X > x && x > documentTopLeft.X) {
                p.X = x;
            }
            else if (p.X < documentTopLeft.X) {
                p.X = documentTopLeft.X;
            }
            const y: float = documentTopLeft.Y + documentSize.Height - docExtentSize.Height;
            if (y < documentTopLeft.Y) {
                p.Y = documentTopLeft.Y;
            }
            else if (p.Y > y && y > documentTopLeft.Y) {
                p.Y = y;
            }
            else if (p.Y < documentTopLeft.Y) {
                p.Y = documentTopLeft.Y;
            }
        }
        return p.clone();
    }

    public /* virtual */ limitDocScale(s: float): float {
        const width: float = this.WorldScale.Width;
        const single: float = 0.01 / width;
        const single1: float = 10 / width;
        if (s < single) {
            s = single;
        }
        if (s > single1) {
            s = single1;
        }
        return s;
    }

    public /* virtual */  matchesNodeLabel(part: ITuLabeledPart, c: string): boolean {
        if (part == null) {
            return false;
        }
        const text: string = part.Text;
        if (text == null) {
            return false;
        }
        if (text.length === 0) {
            return false;
        }

        return text[0].toLocaleUpperCase() === c.toLocaleUpperCase();
    }

    public /* virtual */ moveSelection(sel: TuSelection, offset: CGSize, grid: boolean): void {
        if (sel == null) {
            sel = this.Selection;
        }
        if (sel == this.Selection && !this.CanMoveObjects()) {
            return;
        }
        if (sel.IsEmpty) {
            return;
        }
        const document: TuDocument = this.Document;
        let str: string = undefined;
        const suspendsRouting: boolean = document.SuspendsRouting;
        try {
            this.startTransaction();
            document.SuspendsRouting = true;
            let goObject: TuObject = undefined;
            foreach(sel, (goObject1: TuObject) => {
                if (is.typeof<ITuLink>(goObject1, Types.ITuLink) || !goObject1.canMove()) {
                    return CONTINUE;
                }
                goObject = goObject1;
                return BREAK
            });
            let x: CGSize = offset;
            if (goObject != null) {
                const location: CGPoint = goObject.Location;
                let pointF: CGPoint = new CGPoint(location.X + offset.Width, location.Y + offset.Height);
                if (grid) {
                    pointF = this.snapPoint(pointF, goObject);
                }
                x.Width = pointF.X - location.X;
                x.Height = pointF.Y - location.Y;
            }
            foreach(sel, (goObject2: TuObject) => {
                if (!(is.typeof(goObject2, Types.ITuLink))) {
                    return CONTINUE;
                }
                goObject2.DoMove(this, goObject2.Position, new CGPoint(goObject2.Left + x.Width, goObject2.Top + x.Height));
            });

            foreach(sel, (goObject3: TuObject) => {
                if (is.typeof<ITuLink>(goObject3, Types.ITuLink) || !goObject3.canMove()) {
                    return CONTINUE;
                }
                const location1: CGPoint = goObject3.Location;
                let pointF1: CGPoint = new CGPoint(location1.X + x.Width, location1.Y + x.Height);
                if (grid) {
                    pointF1 = this.snapPoint(pointF1, goObject3);
                }
                goObject3.DoMove(this, location1, pointF1);
            });

            if (x.Width !== 0 || x.Height !== 0) {
                document.ResumeRouting(suspendsRouting, sel);
            }
            str = "Move Selection";
        }
        finally {
            document.SuspendsRouting = suspendsRouting;
            this.finishTransaction(str);
        }
    }

    protected /* override */ onBackColorChanged(evt: EventArgs): void {
        this.updateView();
    }

    protected /* virtual */  onBackgroundContextClicked(evt: TuInputEventArgs): void {

        this.BackgroundContextClicked$(evt);

    }

    protected /* virtual */ onBackgroundDoubleClicked(evt: TuInputEventArgs): void {

        this.BackgroundDoubleClicked$(evt);

    }

    protected /* virtual */  onBackgroundHover(evt: TuInputEventArgs): void {

        this.BackgroundHover$(evt);

    }

    protected /* override */  onBackgroundImageChanged(evt: EventArgs): void {
        // base.onBackgroundImageChanged(evt);
        this.updateView();
    }

    protected /* virtual */  onBackgroundSelectionDropped(evt: TuInputEventArgs): void {

        this.BackgroundSelectionDropped$(evt);

    }

    protected /* virtual */  onBackgroundSelectionDropReject(evt: TuInputEventArgs): void {

        this.BackgroundSelectionDropReject$(evt);

    }

    protected /* virtual */  onBackgroundSingleClicked(evt: TuInputEventArgs): void {

        this.BackgroundSingleClicked$(evt);

    }

    protected /* virtual */  onClipboardCopied(evt: EventArgs): void {
        this.ClipboardCopied$(evt);
    }

    protected /* virtual */ onClipboardPasted(evt: EventArgs): void {
        this.ClipboardPasted$(evt);
    }

    protected /* override */ onCreateControl(): void {
        //base.OnCreateControl();
        this.myUpdatingScrollBars = false;
        this.layoutScrollBars(true);
        this.updateExtent();
    }

    protected /* virtual */  onDocumentChanged(sender: any, e: TuChangedEventArgs): void {
        const goObject: TuObject = e.TuObject;
        if (!e.IsBeforeChanging) {
            const hint: number = e.Hint;
            if (hint <= 220) {
                switch (hint) {
                    case 100:
                    case 108:
                    case 110:
                        {

                            this.Selection.addAllSelectionHandles();
                            this.updateView();
                            break;
                        }
                    case 101:
                        {
                            this.beginUpdate();
                            break;
                        }
                    case 102:
                        {
                            this.endUpdate();
                            break;
                        }
                    case 103:
                        {
                            //base.update();
                            break;
                        }
                    case 104:
                    case 105:
                    case 106:
                    case 107:
                    case 109:
                        {
                            break;
                        }
                    default:
                        {
                            switch (hint) {
                                case TuDocumentEvents.ChangedSize:
                                    {
                                        this.updateScrollBars();
                                        break;
                                    }
                                case TuDocumentEvents.ChangedTopLeft:
                                    {
                                        this.updateScrollBars();
                                        break;
                                    }
                                case 204:
                                    {
                                        break;
                                    }
                                case 205:
                                    {
                                        const sheet: TuSheet = this.Sheet;
                                        if (sheet != null && sheet.Paper != null) {
                                            let paperColor: CGColor = this.Document.PaperColor;
                                            if (paperColor.Equals(CGColor.Empty)) {
                                                paperColor = CGColor.White;
                                            }
                                            sheet.Paper.BrushColor = paperColor;
                                        }
                                        this.updateView();
                                        break;
                                    }
                                default:
                                    {
                                        if (hint === 220) {
                                            this.Selection.addAllSelectionHandles();
                                            this.updateView();
                                            break;
                                        }
                                        break;
                                    }
                            }
                            break;
                        }
                }
            }
            else if (hint > 803) {
                switch (hint) {
                    case 901:
                        {
                            if (!this.SuppressingPaint) {
                                const bounds: CGRectangle = goObject.Bounds;
                                const r: CGRectangle = goObject.ExpandPaintBounds(bounds.clone(), this);
                                const view: CGRectangle = this.convertDocToView(r);
                                view.inflate(2, 2);
                                this.invalidate(view);
                            }
                            if (e.SubHint === 1001) {
                                if (this.Selection.getHandleCount(goObject) > 0 && !this.myUpdateHandles.Contains(goObject)) {
                                    this.myUpdateHandles.Add(goObject);
                                }
                                if (this.SuppressingPaint) {
                                    break;
                                }
                                const oldRect: CGRectangle = e.OldRect;
                                const rectangle: CGRectangle = this.convertDocToView(goObject.ExpandPaintBounds(oldRect.clone(), this));
                                rectangle.inflate(2, 2);
                                this.invalidate(rectangle);
                                break;
                            }
                            else if (e.SubHint === 1204 || e.SubHint == 1412) {
                                if (this.Selection.getHandleCount(goObject) <= 0 || this.myUpdateHandles.Contains(goObject)) {
                                    break;
                                }
                                this.myUpdateHandles.Add(goObject);
                                break;
                            }
                            else if (e.SubHint !== 1003) {
                                if (e.SubHint != 1052) {
                                    break;
                                }
                                this.removeFromSelection(as(e.OldValue, Types.TuObject));
                                break;
                            }
                            else {
                                console.log('update selection handles');
                                this.updateSelectionHandles(goObject);
                                break;
                            }
                        }
                    case 902:
                    case 903:
                    case 904:
                    case 905:
                        {
                            if (e.Hint === 903) {
                                this.removeFromSelection(goObject);
                            }
                            if (this.SuppressingPaint) {
                                break;
                            }
                            const rectangleF: CGRectangle = goObject.Bounds;
                            const view1: CGRectangle = this.convertDocToView(goObject.ExpandPaintBounds(rectangleF.clone(), this));
                            view1.inflate(2, 2);
                            this.invalidate(view1);
                            if (this.RenderingMode === ViewRenderingMode.Svg || this.RenderingMode === ViewRenderingMode.Html) {
                                //this.ForceUpdate();
                            }
                            break;
                        }
                    case 906:
                    case 907:
                    case 908:
                    case 909:
                        {
                            break;
                        }
                    case 910:
                        {
                            const obj: TuLayer = as(e.Object, Types.TuLayer);
                            if (obj != null && e.NewValue === false) {
                                this.removeAllTuControls(obj, false);
                            }
                            this.Selection.addAllSelectionHandles();
                            this.updateView();
                            break;
                        }
                    default:
                        {
                            if (hint == 930) {
                                break;
                            }
                            break;
                        }
                }
            }
            else if (hint == 227) {
                const goDocuments: TuDocument = as(sender, Types.TuDocument);
                if (goDocuments != null) {
                    const worldScale: CGSize = goDocuments.WorldScale;
                    this.myHorizWorld = worldScale.Width;
                    this.myVertWorld = worldScale.Height;
                    this.updateView();
                }
            }
            else {
                switch (hint) {
                    case 801:
                        {
                            const goLayers: TuLayer = e.Object;
                            const oldValue: TuLayer = e.OldValue;
                            if (e.SubHint !== 1) {
                                this.Layers.InsertDocumentLayerBefore(oldValue, goLayers);
                            }
                            else {
                                this.Layers.InsertDocumentLayerAfter(oldValue, goLayers);
                            }
                            this.Selection.addAllSelectionHandles();
                            this.updateView();
                            break;
                        }
                    case 802:
                        {
                            const obj1: TuLayer = e.Object;
                            this.Layers.Remove(obj1);
                            this.removeAllTuControls(obj1, true);
                            this.Selection.addAllSelectionHandles();
                            this.updateView();
                            break;
                        }
                    case 803:
                        {
                            const oldValue1: TuLayer = e.OldValue;
                            const newInt: number = e.NewInt;
                            if (newInt > 0) {
                                const goLayers1: TuLayer = this.Document.Layers.LayerAt((newInt - 1));
                                this.Layers.MoveAfter(goLayers1, oldValue1);
                            }
                            else {
                                const goLayers2: TuLayer = this.Document.Layers.LayerAt((newInt + 1));
                                this.Layers.MoveBefore(goLayers2, oldValue1);
                            }
                            this.updateView();
                            break;
                        }
                }
            }
        }
        else if (e.Hint === 901 && !this.SuppressingPaint && goObject != null) {
            const bounds1: CGRectangle = goObject.Bounds;
            const rectangle1: CGRectangle = this.convertDocToView(goObject.ExpandPaintBounds(bounds1.clone(), this));
            rectangle1.inflate(2, 2);
            this.invalidate(rectangle1);
        }
        if (this.DocumentChanged$ != null) {
            this.DocumentChanged$(e);
        }
    }

    protected /* override */ OnDoubleClick(evt: EventArgs): void {
        const lastInput: TuInputEventArgs = this.LastInput;
        if (this.AllowMouse) {
            const mouseEventArg: TuInputEventArgs = lastInput;
            const buttons: MouseButtons = mouseEventArg.Buttons;
            const x: number = lastInput.ViewPoint.X;
            const viewPoint: CGPoint = lastInput.ViewPoint;
            mouseEventArg.MouseEventArgs = new MouseEventArgs(buttons, 2, x, viewPoint.Y, lastInput.Delta);
            lastInput.DoubleClick = true;
            lastInput.InputState = TuInputState.Finish;
            this.doMouseUp();
        }
        // base.OnDoubleClick(evt);
        lastInput.DoubleClick = false;
        lastInput.MouseEventArgs = null;
    }

    protected /* override */ onDragDrop(evt: DragEventArgs): void {
        /*  this.stopHoverTimer();
         this.stopAutoScroll(); */
        const lastInput: TuInputEventArgs = this.LastInput;
        if (this.AllowMouse) {
            try {
                const point: CGPoint = new CGPoint(evt.X, evt.Y);
                lastInput.ViewPoint = (this as any).pointToClient(point);
                lastInput.DocPoint = this.convertViewToDoc(lastInput.ViewPoint);
                lastInput.Buttons = (Control as any).MouseButtons;
                lastInput.Modifiers = (Control as any).ModifierKeys;
                lastInput.Delta = 0;
                lastInput.Key = Keys.None;
                lastInput.DragEventArgs = evt;
                lastInput.InputState = TuInputState.Finish;
                if (!this.isInternalDragDrop(evt)) {
                    this.hideExternalDragImage();
                    if (!this.PretendsInternalDrag) {
                        this.DoExternalDrop(evt);
                    }
                    else {
                        this.doMouseUp();
                        this.finishTransaction("Drop");
                    }
                }
                else {
                    this.doInternalDrop(evt);
                }
                this.PretendsInternalDrag = false;
            }
            catch (exception) {
                trace(TString.Concat("OnDragDrop: ", exception.toString()));
                throw exception;
            }
        }
        // base.OnDragDrop(evt);
        lastInput.DragEventArgs = undefined;
    }

    private pointToClient(point: CGPoint): CGPoint {
        return point.clone();
    }

    protected /* override */ onDragEnter(evt: DragEventArgs): void {
        console.log('Drag Enter');
        if (this.AllowMouse) {
            if (this.ExternalDragDropsOnEnter && !this.isInternalDragDrop(evt) && this.CanInsertObjects()) {
                this.startTransaction();
                const lastInput: TuInputEventArgs = this.LastInput;
                const point: CGPoint = new CGPoint(evt.X, evt.Y);
                lastInput.ViewPoint = this.pointToClient(point);
                lastInput.DocPoint = this.convertViewToDoc(lastInput.ViewPoint);
                lastInput.Buttons = (Control as any).MouseButtons;
                lastInput.Modifiers = (Control as any).ModifierKeys;
                lastInput.Delta = 0;
                lastInput.Key = Keys.None;
                lastInput.DragEventArgs = evt;
                lastInput.InputState = TuInputState.Start;
                const firstInput: TuInputEventArgs = this.FirstInput;
                firstInput.ViewPoint = lastInput.ViewPoint;
                firstInput.DocPoint = lastInput.DocPoint;
                firstInput.Buttons = lastInput.Buttons;
                firstInput.Modifiers = lastInput.Modifiers;
                firstInput.Delta = lastInput.Delta;
                firstInput.Key = lastInput.Key;
                firstInput.DragEventArgs = lastInput.DragEventArgs;
                firstInput.InputState = lastInput.InputState;
                const goCollections: ITuCollection = this.DoExternalDrop(evt);
                if (goCollections != null && !(goCollections.Count === 0)) {
                    this.PretendsInternalDrag = true;
                    evt.Effect = DragDropEffects.Copy;
                    const primary: TuToolDragging = as(this.findMouseTool(typeOf(Types.TuToolDragging), true), Types.TuToolDragging) || new TuToolDragging(this);
                    primary.CurrentObject = this.Selection.Primary;
                    primary.MoveOffset = this.Selection.HotSpot.Clone();
                    primary.SelectsWhenStarts = false;
                    const allowDragOut: boolean = this.AllowDragOut;
                    this.AllowDragOut = false;
                    this.Tool = primary;
                    this.AllowDragOut = allowDragOut;
                    // base.OnDragEnter(evt);
                    return;
                }
                this.AbortTransaction();
            }
            if (!this.isInternalDragDrop(evt)) {
                const externalDragImage: TuObject = this.getExternalDragImage(evt);
                if (externalDragImage != null) {
                    this.showExternalDragImage(externalDragImage);
                    this.followExternalDragImage(this.LastInput.DocPoint);
                }
            }
        }
        // base.OnDragEnter(evt);
    }

    protected /* override */  onDragLeave(e: EventArgs): void {
        this.stopHoverTimer();
        this.stopAutoScroll();
        if (this.AllowMouse) {
            if (this.PretendsInternalDrag) {
                this.PretendsInternalDrag = false;
                this.deleteSelection(this.Selection);
                this.AbortTransaction();
                this.Tool = null;
            }
            else if (!this.isInternalDragDrop(undefined)) {
                this.hideExternalDragImage();
            }
            else {
                const tool: TuToolDragging = as(this.Tool, Types.TuToolDragging);
                if (tool != null) {
                    tool.clearDragSelection();
                }
            }
        }
        // base.OnDragLeave(e);
    }

    protected /* override */  onDragOver(evt: DragEventArgs): void {

        const lastInput: TuInputEventArgs = this.LastInput;
        if (this.AllowMouse) {
            try {
                const point: CGPoint = new CGPoint(evt.X, evt.Y);
                lastInput.ViewPoint = this.pointToClient(point);
                lastInput.DocPoint = this.convertViewToDoc(lastInput.ViewPoint);
                /*   lastInput.Buttons = Control.MouseButtons;
                  lastInput.Modifiers = Control.ModifierKeys; */
                lastInput.Delta = 0;
                lastInput.Key = Keys.None;
                lastInput.DragEventArgs = evt;
                lastInput.InputState = TuInputState.Continue;
                if (this.isInternalDragDrop(evt)) {
                    this.doInternalDrag(evt);
                }
                else if (!this.PretendsInternalDrag) {
                    this.doExternalDrag(evt);
                }
                else {
                    this.doMouseMove();
                }
            }
            catch (exception) {
                trace(TString.Concat("OnDragOver: ", exception.toString()));
                throw exception;
            }
        }
        //base.OnDragOver(evt);
        lastInput.DragEventArgs = undefined;
    }

    protected /* virtual */  onExternalObjectsDropped(evt: TuInputEventArgs): void {
        throw new NotImplementedException('onExternalObjectsDropped');
        /*  if (this.ExternalObjectsDropped != null) {
             this.ExternalObjectsDropped.dispatch(this, evt);
         } */
    }

    protected /* override */  onGotFocus(evt: EventArgs): void {
        // base.OnGotFocus(evt);
        this.cleanUpModalControl();
        if (this.Selection != null) {
            this.Selection.onGotFocus();
        }
    }

    protected /* override */  onKeyDown(evt: KeyEventArgs): void {
        const lastInput: TuInputEventArgs = this.LastInput;
        if (this.AllowKey) {
            lastInput.Buttons = MouseButtons.None;
            lastInput.Modifiers = evt.Modifiers;
            lastInput.Delta = 0;
            lastInput.Key = evt.KeyCode;
            lastInput.KeyEventArgs = evt;
            lastInput.InputState = TuInputState.Start;
            this.doKeyDown();
        }
        // base.onKeyDown(evt);
        lastInput.KeyEventArgs = undefined;
    }

    protected /* virtual */  onLinkCreated(evt: TuSelectionEventArgs): void {
        if (this.LinkCreated != null) {
            this.LinkCreated(evt);
        }
    }

    protected /* virtual */  onLinkRelinked(evt: TuSelectionEventArgs): void {
        if (this.LinkRelinked != null) {
            this.LinkRelinked(evt);
        }
    }

    protected /* override */ onLostFocus(evt: EventArgs): void {
        // base.onLostFocus(evt);
        if (this.Selection != null) {
            this.Selection.onLostFocus();
        }
    }

    protected /* override */  onMouseDown(evt: MouseEventArgs): void {
        const lastInput: TuInputEventArgs = this.LastInput;
        if (this.AllowMouse) {
            lastInput.ViewPoint = new CGPoint(evt.X, evt.Y);
            lastInput.DocPoint = this.convertViewToDoc(lastInput.ViewPoint);
            lastInput.Buttons = evt.Button;
            lastInput.Modifiers = (Control as any).ModifierKeys;
            lastInput.Delta = evt.Delta;
            lastInput.Key = Keys.None;
            lastInput.MouseEventArgs = evt;
            lastInput.InputState = TuInputState.Start;
            const firstInput: TuInputEventArgs = this.FirstInput;
            firstInput.ViewPoint = lastInput.ViewPoint;
            firstInput.DocPoint = lastInput.DocPoint;
            firstInput.Buttons = lastInput.Buttons;
            firstInput.Modifiers = lastInput.Modifiers;
            firstInput.Delta = lastInput.Delta;
            firstInput.Key = lastInput.Key;
            firstInput.MouseEventArgs = evt;
            firstInput.InputState = TuInputState.Start;
            this.doMouseDown();
        }
        // base.onMouseDown(evt);
        lastInput.MouseEventArgs = undefined;
        this.FirstInput.MouseEventArgs = undefined;
    }

    protected /* override */ onMouseEnter(e: EventArgs): void {
        throw new NotImplementedException('onMouseEnter');
        /*  // base.onMouseEnter(e);
         if (this.AllowMouse) {
             const lastInput: TuInputEventArgs = this.LastInput;
             lastInput.ViewPoint = this.pointToClient(Control.MousePosition);
             lastInput.DocPoint = this.convertViewToDoc(lastInput.ViewPoint);
             lastInput.Buttons = Control.MouseButtons;
             lastInput.Modifiers = Control.ModifierKeys;
             lastInput.Delta = 0;
             lastInput.Key = Keys.None;
             lastInput.MouseEventArgs = undefined;
             lastInput.InputState = TuInputState.Start;
             const goObject: TuObject = this.pickObject(true, false, lastInput.DocPoint, false);
             if (goObject != null) {
                 this.doObjectEnterLeave(null, goObject, this.LastInput);
             }
         } */
    }

    protected /* override */  onMouseLeave(e: EventArgs): void {
        let currentObject: TuObject;
        this.stopHoverTimer();
        this.stopAutoScroll();
        // base.onMouseLeave(e);
        if (this.AllowMouse) {
            const tool: TuToolManager = as(this.Tool, Types.TuToolManager);
            if (tool != null) {
                currentObject = tool.CurrentObject;
            }
            else {
                currentObject = null;
            }
            const goObject: TuObject = currentObject;
            if (goObject != null) {
                this.doObjectEnterLeave(goObject, undefined, this.LastInput);
            }
        }
    }

    protected /* override */  onMouseMove(evt: MouseEventArgs): void {
        if (evt.Button !== MouseButtons.Left) {
            return;
        }
        const lastInput: TuInputEventArgs = this.LastInput;
        const point: CGPoint = new CGPoint(evt.X, evt.Y);
        if (this.AllowMouse) {
            lastInput.ViewPoint = point;
            lastInput.DocPoint = this.convertViewToDoc(lastInput.ViewPoint);
            lastInput.Buttons = evt.Button;
            lastInput.Modifiers = (Control as any).ModifierKeys;
            lastInput.Delta = evt.Delta;
            lastInput.Key = Keys.None;
            lastInput.MouseEventArgs = evt;
            lastInput.InputState = TuInputState.Continue;
            this.doMouseMove();
        }
        // base.OnMouseMove(evt);
        lastInput.MouseEventArgs = undefined;
    }

    protected /* override */  onMouseUp(evt: MouseEventArgs): void {
        const lastInput: TuInputEventArgs = this.LastInput;
        if (this.AllowMouse) {
            lastInput.ViewPoint = new CGPoint(evt.X, evt.Y);
            lastInput.DocPoint = this.convertViewToDoc(lastInput.ViewPoint);
            lastInput.Buttons = evt.Button;
            lastInput.Modifiers = (Control as any).ModifierKeys;
            lastInput.Delta = evt.Delta;
            lastInput.Key = Keys.None;
            lastInput.MouseEventArgs = evt;
            lastInput.InputState = TuInputState.Finish;
            this.doMouseUp();
        }
        // base.onMouseUp(evt);
        lastInput.MouseEventArgs = undefined;

    }

    protected /* override */ onMouseWheel(evt: MouseEventArgs): void {
        const lastInput: TuInputEventArgs = this.LastInput;
        if (this.AllowMouse) {
            lastInput.ViewPoint = new CGPoint(evt.X, evt.Y);
            lastInput.DocPoint = this.convertViewToDoc(lastInput.ViewPoint);
            lastInput.Buttons = evt.Button;
            lastInput.Modifiers = (Control as any).ModifierKeys;
            lastInput.Delta = evt.Delta;
            lastInput.Key = Keys.None;
            lastInput.MouseEventArgs = evt;
            lastInput.InputState = TuInputState.Start;
            this.doMouseWheel();
        }
        // base.onMouseWheel(evt);
        lastInput.MouseEventArgs = undefined;
    }

    protected /* virtual */ onObjectContextClicked(evt: TuObjectEventArgs): void {
        if (this.ObjectContextClicked != null) {
            this.ObjectContextClicked(this, evt);
        }
    }

    protected /* virtual */ onObjectDoubleClicked(evt: TuObjectEventArgs): void {
        if (this.ObjectDoubleClicked != null) {
            this.ObjectDoubleClicked(evt);
        }
    }

    protected /* virtual */ onObjectEdited(evt: TuSelectionEventArgs): void {
        if (this.ObjectEdited != null) {
            this.ObjectEdited(evt);
        }
    }

    protected /* virtual */  onObjectEnterLeave(evt: TuObjectEnterLeaveEventArgs): void {
        if (this.ObjectEnterLeave != null) {
            this.ObjectEnterLeave(evt);
        }
    }

    protected /* virtual */ onObjectGotSelection(evt: TuSelectionEventArgs): void {
        if (this.ObjectGotSelection != null) {
            this.ObjectGotSelection(evt);
        }
    }

    protected /* virtual */  onObjectHover(evt: TuObjectEventArgs): void {
        if (this.ObjectHover != null) {
            this.ObjectHover(evt);
        }
    }

    protected /* virtual */ onObjectLostSelection(evt: TuSelectionEventArgs): void {
        if (this.ObjectLostSelection != null) {
            this.ObjectLostSelection(evt);
        }
    }

    protected /* virtual */  onObjectResized(evt: TuSelectionEventArgs): void {
        if (this.ObjectResized != null) {
            this.ObjectResized(evt);
        }
    }

    protected /* virtual */ onObjectSelectionDropped(evt: TuObjectEventArgs): void {
        if (this.ObjectSelectionDropped != null) {
            this.ObjectSelectionDropped(evt);
        }
    }

    protected /* virtual */ onObjectSelectionDropReject(evt: TuObjectEventArgs): void {
        if (this.ObjectSelectionDropReject != null) {
            this.ObjectSelectionDropReject(evt);
        }
    }

    protected /* virtual */  onObjectSingleClicked(evt: TuObjectEventArgs): void {
        if (this.ObjectSingleClicked != null) {
            this.ObjectSingleClicked(evt);
        }
    }

    protected /* override */  onPaint(evt: PaintEventArgs): void {

        this.onPaintCanvas(evt);
        /*    if (this.myTuControls != null && this.myTuControls.Count > 0) {
               const displayRectangle: CGRectangle = this.DisplayRectangle;
               foreach(this.myTuControls, (myGoControl: TuControl) => {
                   const control: Control = myGoControl.findControl(this);
                   if (control == null) {
                       return CONTINUE;
                   }
                   const view: CGRectangle = this.convertDocToView(myGoControl.Bounds);
                   if (displayRectangle.intersectsWith(view)) {
                       return CONTINUE;
                   }
                   control.Bounds = view;
               });

           } */

        // base.onPaint(evt);
    }

    /*  private renderCanvas() {
         this.BeginUpdate();
         const clipRectangle: CGRectangle = this.ClientRectangle;
         if (clipRectangle.Width <= 0 || clipRectangle.Height <= 0) {
             return;
         }
         // TODO : ClientRectangle
         const clientRectangle: CGRectangle = this.ClientRectangle;
         if (clientRectangle.Width <= 0 || clientRectangle.Height <= 0) {
             return;
         }

         const rectangle: CGRectangle = CGRectangle.Intersect(clipRectangle, this.DisplayRectangle);
         const doc: CGRectangle = this.convertViewToDoc(rectangle);

         const result = [];

         this.renderBorder(result, clientRectangle, clipRectangle);

         this.beginUpdate();
         this.updateDelayedSelectionHandles();
         this.endUpdate();



         this.renderView(result, doc);
         this.EndUpdate();
         return result;
     } */
    private onPaintCanvas(evt: PaintEventArgs): void {
        if (this.SuppressingPaint) {
            return;
        }
        this.myPaintEventArgs = evt;
        const graphics: Graphics = evt.Graphics;
        graphics.save();
        graphics.PageUnit = GraphicsUnit.Pixel;
        const clipRectangle: CGRectangle = evt.ClipRectangle;
        if (clipRectangle.Width <= 0 || clipRectangle.Height <= 0) {
            return;
        }
        // TODO : ClientRectangle
        const clientRectangle: CGRectangle = this.ClientRectangle;
        if (clientRectangle.Width <= 0 || clientRectangle.Height <= 0) {
            return;
        }

        // Gereksiz olduğu görüldü.
        /*  if (this.myBuffer == null || this.myBuffer.Width < clientRectangle.Width || this.myBuffer.Height < clientRectangle.Height) {
             if (this.myBuffer != null) {
                 this.myBuffer.dispose();
             }
             this.myBuffer = new Bitmap(clientRectangle.Width, clientRectangle.Height, graphics);
         } */
        //const graphic: Graphics = Graphics.FromImage(this.myBuffer);
        graphics.PageUnit = GraphicsUnit.Pixel;
        this.paintBorder(graphics, clientRectangle, clipRectangle);
        const rectangle: CGRectangle = CGRectangle.Intersect(clipRectangle, this.DisplayRectangle);
        graphics.intersectClip(rectangle);
        const doc: CGRectangle = this.convertViewToDoc(rectangle);
        graphics.translateTransform(this.myDisplayRectangle.X, this.myDisplayRectangle.Y);
        graphics.ScaleTransform(this.myHorizScale * this.myHorizWorld, this.myVertScale * this.myVertWorld);
        const docPosition: CGPoint = this.DocPosition;
        graphics.translateTransform(-docPosition.X, -docPosition.Y);
        this.beginUpdate();
        this.updateDelayedSelectionHandles();
        this.endUpdate();
        this.paintView(graphics, doc);

        graphics.restore();
        graphics.dispose();
    }

    protected /* virtual */ onPropertyChanged(evt: PropertyChangedEventArgs): void {

        /*  if (this.PropertyChanged != null) {
             this.PropertyChanged.dispatch(this, evt);
         }
         if (evt.PropertyName != "Tool") {
             this.updateView();
         }  */
    }


    protected /* override */  onQueryContinueDrag(evt: any/* QueryContinueDragEventArgs */): void {
        // TODO: QueryContinueDragEventArgs oluştur.
        if (this.AllowMouse) {
            try {
                if (evt.EscapePressed) {
                    this.stopHoverTimer();
                    this.stopAutoScroll();
                    if (this.PretendsInternalDrag) {
                        this.PretendsInternalDrag = false;
                        this.deleteSelection(this.Selection);
                        this.AbortTransaction();
                    }
                    this.doCancelMouse();
                }
            }
            catch (exception) {
                trace(TString.Concat("OnQueryContinueDrag: ", exception.toString()));
                throw exception;
            }
        }
        // base.OnQueryContinueDrag(evt);
    }


    protected /* virtual */ onSelectionCopied(evt: EventArgs): void {
        if (this.SelectionCopied != null) {
            this.SelectionCopied(evt);
        }
    }

    protected /* virtual */  onSelectionDeleted(evt: EventArgs): void {
        if (this.SelectionDeleted != null) {
            this.SelectionDeleted(evt);
        }
    }

    protected /* virtual */  onSelectionDeleting(evt: CancelEventArgs): void {
        if (this.SelectionDeleting != null) {
            this.SelectionDeleting(evt);
        }
    }

    protected /* virtual */ onSelectionFinished(evt: EventArgs): void {
        if (this.SelectionFinished != null) {
            this.SelectionFinished(evt);
        }
    }

    protected /* virtual */  onSelectionMoved(evt: EventArgs): void {
        if (this.SelectionMoved != null) {
            this.SelectionMoved(evt);
        }
    }

    protected /* virtual */  onSelectionStarting(evt: EventArgs): void {
        if (this.SelectionStarting != null) {
            this.SelectionStarting(evt);
        }
    }

    protected /* override */ onSizeChanged(evt: EventArgs): void {
        this.layoutScrollBars(false);
        // base.onSizeChanged(evt);
        this.updateExtent();
        this.updateView();
    }

    protected /* override */  onStyleChanged(evt: EventArgs): void {
        // base.onStyleChanged(evt);
        this.updateView();
    }

    protected /* override */  onSystemColorsChanged(evt: EventArgs): void {
        // base.onSystemColorsChanged(evt);
        this.updateView();
    }

    protected /* override */  onVisibleChanged(evt: EventArgs): void {
        // base.onVisibleChanged(evt);
        if (this.Visible) {
            this.layoutScrollBars(false);
            this.updateExtent();
            this.updateView();
        }
    }

    protected renderBackgroundDecoration(result: any[], clipRect: CGRectangle) {

    }
    protected /* virtual */  paintBackgroundDecoration(g: Graphics, clipRect: CGRectangle): void {
        const backgroundImage: CGImage = (this as any).BackgroundImage;
        if (backgroundImage != null) {
            const rectangleF: CGRectangle = clipRect;
            rectangleF.Width = Math.min(rectangleF.Width, 32767);
            rectangleF.Height = Math.min(rectangleF.Height, 32767);
            const rectangleF1: CGRectangle = rectangleF;
            g.DrawImage(backgroundImage as any, rectangleF1 /* rectangleF1 *//* , GraphicsUnit.Pixel */);
        }
    }

    private renderBorder(result: any[], rect: CGRectangle, clipRect: CGRectangle) {
        switch (this.BorderStyle) {
            case BorderStyle.None:
                {
                    return;
                }
            case BorderStyle.FixedSingle:
                {
                    if (clipRect.X > (rect.X + this.myBorderSize.Width) && clipRect.Y > (rect.Y + this.myBorderSize.Height) && (clipRect.X + clipRect.Width) < ((rect.X + rect.Width) - this.myBorderSize.Width) && (clipRect.Y + clipRect.Height) < ((rect.Y + rect.Height) - this.myBorderSize.Height)) {
                        return;
                    }
                    const color = SystemPens_WindowFrame.Color.toString('#rrggbb');
                    const penWidth = SystemPens_WindowFrame.Width;
                    rect = rect.inflate(new CGSize(-penWidth, -penWidth));

                    result.push(<rect
                        x={rect.X}
                        y={rect.Y}
                        width={rect.Width}
                        height={rect.Height}
                        fill='transparent'
                        stroke={color}
                        stroke-width={penWidth}>
                    </rect>);

                }
            case BorderStyle.Fixed3D:
                {
                    if (clipRect.X > (rect.X + this.myBorderSize.Width) && clipRect.Y > (rect.Y + this.myBorderSize.Height) && (clipRect.X + clipRect.Width) < ((rect.X + rect.Width) - this.myBorderSize.Width) && (clipRect.Y + clipRect.Height) < ((rect.Y + rect.Height) - this.myBorderSize.Height)) {
                        return;
                    }
                    //ControlPaint.DrawBorder3D(g, rect, this.Border3DStyle);
                    const color = Pens.Black.Color.toString('#rrggbb');
                    const penWidth = Pens.Black.Width;
                    rect = rect.inflate(new CGSize(-penWidth, -penWidth));
                    result.push(<rect
                        x={rect.X}
                        y={rect.Y}
                        width={rect.Width}
                        height={rect.Height}
                        fill='transparent'
                        stroke={color}
                        stroke-width={penWidth}>
                    </rect>)
                }
            default:
                {
                    if (clipRect.X > (rect.X + this.myBorderSize.Width) && clipRect.Y > (rect.Y + this.myBorderSize.Height) && (clipRect.X + clipRect.Width) < ((rect.X + rect.Width) - this.myBorderSize.Width) && (clipRect.Y + clipRect.Height) < ((rect.Y + rect.Height) - this.myBorderSize.Height)) {
                        return;
                    }
                    //ControlPaint.DrawBorder3D(g, rect, this.Border3DStyle);
                    return;
                }
        }
    }
    private /* internal */  paintBorder(g: Graphics, rect: CGRectangle, clipRect: CGRectangle): void {
        switch (this.BorderStyle) {
            case BorderStyle.None:
                {
                    return;
                }
            case BorderStyle.FixedSingle:
                {
                    if (clipRect.X > (rect.X + this.myBorderSize.Width) && clipRect.Y > (rect.Y + this.myBorderSize.Height) && (clipRect.X + clipRect.Width) < ((rect.X + rect.Width) - this.myBorderSize.Width) && (clipRect.Y + clipRect.Height) < ((rect.Y + rect.Height) - this.myBorderSize.Height)) {
                        return;
                    }
                    g.DrawRectangle(SystemPens_WindowFrame, rect);
                    return;
                }
            case BorderStyle.Fixed3D:
                {
                    if (clipRect.X > (rect.X + this.myBorderSize.Width) && clipRect.Y > (rect.Y + this.myBorderSize.Height) && (clipRect.X + clipRect.Width) < ((rect.X + rect.Width) - this.myBorderSize.Width) && (clipRect.Y + clipRect.Height) < ((rect.Y + rect.Height) - this.myBorderSize.Height)) {
                        return;
                    }
                    ControlPaint.DrawBorder3D(g, rect, this.Border3DStyle);
                    return;
                }
            default:
                {
                    if (clipRect.X > (rect.X + this.myBorderSize.Width) && clipRect.Y > (rect.Y + this.myBorderSize.Height) && (clipRect.X + clipRect.Width) < ((rect.X + rect.Width) - this.myBorderSize.Width) && (clipRect.Y + clipRect.Height) < ((rect.Y + rect.Height) - this.myBorderSize.Height)) {
                        return;
                    }
                    ControlPaint.DrawBorder3D(g, rect, this.Border3DStyle);
                    return;
                }
        }
    }

    /*  protected renderObjects(result: any[], doc: boolean, view: boolean, clipRect: CGRectangle): void {
         foreach(this.Layers, (layer: TuLayer) => {
             if ((!doc || !layer.IsInDocument) && (!view || !layer.IsInView)) {
                 return CONTINUE;
             }
             layer.renderPaint(result, this, clipRect);
         });
     } */

    protected /* virtual */  paintObjects(doc: boolean, view: boolean, g: Graphics, clipRect: CGRectangle): void {
        foreach(this.Layers, (layer: TuLayer) => {
            if ((!doc || !layer.IsInDocument) && (!view || !layer.IsInView)) {
                return CONTINUE;
            }
            layer.Paint(g, this, clipRect);
        });

    }

    protected renderPaperColor(result: any[], clipRect: CGRectangle) {
        let backColor: CGColor = (this.SheetStyle === TuViewSheetStyle.None ? this.Document.PaperColor : CGColor.Empty);
        if (backColor.Equals(CGColor.Empty)) {
            backColor = this.BackColor;
        }
        if (this.myBackgroundBrush == null || this.myBackgroundBrush.Color.notEquals(backColor)) {
            if (this.myBackgroundBrush != null) {
                this.myBackgroundBrush.Dispose();
            }

            this.myBackgroundBrush = new SolidBrush(backColor);

        }

        result.push(<rect
            x={clipRect.X}
            y={clipRect.Y}
            width={clipRect.Width}
            height={clipRect.Height}
            fill={this.myBackgroundBrush.Color.toString('#rrggbb')}
            stroke-width={1}>
        </rect>);


    }
    protected /* virtual */  paintPaperColor(g: Graphics, clipRect: CGRectangle): void {
        let backColor: CGColor = (this.SheetStyle === TuViewSheetStyle.None ? this.Document.PaperColor : CGColor.Empty);
        if (backColor.Equals(CGColor.Empty)) {
            backColor = this.BackColor;
        }
        if (this.myBackgroundBrush == null || this.myBackgroundBrush.Color.notEquals(backColor)) {
            if (this.myBackgroundBrush != null) {
                this.myBackgroundBrush.Dispose();
            }
            this.myBackgroundBrush = new SolidBrush(backColor);
        }

        g.renderer.drawingContext.clearRect(clipRect.X, clipRect.Y, clipRect.Width, clipRect.Height);
        //g.fillRectangle(this.myBackgroundBrush, clipRect);
    }

    /* protected renderView(result: any[], clipRect: CGRectangle) {
        this.renderPaperColor(result, clipRect);
        this.renderBackgroundDecoration(result, clipRect);
        this.renderObjects(result, true, true, clipRect);
    } */
    protected /* virtual */ paintView(g: Graphics, clipRect: CGRectangle): void {
        this.paintPaperColor(g, clipRect);
        this.paintBackgroundDecoration(g, clipRect);
        g.SmoothingMode = this.SmoothingMode;
        // g.TextRenderingHint = this.TextRenderingHint;
        g.InterpolationMode = this.InterpolationMode;
        // g.CompositingQuality = this.CompositingQuality;
        g.PixelOffsetMode = this.PixelOffsetMode;
        this.paintObjects(true, true, g, clipRect);
    }

    public /* virtual */  pasteFromClipboard(): TuCopyDictionary {
        const document: TuDocument = this.Document;
        if (document == null) {
            return undefined;
        }
        let data: TuDocument = undefined;
        try {
            const dataObject: IDataObject = Clipboard.GetDataObject();
            if (dataObject != null) {
                data = as(dataObject.GetData(document.DataFormat), Types.TuDocument);
            }
            else {
                return undefined;
            }
        }
        catch (verificationException) {
            trace(TString.Concat("TuView.PasteFromClipboard: ", verificationException.toString()));
            const outData: Out<TuDocument> = { value: data };
            TuView.myClipboard.TryGetValue(document.DataFormat, outData);
            data = outData.value;
        }

        if (data == null) {
            return undefined;
        }
        return document.CopyFromCollection(data, false, false, new CGSize(1, 1), undefined);
    }

    public /* virtual */  pickObject(doc: boolean, view: boolean, p: CGPoint, selectableOnly: boolean): TuObject {
        let goObject: TuObject;
        if (selectableOnly && !this.CanSelectObjects()) {
            return undefined;
        }
        const enumerator: TuLayerCollectionEnumerator = this.Layers.Backwards.GetEnumerator();
        try {
            while (enumerator.MoveNext()) {
                const current: TuLayer = enumerator.Current;
                if ((!doc || !current.IsInDocument) && (!view || !current.IsInView)) {
                    continue;
                }
                const goObject1: TuObject = current.PickObject(p, selectableOnly);
                if (goObject1 == null) {
                    continue;
                }
                goObject = goObject1;
                return goObject;
            }
            return undefined;
        }
        finally {
            enumerator.Dispose();
        }
        return goObject;
    }

    public /* internal */  pickObjectExcluding(doc: boolean, view: boolean, p: CGPoint, selectableOnly: boolean, ignore: ITuCollection): TuObject {
        let goObject: TuObject;
        if (selectableOnly && !this.CanSelectObjects()) {
            return undefined;
        }
        const goCollections: TuCollection = new TuCollection();
        /* {
            InternalChecksForDuplicates = false
        }; */
        const enumerator: TuLayerCollectionEnumerator = this.Layers.Backwards.GetEnumerator();
        try {
            while (enumerator.MoveNext()) {
                const current: TuLayer = enumerator.Current;
                if ((!doc || !current.IsInDocument) && (!view || !current.IsInView)) {
                    continue;
                }
                goCollections.Clear();
                current.PickObjects(p, selectableOnly, goCollections, 999999);
                const goCollectionEnumerators: IEnumerator<TuObject> = goCollections.GetEnumerator();
                try {
                    while (goCollectionEnumerators.MoveNext()) {
                        const current1: TuObject = goCollectionEnumerators.Current;
                        let flag: boolean = false;
                        using(ignore.GetEnumerator(), (enumerator1: IEnumerator<TuObject>) => {
                            while (enumerator1.MoveNext()) {
                                const goObject1: TuObject = enumerator1.Current;
                                if (current1 !== goObject1 && !current1.isChildOf(goObject1)) {
                                    continue;
                                }
                                flag = true;
                                if (flag) {
                                    continue;
                                }
                                goObject = current1;
                                return goObject;
                            }
                        });

                        if (flag) {
                            continue;
                        }
                        goObject = current1;
                        return goObject;
                    }
                }
                finally {
                    goCollectionEnumerators.Dispose();
                }
            }
            return undefined;
        }
        finally {
            enumerator.Dispose();
        }
        return goObject;
    }

    public /* virtual */ pickObjects(doc: boolean, view: boolean, p: CGPoint, selectableOnly: boolean, coll: ITuCollection, max: number): ICollection<TuObject> {
        let goCollections: ICollection<TuObject>;
        if (coll == null) {
            coll = new TuCollection(
                {
                    internalChecksForDuplicates: false
                });
        }
        if (selectableOnly && !this.CanSelectObjects()) {
            return undefined;
        }
        const enumerator: TuLayerCollectionEnumerator = this.Layers.Backwards.GetEnumerator();
        try {
            while (enumerator.MoveNext()) {
                const current: TuLayer = enumerator.Current;
                if (coll.Count < max) {
                    if ((!doc || !current.IsInDocument) && (!view || !current.IsInView)) {
                        continue;
                    }
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
            enumerator.Dispose();
        }
        return goCollections;
    }

    public pickObjectsInRectangle(doc: boolean, view: boolean, rect: CGRectangle, pickstyle: TuPickInRectangleStyle, coll: ITuCollection, max: number): ICollection<TuObject> {
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
                    if ((!doc || !current.IsInDocument) && (!view || !current.IsInView)) {
                        continue;
                    }
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
            enumerator.Dispose();
        }
        return goCollections;
    }

    public /* virtual */ print(): void {
        try {
            try {
                const printDocument: PrintDocument = new PrintDocument();
                const goView: TuView = this;
                // TODO:
                printDocument.PrintPage.add(new PrintPageEventHandler((goView as any).PrintDocumentPage));
                printDocument.DocumentName = this.Document.Name;
                if ((this as any).PrintShowDialog(printDocument) !== DialogResult.Cancel) {
                    printDocument.print();
                }
            }
            catch (exception) {
                trace(TString.Concat("Print: ", exception.toString()));
                throw exception;
            }
        }
        finally {
            this.myPrintInfo = undefined;
        }
    }

    protected /* virtual */  printDecoration(g: Graphics, e: PrintPageEventArgs, hpnum: number, hpmax: number, vpnum: number, vpmax: number): void {
        const x: float = e.MarginBounds.X;
        const y: float = e.MarginBounds.Y;
        const width: float = e.MarginBounds.Width;
        const height: float = e.MarginBounds.Height;
        const single: float = x + width;
        const single1: float = y + height;
        g.DrawLine(Pens_Black, x, y, x + 10, y);
        g.DrawLine(Pens_Black, x, y, x, y + 10);
        g.DrawLine(Pens_Black, single, y, single - 10, y);
        g.DrawLine(Pens_Black, single, y, single, y + 10);
        g.DrawLine(Pens_Black, x, single1, x + 10, single1);
        g.DrawLine(Pens_Black, x, single1, x, single1 - 10);
        g.DrawLine(Pens_Black, single, single1, single - 10, single1);
        g.DrawLine(Pens_Black, single, single1, single, single1 - 10);
    }

    public /* virtual */  printDocumentPage(sender: any, e: PrintPageEventArgs): void {

        /*  const graphics: Graphics = e.Graphics;
         if (this.myPrintInfo == null) {
             this.myPrintInfo = new PrintInfo();
             this.myPrintInfo.DocRect = new CGRectangle(this.PrintDocumentTopLeft, this.PrintDocumentSize);
             this.myPrintInfo.HorizScale = this.PrintScale;
             this.myPrintInfo.VertScale = this.myPrintInfo.HorizScale;
             const marginBounds: CGRectangle = e.MarginBounds;
             this.myPrintInfo.PrintSize = new CGSize(marginBounds.Width / this.myPrintInfo.HorizScale, marginBounds.Height / this.myPrintInfo.VertScale);
             if (this.myPrintInfo.PrintSize.Width > 0 && this.myPrintInfo.PrintSize.Height > 0) {
                 this.myPrintInfo.NumPagesAcross = (~~Math.ceil((this.myPrintInfo.DocRect.Width / this.myPrintInfo.PrintSize.Width)));
                 this.myPrintInfo.NumPagesDown = (~~Math.ceil((this.myPrintInfo.DocRect.Height / this.myPrintInfo.PrintSize.Height)));

                 switch (e.PageSettings.PrinterSettings.PrintRange) {
                     case PrintRange.Selection:
                         {
                             this.myPrintInfo.CurPage = 0;
                             break;
                         }
                     case PrintRange.SomePages:
                         {
                             this.myPrintInfo.CurPage = e.PageSettings.PrinterSettings.FromPage - 1;
                             break;
                         }
                     default:
                         {
                             this.myPrintInfo.CurPage = 0;
                             break;
                         }
                 }
             }
         }
         if (this.myPrintInfo.NumPagesAcross <= 0 || this.myPrintInfo.NumPagesDown <= 0) {
             e.HasMorePages = false;
             return;
         }
         const curPage: number = this.myPrintInfo.CurPage % this.myPrintInfo.NumPagesAcross;
         const int32: number = this.myPrintInfo.CurPage / this.myPrintInfo.NumPagesAcross;
         const pointF: CGPoint = this.myOrigin;
         const single: float = this.myHorizScale;
         const single1: float = this.myVertScale;
         const size: CGSize = this.myBorderSize;
         const rectangle: CGRectangle = this.myDisplayRectangle;
         this.myOrigin = new CGPoint(this.myPrintInfo.DocRect.X + curPage * this.myPrintInfo.PrintSize.Width, this.myPrintInfo.DocRect.Y + int32 * this.myPrintInfo.PrintSize.Height);
         this.myHorizScale = this.myPrintInfo.HorizScale;
         this.myVertScale = this.myPrintInfo.VertScale;
         this.myBorderSize = new CGSize(e.MarginBounds.X, e.MarginBounds.Y);
         this.myDisplayRectangle = e.MarginBounds;
         const rectangleF: CGRectangle = new CGRectangle(this.myOrigin.X, this.myOrigin.Y, Math.min(this.myPrintInfo.PrintSize.Width, this.myPrintInfo.DocRect.Width), Math.min(this.myPrintInfo.PrintSize.Height, this.myPrintInfo.DocRect.Height));
         const view: CGRectangle = this.convertDocToView(rectangleF);
         try {
             this.printDecoration(graphics, e, curPage, this.myPrintInfo.NumPagesAcross, int32, this.myPrintInfo.NumPagesDown);
             graphics.intersectClip(e.MarginBounds);
             graphics.intersectClip(view);
             graphics.translateTransform(this.myDisplayRectangle.X, this.myDisplayRectangle.Y);
             graphics.ScaleTransform(this.myHorizScale * this.myHorizWorld, this.myVertScale * this.myVertWorld);
             graphics.translateTransform(-this.myOrigin.X, -this.myOrigin.Y);
             this.updateDelayedSelectionHandles();
             this.printView(graphics, rectangleF);
         }
         finally {
             this.myOrigin = pointF;
             this.myHorizScale = single;
             this.myVertScale = single1;
             this.myBorderSize = size;
             this.myDisplayRectangle = rectangle;
         }
         let numPagesAcross: number = 0;
         switch (e.PageSettings.PrinterSettings.PrintRange) {
             case PrintRange.Selection:
                 {
                     numPagesAcross = ((this.myPrintInfo.NumPagesAcross * this.myPrintInfo.NumPagesDown) - 1);
                     break;
                 }
             case PrintRange.SomePages:
                 {
                     numPagesAcross = (e.PageSettings.PrinterSettings.ToPage - 1);
                     break;
                 }
             default:
                 {
                     numPagesAcross = ((this.myPrintInfo.NumPagesAcross * this.myPrintInfo.NumPagesDown) - 1);
                     break;
                 }
         }
         e.HasMorePages = this.myPrintInfo.CurPage < numPagesAcross;
         if (!e.HasMorePages) {
             this.myPrintInfo = null;
             return;
         }
         const printInfo: PrintInfo = this.myPrintInfo;
         printInfo.CurPage = printInfo.CurPage + 1; */
    }


    public /* virtual */  printPregetView(): void {
        try {
            try {
                const printDocument: PrintDocument = new PrintDocument();
                const goView: TuView = this;
                // TODO:
                printDocument.PrintPage.add(new PrintPageEventHandler((goView as any).PrintDocumentPage));
                printDocument.DocumentName = this.Document.Name;
                this.printPreviewShowDialog(printDocument);
            }
            catch (exception) {
                trace(TString.Concat("PrintPreview: ", exception.toString()));
                throw exception;
            }
        }
        finally {
            this.myPrintInfo = undefined;
        }
    }


    protected /* virtual */  printPreviewShowDialog(pd: PrintDocument): void {
        // TODO:
        /* (new PrintPreviewDialog()
        {
            UseAntiAlias = true,
            Document = pd
        }).ShowDialog(); */
    }


    protected /* virtual */  printShowDialog(pd: PrintDocument): DialogResult {
        throw new NotImplementedException('printShowDialog method of TuView not implemented.');
        /* PrintDialog printDialog = new PrintDialog()
        {
            Document = pd,
            AllowSomePages = true
        };
        printDialog.PrinterSettings.MinimumPage = 1;
        printDialog.PrinterSettings.FromPage = 1;
        printDialog.PrinterSettings.ToPage = printDialog.PrinterSettings.MaximumPage;
        return printDialog.ShowDialog(); */
    }

    protected /* virtual */  printView(g: Graphics, clipRect: CGRectangle): void {
        this.paintBackgroundDecoration(g, clipRect);
        g.SmoothingMode = this.SmoothingMode;
        //g.TextRenderingHint = this.TextRenderingHint;
        g.InterpolationMode = this.InterpolationMode;
        //g.CompositingQuality = this.CompositingQuality;
        g.PixelOffsetMode = this.PixelOffsetMode;
        this.paintObjects(true, this.PrintsViewObjects, g, clipRect);
    }

    // TODO:
    /*  protected  processCmdKey(m: Out<Message>, keyData: Keys): boolean {
         const editControl: TuControl = this.EditControl;
         if (editControl != null) {
             const control: Control = editControl.getControl(this);
             if (control != null && control.Focused) {
                 return false;
             }
         }
         //return base.ProcessCmdKey(ref m, keyData);
     } */

    public raiseBackgroundContextClicked(evt: TuInputEventArgs): void {
        this.onBackgroundContextClicked(evt);
    }

    public raiseBackgroundDoubleClicked(evt: TuInputEventArgs): void {
        this.onBackgroundDoubleClicked(evt);
    }

    public raiseBackgroundHover(evt: TuInputEventArgs): void {
        this.onBackgroundHover(evt);
    }

    public raiseBackgroundSelectionDropped(evt: TuInputEventArgs): void {
        this.onBackgroundSelectionDropped(evt);
    }
    public raiseBackgroundSelectionDropReject(evt: TuInputEventArgs): void {
        this.onBackgroundSelectionDropReject(evt);
    }
    public raiseBackgroundSingleClicked(evt: TuInputEventArgs): void {
        this.onBackgroundSingleClicked(evt);
    }

    public /* virtual */ RaiseChanged(hint: number, subhint: number, x: any, oldI: number, oldVal: any, oldRect: CGRectangle, newI: number, newVal: any, newRect: CGRectangle): void {
        if (hint > 904) {
            if (hint !== 910) {
                return;
            }
            const goLayers: TuLayer = as(x, Types.TuLayer);
            if (goLayers != null && newVal == false) {
                this.removeAllTuControls(goLayers, false);
            }
            this.updateView();
        }
        else {
            switch (hint) {
                case 801:
                case 803:
                    {
                        this.updateView();
                        return;
                    }
                case 802:
                    {
                        const goLayers1: TuLayer = as(x, Types.TuLayer);
                        if (goLayers1 != null) {
                            this.removeAllTuControls(goLayers1, true);
                        }
                        this.updateView();
                        return;
                    }
                default:
                    {
                        switch (hint) {
                            case 901:
                            case 904:
                                {
                                    if (this.SuppressingPaint) {
                                        return;
                                    }
                                    const goObject: TuObject = as(x, Types.TuObject);
                                    if (goObject == null) {
                                        return;
                                    }
                                    const view: CGRectangle = this.convertDocToView(goObject.ExpandPaintBounds(goObject.Bounds.clone(), this));
                                    view.inflate(2, 2);
                                    if (hint != 901 || subhint != 1001) {
                                        this.invalidate(view);
                                        return;
                                    }
                                    oldRect = goObject.ExpandPaintBounds(oldRect.clone(), this);
                                    const rectangle: CGRectangle = this.convertDocToView(oldRect);
                                    rectangle.inflate(2, 2);
                                    if (view.intersectsWith(rectangle)) {
                                        this.invalidate(CGRectangle.Union(view, rectangle));
                                        return;
                                    }
                                    this.invalidate(view);
                                    this.invalidate(rectangle);
                                    return;
                                }
                            case 902:
                                {
                                    if (this.SuppressingPaint) {
                                        return;
                                    }
                                    const goObject1: TuObject = as(x, Types.TuObject);
                                    if (goObject1 == null) {
                                        return;
                                    }
                                    const view1: CGRectangle = this.convertDocToView(goObject1.ExpandPaintBounds(goObject1.Bounds.clone(), this));
                                    view1.inflate(2, 2);
                                    this.invalidate(view1);
                                    return;
                                }
                            case 903:
                                {
                                    if (this.SuppressingPaint) {
                                        return;
                                    }
                                    const goObject2: TuObject = as(x, Types.TuObject);
                                    if (goObject2 == null) {
                                        return;
                                    }
                                    const rectangle1: CGRectangle = this.convertDocToView(goObject2.ExpandPaintBounds(goObject2.Bounds.clone(), this));
                                    rectangle1.inflate(2, 2);
                                    this.invalidate(rectangle1);
                                    if (this.RenderingMode === ViewRenderingMode.Svg || this.RenderingMode === ViewRenderingMode.Html) {
                                        //this.ForceUpdate();
                                    }
                                    return;
                                }
                            default:
                                {
                                    return;
                                }
                        }
                        break;
                    }
            }
        }
    }

    public raiseClipboardCopied(): void {
        this.onClipboardCopied(EventArgs.Empty);
    }

    /// <summary>
    /// Call <see cref="M:Northwoods.Go.GoView.OnClipboardPasted(System.EventArgs)" /> to raise a <see cref="E:Northwoods.Go.GoView.ClipboardPasted" /> event.
    /// </summary>
    public raiseClipboardPasted(): void {
        this.onClipboardPasted(EventArgs.Empty);
    }

    public raiseExternalObjectsDropped(evt: TuInputEventArgs): void {
        this.onExternalObjectsDropped(evt);
    }

    public raiseLinkCreated(obj: TuObject): void {
        this.onLinkCreated(new TuSelectionEventArgs(obj));
    }
    public raiseLinkRelinked(obj: TuObject): void {
        this.onLinkRelinked(new TuSelectionEventArgs(obj));
    }

    public raiseObjectContextClicked(obj: TuObject, evt: TuInputEventArgs): void {
        this.onObjectContextClicked(new TuObjectEventArgs(obj, evt));
    }

    public raiseObjectDoubleClicked(obj: TuObject, evt: TuInputEventArgs): void {
        this.onObjectDoubleClicked(new TuObjectEventArgs(obj, evt));
    }

    public raiseObjectEdited(obj: TuObject): void {
        this.onObjectEdited(new TuSelectionEventArgs(obj));
    }

    public raiseObjectEnterLeave(from: TuObject, to: TuObject, evt: TuInputEventArgs): void {
        this.onObjectEnterLeave(new TuObjectEnterLeaveEventArgs(from, to, evt));
    }

    public raiseObjectGotSelection(obj: TuObject): void {
        this.onObjectGotSelection(new TuSelectionEventArgs(obj));
    }

    public raiseObjectHover(obj: TuObject, evt: TuInputEventArgs): void {
        this.onObjectHover(new TuObjectEventArgs(obj, evt));
    }

    public raiseObjectLostSelection(obj: TuObject): void {
        this.onObjectLostSelection(new TuSelectionEventArgs(obj));
    }

    public raiseObjectResized(obj: TuObject): void {
        this.onObjectResized(new TuSelectionEventArgs(obj));
    }

    public raiseObjectSelectionDropped(obj: TuObject, evt: TuInputEventArgs): void {
        this.onObjectSelectionDropped(new TuObjectEventArgs(obj, evt));
    }

    public raiseObjectSelectionDropReject(evt: TuObjectEventArgs): void {
        this.onObjectSelectionDropReject(evt);
    }

    public raiseObjectSingleClicked(obj: TuObject, evt: TuInputEventArgs): void {
        this.onObjectSingleClicked(new TuObjectEventArgs(obj, evt));
    }

    public raisePropertyChangedEvent(propname: string): void {
        this.onPropertyChanged(new PropertyChangedEventArgs(propname));
    }

    public raiseSelectionCopied(): void {
        this.onSelectionCopied(EventArgs.Empty);
    }

    public raiseSelectionDeleted(): void {
        this.onSelectionDeleted(EventArgs.Empty);
    }

    public raiseSelectionDeleting(evt: CancelEventArgs): void {
        this.onSelectionDeleting(evt);
    }

    public raiseSelectionFinished(): void {
        this.onSelectionFinished(EventArgs.Empty);
    }

    public raiseSelectionMoved(): void {
        this.onSelectionMoved(EventArgs.Empty);
    }

    public raiseSelectionStarting(): void {
        this.onSelectionStarting(EventArgs.Empty);
    }

    public /* virtual */  redo(): void {
        if (this.canRedo()) {
            this.Document.Redo();
        }
    }

    /* internal */  removeAllTuControls(layer: TuLayer, remove: boolean): void {
        throw new NotImplementedException('removeAllTuControls');
        /*  if (this.myTuControls != null) {
             const array: TuControl[] = this.myTuControls.toArray();
             for (let i = 0; i < array.length; i++) {
                 const goControl: TuControl = array[i];
                 if (goControl.Layer === layer) {
                     //TODO findControl below
                     const control: Control = goControl.findControl(this);
                     if (control != null) {
                         if (!remove) {
                             control.Visible = false;
                         }
                         else {
                             this.Controls.remove(control);
                             this.myTuControls.remove(goControl);
                         }
                     }
                 }
             }
         } */
    }

    private removeFromSelection(obj: TuObject): void {
        const goGroups: TuGroup = as(obj, Types.TuGroup);
        if (goGroups != null) {
            foreach(goGroups.GetEnumerator(), (enumerator: TuObject) => {
                this.removeFromSelection(enumerator);
            });

        }
        this.Selection.Remove(obj);
    }

    public /* internal */ removeTuControl(g: TuControl, c: Control): void {
        throw new NotImplementedException('removeTuControl');
        /*   if (this.myTuControls != null) {
              this.myTuControls.remove(g);
              this.Controls.remove(c);
          } */
    }

    public /* virtual */ replaceMouseTool(tooltype: Type, newtool: ITuTool): ITuTool {
        let i: number;
        let mouseDownTools: IList<ITuTool> = this.MouseDownTools;
        for (i = 0; i < mouseDownTools.Count; i++) {
            // TODO: solve GetType
            if (mouseDownTools[i].GetType() === tooltype) {
                const item: ITuTool = mouseDownTools[i];
                if (newtool == null) {
                    mouseDownTools.RemoveAt(i);
                    return item;
                }
                mouseDownTools[i] = newtool;
                return item;
            }
        }
        mouseDownTools = this.MouseMoveTools;
        for (i = 0; i < mouseDownTools.Count; i++) {
            if (mouseDownTools[i].GetType() === tooltype) {
                const goTool: ITuTool = mouseDownTools[i];
                if (newtool == null) {
                    mouseDownTools.RemoveAt(i);
                    return goTool;
                }
                mouseDownTools[i] = newtool;
                return goTool;
            }
        }
        mouseDownTools = this.MouseUpTools;
        for (i = 0; i < mouseDownTools.Count; i++) {
            if (mouseDownTools[i].GetType() === tooltype) {
                const item1: ITuTool = mouseDownTools[i];
                if (newtool == null) {
                    mouseDownTools.RemoveAt(i);
                    return item1;
                }
                mouseDownTools[i] = newtool;
                return item1;
            }
        }
        return undefined;
    }

    public /* virtual */ requestFocus(): void {
        try {
            this.requestFocus2();
        }
        catch (verificationException) {
            trace(TString.Concat("Focus: ", verificationException.toString()));
            this.onGotFocus(EventArgs.Empty);
        }

    }

    private requestFocus2(): void {
        // base.Focus();
    }

    public /* virtual */  rescaleToFit(): void {
        const size: CGSize = this.DisplayRectangle.Size;
        const width: CGRectangle = this.computeDocumentBounds();
        const shadowOffset: CGSize = this.ShadowOffset;
        width.Width = width.Width + Math.abs(shadowOffset.Width);
        width.Height = width.Height + Math.abs(shadowOffset.Height);
        if (shadowOffset.Width < 0) {
            width.X = width.X + shadowOffset.Width;
        }
        if (shadowOffset.Height < 0) {
            width.Y = width.Y + shadowOffset.Height;
        }
        this.DocPosition = new CGPoint(width.X, width.Y);
        let single: float = 1;
        if (width.Width > 0 && width.Height > 0) {
            single = Math.min(size.Width / width.Width, size.Height / width.Height);
        }
        if (single > 1) {
            single = 1;
        }
        this.DocScale = single;
    }

    public /* virtual */ rescaleWithCenter(newscale: float, docPt: CGPoint): void {
        this.DocScale = newscale;
        const docExtent: CGRectangle = this.DocExtent;
        this.DocPosition = new CGPoint(docPt.X - docExtent.Width / 2, docPt.Y - docExtent.Height / 2);
    }

    private resetAutoPanRegion(): void {
        this.AutoPanRegion = new CGSize(16, 16);
    }

    private resetAutoScrollRegion(): void {
        this.AutoScrollRegion = new CGSize(SystemInformation.VerticalScrollBarWidth, SystemInformation.HorizontalScrollBarHeight);
    }

    private resetGridLineColor(): void {
        this.GridLineColor = CGColor.LightGray;
    }

    private resetGridLineDashPattern(): void {
        this.GridLineDashPattern = TuGrid.DefaultLineDashPattern;
    }

    private resetGridMajorLineColor(): void {
        this.GridMajorLineColor = CGColor.Gray;
    }

    private resetGridMajorLineDashPattern(): void {
        this.GridMajorLineDashPattern = TuGrid.DefaultMajorLineDashPattern;
    }

    private resetGridMajorLineFrequency(): void {
        this.GridMajorLineFrequency = new CGSize(0, 0);
    }

    private resetNoFocusSelectionColor(): void {
        this.NoFocusSelectionColor = CGColor.LightGray;
    }

    private resetPrimarySelectionColor(): void {
        this.PrimarySelectionColor = CGColor.Chartreuse;
    }

    private resetScrollSmallChange(): void {
        this.ScrollSmallChange = new CGSize(16, 16);
    }

    private resetSecondarySelectionColor(): void {
        this.SecondarySelectionColor = CGColor.Cyan;
    }

    private resetShadowColor(): void {
        this.ShadowColor = CGColor.FromRgba(CGColor.Gray, 127);
    }

    private resetSheetMarginColor(): void {
        this.SheetMarginColor = TuSheet.DefaultMarginColor;
    }

    private resetSheetRoom(): void {
        this.SheetRoom = new CGSize(10, 10);
    }

    private InvokeRequired: boolean = false;
    protected /* internal */ safeOnDocumentChanged(e: TuChangedEventArgs): void {
        if (!this.InvokeRequired) {
            this.onDocumentChanged(undefined, e);
            return;
        }
        if (this.mySafeOnDocumentChangedDelegate == null) {
            this.mySafeOnDocumentChangedDelegate = this.internalOnDocumentChanged.bind(this) as any;
        }
        if (this.myQueuedEvents == null) {
            this.myQueuedEvents = new Queue<TuChangedEventArgs>();
        }
        const goChangedEventArg: TuChangedEventArgs = new TuChangedEventArgs(e);

        this.myQueuedEvents.Enqueue(goChangedEventArg);

        if (this.mySafeOnDocumentChangedDelegate) {
            this.mySafeOnDocumentChangedDelegate(undefined, undefined);
        }
    }

    public /* virtual */ scrollLine(dx: float, dy: float): void {
        const docPosition: CGPoint = this.DocPosition;
        const docExtentSize: CGSize = this.DocExtentSize.Clone();
        const documentTopLeft: CGPoint = this.DocumentTopLeft.clone();
        const documentSize: CGSize = this.DocumentSize.Clone();
        const scrollSmallChange: CGSize = this.ScrollSmallChange.Clone();
        const size: CGSize = new CGSize(scrollSmallChange.Width, scrollSmallChange.Height);
        const doc: CGSize = this.convertViewToDoc(size.Clone());
        const single: float = dx * doc.Width;
        docPosition.X = docPosition.X + single;
        if (single <= 0) {
            docPosition.X = Math.max(docPosition.X, documentTopLeft.X);
        }
        else {
            docPosition.X = Math.min(docPosition.X, Math.max(documentTopLeft.X, documentTopLeft.X + documentSize.Width - docExtentSize.Width));
        }
        const single1: float = dy * doc.Height;
        docPosition.Y = docPosition.Y + single1;
        if (single1 <= 0) {
            docPosition.Y = Math.max(docPosition.Y, documentTopLeft.Y);
        }
        else {
            docPosition.Y = Math.min(docPosition.Y, Math.max(documentTopLeft.Y, documentTopLeft.Y + documentSize.Height - docExtentSize.Height));
        }
        this.DocPosition = docPosition.clone();
    }

    public /* virtual */ scrollPage(dx: float, dy: float): void {
        const docPosition: CGPoint = this.DocPosition;
        const docExtentSize: CGSize = this.DocExtentSize;
        const documentTopLeft: CGPoint = this.DocumentTopLeft;
        const documentSize: CGSize = this.DocumentSize;
        const scrollSmallChange: CGSize = this.ScrollSmallChange;
        const view: CGSize = this.convertDocToView(docExtentSize);
        const size: CGSize = new CGSize(Math.max(scrollSmallChange.Width, view.Width - scrollSmallChange.Width), Math.max(scrollSmallChange.Height, (view.Height - scrollSmallChange.Height)));
        const doc: CGSize = this.convertViewToDoc(size);
        const single: float = dx * doc.Width;
        docPosition.X = docPosition.X + single;
        if (single < 0) {
            docPosition.X = Math.max(docPosition.X, documentTopLeft.X);
        }
        else {
            docPosition.X = Math.min(docPosition.X, Math.max(documentTopLeft.X, documentTopLeft.X + documentSize.Width - docExtentSize.Width));
        }
        const single1: float = dy * doc.Height;
        docPosition.Y = docPosition.Y + single1;
        if (single1 < 0) {
            docPosition.Y = Math.max(docPosition.Y, documentTopLeft.Y);
        }
        else {
            docPosition.Y = Math.min(docPosition.Y, Math.max(documentTopLeft.Y, documentTopLeft.Y + documentSize.Height - docExtentSize.Height));
        }
        this.DocPosition = docPosition;
    }

    public /* virtual */ scrollRectangleToVisible(contentRect: CGRectangle): void {
        let single: float;
        let single1: float;
        const docExtent: CGRectangle = this.DocExtent;
        if (GeomUtilities.ContainsRect(docExtent, contentRect)) {
            return;
        }
        single = (contentRect.Width >= docExtent.Width ? contentRect.X : contentRect.X + contentRect.Width / 2 - docExtent.Width / 2);
        single1 = (contentRect.Height >= docExtent.Height ? contentRect.Y : contentRect.Y + contentRect.Height / 2 - docExtent.Height / 2);
        this.DocPosition = new CGPoint(single, single1);
    }

    public /* virtual */  selectAll(): void {
        if (!this.CanSelectObjects()) {
            return;
        }
        try {
            this.CursorName = "wait";
            const goObjects: List<TuObject> = new List<TuObject>();
            foreach(this.Layers, (layer: TuLayer) => {
                if (!layer.IsInDocument || !layer.CanViewObjects() || !layer.CanSelectObjects()) {
                    return CONTINUE;
                }
                foreach(layer, (goObject: TuObject) => {
                    if (!goObject.CanView() || !goObject.CanSelect()) {
                        return CONTINUE;
                    }
                    goObjects.Add(goObject);
                });
            });

            if (goObjects.Count > 0) {
                this.raiseSelectionStarting();
                foreach(goObjects, (goObject1: TuObject) => {
                    this.Selection.Add(goObject1);
                });

                this.raiseSelectionFinished();
            }
        }
        finally {
            this.CursorName = "default";
        }
    }

    public /* virtual */  selectInRectangle(rect: CGRectangle): void {
        if (!this.CanSelectObjects()) {
            return;
        }
        try {
            this.CursorName = "wait";
            const goCollections: TuCollection = new TuCollection(
                {
                    internalChecksForDuplicates: false
                });

            foreach(this.Layers, (layer: TuLayer) => {
                if (!layer.IsInDocument) {
                    return CONTINUE;
                }
                layer.PickObjectsInRectangle(rect, this.SelectInRectangleStyle, goCollections, this.MaximumSelectionCount);
            });

            this.Selection.addRange(goCollections);
        }
        finally {
            this.CursorName = "default";
        }
    }

    public /* virtual */ selectNextNode(c: string): boolean {
        if (!this.CanSelectObjects()) {
            return false;
        }
        let goLabeledPart: ITuLabeledPart = null;
        const primary: TuObject = this.Selection.Primary;
        if (primary != null && is.typeof<ITuLabeledPart>(primary, Types.ITuLabeledPart)) {
            goLabeledPart = as(primary, Types.ITuLabeledPart);
        }
        let enumerator: TuLayerCollectionObjectEnumerator = this.Document.GetEnumerator();
        if (goLabeledPart != null) {
            while (enumerator.MoveNext()) {
                if ((enumerator as any).Current === goLabeledPart) {
                    while (enumerator.MoveNext()) {
                        const current: TuObject = enumerator.Current;
                        const goLabeledPart1: ITuLabeledPart = as(current, Types.ITuLabeledPart);
                        if (goLabeledPart1 == null || !this.matchesNodeLabel(goLabeledPart1, c)) {
                            continue;
                        }
                        this.Selection.select(current);
                        this.scrollRectangleToVisible(current.Bounds);
                        return true;
                    }
                    enumerator = this.Document.GetEnumerator();
                    while (enumerator.MoveNext()) {
                        const goObject: TuObject = enumerator.Current;
                        const goLabeledPart2: ITuLabeledPart = as(goObject, Types.ITuLabeledPart);
                        if (goLabeledPart2 === goLabeledPart) {
                            break;
                        }
                        if (goLabeledPart2 == null || !this.matchesNodeLabel(goLabeledPart2, c)) {
                            continue;
                        }
                        this.Selection.select(goObject);
                        this.scrollRectangleToVisible(goObject.Bounds.clone());
                        return true;
                    }
                    break;
                }
            }
        }
        return false;
    }

    private /* internal */ setCursor1(c: Cursor): void {
        try {
            this.setCursor2(c);
        }
        catch (verificationException) {
        }

    }

    private setCursor2(c: Cursor): void {
        if (c != null && this.Cursor !== c) {
            this.Cursor = c;
        }
    }

    public /* virtual */  SetModifiable(b: boolean): void {
        this.AllowMove = b;
        this.AllowResize = b;
        this.AllowReshape = b;
        this.AllowDelete = b;
        this.AllowInsert = b;
        this.AllowLink = b;
        this.AllowEdit = b;
    }

    private shouldSerializeAutoPanRegion(): boolean {
        return this.AutoPanRegion.NotEquals(new CGSize(16, 16));
    }

    private shouldSerializeAutoScrollRegion(): boolean {
        return this.AutoScrollRegion.NotEquals(new CGSize(SystemInformation.VerticalScrollBarWidth, SystemInformation.HorizontalScrollBarHeight));
    }

    private shouldSerializeGridLineColor(): boolean {
        return this.GridLineColor.notEquals(CGColor.LightGray);
    }

    private shouldSerializeGridLineDashPattern(): boolean {
        const gridLineDashPattern: float[] = this.GridLineDashPattern;
        const defaultLineDashPattern: float[] = TuGrid.DefaultLineDashPattern;
        if (gridLineDashPattern.length !== defaultLineDashPattern.length) {
            return true;
        }
        for (let i = 0; i < gridLineDashPattern.length; i++) {
            if (gridLineDashPattern[i] !== defaultLineDashPattern[i]) {
                return true;
            }
        }
        return false;
    }

    private shouldSerializeGridMajorLineColor(): boolean {
        return this.GridMajorLineColor.notEquals(CGColor.Gray);
    }

    private shouldSerializeGridMajorLineDashPattern(): boolean {
        const gridMajorLineDashPattern: float[] = this.GridMajorLineDashPattern;
        const defaultMajorLineDashPattern: float[] = TuGrid.DefaultMajorLineDashPattern;
        if (gridMajorLineDashPattern.length !== defaultMajorLineDashPattern.length) {
            return true;
        }
        for (let i = 0; i < gridMajorLineDashPattern.length; i++) {
            if (gridMajorLineDashPattern[i] !== defaultMajorLineDashPattern[i]) {
                return true;
            }
        }
        return false;
    }

    private shouldSerializeGridMajorLineFrequency(): boolean {
        return this.GridMajorLineFrequency.NotEquals(new CGSize(0, 0));
    }

    private shouldSerializeNoFocusSelectionColor(): boolean {
        return this.NoFocusSelectionColor.notEquals(CGColor.LightGray);
    }

    private shouldSerializePrimarySelectionColor(): boolean {
        return this.PrimarySelectionColor.notEquals(CGColor.Chartreuse);
    }

    private shouldSerializeScrollSmallChange(): boolean {
        return this.ScrollSmallChange.NotEquals(new CGSize(16, 16));
    }

    private shouldSerializeSecondarySelectionColor(): boolean {
        return this.SecondarySelectionColor.notEquals(CGColor.Cyan);
    }

    private shouldSerializeShadowColor(): boolean {
        return this.ShadowColor.notEquals(CGColor.FromRgba(CGColor.Gray, 127));
    }

    private shouldSerializeSheetMarginColor(): boolean {
        return this.SheetMarginColor.notEquals(TuSheet.DefaultMarginColor);
    }

    private shouldSerializeSheetRoom(): boolean {
        return this.SheetRoom.NotEquals(new CGSize(10, 10));
    }

    private showExternalDragImage(img: TuObject): void {
        this.myExternalDragImage = img;
        this.Layers.Default.Add(img);
    }

    public /* virtual */  snapPoint(p: CGPoint, obj: TuObject): CGPoint {
        let pointF: CGPoint;
        let pointF1: CGPoint = p;
        let single: Out<float> = { value: 1E+21 };
        const enumerator: TuLayerCollectionEnumerator = this.Layers.Backwards.GetEnumerator();
        try {
            while (enumerator.MoveNext()) {
                const current: TuLayer = enumerator.Current;
                if (!current.CanViewObjects()) {
                    continue;
                }
                const goLayerCache: TuLayerCache = current.FindCache(p);
                if (goLayerCache == null) {
                    const goLayerEnumerators: TuLayerEnumerator = current.Backwards.GetEnumerator();
                    try {
                        while (goLayerEnumerators.MoveNext()) {
                            const goObject: TuObject = goLayerEnumerators.Current;
                            pointF1 = this.snapPoint1(p, obj, goObject, pointF1, single);
                            if (single.value >= 0) {
                                continue;
                            }
                            pointF = pointF1;
                            return pointF;
                        }
                    }
                    finally {
                        goLayerEnumerators.Dispose();
                    }
                }
                else {
                    const snappers: List<ITuDragSnapper> = goLayerCache.Snappers;
                    let count: number = snappers.Count - 1;
                    while (count >= 0) {
                        const item: TuObject = as(snappers[count], Types.TuObject);
                        pointF1 = this.snapPoint1(p, obj, item, pointF1, single);
                        if (single.value >= 0) {
                            count--;
                        }
                        else {
                            pointF = pointF1;
                            return pointF;
                        }
                    }
                }
            }
            return pointF1;
        }
        finally {
            enumerator.Dispose();
        }
        return pointF;
    }

    private snapPoint1(p: CGPoint, obj: TuObject, o: TuObject, nearest: CGPoint, nearestDist: Out<float>): CGPoint {
        let pointF: CGPoint;
        const goDragSnapper: ITuDragSnapper = as(o, Types.ITuDragSnapper);
        if (goDragSnapper != null && goDragSnapper.canSnapPoint(p, obj, this)) {
            const pointF1: CGPoint = goDragSnapper.snapPoint(p, obj, this);
            const x: float = (p.X - pointF1.X) * (p.X - pointF1.X) + (p.Y - pointF1.Y) * (p.Y - pointF1.Y);
            if (x < nearestDist.value) {
                nearest = pointF1;
                nearestDist.value = x;
            }
            if (goDragSnapper.SnapOpaque) {
                nearestDist.value = -1;
                return nearest;
            }
        }
        const goGroups: TuGroup = as(o, Types.TuGroup);
        if (goGroups != null) {
            const enumerator: TuGroupEnumerator = goGroups.GetEnumerator().GetEnumerator();
            try {
                while (enumerator.MoveNext()) {
                    const current: TuObject = enumerator.Current;
                    nearest = this.snapPoint1(p, obj, current, nearest, nearestDist);
                    if (nearestDist.value >= 0) {
                        continue;
                    }
                    pointF = nearest;
                    return pointF;
                }
                return nearest;
            }
            finally {
                enumerator.Dispose();
            }
            return pointF;
        }
        return nearest;
    }

    public /* virtual */ standardizeCursorName(s: string): string {
        if (s == null) {
            return "default";
        }
        const lower: string = s.toLowerCase();
        if (lower === "default") {
            return "default";
        }
        if (lower === "auto") {
            return "default";
        }
        if (lower === "cross") {
            return "crosshair";
        }
        if (lower === "hand") {
            return "pointer";
        }
        if (lower === "sizeall") {
            return "move";
        }
        if (lower === "sizenesw") {
            return "ne-resize";
        }
        if (lower === "sizens") {
            return "s-resize";
        }
        if (lower === "sizenwse") {
            return "se-resize";
        }
        if (lower === "sizewe") {
            return "e-resize";
        }
        if (lower === "vsplit") {
            return "col-resize";
        }
        if (lower === "hsplit") {
            return "row-resize";
        }
        if (lower === "no") {
            return "not-allowed";
        }
        if (lower === "waitcursor") {
            return "wait";
        }
        if (lower !== "ibeam") {
            return lower;
        }
        return "text";
    }

    public /* virtual */ startTransaction(): boolean {
        return this.Document.StartTransaction();
    }
    public stopAutoScroll(): void {
        this.myActioning = false;
        if (this.myAutoScrollTimer != null) {
            this.myAutoScrollTimerEnabled = false;
            this.myAutoScrollTimer.change(-1, -1);
        }


    }

    private stopHoverTimer(): void {
        if (this.myHoverTimer != null) {
            this.myHoverTimerEnabled = false;
            this.myHoverTimer.change(-1, -1);
        }

        console.error('stopHoverTimer not implemented.');
    }

    public /* internal */ translateTransform(g: Graphics, w: float, h: float): void {
        g.translateTransform(w, h);
    }

    public /* virtual */  undo(): void {
        if (this.canUndo()) {
            this.Document.Undo();
        }
    }

    private updateBorderWidths(): void {
        let borderSize: CGSize = this.myBorderSize;
        switch (this.BorderStyle) {
            case BorderStyle.None:
                {
                    borderSize = new CGSize();
                    break;
                }
            case BorderStyle.FixedSingle:
                {
                    borderSize = SystemInformation.BorderSize;
                    break;
                }
            case BorderStyle.Fixed3D:
            default:
                {
                    borderSize = SystemInformation.Border3DSize;
                    break;
                }
        }
        if (borderSize.NotEquals(this.myBorderSize)) {
            this.myBorderSize = borderSize;
            this.layoutScrollBars(false);
        }
    }

    private updateDelayedSelectionHandles(): void {
        if (this.myUpdateHandles != null) {
            const selection: TuSelection = this.Selection;
            foreach(this.myUpdateHandles, (myUpdateHandle: TuObject) => {
                if (selection.getHandleCount(myUpdateHandle) <= 0) {
                    return CONTINUE;
                }
                if (!myUpdateHandle.CanView()) {
                    myUpdateHandle.RemoveSelectionHandles(selection);
                }
                else {
                    myUpdateHandle.AddSelectionHandles(selection, selection.getAnExistingHandle(myUpdateHandle).SelectedObject);
                }
            });
            this.myUpdateHandles.Clear();
        }
    }

    public /* virtual */  updateExtent(): void {
        /*  Control parent = null;
         try {
             parent = base.Parent;
             while (parent != null && !(parent is Form))
             {
                 parent = parent.Parent;
             }
         }
         catch (verificationException)
         {
         }

         if (parent != null && parent is Form)
         {
             Form form = (Form)parent;
             if (form.WindowState == FormWindowState.Minimized) {
                 this.myWindowState = FormWindowState.Minimized;
                 return;
             }
             if (this.myWindowState == FormWindowState.Minimized) {
                 this.myWindowState = form.WindowState;
                 return;
             }
         } */
        if (this.SheetStyle !== TuViewSheetStyle.None && this.Sheet != null) {
            const bounds: Out<CGRectangle> = { value: this.Sheet.Bounds };
            const doc: CGSize = this.convertViewToDoc(this.SheetRoom);
            const width: float = doc.Width;
            let shadowOffset: CGSize = this.ShadowOffset;
            const single: float = width + Math.abs(shadowOffset.Width);
            const height: float = doc.Height;
            shadowOffset = this.ShadowOffset;
            GeomUtilities.InflateRect(bounds, single, height + Math.abs(shadowOffset.Height));
            const size: CGSize = this.DisplayRectangle.Size;
            let docScale: float = this.DocScale;
            switch (this.SheetStyle) {
                case TuViewSheetStyle.Sheet:
                    {
                        this.rescaleWithCenter(docScale, this.myPreviousCenter);
                        break;
                    }
                case TuViewSheetStyle.WholeSheet:
                    {
                        if (bounds.value.Width <= 0 || bounds.value.Height <= 0) {
                            this.rescaleWithCenter(docScale, this.myPreviousCenter);
                            break;
                        }
                        docScale = Math.min(size.Width / bounds.value.Width, size.Height / bounds.value.Height);
                        this.rescaleWithCenter(docScale, this.myPreviousCenter);
                        break;
                    }
                case TuViewSheetStyle.SheetWidth:
                    {
                        if (bounds.value.Width <= 0) {
                            this.rescaleWithCenter(docScale, this.myPreviousCenter);
                            break;
                        }
                        docScale = size.Width / bounds.value.Width;
                        this.rescaleWithCenter(docScale, this.myPreviousCenter);
                        break;
                    }
                case TuViewSheetStyle.SheetHeight:
                    {
                        if (bounds.value.Height <= 0) {
                            this.rescaleWithCenter(docScale, this.myPreviousCenter);
                            break;
                        }
                        docScale = size.Height / bounds.value.Height;
                        this.rescaleWithCenter(docScale, this.myPreviousCenter);
                        break;
                    }
                default:
                    {
                        this.rescaleWithCenter(docScale, this.myPreviousCenter);
                        break;
                    }
            }
        }
    }

    public /* virtual */ updateScrollBars(): void {
        let flag: boolean;
        let flag1: boolean;
        let flag2: boolean;
        let flag3: boolean;
        if (this.myUpdatingScrollBars) {
            return;
        }
        const horizontalScrollBar: Slider = this.HorizontalScrollBar;
        const verticalScrollBar: Slider = this.VerticalScrollBar;
        if (verticalScrollBar == null && horizontalScrollBar == null) {
            return;
        }
        const documentTopLeft: CGPoint = this.DocumentTopLeft;
        const documentSize: CGSize = this.DocumentSize;
        const int32: number = Math.floor(documentTopLeft.X * this.myHorizScale * this.myHorizWorld);
        const int321: number = Math.floor((documentTopLeft.Y * this.myVertScale * this.myVertWorld));
        const int322: number = Math.floor((documentTopLeft.X + documentSize.Width) * this.myHorizScale * this.myHorizWorld);
        const int323: number = Math.floor((documentTopLeft.Y + documentSize.Height) * this.myVertScale * this.myVertWorld);
        const docPosition: CGPoint = this.DocPosition;
        let int324: number = Math.floor(docPosition.X * this.myHorizScale * this.myHorizWorld);
        let int325: number = Math.floor(docPosition.Y * this.myVertScale * this.myVertWorld);
        const size: CGSize = (this as any).Size;
        size.Width = size.Width - (2 * this.myBorderSize.Width);
        if (size.Width < 0) {
            size.Width = 0;
        }
        size.Height = size.Height - (2 * this.myBorderSize.Height);
        if (size.Height < 0) {
            size.Height = 0;
        }
        let flag4: boolean = ((int323 - int321) > size.Height || int325 > int321 ? true : int325 < (int323 - size.Height));
        if (verticalScrollBar == null) {
            flag = false;
        }
        else {
            flag = (this.ShowVerticalScrollBar === TuViewScrollBarVisibility.Show ? true : this.ShowVerticalScrollBar === TuViewScrollBarVisibility.IfNeeded && flag4);
        }
        let flag5: boolean = flag;
        let flag6: boolean = ((int322 - int32) > size.Width || int324 > int32 ? true : int324 < (int322 - size.Width));
        if (horizontalScrollBar == null) {
            flag1 = false;
        }
        else {
            flag1 = (this.ShowHorizontalScrollBar === TuViewScrollBarVisibility.Show ? true : this.ShowHorizontalScrollBar === TuViewScrollBarVisibility.IfNeeded && flag6);
        }
        let flag7: boolean = flag1;
        if (flag5) {
            if (verticalScrollBar != null) {
                size.Width = size.Width - verticalScrollBar.Width;
            }
            size.Width = Math.max(0, size.Width);
        }
        if (flag7) {
            if (horizontalScrollBar != null) {
                size.Height = size.Height - horizontalScrollBar.Height;
            }
            size.Height = Math.max(0, size.Height);
        }
        flag4 = ((int323 - int321) > size.Height || int325 > int321 ? true : int325 < (int323 - size.Height));
        if (verticalScrollBar == null) {
            flag2 = false;
        }
        else {
            flag2 = (this.ShowVerticalScrollBar === TuViewScrollBarVisibility.Show ? true : this.ShowVerticalScrollBar === TuViewScrollBarVisibility.IfNeeded && flag4);
        }
        flag5 = flag2;
        flag6 = ((int322 - int32) > size.Width || int324 > int32 ? true : int324 < (int322 - size.Width));
        if (horizontalScrollBar == null) {
            flag3 = false;
        }
        else {
            flag3 = (this.ShowHorizontalScrollBar === TuViewScrollBarVisibility.Show ? true : this.ShowHorizontalScrollBar === TuViewScrollBarVisibility.IfNeeded && flag6);
        }
        flag7 = flag3;
        this.myUpdatingScrollBars = true;
        let flag8: boolean = false;
        if (verticalScrollBar != null) {
            const height: number = (int323 - size.Height);
            if (int325 > height && height > int321) {
                int325 = height;
            }
            if (int325 < int321) {
                int325 = int321;
            }
            let int326: number = (Math.max(int323, (int325 + size.Height)) - 12);
            int326 = Math.max(int326, int325);
            if (verticalScrollBar.Minimum != int321) {
                verticalScrollBar.Minimum = int321;
            }
            if (verticalScrollBar.Value > int326 && verticalScrollBar.Value != int325) {
                verticalScrollBar.Value = int325;
            }
            if (verticalScrollBar.Maximum != int326) {
                verticalScrollBar.Maximum = int326;
            }
            if (verticalScrollBar.Value != int325) {
                verticalScrollBar.Value = int325;
            }
            if (verticalScrollBar.Visible != flag5) {
                flag8 = true;
            }
            verticalScrollBar.Visible = flag5;
            verticalScrollBar.Enabled = flag4;
        }
        if (horizontalScrollBar != null) {
            const width: number = (int322 - size.Width);
            if (int324 > width && width > int32) {
                int324 = width;
            }
            if (int324 < int32) {
                int324 = int32;
            }
            let int327: number = (Math.max(int322, (int324 + size.Width)) - 12);
            int327 = Math.max(int327, int324);
            if (horizontalScrollBar.Minimum !== int32) {
                horizontalScrollBar.Minimum = int32;
            }
            if (horizontalScrollBar.Value > int327 && horizontalScrollBar.Value !== int324) {
                horizontalScrollBar.Value = int324;
            }
            if (horizontalScrollBar.Maximum !== int327) {
                horizontalScrollBar.Maximum = int327;
            }
            if (horizontalScrollBar.Value !== int324) {
                horizontalScrollBar.Value = int324;
            }
            if (horizontalScrollBar.Visible !== flag7) {
                flag8 = true;
            }
            horizontalScrollBar.Visible = flag7;
            horizontalScrollBar.Enabled = flag6;
        }
        this.myUpdatingScrollBars = false;
        if (flag8) {
            this.layoutScrollBars(false);
        }
    }

    private updateSelectionHandles(obj: TuObject): void {
        const goGroups: TuGroup = as(obj, Types.TuGroup);
        if (goGroups != null) {
            foreach(goGroups.GetEnumerator(), (enumerator: TuObject) => {
                this.updateSelectionHandles(enumerator);
            });
        }
        const selectionObject: TuObject = obj.SelectionObject;
        if (selectionObject != null) {
            const selection: TuSelection = this.Selection;
            if (selection.Contains(obj) && obj.CanView()) {
                selectionObject.AddSelectionHandles(selection, obj);
                return;
            }
            selectionObject.RemoveSelectionHandles(selection);
        }
    }

    public /* virtual */  updateView(): void {
        this.updateBorderWidths();
        this.updateScrollBars();
        //this.batchDraw();
        this.invalidate();
    }

    private static counter: number = 0;
    private clipRect: CGRectangle;

    @State()
    public invalidateRects: TuInvalidateCollection;

    public invalidate(rect?: CGRectangle) {
        //return;
        //this.clipRect = rect;
        //console.log(rect);
        //this.drawView();

        if (this.RenderingMode === ViewRenderingMode.Html || this.RenderingMode === ViewRenderingMode.Svg) {
            //this.ForceUpdate();
        }
        this.invalidateRects.Add(rect || this.ClientRectangle);
    }

    public /* virtual */ drawView(forceInvalidate: boolean = false) {
        if (!this.SuppressingPaint) {
            //throw new NotImplementedException('invalide not implemented.');
            if (this.graphics == null) {
                if (this.canvasElement != null) {
                    const context = this.canvasElement.getContext('2d');
                    this.canvasElement.width = this.ClientRectangle.Width;
                    this.canvasElement.height = this.ClientRectangle.Height;
                    this.graphics = new Graphics(context);
                    //this.graphics.fillRectangle(this.myBackgroundBrush, this.ClientRectangle);
                }
            }
            /*  if (this.clipRect == null || !(this.clipRect instanceof CGRectangle)) {
                 this.clipRect = this.ClientRectangle;
             } */

            if (!forceInvalidate) {
                if (!this.invalidateRects.IsEmpty) {
                    const rectToUpdate: CGRectangle = this.invalidateRects.getInvalidateRectangle();
                    if (rectToUpdate != null) {
                        this.onPaint(new PaintEventArgs(this.graphics, rectToUpdate));
                        //console.log('draw partial : ' + rectToUpdate + '  Count : ' + this.invalidateRects.Count);
                    }
                }
            } else {
                this.onPaint(new PaintEventArgs(this.graphics, this.ClientRectangle));
                //console.log('draw all : ' + this.ClientRectangle);
            }


            //window.requestAnimationFrame(this.invalidateMe.bind(this));
        }
    }


    public invalidateMe(rect?: CGRectangle) {
        return;
        if (!this.SuppressingPaint) {
            //throw new NotImplementedException('invalide not implemented.');
            if (this.graphics == null) {
                if (this.canvasElement != null) {
                    const context = this.canvasElement.getContext('2d');
                    this.canvasElement.width = this.ClientRectangle.Width;
                    this.canvasElement.height = this.ClientRectangle.Height;
                    this.graphics = new Graphics(context);
                    //this.graphics.fillRectangle(this.myBackgroundBrush, this.ClientRectangle);
                }
            }
            if (rect == null || !(rect instanceof CGRectangle)) {
                rect = new CGRectangle(0, 0, 100, 100);//this.ClientRectangle;
            }
            //this.graphics.intersectClip(new CGRectangle(0,0,1500,1500));
            this.graphics.clear(CGColor.White);
            this.onPaint(new PaintEventArgs(this.graphics, rect));

            //window.requestAnimationFrame(this.invalidateMe.bind(this));
        }
    }

    protected /* override */ setHeight(value: number) {
        this.Height = value;
        if (this.canvasElement != null) {
            this.canvasElement.height = value;
        }

    }

    protected /* override */ setWidth(value: number) {
        this.Width = value;
        if (this.canvasElement != null) {
            this.canvasElement.width = value;
        }
    }
    protected graphics: Graphics;

    @State()
    protected canvasElement: HTMLCanvasElement; // Control içerisinden ulaşmamız gerekecek, bu sebeple state olmalı.

    /*  public render(useRef: boolean = true): HTMLElement {
         return (
             <div>
                 <canvas ref={(el) => this.canvasElement = useRef ? el : this.canvasElement} id='canvasMe'>Hello TuView</canvas>
             </div>
         );
     } */

    public batchDraw(rect?: CGRectangle) { }
    public loopDraw() {
        const that: TuView = this;
        that.invalidate(that.ClientRectangle);

        if (!this.batchAnim) {
            this.batchAnim = new Animation(function () {
                // stop animation after first tick
                //that.batchAnim.stop();
            }, this as any);
        }

        if (!this.batchAnim.isRunning()) {
            this.batchAnim.start();
        }
        return this;
    }

    public resizeView(size: CGSize) {
        this.Width = size.Width;
        this.Height = size.Height;

        if (this.canvasElement) {
            const canvas: any = this.canvasElement;
            canvas.style.padding = '0';
            canvas.style.margin = '0';
            canvas.style.border = '0';
            canvas.style.background = 'transparent';
            canvas.style.position = 'relative';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.width = size.Width;
            canvas.style.width = size.Width + 'px';
            canvas.height = size.Height;
            canvas.style.height = size.Height + 'px';
            this.invalidate();
        }
    }
    public createButton(label: string, value: string): TuButtonElement {
        throw new NotImplementedException('createButton');
        /*  return new TuButtonElement({
             label: label,
             icon: "pi pi-check",
         }); */
    }

    /*  @State()
     public myRenderers: List<TuXmlTransformer<any>>;
     public RegisterRenderer(renderer: TuXmlTransformer<any>) {
         this.myRenderers.Add(renderer);
     } */
}

(
    function staticContructor() {
        TuView.myVersion = -1;
        TuView.myVersionAssembly = "";
        TuView.myCAN = "";
        (TuView as any).myClipboard = new Dictionary<string, TuDocument>();
    }
)();


import { TuLabeledLink } from './../TuLabeledLink/TuLabeledLink';
import { TuView } from './../TuView/TuView';
import { float, Out, as, is, New } from '@tuval/core';
import { CGPoint, CGRectangle, CGSize } from '@tuval/cg';
import { NullRect } from "../Globals";
import { ITuGraphPart } from "../ITuGraphPart";
import { ITuIdentifiablePart } from "../ITuIdentifiablePart";
import { ITuLink } from "../ITuLink";
import { ITuPort } from "../ITuPort";
import { ITuRoutable } from "../ITuRoutable";
import { NoSpot, Spot } from "../Spot";
import { TuChangedEventArgs } from "../TuChangedEventArgs";
import { TuStroke } from "../TuStroke/TuStroke";
import { TuLinkAdjustingStyle } from "./TuLinkAdjustingStyle";
import { TuLinkEvents } from "./TuLinkEvents";
import { TuHandle } from '../TuHandle/TuHandle';
import { GeomUtilities } from '../GeomUtilities';
import { TuHandleStyle } from '../TuHandle/TuHandleStyle';
import { ITuNode } from '../TuNode/ITuNode';
import { TuPositionArray } from '../TuDocument/TuPositionArray';
import { TuSelection } from '../TuSelection/TuSelection';
import { ITuHandle } from '../TuHandle/ITuHandle';
import { TuPort } from '../TuPort/TuPort';
import { Types } from '../types';
import { TuStrokeStyle } from '../TuStroke/TuStrokeStyle';
import { TuCopyDictionary } from '../TuCopyDictionary';
import { TuInputState } from '../TuInputState';
import { TuLayer } from '../TuLayer/TuLayer';
import { TuDocument } from '../TuDocument/TuDocument';
import { TuPortStyle } from '../TuPort/TuPortStyle';
import { TuObject } from '../TuObject/TuObject';

const RelinkableFromHandle: number = 1024;
const RelinkableToHandle: number = 1025;
const flagNoClearPorts: number = 16777216;
const flagLinkAvoidsNodes: number = 33554432;
const flagLinkOrtho: number = 67108864;
const flagRelinkable: number = 134217728;
const flagDraggableOrthogonalSegments: number = 268435456;
const RIGHT: float = 0;
const DOWN: float = 90;
const LEFT: float = 180;
const UP: float = 270;

export class TuLink extends TuStroke implements ITuLink, ITuGraphPart, ITuIdentifiablePart, ITuRoutable {

    private myFromPort: ITuPort;
    private myToPort: ITuPort;
    private myAbstractLink: ITuLink;
    private myUserFlags: number;
    private myUserObject: any;
    private myPartID: number = -1;
    private myAdjustingStyle: TuLinkAdjustingStyle;
    private myToolTipText: string;

    //#region [Property] AbstractLink
    public get AbstractLink(): ITuLink {
        return this.getAbstractLink();
    }

    public set AbstractLink(value: ITuLink) {
        this.setAbstractLink(value);
    }

    protected /*virtual*/ getAbstractLink(): ITuLink {
        return this.myAbstractLink;
    }

    protected /*virtual*/ setAbstractLink(value: ITuLink) {
        const goLink: ITuLink = this.myAbstractLink;
        if (goLink !== value && value != null) {
            const fromPort: ITuPort = this.FromPort;
            if (fromPort != null) {
                fromPort.removeLink(goLink);
            }
            const toPort: ITuPort = this.ToPort;
            if (toPort != null) {
                toPort.removeLink(goLink);
            }
            this.myAbstractLink = value;
            if (fromPort != null) {
                fromPort.addDestinationLink(value);
            }
            if (toPort != null) {
                toPort.addSourceLink(value);
            }
            this.Changed(TuLinkEvents.ChangedAbstractLink, 0, goLink, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] AdjustingStyle
    public get AdjustingStyle(): TuLinkAdjustingStyle {
        return this.getAdjustingStyle();
    }

    public set AdjustingStyle(value: TuLinkAdjustingStyle) {
        this.setAdjustingStyle(value);
    }

    protected /*virtual*/ getAdjustingStyle(): TuLinkAdjustingStyle {
        return this.myAdjustingStyle;
    }

    protected /*virtual*/ setAdjustingStyle(value: TuLinkAdjustingStyle) {
        const goLinkAdjustingStyle: TuLinkAdjustingStyle = this.myAdjustingStyle;
        if (goLinkAdjustingStyle !== value) {
            this.myAdjustingStyle = value;
            this.Changed(TuLinkEvents.ChangedAdjustingStyle, goLinkAdjustingStyle, undefined, NullRect, value, undefined, NullRect);
        }
    }
    //#endregion

    //#region [Property] AvoidsNodes
    public get AvoidsNodes(): boolean {
        return this.getAvoidsNodes();
    }

    public set AvoidsNodes(value: boolean) {
        this.setAvoidsNodes(value);
    }

    protected /*virtual*/ getAvoidsNodes(): boolean {
        return (this.InternalFlags & flagLinkAvoidsNodes) !== 0;
    }

    protected /*virtual*/ setAvoidsNodes(value: boolean) {
        const internalFlags: boolean = (this.InternalFlags & flagLinkAvoidsNodes) != 0;
        if (internalFlags != value) {
            if (!value) {
                this.InternalFlags = this.InternalFlags & ~flagLinkAvoidsNodes;
            }
            else {
                this.InternalFlags = this.InternalFlags | flagLinkAvoidsNodes;
            }
            this.Changed(TuLinkEvents.ChangedAvoidsNodes, 0, internalFlags, NullRect, 0, value, NullRect);
            if (!this.Initializing) {
                this.portsOnLinkChanged(TuLinkEvents.ChangedAvoidsNodes, 0, internalFlags, NullRect, 0, value, NullRect);
                if (value) {
                    this.clearPoints();
                    this.updateRoute();
                }
            }
        }
    }
    //#endregion

    //#region [Property] DraggableOrthogonalSegments
    public get DraggableOrthogonalSegments(): boolean {
        return this.getDraggableOrthogonalSegments();
    }

    public set DraggableOrthogonalSegments(value: boolean) {
        this.setDraggableOrthogonalSegments(value);
    }

    protected /*virtual*/ getDraggableOrthogonalSegments(): boolean {
        return (this.InternalFlags & flagDraggableOrthogonalSegments) !== 0;
    }

    protected /*virtual*/ setDraggableOrthogonalSegments(value: boolean) {
        const internalFlags: boolean = (this.InternalFlags & flagDraggableOrthogonalSegments) !== 0;
        if (internalFlags != value) {
            if (!value) {
                this.InternalFlags = this.InternalFlags & ~flagDraggableOrthogonalSegments;
            }
            else {
                this.InternalFlags = this.InternalFlags | flagDraggableOrthogonalSegments;
            }
            this.Changed(TuLinkEvents.ChangedDraggableOrthogonalSegments, 0, internalFlags, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] FirstPickIndex

    protected /*override*/ getFirstPickIndex(): number {
        const fromPort: TuPort = as(this.FromPort, Types.TuPort);
        if (fromPort == null) {
            return 0;
        }
        if (this.PointsCount <= 2) {
            return 0;
        }
        if (fromPort.FromSpot === NoSpot && !this.Orthogonal) {
            return 0;
        }
        return 1;
    }
    //#endregion

    //#region [Property] FromNode
    public get FromNode(): ITuNode {
        return this.getFromNode();
    }


    protected /*virtual*/ getFromNode(): ITuNode {
        const fromPort: ITuPort = this.FromPort;
        if (fromPort == null) {
            return undefined;
        }
        return fromPort.Node;
    }
    //#endregion

    //#region [Property] FromPort
    public get FromPort(): ITuPort {
        return this.getFromPort();
    }

    public set FromPort(value: ITuPort) {
        this.setFromPort(value);
    }

    protected /*virtual*/ getFromPort(): ITuPort {
        return this.myFromPort;
    }

    protected /*virtual*/ setFromPort(value: ITuPort) {
        const goPort: ITuPort = this.myFromPort;
        if (goPort !== value) {
            const abstractLink: ITuLink = this.AbstractLink;
            if (goPort != null && abstractLink.ToPort !== goPort) {
                goPort.removeLink(abstractLink);
            }
            this.myFromPort = value;
            if (value != null) {
                value.addDestinationLink(abstractLink);
            }
            this.Changed(TuLinkEvents.ChangedFromPort, 0, goPort, NullRect, 0, value, NullRect);
            if (!this.Initializing) {
                abstractLink.onPortChanged(value, TuLinkEvents.ChangedFromPort, 0, goPort, NullRect, 0, value, NullRect);
            }
        }
    }
    //#endregion

    //#region [Property] TuObject
    public get TuObject(): TuObject {
        return this;
    }
    //#endregion

    //#region [Property] IsSelfLoop
    public get IsSelfLoop(): boolean {
        return this.getIsSelfLoop();
    }

    protected /*virtual*/ getIsSelfLoop(): boolean {
        if (this.FromPort !== this.ToPort) {
            return false;
        }
        return this.FromPort != null;
    }
    //#endregion

    //#region [Property] LastPickIndex

    protected /*override*/ getLastPickIndex(): number {
        const pointsCount: number = this.PointsCount;
        if (pointsCount === 0) {
            return 0;
        }
        const toPort: TuPort = as(this.ToPort, Types.TuPort);
        if (toPort == null) {
            return pointsCount - 1;
        }
        if (pointsCount <= 2) {
            return pointsCount - 1;
        }
        if (toPort.ToSpot === NoSpot && !this.Orthogonal) {
            return pointsCount - 1;
        }
        return pointsCount - 2;
    }
    //#endregion

    //#region [Property] NoClearPorts
    /* internal */ get NoClearPorts(): boolean {
        return this.getNoClearPorts();
    }

    /* internal */ set NoClearPorts(value: boolean) {
        this.setNoClearPorts(value);
    }

    /* internal */ /*virtual*/ getNoClearPorts(): boolean {
        return (this.InternalFlags & flagNoClearPorts) !== 0;
    }

    /* internal */ /*virtual*/ setNoClearPorts(value: boolean) {
        if (value) {
            this.InternalFlags = this.InternalFlags | flagNoClearPorts;
            return;
        }
        this.InternalFlags = this.InternalFlags & ~flagNoClearPorts;
    }
    //#endregion

    //#region [Property] Orthogonal
    public get Orthogonal(): boolean {
        return this.getOrthogonal();
    }

    public set Orthogonal(value: boolean) {
        this.setOrthogonal(value);
    }

    protected /*virtual*/ getOrthogonal(): boolean {
        return (this.InternalFlags & flagLinkOrtho) !== 0;
    }

    protected /*virtual*/ setOrthogonal(value: boolean) {
        const internalFlags: boolean = (this.InternalFlags & flagLinkOrtho) !== 0;
        if (internalFlags !== value) {
            if (!value) {
                this.InternalFlags = this.InternalFlags & ~flagLinkOrtho;
            }
            else {
                this.InternalFlags = this.InternalFlags | flagLinkOrtho;
            }
            this.Changed(TuLinkEvents.ChangedOrthogonal, 0, internalFlags, NullRect, 0, value, NullRect);
            if (!this.Initializing) {
                this.portsOnLinkChanged(TuLinkEvents.ChangedOrthogonal, 0, internalFlags, NullRect, 0, value, NullRect);
                if (value) {
                    this.clearPoints();
                    this.updateRoute();
                }
            }
        }
    }
    //#endregion

    //#region [Property] PartID
    public get PartID(): number {
        return this.getPartID();
    }

    public set PartID(value: number) {
        this.setPartID(value);
    }

    protected /*virtual*/ getPartID(): number {
        return this.myPartID;
    }

    protected /*virtual*/ setPartID(value: number) {
        const int32: number = this.myPartID;
        if (int32 !== value) {
            this.myPartID = value;
            this.Changed(TuLinkEvents.ChangedPartID, int32, undefined, NullRect, value, undefined, NullRect);
        }
    }
    //#endregion

    //#region [Property] Relinkable
    public get Relinkable(): boolean {
        return this.getRelinkable();
    }

    public set Relinkable(value: boolean) {
        this.setRelinkable(value);
    }

    protected /*virtual*/ getRelinkable(): boolean {
        return (this.InternalFlags & flagRelinkable) !== 0;
    }

    protected /*virtual*/ setRelinkable(value: boolean) {
        const internalFlags: boolean = (this.InternalFlags & flagRelinkable) !== 0;
        if (internalFlags !== value) {
            if (!value) {
                this.InternalFlags = this.InternalFlags & ~flagRelinkable;
            }
            else {
                this.InternalFlags = this.InternalFlags | flagRelinkable;
            }
            this.Changed(TuLinkEvents.ChangedRelinkable, 0, internalFlags, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] Style
    public get Style(): TuStrokeStyle {
        return this.getStyle();
    }

    public set Style(value: TuStrokeStyle) {
        this.setStyle(value);
    }

    protected /*virtual*/ getStyle(): TuStrokeStyle {
        if (this.IsSelfLoop && !this.Orthogonal) {
            return TuStrokeStyle.Bezier;
        }
        return super.getStyle();
    }

    protected /*virtual*/ setStyle(value: TuStrokeStyle) {
        super.setStyle(value);
    }
    //#endregion

    //#region [Property] ToNode
    public get ToNode(): ITuNode {
        return this.getToNode();
    }

    protected /*virtual*/ getToNode(): ITuNode {
        const toPort: ITuPort = this.ToPort;
        if (toPort == null) {
            return undefined;
        }
        return toPort.Node;
    }
    //#endregion

    //#region [Property] ToolTipText
    public get ToolTipText(): string {
        return this.getToolTipText();
    }

    public set ToolTipText(value: string) {
        this.setToolTipText(value);
    }

    protected /*virtual*/ getToolTipText(): string {
        return this.myToolTipText;
    }

    protected /*virtual*/ setToolTipText(value: string) {
        const str: string = this.myToolTipText;
        if (str !== value) {
            this.myToolTipText = value;
            this.Changed(TuLinkEvents.ChangedToolTipText, 0, str, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] ToPort
    public get ToPort(): ITuPort {
        return this.getToPort();
    }

    public set ToPort(value: ITuPort) {
        this.setToPort(value);
    }

    protected /*virtual*/ getToPort(): ITuPort {
        return this.myToPort;
    }

    protected /*virtual*/ setToPort(value: ITuPort) {
        const goPort: ITuPort = this.myToPort;
        if (goPort !== value) {
            const abstractLink: ITuLink = this.AbstractLink;
            if (goPort != null && abstractLink.FromPort !== goPort) {
                goPort.removeLink(abstractLink);
            }
            this.myToPort = value;
            if (value != null) {
                value.addSourceLink(abstractLink);
            }
            this.Changed(TuLinkEvents.ChangedToPort, 0, goPort, NullRect, 0, value, NullRect);
            if (!this.Initializing) {
                abstractLink.onPortChanged(value, TuLinkEvents.ChangedToPort, 0, goPort, NullRect, 0, value, NullRect);
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

    protected /*virtual*/ getUserFlags(): number {
        return this.myUserFlags;
    }

    protected /*virtual*/ setUserFlags(value: number) {
        const int32: number = this.myUserFlags;
        if (int32 !== value) {
            this.myUserFlags = value;
            this.Changed(TuLinkEvents.ChangedLinkUserFlags, int32, undefined, NullRect, value, undefined, NullRect);
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

    protected /*virtual*/ getUserObject(): any {
        return this.myUserObject;
    }

    protected /*virtual*/ setUserObject(value: any) {
        const obj: any = this.myUserObject;
        if (obj !== value) {
            this.myUserObject = value;
            this.Changed(TuLinkEvents.ChangedLinkUserObject, 0, obj, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    public constructor() {
        super();
        this.myAbstractLink = this;
        this.InternalFlags = this.InternalFlags & -5;
        this.InternalFlags = this.InternalFlags | 134217728;
    }

    protected /* virtual */ addOrthoPoints(startFrom: CGPoint, fromDir: float, endTo: CGPoint, toDir: float): void {
        let bounds: Out<CGRectangle> = New.Out();
        let rectangleF: Out<CGRectangle> = New.Out();
        let pointF: CGPoint;
        let x: CGPoint;
        if (-45 <= fromDir && fromDir < 45) {
            fromDir = 0;
        }
        else if (45 <= fromDir && fromDir < 135) {
            fromDir = 90;
        }
        else if (135 > fromDir || fromDir >= 225) {
            fromDir = 270;
        }
        else {
            fromDir = 180;
        }
        if (-45 <= toDir && toDir < 45) {
            toDir = 0;
        }
        else if (45 <= toDir && toDir < 135) {
            toDir = 90;
        }
        else if (135 > toDir || toDir >= 225) {
            toDir = 270;
        }
        else {
            toDir = 180;
        }
        const pointF1: CGPoint = startFrom;
        const pointF2: CGPoint = endTo;
        const penWidth: float = this.PenWidth + 1;
        const goObject: TuObject = this.FromPort.TuObject;
        const node: ITuNode = this.FromPort.Node;
        if (node == null || node.TuObject == null) {
            bounds.value = (goObject.Parent == null ? goObject.Bounds : goObject.Parent.Bounds);
        }
        else {
            bounds.value = node.TuObject.Bounds;
        }
        const single: float = penWidth;
        GeomUtilities.InflateRect(bounds, single, single);
        bounds.value = GeomUtilities.UnionRect(bounds.value, startFrom);
        const goObject1: TuObject = this.ToPort.TuObject;
        const goNode: ITuNode = this.ToPort.Node;
        if (goNode == null || goNode.TuObject == null) {
            rectangleF.value = (goObject1.Parent == null ? goObject1.Bounds : goObject1.Parent.Bounds);
        }
        else {
            rectangleF.value = goNode.TuObject.Bounds;
        }
        const single1: float = penWidth;
        GeomUtilities.InflateRect(rectangleF, single1, single1);
        rectangleF.value = GeomUtilities.UnionRect(rectangleF.value, endTo);
        if (this.AvoidsNodes && this.Document != null) {
            const positions: TuPositionArray = this.Document.getPositions();
            const rectangleF1: Out<CGRectangle> = { value: GeomUtilities.UnionRect(bounds.value, rectangleF.value) };
            let cellSize: CGSize = positions.CellSize;
            const width: float = cellSize.Width * 2;
            cellSize = positions.CellSize;
            GeomUtilities.InflateRect(rectangleF1, width, cellSize.Height * 2);
            positions.propagate(startFrom, fromDir, endTo, toDir, rectangleF1.value);
            let dist: number = positions.getDist(endTo.X, endTo.Y);
            if (!positions.Abort && dist === TuPositionArray.MaxDistance) {
                positions.clearAllUnoccupied();
                const smallMargin: float = positions.SmallMargin;
                cellSize = positions.CellSize;
                const width1: float = cellSize.Width * smallMargin;
                cellSize = positions.CellSize;
                GeomUtilities.InflateRect(rectangleF1, width1, cellSize.Height * smallMargin);
                positions.propagate(startFrom, fromDir, endTo, toDir, rectangleF1.value);
                dist = positions.getDist(endTo.X, endTo.Y);
            }
            if (!positions.Abort && dist === TuPositionArray.MaxDistance) {
                positions.clearAllUnoccupied();
                const largeMargin: float = positions.LargeMargin;
                cellSize = positions.CellSize;
                const width2: float = cellSize.Width * largeMargin;
                cellSize = positions.CellSize;
                GeomUtilities.InflateRect(rectangleF1, width2, cellSize.Height * largeMargin);
                positions.propagate(startFrom, fromDir, endTo, toDir, rectangleF1.value);
                dist = positions.getDist(endTo.X, endTo.Y);
            }
            if (!positions.Abort && dist === TuPositionArray.MaxDistance && positions.WholeDocument) {
                positions.clearAllUnoccupied();
                positions.propagate(startFrom, fromDir, endTo, toDir, positions.Bounds);
                dist = positions.getDist(endTo.X, endTo.Y);
            }
            if (!positions.Abort && dist < TuPositionArray.MaxDistance && !positions.isOccupied(endTo.X, endTo.Y)) {
                this.traversePositions(positions, endTo.X, endTo.Y, toDir, true);
                const point: CGPoint = this.getPoint(2);
                if (this.PointsCount < 4) {
                    if (fromDir === 0 || fromDir === 180) {
                        point.X = startFrom.X;
                        point.Y = endTo.Y;
                    }
                    else {
                        point.X = endTo.X;
                        point.Y = startFrom.Y;
                    }
                    this.setPoint(2, point);
                    this.insertPoint(3, point);
                    return;
                }
                const point1: CGPoint = this.getPoint(3);
                if (fromDir === 0 || fromDir === 180) {
                    if (super.IsApprox(point.X, point1.X)) {
                        const single2: float = (fromDir === 0 ? Math.max(point.X, startFrom.X) : Math.min(point.X, startFrom.X));
                        this.setPoint(2, new CGPoint(single2, startFrom.Y));
                        this.setPoint(3, new CGPoint(single2, point1.Y));
                        return;
                    }
                    if (!super.IsApprox(point.Y, point1.Y)) {
                        this.setPoint(2, new CGPoint(startFrom.X, point.Y));
                        return;
                    }
                    if (Math.abs(startFrom.Y - point.Y) <= positions.CellSize.Height / 2) {
                        this.setPoint(2, new CGPoint(point.X, startFrom.Y));
                        this.setPoint(3, new CGPoint(point1.X, startFrom.Y));
                    }
                    this.insertPoint(2, new CGPoint(point.X, startFrom.Y));
                    return;
                }
                if (fromDir === 90 || fromDir === 270) {
                    if (super.IsApprox(point.Y, point1.Y)) {
                        const single3: float = (fromDir === 90 ? Math.max(point.Y, startFrom.Y) : Math.min(point.Y, startFrom.Y));
                        this.setPoint(2, new CGPoint(startFrom.X, single3));
                        this.setPoint(3, new CGPoint(point1.X, single3));
                        return;
                    }
                    if (super.IsApprox(point.X, point1.X)) {
                        if (Math.abs(startFrom.X - point.X) <= positions.CellSize.Width / 2) {
                            this.setPoint(2, new CGPoint(startFrom.X, point.Y));
                            this.setPoint(3, new CGPoint(startFrom.X, point1.Y));
                        }
                        this.insertPoint(2, new CGPoint(startFrom.X, point.Y));
                        return;
                    }
                    this.setPoint(2, new CGPoint(point.X, startFrom.Y));
                }
                return;
            }
        }
        if (fromDir === 0) {
            if (pointF2.X > pointF1.X || toDir === 270 && pointF2.Y < pointF1.Y && rectangleF.value.Right > pointF1.X || toDir === 90 &&
                pointF2.Y > pointF1.Y && rectangleF.value.Right > pointF1.X) {
                pointF = new CGPoint(pointF2.X, pointF1.Y);
                x = new CGPoint(pointF2.X, (pointF1.Y + pointF2.Y) / 2);
                if (toDir === 180) {
                    pointF.X = this.getMidOrthoPosition(pointF1.X, pointF2.X, false);
                    x.X = pointF.X;
                    x.Y = pointF2.Y;
                }
                else if (toDir === 270 && pointF2.Y < pointF1.Y || toDir === 90 && pointF2.Y > pointF1.Y) {
                    if (pointF1.X < rectangleF.value.Left) {
                        pointF.X = this.getMidOrthoPosition(pointF1.X, rectangleF.value.Left, false);
                    }
                    else if (pointF1.X >= rectangleF.value.Right || (toDir !== 270 || pointF1.Y >= rectangleF.value.Top) &&
                        (toDir !== 90 || pointF1.Y <= rectangleF.value.Bottom)) {
                        pointF.X = rectangleF.value.Right;
                    }
                    else {
                        pointF.X = this.getMidOrthoPosition(pointF1.X, pointF2.X, false);
                    }
                    x.X = pointF.X;
                    x.Y = pointF2.Y;
                }
                else if (toDir === 0 && pointF1.X < rectangleF.value.Left && pointF1.Y > rectangleF.value.Top && pointF1.Y < rectangleF.value.Bottom) {
                    pointF.X = pointF1.X;
                    if (pointF1.Y >= pointF2.Y) {
                        pointF.Y = Math.max(pointF2.Y, rectangleF.value.Bottom);
                    }
                    else {
                        pointF.Y = Math.min(pointF2.Y, rectangleF.value.Top);
                    }
                    x.Y = pointF.Y;
                }
            }
            else {
                pointF = new CGPoint(pointF1.X, pointF2.Y);
                x = new CGPoint((pointF1.X + pointF2.X) / 2, pointF2.Y);
                if (toDir === 180 || toDir === 90 && pointF2.Y < bounds.value.Top || toDir === 270 && pointF2.Y > bounds.value.Bottom) {
                    if (toDir === 180 && (GeomUtilities.ContainsRect(rectangleF.value, pointF1) || GeomUtilities.ContainsRect(bounds.value, pointF2))) {
                        pointF.Y = this.getMidOrthoPosition(pointF1.Y, pointF2.Y, true);
                    }
                    else if (pointF2.Y < pointF1.Y && (toDir === 180 || toDir === 90)) {
                        pointF.Y = this.getMidOrthoPosition(bounds.value.Top, Math.max(pointF2.Y, rectangleF.value.Bottom), true);
                    }
                    else if (pointF2.Y > pointF1.Y && (toDir === 180 || toDir === 270)) {
                        pointF.Y = this.getMidOrthoPosition(bounds.value.Bottom, Math.min(pointF2.Y, rectangleF.value.Top), true);
                    }
                    x.X = pointF2.X;
                    x.Y = pointF.Y;
                }
                if (pointF.Y > bounds.value.Top && pointF.Y < bounds.value.Bottom) {
                    if ((pointF2.X < bounds.value.Left || pointF2.X > pointF1.X) && (pointF1.X > rectangleF.value.Right || pointF1.X < pointF2.X)) {
                        if (toDir === 270 || (toDir === 0 || toDir === 180) && pointF2.Y < pointF1.Y) {
                            pointF.Y = Math.min(pointF2.Y, (toDir === 0 ? bounds.value.Top : Math.min(bounds.value.Top, rectangleF.value.Top)));
                        }
                        else {
                            pointF.Y = Math.max(pointF2.Y, (toDir === 0 ? bounds.value.Bottom : Math.max(bounds.value.Bottom, rectangleF.value.Bottom)));
                        }
                        x.X = pointF2.X;
                        x.Y = pointF.Y;
                    }
                    else if (toDir === 90 || toDir === 270) {
                        pointF = new CGPoint(Math.max((pointF1.X + pointF2.X) / 2, pointF1.X), pointF1.Y);
                        x = new CGPoint(pointF.X, pointF2.Y);
                    }
                }
            }
        }
        else if (fromDir === 180) {
            if (pointF2.X < pointF1.X || toDir === 270 && pointF2.Y < pointF1.Y && rectangleF.value.Left < pointF1.X || toDir === 90 &&
                pointF2.Y > pointF1.Y && rectangleF.value.Left < pointF1.X) {
                pointF = new CGPoint(pointF2.X, pointF1.Y);
                x = new CGPoint(pointF2.X, (pointF1.Y + pointF2.Y) / 2);
                if (toDir === 0) {
                    pointF.X = this.getMidOrthoPosition(pointF1.X, pointF2.X, false);
                    x.X = pointF.X;
                    x.Y = pointF2.Y;
                }
                else if (toDir === 270 && pointF2.Y < pointF1.Y || toDir === 90 && pointF2.Y > pointF1.Y) {
                    if (pointF1.X > rectangleF.value.Right) {
                        pointF.X = this.getMidOrthoPosition(pointF1.X, rectangleF.value.Right, false);
                    }
                    else if (pointF1.X <= rectangleF.value.Left || (toDir !== 270 || pointF1.Y >= rectangleF.value.Top) &&
                        (toDir !== 90 || pointF1.Y <= rectangleF.value.Bottom)) {
                        pointF.X = rectangleF.value.Left;
                    }
                    else {
                        pointF.X = this.getMidOrthoPosition(pointF1.X, pointF2.X, false);
                    }
                    x.X = pointF.X;
                    x.Y = pointF2.Y;
                }
                else if (toDir === 180 && pointF1.X > rectangleF.value.Right && pointF1.Y > rectangleF.value.Top && pointF1.Y < rectangleF.value.Bottom) {
                    pointF.X = pointF1.X;
                    if (pointF1.Y >= pointF2.Y) {
                        pointF.Y = Math.max(pointF2.Y, rectangleF.value.Bottom);
                    }
                    else {
                        pointF.Y = Math.min(pointF2.Y, rectangleF.value.Top);
                    }
                    x.Y = pointF.Y;
                }
            }
            else {
                pointF = new CGPoint(pointF1.X, pointF2.Y);
                x = new CGPoint((pointF1.X + pointF2.X) / 2, pointF2.Y);
                if (toDir === 0 || toDir === 90 && pointF2.Y < bounds.value.Top || toDir === 270 && pointF2.Y > bounds.value.Bottom) {
                    if (toDir === 0 && (GeomUtilities.ContainsRect(rectangleF.value, pointF1) || GeomUtilities.ContainsRect(bounds.value, pointF2))) {
                        pointF.Y = this.getMidOrthoPosition(pointF1.Y, pointF2.Y, true);
                    }
                    else if (pointF2.Y < pointF1.Y && (toDir === 0 || toDir === 90)) {
                        pointF.Y = this.getMidOrthoPosition(bounds.value.Top, Math.max(pointF2.Y, rectangleF.value.Bottom), true);
                    }
                    else if (pointF2.Y > pointF1.Y && (toDir === 0 || toDir === 270)) {
                        pointF.Y = this.getMidOrthoPosition(bounds.value.Bottom, Math.min(pointF2.Y, rectangleF.value.Top), true);
                    }
                    x.X = pointF2.X;
                    x.Y = pointF.Y;
                }
                if (pointF.Y > bounds.value.Top && pointF.Y < bounds.value.Bottom) {
                    if ((pointF2.X > bounds.value.Right || pointF2.X < pointF1.X) && (pointF1.X < rectangleF.value.Left || pointF1.X > pointF2.X)) {
                        if (toDir === 270 || (toDir === 0 || toDir === 180) && pointF2.Y < pointF1.Y) {
                            pointF.Y = Math.min(pointF2.Y, (toDir === 180 ? bounds.value.Top : Math.min(bounds.value.Top, rectangleF.value.Top)));
                        }
                        else {
                            pointF.Y = Math.max(pointF2.Y, (toDir === 180 ? bounds.value.Bottom : Math.max(bounds.value.Bottom, rectangleF.value.Bottom)));
                        }
                        x.X = pointF2.X;
                        x.Y = pointF.Y;
                    }
                    else if (toDir === 90 || toDir === 270) {
                        pointF = new CGPoint(Math.min((pointF1.X + pointF2.X) / 2, pointF1.X), pointF1.Y);
                        x = new CGPoint(pointF.X, pointF2.Y);
                    }
                }
            }
        }
        else if (fromDir === 90) {
            if (pointF2.Y > pointF1.Y || toDir === 180 && pointF2.X < pointF1.X && rectangleF.value.Bottom > pointF1.Y || toDir === 0 && pointF2.X > pointF1.X && rectangleF.value.Bottom > pointF1.Y) {
                pointF = new CGPoint(pointF1.X, pointF2.Y);
                x = new CGPoint((pointF1.X + pointF2.X) / 2, pointF2.Y);
                if (toDir === 270) {
                    pointF.Y = this.getMidOrthoPosition(pointF1.Y, pointF2.Y, true);
                    x.X = pointF2.X;
                    x.Y = pointF.Y;
                }
                else if (toDir === 180 && pointF2.X < pointF1.X || toDir === 0 && pointF2.X > pointF1.X) {
                    if (pointF1.Y < rectangleF.value.Top) {
                        pointF.Y = this.getMidOrthoPosition(pointF1.Y, rectangleF.value.Top, true);
                    }
                    else if (pointF1.Y >= rectangleF.value.Bottom || (toDir !== 180 || pointF1.X >= rectangleF.value.Left) && (toDir !== 0 || pointF1.X <= rectangleF.value.Right)) {
                        pointF.Y = rectangleF.value.Bottom;
                    }
                    else {
                        pointF.Y = this.getMidOrthoPosition(pointF1.Y, pointF2.Y, true);
                    }
                    x.X = pointF2.X;
                    x.Y = pointF.Y;
                }
                else if (toDir === 90 && pointF1.Y < rectangleF.value.Top && pointF1.X > rectangleF.value.Left && pointF1.X < rectangleF.value.Right) {
                    if (pointF1.X >= pointF2.X) {
                        pointF.X = Math.max(pointF2.X, rectangleF.value.Right);
                    }
                    else {
                        pointF.X = Math.min(pointF2.X, rectangleF.value.Left);
                    }
                    pointF.Y = pointF1.Y;
                    x.X = pointF.X;
                }
            }
            else {
                pointF = new CGPoint(pointF2.X, pointF1.Y);
                x = new CGPoint(pointF2.X, (pointF1.Y + pointF2.Y) / 2);
                if (toDir === 270 || toDir === 0 && pointF2.X < bounds.value.Left || toDir === 180 && pointF2.X > bounds.value.Right) {
                    if (toDir === 270 && (GeomUtilities.ContainsRect(rectangleF.value, pointF1) || GeomUtilities.ContainsRect(bounds.value, pointF2))) {
                        pointF.X = this.getMidOrthoPosition(pointF1.X, pointF2.X, false);
                    }
                    else if (pointF2.X < pointF1.X && (toDir === 270 || toDir === 0)) {
                        pointF.X = this.getMidOrthoPosition(bounds.value.Left, Math.max(pointF2.X, rectangleF.value.Right), false);
                    }
                    else if (pointF2.X > pointF1.X && (toDir === 270 || toDir === 180)) {
                        pointF.X = this.getMidOrthoPosition(bounds.value.Right, Math.min(pointF2.X, rectangleF.value.Left), false);
                    }
                    x.X = pointF.X;
                    x.Y = pointF2.Y;
                }
                if (pointF.X > bounds.value.Left && pointF.X < bounds.value.Right) {
                    if ((pointF2.Y < bounds.value.Top || pointF2.Y > pointF1.Y) && (pointF1.Y > rectangleF.value.Bottom || pointF1.Y < pointF2.Y)) {
                        if (toDir === 180 || (toDir === 90 || toDir === 270) && pointF2.X < pointF1.X) {
                            pointF.X = Math.min(pointF2.X, (toDir === 90 ? bounds.value.Left : Math.min(bounds.value.Left, rectangleF.value.Left)));
                        }
                        else {
                            pointF.X = Math.max(pointF2.X, (toDir === 90 ? bounds.value.Right : Math.max(bounds.value.Right, rectangleF.value.Right)));
                        }
                        x.X = pointF.X;
                        x.Y = pointF2.Y;
                    }
                    else if (toDir === 0 || toDir === 180) {
                        pointF = new CGPoint(pointF1.X, Math.max((pointF1.Y + pointF2.Y) / 2, pointF1.Y));
                        x = new CGPoint(pointF2.X, pointF.Y);
                    }
                }
            }
        }
        else if (pointF2.Y < pointF1.Y || toDir === 180 && pointF2.X < pointF1.X && rectangleF.value.Top < pointF1.Y || toDir === 0 && pointF2.X > pointF1.X && rectangleF.value.Top < pointF1.Y) {
            pointF = new CGPoint(pointF1.X, pointF2.Y);
            x = new CGPoint((pointF1.X + pointF2.X) / 2, pointF2.Y);
            if (toDir === 90) {
                pointF.Y = this.getMidOrthoPosition(pointF1.Y, pointF2.Y, true);
                x.X = pointF2.X;
                x.Y = pointF.Y;
            }
            else if (toDir === 180 && pointF2.X < pointF1.X || toDir === 0 && pointF2.X >= pointF1.X) {
                if (pointF1.Y > rectangleF.value.Bottom) {
                    pointF.Y = this.getMidOrthoPosition(pointF1.Y, rectangleF.value.Bottom, true);
                }
                else if (pointF1.Y <= rectangleF.value.Top || (toDir !== 180 || pointF1.X >= rectangleF.value.Left) && (toDir !== 0 || pointF1.X <= rectangleF.value.Right)) {
                    pointF.Y = rectangleF.value.Top;
                }
                else {
                    pointF.Y = this.getMidOrthoPosition(pointF1.Y, pointF2.Y, true);
                }
                x.X = pointF2.X;
                x.Y = pointF.Y;
            }
            else if (toDir === 270 && pointF1.Y > rectangleF.value.Bottom && pointF1.X > rectangleF.value.Left && pointF1.X < rectangleF.value.Right) {
                if (pointF1.X >= pointF2.X) {
                    pointF.X = Math.max(pointF2.X, rectangleF.value.Right);
                }
                else {
                    pointF.X = Math.min(pointF2.X, rectangleF.value.Left);
                }
                pointF.Y = pointF1.Y;
                x.X = pointF.X;
            }
        }
        else {
            pointF = new CGPoint(pointF2.X, pointF1.Y);
            x = new CGPoint(pointF2.X, (pointF1.Y + pointF2.Y) / 2);
            if (toDir === 90 || toDir === 0 && pointF2.X < bounds.value.Left || toDir === 180 && pointF2.X > bounds.value.Right) {
                if (toDir === 90 && (GeomUtilities.ContainsRect(rectangleF.value, pointF1) || GeomUtilities.ContainsRect(bounds.value, pointF2))) {
                    pointF.X = this.getMidOrthoPosition(pointF1.X, pointF2.X, false);
                }
                else if (pointF2.X < pointF1.X && (toDir === 90 || toDir === 0)) {
                    pointF.X = this.getMidOrthoPosition(bounds.value.Left, Math.max(pointF2.X, rectangleF.value.Right), false);
                }
                else if (pointF2.X > pointF1.X && (toDir === 90 || toDir === 180)) {
                    pointF.X = this.getMidOrthoPosition(bounds.value.Right, Math.min(pointF2.X, rectangleF.value.Left), false);
                }
                x.X = pointF.X;
                x.Y = pointF2.Y;
            }
            if (pointF.X > bounds.value.Left && pointF.X < bounds.value.Right) {
                if ((pointF2.Y > bounds.value.Bottom || pointF2.Y < pointF1.Y) && (pointF1.Y < rectangleF.value.Top || pointF1.Y > pointF2.Y)) {
                    if (toDir === 180 || (toDir === 90 || toDir === 270) && pointF2.X < pointF1.X) {
                        pointF.X = Math.min(pointF2.X, (toDir === 270 ? bounds.value.Left : Math.min(bounds.value.Left, rectangleF.value.Left)));
                    }
                    else {
                        pointF.X = Math.max(pointF2.X, (toDir === 270 ? bounds.value.Right : Math.max(bounds.value.Right, rectangleF.value.Right)));
                    }
                    x.X = pointF.X;
                    x.Y = pointF2.Y;
                }
                else if (toDir === 0 || toDir === 180) {
                    pointF = new CGPoint(pointF1.X, Math.min((pointF1.Y + pointF2.Y) / 2, pointF1.Y));
                    x = new CGPoint(pointF2.X, pointF.Y);
                }
            }
        }
        this.addPoint(pointF);
        this.addPoint(x);
    }

    public /* override */ AddSelectionHandles(sel: TuSelection, selectedObj: TuObject): void {
        let int32: number;
        const view: TuView = sel.View;
        const flag: boolean = (view == null ? true : view.CanResizeObjects());
        const flag1: boolean = (view == null ? true : view.CanReshapeObjects());
        if (this.HighlightWhenSelected || !this.CanResize() || !flag) {
            super.AddSelectionHandles(sel, selectedObj);
            return;
        }
        sel.removeHandles(this);
        if (this.PointsCount == 0) {
            return;
        }
        const firstPickIndex: number = this.FirstPickIndex;
        const lastPickIndex: number = this.LastPickIndex;
        const flag2: boolean = this.CanReshape() && flag1;
        const relinkable: boolean = this.Relinkable;
        let point: CGPoint = this.getPoint(firstPickIndex);
        int32 = (!relinkable ? 0 : 1024);
        const int321: number = int32;
        let goHandle: ITuHandle = sel.createResizeHandle(this, selectedObj, point, int321, int321 !== 0);
        if (int32 === 1024) {
            super.MakeDiamondResizeHandle(goHandle, NoSpot);
        }
        point = this.getPoint(lastPickIndex);
        int32 = (!relinkable ? 0 : 1025);
        const int322: number = int32;
        goHandle = sel.createResizeHandle(this, selectedObj, point, int322, int322 !== 0);
        if (int32 === 1025) {
            super.MakeDiamondResizeHandle(goHandle, NoSpot);
        }
        for (let i = (firstPickIndex + 1); i <= (lastPickIndex - 1); i = (i + 1)) {
            point = this.getPoint(i);
            int32 = 8192 + i;
            if (!flag2) {
                int32 = 0;
            }
            else if (this.Orthogonal) {
                if (this.PointsCount < 6) {
                    int32 = 0;
                }
                else if (i === (firstPickIndex + 1) && this.FromPort != null) {
                    const pointF: CGPoint = this.getPoint(firstPickIndex);
                    if (super.IsApprox(pointF.Y, point.Y) && !super.IsApprox(pointF.X, point.X)) {
                        int32 = 256;
                    }
                    else if (super.IsApprox(pointF.X, point.X) && !super.IsApprox(pointF.Y, point.Y)) {
                        int32 = 32;
                    }
                    else if (super.IsApprox(pointF.X, point.X) && super.IsApprox(pointF.Y, point.Y) && (firstPickIndex + 2) <= lastPickIndex) {
                        const point1: CGPoint = this.getPoint(firstPickIndex + 2);
                        if (super.IsApprox(point1.Y, point.Y) && !super.IsApprox(point1.X, point.X)) {
                            int32 = 32;
                        }
                        else if (super.IsApprox(point1.X, point.X) && !super.IsApprox(point1.Y, point.Y)) {
                            int32 = 256;
                        }
                    }
                }
                else if (i == (lastPickIndex - 1) && this.ToPort != null) {
                    const pointF1: CGPoint = this.getPoint(lastPickIndex);
                    if (super.IsApprox(point.Y, pointF1.Y) && !super.IsApprox(point.X, pointF1.X)) {
                        int32 = 64;
                    }
                    else if (super.IsApprox(point.X, pointF1.X) && !super.IsApprox(point.Y, pointF1.Y)) {
                        int32 = 128;
                    }
                    else if (super.IsApprox(pointF1.X, point.X) && super.IsApprox(pointF1.Y, point.Y) && (lastPickIndex - 2) >= firstPickIndex) {
                        const point2: CGPoint = this.getPoint(lastPickIndex - 2);
                        if (super.IsApprox(point2.Y, point.Y) && !super.IsApprox(point2.X, point.X)) {
                            int32 = 128;
                        }
                        else if (super.IsApprox(point2.X, point.X) && !super.IsApprox(point2.Y, point.Y)) {
                            int32 = 64;
                        }
                    }
                }
            }
            const int323: number = int32;
            sel.createResizeHandle(this, selectedObj, point, int323, int323 !== 0);
            if ((int32 > 8192 || i == (firstPickIndex + 1) && int32 !== 0) && this.Orthogonal && this.DraggableOrthogonalSegments) {
                const pointF2: CGPoint = point;
                const point3: CGPoint = this.getPoint(i + 1);
                const pointF3: CGPoint = new CGPoint(Math.min(pointF2.X, point3.X), Math.min(pointF2.Y, point3.Y));
                const rectangleF: Out<CGRectangle> = { value: new CGRectangle(pointF3.X, pointF3.Y, Math.max(pointF2.X, point3.X) - pointF3.X, Math.max(pointF2.Y, point3.Y) - pointF3.Y) };
                let width: float = 3;
                let height: float = 3;
                if (view != null) {
                    let resizeHandleSize: CGSize = view.ResizeHandleSize;
                    const single: float = resizeHandleSize.Width / 2;
                    resizeHandleSize = view.WorldScale;
                    width = single / resizeHandleSize.Width;
                    resizeHandleSize = view.ResizeHandleSize;
                    const height1: float = resizeHandleSize.Height / 2;
                    resizeHandleSize = view.WorldScale;
                    height = height1 / resizeHandleSize.Height;
                }
                let goHandle1: TuHandle = undefined;
                const flag3: boolean = super.IsApprox(rectangleF.value.Width, 0);
                if (!flag3) {
                    if (Math.abs(pointF2.X - point3.X) > width * 2) {
                        goHandle1 = new TuHandle();
                    }
                    GeomUtilities.InflateRect(rectangleF, -width, height);
                }
                else {
                    if (Math.abs(pointF2.Y - point3.Y) > height * 2)
                    {
                        goHandle1 = new TuHandle();
                    }
                    GeomUtilities.InflateRect(rectangleF, width, -height);
                }
                if (goHandle1 != null) {
                    goHandle1.Style = TuHandleStyle.None;
                    if (int32 <= 8192) {
                        goHandle1.HandleID = (8192 + i) + 1000000;
                    }
                    else {
                        goHandle1.HandleID = int32 + 1000000;
                    }
                    goHandle1.SelectedObject = selectedObj;
                    goHandle1.Bounds = rectangleF.value;
                    if (!flag3) {
                        goHandle1.CursorName = "row-resize";
                    }
                    else {
                        goHandle1.CursorName = "col-resize";
                    }
                    sel.addHandle(this, goHandle1);
                }
            }
        }
    }

    protected /* virtual */ adjustPoints(startIndex: number, newFromPoint: CGPoint, endIndex: number, newToPoint: CGPoint): boolean {
        let adjustingStyle: TuLinkAdjustingStyle = this.AdjustingStyle;
        if (this.Orthogonal) {
            if (adjustingStyle === TuLinkAdjustingStyle.Scale) {
                return false;
            }
            if (adjustingStyle === TuLinkAdjustingStyle.Stretch) {
                adjustingStyle = TuLinkAdjustingStyle.End;
            }
        }
        switch (adjustingStyle) {
            case TuLinkAdjustingStyle.Scale:
                {
                    return this.rescalePoints(startIndex, newFromPoint, endIndex, newToPoint);
                }
            case TuLinkAdjustingStyle.Stretch:
                {
                    return this.stretchPoints(startIndex, newFromPoint, endIndex, newToPoint);
                }
            case TuLinkAdjustingStyle.End:
                {
                    return this.modifyEndPoints(startIndex, newFromPoint, endIndex, newToPoint);
                }
        }
        return false;
    }

    private calculateBezierNoSpot(fromObj: TuObject, from: TuPort, toObj: TuObject, to: TuPort): void {
        this.clearPoints();
        let center: Out<CGPoint> = { value: fromObj.Center };
        let toLinkPoint: Out<CGPoint> = { value: toObj.Center };
        if (from != null) {
            center.value = from.getFromLinkPoint(this.AbstractLink);
        }
        else if (!fromObj.GetNearestIntersectionPoint(toLinkPoint.value, center.value, center)) {
            center.value = fromObj.Center;
        }
        if (to != null) {
            toLinkPoint.value = to.getToLinkPoint(this.AbstractLink);
        }
        else if (!toObj.GetNearestIntersectionPoint(center.value, toLinkPoint.value, toLinkPoint)) {
            toLinkPoint.value = toObj.Center;
        }
        const x: float = toLinkPoint.value.X - center.value.X;
        const y: float = toLinkPoint.value.Y - center.value.Y;
        const curviness: float = this.Curviness;
        let single: float = Math.abs(curviness);
        if (curviness < 0) {
            single = -single;
        }
        let single1: float = 0;
        let single2: float = 0;
        let x1: float = center.value.X + x / 3;
        let y1: float = center.value.Y + y / 3;
        let single3: float = x1;
        let single4: float = y1;
        if (!super.IsApprox(y, 0)) {
            single1 = -x / y;
            const single5: float = single;
            const single6: float = single1;
            single2 = Math.sqrt((single5 * single5 / (single6 * single6 + 1)));
            if (curviness < 0) {
                single2 = -single2;
            }
            single3 = ((y < 0 ? -1 : 1)) * single2 + x1;
            single4 = single1 * (single3 - x1) + y1;
        }
        else if (x <= 0) {
            single4 += single;
        }
        else {
            single4 -= single;
        }
        x1 = center.value.X + 2 * x / 3;
        y1 = center.value.Y + 2 * y / 3;
        let single7: float = x1;
        let single8: float = y1;
        if (!super.IsApprox(y, 0)) {
            single7 = ((y < 0 ? -1 : 1)) * single2 + x1;
            single8 = single1 * (single7 - x1) + y1;
        }
        else if (x <= 0) {
            single8 += single;
        }
        else {
            single8 -= single;
        }
        this.addPoint(center.value);
        super.addPoint(single3, single4);
        super.addPoint(single7, single8);
        this.addPoint(toLinkPoint.value);
        this.setPoint(0, from.getFromLinkPoint(this.AbstractLink));
        this.setPoint(3, to.getToLinkPoint(this.AbstractLink));
    }

    private calculateLineNoSpot(fromObj: TuObject, from: TuPort, toObj: TuObject, to: TuPort): void {
        this.clearPoints();
        const center: Out<CGPoint> = { value: fromObj.Center };
        const toLinkPoint: Out<CGPoint> = { value: toObj.Center };
        if (from != null) {
            center.value = from.getFromLinkPoint(this.AbstractLink);
        }
        else if (!fromObj.GetNearestIntersectionPoint(toLinkPoint.value, center.value, center)) {
            center.value = fromObj.Center;
        }
        if (to != null) {
            toLinkPoint.value = to.getToLinkPoint(this.AbstractLink);
        }
        else if (!toObj.GetNearestIntersectionPoint(center.value, toLinkPoint.value, toLinkPoint)) {
            toLinkPoint.value = toObj.Center;
        }
        this.addPoint(center.value);
        this.addPoint(toLinkPoint.value);
    }

    public /* virtual */ calculateRoute(): void {
        this.calculateStroke();
    }

    public /* virtual */  calculateStroke(): void {
        let obj: any;
        const fromPort: ITuPort = this.FromPort;
        const toPort: ITuPort = this.ToPort;
        if (fromPort == null || toPort == null) {
            return;
        }
        const goObject: TuObject = fromPort.TuObject;
        const goObject1: TuObject = toPort.TuObject;
        if (goObject == null || goObject1 == null) {
            return;
        }
        const goPort: TuPort = as(goObject, Types.TuPort);
        const goPort1: TuPort = as(goObject1, Types.TuPort);
        const pointsCount: number = this.PointsCount;
        const int32: Spot = (goPort != null ? goPort.FromSpot : NoSpot);
        const int321: Spot = (goPort1 != null ? goPort1.ToSpot : NoSpot);
        const isSelfLoop: boolean = this.IsSelfLoop;
        const orthogonal: boolean = this.Orthogonal;
        const style: boolean = this.Style === TuStrokeStyle.Bezier;
        const adjustingStyle: boolean = this.AdjustingStyle === TuLinkAdjustingStyle.Calculate;
        const curviness: float = this.Curviness;
        const suspendsUpdates: boolean = this.SuspendsUpdates;
        const initializing: boolean = this.Initializing;
        if (!suspendsUpdates) {
            this.Changing(1204);
        }
        this.SuspendsUpdates = true;
        this.Initializing = true;
        if (goPort == null || goPort1 == null || !orthogonal && int32 === NoSpot && int321 === NoSpot && !isSelfLoop) {
            let flag: boolean = false;
            if (!adjustingStyle && pointsCount >= 3) {
                const center: Out<CGPoint> = { value: goObject.Center };
                const toLinkPoint: Out<CGPoint> = { value: goObject1.Center };
                if (goPort != null) {
                    center.value = goPort.getFromLinkPoint(this.AbstractLink);
                }
                else if (!goObject.GetNearestIntersectionPoint(toLinkPoint.value, center.value, center)) {
                    center.value = goObject.Center;
                }
                if (goPort1 != null) {
                    toLinkPoint.value = goPort1.getToLinkPoint(this.AbstractLink);
                }
                else if (!goObject1.GetNearestIntersectionPoint(center.value, toLinkPoint.value, toLinkPoint)) {
                    toLinkPoint.value = goObject1.Center;
                }
                flag = this.adjustPoints(0, center.value, pointsCount - 1, toLinkPoint.value);
            }
            if (!flag) {
                if (!style) {
                    this.calculateLineNoSpot(goObject, goPort, goObject1, goPort1);
                }
                else {
                    this.calculateBezierNoSpot(goObject, goPort, goObject1, goPort1);
                }
            }
        }
        else {
            if (adjustingStyle) {
                if ((!orthogonal ? false : this.AvoidsNodes) || isSelfLoop) {
                    this.clearPoints();
                }
            }
            let fromLinkPoint: CGPoint = goPort.getFromLinkPoint(this.AbstractLink);
            let single: float = 0;
            let single1: float = 0;
            let fromLinkDir: float = 0;
            if ((orthogonal ? true : int32 !== NoSpot) || isSelfLoop) {
                let fromEndSegmentLength: float = goPort.getFromEndSegmentLength(this.AbstractLink);
                fromLinkDir = goPort.getFromLinkDir(this.AbstractLink);
                if (isSelfLoop) {
                    fromLinkDir = fromLinkDir - ((orthogonal ? 90 : 30));
                    if (curviness < 0) {
                        fromLinkDir -= 180;
                    }
                    if (fromLinkDir < 0) {
                        fromLinkDir += 360;
                    }
                }
                if (style) {
                    fromEndSegmentLength += 15;
                }
                if (isSelfLoop) {
                    fromEndSegmentLength += Math.abs(curviness);
                }
                if (fromLinkDir === 0) {
                    single = fromEndSegmentLength;
                }
                else if (fromLinkDir === 90) {
                    single1 = fromEndSegmentLength;
                }
                else if (fromLinkDir === 180) {
                    single = -fromEndSegmentLength;
                }
                else if (fromLinkDir !== 270) {
                    single = fromEndSegmentLength * Math.cos(fromLinkDir * 3.14159265358979 / 180);
                    single1 = fromEndSegmentLength * Math.sin(fromLinkDir * 3.14159265358979 / 180);
                }
                else {
                    single1 = -fromEndSegmentLength;
                }
                if (int32 === NoSpot && isSelfLoop) {
                    fromLinkPoint = goPort.getLinkPointFromPoint(new CGPoint(fromLinkPoint.X + single * 1000, fromLinkPoint.Y + single1 * 1000));
                }
            }
            let linkPointFromPoint: CGPoint = goPort1.getToLinkPoint(this.AbstractLink);
            let single2: float = 0;
            let single3: float = 0;
            let toLinkDir: float = 0;
            if ((orthogonal ? true : int321 !== NoSpot) || isSelfLoop) {
                let toEndSegmentLength: float = goPort1.getToEndSegmentLength(this.AbstractLink);
                toLinkDir = goPort1.getToLinkDir(this.AbstractLink);
                if (isSelfLoop) {
                    const single4: float = toLinkDir;
                    if (orthogonal) {
                        obj = null;
                    }
                    else {
                        obj = 30;
                    }
                    toLinkDir = single4 + obj;
                    if (curviness < 0) {
                        toLinkDir += 180;
                    }
                    if (toLinkDir > 360) {
                        toLinkDir -= 360;
                    }
                }
                if (style) {
                    toEndSegmentLength += 15;
                }
                if (isSelfLoop) {
                    toEndSegmentLength += Math.abs(curviness);
                }
                if (toLinkDir === 0) {
                    single2 = toEndSegmentLength;
                }
                else if (toLinkDir === 90) {
                    single3 = toEndSegmentLength;
                }
                else if (toLinkDir === 180) {
                    single2 = -toEndSegmentLength;
                }
                else if (toLinkDir !== 270) {
                    single2 = toEndSegmentLength * Math.cos(toLinkDir * 3.14159265358979 / 180);
                    single3 = toEndSegmentLength * Math.sin(toLinkDir * 3.14159265358979 / 180);
                }
                else {
                    single3 = -toEndSegmentLength;
                }
                if (int321 === NoSpot && isSelfLoop) {
                    linkPointFromPoint = goPort1.getLinkPointFromPoint(new CGPoint(linkPointFromPoint.X + single2 * 1000, linkPointFromPoint.Y + single3 * 1000));
                }
            }
            let pointF: CGPoint = fromLinkPoint;
            if ((orthogonal ? true : int32 !== NoSpot) || isSelfLoop) {
                pointF = new CGPoint(fromLinkPoint.X + single, fromLinkPoint.Y + single1);
            }
            let pointF1: CGPoint = linkPointFromPoint;
            if ((orthogonal ? true : int321 !== NoSpot) || isSelfLoop) {
                pointF1 = new CGPoint(linkPointFromPoint.X + single2, linkPointFromPoint.Y + single3);
            }
            if (!adjustingStyle && !orthogonal && int32 === NoSpot && pointsCount > 3 && this.adjustPoints(0, fromLinkPoint, pointsCount - 2, pointF1)) {
                this.setPoint(pointsCount - 1, linkPointFromPoint);
            }
            else if (!adjustingStyle && !orthogonal && int321 === NoSpot && pointsCount > 3 && this.adjustPoints(1, pointF, pointsCount - 1, linkPointFromPoint)) {
                this.setPoint(0, fromLinkPoint);
            }
            else if (!adjustingStyle && !orthogonal && pointsCount > 4 && this.adjustPoints(1, pointF, pointsCount - 2, pointF1)) {
                this.setPoint(0, fromLinkPoint);
                this.setPoint(pointsCount - 1, linkPointFromPoint);
            }
            else if (!(!adjustingStyle && orthogonal) || pointsCount < 6 || this.AvoidsNodes || !this.adjustPoints(1, pointF, pointsCount - 2, pointF1)) {
                this.clearPoints();
                this.addPoint(fromLinkPoint);
                if ((orthogonal ? true : int32 !== NoSpot) || isSelfLoop) {
                    this.addPoint(pointF);
                }
                if (orthogonal) {
                    this.addOrthoPoints(pointF, fromLinkDir, pointF1, toLinkDir);
                }
                if ((orthogonal ? true : int321 !== NoSpot) || isSelfLoop) {
                    this.addPoint(pointF1);
                }
                this.addPoint(linkPointFromPoint);
            }
            else {
                this.setPoint(0, fromLinkPoint);
                this.setPoint(pointsCount - 1, linkPointFromPoint);
            }
        }
        this.InvalidBounds = true;
        this.Initializing = initializing;
        this.SuspendsUpdates = suspendsUpdates;
        if (!suspendsUpdates) {
            const bounds: CGRectangle = this.Bounds;
            this.Changed(1204, 0, undefined, bounds, 0, undefined, bounds);
        }
    }

    public /* override */ Changed(subhint: number, oldI: number, oldVal: any, oldRect: CGRectangle, newI: number, newVal: any, newRect: CGRectangle): void {
        if (this.SuspendsUpdates) {
            return;
        }
        super.Changed(subhint, oldI, oldVal, oldRect, newI, newVal, newRect);
        if (subhint === 1203 || subhint === 1201 || subhint === 1202 || subhint === 1204 || subhint === 1206 || subhint === 1205) {
            this.AbstractLink.onPortChanged(undefined, subhint, oldI, oldVal, oldRect, newI, newVal, newRect);
            this.portsOnLinkChanged(subhint, oldI, oldVal, oldRect, newI, newVal, newRect);
        }
    }

    public /* override */ ChangeValue(e: TuChangedEventArgs, undo: boolean): void {
        switch (e.SubHint) {
            case 1300:
                {
                    this.UserFlags = e.getInt(undo);
                    return;
                }
            case 1301:
                {
                    this.UserObject = e.getValue(undo);
                    return;
                }
            case 1302:
                {
                    this.FromPort = e.getValue(undo);
                    return;
                }
            case 1303:
                {
                    this.ToPort = e.getValue(undo);
                    return;
                }
            case 1304:
                {
                    this.Orthogonal = e.getValue(undo);
                    return;
                }
            case 1305:
                {
                    this.Relinkable = e.getValue(undo);
                    return;
                }
            case 1306:
                {
                    this.AbstractLink = e.getValue(undo);
                    return;
                }
            case 1307:
                {
                    this.AvoidsNodes = e.getValue(undo);
                    return;
                }
            case 1308:
                {
                    super.ChangeValue(e, undo);
                    return;
                }
            case 1309:
                {
                    this.PartID = e.getInt(undo);
                    return;
                }
            case 1310:
                {
                    this.AdjustingStyle = e.getInt(undo);
                    return;
                }
            case 1311:
                {
                    this.ToolTipText = e.getValue(undo);
                    return;
                }
            case 1312:
                {
                    this.DraggableOrthogonalSegments = e.getValue(undo);
                    return;
                }
            default:
                {
                    super.ChangeValue(e, undo);
                    return;
                }
        }
    }

    public /* override */ copyObject(env: TuCopyDictionary): TuObject {
        const goLink: TuLink = as(super.copyObject(env), Types.TuLink);
        if (goLink != null) {
            env.Delayeds.Add(this);
            goLink.myAbstractLink = as(env.copy(this.myAbstractLink.TuObject), Types.ITuLink);
            goLink.myFromPort = undefined;
            goLink.myToPort = undefined;
            goLink.myPartID = -1;
        }
        return goLink;
    }

    public /* override */ CopyObjectDelayed(env: TuCopyDictionary, newobj: TuObject): void {
        super.CopyObjectDelayed(env, newobj);
        const goLink: TuLink = as(newobj, Types.TuLink);
        if (goLink == null) {
            return;
        }
        const fromPort: ITuPort = this.FromPort;
        const toPort: ITuPort = this.ToPort;
        const item: ITuPort = as(env.Get(fromPort), Types.ITuPort);
        const goPort: ITuPort = as(env.Get(toPort), Types.ITuPort);
        const abstractLink: ITuLink = goLink.AbstractLink;
        if (abstractLink.TuObject.Movable || (fromPort == null || item != null) && (toPort == null || goPort != null)) {
            goLink.myFromPort = item;
            goLink.myToPort = goPort;
            if (item != null) {
                item.addDestinationLink(abstractLink);
            }
            if (goPort != null) {
                goPort.addSourceLink(abstractLink);
                return;
            }
        }
        else {
            abstractLink.TuObject.Remove();
        }
    }

    public /* override */ DoResize(view: TuView, origRect: CGRectangle, newPoint: CGPoint, whichHandle: number, evttype: TuInputState, min: CGSize, max: CGSize): void {
        let point: CGPoint;
        if (this.ResizesRealtime || evttype === TuInputState.Finish || evttype === TuInputState.Cancel) {
            const firstPickIndex: number = this.FirstPickIndex + 1;
            const lastPickIndex: number = this.LastPickIndex - 1;
            if (whichHandle > 64) {
                if (whichHandle === 128) {
                    const int32: number = lastPickIndex - 1;
                    point = this.getPoint(lastPickIndex - 2);
                    this.setPoint(int32, new CGPoint(point.X, newPoint.Y));
                    point = this.getPoint(lastPickIndex + 1);
                    this.setPoint(lastPickIndex, new CGPoint(point.X, newPoint.Y));
                    return;
                }
                if (whichHandle === 256) {
                    const x: float = newPoint.X;
                    point = this.getPoint(firstPickIndex - 1);
                    this.setPoint(firstPickIndex, new CGPoint(x, point.Y));
                    const int321: number = firstPickIndex + 1;
                    const single: float = newPoint.X;
                    point = this.getPoint(firstPickIndex + 2);
                    this.setPoint(int321, new CGPoint(single, point.Y));
                    return;
                }
            }
            else {
                if (whichHandle === 32) {
                    point = this.getPoint(firstPickIndex - 1);
                    this.setPoint(firstPickIndex, new CGPoint(point.X, newPoint.Y));
                    const int322: number = firstPickIndex + 1;
                    point = this.getPoint(firstPickIndex + 2);
                    this.setPoint(int322, new CGPoint(point.X, newPoint.Y));
                    return;
                }
                if (whichHandle === 64) {
                    const int323: number = lastPickIndex - 1;
                    const x1: float = newPoint.X;
                    point = this.getPoint(lastPickIndex - 2);
                    this.setPoint(int323, new CGPoint(x1, point.Y));
                    const single1: float = newPoint.X;
                    point = this.getPoint(lastPickIndex + 1);
                    this.setPoint(lastPickIndex, new CGPoint(single1, point.Y));
                    return;
                }
            }
            const pointsCount: number = this.PointsCount;
            if (pointsCount >= 2 && whichHandle >= 8192) {
                let int324: number = whichHandle - 8192;
                if (int324 <= 1000000) {
                    const pointF: CGPoint = this.getPoint(int324);
                    if (this.Orthogonal) {
                        const point1: CGPoint = this.getPoint(int324 - 1);
                        const pointF1: CGPoint = this.getPoint(int324 + 1);
                        if (super.IsApprox(point1.X, pointF.X) && super.IsApprox(pointF.Y, pointF1.Y)) {
                            this.setPoint(int324 - 1, new CGPoint(newPoint.X, point1.Y));
                            this.setPoint(int324 + 1, new CGPoint(pointF1.X, newPoint.Y));
                        }
                        else if (super.IsApprox(point1.Y, pointF.Y) && super.IsApprox(pointF.X, pointF1.X)) {
                            this.setPoint(int324 - 1, new CGPoint(point1.X, newPoint.Y));
                            this.setPoint(int324 + 1, new CGPoint(newPoint.X, pointF1.Y));
                        }
                        else if (super.IsApprox(point1.X, pointF.X) && super.IsApprox(pointF.X, pointF1.X)) {
                            this.setPoint(int324 - 1, new CGPoint(newPoint.X, point1.Y));
                            this.setPoint(int324 + 1, new CGPoint(newPoint.X, pointF1.Y));
                        }
                        else if (super.IsApprox(point1.Y, pointF.Y) && super.IsApprox(pointF.Y, pointF1.Y)) {
                            this.setPoint(int324 - 1, new CGPoint(point1.X, newPoint.Y));
                            this.setPoint(int324 + 1, new CGPoint(pointF1.X, newPoint.Y));
                        }
                    }
                    this.setPoint(int324, newPoint);
                }
                else {
                    int324 = int324 - 1000000;
                    const point2: CGPoint = this.getPoint(int324);
                    if (this.Orthogonal) {
                        const pointF2: CGPoint = this.getPoint(int324 - 1);
                        const point3: CGPoint = this.getPoint(int324 + 1);
                        if (super.IsApprox(pointF2.X, point2.X) && super.IsApprox(point2.Y, point3.Y)) {
                            this.setPoint(int324, new CGPoint(point2.X, newPoint.Y));
                            this.setPoint(int324 + 1, new CGPoint(point3.X, newPoint.Y));
                        }
                        else if (super.IsApprox(pointF2.Y, point2.Y) && super.IsApprox(point2.X, point3.X)) {
                            this.setPoint(int324, new CGPoint(newPoint.X, point2.Y));
                            this.setPoint(int324 + 1, new CGPoint(newPoint.X, point3.Y));
                        }
                        else if (super.IsApprox(pointF2.X, point2.X) && super.IsApprox(point2.X, point3.X)) {
                            this.setPoint(int324, new CGPoint(point2.X, newPoint.Y));
                            this.setPoint(int324 + 1, new CGPoint(newPoint.X, point3.Y));
                        }
                        else if (super.IsApprox(pointF2.Y, point2.Y) && super.IsApprox(point2.Y, point3.Y)) {
                            this.setPoint(int324, new CGPoint(newPoint.X, point2.Y));
                            this.setPoint(int324 + 1, new CGPoint(point3.X, newPoint.Y));
                        }
                    }
                }
                if (pointsCount >= 3) {
                    if (int324 === 1 && this.FromPort != null) {
                        const goObject: TuPort = as(this.FromPort.TuObject, Types.TuPort);
                        if (goObject != null) {
                            this.setPoint(0, goObject.getFromLinkPoint(this.AbstractLink));
                        }
                    }
                    if (int324 === (pointsCount - 2) && this.ToPort != null) {
                        const goPort: TuPort = as(this.ToPort.TuObject, Types.TuPort);
                        if (goPort != null) {
                            this.setPoint(pointsCount - 1, goPort.getToLinkPoint(this.AbstractLink));
                        }
                    }
                }
            }
        }
    }

    protected /* virtual */ getMidOrthoPosition(fromPosition: float, toPosition: float, vertical: boolean): float {
        return (fromPosition + toPosition) / 2;
    }

    public getOtherNode(n: ITuNode): ITuNode {
        return TuLink.GetOtherNode(this, n);
    }

    public static GetOtherNode(l: ITuLink, n: ITuNode): ITuNode {
        if (l.FromPort.Node === n) {
            return l.ToPort.Node;
        }
        if (l.ToPort.Node !== n) {
            return undefined;
        }
        return l.FromPort.Node;
    }

    public getOtherPort(p: ITuPort): ITuPort {
        return TuLink.GetOtherPort(this, p);
    }

    public static GetOtherPort(l: ITuLink, p: ITuPort): ITuPort {
        if (l.FromPort === p) {
            return l.ToPort;
        }
        if (l.ToPort === p) {
            return l.FromPort;
        }
        const goObject: TuObject = as(p, Types.TuObject);
        if (goObject == null) {
            return undefined;
        }
        const center: CGPoint = goObject.Center;
        const fromPort: TuObject = as(l.FromPort, Types.TuObject);
        const toPort: TuObject = as(l.ToPort, Types.TuObject);
        let x: float = 0;
        let single: float = 0;
        if (fromPort != null) {
            const pointF: CGPoint = fromPort.Center;
            x = (pointF.X - center.X) * (pointF.X - center.X) + (pointF.Y - center.Y) * (pointF.Y - center.Y);
        }
        if (toPort != null) {
            const center1: CGPoint = toPort.Center;
            single = (center1.X - center.X) * (center1.X - center.X) + (center1.Y - center.Y) * (center1.Y - center.Y);
        }
        if (single > x) {
            return l.ToPort;
        }
        if (x <= single) {
            return undefined;
        }
        return l.FromPort;
    }

    public /* override */ GetToolTip(view: TuView): string {
        return this.ToolTipText;
    }

		/* internal */ static isOrtho(link: ITuLink): boolean {
        if (link == null) {
            return false;
        }
        const goLink: TuLink = as(link, Types.TuLink);
        if (goLink != null) {
            return goLink.Orthogonal;
        }
        const goLabeledLink: TuLabeledLink = as(link, Types.TuLabeledLink);
        if (goLabeledLink == null) {
            return false;
        }
        return goLabeledLink.Orthogonal;
    }

    protected /* virtual */ modifyEndPoints(startIndex: number, newFromPoint: CGPoint, endIndex: number, newToPoint: CGPoint): boolean {
        if (this.Orthogonal) {
            let point: CGPoint = this.getPoint(startIndex + 1);
            let pointF: CGPoint = this.getPoint(startIndex + 2);
            if (super.IsApprox(point.X, pointF.X) && !super.IsApprox(point.Y, pointF.Y)) {
                this.setPoint(startIndex + 1, new CGPoint(point.X, newFromPoint.Y));
            }
            else if (super.IsApprox(point.Y, pointF.Y)) {
                this.setPoint(startIndex + 1, new CGPoint(newFromPoint.X, point.Y));
            }
            point = this.getPoint(endIndex - 1);
            pointF = this.getPoint(endIndex - 2);
            if (super.IsApprox(point.X, pointF.X) && !super.IsApprox(point.Y, pointF.Y)) {
                this.setPoint(endIndex - 1, new CGPoint(point.X, newToPoint.Y));
            }
            else if (super.IsApprox(point.Y, pointF.Y)) {
                this.setPoint(endIndex - 1, new CGPoint(newToPoint.X, point.Y));
            }
        }
        this.setPoint(startIndex, newFromPoint);
        this.setPoint(endIndex, newToPoint);
        return true;
    }

    protected /* override */ OnLayerChanged(oldlayer: TuLayer, newlayer: TuLayer, mainObj: TuObject): void {
        super.OnLayerChanged(oldlayer, newlayer, mainObj);
        if (newlayer == null && !this.NoClearPorts && (is.typeof(mainObj, Types.ITuLink) || !super.isChildOf(mainObj))) {
            const abstractLink: ITuLink = this.AbstractLink;
            const fromPort: ITuPort = this.FromPort;
            if (fromPort != null) {
                fromPort.removeLink(abstractLink);
            }
            const toPort: ITuPort = this.ToPort;
            if (toPort != null) {
                toPort.removeLink(abstractLink);
                return;
            }
        }
        else if (newlayer != null) {
            const goLink: ITuLink = this.AbstractLink;
            const goPort: ITuPort = this.FromPort;
            if (goPort != null) {
                goPort.addDestinationLink(goLink);
            }
            const toPort1: ITuPort = this.ToPort;
            if (toPort1 != null) {
                toPort1.addSourceLink(goLink);
            }
        }
    }

    public /* virtual */ onPortChanged(port: ITuPort, subhint: number, oldI: number, oldVal: number, oldRect: CGRectangle, newI: number, newVal: any, newRect: CGRectangle): void {
        if (port == null) {
            return;
        }
        if (subhint === 1302 || subhint === 1303) {
            if (oldVal !== newVal || this.AdjustingStyle === TuLinkAdjustingStyle.Calculate || this.AdjustingStyle === TuLinkAdjustingStyle.Scale && this.Orthogonal) {
                this.updateRoute();
            }
            this.portsOnLinkChanged(subhint, oldI, oldVal, oldRect, newI, newVal, newRect);
            return;
        }
        if (subhint === 2211) {
            this.updateRoute();
            return;
        }
        if (subhint !== 1702) {
            const goObject: TuPort = as(port.TuObject, Types.TuPort);
            if (goObject != null && subhint === 1703 && goObject.Style === TuPortStyle.Object) {
                return;
            }
            if (goObject != null && goObject === this.FromPort && this.PointsCount > 0) {
                const fromLinkPoint: CGPoint = goObject.getFromLinkPoint(this.AbstractLink);
                const point: CGPoint = this.getPoint(0);
                if (!super.IsApprox(fromLinkPoint.X, point.X) || !super.IsApprox(fromLinkPoint.Y, point.Y)) {
                    this.updateRoute();
                    return;
                }
            }
            else if (goObject == null || goObject !== this.ToPort || this.PointsCount < 2) {
                this.updateRoute();
            }
            else {
                const toLinkPoint: CGPoint = goObject.getToLinkPoint(this.AbstractLink);
                const pointF: CGPoint = this.getPoint(this.PointsCount - 1);
                if (!super.IsApprox(toLinkPoint.X, pointF.X) || !super.IsApprox(toLinkPoint.Y, pointF.Y)) {
                    this.updateRoute();
                    return;
                }
            }
        }
    }

    public /* virtual */ portsOnLinkChanged(subhint: number, oldI: number, oldVal: any, oldRect: CGRectangle, newI: number, newVal: any, newRect: CGRectangle): void {
        if (this.FromPort != null) {
            this.FromPort.onLinkChanged(this, subhint, oldI, oldVal, oldRect, newI, newVal, newRect);
        }
        if (this.ToPort != null) {
            this.ToPort.onLinkChanged(this, subhint, oldI, oldVal, oldRect, newI, newVal, newRect);
        }
    }

    protected /* virtual */ rescalePoints(startIndex: number, newFromPoint: CGPoint, endIndex: number, newToPoint: CGPoint): boolean {
        let num: number;
        let num1: number;
        let num2: number;
        const point: CGPoint = this.getPoint(startIndex);
        const pointF: CGPoint = this.getPoint(endIndex);
        if (point === newFromPoint && pointF === newToPoint) {
            return true;
        }
        const x: number = point.X;
        const y: number = point.Y;
        const x1: number = pointF.X;
        const y1: number = pointF.Y;
        let x2: number = x1 - x;
        let y2: number = y1 - y;
        const num3: number = x2;
        const num4: number = y2;
        const num5: number = Math.sqrt(num3 * num3 + num4 * num4);
        if (super.IsApprox(num5, 0)) {
            return true;
        }
        if (!super.IsApprox(x2, 0)) {
            num = Math.atan(y2 / Math.abs(x2));
            if (x2 < 0) {
                num = 3.14159265358979 - num;
            }
        }
        else {
            num = (y2 >= 0 ? 1.5707963267949 : -1.5707963267949);
        }
        const x3: number = newFromPoint.X;
        const y3: number = newFromPoint.Y;
        const x4: number = newToPoint.X;
        const y4: number = newToPoint.Y;
        const num6: number = x4 - x3;
        const num7: number = y4 - y3;
        const num8: number = num6;
        const num9: number = num7;
        const num10: number = Math.sqrt(num8 * num8 + num9 * num9);
        if (!super.IsApprox(num6, 0)) {
            num1 = Math.atan(num7 / Math.abs(num6));
            if (num6 < 0) {
                num1 = 3.14159265358979 - num1;
            }
        }
        else {
            num1 = (num7 >= 0 ? 1.5707963267949 : -1.5707963267949);
        }
        const num11: number = num10 / num5;
        const num12: number = num1 - num;
        this.setPoint(startIndex, newFromPoint);
        for (let i = startIndex + 1; i < endIndex; i = i + 1) {
            const point1: CGPoint = this.getPoint(i);
            x2 = point1.X - x;
            y2 = point1.Y - y;
            const num13: number = x2;
            const num14: number = y2;
            const num15: number = Math.sqrt(num13 * num13 + num14 * num14);
            if (!super.IsApprox(num15, 0)) {
                if (!super.IsApprox(x2, 0)) {
                    num2 = Math.atan(y2 / Math.abs(x2));
                    if (x2 < 0) {
                        num2 = 3.14159265358979 - num2;
                    }
                }
                else {
                    num2 = (y2 >= 0 ? 1.5707963267949 : -1.5707963267949);
                }
                const num16: number = num2 + num12;
                const num17: number = num15 * num11;
                const num18: number = x3 + num17 * Math.cos(num16);
                const num19: number = y3 + num17 * Math.sin(num16);
                this.setPoint(i, new CGPoint(num18, num19));
            }
        }
        this.setPoint(endIndex, newToPoint);
        return true;
    }

    protected /* virtual */ stretchPoints(startIndex: number, newFromPoint: CGPoint, endIndex: number, newToPoint: CGPoint): boolean {
        const point: CGPoint = this.getPoint(startIndex);
        const pointF: CGPoint = this.getPoint(endIndex);
        if (point === newFromPoint && pointF === newToPoint) {
            return true;
        }
        const x: number = point.X;
        const y: number = point.Y;
        const num: number = pointF.X;
        const y1: number = pointF.Y;
        const num1: number = (num - x) * (num - x) + (y1 - y) * (y1 - y);
        const x1: number = newFromPoint.X;
        const y2: number = newFromPoint.Y;
        const x2: number = newToPoint.X;
        const num2: number = newToPoint.Y;
        let num3: number = 0;
        let num4: number = 1;
        num3 = (x2 - x1 == 0 ? 9000000000 : (num2 - y2) / (x2 - x1));
        if (num3 != 0) {
            const num5: number = num3;
            num4 = Math.sqrt(1 + 1 / (num5 * num5));
        }
        this.setPoint(startIndex, newFromPoint);
        for (let i = (startIndex + 1); i < endIndex; i = (i + 1)) {
            const point1: CGPoint = this.getPoint(i);
            const x3: float = point1.X;
            const y3: float = point1.Y;
            let num6: float = 0.5;
            if (num1 !== 0) {
                num6 = ((x - x3) * (x - num) + (y - y3) * (y - y1)) / num1;
            }
            const num7: float = x + num6 * (num - x);
            const num8: float = y + num6 * (y1 - y);
            let num9: float = Math.sqrt((x3 - num7) * (x3 - num7) + (y3 - num8) * (y3 - num8));
            if (y3 < num3 * (x3 - num7) + num8) {
                num9 = -num9;
            }
            if (num3 > 0) {
                num9 = -num9;
            }
            const num10: float = x1 + num6 * (x2 - x1);
            const num11: float = y2 + num6 * (num2 - y2);
            if (num3 === 0) {
                this.setPoint(i, new CGPoint(num10, num11 + num9));
            }
            else {
                const num12: float = num10 + num9 / num4;
                const num13: float = num11 - (num12 - num10) / num3;
                this.setPoint(i, new CGPoint(num12, num13));
            }
        }
        this.setPoint(endIndex, newToPoint);
        return true;
    }

    private traversePositions(positions: TuPositionArray, px: float, py: float, dir: float, first: boolean): void {
        const cellSize: CGSize = positions.CellSize;
        let dist: number = positions.getDist(px, py);
        let single: float = px;
        let single1: float = py;
        let width: float = single;
        let height: float = single1;
        if (dir === 0) {
            width += cellSize.Width;
        }
        else if (dir === 90) {
            height += cellSize.Height;
        }
        else if (dir !== 180) {
            height -= cellSize.Height;
        }
        else {
            width -= cellSize.Width;
        }
        while (dist > 1 && positions.getDist(width, height) === dist - 1) {
            single = width;
            single1 = height;
            if (dir === 0) {
                width += cellSize.Width;
            }
            else if (dir === 90) {
                height += cellSize.Height;
            }
            else if (dir !== 180) {
                height -= cellSize.Height;
            }
            else {
                width -= cellSize.Width;
            }
            dist = dist - 1;
        }
        if (!first) {
            single = Math.floor((single / cellSize.Width)) * cellSize.Width + cellSize.Width / 2;
            single1 = Math.floor((single1 / cellSize.Height)) * cellSize.Height + cellSize.Height / 2;
        }
        else if (dist > 1) {
            if (dir === 180 || dir === 0) {
                single = Math.floor((single / cellSize.Width)) * cellSize.Width + cellSize.Width / 2;
            }
            else if (dir === 90 || dir === 270) {
                single1 = Math.floor((single1 / cellSize.Height)) * cellSize.Height + cellSize.Height / 2;
            }
        }
        if (dist > 1) {
            let single2: float = dir;
            let width1: float = single;
            let height1: float = single1;
            if (dir === 0) {
                single2 = 90;
                height1 += cellSize.Height;
            }
            else if (dir === 90) {
                single2 = 180;
                width1 -= cellSize.Width;
            }
            else if (dir === 180) {
                single2 = 270;
                height1 -= cellSize.Height;
            }
            else if (dir === 270) {
                single2 = 0;
                width1 += cellSize.Width;
            }
            if (positions.getDist(width1, height1) !== (dist - 1)) {
                let width2: float = single;
                let height2: float = single1;
                if (dir === 0) {
                    single2 = 270;
                    height2 -= cellSize.Height;
                }
                else if (dir === 90) {
                    single2 = 0;
                    width2 += cellSize.Width;
                }
                else if (dir === 180) {
                    single2 = 90;
                    height2 += cellSize.Height;
                }
                else if (dir === 270) {
                    single2 = 180;
                    width2 -= cellSize.Width;
                }
                if (positions.getDist(width2, height2) === (dist - 1)) {
                    this.traversePositions(positions, width2, height2, single2, false);
                }
            }
            else {
                this.traversePositions(positions, width1, height1, single2, false);
            }
        }
        super.addPoint(single, single1);
    }


    public /* virtual */ unlink(): void {
        this.AbstractLink.TuObject.Remove();
    }

    public /* virtual */  updateRoute(): void {
        const document: TuDocument = this.Document;
        if (document == null) {
            this.calculateRoute();
            return;
        }
        let abstractLink: ITuRoutable = as(this.AbstractLink, Types.ITuRoutable);
        if (abstractLink == null) {
            abstractLink = this;
        }
        document.UpdateRoute(abstractLink);
    }
}
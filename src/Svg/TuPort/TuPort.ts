import { CGPoint, CGRectangle, CGSize } from '@tuval/cg';
import { TuPortEvents } from './TuPortEvents';
import { TuPortStyle } from './TuPortStyle';
import { ITuIdentifiablePart } from './../ITuIdentifiablePart';
import { ITuGraphPart } from './../ITuGraphPart';
import { ITuPort } from './../ITuPort';
import { Types } from './../types';
import { ClassInfo, List, float, foreach, CONTINUE, error, as, New, Out, is } from '@tuval/core';
import { TuShape } from '../TuShape/TuShape';
import { BottomLeft, BottomRight, Middle, MiddleBottom, MiddleLeft, MiddleRight, MiddleTop, NoSpot, Spot, TopLeft, TopRight } from '../Spot';
import { ITuLink } from '../ITuLink';
import { Brushes_Black, NullRect } from '../Globals';
import { TuPortFilteredLinkEnumerator } from './TuPortFilteredLinkEnumerator';
import { GeomUtilities } from '../GeomUtilities';
import { TuPortLinkEnumerator } from './TuPortLinkEnumerator';
import { ITuNode } from '../TuNode/ITuNode';
import { TuChangedEventArgs } from '../TuChangedEventArgs';
import { ITuLayerCollectionContainer } from '../TuLayer/ITuLayerCollectionContainer';
import { TuCopyDictionary } from '../TuCopyDictionary';
import { TuDocumentValidCycle } from '../TuDocument/TuDocumentValidCycle';
import { TuDocument } from '../TuDocument/TuDocument';
import { TuView } from '../TuView/TuView';
import { TuLink } from '../TuLink/TuLink';
import { TuSubGraph } from '../TuSubGraph/TuSubGraph';
import { TuObject } from '../TuObject/TuObject';
import { TuSubGraphState } from '../TuSubGraph/TuSubGraphState';
import { TuLabeledLink } from '../TuLabeledLink/TuLabeledLink';
import { TuObjectEvents } from '../TuObjectEvents';
import { GraphicsPath, FillMode, Graphics } from '@tuval/graphics';
import { TuLayer } from '../TuLayer/TuLayer';
import { Orientation } from '../Forms/Orientation';

type TuMultiTextNode = any;
type TuBoxPort = any;
type TuGeneralNode = any;
type TuGeneralNodePort = any;

const flagValidFrom: number = 1048576;
const flagValidTo: number = 2097152;
const flagValidSelfNode: number = 4194304;
const flagValidDuplicateLinks: number = 8388608;
const flagRecursive: number = 16777216;
const flagClearsLinksWhenRemoved: number = 33554432;
const flagNoClearLinks: number = 67108864;
const flagValidSingleLink: number = 134217728;
const flagInsideCollapsedSubGraph: number = 268435456;

@ClassInfo({
    fullName: Types.TuPort,
    name: 'TuObject',
    instanceof: [
        Types.TuPort,
        Types.ITuPort,
        Types.ITuGraphPart,
        Types.ITuIdentifiablePart
    ]
})
export class TuPort extends TuShape implements ITuPort, ITuGraphPart, ITuIdentifiablePart {


    private static myLinksRedirectedToSubGraphPort: boolean = false;
    private myStyle: TuPortStyle = TuPortStyle.Ellipse;
    private myPortObject: TuObject;
    private myFromLinkSpot: Spot = MiddleRight;
    private myToLinkSpot: Spot = MiddleLeft;
    private myLinks: List<ITuLink> = new List<ITuLink>();
    private myUserFlags: number = 0;
    private myUserObject: any;
    private myPartID: number = -1;
    private myEndSegmentLength: float = 10;


    //#region [Property] ClearsLinksWhenRemoved
    public get ClearsLinksWhenRemoved(): boolean {
        return this.getClearsLinksWhenRemoved();
    }
    public set ClearsLinksWhenRemoved(value: boolean) {
        this.setClearsLinksWhenRemoved(value);
    }

    protected /*virtual*/ getClearsLinksWhenRemoved(): boolean {
        return (this.InternalFlags & flagClearsLinksWhenRemoved) !== 0;
    }
    protected /*virtual*/ setClearsLinksWhenRemoved(value: boolean) {
        const internalFlags: boolean = (this.InternalFlags & flagClearsLinksWhenRemoved) !== 0;
        if (internalFlags !== value) {
            if (!value) {
                this.InternalFlags = this.InternalFlags & ~flagClearsLinksWhenRemoved;
            }
            else {
                this.InternalFlags = this.InternalFlags | flagClearsLinksWhenRemoved;
            }
            this.Changed(TuPortEvents.ChangedClearsLinksWhenRemoved, 0, internalFlags, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] DestinationLinks
    public get DestinationLinks(): TuPortFilteredLinkEnumerator {
        return this.getDestinationLinks();
    }


    protected /*virtual*/ getDestinationLinks(): TuPortFilteredLinkEnumerator {
        return new TuPortFilteredLinkEnumerator(this, this.myLinks, true);
    }
    //#endregion

    //#region [Property] DestinationLinksCount
    public get DestinationLinksCount(): number {
        return this.getDestinationLinksCount();
    }


    protected /*virtual*/ getDestinationLinksCount(): number {
        let int32 = 0;
        foreach(this.DestinationLinks, (destinationLink: ITuLink) => {
            if (destinationLink == null) {
                return CONTINUE;
            }
            int32++;
        });
        return int32;
    }
    //#endregion

    //#region [Property] EndSegmentLength
    public get EndSegmentLength(): number {
        return this.getEndSegmentLength();
    }
    public set EndSegmentLength(value: number) {
        this.setEndSegmentLength(value);
    }

    protected /*virtual*/ getEndSegmentLength(): number {
        return this.myEndSegmentLength;
    }
    protected /*virtual*/ setEndSegmentLength(value: number) {
        const single: float = this.myEndSegmentLength;
        if (single != value) {
            this.myEndSegmentLength = value;
            this.Changed(TuPortEvents.ChangedEndSegmentLength, 0, undefined, GeomUtilities.MakeRect(single), 0, undefined, GeomUtilities.MakeRect(value));
            if (!this.Initializing) {
                this.linksOnPortChanged(TuPortEvents.ChangedEndSegmentLength, 0, undefined, GeomUtilities.MakeRect(single), 0, undefined, GeomUtilities.MakeRect(value));
            }
        }

    }
    //#endregion

    //#region [Property] FromSpot
    public get FromSpot(): Spot {
        return this.getFromSpot();
    }
    public set FromSpot(value: Spot) {
        this.setFromSpot(value);
    }

    protected /*virtual*/ getFromSpot(): Spot {
        return this.myFromLinkSpot;
    }
    protected /*virtual*/ setFromSpot(value: Spot) {
        const int32: Spot = this.myFromLinkSpot;
        if (int32 !== value) {
            this.myFromLinkSpot = value;
            this.Changed(TuPortEvents.ChangedFromSpot, 0, int32, NullRect, 0, value, NullRect);
            if (!this.Initializing) {
                this.linksOnPortChanged(TuPortEvents.ChangedFromSpot, 0, int32, NullRect, 0, value, NullRect);
            }
        }

    }
    //#endregion

    //#region [Property] NodeObject
    public get TuObject(): TuObject {
        return this.getTuObject();
    }
    public set TuObject(value: TuObject) {
        this.setTuObject(value);
    }

    protected /*virtual*/ getTuObject(): TuObject {
        return this;
    }
    protected /*virtual*/ setTuObject(value: TuObject) {
        throw error('You can not set Port.TuObject.');
    }
    //#endregion

    //#region [Property] InsideCollapsedSubGraph
    public get InsideCollapsedSubGraph(): boolean {
        return this.getInsideCollapsedSubGraph();
    }
    public set InsideCollapsedSubGraph(value: boolean) {
        this.setInsideCollapsedSubGraph(value);
    }

    protected /*virtual*/ getInsideCollapsedSubGraph(): boolean {
        return (this.InternalFlags & flagInsideCollapsedSubGraph) !== 0;
    }
    protected /*virtual*/ setInsideCollapsedSubGraph(value: boolean) {
        if ((this.InternalFlags & flagInsideCollapsedSubGraph) !== 0 !== value) {
            if (value) {
                this.InternalFlags = this.InternalFlags | flagInsideCollapsedSubGraph;
                return;
            }
            this.InternalFlags = this.InternalFlags & ~flagInsideCollapsedSubGraph;
        }
    }
    //#endregion

    //#region [Property] IsValidDuplicateLinks
    public get IsValidDuplicateLinks(): boolean {
        return this.getIsValidDuplicateLinks();
    }
    public set IsValidDuplicateLinks(value: boolean) {
        this.setIsValidDuplicateLinks(value);
    }

    protected /*virtual*/ getIsValidDuplicateLinks(): boolean {
        return (this.InternalFlags & flagValidDuplicateLinks) != 0;
    }
    protected /*virtual*/ setIsValidDuplicateLinks(value: boolean) {
        const internalFlags: boolean = (this.InternalFlags & flagValidDuplicateLinks) !== 0;
        if (internalFlags != value) {
            if (!value) {
                this.InternalFlags = this.InternalFlags & ~flagValidDuplicateLinks;
            }
            else {
                this.InternalFlags = this.InternalFlags | flagValidDuplicateLinks;
            }
            this.Changed(TuPortEvents.ChangedValidDuplicateLinks, 0, internalFlags, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] IsValidFrom
    public get IsValidFrom(): boolean {
        return this.getIsValidFrom();
    }
    public set IsValidFrom(value: boolean) {
        this.setIsValidFrom(value);
    }

    protected /*virtual*/ getIsValidFrom(): boolean {
        return (this.InternalFlags & flagValidFrom) !== 0;
    }
    protected /*virtual*/ setIsValidFrom(value: boolean) {
        const internalFlags: boolean = (this.InternalFlags & flagValidFrom) !== 0;
        if (internalFlags != value) {
            if (!value) {
                this.InternalFlags = this.InternalFlags & ~flagValidFrom;
            }
            else {
                this.InternalFlags = this.InternalFlags | flagValidFrom;
            }
            this.Changed(TuPortEvents.ChangedValidFrom, 0, internalFlags, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] IsValidSelfNode
    public get IsValidSelfNode(): boolean {
        return this.getIsValidSelfNode();
    }
    public set IsValidSelfNode(value: boolean) {
        this.setIsValidSelfNode(value);
    }

    protected /*virtual*/ getIsValidSelfNode(): boolean {
        return (this.InternalFlags & flagValidSelfNode) !== 0;
    }
    protected /*virtual*/ setIsValidSelfNode(value: boolean) {
        const internalFlags: boolean = (this.InternalFlags & flagValidSelfNode) != 0;
        if (internalFlags != value) {
            if (!value) {
                this.InternalFlags = this.InternalFlags & ~flagValidSelfNode;
            }
            else {
                this.InternalFlags = this.InternalFlags | flagValidSelfNode;
            }
            this.Changed(TuPortEvents.ChangedValidSelfNode, 0, internalFlags, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] IsValidSingleLink
    public get IsValidSingleLink(): boolean {
        return this.getIsValidSingleLink();
    }
    public set IsValidSingleLink(value: boolean) {
        this.setIsValidSingleLink(value);
    }

    protected /*virtual*/ getIsValidSingleLink(): boolean {
        return (this.InternalFlags & flagValidSingleLink) !== 0;
    }
    protected /*virtual*/ setIsValidSingleLink(value: boolean) {
        const internalFlags: boolean = (this.InternalFlags & flagValidSingleLink) !== 0;
        if (internalFlags !== value) {
            if (!value) {
                this.InternalFlags = this.InternalFlags & ~flagValidSingleLink;
            }
            else {
                this.InternalFlags = this.InternalFlags | flagValidSingleLink;
            }
            this.Changed(TuPortEvents.ChangedValidSingleLink, 0, internalFlags, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] IsValidTo
    public get IsValidTo(): boolean {
        return this.getIsValidTo();
    }
    public set IsValidTo(value: boolean) {
        this.setIsValidTo(value);
    }

    protected /*virtual*/ getIsValidTo(): boolean {
        return (this.InternalFlags & flagValidTo) !== 0;
    }
    protected /*virtual*/ setIsValidTo(value: boolean) {
        const internalFlags: boolean = (this.InternalFlags & flagValidTo) !== 0;
        if (internalFlags !== value) {
            if (!value) {
                this.InternalFlags = this.InternalFlags & ~flagValidTo;
            }
            else {
                this.InternalFlags = this.InternalFlags | flagValidTo;
            }
            this.Changed(TuPortEvents.ChangedValidTo, 0, internalFlags, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] Links
    public get Links(): TuPortLinkEnumerator {
        return this.getLinks();
    }

    protected /*virtual*/ getLinks(): TuPortLinkEnumerator {
        return new TuPortLinkEnumerator(this.myLinks);
    }
    //#endregion

    //#region [Property] LinksCount
    public get LinksCount(): number {
        return this.getLinksCount();
    }

    protected /*virtual*/ getLinksCount(): number {
        return this.myLinks.Count;
    }
    //#endregion

    //#region [Property] LinksRedirectedToSubGraphPort
    public static get LinksRedirectedToSubGraphPort(): boolean {
        return this.getLinksRedirectedToSubGraphPort();
    }

    public static set LinksRedirectedToSubGraphPort(value: boolean) {
        this.setLinksRedirectedToSubGraphPort(value);
    }

    protected static getLinksRedirectedToSubGraphPort(): boolean {
        return TuPort.myLinksRedirectedToSubGraphPort;
    }
    protected static setLinksRedirectedToSubGraphPort(value: boolean) {
        TuPort.myLinksRedirectedToSubGraphPort = value;
    }
    //#endregion

    //#region [Property] NoClearLinks
    /* internal */ get NoClearLinks(): boolean {
        return this.getNoClearLinks();
    }
    /* internal */ set NoClearLinks(value: boolean) {
        this.setNoClearLinks(value);
    }

    protected /*virtual*/ getNoClearLinks(): boolean {
        return (this.InternalFlags & flagNoClearLinks) !== 0;
    }
    protected /*virtual*/ setNoClearLinks(value: boolean) {
        if (value) {
            this.InternalFlags = this.InternalFlags | flagNoClearLinks;
            return;
        }
        this.InternalFlags = this.InternalFlags & ~flagNoClearLinks;
    }
    //#endregion

    //#region [Property] Node
    public get Node(): ITuNode {
        return this.getNode();
    }

    protected /*virtual*/ getNode(): ITuNode {
        return TuPort.FindParentNode(this);
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

    protected /*virtual*/ setPartID(value: number): TuPort {
        const int32 = this.myPartID;
        if (int32 !== value) {
            this.myPartID = value;
            this.Changed(TuPortEvents.ChangedPartID, int32, undefined, NullRect, value, undefined, NullRect);
        }
        return this;
    }
    //#endregion

    //#region [Property] PortObject
    public get PortObject(): TuObject {
        return this.getPortObject();
    }

    public set PortObject(value: TuObject) {
        this.setPortObject(value);
    }

    protected /*virtual*/ getPortObject(): TuObject {
        return this.myPortObject;
    }

    protected /*virtual*/ setPortObject(value: TuObject): TuPort {
        const goObject: TuObject = this.myPortObject;
        if (goObject !== value) {
            this.myPortObject = value;
            this.Changed(TuPortEvents.ChangedObject, 0, goObject, NullRect, 0, value, NullRect);
            if (!this.Initializing) {
                this.linksOnPortChanged(TuPortEvents.ChangedObject, 0, goObject, NullRect, 0, value, NullRect);
            }
        }
        return this;
    }
    //#endregion

    //#region [Property] SourceLinks
    public get SourceLinks(): TuPortFilteredLinkEnumerator {
        return this.getSourceLinks();
    }


    protected /*virtual*/ getSourceLinks(): TuPortFilteredLinkEnumerator {
        return new TuPortFilteredLinkEnumerator(this, this.myLinks, false);
    }
    //#endregion

    //#region [Property] DestinationLinksCount
    public get SourceLinksCount(): number {
        return this.getSourceLinksCount();
    }


    protected /*virtual*/ getSourceLinksCount(): number {
        let int32 = 0;
        foreach(this.SourceLinks, (sourceLink: ITuLink) => {
            if (sourceLink == null) {
                return;
            }
            int32++;
        });
        return int32;
    }
    //#endregion

    //#region [Property] Style
    public get Style(): TuPortStyle {
        return this.getStyle();
    }
    public set Style(value: TuPortStyle) {
        this.setStyle(value);
    }

    protected /*virtual*/ getStyle(): TuPortStyle {
        return this.myStyle;
    }
    protected /*virtual*/ setStyle(value: TuPortStyle) {
        const goPortStyle: TuPortStyle = this.myStyle;
        if (goPortStyle !== value) {
            this.myStyle = value;
            this.Changed(TuPortEvents.ChangedStyle, goPortStyle, undefined, NullRect, value, undefined, NullRect);
            if (!this.Initializing) {
                this.linksOnPortChanged(TuPortEvents.ChangedStyle, goPortStyle, undefined, NullRect, value, undefined, NullRect);
            }
        }

    }
    protected /*virtual*/ style(value?: number): number { throw error('Will Implement getter and setters'); }
    //#endregion

    //#region [Property] ToSpot
    public get ToSpot(): Spot {
        return this.getToSpot();
    }
    public set ToSpot(value: Spot) {
        this.setToSpot(value);
    }

    protected /*virtual*/ getToSpot(): Spot {
        return this.myToLinkSpot;
    }
    protected /*virtual*/ setToSpot(value: Spot) {
        const int32: Spot = this.myToLinkSpot;
        if (int32 !== value) {
            this.myToLinkSpot = value;
            this.Changed(TuPortEvents.ChangedToSpot, 0, int32, NullRect, 0, value, NullRect);
            if (!this.Initializing) {
                this.linksOnPortChanged(TuPortEvents.ChangedToSpot, 0, int32, NullRect, 0, value, NullRect);
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

    protected /*virtual*/ setUserFlags(value: number): TuPort {
        const int32 = this.myUserFlags;
        if (int32 !== value) {
            this.myUserFlags = value;
            this.Changed(TuPortEvents.ChangedPortUserFlags, int32, undefined, NullRect, value, undefined, NullRect);
        }
        return this;
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
        const int32 = this.myUserObject;
        if (int32 !== value) {
            this.myUserObject = value;
            this.Changed(TuPortEvents.ChangedPortUserObject, int32, undefined, NullRect, value, undefined, NullRect);
        }
        return this;
    }
    //#endregion

    constructor() {
        super();
        this.InternalFlags = this.InternalFlags & -19;
        this.InternalFlags = this.InternalFlags | 36700160;
        this.Brush = Brushes_Black;
    }


    public /*virtual*/  addDestinationLink(link: ITuLink): void {
        link.FromPort = this;
        if (link.FromPort === this) {
            this.internalAddLink(link, false);
        }
    }

    public /*virtual*/ addSourceLink(link: ITuLink): void {
        link.ToPort = this;
        if (link.ToPort === this) {
            this.internalAddLink(link, false);
        }
    }

    public /*virtual*/ canLinkFrom(): boolean {
        if (!this.IsValidFrom) {
            return false;
        }
        if (this.IsValidSingleLink && this.LinksCount >= 1) {
            return false;
        }
        if (!this.CanView()) {
            return false;
        }
        if (this.Layer != null && !this.Layer.CanLinkObjects()) {
            return false;
        }
        return true;
    }

    public /*virtual*/ canLinkTo(): boolean {
        if (!this.IsValidTo) {
            return false;
        }
        if (this.IsValidSingleLink && this.LinksCount >= 1) {
            return false;
        }
        if (!this.CanView()) {
            return false;
        }
        if (this.Layer != null && !this.Layer.CanLinkObjects()) {
            return false;
        }
        return true;
    }

    public /*override*/ ChangeValue(e: TuChangedEventArgs, undo: boolean): void {
        switch (e.SubHint) {
            case TuPortEvents.ChangedPortUserFlags:
                {
                    this.UserFlags = e.getFloat(undo);
                    return;
                }
            case TuPortEvents.ChangedPortUserObject:
                {
                    this.UserObject = e.getValue(undo);
                    return;
                }
            case TuPortEvents.ChangedStyle:
                {
                    this.Style = e.getValue(undo);
                    return;
                }
            case TuPortEvents.ChangedObject:
                {
                    this.PortObject = e.getValue(undo);
                    return;
                }
            case TuPortEvents.ChangedValidFrom:
                {
                    this.IsValidFrom = e.getValue(undo);
                    return;
                }
            case TuPortEvents.ChangedValidTo:
                {
                    this.IsValidTo = e.getValue(undo);
                    return;
                }
            case TuPortEvents.ChangedValidSelfNode:
                {
                    this.IsValidSelfNode = e.getValue(undo);
                    return;
                }
            case TuPortEvents.ChangedFromSpot:
                {
                    this.FromSpot = e.getValue(undo);
                    return;
                }
            case TuPortEvents.ChangedToSpot:
                {
                    this.ToSpot = e.getValue(undo);
                    return;
                }
            case TuPortEvents.ChangedAddedLink:
                {
                    const oldValue: ITuLink = as(e.OldValue, Types.ITuLink);
                    if (undo) {
                        this.internalRemoveLink(oldValue, true);
                        return;
                    }
                    this.internalAddLink(oldValue, true);
                    return;
                }
            case TuPortEvents.ChangedRemovedLink:
                {
                    const goLink: ITuLink = as(e.OldValue, Types.ITuLink);
                    if (undo) {
                        this.internalAddLink(goLink, true);
                        return;
                    }
                    this.internalRemoveLink(goLink, true);
                    return;
                }
            case TuPortEvents.ChangedValidDuplicateLinks:
                {
                    this.IsValidDuplicateLinks = e.getValue(undo);
                    return;
                }
            case TuPortEvents.ChangedEndSegmentLength:
                {
                    this.EndSegmentLength = e.getFloat(undo);
                    return;
                }
            case TuPortEvents.ChangedPartID:
                {
                    this.PartID = e.getFloat(undo);
                    return;
                }
            case TuPortEvents.ChangedClearsLinksWhenRemoved:
                {
                    this.ClearsLinksWhenRemoved = e.getValue(undo);
                    return;
                }
            case TuPortEvents.ChangedValidSingleLink:
                {
                    this.IsValidSingleLink = e.getValue(undo);
                    return;
                }
        }
        super.ChangeValue(e, undo);
    }

    public /*virtual*/ clearLinks(): void {
        this._clearLinks(undefined);
    }

    private _clearLinks(mainObj: TuObject): void {
        let layerCollectionContainer: ITuLayerCollectionContainer;
        if (this.Layer != null) {
            layerCollectionContainer = this.Layer.LayerCollectionContainer;
        }
        else {
            layerCollectionContainer = undefined;
        }
        const goLayerCollectionContainer: ITuLayerCollectionContainer = layerCollectionContainer;
        let count = this.myLinks.Count;
        while (count > 0) {
            const goLinks: List<ITuLink> = this.myLinks;
            const int32 = count - 1;
            count = int32;
            const item: ITuLink = goLinks[int32];
            const goObject: TuObject = item.TuObject;
            if (goObject != null && goObject.Layer != null &&
                (goObject.Layer.LayerCollectionContainer !== goLayerCollectionContainer || mainObj != null &&
                    (goObject.isChildOf(mainObj) || goObject.Movable))) {
                continue;
            }
            item.unlink();
            count = Math.min(count, this.myLinks.Count);
        }
    }

    private computeTrianglePoints(v: CGPoint[]) {
        const bounds = this.Bounds.clone();
        let toSpot: Spot = Middle;
        let style: TuPortStyle = this.Style;
        if (style !== TuPortStyle.Triangle) {
            switch (style) {
                case TuPortStyle.TriangleTopLeft:
                    {
                        toSpot = BottomRight;
                        break;
                    }
                case TuPortStyle.TriangleTopRight:
                    {
                        toSpot = BottomLeft;
                        break;
                    }
                case TuPortStyle.TriangleBottomRight:
                    {
                        toSpot = TopLeft;
                        break;
                    }
                case TuPortStyle.TriangleBottomLeft:
                    {
                        toSpot = TopRight;
                        break;
                    }
                case TuPortStyle.TriangleMiddleTop:
                    {
                        toSpot = MiddleBottom;
                        break;
                    }
                case TuPortStyle.TriangleMiddleRight:
                    {
                        toSpot = MiddleLeft;
                        break;
                    }
                case TuPortStyle.TriangleMiddleBottom:
                    {
                        toSpot = MiddleTop;
                        break;
                    }
                case TuPortStyle.TriangleMiddleLeft:
                    {
                        toSpot = MiddleRight;
                        break;
                    }
                default:
                    {
                        toSpot = this.ToSpot;
                    }
            }
        }
        else {
            toSpot = this.ToSpot;
        }
        if (toSpot.ID <= BottomLeft.ID) {
            switch (toSpot) {
                case Middle:
                case TopLeft:
                    {
                        v[0].X = bounds.X + bounds.Width / 2;
                        v[0].Y = bounds.Y;
                        v[1].X = bounds.X + bounds.Width;
                        v[1].Y = bounds.Y + bounds.Height;
                        v[2].X = bounds.X;
                        v[2].Y = bounds.Y + bounds.Height / 2;
                        return;
                    }
                case TopRight:
                    {
                        v[0].X = bounds.X + bounds.Width;
                        v[0].Y = bounds.Y + bounds.Height / 2;
                        v[1].X = bounds.X;
                        v[1].Y = bounds.Y + bounds.Height;
                        v[2].X = bounds.X + bounds.Width / 2;
                        v[2].Y = bounds.Y;
                        return;
                    }
                case BottomRight:
                    {
                        v[0].X = bounds.X + bounds.Width / 2;
                        v[0].Y = bounds.Y + bounds.Height;
                        v[1].X = bounds.X;
                        v[1].Y = bounds.Y;
                        v[2].X = bounds.X + bounds.Width;
                        v[2].Y = bounds.Y + bounds.Height / 2;
                        return;
                    }
                case BottomLeft:
                    {
                        v[0].X = bounds.X;
                        v[0].Y = bounds.Y + bounds.Height / 2;
                        v[1].X = bounds.X + bounds.Width;
                        v[1].Y = bounds.Y;
                        v[2].X = bounds.X + bounds.Width / 2;
                        v[2].Y = bounds.Y + bounds.Height;
                        return;
                    }
            }
        }
        else if (toSpot.ID > MiddleRight.ID) {
            if (toSpot === MiddleBottom) {
                v[0].X = bounds.X;
                v[0].Y = bounds.Y + bounds.Height;
                v[1].X = bounds.X + bounds.Width / 2;
                v[1].Y = bounds.Y;
                v[2].X = bounds.X + bounds.Width;
                v[2].Y = bounds.Y + bounds.Height;
                return;
            }
        }
        else {
            if (toSpot === MiddleTop) {
                v[0].X = bounds.X + bounds.Width;
                v[0].Y = bounds.Y;
                v[1].X = bounds.X + bounds.Width / 2;
                v[1].Y = bounds.Y + bounds.Height;
                v[2].X = bounds.X;
                v[2].Y = bounds.Y;
                return;
            }
            if (toSpot === MiddleRight) {
                v[0].X = bounds.X + bounds.Width;
                v[0].Y = bounds.Y + bounds.Height;
                v[1].X = bounds.X;
                v[1].Y = bounds.Y + bounds.Height / 2;
                v[2].X = bounds.X + bounds.Width;
                v[2].Y = bounds.Y;
                return;
            }
        }
        v[0].X = bounds.X;
        v[0].Y = bounds.Y;
        v[1].X = bounds.X + bounds.Width;
        v[1].Y = bounds.Y + bounds.Height / 2;
        v[2].X = bounds.X;
        v[2].Y = bounds.Y + bounds.Height;
        return;
    }

    public /*virtual*/ containsLink(l: ITuLink): boolean {
        return this.myLinks.Contains(l);
    }

    public /*virtual*/ copyLinksArray(): ITuLink[] {
        return this.myLinks.ToArray();
    }

    public /*virtual*/ copyObject(env: TuCopyDictionary): TuObject {
        const goLinks: TuPort = as(super.copyObject(env), Types.TuPort);
        if (goLinks != null) {
            goLinks.myLinks = new List<ITuLink>();
            goLinks.myPartID = -1;
            if (this.myPortObject != null) {
                env.Delayeds.Add(this);
            }
        }
        return goLinks;
    }

    public /*override*/ CopyObjectDelayed(env: TuCopyDictionary, newobj: TuObject) {
        super.CopyObjectDelayed(env, newobj);
        const goPort: TuPort = as(newobj, Types.TuPort);
        const item: TuObject = as(env.Get(this.myPortObject), Types.TuObject);
        if (item != null) {
            goPort.myPortObject = item;
        }
    }

    private cycleOK(toPort: ITuPort): boolean {
        const document = this.Document;
        if (document == null) {
            return true;
        }
        switch (document.ValidCycle) {
            case TuDocumentValidCycle.NotDirected:
                {
                    return !TuDocument.MakesDirectedCycle(this.Node, toPort.Node);
                }
            case TuDocumentValidCycle.NotDirectedFast:
                {
                    return !TuDocument.MakesDirectedCycleFast(this.Node, toPort.Node);
                }
            case TuDocumentValidCycle.NotUndirected:
                {
                    return !TuDocument.MakesUndirectedCycle(this.Node, toPort.Node);
                }
            case TuDocumentValidCycle.DestinationTree:
                {
                    if (toPort.SourceLinksCount !== 0) {
                        return false;
                    }
                    return !TuDocument.MakesDirectedCycleFast(this.Node, toPort.Node);
                }
            case TuDocumentValidCycle.SourceTree:
                {
                    if (this.DestinationLinksCount !== 0) {
                        return false;
                    }
                    return !TuDocument.MakesDirectedCycleFast(this.Node, toPort.Node);
                }
            default:
                {
                    return true;
                }
        }
    }

    public /*override*/ ExpandPaintBounds(rect: CGRectangle, view: TuView): CGRectangle {
        const portObject: TuObject = this.PortObject;
        if (portObject == null || portObject === this || this.Style !== TuPortStyle.Object || portObject.Layer != null || (this.InternalFlags & flagRecursive) !== 0) {
            return super.ExpandPaintBounds(rect, view);
        }
        this.InternalFlags = this.InternalFlags | flagRecursive;
        const rectangleF: CGRectangle = portObject.ExpandPaintBounds(rect, view);
        this.InternalFlags = this.InternalFlags & ~flagRecursive;
        return rectangleF;
    }

    public static FindParentNode(x: TuObject): ITuNode {
        if (x == null) {
            return undefined;
        }
        const goNode: ITuNode = as(x, Types.ITuNode);
        if (goNode != null) {
            return goNode;
        }
        return TuPort.FindParentNode(x.Parent);
    }

    public static findTopNode(x: TuObject): ITuNode {
        if (x == null) {
            return undefined;
        }
        if (x.IsTopLevel) {
            return as(x, Types.ITuNode);
        }
        const goNode: ITuNode = TuPort.findTopNode(x.Parent);
        if (goNode != null) {
            return goNode;
        }
        return as(x, Types.ITuNode);
    }

    private findVisibleCollapsedSubGraph(): TuSubGraph {
        if (!TuPort.LinksRedirectedToSubGraphPort) {
            return undefined;
        }
        if (!this.InsideCollapsedSubGraph) {
            return undefined;
        }
        let parent: TuObject = super.getParent();
        let goSubGraph: TuSubGraph = undefined;
        while (parent != null) {
            const goSubGraph1: TuSubGraph = as(parent, Types.TuSubGraph);
            if (goSubGraph1 != null && goSubGraph1.CanView()) {
                if (goSubGraph1.State !== TuSubGraphState.Collapsed) {
                    return goSubGraph;
                }
                goSubGraph = goSubGraph1;
            }
            parent = parent.Parent;
        }
        return goSubGraph;
    }
    public /*override*/ GetCursorName(view: TuView): string {
        if (view != null && !view.CanLinkObjects()) {
            return undefined;
        }
        if (!this.canLinkFrom() && !this.canLinkTo()) {
            return undefined;
        }
        return "hand";
    }

    private _getEndSegmentLength(link: ITuLink, atEnd: boolean): number {
        let center: CGPoint;
        let y: boolean;
        const endSegmentLength = this.EndSegmentLength;
        if (link == null) {
            return endSegmentLength;
        }
        if (!this.Visible) {
            return endSegmentLength;
        }
        if (!TuLink.isOrtho(link)) {
            return endSegmentLength;
        }
        const otherPort: ITuPort = link.getOtherPort(this);
        if (otherPort == null) {
            return endSegmentLength;
        }
        const goObject: TuObject = otherPort.TuObject;
        if (goObject == null) {
            return endSegmentLength;
        }
        const pointF: CGPoint = goObject.Center.clone();
        const parentNode: TuObject = super.getParentNode();
        const goGeneralNode: TuGeneralNode = as(parentNode, Types.TuGeneralNode);
        const goMultiTextNode: TuMultiTextNode = as(parentNode, Types.TuMultiTextNode);
        if (goGeneralNode == null && goMultiTextNode == null) {
            return endSegmentLength;
        }
        let single = (atEnd ? 4 : 8);
        if (goGeneralNode != null) {
            single = (atEnd ? goGeneralNode.ToEndSegmentLengthStep : goGeneralNode.FromEndSegmentLengthStep);
        }
        else if (goMultiTextNode != null) {
            single = (atEnd ? goMultiTextNode.ToEndSegmentLengthStep : goMultiTextNode.FromEndSegmentLengthStep);
        }
        if (single === 0) {
            return endSegmentLength;
        }
        let leftSide: boolean = false;
        let int32 = 0;
        let int321 = 0;
        if (goGeneralNode != null) {
            if (goGeneralNode.Orientation === Orientation.Horizontal && this.Center.X < goGeneralNode.Center.X) {
                y = true;
            }
            else if (goGeneralNode.Orientation !== Orientation.Vertical) {
                y = false;
            }
            else {
                const y1 = this.Center.Y;
                center = goGeneralNode.Center;
                y = y1 < center.Y;
            }
            leftSide = y;
            if (!leftSide) {
                const goGeneralNodePort: TuGeneralNodePort = as(this, Types.TuGeneralNodePort);
                if (goGeneralNodePort != null) {
                    leftSide = goGeneralNodePort.LeftSide;
                }
            }
            if (!leftSide) {
                const rightPortsCount = goGeneralNode.RightPortsCount;
                for (let i = 0; i < rightPortsCount; i++) {
                    const rightPort: TuGeneralNodePort = goGeneralNode.getRightPort(i);
                    if (rightPort != null) {
                        if (rightPort === <any>this) {
                            int32 = int321;
                        }
                        if (rightPort.LinksCount > 0) {
                            int321++;
                        }
                    }
                }
            }
            else {
                const leftPortsCount = goGeneralNode.LeftPortsCount;
                for (let j = 0; j < leftPortsCount; j++) {
                    const leftPort: TuGeneralNodePort = goGeneralNode.getLeftPort(j);
                    if (leftPort != null) {
                        if (leftPort === <any>this) {
                            int32 = int321;
                        }
                        if (leftPort.LinksCount > 0) {
                            int321++;
                        }
                    }
                }
            }
        }
        else if (goMultiTextNode != null) {
            const x = this.Center.X;
            center = goMultiTextNode.Center;
            leftSide = x < center.X;
            let topIndex: number = goMultiTextNode.ListGroup.TopIndex;
            if (topIndex < 0) {
                topIndex = 0;
            }
            if (!leftSide) {
                const itemCount: number = goMultiTextNode.ItemCount;
                for (let k = topIndex; k < itemCount; k++) {
                    const rightPort1: TuObject = goMultiTextNode.getRightPort(k);
                    if (rightPort1 != null) {
                        if (rightPort1 === this) {
                            int32 = int321;
                        }
                        if (rightPort1.Visible) {
                            const goPort: TuPort = as(rightPort1, Types.TuPort);
                            if (goPort != null && goPort.LinksCount > 0) {
                                int321++;
                            }
                        }
                    }
                }
            }
            else {
                const itemCount1: number = goMultiTextNode.ItemCount;
                for (let l = topIndex; l < itemCount1; l++) {
                    const leftPort1: TuObject = goMultiTextNode.getLeftPort(l);
                    if (leftPort1 != null) {
                        if (leftPort1 === this) {
                            int32 = int321;
                        }
                        if (leftPort1.Visible) {
                            const goPort1: TuPort = as(leftPort1, Types.TuPort);
                            if (goPort1 != null && goPort1.LinksCount > 0) {
                                int321++;
                            }
                        }
                    }
                }
            }
        }
        if (int321 <= 1) {
            return endSegmentLength;
        }
        let outBounds: Out<CGRectangle> = New.Out(goObject.ParentNode.Bounds.clone());
        const single1 = endSegmentLength;
        GeomUtilities.InflateRect(outBounds, single1, single1);
        const center1 = this.Center.clone();
        let orientation = true;
        if (goGeneralNode != null) {
            orientation = goGeneralNode.Orientation === Orientation.Horizontal;
        }
        let single2 = endSegmentLength;
        const single3: number = orientation ? this.Height : this.Width;
        if ((orientation ? pointF.Y < center1.Y - single3 : pointF.X < center1.X - single3)) {
            single2 = endSegmentLength + int32 * single + single / 2;
            if (orientation) {
                if (GeomUtilities.IntersectsLineSegment(outBounds.value, center1, new CGPoint({ x: center1.X + (leftSide ? -single2 : single2), y: center1.Y }))) {
                    return endSegmentLength;
                }
            }
            if (!orientation) {
                if (GeomUtilities.IntersectsLineSegment(outBounds.value, center1, new CGPoint({ x: center1.X, y: center1.Y + (leftSide ? -single2 : single2) }))) {
                    return endSegmentLength;
                }
            }
        }
        else if ((orientation ? pointF.Y > center1.Y + single3 : pointF.X > center1.X + single3)) {
            single2 = endSegmentLength + ((int321 - 1) - int32) * single;
            if (orientation) {
                if (GeomUtilities.IntersectsLineSegment(outBounds.value, center1, new CGPoint({ x: center1.X + (leftSide ? -single2 : single2), y: center1.Y }))) {
                    return endSegmentLength;
                }
            }
            if (!orientation) {
                if (GeomUtilities.IntersectsLineSegment(outBounds.value, center1, new CGPoint({ x: center1.X, y: center1.Y + (leftSide ? -single2 : single2) }))) {
                    return endSegmentLength;
                }
            }
        }
        return single2;
    }

    public /*virtual*/ getFromEndSegmentLength(link: ITuLink): number {
        return this._getEndSegmentLength(link, false);
    }

    public /*virtual*/ getFromLinkDir(link: ITuLink): number {
        let center: CGPoint = new CGPoint();
        let pointF: CGPoint = new CGPoint();
        const goSubGraph: TuSubGraph = this.findVisibleCollapsedSubGraph();
        if (goSubGraph != null && goSubGraph.Port != null && goSubGraph.Port != null && !link.TuObject.isChildOf(goSubGraph)) {
            return goSubGraph.Port.getFromLinkDir(link);
        }
        const fromSpot: Spot = this.FromSpot;
        if (fromSpot !== NoSpot && fromSpot !== Middle) {
            return this.getLinkDir(fromSpot);
        }
        if (link == null || link.ToPort == null || link.ToPort.TuObject == null) {
            return 0;
        }
        let realLink: TuLink = as(link, Types.TuLink);
        if (realLink == null && is.typeof(link, Types.TuLabeledLink)) {
            realLink = as<TuLabeledLink>(link, Types.TuLabeledLink).RealLink;
        }
        if (realLink != null) {
            if (realLink.PointsCount <= (realLink.Orthogonal ? 6 : 2)) {
                center = link.ToPort.TuObject.Center.clone();
                pointF = this.Center.clone();
                if (Math.abs(center.X - pointF.X) > Math.abs(center.Y - pointF.Y)) {
                    if (center.X >= pointF.X) {
                        return 0;
                    }
                    return 180;
                }
                if (center.Y >= pointF.Y) {
                    return 90;
                }
                return 270;
            }
            center = realLink.getPoint(1);
            if (!realLink.Orthogonal) {
                center = this.getLinkPointFromPoint(center);
                if (center.Equals(this.Center)) {
                    center = this.getLinkPointFromPoint(realLink.getPoint(2));
                    if (center.Equals(this.Center) && realLink.PointsCount > 3) {
                        const goLink: TuLink = realLink;
                        center = this.getLinkPointFromPoint(goLink.getPoint(goLink.PointsCount - 1));
                    }
                }
            }
            else {
                center = this.orthoPointToward(center.clone());
            }
        }
        else {
            center = link.ToPort.TuObject.Center.clone();
            pointF = this.Center.clone();
            if (Math.abs(center.X - pointF.X) > Math.abs(center.Y - pointF.Y)) {
                if (center.X >= pointF.X) {
                    return 0;
                }
                return 180;
            }
            if (center.Y >= pointF.Y) {
                return 90;
            }
            return 270;
        }
        pointF = this.Center.clone();
        if (Math.abs(center.X - pointF.X) > Math.abs(center.Y - pointF.Y)) {
            if (center.X >= pointF.X) {
                return 0;
            }
            return 180;
        }
        if (center.Y >= pointF.Y) {
            return 90;
        }
        return 270;
    }

    public /*virtual*/ getFromLinkPoint(link: ITuLink): CGPoint {
        let point: CGPoint = new CGPoint();
        const goSubGraph: TuSubGraph = this.findVisibleCollapsedSubGraph();
        if (goSubGraph != null && goSubGraph.Port != null && goSubGraph.Port != null && !link.TuObject.isChildOf(goSubGraph)) {
            return goSubGraph.Port.getFromLinkPoint(link);
        }
        if (this.FromSpot !== NoSpot) {
            let portObject: TuObject = this.PortObject;
            if (portObject == null || portObject.Layer == null && TuObject.FindCommonParent(this, portObject) == null) {
                portObject = this;
            }
            return portObject.GetSpotLocation(this.FromSpot);
        }
        if (link == null || link.ToPort == null || link.ToPort.TuObject == null) {
            return this.Center.clone();
        }
        let realLink: TuLink = as(link, Types.TuLink);
        if (realLink == null && is.typeof(link, Types.TuLabeledLink)) {
            realLink = as<TuLabeledLink>(link, Types.TuLabeledLink).RealLink;
        }
        if (realLink != null) {
            if (realLink.PointsCount > (realLink.Orthogonal ? 6 : 2)) {
                point = realLink.getPoint(1);
                if (realLink.Orthogonal) {
                    point = this.orthoPointToward(point.clone());
                    return this.getLinkPointFromPoint(point.clone());
                }
                let linkPointFromPoint: CGPoint = this.getLinkPointFromPoint(point);
                if (linkPointFromPoint.Equals(this.Center.clone())) {
                    linkPointFromPoint = this.getLinkPointFromPoint(realLink.getPoint(2));
                    if (linkPointFromPoint.Equals(this.Center.clone()) && realLink.PointsCount > 3) {
                        const goLink: TuLink = realLink;
                        linkPointFromPoint = this.getLinkPointFromPoint(goLink.getPoint(goLink.PointsCount - 1));
                    }
                }
                return linkPointFromPoint.clone();
            }
        }
        point = link.ToPort.TuObject.Center.clone();
        if (realLink != null && realLink.Orthogonal) {
            point = this.orthoPointToward(point);
        }
        return this.getLinkPointFromPoint(point);
    }

    public /*virtual*/ getLinkDir(spot: Spot): number {
        if (spot.ID <= 16) {
            switch (spot) {
                case Middle:
                case TopLeft:
                    {
                        return 225;
                    }
                case TopRight:
                    {
                        return 315;
                    }
                default:
                    {
                        if (spot === BottomRight) {
                            return 45;
                        }
                        if (spot === BottomLeft) {
                            return 135;
                        }
                        break;
                    }
            }
        }
        else if (spot.ID > 64) {
            if (spot === MiddleBottom) {
                return 90;
            }
            if (spot === MiddleLeft) {
                return 180;
            }
        }
        else {
            if (spot === MiddleTop) {
                return 270;
            }
            if (spot === MiddleRight) {
                return 0;
            }
        }
        return 0;
    }

    public /*virtual*/  getLinkPointFromPoint(p: CGPoint): CGPoint {
        let pointF: Out<CGPoint> = New.Out();
        let portObject: TuObject = this.PortObject;
        const goSubGraph: TuSubGraph = this.findVisibleCollapsedSubGraph();
        if (goSubGraph != null) {
            if (goSubGraph.CollapsedObject != null) {
                portObject = goSubGraph.CollapsedObject;
            }
            else if (goSubGraph != null && goSubGraph.Port != null && goSubGraph.Port != null) {
                return goSubGraph.Port.getLinkPointFromPoint(p);
            }
        }
        if (portObject == null || portObject.Layer == null && TuObject.FindCommonParent(this, portObject) == null) {
            portObject = this;
        }
        if (portObject.ContainsPoint(p.clone())) {
            return portObject.Center.clone();
        }
        if (this.GetNearestIntersectionPoint(p.clone(), this.Center.clone(), pointF)) {
            return pointF.value.clone();
        }
        return portObject.Center.clone();
    }

    public /*override*/ GetNearestIntersectionPoint(p1: CGPoint, p2: CGPoint, result: Out<CGPoint>): boolean {
        const portObject: TuObject = this.PortObject;
        if (portObject == null || portObject === this || this.Style === TuPortStyle.Object || (this.InternalFlags & flagRecursive) != 0 || portObject.Layer == null && TuObject.FindCommonParent(this, portObject) == null) {
            return super.GetNearestIntersectionPoint(p1.clone(), p2.clone(), result);
        }
        this.InternalFlags = this.InternalFlags | 16777216;
        const nearestIntersectionPoint: boolean = portObject.GetNearestIntersectionPoint(p1.clone(), p2.clone(), result);
        this.InternalFlags = this.InternalFlags & -16777217;
        return nearestIntersectionPoint;
    }

    public /*virtual*/ getToEndSegmentLength(link: ITuLink): number {
        return this._getEndSegmentLength(link, true);
    }

    public /*virtual*/ getToLinkDir(link: ITuLink): number {
        let center: CGPoint;
        let pointF: CGPoint;
        const goSubGraph: TuSubGraph = this.findVisibleCollapsedSubGraph();
        if (goSubGraph != null && goSubGraph.Port != null && goSubGraph.Port !== this && !link.TuObject.isChildOf(goSubGraph)) {
            return goSubGraph.Port.getToLinkDir(link);
        }
        const toSpot: Spot = this.ToSpot;
        if (toSpot !== NoSpot && toSpot !== Middle) {
            return this.getLinkDir(toSpot);
        }
        if (link == null || link.FromPort == null || link.FromPort.TuObject == null) {
            return 0;
        }
        let realLink: TuLink = as(link, Types.TuLink);
        if (realLink == null && is.typeof(link, Types.TuLabeledLink)) {
            realLink = as<TuLabeledLink>(link, Types.TuLabeledLink).RealLink;
        }
        if (realLink != null) {
            if (realLink.PointsCount <= (realLink.Orthogonal ? 6 : 2)) {
                center = link.FromPort.TuObject.Center.clone();
                pointF = this.Center.clone();
                if (Math.abs(center.X - pointF.X) > Math.abs(center.Y - pointF.Y)) {
                    if (center.X >= pointF.X) {
                        return 0;
                    }
                    return 180;
                }
                if (center.Y >= pointF.Y) {
                    return 90;
                }
                return 270;
            }
            const goLink: TuLink = realLink;
            center = goLink.getPoint(goLink.PointsCount - 2);
            if (!realLink.Orthogonal) {
                center = this.getLinkPointFromPoint(center.clone());
                if (center.Equals(this.Center.clone())) {
                    const goLink1: TuLink = realLink;
                    center = this.getLinkPointFromPoint(goLink1.getPoint(goLink1.PointsCount - 3));
                    if (center.Equals(this.Center.clone()) && realLink.PointsCount > 3) {
                        center = this.getLinkPointFromPoint(realLink.getPoint(0));
                    }
                }
            }
            else {
                center = this.orthoPointToward(center);
            }
        }
        else {
            center = link.FromPort.TuObject.Center.clone();
            pointF = this.Center.clone();
            if (Math.abs(center.X - pointF.X) > Math.abs(center.Y - pointF.Y)) {
                if (center.X >= pointF.X) {
                    return 0;
                }
                return 180;
            }
            if (center.Y >= pointF.Y) {
                return 90;
            }
            return 270;
        }
        pointF = this.Center.clone();
        if (Math.abs(center.X - pointF.X) > Math.abs(center.Y - pointF.Y)) {
            if (center.X >= pointF.X) {
                return 0;
            }
            return 180;
        }
        if (center.Y >= pointF.Y) {
            return 90;
        }
        return 270;
    }

    public /*virtual*/ getToLinkPoint(link: ITuLink): CGPoint {
        let point: CGPoint = new CGPoint();
        const goSubGraph: TuSubGraph = this.findVisibleCollapsedSubGraph();
        if (goSubGraph != null && goSubGraph.Port != null && goSubGraph.Port != null && !link.TuObject.isChildOf(goSubGraph)) {
            return goSubGraph.Port.getToLinkPoint(link);
        }
        if (this.ToSpot !== NoSpot) {
            let portObject: TuObject = this.PortObject;
            if (portObject == null || portObject.Layer == null && TuObject.FindCommonParent(this, portObject) == null) {
                portObject = this;
            }
            return portObject.GetSpotLocation(this.ToSpot);
        }
        if (link == null || link.FromPort == null || link.FromPort.TuObject == null) {
            return this.Center.clone();
        }
        let realLink: TuLink = as(link, Types.TuLink);
        if (realLink == null && is.typeof<TuLabeledLink>(link, Types.TuLabeledLink)) {
            realLink = link.RealLink;
        }
        if (realLink != null) {
            if (realLink.PointsCount > (realLink.Orthogonal ? 6 : 2)) {
                const goLink: TuLink = realLink;
                point = goLink.getPoint(goLink.PointsCount - 2);
                if (realLink.Orthogonal) {
                    point = this.orthoPointToward(point.clone());
                    return this.getLinkPointFromPoint(point.clone());
                }
                let linkPointFromPoint: CGPoint = this.getLinkPointFromPoint(point);
                if (linkPointFromPoint.Equals(this.Center.clone())) {
                    const goLink1: TuLink = realLink;
                    linkPointFromPoint = this.getLinkPointFromPoint(goLink1.getPoint(goLink1.PointsCount - 3));
                    if (linkPointFromPoint.Equals(this.Center) && realLink.PointsCount > 3) {
                        linkPointFromPoint = this.getLinkPointFromPoint(realLink.getPoint(0));
                    }
                }
                return linkPointFromPoint.clone();
            }
        }
        point = link.FromPort.TuObject.Center.clone();
        if (realLink != null && realLink.Orthogonal) {
            point = this.orthoPointToward(point.clone());
        }
        return this.getLinkPointFromPoint(point.clone());
    }

    private internalAddLink(link: ITuLink, undoing: boolean) {
        if (!this.myLinks.Contains(link)) {
            this.myLinks.Add(link);
            this.Changed(TuPortEvents.ChangedAddedLink, 0, link, NullRect, 0, link, NullRect);
            this.onLinkChanged(link, TuPortEvents.ChangedAddedLink, 0, link, NullRect, 0, link, NullRect);
        }
    }

    private internalRemoveLink(link: ITuLink, undoing: boolean) {
        const int32: number = this.myLinks.IndexOf(link);
        if (int32 >= 0) {
            this.myLinks.RemoveAt(int32);
            this.Changed(TuPortEvents.ChangedRemovedLink, 0, link, NullRect, 0, link, NullRect);
            this.onLinkChanged(link, TuPortEvents.ChangedRemovedLink, 0, link, NullRect, 0, link, NullRect);
        }
    }

    public static isInSameNode(a: ITuPort, b: ITuPort): boolean {
        if (a == null || b == null) {
            return false;
        }
        if (a === b) {
            return true;
        }
        let node: any = a.Node;
        if (node == null && a.TuObject != null) {
            node = a.TuObject.TopLevelObject;
        }
        let topLevelObject: any = b.Node;
        if (topLevelObject == null && b.TuObject != null) {
            topLevelObject = b.TuObject.TopLevelObject;
        }
        if (node == null) {
            return false;
        }
        return node === topLevelObject;
    }

    public /*virtual*/ isInSameNode(p: ITuPort): boolean {
        return TuPort.isInSameNode(this, p);
    }

    public static isLinked(a: ITuPort, b: ITuPort): boolean {
        let flag: boolean;
        if (a == null || b == null) {
            return false;
        }
        const goPort: TuPort = as(b, Types.TuPort);
        if (goPort == null) {
            const enumerator = b.Links.GetEnumerator();
            try {
                while (enumerator.MoveNext()) {
                    const current: ITuLink = enumerator.Current;
                    if (current.FromPort !== a || current.ToPort !== b) {
                        continue;
                    }
                    flag = true;
                    return flag;
                }
                return false;
            }
            finally {
                enumerator.Dispose();
            }

        }
        else {
            const goPortLinkEnumerators: TuPortLinkEnumerator = goPort.Links.GetEnumerator();
            try {
                while (goPortLinkEnumerators.MoveNext()) {
                    const goLink: ITuLink = goPortLinkEnumerators.Current;
                    if (goLink.FromPort !== a || goLink.ToPort !== b) {
                        continue;
                    }
                    flag = true;
                    return flag;
                }
                return false;
            }
            finally {
                goPortLinkEnumerators.Dispose();
            }
        }
        return flag;
    }

    public /*virtual*/ isLinked(p: ITuPort): boolean {
        return TuPort.isLinked(this, p);
    }

    public /*virtual*/ isValidLink(toPort: ITuPort): boolean {
        if (!this.canLinkFrom() || toPort == null || !toPort.canLinkTo() ||
            (!this.IsValidSelfNode || !is.typeof(toPort.TuObject, Types.TuPort) || !(as<TuPort>(toPort.TuObject, Types.TuPort)).IsValidSelfNode) &&
            this.isInSameNode(toPort) || (!this.IsValidDuplicateLinks || !is.typeof(toPort.TuObject, Types.TuPort) || !(as<TuPort>(toPort.TuObject, Types.TuPort)).IsValidDuplicateLinks) &&
            this.isLinked(toPort)) {
            return false;
        }
        return this.cycleOK(toPort);
    }

    public /*virtual*/ linksOnPortChanged(subhint: number, oldI: number, oldVal: any, oldRect: CGRectangle, newI: number, newVal: any, newRect: CGRectangle) {
        foreach(this.Links, (link: ITuLink) => {
            if (link != null) {
                link.onPortChanged(this, subhint, oldI, oldVal, oldRect, newI, newVal, newRect);
            }
            if (subhint !== TuObjectEvents.ChangedBounds) {
                return CONTINUE;
            }
            const otherPort: ITuPort = link.getOtherPort(this);
            if (otherPort == null) {
                return CONTINUE;
            }
            const goBoxPort: TuBoxPort = as(otherPort, Types.TuBoxPort);
            if (goBoxPort == null) {
                return CONTINUE;
            }
            goBoxPort.updateAllLinkPoints();
        });
    }

    public /*override*/ makePath(): GraphicsPath {
        const graphicsPath: GraphicsPath = new GraphicsPath(FillMode.Winding);
        const bounds: CGRectangle = this.Bounds.clone();
        switch (this.Style) {
            case TuPortStyle.None:
                {
                    graphicsPath.addLine(bounds.X, bounds.Y, bounds.X, bounds.Y);
                    break;
                }
            case TuPortStyle.Object:
                {
                    graphicsPath.addLine(bounds.X, bounds.Y, bounds.X, bounds.Y);
                    break;
                }
            case TuPortStyle.Ellipse:
            case TuPortStyle.Object | TuPortStyle.PlusTimes:
            case TuPortStyle.Ellipse | TuPortStyle.PlusTimes:
            case TuPortStyle.Object | TuPortStyle.Ellipse | TuPortStyle.Triangle | TuPortStyle.PlusTimes:
            case TuPortStyle.Rectangle | TuPortStyle.PlusTimes:
            case TuPortStyle.Object | TuPortStyle.Rectangle | TuPortStyle.Diamond | TuPortStyle.PlusTimes:
            case TuPortStyle.Ellipse | TuPortStyle.Rectangle | TuPortStyle.Plus | TuPortStyle.PlusTimes:
            case TuPortStyle.Object | TuPortStyle.Ellipse | TuPortStyle.Triangle | TuPortStyle.Rectangle | TuPortStyle.Diamond | TuPortStyle.Plus | TuPortStyle.Times | TuPortStyle.PlusTimes:
            case TuPortStyle.Object | TuPortStyle.Ellipse | TuPortStyle.Triangle:
                {
                    graphicsPath.addEllipse(bounds.X, bounds.Y, bounds.Width, bounds.Height);
                    break;
                }
            case TuPortStyle.Triangle:
            case TuPortStyle.TriangleTopLeft:
            case TuPortStyle.TriangleTopRight:
            case TuPortStyle.TriangleBottomRight:
            case TuPortStyle.TriangleBottomLeft:
            case TuPortStyle.TriangleMiddleTop:
            case TuPortStyle.TriangleMiddleRight:
            case TuPortStyle.TriangleMiddleBottom:
            case TuPortStyle.TriangleMiddleLeft:
                {
                    const pointFArray: CGPoint[] = new Array(3);
                    for (let i = 0; i < pointFArray.length; i++) {
                        pointFArray[i] = new CGPoint();
                    }
                    this.computeTrianglePoints(pointFArray);
                    graphicsPath.addPolygon(pointFArray);
                    break;
                }
            case TuPortStyle.Rectangle:
                {
                    graphicsPath.addRectangle(bounds);
                    break;
                }
            case TuPortStyle.Diamond:
                {
                    const x: CGPoint[] = new Array(4);
                    for (let i = 0; i < x.length; i++) {
                        x[i] = new CGPoint();
                    }
                    x[0].X = bounds.X + bounds.Width / 2;
                    x[0].Y = bounds.Y;
                    x[1].X = bounds.X + bounds.Width;
                    x[1].Y = bounds.Y + bounds.Height / 2;
                    x[2].X = x[0].X;
                    x[2].Y = bounds.Y + bounds.Height;
                    x[3].X = bounds.X;
                    x[3].Y = x[1].Y;
                    graphicsPath.addPolygon(x);
                    break;
                }
            case TuPortStyle.Plus:
                {
                    graphicsPath.addLine(bounds.X + bounds.Width / 2, bounds.Y, bounds.X + bounds.Width / 2, bounds.Y + bounds.Height);
                    graphicsPath.startFigure();
                    graphicsPath.addLine(bounds.X, bounds.Y + bounds.Height / 2, bounds.X + bounds.Width, bounds.Y + bounds.Height / 2);
                    break;
                }
            case TuPortStyle.Times:
                {
                    graphicsPath.addLine(bounds.X, bounds.Y, bounds.X + bounds.Width, bounds.Y + bounds.Height);
                    graphicsPath.startFigure();
                    graphicsPath.addLine(bounds.X + bounds.Width, bounds.Y, bounds.X, bounds.Y + bounds.Height);
                    break;
                }
            case TuPortStyle.PlusTimes:
                {
                    graphicsPath.addLine(bounds.X + bounds.Width / 2, bounds.Y, bounds.X + bounds.Width / 2, bounds.Y + bounds.Height);
                    graphicsPath.startFigure();
                    graphicsPath.addLine(bounds.X, bounds.Y + bounds.Height / 2, bounds.X + bounds.Width, bounds.Y + bounds.Height / 2);
                    graphicsPath.startFigure();
                    graphicsPath.addLine(bounds.X, bounds.Y, bounds.X + bounds.Width, bounds.Y + bounds.Height);
                    graphicsPath.startFigure();
                    graphicsPath.addLine(bounds.X + bounds.Width, bounds.Y, bounds.X, bounds.Y + bounds.Height);
                    break;
                }
            default:
                {
                    graphicsPath.addEllipse(bounds.X, bounds.Y, bounds.Width, bounds.Height);
                    break;
                }
        }
        return graphicsPath;
    }

    protected /*override*/ OnBoundsChanged(old: CGRectangle) {
        super.OnBoundsChanged(old);
        this.linksOnPortChanged(TuObjectEvents.ChangedBounds, 0, undefined, old, 0, undefined, this.Bounds.clone());
    }

    protected /*override*/ OnLayerChanged(oldlayer: TuLayer, newlayer: TuLayer, mainObj: TuObject) {
        super.OnLayerChanged(oldlayer, newlayer, mainObj);
        if (newlayer == null && this.ClearsLinksWhenRemoved && !this.NoClearLinks) {
            this._clearLinks(mainObj);
        }
    }

    public /*virtual*/ onLinkChanged(l: ITuLink, subhint: number, oldI: number, oldVal: any, oldRect: CGRectangle, newI: number, newVal: any, newRect: CGRectangle): void {
    }

    private orthoPointToward(p: CGPoint): CGPoint {
        const center: CGPoint = this.Center.clone();
        if (Math.abs(p.X - center.X) <= Math.abs(p.Y - center.Y)) {
            if (p.Y < center.Y) {
                p.Y = -9999999;
            }
            else {
                p.Y = 9999999;
            }
            p.X = center.X;
        }
        else {
            if (p.X < center.X) {
                p.X = -9999999;
            }
            else {
                p.X = 9999999;
            }
            p.Y = center.Y;
        }
        return p;
    }

    public /*override*/ Paint(g: Graphics, view: TuView) {
        if (this.paintGreek(g, view)) {
            return;
        }
        const bounds: CGRectangle = this.Bounds.clone();
        switch (this.Style) {
            case TuPortStyle.None:
                {
                    return;
                }
            case TuPortStyle.Object:
                {
                    const portObject: TuObject = this.PortObject;
                    if (portObject == null || portObject.Layer != null) {
                        break;
                    }
                    portObject.Bounds = bounds;
                    portObject.Paint(g, view);
                    return;
                }
            case TuPortStyle.Ellipse:
            case TuPortStyle.Object | TuPortStyle.PlusTimes:
            case TuPortStyle.Ellipse | TuPortStyle.PlusTimes:
            case TuPortStyle.Object | TuPortStyle.Ellipse | TuPortStyle.Triangle | TuPortStyle.PlusTimes:
            case TuPortStyle.Rectangle | TuPortStyle.PlusTimes:
            case TuPortStyle.Object | TuPortStyle.Rectangle | TuPortStyle.Diamond | TuPortStyle.PlusTimes:
            case TuPortStyle.Ellipse | TuPortStyle.Rectangle | TuPortStyle.Plus | TuPortStyle.PlusTimes:
            case TuPortStyle.Object | TuPortStyle.Ellipse | TuPortStyle.Triangle | TuPortStyle.Rectangle | TuPortStyle.Diamond | TuPortStyle.Plus | TuPortStyle.Times | TuPortStyle.PlusTimes:
            case TuPortStyle.Object | TuPortStyle.Ellipse | TuPortStyle.Triangle:
                {
                    TuShape.DrawEllipse(g, view, this.Pen, this.Brush, bounds.X, bounds.Y, bounds.Width, bounds.Height);
                    break;
                }
            case TuPortStyle.Triangle:
            case TuPortStyle.TriangleTopLeft:
            case TuPortStyle.TriangleTopRight:
            case TuPortStyle.TriangleBottomRight:
            case TuPortStyle.TriangleBottomLeft:
            case TuPortStyle.TriangleMiddleTop:
            case TuPortStyle.TriangleMiddleRight:
            case TuPortStyle.TriangleMiddleBottom:
            case TuPortStyle.TriangleMiddleLeft:
                {
                    const pointFArray: CGPoint[] = view.allocTempPointArray(3);
                    this.computeTrianglePoints(pointFArray);
                    TuShape.DrawPolygon(g, view, this.Pen, this.Brush, pointFArray);
                    view.freeTempPointArray(pointFArray);
                    return;
                }
            case TuPortStyle.Rectangle:
                {
                    TuShape.DrawRectangle(g, view, this.Pen, this.Brush, bounds.X, bounds.Y, bounds.Width, bounds.Height);
                    return;
                }
            case TuPortStyle.Diamond:
                {
                    const x: CGPoint[] = view.allocTempPointArray(4);
                    x[0].X = bounds.X + bounds.Width / 2;
                    x[0].Y = bounds.Y;
                    x[1].X = bounds.X + bounds.Width;
                    x[1].Y = bounds.Y + bounds.Height / 2;
                    x[2].X = x[0].X;
                    x[2].Y = bounds.Y + bounds.Height;
                    x[3].X = bounds.X;
                    x[3].Y = x[1].Y;
                    TuShape.DrawPolygon(g, view, this.Pen, this.Brush, x);
                    view.freeTempPointArray(x);
                    return;
                }
            case TuPortStyle.Plus:
                {
                    TuShape.DrawLine(g, view, this.Pen, bounds.X + bounds.Width / 2, bounds.Y, bounds.X + bounds.Width / 2, bounds.Y + bounds.Height);
                    TuShape.DrawLine(g, view, this.Pen, bounds.X, bounds.Y + bounds.Height / 2, bounds.X + bounds.Width, bounds.Y + bounds.Height / 2);
                    return;
                }
            case TuPortStyle.Times:
                {
                    TuShape.DrawLine(g, view, this.Pen, bounds.X, bounds.Y, bounds.X + bounds.Width, bounds.Y + bounds.Height);
                    TuShape.DrawLine(g, view, this.Pen, bounds.X + bounds.Width, bounds.Y, bounds.X, bounds.Y + bounds.Height);
                    return;
                }
            case TuPortStyle.PlusTimes:
                {
                    TuShape.DrawLine(g, view, this.Pen, bounds.X + bounds.Width / 2, bounds.Y, bounds.X + bounds.Width / 2, bounds.Y + bounds.Height);
                    TuShape.DrawLine(g, view, this.Pen, bounds.X, bounds.Y + bounds.Height / 2, bounds.X + bounds.Width, bounds.Y + bounds.Height / 2);
                    TuShape.DrawLine(g, view, this.Pen, bounds.X, bounds.Y, bounds.X + bounds.Width, bounds.Y + bounds.Height);
                    TuShape.DrawLine(g, view, this.Pen, bounds.X + bounds.Width, bounds.Y, bounds.X, bounds.Y + bounds.Height);
                    return;
                }
            default:
                {
                    TuShape.DrawEllipse(g, view, this.Pen, this.Brush, bounds.X, bounds.Y, bounds.Width, bounds.Height);
                    break;
                }
        }
    }

    public /*virtual*/ paintGreek(g: Graphics, view: TuView): boolean {
        const docScale: number = view.DocScale;
        const paintNothingScale = view.PaintNothingScale;
        let worldScale: CGSize = view.WorldScale;
        let height: number = paintNothingScale / worldScale.Height;
        const paintGreekScale: number = view.PaintGreekScale;
        worldScale = view.WorldScale;
        let single: number = paintGreekScale / worldScale.Height;
        if (view.IsPrinting) {
            height = height / 4;
            single = single / 4;
        }
        if (docScale <= height) {
            return true;
        }
        if (docScale > single) {
            return false;
        }
        if (this.Style !== TuPortStyle.None) {
            const bounds: CGRectangle = this.Bounds.clone();
            TuShape.DrawRectangle(g, view, this.Pen, this.Brush, bounds.X, bounds.Y, bounds.Width, bounds.Height);
        }
        return true;
    }

    public /*virtual*/ removeLink(link: ITuLink) {
        this.internalRemoveLink(link, false);
    }

}

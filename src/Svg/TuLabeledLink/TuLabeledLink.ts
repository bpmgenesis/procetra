import { TuLayer } from './../TuLayer/TuLayer';
import { BottomRight, TopRight, MiddleCenter, MiddleTop } from './../Spot';
import { MiddleBottom, MiddleLeft, MiddleRight, TopCenter, TopLeft, BottomLeft } from '../Spot';
import { TuObject } from './../TuObject/TuObject';
import { float, ClassInfo, Out, New, as } from '@tuval/core';
import { Types } from '../types';
import { TuGroup } from '../TuGroup/TuGroup';
import { ITuLink } from '../ITuLink';
import { ITuGraphPart } from '../TuLink/ITuGraphPart';
import { ITuIdentifiablePart } from '../ITuIdentifiablePart';
import { ITuRoutable } from '../ITuRoutable';
import { TuLink } from '../TuLink/TuLink';
import { Spot } from '../Spot';

import { TuLinkAdjustingStyle } from '../TuLink/TuLinkAdjustingStyle';
import { Brush, Pen } from '@tuval/graphics';
import { TuStrokeArrowheadStyle } from '../TuStroke/TuStrokeArrowheadStyle';
import { TuLabeledLinkEvents } from './TuLabeledLinkEvents';
import { NullRect } from '../Globals';
import { ITuNode } from '../TuNode/ITuNode';
import { ITuPort } from '../ITuPort';
import { CGColor, CGPoint, CGRectangle } from '@tuval/cg';
import { TuStrokeStyle } from '../TuStroke/TuStrokeStyle';
import { TuChangedEventArgs } from '../TuChangedEventArgs';
import { TuView } from '../TuView/TuView';
import { GeomUtilities } from '../GeomUtilities';
import { TuGroupEnumerator } from '../TuGroup/TuGroupEnumerator';
import { TuCopyDictionary } from '../TuCopyDictionary';
import { TuDocument } from '../TuDocument/TuDocument';

const flagFromLabelCentered: number = 16777216;
const flagMidLabelCentered: number = 33554432;
const flagToLabelCentered: number = 67108864;

const DEFAULT_ARROW_LENGTH: float = 10;
const DEFAULT_ARROW_SHAFT_LENGTH: float = 8;
const DEFAULT_ARROW_WIDTH: float = 8;
const DEFAULT_ARROW_FILLED: boolean = true;

@ClassInfo({
    fullName: Types.TuLabeledLink,
    instanceof: [
        Types.TuLabeledLink,
        Types.ITuLink,
        Types.ITuGraphPart,
        Types.ITuIdentifiablePart,
        Types.ITuRoutable
    ]
})
export class TuLabeledLink extends TuGroup implements ITuLink, ITuGraphPart, ITuIdentifiablePart, ITuRoutable {
    private myRealLink: TuLink;
    private myFromLabel: TuObject;
    private myMidLabel: TuObject;
    private myToLabel: TuObject;

    //#region [Property] AdjustingStyle
    public get AdjustingStyle(): TuLinkAdjustingStyle {
        return this.getAdjustingStyle();
    }
    public set AdjustingStyle(value: TuLinkAdjustingStyle) {
        this.setAdjustingStyle(value);
    }

    protected /*virtual*/ getAdjustingStyle(): TuLinkAdjustingStyle {
        return this.RealLink.AdjustingStyle;
    }
    protected /*virtual*/ setAdjustingStyle(value: TuLinkAdjustingStyle) {
        this.RealLink.AdjustingStyle = value;
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
        return this.RealLink.AvoidsNodes;
    }
    protected /*virtual*/ setAvoidsNodes(value: boolean) {
        this.RealLink.AvoidsNodes = value;
    }
    //#endregion

    //#region [Property] Brush
    public get Brush(): Brush {
        return this.getBrush();
    }
    public set Brush(value: Brush) {
        this.setBrush(value);
    }

    protected /*virtual*/ getBrush(): Brush {
        return this.RealLink.Brush;
    }
    protected /*virtual*/ setBrush(value: Brush) {
        this.RealLink.Brush = value;
    }
    //#endregion

    //#region [Property] Curviness
    public get Curviness(): float {
        return this.getCurviness();
    }
    public set Curviness(value: float) {
        this.setCurviness(value);
    }

    protected /*virtual*/ getCurviness(): float {
        return this.RealLink.Curviness;
    }
    protected /*virtual*/ setCurviness(value: float) {
        this.RealLink.Curviness = value;
    }
    //#endregion

    //#region [Property] FromArrow
    public get FromArrow(): boolean {
        return this.getFromArrow();
    }
    public set FromArrow(value: boolean) {
        this.setFromArrow(value);
    }

    protected /*virtual*/ getFromArrow(): boolean {
        return this.RealLink.FromArrow;
    }
    protected /*virtual*/ setFromArrow(value: boolean) {
        this.RealLink.FromArrow = value;
    }
    //#endregion

    //#region [Property] FromArrowFilled
    public get FromArrowFilled(): boolean {
        return this.getFromArrowFilled();
    }
    public set FromArrowFilled(value: boolean) {
        this.setFromArrow(value);
    }

    protected /*virtual*/ getFromArrowFilled(): boolean {
        return this.RealLink.FromArrowFilled;
    }
    protected /*virtual*/ setFromArrowFilled(value: boolean) {
        this.RealLink.FromArrowFilled = value;
    }
    //#endregion

    //#region [Property] FromArrowLength
    public get FromArrowLength(): float {
        return this.getFromArrowLength();
    }
    public set FromArrowLength(value: float) {
        this.setFromArrowLength(value);
    }

    protected /*virtual*/ getFromArrowLength(): float {
        return this.RealLink.FromArrowLength;
    }
    protected /*virtual*/ setFromArrowLength(value: float) {
        this.RealLink.FromArrowLength = value;
    }
    //#endregion

    //#region [Property] FromArrowStyle
    public get FromArrowStyle(): TuStrokeArrowheadStyle {
        return this.getFromArrowStyle();
    }
    public set FromArrowStyle(value: TuStrokeArrowheadStyle) {
        this.setFromArrowStyle(value);
    }

    protected /*virtual*/ getFromArrowStyle(): TuStrokeArrowheadStyle {
        return this.RealLink.FromArrowStyle;
    }
    protected /*virtual*/ setFromArrowStyle(value: TuStrokeArrowheadStyle) {
        this.RealLink.FromArrowStyle = value;
    }
    //#endregion

    //#region [Property] FromArrowWidth
    public get FromArrowWidth(): float {
        return this.getFromArrowWidth();
    }
    public set FromArrowWidth(value: float) {
        this.setFromArrowWidth(value);
    }

    protected /*virtual*/ getFromArrowWidth(): float {
        return this.RealLink.FromArrowWidth;
    }
    protected /*virtual*/ setFromArrowWidth(value: float) {
        this.RealLink.FromArrowWidth = value;
    }
    //#endregion

    //#region [Property] FromLabel
    public get FromLabel(): TuObject {
        return this.getFromLabel();
    }
    public set FromLabel(value: TuObject) {
        this.setFromLabel(value);
    }

    protected /*virtual*/ getFromLabel(): TuObject {
        return this.myFromLabel;
    }
    protected /*virtual*/ setFromLabel(value: TuObject) {
        const goObject: TuObject = this.myFromLabel;
        if (goObject !== value) {
            if (goObject != null) {
                super.Remove(goObject);
            }
            this.myFromLabel = value;
            if (value != null) {
                super.Add(value);
                if (value === this.MidLabel) {
                    this.myMidLabel = undefined;
                    this.Changed(TuLabeledLinkEvents.ChangedMidLabel, 0, value, NullRect, 0, undefined, NullRect);
                }
                else if (value === this.ToLabel) {
                    this.myToLabel = undefined;
                    this.Changed(TuLabeledLinkEvents.ChangedToLabel, 0, value, NullRect, 0, undefined, NullRect);
                }
            }
            this.Changed(TuLabeledLinkEvents.ChangedFromLabel, 0, goObject, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] FromLabelCentered
    public get FromLabelCentered(): boolean {
        return this.getFromLabelCentered();
    }
    public set FromLabelCentered(value: boolean) {
        this.setFromLabelCentered(value);
    }

    protected /*virtual*/ getFromLabelCentered(): boolean {
        return (this.InternalFlags & flagFromLabelCentered) !== 0;
    }
    protected /*virtual*/ setFromLabelCentered(value: boolean) {
        const internalFlags: boolean = (this.InternalFlags & flagFromLabelCentered) !== 0;
        if (internalFlags !== value) {
            if (!value) {
                this.InternalFlags = this.InternalFlags & ~flagFromLabelCentered;
            }
            else {
                this.InternalFlags = this.InternalFlags | flagFromLabelCentered;
            }
            this.Changed(TuLabeledLinkEvents.ChangedFromLabelCentered, 0, internalFlags, NullRect, 0, value, NullRect);
            if (!this.Initializing) {
                this.layoutChildren(this.FromLabel);
            }
        }
    }
    //#endregion

    //#region [Property] FromNode
    public get FromNode(): ITuNode {
        return this.getFromNode();
    }
    protected /*virtual*/ getFromNode(): ITuNode {
        return this.myRealLink.FromNode;
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
        return this.myRealLink.FromPort;
    }
    protected /*virtual*/ setFromPort(value: ITuPort) {
        this.myRealLink.FromPort = value;
    }
    //#endregion

    public get TuObject(): TuObject {
        return this;
    }

    //#region [Property] Highlight
    public get Highlight(): boolean {
        return this.getHighlight();
    }
    public set Highlight(value: boolean) {
        this.setHighlight(value);
    }

    protected /*virtual*/ getHighlight(): boolean {
        return this.RealLink.Highlight;
    }
    protected /*virtual*/ setHighlight(value: boolean) {
        this.RealLink.Highlight = value;
    }
    //#endregion

    //#region [Property] HighlightPen
    public get HighlightPen(): Pen {
        return this.getHighlightPen();
    }
    public set HighlightPen(value: Pen) {
        this.setHighlightPen(value);
    }

    protected /*virtual*/ getHighlightPen(): Pen {
        return this.RealLink.HighlightPen;
    }
    protected /*virtual*/ setHighlightPen(value: Pen) {
        this.RealLink.HighlightPen = value;
    }
    //#endregion

    //#region [Property] HighlightPenColor
    public get HighlightPenColor(): CGColor {
        return this.getHighlightPenColor();
    }
    public set HighlightPenColor(value: CGColor) {
        this.setHighlightPenColor(value);
    }

    protected /*virtual*/ getHighlightPenColor(): CGColor {
        return this.RealLink.HighlightPenColor;
    }
    protected /*virtual*/ setHighlightPenColor(value: CGColor) {
        this.RealLink.HighlightPenColor = value;
    }
    //#endregion

    //#region [Property] HighlightPenWidth
    public get HighlightPenWidth(): float {
        return this.getHighlightPenWidth();
    }
    public set HighlightPenWidth(value: float) {
        this.setHighlightPenWidth(value);
    }

    protected /*virtual*/ getHighlightPenWidth(): float {
        return this.RealLink.HighlightPenWidth;
    }
    protected /*virtual*/ setHighlightPenWidth(value: float) {
        this.RealLink.HighlightPenWidth = value;
    }
    //#endregion

    //#region [Property] HighlightWhenSelected
    public get HighlightWhenSelected(): boolean {
        return this.getHighlightWhenSelected();
    }
    public set HighlightWhenSelected(value: boolean) {
        this.setHighlightWhenSelected(value);
    }

    protected /*virtual*/ getHighlightWhenSelected(): boolean {
        return this.RealLink.HighlightWhenSelected;
    }
    protected /*virtual*/ setHighlightWhenSelected(value: boolean) {
        this.RealLink.HighlightWhenSelected = value;
    }
    //#endregion

    //#region [Property] MidLabel
    public get MidLabel(): TuObject {
        return this.getMidLabel();
    }
    public set MidLabel(value: TuObject) {
        this.setMidLabel(value);
    }

    protected /*virtual*/ getMidLabel(): TuObject {
        return this.myMidLabel;
    }
    protected /*virtual*/ setMidLabel(value: TuObject) {
        const goObject: TuObject = this.myMidLabel;
        if (goObject !== value) {
            if (goObject != null) {
                super.Remove(goObject);
            }
            this.myMidLabel = value;
            if (value != null) {
                super.Add(value);
                if (value === this.FromLabel) {
                    this.myFromLabel = null;
                    this.Changed(TuLabeledLinkEvents.ChangedFromLabel, 0, value, NullRect, 0, undefined, NullRect);
                }
                else if (value === this.ToLabel) {
                    this.myToLabel = null;
                    this.Changed(TuLabeledLinkEvents.ChangedToLabel, 0, value, NullRect, 0, undefined, NullRect);
                }
            }
            this.Changed(TuLabeledLinkEvents.ChangedMidLabel, 0, goObject, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] MidLabelCentered
    public get MidLabelCentered(): boolean {
        return this.getMidLabelCentered();
    }
    public set MidLabelCentered(value: boolean) {
        this.setMidLabelCentered(value);
    }

    protected /*virtual*/ getMidLabelCentered(): boolean {
        return (this.InternalFlags & flagMidLabelCentered) !== 0;
    }
    protected /*virtual*/ setMidLabelCentered(value: boolean) {
        const internalFlags: boolean = (this.InternalFlags & flagMidLabelCentered) !== 0;
        if (internalFlags !== value) {
            if (!value) {
                this.InternalFlags = this.InternalFlags & ~flagMidLabelCentered;
            }
            else {
                this.InternalFlags = this.InternalFlags | flagMidLabelCentered;
            }
            this.Changed(TuLabeledLinkEvents.ChangedMidLabelCentered, 0, internalFlags, NullRect, 0, value, NullRect);
            if (!this.Initializing) {
                this.layoutChildren(this.MidLabel);
            }
        }
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
        return this.RealLink.Orthogonal;
    }
    protected /*virtual*/ setOrthogonal(value: boolean) {
        this.RealLink.Orthogonal = value;
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
        if (this.RealLink == null) {
            return -1;
        }
        return this.RealLink.PartID;
    }
    protected /*virtual*/ setPartID(value: number) {
        if (this.RealLink != null) {
            this.RealLink.PartID = value;
        }
    }
    //#endregion

    //#region [Property] Pen
    public get Pen(): Pen {
        return this.getPen();
    }
    public set Pen(value: Pen) {
        this.setPen(value);
    }

    protected /*virtual*/ getPen(): Pen {
        return this.RealLink.Pen;
    }
    protected /*virtual*/ setPen(value: Pen) {
        this.RealLink.Pen = value;
    }
    //#endregion

    //#region [Property] PenColor
    public get PenColor(): CGColor {
        return this.getPenColor();
    }
    public set PenColor(value: CGColor) {
        this.setPenColor(value);
    }

    protected /*virtual*/ getPenColor(): CGColor {
        return this.RealLink.PenColor;
    }
    protected /*virtual*/ setPenColor(value: CGColor) {
        this.RealLink.PenColor = value;
    }
    //#endregion

    //#region [Property] PenWidth
    public get PenWidth(): float {
        return this.getPenWidth();
    }
    public set PenWidth(value: float) {
        this.setPenWidth(value);
    }

    protected /*virtual*/ getPenWidth(): float {
        return this.RealLink.PenWidth;
    }
    protected /*virtual*/ setPenWidth(value: float) {
        this.RealLink.PenWidth = value;
    }
    //#endregion

    //#region [Property] RealLink
    public get RealLink(): TuLink {
        return this.getRealLink();
    }
    public set RealLink(value: TuLink) {
        this.setRealLink(value);
    }

    protected /*virtual*/ getRealLink(): TuLink {
        return this.myRealLink;
    }
    protected /*virtual*/ setRealLink(value: TuLink) {
        const goLink: TuLink = this.myRealLink;
        if (goLink !== value) {
            if (goLink != null) {
                const goLink1: TuLink = goLink;
                goLink1.AbstractLink = goLink1;
                super.Remove(goLink);
            }
            this.myRealLink = value;
            if (value != null) {
                this.Add(value);
                value.AbstractLink = this;
            }
            this.Changed(TuLabeledLinkEvents.ChangedLink, 0, goLink, NullRect, 0, value, NullRect);
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
        return this.RealLink.Relinkable;
    }
    protected /*virtual*/ setRelinkable(value: boolean) {
        this.RealLink.Relinkable = value;
    }
    //#endregion

    //#region [Property] Reshapable

    protected /*override*/ getReshapable(): boolean {
        return this.RealLink.Reshapable;
    }
    protected /*override*/ setReshapable(value: boolean) {
        this.RealLink.Reshapable = value;
        return this;
    }
    //#endregion

    //#region [Property] Resizable

    protected /*override*/ getResizable(): boolean {
        return this.RealLink.Resizable;
    }
    protected /*override*/ setResizable(value: boolean) {
        this.RealLink.Resizable = value;
        return this;
    }
    //#endregion

    //#region [Property] SelectionObject
    protected /*override*/ getSelectionObject(): TuObject {
        return this.RealLink;
    }
    //#endregion

    //#region [Property] Shadowed
    protected /*override*/ getShadowed(): boolean {
        return this.SelectionObject.Shadowed;
    }
    protected /*override*/ setShadowed(value: boolean) {
        this.SelectionObject.Shadowed = value;
        return this;
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
        return this.RealLink.Style;
    }
    protected /*virtual*/ setStyle(value: TuStrokeStyle) {
        this.RealLink.Style = value;
    }
    //#endregion

    //#region [Property] ToArrow
    public get ToArrow(): boolean {
        return this.getToArrow();
    }
    public set ToArrow(value: boolean) {
        this.setToArrow(value);
    }

    protected /*virtual*/ getToArrow(): boolean {
        return this.RealLink.ToArrow;
    }
    protected /*virtual*/ setToArrow(value: boolean) {
        this.RealLink.ToArrow = value;
    }
    //#endregion

    //#region [Property] ToArrowFilled
    public get ToArrowFilled(): boolean {
        return this.getToArrowFilled();
    }
    public set ToArrowFilled(value: boolean) {
        this.setToArrowFilled(value);
    }

    protected /*virtual*/ getToArrowFilled(): boolean {
        return this.RealLink.ToArrowFilled;
    }
    protected /*virtual*/ setToArrowFilled(value: boolean) {
        this.RealLink.ToArrowFilled = value;
    }
    //#endregion

    //#region [Property] ToArrowLength
    public get ToArrowLength(): float {
        return this.getToArrowLength();
    }
    public set ToArrowLength(value: float) {
        this.setToArrowLength(value);
    }

    protected /*virtual*/ getToArrowLength(): float {
        return this.RealLink.ToArrowLength;
    }
    protected /*virtual*/ setToArrowLength(value: float) {
        this.RealLink.ToArrowLength = value;
    }
    //#endregion

    //#region [Property] ToArrowShaftLength
    public get ToArrowShaftLength(): float {
        return this.getToArrowShaftLength();
    }
    public set ToArrowShaftLength(value: float) {
        this.setToArrowShaftLength(value);
    }

    protected /*virtual*/ getToArrowShaftLength(): float {
        return this.RealLink.ToArrowShaftLength;
    }
    protected /*virtual*/ setToArrowShaftLength(value: float) {
        this.RealLink.ToArrowShaftLength = value;
    }
    //#endregion

    //#region [Property] ToArrowStyle
    public get ToArrowStyle(): TuStrokeArrowheadStyle {
        return this.getToArrowStyle();
    }
    public set ToArrowStyle(value: TuStrokeArrowheadStyle) {
        this.setToArrowStyle(value);
    }

    protected /*virtual*/ getToArrowStyle(): TuStrokeArrowheadStyle {
        return this.RealLink.ToArrowStyle;
    }
    protected /*virtual*/ setToArrowStyle(value: TuStrokeArrowheadStyle) {
        this.RealLink.ToArrowStyle = value;
    }
    //#endregion

    //#region [Property] ToArrowWidth
    public get ToArrowWidth(): float {
        return this.getToArrowWidth();
    }
    public set ToArrowWidth(value: float) {
        this.setToArrowWidth(value);
    }

    protected /*virtual*/ getToArrowWidth(): float {
        return this.RealLink.ToArrowWidth;
    }
    protected /*virtual*/ setToArrowWidth(value: float) {
        this.RealLink.ToArrowWidth = value;
    }
    //#endregion

    //#region [Property] ToLabel
    public get ToLabel(): TuObject {
        return this.getToLabel();
    }
    public set ToLabel(value: TuObject) {
        this.setToLabel(value);
    }

    protected /*virtual*/ getToLabel(): TuObject {
        return this.myToLabel;
    }
    protected /*virtual*/ setToLabel(value: TuObject) {
        const goObject: TuObject = this.myToLabel;
        if (goObject != value) {
            if (goObject != null) {
                super.Remove(goObject);
            }
            this.myToLabel = value;
            if (value != null) {
                super.Add(value);
                if (value === this.MidLabel) {
                    this.myMidLabel = undefined;
                    this.Changed(TuLabeledLinkEvents.ChangedMidLabel, 0, value, NullRect, 0, undefined, NullRect);
                }
                else if (value === this.FromLabel) {
                    this.myFromLabel = undefined;
                    this.Changed(TuLabeledLinkEvents.ChangedFromLabel, 0, value, NullRect, 0, undefined, NullRect);
                }
            }
            this.Changed(TuLabeledLinkEvents.ChangedToLabel, 0, goObject, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] ToLabelCentered
    public get ToLabelCentered(): boolean {
        return this.getToLabelCentered();
    }
    public set ToLabelCentered(value: boolean) {
        this.setToLabelCentered(value);
    }

    protected /*virtual*/ getToLabelCentered(): boolean {
        return (this.InternalFlags & flagToLabelCentered) !== 0;
    }
    protected /*virtual*/ setToLabelCentered(value: boolean) {
        const internalFlags: boolean = (this.InternalFlags & flagToLabelCentered) !== 0;
        if (internalFlags != value) {
            if (!value) {
                this.InternalFlags = this.InternalFlags & ~flagToLabelCentered;
            }
            else {
                this.InternalFlags = this.InternalFlags | flagToLabelCentered;
            }
            this.Changed(TuLabeledLinkEvents.ChangedToLabelCentered, 0, internalFlags, NullRect, 0, value, NullRect);
            if (!this.Initializing) {
                this.layoutChildren(this.ToLabel);
            }
        }
    }
    //#endregion

    //#region [Property] ToNode
    public get ToNode(): ITuNode {
        return this.getToNode();
    }

    protected /*virtual*/ getToNode(): ITuNode {
        return this.myRealLink.ToNode;
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
        return this.RealLink.ToolTipText;
    }
    protected /*virtual*/ setToolTipText(value: string) {
        this.RealLink.ToolTipText = value;
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
        return this.myRealLink.ToPort;
    }
    protected /*virtual*/ setToPort(value: ITuPort) {
        this.myRealLink.ToPort = value;
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
        return this.myRealLink.UserFlags;
    }
    protected /*virtual*/ setUserFlags(value: number) {
        this.myRealLink.UserFlags = value;
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
        return this.myRealLink.UserObject;
    }
    protected /*virtual*/ setUserObject(value: any) {
        this.myRealLink.UserObject = value;
    }
    //#endregion

    public constructor() {
        super();
        this.InternalFlags = this.InternalFlags & -5;
        const goLink: TuLink = this.createRealLink();
        if (goLink != null) {
            goLink.Selectable = false;
            this.RealLink = goLink;
        }
    }

    public calculateRoute(): void {
        this.RealLink.calculateRoute();
    }

    public calculateStroke(): void {
        this.RealLink.calculateStroke();
    }

    public /*override*/ ChangeValue(e: TuChangedEventArgs, undo: boolean): void {
        switch (e.SubHint) {
            case TuLabeledLinkEvents.ChangedLink:
                {
                    this.RealLink = e.getValue(undo);
                    return;
                }
            case TuLabeledLinkEvents.ChangedFromLabel:
                {
                    this.FromLabel = e.getValue(undo);
                    return;
                }
            case TuLabeledLinkEvents.ChangedMidLabel:
                {
                    this.MidLabel = e.getValue(undo);
                    return;
                }
            case TuLabeledLinkEvents.ChangedToLabel:
                {
                    this.ToLabel = e.getValue(undo);
                    return;
                }
            case TuLabeledLinkEvents.ChangedFromLabelCentered:
                {
                    this.FromLabelCentered = e.getValue(undo);
                    return;
                }
            case TuLabeledLinkEvents.ChangedMidLabelCentered:
                {
                    this.MidLabelCentered = e.getValue(undo);
                    return;
                }
            case TuLabeledLinkEvents.ChangedToLabelCentered:
                {
                    this.ToLabelCentered = e.getValue(undo);
                    return;
                }
        }
        super.ChangeValue(e, undo);
    }

    protected /*override*/ copyChildren(newgroup: TuGroup, env: TuCopyDictionary): void {
        super.copyChildren(newgroup, env);
        const item: TuLabeledLink = as(newgroup, Types.TuLabeledLink);
        item.myRealLink = env.Get(this.myRealLink);
        item.myFromLabel = env.Get(this.myFromLabel);
        item.myMidLabel = env.Get(this.myMidLabel);
        item.myToLabel = env.Get(this.myToLabel);
    }

    public /*virtual*/ createRealLink(): TuLink {
        return new TuLink();
    }

    public /*override*/ findChild(name: string): TuObject {
        if (name === "RealLink") {
            return this.RealLink;
        }
        if (name === "FromLabel") {
            return this.FromLabel;
        }
        if (name === "MidLabel") {
            return this.MidLabel;
        }
        if (name === "ToLabel") {
            return this.ToLabel;
        }
        return super.findChild(name);
    }

    public /*override*/ findName(child: TuObject): string {
        if (child === this.RealLink) {
            return "RealLink";
        }
        if (child === this.FromLabel) {
            return "FromLabel";
        }
        if (child === this.MidLabel) {
            return "MidLabel";
        }
        if (child === this.ToLabel) {
            return "ToLabel";
        }
        return super.findName(child);
    }

    public getOtherNode(n: ITuNode): ITuNode {
        return TuLink.GetOtherNode(this, n);
    }

    public getOtherPort(p: ITuPort): ITuPort {
        return TuLink.GetOtherPort(this, p);
    }

    public /*override*/ GetToolTip(view: TuView): string {
        return this.ToolTipText;
    }

    public /*override*/ layoutChildren(childchanged: TuObject): void {
        if (this.Initializing) {
            return;
        }
        const realLink: TuLink = this.RealLink;
        if (realLink == null) {
            return;
        }
        const pointsCount: number = realLink.PointsCount;
        if (pointsCount >= 2) {
            let fromLabel: TuObject = this.FromLabel;
            if (fromLabel != null) {
                const point: CGPoint = realLink.getPoint(0);
                const pointF: CGPoint = realLink.getPoint(1);
                if (pointsCount !== 2) {
                    this.positionEndLabel(fromLabel, false, point.clone(), pointF.clone(), realLink.getPoint(2));
                }
                else {
                    const pointF1: CGPoint = point.clone();
                    this.positionEndLabel(fromLabel, false, pointF1, pointF1, pointF);
                }
            }
            this.layoutMidLabel(childchanged);
            fromLabel = this.ToLabel;
            if (fromLabel != null) {
                const point1: CGPoint = realLink.getPoint(pointsCount - 1);
                const point2: CGPoint = realLink.getPoint(pointsCount - 2);
                if (pointsCount === 2) {
                    const pointF2: CGPoint = point1.clone();
                    this.positionEndLabel(fromLabel, true, pointF2.clone(), pointF2.clone(), point2.clone());
                    return;
                }
                this.positionEndLabel(fromLabel, true, point1.clone(), point2.clone(), realLink.getPoint(pointsCount - 3));
            }
        }
    }

    protected /*virtual*/ layoutMidLabel(childchanged: TuObject): void {
        let pointF: Out<CGPoint> = New.Out();
        let pointF1: Out<CGPoint> = New.Out();
        const midLabel: TuObject = this.MidLabel;
        if (midLabel != null) {
            const realLink: TuLink = this.RealLink;
            let pointsCount: number = realLink.PointsCount;
            if (pointsCount < 2) {
                return;
            }
            if (realLink.Style === TuStrokeStyle.Bezier && pointsCount < 7) {
                const point: CGPoint = realLink.getPoint(0);
                const point1: CGPoint = realLink.getPoint(1);
                const point2: CGPoint = realLink.getPoint(pointsCount - 2);
                const pointF2: CGPoint = realLink.getPoint(pointsCount - 1);
                GeomUtilities.BezierMidPoint(point.clone(), point1.clone(), point2.clone(), pointF2.clone(), pointF, pointF1);
                this.positionMidLabel(midLabel, pointF.value, pointF1.value);
                return;
            }
            const int32: number = pointsCount / 2;
            if (pointsCount % 2 == 0) {
                const point3: CGPoint = realLink.getPoint(int32 - 1);
                this.positionMidLabel(midLabel, point3.clone(), realLink.getPoint(int32));
                return;
            }
            const pointF3: CGPoint = realLink.getPoint(int32 - 1);
            const point4: CGPoint = realLink.getPoint(int32);
            const pointF4: CGPoint = realLink.getPoint(int32 + 1);
            const x: float = point4.X - pointF3.X;
            const y: float = point4.Y - pointF3.Y;
            const single: float = pointF4.X - point4.X;
            const y1: float = pointF4.Y - point4.Y;
            const single1: float = y;
            const single2: float = single;
            const single3: float = y1;
            if (x * x + single1 * single1 >= single2 * single2 + single3 * single3) {
                this.positionMidLabel(midLabel, pointF3, point4);
                return;
            }
            this.positionMidLabel(midLabel, point4, pointF4);
        }
    }

    protected /*override*/ moveChildren(old: CGRectangle): void {
        const initializing: boolean = this.Initializing;
        this.Initializing = true;
        super.moveChildren(old);
        this.Initializing = initializing;
    }

    public /*virtual*/ onPortChanged(port: ITuPort, subhint: number, oldI: number, oldVal: any, oldRect: CGRectangle, newI: number, newVal: any, newRect: CGRectangle): void {
        let goObject: TuObject;
        if (this.RealLink != null) {
            this.RealLink.onPortChanged(port, subhint, oldI, oldVal, oldRect, newI, newVal, newRect);
        }
        if (port == null) {
            goObject = undefined;
        }
        else {
            goObject = port.TuObject;
        }
        this.layoutChildren(goObject);
    }

    public /*override*/ Pick(p: CGPoint, selectableOnly: boolean): TuObject {
        let goObject: TuObject;
        const bounds: Out<CGRectangle> = { value: this.Bounds };
        let single: float = 0;
        if (this.RealLink != null) {
            single = Math.max(0, this.RealLink.PickMargin);
        }
        const single1: float = single;
        GeomUtilities.InflateRect(bounds, single1, single1);
        if (!GeomUtilities.ContainsRect(bounds.value, p)) {
            return undefined;
        }
        if (!this.CanView()) {
            return undefined;
        }
        const enumerator: TuGroupEnumerator = this.Backwards.GetEnumerator();
        try {
            while (enumerator.MoveNext()) {
                const goObject1: TuObject = enumerator.Current.Pick(p, selectableOnly);
                if (goObject1 == null) {
                    continue;
                }
                goObject = goObject1;
                return goObject;
            }
            if (this.PickableBackground) {
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
            }
            return undefined;
        }
        finally {
            enumerator.Dispose();
        }
        return goObject;
    }

    protected /*virtual*/ positionEndLabel(lab: TuObject, atEnd: boolean, a: CGPoint, b: CGPoint, c: CGPoint): void {
        let flag: boolean;
        if (atEnd || !this.FromLabelCentered) {
            flag = (!atEnd ? false : this.ToLabelCentered);
        }
        else {
            flag = true;
        }
        if (flag) {
            if (super.IsApprox(a.X, b.X) && super.IsApprox(a.Y, b.Y) || !super.IsApprox(a.X, b.X) && !super.IsApprox(a.Y, b.Y)) {
                if (a.X < c.X && Math.abs(c.Y - a.Y) < c.X - a.X) {
                    lab.setSpotLocation(MiddleLeft, a);
                    return;
                }
                if (a.X > c.X && Math.abs(c.Y - a.Y) < a.X - c.X) {
                    lab.setSpotLocation(MiddleRight, a);
                    return;
                }
                if (a.Y < c.Y) {
                    lab.setSpotLocation(TopCenter, a);
                    return;
                }
                lab.setSpotLocation(MiddleBottom, a);
                return;
            }
            if (super.IsApprox(a.X, b.X)) {
                if (a.Y < b.Y) {
                    lab.setSpotLocation(TopCenter, a);
                    return;
                }
                lab.setSpotLocation(MiddleBottom, a);
                return;
            }
            if (super.IsApprox(a.Y, b.Y)) {
                if (a.X < b.X) {
                    lab.setSpotLocation(MiddleLeft, a);
                    return;
                }
                lab.setSpotLocation(MiddleRight, a);
                return;
            }
            if (a.X < b.X) {
                if (a.Y < b.Y) {
                    lab.setSpotLocation(TopLeft, a);
                    return;
                }
                lab.setSpotLocation(BottomLeft, a);
                return;
            }
            if (a.Y < b.Y) {
                lab.setSpotLocation(BottomRight, a);
                return;
            }
            lab.setSpotLocation(TopRight, a);
            return;
        }
        let fromArrowLength: float = 2;
        if ((!super.IsApprox(a.X, b.X) || !super.IsApprox(a.Y, b.Y)) && (super.IsApprox(a.X, b.X) || super.IsApprox(a.Y, b.Y))) {
            if (a.X < b.X) {
                a.X = a.X + fromArrowLength;
                if (b.Y <= c.Y) {
                    lab.setSpotLocation(BottomLeft, a);
                    return;
                }
                lab.setSpotLocation(TopLeft, a);
                return;
            }
            if (a.X > b.X) {
                a.X = a.X - fromArrowLength;
                if (b.Y <= c.Y) {
                    lab.setSpotLocation(BottomRight, a);
                    return;
                }
                lab.setSpotLocation(TopRight, a);
                return;
            }
            if (a.Y < b.Y) {
                a.Y = a.Y + fromArrowLength;
                if (b.X <= c.X) {
                    lab.setSpotLocation(TopRight, a);
                    return;
                }
                lab.setSpotLocation(TopLeft, a);
                return;
            }
            if (a.Y > b.Y) {
                a.Y = a.Y - fromArrowLength;
                if (b.X <= c.X) {
                    lab.setSpotLocation(BottomRight, a);
                    return;
                }
                lab.setSpotLocation(BottomLeft, a);
            }
            return;
        }
        if (!atEnd && this.FromArrow) {
            fromArrowLength = fromArrowLength + this.FromArrowLength;
        }
        else if (atEnd && this.ToArrow) {
            fromArrowLength = fromArrowLength + this.ToArrowLength;
        }
        if (a.X < c.X && Math.abs(c.Y - a.Y) < c.X - a.X) {
            a.X = a.X + fromArrowLength;
            if (a.Y < c.Y) {
                lab.setSpotLocation(TopLeft, a);
                return;
            }
            lab.setSpotLocation(BottomLeft, a);
            return;
        }
        if (a.X > c.X && Math.abs(c.Y - a.Y) < a.X - c.X) {
            a.X = a.X - fromArrowLength;
            if (a.Y < c.Y) {
                lab.setSpotLocation(TopRight, a);
                return;
            }
            lab.setSpotLocation(BottomRight, a);
            return;
        }
        if (a.Y < c.Y) {
            a.Y = a.Y + fromArrowLength;
            if (a.X < c.X) {
                lab.setSpotLocation(TopLeft, a);
                return;
            }
            lab.setSpotLocation(TopRight, a);
            return;
        }
        a.Y = a.Y - fromArrowLength;
        if (a.X < c.X) {
            lab.setSpotLocation(BottomLeft, a);
            return;
        }
        lab.setSpotLocation(BottomRight, a);
    }

    protected /*virtual*/ positionMidLabel(lab: TuObject, a: CGPoint, b: CGPoint): void {
        const pointF: CGPoint = new CGPoint((a.X + b.X) / 2, (a.Y + b.Y) / 2);
        let int32: Spot = MiddleCenter;
        if (!this.MidLabelCentered) {
            if (a.X < b.X) {
                if (!super.IsApprox(a.Y, b.Y)) {
                    int32 = (a.Y >= b.Y ? BottomRight : BottomLeft);
                }
                else {
                    int32 = MiddleBottom;
                }
            }
            else if (!super.IsApprox(a.Y, b.Y)) {
                int32 = (a.Y >= b.Y ? TopRight : TopLeft);
            }
            else {
                int32 = MiddleTop;
            }
        }
        lab.setSpotLocation(int32, pointF);
    }

    public /* override */  Remove( obj: TuObject):boolean
		{
			const flag: boolean = super.Remove(obj);
			if (obj === this.RealLink)
			{
				this.RealLink = null;
				return flag;
			}
			if (obj === this.FromLabel)
			{
				this.FromLabel = null;
				return flag;
			}
			if (obj === this.MidLabel)
			{
				this.MidLabel = null;
				return flag;
			}
			if (obj == this.ToLabel)
			{
				this.ToLabel = null;
			}
			return flag;
		}
    public /*virtual*/  unlink(): void {
        const layer: TuLayer = this.Layer;
        if (layer != null) {
            layer.Remove(this);
        }
    }

    public updateRoute(): void {
        const document: TuDocument = this.Document;
        if (document == null) {
            this.calculateRoute();
            return;
        }
        document.UpdateRoute(this);
    }
}
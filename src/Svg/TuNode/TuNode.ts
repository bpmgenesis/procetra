import { TuGroupEnumerator } from './../TuGroup/TuGroupEnumerator';
import { ITuLink } from './../ITuLink';
import { NullRect } from './../Globals';
import { CGPoint, CGSize, CGRectangle } from '@tuval/cg';
import { TuNodeSearch } from './TuNodeSearch';
import { TuNodeLinkEnumerator } from './TuNodeLinkEnumerator';
import { ITuIdentifiablePart } from './../ITuIdentifiablePart';
import { ITuLabeledNode } from './../TuLabeledNode/ITuLabeledNode';
import { Types } from './../types';
import { ClassInfo, List, convert, as, foreach, is, CONTINUE } from '@tuval/core';
import { TuGroup } from '../TuGroup/TuGroup';
import { ITuNode } from './ITuNode';
import { ITuGraphPart } from '../TuLink/ITuGraphPart';
import { ITuLabeledPart } from '../TuLabeledNode/ITuLabeledPart';
import { TuNodeNodeEnumerator } from './TuNodeNodeEnumerator';
import { TuObject } from '../TuObject/TuObject';
import { TuText } from '../TuText/TuText';
import { TuTool } from '../TuTool/TuTool';
import { TuNodeEvents } from './TuNodeEvents';
import { TuNodePortEnumerator } from './TuNodePortEnumerator';
import { TuChangedEventArgs } from '../TuChangedEventArgs';
import { ITuPort } from '../ITuPort';
import { TuCopyDictionary } from '../TuCopyDictionary';
import { TuView } from '../TuView/TuView';
import { TuPort } from '../TuPort/TuPort';



@ClassInfo({
    fullName: Types.TuNode,
    instanceof: [
        Types.TuNode,
        Types.ITuNode,
        Types.ITuGraphPart,
        Types.ITuLabeledNode,
        Types.ITuLabeledPart,
        Types.ITuIdentifiablePart
    ]
})
export class TuNode extends TuGroup implements ITuNode, ITuGraphPart, ITuLabeledNode, ITuLabeledPart, ITuIdentifiablePart {
    private flagPropsOnSelObj: boolean = false;
    private myToolTipText: string;
    private myUserFlags: number;
    private myUserObject: any;
    private myPartID: number = -1;

    //#region [Property] DestinationLinks
    public get DestinationLinks(): TuNodeLinkEnumerator {
        return this.getDestinationLinks();
    }

    protected /*virtual*/ getDestinationLinks(): TuNodeLinkEnumerator {
        return this.getLinkEnumerator(TuNodeSearch.LinksOut);
    }
    //#endregion

    //#region [Property] Destinations
    public get Destinations(): TuNodeNodeEnumerator {
        return this.getDestinations();
    }

    protected /*virtual*/ getDestinations(): TuNodeNodeEnumerator {
        return this.getNodeEnumerator(TuNodeSearch.NodesOut);
    }
    //#endregion

    //#region [Property] NodeObject
    public get TuObject(): TuObject {
        return this.getNodeObject();
    }

    public set TuObject(value: TuObject) {
        this.setNodeObject(value);
    }

    protected /*virtual*/ getNodeObject(): TuObject {
        return this;
    }

    protected /*virtual*/ setNodeObject(value: TuObject): TuNode {
        return this;
    }
    //#endregion

    //#region [Property] Label
    public get Label(): TuText {
        return this.getLabel();
    }

    public set Label(value: TuText) {
        this.setLabel(value);
    }

    protected /*virtual*/ getLabel(): TuText {
        return TuNode.findLabel(this);
    }

    protected /*virtual*/ setLabel(value: TuText) {

    }
    //#endregion

    //#region [Property] Links
    public get Links(): TuNodeLinkEnumerator {
        return this.getLinks();
    }

    protected /*virtual*/ getLinks(): TuNodeLinkEnumerator {
        return this.getLinkEnumerator(TuNodeSearch.LinksIn | TuNodeSearch.LinksOut);
    }
    //#endregion

    //#region [Property] Location
    protected /*virtual*/ getLocation(): CGPoint {
        if (!this.PropertiesDelegatedToSelectionObject || this.SelectionObject === this) {
            return this.Position;
        }
        return this.SelectionObject.Center;
    }

    protected /*virtual*/ setLocation(value: CGPoint):void {
        if (!this.PropertiesDelegatedToSelectionObject || this.SelectionObject === this) {
            this.Position = value;
            return;
        }
        const sizeF: CGSize = TuTool.SubtractPoints(this.SelectionObject.Center, this.Position);
        this.Position = new CGPoint({ x: value.X - sizeF.Width, y: value.Y - sizeF.Height });
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

    protected /*virtual*/ setPartID(value: number): TuNode {
        const int32 = this.myPartID;
        if (int32 !== value) {
            this.myPartID = value;
            this.Changed(TuNodeEvents.ChangedPartID, int32, undefined, NullRect, value, undefined, NullRect);
        }
        return this;
    }
    //#endregion

    //#region [Property] Ports
    public get Ports(): TuNodePortEnumerator {
        return this.getPorts();
    }

    protected /*virtual*/ getPorts(): TuNodePortEnumerator {
        return this.getPortEnumerator();
    }
    //#endregion

    //#region [Property] Nodes
    public get Nodes(): TuNodeNodeEnumerator {
        return this.getNodes();
    }

    protected /*virtual*/ getNodes(): TuNodeNodeEnumerator {
        return this.getNodeEnumerator(TuNodeSearch.NodesIn | TuNodeSearch.NodesOut);
    }
    //#endregion

    //#region [Property] SourceLinks
    public get SourceLinks(): TuNodeLinkEnumerator {
        return this.getSourceLinks();
    }

    protected /*virtual*/ getSourceLinks(): TuNodeLinkEnumerator {
        return this.getLinkEnumerator(TuNodeSearch.LinksIn);
    }
    //#endregion

    //#region [Property] Sources
    public get Sources(): TuNodeNodeEnumerator {
        return this.getSources();
    }

    protected /*virtual*/ getSources(): TuNodeNodeEnumerator {
        return this.getNodeEnumerator(TuNodeSearch.NodesIn);
    }
    //#endregion

    //#region [Property] PropertiesDelegatedToSelectionObject
    public get PropertiesDelegatedToSelectionObject(): boolean {
        return this.getPropertiesDelegatedToSelectionObject();
    }

    public set PropertiesDelegatedToSelectionObject(value: boolean) {
        this.setPropertiesDelegatedToSelectionObject(value);
    }

    protected /*virtual*/ getPropertiesDelegatedToSelectionObject(): boolean {
        return this.flagPropsOnSelObj;
    }

    protected /*virtual*/ setPropertiesDelegatedToSelectionObject(value: boolean): TuNode {
        const internalFlags = this.flagPropsOnSelObj;
        if (internalFlags !== value) {
            this.flagPropsOnSelObj = value;
            this.Changed(TuNodeEvents.ChangedPropertiesDelegatedToSelectionObject, 0, internalFlags, NullRect, 0, value, NullRect);
        }

        return this;
    }
    //#endregion

    //#region [Property] Reshapable
    protected /*override*/ getReshapable(): boolean {
        if (!this.PropertiesDelegatedToSelectionObject || this.SelectionObject === this) {
            return this.Reshapable;
        }
        return this.SelectionObject.Reshapable;
    }

    protected /*override*/ setReshapable(value: boolean): TuNode {
        if (!this.PropertiesDelegatedToSelectionObject || this.SelectionObject == this) {
            this.Reshapable = value;
            return;
        }
        this.SelectionObject.Reshapable = value;
        return this;
    }
    //#endregion

    //#region [Property] Resizable
    protected /*override*/ getResizable(): boolean {
        if (!this.PropertiesDelegatedToSelectionObject || this.SelectionObject === this) {
            return super.getResizable();
        }
        return this.SelectionObject.Resizable;
    }

    protected /*override*/ setResizable(value: boolean): TuNode {

        if (!this.PropertiesDelegatedToSelectionObject || this.SelectionObject === this) {
            super.setResizable(value);
            return;
        }
        this.SelectionObject.Resizable = value;
        return this;
    }
    //#endregion

    //#region [Property] ResizesRealtime
    protected /*override*/ getResizesRealtime(): boolean {
        if (!this.PropertiesDelegatedToSelectionObject || this.SelectionObject === this) {
            return this.ResizesRealtime;
        }
        return this.SelectionObject.ResizesRealtime;
    }

    protected /*override*/ setResizesRealtime(value: boolean): TuNode {
        if (!this.PropertiesDelegatedToSelectionObject || this.SelectionObject === this) {
            this.ResizesRealtime = value;
            return;
        }
        this.SelectionObject.ResizesRealtime = value;
        return this;
    }
    //#endregion

    //#region [Property] Shadowed
    protected /*override*/ getShadowed(): boolean {
        if (!this.PropertiesDelegatedToSelectionObject || this.SelectionObject === this) {
            return this.Shadowed;
        }
        return this.SelectionObject.Shadowed;
    }

    protected /*override*/ setShadowed(value: boolean): TuNode {
        if (!this.PropertiesDelegatedToSelectionObject || this.SelectionObject === this) {
            this.Shadowed = value;
            return;
        }
        this.SelectionObject.Shadowed = value;
        return this;
    }
    //#endregion

    //#region [Property] Text
    public get Text(): string {
        return this.getText();
    }

    public set Text(value: string) {
        this.setText(value);
    }

    protected /*virtual*/ getText(): string {
        const label: TuText = this.Label;
        if (label == null) {
            return '';
        }
        return label.Text;
    }

    protected /*virtual*/ setText(value: string): TuNode {
        const label: TuText = this.Label;
        if (label != null) {
            label.Text = value;
        }

        return this;
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

    protected /*virtual*/ setToolTipText(value: string): TuNode {
        const str: string = this.myToolTipText;
        if (str !== value) {
            this.myToolTipText = value;
            this.Changed(TuNodeEvents.ChangedToolTipText, 0, str, NullRect, 0, value, NullRect);
        }
        return this;
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

    protected /*virtual*/ setUserFlags(value: number): TuNode {
        const int32 = this.myUserFlags;
        if (int32 !== value) {
            this.myUserFlags = value;
            this.Changed(TuNodeEvents.ChangedNodeUserFlags, int32, undefined, NullRect, value, undefined, NullRect);
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

    protected /*virtual*/ setUserObject(value: any): TuNode {
        const obj: any = this.myUserObject;
        if (obj !== value) {
            this.myUserObject = value;
            this.Changed(TuNodeEvents.ChangedNodeUserObject, 0, obj, NullRect, 0, value, NullRect);
        }
        return this;
    }
    //#endregion


    public /*override*/ getEventObject(): any {
        return TuNodeEvents;
    }

    private _addItem<T>(items: List<T>, obj: T): void {
        if (obj != null && !items.Contains(obj)) {
            items.Add(obj);
        }
    }

    public /*override*/ ChangeValue(e: TuChangedEventArgs, undo: boolean) {
        switch (e.SubHint) {
            case TuNodeEvents.ChangedNodeUserFlags:
                {
                    this.UserFlags = e.getFloat(undo);
                    return;
                }
            case TuNodeEvents.ChangedNodeUserObject:
                {
                    this.UserObject = e.getValue(undo);
                    return;
                }
            case TuNodeEvents.ChangedToolTipText:
                {
                    this.ToolTipText = e.getValue(undo);
                    return;
                }
            case TuNodeEvents.ChangedPropertiesDelegatedToSelectionObject:
                {
                    this.PropertiesDelegatedToSelectionObject = e.getValue(undo);
                    return;
                }
            case TuNodeEvents.ChangedPartID:
                {
                    this.PartID = e.getFloat(undo);
                    return;
                }
        }
        super.ChangeValue(e, undo);
    }

    private considerLink<T>(l: ITuLink, p: ITuPort, s: TuNodeSearch, items: List<T>): void {
        const flag: boolean = (s & TuNodeSearch.NotSelf) === 0;
        if (l.FromPort === p && (flag || l.ToPort.TuObject == null || !l.ToPort.TuObject.isChildOf(this))) {
            if ((s & TuNodeSearch.LinksOut) !== 0) {
                this._addItem<T>(items, <any>l);
            }
            if ((s & TuNodeSearch.NodesOut) !== 0) {
                this._addItem<T>(items, <any>l.ToNode);
            }
        }
        if (l.ToPort === p && (flag || l.FromPort.TuObject == null || !l.FromPort.TuObject.isChildOf(this))) {
            if ((s & TuNodeSearch.LinksIn) !== 0) {
                this._addItem<T>(items, <any>l);
            }
            if ((s & TuNodeSearch.NodesIn) !== 0) {
                this._addItem<T>(items, convert<T>(l.FromNode));
            }
        }
    }

    public /*override*/ copyObject(env: TuCopyDictionary): TuObject {
        const goNode: TuNode = as(super.CopyObject(env), Types.TuNode);
        if (goNode != null) {
            goNode.myPartID = -1;
        }
        return goNode;
    }

    public copyPropertiesFromSelectionObject(oldobj: TuObject, newobj: TuObject): void {
        if (oldobj != null && newobj != null && oldobj === this.SelectionObject) {
            newobj.Center = oldobj.Center;
            newobj.Selectable = oldobj.Selectable;
            newobj.Resizable = oldobj.Resizable;
            newobj.Reshapable = oldobj.Reshapable;
            newobj.ResizesRealtime = oldobj.ResizesRealtime;
            newobj.Shadowed = oldobj.Shadowed;
        }
    }

    public /*override*/ DoBeginEdit(view: TuView): void {
        if (this.Label != null) {
            this.Label.DoBeginEdit(view);
        }
    }

    public findAll<T>(s: TuNodeSearch): List<T> {
        const ts = new List<T>();
        this.findAllAux<T>(this, s, ts);
        return ts;
    }

    private findAllAux<T>(obj: TuObject, s: TuNodeSearch, items: List<T>): void {
        const goPort: ITuPort = as(obj, Types.ITuPort);
        if (goPort != null) {
            if ((s & TuNodeSearch.Ports) !== 0) {
                this._addItem<T>(items, convert<T>(goPort));
            }
            const goPort1: TuPort = as(goPort, Types.TuPort);
            if (goPort1 == null) {
                foreach(goPort.Links, (link: ITuLink) => {
                    this.considerLink<T>(link, goPort, s, items);
                });
            }
            else {
                foreach(goPort1.Links, (goLink: ITuLink) => {
                    this.considerLink<T>(goLink, goPort, s, items);
                });

            }
        }
        const goGroups: TuGroup = as(obj, Types.TuGroup);
        if (goGroups != null) {
            foreach(goGroups.GetEnumerator(), (enumerator: TuObject) => {
                this.findAllAux<T>(enumerator, s, items);
            });
        }
    }

    public static findLabel(obj: TuObject): TuText {
        let goText: TuText;
        const goText1: TuText = as(obj, Types.TuText);
        if (goText1 != null) {
            return goText1;
        }
        const goGroups: TuGroup = as(obj, Types.TuGroup);
        if (goGroups != null) {
            const enumerator: TuGroupEnumerator = goGroups.GetEnumerator().GetEnumerator();
            try {
                while (enumerator.MoveNext()) {
                    const goText2: TuText = TuNode.findLabel(enumerator.Current);
                    if (goText2 == null) {
                        continue;
                    }
                    goText = goText2;
                    return goText;
                }
                return undefined;
            }
            finally {
                enumerator.Dispose();
            }
            return goText;
        }
        return undefined;
    }

    protected getLinkEnumerator(s: TuNodeSearch): TuNodeLinkEnumerator {
        return new TuNodeLinkEnumerator(this, s);
    }

    protected getNodeEnumerator(s: TuNodeSearch): TuNodeNodeEnumerator {
        return new TuNodeNodeEnumerator(this, s);
    }

    protected getPortEnumerator(): TuNodePortEnumerator {
        return new TuNodePortEnumerator(this, TuNodeSearch.Ports);
    }

    public /*override*/ GetToolTip(view: TuView): string {
        return this.ToolTipText;
    }

    protected /*override*/ moveChildren(prevRect: CGRectangle): void {
        const thisBounds = this.Bounds.clone();
        const left: number = thisBounds.X - prevRect.X;
        const top: number = thisBounds.Y - prevRect.Y;
        foreach(this, (rectangleF: TuObject) => {
            if (!is.typeof(rectangleF, Types.ITuLink)) {
                return CONTINUE;
            }
            const bounds: CGRectangle = rectangleF.Bounds.clone();
            rectangleF.Bounds = new CGRectangle({ x: bounds.X + left, y: bounds.Y + top, width: bounds.Width, height: bounds.Height });
        });

        foreach(this, (goObject: TuObject) => {
            if (is.typeof<ITuLink>(goObject, Types.ITuLink)) {
                return CONTINUE;
            }
            const bounds1: CGRectangle = goObject.Bounds.clone();
            goObject.Bounds = new CGRectangle({ x: bounds1.X + left, y: bounds1.Y + top, width: bounds1.Width, height: bounds1.Height });
        });
    }
    protected /*override*/ rescaleChildren(prevRect: CGRectangle): void {
        if (prevRect.Width <= 0 || prevRect.Height <= 0) {
            return;
        }
        const bounds: CGRectangle = this.Bounds.clone();
        const width: number = bounds.Width / prevRect.Width;
        const height: number = bounds.Height / prevRect.Height;
        foreach(this, (rectangleF: TuObject) => {
            if (!is.typeof(rectangleF, Types.ITuLink) || !rectangleF.AutoRescales) {
                return CONTINUE;
            }
            const bounds1: CGRectangle = rectangleF.Bounds.clone();
            const x: number = bounds.X + (bounds1.X - prevRect.X) * width;
            const y: number = bounds.Y + (bounds1.Y - prevRect.Y) * height;
            const single: number = bounds1.Width * width;
            const height1: number = bounds1.Height * height;
            rectangleF.Bounds = new CGRectangle({ x: x, y: y, width: single, height: height1 });
        });

        foreach(this, (goObject: TuObject) => {
            if (is.typeof<ITuLink>(goObject, Types.ITuLink) || !goObject.AutoRescales) {
                return CONTINUE;
            }
            const rectangleF1: CGRectangle = goObject.Bounds.clone();
            const x1: number = bounds.X + (rectangleF1.X - prevRect.X) * width;
            const y1: number = bounds.Y + (rectangleF1.Y - prevRect.Y) * height;
            const width1: number = rectangleF1.Width * width;
            const single1 = rectangleF1.Height * height;
            goObject.Bounds = new CGRectangle({ x: x1, y: y1, width: width1, height: single1 });
        });
    }
}
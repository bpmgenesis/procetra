import { TuTool } from "./TuTool";
import { ClassInfo, Dictionary, as, is, foreach, Out, New, List, CONTINUE, Type, typeOf } from '@tuval/core';
import { Types } from '../types';
import { ITuPort } from "../ITuPort";
import { ITuLink } from "../ITuLink";
import { TuView } from "../TuView/TuView";
import { TuLink } from '../TuLink/TuLink';
import { TuLinkAdjustingStyle } from "../TuLink/TuLinkAdjustingStyle";
import { CGPoint, CGColor, CGSize, CGRectangle } from '@tuval/cg';
import { TuPortStyle } from '../TuPort/TuPortStyle';
import { TuPort } from '../TuPort/TuPort';
import { NoSpot, Spot } from "../Spot";
import { TuGroup } from "../TuGroup/TuGroup";
import { TuLayerCache } from '../TuLayer/TuLayerCache';
import { TuLayer } from "../TuLayer/TuLayer";
import { TuSubGraphBase } from "../TuSubGraph/TuSubGraphBase";
import { TuObject } from "../TuObject/TuObject";
import { TuLabeledLink } from "../TuLabeledLink/TuLabeledLink";
import { CancelEventArgs } from "../Forms/CancelEventArgs";

@ClassInfo({
    fullName: Types.TuToolLinking,
    instanceof: [
        Types.TuToolLinking
    ]
})
export class TuToolLinking extends TuTool {
    public GetType(): Type {
        return typeOf(Types.TuToolLinking);
    }
    public static readonly Valid: any;
    public static readonly Invalid: any;
    private myForwardsOnly: boolean = false;
    private myLinkingNew: boolean = true;
    private myForwards: boolean = true;
    private myOrigStartPort: ITuPort;
    private myOrigEndPort: ITuPort;
    private myTempStartPort: ITuPort;
    private myTempEndPort: ITuPort;
    private myTempLink: ITuLink;
    private myValidPortsCache: Dictionary<ITuPort, any>;

    //#region [Property] EndPort
    public get EndPort(): ITuPort {
        return this.getEndPort();
    }
    public set EndPort(value: ITuPort) {
        this.setEndPort(value);
    }

    protected /*virtual*/ getEndPort(): ITuPort {
        return this.myTempEndPort;
    }
    protected /*virtual*/ setEndPort(value: ITuPort) {
        this.myTempEndPort = value;
    }
    //#endregion

    //#region [Property] Forwards
    public get Forwards(): boolean {
        return this.getForwards();
    }
    public set Forwards(value: boolean) {
        this.setForwards(value);
    }

    protected /*virtual*/ getForwards(): boolean {
        return this.myForwards;
    }
    protected /*virtual*/ setForwards(value: boolean) {
        this.myForwards = value;
    }
    //#endregion

    //#region [Property] ForwardsOnly
    public get ForwardsOnly(): boolean {
        return this.getForwardsOnly();
    }
    public set ForwardsOnly(value: boolean) {
        this.setForwardsOnly(value);
    }

    protected /*virtual*/ getForwardsOnly(): boolean {
        return this.myForwards;
    }
    protected /*virtual*/ setForwardsOnly(value: boolean) {
        this.myForwards = value;
    }
    //#endregion

    //#region [Property] Link
    public get Link(): ITuLink {
        return this.getLink();
    }
    public set Link(value: ITuLink) {
        this.setLink(value);
    }

    protected /*virtual*/ getLink(): ITuLink {
        return this.myTempLink;
    }
    protected /*virtual*/ setLink(value: ITuLink) {
        this.myTempLink = value;
    }
    //#endregion

    //#region [Property] OriginalEndPort
    public get OriginalEndPort(): ITuPort {
        return this.getOriginalEndPort();
    }
    public set OriginalEndPort(value: ITuPort) {
        this.setOriginalEndPort(value);
    }

    protected /*virtual*/ getOriginalEndPort(): ITuPort {
        return this.myOrigEndPort;
    }
    protected /*virtual*/ setOriginalEndPort(value: ITuPort) {
        this.myOrigEndPort = value;
    }
    //#endregion

    //#region [Property] OriginalStartPort
    public get OriginalStartPort(): ITuPort {
        return this.getOriginalStartPort();
    }
    public set OriginalStartPort(value: ITuPort) {
        this.setOriginalStartPort(value);
    }

    protected /*virtual*/ getOriginalStartPort(): ITuPort {
        return this.myOrigStartPort;
    }
    protected /*virtual*/ setOriginalStartPort(value: ITuPort) {
        this.myOrigStartPort = value;
    }
    //#endregion

    //#region [Property] StartPort
    public get StartPort(): ITuPort {
        return this.getStartPort();
    }
    public set StartPort(value: ITuPort) {
        this.setStartPort(value);
    }

    protected /*virtual*/ getStartPort(): ITuPort {
        return this.myTempStartPort;
    }
    protected /*virtual*/ setStartPort(value: ITuPort) {
        this.myTempStartPort = value;
    }
    //#endregion

    //#region [Property] ValidPortsCache
    public get ValidPortsCache(): Dictionary<ITuPort, any> {
        return this.getValidPortsCache();
    }
    public set ValidPortsCache(value: Dictionary<ITuPort, any>) {
        this.setValidPortsCache(value);
    }

    protected /*virtual*/ getValidPortsCache(): Dictionary<ITuPort, any> {
        if (this.myValidPortsCache == null) {
            this.myValidPortsCache = new Dictionary<ITuPort, any>();
        }
        return this.myValidPortsCache;
    }
    protected /*virtual*/ setValidPortsCache(value: Dictionary<ITuPort, any>) {
        this.myValidPortsCache = value;
    }
    //#endregion

    protected constructor(v: TuView) {
        super(v);
    }

    protected /*virtual*/ createTemporaryLink(fromPort: ITuPort, toPort: ITuPort): ITuLink {
        const goLink: ITuLink = as(this.View.Document.createCopyDictionary().CopyComplete(this.View.NewLinkPrototype), Types.ITuLink);
        if (goLink == null || goLink.TuObject == null) {
            return undefined;
        }
        goLink.FromPort = fromPort;
        goLink.ToPort = toPort;
        const goObject: TuObject = goLink.TuObject;
        if (is.typeof<TuLink>(goObject, Types.TuLink)) {
            goObject.AdjustingStyle = TuLinkAdjustingStyle.Calculate;
        }
        else if (is.typeof<TuLabeledLink>(goObject, Types.TuLabeledLink)) {
            goObject.AdjustingStyle = TuLinkAdjustingStyle.Calculate;
        }
        this.View.Layers.Default.Add(goObject);
        return goLink;
    }

    protected /*virtual*/ createTemporaryPort(port: ITuPort, pnt: CGPoint, forToPort: boolean, atEnd: boolean): ITuPort {
        const goTemporaryPort: TemporaryPort = new TemporaryPort();
        goTemporaryPort.Target = as(port, Types.TuPort);

        if (port != null && port.TuObject != null) {
            goTemporaryPort.Size = port.TuObject.Size;
        }
        goTemporaryPort.Center = pnt;
        goTemporaryPort.Style = TuPortStyle.None;
        this.View.Layers.Default.Add(goTemporaryPort);
        return goTemporaryPort;
    }

    public /*override*/ doCancelMouse(): void {
        if (this.myLinkingNew) {
            if (!this.Forwards) {
                this.doNoNewLink(undefined, this.StartPort);
            }
            else {
                this.doNoNewLink(this.StartPort, undefined);
            }
        }
        else if (this.OriginalEndPort == null) {
            if (!this.Forwards) {
                this.doNoRelink(this.Link, undefined, this.StartPort);
            }
            else {
                this.doNoRelink(this.Link, this.StartPort, undefined);
            }
        }
        else if (!this.Forwards) {
            this.doCancelRelink(this.Link, this.OriginalEndPort, this.OriginalStartPort);
        }
        else {
            this.doCancelRelink(this.Link, this.OriginalStartPort, this.OriginalEndPort);
        }
        this.View.CursorName = "default";
        super.stopTool();
    }

    public /*virtual*/ doCancelRelink(oldlink: ITuLink, fromPort: ITuPort, toPort: ITuPort): void {
        oldlink.FromPort = fromPort;
        oldlink.ToPort = toPort;
        this.TransactionResult = undefined;
    }

    public /*virtual*/ doLinking(dc: CGPoint): void {
        let rectangleF: CGRectangle;
        if (this.EndPort == null) {
            return;
        }
        const goObject: TuObject = this.EndPort.TuObject;
        if (goObject == null) {
            return;
        }
        const goPort: ITuPort = this.pickNearestPort(dc);
        this.imitatePort(this.EndPort, goPort);
        rectangleF = (goPort == null || goPort.TuObject == null ? new CGRectangle({ x: dc.X, y: dc.Y, width: 0, height: 0 }) : goPort.TuObject.Bounds);
        goObject.Bounds = rectangleF;
    }

    public /*override*/ doMouseMove(): void {
        this.doLinking(this.LastInput.DocPoint);
        this.View.doAutoScroll(this.LastInput.ViewPoint);
        this.View.batchDraw();
    }

    public /*override*/  doMouseUp(): void {
        const goPort: ITuPort = this.pickNearestPort(this.LastInput.DocPoint);
        if (goPort == null) {
            const goPort1: ITuPort = this.pickPort(this.LastInput.DocPoint);
            if (this.myLinkingNew) {
                if (!this.Forwards) {
                    this.doNoNewLink(goPort1, this.OriginalStartPort);
                }
                else {
                    this.doNoNewLink(this.OriginalStartPort, goPort1);
                }
            }
            else if (!this.Forwards) {
                this.doNoRelink(this.Link, goPort1, this.OriginalStartPort);
            }
            else {
                this.doNoRelink(this.Link, this.OriginalStartPort, goPort1);
            }
        }
        else if (this.myLinkingNew) {
            if (!this.Forwards) {
                this.doNewLink(goPort, this.OriginalStartPort);
            }
            else {
                this.doNewLink(this.OriginalStartPort, goPort);
            }
        }
        else if (!this.Forwards) {
            this.doRelink(this.Link, goPort, this.OriginalStartPort);
        }
        else {
            this.doRelink(this.Link, this.OriginalStartPort, goPort);
        }
        super.stopTool();
    }

    public /*virtual*/ doNewLink(fromPort: ITuPort, toPort: ITuPort) {
        const goLink: ITuLink = this.View.createLink(fromPort, toPort);
        if (goLink == null) {
            this.TransactionResult = undefined;
            return;
        }
        this.TransactionResult = "New Link";
        this.View.raiseLinkCreated(goLink.TuObject);
    }

    public /*virtual*/ doNoNewLink(fromPort: ITuPort, toPort: ITuPort): void {
        this.TransactionResult = undefined;
    }

    public /*virtual*/ doNoRelink(oldlink: ITuLink, fromPort: ITuPort, toPort: ITuPort): void {
        this.TransactionResult = undefined;
        const goObject: TuObject = oldlink.TuObject;
        if (goObject != null && goObject.Layer != null) {
            if (goObject.Movable) {
                oldlink.FromPort = fromPort;
                oldlink.ToPort = toPort;
                this.TransactionResult = "Relink";
                this.View.raiseLinkRelinked(oldlink.TuObject);
                return;
            }
            if (goObject.CanDelete() && this.View.CanDeleteObjects()) {
                const cancelEventArg: CancelEventArgs = new CancelEventArgs();
                this.View.raiseSelectionDeleting(cancelEventArg);
                if (cancelEventArg.Cancel) {
                    this.doCancelMouse();
                    return;
                }
                goObject.Remove();
                this.View.raiseSelectionDeleted();
                this.TransactionResult = "Relink";
                return;
            }
            if (this.OriginalEndPort == null) {
                this.View.CursorName = "default";
                this.TransactionResult = null;
                super.stopTool();
                return;
            }
            this.doCancelMouse();
        }
    }

    public /*virtual*/ doRelink(oldlink: ITuLink, fromPort: ITuPort, toPort: ITuPort): void {
        let goObject: TuObject;
        let goObject1: TuObject;
        oldlink.FromPort = fromPort;
        oldlink.ToPort = toPort;
        const goObject2: TuObject = oldlink.TuObject;
        if (fromPort != null) {
            goObject = fromPort.TuObject;
        }
        else {
            goObject = undefined;
        }
        if (toPort != null) {
            goObject1 = toPort.TuObject;
        }
        else {
            goObject1 = undefined;
        }
        TuSubGraphBase.ReparentToCommonSubGraph(goObject2, goObject, goObject1, true, this.View.Document.LinksLayer);
        this.TransactionResult = "Relink";
        this.View.raiseLinkRelinked(oldlink.TuObject);
    }

    protected /*virtual*/ imitatePort(endport: ITuPort, iport: ITuPort): void {
        const goTemporaryPort: TemporaryPort = as(endport, Types.TemporaryPort);
        if (goTemporaryPort != null) {
            goTemporaryPort.Target = as(iport, Types.TuPort);
        }
    }

    public /*virtual*/ isValidFromPort(fromPort: ITuPort): boolean {
        return fromPort.canLinkFrom();
    }

    public /*virtual*/ isValidLink(fromPort: ITuPort, toPort: ITuPort): boolean {
        if (fromPort == null && toPort == null) {
            return false;
        }
        if (fromPort != null && toPort == null) {
            return fromPort.canLinkFrom();
        }
        if (fromPort == null && toPort != null) {
            return toPort.canLinkTo();
        }
        if (this.Link != null) {
            if (fromPort != null && fromPort.TuObject != null && fromPort.TuObject.isChildOf(this.Link.TuObject)) {
                return false;
            }
            if (toPort != null && toPort.TuObject != null && toPort.TuObject.isChildOf(this.Link.TuObject)) {
                return false;
            }
        }
        return fromPort.isValidLink(toPort);
    }

    public /*virtual*/ isValidToPort(toPort: ITuPort): boolean {
        if (this.ForwardsOnly) {
            return false;
        }
        return toPort.canLinkTo();
    }

    public /*virtual*/ pickNearestPort(dc: CGPoint): ITuPort {
        let goPort: ITuPort = undefined;
        const portGravity: number = this.View.PortGravity;
        const rectangleF: CGRectangle = new CGRectangle({ x: dc.X - portGravity, y: dc.Y - portGravity, width: portGravity * 2, height: portGravity * 2 });
        const single: number = portGravity;

        const single1: Out<number> = New.Out();
        single1.value = single * single;

        foreach(this.View.Layers.Backwards, (backward: TuLayer) => {
            if (!backward.IsInDocument || !backward.CanViewObjects()) {
                return CONTINUE;
            }
            type internal = any;
            const goLayerCache: TuLayerCache = (<internal>backward).findCache(rectangleF);
            if (goLayerCache == null) {
                foreach(backward.Backwards, (goObject: TuObject) => {
                    goPort = this._pickNearestPort(goObject, dc, goPort, single1);
                });

            }
            else {
                const objects: List<TuObject> = goLayerCache.Objects;

                for (let i = objects.Count - 1; i >= 0; i--) {
                    const ıtem: TuObject = objects[i];
                    goPort = this._pickNearestPort(ıtem, dc, goPort, single1);
                }
            }
        });

        return goPort;
    }

    private _pickNearestPort(obj: TuObject, dc: CGPoint, bestPort: ITuPort, /*ref*/ bestDist: Out<number>): ITuPort {
        const valid: ITuPort = as(obj, Types.ITuPort);
        if (valid != null) {
            const pointF: CGPoint = this.portPoint(valid, dc);
            const x: number = dc.X - pointF.X;
            const y = dc.Y - pointF.Y;
            const single = x * x + y * y;
            if (single < bestDist.value) {
                let obj1: Out<any> = New.Out();
                if (this.ValidPortsCache != null) {
                    this.ValidPortsCache.TryGetValue(valid, obj1);
                }
                if (obj1 === TuToolLinking.Valid) {
                    bestPort = valid;
                    bestDist.value = single;
                }
                else if (obj1 !== TuToolLinking.Invalid) {
                    if (this.Forwards && this.isValidLink(this.OriginalStartPort, valid) || !this.Forwards && this.isValidLink(valid, this.OriginalStartPort)) {
                        if (this.ValidPortsCache != null) {
                            this.ValidPortsCache.Set(valid, TuToolLinking.Valid);
                        }
                        bestPort = valid;
                        bestDist.value = single;
                    }
                    else if (this.ValidPortsCache != null) {
                        this.ValidPortsCache.Set(valid, TuToolLinking.Invalid);
                    }
                }
            }
        }
        const goGroups: TuGroup = as(obj, Types.TuGroup);
        if (goGroups != null) {
            foreach(goGroups.GetEnumerator(), (enumerator: TuObject) => {
                bestPort = this._pickNearestPort(enumerator, dc, bestPort, bestDist);
            });
        }
        return bestPort;
    }

    public /*virtual*/ pickPort(dc: CGPoint): ITuPort {
        const goObject: TuObject = this.View.pickObject(true, false, dc, false);
        if (goObject != null && this.Link != null && goObject.isChildOf(this.Link.TuObject)) {
            return undefined;
        }
        return as(goObject, Types.ITuPort);
    }

    public /*virtual*/ portPoint(port: ITuPort, dc: CGPoint): CGPoint {
        const goObject: TuPort = as(port.TuObject, Types.TuPort);
        if (goObject == null) {
            return port.TuObject.Center;
        }
        let portObject: TuObject = goObject.PortObject;
        if (portObject == null || portObject.Layer == null) {
            portObject = goObject;
        }
        const size: CGSize = portObject.Size;
        const width = 10 / this.View.WorldScale.Width;
        if (size.Width < width && size.Height < width) {
            return portObject.Center;
        }
        if (portObject.ContainsPoint(dc)) {
            return dc;
        }
        return goObject.getLinkPointFromPoint(dc);
    }

    public /*virtual*/ startNewLink(port: ITuPort, dc: CGPoint): void {
        if (port == null) {
            return;
        }
        super.startTransaction();
        this.myLinkingNew = true;
        if (!this.isValidFromPort(port)) {
            this.Forwards = false;
            const goPort: ITuPort = port;
            this.StartPort = this.createTemporaryPort(goPort, goPort.TuObject.Center, true, false);
            this.EndPort = this.createTemporaryPort(port, dc, false, true);
            this.Link = this.createTemporaryLink(this.EndPort, this.StartPort);
        }
        else {
            this.Forwards = true;
            const goPort1: ITuPort = port;
            this.StartPort = this.createTemporaryPort(goPort1, goPort1.TuObject.Center, false, false);
            this.EndPort = this.createTemporaryPort(port, dc, true, true);
            this.Link = this.createTemporaryLink(this.StartPort, this.EndPort);
        }
        this.View.CursorName = "hand";
    }

    public /*virtual*/ startRelink(oldlink: ITuLink, forwards: boolean, dc: CGPoint) {
        if (oldlink == null) {
            return;
        }
        const goObject: TuObject = oldlink.TuObject;
        if (goObject == null || goObject.Layer == null) {
            return;
        }
        super.startTransaction();
        this.myLinkingNew = false;
        this.Link = oldlink;
        if (!forwards) {
            this.Forwards = false;
            this.OriginalStartPort = oldlink.ToPort;
            this.OriginalEndPort = oldlink.FromPort;
            let center: CGPoint = dc;
            if (this.OriginalStartPort != null) {
                center = this.OriginalStartPort.TuObject.Center;
            }
            else if (is.typeof<TuLink>(oldlink, Types.TuLink)) {
                const goLink: TuLink = oldlink;
                if (goLink.PointsCount > 0) {
                    const goLink1: TuLink = goLink;
                    center = goLink1.getPoint(goLink1.PointsCount - 1);
                }
            }
            else if (is.typeof<TuLabeledLink>(oldlink, Types.TuLabeledLink)) {
                const goLabeledLink: TuLabeledLink = oldlink;
                if (goLabeledLink.RealLink.PointsCount > 0) {
                    center = goLabeledLink.RealLink.getPoint(goLabeledLink.RealLink.PointsCount - 1);
                }
            }
            this.StartPort = this.createTemporaryPort(this.OriginalStartPort, center, true, false);
            oldlink.ToPort = this.StartPort;
            this.EndPort = this.createTemporaryPort(this.OriginalEndPort, dc, false, true);
            oldlink.FromPort = this.EndPort;
        }
        else {
            this.Forwards = true;
            this.OriginalStartPort = oldlink.FromPort;
            this.OriginalEndPort = oldlink.ToPort;
            let point: CGPoint = dc;
            if (this.OriginalStartPort != null) {
                point = this.OriginalStartPort.TuObject.Center;
            }
            else if (is.typeof<TuLink>(oldlink, Types.TuLink)) {
                const goLink2: TuLink = oldlink;
                if (goLink2.PointsCount > 0) {
                    point = goLink2.getPoint(0);
                }
            }
            else if (is.typeof<TuLabeledLink>(oldlink, Types.TuLabeledLink)) {
                const goLabeledLink1: TuLabeledLink = oldlink;
                if (goLabeledLink1.RealLink.PointsCount > 0) {
                    point = goLabeledLink1.RealLink.getPoint(0);
                }
            }
            this.StartPort = this.createTemporaryPort(this.OriginalStartPort, point, false, false);
            oldlink.FromPort = this.StartPort;
            this.EndPort = this.createTemporaryPort(this.OriginalEndPort, dc, true, true);
            oldlink.ToPort = this.EndPort;
        }
        this.View.CursorName = "hand";
    }

    public /*override*/ stop(): void {
        this.View.stopAutoScroll();
        this.Forwards = true;
        this.OriginalStartPort = null;
        this.OriginalEndPort = null;
        if (this.Link != null) {
            const goObject: TuObject = this.Link.TuObject;
            if (goObject != null && goObject.IsInView) {
                goObject.Remove();
            }
        }
        this.Link = null;
        if (this.StartPort != null) {
            const goObject1: TuObject = this.StartPort.TuObject;
            if (goObject1 != null && goObject1.IsInView) {
                goObject1.Remove();
            }
        }
        this.StartPort = null;
        if (this.EndPort != null) {
            const goObject2: TuObject = this.EndPort.TuObject;
            if (goObject2 != null && goObject2.IsInView) {
                goObject2.Remove();
            }
        }
        this.EndPort = undefined;
        if (this.ValidPortsCache != null) {
            this.ValidPortsCache.Clear();
        }
        super.stopTransaction();
    }
}

function staticContructor() {
    (<any>TuToolLinking).Valid = "Valid";
    (<any>TuToolLinking).Invalid = "Invalid";
}

@ClassInfo({
    fullName: Types.TemporaryPort,
    instanceof: [
        Types.TemporaryPort
    ]
})
class TemporaryPort extends TuPort {
    private myTargetPort: TuPort;

    protected /*override*/ getEndSegmentLength(): number {
        if (this.Target == null) {
            return super.getEndSegmentLength();
        }
        return this.Target.EndSegmentLength;
    }

    protected /*override*/ getFromSpot(): Spot {
        if (this.Target == null) {
            return super.getFromSpot();
        }
        return this.Target.FromSpot;
    }

    protected /*override*/ getPortObject(): TuObject {
        if (this.Target == null) {
            return super.getPortObject();
        }
        return this.Target.PortObject;
    }

    //#region [Property] Target
    public get Target(): TuPort {
        return this.getTarget();
    }

    public set Target(value: TuPort) {
        this.setTarget(value);
    }

    protected /*virtual*/ getTarget(): TuPort {
        return this.myTargetPort;
    }

    protected /*virtual*/ setTarget(value: TuPort): TemporaryPort {
        this.myTargetPort = value;
        return this;
    }
    //#endregion

    protected /*override*/ getToSpot(): Spot {
        if (this.Target == null) {
            return super.getToSpot();
        }
        return this.Target.ToSpot;
    }

    constructor() {
        super();
        this.PortObject = undefined;
        this.FromSpot = NoSpot;
        this.ToSpot = NoSpot;
        this.PenWidth = 2;
        this.PenColor = CGColor.Blue;
        this.Size = new CGSize({ width: 100, height: 100 });
    }

    public /*override*/ getFromLinkDir(link: ITuLink): number {
        if (this.Target == null) {
            return super.getFromLinkDir(link);
        }
        return this.Target.getFromLinkDir(link);
    }

    public /*override*/ getFromLinkPoint(link: ITuLink): CGPoint {
        if (this.Target == null) {
            return super.getFromLinkPoint(link);
        }
        return this.Target.getFromLinkPoint(link);
    }

    public /*override*/ getLinkPointFromPoint(p: CGPoint): CGPoint {
        if (this.Target == null) {
            return super.getLinkPointFromPoint(p);
        }
        return this.Target.getLinkPointFromPoint(p);
    }

    public /*override*/ getToLinkDir(link: ITuLink): number {
        if (this.Target == null) {
            return super.getToLinkDir(link);
        }
        return this.Target.getToLinkDir(link);
    }

    public /*override*/ getToLinkPoint(link: ITuLink): CGPoint {
        if (this.Target == null) {
            return super.getToLinkPoint(link);
        }
        return this.Target.getToLinkPoint(link);
    }

}
import { Types } from "../types";
import { ClassInfo, System, List, Dictionary, float,
     ArgumentException, InvalidOperationException,TString,
     foreach,error,as,is,IEnumerableOrArray,IKeyValuePair,
     CONTINUE, Out, New , trace, IEnumerator} from "@tuval/core";
import { CGSize, CGRectangle, CGPoint } from "@tuval/cg";
import {Graphics} from '@tuval/graphics';
import { TuObject } from "../TuObject/TuObject";
import { ITuCollection } from "../ITuCollection";
import { TuGroupEnumerator } from "./TuGroupEnumerator";
import { TuGroupEvents } from "./TuGroupEvents";
import { NullRect } from "../Globals";
import { TuCollection } from "../TuCollection/TuCollection";
import { TuChangedEventArgs } from "../TuChangedEventArgs";
import { TuPort } from "../TuPort/TuPort";
import { TuLink } from "../TuLink/TuLink";
import { TuLayer } from "../TuLayer/TuLayer";
import { TuCopyDictionary } from "../TuCopyDictionary";
import { GeomUtilities } from "../GeomUtilities";
import { TuView } from "../TuView/TuView";

type TuBalloon = any;

const flagInvalidPaintBounds: number = 1048576;
const flagPickableBackground: number = 2097152;

@ClassInfo({
    fullName: Types.TuGroup,
    instanceof: [
        Types.TuGroup,
        Types.TuObject,
        Types.ITuCollection,
        System.Types.Collections.ICollection,
        System.Types.Collections.Enumeration.IEnumerable
    ]
})
export class TuGroup extends TuObject implements ITuCollection {

    private myObjects: List<TuObject> = new List<TuObject>();
    private myNames: Dictionary<any, any>;
    private myPaintBoundsShadowOffset: CGSize;
    private myLeft: float;
    private myTop: float;
    private myRight: float;
    private myBottom: float;

    public get Backwards(): TuGroupEnumerator {
        return new TuGroupEnumerator(this.myObjects, false);
    }

    public get ChildNames(): Dictionary<any, any> {
        return this.myNames;
    }

    public get Count(): number {
        return this.getCount();
    }

    protected /* virtual */ getCount(): number {
        return this.myObjects.Count;
    }

    public get First(): TuObject {
        if (this.myObjects.Count === 0) {
            return null;
        }
        return this.myObjects.Get(0);
    }

    public get IsEmpty(): boolean {
        return this.getIsEmpty();
    }

    protected /* virtual */ getIsEmpty(): boolean {
        return this.Count === 0;
    }

    public get IsReadOnly(): boolean {
        return this.getIsReadOnly();
    }

    protected /* virtual */ getIsReadOnly(): boolean {
        return false;
    }

    public /* virtual */ get(name: string): TuObject;
    public /* virtual */ get(index: number): TuObject;
    public /* virtual */ get(indexOrName: number | string): TuObject {
        if (typeof indexOrName === 'number') {
            return this.myObjects.Get(indexOrName);
        } else if (typeof indexOrName === 'string') {
            return this.findChild(indexOrName);
        }
    }

    public /* virtual */  set(name: string, value: TuObject);
    public /* virtual */  set(index: number, value: TuObject);
    public /* virtual */  set(indexOrName: number | string, value: TuObject) {
        if (typeof indexOrName === 'number') {
            if (this.myObjects.Get(indexOrName) !== value && value != null) {
                const goObject: TuObject = value;
                if (goObject.Parent != this) {
                    this.replaceAt(indexOrName, goObject, false);
                }
            }
        } else if (typeof indexOrName === 'string') {
            this.addChildName(indexOrName, value);
        }
    }

    public get Last(): TuObject {
        const count: number = this.myObjects.Count;
        if (count === 0) {
            return null;
        }
        return this.myObjects.Get(count - 1);
    }

    //#region [Property] PickableBackground
    public get PickableBackground(): boolean {
        return this.getPickableBackground();
    }
    public set PickableBackground(value: boolean) {
        this.setPickableBackground(value);
    }

    /**
    * @hidden
    */
    protected /*virtual*/  getPickableBackground(): boolean {
        return (this.InternalFlags & flagPickableBackground) != 0;
    }

    /**
    * @hidden
    */
    protected /*virtual*/ setPickableBackground(value: boolean) {
        const internalFlags: boolean = (this.InternalFlags & flagPickableBackground) != 0;
        if (internalFlags != value) {
            if (!value) {
                this.InternalFlags = this.InternalFlags & ~flagPickableBackground;
            }
            else {
                this.InternalFlags = this.InternalFlags | flagPickableBackground;
            }
            this.Changed(TuGroupEvents.ChangedPickableBackground, 0, internalFlags, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    public /* virtual */ Add(obj: TuObject): this {
        if (obj == null) {
            return;
        }
        if (obj === this) {
            throw new ArgumentException("Cannot add a group to itself");
        }
        const parent: TuGroup = obj.Parent;
        if (parent != null) {
            if (parent !== this) {
                throw new ArgumentException("Cannot move an object from one group to another without first removing it from its parent.");
            }
            return;
        }
        if (obj.Layer != null) {
            throw new ArgumentException("Cannot add an object to a group when it is already part of a document or view.");
        }
        this.insertAt(this.myObjects.Count, obj, false);
        return this;
    }
    public /* virtual */ addChildName(name: string, child: TuObject): void {
        if (name == null) {
            return;
        }
        if (child == null) {
            return;
        }
        if (name.length === 0) {
            throw new ArgumentException("Name must not be an empty string", "name");
        }
        if (child.Parent !== this) {
            throw new ArgumentException("To be named, the object must be a child of this GoGroup", "child");
        }
        const goObject: TuObject = this.findChild(name);
        if (goObject != null && goObject !== child) {
            throw new InvalidOperationException(TString.Concat("Child name already in use: ", name));
        }
        const str: string = this.findName(child);
        if (str != null && str.length > 0 && str !== name) {
            throw new InvalidOperationException(TString.Concat("Child object cannot be named: '", name, "' because it already has a different name: '", str, "'"));
        }
        this.addChildNameInternal(name, child, str, goObject);
    }

    private addChildNameInternal(name: string, child: TuObject, oldname: string, oldchild: TuObject): void {
        if (this.myNames == null) {
            this.myNames = new Dictionary<any, any>();
        }
        if (oldchild == null) {
            this.myNames.Set(name, child);
        }
        if (oldname == null || oldname.length == 0) {
            this.myNames.Set(child, name);
        }
        this.Changed(TuGroupEvents.AddedChildName, 0, name, NullRect, 0, child, NullRect);
    }

    public /* virtual */  AddCollection(coll: ITuCollection, reparentLinks: boolean): ITuCollection {
        foreach(coll, (goObject: TuObject) => {
            if (!this.isChildOf(goObject) && this !== goObject) {
                return CONTINUE;
            }
            throw new ArgumentException("Cannot add a group to itself or to one of its own children.");
        });

        const goCollections: TuCollection = new TuCollection();
        goCollections.AddRange(coll);
        foreach(goCollections, (goCollection: TuObject) => {
            if (goCollection.Parent == this || goCollection.Layer == null) {
                return CONTINUE;
            }
            TuGroup.SetAllNoClear(goCollection, true);
        });

        foreach(goCollections, (goCollection1: TuObject) => {
            if (goCollection1.Parent == this) {
                return CONTINUE;
            }
            goCollection1.Remove();
            this.Add(goCollection1);
        });

        foreach(goCollections, (goObject1: TuObject) => {
            TuGroup.SetAllNoClear(goObject1, false);
        });

        if (reparentLinks && this.IsInDocument) {
            TuGroup._ReparentAllLinksToSubGraphs(goCollections, true, this.Document.LinksLayer);
        }
        return goCollections;
    }

    private static _ReparentAllLinksToSubGraphs(coll: ITuCollection, behind: boolean, layer: TuLayer): void {
        throw error('ReparentAllLinksToSubGraphs static method must implemented by TuSubGraphBase.');
    }

    public /* override */ ChangeValue(e: TuChangedEventArgs, undo: boolean): void {
        switch (e.SubHint) {
            case TuGroupEvents.InsertedObject:
                {
                    let newInt: number = e.NewInt;
                    const newValue: TuObject = as(e.NewValue, Types.TuObject);
                    if (!undo) {
                        if (newInt < 0) {
                            newInt = this.myObjects.Count;
                        }
                        if (this.myObjects.IndexOf(newValue) < 0) {
                            this.insertAt(newInt, newValue, true);
                        }
                    }
                    else {
                        if (newInt < 0) {
                            newInt = this.myObjects.IndexOf(newValue);
                        }
                        if (newInt >= 0) {
                            (this as any).removeAt(newInt, newValue, true);
                            return;
                        }
                    }
                    return;
                }
            case TuGroupEvents.RemovedObject:
                {
                    let oldInt: number = e.OldInt;
                    const oldValue: TuObject = as(e.OldValue, Types.TuObject);
                    if (!undo) {
                        if (oldInt < 0) {
                            oldInt = this.myObjects.IndexOf(oldValue);
                        }
                        if (oldInt >= 0) {
                            (this as any).removeAt(oldInt, oldValue, true);
                        }
                    }
                    else {
                        if (oldInt < 0) {
                            oldInt = this.myObjects.Count;
                        }
                        if (this.myObjects.IndexOf(oldValue) < 0) {
                            this.insertAt(oldInt, oldValue, true);
                            return;
                        }
                    }
                    return;
                }
            case TuGroupEvents.ChangedZOrder:
                {
                    const goObject: TuObject = as(e.OldValue, Types.TuObject);
                    const int32: number = e.OldInt;
                    const newInt1: number = e.NewInt;
                    this.myObjects.Remove(goObject);
                    if (undo) {
                        this.moveTo(int32, goObject, newInt1);
                        return;
                    }
                    this.moveTo(newInt1, goObject, int32);
                    return;
                }
            case TuGroupEvents.ReplacedObject:
                {
                    const oldValue1: TuObject = as(e.OldValue, Types.TuObject);
                    const newValue1: TuObject = as(e.NewValue, Types.TuObject);
                    const oldInt1: number = e.OldInt;
                    if (undo) {
                        this.replaceAt(oldInt1, oldValue1, true);
                        return;
                    }
                    this.replaceAt(oldInt1, newValue1, true);
                    return;
                }
            case TuGroupEvents.ChangedPickableBackground:
                {
                    this.PickableBackground = e.getValue(undo);
                    return;
                }
            case TuGroupEvents.AddedChildName:
                {
                    const str: string = e.OldValue;
                    const goObject1: TuObject = e.NewValue;
                    if (undo) {
                        this.removeChildNameInternal(str);
                        return;
                    }
                    this.addChildNameInternal(str, goObject1, this.findName(goObject1), this.findChild(str));
                    return;
                }
            case TuGroupEvents.RemovedChildName:
                {
                    const str1: string = e.OldValue;
                    const newValue2: TuObject = e.NewValue;
                    if (!undo) {
                        this.removeChildNameInternal(str1);
                        return;
                    }
                    this.addChildNameInternal(str1, newValue2, this.findName(newValue2), this.findChild(str1));
                    return;
                }
        }
        super.ChangeValue(e, undo);
    }

    public /* virtual */ Clear(): number {
        for (let i = this.myObjects.Count; i > 0; i = Math.min(i, this.myObjects.Count)) {
            const goObjects: List<TuObject> = this.myObjects;
            const int32: number = i - 1;
            i = int32;
            this.Remove(goObjects[int32]);
        }
        return 1;
    }

    protected /* override */  ComputeBounds(): CGRectangle {
        let bounds: CGRectangle = this.Bounds;
        let flag: boolean = false;
        foreach(this.GetEnumerator(), (enumerator: TuObject) => {
            if (flag) {
                bounds = GeomUtilities.UnionRect(bounds, enumerator.Bounds);
            }
            else {
                bounds = enumerator.Bounds;
                flag = true;
            }
        });

        return bounds;
    }

    private computePaintBounds(view: TuView): void {
        this.InternalFlags = this.InternalFlags & ~flagInvalidPaintBounds;
        const bounds: CGRectangle = this.Bounds;
        let x: float = bounds.X;
        let y: float = bounds.Y;
        let width: float = x + bounds.Width;
        let height: float = y + bounds.Height;
        const flag: boolean = (view != null ? view.IsPrinting : false);
        foreach(this.GetEnumerator(), (enumerator: TuObject) => {
            if ((flag ? !enumerator.Printable : !enumerator.Visible)) {
                return CONTINUE;
            }
            let rectangleF: CGRectangle = enumerator.Bounds.clone();
            rectangleF = enumerator.ExpandPaintBounds(rectangleF, view);
            x = Math.min(x, rectangleF.X);
            y = Math.min(y, rectangleF.Y);
            width = Math.max(width, rectangleF.X + rectangleF.Width);
            height = Math.max(height, rectangleF.Y + rectangleF.Height);
        });

        if (view != null) {
            this.myPaintBoundsShadowOffset = this.GetShadowOffset(view);
        }
        this.myLeft = bounds.X - x;
        this.myTop = bounds.Y - y;
        this.myRight = width - (bounds.X + bounds.Width);
        this.myBottom = height - (bounds.Y + bounds.Height);
    }

    public /* virtual */ Contains(obj: TuObject): boolean {
        if (obj == null) {
            return false;
        }
        return obj.Parent == this;
    }

    public /* override */ ContainsPoint(p: CGPoint): boolean {
        let flag: boolean;
        if (!GeomUtilities.ContainsRect(this.Bounds, p)) {
            return false;
        }
        const enumerator: TuGroupEnumerator = this.GetEnumerator().GetEnumerator();
        try {
            while (enumerator.MoveNext()) {
                const current: TuObject = enumerator.Current;
                if (!current.Visible || !current.ContainsPoint(p)) {
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
        return flag;
    }

    public ToArray(): TuObject[] {
        return this.myObjects.ToArray();
    }

    public /* virtual */ CopyArray(): TuObject[] {
        return this.myObjects.ToArray();
    }
    protected /* virtual */ copyChildren(newgroup: TuGroup, env: TuCopyDictionary): void {
        foreach(this.GetEnumerator(), (enumerator: TuObject) => {
            newgroup.Add(env.copy(enumerator));
        });
    }

    public /* override */ CopyObject(env: TuCopyDictionary): TuObject {
        const goObjects: TuGroup = as(super.CopyObject(env), Types.TuGroup);
        if (goObjects != null) {
            goObjects.myObjects = new List<TuObject>();
            goObjects.myNames = null;
            const initializing: boolean = goObjects.Initializing;
            goObjects.Initializing = true;
            this.copyChildren(goObjects, env);
            goObjects.Initializing = initializing;
            goObjects.InvalidBounds = true;
            if (this.myNames != null) {
                goObjects.myNames = new Dictionary<any, any>();
                foreach(this.myNames, (myName: IKeyValuePair<any, any>) => {
                    const key: any = myName.key;
                    const value: any = myName.value;
                    if (!(is.typeof(key, Types.TuObject))) {
                        if (!(is.typeof(value, Types.TuObject))) {
                            return CONTINUE;
                        }
                        const item: TuObject = env.Get(value);
                        goObjects.myNames.Set(key, item);
                    }
                    else {
                        const goObject: TuObject = env.Get(key);
                        goObjects.myNames.Set(goObject, value);
                    }
                });
            }
        }
        return goObjects;
    }
    public CopyTo(array: TuObject[], index: number): TuObject[] {
        return this.myObjects.CopyTo(array, index);
    }

    public /* override */  ExpandPaintBounds(rect: CGRectangle, view: TuView): CGRectangle {
        if ((this.InternalFlags & flagInvalidPaintBounds) !== 0 || view == null || this.myPaintBoundsShadowOffset != this.GetShadowOffset(view)) {
            this.computePaintBounds(view);
        }
        return new CGRectangle(rect.X - this.myLeft, rect.Y - this.myTop, rect.Width + this.myLeft + this.myRight, rect.Height + this.myTop + this.myBottom);
    }

    public /* virtual */ findChild(name: string): TuObject {
        let obj: Out<any> = New.Out();
        if (name == null || this.myNames == null) {
            return null;
        }
        if (!this.myNames.TryGetValue(name, obj)) {
            return null;
        }
        return obj.value;
    }

    public /* virtual */ findName(child: TuObject): string {
        const obj: Out<any> = New.Out();
        if (child == null || this.myNames == null) {
            return '';
        }
        if (!this.myNames.TryGetValue(child, obj)) {
            return '';
        }
        return obj.value;
    }
    public GetEnumerator(): TuGroupEnumerator {
        return new TuGroupEnumerator(this.myObjects, true);
    }

    public /* override */  GetNearestIntersectionPoint(p1: CGPoint, p2: CGPoint, result: Out<CGPoint>): boolean {
        const pointF: Out<CGPoint> = New.Out();
        let single: float = 1E+21;
        let pointF1: CGPoint = new CGPoint();
        foreach(this.GetEnumerator(), (enumerator: TuObject) => {
            if (!enumerator.Visible || !enumerator.GetNearestIntersectionPoint(p1, p2, pointF)) {
                return CONTINUE;
            }
            const x: float = (pointF.value.X - p1.X) * (pointF.value.X - p1.X) + (pointF.value.Y - p1.Y) * (pointF.value.Y - p1.Y);
            if (x >= single) {
                return CONTINUE;
            }
            single = x;
            pointF1 = pointF.value;
        });

        result.value = pointF1;
        return single < 1E+21;
    }

    public /* virtual */ indexOf(obj: TuObject): number {
        return this.myObjects.IndexOf(obj);
    }
    public /* virtual */ insert(index: number, obj: TuObject): void {
        if (index == this.Count) {
            this.insertAfter(null, obj);
            return;
        }
        this.insertBefore(this.myObjects.Get(index), obj);
    }
    public /* virtual */ insertAfter(child: TuObject, newobj: TuObject): void {
        if (newobj == null) {
            return;
        }
        if (child != null && child.Parent != this) {
            throw new ArgumentException("Cannot insert an object into a group after a child that is not a member of the group.");
        }
        const parent: TuGroup = newobj.Parent;
        if (parent == null) {
            if (newobj.Layer != null) {
                throw new ArgumentException("Cannot add an object to a group when it is already part of a document or view.");
            }
            this.insertAt(((child == null ? (this.myObjects.Count - 1) : this.myObjects.IndexOf(child)) + 1), newobj, false);
            return;
        }
        if (parent != this) {
            throw new ArgumentException("Cannot move an object from one group to another without first removing it from its parent.");
        }
        let int32: number = (child == null ? (this.myObjects.Count - 1) : this.myObjects.IndexOf(child));
        const int321: number = this.myObjects.IndexOf(newobj);
        if ((int32 + 1) !== int321 && int32 !== int321) {
            this.myObjects.RemoveAt(int321);
            if (int32 > int321) {
                int32--;
            }
            this.moveTo((int32 + 1), newobj, int321);
        }
    }
    public /* virtual */ insertBefore(child: TuObject, newobj: TuObject): void {
        if (newobj == null) {
            return;
        }
        if (child != null && child.Parent != this) {
            throw new ArgumentException("Cannot insert an object into a group before (behind) a child that is not a member of the group.");
        }
        const parent: TuGroup = newobj.Parent;
        if (parent == null) {
            if (newobj.Layer != null) {
                throw new ArgumentException("Cannot add an object to a group when it is already part of a document or view.");
            }
            this.insertAt((child == null ? 0 : this.myObjects.IndexOf(child)), newobj, false);
            return;
        }
        if (parent != this) {
            throw new ArgumentException("Cannot move an object from one group to another without first removing it from its parent.");
        }
        let int32: number = (child == null ? 0 : this.myObjects.IndexOf(child));
        const int321: number = this.myObjects.IndexOf(newobj);
        if ((int32 - 1) !== int321 && int32 !== int321) {
            this.myObjects.RemoveAt(int321);
            if (int32 > int321) {
                int32--;
            }
            this.moveTo(int32, newobj, int321);
        }
    }

		/* internal */  invalidatePaintBounds(): void {
        if ((this.InternalFlags & flagInvalidPaintBounds) == 0) {
            this.InternalFlags = this.InternalFlags | flagInvalidPaintBounds;
            const parent: TuGroup = this.Parent;
            if (parent != null) {
                parent.invalidatePaintBounds();
            }
        }
    }

    private insertAt(idx: number, obj: TuObject, undoing: boolean): void {
        const bounds: CGRectangle = obj.Bounds;
        if (!undoing || this.myObjects.IndexOf(obj) < 0) {
            if (idx < 0 || idx > this.myObjects.Count) {
                idx = this.myObjects.Count;
            }
            this.myObjects.Insert(idx, obj);
        }
        obj.setParent(this, undoing);
        this.Changed(TuGroupEvents.InsertedObject, 0, undefined, NullRect, idx, obj, bounds);
        if (!undoing) {
            this.layoutChildren(obj);
            this.InvalidBounds = true;
            const rectangleF: CGRectangle = this.Bounds;
        }
    }
    public /* virtual */ layoutChildren(childchanged: TuObject): void {
    }

    protected /* virtual */ moveChildren(old: CGRectangle): void {
        const left: float = this.Left - old.X;
        const top: float = this.Top - old.Y;
        foreach(this.GetEnumerator(), (enumerator: TuObject) => {
            const bounds: CGRectangle = enumerator.Bounds;
            enumerator.Bounds = new CGRectangle(bounds.X + left, bounds.Y + top, bounds.Width, bounds.Height);
        });
    }

    private moveTo(newidx: number, obj: TuObject, oldidx: number): void {
        const bounds: CGRectangle = obj.Bounds;
        this.myObjects.Insert(newidx, obj);
        this.Changed(TuGroupEvents.ChangedZOrder, oldidx, obj, bounds, newidx, obj, bounds);
    }

    protected /* override */ OnBoundsChanged(old: CGRectangle): void {
        super.OnBoundsChanged(old);
        const size: CGSize = this.Size;
        if (old.Width == size.Width && old.Height == size.Height) {
            this.moveChildren(old);
            return;
        }
        this.rescaleChildren(old);
        this.layoutChildren(undefined);
        this.InvalidBounds = true;
    }
    /* internal */ /* virtual */ onChildBoundsChanged(child: TuObject, old: CGRectangle): void {
        this.layoutChildren(child);
        this.InvalidBounds = true;
    }

    public /* override */ Paint(g: Graphics, view: TuView): void {
        const isPrinting: boolean = view.IsPrinting;
        const clipBounds: CGRectangle = g.ClipBounds;
        const flag: boolean = GeomUtilities.ContainsRect(clipBounds, this.Bounds);
        foreach(this.GetEnumerator(), (enumerator: TuObject) => {
            if ((isPrinting ? !enumerator.CanPrint() : !enumerator.CanView())) {
                return CONTINUE;
            }
            let flag1: boolean = flag;
            if (!flag1) {
                const rectangleF: CGRectangle = enumerator.ExpandPaintBounds(enumerator.Bounds.clone(), view);
                flag1 = GeomUtilities.IntersectsRect(rectangleF, clipBounds);
            }
            if (!flag1) {
                return CONTINUE;
            }
            enumerator.Paint(g, view);
        });
    }
    public /* override */ Pick(p: CGPoint, selectableOnly: boolean): TuObject {
        let goObject: TuObject;
        if (!GeomUtilities.ContainsRect(this.Bounds, p)) {
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
    public /* virtual */ pickObjects(p: CGPoint, selectableOnly: boolean, coll: ITuCollection, max: number): ITuCollection {
        if (coll == null) {
            coll = new TuCollection();
        }
        if (coll.Count >= max) {
            return coll;
        }
        if (!this.CanView()) {
            return coll;
        }
        const goObject: TuObject = this.Pick(p, selectableOnly);
        if (goObject != null) {
            coll.Add(goObject);
        }
        return coll;
    }

    public /* virtual */ Remove(obj?: TuObject): boolean {
        if (obj == null) {
            return false;
        }
        const parent: TuGroup = obj.Parent;
        if (parent == null) {
            return false;
        }
        if (parent !== this) {
            throw new ArgumentException("Cannot remove an object from a group if it doesn't belong to that group.");
        }
        const int32: number = this.myObjects.IndexOf(obj);
        if (int32 < 0) {
            return false;
        }
        this.removeAtInternal(int32, obj, false);
        return true;
    }

    private removeAtInternal(index: number, obj: TuObject, undoing: boolean): void {
        try {
            try {
                obj.setBeingRemoved(true);
                if (!undoing) {
                    this.myObjects.RemoveAt(index);
                }
                else {
                    const int32: number = this.myObjects.IndexOf(obj);
                    if (int32 >= 0) {
                        if (index < 0 || index >= this.myObjects.Count) {
                            index = int32;
                        }
                        this.myObjects.RemoveAt(index);
                    }
                }
                const bounds: CGRectangle = obj.Bounds;
                this.Changed(TuGroupEvents.RemovedObject, index, obj, bounds, 0, undefined, NullRect);
                if (!undoing) {
                    this.removeChildName(obj);
                    this.layoutChildren(obj);
                    this.InvalidBounds = true;
                    const rectangleF: CGRectangle = this.Bounds;
                }
            }
            catch (exception) {
                trace(TString.Concat("GoGroup.Remove: ", exception.toString()));
                throw exception;
            }
        }
        finally {
            obj.setParent(undefined, undoing);
            obj.setBeingRemoved(false);
        }
    }

    public removeAt(index: number): void {
        this.Remove(this.myObjects.Get(index));
    }

    public /* virtual */ removeChildName(name: string): void;
    public /* virtual */ removeChildName(child: TuObject): void;
    public /* virtual */ removeChildName(child: string | TuObject): void {
        if (typeof child === 'string') {
            if (name == null || this.myNames == null) {
                return;
            }
            this.removeChildNameInternal(child);
        } else if (is.typeof(child, Types.TuObject)) {
            let flag: boolean;
            if (child == null || this.myNames == null) {
                return;
            }
            const str: string = this.findName(child);
            flag = (str == null ? false : str.length > 0);
            if (flag) {
                this.myNames.Remove(str);
            }
            const flag1: boolean = this.myNames.ContainsKey(child);
            if (flag1) {
                this.myNames.Remove(child);
            }
            if (flag || flag1) {
                this.Changed(TuGroupEvents.RemovedChildName, 0, str, NullRect, 0, child, NullRect);
            }
        }
    }

    private removeChildNameInternal(name: string): void {
        const goObject: TuObject = this.findChild(name);
        if (goObject != null) {
            this.myNames.Remove(goObject);
        }
        const flag: boolean = this.myNames.ContainsKey(name);
        if (flag) {
            this.myNames.Remove(name);
        }
        if (goObject != null || flag) {
            this.Changed(TuGroupEvents.RemovedChildName, 0, name, NullRect, 0, goObject, NullRect);
        }
    }

    private replaceAt(index: number, newobj: TuObject, undoing: boolean): void {
        const item: TuObject = this.myObjects.Get(index);
        item.setBeingRemoved(true);
        item.setParent(undefined, undoing);
        item.setBeingRemoved(false);
        this.myObjects.Set(index, newobj);
        const bounds: CGRectangle = newobj.Bounds;
        newobj.setParent(this, undoing);
        this.Changed(TuGroupEvents.ReplacedObject, index, item, NullRect, index, newobj, NullRect);
        if (!undoing) {
            const str: string = this.findName(item);
            if (str != null && str.length > 0) {
                this.removeChildName(item);
                this.addChildName(str, newobj);
            }
            this.layoutChildren(newobj);
            this.InvalidBounds = true;
            const rectangleF: CGRectangle = this.Bounds;
        }
    }
    protected /* virtual */  rescaleChildren(old: CGRectangle): void {
        if (old.Width <= 0 || old.Height <= 0) {
            return;
        }
        const bounds: CGRectangle = this.Bounds;
        const width: float = bounds.Width / old.Width;
        const height: float = bounds.Height / old.Height;
        foreach(this.GetEnumerator(), (enumerator: TuObject) => {
            if (!enumerator.AutoRescales) {
                return CONTINUE;
            }
            const rectangleF: CGRectangle = enumerator.Bounds;
            const x: float = bounds.X + (rectangleF.X - old.X) * width;
            const y: float = bounds.Y + (rectangleF.Y - old.Y) * height;
            const single: float = rectangleF.Width * width;
            const height1: float = rectangleF.Height * height;
            enumerator.Bounds = new CGRectangle(x, y, single, height1);
        });

    }

    /* internal */ static SetAllNoClear(obj: TuObject, b: boolean): void {
        const goPort: TuPort = as(obj, Types.TuPort);
        if (goPort != null) {
            goPort.NoClearLinks = b;
            return;
        }
        const goLink: TuLink = as(obj, Types.TuLink);
        if (goLink != null) {
            goLink.NoClearPorts = b;
            return;
        }
        const goGroups: TuGroup = as(obj, Types.TuGroup);
        if (goGroups != null) {
            const goBalloon: TuBalloon = as(obj, Types.TuBalloon);
            if (goBalloon != null) {
                goBalloon.NoClearAnchors = b;
            }
            foreach(goGroups, (goObject: TuObject) => {
                TuGroup.SetAllNoClear(goObject, b);
            });
        }
    }
    public importEntries(entries: IEnumerableOrArray<TuObject> | IEnumerator<TuObject>): number {
        return 0;
    }
}

(TuLayer as any).SetAllNoClear = TuGroup.SetAllNoClear;
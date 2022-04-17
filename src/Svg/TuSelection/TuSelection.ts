import { TuObject } from './../TuObject/TuObject';
import { Pen, SolidBrush } from '@tuval/graphics';
import { CGSize, CGColor, CGPoint, CGRectangle } from '@tuval/cg';
import { Types } from './../types';
import { ClassInfo, IEnumerable, Dictionary, ArgumentException, foreach, CONTINUE, Out, New, List, convert, as, float, is, System } from '@tuval/core';
import { TuCollection } from '../TuCollection/TuCollection';
import { ITuHandle } from '../TuHandle/ITuHandle';
import { ITuCollection } from '../ITuCollection';
import { TuShape } from '../TuShape/TuShape';
import { TuView } from '../TuView/TuView';

@ClassInfo({
    fullName: Types.TuSelection,
    instanceof: [
        Types.TuSelection
    ]
})
export class TuSelection extends TuCollection {
    public GetType() {
        return this.constructor['__type__'];
    }
    private static readonly myEmptyList: IEnumerable<ITuHandle>;
    private myView: TuView;
    private myObjTable: Dictionary<TuObject, boolean> = new Dictionary<TuObject, boolean>();
    private myHotSpot: CGSize = new CGSize();
    private myHandles: Dictionary<TuObject, any>;
    private myBoundingHandlePen: Pen;
    private myResizeHandlePen: Pen;
    private myResizeHandlePenColor: CGColor = CGColor.Black;
    private myResizeHandleBrush: SolidBrush;
    private myFocused: boolean = true;

    //#region [Property] Focused
    public get Focused(): boolean {
        return this.getFocused();
    }
    public set Focused(value: boolean) {
        this.setFocused(value);
    }

    protected /*virtual*/  getFocused(): boolean {
        return this.myFocused;
    }
    protected /*virtual*/ setFocused(value: boolean) {
        this.myFocused = value;
    }
    //#endregion

    //#region [Property] HotSpot
    public get HotSpot(): CGSize {
        return this.getHotSpot();
    }
    public set HotSpot(value: CGSize) {
        this.setHotSpot(value);
    }

    protected /*virtual*/  getHotSpot(): CGSize {
        return this.myHotSpot;
    }
    protected /*virtual*/ setHotSpot(value: CGSize) {
        this.myHotSpot = value;;
    }
    //#endregion

    //#region [Property] Primary
    public get Primary(): TuObject {
        return this.getPrimary();
    }
    protected /*virtual*/  getPrimary(): TuObject {
        return this.First;
    }
    //#endregion

    //#region [Property] View
    public get View(): TuView {
        return this.getView();
    }
    protected /*virtual*/  getView(): TuView {
        return this.myView;
    }

    //#endregion

    public constructor(view: TuView) {
        super();
        this.myView = view;
        this.InternalChecksForDuplicates = false;
    }

    public /* override */ Add(obj: TuObject): this {
        if (obj == null) {
            return;
        }
        const view: TuView = this.View;
        if ((view == null || view.Selection !== this || this.Count < view.MaximumSelectionCount) && !this.Contains(obj)) {
            if (view != null && obj.Document !== view.Document && obj.View !== view) {
                throw new ArgumentException("Selected objects must belong to the view or its document");
            }
            this.AddToSelection(obj);
        }
    }

    public addAllSelectionHandles(): void {
        foreach(this, (goObject: TuObject) => {
            const selectionObject: TuObject = goObject.SelectionObject;
            if (selectionObject == null) {
                return CONTINUE;
            }
            if (!goObject.CanView()) {
                selectionObject.RemoveSelectionHandles(this);
            }
            else {
                selectionObject.AddSelectionHandles(this, goObject);
            }
        });
    }

    public /* virtual */ addHandle(obj: TuObject, handle: ITuHandle): void {
        let obj1: Out<any> = New.Out();
        if (this.myHandles == null) {
            this.myHandles = new Dictionary<TuObject, any>();
        }
        this.myHandles.TryGetValue(obj, obj1);
        if (obj1.value == null) {
            this.myHandles.Set(obj, handle);
        }
        else if (!(obj1.value instanceof List)) {
            const goHandles: List<ITuHandle> = new List<ITuHandle>();
            goHandles.Add(obj1.value);
            goHandles.Add(handle);

            this.myHandles.Set(obj, goHandles);
        }
        else {
            convert<List<ITuHandle>>(obj1.value).Add(handle);
        }
        if (this.View) {
            this.View.Layers.Default.Add(handle.TuObject);
        }
    }
    public /* override */ addRange(coll: ITuCollection): this {
        if (coll == null) {
            return;
        }
        if (coll.IsEmpty) {
            return;
        }
        const view: TuView = this.View;
        if (view != null) {
            view.raiseSelectionStarting();
        }
        super.AddRange(coll);
        if (view != null) {
            view.raiseSelectionFinished();
        }
    }

    private AddToSelection(obj: TuObject): void {
        const primary: TuObject = this.Primary;
        super.Add(obj);
        this.myObjTable.Set(obj, true);
        const view: TuView = this.View;
        if (view != null) {
            if (obj.IsInDocument) {
                obj.OnGotSelection(this);
            }
            view.raiseObjectGotSelection(obj);
            if (primary != null && this.Primary !== primary && primary.IsInDocument) {
                primary.OnLostSelection(this);
                view.raiseObjectLostSelection(primary);
                primary.OnGotSelection(this);
                view.raiseObjectGotSelection(primary);
            }
        }
    }

    public /* override */  Clear(): number {
        let flag: boolean;
        const view: TuView = this.View;
        flag = (view == null ? false : this.Count > 1);
        if (flag) {
            view.raiseSelectionStarting();
        }
        const count = super.Clear();
        if (flag) {
            view.raiseSelectionFinished();
        }
        return count;
    }

    public /* override */ Contains(obj: TuObject): boolean {
        if (obj == null) {
            return false;
        }
        return this.myObjTable.ContainsKey(obj);
    }

    public /* virtual */ createBoundingHandle(obj: TuObject, selectedObj: TuObject): ITuHandle {
        const goHandle: ITuHandle = obj.CreateBoundingHandle();
        if (goHandle == null) {
            return null;
        }
        goHandle.SelectedObject = selectedObj;
        const goObject: TuObject = goHandle.TuObject;
        if (goObject == null) {
            return undefined;
        }
        goObject.Selectable = false;
        const goShape: TuShape = as(goObject, Types.TuShape);
        if (goShape != null) {
            let lightGray: CGColor = CGColor.LightGray;
            const view: TuView = this.View;
            if (view != null) {
                if (!this.Focused) {
                    lightGray = view.NoFocusSelectionColor;
                }
                else {
                    lightGray = (this.Primary == null || this.Primary.SelectionObject !== obj ? view.SecondarySelectionColor : view.PrimarySelectionColor);
                }
            }
            const boundingHandlePenWidth: float = view.BoundingHandlePenWidth;
            const single: float = (boundingHandlePenWidth === 0 ? 0 : boundingHandlePenWidth / view.WorldScale.Width);
            if (this.myBoundingHandlePen == null || TuShape.GetPenColor(this.myBoundingHandlePen, lightGray).notEquals(lightGray) || TuShape.GetPenWidth(this.myBoundingHandlePen) !== single) {
                this.myBoundingHandlePen = TuShape.NewPen(lightGray, single);
            }
            goShape.Pen = this.myBoundingHandlePen;
            goShape.Brush = null;
        }
        this.addHandle(obj, goHandle);
        return goHandle;
    }

    public /* virtual */ createResizeHandle(obj: TuObject, selectedObj: TuObject, loc: CGPoint, handleid: number, filled: boolean): ITuHandle {
        let worldScale: CGSize;
        let width: float;
        let single: float;
        const goHandle: ITuHandle = obj.CreateResizeHandle(handleid);
        if (goHandle == null) {
            return undefined;
        }
        goHandle.HandleID = handleid;
        goHandle.SelectedObject = selectedObj;
        const goObject: TuObject = goHandle.TuObject;
        if (goObject == null) {
            return null;
        }
        const view: TuView = this.View;
        let size: CGSize = goObject.Size;
        if (size.Width <= 0 || size.Height <= 0) {
            size = (view == null ? new CGSize(6, 6) : view.ResizeHandleSize);
        }
        if (view != null) {
            const width1: float = size.Width;
            worldScale = view.WorldScale;
            size.Width = width1 / worldScale.Width;
            const height: float = size.Height;
            worldScale = view.WorldScale;
            size.Height = height / worldScale.Height;
        }
        goObject.Bounds = new CGRectangle(loc.X - size.Width / 2, loc.Y - size.Height / 2, size.Width, size.Height);
        if (handleid !== 0) {
            goObject.Selectable = true;
        }
        else {
            goObject.Selectable = false;
        }
        const goShape: TuShape = as(goObject, Types.TuShape);
        if (goShape != null) {
            let lightGray: CGColor = CGColor.LightGray;
            if (view != null) {
                if (!this.Focused) {
                    lightGray = view.NoFocusSelectionColor;
                }
                else {
                    lightGray = (this.Primary == null || this.Primary.SelectionObject !== obj ? view.SecondarySelectionColor : view.PrimarySelectionColor);
                }
            }
            if (!filled) {
                const resizeHandlePenWidth: float = view.ResizeHandlePenWidth;
                if (resizeHandlePenWidth === 0) {
                    width = 0;
                }
                else {
                    worldScale = view.WorldScale;
                    width = (resizeHandlePenWidth + 1) / worldScale.Width;
                }
                const single1: float = width;
                if (this.myResizeHandlePen == null || TuShape.GetPenColor(this.myResizeHandlePen, lightGray).notEquals(lightGray) || TuShape.GetPenWidth(this.myResizeHandlePen) !== single1) {
                    this.myResizeHandlePen = TuShape.NewPen(lightGray, single1);
                }
                goShape.Pen = this.myResizeHandlePen;
                goShape.Brush = undefined;
            }
            else {
                const resizeHandlePenWidth1: float = view.ResizeHandlePenWidth;
                if (resizeHandlePenWidth1 === 0) {
                    single = 0;
                }
                else {
                    worldScale = view.WorldScale;
                    single = resizeHandlePenWidth1 / worldScale.Width;
                }
                const single2: float = single;
                if (this.myResizeHandlePen == null || TuShape.GetPenColor(this.myResizeHandlePen, this.myResizeHandlePenColor).notEquals(this.myResizeHandlePenColor) || TuShape.GetPenWidth(this.myResizeHandlePen) !== single2) {
                    this.myResizeHandlePen = TuShape.NewPen(this.myResizeHandlePenColor, single2);
                }
                goShape.Pen = this.myResizeHandlePen;
                if (this.myResizeHandleBrush == null || this.myResizeHandleBrush.Color.notEquals(lightGray)) {
                    this.myResizeHandleBrush = new SolidBrush(lightGray);
                }
                goShape.Brush = this.myResizeHandleBrush;
            }
        }
        this.addHandle(obj, goHandle);
        return goHandle;
    }

    public  /*virtual*/  findHandleByID(obj: TuObject, id: number): ITuHandle {
        let obj1: Out<any>;
        let goHandle: ITuHandle;
        if (!this.myHandles) {
            return undefined;
        }
        this.myHandles.TryGetValue(obj, obj1);
        if (obj1.value == null) {
            return undefined;
        }
        if (!(obj1.value instanceof List)) {
            const goHandle1: ITuHandle = obj1.value;
            if (goHandle1.HandleID === id) {
                return goHandle1;
            }
            return undefined;
        }

        if (obj1.value instanceof List) {
            for (let i = 0; i < obj1.value.Count; i++) {
                const current: ITuHandle = obj1.value[i];
                if (current.HandleID !== id) {
                    continue;
                }
                goHandle = current;
                return goHandle;
            }
            return undefined;
        }

        return goHandle;
    }

    public  /*virtual*/ getAnExistingHandle(obj: TuObject): ITuHandle {
        let obj1: Out<any> = New.Out();
        if (this.myHandles == null) {
            return undefined;
        }
        this.myHandles.TryGetValue(obj, obj1);
        if (obj1 == null) {
            return undefined;
        }
        if (!is.typeof(obj1.value, System.Types.Collections.Generics.List)) {
            return as<ITuHandle>(obj1.value, Types.ITuHandle);
        }
        const goHandles: List<ITuHandle> = as<List<ITuHandle>>(obj1.value, System.Types.Collections.Generics.List);
        if (goHandles.Count <= 0) {
            return undefined;
        }
        return goHandles[0];
    }
    public  /*virtual*/  getHandleCount(obj: TuObject): number {
        let obj1: Out<any> = New.Out();
        if (this.myHandles == null) {
            return 0;
        }
        this.myHandles.TryGetValue(obj, obj1);
        if (obj1.value == null) {
            return 0;
        }
        if (!is.typeof<List<ITuHandle>>(obj1.value, System.Types.Collections.Generics.List)) {
            return 1;
        }
        return as<List<ITuHandle>>(obj1.value, System.Types.Collections.Generics.List).Count;
    }

    public  /*virtual*/  onGotFocus() {
        this.myFocused = true;
        if (this.View) {
            if (this.View.HidesSelection) {
                this.addAllSelectionHandles();
                return;
            }
            if (this.View.NoFocusSelectionColor.notEquals(this.View.PrimarySelectionColor)) {
                this.removeAllSelectionHandles();
                this.addAllSelectionHandles();
            }
        }
    }
    public  /*virtual*/  onLostFocus() {
        this.myFocused = false;
        if (this.View) {
            if (this.View.HidesSelection) {
                this.removeAllSelectionHandles();
                return;
            }
            if (this.View.NoFocusSelectionColor.notEquals(this.View.PrimarySelectionColor)) {
                this.removeAllSelectionHandles();
                this.addAllSelectionHandles();
            }
        }
    }

    public  /*override*/  Remove(obj?: TuObject): boolean {
        if (!obj) {
            return false;
        }
        if (this.Contains(obj)) {
            this.removeFromSelection(obj);
            return true;
        }
        this.removeHandles(obj);
        return false;
    }

    public removeAllSelectionHandles() {
        foreach(this.Backwards, (backward: TuObject) => {
            const selectionObject: TuObject = backward.SelectionObject;
            if (selectionObject == null) {
                return CONTINUE;
            }
            selectionObject.RemoveSelectionHandles(this);
        });

    }

    private removeFromSelection(obj: TuObject) {
        let primary = this.getPrimary();
        this.myObjTable.Remove(obj);
        super.Remove(obj);

        const view = this.View;
        if (view) {
            if (obj.IsInDocument) {
                obj.OnLostSelection(this);
            }
            view.raiseObjectLostSelection(obj);
            if (primary === obj && primary.IsInDocument) {
                primary = this.getPrimary();
                if (primary) {
                    primary.OnLostSelection(this);
                    view.raiseObjectLostSelection(primary);
                    primary.OnGotSelection(this);
                    view.raiseObjectGotSelection(primary);
                }
            }
        }
    }

    public  /*virtual*/  removeHandles(obj: TuObject) {
        let obj1: Out<any> = New.Out();

        if (!this.myHandles) {
            return;
        }
        this.myHandles.TryGetValue(obj, obj1);
        if (obj1.value == null) {
            return;
        }
        if (this.View != null) {

            const goHandle = obj1.value;

            if (is.typeof<ITuHandle>(goHandle, Types.ITuHandle)) {
                goHandle.SelectedObject = undefined;
                const goObject = goHandle.TuObject;
                if (goObject) {

                    const layer = goObject.Layer;
                    if (layer) {
                        layer.Remove(goObject);
                    }
                    goObject.Remove();
                }
            }
            else if (obj1.value instanceof List) {
                const goHandles = obj1.value;
                for (let i = 0; i < goHandles.Count; i++) {
                    const item: ITuHandle = goHandles[i];
                    const goObject1 = item.TuObject;
                    item.SelectedObject = undefined;
                    if (goObject1) {

                        const goLayers = goObject1.Layer;
                        if (goLayers != null) {
                            goLayers.Remove(goObject1);
                        }
                        goObject1.Remove();
                    }
                }
            }
        }
        this.myHandles.Remove(obj);
    }

    public  /*virtual*/  select(obj: TuObject): TuObject {
        if (!obj) {
            return undefined;
        }
        if (this.getPrimary() === obj && this.Count === 1) {
            return obj;
        }
        this.Clear();
        this.Add(obj);
        return obj;
    }

    public setView(stage: TuView) {
        this.myView = stage;
    }

    public  /*virtual*/ toggle(obj: TuObject) {
        if (!obj) {
            return;
        }
        if (!this.Contains(obj)) {
            this.Add(obj);
            return;
        }
        this.Remove(obj);
    }


}
(
    function staticConstructor() {
        (<any>TuSelection).myEmptyList = new List<ITuHandle>(); //TODO:/* ).asReadOnly() */;
    }
)();
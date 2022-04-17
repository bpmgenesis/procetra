import { TuCopyDictionary } from './../TuCopyDictionary';
import { ClassInfo, Dictionary, foreach, IKeyValuePair, CONTINUE, as, Out, New, is, Type } from '@tuval/core';
import { TuView } from '../TuView/TuView';
import { Types } from '../types';
import { CGRectangle } from '@tuval/cg';
import { TuControlEvents } from './TuControlEvents';
import { TuChangedEventArgs } from '../TuChangedEventArgs';
import { ITuControlObject } from './ITuControlObject';
import { TuLayer } from '../TuLayer/TuLayer';
import { Graphics } from '@tuval/graphics';
import { Pens_Black, Brushes_LightGray, NullRect } from '../Globals';
import { TuShape } from '../TuShape/TuShape';
import { TuObject } from '../TuObject/TuObject';

type Control = any;
const Activator: any = {};
type TuOverview = any;

@ClassInfo({
    fullName: Types.TuControl,
    instanceof: [
        Types.TuControl
    ]
})
export class TuControl extends TuObject {
    private myControlType: Type;
    private myEditedObject: TuObject;
    private myMap: Dictionary<TuView, Control>;

    //#region [Property] AutoRescales
    public get ControlType(): Type {
        return this.getControlType();
    }
    public set ControlType(value: Type) {
        this.setControlType(value);
    }

    protected /*virtual*/  getControlType(): Type {
        return this.myControlType;
    }
    protected /*virtual*/ setControlType(value: Type) {
        const type: Type = this.myControlType;
        if (type !== value) {
            this.myControlType = value;
            this.Changed(TuControlEvents.ChangedControlType, 0, type, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] EditedObject
    public get EditedObject(): TuObject {
        return this.getEditedObject();
    }
    public set EditedObject(value: TuObject) {
        this.setEditedObject(value);
    }

    protected /*virtual*/  getEditedObject(): TuObject {
        return this.myEditedObject;
    }
    protected /*virtual*/ setEditedObject(value: TuObject) {
        this.myEditedObject = value;
    }
    //#endregion

    //#region [Property] EditedObject
    public get Map(): Dictionary<TuView, Control> {
        if (this.myMap == null) {
            this.myMap = new Dictionary<TuView, Control>();
        }
        return this.myMap;
    }
    //#endregion

    public /* override */ Changed(subhint: number, oldI: number, oldVal: any, oldRect: CGRectangle, newI: number, newVal: any, newRect: CGRectangle): void {
        if (this.SuspendsUpdates) {
            return;
        }
        super.Changed(subhint, oldI, oldVal, oldRect, newI, newVal, newRect);
        if (subhint === TuControlEvents.ChangedVisible) {
            foreach(this.Map, (map: IKeyValuePair<TuView, Control>) => {
                const key: TuView = map.key;
                const value: Control = map.value;
                if (key == null || this.CanView() || value == null) {
                    return CONTINUE;
                }
                value.Visible = false;
            });
        }
    }

    public /* override */ ChangeValue(e: TuChangedEventArgs, undo: boolean): void {
        if (e.SubHint !== TuControlEvents.ChangedControlType) {
            super.ChangeValue(e, undo);
            return;
        }
        this.ControlType = e.getValue(undo);
    }
    public /* override */ copyObject(env: TuCopyDictionary): TuObject {
        const item: TuControl = as(super.CopyObject(env), Types.TuObject);
        item.myEditedObject = env.Get(this.myEditedObject);
        item.myMap = undefined;
        return item;
    }
    public /* virtual */  createControl(view: TuView): Control {
        const controlType: Type = this.ControlType;
        if (controlType == null) {
            return undefined;
        }
        const control: Control = Activator.CreateInstance(controlType);
        control.Bounds = view.convertDocToView(this.Bounds);
        const goControlObject: ITuControlObject = as(control, Types.ITuControlObject);
        if (goControlObject != null) {
            goControlObject.TuView = view;
            goControlObject.TuControl = this;
        }
        return control;
    }
    public /* virtual */ disposeControl(comp: Control, view: TuView): void {
        if (comp != null && view != null) {
            if (view.EditControl !== this) {
                view.removeTuControl(this, comp);
                comp.dispose();
                return;
            }
            comp.Visible = false;
        }
    }
    public /* override */  DoEndEdit(view: TuView): void {
        const editedObject: TuObject = this.EditedObject;
        if (editedObject != null) {
            editedObject.DoEndEdit(view);
        }
    }
    public /* virtual */ findControl(view: TuView): Control {
        let control: Out<Control> = New.Out();
        if (this.Map.TryGetValue(view, control)) {
            return control.value;
        }
        return undefined;
    }

    public /* virtual */ getControl(view: TuView): Control {
        if (view == null) {
            return undefined;
        }
        if (this.IsInView && this.View !== view) {
            return undefined;
        }
        if (this.IsInDocument && this.Document !== view.Document) {
            return undefined;
        }
        let control: Control = this.findControl(view);
        if (control == null) {
            control = this.createControl(view);
            if (control != null) {
                this.Map.Set(view, control);
                view.addTuControl(this, control);
            }
        }
        return control;
    }

    protected /* override */ OnLayerChanged(oldlayer: TuLayer, newlayer: TuLayer, mainObj: TuObject): void {
        super.OnLayerChanged(oldlayer, newlayer, mainObj);
        if (oldlayer == null || newlayer != null || !oldlayer.IsInDocument) {
            if (oldlayer != null && newlayer == null && oldlayer.IsInView) {
                const view: TuView = oldlayer.View;
                const control: Control = this.findControl(view);
                if (control != null) {
                    this.Map.Remove(view);
                    if (control != null) {
                        this.disposeControl(control, view);
                    }
                }
            }
            return;
        }
        foreach(this.Map, (map: IKeyValuePair<TuView, Control>) => {
            const key: TuView = map.key;
            const value: Control = map.value;
            if (key == null || value == null) {
                return CONTINUE;
            }
            this.disposeControl(value, key);
        });

        this.Map.Clear();
    }

    public /* override */  Paint(g: Graphics, view: TuView): void {
        if (is.typeof<TuOverview>(view, Types.TuOverview)) {

            const bounds: CGRectangle = this.Bounds;
            TuShape.DrawRectangle(g, view, Pens_Black, Brushes_LightGray, bounds.X, bounds.Y, bounds.Width, bounds.Height);
            return;
        }
        const control: any/* Control */ = this.getControl(view);
        if (control != null) {
            const rectangle: CGRectangle = (view as any).convertDocToView(this.Bounds);
            if (!is.typeof<any>(control , Types.ComboBoxControl))
            {
                (control as any).Bounds = rectangle;
            }
            if (!control.Visible) {
                control.Visible = true;
            }
        }
    }
}
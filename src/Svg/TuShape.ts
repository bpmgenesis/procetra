/* import { TProperty } from './types';
import { Control, Property } from '@tuval/forms';
import { int, Event } from '@tuval/core';
import { Matrix } from './Matrix';
import { TuObject } from './TuObject';
export abstract class _TuShape extends TuObject {

    @Property()
    public Filter: string;

    @Property()
    public Fill: string;

    @Property()
    public Stroke: string;

    @Property()
    public StrokeWidth: int;

    @Property()
    public Clicked: Event<any>;

    @Property()
    public MouseDown: Event<any>;

    @Property()
    public MouseMove: Event<any>;


    protected SetupControlDefaults(): void {
        super.SetupControlDefaults();
        this.Fill = '#FFFFFF';
        this.StrokeWidth = 1;
        this.Stroke = '#FFFFFF';
        this.Filter = '';


        this.Clicked = new Event();
        this.MouseDown = new Event();
        this.MouseMove = new Event();
        this.Visible = true;
    }


    public CreateElements() {
        if (this.Visible) {
            return this.DrawPath();
        }
    }

    protected abstract DrawPath();

    protected OnClick(evt) {
        const { x, y } = this.TransformPoint(evt);
        this.Clicked({ x: x, y: y });
        return true;
    }

    protected OnMouseDown(evt) {
        const { x, y } = this.TransformPoint(evt);
        this.MouseDown({ x: x, y: y });
        return true;
    }

    protected OnMouseMove(evt) {
        const { x, y } = this.TransformPoint(evt);
        this.MouseMove({ x: x, y: y });
        return true;
    }
} */
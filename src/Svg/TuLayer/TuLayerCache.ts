import { ClassInfo, List } from '@tuval/core';
import { CGRectangle } from '@tuval/cg';
import { Types } from '../types';
import { TuView } from '../TuView/TuView';
import { TuObject } from '../TuObject/TuObject';

type TuStroke = any;
type ITuDragSnapper = any;

@ClassInfo({
    fullName: Types.TuLayerCache,
    instanceof: [
        Types.TuLayerCache
    ]
})
export class TuLayerCache {
    private myView: TuView;
    private myObjects: List<TuObject>;
    private myRect: CGRectangle;
    private myStrokes: List<TuStroke>;
    private mySnappers: List<ITuDragSnapper>;

    public get Objects(): List<TuObject> {
        return this.myObjects;
    }

    public get Rect(): CGRectangle {
        return this.myRect;
    }

    public set Rect(value: CGRectangle) {
        this.myRect = value;
    }

    public get Snappers(): List<ITuDragSnapper> {
        return this.mySnappers;
    }

    public set Snappers(value: List<ITuDragSnapper>) {
        this.mySnappers = value;
    }

    public get Strokes(): List<TuStroke> {
        return this.myStrokes;
    }

    public set Strokes(value: List<TuStroke>) {
        this.myStrokes = value;
    }

    public get View(): TuView {
        return this.myView;
    }

    public constructor(view: TuView) {
        this.myView = view;
        this.myObjects = new List<TuObject>();
        this.myStrokes = new List<TuStroke>();
        this.mySnappers = new List<ITuDragSnapper>();
    }

    public reset(): void {
        this.myObjects.Clear();
        this.myStrokes.Clear();
        this.mySnappers.Clear();
        this.myRect = new CGRectangle(0, 0, 0, 0);
    }
}
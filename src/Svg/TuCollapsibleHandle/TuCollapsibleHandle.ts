import { GraphicsPath, FillMode, Pen, Graphics, SolidBrush } from '@tuval/graphics';
import { CGColor, CGRectangle, CGSize, CGPoint } from '@tuval/cg';
import { Types } from './../types';
import { ClassInfo, is, as, float } from '@tuval/core';
import { TuRoundedRectangle } from '../TuRoundedRectangle/TuRoundedRectangle';
import { TuCollapsibleHandleStyle } from './TuCollapsibleHandleStyle';
import { TuCollapsibleHandleEvents } from './TuCollapsibleHandleEvents';
import { Brushes_Gold, NullRect, Pens_Black } from '../Globals';
import { TuChangedEventArgs } from '../TuChangedEventArgs';
import { ITuCollapsible } from '../ITuCollapsible';
import { TuObject } from '../TuObject/TuObject';
import { TuView } from '../TuView/TuView';
import { TuShape } from '../TuShape/TuShape';
import { TuInputEventArgs } from '../TuInputEventArgs';

const flagBordered: number = 1048576;

@ClassInfo({
    fullName: Types.TuCollapsibleHandle,
    instanceof: [
        Types.TuCollapsibleHandle
    ]
})
export class TuCollapsibleHandle extends TuRoundedRectangle {
    private myStyle: TuCollapsibleHandleStyle;

    //#region [Property] Bordered
    public get Bordered(): boolean {
        return this.getBordered();
    }
    public set Bordered(value: boolean) {
        this.setBordered(value);
    }

    protected /*virtual*/ getBordered(): boolean {
        return (this.InternalFlags & flagBordered) !== 0;
    }
    protected /*virtual*/ setBordered(value: boolean) {
        const ınternalFlags: boolean = (this.InternalFlags & flagBordered) !== 0;
        if (ınternalFlags !== value) {
            if (!value) {
                this.InternalFlags = this.InternalFlags & ~flagBordered;
            }
            else {
                this.InternalFlags = this.InternalFlags | flagBordered;
            }
            this.Changed(TuCollapsibleHandleEvents.ChangedBordered, 0, ınternalFlags, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] Style
    public get Style(): TuCollapsibleHandleStyle {
        return this.getStyle();
    }
    public set Style(value: TuCollapsibleHandleStyle) {
        this.setStyle(value);
    }

    protected /*virtual*/ getStyle(): TuCollapsibleHandleStyle {
        return this.myStyle;
    }
    protected /*virtual*/ setStyle(value: TuCollapsibleHandleStyle) {
        const goCollapsibleHandleStyle: TuCollapsibleHandleStyle = this.myStyle;
        if (goCollapsibleHandleStyle != value) {
            this.myStyle = value;
            this.Changed(TuCollapsibleHandleEvents.ChangedStyle, goCollapsibleHandleStyle, undefined, NullRect, value, undefined, NullRect);
        }
    }
    //#endregion

    public constructor() {
        super();

        this.InternalFlags = this.InternalFlags | 1048576;
        this.Corner = new CGSize(0, 0);
        this.Size = new CGSize(10, 10);
        this.Brush = Brushes_Gold;
        this.Pen = Pens_Black;
        this.Selectable = false;
        this.Resizable = false;
        this.AutoRescales = false;
    }

    public /*override*/ ChangeValue(e: TuChangedEventArgs, undo: boolean): void {
        const subEvent: number = e.SubHint;
        if (subEvent === TuCollapsibleHandleEvents.ChangedStyle) {
            this.Style = e.getInt(undo);
            return;
        }
        if (subEvent === TuCollapsibleHandleEvents.ChangedBordered) {
            this.Bordered = e.getValue(undo);
            return;
        }

        super.ChangeValue(e, undo);
    }

    public /*virtual*/  findCollapsible(): ITuCollapsible {
        let parent: TuObject = this;
        while (parent != null && !(is.typeof<ITuCollapsible>(parent, Types.ITuCollapsible))) {
            parent = parent.Parent;
        }
        return as(parent, Types.ITuCollapsible);
    }

    public /*override*/  makePath(): GraphicsPath {
        let graphicsPath: GraphicsPath;
        graphicsPath = (!this.Bordered ? new GraphicsPath(FillMode.Winding) : super.makePath());
        const goCollapsible: ITuCollapsible = this.findCollapsible();
        if (goCollapsible != null) {
            const bounds: CGRectangle = this.Bounds;
            if (!goCollapsible.Collapsible) {
                graphicsPath.addEllipse(bounds.X + bounds.Width / 4, bounds.Y + bounds.Height / 4, bounds.Width / 2, bounds.Height / 2);
            }
            else {
                const x: float = bounds.X + bounds.Width / 2;
                const y: float = bounds.Y + bounds.Height / 2;
                switch (this.Style) {
                    case TuCollapsibleHandleStyle.PlusMinus:
                        {
                            const single: float = (this.Bordered ? bounds.Width / 4 : 0);
                            const single1: float = (this.Bordered ? bounds.Height / 4 : 0);
                            graphicsPath.startFigure();
                            graphicsPath.addLine(bounds.X + single, y, bounds.X + bounds.Width - single, y);
                            if (goCollapsible.IsExpanded) {
                                break;
                            }
                            graphicsPath.startFigure();
                            graphicsPath.addLine(x, bounds.Y + single, x, bounds.Y + bounds.Height - single1);
                            break;
                        }
                    case TuCollapsibleHandleStyle.TriangleRight:
                        {
                            const single2: float = (this.Bordered ? bounds.Width / 6 : 0);
                            const single3: float = (this.Bordered ? bounds.Height / 6 : 0);
                            const pointFArray: CGPoint[] = new Array(3);
                            for (let i = 0; i < pointFArray.length; i++) {
                                pointFArray[i] = new CGPoint();
                            }
                            if (!goCollapsible.IsExpanded) {
                                pointFArray[0].X = bounds.X + single2;
                                pointFArray[0].Y = bounds.Y + single3;
                                pointFArray[1].X = bounds.X + bounds.Width - single2;
                                pointFArray[1].Y = bounds.Y + single3;
                                pointFArray[2].X = x;
                                pointFArray[2].Y = bounds.Y + bounds.Height - single3;
                            }
                            else {
                                pointFArray[0].X = bounds.X + single2;
                                pointFArray[0].Y = bounds.Y + single3;
                                pointFArray[1].X = bounds.X + bounds.Width - single2;
                                pointFArray[1].Y = y;
                                pointFArray[2].X = bounds.X + single2;
                                pointFArray[2].Y = bounds.Y + bounds.Height - single3;
                            }
                            graphicsPath.startFigure();
                            graphicsPath.addPolygon(pointFArray);
                            break;
                        }
                    case TuCollapsibleHandleStyle.TriangleUp:
                        {
                            const single4: float = (this.Bordered ? bounds.Width / 6 : 0);
                            const single5: float = (this.Bordered ? bounds.Height / 6 : 0);
                            const x1: CGPoint[] = new Array(3);
                            for (let i = 0; i < x1.length; i++) {
                                x1[i] = new CGPoint();
                            }
                            if (!goCollapsible.IsExpanded) {
                                x1[0].X = bounds.X + single4;
                                x1[0].Y = bounds.Y + single5;
                                x1[1].X = bounds.X + bounds.Width - single4;
                                x1[1].Y = bounds.Y + single5;
                                x1[2].X = x;
                                x1[2].Y = bounds.Y + bounds.Height - single5;
                            }
                            else {
                                x1[0].X = bounds.X + single4;
                                x1[0].Y = bounds.Y + bounds.Height - single5;
                                x1[1].X = bounds.X + bounds.Width - single4;
                                x1[1].Y = bounds.Y + bounds.Height - single5;
                                x1[2].X = x;
                                x1[2].Y = bounds.Y + single5;
                            }
                            graphicsPath.startFigure();
                            graphicsPath.addPolygon(x1);
                            break;
                        }
                    case TuCollapsibleHandleStyle.ChevronUp:
                        {
                            const single6: float = (this.Bordered ? bounds.Width / 6 : 0);
                            const single7: float = (this.Bordered ? bounds.Height / 6 : 0);
                            const y1: CGPoint[] = new Array(3);
                            for (let i = 0; i < y1.length; i++) {
                                y1[i] = new CGPoint();
                            }
                            if (!goCollapsible.IsExpanded) {
                                y1[0].X = bounds.X + single6;
                                y1[0].Y = bounds.Y + single7;
                                y1[1].X = x;
                                y1[1].Y = y;
                                y1[2].X = bounds.X + bounds.Width - single6;
                                y1[2].Y = bounds.Y + single7;
                                graphicsPath.startFigure();
                                graphicsPath.addLines(y1);
                                y1[0].X = bounds.X + single6;
                                y1[0].Y = y;
                                y1[1].X = x;
                                y1[1].Y = bounds.Y + bounds.Height - single7;
                                y1[2].X = bounds.X + bounds.Width - single6;
                                y1[2].Y = y;
                                graphicsPath.startFigure();
                                graphicsPath.addLines(y1);
                                break;
                            }
                            else {
                                y1[0].X = bounds.X + single6;
                                y1[0].Y = y;
                                y1[1].X = x;
                                y1[1].Y = bounds.Y + single7;
                                y1[2].X = bounds.X + bounds.Width - single6;
                                y1[2].Y = y;
                                graphicsPath.startFigure();
                                graphicsPath.addLines(y1);
                                y1[0].X = bounds.X + single6;
                                y1[0].Y = bounds.Y + bounds.Height - single7;
                                y1[1].X = x;
                                y1[1].Y = y;
                                y1[2].X = bounds.X + bounds.Width - single6;
                                y1[2].Y = bounds.Y + bounds.Height - single7;
                                graphicsPath.startFigure();
                                graphicsPath.addLines(y1);
                                break;
                            }
                        }
                }
            }
        }
        return graphicsPath;
    }

    public /*override*/ OnSingleClick(evt: TuInputEventArgs, view: TuView): boolean {
        const goCollapsible: ITuCollapsible = this.findCollapsible();
        if (goCollapsible == null) {
            return false;
        }
        let str: string = undefined;
        try {
            if (view != null) {
                view.startTransaction();
            }
            if (!goCollapsible.IsExpanded) {
                goCollapsible.expand();
                str = "Expanded";
            }
            else {
                goCollapsible.collapse();
                str = "Collapsed";
            }
        }
        finally {
            if (view != null) {
                view.finishTransaction(str);
            }
        }
        return true;
    }

    public /*override*/ Paint(g: Graphics, view: TuView): void {
        const bounds: CGRectangle = this.Bounds;
        const corner: CGSize = this.Corner;
        if (!this.Bordered) {
            TuShape.DrawRoundedRectangle(g, view, undefined, this.Brush, bounds.X, bounds.Y, bounds.Width, bounds.Height, corner.Width, corner.Height);
        }
        else {
            const pen: Pen = TuShape.NewPen(TuShape.GetPenColor(this.Pen, CGColor.Black), 1);
            TuShape.DrawRoundedRectangle(g, view, pen, this.Brush, bounds.X, bounds.Y, bounds.Width, bounds.Height, corner.Width, corner.Height);
            pen.Dispose();
        }
        this.paintHandle(g, view);
    }

    protected /*virtual*/ paintHandle(g: Graphics, view: TuView): void {
        const goCollapsible: ITuCollapsible = this.findCollapsible();
        if (goCollapsible == null) {
            return;
        }
        const bounds = this.Bounds;
        if (!goCollapsible.Collapsible) {
            TuShape.DrawEllipse(g, view, this.Pen, undefined, bounds.X + bounds.Width / 4, bounds.Y + bounds.Height / 4, bounds.Width / 2, bounds.Height / 2);
        }
        else {
            const x: float = bounds.X + bounds.Width / 2;
            const y: float = bounds.Y + bounds.Height / 2;
            switch (this.Style) {
                case TuCollapsibleHandleStyle.PlusMinus:
                    {
                        const single: float = (this.Bordered ? bounds.Width / 4 : 0);
                        const single1: float = (this.Bordered ? bounds.Height / 4 : 0);
                        TuShape.DrawLine(g, view, this.Pen, bounds.X + single, y, bounds.X + bounds.Width - single, y);
                        if (goCollapsible.IsExpanded) {
                            break;
                        }
                        TuShape.DrawLine(g, view, this.Pen, x, bounds.Y + single1, x, bounds.Y + bounds.Height - single1);
                        return;
                    }
                case TuCollapsibleHandleStyle.TriangleRight:
                    {
                        const single2: float = (this.Bordered ? bounds.Width / 6 : 0);
                        const single3: float = (this.Bordered ? bounds.Height / 6 : 0);
                        const pointFArray: CGPoint[] = view.allocTempPointArray(3);
                        if (!goCollapsible.IsExpanded) {
                            pointFArray[0].X = bounds.X + single2;
                            pointFArray[0].Y = bounds.Y + single3;
                            pointFArray[1].X = bounds.X + bounds.Width - single2;
                            pointFArray[1].Y = bounds.Y + single3;
                            pointFArray[2].X = x;
                            pointFArray[2].Y = bounds.Y + bounds.Height - single3;
                        }
                        else {
                            pointFArray[0].X = bounds.X + single2;
                            pointFArray[0].Y = bounds.Y + single3;
                            pointFArray[1].X = bounds.X + bounds.Width - single2;
                            pointFArray[1].Y = y;
                            pointFArray[2].X = bounds.X + single2;
                            pointFArray[2].Y = bounds.Y + bounds.Height - single3;
                        }
                        const solidBrush: SolidBrush = new SolidBrush(TuShape.GetPenColor(this.Pen, CGColor.Black));
                        TuShape.DrawPolygon(g, view, undefined, solidBrush, pointFArray);
                        solidBrush.Dispose();
                        view.freeTempPointArray(pointFArray);
                        return;
                    }
                case TuCollapsibleHandleStyle.TriangleUp:
                    {
                        const single4: float = (this.Bordered ? bounds.Width / 6 : 0);
                        const single5: float = (this.Bordered ? bounds.Height / 6 : 0);
                        const x1: CGPoint[] = view.allocTempPointArray(3);
                        if (!goCollapsible.IsExpanded) {
                            x1[0].X = bounds.X + single4;
                            x1[0].Y = bounds.Y + single5;
                            x1[1].X = bounds.X + bounds.Width - single4;
                            x1[1].Y = bounds.Y + single5;
                            x1[2].X = x;
                            x1[2].Y = bounds.Y + bounds.Height - single5;
                        }
                        else {
                            x1[0].X = bounds.X + single4;
                            x1[0].Y = bounds.Y + bounds.Height - single5;
                            x1[1].X = bounds.X + bounds.Width - single4;
                            x1[1].Y = bounds.Y + bounds.Height - single5;
                            x1[2].X = x;
                            x1[2].Y = bounds.Y + single5;
                        }
                        const solidBrush1: SolidBrush = new SolidBrush(TuShape.GetPenColor(this.Pen, CGColor.Black));
                        TuShape.DrawPolygon(g, view, undefined, solidBrush1, x1);
                        solidBrush1.Dispose();
                        view.freeTempPointArray(x1);
                        return;
                    }
                case TuCollapsibleHandleStyle.ChevronUp:
                    {
                        const single6: float = (this.Bordered ? bounds.Width / 6 : 0);
                        const single7: float = (this.Bordered ? bounds.Height / 6 : 0);
                        const y1: CGPoint[] = view.allocTempPointArray(3);
                        if (!goCollapsible.IsExpanded) {
                            y1[0].X = bounds.X + single6;
                            y1[0].Y = bounds.Y + single7;
                            y1[1].X = x;
                            y1[1].Y = y;
                            y1[2].X = bounds.X + bounds.Width - single6;
                            y1[2].Y = bounds.Y + single7;
                            TuShape.DrawLines(g, view, this.Pen, y1);
                            y1[0].X = bounds.X + single6;
                            y1[0].Y = y;
                            y1[1].X = x;
                            y1[1].Y = bounds.Y + bounds.Height - single7;
                            y1[2].X = bounds.X + bounds.Width - single6;
                            y1[2].Y = y;
                            TuShape.DrawLines(g, view, this.Pen, y1);
                        }
                        else {
                            y1[0].X = bounds.X + single6;
                            y1[0].Y = y;
                            y1[1].X = x;
                            y1[1].Y = bounds.Y + single7;
                            y1[2].X = bounds.X + bounds.Width - single6;
                            y1[2].Y = y;
                            TuShape.DrawLines(g, view, this.Pen, y1);
                            y1[0].X = bounds.X + single6;
                            y1[0].Y = bounds.Y + bounds.Height - single7;
                            y1[1].X = x;
                            y1[1].Y = y;
                            y1[2].X = bounds.X + bounds.Width - single6;
                            y1[2].Y = bounds.Y + bounds.Height - single7;
                            TuShape.DrawLines(g, view, this.Pen, y1);
                        }
                        view.freeTempPointArray(y1);
                        return;
                    }
                default:
                    {
                        return;
                    }
            }
        }
    }
}

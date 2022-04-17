import { TuTool } from './TuTool';
import { ClassInfo, Type, typeOf } from '@tuval/core';
import { Types } from '../types';
import { CGPoint, CGRectangle, CGSize } from '@tuval/cg';
import { TuInputEventArgs } from '../TuInputEventArgs';
import { Graphics } from '@tuval/graphics';
import { MouseButtons } from '../Forms/MouseButtons';

export type PaintEventHandler = (sender: any, e: PaintEventArgs) => void;
export class PaintEventArgs {

    private myClipRectangle: CGRectangle;
    private myGraphics: Graphics;

    //#region [Property] ClipRectangle
    public get ClipRectangle(): CGRectangle {
        return this.getClipRectangle();
    }
    public set ClipRectangle(value: CGRectangle) {
        this.setClipRectangle(value);
    }

    protected /*virtual*/ getClipRectangle(): CGRectangle {
        return this.myClipRectangle;
    }
    protected /*virtual*/ setClipRectangle(value: CGRectangle) {
        this.myClipRectangle = value;
    }
    //#endregion

    //#region [Property] Graphics
    public get Graphics(): Graphics {
        return this.getGraphics();
    }
    public set Graphics(value: Graphics) {
        this.setGraphics(value);
    }

    protected /*virtual*/ getGraphics(): Graphics {
        return this.myGraphics;
    }
    protected /*virtual*/ setGraphics(value: Graphics) {
        this.myGraphics = value;
    }
    //#endregion

    constructor(graphics: Graphics, clipRect: CGRectangle) {
        this.myGraphics = graphics;
        this.myClipRectangle = clipRect;
    }
}

@ClassInfo({
    fullName: Types.TuToolPanning,
    instanceof: [
        Types.TuToolPanning
    ]
})
export class TuToolPanning extends TuTool {

    public GetType(): Type {
        return typeOf(Types.TuToolPanning);
    }

    private myAutoPan: boolean = true;
    private myModal: boolean = false;
    private myLastViewPoint: CGPoint = new CGPoint();
    private myActive: boolean = false;
    private myOriginSet: boolean = false;
    private myOrigin: CGPoint = new CGPoint();
    private myPaintHandler: PaintEventHandler;

    //#region [Property] Active
    public get Active(): boolean {
        return this.getActive();
    }
    public set Active(value: boolean) {
        this.setActive(value);
    }

    protected /*virtual*/ getActive(): boolean {
        return this.myActive;
    }
    protected /*virtual*/ setActive(value: boolean) {
        if (this.myActive !== value) {
            this.myActive = value;
            if (value) {
                this.myLastViewPoint = this.LastInput.ViewPoint;
            }
        }
    }
    //#endregion

    //#region [Property] AutoPan
    public get AutoPan(): boolean {
        return this.getAutoPan();
    }
    public set AutoPan(value: boolean) {
        this.setAutoPan(value);
    }

    protected /*virtual*/ getAutoPan(): boolean {
        return this.myAutoPan;
    }
    protected /*virtual*/ setAutoPan(value: boolean) {
        this.myAutoPan = value;
    }
    //#endregion

    //#region [Property] Modal
    public get Modal(): boolean {
        return this.getModal();
    }
    public set Modal(value: boolean) {
        this.setModal(value);
    }

    protected /*virtual*/ getModal(): boolean {
        return this.myModal;
    }
    protected /*virtual*/ setModal(value: boolean) {
        this.myModal = value;
    }
    //#endregion

    //#region [Property] Origin
    public get Origin(): CGPoint {
        return this.getOrigin();
    }
    public set Origin(value: CGPoint) {
        this.setOrigin(value);
    }

    protected /*virtual*/ getOrigin(): CGPoint {
        return this.myOrigin;
    }
    protected /*virtual*/ setOrigin(value: CGPoint) {
        if (this.myOrigin !== value) {
            this.myOrigin = value;
            this.myOriginSet = true;
        }
    }
    //#endregion

    //#region [Property] OriginRect
    public get OriginRect(): CGRectangle {
        return this.getOriginRect();
    }

    protected /*virtual*/ getOriginRect(): CGRectangle {
        // Cursor noMove2D = Cursors.NoMove2D;
        const width: number = 20;
        const height: number = 20;
        let origin: CGPoint = this.Origin;
        const x: number = origin.X - width / 2;
        origin = this.Origin;
        return new CGRectangle({ x: x, y: origin.Y - height / 2, width: width, height: height });
    }
    //#endregion

    public /*override*/ canStart(): boolean {
        const lastInput: TuInputEventArgs = this.LastInput;
        if (lastInput.Alt || lastInput.Control || lastInput.Shift) {
            return false;
        }
        if (this.AutoPan) {
            return lastInput.Buttons === MouseButtons.Middle;
        }
        if (lastInput.Buttons !== MouseButtons.Left) {
            return false;
        }
        return this.View.pickObject(true, true, lastInput.DocPoint, true) == null;
    }

    public /*override*/ doKeyDown() {
        this.stopTool();
    }

    private doManualPan(): void {
        const docPosition: CGPoint = this.View.DocPosition;
        const x: number = this.myLastViewPoint.X;
        let viewPoint: CGPoint = this.LastInput.ViewPoint;
        const ınt32 = x - viewPoint.X;
        const y = this.myLastViewPoint.Y;
        viewPoint = this.LastInput.ViewPoint;
        const size: CGSize = new CGSize({ width: ınt32, height: y - viewPoint.Y });
        const doc: CGSize = this.View.convertViewToDoc(size);
        this.myLastViewPoint = this.LastInput.ViewPoint;
        this.View.DocPosition = new CGPoint({ x: docPosition.X + doc.Width, y: docPosition.Y + doc.Height });
    }

    public /*override*/ doMouseDown(): void {
        if (this.AutoPan) {
            this.doMouseDown();
            return;
        }
        this.Active = true;
    }

    public /*override*/ doMouseMove(): void {
        if (!this.AutoPan) {
            if (this.Active) {
                this.doManualPan();
                return;
            }
            if (this.Modal) {
                return;
            }
            this.Active = true;
            return;
        }
        if (!this.myOriginSet) {
            return;
        }
        const size: CGSize = new CGSize({ width: 16, height: 16 });
        const width: number = size.Width;
        const height: number = size.Height;
        let viewPoint: CGPoint = this.LastInput.ViewPoint;
        const x: number = viewPoint.X;
        viewPoint = this.Origin;
        const ınt32: number = x - viewPoint.X;
        viewPoint = this.LastInput.ViewPoint;
        const y: number = viewPoint.Y;
        viewPoint = this.Origin;
        const y1: number = y - viewPoint.Y;
        if (ınt32 < 0 - width) {
            if (y1 < 0 - height) {
                this.View.CursorName = "pannw";
            }
            else if (y1 <= height) {
                this.View.CursorName = "panwest";
            }
            else {
                this.View.CursorName = "pansw";
            }
        }
        else if (ınt32 > width) {
            if (y1 < 0 - height) {
                this.View.CursorName = "panne";
            }
            else if (y1 <= height) {
                this.View.CursorName = "paneast";
            }
            else {
                this.View.CursorName = "panse";
            }
        }
        else if (y1 < 0 - height) {
            this.View.CursorName = "pannorth";
        }
        else if (y1 <= height) {
            this.View.CursorName = "nomove2d";
        }
        else {
            this.View.CursorName = "pansouth";
        }
        this.View.doAutoPan(this.Origin, this.LastInput.ViewPoint);
    }

    public /*override*/ doMouseUp(): void {
        if (this.AutoPan) {
            if (this.myOriginSet) {
                this.stopTool();
                return;
            }
            this.Origin = this.LastInput.ViewPoint;
            this.setPaintingOriginMarker(true);
            return;
        }
        if (!this.isBeyondDragSize()) {
            this.doSelect(this.LastInput);
            this.doClick(this.LastInput);
        }
        if (!this.Modal) {
            this.stopTool();
            return;
        }
        this.Active = false;
    }

    public /*override*/ doMouseWheel(): void {
        this.stopTool();
    }

    private handlePaint(sender: any, evt: PaintEventArgs): void {
        if (!this.myOriginSet) {
            return;
        }

        // TODO :
        // Cursors.NoMove2D.Draw(evt.Graphics, this.OriginRect);
    }

    private setPaintingOriginMarker(b: boolean): void {
        if (b) {
            this.myPaintHandler = this.handlePaint;
            // TODO:
            // this.View.Paint += this.myPaintHandler;
        }
        else if (this.myPaintHandler != null) {
            // TODO:
            //base.View.Paint -= this.myPaintHandler;
            this.myPaintHandler = undefined;
        }
        this.View.invalidate(this.OriginRect);
    }

    public /*override*/ start() {
        if (!this.AutoPan) {
            this.View.CursorName = "move";
        }
        else {
            this.View.CursorName = "nomove2d";
            if (this.myOriginSet) {
                this.setPaintingOriginMarker(true);
                return;
            }
        }
    }

    public /*override*/ stop(): void {
        if (!this.AutoPan) {
            this.Active = false;
        }
        else {
            this.myOriginSet = false;
            this.View.stopAutoScroll();
            this.setPaintingOriginMarker(false);
        }
        this.View.CursorName = "default";
    }
}
import { TuTool } from "./TuTool";
import { ClassInfo, Type, typeOf } from '@tuval/core';
import { Types } from "../types";
import { CGRectangle, CGPoint } from '@tuval/cg';

@ClassInfo({
    fullName: Types.TuToolRubberBanding,
    instanceof: [
        Types.TuToolRubberBanding
    ]
})
export class TuToolRubberBanding extends TuTool {
    public GetType(): Type {
        return typeOf(Types.TuToolRubberBanding);
    }
    private myModal: boolean = false;
    private myAutoScrolling: boolean = false;
    private myBox: CGRectangle = new CGRectangle();
    private myActive: boolean = false;

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
        this.myActive = value;
    }
    //#endregion

    //#region [Property] AutoScrolling
    public get AutoScrolling(): boolean {
        return this.getAutoScrolling();
    }
    public set AutoScrolling(value: boolean) {
        this.setAutoScrolling(value);
    }

    protected /*virtual*/ getAutoScrolling(): boolean {
        return this.myAutoScrolling;
    }
    protected /*virtual*/ setAutoScrolling(value: boolean) {
        this.myAutoScrolling = value;
        if (value && this.View != null) {
            this.View.DrawsXorMode = false;
        }
    }
    //#endregion

    //#region [Property] Box
    public get Box(): CGRectangle {
        return this.getBox();
    }
    public set Box(value: CGRectangle) {
        this.setBox(value);
    }

    protected /*virtual*/ getBox(): CGRectangle {
        return this.myBox;
    }
    protected /*virtual*/ setBox(value: CGRectangle) {
        this.myBox = value;
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

    private activate(): void {
        this.Active = true;
        let viewPoint: CGPoint = this.FirstInput.ViewPoint;
        const x: number = viewPoint.X;
        viewPoint = this.FirstInput.ViewPoint;
        this.Box = new CGRectangle({ x: x, y: viewPoint.Y, width: 0, height: 0 });
        if (!this.FirstInput.Shift && !this.Selection.IsEmpty) {
            this.Selection.Clear();
            this.View.batchDraw();
        }
    }

    public /*override*/ canStart(): boolean {
        if (!this.View.CanSelectObjects()) {
            return false;
        }
        if (this.LastInput.IsContextButton) {
            return false;
        }
        if (!this.isBeyondDragSize()) {
            return false;
        }
        return this.View.pickObject(true, false, this.FirstInput.DocPoint, true) == null;
    }

    public /*virtual*/ computeRubberBandBox(): CGRectangle {
        const docPoint: CGPoint = this.FirstInput.DocPoint;
        const pointF: CGPoint = this.LastInput.DocPoint;
        const rectangleF: CGRectangle = new CGRectangle({ x: Math.min(pointF.X, docPoint.X), y: Math.min(pointF.Y, docPoint.Y), width: Math.abs(pointF.X - docPoint.X), height: Math.abs(pointF.Y - docPoint.Y) });
        return this.View.convertDocToView(rectangleF);
    }

    public /*override*/ doMouseDown(): void {
        if (this.canStart()) {
            this.activate();
        }
    }

    public /*override*/ doMouseMove(): void {
        if (!this.Active) {
            if (this.Modal) {
                return;
            }
            this.activate();
            return;
        }
        this.Box = this.computeRubberBandBox();
        this.View.drawXorBox(this.Box, true);
        if (this.AutoScrolling) {
            this.View.doAutoScroll(this.LastInput.ViewPoint);
        }
    }

    public /*override*/ doMouseUp(): void {
        if (this.Active) {
            this.Box = this.computeRubberBandBox();
            this.doRubberBand(this.Box);
        }
        this.stopTool();
    }

    public /*virtual*/ doRubberBand(box: CGRectangle): void {
        if (!this.isBeyondDragSize()) {
            this.doSelect(this.LastInput);
            this.doClick(this.LastInput);
            return;
        }
        const doc: CGRectangle = this.View.convertViewToDoc(box);
        this.View.selectInRectangle(doc);
    }

    public /*override*/ stop(): void {
        this.View.drawXorBox(this.Box, false);
        this.View.stopAutoScroll();
        this.Active = false;
    }
}
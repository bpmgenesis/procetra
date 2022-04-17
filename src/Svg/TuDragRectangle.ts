import { TuRectangle } from "./TuRectangle/TuRectangle";
import { CGSize, CGPoint } from '@tuval/cg';
import { float } from '@tuval/core';

export class TuDragRectangle extends TuRectangle {
    private myOffset: CGSize;

    public get Offset(): CGSize {
        return this.myOffset;
    }
    public set Offset(value: CGSize) {
        this.myOffset = value;
    }

    protected /*override*/ getLocation(): CGPoint {
        const left: float = this.Left;
        let offset: CGSize = this.Offset;
        const width: float = left + offset.Width;
        const top: float = this.Top;
        offset = this.Offset;
        return new CGPoint(width, top + offset.Height);
    }
    protected /*override*/ setLocation(value: CGPoint) {
        const x: float = value.X;
        let offset: CGSize = this.Offset;
        const width: float = x - offset.Width;
        const y: float = value.Y;
        offset = this.Offset;
        this.Position = new CGPoint(width, y - offset.Height);
    }

    protected /*override*/ getLocation$(): CGPoint {
        const left: float = this.Left;
        let offset: CGSize = this.Offset;
        const width: float = left + offset.Width;
        const top: float = this.Top;
        offset = this.Offset;
        return new CGPoint(width, top + offset.Height);
    }
    protected /*override*/ setLocation$(value: CGPoint) {
        const x: float = value.X;
        let offset: CGSize = this.Offset;
        const width: float = x - offset.Width;
        const y: float = value.Y;
        offset = this.Offset;
        this.Position = new CGPoint(width, y - offset.Height);
    }

    protected getOffset(): CGSize {
        return this.myOffset;
    }
    protected setOffset(value: CGSize) {
        this.myOffset = value;
    }

}
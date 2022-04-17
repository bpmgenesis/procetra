import { CGSize, CGPoint } from '@tuval/cg';
import { Types } from './types';
import { TuImage } from './TuImage/TuImage';
import { ClassInfo, float } from '@tuval/core';

@ClassInfo({
    fullName: Types.TuDragImage,
    instanceof: [
        Types.TuDragImage
    ]
})
export class TuDragImage extends TuImage {
    private myOffset: CGSize;

    protected /*override*/  getLocation(): CGPoint {

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
        const y = value.Y;
        offset = this.Offset;
        this.Position = new CGPoint(width, y - offset.Height);
    }

    public get Offset(): CGSize {
        return this.myOffset;
    }
    public set Offset(value: CGSize) {
        this.myOffset = value;
    }
}
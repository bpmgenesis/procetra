import { CGPoint } from '@tuval/cg';
import { float, clone, TArray } from '@tuval/core';
import { TuStrokeArrowheadStyle } from './TuStrokeArrowheadStyle';

/* internal */ const flagFilled: number = 65536;
/* internal */ const flagStyleMask: number = 65535;
export class ArrowInfo {

    /* internal */  ArrowLength: float = 0;
    /* internal */  ShaftLength: float = 0;
    /* internal */  Width: float = 0;
    private myFlags: number = 0;
    private myPolyPoints: CGPoint[];

    /* internal */  get Filled(): boolean {
        return (this.myFlags & flagFilled) !== 0;
    }
	/* internal */ set Filled(value: boolean) {
        if (value) {
            this.myFlags |= flagFilled;
            return;
        }
        this.myFlags &= ~flagFilled;
    }

/* internal */ get Style(): TuStrokeArrowheadStyle {
        return (this.myFlags & flagStyleMask);
    }
/* internal */  set Style(value: TuStrokeArrowheadStyle) {
        this.myFlags = this.myFlags & ~flagStyleMask | (value & (TuStrokeArrowheadStyle.Circle | TuStrokeArrowheadStyle.Cross | TuStrokeArrowheadStyle.Slash | TuStrokeArrowheadStyle.BackSlash | TuStrokeArrowheadStyle.X));
    }

    public clone(): ArrowInfo {
        const arrowInfo: ArrowInfo = clone(this);
        if (this.myPolyPoints != null) {
            arrowInfo.myPolyPoints = TArray.Clone(this.myPolyPoints);
        }
        return arrowInfo;
    }

    /* internal */ getPoly(n: number): CGPoint[] {
        if (this.myPolyPoints == null || this.myPolyPoints.length < n) {
            this.myPolyPoints = new Array(n);
            for (let i = 0; i < this.myPolyPoints.length; i++) {
                this.myPolyPoints[i] = new CGPoint();
            }
        }
        return this.myPolyPoints;
    }
}
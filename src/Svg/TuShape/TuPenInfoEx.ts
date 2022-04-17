import { DashStyle, DashCap, PenAlignment, LineCap, LineJoin } from '@tuval/graphics';
import { ClassInfo, float } from '@tuval/core';
import { Types } from '../types';

@ClassInfo({
    fullName: Types.TuPenInfoEx,
    instanceof: [
        Types.TuPenInfoEx
    ]
})
export class TuPenInfoEx {
    public myDashStyle: DashStyle = DashStyle.Solid;
    public myDashCap: DashCap = DashCap.Flat;
    public myDashOffset: float = 0;
    public myDashPattern: float[];
    public myAlignment: PenAlignment = PenAlignment.Center;
    public myEndCap: LineCap = LineCap.Flat;
    public myStartCap: LineCap = LineCap.Flat;
    public myLineJoin: LineJoin = LineJoin.Miter;
    public myMiterLimit: float = 0;
    public myCompoundFractions: float[];

    public constructor(other?: TuPenInfoEx) {
        if (other != null) {
            this.myDashStyle = other.myDashStyle;
            this.myDashCap = other.myDashCap;
            this.myDashOffset = other.myDashOffset;
            if (other.myDashPattern != null) {
                this.myDashPattern = other.myDashPattern.slice();
            }
            this.myAlignment = other.myAlignment;
            this.myEndCap = other.myEndCap;
            this.myStartCap = other.myStartCap;
            this.myLineJoin = other.myLineJoin;
            this.myMiterLimit = other.myMiterLimit;
            if (other.myCompoundFractions != null) {
                this.myCompoundFractions = other.myCompoundFractions.slice();
            }
        }
    }

    public /*override*/ equals(obj: TuPenInfoEx): boolean {
        const goPenInfoEx: TuPenInfoEx = obj;
        if (goPenInfoEx == null) {
            return false;
        }
        if (this.myDashStyle !== goPenInfoEx.myDashStyle || this.myDashCap !== goPenInfoEx.myDashCap || this.myDashOffset !== goPenInfoEx.myDashOffset || this.myAlignment !== goPenInfoEx.myAlignment || this.myEndCap !== goPenInfoEx.myEndCap || this.myStartCap !== goPenInfoEx.myStartCap || this.myLineJoin !== goPenInfoEx.myLineJoin || this.myMiterLimit !== goPenInfoEx.myMiterLimit) {
            return false;
        }
        if (this.myDashStyle === DashStyle.Custom && (this.myDashPattern != null || goPenInfoEx.myDashPattern != null)) {
            if (this.myDashPattern == null || goPenInfoEx.myDashPattern == null) {
                return false;
            }
            if (this.myDashPattern.length !== goPenInfoEx.myDashPattern.length) {
                return false;
            }
            for (let i = 0; i < this.myDashPattern.length; i++) {
                if (this.myDashPattern[i] !== goPenInfoEx.myDashPattern[i]) {
                    return false;
                }
            }
        }
        if (this.myCompoundFractions !== null || goPenInfoEx.myCompoundFractions != null) {
            if (this.myCompoundFractions === null || goPenInfoEx.myCompoundFractions == null) {
                return false;
            }
            if (this.myCompoundFractions.length !== goPenInfoEx.myCompoundFractions.length) {
                return false;
            }
            for (let j = 0; j < this.myCompoundFractions.length; j++) {
                if (this.myCompoundFractions[j] != goPenInfoEx.myCompoundFractions[j]) {
                    return false;
                }
            }
        }
        return true;
    }

    public /*override*/ getHashCode(): number {
        /* const hashCode: number = this.myDashStyle ^ this.myDashCap ^ this.myDashOffset.getHashCode() ^ (int)this.myAlignment ^ (int)this.myEndCap ^ (int)this.myStartCap ^ (int)this.myLineJoin ^ this.myMiterLimit.GetHashCode();
        if (this.myDashStyle == DashStyle.Custom && this.myDashPattern != null)
        {
            hashCode = hashCode ^ this.myDashPattern.GetHashCode();
        }
        if (this.myCompoundFractions != null)
        {
            hashCode = hashCode ^ this.myCompoundFractions.GetHashCode();
        }
        return hashCode; */
        return 0;
    }
}
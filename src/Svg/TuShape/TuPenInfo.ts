import { CGColor } from '@tuval/cg';
import { ClassInfo, float } from '@tuval/core';
import { Types } from '../types';
import { Pen, DashStyle, DashCap, PenAlignment, LineCap, LineJoin } from '@tuval/graphics';
import { TuPenInfoEx } from './TuPenInfoEx';
import { getPenColor, getPenWidth } from '../Globals';

@ClassInfo({
    fullName: Types.TuPenInfo,
    instanceof: [
        Types.TuPenInfo
    ]
})
export class TuPenInfo {
    private myPen: Pen;
    private myColor: CGColor = CGColor.Empty;
    private myWidth: float = 0;
    private myEx: TuPenInfoEx;

    public get Color(): CGColor {

        return this.myColor;
    }
    public set Color(value: CGColor) {
        this.myColor = value;
    }

    public get MiterLimit(): float {
        if (this.myEx == null) {
            return 10;
        }
        return (<any>this.myEx).myMiterLimit;
    }

    public get Width(): float {
        return this.myWidth;
    }
    public set Width(value: float) {
        this.myWidth = value;
    }

    public constructor()
    public constructor(pen: Pen)
    public constructor(other: TuPenInfo)
    public constructor(...args: any[]) {
        if (args[0] instanceof Pen) {
            this.setPen(args[0]);
        } else if (args[0] instanceof TuPenInfo) {
            let goPenInfoEx: TuPenInfoEx;
            if (args[0] != null) {
                this.myColor = args[0].myColor;
                this.myWidth = args[0].myWidth;
                if (args[0].myEx != null) {
                    goPenInfoEx = new TuPenInfoEx(args[0].myEx);
                }
                else {
                    goPenInfoEx = undefined;
                }
                this.myEx = goPenInfoEx;
            }
        }
    }

    public getPen(): Pen {
        if (this.myPen == null) {
            this.myPen = new Pen(this.Color, this.Width);
            if (this.myEx != null) {
                this.myPen.DashStyle = this.myEx.myDashStyle;
                // this.myPen.DashCap = this.myEx.myDashCap;
                this.myPen.DashOffset = this.myEx.myDashOffset;
                if (this.myEx.myDashStyle === DashStyle.Custom) {
                    this.myPen.DashPattern = this.myEx.myDashPattern;
                }
                this.myPen.Alignment = this.myEx.myAlignment;
                this.myPen.EndCap = this.myEx.myEndCap;
                this.myPen.StartCap = this.myEx.myStartCap;
                this.myPen.LineJoin = this.myEx.myLineJoin;
                this.myPen.MiterLimit = this.myEx.myMiterLimit;
                if (this.myEx.myCompoundFractions != null) {
                    // this.myPen.CompoundArray = this.myEx.myCompoundFractions;
                }
            }
        }
        return this.myPen;
    }

    public setPen(p: Pen): boolean {
        this.myPen = p;
        this.myColor = getPenColor(p, CGColor.Empty);
        this.myWidth = getPenWidth(p);
        if (p.DashStyle !== 0/* DashStyle.Solid */) {
            if (this.myEx == null) {
                this.myEx = new TuPenInfoEx();
            }
            this.myEx.myDashStyle = p.DashStyle;
        }
        if (p.DashCap !== DashCap.Flat) {
            if (this.myEx == null) {
                this.myEx = new TuPenInfoEx();
            }
            this.myEx.myDashCap = p.DashCap;
        }
        if (p.DashOffset !== 0) {
            if (this.myEx == null) {
                this.myEx = new TuPenInfoEx();
            }
            this.myEx.myDashOffset = p.DashOffset;
        }
        if (p.DashStyle === 5/* DashStyle.Custom */) {
            if (this.myEx == null) {
                this.myEx = new TuPenInfoEx();
            }
            this.myEx.myDashPattern = p.DashPattern;
        }
        if (p.Alignment !== PenAlignment.Center) {
            if (this.myEx == null) {
                this.myEx = new TuPenInfoEx();
            }
            this.myEx.myAlignment = p.Alignment;
        }
        if (p.EndCap != LineCap.Flat) {
            if (this.myEx == null) {
                this.myEx = new TuPenInfoEx();
            }
            this.myEx.myEndCap = p.EndCap;
        }
        if (p.StartCap !== LineCap.Flat) {
            if (this.myEx == null) {
                this.myEx = new TuPenInfoEx();
            }
            this.myEx.myStartCap = p.StartCap;
        }
        if (p.LineJoin !== LineJoin.Miter) {
            if (this.myEx == null) {
                this.myEx = new TuPenInfoEx();
            }
            this.myEx.myLineJoin = p.LineJoin;
        }
        if (p.MiterLimit !== 10) {
            if (this.myEx == null) {
                this.myEx = new TuPenInfoEx();
            }
            this.myEx.myMiterLimit = p.MiterLimit;
        }
        const compoundArray: float[] = (<any>p).CompoundArray;
        if (compoundArray != null && compoundArray.length !== 0) {
            if (this.myEx == null) {
                this.myEx = new TuPenInfoEx();
            }
            this.myEx.myCompoundFractions = compoundArray;
        }
        if (this.myColor !== CGColor.Empty) {
            return true;
        }
        this.myColor = CGColor.Black;
        return false;
    }

    public /*override*/ equals(penInfo: TuPenInfo): boolean {
        if (penInfo == null) {
            return false;
        }
        if (!(this.myColor === penInfo.myColor) || this.myWidth !== penInfo.myWidth) {
            return false;
        }
        if (this.myEx == null) {
            return penInfo.myEx == null;
        }
        return this.myEx.equals(penInfo.myEx);
    }
}
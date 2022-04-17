import { Types } from './../types';
import { ClassInfo, float } from '@tuval/core';
import { TuBrushType } from './TuBrushType';
import { TuBrushStyle } from './TuBrushStyle';
import { CGColor, CGImage, WrapMode, CGPoint } from '@tuval/cg';

@ClassInfo({
    fullName: Types.BrushInfoEx,
    instanceof: [
        Types.BrushInfoEx
    ]
})
export class BrushInfoEx {
    public myBrushType: TuBrushType;
    public myBrushStyle: TuBrushStyle;
    public myForeColor: CGColor;
    public myImage: CGImage;
    public myWrapMode: WrapMode;
    public myStartOrFocusScales: CGPoint;
    public myPoint: CGPoint;
    public myMidBlendFactor: float;
    public myMidPosition: float;
    public myMidColor: CGColor;

    public constructor(other?: BrushInfoEx) {
        if (other != null) {
            this.myBrushType = other.myBrushType;
            this.myBrushStyle = other.myBrushStyle;
            this.myForeColor = other.myForeColor;
            this.myImage = other.myImage;
            this.myWrapMode = other.myWrapMode;
            this.myStartOrFocusScales = other.myStartOrFocusScales;
            this.myPoint = other.myPoint;
            this.myMidBlendFactor = other.myMidBlendFactor;
            this.myMidPosition = other.myMidPosition;
            this.myMidColor = other.myMidColor;
        }
    }

    public /*override*/  Equals(obj: BrushInfoEx): boolean {
        const goBrushInfoEx: BrushInfoEx = obj;
        if (goBrushInfoEx == null) {
            return false;
        }
        if (this.myBrushType !== goBrushInfoEx.myBrushType || this.myBrushStyle !== goBrushInfoEx.myBrushStyle || !(this.myForeColor === goBrushInfoEx.myForeColor) || this.myImage !== goBrushInfoEx.myImage || this.myWrapMode !== goBrushInfoEx.myWrapMode || !(this.myStartOrFocusScales === goBrushInfoEx.myStartOrFocusScales) || !(this.myPoint === goBrushInfoEx.myPoint) || this.myMidBlendFactor !== goBrushInfoEx.myMidBlendFactor || this.myMidPosition !== goBrushInfoEx.myMidPosition) {
            return false;
        }
        return this.myMidColor == goBrushInfoEx.myMidColor;
    }
}
import { TuBrushStyle } from './TuBrushStyle';
import { BrushInfoEx } from './BrushInfoEx';
import { CGColor, WrapMode, CGPoint, CGRectangle, Matrix } from '@tuval/cg';
import { ClassInfo, float, as } from '@tuval/core';
import { Types } from '../types';
import { Brush, HatchStyle, PathGradientBrush, SolidBrush, HatchBrush, GraphicsPath,Blend,
    ColorBlend,GraphicTypes, LinearGradientBrush , TextureBrush} from '@tuval/graphics';
import { TuBrushType } from './TuBrushType';
import { TuShape } from './TuShape';

@ClassInfo({
    fullName: Types.TuBrushInfo,
    instanceof: [
        Types.TuBrushInfo
    ]
})
export class TuBrushInfo {
    private myBrush: Brush;
    private myColor: CGColor = CGColor.Empty;
    private myEx: BrushInfoEx;

    public get BrushStyle(): TuBrushStyle {
        if (this.myEx == null) {
            return TuBrushStyle.Solid;
        }
        return this.myEx.myBrushStyle;
    }
    public set BrushStyle(value: TuBrushStyle) {
        if (this.myEx == null && value !== TuBrushStyle.Solid) {
            this.myEx = new BrushInfoEx();
        }
        if (this.myEx != null) {
            this.myEx.myBrushStyle = value;
            switch (value) {
                case TuBrushStyle.None:
                    {
                        this.myEx.myBrushType = TuBrushType.None;
                        return;
                    }
                case TuBrushStyle.Solid:
                    {
                        this.myEx.myBrushType = TuBrushType.Solid;
                        return;
                    }
                case TuBrushStyle.SimpleGradientVertical:
                case TuBrushStyle.SimpleGradientHorizontal:
                case TuBrushStyle.SimpleGradientForwardDiagonal:
                case TuBrushStyle.SimpleGradientBackwardDiagonal:
                    {
                        this.myEx.myBrushType = TuBrushType.LinearGradientGamma;
                        this.myEx.myWrapMode = WrapMode.TileFlipXY;
                        return;
                    }
                case TuBrushStyle.MiddleGradientVertical:
                case TuBrushStyle.MiddleGradientHorizontal:
                case TuBrushStyle.MiddleGradientForwardDiagonal:
                case TuBrushStyle.MiddleGradientBackwardDiagonal:
                    {
                        this.myEx.myBrushType = TuBrushType.LinearGradientGamma;
                        this.myEx.myWrapMode = WrapMode.TileFlipXY;
                        return;
                    }
                case TuBrushStyle.SingleEdgeGradientTop:
                case TuBrushStyle.SingleEdgeGradientLeft:
                case TuBrushStyle.SingleEdgeGradientRight:
                case TuBrushStyle.SingleEdgeGradientBottom:
                    {
                        this.myEx.myBrushType = TuBrushType.LinearGradientGamma;
                        this.myEx.myWrapMode = WrapMode.TileFlipXY;
                        return;
                    }
                case TuBrushStyle.DoubleEdgeGradientVertical:
                case TuBrushStyle.DoubleEdgeGradientHorizontal:
                case TuBrushStyle.DoubleEdgeGradientForwardDiagonal:
                case TuBrushStyle.DoubleEdgeGradientBackwardDiagonal:
                    {
                        this.myEx.myBrushType = TuBrushType.LinearGradientGamma;
                        this.myEx.myWrapMode = WrapMode.TileFlipXY;
                        return;
                    }
                case TuBrushStyle.ShapeSimpleGradient:
                    {
                        this.myEx.myBrushType = TuBrushType.PathGradient;
                        this.myEx.myWrapMode = WrapMode.Clamp;
                        return;
                    }
                case TuBrushStyle.ShapeFringeGradient:
                    {
                        this.myEx.myBrushType = TuBrushType.PathGradient;
                        this.myEx.myWrapMode = WrapMode.Clamp;
                        return;
                    }
                case TuBrushStyle.ShapeHighlightGradient:
                    {
                        this.myEx.myBrushType = TuBrushType.PathGradient;
                        this.myEx.myWrapMode = WrapMode.TileFlipXY;
                        return;
                    }
                case TuBrushStyle.RectangleGradient:
                    {
                        this.myEx.myBrushType = TuBrushType.PathGradient;
                        this.myEx.myWrapMode = WrapMode.TileFlipX;
                        return;
                    }
                case TuBrushStyle.EllipseGradient:
                    {
                        this.myEx.myBrushType = TuBrushType.PathGradient;
                        this.myEx.myWrapMode = WrapMode.TileFlipY;
                        return;
                    }
                default:
                    {
                        switch (value) {
                            case TuBrushStyle.Texture:
                                {
                                    this.myEx.myBrushType = TuBrushType.Texture;
                                    return;
                                }
                            case TuBrushStyle.CustomLinearGradient:
                                {
                                    this.myEx.myBrushType = TuBrushType.LinearGradient;
                                    return;
                                }
                            case TuBrushStyle.CustomPathGradient:
                                {
                                    this.myEx.myBrushType = TuBrushType.PathGradient;
                                    return;
                                }
                            default:
                                {
                                    this.myEx.myBrushType = TuBrushType.Hatch;
                                    break;
                                }
                        }
                        break;
                    }
            }
        }
    }


    public get BrushType(): TuBrushType {

        if (this.myEx == null) {
            return TuBrushType.Solid;
        }
        return this.myEx.myBrushType;
    }

    public get Color(): CGColor {
        return this.myColor;
    }
    public set Color(value: CGColor) {
        this.myColor = value;
    }

    public get ForeColor(): CGColor {
        if (this.myEx == null) {
            return CGColor.Empty;
        }
        return this.myEx.myForeColor;
    }
    public set ForeColor(value: CGColor) {
        if (this.myEx == null && value !== CGColor.Empty) {
            this.myEx = new BrushInfoEx();
        }
        if (this.myEx != null) {
            this.myEx.myForeColor = value;
        }
    }

    public get HasBrush(): boolean {
        return this.myBrush != null;
    }

    public get MidBlendFactor(): float {
        if (this.myEx == null) {
            return Number.NaN;
        }
        return this.myEx.myMidBlendFactor;
    }
    public set MidBlendFactor(value: float) {
        if (this.myEx == null && !Number.isNaN(value)) {
            this.myEx = new BrushInfoEx();
        }
        if (this.myEx != null) {
            this.myEx.myMidBlendFactor = value;
        }
    }

    public get MidColor(): CGColor {
        if (this.myEx == null) {
            return CGColor.Empty;
        }
        return this.myEx.myMidColor;
    }
    public set MidColor(value: CGColor) {
        if (this.myEx == null && value !== CGColor.Empty) {
            this.myEx = new BrushInfoEx();
        }
        if (this.myEx != null) {
            this.myEx.myMidColor = value;
        }
    }

    public get MidFraction(): float {
        if (this.myEx == null) {
            return Number.NaN;
        }
        return this.myEx.myMidPosition;
    }
    public set MidFraction(value: float) {
        if (this.myEx == null && value !== Number.NaN) {
            this.myEx = new BrushInfoEx();
        }
        if (this.myEx != null) {
            this.myEx.myMidPosition = value;
        }
    }

    public get Point(): CGPoint {
        if (this.myEx == null) {
            return new CGPoint();
        }
        return this.myEx.myPoint;
    }
    public set Point(value: CGPoint) {
        if (this.myEx == null) {
            if (value != new CGPoint()) {
                this.myEx = new BrushInfoEx();
            }
        }
        if (this.myEx != null) {
            this.myEx.myPoint = value;
        }
    }

    public get StartOrFocusScales(): CGPoint {
        if (this.myEx == null) {
            return new CGPoint();
        }
        return this.myEx.myStartOrFocusScales;
    }
    public set StartOrFocusScales(value: CGPoint) {
        if (this.myEx == null) {
            if (value != new CGPoint()) {
                this.myEx = new BrushInfoEx();
            }
        }
        if (this.myEx != null) {
            this.myEx.myStartOrFocusScales = value;
        }
    }

    public constructor();
    public constructor(b: Brush);
    public constructor(other: TuBrushInfo);
    public constructor(...args: any[]) {

        if (args[0] instanceof Brush) {
            this.setBrush(args[0], undefined);
        } else if (args[0] instanceof TuBrushInfo) {
            let goBrushInfoEx: BrushInfoEx;
            if (args[0] != null) {
                this.myColor = args[0].myColor;
                if (args[0].myEx != null) {
                    goBrushInfoEx = new BrushInfoEx(args[0].myEx);
                }
                else {
                    goBrushInfoEx = undefined;
                }
                this.myEx = goBrushInfoEx;
            }
        }
    }

    public /*override*/  equals(obj: TuBrushInfo): boolean {
        const goBrushInfo: TuBrushInfo = obj;
        if (goBrushInfo == null) {
            return false;
        }
        if (this.myColor !== goBrushInfo.myColor) {
            return false;
        }
        if (this.myEx == null) {
            return goBrushInfo.myEx == null;
        }
        return this.myEx.Equals(goBrushInfo.myEx);
    }

    public getBrush(shapeorpath: any): Brush {
        function toHatchStyle(s: TuBrushStyle): HatchStyle {
            return ((s + 256));
        }
        let pathGradientBrush: PathGradientBrush;
        if (this.myBrush == null) {
            if (this.myEx == null || this.myEx.myBrushType === TuBrushType.Solid) {
                this.myBrush = new SolidBrush(this.myColor);
            }
            else {
                if (this.myEx.myBrushType === TuBrushType.None) {
                    return undefined;
                }
                if (this.myEx.myBrushType === TuBrushType.Hatch) {
                    this.myBrush = new HatchBrush(toHatchStyle(this.myEx.myBrushStyle), this.myEx.myForeColor, this.myColor);
                }
                else if (this.myEx.myBrushType !== TuBrushType.Texture) {
                    if (this.myEx.myBrushType === TuBrushType.LinearGradient || this.myEx.myBrushType === TuBrushType.LinearGradientGamma) {
                        let rectangleF: CGRectangle = new CGRectangle(0, 0, 100, 100);
                        const goShape: TuShape = as(shapeorpath, Types.TuShape);
                        if (goShape == null) {
                            const graphicsPath: GraphicsPath = as(shapeorpath, GraphicTypes.GraphicsPath);
                            if (graphicsPath != null) {
                                rectangleF = graphicsPath.getBounds();
                            }
                        }
                        else {
                            rectangleF = goShape.Bounds;
                        }
                        if (rectangleF.Width < 0.001 && rectangleF.Height < 0.001 || rectangleF.Width > 9999999 || rectangleF.Height > 9999999) {
                            this.myBrush = new SolidBrush(this.myColor);
                            return this.myBrush;
                        }
                        let pointF: CGPoint = new CGPoint(this.myEx.myStartOrFocusScales.X * rectangleF.Width, this.myEx.myStartOrFocusScales.Y * rectangleF.Height);
                        let pointF1: CGPoint = new CGPoint(this.myEx.myPoint.X * rectangleF.Width, this.myEx.myPoint.Y * rectangleF.Height);
                        if (pointF == pointF1) {
                            pointF = new CGPoint(0, 0);
                            pointF1 = new CGPoint(0, rectangleF.Height);
                        }
                        const linearGradientBrush: LinearGradientBrush = new LinearGradientBrush(pointF, pointF1, this.myEx.myForeColor, this.myColor)
                        linearGradientBrush.WrapMode = this.myEx.myWrapMode;

                        if (this.myEx.myMidColor !== CGColor.Empty && !Number.isNaN(this.myEx.myMidPosition)) {
                            const colorBlend: ColorBlend = new ColorBlend();
                            colorBlend.Colors = [this.myEx.myForeColor, this.myEx.myMidColor, this.myColor];
                            colorBlend.Positions = [0, this.myEx.myMidPosition, 1];
                            linearGradientBrush.InterpolationColors = colorBlend;
                        }
                        else if (!Number.isNaN(this.myEx.myMidBlendFactor) && !Number.isNaN(this.myEx.myMidPosition)) {
                            const blend: Blend = new Blend();
                            blend.Factors = [0, this.myEx.myMidBlendFactor, 1];
                            blend.Positions = [0, this.myEx.myMidPosition, 1];
                            linearGradientBrush.Blend = blend;
                        }
                        linearGradientBrush.GammaCorrection = this.myEx.myBrushType === TuBrushType.LinearGradientGamma;
                        return linearGradientBrush;
                    }
                    if (this.myEx.myBrushType === TuBrushType.PathGradient) {
                        let path: GraphicsPath = as(shapeorpath, GraphicTypes.GraphicsPath);
                        const goShape1: TuShape = as(shapeorpath, Types.TuShape);
                        if (path == null && goShape1 != null) {
                            path = (<any>goShape1).getPath();
                        }
                        if (path != null) {
                            let bounds: CGRectangle = path.getBounds();
                            if (bounds.Width < 0.001 || bounds.Height < 0.001 || bounds.Width > 9999999 || bounds.Height > 9999999) {
                                this.myBrush = new SolidBrush(this.myColor);
                                return this.myBrush;
                            }
                            if (this.myEx.myWrapMode == WrapMode.TileFlipX) {
                                if (goShape1 != null) {
                                    bounds = goShape1.Bounds;
                                }
                                pathGradientBrush = new PathGradientBrush([
                                    new CGPoint(bounds.X, bounds.Y),
                                    new CGPoint(bounds.Right, bounds.Y),
                                    new CGPoint(bounds.Right, bounds.Bottom),
                                    new CGPoint(bounds.X, bounds.Bottom)
                                ], WrapMode.Clamp);
                            }
                            else if (this.myEx.myWrapMode !== WrapMode.TileFlipY) {
                                pathGradientBrush = new PathGradientBrush(path);
                            }
                            else {
                                if (goShape1 != null) {
                                    bounds = goShape1.Bounds;
                                }
                                const width: float = bounds.Width / 2;
                                const height: float = bounds.Height / 2;
                                if (width > 0.1 && height > 0.1) {
                                    const num: float = Math.atan2(height, width);
                                    const single: float = Math.sin(num);
                                    const single1: float = Math.cos(num);
                                    bounds.inflate(single1 * width, single * height);
                                }
                                const graphicsPath1: GraphicsPath = new GraphicsPath();
                                graphicsPath1.addEllipse(bounds);
                                pathGradientBrush = new PathGradientBrush(graphicsPath1);
                            }
                            if (this.myEx.myWrapMode !== WrapMode.Clamp) {
                                const pointF2: CGPoint = new CGPoint(bounds.X + this.myEx.myPoint.X * bounds.Width, bounds.Y + this.myEx.myPoint.Y * bounds.Height);
                                pathGradientBrush.CenterPoint = pointF2;
                            }
                            pathGradientBrush.WrapMode = this.myEx.myWrapMode;
                            if (!(this.myEx.myMidColor !== CGColor.Empty) || Number.isNaN(this.myEx.myMidPosition)) {
                                if (!Number.isNaN(this.myEx.myMidBlendFactor) && !Number.isNaN(this.myEx.myMidPosition)) {
                                    const blend1: Blend = new Blend();
                                    blend1.Factors = [0, this.myEx.myMidBlendFactor, 1];
                                    blend1.Positions = [0, this.myEx.myMidPosition, 1];
                                    pathGradientBrush.Blend = blend1;
                                }
                                pathGradientBrush.CenterColor = this.myColor;
                                pathGradientBrush.SurroundColors = [this.myEx.myForeColor]
                            }
                            else {
                                const colorBlend1: ColorBlend = new ColorBlend()
                                colorBlend1.Colors = [this.myEx.myForeColor, this.myEx.myMidColor, this.myColor];
                                colorBlend1.Positions = [0, this.myEx.myMidPosition, 1];
                                pathGradientBrush.InterpolationColors = colorBlend1;
                            }
                            pathGradientBrush.FocusScales = this.myEx.myStartOrFocusScales;
                            return pathGradientBrush;
                        }
                    }
                }
                else if (this.myEx.myImage != null) {
                    const textureBrush: TextureBrush = new TextureBrush(this.myEx.myImage/* , this.myEx.myWrapMode */);
                    const matrix: Matrix = new Matrix(this.myEx.myStartOrFocusScales.X, this.myEx.myStartOrFocusScales.Y, this.myEx.myPoint.X, this.myEx.myPoint.Y, 0, 0);
                    textureBrush.Transform = matrix;
                    this.myBrush = textureBrush;
                }
                else {
                    this.myBrush = new SolidBrush(this.myColor);
                }
            }
        }
        return this.myBrush;
    }


    public setBrush(b: Brush, shapeorpath: any): void {
        function toBrushStyle(s: HatchStyle): TuBrushStyle {
            return s + 256;
        }

        let centerPoint: CGPoint;
        this.myBrush = b;
        if (b instanceof SolidBrush) {
            this.myColor = as<SolidBrush>(b, GraphicTypes.SolidBrush).Color;
            this.myEx = undefined;
            return;
        }
        if (b instanceof HatchBrush) {

            const hatchBrush: HatchBrush = as(b, GraphicTypes.HatchBrush);
            this.myColor = hatchBrush.BackgroundColor;
            if (this.myEx == null) {
                this.myEx = new BrushInfoEx();
            }
            this.myEx.myBrushType = TuBrushType.Hatch;
            this.myEx.myBrushStyle = toBrushStyle(hatchBrush.HatchStyle);
            this.myEx.myForeColor = hatchBrush.ForegroundColor;
            return;
        }
        if (b instanceof TextureBrush) {
            const textureBrush: TextureBrush = as(b, GraphicTypes.TextureBrush);
            if (this.myEx == null) {
                this.myEx = new BrushInfoEx();
            }
            this.myEx.myBrushType = TuBrushType.Texture;
            this.myEx.myBrushStyle = TuBrushStyle.Texture;
            this.myEx.myImage = textureBrush.Image as any;
            this.myEx.myWrapMode = textureBrush.WrapMode;
            const elements: float[] = textureBrush.Transform.Elements;
            this.myEx.myStartOrFocusScales = new CGPoint(elements[0], elements[1]);
            this.myEx.myPoint = new CGPoint(elements[2], elements[3]);
            return;
        }
        if (b instanceof LinearGradientBrush) {
            const linearGradientBrush: LinearGradientBrush = as(b, GraphicTypes.LinearGradientBrush);
            if (this.myEx == null) {
                this.myEx = new BrushInfoEx();
            }
            this.myEx.myBrushType = TuBrushType.LinearGradient;
            this.myEx.myBrushStyle = TuBrushStyle.CustomLinearGradient;
            let flag: boolean = false;
            let blend: Blend = undefined;
            try {
                blend = linearGradientBrush.Blend;
                if (blend != null && blend.Positions.length > 3) {
                    flag = <any>(<any>flag | 1);
                }
            }
            catch (exception) {
                blend = undefined;
            }
            let ınterpolationColors: ColorBlend = undefined;
            try {
                ınterpolationColors = linearGradientBrush.InterpolationColors;
                if (ınterpolationColors != null && ınterpolationColors.Positions.length > 3) {
                    flag = <any>(<any>flag | 1);
                }
            }
            catch (exception1) {
                ınterpolationColors = undefined;
            }
            if (!linearGradientBrush.GammaCorrection) {
                this.myEx.myBrushType = TuBrushType.LinearGradient;
            }
            else {
                this.myEx.myBrushType = TuBrushType.LinearGradientGamma;
            }
            if (!flag) {
                this.myBrush = undefined;
            }
            this.myColor = linearGradientBrush.LinearColors[1];
            this.myEx.myForeColor = linearGradientBrush.LinearColors[0];
            let bounds: CGRectangle = new CGRectangle();
            const goShape: TuShape = as(shapeorpath, Types.TuShape);
            if (goShape == null) {
                const graphicsPath: GraphicsPath = as(shapeorpath, GraphicTypes.GraphicsPath);
                if (graphicsPath != null) {
                    bounds = graphicsPath.getBounds();
                }
            }
            else {
                bounds = goShape.Bounds;
            }
            const transform: Matrix = linearGradientBrush.Transform;
            const rectangle: CGRectangle = linearGradientBrush.Rectangle;
            const pointF: CGPoint[] = [new CGPoint(rectangle.X, rectangle.Y), new CGPoint(rectangle.X + rectangle.Width, rectangle.Y)];
            transform.transformPoints(pointF);
            const width: CGPoint = pointF[0];
            const x: CGPoint = pointF[1];
            if (Math.abs(width.X - x.X) < 0.001) {
                width.X = bounds.Width / 4;
                x.X = width.X;
            }
            if (Math.abs(width.Y - x.Y) < 0.001) {
                width.Y = bounds.Height / 4;
                x.Y = width.Y;
            }
            if (Math.abs(width.X - x.X) > 0.001 && Math.abs(width.Y - x.Y) > 0.001) {
                const single: float = width.X - (rectangle.X + rectangle.Width / 2);
                const y: float = width.Y - (rectangle.Y + rectangle.Height / 2);
                const x1: float = x.X - (rectangle.X + rectangle.Width / 2);
                const y1: float = x.Y - (rectangle.Y + rectangle.Height / 2);
                if (single !== x1 && y !== y1) {
                    const single1: float = (y1 - y) / (x1 - single);
                    const single2: float = single1 + 1 / single1;
                    const single3: float = (single / single1 + y) / single2;
                    const single4: float = single1 * single3;
                    const single5: float = (x1 / single1 + y1) / single2;
                    const single6: float = single1 * single5;
                    width.X = single3 + (rectangle.X + rectangle.Width / 2);
                    width.Y = single4 + (rectangle.Y + rectangle.Height / 2);
                    x.X = single5 + (rectangle.X + rectangle.Width / 2);
                    x.Y = single6 + (rectangle.Y + rectangle.Height / 2);
                }
            }
            if (bounds.Width <= 0.001) {
                this.myEx.myStartOrFocusScales.X = 0;
                this.myEx.myPoint.X = 0;
            }
            else {
                this.myEx.myStartOrFocusScales.X = width.X / bounds.Width;
                this.myEx.myPoint.X = x.X / bounds.Width;
            }
            if (bounds.Height <= 0.001) {
                this.myEx.myStartOrFocusScales.Y = 0;
                this.myEx.myPoint.Y = 0;
            }
            else {
                this.myEx.myStartOrFocusScales.Y = width.Y / bounds.Height;
                this.myEx.myPoint.Y = x.Y / bounds.Height;
            }
            if (this.myEx.myStartOrFocusScales == this.myEx.myPoint) {
                this.myEx.myStartOrFocusScales = new CGPoint(0, 0);
                this.myEx.myPoint = new CGPoint(0, 1);
            }
            this.myEx.myWrapMode = linearGradientBrush.WrapMode;
            this.myEx.myMidPosition = Number.NaN;
            this.myEx.myMidBlendFactor = Number.NaN;
            if (ınterpolationColors != null && ınterpolationColors.Colors.length > 1) {
                this.myEx.myMidColor = ınterpolationColors.Colors[ınterpolationColors.Colors.length / 2];
                this.myEx.myMidPosition = ınterpolationColors.Positions[ınterpolationColors.Positions.length / 2];
            }
            else if (blend != null && blend.Factors.length > 1) {
                this.myEx.myMidBlendFactor = blend.Factors[blend.Factors.length / 2];
                this.myEx.myMidPosition = blend.Positions[blend.Positions.length / 2];
            }
            if (!flag) {
                const flag1: boolean = this.myEx.myPoint.X - this.myEx.myStartOrFocusScales.X > 0.1;
                const flag2: boolean = Math.abs(this.myEx.myPoint.X - this.myEx.myStartOrFocusScales.X) <= 0.1;
                const x2: boolean = this.myEx.myPoint.X - this.myEx.myStartOrFocusScales.X < -0.1;
                const y2: boolean = this.myEx.myPoint.Y - this.myEx.myStartOrFocusScales.Y > 0.1;
                const flag3: boolean = Math.abs(this.myEx.myPoint.Y - this.myEx.myStartOrFocusScales.Y) <= 0.1;
                const y3: boolean = this.myEx.myPoint.Y - this.myEx.myStartOrFocusScales.Y < -0.1;
                if (<any>flag2 & <any>y2) {
                    if (this.myEx.myMidColor !== CGColor.Empty) {
                        this.myEx.myBrushStyle = TuBrushStyle.MiddleGradientVertical;
                        return;
                    }
                    if (Number.isNaN(this.myEx.myMidPosition)) {
                        this.myEx.myBrushStyle = TuBrushStyle.SimpleGradientVertical;
                        return;
                    }
                    if (Math.abs(this.myEx.myPoint.X - 0.5) < 0.1) {
                        this.myEx.myBrushStyle = TuBrushStyle.DoubleEdgeGradientVertical;
                        return;
                    }
                    this.myEx.myBrushStyle = TuBrushStyle.SingleEdgeGradientTop;
                    return;
                }
                if (<any>flag1 & <any>flag3) {
                    if (this.myEx.myMidColor != CGColor.Empty) {
                        this.myEx.myBrushStyle = TuBrushStyle.MiddleGradientHorizontal;
                        return;
                    }
                    if (Number.isNaN(this.myEx.myMidPosition)) {
                        this.myEx.myBrushStyle = TuBrushStyle.SimpleGradientHorizontal;
                        return;
                    }
                    if (Math.abs(this.myEx.myPoint.X - 0.5) < 0.1) {
                        this.myEx.myBrushStyle = TuBrushStyle.DoubleEdgeGradientHorizontal;
                        return;
                    }
                    this.myEx.myBrushStyle = TuBrushStyle.SingleEdgeGradientLeft;
                    return;
                }
                if (<any>flag1 & <any>y2) {
                    if (this.myEx.myMidColor !== CGColor.Empty) {
                        this.myEx.myBrushStyle = TuBrushStyle.MiddleGradientForwardDiagonal;
                        return;
                    }
                    if (Number.isNaN(this.myEx.myMidPosition)) {
                        this.myEx.myBrushStyle = TuBrushStyle.SimpleGradientForwardDiagonal;
                        return;
                    }
                    if (Math.abs(this.myEx.myPoint.X - 0.5) < 0.1 && Math.abs(this.myEx.myPoint.Y - 0.5) < 0.1) {
                        this.myEx.myBrushStyle = TuBrushStyle.DoubleEdgeGradientForwardDiagonal;
                        return;
                    }
                }
                else if (<any>x2 & <any>y2) {
                    if (this.myEx.myMidColor !== CGColor.Empty) {
                        this.myEx.myBrushStyle = TuBrushStyle.MiddleGradientBackwardDiagonal;
                        return;
                    }
                    if (Number.isNaN(this.myEx.myMidPosition)) {
                        this.myEx.myBrushStyle = TuBrushStyle.SimpleGradientBackwardDiagonal;
                        return;
                    }
                    if (Math.abs(this.myEx.myPoint.X - 0.5) < 0.1 && Math.abs(this.myEx.myPoint.Y - 0.5) < 0.1) {
                        this.myEx.myBrushStyle = TuBrushStyle.DoubleEdgeGradientBackwardDiagonal;
                        return;
                    }
                }
                else if (<any>x2 & <any>flag3) {
                    if (!Number.isNaN(this.myEx.myMidPosition)) {
                        this.myEx.myBrushStyle = TuBrushStyle.SingleEdgeGradientRight;
                        return;
                    }
                }
                else if (<any>flag2 & <any>y3 && !Number.isNaN(this.myEx.myMidPosition)) {
                    this.myEx.myBrushStyle = TuBrushStyle.SingleEdgeGradientBottom;
                    return;
                }
            }
        }
        else if (!(b instanceof PathGradientBrush)) {
            if (this.myEx == null) {
                this.myEx = new BrushInfoEx();
            }
            this.myEx.myBrushType = TuBrushType.None;
            this.myEx.myBrushStyle = TuBrushStyle.None;
        }
        else {
            const pathGradientBrush: PathGradientBrush = as(b, GraphicTypes.PathGradientBrush);
            if (this.myEx == null) {
                this.myEx = new BrushInfoEx();
            }
            this.myEx.myBrushType = TuBrushType.PathGradient;
            this.myEx.myBrushStyle = TuBrushStyle.CustomPathGradient;
            let flag4: boolean = false;
            let blend1: Blend = undefined;
            try {
                blend1 = pathGradientBrush.Blend;
                if (blend1 != null && blend1.Positions.length > 3) {
                    flag4 = <any>(<any>flag4 | 1);
                }
            }
            catch (exception2) {
                blend1 = undefined;
            }
            let colorBlend: ColorBlend = undefined;
            try {
                colorBlend = pathGradientBrush.InterpolationColors;
                if (colorBlend != null && colorBlend.Positions.length > 3) {
                    flag4 = <any>(<any>flag4 | 1);
                }
            }
            catch (exception3) {
                colorBlend = undefined;
            }
            let surroundColors: CGColor[] = undefined;
            try {
                surroundColors = pathGradientBrush.SurroundColors;
                if (surroundColors != null && surroundColors.length > 1) {
                    flag4 = <any>(<any>flag4 | 1);
                }
            }
            catch (exception4) {
                surroundColors = undefined;
            }
            if (!flag4) {
                this.myBrush = undefined;
            }
            try {
                this.myColor = pathGradientBrush.CenterColor;
            }
            catch (exception5) {
                this.myColor = CGColor.Empty;
            }
            if (surroundColors == null) {
                this.myEx.myForeColor = CGColor.Empty;
            }
            else {
                this.myEx.myForeColor = surroundColors[0];
            }
            const rectangleF: CGRectangle = pathGradientBrush.Rectangle;
            try {
                centerPoint = pathGradientBrush.CenterPoint;
            }
            catch (exception6) {
                centerPoint = new CGPoint(rectangleF.X + rectangleF.Width / 2, rectangleF.Y + rectangleF.Height / 2);
            }
            this.myEx.myPoint = new CGPoint((rectangleF.Width === 0 ? 0.5 : (centerPoint.X - rectangleF.X) / rectangleF.Width), (rectangleF.Height === 0 ? 0.5 : (centerPoint.Y - rectangleF.Y) / rectangleF.Height));
            this.myEx.myWrapMode = pathGradientBrush.WrapMode;
            this.myEx.myMidPosition = Number.NaN;
            this.myEx.myMidBlendFactor = Number.NaN;
            if (colorBlend != null && colorBlend.Colors.length > 1) {
                this.myEx.myMidColor = colorBlend.Colors[colorBlend.Colors.length / 2];
                this.myEx.myMidPosition = colorBlend.Positions[colorBlend.Positions.length / 2];
            }
            else if (blend1 != null && blend1.Factors.length > 1) {
                this.myEx.myMidBlendFactor = blend1.Factors[blend1.Factors.length / 2];
                this.myEx.myMidPosition = blend1.Positions[blend1.Positions.length / 2];
            }
            this.myEx.myStartOrFocusScales = pathGradientBrush.FocusScales;
            if (!flag4) {
                switch (this.myEx.myWrapMode) {
                    case WrapMode.Tile:
                    case WrapMode.Clamp:
                        {
                            this.myEx.myBrushStyle = TuBrushStyle.ShapeFringeGradient;
                            return;
                        }
                    case WrapMode.TileFlipX:
                        {
                            this.myEx.myBrushStyle = TuBrushStyle.RectangleGradient;
                            return;
                        }
                    case WrapMode.TileFlipY:
                        {
                            this.myEx.myBrushStyle = TuBrushStyle.EllipseGradient;
                            return;
                        }
                    case WrapMode.TileFlipXY:
                        {
                            this.myEx.myBrushStyle = TuBrushStyle.ShapeHighlightGradient;
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
}
import { float, error } from '@tuval/core';
import { Graphics, Pens } from '@tuval/graphics';
import { CGRectangle, CGPoint, CGColor } from '@tuval/cg';
import { FrameStyle } from './FrameStyle';
import { Border3DStyle } from './Border3DStyle';
import { Border3DSide } from './Border3DSide';
export class ControlPaint {
    public static DrawReversibleFrame(rectangle: CGRectangle, backColor: CGColor, style: FrameStyle): void {
        throw error('ControlPaint.DrawReversibleFrame not implemented.');
    }
    public static DrawReversibleLine(start: CGPoint, end: CGPoint, backColor: CGColor): void {
        throw error('ControlPaint.DrawReversibleFrame not implemented.');
    }

    public static  DrawBorder3D( graphics:Graphics, x: float,  y: float, width: float,  height: float,  style:Border3DStyle): void;
    public static  DrawBorder3D( graphics:Graphics, x: float,  y: float,  width: float,  height: float): void;
    public static  DrawBorder3D( graphics:Graphics,  x: float,  y: float,  width: float,  height: float,  style:Border3DStyle,  sides:Border3DSide): void;
    public static  DrawBorder3D( graphics:Graphics,  rectangle: CGRectangle,  style:Border3DStyle): void;
    public static  DrawBorder3D( graphics:Graphics,  rectangle:CGRectangle): void;
    public static  DrawBorder3D( graphics:Graphics,  rectangle:CGRectangle,  style:Border3DStyle,  sides:Border3DSide): void;
    public static  DrawBorder3D( ...args: any[]): void {
        if (args.length === 3) {
            const graphics:Graphics = args[0];
            const  rectangle: CGRectangle = args[1];
            graphics.DrawRectangle(Pens.Black,rectangle);
        }
    }

}
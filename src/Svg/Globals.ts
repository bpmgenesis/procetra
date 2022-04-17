import { float } from '@tuval/core';
import { CGRectangle, CGColor, CGSize } from '@tuval/cg';
import { Pen, Pens, Brush, Brushes, GraphicsPath } from '@tuval/graphics';
import { NoSpot, Spot } from './Spot';

export const NullRect: CGRectangle = new CGRectangle(0, 0, 0, 0);
export const LastSpot: number = 8192;

export let Pens_Black: Pen = Pens.Black;
export let Pens_Gray: Pen = Pens.Gray;
export let Pens_LightGray: Pen = Pens.LightGray;
export let SystemPens_Control: Pen = Pens.Gray;
export let SystemPens_ControlDarkDark: Pen = Pens.Black;
export let SystemPens_ControlDark: Pen = Pens.BlueViolet;
export let SystemPens_ControlLightLight: Pen = Pens.Chartreuse;
export let SystemPens_WindowFrame: Pen = Pens.LightCyan;
export let Brushes_Black: Brush = Brushes.Black;
export let Brushes_Gray: Brush = Brushes.Gray;
export let Brushes_LightGray: Brush = Brushes.LightGray;
export let Brushes_White: Brush = Brushes.White;
export let Brushes_Yellow: Brush = Brushes.Yellow;
export let Brushes_LemonChiffon: Brush = Brushes.LemonChiffon;
export let Brushes_Gold: Brush = Brushes.Gold;
export let SystemBrushes_Control: Brush = Brushes.GreenYellow;




export function getPenColor(p: Pen, def: CGColor): CGColor {
    let color: CGColor;
    if (p == null) {
        return def;
    }
    try {
        color = p.Color;
    }
    catch (exception) {
        color = def;
    }
    return color;
}

export function getPenWidth(pen: Pen): float {
    let width: float;
    if (pen == null) {
        return 0;
    }
    try {
        width = pen.Width;
    }
    catch (exception) {
        width = 1;
    }
    return width;
}

export function makeRoundedRectangularPath(path: GraphicsPath, offx: float, offy: float, rect: CGRectangle, corner: CGSize): void;
export function makeRoundedRectangularPath(path: GraphicsPath, rect: CGRectangle, corner: CGSize, spots: Spot): void;
export function makeRoundedRectangularPath(...args: any[]): void {
    if (args.length === 5) {
        makeRoundedRectangularPath(args[0], new CGRectangle(args[3].X + args[1], args[3].Y + args[2], args[3].Width, args[3].Height), args[4], new Spot(-1, -1, 30));
    } else if (args.length === 4) {
        const path: GraphicsPath = args[0];
        const rect: CGRectangle = args[1];
        const corner: CGSize = args[2];
        const spots: Spot = args[3];

        if (corner.Width > rect.Width / 2) {
            corner.Width = rect.Width / 2;
        }
        if (corner.Height > rect.Height / 2) {
            corner.Height = rect.Height / 2;
        }
        const width: number = corner.Width * 2;
        const height: number = corner.Height * 2;
        if (width < 0.01 || height < 0.01 || spots === NoSpot) {
            path.addRectangle(rect);
        }
        else {
            const x: number = rect.X;
            const y: number = rect.Y;
            const single: number = x + width;
            const single1: number = y + height;
            const width1: number = x + rect.Width - width;
            const height1: number = y + rect.Height - height;
            const width2: number = x + rect.Width;
            const height2: number = y + rect.Height;
            const flag: boolean = (spots.ID & 4) !== 0;
            const flag1 = (spots.ID & 8) !== 0;
            const flag2 = (spots.ID & 16) !== 0;
            const flag3 = (spots.ID & 2) !== 0;
            if (flag) {
                path.addArc(width1, y, width, height, 270, 90);
            }
            if (!flag || !flag1 || single1 < height1) {
                path.addLine(width2, (flag ? single1 : y), width2, (flag1 ? height1 : height2));
            }
            if (flag1) {
                path.addArc(width1, height1, width, height, 0, 90);
            }
            if (!flag1 || !flag2 || single < width1) {
                path.addLine((flag1 ? width1 : width2), height2, (flag2 ? single : x), height2);
            }
            if (flag2) {
                path.addArc(x, height1, width, height, 90, 90);
            }
            if (!flag2 || !flag3 || single1 < height1) {
                path.addLine(x, (flag2 ? height1 : height2), x, (flag3 ? single1 : y));
            }
            if (flag3) {
                path.addArc(x, y, width, height, 180, 90);
            }
        }
        path.closeAllFigures();
    }
}

export const AllEvents: any = {};
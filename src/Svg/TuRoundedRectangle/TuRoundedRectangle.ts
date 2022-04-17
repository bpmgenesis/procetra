import { GraphicsPath, Graphics } from '@tuval/graphics';
import { TuChangedEventArgs } from './../TuChangedEventArgs';
import { NullRect } from './../Globals';
import { GeomUtilities } from './../GeomUtilities';
import { TuRoundedRectangleEvents } from './TuRoundedRectangleEvents';
import { NoSpot, Spot } from './../Spot';
import { CGSize, CGRectangle } from '@tuval/cg';
import { ClassInfo, float } from '@tuval/core';
import { FillMode } from '@tuval/graphics';
import { TuRectangle } from '../TuRectangle/TuRectangle';
import { Types } from '../types';
import { TuView } from '../TuView/TuView';

@ClassInfo({
    fullName: Types.TuRoundedRectangle,
    instanceof: [
        Types.TuRoundedRectangle
    ]
})
export class TuRoundedRectangle extends TuRectangle {

    private myCorner: CGSize = new CGSize(10, 10);
    private myRoundedCornerSpots: Spot = new Spot(-1, -1, 30);

    //#region [Property] Corner
    public get Corner(): CGSize {
        return this.getCorner();
    }
    public set Corner(value: CGSize) {
        this.setCorner(value);
    }

    protected /*virtual*/ getCorner(): CGSize {
        return this.myCorner;
    }
    protected /*virtual*/ setCorner(value: CGSize) {
        const sizeF: CGSize = this.myCorner;
        if (sizeF !== value && value.Width >= 0 && value.Height >= 0) {
            this.myCorner = value;
            this.resetPath();
            this.Changed(TuRoundedRectangleEvents.ChangedCorner, 0, undefined, GeomUtilities.MakeRect(sizeF), 0, undefined, GeomUtilities.MakeRect(value));
        }
    }
    //#endregion

    //#region [Property] RoundedCornerSpots
    public get RoundedCornerSpots(): Spot {
        return this.getRoundedCornerSpots();
    }
    public set RoundedCornerSpots(value: Spot) {
        this.setRoundedCornerSpots(value);
    }

    protected /*virtual*/ getRoundedCornerSpots(): Spot {
        return this.myRoundedCornerSpots;
    }
    protected /*virtual*/ setRoundedCornerSpots(value: Spot) {
        const ınt32: Spot = this.myRoundedCornerSpots;
        if (ınt32 !== value) {
            this.myRoundedCornerSpots = value;
            this.resetPath();
            this.Changed(TuRoundedRectangleEvents.ChangedRoundedCornerSpots, 0, ınt32, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    constructor() {
        super();
    }


    public /*override*/ ChangeValue(e: TuChangedEventArgs, undo: boolean): void {
        const subHint = e.SubHint;
        if (subHint === TuRoundedRectangleEvents.ChangedCorner) {
            this.Corner = e.getSize(undo);
            return;
        }
        if (subHint === TuRoundedRectangleEvents.ChangedRoundedCornerSpots) {
            this.RoundedCornerSpots = e.getValue(undo);
            return;
        }
        super.ChangeValue(e, undo);
    }

    public /*override*/ makePath(): GraphicsPath {
        const graphicsPath: GraphicsPath = new GraphicsPath(FillMode.Winding);
        TuRoundedRectangle.MakeRoundedRectangularPath(graphicsPath, this.Bounds, this.Corner, this.RoundedCornerSpots);
        return graphicsPath;
    }
    public /*internal*/ static MakeRoundedRectangularPath(path: GraphicsPath, offx: float, offy: float, rect: CGRectangle, corner: CGSize): void;
    public /*internal*/ static MakeRoundedRectangularPath(path: GraphicsPath, rect: CGRectangle, corner: CGSize, spots: Spot): void;
    public /*internal*/ static MakeRoundedRectangularPath(...args: any[]): void {
        if (args.length === 5) {
            TuRoundedRectangle.MakeRoundedRectangularPath(args[0], new CGRectangle(args[3].X + args[1], args[3].Y + args[2], args[3].Width, args[3].Height), args[4], new Spot(-1, -1, 30));
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

    public /*override*/ Paint(g: Graphics, view: TuView) {
        super.paintPath(g, view, this.getPath());
    }
}
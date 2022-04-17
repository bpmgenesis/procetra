import { TuImage } from './../TuImage/TuImage';
import { Brushes_White, Pens_Black } from './../Globals';
import { float, ClassInfo, as } from '@tuval/core';
import { CGRectangle, CGSize, CGColor } from '@tuval/cg';
import { TuGroup } from '../TuGroup/TuGroup';
import { TuGrid } from '../TuGrid/TuGrid';
import { Spot, Middle } from '../Spot';
import { TuSheetEvents } from './TuSheetEvents';
import { Brushes_Black, NullRect } from '../Globals';
import { GeomUtilities } from '../GeomUtilities';
import { TuChangedEventArgs } from '../TuChangedEventArgs';
import { TuCopyDictionary } from '../TuCopyDictionary';
import { Types } from '../types';
import { DashStyle, Brush } from '@tuval/graphics';
import { TuViewGridStyle } from '../TuGrid/TuViewGridStyle';
import { TuView } from '../TuView/TuView';
import { TuRectangle } from '../TuRectangle/TuRectangle';
import { TuObject } from '../TuObject/TuObject';
import { State } from '@tuval/forms';

type PaperSize = any;
type Margins = any;
type PageSettings = any;
@ClassInfo({
    fullName: Types.TuSheet,
    instanceof: [
        Types.TuSheet
    ]
})
export class TuSheet extends TuGroup {
    /*internal*/ static readonly DefaultMarginColor: CGColor;
    @State()
    private myPaper: TuRectangle;

    @State()
    private myBackgroundImage: TuImage;

    @State()
    private myGrid: TuGrid;

    @State()
    private myLeftRect: TuRectangle;

    @State()
    private myRightRect: TuRectangle;

    @State()
    private myTopRect: TuRectangle;

    @State()
    private myBottomRect: TuRectangle;

    @State(() => new CGSize(50, 50))
    private myTopLeftMargin: CGSize;

    @State(() => new CGSize(50, 50))
    private myBottomRightMargin: CGSize;

    @State(() => Middle)
    private myBackgroundImageSpot: Spot;

    @State(() => true)
    private myShowsMargins: boolean;

    @State(() => TuSheet.DefaultMarginColor)
    private myMarginColor: CGColor;

    //#region [Property] BackgroundImage
    public get BackgroundImage(): TuImage {
        return this.getBackgroundImage();
    }
    public set BackgroundImage(value: TuImage) {
        this.setBackgroundImage(value);
    }

    protected /*virtual*/ getBackgroundImage(): TuImage {
        return this.myBackgroundImage;
    }
    protected /*virtual*/ setBackgroundImage(value: TuImage) {
        const goImage: TuImage = this.myBackgroundImage;
        if (goImage != value) {
            if (goImage != null) {
                this.Remove(goImage);
            }
            this.myBackgroundImage = value;
            if (value != null) {
                if (this.Paper == null) {
                    this.insertBefore(null, value);
                }
                else {
                    this.insertAfter(this.Paper, value);
                }
            }
            this.Changed(TuSheetEvents.ChangedBackgroundImage, 0, goImage, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] BackgroundImageSpot
    public get BackgroundImageSpot(): Spot {
        return this.getBackgroundImageSpot();
    }
    public set BackgroundImageSpot(value: Spot) {
        this.setBackgroundImageSpot(value);
    }

    protected /*virtual*/ getBackgroundImageSpot(): Spot {
        return this.myBackgroundImageSpot;
    }
    protected /*virtual*/ setBackgroundImageSpot(value: Spot) {
        const int32: Spot = this.myBackgroundImageSpot;
        if (!int32.equals(value)) {
            this.myBackgroundImageSpot = value;
            this.Changed(TuSheetEvents.ChangedBackgroundImageSpot, 0, value, NullRect, 0, value, NullRect);
            if (!this.Initializing) {
                this.layoutChildren(undefined);
            }
        }
    }
    //#endregion

    //#region [Property] BottomRightMargin
    public get BottomRightMargin(): CGSize {
        return this.getBottomRightMargin();
    }
    public set BottomRightMargin(value: CGSize) {
        this.setBottomRightMargin(value);
    }

    protected /*virtual*/ getBottomRightMargin(): CGSize {
        return this.myBottomRightMargin;
    }
    protected /*virtual*/ setBottomRightMargin(value: CGSize) {
        const sizeF: CGSize = this.myBottomRightMargin;
        if (!sizeF.Equals(value) && value.Width >= 0 && value.Height >= 0) {
            this.myBottomRightMargin = value;
            this.Changed(TuSheetEvents.ChangedBottomRightMargin, 0, undefined, GeomUtilities.MakeRect(sizeF), 0, undefined, GeomUtilities.MakeRect(value));
            if (!this.Initializing) {
                this.layoutChildren(null);
            }
        }
    }
    //#endregion

    //#region [Property] Grid
    public get Grid(): TuGrid {
        return this.getGrid();
    }
    public set Grid(value: TuGrid) {
        this.setGrid(value);
    }

    protected /*virtual*/ getGrid(): TuGrid {
        return this.myGrid;
    }
    protected /*virtual*/ setGrid(value: TuGrid) {
        const goGrid: TuGrid = this.myGrid;
        if (goGrid !== value) {
            if (goGrid != null) {
                this.Remove(goGrid);
            }
            this.myGrid = value;
            if (value != null) {
                let backgroundImage: TuObject = this.BackgroundImage;
                if (backgroundImage == null) {
                    backgroundImage = this.Paper;
                }
                if (backgroundImage == null) {
                    this.insertBefore(undefined, value);
                }
                else {
                    this.insertAfter(backgroundImage, value);
                }
            }
            this.Changed(TuSheetEvents.ChangedGrid, 0, goGrid, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] Grid
    public get MarginBounds(): CGRectangle {
        return this.getMarginBounds();
    }

    protected /*virtual*/ getMarginBounds(): CGRectangle {
        let paper: TuObject = this.Paper;
        if (paper == null) {
            paper = this;
        }
        const topLeftMargin: CGSize = this.TopLeftMargin;
        const bottomRightMargin: CGSize = this.BottomRightMargin;
        if (topLeftMargin.Width + bottomRightMargin.Width > paper.Width) {
            topLeftMargin.Width = paper.Width / 2;
            bottomRightMargin.Width = paper.Width / 2;
        }
        if (topLeftMargin.Height + bottomRightMargin.Height > paper.Height) {
            topLeftMargin.Height = paper.Height / 2;
            bottomRightMargin.Height = paper.Height / 2;
        }
        return new CGRectangle(paper.Left + Math.min(topLeftMargin.Width, paper.Width / 2), paper.Top + Math.min(topLeftMargin.Height, paper.Height / 2),
            Math.max(0, paper.Width - topLeftMargin.Width - bottomRightMargin.Width), Math.max(0, paper.Height - topLeftMargin.Height - bottomRightMargin.Height));
    }

    //#endregion


    //#region [Property] MarginColor
    public get MarginColor(): CGColor {
        return this.getMarginColor();
    }
    public set MarginColor(value: CGColor) {
        this.setMarginColor(value);
    }

    protected /*virtual*/ getMarginColor(): CGColor {
        return this.myMarginColor;
    }
    protected /*virtual*/ setMarginColor(value: CGColor) {
        const color: CGColor = this.myMarginColor;
        if (!color.Equals(value)) {
            this.myMarginColor = value;
            this.Changed(TuSheetEvents.ChangedMarginColor, 0, color, NullRect, 0, value, NullRect);
            if (!this.Initializing) {
                if (this.myLeftRect != null) {
                    this.myLeftRect.BrushColor = this.myMarginColor;
                }
                if (this.myRightRect != null) {
                    this.myRightRect.BrushColor = this.myMarginColor;
                }
                if (this.myTopRect != null) {
                    this.myTopRect.BrushColor = this.myMarginColor;
                }
                if (this.myBottomRect != null) {
                    this.myBottomRect.BrushColor = this.myMarginColor;
                }
            }
        }
    }
    //#endregion

    //#region [Property] Paper
    public get Paper(): TuRectangle {
        return this.getPaper();
    }
    public set Paper(value: TuRectangle) {
        this.setPaper(value);
    }

    protected /*virtual*/ getPaper(): TuRectangle {
        return this.myPaper;
    }
    protected /*virtual*/ setPaper(value: TuRectangle) {
        const goRectangle: TuRectangle = this.myPaper;
        if (goRectangle != value) {
            if (goRectangle != null) {
                this.Remove(goRectangle);
            }
            this.myPaper = value;
            if (value != null) {
                this.insertBefore(null, value);
            }
            this.Changed(TuSheetEvents.ChangedPaper, 0, goRectangle, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] ShowsMargins
    public get ShowsMargins(): boolean {
        return this.getShowsMargins();
    }
    public set ShowsMargins(value: boolean) {
        this.setShowsMargins(value);
    }

    protected /*virtual*/ getShowsMargins(): boolean {
        return this.myShowsMargins;
    }
    protected /*virtual*/ setShowsMargins(value: boolean) {
        const flag: boolean = this.myShowsMargins;
        if (flag != value) {
            this.myShowsMargins = value;
            this.Changed(TuSheetEvents.ChangedShowsMargins, 0, flag, NullRect, 0, value, NullRect);
            if (!this.Initializing) {
                if (this.myLeftRect != null) {
                    this.myLeftRect.Visible = value;
                    this.myLeftRect.Printable = value;
                }
                if (this.myRightRect != null) {
                    this.myRightRect.Visible = value;
                    this.myRightRect.Printable = value;
                }
                if (this.myTopRect != null) {
                    this.myTopRect.Visible = value;
                    this.myTopRect.Printable = value;
                }
                if (this.myBottomRect != null) {
                    this.myBottomRect.Visible = value;
                    this.myBottomRect.Printable = value;
                }
            }
        }
    }
    //#endregion

    //#region [Property] TopLeftMargin
    public get TopLeftMargin(): CGSize {
        return this.getTopLeftMargin();
    }
    public set TopLeftMargin(value: CGSize) {
        this.setTopLeftMargin(value);
    }

    protected /*virtual*/ getTopLeftMargin(): CGSize {
        return this.myTopLeftMargin;
    }
    protected /*virtual*/ setTopLeftMargin(value: CGSize) {
        const sizeF: CGSize = this.myTopLeftMargin;
        if (sizeF != value && value.Width >= 0 && value.Height >= 0) {
            this.myTopLeftMargin = value;
            this.Changed(TuSheetEvents.ChangedShowsMargins, 0, undefined, GeomUtilities.MakeRect(sizeF), 0, undefined, GeomUtilities.MakeRect(value));
            if (!this.Initializing) {
                this.layoutChildren(undefined);
            }
        }
    }
    //#endregion

    public constructor() {
        super();
        this.Initializing = true;
        this.myPaper = this.createPaper();
        this.Add(this.myPaper);
        this.myBackgroundImage = this.createBackgroundImage();
        this.Add(this.myBackgroundImage);
        this.myGrid = this.createGrid();
        this.Add(this.myGrid);
        this.myLeftRect = this.makeBoundary();
        this.Add(this.myLeftRect);
        this.myRightRect = this.makeBoundary();
        this.Add(this.myRightRect);
        this.myTopRect = this.makeBoundary();
        this.Add(this.myTopRect);
        this.myBottomRect = this.makeBoundary();
        this.Add(this.myBottomRect);
        this.Initializing = false;
        this.layoutChildren(undefined);
    }

    public /*override*/ ChangeValue(e: TuChangedEventArgs, undo: boolean): void {
        switch (e.SubHint) {
            case TuSheetEvents.ChangedTopLeftMargin:
                {
                    this.TopLeftMargin = e.getSize(undo);
                    return;
                }
            case TuSheetEvents.ChangedBottomRightMargin:
                {
                    this.BottomRightMargin = e.getSize(undo);
                    return;
                }
            case TuSheetEvents.ChangedBackgroundImageSpot:
                {
                    this.BackgroundImageSpot = e.getValue(undo);
                    return;
                }
            case TuSheetEvents.ChangedShowsMargins:
                {
                    this.ShowsMargins = e.getValue(undo);
                    return;
                }
            case TuSheetEvents.ChangedMarginColor:
                {
                    this.MarginColor = e.getValue(undo);
                    return;
                }
            case TuSheetEvents.ChangedPaper:
                {
                    this.Paper = e.getValue(undo);
                    return;
                }
            case TuSheetEvents.ChangedBackgroundImage:
                {
                    this.BackgroundImage = e.getValue(undo);
                    return;
                }
            case TuSheetEvents.ChangedGrid:
                {
                    this.Grid = e.getValue(undo);
                    return;
                }
            default:
                {
                    super.ChangeValue(e, undo);
                    return;
                }
        }
    }

    protected /*override*/ copyChildren(newgroup: TuGroup, env: TuCopyDictionary): void {
        super.copyChildren(newgroup, env);
        const item: TuSheet = as(newgroup, Types.TuSheet);
        item.myPaper = env.Get(this.myPaper);
        item.myBackgroundImage = env.Get(this.myBackgroundImage);
        item.myGrid = env.Get(this.myGrid);
        item.myLeftRect = env.Get(this.myLeftRect);
        item.myRightRect = env.Get(this.myRightRect);
        item.myTopRect = env.Get(this.myTopRect);
        item.myBottomRect = env.Get(this.myBottomRect);
    }

    protected /*virtual*/  createBackgroundImage(): TuImage {
        return undefined;
    }

    protected /*virtual*/ createGrid(): TuGrid {
        const grid = new TuGrid();

        grid.Selectable = false
        grid.CellSize = new CGSize(25, 25),
            grid.OriginRelative = false;
        grid.LineDashStyle = DashStyle.Custom;
        grid.MajorLineColor = CGColor.LightGray;
        grid.MajorLineFrequency = new CGSize(4, 4);
        grid.Style = TuViewGridStyle.None;
        return grid;

    }

    protected /*virtual*/ createPaper(): TuRectangle {
        const grid = new TuGrid();

        grid.Selectable = false;
        grid.UnboundedSpots = Spot.None;
        grid.Brush = Brushes_White;
        grid.Pen = Pens_Black;
        grid.Shadowed = true;
        grid.Style = TuViewGridStyle.None;

        return grid;

    }

    public /*override*/ ExpandPaintBounds(rect: CGRectangle, view: TuView): CGRectangle {
        super.invalidatePaintBounds();
        return super.ExpandPaintBounds(rect, view);
    }

    public /*override*/ findChild(name: string): TuObject {
        if (name === "Paper") {
            return this.Paper;
        }
        if (name === "BackgroundImage") {
            return this.BackgroundImage;
        }
        if (name === "Grid") {
            return this.Grid;
        }
        return super.findChild(name);
    }

    public /*override*/ findName(child: TuObject): string {
        if (child === this.Paper) {
            return "Paper";
        }
        if (child === this.BackgroundImage) {
            return "BackgroundImage";
        }
        if (child === this.Grid) {
            return "Grid";
        }
        return super.findName(child);
    }

    public /*override*/ GetShadowBrush(view: TuView): Brush {
        return Brushes_Black;
    }

    public /*override*/ layoutChildren(childchanged: TuObject): void {
        if (this.Initializing) {
            return;
        }
        super.layoutChildren(childchanged);
        const topLeftMargin: CGSize = this.TopLeftMargin;
        const bottomRightMargin: CGSize = this.BottomRightMargin;
        const marginBounds: CGRectangle = this.MarginBounds;
        if (this.BackgroundImage != null) {
            this.BackgroundImage.setSpotLocation(this.BackgroundImageSpot, this.GetRectangleSpotLocation(marginBounds, this.BackgroundImageSpot));
        }
        let paper: TuObject = this.Paper;
        if (paper == null) {
            paper = this;
        }
        if (this.Grid != null) {
            this.Grid.Bounds = paper.Bounds;
        }
        if (topLeftMargin.Width + bottomRightMargin.Width > paper.Width) {
            topLeftMargin.Width = paper.Width / 2;
            bottomRightMargin.Width = paper.Width / 2;
        }
        if (topLeftMargin.Height + bottomRightMargin.Height > paper.Height) {
            topLeftMargin.Height = paper.Height / 2;
            bottomRightMargin.Height = paper.Height / 2;
        }
        if (this.myLeftRect != null) {
            this.myLeftRect.Bounds = new CGRectangle(marginBounds.X - topLeftMargin.Width, marginBounds.Y, topLeftMargin.Width, marginBounds.Height);
        }
        if (this.myRightRect != null) {
            this.myRightRect.Bounds = new CGRectangle(marginBounds.X + marginBounds.Width, marginBounds.Y, bottomRightMargin.Width, marginBounds.Height);
        }
        if (this.myTopRect != null) {
            this.myTopRect.Bounds = new CGRectangle(marginBounds.X - topLeftMargin.Width, marginBounds.Y - topLeftMargin.Height, marginBounds.Width + topLeftMargin.Width + bottomRightMargin.Width, topLeftMargin.Height);
        }
        if (this.myBottomRect != null) {
            this.myBottomRect.Bounds = new CGRectangle(marginBounds.X - topLeftMargin.Width, marginBounds.Y + marginBounds.Height, marginBounds.Width + topLeftMargin.Width + bottomRightMargin.Width, bottomRightMargin.Height);
        }
    }
    private makeBoundary(): TuRectangle {
        const rect: TuRectangle = new TuRectangle();
        rect.Selectable = false;
        rect.AutoRescales = false;
        rect.BrushColor = this.MarginColor;
        rect.Pen = undefined;
        return rect;
    }

    public /*override*/ Remove(obj?: TuObject): boolean {
        const flag: boolean = super.Remove(obj);
        if (obj === this.myPaper) {
            this.myPaper = null;
            return flag;
        }
        if (obj === this.myBackgroundImage) {
            this.myBackgroundImage = undefined;
            return flag;
        }
        if (obj === this.myGrid) {
            this.myGrid = undefined;
            return flag;
        }
        if (obj === this.myLeftRect) {
            this.myLeftRect = undefined;
            return flag;
        }
        if (obj === this.myRightRect) {
            this.myRightRect = undefined;
            return flag;
        }
        if (obj === this.myTopRect) {
            this.myTopRect = undefined;
            return flag;
        }
        if (obj === this.myBottomRect) {
            this.myBottomRect = undefined;
        }
        return flag;
    }

    public /*virtual*/ updateBounds(ps: PageSettings, viewscale: float): void {
        const paperSize: PaperSize = ps.PaperSize;
        const width: float = paperSize.Width / viewscale;
        const height: float = paperSize.Height / viewscale;
        const margins: Margins = ps.Margins;
        const left: float = margins.Left / viewscale;
        const top: float = margins.Top / viewscale;
        const right: float = margins.Right / viewscale;
        const bottom: float = margins.Bottom / viewscale;
        const rectangleF: CGRectangle = (ps.Landscape ? new CGRectangle(0, 0, height, width) : new CGRectangle(0, 0, width, height));
        if (this.Paper == null) {
            this.Bounds = rectangleF;
        }
        else {
            this.Paper.Bounds = rectangleF;
        }
        this.TopLeftMargin = new CGSize(left, top);
        this.BottomRightMargin = new CGSize(right, bottom);
    }
}

(function () {
    (<any>TuSheet).DefaultMarginColor = CGColor.FromRgba(CGColor.LightGray.R, CGColor.LightGray.G, CGColor.LightGray.B, 64);
})();
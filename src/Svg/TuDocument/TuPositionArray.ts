import { CGRectangle, CGSize, CGPoint } from '@tuval/cg';

const UNOCCUPIED = 2147483647;
const MAX = 2147483644;
const STEP = 4;
const OCCUPIED = 0;
const SHIFT = 2;
const MASK = 3;
const RIGHT = 0;
const DOWN = 90;
const LEFT = 180;
const UP = 270;
export class TuPositionArray {

    public static readonly VERT = 1;
    public static readonly HORIZ = 2;
    private static readonly START = 4;
    public static readonly StartDistance = 1;
    public static readonly StepDistance = 1;
    public static readonly MaxDistance = 536870911;
    private myInvalid = true;
    private myAbort: boolean;
    private myMinX = 1;
    private myMinY = 1;
    private myMaxX = -1;
    private myMaxY = -1;
    private myCellX = 8;
    private myCellY = 8;
    private myArray: number[][];
    private myUpperBoundX: number;
    private myUpperBoundY: number;
    private myWholeDocument: boolean;
    private mySmallMargin = 22;
    private myLargeMargin = 111;

    public get Abort(): boolean {
        return this.myAbort;
    }
    public set Abort(value: boolean) {
        this.myAbort = value;
    }

    public get Bounds(): CGRectangle {
        return new CGRectangle({ x: this.myMinX, y: this.myMinY, width: this.myMaxX - this.myMinX, height: this.myMaxY - this.myMinY });
    }

    public get CellSize(): CGSize {
        return new CGSize({ width: this.myCellX, height: this.myCellY });
    }

    public set CellSize(value: CGSize) {
        if (value.Width > 0 && value.Height > 0 && (value.Width !== this.myCellX || value.Height !== this.myCellY)) {
            this.myCellX = value.Width;
            this.myCellY = value.Height;
            this.initialize(new CGRectangle({ x: this.myMinX, y: this.myMinY, width: this.myMaxX - this.myMinX, height: this.myMaxY - this.myMinY }));
        }
    }

    public get Invalid(): boolean {
        return this.myInvalid;
    }
    public set Invalid(value: boolean) {
        this.myInvalid = value;
    }
    public get LargeMargin(): number {
        return this.myLargeMargin;
    }

    public set LargeMargin(value: number) {
        this.myLargeMargin = value;
    }

    public get SmallMargin(): number {
        return this.mySmallMargin;
    }

    public set SmallMargin(value: number) {
        this.mySmallMargin = value;
    }

    public get WholeDocument(): boolean {
        return this.myWholeDocument;
    }

    public set WholeDocument(value: boolean) {
        this.myWholeDocument = value;
    }

    private breakIn(x1: number, y1: number, x2: number, y2: number, inc: number, vert: boolean, lowx: number, hix: number, lowy: number, hiy: number) {
        let int32 = x2;
        let int321 = y2;
        let int322 = this.myArray[int32][int321];
        while (this.isBarrier(int322) && int32 > lowx && int32 < hix && int321 > lowy && int321 < hiy) {
            if (!vert) {
                int32 = int32 + inc;
            }
            else {
                int321 = int321 + inc;
            }
            int322 = this.myArray[int32][int321];
            if (Math.abs((int32 - x1)) > 1 || Math.abs((int321 - y1)) > 1) {
                continue;
            }
            this.Abort = true;
            return;
        }
        int32 = x2;
        int321 = y2;
        int322 = this.myArray[int32][int321];
        this.myArray[int32][int321] = UNOCCUPIED;
        while (this.isBarrier(int322) && int32 > lowx && int32 < hix && int321 > lowy && int321 < hiy) {
            if (!vert) {
                int32 = int32 + inc;
            }
            else {
                int321 = int321 + inc;
            }
            int322 = this.myArray[int32][int321];
            this.myArray[int32][int321] = UNOCCUPIED;
        }
    }

    private breakOut(x1: number, y1: number, x2: number, y2: number, inc: number, vert: boolean, lowx: number, hix: number, lowy: number, hiy: number): number {
        let int32 = x1;
        let int321 = y1;
        let int322 = this.myArray[int32][int321];
        while (this.isBarrier(int322) && int32 > lowx && int32 < hix && int321 > lowy && int321 < hiy) {
            if (!vert) {
                int32 = int32 + inc;
            }
            else {
                int321 = int321 + inc;
            }
            int322 = this.myArray[int32][int321];
            if (Math.abs((int32 - x2)) > 1 || Math.abs((int321 - y2)) > 1) {
                continue;
            }
            this.Abort = true;
            return OCCUPIED;
        }
        int32 = x1;
        int321 = y1;
        int322 = this.myArray[int32][int321];
        let int323 = 7;
        this.myArray[int32][int321] = int323;
        while (this.isBarrier(int322) && int32 > lowx && int32 < hix && int321 > lowy && int321 < hiy) {
            if (!vert) {
                int32 = int32 + inc;
            }
            else {
                int321 = int321 + inc;
            }
            int322 = this.myArray[int32][int321];
            this.myArray[int32][int321] = int323;
            int323 = int323 + STEP;
        }
        if (vert) {
            return int321;
        }
        return int32;
    }

    public clearAllUnoccupied() {
        if (this.myArray == null) {
            return;
        }
        for (let i = 0; i <= this.myUpperBoundX; i++) {
            for (let j = 0; j <= this.myUpperBoundY; j++) {
                if (this.myArray[i][j] >= STEP) {
                    this.myArray[i][j] = this.myArray[i][j] | MAX;
                }
            }
        }
    }

    public getDist(x: number, y: number): number {
        if (!this.inBounds(x, y)) {
            return OCCUPIED;
        }
        x = x - this.myMinX;
        x = x / this.myCellX;
        y = y - this.myMinY;
        y = y / this.myCellY;
        const int32 = x;
        const int321 = y;
        return this.myArray[int32][int321] >> SHIFT;
    }

    private inBounds(x: number, y: number): boolean {
        if (this.myMinX > x || x > this.myMaxX || this.myMinY > y) {
            return false;
        }
        return y <= this.myMaxY;
    }

    public initialize(rect: CGRectangle) {
        if (rect.Width <= 0 || rect.Height <= 0) {
            return;
        }
        const x = rect.X;
        const y = rect.Y;
        const single = rect.X + rect.Width;
        const y1 = rect.Y + rect.Height;
        this.myMinX = Math.floor(((x - this.myCellX) / this.myCellX)) * this.myCellX;
        this.myMinY = Math.floor(((y - this.myCellY) / this.myCellY)) * this.myCellY;
        this.myMaxX = Math.ceil(((single + 2 * this.myCellX) / this.myCellX)) * this.myCellX;
        this.myMaxY = Math.ceil(((y1 + 2 * this.myCellY) / this.myCellY)) * this.myCellY;
        const int32 = 1 + Math.ceil(((this.myMaxX - this.myMinX) / this.myCellX));
        const int321 = 1 + Math.ceil(((this.myMaxY - this.myMinY) / this.myCellY));
        if (this.myArray == null || this.myUpperBoundX < (int32 - 1) || this.myUpperBoundY < (int321 - 1)) {
            this.myArray = [];
            for (let i = 0; i < int32; i++) {
                this.myArray[i] = [];
            }
            this.myUpperBoundX = int32 - 1;
            this.myUpperBoundY = int321 - 1;
        }
        this.setAll(UNOCCUPIED);
    }

    private isBarrier(v: number): boolean {
        return (v & MASK) === 0;
    }

    public isOccupied(x: number, y: number): boolean {
        return this.getDist(x, y) === 0;
    }

    public isUnoccupied(x: number, y: number, w: number, h: number): boolean {
        if (x > this.myMaxX) {
            return true;
        }
        if (x + w < this.myMinX) {
            return true;
        }
        if (y > this.myMaxY) {
            return true;
        }
        if (y + h < this.myMinY) {
            return true;
        }
        let int32 = ((x - this.myMinX) / this.myCellX);
        let int321 = ((y - this.myMinY) / this.myCellY);
        let int322 = ((Math.max(0, w) / this.myCellX)) + 1;
        let int323 = ((Math.max(0, h) / this.myCellY)) + 1;
        if (int32 < 0) {
            int322 = (int322 + int32);
            int32 = 0;
        }
        if (int321 < 0) {
            int323 = (int323 + int321);
            int321 = 0;
        }
        if (int322 < 0) {
            return true;
        }
        if (int323 < 0) {
            return true;
        }
        const int324 = Math.min(((int32 + int322) - 1), this.myUpperBoundX);
        const int325 = Math.min(((int321 + int323) - 1), this.myUpperBoundY);
        for (let i = int32; i <= int324; i++) {
            for (let j = int321; j <= int325; j++) {
                if (this.myArray[i][j] === 0) {
                    return false;
                }
            }
        }
        return true;
    }

    public propagate(p1: CGPoint, fromDir: number, p2: CGPoint, toDir: number, bounds: CGRectangle) {
        if (this.myArray == null) {
            return;
        }
        this.Abort = false;
        let x = p1.X;
        let y = p1.Y;
        if (!this.inBounds(x, y)) {
            return;
        }
        x = x - this.myMinX;
        x = x / this.myCellX;
        y = y - this.myMinY;
        y = y / this.myCellY;
        let single = p2.X;
        let y1 = p2.Y;
        if (!this.inBounds(single, y1)) {
            return;
        }
        single = single - this.myMinX;
        single = single / this.myCellX;
        y1 = y1 - this.myMinY;
        y1 = y1 / this.myCellY;
        if (Math.abs(x - single) <= 1 && Math.abs(y - y1) <= 1) {
            this.Abort = true;
            return;
        }
        let x1 = bounds.X;
        let single1 = bounds.Y;
        let x2 = bounds.X + bounds.Width;
        let y2 = bounds.Y + bounds.Height;
        x1 = (x1 - this.myMinX) / this.myCellX;
        single1 = (single1 - this.myMinY) / this.myCellY;
        x2 = (x2 - this.myMinX) / this.myCellX;
        y2 = (y2 - this.myMinY) / this.myCellY;
        const int32 = Math.max(0, Math.min(this.myUpperBoundX, x1));
        const int321 = Math.min(this.myUpperBoundX, Math.max(0, x2));
        const int322 = Math.max(0, Math.min(this.myUpperBoundY, single1));
        const int323 = Math.min(this.myUpperBoundY, Math.max(0, y2));
        const int324 = x;
        const int325 = y;
        const int326 = single;
        const int327 = y1;
        let int328 = int324;
        let int329 = int325;
        const int3210 = (fromDir === RIGHT || fromDir === DOWN ? 1 : -1);
        const flag: boolean = (fromDir === DOWN ? true : fromDir === UP);
        if (!flag) {
            int328 = this.breakOut(int324, int325, int326, int327, int3210, flag, int32, int321, int322, int323);
        }
        else {
            int329 = this.breakOut(int324, int325, int326, int327, int3210, flag, int32, int321, int322, int323);
        }
        if (this.Abort) {
            return;
        }
        this.breakIn(int324, int325, int326, int327, (toDir === RIGHT || toDir === DOWN ? 1 : -1), (toDir === DOWN ? true : toDir === UP), int32, int321, int322, int323);
        if (this.Abort) {
            return;
        }
        this.spread(int328, int329, 1, false, int32, int321, int322, int323);
        this.spread(int328, int329, -1, false, int32, int321, int322, int323);
        this.spread(int328, int329, 1, true, int32, int321, int322, int323);
        this.spread(int328, int329, -1, true, int32, int321, int322, int323);
    }

    private ray(x: number, y: number, inc: number, vert: boolean, lowx: number, hix: number, lowy: number, hiy: number): number {
        let int32 = this.myArray[x][y] & -4;
        if (int32 >= 4 && int32 < MAX) {
            if (!vert) {
                x = (x + inc);
            }
            else {
                y = (y + inc);
            }
            int32 = (int32 + 4);
            while (lowx <= x && x <= hix && lowy <= y && y <= hiy) {
                const int321 = this.myArray[x][y];
                if (int32 >= (int321 & -4)) {
                    break;
                }
                this.myArray[x][y] = int32 | int321 & 3;
                int32 = (int32 + 4);
                if (!vert) {
                    x = (x + inc);
                }
                else {
                    y = (y + inc);
                }
            }
        }
        if (vert) {
            return y;
        }
        return x;
    }

    public setAll(v: number) {
        if (this.myArray == null) {
            return;
        }
        for (let i = 0; i <= this.myUpperBoundX; i++) {
            for (let j = 0; j <= this.myUpperBoundY; j++) {
                this.myArray[i][j] = v;
            }
        }
    }

    public setOccupied(x: number, y: number) {
        if (!this.inBounds(x, y)) {
            return;
        }
        x = x - this.myMinX;
        x = x / this.myCellX;
        y = y - this.myMinY;
        y = y / this.myCellY;
        const int32 = x;
        const int321 = y;
        this.myArray[int32][int321] = 0;
    }

    private spread(x: number, y: number, inc: number, vert: boolean, lowx: number, hix: number, lowy: number, hiy: number) {
        if (x < lowx || x > hix || y < lowy || y > hiy) {
            return;
        }
        const int32 = this.ray(x, y, inc, vert, lowx, hix, lowy, hiy);
        if (vert) {
            if (inc > 0) {
                for (let i = (y + inc); i < int32; i = (i + inc)) {
                    this.spread(x, i, 1, !vert, lowx, hix, lowy, hiy);
                    this.spread(x, i, -1, !vert, lowx, hix, lowy, hiy);
                }
                return;
            }
            for (let j = (y + inc); j > int32; j = (j + inc)) {
                this.spread(x, j, 1, !vert, lowx, hix, lowy, hiy);
                this.spread(x, j, -1, !vert, lowx, hix, lowy, hiy);
            }
            return;
        }
        if (inc > 0) {
            for (let k = (x + inc); k < int32; k = (k + inc)) {
                this.spread(k, y, 1, !vert, lowx, hix, lowy, hiy);
                this.spread(k, y, -1, !vert, lowx, hix, lowy, hiy);
            }
            return;
        }
        for (let l = (x + inc); l > int32; l = (l + inc)) {
            this.spread(l, y, 1, !vert, lowx, hix, lowy, hiy);
            this.spread(l, y, -1, !vert, lowx, hix, lowy, hiy);
        }
    }

}
import { int, TString } from '@tuval/core';
export class Line {
    public X: int;
    public Y: int;
    public constructor(x: int, y: int) {
        this.X = x;
        this.Y = y;
    }
    public ToString(): string {
        return TString.Format('L{0} {1}', this.X, this.Y);
    }
}
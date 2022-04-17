/* import { Control, Property, Teact } from '@tuval/forms';
import { int, is } from '@tuval/core';
import { TuShape } from './TuShape';
export class TuRectangle extends TuShape {
    @Property()
    public Rx: int;

    @Property()
    public Ry: int;

    protected SetupControlDefaults(): void {
        super.SetupControlDefaults();
        this.Rx = 0;
        this.Ry = 0;
    }
    protected DrawPath() {
        return (
            <rect
                x={this.Left}
                y={this.Top}
                rx={this.Rx}
                ry={this.Ry}
                width={this.Width}
                height={this.Height}
                stroke={this.Stroke}
                stroke-width={this.StrokeWidth}
                fill={this.Fill}
                filter={is.nullOrEmpty(this.Filter) ? null : `url(#${this.Filter})`}
                onclick={(e) => this.OnClick(e)}
                onmousedown={(e) => this.OnMouseDown(e)}
                onmousemove={(e) => this.OnMouseMove(e)}
                transform={this.matrix.transformString}>
            </rect>
        );
    }
} */
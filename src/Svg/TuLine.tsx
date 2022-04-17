/* import { Control, Property, Teact } from '@tuval/forms';
import { int, is } from '@tuval/core';
import { TuShape } from './TuShape';
import { TProperty, ValueOf } from './types';

export class TuLine extends TuShape {

    @Property()
    public X1: TProperty<int>;

    @Property()
    public Y1: TProperty<int>;

    @Property()
    public X2: TProperty<int>;

    @Property()
    public Y2: TProperty<int>;

    protected DrawPath() {
        return (
            <line
                x1={ValueOf(this.X1)}
                y1={ValueOf(this.Y1)}
                x2={ValueOf(this.X2)}
                y2={ValueOf(this.Y2)}
                fill={this.Fill}
                stroke={this.Stroke}
                stroke-width={this.StrokeWidth}
                filter={is.nullOrEmpty(this.Filter) ? null : `url(#${this.Filter})`}
                onclick={(e) => this.OnClick(e)}
                onmousedown={(e) => this.OnMouseDown(e)}
                onmousemove={(e) => this.OnMouseMove(e)}
                transform={this.matrix.transformString}>
            </line>
        );
    }
} */
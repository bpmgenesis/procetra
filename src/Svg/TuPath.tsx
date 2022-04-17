/* import { Control, Property, Teact } from '@tuval/forms';
import { int, is } from '@tuval/core';
import { TuShape } from './TuShape';
import { CGRectangle } from '@tuval/cg';
import { GetPathBoundingBox } from './SvgMesurements';

export class TuPath extends TuShape {

    @Property()
    public GetPathCallback: Function;

    protected override Get_Bounds(): CGRectangle {
        return GetPathBoundingBox(this.GetPathCallback());
    }

    protected override Set_Bounds(value: CGRectangle): void {
        throw 'You can not set bounds directly for TuPath';
    }
    protected DrawPath() {
        return (
            <path
                d={this.GetPathCallback()}
                fill={this.Fill}
                stroke={this.Stroke}
                stroke-width={this.StrokeWidth}
                filter={is.nullOrEmpty(this.Filter) ? null : `url(#${this.Filter})`}
                onclick={(e) => this.OnClick(e)}
                onmousedown={(e) => this.OnMouseDown(e)}
                onmousemove={(e) => this.OnMouseMove(e)}
                transform={this.matrix.transformString}>
            </path>
        );
    }
} */
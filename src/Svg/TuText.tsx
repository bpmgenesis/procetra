/* import { Control, Property, Teact } from '@tuval/forms';
import { int, Event, is } from '@tuval/core';
import { TuShape } from './TuShape';
import { TProperty, ValueOf } from './types';

export const NullValue = () => null; */

/* export class TuText extends TuShape {
    Ref: any;

    @Property()
    public TextBounded: Event<any>;

    @Property()
    public Label: TProperty<string>;

    @Property()
    public FontSize: TProperty<int>;

    @Property()
    public AlignmentBaseline: TProperty<string>;

    protected SetupControlDefaults(): void {
        super.SetupControlDefaults();
        this.TextBounded = new Event();
        this.Label = NullValue;
        this.FontSize = 10;
        this.AlignmentBaseline = 'middle';

    }
    protected componentDidMount(): void {
        console.log(this.Ref.getBBox())
        this.TextBounded(this.Ref.getBBox());
    }
    protected DrawPath() {
        return (
            <text
                ref={(e) => this.Ref = e}
                x={this.Left}
                y={this.Top}
                font-size={ValueOf(this.FontSize) + 'px'}
                alignment-baseline={ValueOf(this.AlignmentBaseline)}
                onclick={(e) => this.OnClick(e)}
                onmousedown={(e) => this.OnMouseDown(e)}
                onmousemove={(e) => this.OnMouseMove(e)}
                transform={this.matrix.transformString}>
                {ValueOf(this.Label)}
            </text>
        );
    }
} */
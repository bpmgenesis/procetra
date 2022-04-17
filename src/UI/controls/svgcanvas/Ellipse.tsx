import { EllipseComponent } from "../components/elements";
import { Shape } from "./Shape";
import { Control, Teact, DomHandler, React, Modes } from '@tuval/forms';

export class Ellipse extends Shape<Ellipse> {

    private m_RectElement: Ellipse;
    public get RectElement(): Ellipse {
        if (this.__Mode__ === Modes.Control && this.m_Component != null) {
            return this.m_Component.m_RectElement;
        } else {
            return this.m_RectElement;
        }
    }
    public get RElement(): any {
        if (this.RectElement != null) {
            if ((this.RectElement as any).myRef.current != null) {
                return (this.RectElement as any).myRef.current.element;
            }
        }
    }

    public SetupControlDefaults() {
        super.SetupControlDefaults();
        this.stroke = '#000';
        this.stroke_width = 1;
        this.fill = 'white';
    }

    /* public componentDidUpdate() {
        console.log('Rectangle - componentDidUpdate');
    }
 */

    public UpdateFromAnimation() {
        if (this.RElement) {
            const matAttrs = this.RElement.matrix.split();
            this.x = this.RElement.attr('cx');
            this.y = this.RElement.attr('cy');
            this.width = this.RElement.attr('rx');
            this.height = this.RElement.attr('ry');
            this.translate = { x: matAttrs.dx, y: matAttrs.dy }

        }
    }

    public CreateElements() {
        return (
            <EllipseComponent
                ref={(e) => this.m_RectElement = e}
                x={this.x}
                y={this.y}
                rx={this.width}
                ry={this.height}
                translate={this.translate}
                animate={this.Animate}
                attr={this.GetAttributeObject()}
                click={(e) => this.Click()}
                onAnimation={(e) => this.OnAnimation()}
                toBack={this.ToBack}
                toFront={this.ToFront} />
        );
    }

}
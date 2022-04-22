import { Control, Teact, DomHandler, React, Modes } from '@tuval/forms';
import { Encoding, Convert, Event, int } from '@tuval/core';
import { Shape } from './Shape';
import { Rect } from '../components/elements';


export class Rectangle extends Shape<Rectangle> {

    public SetupControlDefaults() {
        super.SetupControlDefaults();
        this.stroke = '#000';
        this.stroke_width = 1;
        this.fill = 'white';
    }



    public UpdateFromAnimation() {
        if (this.RElement) {
            const matAttrs = this.RElement.matrix.split();
            this.x = this.RElement.attr('x') + matAttrs.dx;
            console.log(this.RElement.attr('x') + matAttrs.dx);
            this.y = this.RElement.attr('y') + matAttrs.dy;
        }
    }

    public CreateElements() {
        return (
            <Rect
                ref={(e) => this.m_Element = e}
                x={this.x}
                y={this.y}
                width={this.width}
                height={this.height}
                animate={this.Animate}
                attr={this.GetAttributeObject()}
                click={(e) => this.Click()}
                onAnimation={(e) => this.OnAnimation()}
                toBack={this.ToBack}
                toFront={this.ToFront}
                />
        );
    }

}
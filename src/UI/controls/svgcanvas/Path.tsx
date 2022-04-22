import { Control, Teact, DomHandler, React, Modes } from '@tuval/forms';
import { Encoding, Convert, Event, int, float } from '@tuval/core';
import { Shape } from './Shape';
import { Rect, PathComponent } from '../components/elements';


export class Path extends Shape<Path> {
    public get d(): any[] {
        return this.GetProperty('d');
    }
    public set d(value: any[]) {
        this.SetProperty('d', value);
    }

    public get blur(): float {
        return this.GetProperty('blur');
    }
    public set blur(value: float) {
        this.SetProperty('blur', value);
    }


    public SetupControlDefaults() {
        super.SetupControlDefaults();
        this.stroke = '#000';
        this.stroke_width = 1;
        this.fill = 'white';
        this.blur = 0;
        this.d = [];
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
            <PathComponent
                ref={(e) => this.m_Element = e}
                d={this.d}
                blur={this.blur}
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
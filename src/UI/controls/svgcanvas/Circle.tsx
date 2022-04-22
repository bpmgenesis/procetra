

import { Control, Teact, DomHandler, React, Modes } from '@tuval/forms';
import { Encoding, Convert, Event, int } from '@tuval/core';
import { Shape } from './Shape';
import { CircleComponent } from '../components/elements';

export class Circle extends Shape<Circle> {

    public get r(): int {
        return this.GetProperty('r');
    }
    public set r(value: int) {
        this.SetProperty('r', value);
    }

    public SetupControlDefaults() {
        super.SetupControlDefaults();
        this.stroke = '#000';
        this.stroke_width = 1;
        this.fill = 'none';
    }

    public CreateElements() {
        return (
            <CircleComponent  /* key={pos}  */
                x={this.x}
                y={this.y}
                r={this.r}
                animate={this.Animate}
                attr={this.GetAttributeObject()}
                click={(e) => this.Click()}
                onAnimation={(e) => this.OnAnimation()}  />
        )
    }

}
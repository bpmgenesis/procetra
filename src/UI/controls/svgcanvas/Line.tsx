

import { Control, Teact, DomHandler, React, Modes } from '@tuval/forms';
import { Encoding, Convert, Event, int, is } from '@tuval/core';
import { Shape } from './Shape';
import { LineComponent } from '../components/elements';

export class Line extends Shape<Line> {
    m_LineComponent: any;
    public get LineElement(): LineComponent {
        if (this.__Mode__ === Modes.Control && this.m_Component != null) {
            return this.m_Component.m_LineComponent;
        } else {
            return this.m_LineComponent;
        }
    }
    public get RElement(): any {
        if (this.LineElement != null) {
            if ((this.LineElement as any).myRef.current != null) {
                return (this.LineElement as any).myRef.current.myRef.current.element;
            }
        }
    }

    public get x2(): int {
        return this.GetProperty('x2');
    }
    public set x2(value: int) {
        this.SetProperty('x2', value);
    }
    public get y2(): int {
        return this.GetProperty('y2');
    }
    public set y2(value: int) {
        this.SetProperty('y2', value);
    }

    public get arrow_start(): string {
        return this.GetProperty('arrow-start');
    }
    public set arrow_start(value: string) {
        this.SetProperty('arrow-start', value);
    }

    public get arrow_end(): string {
        return this.GetProperty('arrow-end');
    }
    public set arrow_end(value: string) {
        this.SetProperty('arrow-end', value);
    }

    public SetupControlDefaults() {
        super.SetupControlDefaults();
        this.stroke = '#000';
        this.stroke_width = 1;
        this.fill = 'none';
        this.arrow_start = '';
        this.arrow_end = '';
    }

    public CreateElements() {
        return (
            <LineComponent
                ref={(e) => this.m_LineComponent = e}
                x1={this.x}
                y1={this.y}
                x2={this.x2}
                y2={this.y2}
                animate={this.Animate}
                attr={this.GetAttributeObject()}
                toBack={this.ToBack}
                toFront={this.ToFront}
            />
        )
    }


    public strokeLinearGradient(name: string, width: int) {
        if (this.RElement != null) {
            this.RElement.strokeLinearGradient(name, width);
        }
    }
    public GetAttributeObject(): any {
        const attr = super.GetAttributeObject();
        if (!is.nullOrEmpty(this.arrow_start)) {
            attr['arrow-start'] = this.arrow_start;
        }
        if (!is.nullOrEmpty(this.arrow_end)) {
            attr['arrow-end'] = this.arrow_start;
        }
        return attr;
    }

}
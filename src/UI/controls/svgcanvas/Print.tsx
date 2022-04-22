import { Control, Teact, DomHandler, React, Modes } from '@tuval/forms';
import { Encoding, Convert, Event, int } from '@tuval/core';
import { Shape } from './Shape';
import { PrintComponent } from '../components/elements';


export class Print extends Shape<Print> {

    public get text(): string {
        return this.GetProperty('text');
    }
    public set text(value: string) {
        this.SetProperty('text', value);
    }

    public get font_family(): string {
        return this.GetProperty('font_family');
    }
    public set font_family(value: string) {
        this.SetProperty('font_family', value);
    }

    public get font_weight(): string {
        return this.GetProperty('font_weight');
    }
    public set font_weight(value: string) {
        this.SetProperty('font_weight', value);
    }
    public get font_style(): string {
        return this.GetProperty('font_style');
    }
    public set font_style(value: string) {
        this.SetProperty('font_style', value);
    }
    public get font_stretch(): string {
        return this.GetProperty('font_stretch');
    }
    public set font_stretch(value: string) {
        this.SetProperty('font_stretch', value);
    }
    public get font_size(): int {
        return this.GetProperty('font_size');
    }
    public set font_size(value: int) {
        this.SetProperty('font_size', value);
    }
    public get origin(): string {
        return this.GetProperty('origin');
    }
    public set origin(value: string) {
        this.SetProperty('origin', value);
    }
    public get letter_spacing(): string {
        return this.GetProperty('letter_spacing');
    }
    public set letter_spacing(value: string) {
        this.SetProperty('letter_spacing', value);
    }



    public SetupControlDefaults() {
        super.SetupControlDefaults();
        this.stroke = '#000';
        this.stroke_width = 1;
        this.fill = 'white';
        this.text = '';
        this.font_weight='normal';
        this.font_size = 12;
    }

    public CreateElements() {
        return (
            <PrintComponent
                x={this.x}
                y={this.y}
                animate={this.Animate}
                text={this.text}
                fontFamily={this.font_family}
                fontWeight={this.font_weight}
                fontStyle={this.font_style}
                fontStretch={this.font_stretch}
                fontSize={this.font_size}
                origin={this.origin}
                letterSpacing={this.letter_spacing}
            />
        );
    }

}
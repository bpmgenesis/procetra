import { Control, Teact, DomHandler, React, Modes } from '@tuval/forms';
import { Encoding, Convert, Event, int, is } from '@tuval/core';
import { Shape } from './Shape';
import { PrintComponent, TextComponent } from '../components/elements';


export class Text extends Shape<Text> {

    public get text(): string {
        return this.GetProperty('text');
    }
    public set text(value: string) {
        this.SetProperty('text', value);
    }

    public get text_anchor(): string {
        return this.GetProperty('text_anchor');
    }
    public set text_anchor(value: string) {
        this.SetProperty('text_anchor', value);
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
        this.stroke = '';
        this.stroke_width = 1;
        this.fill = '';
        this.text = '';
        this.font_weight='normal';
        this.font_size = 12;
        this.text_anchor = 'start';
    }

    public CreateElements() {
        return (
            <TextComponent
                x={this.x}
                y={this.y}
                animate={this.Animate}
                text={this.text}
                attr={this.GetAttributeObject()}
                click={(e) => this.Click()}
                mousemove = {(e) => this.MouseMove()}
                mouseout = {(e) => this.MouseOut()}
            />
        );
    }

    public override GetAttributeObject() {
        const attr = super.GetAttributeObject();
        attr['text-anchor'] = this.text_anchor;
        if (this.font_size > 0) {
            attr['font-size'] = this.font_size;
        }

        if (!is.nullOrEmpty(this.font_weight)) {
            attr['font-weight'] = this.font_weight;
        }

        if (!is.nullOrEmpty(this.cursor)) {
            attr['cursor'] = this.cursor;
        }

        if (!is.nullOrEmpty(this.fill)) {
            attr['fill'] = this.fill;
        }

        return attr;
    }

}
import { Control, Teact, DomHandler, React, Modes, ControlCollection, ContainerControl } from '@tuval/forms';
import { Encoding, Convert, Event, TString, int, classNames, foreach } from '@tuval/core';
import { JustifyContents } from './JustifyContents';
import { FlexLayoutItem } from './FlexLayoutItem';

export enum FlexWrap {
    Wrap = 0,
    WrapReverse = 1,
    NoWrap = 2
}



export class FlexLayout extends ContainerControl<FlexLayout> {

    public get Wrap(): FlexWrap {
        return this.GetProperty('Wrap');
    }

    public set Wrap(value: FlexWrap) {
        this.SetProperty('Wrap', value);
    }

    public get JustifyContent(): JustifyContents {
        return this.GetProperty('JustifyContent');
    }

    public set JustifyContent(value: JustifyContents) {
        this.SetProperty('JustifyContent', value);
    }

    protected SetupControlDefaults(): void {
        super.SetupControlDefaults();
        this.Wrap = FlexWrap.NoWrap;
        this.JustifyContent = JustifyContents.Start;
    }

    public AddFlexItem(control: Control<any>): FlexLayoutItem {
        const item = new FlexLayoutItem();
        this.Controls.Add(item);
        item.Controls.Add(control);
        return item;
    }

    public CreateElements() {
        const className = classNames('flex', {
            'flex-wrap': this.Wrap === FlexWrap.Wrap,
            'flex-wrap-reverse': this.Wrap === FlexWrap.WrapReverse,
            'flex-nowrap': this.Wrap === FlexWrap.NoWrap,
            'justify-content-start': this.JustifyContent === JustifyContents.Start,
            'justify-content-end': this.JustifyContent === JustifyContents.End,
            'justify-content-center': this.JustifyContent === JustifyContents.Center,
            'justify-content-between': this.JustifyContent === JustifyContents.Between,
            'justify-content-around': this.JustifyContent === JustifyContents.Around,
            'justify-content-evenly': this.JustifyContent === JustifyContents.Evenly,
        } as any
        );
        return (
            <div class={className}>
                {this.CreateControls()}
            </div>
        );
    }
    public override OnFormResized(w: int, h: int) {
        foreach(this.Controls, (control) => {
            control.OnFormResized(w, h);
        });
    }
}
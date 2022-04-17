import { Control, Teact, DomHandler, React, Modes } from '@tuval/forms';
import { Encoding, Convert, Event, int } from '@tuval/core';
import { Shape } from '../Shape';
import { Command } from './commands/Command';
import { Line } from './commands/Line';
import { CommandCollection } from './CommandCollection';
import { Move } from './commands/Move';
import { ClosePath } from './commands/ClosePath';

export class _Path extends Shape<_Path> {

    public get Commands(): CommandCollection {
        return this.GetProperty('Commands');
    }

    public set Commands(value: CommandCollection) {
        this.SetProperty('Commands', value);
    }

    public SetupControlDefaults() {
        super.SetupControlDefaults();
        this.stroke = '#000';
        this.stroke_width = 1;
        this.fill = 'none';
        this.Commands = new CommandCollection(this);
    }

    public MoveTo(x: int, y: int) {
        this.Commands.Add(new Move(x, y));
    }

    public LineTo(x: int, y: int) {
        this.Commands.Add(new Line(x, y));
    }

    public ClosePath() {
        this.Commands.Add(new ClosePath());
    }

    private createPathString(): string {
        const paths = this.Commands.ToArray().map((command: Command) => {
            return command.ToString();
        });
        return paths.join(' ');
    }
    public CreateElements() {
        return (
            <path d={this.createPathString()}
                fill={this.fill}
                stroke={this.stroke}
                stroke-width={this.stroke_width}
                style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">
            </path>

        )
    }
}
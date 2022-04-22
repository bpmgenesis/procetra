import { Control, Teact, DomHandler, React, Modes, BlockUI, ProgressBar } from '@tuval/forms';
import { Encoding, Convert, Event, TString, int } from '@tuval/core';
import { ShapeCollection } from './ShapeCollection';
import { Rectangle } from './Rectangle';
import { Line } from './Line';
import { Circle } from './Circle';
import { EllipseComponent, Paper } from '../components/elements';
import { Text } from './Text';
import { Ellipse } from './Ellipse';
import { Path } from './Path';
import { Resources } from '../../../Resources/Resources';

export class SvgCanvas extends Control<SvgCanvas> {

    public get LastPromise(): any {
        if (this.__Mode__ === Modes.Control && this.m_Component) {
            return this.m_Component.m_PropertyBag['LastPromise'];
        } else {
            return this.m_PropertyBag['LastPromise'];
        }
    }
    public set LastPromise(value: any) {
        if (this.__Mode__ === Modes.Control && this.m_Component) {
            this.m_Component.m_PropertyBag['LastPromise'] = value;
        } else {
            this.m_PropertyBag['LastPromise'] = value;
        }
    }

    /* public get Loading(): boolean {
        return this.GetProperty('Loading');
    }

    public set Loading(value: boolean) {
        this.SetProperty('Loading', value);
    } */

    public get PaperWidth(): int {
        return this.GetProperty('PaperWidth');
    }

    public set PaperWidth(value: int) {
        this.SetProperty('PaperWidth', value);
    }

    public get PaperHeight(): int {
        return this.GetProperty('PaperHeigth');
    }

    public set PaperHeight(value: int) {
        this.SetProperty('PaperHeigth', value);
    }


    m_Paper: any;
    public get Paper(): Paper {
        if (this.__Mode__ === Modes.Control && this.m_Component != null) {
            return this.m_Component.m_Paper;
        } else {
            return this.m_Paper;
        }
    }
    public get Shapes(): ShapeCollection {
        return this.GetProperty('Shapes');
    }

    public set Shapes(value: ShapeCollection) {
        this.SetProperty('Shapes', value);
    }

    public SetupControlDefaults() {
        super.SetupControlDefaults();
        this.Shapes = new ShapeCollection(this);
        this.Width = 1300;
        this.Height = 1300;
        this.Loading = false;
    }

    private renderShapes(): any[] {
        return this.Shapes.ToArray().map(shape => (shape as any).CreateMainElement());
    }
    public rect(x: int, y: int, width: int, height: int): Rectangle {
        const rect = new Rectangle();
        rect.x = x;
        rect.y = y;
        rect.width = width;
        rect.height = height;
        this.Shapes.Add(rect);
        return rect;
    }
    public path(d: any[]): Path {
        const rect = new Path();
        rect.d = d;
        this.Shapes.Add(rect);
        return rect;
    }

    public ellipse(x: int, y: int, width: int, height: int): Ellipse {
        const rect = new Ellipse();
        rect.x = x;
        rect.y = y;
        rect.width = width;
        rect.height = height;
        this.Shapes.Add(rect);
        return rect;
    }

    public circle(x: int, y: int, radius: int): Circle {
        const rect = new Circle();
        rect.x = x;
        rect.y = y;
        rect.r = radius;
        this.Shapes.Add(rect);
        return rect;
    }

    public line(x1: int, y1: int, x2: int, y2: int): Line {
        const line = new Line();
        line.x = x1;
        line.y = y1;
        line.x2 = x2;
        line.y2 = y2;
        this.Shapes.Add(line);
        return line;
    }
    /* public print(x: int, y: int, text: string): Print {
        const line = new Print();
        line.x = x;
        line.y = y;
        line.text = text;
        this.Shapes.Add(line);
        return line;
    } */

    public text(x: int, y: int, text: string): Text {
        const line = new Text();
        line.x = x;
        line.y = y;
        line.text = text;
        this.Shapes.Add(line);
        return line;
    }

    //"id": "s1",
    //"offset": "0",
    //"style": "stop-color:red;stop-opacity:1;"
    public defineLinearGradient(name: string, ginfo: any[]) {
        if (this.Paper != null && (this.Paper as any).paper != null) {
            (this.Paper as any).paper.defineLinearGradient(name, ginfo);
        }
    }

    public Clear() {
        if (this.Paper != null && (this.Paper as any).paper != null) {
            (this.Paper as any).paper.clear();
            this.Shapes.Clear();
        }
    }
    public componentDidUpdate() {
        if (this.LastPromise) {
            this.LastPromise();
        }
        //console.log('Svg Canvas - componentDidUpdate');
    }

    public GetSvg() {
        const element: any = document.getElementById(this.Id);
        if (element) {
            return element.innerHTML;
        }
    }
    public CreateElements() {
        return (
            <BlockUI blocked={this.Loading} template={<img style='width:50px;height:50px;' src={Resources.Icons.Loading}></img>}>
                <div style={this.GetStyleObject()}>
                    <Paper id={this.Id} ref={(e) => this.m_Paper = e} width={this.PaperWidth} height={this.PaperHeight}>
                        {this.renderShapes()}
                    </Paper>
                </div>
            </BlockUI>

        );
    }

    public override GetStyleObject(): any {
        const style = super.GetStyleObject();
        if (this.Width < 0) {
            style['width'] = '100%';
        }
        style['overflow'] = 'auto';
        return style;
    }
}

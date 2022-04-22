import { Control, Teact, DomHandler, React, Modes } from '@tuval/forms';
import { Encoding, Convert, Event, TString, int } from '@tuval/core';
import { ShapeCollection } from './ShapeCollection';
import { Rectangle } from './Rectangle';
import { Line } from './Line';
import { Paper, Set, Rect, EllipseComponent, Image, TextComponent, PathComponent, CircleComponent } from '../components/elements';

declare var Raphael;
export class RaphaelCanvas extends Control<RaphaelCanvas> {
    public get Paper(): any {
        return this.GetProperty('Paper');
    }

    public set Paper(value: any) {
        this.SetProperty('Paper', value);
    }

    public get OnDraw(): any {
        return this.GetProperty('OnDraw');
    }

    public set OnDraw(value: any) {
        this.SetProperty('OnDraw', value);
    }

    public SetupControlDefaults() {
        super.SetupControlDefaults();
        this.OnDraw = new Event();

    }


    /*  public rect(x: int, y: int, width: int, height: int): Rectangle {
         const rect = new Rectangle();
         rect.X = x;
         rect.Y = y;
         rect.Width = width;
         rect.Height = height;
         this.Shapes.Add(rect);
         return rect;
     }

     public circle(x: int, y: int, radius: int): Circle {
         const rect = new Circle();
         rect.X = x;
         rect.Y = y;
         rect.Radius = radius;
         this.Shapes.Add(rect);
         return rect;
     }

     public line(x1: int, y1: int, x2: int, y2: int): Line {
         const line = new Line();
         line.X = x1;
         line.Y = y1;
         line.X2 = x2;
         line.Y2 = y2;
         this.Shapes.Add(line);
         return line;
     }
  */

    public componentDidMount() {
        //this.OnDraw(this.Id);
    }
    public CreateElements() {
        var data = [
            { x: 50, y: 50, r: 40, attr: { "stroke": "#0b8ac9", "stroke-width": 5 }, animate: Raphael.animation({ cx: 60 }, 500, "<>") },
            { x: 100, y: 100, r: 40, attr: { "stroke": "#f0c620", "stroke-width": 5 }, animate: Raphael.animation({ cx: 105 }, 500, "<>") },
            { x: 150, y: 50, r: 40, attr: { "stroke": "#1a1a1a", "stroke-width": 5 } },
            { x: 200, y: 100, r: 40, attr: { "stroke": "#10a54a", "stroke-width": 5 }, animate: Raphael.animation({ cx: 195 }, 500, "<>") },
            { x: 250, y: 50, r: 40, attr: { "stroke": "#e11032", "stroke-width": 5 }, animate: Raphael.animation({ cx: 240 }, 500, "<>") }
        ]
        return (
            <Paper width={300} height={300}>
                <Set>
                    {
                        data.map(function (ele, pos) {
                            return (<CircleComponent key={pos} x={ele.x} y={ele.y} r={ele.r} attr={ele.attr} animate={ele.animate} />)
                        })
                    }
                </Set>
                <Set>
                    <Rect x={30} y={148} width={240} height={150} attr={{ "fill": "#10a54a", "stroke": "#f0c620", "stroke-width": 5 }} />
                    <EllipseComponent x={150} y={198} ry={40} rx={100} attr={{ "fill": "#fff", "stroke": "#e11032" }} glow={{ width: 10, fill: true, color: "#0b8ac9", opacity: 1 }} />

                    <TextComponent x={150} y={258} text="同一个世界 同一个梦想" attr={{ "fill": "#fff" }} />
                    <TextComponent x={150} y={273} text="One World One Dream" attr={{ "fill": "#fff" }} />
                    <PathComponent d={["M150 287L150 287"]} animate={Raphael.animation({ "path": ["M80 287L220 287"] }, 500, "<>")} attr={{ "stroke": "#fff" }} />
                    <Line x1={150} y1={290} x2={150} y2={290} animate={Raphael.animation({ x1: 80, x2: 220 }, 500, "<>")} attr={{ "stroke": "#fff" }} />
                </Set>
            </Paper>);
        /* return (
            <div id={this.Id} class="canvas"></div>
        ); */
    }

}

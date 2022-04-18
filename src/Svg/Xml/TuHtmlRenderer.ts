import { TuXmlTransformer } from './TuXmlTransformer';
import { CGColor, CGPoint, CGRectangle, CGSize } from '@tuval/cg';
import { Convert, float, ByteArray, int, TString, is, as } from '@tuval/core';
import { GraphicsPath, Brush, Pen, DashStyle, GraphicTypes, SolidBrush } from '@tuval/graphics';
import { TuObject } from '../TuObject/TuObject';
export abstract class TuHtmlRenderer<T extends TuObject> extends TuXmlTransformer<T> {
    public /* virtual */  TranslateAlpha(c: CGColor): float {
        return c.A / 255;
    }
    public /* virtual */  TranslateColor(c: CGColor): string {
        const str: any[] = ["rgb(", c.R, ",", c.G, ",", c.B, ")"];
        return str.join('');
    }

    public /* virtual */  TranslateGraphicsPath(path: GraphicsPath): string {
        let str: string = "";
        try {
            const pathPoints: CGPoint[] = path.PathPoints;
            const pathTypes: number[] = path.PathTypes;
            let str1: string = "";
            for (let i: int = 0; i < Math.min(pathPoints.length, pathTypes.length); i++) {
                let str2: string = "M";
                let int32: int = pathTypes[i];
                let flag: boolean = false;
                if ((int32 & 128) != 0) {
                    flag = true;
                    int32 &= 127;
                }
                switch (int32 & 63) {
                    case 0:
                        {
                            str2 = "M";
                            break;
                        }
                    case 1:
                        {
                            str2 = "L";
                            break;
                        }
                    case 2:
                        {
                            str2 = TString.Concat("?", int32, "?");
                            break;
                        }
                    case 3:
                        {
                            str2 = "C";
                            break;
                        }
                    default:
                        {
                            str2 = TString.Concat("?", int32, "?");
                            break;
                        }
                }
                if (str2 !== str1) {
                    str = TString.Concat(str, str2);
                    str1 = str2;
                }
                let str3: string = str;
                const strArrays: any[] = [str3, pathPoints[i].X, " ", pathPoints[i].Y, " "];
                str = strArrays.join('');
                if (flag) {
                    str = TString.Concat(str, "Z ");
                }
            }
        }
        catch (exception) {
        }
        return str;
    }
    public /* virtual */  WriteBrushAttributes(brush: Brush): void {
        if (brush == null) {
            this.WriteStyleAttrVal("background-color", "transparent");
            return;
        }
        const solidBrush: SolidBrush = as(brush, GraphicTypes.SolidBrush);
        if (solidBrush != null) {
            this.WriteStyleAttrVal("background-color", this.TranslateColor(solidBrush.Color));
            if (solidBrush.Color.A !== 255) {
                this.WriteAttrVal("fill-opacity", this.TranslateAlpha(solidBrush.Color));
            }
        }
        //base.Writer.InvokeGenerateAttributes(b.GetType(), b);
    }

    public /* virtual */  WriteEllipse(p: Pen, b: Brush, r: CGRectangle): void {
        this.WriteStartElement("div");
        this.WriteBrushAttributes(b);
        this.WritePenAttributes(p);
        this.WriteStyleAttrVal('position', 'absolute');
        this.WriteStyleAttrVal('left', r.Left + 'px');
        this.WriteStyleAttrVal('top', r.Top + 'px');
        this.WriteStyleAttrVal('width', r.Width + 'px');
        this.WriteStyleAttrVal('height', r.Height + 'px');
        this.WriteStyleAttrVal('border-radius', '50%');
        this.WriteEndElement();


    }

    public /* virtual */  WriteLine(p: Pen, a: CGPoint, b: CGPoint): void {
        const color = p.Color.toString('#rrggbb');
        const width = p.Width;

        let ax: float = a.X;
        let ay: float = a.Y;
        let bx: float = b.X;
        let by: float = b.Y;
        if (ax > bx) {
            bx = ax + bx;
            ax = bx - ax;
            bx = bx - ax;
            by = ay + by;
            ay = by - ay;
            by = by - ay;
        }

        var angle = Math.atan((ay - by) / (bx - ax));
        // console.log('angle: ' + angle);

        angle = (angle * 180 / Math.PI);
        //   console.log('angle: ' + angle);
        angle = -angle;
        //   console.log('angle: ' + angle);

        var length = Math.sqrt((ax - bx) * (ax - bx) + (ay - by) * (ay - by));
        //console.log('length: ' + length);

        this.WriteStartElement("div");
        this.WriteStyleAttrVal('left', ax + "px");
        this.WriteStyleAttrVal('top', ay + "px");
        this.WriteStyleAttrVal('width', length + "px");
        this.WriteStyleAttrVal('height', width + "px");
        this.WriteStyleAttrVal('background-color', color);
        this.WriteStyleAttrVal('position', 'absolute');
        this.WriteStyleAttrVal('transform', "rotate(" + angle + "deg)");
        this.WriteStyleAttrVal('-ms-transform', "rotate(" + angle + "deg)");
        this.WriteStyleAttrVal('transform-origin', "0% 0%");

        this.WriteStyleAttrVal('-moz-transform', "rotate(" + angle + "deg)");
        this.WriteStyleAttrVal('-moz-transform-origin', "0% 0%");

        this.WriteStyleAttrVal('-webkit-transform', "rotate(" + angle + "deg)");
        this.WriteStyleAttrVal('-webkit-transform-origin', "0% 0%");

        this.WriteStyleAttrVal('-o-transform', "rotate(" + angle + "deg)");
        this.WriteStyleAttrVal('-o-transform-origin', "0% 0%");

        this.WriteEndElement();
    }

    public /* virtual */  WriteLines(p: Pen, v: CGPoint[]): void {
        this.WriteStartElement("div");
        //this.WriteBrushAttributes(null);
        this.WritePenAttributes(p);
        let str: string = "";
        for (let i: int = 0; i < v.length; i++) {
            const pointF: CGPoint = v[i];
            let str1: string = str;
            const strArrays: any[] = [str1, pointF.X, ",", pointF.Y, " "];
            str = strArrays.join('');
        }
        this.WriteStyleAttrVal("clip-path", "polygon(" + str + ")");
        this.WriteEndElement();
    }
    public /* virtual */  WritePath(p: Pen, b: Brush, pathdesc: string): void {
        this.WriteStartElement("div");
        this.WriteBrushAttributes(b);
        this.WritePenAttributes(p);
        this.WriteStyleAttrVal("clip-path", "path(" + pathdesc + ")");
        this.WriteEndElement();
    }

    public /* virtual */  WritePenAttributes(pen: Pen): void {

        if (pen == null || pen.Color.IsEmpty) {
            this.WriteStyleAttrVal("borderColor", "transparent");
            return;
        }
        this.WriteStyleAttrVal("borderColor", this.TranslateColor(pen.Color));
        const width: float = pen.Width;

            if (width !== 0) {
                this.WriteStyleAttrVal("borderWidth", width);
            }
            else {
                this.WriteStyleAttrVal("borderWidth", width + "px");
            }

        if (pen.Color.A !== 255) {
            this.WriteStyleAttrVal("stroke-opacity", this.TranslateAlpha(pen.Color));
        }
        if (pen.DashOffset > 0) {
            this.WriteStyleAttrVal("borderStyle", pen.DashOffset);
        }
        if (pen.DashStyle !== DashStyle.Solid) {
            const dashPattern: float[] = pen.DashPattern;
            let str: string = "";
            for (let i: int = 0; i < dashPattern.length; i++) {
                if (i > 0) {
                    str = TString.Concat(str, ",");
                }
                str = TString.Concat(str, dashPattern[i] * width);
            }
            this.WriteStyleAttrVal("borderStyle", str);
        } else {
            this.WriteStyleAttrVal("borderStyle", 'solid');
        }

        //base.Writer.InvokeGenerateAttributes(p.GetType(), p);
    }

    public /* virtual */  WritePolygon(p: Pen, b: Brush, poly: CGPoint[]): void {
        if (poly == null || poly.length < 2) {
            return;
        }
        const str: any[] = ["M", poly[0].X, " ", poly[0].Y, " "];
        let str1: string = str.join('');
        for (let i: int = 1; i < poly.length; i++) {
            const pointF: CGPoint = poly[i];
            const str2: string = str1;
            const strArrays: any[] = [str2, "L", pointF.X, " ", pointF.Y, " "];
            str1 = strArrays.join('');
        }
        str1 = TString.Concat(str1, "Z");
        this.WritePath(p, b, str1);
    }

    public /* virtual */  WriteRectangle(p: Pen, b: Brush, r: CGRectangle, corner: CGSize): void {
        this.WriteStartElement("div");
        this.WriteBrushAttributes(b);
        this.WritePenAttributes(p);
        this.WriteStyleAttrVal('position', 'absolute');
        this.WriteStyleAttrVal('left', r.Left + 'px');
        this.WriteStyleAttrVal('top', r.Top + 'px');
        this.WriteStyleAttrVal('width', r.Width + 'px');
        this.WriteStyleAttrVal('height', r.Height + 'px');

        if (corner.Width > 0 && corner.Height > 0) {
            this.WriteStyleAttrVal('border-radius', corner.Width + "px " + corner.Height + "px");
        }
        this.WriteEndElement();
    }

}
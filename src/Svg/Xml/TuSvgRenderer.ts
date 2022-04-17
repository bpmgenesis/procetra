import { TuXmlTransformer } from './TuXmlTransformer';
import { CGColor, CGPoint, CGRectangle, CGSize } from '@tuval/cg';
import { Convert, float, ByteArray, int, TString, is, as } from '@tuval/core';
import { GraphicsPath, Brush, Pen, DashStyle, GraphicTypes, SolidBrush } from '@tuval/graphics';
import { SvgMatrix } from '../Matrix';
import { TuObject } from '../TuObject/TuObject';
export abstract class TuSvgRenderer<T extends TuObject> extends TuXmlTransformer<T> {
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
            this.WriteAttrVal("fill", "none");
            return;
        }
        const solidBrush: SolidBrush = as(brush, GraphicTypes.SolidBrush);
        if (solidBrush != null) {
            this.WriteAttrVal("fill", this.TranslateColor(solidBrush.Color));
            if (solidBrush.Color.A !== 255) {
                this.WriteAttrVal("fill-opacity", this.TranslateAlpha(solidBrush.Color));
            }
        }
        //base.Writer.InvokeGenerateAttributes(b.GetType(), b);
    }

    public /* virtual */  WriteEllipse(p: Pen, b: Brush, r: CGRectangle): void {
        this.WriteStartElement("ellipse");
        this.WriteBrushAttributes(b);
        this.WritePenAttributes(p);
        this.WriteAttrVal("cx", r.X + r.Width / 2);
        this.WriteAttrVal("cy", r.Y + r.Height / 2);
        this.WriteAttrVal("rx", r.Width / 2);
        this.WriteAttrVal("ry", r.Height / 2);
        this.WriteEndElement();
    }

    public /* virtual */  WriteLine(p: Pen, a: CGPoint, b: CGPoint): void {
        this.WriteStartElement("line");
        this.WriteBrushAttributes(null);
        this.WritePenAttributes(p);
        this.WriteAttrVal("x1", a.X);
        this.WriteAttrVal("y1", a.Y);
        this.WriteAttrVal("x2", b.X);
        this.WriteAttrVal("y2", b.Y);
        this.WriteEndElement();
    }

    public /* virtual */  WriteLines(p: Pen, v: CGPoint[]): void {
        this.WriteStartElement("polyline");
        this.WriteBrushAttributes(null);
        this.WritePenAttributes(p);
        let str: string = "";
        for (let i: int = 0; i < v.length; i++) {
            const pointF: CGPoint = v[i];
            let str1: string = str;
            const strArrays: any[] = [str1, pointF.X, ",", pointF.Y, " "];
            str = strArrays.join('');
        }
        this.WriteAttrVal("points", str);
        this.WriteEndElement();
    }
    public /* virtual */  WritePath(p: Pen, b: Brush, pathdesc: string): void {
        this.WriteStartElement("path");
        this.WriteBrushAttributes(b);
        this.WritePenAttributes(p);
        this.WriteAttrVal("d", pathdesc);
        this.WriteEndElement();
    }

    public /* virtual */  WritePenAttributes(pen: Pen): void {
        if (pen == null || pen.Color.IsEmpty) {
            this.WriteAttrVal("stroke", "none");
            return;
        }
        this.WriteAttrVal("stroke", this.TranslateColor(pen.Color));
        const width: float = pen.Width;
        if (width !== 1) {
            if (width !== 0) {
                this.WriteAttrVal("stroke-width", width);
            }
            else {
                this.WriteAttrVal("stroke-width", "1px");
            }
        }
        if (pen.Color.A !== 255) {
            this.WriteAttrVal("stroke-opacity", this.TranslateAlpha(pen.Color));
        }
        if (pen.DashOffset > 0) {
            this.WriteAttrVal("stroke-dashoffset", pen.DashOffset);
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
            this.WriteAttrVal("stroke-dasharray", str);
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
        let matrix = new SvgMatrix();
        matrix = matrix.translate(0.5,0.5);
        this.WriteStartElement("rect");
        this.WriteBrushAttributes(b);
        this.WritePenAttributes(p);
        this.WriteAttrVal("x", r.X);
        this.WriteAttrVal("y", r.Y);
        this.WriteAttrVal("width", r.Width);
        this.WriteAttrVal("height", r.Height);
        this.WriteAttrVal("transform", matrix.transformString);
        if (corner.Width > 0 && corner.Height > 0) {
            this.WriteAttrVal("rx", corner.Width);
            this.WriteAttrVal("ry", corner.Height);
        }
        this.WriteEndElement();
    }

}
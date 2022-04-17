import { TuView } from '../../TuView/TuView';
import { TuHtmlRenderer } from '../../Xml/TuHtmlRenderer';
import { CGRectangle, CGSize } from '@tuval/cg';
import { TuText } from '../TuText';
import { SolidBrush, Pen, FontStyle } from '@tuval/graphics';
import { int, Out, TString, New } from '@tuval/core';
import { Teact } from '@tuval/forms';
import { Middle } from '../../Spot';


/* white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  white-space: nowrap;
  width: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  border: 1px solid #000000; */

const myNewlineArray: string[] = ['\r', '\n'];

type Const<Type> = {
    +readonly [Property in keyof Type]: Type[Property];
};

export class HtmlRenderer extends TuHtmlRenderer<TuText> {
    public DecideCache(): void {
        this.InvalidateCache();
    }
    public GenerateElement(view: TuView, obj: TuText): boolean {
        this.WriteStartElement('tuval-diagram-TuText');
        return true;
    }
    public GenerateAttributes(view: TuView, tuText: TuText): void {
        const r = tuText.Bounds.clone();
        this.WriteStyleAttrVal('position', 'absolute');
        this.WriteStyleAttrVal('left', r.Left + 'px');
        this.WriteStyleAttrVal('top', r.Top + 'px');
        this.WriteStyleAttrVal('width', r.Width + 'px');
        this.WriteStyleAttrVal('height', r.Height + 'px');

        this.WriteStyleAttrVal('display', 'flex');
        if (tuText.Alignment === Middle) {
            this.WriteStyleAttrVal('align-items', 'center');
        }

        if (!tuText.Multiline) {
            this.WriteStyleAttrVal('overflow', 'hidden');
        }

        //  this.WriteAttrVal('onclick', ()=> alert(''));
    }

    private drawBackground(p: Pen, b: SolidBrush, r: Const<CGRectangle>) {
        this.WriteStartElement("div");
        this.WriteBrushAttributes(b);
        this.WritePenAttributes(p);
        this.WriteStyleAttrVal('position', 'absolute');
        // this.WriteStyleAttrVal('left', r.Left + 'px');
        // this.WriteStyleAttrVal('top', r.Top + 'px');
        this.WriteStyleAttrVal('width', r.Width + 'px');
        this.WriteStyleAttrVal('height', r.Height + 'px');

        this.WriteEndElement();
    }

    private FindFirstLineBreak(str: string, start: int, nextline: Out<int>): int {
        const int32: int = TString.IndexOfAny(str, myNewlineArray, start);
        if (int32 >= 0) {
            if (str[int32] != '\r' || int32 + 1 >= str.length || str[int32 + 1] != '\n') {
                nextline.value = int32 + 1;
            }
            else {
                nextline.value = int32 + 2;
            }
        }
        return int32;
    }
    public GenerateBody(view: TuView, tuText: TuText): void {

        let bounds: CGRectangle = tuText.Bounds.clone();

        /*    this.WriteStartElement('div');
           this.WriteStyleAttrVal('position', 'absolute');
           this.WriteStyleAttrVal('left', bounds.Left + 'px');
           this.WriteStyleAttrVal('top', bounds.Top + 'px');
           this.WriteStyleAttrVal('width', bounds.Width + 'px');
           this.WriteStyleAttrVal('height', bounds.Height + 'px');
           this.WriteStyleAttrVal('display', 'flex');
           this.WriteStyleAttrVal('align-items', 'center'); */


        let brush: SolidBrush = null;
        let pen: Pen = null;

        if (!tuText.TransparentBackground && !tuText.BackgroundColor.IsEmpty) {
            brush = new SolidBrush(tuText.BackgroundColor);
        }
        if (tuText.Bordered) {
            pen = new Pen(tuText.TextColor);
        }
        if (brush != null || pen != null) {
            this.drawBackground(pen, brush, bounds);
            pen.Dispose();
            brush.Dispose();
        }

        const font = tuText.Font;
        const color = this.TranslateColor(tuText.TextColor);
        const fontSize = font ? "12" : font.Size;
        let fontName: string = ''
        let fontWeight: string = 'normal';
        let fontStyle: string = 'normal';



        this.WriteStartElement('span');
        this.WriteStyleAttrVal('position', 'relative');

        this.WriteStyleAttrVal('width', bounds.Width + 'px');

        if (font != null && font.Name != null) {
            this.WriteStyleAttrVal('font-name', font.Name);
        }

        if (font.Style & FontStyle.Bold) {
            this.WriteStyleAttrVal('font-weight', 'bold');
        }

        if (font.Style & FontStyle.Italic) {
            this.WriteStyleAttrVal('font-style', 'italic');
        }

        this.WriteStyleAttrVal('font-size', tuText.FontSize + 'pt');

        if (tuText.Wrapping) {
            this.WriteStyleAttrVal('white-space', 'normal');
        } else {
            this.WriteStyleAttrVal('white-space', 'nowrap');
        }


        if (tuText.Multiline) {
            const a: Out<int> = New.Out(0);

            const result: any[] = [];
            let index = 0;
            while (index > -1) {
                const prevIndex = index;
                index = this.FindFirstLineBreak(tuText.Text, index + 1, a);

                const line = tuText.Text.substring(prevIndex, index > -1 ? index : tuText.Text.length - 1);
                const style = {};
                style['margin'] = '0px';
                if (tuText.Alignment === Middle) {
                    style['text-align'] = 'center';
                }
                result.push(<p style={style}>{line}</p>);

            }
            if (result.length > 0) {
                this.WriteComponent(<p style={'margin:0px;'}>{result}</p>);
            } else {
                this.WriteTextBody(tuText.Text);
            }

        } else {
            this.WriteTextBody(tuText.Text);
        }
        this.WriteEndElement();

        //this.WriteEndElement();
    }
    public GenerateElementFinish(view: TuView, obj: TuText): void {
        this.WriteEndElement();
    }

}
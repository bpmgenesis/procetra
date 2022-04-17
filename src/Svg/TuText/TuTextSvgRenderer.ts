import { CGRectangle, CGSize, CGColor, CGPoint } from '@tuval/cg';
import { Bitmap, Graphics, Font, StringFormat, SolidBrush, Pen, FontFamily, StringFormatFlags, StringTrimming, StringAlignment } from '@tuval/graphics';

import { TuSvgRenderer } from "../Xml/TuSvgRenderer";
import { TuText } from "./TuText";
import { CharArray, New, float, int, TString, Out, Convert, TChar } from '@tuval/core';
import { TuView } from '../TuView/TuView';
import { GetTextWidth } from '../SvgMesurements';


const myDummyBitmap: Bitmap = new Bitmap(10, 10);
const graphic = Graphics.FromImage(myDummyBitmap);


const myNewlineArray: string[] = ['\r', '\n'];
export class TuTextSvgRenderer extends TuSvgRenderer<TuText> {
    public DecideCache(view: TuView, obj: TuText): void {

    }
    public GenerateElement(view: TuView, obj: TuText): boolean {
        this.WriteStartElement('g');
        this.WriteAttrVal('class', 'TuText');
        return true;
    }
    public GenerateAttributes(view: TuView, obj: TuText): void {

    }
    public GenerateElementFinish(view: TuView, obj: TuText): void {
        this.WriteEndElement();
    }

    private drawString(t: TuText, str: string, rect: CGRectangle, g: Graphics, font: Font,
        fmt: StringFormat): void {
        const lineHeight: float = this.getLineHeight(font);
        let rectangleF: CGRectangle = rect.clone();
        if (!t.Wrapping) {
            let xPos: CGRectangle = rectangleF.clone();
            xPos.Height = Math.min(xPos.Height, lineHeight + 1);
            const stringWidth: float = this.getStringWidth(str, g, font, fmt);
            xPos = this.GetXPos(t, stringWidth, xPos);
            this.drawString2(str, xPos, fmt);
            return;
        }
        const single: float = Math.min(t.WrappingWidth, rect.Width);
        let str1: string = str;
        const y: CGRectangle = rectangleF.clone();
        let xPos1: CGRectangle = rectangleF.clone();
        while (str1.length > 0) {
            let firstWord: string = this.getFirstWord(str1);
            str1 = str1.substring(firstWord.length);
            do {
                if (this.getStringWidth(firstWord, g, font, fmt) * 0.9 <= single) {
                    break;
                }
                let int32: int = 1;
                while (this.getStringWidth(firstWord.substr(0, int32), g, font, fmt) * 0.9 <= single) {
                    int32++;
                }
                int32--;
                if (int32 < 1) {
                    int32 = 1;
                }
                const str2: string = firstWord.substr(0, int32);
                xPos1 = this.GetXPos(t, this.getStringWidth(str2, g, font, fmt), y);
                this.drawString2(str2, xPos1, fmt);
                y.Y = y.Y + lineHeight;
                y.Height = y.Height - lineHeight;
                firstWord = firstWord.substring(int32);
            }
            while (y.Height >= lineHeight);
            if (y.Height < lineHeight) {
                return;
            }
            for (let i: string = this.getFirstWord(str1); i.length > 0 &&
                this.getStringWidth(TString.Concat(firstWord, i), g, font, fmt) * 0.9 <= single; i = this.getFirstWord(str1)) {
                firstWord = TString.Concat(firstWord, i);
                str1 = str1.substring(i.length);
            }
            xPos1 = this.GetXPos(t, this.getStringWidth(firstWord, g, font, fmt), y);
            this.drawString2(firstWord, xPos1, fmt);
            y.Y = y.Y + lineHeight;
            y.Height = y.Height - lineHeight;
            if (y.Height >= lineHeight) {
                continue;
            }
            return;
        }
    }
    private drawString2(line: string, r: CGRectangle, fmt: StringFormat): void {
        this.WriteStartElement("tspan");
        this.WriteAttrVal("x", r.X);
        this.WriteAttrVal("y", r.Y);
        this.WriteAttrVal('alignment-baseline', 'before-edge');
        //this.WriteAttrVal("textLength", r.Width);
        this.WriteTextBody(line);
        this.WriteEndElement();
    }

    private FindFirstLineBreak1(str: string, start: int): int {
        const int32: Out<int> = New.Out(0);
        return this.FindFirstLineBreak(str, start, int32);
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

    public override  GenerateBody(view: TuView, goText: TuText): void {

        if (!goText.TransparentBackground && !goText.BackgroundColor.IsEmpty) {
            const solidBrush: SolidBrush = new SolidBrush(goText.BackgroundColor);
            super.WriteRectangle(null, solidBrush, goText.Bounds, new CGSize(0, 0));
            solidBrush.Dispose();
        }
        if (goText.Bordered) {
            const pen: Pen = new Pen(goText.TextColor);
            const bounds: CGRectangle = goText.Bounds.clone();
            bounds.X = bounds.X - 1;
            bounds.Width = bounds.Width + 2;
            super.WriteRectangle(pen, null, bounds, new CGSize(0, 0));
            pen.Dispose();
        }
        const fontFamily: FontFamily = goText.Font.FontFamily;
        const cellAscent: float = goText.Font.GetCellAscent()//fontFamily.GetCellAscent(goText.Font.Style);
        const emHeight: float = goText.Font.GetHeight()//fontFamily.GetEmHeight(goText.Font.Style);
        const height: float = goText.Font.GetHeight() * cellAscent / emHeight;
        this.WriteStartElement("text");

        if (goText.FamilyName != TuText.DefaultFontFamilyName) {
            this.WriteAttrVal("font-family", goText.FamilyName);
        }
        if (goText.FontSize != TuText.DefaultFontSize) {
            this.WriteAttrVal("font-size", TString.Concat(goText.FontSize, "px"));
        }
        if (goText.Bold) {
            this.WriteAttrVal("font-weight", "bold");
        }
        if (goText.Italic) {
            this.WriteAttrVal("font-style", "italic");
        }
        if (goText.Underline) {
            this.WriteAttrVal("text-decoration", "underline");
        }
        if (goText.TextColor != CGColor.Black) {
            this.WriteAttrVal("fill", this.TranslateColor(goText.TextColor));
        }
        if (goText.TextColor.A != 255) {
            this.WriteAttrVal("fill-opacity", this.TranslateAlpha(goText.TextColor));
        }
        const y: CGRectangle = goText.Bounds.clone();
        y.Y = y.Y + Convert.ToInt32(height) - 1;
        this.GenerateText1(goText, y);
        this.WriteEndElement();
    }

    private GenerateText1(t: TuText, rect: CGRectangle): void {
        let text: string = t.Text;
        if (text.length === 0) {
            return;
        }
        const font: Font = t.Font;
        if (font == null) {
            return;
        }
        const lineHeight: float = this.getLineHeight(font);

        if (!t.Multiline) {
            const int32: int = this.FindFirstLineBreak1(text, 0);
            if (int32 >= 0) {
                text = text.substr(0, int32);
            }
        }
        const stringFormat: StringFormat = this.getStringFormat(t, this.View);
        let lineLeading: float = -this.getLineLeading(font);
        let int321: int = 0;
        let length: int = -1;
        let int322: Out<int> = New.Out(-1);
        let flag: boolean = false;
        while (!flag) {
            length = this.FindFirstLineBreak(text, int321, int322);
            if (length == -1) {
                length = text.length;
                flag = true;
            }
            if (int321 <= length) {
                const str: string = text.substr(int321, length - int321);
                if (str.length <= 0) {
                    lineLeading += lineHeight;
                }
                else {
                    const rectangleF: CGRectangle = new CGRectangle(rect.X, rect.Y + lineLeading, rect.Width, rect.Height - lineLeading);
                    this.drawString(t, str, rectangleF, graphic, font, stringFormat);
                    if (!t.Wrapping) {
                        lineLeading += lineHeight;
                    }
                    else {
                        const ınt323: Out<int> = New.Out(0);
                        const ınt324: Out<int> = New.Out(0);
                        const sizeF: CGSize = graphic.MeasureString(str, font, new CGSize(rectangleF.Width, rectangleF.Height), stringFormat, ınt324, ınt323);
                        lineLeading += sizeF.Height;
                    }
                }
            }
            int321 = int322.value;
        }
    }

    private getFirstWord(str: string): string {
        let length: int = str.length;
        let int32: int = 0;
        while (int32 < length) {
            if (!TChar.IsWhiteSpace(str[int32].charCodeAt(0))) {
                int32++;
            }
            else {
                break;
            }
        }
        while (int32 < length && TChar.IsWhiteSpace(str[int32].charCodeAt(0))) {
            int32++;
        }
        if (int32 >= length) {
            return str;
        }
        return str.substr(0, int32);
    }

    private getLineHeight(font: Font): float {
        return font.GetHeight();
    }

    private getLineLeading(font: Font): float {
        return 0;
    }

    private getStringFormat(t: TuText, view: TuView): StringFormat {
        let formatFlags: StringFormat;
        let stringFormat: StringFormat;
        let formatFlags1: StringFormat;
        let stringFormat1: StringFormat;
        const stringTrimming: StringFormat = new StringFormat(StringFormat.GenericTypographic);
        const formatFlags2: StringFormat = stringTrimming;
        formatFlags2.FormatFlags = formatFlags2.FormatFlags | StringFormatFlags.MeasureTrailingSpaces;
        stringTrimming.Trimming = t.StringTrimming;
        if (t.StringTrimming != StringTrimming.None) {
            const stringFormat2: StringFormat = stringTrimming;
            stringFormat2.FormatFlags = stringFormat2.FormatFlags | StringFormatFlags.LineLimit;
        }
        else {
            const formatFlags3: StringFormat = stringTrimming;
            formatFlags3.FormatFlags = formatFlags3.FormatFlags & (StringFormatFlags.DirectionRightToLeft | StringFormatFlags.DirectionVertical | StringFormatFlags.FitBlackBox | StringFormatFlags.DisplayFormatControl | StringFormatFlags.NoFontFallback | StringFormatFlags.MeasureTrailingSpaces | StringFormatFlags.NoWrap | StringFormatFlags.NoClip);
        }
        const alignment: int = t.Alignment.ID;
        if (alignment <= 16) {
            switch (alignment) {
                case 1:
                    {
                        stringTrimming.Alignment = StringAlignment.Center;
                        if (!this.isRightToLeft(t, view)) {
                            formatFlags = stringTrimming;
                            formatFlags.FormatFlags = formatFlags.FormatFlags & (StringFormatFlags.DirectionVertical | StringFormatFlags.FitBlackBox | StringFormatFlags.DisplayFormatControl | StringFormatFlags.NoFontFallback | StringFormatFlags.MeasureTrailingSpaces | StringFormatFlags.NoWrap | StringFormatFlags.LineLimit | StringFormatFlags.NoClip);
                        }
                        else {
                            stringFormat1 = stringTrimming;
                            stringFormat1.FormatFlags = stringFormat1.FormatFlags | StringFormatFlags.DirectionRightToLeft;
                        }
                        if (!t.Wrapping) {
                            stringFormat = stringTrimming;
                            stringFormat.FormatFlags = stringFormat.FormatFlags | StringFormatFlags.NoWrap;
                        }
                        else {
                            formatFlags1 = stringTrimming;
                            formatFlags1.FormatFlags = formatFlags1.FormatFlags & (StringFormatFlags.DirectionRightToLeft | StringFormatFlags.DirectionVertical | StringFormatFlags.FitBlackBox | StringFormatFlags.DisplayFormatControl | StringFormatFlags.NoFontFallback | StringFormatFlags.MeasureTrailingSpaces | StringFormatFlags.LineLimit | StringFormatFlags.NoClip);
                        }
                        return stringTrimming;
                    }
                case 2:
                case 3:
                    {
                        break;
                    }
                case 4:
                    {
                        stringTrimming.Alignment = StringAlignment.Far;
                        if (!this.isRightToLeft(t, view)) {
                            formatFlags = stringTrimming;
                            formatFlags.FormatFlags = formatFlags.FormatFlags & (StringFormatFlags.DirectionVertical | StringFormatFlags.FitBlackBox | StringFormatFlags.DisplayFormatControl | StringFormatFlags.NoFontFallback | StringFormatFlags.MeasureTrailingSpaces | StringFormatFlags.NoWrap | StringFormatFlags.LineLimit | StringFormatFlags.NoClip);
                        }
                        else {
                            stringFormat1 = stringTrimming;
                            stringFormat1.FormatFlags = stringFormat1.FormatFlags | StringFormatFlags.DirectionRightToLeft;
                        }
                        if (!t.Wrapping) {
                            stringFormat = stringTrimming;
                            stringFormat.FormatFlags = stringFormat.FormatFlags | StringFormatFlags.NoWrap;
                        }
                        else {
                            formatFlags1 = stringTrimming;
                            formatFlags1.FormatFlags = formatFlags1.FormatFlags & (StringFormatFlags.DirectionRightToLeft | StringFormatFlags.DirectionVertical | StringFormatFlags.FitBlackBox | StringFormatFlags.DisplayFormatControl | StringFormatFlags.NoFontFallback | StringFormatFlags.MeasureTrailingSpaces | StringFormatFlags.LineLimit | StringFormatFlags.NoClip);
                        }
                        return stringTrimming;
                    }
                default:
                    {
                        if (alignment == 8) {
                            stringTrimming.Alignment = StringAlignment.Far;
                            if (!this.isRightToLeft(t, view)) {
                                formatFlags = stringTrimming;
                                formatFlags.FormatFlags = formatFlags.FormatFlags & (StringFormatFlags.DirectionVertical | StringFormatFlags.FitBlackBox | StringFormatFlags.DisplayFormatControl | StringFormatFlags.NoFontFallback | StringFormatFlags.MeasureTrailingSpaces | StringFormatFlags.NoWrap | StringFormatFlags.LineLimit | StringFormatFlags.NoClip);
                            }
                            else {
                                stringFormat1 = stringTrimming;
                                stringFormat1.FormatFlags = stringFormat1.FormatFlags | StringFormatFlags.DirectionRightToLeft;
                            }
                            if (!t.Wrapping) {
                                stringFormat = stringTrimming;
                                stringFormat.FormatFlags = stringFormat.FormatFlags | StringFormatFlags.NoWrap;
                            }
                            else {
                                formatFlags1 = stringTrimming;
                                formatFlags1.FormatFlags = formatFlags1.FormatFlags & (StringFormatFlags.DirectionRightToLeft | StringFormatFlags.DirectionVertical | StringFormatFlags.FitBlackBox | StringFormatFlags.DisplayFormatControl | StringFormatFlags.NoFontFallback | StringFormatFlags.MeasureTrailingSpaces | StringFormatFlags.LineLimit | StringFormatFlags.NoClip);
                            }
                            return stringTrimming;
                        }
                        if (alignment == 16) {
                            break;
                        }
                        break;
                    }
            }
        }
        else if (alignment > 64) {
            if (alignment == 128) {
                stringTrimming.Alignment = StringAlignment.Center;
                if (!this.isRightToLeft(t, view)) {
                    formatFlags = stringTrimming;
                    formatFlags.FormatFlags = formatFlags.FormatFlags & (StringFormatFlags.DirectionVertical | StringFormatFlags.FitBlackBox | StringFormatFlags.DisplayFormatControl | StringFormatFlags.NoFontFallback | StringFormatFlags.MeasureTrailingSpaces | StringFormatFlags.NoWrap | StringFormatFlags.LineLimit | StringFormatFlags.NoClip);
                }
                else {
                    stringFormat1 = stringTrimming;
                    stringFormat1.FormatFlags = stringFormat1.FormatFlags | StringFormatFlags.DirectionRightToLeft;
                }
                if (!t.Wrapping) {
                    stringFormat = stringTrimming;
                    stringFormat.FormatFlags = stringFormat.FormatFlags | StringFormatFlags.NoWrap;
                }
                else {
                    formatFlags1 = stringTrimming;
                    formatFlags1.FormatFlags = formatFlags1.FormatFlags & (StringFormatFlags.DirectionRightToLeft | StringFormatFlags.DirectionVertical | StringFormatFlags.FitBlackBox | StringFormatFlags.DisplayFormatControl | StringFormatFlags.NoFontFallback | StringFormatFlags.MeasureTrailingSpaces | StringFormatFlags.LineLimit | StringFormatFlags.NoClip);
                }
                return stringTrimming;
            }
        }
        else {
            if (alignment == 32) {
                stringTrimming.Alignment = StringAlignment.Center;
                if (!this.isRightToLeft(t, view)) {
                    formatFlags = stringTrimming;
                    formatFlags.FormatFlags = formatFlags.FormatFlags & (StringFormatFlags.DirectionVertical | StringFormatFlags.FitBlackBox | StringFormatFlags.DisplayFormatControl | StringFormatFlags.NoFontFallback | StringFormatFlags.MeasureTrailingSpaces | StringFormatFlags.NoWrap | StringFormatFlags.LineLimit | StringFormatFlags.NoClip);
                }
                else {
                    stringFormat1 = stringTrimming;
                    stringFormat1.FormatFlags = stringFormat1.FormatFlags | StringFormatFlags.DirectionRightToLeft;
                }
                if (!t.Wrapping) {
                    stringFormat = stringTrimming;
                    stringFormat.FormatFlags = stringFormat.FormatFlags | StringFormatFlags.NoWrap;
                }
                else {
                    formatFlags1 = stringTrimming;
                    formatFlags1.FormatFlags = formatFlags1.FormatFlags & (StringFormatFlags.DirectionRightToLeft | StringFormatFlags.DirectionVertical | StringFormatFlags.FitBlackBox | StringFormatFlags.DisplayFormatControl | StringFormatFlags.NoFontFallback | StringFormatFlags.MeasureTrailingSpaces | StringFormatFlags.LineLimit | StringFormatFlags.NoClip);
                }
                return stringTrimming;
            }
            if (alignment == 64) {
                stringTrimming.Alignment = StringAlignment.Far;
                if (!this.isRightToLeft(t, view)) {
                    formatFlags = stringTrimming;
                    formatFlags.FormatFlags = formatFlags.FormatFlags & (StringFormatFlags.DirectionVertical | StringFormatFlags.FitBlackBox | StringFormatFlags.DisplayFormatControl | StringFormatFlags.NoFontFallback | StringFormatFlags.MeasureTrailingSpaces | StringFormatFlags.NoWrap | StringFormatFlags.LineLimit | StringFormatFlags.NoClip);
                }
                else {
                    stringFormat1 = stringTrimming;
                    stringFormat1.FormatFlags = stringFormat1.FormatFlags | StringFormatFlags.DirectionRightToLeft;
                }
                if (!t.Wrapping) {
                    stringFormat = stringTrimming;
                    stringFormat.FormatFlags = stringFormat.FormatFlags | StringFormatFlags.NoWrap;
                }
                else {
                    formatFlags1 = stringTrimming;
                    formatFlags1.FormatFlags = formatFlags1.FormatFlags & (StringFormatFlags.DirectionRightToLeft | StringFormatFlags.DirectionVertical | StringFormatFlags.FitBlackBox | StringFormatFlags.DisplayFormatControl | StringFormatFlags.NoFontFallback | StringFormatFlags.MeasureTrailingSpaces | StringFormatFlags.LineLimit | StringFormatFlags.NoClip);
                }
                return stringTrimming;
            }
        }
        stringTrimming.Alignment = StringAlignment.Near;
        if (!this.isRightToLeft(t, view)) {
            formatFlags = stringTrimming;
            formatFlags.FormatFlags = formatFlags.FormatFlags & (StringFormatFlags.DirectionVertical | StringFormatFlags.FitBlackBox | StringFormatFlags.DisplayFormatControl | StringFormatFlags.NoFontFallback | StringFormatFlags.MeasureTrailingSpaces | StringFormatFlags.NoWrap | StringFormatFlags.LineLimit | StringFormatFlags.NoClip);
        }
        else {
            stringFormat1 = stringTrimming;
            stringFormat1.FormatFlags = stringFormat1.FormatFlags | StringFormatFlags.DirectionRightToLeft;
        }
        if (!t.Wrapping) {
            stringFormat = stringTrimming;
            stringFormat.FormatFlags = stringFormat.FormatFlags | StringFormatFlags.NoWrap;
        }
        else {
            formatFlags1 = stringTrimming;
            formatFlags1.FormatFlags = formatFlags1.FormatFlags & (StringFormatFlags.DirectionRightToLeft | StringFormatFlags.DirectionVertical | StringFormatFlags.FitBlackBox | StringFormatFlags.DisplayFormatControl | StringFormatFlags.NoFontFallback | StringFormatFlags.MeasureTrailingSpaces | StringFormatFlags.LineLimit | StringFormatFlags.NoClip);
        }
        return stringTrimming;
    }

    private getStringWidth(str: string, g: Graphics, font: Font, fmt: StringFormat): float {
        /* const pointF: CGPoint = new CGPoint();
        return g.MeasureString(str, font, pointF, fmt).Width; */
        return GetTextWidth(str, font);
    }

    private GetXPos(t: TuText, swidth: float, rect: CGRectangle): CGRectangle {
        if (swidth > rect.Width) {
            swidth = rect.Width;
        }
        const alignment: int = t.Alignment.ID;
        if (alignment <= 16) {
            switch (alignment) {
                case 1:
                    {
                        rect.X = rect.X + rect.Width / 2 - swidth / 2;
                        rect.Width = swidth;
                        return rect;
                    }
                case 2:
                case 3:
                    {
                        break;
                    }
                case 4:
                    {
                        rect.X = rect.X + rect.Width - swidth;
                        rect.Width = swidth;
                        return rect;
                    }
                default:
                    {
                        if (alignment == 8) {
                            rect.X = rect.X + rect.Width - swidth;
                            rect.Width = swidth;
                            return rect;
                        }
                        if (alignment == 16) {
                            break;
                        }
                        break;
                    }
            }
        }
        else if (alignment > 64) {
            if (alignment == 128) {
                rect.X = rect.X + rect.Width / 2 - swidth / 2;
                rect.Width = swidth;
                return rect;
            }
        }
        else {
            if (alignment == 32) {
                rect.X = rect.X + rect.Width / 2 - swidth / 2;
                rect.Width = swidth;
                return rect;
            }
            if (alignment == 64) {
                rect.X = rect.X + rect.Width - swidth;
                rect.Width = swidth;
                return rect;
            }
        }
        rect.Width = swidth;
        return rect;
    }

		/* internal */  isRightToLeft(t: TuText, view: TuView): boolean {
        if (!t.RightToLeftFromView || view == null) {
            return t.RightToLeft;
        }
        return false;/* view.RightToLeft === RightToLeft.Yes */;
    }
}
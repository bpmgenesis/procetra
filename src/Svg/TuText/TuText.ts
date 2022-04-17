import { ClassInfo, float, byte, Out, as, foreach, TString, trace, Convert, error, typeOf } from '@tuval/core';
import { Types } from '../types';
import { StringFormat, Font, Bitmap, FontStyle, StringTrimming, Graphics, Brush, StringFormatFlags, FontFamily, StringAlignment, SolidBrush, Pen, Region, GraphicsUnit, TextRenderingHint } from '@tuval/graphics';
import { BottomCenter, BottomLeft, BottomRight, Middle, MiddleBottom, MiddleCenter, MiddleRight, MiddleTop, Spot, TopCenter, TopLeft, TopRight } from '../Spot';
import { CGColor, CGPoint, CGSize, CGRectangle } from '@tuval/cg';

import { TuControl } from '../TuControl/TuControl';
import { TuTextEvents } from './TuTextEvents';
import { NullRect, Brushes_White, Brushes_Black } from '../Globals';
import { TuTextEditorStyle } from './TuTextEditorStyle';
import { GeomUtilities } from '../GeomUtilities';
import { TuView } from '../TuView/TuView';
import { TuLayer } from '../TuLayer/TuLayer';
import { TuCopyDictionary } from '../TuCopyDictionary';
import { TuInputEventArgs } from '../TuInputEventArgs';
import { TuTool } from '../TuTool/TuTool';
import { TuShape } from '../TuShape/TuShape';
import { TuDocument } from '../TuDocument/TuDocument';
import { TuSelection } from '../TuSelection/TuSelection';
import { TuChangedEventArgs } from '../TuChangedEventArgs';
import { TuObject } from '../TuObject/TuObject';
import { TComponent, State } from '@tuval/forms';
import { TuTextSvgRenderer } from './TuTextSvgRenderer';
import { HtmlRenderer } from './Renderers/HtmlRenderer';
import { GetTextWidth, GetFontHeight, MeasureString } from '../SvgMesurements';

let _graphic: Graphics;

const flagTransparentBackground: number = 1;
const flagBold: number = 2;
const flagItalic: number = 4;
const flagUnderline: number = 8;
const flagStrikeThrough: number = 16;
const flagMultiline: number = 32;
const flagWrapping: number = 64;
const flagClipping: number = 128;
const flagAutoResizes: number = 256;
const flagBackgroundOpaqueWhenSelected: number = 512;
const flagEditableWhenSelected: number = 1024;
const flagDropDownList: number = 2048;
const flagRightToLeft: number = 268435456;
const flagRightToLeftFromView: number = 536870912;
const flagUpdating: number = 1073741824;

const maskEditorStyle: number = 61440;
const maskGdiCharSet: number = 16711680;
const maskStringTrimming: number = 251658240;
const DEFAULT_CHARSET: number = 1;
const flagBordered: number = 1048576;

@ClassInfo({
    fullName: Types.TuText,
    instanceof: [
        Types.TuText
    ]
})
export class TuText extends TuObject {
    private static readonly myNewlineArray: string[];
    private static myDefaultFontName: string;
    private static myStandardStringFormat: StringFormat;
    private static myDefaultFontSize: float = 0;
    private static myLastFont: Font;
    private static myEmptyChoices: Array<any>;


    @State()
    private myString: string;

    @State()
    private myFamilyName: string;

    @State()
    private myFontSize: float;

    @State()
    private myAlignment: Spot;

    @State()
    private myTextColor: CGColor;

    @State()
    private myBackgroundColor: CGColor;

    @State()
    private myInternalTextFlags: number;

    @State()
    private myWrappingWidth: float;

    @State()
    private myNumLines: number;

    @State()
    private myMinimum: number;

    @State()
    private myMaximum: number;

    @State()
    private myChoices: any[];

    @State()
    private myStringFormat: StringFormat;

    @State()
    private myFont: Font;

    @State()
    private myEditor: TuControl;

    protected SetupControlDefaults(): void {
        super.SetupControlDefaults();
        this.myString = '';
        this.myFamilyName = TuText.myDefaultFontName;
        this.myFontSize = TuText.myDefaultFontSize;
        this.myAlignment = TopLeft;
        this.myTextColor = CGColor.Black;
        this.myBackgroundColor = CGColor.White;
        this.myInternalTextFlags = 536936705;
        this.myWrappingWidth = 150;
        this.myNumLines = 1;
        this.myMinimum = 0;
        this.myMaximum = 100;
        this.myChoices = TuText.myEmptyChoices;

        this.SvgRenderer = new TuTextSvgRenderer();
        this.HtmlRenderer = new HtmlRenderer();

        this.InternalFlags = this.InternalFlags & -273;

    }

    //#region [Property] Alignment
    public get Alignment(): Spot {
        return this.getAlignment();
    }
    public set Alignment(value: Spot) {
        this.setAlignment(value);
    }

    protected /*virtual*/ getAlignment(): Spot {
        return this.myAlignment;
    }
    protected /*virtual*/ setAlignment(value: Spot) {
        const int32: Spot = this.myAlignment;
        if (int32 !== value) {
            this.myAlignment = value;
            this.Changed(TuTextEvents.ChangedAlignment, 0, int32, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] AutoResizes
    public get AutoResizes(): boolean {
        return this.getAutoResizes();
    }
    public set AutoResizes(value: boolean) {
        this.setAutoResizes(value);
    }

    protected /*virtual*/ getAutoResizes(): boolean {
        return (this.myInternalTextFlags & flagAutoResizes) != 0;
    }
    protected /*virtual*/ setAutoResizes(value: boolean) {
        const flag: boolean = (this.myInternalTextFlags & flagAutoResizes) !== 0;
        if (flag !== value) {
            if (!value) {
                this.myInternalTextFlags &= ~flagAutoResizes;
            }
            else {
                this.myInternalTextFlags |= flagAutoResizes;
            }
            this.Changed(TuTextEvents.ChangedAutoResizes, 0, flag, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] BackgroundColor
    public get BackgroundColor(): CGColor {
        return this.getBackgroundColor();
    }
    public set BackgroundColor(value: CGColor) {
        this.setBackgroundColor(value);
    }

    protected /*virtual*/ getBackgroundColor(): CGColor {
        return this.myBackgroundColor;
    }
    protected /*virtual*/ setBackgroundColor(value: CGColor) {
        const color: CGColor = this.myBackgroundColor;
        if (color.notEquals(value)) {
            this.myBackgroundColor = value;
            this.Changed(TuTextEvents.ChangedBackgroundColor, 0, color, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] BackgroundOpaqueWhenSelected
    public get BackgroundOpaqueWhenSelected(): boolean {
        return this.getBackgroundOpaqueWhenSelected();
    }
    public set BackgroundOpaqueWhenSelected(value: boolean) {
        this.setBackgroundOpaqueWhenSelected(value);
    }

    protected /*virtual*/ getBackgroundOpaqueWhenSelected(): boolean {
        return (this.myInternalTextFlags & flagBackgroundOpaqueWhenSelected) != 0;
    }
    protected /*virtual*/ setBackgroundOpaqueWhenSelected(value: boolean) {
        const flag: boolean = (this.myInternalTextFlags & flagBackgroundOpaqueWhenSelected) !== 0;
        if (flag != value) {
            if (!value) {
                this.myInternalTextFlags &= ~flagBackgroundOpaqueWhenSelected;
            }
            else {
                this.myInternalTextFlags |= flagBackgroundOpaqueWhenSelected;
            }
            this.Changed(TuTextEvents.ChangedBackgroundOpaqueWhenSelected, 0, flag, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] Bold
    public get Bold(): boolean {
        return this.getBold();
    }
    public set Bold(value: boolean) {
        this.setBold(value);
    }

    protected /*virtual*/ getBold(): boolean {
        return (this.myInternalTextFlags & flagBold) !== 0;
    }
    protected /*virtual*/ setBold(value: boolean) {
        const flag: boolean = (this.myInternalTextFlags & flagBold) !== 0;
        if (flag !== value) {
            if (!value) {
                this.myInternalTextFlags &= ~flagBold;
            }
            else {
                this.myInternalTextFlags |= flagBold;
            }
            this.resetFont();
            this.Changed(TuTextEvents.ChangedBold, 0, flag, NullRect, 0, value, NullRect);
            this.updateSizeOrScale();
        }
    }
    //#endregion

    //#region [Property] Bordered
    public get Bordered(): boolean {
        return this.getBordered();
    }
    public set Bordered(value: boolean) {
        this.setBordered(value);
    }

    protected /*virtual*/ getBordered(): boolean {
        return (this.InternalFlags & flagBordered) !== 0;
    }
    protected /*virtual*/ setBordered(value: boolean) {
        const internalFlags: boolean = (this.InternalFlags & flagBordered) !== 0;
        if (internalFlags != value) {
            if (!value) {
                this.InternalFlags = this.InternalFlags & ~flagBordered;
            }
            else {
                this.InternalFlags = this.InternalFlags | flagBordered;
            }
            this.Changed(TuTextEvents.ChangedBordered, 0, internalFlags, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] Choices
    public get Choices(): any[] {
        return this.getChoices();
    }
    public set Choices(value: any[]) {
        this.setChoices(value);
    }

    protected /*virtual*/ getChoices(): any[] {
        if (this.myChoices == null) {
            return TuText.myEmptyChoices;
        }
        return this.myChoices;
    }
    protected /*virtual*/ setChoices(value: any[]) {
        const lists: any[] = (this.myChoices != null ? this.myChoices : TuText.myEmptyChoices);
        const lists1: any[] = value || TuText.myEmptyChoices;
        if (lists !== lists1) {
            this.myChoices = lists1;
            this.Changed(TuTextEvents.ChangedChoices, 0, lists, NullRect, 0, lists1, NullRect);
        }
    }
    //#endregion

    //#region [Property] Clipping
    public get Clipping(): boolean {
        return this.getClipping();
    }
    public set Clipping(value: boolean) {
        this.setClipping(value);
    }

    protected /*virtual*/ getClipping(): boolean {
        return (this.myInternalTextFlags & flagClipping) !== 0;
    }
    protected /*virtual*/ setClipping(value: boolean) {
        const flag: boolean = (this.myInternalTextFlags & flagClipping) !== 0;
        if (flag !== value) {
            if (!value) {
                this.myInternalTextFlags &= ~flagClipping;
            }
            else {
                this.myInternalTextFlags |= flagClipping;
            }
            this.Changed(TuTextEvents.ChangedClipping, 0, flag, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    public static get DefaultFontFamilyName(): string {
        return TuText.myDefaultFontName;
    }
    public set DefaultFontFamilyName(value: string) {
        TuText.myDefaultFontName = value;
    }

    public static get DefaultFontSize(): float {
        return TuText.myDefaultFontSize;
    }
    public set DefaultFontSize(value: float) {
        TuText.myDefaultFontSize = value;
    }

    //#region [Property] DropDownList
    public get DropDownList(): boolean {
        return this.getDropDownList();
    }
    public set DropDownList(value: boolean) {
        this.setDropDownList(value);
    }

    protected /*virtual*/ getDropDownList(): boolean {
        return (this.myInternalTextFlags & flagDropDownList) !== 0;
    }
    protected /*virtual*/ setDropDownList(value: boolean) {
        const flag: boolean = (this.myInternalTextFlags & flagDropDownList) !== 0;
        if (flag != value) {
            if (!value) {
                this.myInternalTextFlags &= ~flagDropDownList;
            }
            else {
                this.myInternalTextFlags |= flagDropDownList;
            }
            this.Changed(TuTextEvents.ChangedDropDownList, 0, flag, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] EditableWhenSelected
    public get EditableWhenSelected(): boolean {
        return this.getEditableWhenSelected();
    }
    public set EditableWhenSelected(value: boolean) {
        this.setEditableWhenSelected(value);
    }

    protected /*virtual*/ getEditableWhenSelected(): boolean {
        return (this.myInternalTextFlags & flagEditableWhenSelected) !== 0;
    }
    protected /*virtual*/ setEditableWhenSelected(value: boolean) {
        const flag: boolean = (this.myInternalTextFlags & flagEditableWhenSelected) !== 0;
        if (flag !== value) {
            if (!value) {
                this.myInternalTextFlags &= ~flagEditableWhenSelected;
            }
            else {
                this.myInternalTextFlags |= flagEditableWhenSelected;
            }
            this.Changed(TuTextEvents.ChangedEditableWhenSelected, 0, flag, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    private static myEditor: TuControl;
    public static get Editor(): TuControl {
        return this.myEditor;
    }

    //#region [Property] EditorStyle
    public get EditorStyle(): TuTextEditorStyle {
        return this.getEditorStyle();
    }
    public set EditorStyle(value: TuTextEditorStyle) {
        this.setEditorStyle(value);
    }

    protected /*virtual*/ getEditorStyle(): TuTextEditorStyle {
        return ((this.myInternalTextFlags & maskEditorStyle) >> 12);
    }
    protected /*virtual*/ setEditorStyle(value: TuTextEditorStyle) {
        const goTextEditorStyle: TuTextEditorStyle = ((this.myInternalTextFlags & maskEditorStyle) >> 12);
        if (goTextEditorStyle != value) {
            this.myInternalTextFlags = this.myInternalTextFlags & ~maskEditorStyle | value << 12;
            this.Changed(TuTextEvents.ChangedEditorStyle, goTextEditorStyle, undefined, NullRect, value, undefined, NullRect);
        }
    }
    //#endregion

    //#region [Property] FamilyName
    public get FamilyName(): string {
        return this.getFamilyName();
    }
    public set FamilyName(value: string) {
        this.setFamilyName(value);
    }

    protected /*virtual*/ getFamilyName(): string {
        return this.myFamilyName;
    }
    protected /*virtual*/ setFamilyName(value: string) {
        const str: string = value || TuText.DefaultFontFamilyName;
        const str1: string = this.myFamilyName;
        if (str1 !== str) {
            this.myFamilyName = str;
            this.resetFont();
            this.Changed(TuTextEvents.ChangedFamilyName, 0, str1, NullRect, 0, str, NullRect);
            this.updateSizeOrScale();
        }
    }
    //#endregion

    //#region [Property] Font

    public get Font(): Font {
        return this.getFont();
    }
    public set Font(value: Font) {
        this.setFont(value);
    }

    protected /*virtual*/ getFont(): Font {
        if (this.myFont == null) {
            let fontStyle: FontStyle = FontStyle.Regular;
            if (this.Bold) {
                fontStyle = fontStyle | FontStyle.Bold;
            }
            if (this.Italic) {
                fontStyle = fontStyle | FontStyle.Italic;
            }
            if (this.Underline) {
                fontStyle = fontStyle | FontStyle.Underline;
            }
            if (this.StrikeThrough) {
                fontStyle = fontStyle | FontStyle.Strikeout;
            }
            this.myFont = this.shareFont(this.FamilyName, this.FontSize, fontStyle);
        }
        return this.myFont;
    }
    protected /*virtual*/ setFont(value: Font) {
        if (value != null) {
            const initializing: boolean = this.Initializing;
            this.Initializing = true;
            this.FamilyName = value.Name;
            this.FontSize = value.Size;
            this.Bold = (value.Style & FontStyle.Bold) !== FontStyle.Regular;
            this.Italic = (value.Style & FontStyle.Italic) !== FontStyle.Regular;
            this.Underline = (value.Style & FontStyle.Underline) !== FontStyle.Regular;
            this.StrikeThrough = (value.Style & FontStyle.Strikeout) !== FontStyle.Regular;
            this.GdiCharSet = value.GdiCharSet;
            this.myFont = value;
            this.Initializing = initializing;
            this.updateSizeOrScale();
        }
    }
    //#endregion

    //#region [Property] FontSize
    public get FontSize(): float {
        return this.getFontSize();
    }
    public set FontSize(value: float) {
        this.setFontSize(value);
    }

    protected /*virtual*/ getFontSize(): float {
        return this.myFontSize;
    }
    protected /*virtual*/ setFontSize(value: float) {
        const single: float = this.myFontSize;
        if (value > 0 && single !== value) {
            this.myFontSize = value;
            this.resetFont();
            this.Changed(TuTextEvents.ChangedFontSize, 0, undefined, GeomUtilities.MakeRect(single), 0, undefined, GeomUtilities.MakeRect(value));
            this.updateSize();
        }
    }
    //#endregion

    //#region [Property] GdiCharSet
    public get GdiCharSet(): byte {
        return this.getGdiCharSet();
    }
    public set GdiCharSet(value: byte) {
        this.setGdiCharSet(value);
    }

    protected /*virtual*/ getGdiCharSet(): byte {
        return (this.myInternalTextFlags & maskGdiCharSet) >> 16;
    }
    protected /*virtual*/ setGdiCharSet(value: byte) {
        const int32: number = (this.myInternalTextFlags & maskGdiCharSet) >> 16;
        const int321: number = value & 255;
        if (int32 !== int321) {
            this.myInternalTextFlags = this.myInternalTextFlags & ~maskGdiCharSet | int321 << 16;
            this.resetFont();
            this.Changed(TuTextEvents.ChangedGdiCharSet, int32, null, NullRect, int321, null, NullRect);
            this.updateSizeOrScale();
        }
    }
    //#endregion

    //#region [Property] InternalTextFlags
    public get InternalTextFlags(): number {
        return this.myInternalTextFlags;
    }
    public set InternalTextFlags(value: number) {
        this.myInternalTextFlags = value;
    }

    //#endregion

    //#region [Property] Italic
    public get Italic(): boolean {
        return this.getItalic();
    }
    public set Italic(value: boolean) {
        this.setItalic(value);
    }

    protected /*virtual*/ getItalic(): boolean {
        return (this.myInternalTextFlags & flagItalic) !== 0;
    }
    protected /*virtual*/ setItalic(value: boolean) {
        const flag: boolean = (this.myInternalTextFlags & flagItalic) !== 0;
        if (flag !== value) {
            if (!value) {
                this.myInternalTextFlags &= ~flagItalic;
            }
            else {
                this.myInternalTextFlags |= flagItalic;
            }
            this.resetFont();
            this.Changed(TuTextEvents.ChangedItalic, 0, flag, NullRect, 0, value, NullRect);
            this.updateSizeOrScale();
        }
    }
    //#endregion

    public get LineCount(): number {
        return this.myNumLines;
    }


    //#region [Property] Location
    public /*override*/ getLocation(): CGPoint {
        return this.GetSpotLocation(this.Alignment);
    }

    public /*override*/ setLocation(value: CGPoint) {
        this.setSpotLocation(this.Alignment, value);
    }
    //#endregion

    //#region [Property] Maximum
    public get Maximum(): number {
        return this.getMaximum();
    }
    public set Maximum(value: number) {
        this.setMaximum(value);
    }

    protected /*virtual*/ getMaximum(): number {
        return this.myMaximum;
    }
    protected /*virtual*/ setMaximum(value: number) {
        const int32: number = this.myMaximum;
        if (int32 !== value) {
            this.myMaximum = value;
            this.Changed(TuTextEvents.ChangedMaximum, int32, undefined, NullRect, value, undefined, NullRect);
        }
    }
    //#endregion

    //#region [Property] Minimum
    public get Minimum(): number {
        return this.getMinimum();
    }
    public set Minimum(value: number) {
        this.setMinimum(value);
    }

    protected /*virtual*/ getMinimum(): number {
        return this.myMinimum;
    }
    protected /*virtual*/ setMinimum(value: number) {
        const int32: number = this.myMinimum;
        if (int32 !== value) {
            this.myMinimum = value;
            this.Changed(TuTextEvents.ChangedMinimum, int32, undefined, NullRect, value, undefined, NullRect);
        }
    }
    //#endregion

    //#region [Property] Multiline
    public get Multiline(): boolean {
        return this.getMultiline();
    }
    public set Multiline(value: boolean) {
        this.setMultiline(value);
    }

    protected /*virtual*/ getMultiline(): boolean {
        return (this.myInternalTextFlags & flagMultiline) !== 0;
    }
    protected /*virtual*/ setMultiline(value: boolean) {
        const flag: boolean = (this.myInternalTextFlags & flagMultiline) !== 0;
        if (flag != value) {
            if (!value) {
                this.myInternalTextFlags &= ~flagMultiline;
            }
            else {
                this.myInternalTextFlags |= flagMultiline;
            }
            this.Changed(TuTextEvents.ChangedMultiline, 0, flag, NullRect, 0, value, NullRect);
            this.updateSizeOrScale();
        }
    }
    //#endregion

    //#region [Property] RightToLeft
    public get RightToLeft(): boolean {
        return this.getRightToLeft();
    }
    public set RightToLeft(value: boolean) {
        this.setRightToLeft(value);
    }

    protected /*virtual*/ getRightToLeft(): boolean {
        return (this.myInternalTextFlags & flagRightToLeft) !== 0;
    }
    protected /*virtual*/ setRightToLeft(value: boolean) {
        const flag: boolean = (this.myInternalTextFlags & flagRightToLeft) !== 0;
        if (flag !== value) {
            if (!value) {
                this.myInternalTextFlags &= ~flagRightToLeft;
            }
            else {
                this.myInternalTextFlags |= flagRightToLeft;
            }
            this.Changed(TuTextEvents.ChangedRightToLeft, 0, flag, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] RightToLeftFromView
    public get RightToLeftFromgetView(): boolean {
        return this.getRightToLeftFromgetView();
    }
    public set RightToLeftFromView(value: boolean) {
        this.setRightToLeftFromView(value);
    }

    protected /*virtual*/ getRightToLeftFromgetView(): boolean {
        return (this.myInternalTextFlags & flagRightToLeftFromView) !== 0;
    }
    protected /*virtual*/ setRightToLeftFromView(value: boolean) {
        const flag: boolean = (this.myInternalTextFlags & flagRightToLeftFromView) !== 0;
        if (flag !== value) {
            if (!value) {
                this.myInternalTextFlags &= ~flagRightToLeftFromView;
            }
            else {
                this.myInternalTextFlags |= flagRightToLeftFromView;
            }
            this.Changed(TuTextEvents.ChangedRightToLeftFromView, 0, flag, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] StrikeThrough
    public get StrikeThrough(): boolean {
        return this.getStrikeThrough();
    }
    public set StrikeThrough(value: boolean) {
        this.setStrikeThrough(value);
    }

    protected /*virtual*/ getStrikeThrough(): boolean {
        return (this.myInternalTextFlags & flagStrikeThrough) !== 0;
    }
    protected /*virtual*/ setStrikeThrough(value: boolean) {
        const flag: boolean = (this.myInternalTextFlags & flagStrikeThrough) !== 0;
        if (flag !== value) {
            if (!value) {
                this.myInternalTextFlags &= ~flagStrikeThrough;
            }
            else {
                this.myInternalTextFlags |= flagStrikeThrough;
            }
            this.resetFont();
            this.Changed(TuTextEvents.ChangedStrikeThrough, 0, flag, NullRect, 0, value, NullRect);
            this.updateSizeOrScale();
        }
    }
    //#endregion

    //#region [Property] StringTrimming
    public get StringTrimming(): StringTrimming {
        return this.getStringTrimming();
    }
    public set StringTrimming(value: StringTrimming) {
        this.setStringTrimming(value);
    }

    protected /*virtual*/ getStringTrimming(): StringTrimming {
        return ((this.myInternalTextFlags & maskStringTrimming) >> 24);
    }
    protected /*virtual*/ setStringTrimming(value: StringTrimming) {
        const int32: number = (this.myInternalTextFlags & maskStringTrimming) >> 24;
        const int321: number = (value & StringTrimming.Character | StringTrimming.Word | StringTrimming.EllipsisCharacter | StringTrimming.EllipsisWord | StringTrimming.EllipsisPath);
        if (int32 !== int321) {
            this.myInternalTextFlags = this.myInternalTextFlags & ~maskStringTrimming | int321 << 24;
            this.resetFont();
            this.Changed(TuTextEvents.ChangedStringTrimming, int32, undefined, NullRect, int321, undefined, NullRect);
        }
    }
    //#endregion

    //#region [Property] Text
    public get Text(): string {
        return this.getText();
    }
    public set Text(value: string) {
        this.setText(value);
    }

    protected /*virtual*/ getText(): string {
        return this.myString;
    }
    protected /*virtual*/ setText(value: string) {
        console.log('TuText set:  ', value);
        const str: string = value || '';
        const str1: string = this.myString;
        if (str1 !== str) {
            this.myString = str;
            this.Changed(TuTextEvents.ChangedText, 0, str1, NullRect, 0, str, NullRect);
            this.updateSizeOrScale();
        }
    }
    //#endregion

    //#region [Property] TextColor
    public get TextColor(): CGColor {
        return this.getTextColor();
    }
    public set TextColor(value: CGColor) {
        this.setTextColor(value);
    }

    protected /*virtual*/ getTextColor(): CGColor {
        return this.myTextColor;
    }
    protected /*virtual*/ setTextColor(value: CGColor) {
        const color: CGColor = this.myTextColor;
        if (color.notEquals(value)) {
            this.myTextColor = value;
            this.Changed(TuTextEvents.ChangedTextColor, 0, color, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] TransparentBackground
    public get TransparentBackground(): boolean {
        return this.getTransparentBackground();
    }
    public set TransparentBackground(value: boolean) {
        this.setTransparentBackground(value);
    }

    protected /*virtual*/ getTransparentBackground(): boolean {
        return (this.myInternalTextFlags & flagTransparentBackground) !== 0;
    }
    protected /*virtual*/ setTransparentBackground(value: boolean) {
        const flag: boolean = (this.myInternalTextFlags & flagTransparentBackground) !== 0;
        if (flag !== value) {
            if (!value) {
                this.myInternalTextFlags &= ~flagTransparentBackground;
            }
            else {
                this.myInternalTextFlags |= flagTransparentBackground;
            }
            this.Changed(TuTextEvents.ChangedTransparentBackground, 0, flag, NullRect, 0, value, NullRect);
        }
    }
    protected /*virtual*/ transparentBackground(value?: boolean): boolean { throw error('Will Implement getter and setters'); }
    //#endregion

    //#region [Property] Underline
    public get Underline(): boolean {
        return this.getUnderline();
    }
    public set Underline(value: boolean) {
        this.setUnderline(value);
    }

    protected /*virtual*/ getUnderline(): boolean {
        return (this.myInternalTextFlags & flagUnderline) !== 0;
    }
    protected /*virtual*/ setUnderline(value: boolean) {
        const flag: boolean = (this.myInternalTextFlags & flagUnderline) !== 0;
        if (flag !== value) {
            if (!value) {
                this.myInternalTextFlags &= ~flagUnderline;
            }
            else {
                this.myInternalTextFlags |= flagUnderline;
            }
            this.resetFont();
            this.Changed(TuTextEvents.ChangedUnderline, 0, flag, NullRect, 0, value, NullRect);
            this.updateSizeOrScale();
        }
    }
    //#endregion

    //#region [Property] Wrapping
    public get Wrapping(): boolean {
        return this.getWrapping();
    }
    public set Wrapping(value: boolean) {
        this.setWrapping(value);
    }

    protected /*virtual*/ getWrapping(): boolean {
        return (this.myInternalTextFlags & flagWrapping) !== 0;
    }
    protected /*virtual*/ setWrapping(value: boolean) {
        const flag: boolean = (this.myInternalTextFlags & flagWrapping) !== 0;
        if (flag !== value) {
            if (!value) {
                this.myInternalTextFlags &= ~flagWrapping;
            }
            else {
                this.myInternalTextFlags |= flagWrapping;
            }
            this.Changed(TuTextEvents.ChangedWrapping, 0, flag, NullRect, 0, value, NullRect);
            this.updateSizeOrScale();
        }
    }
    protected /*virtual*/ wrapping(value?: boolean): boolean { throw error('Will Implement getter and setters'); }
    //#endregion

    //#region [Property] WrappingWidth
    public get WrappingWidth(): float {
        return this.getWrappingWidth();
    }
    public set WrappingWidth(value: float) {
        this.setWrappingWidth(value);
    }

    protected /*virtual*/ getWrappingWidth(): float {
        return this.myWrappingWidth;
    }
    protected /*virtual*/ setWrappingWidth(value: float) {
        const single: float = this.myWrappingWidth;
        if (value > 0 && single !== value) {
            this.myWrappingWidth = value;
            this.Changed(TuTextEvents.ChangedWrappingWidth, 0, undefined, GeomUtilities.MakeRect(single), 0, undefined, GeomUtilities.MakeRect(value));
            this.updateSizeOrScale();
        }
    }
    //#endregion



    public /*override*/ AddSelectionHandles(sel: TuSelection, selectedObj: TuObject): void {
        if (!this.BackgroundOpaqueWhenSelected) {
            super.AddSelectionHandles(sel, selectedObj);
            return;
        }
        super.RemoveSelectionHandles(sel);
        const skipsUndoManager: boolean = this.SkipsUndoManager;
        this.SkipsUndoManager = true;
        this.TransparentBackground = false;
        this.SkipsUndoManager = skipsUndoManager;
    }

    public /*override*/ ChangeValue(e: TuChangedEventArgs, undo: boolean): void {
        switch (e.SubHint) {
            case TuTextEvents.ChangedText:
                {
                    this.Text = e.getValue(undo);
                    return;
                }
            case TuTextEvents.ChangedFamilyName:
                {
                    this.FamilyName = e.getValue(undo);
                    return;
                }
            case TuTextEvents.ChangedFontSize:
                {
                    this.FontSize = e.getFloat(undo);
                    return;
                }
            case TuTextEvents.ChangedAlignment:
                {
                    this.Alignment = e.getValue(undo);
                    return;
                }
            case TuTextEvents.ChangedTextColor:
                {
                    this.TextColor = e.getValue(undo);
                    return;
                }
            case TuTextEvents.ChangedBackgroundColor:
                {
                    this.BackgroundColor = e.getValue(undo);
                    return;
                }
            case TuTextEvents.ChangedTransparentBackground:
                {
                    this.TransparentBackground = e.getValue(undo);
                    return;
                }
            case TuTextEvents.ChangedBold:
                {
                    this.Bold = e.getValue(undo);
                    return;
                }
            case TuTextEvents.ChangedItalic:
                {
                    this.Italic = e.getValue(undo);
                    return;
                }
            case TuTextEvents.ChangedUnderline:
                {
                    this.Underline = e.getValue(undo);
                    return;
                }
            case TuTextEvents.ChangedStrikeThrough:
                {
                    this.StrikeThrough = e.getValue(undo);
                    return;
                }
            case TuTextEvents.ChangedMultiline:
                {
                    this.Multiline = e.getValue(undo);
                    return;
                }
            case TuTextEvents.ChangedBackgroundOpaqueWhenSelected:
                {
                    this.BackgroundOpaqueWhenSelected = e.getValue(undo);
                    return;
                }
            case TuTextEvents.ChangedClipping:
                {
                    this.Clipping = e.getValue(undo);
                    return;
                }
            case TuTextEvents.ChangedAutoResizes:
                {
                    this.AutoResizes = e.getValue(undo);
                    return;
                }
            case TuTextEvents.ChangedWrapping:
                {
                    this.Wrapping = e.getValue(undo);
                    return;
                }
            case TuTextEvents.ChangedWrappingWidth:
                {
                    this.WrappingWidth = e.getFloat(undo);
                    return;
                }
            case TuTextEvents.ChangedGdiCharSet:
                {
                    this.GdiCharSet = e.getInt(undo);
                    return;
                }
            case TuTextEvents.ChangedEditorStyle:
                {
                    this.EditorStyle = e.getValue(undo);
                    return;
                }
            case TuTextEvents.ChangedMinimum:
                {
                    this.Minimum = e.getInt(undo);
                    return;
                }
            case TuTextEvents.ChangedMaximum:
                {
                    this.Maximum = e.getInt(undo);
                    return;
                }
            case TuTextEvents.ChangedDropDownList:
                {
                    this.DropDownList = e.getValue(undo);
                    return;
                }
            case TuTextEvents.ChangedChoices:
                {
                    this.Choices = e.getValue(undo);
                    return;
                }
            case TuTextEvents.ChangedRightToLeft:
                {
                    this.RightToLeft = e.getValue(undo);
                    return;
                }
            case TuTextEvents.ChangedRightToLeftFromView:
                {
                    this.RightToLeftFromView = e.getValue(undo);
                    return;
                }
            case TuTextEvents.ChangedBordered:
                {
                    this.Bordered = e.getValue(undo);
                    return;
                }
            case TuTextEvents.ChangedStringTrimming:
                {
                    this.StringTrimming = e.getInt(undo);
                    return;
                }
            case TuTextEvents.ChangedEditableWhenSelected:
                {
                    this.EditableWhenSelected = e.getValue(undo);
                    return;
                }
            default:
                {
                    super.ChangeValue(e, undo);
                    return;
                }
        }
    }

    public /*virtual*/  computeEdit(oldtext: string, newtext: string): string {
        return newtext;
    }

    private computeHeight(g: Graphics, font: Font, maxw: float): float {
        let text: string = this.Text;
        const lineHeight: float = this.getLineHeight(font);
        if (text.length === 0) {
            this.myNumLines = 1;
            return lineHeight;
        }
        if (!this.Multiline) {
            const int32: number = this.findFirstLineBreak(text, 0);
            if (int32 >= 0) {
                text = text.substr(0, int32);
            }
        }
        const stringFormat: StringFormat = this.getStringFormat(undefined);
        let height: float = 0;
        this.myNumLines = 0;
        let int321: number = 0;
        let length: number = -1;
        const int322: Out<number> = { value: 0 };
        let flag: boolean = false;
        while (!flag) {
            length = this.findFirstLineBreak(text, int321, int322);
            if (length === -1) {
                length = text.length;
                flag = true;
            }
            if (int321 <= length) {
                const str: string = text.substr(int321, length - int321);
                if (str.length <= 0) {
                    height = height + lineHeight;
                    this.myNumLines = (this.myNumLines + 1);
                }
                else if (!this.Wrapping) {
                    height = height + lineHeight;
                    this.myNumLines = this.myNumLines + 1;
                }
                else {
                    const sizeF: CGSize = new CGSize(maxw, 1E+09);
                    const int323: Out<number> = { value: 0 };
                    const sizeF1: CGSize = this.measureString(str, g, font, stringFormat, sizeF, int323);
                    height = height + sizeF1.Height;
                    this.myNumLines = this.myNumLines + int323.value;
                }
            }
            int321 = int322.value;
        }
        return height;
    }

    private computeWidth(g: Graphics, font: Font): float {
        let text: string = this.Text;
        if (text.length === 0) {
            return 0;
        }
        const stringFormat: StringFormat = TuText.myStandardStringFormat;
        if (!this.Multiline) {
            const int32: number = this.findFirstLineBreak(text, 0);
            if (int32 >= 0) {
                text = text.substr(0, int32);
            }
            const stringWidth: float = this.getStringWidth(text, g, font, stringFormat);
            if (!this.Wrapping || stringWidth <= this.WrappingWidth) {
                return stringWidth;
            }
            return this.WrappingWidth;
        }
        let single: float = 0;
        let int321: number = 0;
        let flag: boolean = false;
        let int322: Out<number> = { value: 0 };
        while (!flag) {
            let length: number = this.findFirstLineBreak(text, int321, int322);
            if (length === -1) {
                length = text.length;
                flag = true;
            }
            const str: string = text.substr(int321, length - int321);
            const stringWidth1: float = this.getStringWidth(str, g, font, stringFormat);
            if (this.Wrapping && stringWidth1 > this.WrappingWidth) {
                return this.WrappingWidth;
            }
            if (stringWidth1 > single) {
                single = stringWidth1;
            }
            int321 = int322.value;
        }
        return single;
    }

    public /*override*/ copyObject(env: TuCopyDictionary): TuObject {
        const goText: TuText = as(super.CopyObject(env), Types.TuText);
        if (goText != null) {
            goText.myEditor = undefined;
        }
        return goText;
    }

    public /*override*/ CreateEditor(view: TuView): TuControl {
        let alignment: Spot;
        const goControl: TuControl = new TuControl();
        let width: float = 1;
        let height: float = 1;
        if (view != null) {
            width = view.WorldScale.Width;
            height = view.WorldScale.Height;
        }
        if (this.EditorStyle === TuTextEditorStyle.NumericUpDown) {
            goControl.ControlType = typeOf((<any>TuText).NumericUpDownControl);
            const bounds: CGRectangle = this.Bounds.clone();
            bounds.X = bounds.X - 2 / width;
            bounds.Y = bounds.Y - 2 / height;
            bounds.Width = bounds.Width + 36 / width;
            bounds.Height = bounds.Height + 8 / height;
            goControl.Bounds = bounds.clone();
            return goControl;
        }
        if (this.EditorStyle === TuTextEditorStyle.ComboBox) {
            goControl.ControlType = typeOf((<any>TuText).ComboBoxControl);
            const x: CGRectangle = this.Bounds.clone();
            x.X = x.X - 2 / width;
            x.Y = x.Y - 2 / height;
            x.Width = x.Width + 4 / width;
            x.Height = x.Height + 4 / height;
            if (view != null) {
                const stringFormat: StringFormat = this.getStringFormat(view);
                let docScale: float = x.Width;
                docScale = docScale * view.DocScale;
                const graphic: Graphics = (view as any).createGraphics();
                const font: Font = this.Font;
                let size: float = font.Size;
                if (view != null) {
                    size = size * (view.DocScale / height);
                }
                const font1: Font = this.makeFont(font.Name, size, font.Style);
                if (graphic != null) {
                    foreach(this.Choices, (choice: any) => {
                        const str: string = choice.toString();
                        docScale = Math.max(docScale, this.getStringWidth(str, graphic, font1, stringFormat));
                    });

                    graphic.dispose();
                }
                font1.Dispose();
                docScale = docScale + 30 / width;
                x.Width = docScale / view.DocScale;
            }
            goControl.Bounds = x;
            return goControl;
        }
        goControl.ControlType = typeOf(Types.TextBoxControl);
        const y: CGRectangle = this.Bounds;
        y.X = y.X - 2 / width;
        y.Y = y.Y - 2 / height;
        y.Width = y.Width + 4 / width;
        y.Height = y.Height + 4 / height;
        if (this.Multiline || this.Wrapping) {
            y.Height = y.Height + this.getLineHeight(this.Font) * 2;
        }
        if (!this.Wrapping) {
            alignment = this.Alignment;
            if (alignment.ID <= 16) {
                switch (alignment) {
                    case Middle:
                    case MiddleCenter:
                        {
                            y.X = y.X - 15 / width;
                            y.Width = y.Width + 30 / width;
                            goControl.Bounds = y;
                            return goControl;
                        }
                    case TopLeft:

                    case TopRight:
                        {
                            if (!this.isRightToLeft(view)) {
                                y.X = y.X - 30 / width;
                            }
                            y.Width = y.Width + 30 / width;
                            goControl.Bounds = y;
                            return goControl;
                        }
                    default:
                        {
                            if (alignment === BottomRight) {
                                if (!this.isRightToLeft(view)) {
                                    y.X = y.X - 30 / width;
                                }
                                y.Width = y.Width + 30 / width;
                                goControl.Bounds = y;
                                return goControl;
                            }
                            if (alignment === BottomLeft) {
                                break;
                            }
                            break;
                        }
                }
            }
            else if (alignment.ID > 64) {
                if (alignment === MiddleBottom) {
                    y.X = y.X - 15 / width;
                    y.Width = y.Width + 30 / width;
                    goControl.Bounds = y;
                    return goControl;
                }
            }
            else {
                if (alignment === MiddleTop || alignment === TopCenter) {
                    y.X = y.X - 15 / width;
                    y.Width = y.Width + 30 / width;
                    goControl.Bounds = y;
                    return goControl;
                }
                if (alignment === MiddleRight) {
                    if (!this.isRightToLeft(view)) {
                        y.X = y.X - 30 / width;
                    }
                    y.Width = y.Width + 30 / width;
                    goControl.Bounds = y;
                    return goControl;
                }
            }
            if (this.isRightToLeft(view)) {
                y.X = y.X - 30 / width;
                y.Width = y.Width + 30 / width;
                goControl.Bounds = y;
                return goControl;
            }
            else {
                y.Width = y.Width + 30 / width;
                goControl.Bounds = y;
                return goControl;
            }
        }
        else {
            alignment = this.Alignment;
            if (alignment.ID <= 16) {
                switch (alignment) {
                    case Middle:
                        {
                            y.X = y.X + y.Width / 2 - this.WrappingWidth / 2 - 2 / width;
                            y.Width = Math.max(this.WrappingWidth + 4 / width, y.Width);
                            goControl.Bounds = y;
                            return goControl;
                        }
                    case TopLeft:
                        {
                            break;
                        }
                    case TopRight:
                        {
                            if (!this.isRightToLeft(view)) {
                                y.X = y.X + y.Width - this.WrappingWidth - 2 / width;
                            }
                            y.Width = Math.max(this.WrappingWidth + 4 / width, y.Width);
                            goControl.Bounds = y;
                            return goControl;
                        }
                    default:
                        {
                            if (alignment === BottomRight) {
                                if (!this.isRightToLeft(view)) {
                                    y.X = y.X + y.Width - this.WrappingWidth - 2 / width;
                                }
                                y.Width = Math.max(this.WrappingWidth + 4 / width, y.Width);
                                goControl.Bounds = y;
                                return goControl;
                            }
                            if (alignment === BottomLeft) {
                                break;
                            }
                            break;
                        }
                }
            }
            else if (alignment.ID > 64) {
                if (alignment === MiddleBottom) {
                    y.X = y.X + y.Width / 2 - this.WrappingWidth / 2 - 2 / width;
                    y.Width = Math.max(this.WrappingWidth + 4 / width, y.Width);
                    goControl.Bounds = y;
                    return goControl;
                }
            }
            else {
                if (alignment === MiddleTop) {
                    y.X = y.X + y.Width / 2 - this.WrappingWidth / 2 - 2 / width;
                    y.Width = Math.max(this.WrappingWidth + 4 / width, y.Width);
                    goControl.Bounds = y;
                    return goControl;
                }
                if (alignment === MiddleRight) {
                    if (!this.isRightToLeft(view)) {
                        y.X = y.X + y.Width - this.WrappingWidth - 2 / width;
                    }
                    y.Width = Math.max(this.WrappingWidth + 4 / width, y.Width);
                    goControl.Bounds = y;
                    return goControl;
                }
            }
            if (this.isRightToLeft(view)) {
                y.X = y.X + y.Width - this.WrappingWidth - 2 / width;
                y.Width = Math.max(this.WrappingWidth + 4 / width, y.Width);
                goControl.Bounds = y;
                return goControl;
            }
            else {
                y.Width = Math.max(this.WrappingWidth + 4 / width, y.Width);
                goControl.Bounds = y;
                return goControl;
            }
        }
        goControl.Bounds = y;
        return goControl;
    }

    public /*override*/ DoBeginEdit(view: TuView): void {
        if (view == null) {
            return;
        }
        if (this.Editor != null) {
            return;
        }
        try {
            view.startTransaction();
            this.removeSelectionHandles(view.Selection);
            this.myEditor = this.CreateEditor(view);
            this.Editor.EditedObject = this;
            view.EditControl = this.Editor;
            const control: TComponent = this.Editor.getControl(view);
            if (control != null) {
                (control as any).focus();
            }
        }
        catch (verificationException) {
            trace(TString.Concat("TuText DoBeginEdit: ", verificationException.toString()));
            view.EditControl = undefined;
            this.myEditor = undefined;
            view.AbortTransaction();
        }

    }

    public /*virtual*/ doEdit(view: TuView, oldtext: string, newtext: string): boolean {
        this.Text = this.computeEdit(oldtext, newtext);
        return true;
    }

    public /*override*/  DoEndEdit(view: TuView): void {
        if (this.Editor != null) {
            this.Editor.EditedObject = undefined;
            if (view != null) {
                view.EditControl = undefined;
            }
            this.myEditor = undefined;
            if (view != null) {
                view.raiseObjectEdited(this);
                view.finishTransaction("Text Edit");
            }
        }
    }

    private drawString(str: string, g: Graphics, view: TuView, font: Font, br: Brush, rect: CGRectangle, fmt: StringFormat): void {
        g.drawString(str, font, br, rect, fmt);
    }

    public /*override*/ ExpandPaintBounds(rect: CGRectangle, view: TuView): CGRectangle {
        if (this.Shadowed) {
            const shadowOffset: CGSize = this.GetShadowOffset(view);
            if (shadowOffset.Width >= 0) {
                rect.Width = rect.Width + shadowOffset.Width;
            }
            else {
                rect.X = rect.X + shadowOffset.Width;
                rect.Width = rect.Width - shadowOffset.Width;
            }
            if (shadowOffset.Height >= 0) {
                rect.Height = rect.Height + shadowOffset.Height;
            }
            else {
                rect.Y = rect.Y + shadowOffset.Height;
                rect.Height = rect.Height - shadowOffset.Height;
            }
        }
        const outRect: Out<CGRectangle> = { value: rect };
        GeomUtilities.InflateRect(outRect, Math.max(rect.Height / 3, 2), 30);
        return outRect.value;
    }


    private findFirstLineBreak(str: string, start: number): number;
    private findFirstLineBreak(str: string, start: number, nextline: Out<number>): number;
    private findFirstLineBreak(...args: any[]): number {
        if (args.length === 2) {
            const int32: Out<number> = { value: 0 };
            return this.findFirstLineBreak(args[0], args[1], int32);
        } else if (args.length === 3) {
            const str: string = args[0];
            const int32: number = TString.IndexOfAny(str, TuText.myNewlineArray, args[1]);
            if (int32 >= 0) {
                if (args[0][int32] != '\r' || (int32 + 1) >= args[0].length || args[0][int32 + 1] !== '\n') {
                    args[2].value = int32 + 1;
                }
                else {
                    args[2].value = int32 + 2;
                }
            }
            return int32;
        }
    }

    private findLargestFont(g: Graphics, rect: CGRectangle, minfsize: float, maxfsize: float): Font {
        if (minfsize <= 0) {
            minfsize = 0.01;
        }
        const name: string = this.Font.Name;
        const style: FontStyle = this.Font.Style;
        let single: float = 10;
        let font: Font = undefined;
        while (single <= maxfsize) {
            const font1: Font = this.makeFont(name, single, style);
            font = font1;
            if (!this.fitsInBox(g, font1, rect) || font == null) {
                break;
            }
            font.Dispose();
            single = single + 1;
        }
        if (font != null) {
            font.Dispose();
        }
        single = single - 0.1;
        while (true) {
            const font2: Font = this.makeFont(name, single, style);
            font = font2;
            if (this.fitsInBox(g, font2, rect) || single <= minfsize + 0.1 || font == null) {
                break;
            }
            font.Dispose();
            single = single - 0.1;
        }
        return font;
    }

    private fitsInBox(g: Graphics, font: Font, rect: CGRectangle): boolean {
        const single: float = this.computeWidth(g, font);
        if (rect.Width < single) {
            return false;
        }
        const single1: float = this.computeHeight(g, font, rect.Width);
        if (rect.Height < single1) {
            return false;
        }
        return true;
    }

    private getLineHeight(font: Font) {
        //return font.getHeight();
        return GetFontHeight(font);
    }

    private getLineLeading(font: Font): float {
        // TODO: implementasyonu düzelt. Aşağida fontfamily undefined olduğu için
        // height döndürüldü.
        const fontFamily: FontFamily = <any>font.FontFamily;

        const style: FontStyle = font.Style;
        const size: float = font.Size;
        const lineSpacing: number = fontFamily ? fontFamily.getLineSpacing(style) : 1;
        const emHeight: number = fontFamily ? fontFamily.getEmHeight(style) : 1;
        return size * (lineSpacing - emHeight) / emHeight * 2 / 3;
    }

    private getStringFormat(view: TuView): StringFormat {
        let formatFlags: StringFormat;
        let stringFormat: StringFormat;
        let formatFlags1: StringFormat;
        let stringFormat1: StringFormat;
        if (this.myStringFormat == null) {
            this.myStringFormat = new StringFormat(TuText.myStandardStringFormat);
        }
        this.myStringFormat.Trimming = this.StringTrimming;
        if (this.StringTrimming !== StringTrimming.None) {
            const formatFlags2: StringFormat = this.myStringFormat;
            formatFlags2.FormatFlags = formatFlags2.FormatFlags | StringFormatFlags.LineLimit;
        }
        else {
            const stringFormat2: StringFormat = this.myStringFormat;
            stringFormat2.FormatFlags = stringFormat2.FormatFlags & (StringFormatFlags.DirectionRightToLeft | StringFormatFlags.DirectionVertical | StringFormatFlags.FitBlackBox |
                StringFormatFlags.DisplayFormatControl | StringFormatFlags.NoFontFallback | StringFormatFlags.MeasureTrailingSpaces | StringFormatFlags.NoWrap | StringFormatFlags.NoClip);
        }
        const alignment: Spot = this.Alignment;
        if (alignment.ID <= 16) {
            switch (alignment) {
                case Middle:
                    {
                        this.myStringFormat.Alignment = StringAlignment.Center;
                        if (!this.isRightToLeft(view)) {
                            formatFlags = this.myStringFormat;
                            formatFlags.FormatFlags = formatFlags.FormatFlags & (StringFormatFlags.DirectionVertical | StringFormatFlags.FitBlackBox |
                                StringFormatFlags.DisplayFormatControl | StringFormatFlags.NoFontFallback | StringFormatFlags.MeasureTrailingSpaces |
                                StringFormatFlags.NoWrap | StringFormatFlags.LineLimit | StringFormatFlags.NoClip);
                        }
                        else {
                            stringFormat1 = this.myStringFormat;
                            stringFormat1.FormatFlags = stringFormat1.FormatFlags | StringFormatFlags.DirectionRightToLeft;
                        }
                        if (!this.Wrapping) {
                            stringFormat = this.myStringFormat;
                            stringFormat.FormatFlags = stringFormat.FormatFlags | StringFormatFlags.NoWrap;
                        }
                        else {
                            formatFlags1 = this.myStringFormat;
                            formatFlags1.FormatFlags = formatFlags1.FormatFlags & (StringFormatFlags.DirectionRightToLeft | StringFormatFlags.DirectionVertical |
                                StringFormatFlags.FitBlackBox | StringFormatFlags.DisplayFormatControl | StringFormatFlags.NoFontFallback | StringFormatFlags.MeasureTrailingSpaces |
                                StringFormatFlags.LineLimit | StringFormatFlags.NoClip);
                        }
                        return this.myStringFormat;
                    }
                case TopLeft:
                    {
                        break;
                    }
                case TopRight:
                    {
                        this.myStringFormat.Alignment = StringAlignment.Far;
                        if (!this.isRightToLeft(view)) {
                            formatFlags = this.myStringFormat;
                            formatFlags.FormatFlags = formatFlags.FormatFlags & (StringFormatFlags.DirectionVertical | StringFormatFlags.FitBlackBox |
                                StringFormatFlags.DisplayFormatControl | StringFormatFlags.NoFontFallback | StringFormatFlags.MeasureTrailingSpaces |
                                StringFormatFlags.NoWrap | StringFormatFlags.LineLimit | StringFormatFlags.NoClip);
                        }
                        else {
                            stringFormat1 = this.myStringFormat;
                            stringFormat1.FormatFlags = stringFormat1.FormatFlags | StringFormatFlags.DirectionRightToLeft;
                        }
                        if (!this.Wrapping) {
                            stringFormat = this.myStringFormat;
                            stringFormat.FormatFlags = stringFormat.FormatFlags | StringFormatFlags.NoWrap;
                        }
                        else {
                            formatFlags1 = this.myStringFormat;
                            formatFlags1.FormatFlags = formatFlags1.FormatFlags & (StringFormatFlags.DirectionRightToLeft | StringFormatFlags.DirectionVertical |
                                StringFormatFlags.FitBlackBox | StringFormatFlags.DisplayFormatControl | StringFormatFlags.NoFontFallback | StringFormatFlags.MeasureTrailingSpaces |
                                StringFormatFlags.LineLimit | StringFormatFlags.NoClip);
                        }
                        return this.myStringFormat;
                    }
                default:
                    {
                        if (alignment === BottomRight) {
                            this.myStringFormat.Alignment = StringAlignment.Far;
                            if (!this.isRightToLeft(view)) {
                                formatFlags = this.myStringFormat;
                                formatFlags.FormatFlags = formatFlags.FormatFlags & (StringFormatFlags.DirectionVertical | StringFormatFlags.FitBlackBox |
                                    StringFormatFlags.DisplayFormatControl | StringFormatFlags.NoFontFallback |
                                    StringFormatFlags.MeasureTrailingSpaces | StringFormatFlags.NoWrap | StringFormatFlags.LineLimit | StringFormatFlags.NoClip);
                            }
                            else {
                                stringFormat1 = this.myStringFormat;
                                stringFormat1.FormatFlags = stringFormat1.FormatFlags | StringFormatFlags.DirectionRightToLeft;
                            }
                            if (!this.Wrapping) {
                                stringFormat = this.myStringFormat;
                                stringFormat.FormatFlags = stringFormat.FormatFlags | StringFormatFlags.NoWrap;
                            }
                            else {
                                formatFlags1 = this.myStringFormat;
                                formatFlags1.FormatFlags = formatFlags1.FormatFlags & (StringFormatFlags.DirectionRightToLeft | StringFormatFlags.DirectionVertical |
                                    StringFormatFlags.FitBlackBox | StringFormatFlags.DisplayFormatControl | StringFormatFlags.NoFontFallback | StringFormatFlags.MeasureTrailingSpaces |
                                    StringFormatFlags.LineLimit | StringFormatFlags.NoClip);
                            }
                            return this.myStringFormat;
                        }
                        if (alignment === BottomLeft) {
                            break;
                        }
                        break;
                    }
            }
        }
        else if (alignment.ID > 64) {
            if (alignment === MiddleBottom || alignment === BottomCenter) {
                this.myStringFormat.Alignment = StringAlignment.Center;
                if (!this.isRightToLeft(view)) {
                    formatFlags = this.myStringFormat;
                    formatFlags.FormatFlags = formatFlags.FormatFlags & (StringFormatFlags.DirectionVertical | StringFormatFlags.FitBlackBox |
                        StringFormatFlags.DisplayFormatControl | StringFormatFlags.NoFontFallback | StringFormatFlags.MeasureTrailingSpaces |
                        StringFormatFlags.NoWrap | StringFormatFlags.LineLimit | StringFormatFlags.NoClip);
                }
                else {
                    stringFormat1 = this.myStringFormat;
                    stringFormat1.FormatFlags = stringFormat1.FormatFlags | StringFormatFlags.DirectionRightToLeft;
                }
                if (!this.Wrapping) {
                    stringFormat = this.myStringFormat;
                    stringFormat.FormatFlags = stringFormat.FormatFlags | StringFormatFlags.NoWrap;
                }
                else {
                    formatFlags1 = this.myStringFormat;
                    formatFlags1.FormatFlags = formatFlags1.FormatFlags & (StringFormatFlags.DirectionRightToLeft | StringFormatFlags.DirectionVertical |
                        StringFormatFlags.FitBlackBox | StringFormatFlags.DisplayFormatControl | StringFormatFlags.NoFontFallback |
                        StringFormatFlags.MeasureTrailingSpaces | StringFormatFlags.LineLimit | StringFormatFlags.NoClip);
                }
                return this.myStringFormat;
            }
        }
        else {
            if (alignment === MiddleTop || alignment === TopCenter) {
                this.myStringFormat.Alignment = StringAlignment.Center;
                if (!this.isRightToLeft(view)) {
                    formatFlags = this.myStringFormat;
                    formatFlags.FormatFlags = formatFlags.FormatFlags & (StringFormatFlags.DirectionVertical | StringFormatFlags.FitBlackBox | StringFormatFlags.DisplayFormatControl |
                        StringFormatFlags.NoFontFallback | StringFormatFlags.MeasureTrailingSpaces | StringFormatFlags.NoWrap | StringFormatFlags.LineLimit | StringFormatFlags.NoClip);
                }
                else {
                    stringFormat1 = this.myStringFormat;
                    stringFormat1.FormatFlags = stringFormat1.FormatFlags | StringFormatFlags.DirectionRightToLeft;
                }
                if (!this.Wrapping) {
                    stringFormat = this.myStringFormat;
                    stringFormat.FormatFlags = stringFormat.FormatFlags | StringFormatFlags.NoWrap;
                }
                else {
                    formatFlags1 = this.myStringFormat;
                    formatFlags1.FormatFlags = formatFlags1.FormatFlags & (StringFormatFlags.DirectionRightToLeft | StringFormatFlags.DirectionVertical | StringFormatFlags.FitBlackBox |
                        StringFormatFlags.DisplayFormatControl | StringFormatFlags.NoFontFallback | StringFormatFlags.MeasureTrailingSpaces | StringFormatFlags.LineLimit | StringFormatFlags.NoClip);
                }
                return this.myStringFormat;
            }
            if (alignment === MiddleRight) {
                this.myStringFormat.Alignment = StringAlignment.Far;
                if (!this.isRightToLeft(view)) {
                    formatFlags = this.myStringFormat;
                    formatFlags.FormatFlags = formatFlags.FormatFlags & (StringFormatFlags.DirectionVertical | StringFormatFlags.FitBlackBox |
                        StringFormatFlags.DisplayFormatControl | StringFormatFlags.NoFontFallback | StringFormatFlags.MeasureTrailingSpaces |
                        StringFormatFlags.NoWrap | StringFormatFlags.LineLimit | StringFormatFlags.NoClip);
                }
                else {
                    stringFormat1 = this.myStringFormat;
                    stringFormat1.FormatFlags = stringFormat1.FormatFlags | StringFormatFlags.DirectionRightToLeft;
                }
                if (!this.Wrapping) {
                    stringFormat = this.myStringFormat;
                    stringFormat.FormatFlags = stringFormat.FormatFlags | StringFormatFlags.NoWrap;
                }
                else {
                    formatFlags1 = this.myStringFormat;
                    formatFlags1.FormatFlags = formatFlags1.FormatFlags & (StringFormatFlags.DirectionRightToLeft | StringFormatFlags.DirectionVertical |
                        StringFormatFlags.FitBlackBox | StringFormatFlags.DisplayFormatControl | StringFormatFlags.NoFontFallback | StringFormatFlags.MeasureTrailingSpaces |
                        StringFormatFlags.LineLimit | StringFormatFlags.NoClip);
                }
                return this.myStringFormat;
            }
        }
        this.myStringFormat.Alignment = StringAlignment.Near;
        if (!this.isRightToLeft(view)) {
            formatFlags = this.myStringFormat;
            formatFlags.FormatFlags = formatFlags.FormatFlags & (StringFormatFlags.DirectionVertical | StringFormatFlags.FitBlackBox |
                StringFormatFlags.DisplayFormatControl | StringFormatFlags.NoFontFallback | StringFormatFlags.MeasureTrailingSpaces |
                StringFormatFlags.NoWrap | StringFormatFlags.LineLimit | StringFormatFlags.NoClip);
        }
        else {
            stringFormat1 = this.myStringFormat;
            stringFormat1.FormatFlags = stringFormat1.FormatFlags | StringFormatFlags.DirectionRightToLeft;
        }
        if (!this.Wrapping) {
            stringFormat = this.myStringFormat;
            stringFormat.FormatFlags = stringFormat.FormatFlags | StringFormatFlags.NoWrap;
        }
        else {
            formatFlags1 = this.myStringFormat;
            formatFlags1.FormatFlags = formatFlags1.FormatFlags & (StringFormatFlags.DirectionRightToLeft | StringFormatFlags.DirectionVertical |
                StringFormatFlags.FitBlackBox | StringFormatFlags.DisplayFormatControl | StringFormatFlags.NoFontFallback | StringFormatFlags.MeasureTrailingSpaces |
                StringFormatFlags.LineLimit | StringFormatFlags.NoClip);
        }
        return this.myStringFormat;
    }

    private getStringWidth(str: string, g: Graphics, font: Font, fmt: StringFormat): float {
        const _CGPoint: CGPoint = new CGPoint();
        // return g.MeasureString(str, font, _CGPoint, fmt).Width;
        return GetTextWidth(str, font);
    }

    private /*internal*/  isRightToLeft(view: TuView): boolean {
        if (!this.RightToLeftFromView || view == null) {
            return this.RightToLeft;
        }
        return (view as any).RightToLeft === 0 //RightToLeft.Yes;
    }

    private makeFont(name: string, size: float, style: FontStyle): Font {
        const gdiCharSet: byte = Convert.ToByte(this.GdiCharSet);
        let font: Font = undefined;
        try {
            font = new Font(name, size/* , style, GraphicsUnit.Point, gdiCharSet */);
        }
        catch (exception) {
            console.error(exception);
        }
        return font;
    }

    private static MakeStandardStringFormat() {
        const stringFormat: StringFormat = new StringFormat(StringFormat.GenericTypographic)
        stringFormat.FormatFlags = stringFormat.FormatFlags | StringFormatFlags.MeasureTrailingSpaces;
        stringFormat.FormatFlags = stringFormat.FormatFlags & (StringFormatFlags.DirectionRightToLeft | StringFormatFlags.DirectionVertical |
            StringFormatFlags.FitBlackBox | StringFormatFlags.DisplayFormatControl | StringFormatFlags.NoFontFallback | StringFormatFlags.MeasureTrailingSpaces | StringFormatFlags.NoWrap | StringFormatFlags.NoClip);
        return stringFormat;
    }

    private measureString(str: string, g: Graphics, font: Font, fmt: StringFormat, area: CGSize, lines: Out<number>): CGSize {
        let int32: Out<number> = { value: 0 };
        //return g.MeasureString(str, font, area, fmt, int32, lines);
        return MeasureString(str, font, fmt, area);
    }

    protected /*override*/ OnBoundsChanged(old: CGRectangle): void {
        super.OnBoundsChanged(old);
        const size: CGSize = this.Size;
        if (old.Width !== size.Width || old.Height !== size.Height) {
            this.updateScale();
        }
    }

    protected /*override*/ OnLayerChanged(oldlayer: TuLayer, newlayer: TuLayer, mainObj: TuObject): void {
        super.OnLayerChanged(oldlayer, newlayer, mainObj);
        if (this.Editor != null) {
            const view: TuView = this.Editor.View;
            if (view != null) {
                this.DoEndEdit(view);
            }
        }
    }

    public /*override*/ OnSingleClick(evt: TuInputEventArgs, view: TuView): boolean {
        if (!this.CanEdit()) {
            return false;
        }
        if (!view.CanEditObjects()) {
            return false;
        }
        if (evt.Shift || evt.Control) {
            return false;
        }
        if (!this.EditableWhenSelected) {
            this.DoBeginEdit(view);
        }
        else {
            const tool: TuTool = as(view.Tool, Types.TuTool);
            if (tool != null && tool.CurrentObjectWasSelected) {
                this.DoBeginEdit(view);
            }
        }
        return true;
    }

    public /*override*/ Paint(g: Graphics, view: TuView): void {
        let brushesBlack: Brush;
        let brushesWhite: Brush;
        if (this.paintGreek(g, view)) {
            return;
        }
        const bounds: CGRectangle = this.Bounds.clone();
        if (!this.TransparentBackground) {
            if (this.Shadowed) {
                const shadowOffset: CGSize = this.GetShadowOffset(view);
                const shadowBrush: Brush = this.GetShadowBrush(view);
                TuShape.DrawRectangle(g, view, undefined, shadowBrush, bounds.X + shadowOffset.Width, bounds.Y + shadowOffset.Height, bounds.Width, bounds.Height);
            }
            const backgroundColor: CGColor = this.BackgroundColor;
            if (backgroundColor.Equals(CGColor.White)) {
                brushesWhite = Brushes_White;
            }
            else {
                brushesWhite = new SolidBrush(this.BackgroundColor);
            }
            const brush: Brush = brushesWhite;
            TuShape.DrawRectangle(g, view, undefined, brush, bounds.X, bounds.Y, bounds.Width, bounds.Height);
            if (!backgroundColor.Equals(CGColor.White)) {
                brush.Dispose();
            }
        }
        const text: string = this.Text;
        let width: float = 1;
        if (view != null) {
            width = width / view.WorldScale.Width;
        }
        if (this.Shadowed && this.TransparentBackground) {
            const x: CGRectangle = bounds;
            const sizeF: CGSize = this.GetShadowOffset(view);
            x.X = x.X + sizeF.Width;
            x.Y = x.Y + sizeF.Height;
            if (this.Bordered) {
                const shadowPen: Pen = this.GetShadowPen(view, width);
                TuShape.DrawRectangle(g, view, shadowPen, undefined, x.X - width / 2, x.Y, x.Width + width, x.Height);
            }
            if (text.length > 0) {
                const shadowBrush1: Brush = this.GetShadowBrush(view);
                this.paintText(text, g, view, x, shadowBrush1);
            }
        }
        const textColor: CGColor = this.TextColor;
        if (this.Bordered) {
            const pen: Pen = TuShape.NewPen(textColor, width);
            TuShape.DrawRectangle(g, view, pen, undefined, bounds.X - width / 2, bounds.Y, bounds.Width + width, bounds.Height);
            pen.Dispose();
        }
        if (text.length > 0) {
            if (textColor === CGColor.Black) {
                brushesBlack = Brushes_Black;
            }
            else {
                brushesBlack = new SolidBrush(this.TextColor);
            }
            const brush1: Brush = brushesBlack;
            this.paintText(text, g, view, bounds, brush1);
            if (!textColor.Equals(CGColor.Black)) {
                brush1.Dispose();
            }
        }
    }

    public /*virtual*/ paintGreek(g: Graphics, view: TuView): boolean {
        const docScale: float = view.DocScale;
        let paintNothingScale: float = view.PaintNothingScale;
        let paintGreekScale: float = view.PaintGreekScale;
        if (view.IsPrinting) {
            paintNothingScale = paintNothingScale / 4;
            paintGreekScale = paintGreekScale / 4;
        }
        let fontSize: float = this.FontSize;
        fontSize = fontSize / 10;
        let worldScale: CGSize = view.WorldScale;
        fontSize = fontSize * worldScale.Height;
        paintNothingScale = paintNothingScale / fontSize;
        paintGreekScale = paintGreekScale / fontSize;
        if (docScale <= paintNothingScale) {
            return true;
        }
        if (docScale > paintGreekScale) {
            return false;
        }
        const bounds: CGRectangle = this.Bounds.clone();
        const textColor: CGColor = this.TextColor;
        worldScale = view.WorldScale;
        let pen: Pen = TuShape.NewPen(textColor, 1 / worldScale.Height);
        let lineCount: number = this.LineCount;
        let y: float = bounds.Y;
        const height = bounds.Height / (lineCount + 1);
        for (let i = 0; i < lineCount; i++) {
            y = y + height;
            TuShape.DrawLine(g, view, pen, bounds.X, y, bounds.X + bounds.Width, y);
        }
        pen.Dispose();
        return true;
    }

    private paintText(str: string, g: Graphics, view: TuView, rect: CGRectangle, textbrush: Brush): void {
        if (str.length === 0) {
            return;
        }
        let font: Font = this.Font;
        if (font == null) {
            return;
        }
        let font1: Font = undefined;
        const lineHeight: float = this.getLineHeight(font);
        const clipping: boolean = this.Clipping;
        let clip: Region = undefined;
        let region: Region = undefined;
        if (clipping) {
            const CGRectangle: CGRectangle = GeomUtilities.IntersectionRect(rect, g.ClipBounds);
            clip = g.Clip;
            region = new Region(CGRectangle);
            g.Clip = region;
        }
        if (!this.Multiline) {
            const int32: number = this.findFirstLineBreak(str, 0);
            if (int32 >= 0) {
                str = str.substr(0, int32);
            }
        }
        const stringFormat: StringFormat = this.getStringFormat(view);
        if (view.IsPrinting && this.AutoResizes) {
            font1 = this.findLargestFont(g, this.Bounds, font.Size - 1, font.Size);
            font = font1;
        }
        let lineLeading: float = -this.getLineLeading(font);
        let int321: number = 0;
        let length: number = -1;
        const int322: Out<number> = { value: -1 };
        let flag: boolean = false;
        while (!flag) {
            length = this.findFirstLineBreak(str, int321, int322);
            if (length == -1) {
                length = str.length;
                flag = true;
            }
            if (int321 <= length) {
                const str1 = str.substr(int321, length - int321);
                if (str1.length <= 0) {
                    lineLeading = lineLeading + lineHeight;
                }
                else {
                    const CGRectangle1: CGRectangle = new CGRectangle(rect.X, rect.Y + lineLeading, rect.Width, rect.Height - lineLeading + 0.01);
                    this.drawString(str1, g, view, font, textbrush, CGRectangle1, stringFormat);
                    if (!this.Wrapping) {
                        lineLeading = lineLeading + lineHeight;
                    }
                    else {
                        const int323: Out<number> = { value: 0 };
                        const sizeF: CGSize = this.measureString(str1, g, font, stringFormat, new CGSize(CGRectangle1.Width, CGRectangle1.Height), int323);
                        lineLeading = lineLeading + sizeF.Height;
                    }
                }
            }
            int321 = int322.value;
        }
        if (font1 != null) {
            font1.Dispose();
        }
        if (clipping && clip != null) {
            g.Clip = clip;
        }
        if (region != null) {
            region.dispose();
        }
    }

    // TODO: Fix Below
    private recalcBoundingRect(): void {


        _graphic.PageUnit = GraphicsUnit.Pixel;
        (_graphic as any).TextRenderingHint = TextRenderingHint.ClearTypeGridFit;
        let single: float = this.computeWidth(_graphic, this.Font);
        let width: float = 10;
        const document: TuDocument = this.Document;
        if (document != null) {
            width = width / document.WorldScale.Width;
        }
        if (single < width) {
            single = width;
        }
        const single1: float = this.computeHeight(_graphic, this.Font, single);
        if (single !== this.Width || single1 !== this.Height) {
            this.setSizeKeepingLocation(new CGSize(single, single1));
        }
        //graphic.dispose();

    }

    public /*override*/  removeSelectionHandles(sel: TuSelection): void {
        if (this.BackgroundOpaqueWhenSelected) {
            const skipsUndoManager: boolean | 'inherit' = this.SkipsUndoManager;
            this.SkipsUndoManager = true;
            this.TransparentBackground = true;
            this.SkipsUndoManager = skipsUndoManager;
        }
        super.RemoveSelectionHandles(sel);
    }

    private rescaleFont(): void {

        //const graphic: Graphics = Graphics.FromImage(TuText.myEmptyBitmap);
        _graphic.PageUnit = GraphicsUnit.Pixel;
        // graphic.TextRenderingHint = TextRenderingHint.ClearTypeGridFit;
        const font: Font = this.findLargestFont(_graphic, this.Bounds, 0, 999);
        if (font != null) {
            this.FontSize = font.Size;
            font.Dispose();
        }
        //graphic.dispose();

    }

    private resetFont(): void {
        if (this.myFont != null) {
            this.myFont = undefined;
        }
    }

    public /*override*/  setSizeKeepingLocation(s: CGSize): void {
        const bounds: CGRectangle = this.Bounds;
        bounds.Width = s.Width;
        bounds.Height = s.Height;
        const location: CGPoint = this.Location;
        const CGRectangle: CGRectangle = this.setRectangleSpotLocation(bounds, this.Alignment, location);
        this.Bounds = CGRectangle;
    }

    private shareFont(name: string, size: float, style: FontStyle): Font {
        let font: Font;
        if (TuText.myLastFont == null || !(TuText.myLastFont.Name === name) || TuText.myLastFont.Size !== size || TuText.myLastFont.Style !== style) {
            const font1: Font = this.makeFont(name, size, style);
            if (font1 != null) {
                TuText.myLastFont = font1;
            }
            font = TuText.myLastFont;
        }
        else {
            font = TuText.myLastFont;
        }
        return font;
    }

    // TODO: Fix below
    private updateScale(): void {
        if (this.Initializing) {
            return;
        }
        if ((this.InternalTextFlags & 1073741824) == 0 && this.AutoRescales) {
            this.InternalTextFlags = this.InternalTextFlags | 1073741824;
            this.rescaleFont();
            this.InternalTextFlags = this.InternalTextFlags & -1073741825;
        }
    }

    public updateSize(): void {
        if (this.Initializing) {
            return;
        }
        if ((this.InternalTextFlags & flagUpdating) === 0 && this.AutoResizes) {
            this.InternalTextFlags = this.InternalTextFlags | flagUpdating;
            this.recalcBoundingRect();
            this.InternalTextFlags = this.InternalTextFlags & ~flagUpdating;
        }
    }

    private updateSizeOrScale(): void {
        if (this.AutoResizes) {
            this.updateSize();
            return;
        }
        this.updateScale();
    }


}

(function staticConstructor() {
    (<any>TuText).myNewlineArray = ['\r', '\n'];
    (<any>TuText).myDefaultFontName = 'Arial';//FontFamily.GenericSansSerif.Name;
    (<any>TuText).myStandardStringFormat = (<any>TuText).MakeStandardStringFormat();
    (<any>TuText).myDefaultFontSize = 10;
    (<any>TuText).myEmptyChoices = [];

    const myEmptyBitmap = new Bitmap(10, 10);
    _graphic = Graphics.FromImage(myEmptyBitmap);
})();
import { TuView } from './../TuView/TuView';
import { TuCopyDictionary } from './../TuCopyDictionary';
import { TuChangedEventArgs } from './../TuChangedEventArgs';
import { GeomUtilities } from './../GeomUtilities';
import { NullRect, Pens_LightGray, Brushes_LemonChiffon } from './../Globals';
import { TuCommentEvents } from './TuCommentEvents';
import { CGSize, CGRectangle } from '@tuval/cg';
import { ITuIdentifiablePart } from './../ITuIdentifiablePart';
import { ITuLabeledPart } from './../TuLabeledNode/ITuLabeledPart';
import { ITuLabeledNode } from './../TuLabeledNode/ITuLabeledNode';
import { Types } from './../types';
import { ClassInfo, as } from '@tuval/core';
import { TuGroup } from '../TuGroup/TuGroup';
import { TuText } from '../TuText/TuText';
import { TuObject } from '../TuObject/TuObject';
import { TuShape } from '../TuShape/TuShape';
import { TuRectangle } from '../TuRectangle/TuRectangle';

@ClassInfo({
    fullName: Types.TuComment,
    instanceof: [
        Types.TuComment,
        Types.ITuLabeledNode,
        Types.ITuLabeledPart,
        Types.ITuIdentifiablePart
    ]
})
export class TuComment extends TuGroup implements ITuLabeledNode, ITuLabeledPart, ITuIdentifiablePart {
    private myLabel: TuText;
    private myBack: TuObject;
    private myTopLeftMargin: CGSize = new CGSize({ width: 4, height: 2 });
    private myBottomRightMargin: CGSize = new CGSize({ width: 4, height: 2 });
    private myPartID: number = -1;

    //#region [Property] Background
    public get Background(): TuObject {
        return this.getBackground();
    }
    public set Background(value: TuObject) {
        this.setBackground(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getBackground(): TuObject {
        return this.myBack;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setBackground(value: TuObject) {
        const goObject: TuObject = this.myBack;
        if (goObject !== value) {
            if (goObject != null) {
                if (value != null) {
                    value.Selectable = goObject.Selectable;
                    value.Shadowed = goObject.Shadowed;
                }
                this.remove(goObject);
            }
            this.myBack = value;
            if (value != null) {
                this.insertBefore(undefined, value);
            }
            this.Changed(TuCommentEvents.ChangedBackground, 0, goObject, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] BottomRightMargin
    public get BottomRightMargin(): CGSize {
        return this.getBottomRightMargin();
    }
    public set BottomRightMargin(value: CGSize) {
        this.setBottomRightMargin(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getBottomRightMargin(): CGSize {
        return this.myBottomRightMargin;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setBottomRightMargin(value: CGSize) {
        const sizeF: CGSize = this.myBottomRightMargin;
        if (!sizeF.Equals(value)) {
            this.myBottomRightMargin = value;
            this.Changed(TuCommentEvents.ChangedBottomRightMargin, 0, undefined, GeomUtilities.MakeRect(sizeF), 0, undefined, GeomUtilities.MakeRect(value));
            if (!this.Initializing) {
                this.layoutChildren(undefined);
            }
        }
    }
    //#endregion

    //#region [Property] Label
    public get Label(): TuText {
        return this.getLabel();
    }
    public set Label(value: TuText) {
        this.setLabel(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getLabel(): TuText {
        return this.myLabel;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setLabel(value: TuText) {
        const goText: TuText = this.myLabel;
        if (goText !== value) {
            if (goText != null) {
                this.remove(goText);
            }
            this.myLabel = value;
            if (value != null) {
                this.Add(value);
            }
            this.Changed(TuCommentEvents.ChangedLabel, 0, goText, NullRect, 0, value, NullRect);
        }
    }
    //#endregion

    //#region [Property] PartID
    public get PartID(): number {
        return this.getPartID();
    }
    public set PartID(value: number) {
        this.setPartID(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getPartID(): number {
        return this.myPartID;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setPartID(value: number) {
        const int32: number = this.myPartID;
        if (int32 !== value) {
            this.myPartID = value;
            this.Changed(TuCommentEvents.ChangedPartID, int32, undefined, NullRect, value, undefined, NullRect);
        }
    }
    //#endregion

    //#region [Property] Shadowed
    /**
     * @hidden
     */
    protected /*override*/ getShadowed(): boolean {
        const background: TuObject = this.Background;
        if (background != null) {
            return background.Shadowed;
        }
        return super.getShadowed();
    }

    /**
     * @hidden
     * @param style
     */
    protected /*override*/ setShadowed(value: boolean) {
        const background: TuObject = this.Background;
        if (background != null) {
            background.Shadowed = value;
            return this;
        }
        super.setShadowed(value);
    }
    //#endregion

    //#region [Property] Shape
    public get Shape(): TuShape {
        return this.getShape();
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getShape(): TuShape {
        return as(this.Background, Types.TuShape);
    }
    //#endregion

    //#region [Property] Text
    public get Text(): string {
        return this.getText();
    }
    public set Text(value: string) {
        this.setText(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getText(): string {
        return this.Label.Text;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setText(value: string) {
        this.Label.Text = value;
    }
    //#endregion

    //#region [Property] TopLeftMargin
    public get TopLeftMargin(): CGSize {
        return this.getTopLeftMargin();
    }
    public set TopLeftMargin(value: CGSize) {
        this.setTopLeftMargin(value);
    }

    /**
     * @hidden
     */
    protected /*virtual*/ getTopLeftMargin(): CGSize {
        return this.myTopLeftMargin;
    }

    /**
     * @hidden
     * @param style
     */
    protected /*virtual*/ setTopLeftMargin(value: CGSize) {
        const sizeF: CGSize = this.myTopLeftMargin;
        if (!sizeF.Equals(value)) {
            this.myTopLeftMargin = value;
            this.Changed(TuCommentEvents.ChangedTopLeftMargin, 0, undefined, GeomUtilities.MakeRect(sizeF), 0, undefined, GeomUtilities.MakeRect(value));
            if (!this.Initializing) {
                this.layoutChildren(undefined);
            }
        }
    }
    //#endregion

    constructor() {
        super();
        this.InternalFlags = this.InternalFlags & -17;
        this.myBack = this.createBackground();
        this.Add(this.myBack);
        this.myLabel = this.createLabel();
        this.Add(this.myLabel);
    }


    public /*override*/ ChangeValue(e: TuChangedEventArgs, undo: boolean): void {
        switch (e.SubHint) {
            case TuCommentEvents.ChangedTopLeftMargin:
                {
                    this.TopLeftMargin = e.getSize(undo);
                    return;
                }
            case TuCommentEvents.ChangedBottomRightMargin:
                {
                    this.BottomRightMargin = e.getSize(undo);
                    return;
                }
            case TuCommentEvents.ChangedPartID:
                {
                    this.PartID = e.getInt(undo);
                    return;
                }
            case TuCommentEvents.ChangedBackground:
                {
                    this.Background = e.getValue(undo);
                    return;
                }
            case TuCommentEvents.ChangedLabel:
                {
                    this.Label = e.getValue(undo);
                    return;
                }
        }
        super.ChangeValue(e, undo);
    }

    protected /*override*/ copyChildren(newgroup: TuGroup, env: TuCopyDictionary): void {
        super.copyChildren(newgroup, env);
        const item: TuComment = as(newgroup, Types.TuComment);
        item.myPartID = -1;
        item.myBack = env.Get(this.myBack);
        item.myLabel = env.Get(this.myLabel);
    }

    protected /*virtual*/ createBackground(): TuObject {
        const rect: TuRectangle = new TuRectangle();
        rect.Shadowed = true;
        rect.Selectable = false;
        rect.Pen = Pens_LightGray;
        rect.Brush = Brushes_LemonChiffon;
        return rect;
    }

    protected /*virtual*/ createLabel(): TuText {
        const goText: TuText = new TuText();
        goText.Selectable = false;
        goText.Multiline = true;
        goText.Editable = true;
        this.Editable = true;
        return goText;
    }

    public /*override*/ DoBeginEdit(view: TuView): void {
        if (this.Label != null) {
            this.Label.DoBeginEdit(view);
        }
    }

    public /*override*/ findChild(name: string): TuObject {
        if (name === "Background") {
            return this.Background;
        }
        if (name === "Label") {
            return this.Label;
        }
        return super.findChild(name);
    }

    public /*override*/ findName(child: TuObject): string {
        if (child === this.Background) {
            return "Background";
        }
        if (child === this.Label) {
            return "Label";
        }
        return super.findName(child);
    }

    public /*override*/ layoutChildren(childchanged: TuObject) {
        if (this.Initializing) {
            return;
        }
        const label: TuText = this.Label;
        if (label == null) {
            return;
        }
        const background: TuObject = this.Background;
        if (background != null) {
            const topLeftMargin: CGSize = this.TopLeftMargin;
            const bottomRightMargin: CGSize = this.BottomRightMargin;
            background.Bounds = new CGRectangle(label.Left - topLeftMargin.Width, label.Top - topLeftMargin.Height, label.Width + topLeftMargin.Width + bottomRightMargin.Width, label.Height + topLeftMargin.Height + bottomRightMargin.Height);
        }
    }
    public /*override*/ remove(obj?: TuObject): boolean {
        const flag: boolean = super.Remove(obj);
        if (obj === this.myLabel) {
            this.myLabel = undefined;
            return flag;
        }
        if (obj === this.myBack) {
            this.myBack = undefined;
        }
        return flag;
    }
}
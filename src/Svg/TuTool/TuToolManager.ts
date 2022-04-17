import { ClassInfo, typeOf, as, TChar, foreach, CONTINUE, BREAK, Type } from '@tuval/core';
import { Types } from '../types';
import { TuTool } from './TuTool';
import { CGPoint, CGSize, CGRectangle } from '@tuval/cg';
import { TuInputEventArgs } from '../TuInputEventArgs';
import { Keys } from '../Forms/Keys';
import { TuViewDisableKeys } from '../TuViewDisableKeys';
import { TuView } from '../TuView/TuView';
import { TuToolDragging } from './TuToolDragging';
import { TuSelection } from '../TuSelection/TuSelection';
import { ITuTool } from './ITuTool';
import { TuObject } from '../TuObject/TuObject';


@ClassInfo({
    fullName:Types.TuToolManager,
   instanceof: [
       Types.TuToolManager
    ]
})
export class TuToolManager extends TuTool {

    public GetType(): Type {
        return typeOf(Types.TuToolManager);
    }
    private myStarted: boolean;

    //#region [Property] Started
    public get Started(): boolean {
        return this.getStarted();
    }
    public set Started(value: boolean) {
        this.setStarted(value);
    }

    protected /*virtual*/ getStarted(): boolean {
        return this.myStarted;
    }
    protected /*virtual*/ setStarted(value: boolean) {
        this.myStarted = value;
    }
    //#endregion

    public /*override*/ doKeyDown(): void {
        let docPosition: CGPoint;
        let pointF: CGPoint;
        let worldScale: CGSize;
        const lastInput: TuInputEventArgs = this.LastInput;
        const control: boolean = lastInput.Control;
        const shift: boolean = lastInput.Shift;
        const disableKeys: TuViewDisableKeys = this.View.DisableKeys;
        const key: Keys = lastInput.Key;
        if (key === Keys.Delete && (disableKeys & TuViewDisableKeys.Delete) === TuViewDisableKeys.None) {
            this.View.editDelete();
            return;
        }
        if (control && key === Keys.A && (disableKeys & TuViewDisableKeys.SelectAll) === TuViewDisableKeys.None) {
            this.View.selectAll();
            return;
        }
        if ((control && key === Keys.C || control && key === Keys.Insert) && (disableKeys & TuViewDisableKeys.Clipboard) === TuViewDisableKeys.None) {
            this.View.editCopy();
            return;
        }
        if ((control && key === Keys.X || shift && key === Keys.Delete) && (disableKeys & TuViewDisableKeys.Clipboard) === TuViewDisableKeys.None) {
            this.View.editCut();
            return;
        }
        if ((control && key === Keys.V || shift && key === Keys.Insert) && (disableKeys & TuViewDisableKeys.Clipboard) === TuViewDisableKeys.None) {
            this.View.editPaste();
            return;
        }
        if (key === Keys.F2 && (disableKeys & TuViewDisableKeys.Edit) === TuViewDisableKeys.None) {
            this.View.editEdit();
            return;
        }
        if (key === Keys.Next && (disableKeys & TuViewDisableKeys.Page) === TuViewDisableKeys.None) {
            if (shift) {
                this.View.scrollPage(1, 0);
                return;
            }
            this.View.scrollPage(0, 1);
            return;
        }
        if (key === Keys.Prior && (disableKeys & TuViewDisableKeys.Page) === TuViewDisableKeys.None) {
            if (shift) {
                this.View.scrollPage(-1, 0);
                return;
            }
            this.View.scrollPage(0, -1);
            return;
        }
        if (key === Keys.Home && (disableKeys & TuViewDisableKeys.Home) === TuViewDisableKeys.None) {
            const rectangleF: CGRectangle = this.View.computeDocumentBounds();
            if (control) {
                this.View.DocPosition = new CGPoint({ x: rectangleF.X, y: rectangleF.Y });
                return;
            }
            const view: TuView = this.View;
            const x: number = rectangleF.X;
            docPosition = this.View.DocPosition;
            view.DocPosition = new CGPoint({ x: x, y: docPosition.Y });
            return;
        }
        if (key === Keys.End && (disableKeys & TuViewDisableKeys.End) === TuViewDisableKeys.None) {
            const rectangleF1: CGRectangle = this.View.computeDocumentBounds();
            const docExtentSize: CGSize = this.View.DocExtentSize;
            if (!control) {
                const single: number = rectangleF1.X + rectangleF1.Width - docExtentSize.Width;
                docPosition = this.View.DocPosition;
                pointF = new CGPoint({ x: single, y: docPosition.Y });
            }
            else {
                pointF = new CGPoint({ x: rectangleF1.X + rectangleF1.Width - docExtentSize.Width, y: rectangleF1.Y + rectangleF1.Height - docExtentSize.Height });
            }
            this.View.DocPosition = new CGPoint({ x: Math.max(0, pointF.X), y: Math.max(0, pointF.Y) });
            return;
        }
        if (control && !shift && key === Keys.Z && (disableKeys & TuViewDisableKeys.Undo) === TuViewDisableKeys.None) {
            this.View.undo();
            return;
        }
        if ((control && key === Keys.Y || control && shift && key === Keys.Z) && (disableKeys & TuViewDisableKeys.Undo) === TuViewDisableKeys.None) {
            this.View.redo();
            return;
        }
        if (key === Keys.Escape && (disableKeys & TuViewDisableKeys.CancelDeselects) === TuViewDisableKeys.None) {
            if (this.View.CanSelectObjects()) {
                this.Selection.Clear();
            }
            this.doKeyDown();
            return;
        }
        if (key === Keys.Up || key === Keys.Down || key === Keys.Left || key === Keys.Right) {
            let width = 0;
            let height = 0;
            switch (key) {
                case Keys.Left:
                    {
                        worldScale = this.View.WorldScale;
                        width = -worldScale.Width;
                        break;
                    }
                case Keys.Up:
                    {
                        worldScale = this.View.WorldScale;
                        height = -worldScale.Height;
                        break;
                    }
                case Keys.Right:
                    {
                        worldScale = this.View.WorldScale;
                        width = worldScale.Width;
                        break;
                    }
                case Keys.Down:
                    {
                        worldScale = this.View.WorldScale;
                        height = worldScale.Height;
                        break;
                    }
            }
            if (this.View.Selection.IsEmpty || !this.View.CanMoveObjects() || (disableKeys & TuViewDisableKeys.ArrowMove) !== TuViewDisableKeys.None) {
                if ((disableKeys & TuViewDisableKeys.ArrowScroll) !== TuViewDisableKeys.None) {
                    this.doKeyDown();
                    return;
                }
                if (!control) {
                    this.View.scrollLine(width, height);
                    return;
                }
                const goView: TuView = this.View;
                docPosition = this.View.DocPosition;
                const x1: number = docPosition.X + width;
                docPosition = this.View.DocPosition;
                goView.DocPosition = new CGPoint({ x: x1, y: docPosition.Y + height });
                return;
            }
            let single1: number = 1;
            single1 = (!control ? this.View.ArrowMoveLarge : this.View.ArrowMoveSmall);
            const goToolDragging: TuToolDragging = as(this.View.findMouseTool(typeOf(Types.TuToolDragging), true), Types.TuToolDragging);
            if (goToolDragging != null) {
                const goSelection: TuSelection = goToolDragging.computeEffectiveSelection(this.View.Selection, true);
                this.View.moveSelection(goSelection, new CGSize({ width: width * single1, height: height * single1 }), true);
                this.View.raiseSelectionMoved();
                this.View.scrollRectangleToVisible(this.View.Selection.Primary.Bounds);
                return;
            }
        }
        else {
            let flag: boolean = false;
            if (!control && !lastInput.Alt && (disableKeys & TuViewDisableKeys.SelectsByFirstChar) === TuViewDisableKeys.None) {
                const str: string = Keys[Keys.Alt]; // TypeDescriptor.GetConverter(typeof (Keys)).ConvertToString(null, CultureInfo.CurrentCulture, lastInput.Key);
                let chr: string = '\0';
                if (str.length === 1) {
                    chr = str[0];
                }
                else if (str.length === 2 && str[0] === 'D') {
                    chr = str[1];
                }

                if (TChar.IsLetterOrDigit(chr.charCodeAt(0))) {
                    flag = this.View.selectNextNode(chr);
                }
            }
            if (!flag) {
                this.doKeyDown();
            }
        }
    }

    public /*override*/ doMouseDown(): void {
        let mustStart: boolean = true;
        foreach(this.View.MouseDownTools, (mouseDownTool: ITuTool) => {
            const goTool: ITuTool = as(mouseDownTool, Types.ITuTool);
            if (goTool == null || !goTool.canStart()) {
                return CONTINUE;
            }
            this.View.Tool = goTool;
            mustStart = false;
        });
        this.Started = mustStart;
    }

    public /*override*/ doMouseHover(): void {
        this.View.doHover(this.LastInput);
    }

    public /*override*/ doMouseMove(): void {
        if (this.Started) {
            foreach(this.View.MouseMoveTools, (mouseMoveTool: ITuTool) => {
                const goTool: ITuTool = as(mouseMoveTool, Types.ITuTool);
                if (goTool == null || !goTool.canStart()) {
                    return CONTINUE;
                }
                this.View.Tool = goTool;
                return BREAK;
            });
        }
        this.doMouseOver(this.LastInput);
    }

    public /*virtual*/ doMouseOver(evt: TuInputEventArgs): void {
        const currentObject: TuObject = this.CurrentObject;
        const goObject: TuObject = this.View.pickObject(true, false, evt.DocPoint, false);
        if (currentObject !== goObject) {
            this.CurrentObject = goObject;
            this.View.doObjectEnterLeave(currentObject, goObject, evt);
        }
        this.View.doMouseOver(evt);
    }

    public /*override*/ doMouseUp(): void {
        if (this.Started) {
            foreach(this.View.MouseUpTools, (mouseUpTool: ITuTool) => {
                const goTool: ITuTool = as(mouseUpTool, Types.ITuTool);
                if (goTool == null || !goTool.canStart()) {
                    return CONTINUE;
                }
                this.View.Tool = goTool;
                return BREAK;
            });
        }
    }

    public /*override*/ doMouseWheel(): void {
        this.View.doWheel(this.LastInput);
    }
    public /*override*/ stop(): void {
        this.Started = false;
    }
}
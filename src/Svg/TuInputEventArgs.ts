import { MouseEventArgs } from './Forms/MouseEventArgs';
import { MouseButtons } from './Forms/MouseButtons';
import { CGPoint } from '@tuval/cg';
import { DragEventArgs } from './Forms/DragEventArgs';
import { TuInputState } from './TuInputState';
import { Keys } from './Forms/Keys';
import { KeyEventArgs } from './Forms/KeyEventArgs';

    export class TuInputEventArgs {
        private myViewPoint: CGPoint;
        private myStagePoint: CGPoint;
        private myDocPoint: CGPoint;
        private myButtons: MouseButtons;
        private myModifiers: Keys;
        private myKey: Keys;
        private myMouseEventArgs: MouseEventArgs;
        private myDragEventArgs: DragEventArgs;
        private myKeyEventArgs: KeyEventArgs;
        private myDoubleClick: boolean;
        private myDelta: number;
        private myInputState = TuInputState.Start;

        public get Alt(): boolean {
            return this.getAlt();
        }
        public getAlt(): boolean {
            return (this.myModifiers & Keys.Alt) === Keys.Alt;
        }

        public get Buttons(): MouseButtons {
            return this.getButtons();
        }

        public set Buttons(value: MouseButtons) {
            this.setButtons(value);
        }

        public getButtons(): MouseButtons {
            return this.myButtons;
        }
        public setButtons(value: MouseButtons) {
            this.myButtons = value;
        }

        public get Control(): boolean {
            return this.getControl();
        }
        public getControl(): boolean {
            return (this.myModifiers & Keys.Control) === Keys.Control;
        }


        public get Delta(): number {
            return this.getDelta();
        }
        public set Delta(value: number) {
            this.setDelta(value);
        }
        public getDelta(): number {
            return this.myDelta;
        }
        public setDelta(value: number) {
            this.myDelta = value;
        }

        public get DocPoint(): CGPoint {
            return this.getDocPoint();
        }
        public set DocPoint(value: CGPoint) {
            this.setDocPoint(value);
        }
        public getDocPoint(): CGPoint {
            return this.myDocPoint;
        }
        public setDocPoint(value: CGPoint) {
            this.myDocPoint = value;
        }


        public get DoubleClick(): boolean {
            return this.getDoubleClick();
        }
        public set DoubleClick(value: boolean) {
            this.setDoubleClick(value);
        }
        public getDoubleClick(): boolean {
            return this.myDoubleClick;
        }
        public setDoubleClick(value: boolean) {
            this.myDoubleClick = value;
        }


        public get DragEventArgs(): DragEventArgs {
            return this.getDragEventArgs();
        }
        public set DragEventArgs(value: DragEventArgs) {
            this.setDragEventArgs(value);
        }
        public getDragEventArgs(): DragEventArgs {
            return this.myDragEventArgs;
        }
        public setDragEventArgs(value: DragEventArgs) {
            this.myDragEventArgs = value;
        }


        public get InputState(): TuInputState {
            return this.getInputState();
        }
        public set InputState(value: TuInputState) {
            this.setInputState(value);
        }
        public getInputState(): TuInputState {
            return this.myInputState;
        }
        public setInputState(value: TuInputState) {
            this.myInputState = value;
        }

        public get IsContextButton(): boolean {
            return this.isContextButton();
        }
        public isContextButton(): boolean {
            return this.myButtons === MouseButtons.Right;
        }


        public get Key(): Keys {
            return this.getKey();
        }
        public set Key(value: Keys) {
            this.setKey(value);
        }
        public getKey(): Keys {
            return this.myKey;
        }
        public setKey(value: Keys) {
            this.myKey = value;
        }

        public get KeyEventArgs(): KeyEventArgs {
            return this.getKeyEventArgs();
        }
        public set KeyEventArgs(value: KeyEventArgs) {
            this.setKeyEventArgs(value);
        }
        public getKeyEventArgs(): KeyEventArgs {
            return this.myKeyEventArgs;
        }
        public setKeyEventArgs(value: KeyEventArgs) {
            this.myKeyEventArgs = value;
        }

        public get Modifiers(): Keys {
            return this.getModifiers();
        }
        public set Modifiers(value: Keys) {
            this.setModifiers(value);
        }
        public getModifiers(): Keys {
            return this.myModifiers;
        }
        public setModifiers(value: Keys) {
            this.myModifiers = value;
        }

        public get MouseEventArgs(): MouseEventArgs {
            return this.getMouseEventArgs();
        }
        public set MouseEventArgs(value: MouseEventArgs) {
            this.setMouseEventArgs(value);
        }
        public getMouseEventArgs(): MouseEventArgs {
            return this.myMouseEventArgs;
        }
        public setMouseEventArgs(value: MouseEventArgs) {
            this.myMouseEventArgs = value;
        }


        public get Shift(): boolean {
            return this.getShift();
        }
        public getShift(): boolean {
            return (this.myModifiers & Keys.Shift) === Keys.Shift;
        }

        public get StagePoint(): CGPoint {
            return this.getStagePoint();
        }
        public set StagePoint(value: CGPoint) {
            this.setStagePoint(value);
        }
        public getStagePoint(): CGPoint {
            return this.myStagePoint;
        }
        public setStagePoint(value: CGPoint) {
            this.myStagePoint = value;
        }

        public get ViewPoint(): CGPoint {
            return this.getViewPoint();
        }
        public set ViewPoint(value: CGPoint) {
            this.setViewPoint(value);
        }
        public getViewPoint(): CGPoint {
            return this.myViewPoint;
        }
        public setViewPoint(value: CGPoint) {
            this.myViewPoint = value;
        }


        constructor(evt?: TuInputEventArgs) {
            if (evt) {
                this.myStagePoint = evt.getStagePoint();
                this.myDocPoint = evt.getDocPoint();
                this.myButtons = evt.getButtons();
                this.myModifiers = evt.getModifiers();
                this.myKey = evt.getKey();
                this.myMouseEventArgs = evt.getMouseEventArgs();
                this.myDragEventArgs = evt.getDragEventArgs();
                this.myKeyEventArgs = evt.getKeyEventArgs();
                this.myDoubleClick = evt.getDoubleClick();
                this.myDelta = evt.getDelta();
                this.myInputState = evt.getInputState();
            }

        }
    }
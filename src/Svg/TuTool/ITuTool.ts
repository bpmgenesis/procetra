import { TuView } from "../TuView/TuView";
import { Type } from '@tuval/core';

export interface ITuTool {
    View: TuView;
    canStart(): boolean;
    doCancelMouse(): void;
    doKeyDown(): void;
    doMouseDown(): void;
    doMouseHover(): void;
    doMouseMove(): void;
    doMouseUp(): void;
    doMouseWheel(): void;
    start(): void;
    stop(): void;
    GetType():Type;
}
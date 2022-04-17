import { ClassInfo, Type, typeOf } from '@tuval/core';
import { Types } from '../types';
import { TuTool } from './TuTool';
@ClassInfo({
    fullName:Types.TuToolSelecting,
    instanceof: [
        Types.TuToolSelecting,
        Types.TuTool,
        Types.ITuTool]
 })
export class TuToolSelecting extends TuTool {
    public GetType(): Type {
        return typeOf(Types.TuToolSelecting);
    }
    public /*override*/ start() {
        this.doSelect(this.LastInput);
        this.doClick(this.LastInput);
        this.stopTool();
        this.View.batchDraw();
    }
}
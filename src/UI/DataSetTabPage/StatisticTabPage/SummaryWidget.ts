import { SvgCanvas } from '../../controls/svgcanvas/SvgCanvas';
import { int } from '@tuval/core';

export class SummaryWidget extends SvgCanvas {
    private lineOffset:int;
    public override InitComponents() {
        this.Width = 300;
        this.Height = 400;
        this.PaperWidth = 300;
        this.PaperHeight = 400;
        this.lineOffset = 12;
        this.writeTextValue(10,'Event', '108');
        this.writeTextValue(40,'Cases', '5');
        this.writeTextValue(70,'Activities', '11');
        this.writeTextValue(100,'Median case duration', '36.3 mths');
        this.writeTextValue(130,'Mean case duration', '37.7 mths');
        this.writeTextValue(160,'Start', '05.08.2021 14:50:11');
        this.writeTextValue(190,'End', '05.08.2021 15:30:55');
    }

    private writeTextValue(offset: int, name:string, value: string) {
        const text = this.text(10, offset, name);
        text.fill = '#646464';

        const text1 = this.text(300, offset, value);
        text1.fill = '#646464';
        text1.font_size = 14;
        text1.text_anchor = 'end';

        this.drawLine(offset);
    }

    private drawLine(offset:int) {
        const line = this.line(10, offset + this.lineOffset, 300, offset + this.lineOffset);
        line.stroke = '#D2D2D2';
    }
}
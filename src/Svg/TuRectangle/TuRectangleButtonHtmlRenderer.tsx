import { TuRectangle } from './TuRectangle';
import { CGRectangle } from '@tuval/cg';
import { Teact } from '@tuval/forms';
import { SolidBrush, GraphicTypes } from '@tuval/graphics';
import { as } from '@tuval/core';
import { TuRectangleButton } from './TuRectangleButton';
export class TuRectangleButtonHtmlRenderer {
    public static Apply(result: any[], rectangleObject: TuRectangleButton) {
        const bounds: CGRectangle = rectangleObject.Bounds;

        let fillColor: string = 'transparent';

        if (rectangleObject.Brush != null) {
            const brush: SolidBrush = as(rectangleObject.Brush, GraphicTypes.SolidBrush);
            if (brush != null) {
                fillColor = brush.Color.toString('#rrggbb');
            }
        }

        const pen = rectangleObject.Pen;
        let strokeColor = 'transparent';
        let strokeWidth = 0;
        if (rectangleObject.Pen != null) {
            strokeColor = pen.Color.toString('#rrggbb');
            strokeWidth = pen.Width;
        }

        const style = {};
        style['position'] = 'absolute';
        style['left'] = bounds.X + 'px';
        style['top'] = bounds.Y + 'px';
        style['width'] = bounds.Width + 'px';
        style['height'] = bounds.Height + 'px';
        style['backgroundColor'] = fillColor;
        style['borderColor'] = strokeColor;
        style['borderWidth'] = strokeWidth;
        style['borderStyle'] = 'solid';
        style['overflow'] = 'hidden';
        style['box-shadow'] =  'rgb(0 0 0 / 12%) 0px 1px 1px, rgb(0 0 0 / 12%) 0px 2px 2px, rgb(0 0 0 / 12%) 0px 4px 4px, rgb(0 0 0 / 12%) 0px 8px 8px, rgb(0 0 0 / 12%) 0px 16px 16px';

        const styleMask = {};
        styleMask['position'] = 'absolute';
        styleMask['left'] = '0px';
        styleMask['top'] = '0px';
        styleMask['width'] = bounds.Width + 'px';
        styleMask['height'] = bounds.Height + 'px';
        styleMask['backgroundColor'] = 'transparent';
        styleMask['borderColor'] = 'transparent';
        styleMask['borderWidth'] = 0;

        result.push(
            <div class='TuRectangleButton'>
                <div style={style}>
                    {(rectangleObject.button as any).CreateMainElement()}
                    <div style={styleMask}></div>
                </div>
            </div>
        );
    }
}
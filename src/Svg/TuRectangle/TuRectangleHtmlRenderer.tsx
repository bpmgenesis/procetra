import { TuRectangle } from './TuRectangle';
import { CGRectangle } from '@tuval/cg';
import { Teact } from '@tuval/forms';
import { SolidBrush, GraphicTypes } from '@tuval/graphics';
import { as } from '@tuval/core';
export class TuRectangleHtmlRenderer {
    public static Apply(result: any[], rectangleObject: TuRectangle) {
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

        result.push(<div style={style}>

        </div>)
    }
}
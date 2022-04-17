import { CGRectangle } from '@tuval/cg';
import { Teact } from '@tuval/forms';
import { SolidBrush, GraphicTypes } from '@tuval/graphics';
import { as } from '@tuval/core';
import { TuHandle } from './TuHandle';
import { TuHandleStyle } from './TuHandleStyle';
export class TuHandleHtmlRenderer {
    public static Apply(result: any[], rectangleObject: TuHandle) {

      /*   if (rectangleObject.HandleID === 2) {
            console.log('TuHande rendered. ', rectangleObject.Bounds.toString());
        } */
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

        if (rectangleObject.Style === TuHandleStyle.None) {
            return;
        } else if (rectangleObject.Style === TuHandleStyle.Rectangle) {
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

            result.push(<div style={style}></div>)
        } else if (rectangleObject.Style === TuHandleStyle.Ellipse) {
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
            style['border-radius'] = '50%';

            style['animation-name'] = 'rubberBand';
            style['-webkit-animation-name'] = 'rubberBand';
            style['animation-name'] = 'rubberBand';
            style['-webkit-animation-duration'] = '1s';
            style['animation-duration'] = '1s';
            style['-webkit-animation-iteration-count'] = 1;
            style['animation-iteration-count'] = 1;
            style['-webkit-animation-delay'] = '0.1s';
            style['animation-delay'] = '0.1s';

            result.push(<div style={style}></div>)
        }
    }
}
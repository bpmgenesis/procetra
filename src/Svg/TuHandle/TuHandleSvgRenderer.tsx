import { CGRectangle } from '@tuval/cg';
import { Teact } from '@tuval/forms';
import { SolidBrush, GraphicTypes } from '@tuval/graphics';
import { as } from '@tuval/core';
import { SvgMatrix } from '../Matrix';
import { TuHandle } from './TuHandle';
import { TuHandleStyle } from './TuHandleStyle';

export class TuHandleSvgRenderer {
    public static Apply(result: any[], handleObject: TuHandle) {

        const bounds: CGRectangle = handleObject.Bounds.clone();

        let fillColor: string = 'transparent';

        if (handleObject.Brush != null) {
            const brush: SolidBrush = as(handleObject.Brush, GraphicTypes.SolidBrush);
            if (brush != null) {
                fillColor = brush.Color.toString('#rrggbb');
            }
        }

        const pen = handleObject.Pen;
        let strokeColor = 'transparent';
        let strokeWidth = 0;
        if (handleObject.Pen != null) {
            strokeColor = pen.Color.toString('#rrggbb');
            strokeWidth = pen.Width;
        }

        if (handleObject.Style === TuHandleStyle.None) {
            return;
        } else if (handleObject.Style === TuHandleStyle.Rectangle) {

            let matrix = new SvgMatrix();
            matrix = matrix.translate(0.5, 0.5);
            result.push(
                <rect
                    x={bounds.X}
                    y={bounds.Y}
                    rx={0}
                    ry={0}
                    width={bounds.Width}
                    height={bounds.Height}
                    stroke={strokeColor}
                    stroke-width={strokeWidth}
                    shape-rendering="crispEdges"
                    fill={fillColor}>
                </rect>
            );
        } else if (handleObject.Style === TuHandleStyle.Ellipse) {
            result.push(
                <ellipse
                    cx={bounds.X + (bounds.Width / 2)}
                    cy={bounds.Y + (bounds.Height / 2)}
                    rx={bounds.Width / 2}
                    ry={bounds.Height / 2}
                    stroke={strokeColor}
                    stroke-width={strokeWidth}
                    fill={fillColor}>
                </ellipse>
            );
        }
    }
}
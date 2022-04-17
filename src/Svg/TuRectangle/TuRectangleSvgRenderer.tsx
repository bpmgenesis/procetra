import { TuRectangle } from './TuRectangle';
import { CGRectangle } from '@tuval/cg';
import { Teact } from '@tuval/forms';
import { SolidBrush, GraphicTypes } from '@tuval/graphics';
import { as } from '@tuval/core';
import { SvgMatrix } from '../Matrix';

export class TuRectangleSvgRenderer {
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

        let matrix = new SvgMatrix();
        matrix = matrix.translate(0.5, 0.5);
        result.push(
           /*  <g transform={matrix.transformString}> */
                {/* <rect
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
                </rect> */}
            /* </g> */
        );
    }
}
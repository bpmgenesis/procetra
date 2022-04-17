
import { CGRectangle } from '@tuval/cg';
import { Teact, DomHandler } from '@tuval/forms';
import { SolidBrush, GraphicTypes } from '@tuval/graphics';
import { as } from '@tuval/core';
import { TuDashboardShape } from './TuDashboardShape';
import { TuHtmlRenderer } from '../../../Svg/Xml/TuHtmlRenderer';
import { TuView } from '../../../Svg/TuView/TuView';



export class _TuDashboardShapeHtmlRenderer extends TuHtmlRenderer<TuDashboardShape> {

    public GenerateElement(view: TuView, obj: TuDashboardShape): boolean {
        this.WriteStartElement('TuDashboardShape');
        return true;
    }
    public GenerateAttributes(view: TuView, obj: TuDashboardShape): void {

    }
    public GenerateBody(view: TuView, rectangleObject: TuDashboardShape): void {
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

        this.WriteStartElement('div');
        const style = {};
        this.WriteStyleAttrVal('position', 'absolute');
        this.WriteStyleAttrVal('left', bounds.X + 'px');
        this.WriteStyleAttrVal('top', bounds.Y + 'px');
        this.WriteStyleAttrVal('width', bounds.Width + 'px');
        this.WriteStyleAttrVal('height', bounds.Height + 'px');
        this.WriteStyleAttrVal('padding', '20px');
        this.WriteStyleAttrVal('backgroundColor', fillColor);
        /*   style['borderColor'] = strokeColor;
          style['borderWidth'] = strokeWidth;
          style['borderStyle'] = 'solid'; */
        this.WriteStyleAttrVal('overflow', 'hidden');
        this.WriteStyleAttrVal('box-shadow', 'rgb(0 0 0 / 12%) 0px 1px 1px, rgb(0 0 0 / 12%) 0px 2px 2px, rgb(0 0 0 / 12%) 0px 4px 4px, rgb(0 0 0 / 12%) 0px 8px 8px, rgb(0 0 0 / 12%) 0px 16px 16px');

        this.WriteStyleAttrVal('border-radius', '20px');
        this.WriteStyleAttrVal('outline', 'none medium');
        //style['box-shadow'] = '0 0 6px #8dc4ff!important';
        this.WriteStyleAttrVal('border', '1px solid #3c9df7!important');

       /*  this.WriteComponent(
            <div style={{ display: 'block', textAlign: 'center' }}>
                <i style={{ display: 'inline-block' }} class="icon-list-palette-line-chart rotate-270 placeholder-icon"></i>
                <div style={{ fontSize: '20px', lineHeight: '20px', color: '#666', marginTop: '20px' }}>Activity Mean Chart</div>
                <div style={{ fontSize: '14px', color: '#888' }}>You have no data yet</div>
            </div>
        ); */
        /*     this.WriteStartElement('i');
            this.WriteStyleAttrVal('display', 'inline-block');
            this.WriteAttrVal('class', 'icon-list-palette-line-chart rotate-270 placeholder-icon');
            this.WriteEndElement(); */

        if (rectangleObject.renderedNode == null) {
            this.writeDropTarget(rectangleObject);
        } else {
            this.WriteComponent(rectangleObject.renderedNode);
            this.writeMask(rectangleObject.Bounds);
        }
        this.WriteEndElement();
    }

    private writeDropTarget(rectangleObject: TuDashboardShape) {
        this.WriteControl(rectangleObject.dropTarget);
    }

    private writeMask(bounds: CGRectangle) {
        this.WriteStartElement('div');
        this.WriteStyleAttrVal('position', 'absolute');
        this.WriteStyleAttrVal('left', '0px');
        this.WriteStyleAttrVal('top', '0px');
        this.WriteStyleAttrVal('width', bounds.Width + 'px');
        this.WriteStyleAttrVal('height', bounds.Height + 'px');
        this.WriteStyleAttrVal('backgroundColor', 'transparent');
        this.WriteStyleAttrVal('borderColor', 'transparent');
        this.WriteStyleAttrVal('borderWidth', 0);
        this.WriteEndElement();
    }
    public GenerateElementFinish(view: TuView, obj: TuDashboardShape): void {
        this.WriteEndElement();
    }

    public DecideCache(view: TuView, obj: TuDashboardShape): void {

    }

}

export class TuDashboardShapeHtmlRenderer {
    public static Apply(result: any[], rectangleObject: TuDashboardShape) {
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
        style['padding'] = '20px';
        style['backgroundColor'] = fillColor;
        /*   style['borderColor'] = strokeColor;
          style['borderWidth'] = strokeWidth;
          style['borderStyle'] = 'solid'; */
        style['overflow'] = 'hidden';
        style['box-shadow'] = 'rgb(0 0 0 / 12%) 0px 1px 1px, rgb(0 0 0 / 12%) 0px 2px 2px, rgb(0 0 0 / 12%) 0px 4px 4px, rgb(0 0 0 / 12%) 0px 8px 8px, rgb(0 0 0 / 12%) 0px 16px 16px';

        style['border-radius'] = '20px';
        style['outline'] = 'none medium';
        //style['box-shadow'] = '0 0 6px #8dc4ff!important';
        style['border'] = '1px solid #3c9df7!important';

        const styleMask = {};
        styleMask['position'] = 'absolute';
        styleMask['left'] = '0px';
        styleMask['top'] = '0px';
        styleMask['width'] = bounds.Width + 'px';
        styleMask['height'] = bounds.Height + 'px';
        styleMask['backgroundColor'] = 'transparent';
        styleMask['borderColor'] = 'transparent';
        styleMask['borderWidth'] = 0;

        /*   result.push(<div style={style}>
              {rectangleObject.renderedNode}
              <div style={styleMask}></div>
          </div>) */
    }
}
import { TuView } from '../../TuView/TuView';
import { TuHtmlRenderer } from '../../Xml/TuHtmlRenderer';
import { TuHandle } from '../TuHandle';
import { CGRectangle, CGSize } from '@tuval/cg';
import { TuHandleStyle } from '../TuHandleStyle';

export class HtmlRenderer extends TuHtmlRenderer<TuHandle> {
    public DecideCache(): void {
        this.InvalidateCache();
    }
    public GenerateElement(view: TuView, obj: TuHandle): boolean {
        this.WriteStartElement('TuHandle');
        return true;
    }
    public GenerateAttributes(view: TuView, obj: TuHandle): void {

    }
    public GenerateBody(view: TuView, handle: TuHandle): void {
        const bounds: CGRectangle = handle.Bounds.clone();

        if (handle.Style === TuHandleStyle.None) {
            return;
        } else if (handle.Style === TuHandleStyle.Rectangle) {
            this.WriteRectangle(handle.Pen, handle.Brush, bounds, new CGSize(0, 0));

        } else if (handle.Style === TuHandleStyle.Ellipse) {
            this.WriteEllipse(handle.Pen, handle.Brush, bounds);
        }

    }
    public GenerateElementFinish(view: TuView, obj: TuHandle): void {
        this.WriteEndElement();
    }

}
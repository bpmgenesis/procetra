import { TuXmlTransformer } from './TuXmlTransformer';
import { TuObject } from '../TuObject/TuObject';
import { ITuLabeledPart } from '../TuLabeledNode/ITuLabeledPart';
import { Types } from '../types';
import { as, typeOf } from '@tuval/core';
import { TuView } from '../TuView/TuView';
import { TuSvgRenderer } from './TuSvgRenderer';

export class TuObjectSvgRenderer extends TuSvgRenderer<TuObject> {
    public DecideCache(): void {
       this.InvalidateCache();
    }

    public override  GenerateElement(view: TuView, obj: TuObject): boolean {
        const goObject: TuObject = obj;
        this.WriteStartElement("g");
        return true;
    }
    public override  GenerateAttributes(view: TuView, obj: TuObject): void {

    }

    public override  GenerateBody(view: TuView, obj: TuObject): void {
        const goObject: TuObject = obj;
        const goLabeledPart: ITuLabeledPart = as(goObject, Types.ITuLabeledPart);
        if (goLabeledPart != null) {
            this.WriteStartElement("desc");
            this.WriteTextBody(goLabeledPart.Text);
            this.WriteEndElement();
        }
        /*  string toolTip = goObject.GetToolTip(base.View);
         if (toolTip != null)
         {
             base.WriteStartElement("title");
             toolTip = toolTip.Replace('\r', ' ');
             toolTip = toolTip.Replace('\n', ' ');
             base.WriteTextBody(toolTip);
             base.WriteEndElement();
         } */
    }

    public override  GenerateElementFinish(view: TuView, obj: TuObject): void {
        this.WriteEndElement();
    }
}
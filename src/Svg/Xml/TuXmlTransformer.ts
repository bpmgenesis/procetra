import { TuXmlWriter } from './TuXmlWriter';
import { Type, Convert, int } from '@tuval/core';
import { XmlElement } from './XmlElement';
import { TuView } from '../TuView/TuView';
import { TuObject } from '../TuObject/TuObject';
import { Control } from '@tuval/forms';

export abstract class TuXmlTransformer<T extends TuObject> {
    private Writer: TuXmlWriter;
    protected View: TuView;
    protected Object: T;

    public constructor() {
        this.Writer = new TuXmlWriter();
        /* this.View = view;
        this.Object = obj; */
    }
    public WriteStartElement(name: string): void {
        this.Writer.WriteStartElement(name);
    }
    public WriteEndElement(): void {
        this.Writer.WriteEndElement();
    }
    public WriteAttrVal(name: string, val: any): string {
        //const str: string = val;
        this.Writer.WriteAttrVal(name, val);
        return val;
    }
    public WriteStyleAttrVal(name: string, val: any): string {
        //const str: string = val;
        this.Writer.WriteStyleAttrVal(name, val);
        return val;
    }
    /*  public WriteIntAttrVal(name: string, val: int): string {
         const str: string = Convert.ToString(val);
         this.Writer.WriteAttrVal(name, str);
         return str;
     } */

    public WriteTextBody(text: string) {
        this.Writer.WriteTextBody(text);
    }

    public WriteControl(control:Control<any>) {
        this.Writer.WriteControl(control);
    }

    public WriteComponent(text: any) {
        this.Writer.WriteComponent(text);
    }
    public InvalidateCache() {

    }

    public abstract DecideCache(view: TuView, obj: T): void;
    public abstract GenerateElement(view: TuView, obj: T): boolean;
    public abstract GenerateAttributes(view: TuView, obj: T): void
    public abstract GenerateBody(view: TuView, obj: T): void;
    public abstract GenerateElementFinish(view: TuView, obj: T): void;

    private reset(): void {
        this.Writer = new TuXmlWriter();
    }
    public Render(result: any[], view: TuView, obj: T): any {
        this.reset();
        this.GenerateElement(view, obj);
        this.GenerateAttributes(view, obj);
        this.GenerateBody(view, obj);
        this.GenerateElementFinish(view, obj);
        result.push(this.Writer.RenderToNode());
    }
}
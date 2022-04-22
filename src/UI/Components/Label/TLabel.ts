import { Control, ControlHtmlRenderer } from '@tuval/forms';


export class _TLabel extends Control<_TLabel> {
    public constructor() {
        super();
    }
    protected GetRenderer(): any {
        return class TLabelRenderer extends ControlHtmlRenderer<_TLabel> {
            public override GenerateElement(obj: _TLabel): boolean {
                this.WriteStartElement('span');
                return true;
            }
            public GenerateBody(obj: _TLabel): void {
                this.WriteTextBody(obj.Text);
            }

        }
    }
}
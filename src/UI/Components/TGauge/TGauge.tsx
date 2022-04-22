import { Control, ControlHtmlRenderer, Teact, TFlexContainer, TVirtualContainer, TContainerControlRenderer } from '@tuval/forms';
import { int, StringBuilder } from '@tuval/core';
import { Gauge } from './Gauge';

var GaugeDefaults = {
    centerX: 50,
    centerY: 50
};

var defaultOptions = {
    dialRadius: 40,
    dialStartAngle: 135,
    dialEndAngle: 45,
    value: 0,
    max: 100,
    min: 0,
    valueDialClass: "value",
    valueClass: "value-text",
    dialClass: "dial",
    gaugeClass: "gauge",
    showValue: true,
    gaugeColor: null,
    label: function (val) { return Math.round(val); }
};

export class TGauge extends Control<TGauge> {
    public Max: int = 100;
    public Min: int = 0;
    public DialRadius: int = 40;
    public ShowValue: boolean = true;
    public DialStartAngle: int = 135;
    public DialEndAngle: int = 45;
    public Value: int = 0;
    public Label: string;
    protected GetRenderer(): any {
        return class TGaugeRenderer extends ControlHtmlRenderer<TGauge> {
            private gaugeRef;
            public override get UseShadowDom(): boolean {
                return true;
            }

            OnStyleCreating(obj: TGauge, sb: StringBuilder): void {
                const style = `
                .gauge .dial {
                    stroke: #ddd;
                    fill: "#C8C8C8";
                    stroke-width: 40;
                  }
                  .gauge .value {
                    stroke: #5F6F84;
                    stroke-width: 40;
                  }
                 .gauge .value-text {
                    fill: #FF6DAF;
                    font-size: 1.7em;
                  }
                  `;
                sb.AppendLine(style);
            }
            protected OnComponentDidMount(ref: any, obj: TGauge): void {
                if (this.Ref) {
                    this.gaugeRef = Gauge(this.Ref.shadowRoot, { value: obj.Value, dialRadius: 20, max: 100, min: 0, dialStartAngle: 90.01, dialEndAngle: 89.99, showValue: false });
                    this.gaugeRef.setValue(0);
                    this.gaugeRef.setValueAnimated(obj.Value, 1);
                }
            }

            protected OnComponentDidUpdate(obj: TGauge): void {
                console.log('old value:', this.gaugeRef.getValue(), 'new value', obj.Value);
                if (this.gaugeRef != null && this.gaugeRef.getValue() !== obj.Value) {
                    this.gaugeRef.setValueAnimated(obj.Value, 1);
                }
            }
            public GenerateBody(obj: TGauge): void {
            }

        }
    }
}


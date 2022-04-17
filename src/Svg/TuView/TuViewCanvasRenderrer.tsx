import { TuView } from "./TuView";
import { Teact } from '@tuval/forms';

export class TuViewCanvasRenderrer {
    public static Apply(view: TuView) {
        return (
            <canvas ref={(el) => {
                view.Ref = el;
                view.BeginUpdate();
                (view as any).canvasElement = el;
                view.EndUpdate();
            }} id='tuval-canvas-view' width={view.Width} height={view.Height} >Hello TuView</canvas>
        );
    }
}

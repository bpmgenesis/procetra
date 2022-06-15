import { State, Dialog, _State, DropArea, DropEventArgs, Control, Teact } from '@tuval/forms';
import { CGRectangle, CGColor } from '@tuval/cg';
import { is } from '@tuval/core';
import { TuInputEventArgs,TuView,ViewRenderingMode, TuRectangle } from '@tuval/components/diagram';
import { ClassInfo, int } from '@tuval/core';
import { _Types } from '../../../__manifest__/__types__';
import { _TuDashboardShapeHtmlRenderer } from './TuDashboardShapeHtmlRenderer';
import { MiningBrokerClient } from '@procetra/common';


class SettingsDialog extends Dialog {
    private SettingsDialog() {
        this.Width = 200;
        this.Height = 200;
    }
}

@ClassInfo({
    fullName: _Types.TuDashboardShape,
    name: 'TuObject',
    instanceof: [_Types.TuDashboardShape]
})
export class TuDashboardShape extends TuRectangle {
    @State()
    Control: Control<any>;

    @State()
    public renderedNode: any;

    @State()
    public dialog: SettingsDialog;

    @State()
    public dropTarget: DropArea;



    @_State _test: string;
    @_State _projectId: string;
    @_State _datasetId: string;

    @_State _updated: int;



    private TuDashboardShape(): void {
        this._updated = 1;
        this.dropTarget = new DropArea();
        this.dropTarget.Text = '';


       //   this.dropTarget.Controls.Add(this.GetPreviewControl());

        this.dropTarget.Drop.add(((e: DropEventArgs) => {
            const [projectId, datasetId] = e.nativeEvent.dataTransfer.getData('text').split(';');
            if (!is.nullOrEmpty(projectId) && !is.nullOrEmpty(datasetId)) {
                this.SetDataSet(projectId, datasetId);
            }
        }));
        this.dialog = new SettingsDialog();
        this.BrushColor = CGColor.White;
        this.Control = this.GetControl();
        this.HtmlRenderer = new _TuDashboardShapeHtmlRenderer();

    }
    /*    public CreateElements(param: any) {
          const view: TuView = param;
          const result = [];
          if (view.RenderingMode === ViewRenderingMode.Html) {
              TuDashboardShapeHtmlRenderer.Apply(result, this);
          }
          return result;
      } */

    public SetDataSet(projectId: string, datasetId: string) {
        const log_id = datasetId;
        MiningBrokerClient.GetActivityOverview(log_id).then(data => {
            (this.Control as any).SetChartData(data);
            this.renderedNode = this.Control.CreateMainElement();
        });
    }

    protected override  OnBoundsChanged(old: CGRectangle): void {

        if (this.Width !== old.Width || this.Height !== old.Height) {
            console.log('New width: ', this.Width, ' Old Width : ', old.Width);
            console.log('New X: ', this.Left, ' Old C : ', old.X);

            this.Control.Width = this.Width - 40;
            this.Control.Height = this.Height - 40;
            this.dropTarget.Height = this.Height - 50;

            // setTimeout(()=> this.button.Refresh(), 100);
        }
    }

    public override OnDoubleClick(evt: TuInputEventArgs, view: TuView): boolean {
        this.dialog.ShowDialog();
        //view.Selection.Clear();
        //alert('double click');
        return false;
    }



    public GetControl(): Control<any> {
     /*    const chart = new MeanChart();
        chart.Height = -90; //%
        chart.Title = 'Activity Mean Duration';
        return chart; */
        return null;
    }

   /*  public GetPreviewControl(): PreviewControl {
        const previewControl = new PreviewControl();
        previewControl.Title = 'Activity Mean Chart';
        previewControl.SubTitle = 'You have no data yet';
        previewControl.ClassName = 'icon-list-palette-line-chart rotate-270 placeholder-icon';
        return previewControl;
    } */

}
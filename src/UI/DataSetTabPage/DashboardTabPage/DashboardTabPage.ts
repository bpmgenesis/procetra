import { TTabPage, DomHandler, Button, ScrollPanel, TSplitter, LayoutPanel, SizingModes, Desktop } from '@tuval/forms';
import { IDataSet } from '../../../Bussiness/IDataSet';
import { MiningDashboard } from './MiningDashboard';
import { int, Convert, typeOf, EventBus } from '@tuval/core';
import { TuView,ViewRenderingMode, TuViewSnapStyle, TuViewGridStyle,TuRectangleButton, Types } from '@tuval/components/diagram';

import { CGSize } from '@tuval/cg';

import { Pens, Brushes } from '@tuval/graphics';
import { TuDashboardShape } from './TuDashboardShape';
import { DashboardView } from './DashboardView';
import { ListPalette } from './ListPalette';
import { FlexLayout } from '../../controls/layout/FlexLayout';
import { JustifyContents } from '../../controls/layout/JustifyContents';
import { _Types } from '../../../__manifest__/__types__';

import { TdiFregMapShape } from './TdiFregMapShape';
import { TdiActivitySlider } from './Shapes/TdiActivitySlider';
import { TdiConnectionSlider } from './Shapes/TdiConnectionSlider';
import { TdiPerformanceProcessExplorerShape } from './Shapes/TdiPerformanceProcessExplorerShape';

DomHandler.addCssToDocument(require('./Dashboard.css'));
let prev = 0;

// Throttling Function
const throttleFunction = (func, delay) => {

    // Previously called time of the function
    let prev = 0;
    return (...args) => {
        // Current called time of the function
        let now = new Date().getTime();

        // Logging the difference between previously
        // called and current called timings
        console.log(now - prev, delay);

        // If difference is greater than delay call
        // the function again.
        if (now - prev > delay) {
            prev = now;

            // "..." is the spread operator here
            // returning the function with the
            // array of arguments
            return func(...args);
        }
    }
}
export class DashboardTabPage extends TTabPage {
    private dataset: IDataSet;
    private dashboard: MiningDashboard;
    splitter: TSplitter;
    scrollPanel: ScrollPanel;
    layoutPanel: LayoutPanel;
    listPalette: ListPalette;

    public SetDataSet(dataset: IDataSet) {
        this.dataset = dataset;
        this.dashboard = new MiningDashboard();
        this.dashboard.SetDataSet(dataset);
        //this.Controls.Add(this.dashboard);

        this.layoutPanel = new LayoutPanel();

        this.listPalette = new ListPalette();
        const catPAC = 'Process analysis components';
        const catRAC = 'Resource analysis components';
        const catCharts = 'Charts';
        const catTables = 'Tables';

        const catSelection = 'Selection Components';
        const uiCharts = 'UI Design Elements';

        this.listPalette.Add(catPAC, 'Performance Explorer', 'icon-list-palette-process-explorer', TdiPerformanceProcessExplorerShape);
        this.listPalette.Add(catPAC, 'Frequency Explorer', 'icon-list-palette-process-explorer', typeOf(_Types.TdiFregProcessExplorerShape));
        this.listPalette.Add(catPAC, 'Variant Explorer', 'icon-list-palette-variant-explorer', typeOf(Types.TuText));
        this.listPalette.Add(catPAC, 'Activity Explorer', 'icon-list-palette-activity-explorer', TdiActivitySlider);
        this.listPalette.Add(catPAC, 'Activity Slider', 'icon-list-palette-activity-slider', TdiActivitySlider);
        this.listPalette.Add(catPAC, 'Connection Slider', 'icon-list-palette-connection-slider', TdiConnectionSlider);

        this.listPalette.Add(catRAC, 'Performance Explorer', 'icon-list-palette-resource', typeOf(_Types.TdiFregProcessExplorerShape));
        this.listPalette.Add(catRAC, 'Frequency Explorer', 'icon-list-palette-resource', typeOf(_Types.TdiFregProcessExplorerShape));

        this.listPalette.Add(catCharts, 'Activity Frequency', 'icon-list-palette-line-chart rotate-270', typeOf(_Types.TdiActivityMeanDurationChart));
        this.listPalette.Add(catCharts, 'Activity Mean Duration', 'icon-list-palette-line-chart rotate-270', typeOf(_Types.TdiActivityMeanDurationChart));
        this.listPalette.Add(catCharts, 'Activity Median Duration', 'icon-list-palette-line-chart rotate-270', typeOf(_Types.TdiActivityMedianDurationChart));
        this.listPalette.Add(catCharts, 'Duration Range', 'icon-list-palette-line-chart rotate-270', typeOf(_Types.TdiActivityMedianDurationChart));

        this.listPalette.Add(catTables, 'Case Overview', 'icon-list-palette-line-chart rotate-270', typeOf(_Types.TdiActivityMedianDurationChart));
        this.listPalette.Add(catTables, 'All Activities', 'icon-list-palette-line-chart rotate-270', typeOf(_Types.TdiActivityMedianDurationChart));
        this.listPalette.Add(catTables, 'Start Events', 'icon-list-palette-line-chart rotate-270', typeOf(_Types.TdiActivityMedianDurationChart));
        this.listPalette.Add(catTables, 'End Events', 'icon-list-palette-line-chart rotate-270', typeOf(_Types.TdiActivityMedianDurationChart));

        this.listPalette.Add(catSelection, 'Varian Selection', 'icon-list-palette-variant-explorer', typeOf(Types.TuText));
        this.listPalette.Add(catSelection, 'Case Selection', 'icon-list-palette-case-selection', typeOf(Types.TuText));

        this.listPalette.Add(uiCharts, 'Text', 'icon-list-palette-text', typeOf(Types.TuText));
        this.listPalette.Add(uiCharts, 'Button', 'icon-list-palette-button', typeOf(Types.TuText));
        this.listPalette.Add(uiCharts, 'Dropdown', 'icon-list-palette-button-drop-down', typeOf(Types.TuText));


        //this.Controls.Add(button4);

        const button5 = new Button();
        button5.Text = 'Test';
        button5.Clicked.add(() => {
            Desktop.TopControl = this.layoutPanel;
            EventBus.Default.fire('tuval.desktop.render', {});
        });

        // this.Controls.Add(button5);

        this.scrollPanel = new ScrollPanel();
        this.scrollPanel.Width = 300;
        this.scrollPanel.Height = 300;

        const svg = new DashboardView();
        svg.pId = dataset.ProjectId;
        svg.dId = dataset.Id;
        svg.beginUpdate();
        svg.RenderingMode = ViewRenderingMode.Html;
        svg.ResizeHandleSize = new CGSize(10, 10);
        svg.Width = 1800;
        svg.Height = 1500;
        svg.GridCellSize = new CGSize(20, 20);
        svg.GridLineWidth = 1;
        svg.GridMajorLineWidth = 1;
        svg.GridSnapDrag = TuViewSnapStyle.Jump;
        svg.GridSnapResize = TuViewSnapStyle.Jump;
        svg.GridStyle = TuViewGridStyle.Line;
        svg.GridMajorLineColor = svg.GridLineColor.clone();
        //svg.loopDraw();

        /*  const rect = new TuDashboardShape();
         rect.Left = 50;
         rect.Top = 50;
         rect.Width = 1000;
         rect.Height = 505;
         rect.Pen = Pens.Black;
         rect.Brush = Brushes.White; */

        const rect1 = new TdiFregMapShape();
        rect1.Left = 250;
        rect1.Top = 50;
        rect1.Width = 400;
        rect1.Height = 250;
        rect1.Pen = Pens.Black;
        rect1.Brush = Brushes.White;

        /*  const rect2 = new TdiFregMapShape();
         rect2.SetDataSet(dataset.ProjectId, dataset.Id);
         rect2.Left = 250;
         rect2.Top = 50;
         rect2.Width = 400;
         rect2.Height = 250;
         rect2.Pen = Pens.Black;
         rect2.Brush = Brushes.White; */


        /*  svg.Document.Add(rect);
         svg.Document.Add(rect1); */
        //svg.Document.Add(rect2);





        /*  const group = new TuStartShape();
         group.Text = 'Process Start';
         group.Left = 120;
         group.Top = 20;
         svg.Document.DefaultLayer.Add(group);

         const activity = new TuActivity();
         activity.Text = 'Create Purchase Requisition Item';
         activity.Left = 120;
         activity.Top = 80;
         svg.Document.DefaultLayer.Add(activity);

         const endShape = new TuEndShape();
         endShape.Text = 'Process End';
         endShape.Left = 120;
         endShape.Top = 140;
         svg.Document.DefaultLayer.Add(endShape);

         const edge = new TuEdge();
         edge.Left = 48;
         edge.Top = 50;
         edge.Width = 10;
         edge.Height = 90;

         svg.Document.LinksLayer.Add(edge); */


        /*  const group = new TuGroup();
         group.Left = 100;
         group.Top = 100;
         group.Width = 200;
         group.Height = 200;
         svg.Document.LinksLayer.Add(group); */

        svg.endUpdate()

        this.scrollPanel.Controls.Add(svg as any);
        this.layoutPanel.SizingMode = SizingModes.RightFixed;
        this.layoutPanel.LeftSize = 300;
        this.layoutPanel.LeftControl = this.scrollPanel;




        this.layoutPanel.RightControl = this.listPalette;

        this.Controls.Add(this.layoutPanel);

        /*   this.splitter = new TSplitter();
          this.splitter.Width = 300;
          this.splitter.Height = 300;
          this.splitter.LeftControl = svg as any;
          this.splitter.RightControl = listPalette;
          this.Controls.Add(this.splitter); */

        // setTimeout(() => this.SendResizeRequest(), 50);
    }
    public override OnFormResized(w: int, h: int) {
        if (this.scrollPanel) {
            const rect = this.layoutPanel.GetLeftPanelRect();
            this.scrollPanel.Height = h - 215;
            if (rect != null) {
                this.scrollPanel.Width = rect.width;
            }
            this.listPalette.Height = h - 230;
            console.log(this.layoutPanel.GetLeftPanelRect());
        }
        /*   if (this.splitter != null) {
              this.splitter.Height = h - 230;
              this.splitter.Width = w - 200;
          } */
        /*  if (this.dashboard) {
             this.dashboard.Refresh();
         } */
    }
    public override OnActivate() {
        this.SendResizeRequest();
    }
}
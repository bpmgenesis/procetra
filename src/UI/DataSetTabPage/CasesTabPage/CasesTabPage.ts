import { int, is, foreach, Convert, TString, TMath } from '@tuval/core';
import { LayoutPanel, ListMenu, TTabPage, Button, Panel, SelectButton } from '@tuval/forms';

import { DataSet } from '../../../Bussiness/DataSet';
import { IDataSet } from '../../../Bussiness/IDataSet';
import { Tokens } from '../../../Bussiness/Tokens';
import { Trace } from '../../../Logic/objects/log/Trace';
import { SvgCanvas } from '../../controls/svgcanvas/SvgCanvas';
import { FlexLayout } from '../../controls/layout/FlexLayout';
import { FlexLayoutItem } from '../../controls/layout/FlexLayoutItem';
import { GeneralLogStatistics } from '../../../Logic/statistics/log/general';
import { Resources } from '../../../Resources/Resources';
import { parseFormat } from '../../../date/parseFormat';
import { humanizeDuration } from '../../../Logic/utils/generic/humanize-duration';

declare var Viz, moment;
export class CasesTabPage extends TTabPage {
    private dataset: IDataSet;
    private listMenu: ListMenu;
    svgCanvas: SvgCanvas;
    listMenu1: ListMenu;
    flexItem1: FlexLayoutItem;
    panel: Panel;
    public override InitComponents() {

        const layoutPanel = new FlexLayout();

        const flexItem = new FlexLayoutItem();
        layoutPanel.Controls.Add(flexItem);
        this.listMenu = new ListMenu();
        this.listMenu.Width = 200;
        this.listMenu.Height = 500;
        this.listMenu.ItemHeight = 50;

        this.listMenu.BackgroundColor = '#E6E6E6';
        this.listMenu.ItemColor = '#FFFFFF';
        this.listMenu.SelectedItemColor = '#4071BB';
        this.listMenu.ItemBorder.AddBottomBorder('#DCDCDC');

        flexItem.Controls.Add(this.listMenu);

        const flexItem2 = new FlexLayoutItem();
        layoutPanel.Controls.Add(flexItem2);
        this.listMenu1 = new ListMenu();
        this.listMenu1.HeaderText = 'Cases';

        this.listMenu1.Width = 200;
        this.listMenu1.Height = 500;
        this.listMenu1.ItemHeight = 50;

        this.listMenu1.BackgroundColor = '#E6E6E6';
        this.listMenu1.ItemColor = '#FFFFFF';
        this.listMenu1.SelectedItemColor = '#4071BB';
        this.listMenu1.ItemBorder.AddBottomBorder('#DCDCDC');

        flexItem2.Controls.Add(this.listMenu1);



        this.flexItem1 = new FlexLayoutItem();
        this.flexItem1.Grow = true;
        layoutPanel.Controls.Add(this.flexItem1);

        /*
                const selectButton = new SelectButton();
                selectButton.OptionLabel = 'name';
                selectButton.OptionValue = 'value';
                selectButton.Options = [
                    {
                        name: 'Graph',
                        value: '0'
                    },
                    {
                        name: 'Table',
                        value: '1'
                    }]; */


        this.panel = new Panel();
        this.panel.Height = 400;
        this.svgCanvas = new SvgCanvas();
        this.svgCanvas.PaperWidth = 800;
        this.svgCanvas.Height = 400;
        this.svgCanvas.Width = 800;

        /*   this.panel.Controls.Add(selectButton);*/
        this.panel.Controls.Add(this.svgCanvas);
        this.flexItem1.Controls.Add(this.panel);

        const btn = new Button();
        btn.Text = 'Clear';
        btn.Clicked.add(() => {
            this.svgCanvas.Clear();
        });
        //this.flexItem1.Controls.Add(btn);

        const btn1 = new Button();
        btn1.Text = 'Add';
        btn1.Clicked.add(() => {
            // this.createModel(this.listMenu1.Items.Get(this.listMenu1.SelectedIndex).Tag, 'Activity');
        });
        //this.flexItem1.Controls.Add(btn1);

        this.Controls.Add(layoutPanel);

        setTimeout(() => this.SendResizeRequest(), 100);
    }
    public SetDataSet(dataset: IDataSet) {
        this.dataset = dataset;

        /*  const eventLog = CsvImporter.apply(dataset.CsvString, dataset.Separator, '"', dataset.CaseColumn, dataset.ActivityColumn,
             dataset.TimeStampColumn, dataset.DateFormat); */

        const item = this.listMenu.Items.Add('All Log'/* , Resources.Icons.AllLogIcon, Resources.Icons.AllLogSelectedIcon, Resources.Icons.RightArrowIcon, Resources.Icons.RightArrowSelectedIcon */);

        const variants = GeneralLogStatistics.getVariants(dataset.EventLog, dataset.ActivityColumn);
        let count = 1;
        for (let key in variants) {
            const item = this.listMenu.Items.Add(TString.Format('Variant {0}', Convert.ToString(count++))/* , Resources.Icons.VariantIcon, Resources.Icons.VariantSelectedIcon, Resources.Icons.RightArrowIcon, Resources.Icons.RightArrowSelectedIcon */);
            item.Tag = variants[key];
        }
        this.listMenu.HeaderText = TString.Format('Variants ({0})', this.listMenu.Items.Count - 1);

        this.listMenu.SelectedIndex$.subscribe((selectedIndex: int) => {
            const traces = this.listMenu.Items.Get(selectedIndex).Tag.traces;
            this.listMenu1.Items.Clear();

            foreach(traces, (trace: Trace) => {
                const item = this.listMenu1.Items.Add(trace.attributes['concept:name'].value/* , Resources.Icons.CaseIcon, Resources.Icons.CaseSelectedIcon, Resources.Icons.RightArrowIcon, Resources.Icons.RightArrowSelectedIcon */);
                item.Tag = trace;
            });
            this.listMenu1.SelectedIndex = 0;
            this.listMenu1.HeaderText = TString.Format('Cases ({0})', this.listMenu1.Items.Count - 1);

        });

        this.listMenu1.SelectedIndex$.subscribe((selectedIndex: int) => {
            try {
                this.createModel(this.listMenu1.Items.Get(selectedIndex).Tag, dataset.ActivityColumn, dataset.StartDateColumn, dataset.TimeStampColumn);
            } catch {
            }
        });

    }


    private createModel(trace: Trace, activityKey: string, timeStampKey: string, enddate: string) {

        let i = 1;
        /*  this.flexItem1.Controls.Remove(this.svgCanvas);
         this.svgCanvas = new SvgCanvas();
         this.svgCanvas.Width = 1000;
         this.svgCanvas.Height = 400;
         this.flexItem1.Controls.Add(this.svgCanvas); */

        this.svgCanvas.Shapes._Clear().then(() => {
            this.svgCanvas.defineLinearGradient("grad1", [{
                "id": "s1",
                "offset": "0",
                "style": "stop-color:red;stop-opacity:1;"
            },
            {
                "id": "s2",
                "offset": "1",
                "style": "stop-color:#dadada;stop-opacity:1;"
            }]);


            this.svgCanvas.PaperHeight = TMath.max(500, trace.events.length * 250);

            if (trace.events.length > 1) {


                const dateFormat = parseFormat(trace.events[0].attributes[timeStampKey].value);
                const date = moment(trace.events[0].attributes[timeStampKey].value, dateFormat);

                const endDateFormat = parseFormat(trace.events[trace.events.length - 1].attributes[enddate].value);
                const endDate = moment(trace.events[trace.events.length - 1].attributes[enddate].value, endDateFormat);

                var diff = endDate.diff(date);


                const tx = Convert.ToInt32(200 + (300 / 2));
                const ty = Convert.ToInt32((150 * 1) + (75 / 2));

                const dateText = this.svgCanvas.text(tx + 200, 10, humanizeDuration(diff, { units: ["d", "h", "m"], round: true }));

                const ellipse = this.svgCanvas.ellipse(tx, ty, 15, 15);
                //ellipse.ToFront = true;
                ellipse.fill = 'yellow';
                //ellipse.fill_opacity = 1.0;

                let pp = 0;
                ellipse.OnAnimation = (e) => {
                    const matAttrs = ellipse.RElement.matrix.split();
                    dateText.y = ty + matAttrs.dy;
                    if (pp++ === 10) {
                        dateText.text = humanizeDuration(diff / 300 * matAttrs.dy, { units: ["d", "h", "m"], round: true });
                        pp = 0;
                    }
                }
                ellipse
                    // .to({ rx: 15, ry: 15 }, 3000)
                    .to({ /* rx: 0, ry: 0, */ transform: TString.Format("T0,{0}", (trace.events.length - 1) * 150) }, trace.events.length * 3000);

                ellipse.AfterRender.add(() => {
                    ellipse.StartAnimation();
                });
            }


            foreach(trace.events, (event: any) => {
                const r = this.svgCanvas.rect(200, 150 * i, 300, 75);
                r.fill = '270-#F0EEE8-#E1DFD9';
                r.stroke = '#838383';
                r.stroke_width = 1;

                const tx = Convert.ToInt32(200 + (300 / 2));
                const ty = Convert.ToInt32((150 * i) + (75 / 2));
                const text = this.svgCanvas.text(tx, ty - 10, event.attributes[activityKey].value);
                text.text_anchor = 'middle';


                const text1 = this.svgCanvas.text(tx, ty + 5, TString.Format('started at {0}', moment(event.attributes[timeStampKey].value).format('DD.MM.YYYY')));
                text1.text_anchor = 'middle';

                const text2 = this.svgCanvas.text(tx, ty + 20, TString.Format('complated at {0}', moment(event.attributes[enddate].value).format('DD.MM.YYYY')));
                text2.text_anchor = 'middle';


                if (i < trace.events.length) {
                    const line = this.svgCanvas.line(tx, ty + 38, tx, ty + 113);
                    line.AfterRender.add(() => line.RElement.toBack());
                    line.arrow_end = 'classic-wide-long';
                    /*  line.strokeLinearGradient ("grad1", 10); */
                    line.stroke = 'gray';
                    line.stroke_width = 5;
                }
                i++;
            });


        });
    }


    public override OnFormResized(w: int, h: int) {
        this.listMenu.Height = h - 260;
        this.listMenu1.Height = h - 260;
        this.panel.Height = h - 240;
        this.svgCanvas.Height = h - 280;

    }
}


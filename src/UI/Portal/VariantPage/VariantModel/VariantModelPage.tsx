import { Teact, DomHandler, Control, Property, TTabControl } from '@tuval/forms';
import { TvChart, sort } from '@tuval/components/charts';
import { Services } from '../../../../Services/Services';
import { CurrentDatasetChangedArgs } from '../../../../Services/StateService';
import { GridView } from '@tuval/components/grids';
import { IDataSet } from '../../../../Bussiness/IDataSet';
import { SvgCanvas } from '../../../controls/svgcanvas/SvgCanvas';
import { GeneralLogStatistics } from '../../../../Logic/statistics/log/general';
import { int, TString, Convert, foreach, Browser, Event, classNames } from '@tuval/core';
import { Trace } from '../../../../Logic/objects/log/Trace';
import { parseFormat } from '../../../../date/parseFormat';
import { PortalSideFilterControl } from '../../PortalSideControl/PortalSideFilterControl';
import { PerformanceModelViewer } from '../../../GeneralControls/PerformanceModelViewer';

declare var moment;
const colorPalette1: string[] = ['#FBB4AE', '#B3CDE3', '#CCEBC5', '#DECBE4', '#FED9A6', '#FFFFCC', '#E5D8BD', '#FDDAEC', '#F2F2F2'];
const caseCounts: any = {};
const caseTimes: any = {};

/* console.log('css');
console.log(css);
DomHandler.addCssToDocument(css); */

export class VariantModelPage extends Control<VariantModelPage> {

    @Property()
    private filter: PortalSideFilterControl;

    @Property()
    private loaded: boolean;

    @Property()
    private svgCanvas: SvgCanvas;

    @Property()
    private grid: GridView;

    @Property()
    private tabControl: TTabControl;

    @Property()
    public VariantClicked: Event<any>;

    public PerformanceModelViewer: PerformanceModelViewer;
    public SetupControlDefaults(): void {
        super.SetupControlDefaults();
        this.grid = new GridView();
        this.grid.Height = 690;
        this.grid.AutoGenerateColumns = false;

        this.svgCanvas = new SvgCanvas();
        this.svgCanvas.Width = -1200;
        this.svgCanvas.PaperWidth = 1200;
        this.svgCanvas.Height = Browser.WindowHeight - 180;
        this.svgCanvas.PaperHeight = 400;

        this.VariantClicked = new Event();

        this.loaded = false;

        this.PerformanceModelViewer = new PerformanceModelViewer();
        this.filter = new PortalSideFilterControl();
        const sidePanel1 = this.filter.Items.Add('', 'pi pi-filter');
        sidePanel1.Width = 700;
        sidePanel1.Controls.Add(this.PerformanceModelViewer);
        const sidePanel2 = this.filter.Items.Add('', 'fa fa-briefcase');
        const sidePanel3 = this.filter.Items.Add('', 'fa fa-sitemap');
        sidePanel3.Width = 700;
    }
    public SetDataSet(projectId: string, datasetId: string) {
        //setTimeout(()=>{
        if (this.loaded) {
            return;
        }

        //this.svgCanvas.Loading = true;
        Services.ProjectService.GetDatasetById(projectId, datasetId).then((dataset: IDataSet) => {
            const variants: any = GeneralLogStatistics.getVariants(dataset.EventLog, dataset.ActivityColumn);
            this.createModel(dataset, variants, dataset.ActivityColumn, dataset.TimeStampColumn, '');
            this.loaded = true;
        });
        //}, 2000);

    }
    private LightenDarkenColor(colorCode, amount) {
        var usePound = false;

        if (colorCode[0] == "#") {
            colorCode = colorCode.slice(1);
            usePound = true;
        }

        var num = parseInt(colorCode, 16);

        var r = (num >> 16) + amount;

        if (r > 255) {
            r = 255;
        } else if (r < 0) {
            r = 0;
        }

        var b = ((num >> 8) & 0x00FF) + amount;

        if (b > 255) {
            b = 255;
        } else if (b < 0) {
            b = 0;
        }

        var g = (num & 0x0000FF) + amount;

        if (g > 255) {
            g = 255;
        } else if (g < 0) {
            g = 0;
        }

        return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
    }
    private createModel(dataset, variansts: any, activityKey: string, timeStampKey: string, enddate: string) {
        this.svgCanvas.Shapes._Clear().then(() => {
            Services.ProjectService.GetVariantsInfo(Services.StateService.GetCurrentProject(), Services.StateService.GetCurrentDataset()).then(variantsInfo => {
                console.log(variantsInfo);

                let dynaheight = 0;
                for (let variant in variansts) {
                    dynaheight += 100;
                }
                this.svgCanvas.PaperWidth = 2000;
                this.svgCanvas.PaperHeight = dynaheight;
                let i = 0;
                let j = 0;
                const width: int = 100;
                const height: int = 70;
                const allEventsCount = variantsInfo.datasetEventCount;
                const totalTime = variantsInfo.totalTime;

                let counter = 0;
                const margin = 20;

                const titleCount = this.svgCanvas.text(190, 50 + (i * 100) + margin - 40, TString.Format('{0}', '% count'));
                titleCount.text_anchor = 'middle';
                titleCount.font_weight = 'bold';
                titleCount.font_family = 'Tahoma';
                titleCount.font_size = 11;

                const titleTime = this.svgCanvas.text(250, 50 + (i * 100) + margin - 40, TString.Format('{0}', '% time'));
                titleTime.text_anchor = 'middle';
                titleTime.font_weight = 'bold';
                titleTime.font_family = 'Tahoma';
                titleTime.font_size = 11;

                for (let i = 0; i < Math.min(variantsInfo.variants.length, 50); i++) {
                    const textTitle = this.svgCanvas.text(10, 40 + (i * 100) + margin, TString.Format('Variant {0}', i + 1));
                    textTitle.text_anchor = 'start';
                    textTitle.font_weight = 'bold';
                    textTitle.font_size = 14;
                    textTitle.fill = '#495057';
                    textTitle.Click = () => {

                      /*   this.VariantClicked({
                            dataset: dataset,
                            variantsInfo: variantsInfo.variants[i]
                        }); */

                        this.PerformanceModelViewer.SetVariantInfo(dataset, variantsInfo.variants[i]);

                        //this.variantDetailDialog.SetVariantInfo(this.DataSet, variantsInfo.variants[i]);
                        //this.variantDetailDialog.ShowDialog();
                    }
                    textTitle.MouseMove.add(() => {
                        textTitle.cursor = 'pointer';
                    });
                    textTitle.MouseOut = () => {
                        textTitle.cursor = 'default';

                    }

                    const textCases = this.svgCanvas.text(10, 60 + (i * 100) + margin, TString.Format('{0} case(s)', variantsInfo.variants[i].traceCount));
                    textCases.text_anchor = 'start';
                    textCases.font_size = 12;

                    const textEvents = this.svgCanvas.text(90, 50 + (i * 100) + margin, TString.Format('{0} event(s)', variantsInfo.variants[i].eventCountPerTrace));
                    textEvents.text_anchor = 'start';
                    textEvents.font_size = 12;

                    const percent = Convert.ToInt32((variantsInfo.variants[i].totalEventCount / allEventsCount) * 100);
                    const timePercent = Convert.ToInt32((variantsInfo.variants[i].totalTime / totalTime) * 100);

                    this.drawArc(190, 50 + (i * 100) + margin, 15, 100, '#F2F2F2');
                    this.drawArc(190, 50 + (i * 100) + margin, 15, percent, '#0f0');

                    this.drawArc(250, 50 + (i * 100) + margin, 15, 100, '#F2F2F2');
                    this.drawArc(250, 50 + (i * 100) + margin, 15, timePercent, '#0f0');

                    const textPercent = this.svgCanvas.text(190, 50 + (i * 100) + margin, TString.Format('{0}%', percent));
                    textPercent.text_anchor = 'middle';
                    textPercent.font_family = 'Tahoma';
                    textPercent.font_size = 11;

                    const textPercentTime = this.svgCanvas.text(250, 50 + (i * 100) + margin, TString.Format('{0}%', timePercent));
                    textPercentTime.text_anchor = 'middle';
                    textPercentTime.font_family = 'Tahoma';
                    textPercentTime.font_size = 11;

                    foreach(variantsInfo.variants[i].activities, (activity: string) => {
                        //this.svgCanvas.path(['M', 100, 200, 'H', 300, 'L', 350, 250, 'L', 300, 300, 'V', 300, 'H', 100, 'Z']);
                        const x = 300 + (j * 110);
                        const y = 10 + (i * 100) + margin;
                        if (j === 0) {
                            this.drawShape1Shadow(j, x, y, width, height);
                            this.drawShape1(j, x, y, width, height);
                        } else {
                            this.drawShape2Shadow(j, x, y, width, height);
                            this.drawShape2(j, x, y, width, height);
                        }

                        if (j === 0) {
                            const text1 = this.svgCanvas.text(x + (width / 2), y + (height / 2), activity);
                            text1.text_anchor = 'middle';
                        } else {
                            const text1 = this.svgCanvas.text(x + (width / 2) + (height / 4), y + (height / 2), this.wordWrap(activity, 15));
                            text1.text_anchor = 'middle';
                        }

                        j++;
                    });
                    j = 0;
                }

                // this.svgCanvas.Loading = false;
            });
        });
    }

    private drawShape1(index: int, x: int, y: int, width: int, height: int) {
        const path = this.svgCanvas.path(['M', x, y, 'H', x + width, 'L', x + width + height / 4, y + height / 2, 'L', x + width, y + height, 'H', x, 'Z']);
        path.fill = colorPalette1[index % 9];
        path.stroke = this.LightenDarkenColor(colorPalette1[index % 9], -20);
    }

    private drawShape1Shadow(index: int, x: int, y: int, width: int, height: int) {
        const path = this.svgCanvas.path(['M', x, y, 'H', x + width, 'L', x + width + height / 4, y + height / 2, 'L', x + width, y + height, 'H', x, 'Z']);
        path.fill = colorPalette1[index % 9];
        path.blur = 4;
    }
    private drawShape2(index: int, x: int, y: int, width: int, height: int) {
        const path = this.svgCanvas.path(['M', x, y, 'H', x + width, 'L', x + width + height / 4, y + height / 2, 'L', x + width, y + height, 'H', x, 'L', x + height / 4, y + height / 2, 'Z']);
        path.fill = colorPalette1[index % 9];
        path.stroke = this.LightenDarkenColor(colorPalette1[index % 9], -20);
    }
    private drawShape2Shadow(index: int, x: int, y: int, width: int, height: int) {
        const path = this.svgCanvas.path(['M', x, y, 'H', x + width, 'L', x + width + height / 4, y + height / 2, 'L', x + width, y + height, 'H', x, 'L', x + height / 4, y + height / 2, 'Z']);
        path.fill = colorPalette1[index % 9];
        path.blur = 4;
    }

    private drawArc(x: int, y: int, r: int, value, color: string) {
        var xloc = x,
            yloc = y,
            total = 100,
            R = r,
            alpha = 360 / total * value,
            a = (90 - alpha) * Math.PI / 180,
            x = xloc + R * Math.cos(a),
            y = yloc - R * Math.sin(a),
            path;
        if (total === value) {
            path = [
                ["M", xloc, yloc - R],
                ["A", R, R, 0, 1, 1, xloc - 0.01, yloc - R]
            ];
        } else {
            path = [
                ["M", xloc, yloc - R],
                ["A", R, R, 0, +(alpha > 180), 1, x, y]
            ];
        }

        const _path = this.svgCanvas.path(path);
        _path.stroke = color;//"#0f0"
        _path.stroke_width = 7;
    }

    private getTraceEventCount(trace: Trace): int {
        return trace.events.length;
    }
    private getVariantEventCount(key: string, variant: any): int {
        if (caseCounts[key] == null) {
            let sum = 0;
            for (let i = 0; i < variant.traces.length; i++) {
                sum += this.getTraceEventCount(variant.traces[i]);
            }
            caseCounts[key] = sum;
        }
        return caseCounts[key];
    }

    private getAllEventCount(): int {
        /*  let sum = 0;
         for (let i = 0; i < this.DataSet.EventLog.traces.length; i++) {
             sum += this.DataSet.EventLog.traces[i].events.length;
         }
         return sum; */
        return 0;
    }

    private getTraceTotalTime(trace: Trace, timeField: string): int {
        const dateFormat = parseFormat(trace.events[0].attributes[timeField].value);
        const date = moment(trace.events[0].attributes[timeField].value, dateFormat).toDate();
        const ts1 = date.getTime();

        const dateFormat1 = parseFormat(trace.events[trace.events.length - 1].attributes[timeField].value);
        const date1 = moment(trace.events[trace.events.length - 1].attributes[timeField].value, dateFormat1).toDate();
        const ts2 = date1.getTime();

        return ts2 - ts1;
    }

    private getVariantTotalTime(key: string, variant: any, timeField: string): int {
        /*  const startDate = variant.traces[0].events[0].attributes[this.DataSet.TimeStampColumn].value;
         const endDate = variant.traces[variant.traces.length - 1].events[variant.traces[variant.traces.length - 1].events.length - 1].attributes[this.DataSet.TimeStampColumn].value;
         var date1 = moment(startDate);
         var date2 = moment(endDate);
         const diff = date2.diff(date1);

         return diff; */
        return 0;
    }

    // Olay için bir variant içindeki tüm süreleri alır
    private getVariantEventTimes(variantTraces: Trace[], activityFieldName: string, startDateFieldName: string, endDateFieldName: string): any {
        const sums = {};
        for (let i = 0; i < variantTraces.length; i++) {
            let _sum = 0;
            const trace = variantTraces[i];
            for (let j = 0; j < trace.events.length; j++) {
                const dateFormat = parseFormat(trace.events[j].attributes[endDateFieldName].value);
                const date = moment(trace.events[j].attributes[endDateFieldName].value, dateFormat).toDate();
                const ts1 = date.getTime();

                const dateFormat1 = parseFormat(trace.events[j].attributes[startDateFieldName].value);
                const date1 = moment(trace.events[j].attributes[startDateFieldName].value, dateFormat1).toDate();
                const ts2 = date1.getTime();

                if (sums[trace.events[j].attributes[activityFieldName].value] == null) {
                    sums[trace.events[j].attributes[activityFieldName].value] = 0;
                }
                sums[trace.events[j].attributes[activityFieldName].value] += (ts1 - ts2);
            }
        }
        return sums;
    }

    private getAllTotalTime(variants: any, timeField: string): int {
        return 0;
        /* const startDate = this.DataSet.EventLog.traces[0].events[0].attributes[this.DataSet.TimeStampColumn].value;
        const endDate = this.DataSet.EventLog.traces[this.DataSet.EventLog.traces.length - 1].events[this.DataSet.EventLog.traces[this.DataSet.EventLog.traces.length - 1].events.length - 1].attributes[this.DataSet.TimeStampColumn].value;
        var date1 = moment(startDate);
        var date2 = moment(endDate);
        const diff = date2.diff(date1);
        return diff; */
    }

    private wordWrap(str, maxWidth) {
        if (str == null)
            return str;

        var newLineStr = "\r\n";
        let done: boolean = false;
        let res: string = '';
        let found: boolean = false;
        while (str.length > maxWidth) {
            found = false;
            // Inserts new line at first whitespace of the line
            for (let i: int = maxWidth - 1; i >= 0; i--) {
                if (this.testWhite(str.charAt(i))) {
                    res = res + [str.slice(0, i), newLineStr].join('');
                    str = str.slice(i + 1);
                    found = true;
                    break;
                }
            }
            // Inserts new line at maxWidth position, the word is too long to wrap
            if (!found) {
                res += [str.slice(0, maxWidth), newLineStr].join('');
                str = str.slice(maxWidth);
            }

        }

        return res + str;
    }

    private testWhite(x) {
        var white = new RegExp(/^\s$/);
        return white.test(x.charAt(0));
    }


    CreateElements() {
        return (
            <div>
                {(this.filter as any).CreateMainElement()}
                <div class="dashboard" style="margin-bottom: 100px;">
                    <div id="eventlog-header" class="clearfix">
                        <h2 class="page-header">
                            <i class="fa fa-variant"></i>&nbsp;Variant Model&nbsp;&nbsp;
                        </h2>
                    </div>
                    <div class="row">
                        <div class="col-md-12" style="padding-left:5px;padding-right: 5px;">
                            {(this.svgCanvas as any).CreateMainElement()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    /* public override OnFormResized(w: int, h: int) {
                    this.svgCanvas.Height = h - 170;
    } */

}
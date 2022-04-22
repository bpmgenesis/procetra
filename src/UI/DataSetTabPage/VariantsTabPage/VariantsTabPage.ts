import { TTabPage, TTabControl, Dialog } from '@tuval/forms';
import { SvgCanvas } from '../../controls/svgcanvas/SvgCanvas';
import { is, foreach, int, TString, Convert } from '@tuval/core';
import { DataSet } from '../../../Bussiness/DataSet';
import { GeneralLogStatistics } from '../../../Logic/statistics/log/general';
import { Trace } from '../../../Logic/objects/log/Trace';
import { Tokens } from '../../../Bussiness/Tokens';
import { parseFormat } from '../../../date/parseFormat';
import { TSpreadsheet, getFormatFromType } from '@tuval/components/spreadsheet';
import { IDataSet } from '../../../Bussiness/IDataSet';
import { ExcelSubTabPage } from './ExcelSubTabPage';
import { humanizeDuration } from '../../../Logic/utils/generic/humanize-duration';
import { SvgViewer } from '../../controls/SvgViewer';
import { FlexLayout } from '../../controls/layout/FlexLayout';
import { JustifyContents } from '../../controls/layout/JustifyContents';
import { Services } from '../../../Services/Services';
import { VariantDetailDialog } from './VariantDetails/VariantDetailDialog';

declare var moment;
const colorPalette1: string[] = ['#FBB4AE', '#B3CDE3', '#CCEBC5', '#DECBE4', '#FED9A6', '#FFFFCC', '#E5D8BD', '#FDDAEC', '#F2F2F2'];
const caseCounts: any = {};
const caseTimes: any = {};
export class VariantsTabPage extends TTabPage {
    private svgCanvas: SvgCanvas;
    private tabControl: TTabControl;
    graphTabPage: TTabPage;
    excelTabPage: ExcelSubTabPage;
    DataSet: IDataSet;
    sp: TSpreadsheet;
    variantDetailDialog: VariantDetailDialog;

    public override InitComponents() {
        this.InitNanVisualComponents();
        this.Text = 'Variant Explorer';
        this.tabControl = new TTabControl();
        this.tabControl.SelectedIndexChanged.add(this.OnTabControlSelectedIndexChanged.bind(this));

        this.graphTabPage = new TTabPage();
        this.graphTabPage.Text = 'Variant Graph';

        this.tabControl.TabPages.Add(this.graphTabPage);


        this.svgCanvas = new SvgCanvas();
        this.svgCanvas.Width = 1200;
        this.svgCanvas.Height = 400;
        this.graphTabPage.Controls.Add(this.svgCanvas);

        this.excelTabPage = new ExcelSubTabPage();
        this.excelTabPage.Text = 'Table';

        this.tabControl.TabPages.Add(this.excelTabPage);


        this.Controls.Add(this.tabControl);
    }

    private InitNanVisualComponents() {
        this.variantDetailDialog = new VariantDetailDialog();
        this.Controls.Add(this.variantDetailDialog);
    }

    private OnTabControlSelectedIndexChanged(index: int) {
        if (index === 0 && !this.graphTabPage.Tag) {
            this.graphTabPage.Tag = true;
            //this.graphTabPage.SetDataSet(this.DataSet);
        }
        if (index === 1 && !this.excelTabPage.Tag) {
            setTimeout(() => this.SendResizeRequest(), 100);
            this.excelTabPage.Tag = true;
            this.sp = new TSpreadsheet();
            this.sp.Height = 600;

            /*   const eventLog = CsvImporter.apply(this.DataSet.CsvString, this.DataSet.Separator, '"', this.DataSet.CaseColumn, this.DataSet.ActivityColumn,
                  this.DataSet.TimeStampColumn, this.DataSet.DateFormat); */

            Services.ProjectService.GetVariantsInfo(this.DataSet.ProjectId, this.DataSet.Id).then(variantsInfo => {
                const variants: any = GeneralLogStatistics.getVariants(this.DataSet.EventLog, this.DataSet.ActivityColumn);
                let currencyFormat: string = getFormatFromType('Currency');

                let variantsArray = [];
                for (let i = 0; i < variantsInfo.variants.length; i++) {
                    const variant = variantsInfo.variants[i];
                    variantsArray.push(variant.activities);
                }

                let maxLenght = 0;
                for (let i = 0; i < variantsArray.length; i++) {
                    maxLenght = Math.max(maxLenght, variantsArray[i].length);
                }

                const rows: any[] = [];
                const headerCells = [];
                let headerIndex = 1;
                let columns = [];
                for (let i = 0; i < variantsInfo.variants.length; i++) {
                    headerCells.push({ value: 'Variant ' + headerIndex, style: { fontWeight: 'bold', textAlign: 'center' } },);
                    headerCells.push({ value: 'Time ' + headerIndex++, style: { fontWeight: 'bold', textAlign: 'center' } },);
                    columns.push({ width: 140 });
                    columns.push({ width: 140 });
                }
                rows.push({
                    cells: headerCells
                });

                for (let i = 0; i < maxLenght; i++) {
                    const cells = [];
                    for (let j = 0; j < variantsArray.length; j++) {
                        cells.push({ value: variantsArray[j][i] });
                        const sums = this.getVariantEventTimes(variantsInfo.variants[j].traces, this.DataSet.ActivityColumn,
                            this.DataSet.StartDateColumn, this.DataSet.TimeStampColumn);
                        if (sums[variantsArray[j][i]] == null) {
                            cells.push({ value: '' });
                        } else {
                            cells.push({ value: humanizeDuration(sums[variantsArray[j][i]], { units: ["d", "h", "m"], round: true }) });
                        }
                    }
                    rows.push({
                        cells: cells
                    });
                }

                this.sp.Sheets = [
                    {
                        name: 'Monthly Budget',
                        selectedRange: 'A1',
                        rows: rows,
                        columns: columns
                    }
                ];
            });


            this.excelTabPage.Controls.Add(this.sp);
        }

    }

    public SetDataSet(dataset: IDataSet) {
        this.DataSet = dataset;
        //this.Controls.Add(new TSpreadsheet());


        this.svgCanvas.Loading = true;
        const variants: any = GeneralLogStatistics.getVariants(dataset.EventLog, dataset.ActivityColumn);
        this.createModel(variants, dataset.ActivityColumn, dataset.TimeStampColumn, '');

        /*   const traces = variants[0].traces;

          foreach(traces, (trace: Trace) => {
              const item = trace.attributes['concept:name'].value;
          });
*/


        // this.createModel(this.listMenu1.Items.Get(selectedIndex).Tag, dataset.ActivityColumn, dataset.StartDateColumn, dataset.TimeStampColumn);


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
    private createModel(variansts: any, activityKey: string, timeStampKey: string, enddate: string) {

        this.svgCanvas.Shapes._Clear().then(() => {

            Services.ProjectService.GetVariantsInfo(this.DataSet.ProjectId, this.DataSet.Id).then(variantsInfo => {

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
                    textTitle.fill = 'blue';
                    textTitle.Click = () => {
                        this.variantDetailDialog.SetVariantInfo(this.DataSet, variantsInfo.variants[i]);
                        this.variantDetailDialog.ShowDialog();
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

                this.svgCanvas.Loading = false;
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
        let sum = 0;
        for (let i = 0; i < this.DataSet.EventLog.traces.length; i++) {
            sum += this.DataSet.EventLog.traces[i].events.length;
        }
        return sum;
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
        const startDate = variant.traces[0].events[0].attributes[this.DataSet.TimeStampColumn].value;
        const endDate = variant.traces[variant.traces.length - 1].events[variant.traces[variant.traces.length - 1].events.length - 1].attributes[this.DataSet.TimeStampColumn].value;
        var date1 = moment(startDate);
        var date2 = moment(endDate);
        const diff = date2.diff(date1);

        return diff;
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
        const startDate = this.DataSet.EventLog.traces[0].events[0].attributes[this.DataSet.TimeStampColumn].value;
        const endDate = this.DataSet.EventLog.traces[this.DataSet.EventLog.traces.length - 1].events[this.DataSet.EventLog.traces[this.DataSet.EventLog.traces.length - 1].events.length - 1].attributes[this.DataSet.TimeStampColumn].value;
        var date1 = moment(startDate);
        var date2 = moment(endDate);
        const diff = date2.diff(date1);
        return diff;
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

    public override OnFormResized(w: int, h: int) {
        this.svgCanvas.Height = h - 270;
        if (this.sp) {
            this.sp.Height = h - 270;
        }
        /* this.listMenu.Height = h - 260;
        this.listMenu1.Height = h - 260;
        this.panel.Height = h - 240; */

    }

}
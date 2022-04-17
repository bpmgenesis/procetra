import { VariantFreqModelTabPage } from './VariantFreqModelTabPage';
import { VariantPerfModelTabPage } from './VariantPerfModelTabPage.ts';
import { GridView } from '@tuval/components/grids';
import { SvgViewer } from '../../../controls/SvgViewer';
import { EventLog } from '../../../../Logic/objects/log/EventLog';
import { Dialog, TTabControl, TTabPage, Button } from '@tuval/forms';
import { IDataSet } from '../../../../Bussiness/IDataSet';
import { PerformanceDfgDiscovery } from '../../../../Logic/algo/discovery/dfg/algorithm';
import { DfgSliders } from '../../../../Logic/objects/dfg/util/sliders';
import { PerformanceDfgGraphvizVisualizer } from '../../../../Logic/visualization/dfg/performance';
import { foreach, int } from '@tuval/core';
import { SvgCanvas } from '../../../controls/svgcanvas/SvgCanvas';

declare var Viz;

const colorPalette1: string[] = ['#FBB4AE', '#B3CDE3', '#CCEBC5', '#DECBE4', '#FED9A6', '#FFFFCC', '#E5D8BD', '#FDDAEC', '#F2F2F2'];

export class VariantDetailDialog extends Dialog {
    private svgCanvas: SvgCanvas;
    svgViewer: SvgViewer;
    grid: GridView;
    PerfModelTabPage: VariantPerfModelTabPage;
    FreqModelTabPage: VariantFreqModelTabPage;
    protected override InitComponents(): void {
        this.Width = 900;
        this.Height = 700;
        this.Text = 'Variant Detail';

        this.svgCanvas = new SvgCanvas();
        this.svgCanvas.Width = 800;
        this.svgCanvas.Height = 120;
        this.svgCanvas.PaperWidth = 800;
        this.svgCanvas.PaperHeight = 100;

        this.Controls.Add(this.svgCanvas);

        const tabControl = new TTabControl();

        this.PerfModelTabPage = new VariantPerfModelTabPage();
        this.PerfModelTabPage.Text = 'Perf Model';
        tabControl.TabPages.Add(this.PerfModelTabPage);

        this.FreqModelTabPage = new VariantFreqModelTabPage();
        this.FreqModelTabPage.Text = 'Freq Model';
        tabControl.TabPages.Add(this.FreqModelTabPage);


        const tabPageData = new TTabPage();
        tabPageData.Text = 'Data';

        this.grid = new GridView();
        this.grid.Height = 300;
        tabPageData.Controls.Add(this.grid);

        tabControl.TabPages.Add(tabPageData);

        this.Controls.Add(tabControl);

        const btnOK = new Button();
        btnOK.Text = 'OK';
        btnOK.Color = 2;
        btnOK.Clicked = (() => {
            //this.OnOKClick();
            this.Hide();

        }) as any;

        /*  const btnCancel = new Button();
         btnCancel.Text = 'Cancel';
         btnCancel.Color = 1;
         btnCancel.OnClick = (() => {
             this.Hide();
         }) as any; */

        this.FooterControls.AddRange([btnOK, /* btnCancel */]);
    }

    public SetVariantInfo(dataset: IDataSet, variantInfo: any) {
        setTimeout(() => {
            this.createVariantModel(variantInfo.activities);
        }, 100);

        this.PerfModelTabPage.SetVariantInfo(dataset, variantInfo);
        this.FreqModelTabPage.SetVariantInfo(dataset, variantInfo);

        setTimeout(() => {
            const eventLog = new EventLog();
            eventLog.traces = variantInfo.traces;
            this.grid.DataSource = this.getEventLogAsData(eventLog);
        }, 100);

        /*  console.log(variantInfo);
         const eventLog = new EventLog();
         eventLog.traces = variantInfo.traces;
         let frequencyDfg = PerformanceDfgDiscovery.apply(eventLog,
             dataset.ActivityColumn, dataset.TimeStampColumn, 'mean', dataset.StartDateColumn);
         frequencyDfg = DfgSliders.filterDfgOnPercActivities(frequencyDfg, 1);

         let gv = PerformanceDfgGraphvizVisualizer.apply(frequencyDfg);
         const svg = Viz(gv, { format: "svg" });


  */

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
    private createVariantModel(activities: string[]) {

        this.svgCanvas.Shapes._Clear().then(() => {
            let j = 0;
            const width: int = 100;
            const height: int = 70;
            foreach(activities, (activity: string) => {
                //this.svgCanvas.path(['M', 100, 200, 'H', 300, 'L', 350, 250, 'L', 300, 300, 'V', 300, 'H', 100, 'Z']);
                const x = (j * 110);
                const y = 10;
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
        });

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

    private getEventLogAsData(eventLog: EventLog): any {
        const data = [];

        for (let i = 0; i < eventLog.traces.length; i++) {
            for (let j = 0; j < eventLog.traces[i].events.length; j++) {
                const row = {};
                for (let key in eventLog.traces[i].events[j].attributes) {
                    if (eventLog.traces[i].events[j].attributes[key] instanceof Date) {
                        row[key] = eventLog.traces[i].events[j].attributes[key];
                    } else {
                        row[key] = eventLog.traces[i].events[j].attributes[key].value;
                    }
                }
                data.push(row);
            }
        }
        return data;
    }
}
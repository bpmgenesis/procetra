import { GridView } from '@tuval/components/grids';
import { GridColumn, TextAlign } from '@tuval/forms';
import { humanizeDuration } from '../../../../Logic/utils/generic/humanize-duration';
declare var moment;
export class CaseOverviewGrid extends GridView {
    protected InitComponents(): void {
        const activityCol = new GridColumn('case:concept:name', 'Case Id');
        activityCol.headerTextAlign = TextAlign.Center;
        activityCol.textAlign = TextAlign.Left;
        activityCol.width = 90;

     /*    const countCol = new GridColumn('count', 'Events');
        countCol.headerTextAlign = TextAlign.Center;
        countCol.textAlign = TextAlign.Right;
        countCol.width = 30; */

        const rateCol = new GridColumn('count', 'Events');
        rateCol.formatter = {
            getValue: (column: any, data: any): Object => {
                return `<span>
                            <table>
                                <tr>
                                    <td>
                                        <div style='text-align:right;width:40px;padding:2px;paddingright:5px;'>${data.count}</div>
                                    </td>
                                    <td>
                                        <svg width="${data.rate * data.max_freq}" height="18" style='text-align: left;vertical-align: middle;'>
                                            <rect width="${data.rate * data.max_freq}" height="20" style="fill:#548CD1;stroke-width:0;stroke:rgb(0,0,0)" />
                                        </svg>
                                    </td>
                                </tr>
                            </table>
                    </<span>`;
            }
        }
        rateCol.headerTextAlign = TextAlign.Center;
        rateCol.textAlign = TextAlign.Left;
        rateCol.width = 50;

        const meanCol = new GridColumn('min', 'Started');
        meanCol.headerTextAlign = TextAlign.Center;
        meanCol.textAlign = TextAlign.Left;
        meanCol.width = 50;
        meanCol.formatter = {
            getValue: (column: any, data: any): Object => {
                return moment(data.min).format('DD.MM.YYYY HH:mm:ss') ;
            }
        }

        const medianCol = new GridColumn('max', 'Finished');
        medianCol.headerTextAlign = TextAlign.Center;
        medianCol.textAlign = TextAlign.Left;
        medianCol.width = 50;
        medianCol.formatter = {
            getValue: (column: any, data: any): Object => {
                return data.max;
            }
        }

        const durationRangeCol = new GridColumn('Diff', 'Duration');
        durationRangeCol.headerTextAlign = TextAlign.Center;
        durationRangeCol.textAlign = TextAlign.Left;
        durationRangeCol.width = 50;
        durationRangeCol.formatter = {
            getValue: (column: any, data: any): Object => {
                return humanizeDuration(data.Diff * 1000, { units: ["d", "h", "m", 's'], round: true });
            }
        }

        this.GridLines = 'Both';
        this.RowHeight = 30;
        this.Columns.Add(activityCol);
        this.Columns.Add(rateCol);
        this.Columns.Add(meanCol);
        this.Columns.Add(medianCol);
        this.Columns.Add(durationRangeCol);
    }
}
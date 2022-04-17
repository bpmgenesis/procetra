import { GridView } from '@tuval/components/grids';
import { GridColumn, TextAlign } from '@tuval/forms';
import { humanizeDuration } from '../../../../Logic/utils/generic/humanize-duration';

export class ItemOverviewGrid extends GridView {
    protected InitComponents(): void {
        const activityCol = new GridColumn('item_name', 'Item');
        activityCol.headerTextAlign = TextAlign.Center;
        activityCol.textAlign = TextAlign.Left;
        activityCol.width = 90;

        const countCol = new GridColumn('count', 'Frequency');
        countCol.headerTextAlign = TextAlign.Center;
        countCol.textAlign = TextAlign.Right;
        countCol.width = 30;

        const rateCol = new GridColumn('rate', 'Relative Frequency');
        rateCol.formatter = {
            getValue: (column: any, data: any): Object => {
                return `<span>
                            <table>
                                <tr>
                                    <td>
                                        <div style='text-align:right;width:40px;padding:2px;paddingright:5px;'>${Math.round(data.rate)}%</div>
                                    </td>
                                    <td>
                                        <svg width="${data.rate * (100 / data.max_rate)}%" height="18" style='text-align: left;vertical-align: middle;'>
                                            <rect width="100%" height="20" style="fill:#548CD1;stroke-width:0;stroke:rgb(0,0,0)" />
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



        this.GridLines = 'Both';
        this.RowHeight = 30;
        this.Columns.Add(activityCol);
        this.Columns.Add(countCol);
        this.Columns.Add(rateCol);
    }
}
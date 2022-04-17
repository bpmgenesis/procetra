import { TTabPage, TTabControl } from '@tuval/forms';
import { SvgCanvas } from '../../controls/svgcanvas/SvgCanvas';
import { is, foreach, int, TString, Convert } from '@tuval/core';
import { DataSet } from '../../../Bussiness/DataSet';
import { CsvImporter } from '../../../Logic/objects/log/importer/csv/importer';
import { GeneralLogStatistics } from '../../../Logic/statistics/log/general';
import { Trace } from '../../../Logic/objects/log/Trace';
import { Tokens } from '../../../Bussiness/Tokens';
import { parseFormat } from '../../../date/parseFormat';
import { TSpreadsheet } from '@tuval/components/spreadsheet';
import { IDataSet } from '../../../Bussiness/IDataSet';

declare var moment;
const colorPalette1: string[] = ['#FBB4AE', '#B3CDE3', '#CCEBC5', '#DECBE4', '#FED9A6', '#FFFFCC', '#E5D8BD', '#FDDAEC', '#F2F2F2'];
const caseCounts: any = {};
const caseTimes: any = {};
export class ExcelSubTabPage extends TTabPage {

    public override InitComponents() {
        this.Text = 'Variants';


    }

    public SetDataSet(dataset: IDataSet) {

    }



    public override OnFormResized(w: int, h: int) {
        /* this.listMenu.Height = h - 260;
        this.listMenu1.Height = h - 260;
        this.panel.Height = h - 240; */

    }

}
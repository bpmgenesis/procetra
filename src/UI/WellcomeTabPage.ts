import { TTabPage, Button, DomHandler } from '@tuval/forms';
import { BoxTile } from './controls/wellcomeControls/BoxTile';
import { ProcessMining } from '../Application';
import { foreach, EventBus, Convert, Encoding, TString } from '@tuval/core';
import { BoxTileItem } from './controls/wellcomeControls/BoxTileItem';
import { TSpreadsheet } from '@tuval/components/spreadsheet';


declare var moment;

export class WellcomeTabPage extends TTabPage {
    ss: TSpreadsheet;
    public override InitComponents() {
        this.Text = 'Welcome';

        const bt = new BoxTile();
        bt.Title = 'Recent uploaded files';
        bt.Description = 'Below you will find the files you uploaded earlier. You can open it by clicking.';
        this.Controls.Add(bt);
        ProcessMining.RecentlyUploadedFilesStorage.Keys().then((keys) => {
            foreach(keys, key => {
                ProcessMining.RecentlyUploadedFilesStorage.GetString(key).then((str) => {
                    const obj = JSON.parse(str);
                    const bi: BoxTileItem = new BoxTileItem(key, obj.rowsCount + ' rows');
                    const dateStr = moment(obj.uploadeddate).format('DD.MM.YYYY');
                    bi.FooterTitle = TString.Format('Uploaded at {0}', dateStr);
                    bi.OnClick = () => {
                        EventBus.Default.fire('P2M.C.ADD_CSV', {
                            name: key,
                            csv: Encoding.UTF8.GetString(Convert.FromBase64String(obj.csv)),
                            caseName: obj.caseName,
                            activityName: obj.activityName,
                            timestampName: obj.timestampName,
                            startDateName: obj.startDateName
                        });
                    };
                    bt.Items.Add(bi);
                });

            });
        }).catch(err => console.log(err));
    }

    /*   public componentWillUnmount() {
          this.ss.Destroy();
      } */
}
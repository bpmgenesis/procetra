import { TTabPage, Property } from '@tuval/forms';
import { GridView } from '@tuval/components/grids';
import { Services } from '../../../../Services/Services';
import { CurrentDatasetChangedArgs } from '../../../../Services/StateService';
import { FreqModelPage } from './FreqModelPage';

export class FreqModelTabPage extends TTabPage {

    @Property()
    private page: FreqModelPage;

    public override InitComponents() {
         this.page = new FreqModelPage();
        this.Controls.Add(this.page);
    }

    public SetDataSet(projectId: string, datasetId: string) {
       this.page.SetDataSet(projectId, datasetId);
    }
}
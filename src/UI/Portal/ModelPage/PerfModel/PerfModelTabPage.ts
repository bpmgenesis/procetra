import { TTabPage, Property } from '@tuval/forms';
import { GridView } from '@tuval/components/grids';
import { Services } from '../../../../Services/Services';
import { CurrentDatasetChangedArgs } from '../../../../Services/StateService';
import { PerfModelPage } from './PerfModelPage';

export class PerfModelTabPage extends TTabPage {

    @Property()
    private page: PerfModelPage;

    public override InitComponents() {
         this.page = new PerfModelPage();
        this.Controls.Add(this.page);
    }

    public SetDataSet(projectId: string, datasetId: string) {
       this.page.SetDataSet(projectId, datasetId);
    }
}
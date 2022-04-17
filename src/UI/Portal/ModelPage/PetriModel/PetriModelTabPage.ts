import { TTabPage, Property } from '@tuval/forms';
import { GridView } from '@tuval/components/grids';
import { Services } from '../../../../Services/Services';
import { CurrentDatasetChangedArgs } from '../../../../Services/StateService';
import { PetriModelPage } from './PetriModelPage';

export class PetriModelTabPage extends TTabPage {

    @Property()
    private page: PetriModelPage;

    public override InitComponents() {
         this.page = new PetriModelPage();
        this.Controls.Add(this.page);
    }

    public SetDataSet(projectId: string, datasetId: string) {
       this.page.SetDataSet(projectId, datasetId);
    }
}
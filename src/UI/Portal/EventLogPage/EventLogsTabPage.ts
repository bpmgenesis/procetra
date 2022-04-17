import { TTabPage } from '@tuval/forms';
import { GridView } from '@tuval/components/grids';
import { Services } from '../../../Services/Services';
import { CurrentDatasetChangedArgs } from '../../../Services/StateService';
import { EventLogPage } from './EventLogPage';

export class EventLogsTabPage extends TTabPage {
    private page: EventLogPage;
    public override InitComponents() {
        this.page = new EventLogPage();
        this.Controls.Add(this.page);
    }

    public SetDataSet(projectId: string, datasetId: string) {
       this.page.SetDataSet(projectId, datasetId);
    }
}
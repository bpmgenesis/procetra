import { Teact, DomHandler, Control, Property } from '@tuval/forms';
import { TvChart, sort } from '@tuval/components/charts';
import { Services } from '../../../Services/Services';
import { CurrentDatasetChangedArgs } from '../../../Services/StateService';
import { GridView } from '@tuval/components/grids';

/* console.log('css');
console.log(css);
DomHandler.addCssToDocument(css); */

export class EventLogPage extends Control<EventLogPage> {

    @Property()
    private grid: GridView;

    public SetupControlDefaults(): void {
        super.SetupControlDefaults();
        this.grid = new GridView();
        this.grid.Height = 690;
        this.grid.AutoGenerateColumns = false;
    }
    public SetDataSet(projectId: string, datasetId: string) {

        Services.ProjectService.GetDatasetAsData(projectId, datasetId).then(data => {
            this.grid.DataSource = data;
            this.grid.Loading = false;
        });
    }

    CreateElements() {
        return (
            <div class="dashboard" style="margin-bottom: 100px;">
                <div id="eventlog-header" class="clearfix">
                    <h2 class="page-header">
                        <i class="fa fa-eventlog"></i>&nbsp;Event Data&nbsp;&nbsp;
                    </h2>
                </div>
                <div class="row">
                    <div class="col-md-12" style="padding-left:5px;padding-right: 5px;">
                        {(this.grid as any).CreateMainElement()}
                    </div>
                </div>
            </div>
        );
    }

}
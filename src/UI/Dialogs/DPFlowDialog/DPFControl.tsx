import { Control, Teact, ContainerControl, DomHandler, Property, DropArea, DropEventArgs } from '@tuval/forms';
import { StateService } from '../../../Services/StateService';
import { ImportCsv } from './Activities/ImportCsvActivity';
import { ActivityCollection, DataSourceActivityCollection } from './ActivityCollection';
import { Enum } from '@tuval/core';
import { ActivityTypes } from './Activities/Activity';
import { DeleteDublucatesActivity } from './Activities/DeleteDublicates';
import { ChangeCaseActivity } from './Activities/ChangeCase/ChangeCase';
import { ActivityFactory } from './ActivityFactory';
import { IDataSourceActivity } from './Activities/IDataSourceActivity';

DomHandler.addCssToDocument(require('./DPFControl.css'));
export class DPFControl extends ContainerControl<DPFControl> {

    @Property()
    public Variables: any;

    @Property()
    public Activities: ActivityCollection;

    @Property()
    public DataSources: DataSourceActivityCollection;

    @Property()
    private dropZone: DropArea;

    @Property()
    private dataSourceDropZone: DropArea;

    protected SetupControlDefaults(): void {
        super.SetupControlDefaults();
        this.Activities = new ActivityCollection(this);
        this.DataSources = new DataSourceActivityCollection(this);
        this.Variables = {};

        this.dataSourceDropZone = new DropArea();
        this.dataSourceDropZone.Text = 'Drag Datasource Here';
        this.dataSourceDropZone.Height = 80;
        this.dataSourceDropZone.Width = 200;
        this.dataSourceDropZone.Drop.add((e: DropEventArgs) => {

            const key = StateService.GetAndDeleteStateVariable('CurrentDraggingActivity');
            if (key) {
                const activity = ActivityFactory.CreateDatasource(this, key);
                if (activity) {
                    this.DataSources.Add(activity as any);
                }
            }


        });

        this.dropZone = new DropArea();
        this.dropZone.Text = 'Drag Activity Here';
        this.dropZone.Height = 80;
        this.dropZone.Width = 200;
        this.dropZone.Drop.add((e: DropEventArgs) => {
            // alert(e.nativeEvent.dataTransfer.getData('text'));
            /* const activityType = e.nativeEvent.dataTransfer.getData('text');
            alert(e.nativeEvent.dataTransfer.getData('text')); */
            const key = StateService.GetAndDeleteStateVariable('CurrentDraggingActivity');
            if (key) {
                const activity = ActivityFactory.Create(this, key);
                this.Activities.Add(activity);
            }


            // e.sender.AllowDrop = false;
        });

    }

    public Clear() {
        this.DataSources.Clear();
        this.Activities.Clear();
    }

    public GetDataSource(name: string): IDataSourceActivity {
        const datasource = this.DataSources.Find(item => item.GetDataSourceName() === name);
        return datasource;
    }

    public GetDataSources(): IDataSourceActivity[] {
        return this.DataSources.ToArray();
    }

    private renderStart() {
        return (
            <div class="grid">
                <div class="col"></div>
                <div class="col flex align-items-center justify-content-center">
                    <svg height="50" width="50">
                        <circle cx="25" cy="25" r="20" stroke="black" stroke-width="1" fill="green" />
                    </svg>
                </div>
                <div class="col"></div>
            </div>
        );
    }
    private renderEnd() {
        return (
            <div class="grid">
                <div class="col"></div>
                <div class="col flex align-items-center justify-content-center">
                    <svg height="50" width="50">
                        <circle cx="25" cy="25" r="20" stroke="black" stroke-width="3" fill="red" />
                    </svg>
                </div>
                <div class="col"></div>
            </div>
        );
    }

    private renderArrow() {
        return (
            <div class="grid">
                <div class="col"></div>
                <div class="col flex align-items-center justify-content-center">
                    <span style="font-size: 30px;">&#8595;</span>
                </div>
                <div class="col"></div>
            </div>
        );
    }
    private renderActivity(name: string) {
        return (
            <div class="shadow-block">
                <div class="highest-impact">
                    <div id="highest-impact-chart"></div>
                    <h2 class="flex align-items-center justify-content-center">
                        <i class="fa fa-area-chart"></i>&nbsp;{name}
                    </h2>
                </div>
            </div>
        );
    }
    private renderActivities() {
        return this.Activities.ToArray().map(item => {
            return [item.Render(), this.renderArrow()];
        });
    }
    private renderDataSources() {
        return this.DataSources.ToArray().map(item => {
            return [(item as any).Render()];
        });
    }

    private renderControls() {
        return this.Controls.ToArray().map(control => {
            return (control as any).CreateMainElement();
        });
    }
    CreateElements() {
        return (
            <div class='dpf'>
                <div class="grid">
                    <div class="col-3">
                        {this.renderDataSources()}
                        {(this.dataSourceDropZone as any).CreateMainElement()}
                    </div>
                    <div class="flow-container col-9">
                        {this.renderStart()}
                        {this.renderArrow()}
                        {this.renderControls()}
                        {this.renderActivities()}
                        {(this.dropZone as any).CreateMainElement()}
                        {this.renderArrow()}
                        {this.renderEnd()}
                    </div>

                </div>

            </div>
        )
    }

    public Serialize() {
        const datasources = this.DataSources.ToArray().map(activity => (activity as any).Serialize());
        const result: any = {
            activities: datasources.concat(this.Activities.ToArray().map(activity => activity.Serialize()))
        }
        result.activities.push({
            name: ActivityTypes.End
        });

        return result;
    }

}
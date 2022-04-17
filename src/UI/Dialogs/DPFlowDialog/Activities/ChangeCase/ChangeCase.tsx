import { Control, Teact, DomHandler, Property, } from '@tuval/forms';
import { Activity, ActivityBase, ActivityTypes } from '../Activity';
import { ConfigDialog } from './ConfigDialog';
import { classNames } from '@tuval/core';

export class ChangeCaseActivity extends ActivityBase {
    public ConfigRequired: boolean = true;

    private Name: string = 'Change Case';
    private datasource_name: string ;
    private source_column_name: string;
    private target_column_name: string;

    private configDialog: ConfigDialog;

    public Config() {
        this.configDialog.SetFlowVariables(this.parent, this.Variables);
        this.configDialog.ShowDialog();
    }
    public Init() {
        this.configDialog = new ConfigDialog();

        this.configDialog.OkButtonClicked.add(()=>{
            this.datasource_name = this.configDialog.DataSourceName;
            this.source_column_name = this.configDialog.SourceColumnName;
            this.target_column_name = this.configDialog.TargetColumnName;
            this.ConfigRequired = false;
            this.parent.ForceUpdate();
        });
        this.parent.Controls.Add(this.configDialog);


    }

    public Serialize() {
        const result = {
            name: ActivityTypes.ChangeCase,
            variables: {
                datasource_name: this.datasource_name,
                source_column_name: this.source_column_name,
                target_column_name: this.target_column_name,
                upper_case: true
            }
        }
        return result;
    }

    public Render() {

        const className = classNames('shadow-block', { 'config-required': this.ConfigRequired } as any);

        return (
            <div class="grid" draggable="true" ondblclick={() => this.Config()}>
                <div class="col"></div>
                <div class="col flex align-items-center justify-content-center">
                    <div class={className}>
                        <div class="highest-impact">
                            <div id="highest-impact-chart"></div>
                            <h2 class="flex align-items-center justify-content-center">
                                <i class="fa fa-area-chart"></i>&nbsp;{this.Name}
                            </h2>
                        </div>
                    </div>
                </div>
                <div class="col"></div>
            </div>


        );
    }
}
import { Control, Teact, DomHandler, Property, DropArea } from '@tuval/forms';
import { Activity, ActivityBase, ActivityTypes } from '../Activity';
import { ConfigDialog } from './ConfigDialog';
import { classNames } from '@tuval/core';

export class JoinActivity extends ActivityBase {
    public ConfigRequired: boolean = true;

    private Name: string = 'Join';

    private configDialog: ConfigDialog;

    private datasource_name: string;
    private column_one_name: string = '';
    private column_two_name: string = '';
    private sep: string;
    private target_column_name: string = '';

    public Config() {
        this.configDialog.SetFlowVariables(this.parent, this.Variables);
        this.configDialog.ShowDialog();
    }
    public Init() {
        this.configDialog = new ConfigDialog();

        this.configDialog.OkButtonClicked.add(() => {
            this.datasource_name = this.configDialog.DataSourceName;
            this.column_one_name = this.configDialog.FirstColumnName;
            this.column_two_name = this.configDialog.SecondColumnName;
            this.sep = this.configDialog.Seperator;
            this.target_column_name = this.configDialog.TargetColumnName;
            this.ConfigRequired = false;
            this.parent.ForceUpdate();
        });
        this.parent.Controls.Add(this.configDialog);


    }

    public Serialize() {
        const result = {
            name: ActivityTypes.JoinColumns,
            variables: {
                datasource_name: this.datasource_name,
                column_one_name: this.column_one_name,
                column_two_name: this.column_two_name,
                sep: this.sep,
                target_column_name: this.target_column_name
            }
        }

        return result;
    }

    private renderJoinLeft() {
        if (this.column_one_name != '') {
            return (<div class="col flex align-items-center justify-content-end">
                <div class="grid">
                    <div class="col-10">
                        <div class="flex flex-column" ondblclick={() => this.Config()}>
                            <div class="shadow-block flex align-items-center justify-content-center  m-0 ml-2 mr-2 p-1 text-sm"><span>{this.column_one_name}</span></div>
                            <div class="flex align-items-center justify-content-center font-medium m-0 p-0 text-sm">+</div>
                            <div class="shadow-block flex align-items-center justify-content-center  m-0 ml-2 mr-2 p-1 text-sm"><span>{this.column_two_name}</span></div>
                        </div>
                    </div>
                    <div class="col-2 flex align-items-center justify-content-center"> <span style="font-size: 30px;">&#8594;</span></div>
                </div>
            </div>);
        } else {
            return (<div class="col"></div>);
        }
    }

    private renderJoinRight() {
        if (this.column_one_name !== '') {
            return (<div class="col flex align-items-center justify-content-start">
                <div class="grid">
                    <div class="col-2 flex align-items-center justify-content-center"> <span style="font-size: 30px;">&#8594;</span></div>
                    <div class="col-10 flex align-items-center justify-content-center">
                        <div class="shadow-block flex align-items-center justify-content-center  m-0 ml-2 mr-2 p-1 text-sm"><span>{this.target_column_name}</span></div>
                    </div>
                </div>
            </div>);
        } else {
            return (<div class="col"></div>);
        }
    }
    public Render() {
        const className = classNames('shadow-block', { 'config-required': this.ConfigRequired } as any);
        return (
            <div class="grid" draggable="true" ondblclick={() => this.Config()}>
                {this.renderJoinLeft()}
                <div class="col flex align-items-center justify-content-center" style="padding-left: 10px;padding-right: 14px;">
                    <div class={className}>
                        <div class="highest-impact">
                            <div id="highest-impact-chart"></div>
                            <h2 class="flex align-items-center justify-content-center">
                                <i class="fa fa-area-chart"></i>&nbsp;{this.Name}
                            </h2>
                        </div>
                    </div>
                </div>
                {this.renderJoinRight()}
            </div>
        );
    }
}
import { Control, Teact, DomHandler, Property, DropArea } from '@tuval/forms';
import { Activity, ActivityBase, ActivityTypes } from '../Activity';
import { ConfigDialog } from './ConfigDialog';
import { classNames } from '@tuval/core';

export class MergeDatasetActivity extends ActivityBase {
    public ConfigRequired: boolean = true;

    private Name: string = 'Merge Dataset';

    private dataset_one_drop_area: DropArea;
    private dataset_two_drop_area: DropArea;
    private target_dataset_drop_area: DropArea;

    private configDialog: ConfigDialog;
    private datasource_one_name: string = '';
    private left_column_name: string = '';
    private datasource_two_name: string = '';
    private right_column_name: string = '';

    public Config() {
        this.configDialog.SetFlowVariables(this.parent, this.Variables);
        this.configDialog.ShowDialog();
    }
    public Init() {
        this.configDialog = new ConfigDialog();

        this.configDialog.OkButtonClicked.add(() => {
            this.datasource_one_name = this.configDialog.DatasourceOne;
            this.left_column_name = this.configDialog.LeftColumn;
            this.datasource_two_name = this.configDialog.DatasourceTwo;
            this.right_column_name = this.configDialog.RightColumn;
            this.ConfigRequired = false;
            this.parent.ForceUpdate();
        });
        this.parent.Controls.Add(this.configDialog);

        this.dataset_one_drop_area = new DropArea();
        this.dataset_one_drop_area.Height = 20;
        this.dataset_one_drop_area.Text = 'Drop Dataset';
        this.dataset_one_drop_area.Drop.add((e) => {
            this.datasource_one_name = e.nativeEvent.dataTransfer.getData('text');
            this.parent.ForceUpdate();
        });

        this.dataset_two_drop_area = new DropArea();
        this.dataset_two_drop_area.Height = 20;
        this.dataset_two_drop_area.Text = 'Drop Dataset';
        this.dataset_two_drop_area.Drop.add((e) => {
            this.datasource_two_name = e.nativeEvent.dataTransfer.getData('text');
            this.parent.ForceUpdate();
        });

        this.target_dataset_drop_area = new DropArea();
        this.target_dataset_drop_area.Height = 20;
        this.target_dataset_drop_area.Text = 'Drop Dataset';
    }

    public Serialize() {
        const result = {
            name: ActivityTypes.MergeDataset,
            variables: {
                datasource_one_name: this.datasource_one_name,
                left_column_name: this.left_column_name,
                datasource_two_name: this.datasource_two_name,
                right_column_name: this.right_column_name
            }
        }

        return result;
    }

    private renderDatasetOne() {
        if (this.datasource_one_name !== '') {
            return (<div class="shadow-block flex align-items-center justify-content-center  m-0 ml-2 mr-2 p-1 text-sm"><span>{this.datasource_one_name}</span></div>);
        } else {
           return (<div class="shadow-block flex align-items-center justify-content-center  m-0 ml-2 mr-2 p-1 text-sm">{(this.dataset_one_drop_area as any).CreateMainElement()}</div>);
        }
    }
    private renderDatasetTwo() {
        if (this.datasource_two_name !== '') {
            return (<div class="shadow-block flex align-items-center justify-content-center  m-0 ml-2 mr-2 p-1 text-sm"><span>{this.datasource_two_name}</span></div>);
        } else {
            return (<div class="shadow-block flex align-items-center justify-content-center  m-0 ml-2 mr-2 p-1 text-sm">{(this.dataset_two_drop_area as any).CreateMainElement()}</div>);
        }
    }
    private renderJoinLeft() {
        return (<div class="col flex align-items-center justify-content-end">
            <div class="grid">
                <div class="col-10">
                    <div class="flex flex-column" ondblclick={() => this.Config()}>
                        {this.renderDatasetOne()}
                        <div class="flex align-items-center justify-content-center font-medium m-0 p-0 text-sm">+</div>
                        {this.renderDatasetTwo()}
                    </div>
                </div>
                <div class="col-2 flex align-items-center justify-content-center"> <span style="font-size: 30px;">&#8594;</span></div>
            </div>
        </div>);
    }

    private renderJoinRight() {
        if (this.datasource_one_name !== '') {
            return (<div class="col flex align-items-center justify-content-start">
                <div class="grid">
                    <div class="col-2 flex align-items-center justify-content-center"><span style="font-size: 30px;">&#8594;</span></div>
                    <div class="col-10 flex align-items-center justify-content-center">
                        <div class="shadow-block flex align-items-center justify-content-center  m-0 ml-2 mr-2 p-1 text-sm"><span>{this.datasource_one_name}</span></div>
                    </div>
                </div>
            </div>);
        } else {
            return (<div class="col flex align-items-center justify-content-start">
                <div class="grid">
                    <div class="col-2 flex align-items-center justify-content-center"><span style="font-size: 30px;">&#8594;</span></div>
                    <div class="col-10 flex align-items-center justify-content-center">
                        <div class="shadow-block flex align-items-center justify-content-center  m-0 ml-2 mr-2 p-1 text-sm">{(this.target_dataset_drop_area as any).CreateMainElement()}</div>
                    </div>
                </div>
            </div>);
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
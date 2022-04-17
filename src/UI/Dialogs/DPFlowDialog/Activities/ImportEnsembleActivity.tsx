import { Control, Teact, DomHandler, Property, FileUpload, BlockUI } from '@tuval/forms';
import { Activity, ActivityBase, ActivityTypes } from './Activity';
import { Encoding, Convert, classNames } from '@tuval/core';
import { detectSeparator } from '../../../../Services/LocalProjectService';
import { IDataSourceActivity } from './IDataSourceActivity';
import { Resources } from '../../../../Resources/Resources';
import { eBADatasetConnectorDialog } from '../../ConnectorDialog/eBA/eBADatasetConnectorDialog';
import { json2CSV } from '../../../../Logic/utils/json2csv';
import { EnsembleDatasetProviderDialog } from '../../ConnectorDialog/Ensemble/EnsembleDataSetProviderDialog';

export class ImportEnsembleActivity extends ActivityBase implements IDataSourceActivity {

    public ConfigRequired: boolean = true;

    private Name: string = 'Ensemble Dataset';

    private ensembleConnectorDialog:EnsembleDatasetProviderDialog;
    private csvSelectFile: FileUpload;
    private selected_file_name: string = 'CSV File';
    private csv_string = '';
    private sep: string;

    private loading: boolean = false;

    public GetColumns(): string[] {
        const allTextLines = this.csv_string.split(/\r\n|\n|\r/);
        const cols = allTextLines[0].split(this.sep);

        return cols;
    }

    public GetDataSourceName(): string {
        return this.selected_file_name;
    }


    public IsReady(): boolean {
        return !this.ConfigRequired;
    }

    public Config() {
        this.loading = true;
        this.parent.ForceUpdate();
        this.ensembleConnectorDialog.ShowDialog();
    }
    public Init() {
        /* this.csvSelectFile = new FileUpload();
        this.csvSelectFile.AllowedExtensions = '.csv,.txt';
        this.parent.Controls.Add(this.csvSelectFile); */

        this.ensembleConnectorDialog = new EnsembleDatasetProviderDialog();
        this.parent.Controls.Add(this.ensembleConnectorDialog);

        this.ensembleConnectorDialog.OkButtonClicked.add((_data: any) => {
            const { data, name } = _data;
            this.csv_string = json2CSV(data);
            this.selected_file_name = name;
            this.sep = detectSeparator(this.csv_string);

            this.ConfigRequired = false;
            this.loading = false;
            this.parent.ForceUpdate();
            this.ensembleConnectorDialog.Hide();
        }) as any;
    }

    public Serialize() {
        const encodedStr = Convert.ToBase64String(Encoding.UTF8.GetBytes(this.csv_string));
        const result = {
            name: ActivityTypes.ImportCsv,
            variables: {
                "name":this.selected_file_name,
                "base64_csv_string": encodedStr,
                "sep": this.sep
            }
        }
        return result;
    }

    private drag(ev ) {
        ev.dataTransfer.setData("text", this.selected_file_name);
    }

    public Render() {
        const className = classNames('shadow-block', { 'config-required': this.ConfigRequired } as any);
        return (

            <div class="flex flex-column" ondblclick={() => this.Config()} draggable="true" ondragstart={(event) => this.drag(event)}>
                <div class="flex align-items-center justify-content-center h-4rem m-2">
                    <BlockUI blocked={this.loading} template={<img style='width:50px;height:50px;' src={Resources.Icons.Loading}></img>}>
                        <img style="width:64px;height:64px;" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data%20Connectors/ensemble"></img>
                    </BlockUI>
                </div>
                <div class="flex align-items-center justify-content-center m-1">{this.selected_file_name}</div>
            </div>

        );
    }
}
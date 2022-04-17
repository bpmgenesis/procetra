import { Control, Teact, DomHandler, Property, FileUpload, BlockUI } from '@tuval/forms';
import { Activity, ActivityBase, ActivityTypes } from './Activity';
import { Encoding, Convert, classNames } from '@tuval/core';
import { detectSeparator } from '../../../../Services/LocalProjectService';
import { IDataSourceActivity } from './IDataSourceActivity';
import { Resources } from '../../../../Resources/Resources';

export class MSSqlActivity extends ActivityBase implements IDataSourceActivity {


    public ConfigRequired: boolean = true;

    private Name: string = 'MS Sql Server';

    private csvSelectFile: FileUpload;
    private selected_file_name: string = 'MS Sql Server';
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
        this.csvSelectFile.SelectFile();
    }
    public Init() {
        this.csvSelectFile = new FileUpload();
        this.csvSelectFile.AllowedExtensions = '.csv,.txt';
        this.parent.Controls.Add(this.csvSelectFile);

        this.csvSelectFile.FileReady = (() => {
            const csv = this.csvSelectFile.GetFileContentAsString();
            this.csv_string = csv;
            this.selected_file_name = this.csvSelectFile.SelectedFileName;
            this.sep = detectSeparator(this.csv_string);

            this.ConfigRequired = false;
            this.loading = false;
            this.parent.ForceUpdate()
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


    public Render() {
        const className = classNames('shadow-block', { 'config-required': this.ConfigRequired } as any);
        return (

            <div class="flex flex-column" ondblclick={() => this.Config()}>
                <div class="flex align-items-center justify-content-center h-4rem m-2">
                    <BlockUI blocked={this.loading} template={<img style='width:50px;height:50px;' src={Resources.Icons.Loading}></img>}>
                        <img style="width:64px;height:64px;" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data%20Connectors/mssql"></img>
                    </BlockUI>
                </div>
                <div class="flex align-items-center justify-content-center m-1">{this.selected_file_name}</div>
            </div>

        );
    }
}
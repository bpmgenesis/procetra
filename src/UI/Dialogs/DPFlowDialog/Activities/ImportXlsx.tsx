import { Control, Teact, DomHandler, Property, FileUpload, BlockUI } from '@tuval/forms';
import { Activity, ActivityBase, ActivityTypes } from './Activity';
import { Encoding, Convert, classNames } from '@tuval/core';
import { detectSeparator } from '../../../../Services/LocalProjectService';
import { IDataSourceActivity } from './IDataSourceActivity';
import { Resources } from '../../../../Resources/Resources';


declare var XLSX;
export class ImportXlsx extends ActivityBase implements IDataSourceActivity {
    public ConfigRequired: boolean = true;

    private Name: string = 'Import Xlsx';

    private excelSelectFile: FileUpload;
    private selected_file_name: string = 'Xlsx File';
    private csv_string: string = '';
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
        this.excelSelectFile.SelectFile();
    }
    public Init() {
        this.excelSelectFile = new FileUpload();
        this.excelSelectFile.AllowedExtensions = '.xls,.xlsx';
        this.parent.Controls.Add(this.excelSelectFile);

        this.excelSelectFile.FileReady = (() => {
            const excel = this.excelSelectFile.GetFileContentAsByteArray();
            var workbook = XLSX.read(excel, { type: "array",  raw: true , cellDates : true});
            for (let key in workbook.Sheets) {
                this.csv_string = XLSX.utils.sheet_to_csv(workbook.Sheets[key]);
                if (this.csv_string) {
                    this.csv_string = (this.csv_string as any).replaceAll('/','.');
                }
                console.log(this.csv_string);
                break;
            }

            this.selected_file_name = this.excelSelectFile.SelectedFileName;
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

    private drag(ev ) {
        ev.dataTransfer.setData("text", this.selected_file_name);
    }

    public Render() {
        const className = classNames('shadow-block', { 'config-required': this.ConfigRequired } as any);
        return (

            <div class="flex flex-column" ondblclick={() => this.Config()} draggable="true" ondragstart={(event) => this.drag(event)}>
                <div class="flex align-items-center justify-content-center h-4rem m-2">
                    <BlockUI blocked={this.loading} template={<img style='width:50px;height:50px;' src={Resources.Icons.Loading}></img>}>
                        <img style="width:64px;height:64px;" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data%20Connectors/xlsx"></img>
                    </BlockUI>
                </div>
                <div class="flex align-items-center justify-content-center m-1">{this.selected_file_name}</div>
            </div>

        );
    }
}
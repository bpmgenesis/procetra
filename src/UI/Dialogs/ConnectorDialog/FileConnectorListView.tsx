import { Control, Teact, DomHandler, FileUpload, Property } from '@tuval/forms';
import { Event } from '@tuval/core';

export class FileConnectorListView extends Control<FileConnectorListView> {
    @Property()
    public Selected: Event<any>;

    @Property()
    public XlsxSelected: Event<any>;

    protected SetupControlDefaults(): void {
        super.SetupControlDefaults();
        this.Selected = new Event();
        this.XlsxSelected = new Event();
    }
    CreateElements() {
        return (
            <ul class="datasources-tiles" style="">
                <li class="tile" style="" ondblclick={() => { this.Selected('CsvFile'); }}>
                    <div class="tile-content">
                        <div>
                            <img style="max-width: 130px;" alt="CSV File" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/csv" />CSV File
                        </div>
                    </div>
                </li>
                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <img style="max-width: 130px;" alt="XES File" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/herokupostgresql" />Xes File
                        </div>
                    </div>
                </li>
                <li class="tile" style="" ondblclick={() => { this.XlsxSelected(); }}>
                    <div class="tile-content">
                        <div>
                            <img style="max-width: 130px;" alt="Xlsx File" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/xlsx" />Xlsx File
                        </div>
                    </div>
                </li>
                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <img style="max-width: 130px;" alt="Excel Online" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/excelonline" />Excel Online
                        </div>
                    </div>
                </li>
                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <img style="max-width: 130px;" alt="Google Spreadsheet" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/google_spreadsheet" />Google Spreadsheet
                        </div>
                    </div>
                </li>
                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <img style="max-width: 130px;" alt="Smartsheet" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/smartsheet" />Smartsheet
                        </div>
                    </div>
                </li>
                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <img style="max-width: 130px;" alt="Microsoft Access" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/microsoft_access" />Microsoft Access
                        </div>
                    </div>
                </li>
                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <div style='height:130px;height: 130px;text-align: center;vertical-align: middle;line-height: 130px;'>
                                <img style="max-width: 130px;" alt="SQLLite" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/SQLite" />
                            </div>
                            SQLLite
                        </div>
                    </div>
                </li>
            </ul>
        );
    }

}
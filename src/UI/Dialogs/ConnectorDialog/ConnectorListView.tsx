import { Control, Teact, DomHandler, Property } from '@tuval/forms';
import { Event } from '@tuval/core';
import { SymbolBroker } from '../../../BrokerClients/SymbolBroker';

debugger;
const test = require('./ConnectionListView.css');
DomHandler.addCssToDocument(test);

export class ConnectorListView extends Control<ConnectorListView> {
    @Property()
    public MSSQLConnectorSelected: Event<any>;

    @Property()
    public MYSQLConnectorSelected: Event<any>;

    @Property()
    public PostgreSQLConnectorSelected: Event<any>;

    @Property()
    public OracleConnectorSelected: Event<any>;

    @Property()
    public MONGODBConnectorSelected: Event<any>;

    protected SetupControlDefaults(): void {
        super.SetupControlDefaults();
        this.MSSQLConnectorSelected = new Event();
        this.MYSQLConnectorSelected = new Event();
        this.PostgreSQLConnectorSelected = new Event();
        this.OracleConnectorSelected = new Event();
        this.MONGODBConnectorSelected = new Event();
    }

    CreateElements() {
        return (
            <ul class="datasources-tiles" style="">
                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <img style="max-width: 130px;" alt="Google BigQuery" src={SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'google_bigquery')} />Google BigQuery
                        </div>
                    </div>
                </li>
                <li class="tile" style="" ondblclick={() => { this.PostgreSQLConnectorSelected(); }}>
                    <div class="tile-content">
                        <div>
                            <img style="max-width: 130px;" alt="Heroku PostgreSQL" src={SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'herokupostgresql')} />Heroku PostgreSQL
                        </div>
                    </div>
                </li>
                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <img style="max-width: 130px;" alt="MariaDB" src={SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'maria_db')}/>MariaDB
                        </div>
                    </div>
                </li>
                <li class="tile" style="" ondblclick={() => { this.MONGODBConnectorSelected(); }} >
                    <div class="tile-content">
                        <div>
                            <img style="max-width: 130px;" alt="MongoDB" src={SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'mongo_db')}/>MongoDB
                        </div>
                    </div>
                </li>
                <li class="tile" style="" ondblclick={() => { this.MSSQLConnectorSelected(); }}>
                    <div class="tile-content">
                        <div>
                            <img style="max-width: 130px;" alt="MS SQL Server" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/mssql" />MS SQL Server
                        </div>
                    </div>
                </li>
                <li class="tile" style="" ondblclick={() => { this.MYSQLConnectorSelected(); }}>
                    <div class="tile-content">
                        <div>
                            <img style="max-width: 130px;" alt="My SQL" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/mysql" />My SQL
                        </div>
                    </div>
                </li>
                <li class="tile" style="" ondblclick={() => { this.OracleConnectorSelected(); }}>
                    <div class="tile-content">
                        <div>
                            <div style='height:130px;height: 130px;text-align: center;vertical-align: middle;line-height: 130px;'>
                                <img style="max-width: 130px;" alt="Oracle" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/oracle_db" />
                            </div>
                            Oracle
                        </div>
                    </div>
                </li>
                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <img style="max-width: 130px;" alt="PostgreSQL" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/postgresql" />PostgreSQL
                        </div>
                    </div>
                </li>
                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <img style="max-width: 130px;" alt="Amazon Redshift" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/redshift" />Amazon Redshift
                        </div>
                    </div>
                </li>
                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <div style='height:130px;height: 130px;text-align: center;vertical-align: middle;line-height: 130px;'>
                                <img style="max-width: 130px;" alt="Segment" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/segment" />
                            </div>
                            Segment
                        </div>
                    </div>
                </li>
                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <div style='height:130px;height: 130px;text-align: center;vertical-align: middle;line-height: 130px;'>
                                <img style="max-width: 130px;" alt="Snowflake" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/snowflake" />
                            </div>
                            Snowflake
                        </div>
                    </div>
                </li>
            </ul>
        );
    }

}
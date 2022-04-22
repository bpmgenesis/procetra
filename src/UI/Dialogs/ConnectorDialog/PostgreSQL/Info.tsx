import { Control, Teact } from '@tuval/forms';

export class Info extends Control<Info> {
    CreateElements() {
        return (
            <div class="grid">
                <div class="col-2">
                    <img class="logo" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/herokupostgresql" />
                </div>
                <div class="col-10">
                    <h3 ng-switch="isEdit"><span style="text-transform: none;font-size: 30px;font-weight: 300;letter-spacing: 0;margin-bottom: 30px;color: #2e4354;">How to set up Heroku PostgreSQL data source</span></h3>
                    <div style="font-weight: 300;font-size: 15px;line-height: 24px;color: rgba(46,67,84,.85);"><p>The following information is required to connect to a Heroku PostgreSQL DB instance:</p>
                        <ul>
                            <li><strong>Host</strong> - the address of the Heroku PostgreSQL instance. It could be a domain name or an IP addresss.</li>
                            <li><strong>Database</strong> - the name of the database.</li>
                            <li><strong>Username</strong> and <strong>Password</strong> - the credentials of the Heroku PostreSQL user that has access to this database.</li>
                            <li><strong>Port</strong> - the standart port of Heroku PostgreSQL is 5432, change it if your instance is running on a different port.</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

}
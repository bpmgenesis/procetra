import { Control, Teact } from '@tuval/forms';

export class Info extends Control<Info> {
    CreateElements() {
        return (
            <div class="grid">
                <div class="col-2">
                    <img class="logo" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/mssql" />
                </div>
                <div class="col-10">
                    <h3 ng-switch="isEdit"><span style="text-transform: none;font-size: 30px;font-weight: 300;letter-spacing: 0;margin-bottom: 30px;color: #2e4354;">How to set up MS SQL Server data source</span></h3>
                    <div style="font-weight: 300;font-size: 15px;line-height: 24px;color: rgba(46,67,84,.85);"><p>The following information is required to connect to a MS SQL Server instance:</p>
                        <ul>
                            <li><strong>Host</strong> - the address of the MS SQL Server instance. It could be a domain name or an IP addresss. This instance should allow remote access.</li>
                            <li><strong>Database</strong> - the name of the database</li>
                            <li><strong>Username</strong> and <strong>Password</strong> - the credentials of the MS SQL Server user that has access to this database</li>
                            <li><strong>Port</strong> - the standart port of MS SQL Server is 1433, change it if your instance is running on a different port</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

}
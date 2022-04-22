import { Control, Teact } from '@tuval/forms';

export class Info extends Control<Info> {
    CreateElements() {
        return (
            <div class="">
                <div class="col-2">
                    <img class="logo" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/oracle_db" />
                </div>
                <div class="col-10">
                    <h3 ng-switch="isEdit"><span style="text-transform: none;font-size: 30px;font-weight: 300;letter-spacing: 0;margin-bottom: 30px;color: #2e4354;">How to set up Oracle data source</span></h3>
                    <div style="font-weight: 300;font-size: 15px;line-height: 24px;color: rgba(46,67,84,.85);"><p>The following information is required to connect to a Oracle DB instance:</p>
                        <ul>
                            <li><strong>Host</strong> - the address of the Oracle instance. It could be a domain name or an IP addresss. This instance should allow remote access.</li>
                            <li><strong>Service</strong> - the name of the service</li>
                            <li><strong>Schema</strong> - the name of the schema</li>
                            <li><strong>Username</strong> and <strong>Password</strong> - the credentials of the Oracle user that has access to this database</li>
                            <li><strong>Port</strong> - the standart port of Oracle is 1521, change it if your instance is running on a different port</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

}
import { Control, Teact } from '@tuval/forms';

export class Info extends Control<Info> {
    CreateElements() {
        return (
            <div class="grid">
                <div class="col-2">
                    <img class="logo" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/mongo_db" />
                </div>
                <div class="col-10">
                    <h3 ng-switch="isEdit"><span style="text-transform: none;font-size: 30px;font-weight: 300;letter-spacing: 0;margin-bottom: 30px;color: #2e4354;">How to set up MongoDB data source</span></h3>
                    <div style="font-weight: 300;font-size: 15px;line-height: 24px;color: rgba(46,67,84,.85);"><p>The following information is required to connect to a MongoDB instance:</p>
                        <ul>
                            <li><strong>Host</strong> - the address of the MongoDB instance. It could be a domain name or an IP addresss. This instance should allow remote access.</li>
                            <li><strong>Replica Set</strong> - Comma separated list of servers and ports of node addresses in the replica set. For example: <strong>'localhost:27017,localhost:27018'</strong></li>
                            <li><strong>Authentication Database</strong> - the name of the MongoDB database for authentication.</li>
                            <li><strong>Database</strong> - the name of the database</li>
                            <li><strong>Username</strong> and <strong>Password</strong> - the credentials of the MongoDB user that has access to this database</li>
                            <li><strong>Port</strong> - the standart port of MongoDB is 27017, change it if your instance is running on a different port</li>
                            <li><strong>Authentication Mechanism</strong> - The authentication mechanism to be used to authenticate the connection. Supported values are <strong>MONGODB-CR</strong>,
                                <strong>SCRAM-SHA-1</strong>, <strong>SCRAM-SHA-256</strong>, <strong>PLAIN</strong>, <strong>GSSAPI</strong>, <strong>NONE</strong></li>
                            <li><strong>SSL</strong> - should the connection be established over TLS/SSL.</li>
                            <li><strong>SSL Certificate</strong> - A full PEM certificate, <strong>MD5</strong> or <strong>SHA1</strong> thumbprint of the SSL certificate used by the MongoDB server.</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

}
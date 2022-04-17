import { Control, Teact, DomHandler } from '@tuval/forms';
import { Activity, ActivityBase, ActivityTypes } from './Activity';
import { HttpClient } from '@tuval/core';

export class Start extends ActivityBase {
    public ConfigRequired: boolean = false;
    private Name: string;
    private FlowVariables: any;


    public Config() {

    }
    public Serialize() {

        const result = {
            name: ActivityTypes.Start,
            variables: {}
        }
        return result;
    }
    public async Init() {
        return new Promise( async (resolve, reject) =>{
            let result = await HttpClient.Post('http://127.0.0.1:5001/session/create_session/test');
            this.FlowVariables['session_id'] = result.data;

            let bodyFormData = new FormData();
            bodyFormData.append('log_id', '0cf145f9-bbe0-4643-97d4-5932b2b2ae05');

            const result1 = await HttpClient.Post('http://127.0.0.1:5001/preprocessing/Start/' + result.data, bodyFormData);
            console.log(result1.data);

            this.FlowVariables['transaction_id'] = result1.data;
            resolve(null);
        });
    }

    public Render() {
        return (
            <div class="grid">
                <div class="col"></div>
                <div class="col flex align-items-center justify-content-center">
                    <svg height="50" width="50">
                        <circle cx="25" cy="25" r="20" stroke="black" stroke-width="1" fill="green" />
                    </svg>
                </div>
                <div class="col"></div>
            </div>
        );
    }
}
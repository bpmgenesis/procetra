import { Control, Teact, DomHandler, FileUpload, Property } from '@tuval/forms';
import { Event } from '@tuval/core';

export class SalesConnectorListView extends Control<SalesConnectorListView> {

    @Property()
    public Selected: Event<any>;
    protected SetupControlDefaults(): void {
        super.SetupControlDefaults();
        this.Selected = new Event();
    }
    CreateElements() {
        return (
            <ul class="datasources-tiles" style="">
                 <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <div style='height:130px;height: 130px;text-align: center;vertical-align: middle;line-height: 130px;'>
                                <img style="max-width: 130px;" alt="Chargebee" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/chargebee" />
                            </div>
                            Chargebee
                        </div>
                    </div>
                </li>
                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <div style='height:130px;height: 130px;text-align: center;vertical-align: middle;line-height: 130px;'>
                                <img style="max-width: 130px;" alt="Freshworks CRM" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/freshworks" />
                            </div>
                            Freshworks CRM
                        </div>
                    </div>
                </li>
                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <div style='height:130px;height: 130px;text-align: center;vertical-align: middle;line-height: 130px;'>
                                <img style="max-width: 130px;" alt="Hubspot" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/hubspot" />
                            </div>
                            Hubspot
                        </div>
                    </div>
                </li>
                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <div style='height:130px;height: 130px;text-align: center;vertical-align: middle;line-height: 130px;'>
                                <img style="max-width: 130px;" alt="Pipedrive" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/pipedrive" />
                            </div>
                            Pipedrive
                        </div>
                    </div>
                </li>
                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <div style='height:130px;height: 130px;text-align: center;vertical-align: middle;line-height: 130px;'>
                                <img style="max-width: 130px;" alt="Salesforce" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/salesforce" />
                            </div>
                            Salesforce
                        </div>
                    </div>
                </li>
                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <div style='height:130px;height: 130px;text-align: center;vertical-align: middle;line-height: 130px;'>
                                <img style="max-width: 130px;" alt="Sugar CRM" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/sugarcrm" />
                            </div>
                            Sugar CRM
                        </div>
                    </div>
                </li>
                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <div style='height:130px;height: 130px;text-align: center;vertical-align: middle;line-height: 130px;'>
                                <img style="max-width: 130px;" alt="Suite CRM" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/suitecrm" />
                            </div>
                            Suite CRM
                        </div>
                    </div>
                </li>
                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <div style='height:130px;height: 130px;text-align: center;vertical-align: middle;line-height: 130px;'>
                                <img style="max-width: 130px;" alt="Zendesk Sell" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/zendesk_sel" />
                            </div>
                            Zendesk Sell
                        </div>
                    </div>
                </li>
                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <div style='height:130px;height: 130px;text-align: center;vertical-align: middle;line-height: 130px;'>
                                <img style="max-width: 130px;" alt="Zoho CRM" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/zoho_crm" />
                            </div>
                            Zoho CRM
                        </div>
                    </div>
                </li>
            </ul>
        );
    }

}
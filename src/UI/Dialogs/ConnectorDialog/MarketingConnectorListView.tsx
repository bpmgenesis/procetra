import { Control, Teact, DomHandler, FileUpload, Property } from '@tuval/forms';
import { Event } from '@tuval/core';

export class MarketingConnectorListView extends Control<MarketingConnectorListView> {
    @Property()
    public Selected: Event<any>;
    protected SetupControlDefaults(): void {
        super.SetupControlDefaults();
        this.Selected = new Event();
    }
    CreateElements() {
        return (
            <ul class="datasources-tiles" style="">
                <li class="tile" style="" ondblclick={() => { this.Selected('CsvFile'); }}>
                    <div class="tile-content">
                        <div>
                            <img style="max-width: 130px;" alt="Google Ads" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/googleadwords" />Google Ads
                        </div>
                    </div>
                </li>
                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <img style="max-width: 130px;" alt="Google Analytics" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/google_analytics" />Google Analytics
                        </div>
                    </div>
                </li>
                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <img style="max-width: 130px;" alt="GoToWebinar" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/gotowebinar" />GoToWebinar
                        </div>
                    </div>
                </li>
                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <img style="max-width: 130px;" alt="MailChimp" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/mailchimp" />MailChimp
                        </div>
                    </div>
                </li>
                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <img style="max-width: 130px;" alt="Optimizely" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/optimizely" />Optimizely
                        </div>
                    </div>
                </li>
                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <img style="max-width: 130px;" alt="Persistiq" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/persistiq" />Persistiq
                        </div>
                    </div>
                </li>
                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <img style="max-width: 130px;" alt="SendGrid" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/eba" />SendGrid
                        </div>
                    </div>
                </li>

            </ul>
        );
    }

}
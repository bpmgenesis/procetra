import { Control, Teact, DomHandler, FileUpload, Property } from '@tuval/forms';
import { Event } from '@tuval/core';

export class OperationsConnectorListView extends Control<OperationsConnectorListView> {

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
                            <img style="max-width: 130px;" alt="FreshDesk" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/freshdesk" />FreshDesk
                        </div>
                    </div>
                </li>
                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <img style="max-width: 130px;" alt="Intercom" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/intercom" />Intercom
                        </div>
                    </div>
                </li>
                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <img style="max-width: 130px;" alt="Paidlabs" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/paidlabs" />Paidlabs
                        </div>
                    </div>
                </li>
                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <img style="max-width: 130px;" alt="QuickBooks Online" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/quickbooks" />QuickBooks Online
                        </div>
                    </div>
                </li>
                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <img style="max-width: 130px;" alt="Stripe" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/stripe" />Stripe
                        </div>
                    </div>
                </li>
                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <img style="max-width: 130px;" alt="ZenDesk" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/zendesk" />ZenDesk
                        </div>
                    </div>
                </li>
            </ul>
        );
    }

}
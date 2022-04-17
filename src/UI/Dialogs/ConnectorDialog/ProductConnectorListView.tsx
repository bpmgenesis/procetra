import { Control, Teact, DomHandler, FileUpload, Property } from '@tuval/forms';
import { Event } from '@tuval/core';

export class ProductConnectorListView extends Control<ProductConnectorListView> {

    @Property()
    public Selected: Event<any>;

    @Property()
    public eBAConnectorSelected: Event<any>;

    protected SetupControlDefaults(): void {
        super.SetupControlDefaults();
        this.Selected = new Event();
        this.eBAConnectorSelected = new Event();
    }

    CreateElements() {
        return (
            <ul class="datasources-tiles" style="">
                 <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <div style='height:130px;height: 130px;text-align: center;vertical-align: middle;line-height: 130px;'>
                                <img style="max-width: 130px;" alt="SAP" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/SAP_logo" />
                            </div>
                            SAP
                        </div>
                    </div>
                </li>
                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <div style='height:130px;height: 130px;text-align: center;vertical-align: middle;line-height: 130px;'>
                                <img style="max-width: 130px;" alt="SAP Business One" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/sap_business_one" />
                            </div>
                            SAP Business One
                        </div>
                    </div>
                </li>
                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <div style='height:130px;height: 130px;text-align: center;vertical-align: middle;line-height: 130px;'>
                                <img style="max-width: 130px;" alt="SAP Concur" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/sap_concur" />
                            </div>
                            SAP Concur
                        </div>
                    </div>
                </li>
                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <div style='height:130px;height: 130px;text-align: center;vertical-align: middle;line-height: 130px;'>
                                <img style="max-width: 130px;" alt="SAP Hana" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/sap_hana" />
                            </div>
                            SAP Hana
                        </div>
                    </div>
                </li>
                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <div style='height:130px;height: 130px;text-align: center;vertical-align: middle;line-height: 130px;'>
                                <img style="max-width: 130px;" alt="SAP Success Factors" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/sap_success_factors" />
                            </div>
                            SAP Success Factors
                        </div>
                    </div>
                </li>
                 <li class="tile" style="" ondblclick={() => { this.eBAConnectorSelected(); }}>
                    <div class="tile-content">
                        <div>
                            <div style='height:130px;height: 130px;text-align: center;vertical-align: middle;line-height: 130px;'>
                                <img style="max-width: 130px;" alt="eBA" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/eba" />
                            </div>
                            eBA
                        </div>
                    </div>
                </li>
                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <div style='height:130px;height: 130px;text-align: center;vertical-align: middle;line-height: 130px;'>
                                <img style="max-width: 130px;" alt="QDMS" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/qdms" />
                            </div>
                            QDMS
                        </div>
                    </div>
                </li>
                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <div style='height:130px;height: 130px;text-align: center;vertical-align: middle;line-height: 130px;'>
                                <img style="max-width: 130px;" alt="BEAM" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/beam" />
                            </div>
                            BEAM
                        </div>
                    </div>
                </li>
                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <div style='height:130px;height: 130px;text-align: center;vertical-align: middle;line-height: 130px;'>
                                <img style="max-width: 130px;" alt="Ensemble" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/ensemble" />
                            </div>
                            Ensemble
                        </div>
                    </div>
                </li>
                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <div style='height:130px;height: 130px;text-align: center;vertical-align: middle;line-height: 130px;'>
                                <img style="max-width: 130px;" alt="Jira" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/jira" />
                            </div>
                            Jira
                        </div>
                    </div>
                </li>
                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <div style='height:130px;height: 130px;text-align: center;vertical-align: middle;line-height: 130px;'>
                                <img style="max-width: 130px;" alt="Service Now" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/servicenow" />
                            </div>
                            Service Now
                        </div>
                    </div>
                </li>
                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <div style='height:130px;height: 130px;text-align: center;vertical-align: middle;line-height: 130px;'>
                                <img style="max-width: 130px;" alt="Asana" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/asana" />
                            </div>
                            Asana
                        </div>
                    </div>
                </li>
                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <div style='height:130px;height: 130px;text-align: center;vertical-align: middle;line-height: 130px;'>
                                <img style="max-width: 130px;" alt="Auth0" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/auth0" />
                            </div>
                            Auth0
                        </div>
                    </div>
                </li>
                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <div style='height:130px;height: 130px;text-align: center;vertical-align: middle;line-height: 130px;'>
                                <img style="max-width: 130px;" alt="Basecamp" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/basecamp" />
                            </div>
                            Basecamp
                        </div>
                    </div>
                </li>
                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <div style='height:130px;height: 130px;text-align: center;vertical-align: middle;line-height: 130px;'>
                                <img style="max-width: 130px;" alt="Bitbucket" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/bitbucket" />
                            </div>
                            Bitbucket
                        </div>
                    </div>
                </li>
                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <div style='height:130px;height: 130px;text-align: center;vertical-align: middle;line-height: 130px;'>
                                <img style="max-width: 130px;" alt="Delighted" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/delighted" />
                            </div>
                            Delighted
                        </div>
                    </div>
                </li>
                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <div style='height:130px;height: 130px;text-align: center;vertical-align: middle;line-height: 130px;'>
                                <img style="max-width: 130px;" alt="Jenkins" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/jenkins" />
                            </div>
                            Jenkins
                        </div>
                    </div>
                </li>

                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <div style='height:130px;height: 130px;text-align: center;vertical-align: middle;line-height: 130px;'>
                                <img style="max-width: 130px;" alt="Podio" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/podio" />
                            </div>
                            Podio
                        </div>
                    </div>
                </li>

                <li class="tile" style="">
                    <div class="tile-content">
                        <div>
                            <div style='height:130px;height: 130px;text-align: center;vertical-align: middle;line-height: 130px;'>
                                <img style="max-width: 130px;" alt="Trello" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/trello" />
                            </div>
                            Trello
                        </div>
                    </div>
                </li>
            </ul>
        );
    }

}
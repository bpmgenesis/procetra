import { Control, Teact, DomHandler, Property } from '@tuval/forms';
import { Event } from '@tuval/core';

DomHandler.addCssToDocument(require('./ConnectionListView.css'));

export class AppAndServicesListView extends Control<AppAndServicesListView> {
    @Property()
    public DPFSelected: Event<any>;


    protected SetupControlDefaults(): void {
        super.SetupControlDefaults();
        this.DPFSelected = new Event();
    }

    CreateElements() {
        return (
            <ul class="datasources-tiles" style="" >
                <li class="tile" style="" ondblclick={() => { this.DPFSelected(); }}>
                    <div class="tile-content">
                        <div>
                            <img style="max-width: 130px;" alt="DPF" src="https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/DPF" />DPF
                        </div>
                    </div>
                </li>
            </ul>
        );
    }

}
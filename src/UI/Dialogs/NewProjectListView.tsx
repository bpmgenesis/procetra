import { Control, Teact, DomHandler, Property } from '@tuval/forms';
import { Event } from '@tuval/core';
import { instance as container } from '@tuval/core';
import { SymbolBroker } from '@tuval/brokers/client';
import { BlankProjectDialog } from './BlankProjectDialog';

// DomHandler.addCssToDocument(require('./ConnectionListView.css'));

export class NewProjectListView extends Control<NewProjectListView> {
    private static SymbolBroker;

    @Property()
    public ProcessSelected: Event<any>;

    @Property()
    private Providers: any[];

    @Property()
    private blankProjectDialog: BlankProjectDialog;


    protected SetupControlDefaults(): void {
        super.SetupControlDefaults();
        this.ProcessSelected = new Event();
        NewProjectListView.SymbolBroker = new SymbolBroker();
        this.Providers = container.resolveAll('IProcessProvider');
        this.blankProjectDialog = new BlankProjectDialog();
    }

    private renderProviders() {
        return this.Providers.map(provider => {
            return (
                <li class="tile" style="" ondblclick={() => {
                    provider.ShowConfigDialog((processInfo) => {

                        this.ProcessSelected({
                            name: processInfo.name
                        });
                    });
                }}>
                    <div class="tile-content">
                        <div>
                            <div style='height:130px;height: 130px;text-align: center;vertical-align: middle;line-height: 130px;'>
                                <img style="max-width: 130px;" alt="Snowflake" src={provider.GetSymbol()} />
                            </div>
                            {provider.GetName()}
                        </div>
                    </div>
                </li>
            );
        });
    }
    CreateElements() {
        return (
            <ul class="datasources-tiles" style="">
                <li class="tile" style="" ondblclick={() => {
                    this.blankProjectDialog.OKButtonClick.add(() => {
                        this.ProcessSelected({
                            name: this.blankProjectDialog.txtName.Text
                        });
                    });
                    this.blankProjectDialog.ShowDialog();
                }
                }>
                    <div class="tile-content">
                        <div>
                            <img style="max-width: 130px;" alt="Google BigQuery" src={NewProjectListView.SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'google_bigquery')} />
                            Blank Project
                        </div>
                    </div>
                </li>
                {this.renderProviders()}

            </ul>
        );
    }

}
import { Control, Property, Teact, TreeNode } from '@tuval/forms';
import { EnsembleProcessTreeView } from './EnsembleProcessTree';
import { is, classNames } from '@tuval/core';
import { EnsembleBrokerClient } from './EnsembleBrokerClient';
import { GridView } from '@tuval/components/grids';
export class EnsembleDataProviderControl extends Control<EnsembleDataProviderControl> {

    @Property()
    private EnsembleServers: any[];

    @Property()
    private processTree: EnsembleProcessTreeView;

    @Property()
    private filterServers: string;

    private token: string;

    @Property()
    private SelectedServer: any;

    @Property()
    public SelectedProcess: any;

    @Property()
    private SelectedDataset: string;

    @Property()
    private LoadingText: string;

    @Property()
    private filterText: string;

    @Property()
    private grid: GridView;

    @Property()
    public ProcessHistory: any[];


    protected override  async SetupControlDefaults() {
        this.processTree = new EnsembleProcessTreeView();
        this.processTree.Height = 300;
        this.processTree.NodeMouseDoubleClick.add((node: TreeNode) => {
            //alert(JSON.stringify(node));
            this.SelectedProcess = node;
        });
        this.filterServers = '';
        this.SelectedServer = null;
        this.SelectedProcess = null;
        this.SelectedDataset = null;
        this.EnsembleServers = [
            {
                Name: 'Demo Ensemble Server'
            }
        ];

        this.grid = new GridView();
        this.grid.Height = 245;
    }

    private renderServers() {
        if (this.Loading) {
            return;
        }
        if (is.array(this.EnsembleServers))
            return this.EnsembleServers
                .filter((item: any) => {
                    if (this.filterServers !== '') {
                        return item.Name.toLowerCase().indexOf(this.filterServers.toLowerCase()) > -1;
                    } else {
                        return item;
                    }

                })
                .map((item: any) => {
                    return (
                        <div class="entity" style="" onclick={async () => {
                            this.Loading = true;
                            this.LoadingText = 'Authenticating to ' + item.Name;
                            this.token = await EnsembleBrokerClient.Login();
                            //alert(this.token);
                            this.LoadingText = 'Getting process tree.';
                            const processes: any[] = await EnsembleBrokerClient.GetProcesses(this.token);

                            this.processTree.SetProcessData(processes);
                            this.Loading = false;
                            this.SelectedServer = item;
                        }}>
                            <div class="item">
                                <span class="nc-icon-outline icon fa fa-eba-server"></span>
                                <span style="padding-left:5px;">{item.Name}</span>
                            </div>
                        </div>
                    );
                });
    }

    private renderBread() {
        const renderServerBread = () => {
            if (this.SelectedServer != null) {
                return (

                    <li class="" onclick={() => {
                        this.SelectedProcess = null;
                        this.SelectedDataset = null;
                    }}>
                        <a href="void:javascript(0)" class="p-menuitem-link">
                            <span class="p-menuitem-text">{this.SelectedServer.Name}</span></a>
                    </li>

                );
            }
        }
        const renderProjectBread = () => {
            if (this.SelectedProcess) {
                return (

                    <li class="" onclick={() => {
                        this.SelectedDataset = null;
                    }}>
                        <a href="#" class="p-menuitem-link">
                            <span class="p-menuitem-text">{this.SelectedProcess.label}</span></a>
                    </li>

                );
            }
        }
        const renderProcessStateBread = () => {
            if (this.SelectedDataset != null) {
                return (

                    <li class="" onclick={() => {

                        this.SelectedDataset = null;
                    }}>
                        <a href="#" class="p-menuitem-link">
                            <span class="p-menuitem-text">{this.SelectedDataset}</span></a>
                    </li>

                );
            }
        }

        return (
            <nav class="p-breadcrumb p-component" style="border:solid 0px">
                <ul>
                    <li class="p-breadcrumb-home" onclick={() => {
                        this.SelectedServer = null;
                        /* this.SelectedProject = null;
                        this.SelectedState = null; */
                    }}>
                        <a href="javascript:void(0)" class="p-menuitem-link">
                            <span class="p-menuitem-icon pi pi-home"></span>
                        </a>
                    </li>
                    <li class="p-breadcrumb-chevron pi pi-chevron-right"></li>
                    {renderServerBread()}
                    <li class="p-breadcrumb-chevron pi pi-chevron-right"></li>
                    {renderProjectBread()}
                    <li class="p-breadcrumb-chevron pi pi-chevron-right"></li>
                    {renderProcessStateBread()}
                </ul>
            </nav>
        );

    }

    private renderProcessHistory() {
        if (this.ProcessHistory != null) {
            return (this.grid as any).CreateMainElement();
        }
    }

    private renderProcessStates() {
        if (this.Loading) {
            return;
        }
        if (this.SelectedProcess != null)
            return ['Process Step Details']
                .filter((item: string) => {
                    if (this.filterServers !== '') {
                        return item.toLowerCase().indexOf(this.filterServers.toLowerCase()) > -1;
                    } else {
                        return item;
                    }
                })
                .map((item: string) => {
                    const className = classNames('nc-icon-outline icon fa', {
                        'fa-ensemble-process-step-details': item === 'Process Step Details',
                        'fa-eba-process-state-ongoing': item === 'Ongoing processes'
                    } as any);
                    return (
                        <div class="entity" style="" onclick={async () => {
                            this.Loading = true;
                            const processSteps = await EnsembleBrokerClient.GetProcessSteps(this.token, this.SelectedProcess.key);
                            console.log(processSteps);

                            const result = [];
                            for (let i = 0; i < processSteps.length; i++) {
                                /*   if (item === 'Finished Process') {
                                      if (!processes[i].Finished) {
                                          continue;
                                      }
                                  } else if (item === 'Ongoing processes') {
                                      if (processes[i].Finished) {
                                          continue;
                                      }
                                  } */

                                /*  history.forEach(item => {
                                     if (item['ResponseDate'] == null) {
                                         item['ResponseDate'] = item['RequestDate'];
                                     }
                                     if (item['Description'] == null || item['Description'] === '') {
                                         item['Description'] = item['Text'];
                                     }
                                     result.push(item);
                                 });
                                 this.LoadingText = `Loading ${i} of ${processes.length} process event data`; */
                                //console.log(history);

                            }
                            const columns = [];
                            for (let col_name in processSteps[0]) {
                                columns.push({ field: col_name, headerText: col_name, width: 140 });
                            }
                            this.grid.SetColumns(columns);
                            this.grid.RefreshColumns();
                            this.grid.RefreshHeader();

                            //  console.log(result);
                            this.Loading = false;
                            this.SelectedDataset = item;
                            this.grid.DataSource = this.ProcessHistory = processSteps;
                        }}>
                            <div class="item">
                                <span class={className}></span>{item}</div>
                        </div>
                    );
                });
    }

    private renderElements() {
        const olmadibastan = "";
        if (this.SelectedDataset == null) {
            if (this.SelectedServer == null) {
                return this.renderServers();
            } else if (this.SelectedProcess == null) {
                return (this.processTree as any).CreateMainElement();
            } else {
                return this.renderProcessStates();
            }
        } else {
            return this.renderProcessHistory();
        }

    }

    private renderLoading() {
        if (this.Loading) {
            return (
                <div ng-if="indicators.loading" class="ng-scope">
                    <span class="ng-scope">
                        <div class="indicator-small" ng-hide="error || undefined">
                            <div class="mk-spinner-wrap">
                                <div class="mk-spinner-pie"></div>
                            </div>
                            <div class="message" style="">{this.LoadingText}</div>
                        </div>
                    </span>
                </div>
            );
        }
    }
    CreateElements() {
        return (
            <div>
                <div class="mt-2 mb-2">
                    <input class="gh-input-text" onchange={(e) => this.filterText = e.target.value} id="filter-by-name" ng-model="query" placeholder="Filter items by project name" style="" />
                </div>

                {this.renderBread()}

                <div class='data-source-eBA-browser'>
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="files">
                                    {this.renderLoading()}
                                    {this.renderElements()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}
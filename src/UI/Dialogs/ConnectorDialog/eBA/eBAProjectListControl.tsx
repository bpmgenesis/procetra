import { Control, Teact, Property, Fragment } from '@tuval/forms';
import { eBABrokerClient, IEbaProcess, IEbaProject, IEbaServer } from './eBABrokerClient';
import { is, classNames, Event } from '@tuval/core'
import { GridView } from '@tuval/components/grids';

export class eBAProjectListControl extends Control<eBAProjectListControl> {

    @Property()
    public ProcessData:any[];

    @Property()
    private eBAServers: IEbaServer[];

    @Property()
    private eBAProject: IEbaProject[];

    @Property()
    private SelectedServer: IEbaServer;

    @Property()
    public SelectedProject: IEbaProject;

    @Property()
    private ProcessHistory: any[];

    @Property()
    private SelectedState: string;

    @Property()
    private filterText: string;

    @Property()
    private filterServers: string;

    @Property()
    private grid: GridView;

    @Property()
    private LoadingText: string;

    protected override SetupControlDefaults() {
        super.SetupControlDefaults();
        this.filterText = '';
        this.filterServers = '';
        this.Loading = false;
        this.SelectedState = null;
        this.eBAServers = [
            {
                Name: 'Demo EBYS Server'
            }
        ];
        this.grid = new GridView();
        this.grid.Height = 245;

        this.LoadingText = 'Loading...';
    }

    public SetProjects(eBAProject: IEbaProject[]) {
        this.eBAProject = eBAProject;
    }

    private renderProjects() {
        if (this.Loading) {
            return;
        }
        if (is.array(this.eBAProject))
            return this.eBAProject
                .filter((item: IEbaProject) => {
                    if (this.filterText != '') {
                        return item.Type === 'Standart' && item.Caption.toLowerCase().indexOf(this.filterText.toLowerCase()) > -1;
                    } else {
                        return item.Type === 'Standart';
                    }

                })
                .map((item: IEbaProject) => {
                    return (
                        <div class="entity" style="" onclick={async () => {
                            this.SelectedProject = item;
                        }}>
                            <div class="item ng-binding ng-scope">
                                <span class="nc-icon-outline icon fa fa-eba-project"></span>{item.Caption}</div>
                        </div>
                    );
                });
    }

    private renderServers() {
        if (this.Loading) {
            return;
        }
        if (is.array(this.eBAServers))
            return this.eBAServers
                .filter((item: IEbaServer) => {
                    if (this.filterServers !== '') {
                        return item.Name.toLowerCase().indexOf(this.filterServers.toLowerCase()) > -1;
                    } else {
                        return item;
                    }

                })
                .map((item: IEbaServer) => {
                    return (
                        <div class="entity" style="" onclick={async () => {
                            this.Loading = true;
                            const eBAProjects = await eBABrokerClient.GetProjects();
                            this.SetProjects(eBAProjects);
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

    private renderProcessStates() {
        if (this.Loading) {
            return;
        }
        if (this.SelectedProject != null)
            return ['Finished Process', 'Ongoing processes']
                .filter((item: string) => {
                    if (this.filterServers != '') {
                        return item.toLowerCase().indexOf(this.filterServers.toLowerCase()) > -1;
                    } else {
                        return item;
                    }
                })
                .map((item: string) => {
                    const className = classNames('nc-icon-outline icon fa', {
                        'fa-eba-process-state-finished': item === 'Finished Process',
                        'fa-eba-process-state-ongoing': item === 'Ongoing processes'
                    } as any);
                    return (
                        <div class="entity" style="" onclick={async () => {
                            this.Loading = true;
                            const processes: IEbaProcess[] = await eBABrokerClient.GetProcesses(this.SelectedProject.Name);
                            console.log(processes.length);
                            const result = [];
                            for (let i = 0; i < processes.length; i++) {
                                if (item === 'Finished Process') {
                                    if (!processes[i].Finished) {
                                        continue;
                                    }
                                } else if (item === 'Ongoing processes') {
                                    if (processes[i].Finished) {
                                        continue;
                                    }
                                }

                                const history: any[] = await eBABrokerClient.GetProcessHistory(processes[i].Id);
                                history.forEach(item => {
                                    if (item['ResponseDate'] == null) {
                                        item['ResponseDate'] = item['RequestDate'];
                                    }
                                    if (item['Description'] == null || item['Description'] === '' ) {
                                        item['Description'] = item['Text'];
                                    }
                                    result.push(item);
                                });
                                this.LoadingText = `Loading ${i} of ${processes.length} process event data`;
                                //console.log(history);

                            }
                            console.log(result);
                            this.Loading = false;
                            this.SelectedState = item;
                            this.ProcessData = this.grid.DataSource = this.ProcessHistory = result;
                        }}>
                            <div class="item">
                                <span class={className}></span>{item}</div>
                        </div>
                    );
                });
    }

    private renderProcessHistory() {
        if (this.ProcessHistory != null) {
            return (this.grid as any).CreateMainElement();
        }
    }

    private renderElements() {
        const olmadibastan = "";
        if (this.SelectedState == null) {
            if (this.SelectedServer == null) {
                return this.renderServers();
            } else if (this.SelectedProject == null) {
                return this.renderProjects();
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
    private renderBread() {
        const renderServerBread = () => {
            if (this.SelectedServer != null) {
                return (

                    <li class="" onclick={() => {
                        this.SelectedProject = null;
                        this.SelectedState = null;
                    }}>
                        <a href="void:javascript(0)" class="p-menuitem-link">
                            <span class="p-menuitem-text">{this.SelectedServer.Name}</span></a>
                    </li>

                );
            }
        }
        const renderProjectBread = () => {
            if (this.SelectedProject) {
                return (

                    <li class="" onclick={() => {
                        this.SelectedState = null;
                    }}>
                        <a href="#" class="p-menuitem-link">
                            <span class="p-menuitem-text">{this.SelectedProject.Caption}</span></a>
                    </li>

                );
            }
        }
        const renderProcessStateBread = () => {
            if (this.SelectedState != null) {
                return (

                    <li class="" onclick={() => {

                        this.SelectedState = null;
                    }}>
                        <a href="#" class="p-menuitem-link">
                            <span class="p-menuitem-text">{this.SelectedState}</span></a>
                    </li>

                );
            }
        }

        return (
            <nav class="p-breadcrumb p-component" style="border:solid 0px">
                <ul>
                    <li class="p-breadcrumb-home" onclick={() => {
                        this.SelectedServer = null;
                        this.SelectedProject = null;
                        this.SelectedState = null;
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
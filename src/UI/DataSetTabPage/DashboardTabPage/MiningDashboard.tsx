import { Dashboard } from '@tuval/components/layouts';
import { int, Guid } from '@tuval/core';
import { Teact, React } from '@tuval/forms';
import { IDataSet } from '../../../Bussiness/IDataSet';
import { Services } from '../../../Services/Services';
import { MiningBrokerClient } from '../../Dialogs/ConnectorDialog/eBA/MiningBrokerClient';
import { FrequencyChart } from '../StatisticTabPage/ActivityOverview/Charts/FrequencyChart';
import { MeanChart } from '../StatisticTabPage/ActivityOverview/Charts/MeanChart';

export class MiningDashboard extends Dashboard {
    dataset: IDataSet;
    public override InitComponents() {
        this.Columns = 12;
        this.CellSpacing = [10, 10];
        this.CellAspectRatio = 100 / 100;
        this.ShowGridLines = true;
        this.AllowResizing = true;
        this.Width = 1200;
        this.Height = 800;
    }

    public SetDataSet(dataset: IDataSet) {
        this.dataset = dataset;


        this.Panels = [
           /*  {
                'id': Guid.NewGuid().ToString(),
                'sizeX': 2, 'sizeY': 1, 'row': 0, 'col': 0,
                content: this.panel0(dataset)
            },
            {
                'id': Guid.NewGuid().ToString(),
                'sizeX': 2, 'sizeY': 1, 'row': 0, 'col': 2,
                content: this.panel6(dataset)
            },
            {
                'id': Guid.NewGuid().ToString(),
                'sizeX': 2, 'sizeY': 1, 'row': 0, 'col': 4,
                content: this._GetPanelContent(dataset, 0)
            },
            {
                'id': Guid.NewGuid().ToString(),
                'sizeX': 2, 'sizeY': 1, 'row': 0, 'col': 6,
                content: this._GetPanelContent(dataset, 1)
            }, */
            /* {
                'id': Guid.NewGuid().ToString(),
                'sizeX': 2, 'sizeY': 1, 'row': 0, 'col': 8,
                content: this.panel3(dataset),
                header: '<div>Activity</div>',
            }, */
           /*  {
                'id': Guid.NewGuid().ToString(),
                'sizeX': 2, 'sizeY': 1, 'row': 1, 'col': 0,
                content: this.meanCaseDuractionPanel(dataset)
            }, */
            /* {
                'id': Guid.NewGuid().ToString(),
                'sizeX': 2, 'sizeY': 1, 'row': 1, 'col': 2,
                content: this.medianCaseDuractionPanel(dataset)
            }, */
            {
                'id': Guid.NewGuid().ToString(),
                'sizeX': 6, 'sizeY': 4, 'row': 0, 'col': 0,
                content: this.panel4(dataset),
                header: '<div>Activity Mean Duration</div>',
            },
            {
                'id': Guid.NewGuid().ToString(),
                'sizeX': 6, 'sizeY': 4, 'row': 0, 'col': 6,
                content: this.panel5(dataset),
                header: '<div>Activity Frequency</div>',
            },
            /* {
                'id': Guid.NewGuid().ToString(),
                'sizeX': 2, 'sizeY': 1, 'row': 2, 'col': 0,
                content: this.averageCostOfDatasetPanel(dataset)
            } */
        ];
    }
    public _GetPanelContent(dataset: IDataSet, index: int): any {
        switch (index) {
            case 0:
                return this.panel1(dataset);
            case 1:
                return this.panel2(dataset);
            default:
                return null;
        }
    }

    private meanCaseDuractionPanel(dataset: IDataSet) {
        const parent = document.createElement('div');
        Services.ProjectService.GetMeanCaseDuration(this.dataset.ProjectId, this.dataset.Id).then(eventCount => {
            let control = (<div></div>);

            control = (
                <div class="surface-card border-round flex flex-column md:flex-row">
                    <div class="md:border-bottom-none surface-border flex-auto p-3">
                        <div class="flex align-items-center mb-3">
                            <span class="text-500 font-medium">Mean Case Duration</span>
                        </div>
                        <span class="block text-1xl text-900 font-bold text-blue-500 mb-1 text-xl">{eventCount}</span>

                    </div>
                </div>
            );

            React.render(control, parent);
            this.Refresh();
        });
        return parent;
    }

    private medianCaseDuractionPanel(dataset: IDataSet) {
        const parent = document.createElement('div');
        Services.ProjectService.GetMedianCaseDuration(this.dataset.ProjectId, this.dataset.Id).then(eventCount => {
            let control = (<div></div>);

            control = (
                <div class="surface-card border-round flex flex-column md:flex-row">
                    <div class="md:border-bottom-none surface-border flex-auto p-3">
                        <div class="flex align-items-center mb-3">
                            <i class="pi pi-chart-bar text-blue-500 text-xl mr-2"></i>
                        </div>
                        <span class="block text-1xl text-900 font-bold text-blue-500 mb-1 text-xl">{eventCount}</span>
                        <span class="text-500 font-medium">Median Case Duration</span>
                    </div>
                </div>
            );

            React.render(control, parent);
            this.Refresh();
        });
        return parent;
    }

    private averageCostOfDatasetPanel(dataset: IDataSet) {
        const parent = document.createElement('div');
        Services.ProjectService.GetAverageCostOfDataset(this.dataset.ProjectId, this.dataset.Id).then(eventCount => {
            let control = (<div></div>);

            control = (
                <div class="surface-card border-round flex flex-column md:flex-row">
                    <div class="md:border-bottom-none surface-border flex-auto p-3">
                        <div class="flex align-items-center mb-3">
                            <i class="pi pi-chart-bar text-blue-500 text-xl mr-2"></i>
                        </div>
                        <span class="block text-1xl text-900 font-bold text-blue-500 mb-1 text-xl">{eventCount}</span>
                        <span class="text-500 font-medium">Average Cost</span>
                    </div>
                </div>
            );

            React.render(control, parent);
            this.Refresh();
        });
        return parent;
    }

    private panel0(dataset: IDataSet) {
        const parent = document.createElement('div');
        Services.ProjectService.GetTraceCount(this.dataset.ProjectId, this.dataset.Id).then(eventCount => {
            let control = (<div></div>);

            control = (
                <div class="surface-card border-round flex flex-column md:flex-row">
                    <div class="md:border-bottom-none surface-border flex-auto p-3">
                        <div class="flex align-items-center mb-3">
                            <i class="pi pi-chart-bar text-blue-500 text-xl mr-2"></i>
                        </div>
                        <span class="block text-2xl text-900 font-bold text-blue-500 mb-1 text-xl">{eventCount}</span>
                        <span class="text-500 font-medium">Trace Count</span>
                    </div>
                </div>
            );

            React.render(control, parent);
            this.Refresh();
        });
        return parent;
    }

    private panel1(dataset: IDataSet) {
        const parent = document.createElement('div');
        Services.ProjectService.CasesStartedPerDay(this.dataset.ProjectId, this.dataset.Id).then(eventCount => {
            let control = (<div></div>);

            control = (
                <div class="surface-card border-round flex flex-column md:flex-row">
                    <div class="md:border-bottom-none surface-border flex-auto p-3">
                        <div class="flex align-items-center mb-3">
                            <i class="pi pi-chart-bar text-blue-500 text-xl mr-2"></i>
                        </div>
                        <span class="block text-2xl text-900 font-bold text-blue-500 mb-1 text-xl">{eventCount}</span>
                        <span class="text-500 font-medium">Cases started per day</span>
                    </div>
                </div>
            );

            React.render(control, parent);
            this.Refresh();
        });
        return parent;
    }

    private panel2(dataset: IDataSet) {
        const parent = document.createElement('div');
        Services.ProjectService.ActivitiesStartedPerDay(this.dataset.ProjectId, this.dataset.Id).then(eventCount => {
            let control = (<div></div>);

            control = (
                <div class="surface-card border-round flex flex-column md:flex-row">
                    <div class="md:border-bottom-none surface-border flex-auto p-3">
                        <div class="flex align-items-center mb-3">
                            <i class="pi pi-chart-bar text-blue-500 text-xl mr-2"></i>
                        </div>
                        <span class="block text-2xl text-900 font-bold text-blue-500 mb-1 text-xl">{eventCount}</span>
                        <span class="text-500 font-medium">Activities started per day</span>
                    </div>
                </div>
            );

            React.render(control, parent);
            this.Refresh();
        });
        return parent;
    }

    private panel3(dataset: IDataSet) {
        const parent = document.createElement('div');
        Services.ProjectService.ActivitiesPerCase(this.dataset.ProjectId, this.dataset.Id).then(eventCount => {
            let control = (<div></div>);

            control = (
                <div class="surface-card border-round flex flex-column md:flex-row">
                    <div class="md:border-bottom-none surface-border flex-auto p-3">
                        <div class="flex align-items-center mb-3">
                            <i class="pi pi-chart-bar text-blue-500 text-xl mr-2"></i>
                        </div>
                        <span class="block text-2xl text-900 font-bold text-blue-500 mb-1 text-xl">{eventCount}</span>
                        <span class="text-500 font-medium">Activities per case</span>
                    </div>
                </div>
            );

            React.render(control, parent);
            this.Refresh();
        });
        return parent;
    }
    /* private panel4(dataset: IDataSet) {
        const parent = document.createElement('div');
        Services.ProjectService.GetStartEvents(this.dataset.ProjectId, this.dataset.Id).then(startEvents => {
            let control = (<div></div>);
            console.log(startEvents);
            const getStartEvents = () => {
                const result = [];
                for (let key in startEvents) {
                    result.push(<span class="block font-medium  font-bold text-blue-500 mb-1">{key} - {startEvents[key]}</span>);
                }
                return result;
            }
            control = (
                <div class="surface-card border-round flex flex-column md:flex-row">
                    <div class="md:border-bottom-none surface-border flex-auto p-3">
                        <div class="flex align-items-center mb-3">
                            <span class="text-500 font-medium">Start Events</span>
                        </div>
                        {getStartEvents()}
                    </div>
                </div>
            );

            React.render(control, parent);
            this.Refresh();
        });
        return parent;
    } */
    private panel4(dataset: IDataSet) {
        const parent = document.createElement('div');
        const chart = new MeanChart();
        /* Services.ProjectService.GetEndEvents(this.dataset.ProjectId, this.dataset.Id).then(startEvents => {
            let control = (<div></div>);
            console.log(startEvents);
            const getStartEvents = () => {
                const result = [];
                for (let key in startEvents) {
                    result.push(<span class="block font-medium  font-bold text-blue-500 mb-1">{key} - {startEvents[key]}</span>);
                }
                return result;
            }
            control = (
                <div class="surface-card border-round flex flex-column md:flex-row">
                    <div class="md:border-bottom-none surface-border flex-auto p-3">
                        <div class="flex align-items-center mb-3">
                            <span class="text-500 font-medium">End Events</span>
                        </div>
                        {getStartEvents()}
                    </div>
                </div>
            );

            React.render(control, parent);
            this.Refresh();
        }); */
        MiningBrokerClient.GetActivityOverview(dataset.Id).then(data => {
            chart.SetChartData(data);
            let control = (<div></div>);
            control = (
                <div>
                   {(chart as any).CreateMainElement()}
                </div>
            );

            setTimeout(async () => {
                chart.Refresh()
                this.Refresh();
            }, 5000);
            React.render(control, parent);
            this.Refresh();
        });
        return parent;
    }
    private panel5(dataset: IDataSet) {
        const parent = document.createElement('div');
        const chart = new FrequencyChart();
        /* Services.ProjectService.GetEndEvents(this.dataset.ProjectId, this.dataset.Id).then(startEvents => {
            let control = (<div></div>);
            console.log(startEvents);
            const getStartEvents = () => {
                const result = [];
                for (let key in startEvents) {
                    result.push(<span class="block font-medium  font-bold text-blue-500 mb-1">{key} - {startEvents[key]}</span>);
                }
                return result;
            }
            control = (
                <div class="surface-card border-round flex flex-column md:flex-row">
                    <div class="md:border-bottom-none surface-border flex-auto p-3">
                        <div class="flex align-items-center mb-3">
                            <span class="text-500 font-medium">End Events</span>
                        </div>
                        {getStartEvents()}
                    </div>
                </div>
            );

            React.render(control, parent);
            this.Refresh();
        }); */
        MiningBrokerClient.GetActivityOverview(dataset.Id).then(data => {
            chart.SetChartData(data);
            let control = (<div></div>);
            control = (
                <div>
                   {(chart as any).CreateMainElement()}
                </div>
            );

            setTimeout(async () => {
                chart.Refresh()
                this.Refresh();
            }, 5000);
            React.render(control, parent);
            this.Refresh();
        });
        return parent;
    }
    private panel6(dataset: IDataSet) {
        const parent = document.createElement('div');
        Services.ProjectService.GetEventCount(this.dataset.ProjectId, this.dataset.Id).then(eventCount => {
            let control = (<div></div>);

            control = (
                <div class="surface-card border-round flex flex-column md:flex-row">
                    <div class="md:border-bottom-none surface-border flex-auto p-3">
                        <div class="flex align-items-center mb-3">
                            <i class="pi pi-chart-bar text-blue-500 text-xl mr-2"></i>
                        </div>
                        <span class="block text-2xl text-900 font-bold text-blue-500 mb-1 text-xl">{eventCount}</span>
                        <span class="text-500 font-medium">Events Count</span>
                    </div>
                </div>
            );

            React.render(control, parent);
            this.Refresh();
        });
        return parent;
    }
}
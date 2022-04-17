import { Teact, DomHandler, Control, Property } from '@tuval/forms';
import { TvChart, sort } from '@tuval/components/charts';
import { Services } from '../../../Services/Services';
import { CurrentDatasetChangedArgs } from '../../../Services/StateService';
import { int, Guid } from '@tuval/core';

/* console.log('css');
console.log(css);
DomHandler.addCssToDocument(css); */

export class DashboardPage extends Control<DashboardPage> {

    @Property()
    private GUID: string;

    private static TraceCount: int;
    private static EventCount: int;
    private static StartEvents: any;
    private static EndEvents: any;
    private static CaseStartedPerDay: int;
    private static ActivityPerDay: int;
    private static VariantsCount:int;
    private static MeanCaseDuration: string;
    private static MedianCaseDuration: string;

    @Property()
    private chart: TvChart;
    public SetupControlDefaults(): void {
        super.SetupControlDefaults();
        this.chart = new TvChart();
        this.chart.Width = -1;
        this.chart.Height = 200;
        this.chart.Title = '';
        DashboardPage.TraceCount = 0;
        DashboardPage.EventCount = 0;
        DashboardPage.StartEvents = {};
        this.GUID = Guid.NewGuid().ToString();
        console.log(this.GUID);

        Services.StateService.CurrentDatasetChanged.add((args: CurrentDatasetChangedArgs) => {
            return;
            this.chart.PrimaryXAxis = {
                valueType: 'DateTime',
                labelFormat: 'd.MM.y',
                edgeLabelPlacement: 'Shift',
                labelIntersectAction: 'Hide',
                majorGridLines: { width: 0 }
            };
            this.chart.PrimaryYAxis = {
                title: 'Events',
                labelFormat: '{value}',
                edgeLabelPlacement: 'Shift',
                majorGridLines: { width: 1 },
                majorTickLines: { width: 1 },
                lineStyle: { width: 1 },
                labelStyle: {
                    color: 'transparent'
                }
            };

            this.chart.Loading = true;

            Services.ProjectService.GetEventsOverTime(args.ProjectId, args.DatasetId).then(data => {
                const seriesData = [];
                for (let i = 0; i < data.length; i++) {
                    seriesData.push({
                        x: new Date(data[i].start),
                        y: data[i].count
                    });
                }

                this.chart.Loading = false;
                this.chart.Series = [{
                    type: 'Column',
                    xName: 'x',
                    width: 2,
                    yName: 'y',
                    /*  name: 'Gold', */
                    dataSource: seriesData,
                    /*  marker: { dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } } */
                }];

                // Trace Count
                Services.ProjectService.GetTraceCount(args.ProjectId, args.DatasetId).then(eventCount => {
                    DashboardPage.TraceCount = eventCount;
                    console.log('dataset trace count ' + eventCount);
                });

                Services.ProjectService.GetEventCount(args.ProjectId, args.DatasetId).then(eventCount => {
                    DashboardPage.EventCount = eventCount;
                });

                Services.ProjectService.GetStartEvents(args.ProjectId, args.DatasetId).then(startEvents => {
                    DashboardPage.StartEvents = startEvents;
                });
                Services.ProjectService.GetEndEvents(args.ProjectId, args.DatasetId).then(endEvents => {
                    DashboardPage.EndEvents = endEvents;
                });

                Services.ProjectService.GetMedianCaseDuration(args.ProjectId, args.DatasetId).then(eventCount => {
                    DashboardPage.MedianCaseDuration = eventCount;
                });
                Services.ProjectService.GetMeanCaseDuration(args.ProjectId, args.DatasetId).then(eventCount => {
                    DashboardPage.MeanCaseDuration = eventCount;
                });

                Services.ProjectService.CasesStartedPerDay(args.ProjectId, args.DatasetId).then(eventCount => {
                    DashboardPage.CaseStartedPerDay = eventCount;
                });
                Services.ProjectService.ActivitiesStartedPerDay(args.ProjectId, args.DatasetId).then(eventCount => {
                    DashboardPage.ActivityPerDay = eventCount;
                });
                Services.ProjectService.GetVariantsInfo(args.ProjectId, args.DatasetId).then(variantsInfo => {
                    DashboardPage.VariantsCount = variantsInfo.variants.length;
                });

            });
        });
    }

    private getTraceCount() {
        alert(DashboardPage.TraceCount);
    }

    private renderStartEvents() {
        const result = [];
        for (let key in DashboardPage.StartEvents) {
            const control = (
                <tr style='font-family:Roboto;font-size:14px;color:#333;'><td class="value">
                    <a title={key} href="#">
                        {key}
                    </a>
                </td>
                    <td class="number">
                        {DashboardPage.StartEvents[key]}
                    </td>
                </tr>
            );
            result.push(control);
        }
        return result;
    }
    private renderEndEvents() {
        const result = [];
        for (let key in DashboardPage.EndEvents) {
            const control = (
                <tr style='font-family:Roboto;font-size:14px;color:#333;'><td class="value">
                    <a title={key} href="#">
                        {key}
                    </a>
                </td>
                    <td class="number">
                        {DashboardPage.EndEvents[key]}
                    </td>
                </tr>
            );
            result.push(control);
        }
        return result;
    }
    public CreateElements() {
        if (!this.Visible) {
            return;
        }
        console.log(this.GUID);
        console.log('create element trace count ' + DashboardPage.TraceCount);
        return (

            <div class="dashboard" style="margin-bottom: 100px;">
                <div id="dashboard-header" class="clearfix">
                    <h2 class="page-header">
                        <i class="fa fa-dashboard fa fa-fw"></i>&nbsp;Dashboard&nbsp;&nbsp;
                    </h2>
                    <div class="header-stats">
                        <div class="header-stat">
                            <div class="title" onclick={e => this.getTraceCount()}>TRACES</div>
                            <div class="value value-none">{DashboardPage.TraceCount}</div>
                        </div>
                        <div class="header-stat">
                            <div class="title">EVENTS</div>
                            <div class="value value-info" title="2">{DashboardPage.EventCount}</div>
                        </div>
                        <div class="header-stat">
                            <div class="title">VARIANTS</div>
                            <div class="value value-bad" title="2">{DashboardPage.VariantsCount}</div>
                        </div>
                        <div class="header-stat">
                            <div class="title">CASES PER DAY</div>
                            <div class="value value-bad" title="2">{DashboardPage.CaseStartedPerDay}</div>
                        </div>
                        <div class="header-stat">
                            <div class="title">ACTIVITIES PER DAY</div>
                            <div class="value value-bad" title="2">{DashboardPage.ActivityPerDay}</div>
                        </div>
                        <div class="header-stat">
                            <div class="title">AVG COST</div>
                            <div class="value value-bad" title="1">1</div>
                        </div>
                        <div class="header-stat">
                            <div class="title">TOTAL COST</div>
                            <div class="value value-bad" title="1">1</div>
                        </div>
                        {/*  <div class="header-stat">
                            <div class="title">SAMPLING</div>
                            <div title="We are processing all of your errors"><a class="value value-info" href="/usage">off</a></div>
                        </div> */}
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12" style="padding-left:5px;padding-right: 5px;">
                        <div id="errors-page-views-chart">
                            <div class="error-page-view-chart-actions clearfix">
                                <div class="time-range">
                                    Event Count
                                </div>
                            </div>
                            <div style="position: relative;">


                                <div class="chart" style="padding: 0px; position: relative;">
                                    {(this.chart as any).CreateMainElement()}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div class="top-list-container" style="position:relative;">
                    <div class="loading-overlay pjax-loading" style="display:none;position: absolute;"><div class="loader"></div></div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="shadow-block">
                                <div class="highest-impact">
                                    <div id="highest-impact-chart"></div>
                                    <h2><i class="fa fa-area-chart"></i>&nbsp;Mean Case Duration</h2>
                                    <div class="user-count flex-column">
                                        <h2 style='color:#b40404;font-size:20px;'>{DashboardPage.MeanCaseDuration}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="shadow-block">
                                <div class="highest-impact">
                                    <div id="highest-impact-chart"></div>
                                    <h2><i class="fa fa-area-chart"></i>&nbsp;Median Case Duration</h2>
                                    <div class="user-count flex-column">
                                        <h2 style='color:#b40404;font-size:20px;'>{DashboardPage.MedianCaseDuration}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="top-list-container" style="position:relative;">
                    <div class="loading-overlay pjax-loading" style="display:none;position: absolute;"><div class="loader"></div></div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="shadow-block">
                                <div class="highest-impact">
                                    <div id="highest-impact-chart"></div>
                                    <h2><i class="bpmn-icon-start-event-none"></i>&nbsp;Start Events</h2>
                                    <table class="top-list">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th class="number" style="width: 75px;position: relative;"><span style="position: absolute;left: -75px; top: 4px; width: 150px;">Count</span></th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {this.renderStartEvents()}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="shadow-block">
                                <div class="top-messages">
                                    <h2><i class="bpmn-icon-end-event-none"></i>&nbsp;End Events</h2>
                                    <table class="top-list">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th class="number" style="width: 100px;">Count</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.renderEndEvents()}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
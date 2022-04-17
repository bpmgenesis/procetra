import { Teact, DomHandler, Control, Property, TTabControl, TTabPage } from '@tuval/forms';
import { DashboardPage } from './DashboardPage/DashboardPage';
import { PageBanner } from './PageBanner';
import { DashboardMenu, DashboardMenuChangedArg, DashboardSubMenuChangedArg } from './DashboardMenu/DashBoardMenu';
import { EventLogsTabPage } from './EventLogPage/EventLogsTabPage';
import { Services } from '../../Services/Services';
import { CurrentDatasetChangedArgs } from '../../Services/StateService';
import { ModelTabPage } from './ModelPage/ModelTabPage';
import { VariantTabPage } from './VariantPage/VariantTabPage';
import { EmptyTabPage } from './EmptyTabPage';

export class InnerContainer extends Control<InnerContainer> {

    private cssId: string;

    @Property()
    private DashboardMenu: DashboardMenu;

    @Property()
    private PageBanner: PageBanner;

    @Property()
    private DashboardPage: DashboardPage;

    @Property()
    private TabControl: TTabControl;
    eventsLogTabPage: EventLogsTabPage;
    private variantTabPage: VariantTabPage;
    ProjectId: string;
    DatasetId: string;
    modelTabPage: ModelTabPage;

    public SetupControlDefaults(): void {
        super.SetupControlDefaults();
        this.TabControl = new TTabControl();
        this.TabControl.ShowHeader = false;
        const dashboardTabPage = new TTabPage();
        dashboardTabPage.Text = 'Dashboard';


        this.TabControl.TabPages.Add(dashboardTabPage);

        this.DashboardPage = new DashboardPage();
        dashboardTabPage.Controls.Add(this.DashboardPage);

        this.eventsLogTabPage = new EventLogsTabPage();
        this.TabControl.TabPages.Add(this.eventsLogTabPage);

        this.modelTabPage = new ModelTabPage();
        this.TabControl.TabPages.Add(this.modelTabPage);


        this.TabControl.TabPages.Add(new TTabPage());

        this.variantTabPage = new VariantTabPage();
        this.TabControl.TabPages.Add(this.variantTabPage);

        const ep = new EmptyTabPage();

        this.TabControl.TabPages.Add(ep);

        this.PageBanner = new PageBanner();
        this.DashboardMenu = new DashboardMenu();
        this.DashboardMenu.Items.Add('Dashboard', 'icon-dashboard');
        this.DashboardMenu.Items.Add('Event Data', 'fa fa-eventlog');
        const modelMenu = this.DashboardMenu.Items.Add('Models', 'fa fa-sitemap');
        modelMenu.SubMenuItems.Add('Perf Model', 'fa fa-sitemap');
        modelMenu.SubMenuItems.Add('Freq Model', 'fa fa-sitemap');
        modelMenu.SubMenuItems.Add('Petri Model', 'fa fa-sitemap');

        this.DashboardMenu.Items.Add('Variants', 'fa fa-variant');

        const analysisMenu = this.DashboardMenu.Items.Add('Analysis', 'fa fa-calculator');
        analysisMenu.SubMenuItems.Add('Bottleneck', 'fa fa-xing');
        analysisMenu.SubMenuItems.Add('Deadline', 'fa fa-calendar-o');
        analysisMenu.SubMenuItems.Add('Rework', 'fa fa-history');



        this.DashboardMenu.Items.Add('Comparison', 'fa fa-comparison');

        const b = this.DashboardMenu.Items.Add('Statistic', 'fa fa-statistic');
        b.SubMenuItems.Add('Statistic', 'icon-recent');

        this.DashboardMenu.Items.Add('Fraud', 'icon-messages');

        const a = this.DashboardMenu.Items.Add('Alerts', 'fa fa-bell');
        a.SubMenuItems.Add('Alerts', 'fa fa-bell');

        this.DashboardMenu.Items.Add('Settings', 'icon-settings');


        this.DashboardMenu.SelectedIndex = 0;
        this.DashboardMenu.DashboardMenuChanged.add((args: DashboardMenuChangedArg) => {

            if (args.index === 0 || args.index === 1) {
                this.TabControl.ActiveIndex = args.index;
                this.eventsLogTabPage.SetDataSet(this.ProjectId, this.DatasetId);
            } else /* if (args.index === 2) {
                this.TabControl.ActiveIndex = args.index;
                this.variantTabPage.SetDataSet(this.ProjectId, this.DatasetId);
            }  else*/ if (args.index === 3) {
                    this.TabControl.ActiveIndex = 4; //args.index;
                    this.variantTabPage.SetDataSet(this.ProjectId, this.DatasetId);
                } else if (args.index === 4) {
                    this.TabControl.ActiveIndex = 5; //args.index;
                    this.variantTabPage.SetDataSet(this.ProjectId, this.DatasetId);
                }
                else {
                    console.log(args.index);
                    this.TabControl.ActiveIndex = 5;
                }

        });

        this.DashboardMenu.DashboardSubMenuChanged.add((args: DashboardSubMenuChangedArg) => {
            if (args.index === 2) {
                this.TabControl.ActiveIndex = args.index;
                if (args.subIndex === 0) {
                    this.modelTabPage.SetPerfModelDataSet(this.ProjectId, this.DatasetId);
                }
                if (args.subIndex === 1) {
                    this.modelTabPage.SetFreqModelDataSet(this.ProjectId, this.DatasetId);
                }
                if (args.subIndex === 2) {
                    this.modelTabPage.SetPetriModelDataSet(this.ProjectId, this.DatasetId);
                }
            }
            /*  this.TabControl.ActiveIndex = args.index;
             if (args.index === 1) {
                 this.eventsLogTabPage.SetDataSet(this.ProjectId, this.DatasetId);
             } */



        });
        this.PageBanner.Title = 'Test';

        Services.StateService.CurrentDatasetChanged.add((args: CurrentDatasetChangedArgs) => {
            this.ProjectId = args.ProjectId;
            this.DatasetId = args.DatasetId;
        });
    }

    protected componentDidMount(): void {
        this.cssId = DomHandler.addCssToDocument(require('./Tracker.css'));
        console.log('css loaded ' + this.cssId);
    }
    protected componentWillUnmount(): void {
        DomHandler.removeCssToDocument(this.cssId);
        console.log('css unloaded');
    }

    public CreateElements() {
        if (!this.Visible) {
            return;
        }
        return (
            <div id="inner-container">

                {(this.DashboardMenu as any).CreateMainElement()}

                <aside id="mobile-sidebar" class="flyout">
                    <ul class="nav collapse navbar-collapse primary-nav mobile-nav">
                        <li><a class="sidebar-menu-item" href="#"><i class="fa fa-file"></i>Docs</a></li>
                        <li><a class="sidebar-menu-item" href="/usage"><i class="fa-bar-chart-o fa"></i>Usage</a></li>
                        <li><a class="sidebar-menu-item" href="/account/switch"><i class="fa-users fa"></i>Switch</a></li>
                        <li><a class="sidebar-menu-item" href="/customer/logout"><i class="fa-sign-out fa"></i>Sign Out</a></li>
                    </ul>
                </aside>
                <div id="page-main">
                    {/* {(this.PageBanner as any).CreateMainElement()} */}

                    {/*  <div id="dashboard-header" class="clearfix" style="margin: 0px 0px 0px 0px">
                        <svg height="50" width="50" viewBox="0 0 20 20">
                            <circle r="10" cx="10" cy="10" fill="gray" />
                            <circle r="5" cx="10" cy="10" fill="transparent"
                                stroke="tomato"
                                stroke-width="10"
                                stroke-dasharray="calc(35 * 31.4 / 100) 31.4"
                                transform="rotate(-90) translate(-20)" />
                        </svg>

                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <svg height="50" width="50" viewBox="0 0 20 20">
                            <circle r="10" cx="10" cy="10" fill="gray" />
                            <circle r="5" cx="10" cy="10" fill="transparent"
                                stroke="orange"
                                stroke-width="10"
                                stroke-dasharray="calc(35 * 31.4 / 100) 31.4"
                                transform="rotate(-90) translate(-20)" />
                        </svg>
                        <div class="header-stats">
                            <div class="header-stat">
                                <div class="title">TRACES</div>
                                <div class="value value-none">0</div>
                            </div>
                            <div class="header-stat">
                                <div class="title">EVENTS</div>
                                <div class="value value-info" title="2">2</div>
                            </div>
                            <div class="header-stat">
                                <div class="title">VARIANTS</div>
                                <div class="value value-bad" title="2">2</div>
                            </div>
                            <div class="header-stat">
                                <div class="title">CASES PER DAY</div>
                                <div class="value value-bad" title="2">2</div>
                            </div>
                            <div class="header-stat">
                                <div class="title">ACTIVITIES PER DAY</div>
                                <div class="value value-bad" title="2">2</div>
                            </div>
                            <div class="header-stat">
                                <div class="title">AVG COST</div>
                                <div class="value value-bad" title="1">1</div>
                            </div>
                            <div class="header-stat">
                                <div class="title">TOTAL COST</div>
                                <div class="value value-bad" title="1">1</div>
                            </div>
                            <div class="header-stat">
                                <div class="title">SAMPLING</div>
                                <div title="We are processing all of your errors"><a class="value value-info" href="/usage">off</a></div>
                            </div>
                        </div>
                    </div>*/}
                    <div id="page-content" class="">
                        {/* <div>
                            <div class="partial-not-installed flex-column align-center">
                                <h3>We don't have any data!</h3>
                                <p>We'll start showing you errors once you install the agent.</p>
                                <a href="/install" class="form-button-outline">Install Now</a>
                            </div>
                        </div> */}
                        {(this.TabControl as any).CreateMainElement()}

                    </div>

                </div>
                <div id="feedback-container">
                    <div class="modal fade" id="feedbackModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close cancel-feedback" aria-hidden="true">×</button>
                                    <h4 class="modal-title">Need Help?</h4>
                                </div>
                                <div class="modal-body">
                                    <div id="feedback-inner-container">
                                        <div id="feedback-form" style="">
                                            <form class="form">
                                                <fieldset>
                                                    <div id="feedback-success-container" style="display: none;">
                                                        <div class="alert alert-success">
                                                            Message sent successfully
                                                        </div>
                                                        We take pride in the quality of our support and love to help. Rest assured someone will be getting back to you shortly!
                                                        <div style="text-align: right;">
                                                            <button type="button" class="btn cancel-feedback">Close</button>
                                                            <button type="button" id="more-feedback" class="btn btn-primary">Oops, I had more I wanted to say!</button>
                                                        </div>
                                                    </div>
                                                    <div id="feedback-message-container">
                                                        <input type="hidden" id="feedback-type" value="SupportRequest" />
                                                        <div class="alert alert-danger" id="feedback-error-message" style="display: none;"></div>
                                                        <p style="margin-bottom: 15px;">

                                                        </p>
                                                        <div class="control-group">
                                                            <textarea rows="6" style="width: 100%;" id="feedback-message"></textarea>
                                                        </div>
                                                        <div style="text-align: right;">
                                                            <span class="small-spinny" id="feedback-progress" style="top: 12px; display: none;"></span>
                                                            <button type="button" class="btn cancel-feedback">Cancel</button>
                                                            <button type="button" id="submit-feedback" class="btn btn-primary">Send Message</button>
                                                        </div>
                                                    </div>
                                                </fieldset>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
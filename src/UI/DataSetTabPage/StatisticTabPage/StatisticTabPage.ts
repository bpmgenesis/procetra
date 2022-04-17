import { ItemOverviewTabPage } from './ItemOverview/ItemOverviewTabPage';
import { DurationChart } from './ActivityOverview/Charts/DurationChart';
import { FrequencyChart } from './ActivityOverview/Charts/FrequencyChart';
import { GridView } from '@tuval/components/grids';
import { TvChart, sort } from '@tuval/components/charts';
import { SelectButton, TTabPage, RadioButtonGroup, RadioButtonGroupItem, GridColumn, TextAlign, ScrollPanel, TTabControl, ListMenu } from '@tuval/forms';
import { IDataSet } from '../../../Bussiness/IDataSet';
import { GeneralLogStatistics } from '../../../Logic/statistics/log/general';
import { FlexLayout } from '../../controls/layout/FlexLayout';
import { FlexLayoutItem } from '../../controls/layout/FlexLayoutItem';
import { JustifyContents } from '../../controls/layout/JustifyContents';
import { SummaryWidget } from './SummaryWidget';
import { Services } from '../../../Services/Services';
import { moment, TString, int, Convert, is } from '@tuval/core';
import { MiningBrokerClient } from '../../Dialogs/ConnectorDialog/eBA/MiningBrokerClient';
import { humanizeDuration } from '../../../Logic/utils/generic/humanize-duration';
import { MedianChart } from './ActivityOverview/Charts/MedianChart';
import { MeanChart } from './ActivityOverview/Charts/MeanChart';
import { Resources } from '../../../Resources/Resources';
import { StatisticListMenu } from './StatisticListMenu';
import { EventsOverTimeChart } from './CaseOverview/Charts/EventsOverTimeChart';
import { ActivityOverviewGrid } from './ActivityOverview/ActivityOverviewGrid';
import { ActivityOverviewTabPage } from './ActivityOverview/ActivityOverviewTabPage';
import { CaseOverviewTabPage } from './CaseOverview/CaseOverviewTabPage';
import { ResourceOverviewTabPage } from './ResourceOverview/ResourceOverviewTabPage';

export class StatisticTabPage extends TTabPage {
    tabControl: TTabControl;
    activityOverviewTabPage: ActivityOverviewTabPage;
    listMenu: StatisticListMenu;
    caseOverviewTabPage: CaseOverviewTabPage;
    resourceOverviewTabPage: ResourceOverviewTabPage;


    public constructor() {
        super();
        const flexPanel = new FlexLayout();
        this.listMenu = new StatisticListMenu();

        flexPanel.AddFlexItem(this.listMenu);
        this.Controls.Add(flexPanel);

        this.tabControl = new TTabControl();
        this.tabControl.ShowHeader = false;
        this.listMenu.SelectedIndexChanged.add((index)=>{
            const tab: any = this.tabControl.TabPages.Get(index);
            if (tab && is.function(tab['Refresh'])) {
                tab.Refresh();
            }
        });
        this.tabControl.ActiveIndex$ = this.listMenu.SelectedIndex$;

        this.caseOverviewTabPage = new CaseOverviewTabPage();
        this.tabControl.TabPages.Add(this.caseOverviewTabPage);

        this.activityOverviewTabPage = new ActivityOverviewTabPage();
        this.tabControl.TabPages.Add(this.activityOverviewTabPage);

        const flexItem2 = flexPanel.AddFlexItem(this.tabControl);
        flexItem2.Grow = true;

    }


    public async SetDataSet(dataset: IDataSet) {
        this.caseOverviewTabPage.Bind(dataset);
        this.activityOverviewTabPage.Bind(dataset);

        this.listMenu.AddResourceOverview();
        this.resourceOverviewTabPage = new ResourceOverviewTabPage();
        this.tabControl.TabPages.Add(this.resourceOverviewTabPage);
        this.resourceOverviewTabPage.Bind(dataset);

        const eventInfo = await MiningBrokerClient.GetLog(dataset.Id);
        this.listMenu.Bind(eventInfo);

        if (eventInfo) {
            const activity_column_name: string[] = eventInfo.activity_column.split(';');
            for (let i = 0; i < activity_column_name.length; i++) {
                const tabPage = new ItemOverviewTabPage();
                tabPage.Text = activity_column_name[i];
                this.tabControl.TabPages.Add(tabPage);
                tabPage.Bind(dataset, activity_column_name[i]);
            }
        }
    }

}
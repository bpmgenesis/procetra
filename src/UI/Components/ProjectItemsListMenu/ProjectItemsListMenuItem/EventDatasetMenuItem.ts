import { TGauge } from '../../TGauge/TGauge';
import { CGColor } from '@tuval/cg';
import { ListMenuItemBase, FontIcon, TVirtualContainer, TLabel, TFlexContainer, TFlexColumnContainer } from '@tuval/forms';
import { IDataSet } from '../../../../Bussiness/IDataSet';
import { GeneralLogStatistics } from '../../../../Logic/statistics/log/general';
export class EventDatasetMenuItem extends ListMenuItemBase {
    private dataset: IDataSet;
    private Icon: FontIcon;
    private container: TVirtualContainer;
    private title: TLabel;
    private subTitle: TLabel;
    private rightLabel: TLabel;
    private statisticRow: TVirtualContainer;

    private traceCountLabel: TLabel;
    private traceCountValueLabel: TLabel;

    private eventCountLabel: TLabel;
    private eventCountValueLabel: TLabel;



    private filterRow: TFlexContainer;
    private infoRow: TFlexContainer;

    public override get Text(): string {
        return this.title.Text;
    }

    public override set Text(value: string) {
        this.title.Text = value;
    }

    public get Subtitle(): string {
        return this.subTitle.Text;
    }

    public set Subtitle(value: string) {
        this.subTitle.Text = value;
    }

    public constructor(dataset: IDataSet) {
        super();

        this.setupFilterRow();
        this.setupStatisticRow();
        this.setupInfo();


        this.dataset = dataset;

        this.Appearance.FlexDirection = 'column';
        this.Appearance.Padding = '8px 15px 5px 15px';
        this.Appearance.Cursor = 'pointer';
        this.Appearance.Color = '#333';
        this.Appearance.Height = '100px';
        this.Appearance.BorderLeft = '1px solid #ccc';
        this.Appearance.BorderBottom = '1px solid #ccc';


        this.container = new TVirtualContainer();
        this.container.Appearance.Display = 'flex';
        //this.container.Appearance.FlexDirection = 'column';
        //this.container.Appearance.FlexGrow = '1';
        //this.container.Appearance.FlexShrink = '0';

        this.Icon = new FontIcon();
        this.Icon.FontFamily = 'TuvalProcetraIcons';
        this.Icon.Content = '\\f050';
        this.Icon.Size = 18;
        this.Icon.Color = CGColor.FromRgba(0x6c, 0x75, 0x7d);
        this.Icon.Appearance.Display = 'flex';
        /* this.Icon.Appearance.JustifyContent = 'center';
        this.Icon.Appearance.AlignItems = 'center'; */

        this.title = new TLabel();
        this.title.Text = '39% of cases';
        this.title.Appearance.FontFamily = 'Proxima Nova';
        this.title.Appearance.FontSize = '14px';
        this.title.Appearance.MarginLeft = '10px';
        this.title.ForeColor = '#6c757d';
        this.title.Appearance.FlexShrink = '0';
        this.title.Appearance.FlexBasis = 'auto';
        this.title.Appearance.FlexGrow = '1';

        this.subTitle = new TLabel();
        this.subTitle.Text = '6 events per case on average';
        this.subTitle.Appearance.FontSize = '12px';

        this.container.Controls.Add(this.Icon);
        this.container.Controls.Add(this.title);
        //this.container.Controls.Add(this.subTitle);


        this.rightLabel = new TLabel();
        this.rightLabel.Text = 'Filter';
        this.rightLabel.Appearance.Padding = '10px';



        //this.Controls.Add(this.Icon);
        this.Controls.Add(this.container);
        this.Controls.Add(this.filterRow);
        this.Controls.Add(this.infoRow);
        //this.Controls.Add(this.statisticRow);
        //this.Controls.Add(this.rightLabel);
    }

    private setupFilterRow() {
        this.filterRow = new TFlexContainer();
        this.filterRow.Appearance.AlignItems = 'center';
        this.filterRow.Appearance.MarginTop = '10px';
        // this.filterRow.Appearance.MarginLeft = '-10px';
        this.filterRow.Appearance.LineHeight = '18px';
        this.filterRow.Appearance.Height = '35px';

        const gaugeSize = '40px';

        //#region of variants

        const filterPersLabel = new TGauge();
        filterPersLabel.Value = 80;
        filterPersLabel.Appearance.Width = gaugeSize;
        filterPersLabel.Appearance.Height = gaugeSize;

        const labelContainer1 = new TFlexColumnContainer();
        labelContainer1.Appearance.LineHeight = '10px';
        labelContainer1.Appearance.FlexGrow = '1';

        const label1: TLabel = new TLabel();
        label1.Text = '100%';
        label1.Appearance.MarginTop = '3px';
        label1.Appearance.MarginBottom = '3px';
        label1.Appearance.FontFamily = 'Proxima Nova';
        label1.Appearance.FontSize = '14px';
        //label1.Appearance.FontWeight = '700';
        label1.Appearance.Width = '45px';
        label1.Appearance.Color = '#505050';

        labelContainer1.Controls.Add(label1);

        const label_1: TLabel = new TLabel();
        label_1.Text = 'of cases';
        label_1.Appearance.FontFamily = 'Proxima Nova';
        label_1.Appearance.Width = '45px';
        label_1.Appearance.Color = '#505050';

        labelContainer1.Controls.Add(label_1);

        //#endregion

        const filterPersLabel1 = new TGauge();
        filterPersLabel1.Value = 35;
        filterPersLabel1.Appearance.Width = gaugeSize;
        filterPersLabel1.Appearance.Height = gaugeSize;

        const label2: TLabel = new TLabel();
        label2.Text = '100% of cases';
        label2.Appearance.Width = '45px';
        label2.Appearance.LineHeight = '10px';

        const filterPersLabel2 = new TGauge();
        filterPersLabel2.Value = 50;
        filterPersLabel2.Appearance.Width = gaugeSize;
        filterPersLabel2.Appearance.Height = gaugeSize;

        const label3: TLabel = new TLabel();
        label3.Text = '100% of cases';
        label3.Appearance.Width = '45px';
        label3.Appearance.LineHeight = '10px';

        this.filterRow.Controls.Add(filterPersLabel);
        this.filterRow.Controls.Add(labelContainer1);
        /*     this.filterRow.Controls.Add(filterPersLabel1);
            this.filterRow.Controls.Add(label2);
            this.filterRow.Controls.Add(filterPersLabel2);
            this.filterRow.Controls.Add(label3); */

        //#region Filter Icon
        const filterIconContainer = new TFlexContainer();
        filterIconContainer.Appearance.FlexDirection = 'column';
        filterIconContainer.Appearance.JustifyContent = 'center';
        filterIconContainer.Appearance.AlignItems = 'center';
        filterIconContainer.Appearance.PaddingLeft = '5px';

        const filterIcon = new FontIcon();
        filterIcon.FontFamily = 'TuvalProcetraIcons';
        filterIcon.Content = '\\f121';
        filterIcon.Size = 20;
        filterIcon.Color = CGColor.FromRgba(0x99, 0x99, 0x99);
        filterIconContainer.Controls.Add(filterIcon);

        const filterBadge = new TLabel();
        filterBadge.Text = '2';
        filterBadge.Appearance.BackgroundColor = '#27B764';
        filterBadge.Appearance.Width = '12px';
        filterBadge.Appearance.Height = '12px';
        filterBadge.Appearance.Display = 'flex';
        filterBadge.Appearance.AlignItems = 'center';
        filterBadge.Appearance.JustifyContent = 'center';
        filterBadge.Appearance.BorderRadius = '5px';
        filterBadge.Appearance.Color = 'white';
        filterBadge.Appearance.FontWeight = '700';
        filterBadge.Appearance.Padding = '5px';

        filterIconContainer.Controls.Add(filterBadge);

        //#endregion


        this.filterRow.Controls.Add(filterIconContainer);
    }

    private setupInfo() {
        this.infoRow = new TFlexContainer();
        this.infoRow.Appearance.AlignItems = 'center';
        this.infoRow.Appearance.MarginTop = '10px';
        this.infoRow.Appearance.LineHeight = '18px';
        this.infoRow.Appearance.Height = '35px';

        const caseIcon = new FontIcon();
        caseIcon.FontFamily = 'TuvalProcetraIcons';
        caseIcon.Content = '\\f033';
        caseIcon.Color = CGColor.FromRgba(0x99, 0x99, 0x99);
        caseIcon.Size = 14;
        this.infoRow.Controls.Add(caseIcon);

        const activityIcon = new FontIcon();
        activityIcon.Appearance.MarginLeft = '5px';
        activityIcon.FontFamily = 'TuvalProcetraIcons';
        activityIcon.Content = '\\f142';
        activityIcon.Color = CGColor.FromRgba(0x99, 0x99, 0x99);
        activityIcon.Size = 14;
        this.infoRow.Controls.Add(activityIcon);
    }

    private setupStatisticRow() {
        this.statisticRow = new TFlexContainer();
        this.statisticRow.Appearance.FlexGrow = '1';
        this.statisticRow.Appearance.AlignItems = 'end';
        this.statisticRow.Appearance.MarginTop = '10px';

        this.traceCountLabel = new TLabel();
        this.traceCountLabel.Appearance.Color = '#6c757d';
        this.traceCountLabel.Appearance.FontWeight = '700';
        this.traceCountLabel.Appearance.FontSize = '12px';
        this.traceCountLabel.Appearance.FontFamily = 'Roboto';
        this.traceCountLabel.Text = `TRACES:`;

        this.traceCountValueLabel = new TLabel();
        this.traceCountValueLabel.Appearance.MarginLeft = '5px';
        this.traceCountValueLabel.Appearance.Color = '#2ca3c0';
        this.traceCountValueLabel.Appearance.FontWeight = '700';
        this.traceCountValueLabel.Appearance.FontSize = '14px';
        this.traceCountValueLabel.Appearance.FontFamily = 'Roboto';


        this.eventCountLabel = new TLabel();
        this.eventCountLabel.Appearance.MarginLeft = '15px';
        this.eventCountLabel.Appearance.Color = '#6c757d';
        this.eventCountLabel.Appearance.FontWeight = '700';
        this.eventCountLabel.Appearance.FontSize = '12px';
        this.eventCountLabel.Appearance.FontFamily = 'Roboto';
        this.eventCountLabel.Text = `EVENTS:`;

        this.eventCountValueLabel = new TLabel();
        this.eventCountValueLabel.Appearance.MarginLeft = '5px';
        this.eventCountValueLabel.Appearance.Color = '#2ca3c0';
        this.eventCountValueLabel.Appearance.FontWeight = '700';
        this.eventCountValueLabel.Appearance.FontSize = '14px';
        this.eventCountValueLabel.Appearance.FontFamily = 'Roboto';


        /*   this.statisticRow.Controls.Add(this.traceCountLabel);
          this.statisticRow.Controls.Add(this.traceCountValueLabel); */
        /*    this.statisticRow.Controls.Add(this.eventCountLabel);
           this.statisticRow.Controls.Add(this.eventCountValueLabel); */
    }

    protected OnGotSelection(): void {
        this.Appearance.BackgroundColor = '#f9f9f9'; //this.SelectedItemColor;
        this.Appearance.BoxShadow = 'inset 4px 0 0 0 #14a9d5';
    }

    protected OnLostSelection(): void {
        this.Appearance.BackgroundColor = this.Parent.ItemColor;
        this.Appearance.BoxShadow = '';
    }
    public override OnLoaded() {
      /*   this.traceCountValueLabel.Text = `${this.dataset.EventLog.traces.length}`;
        this.eventCountValueLabel.Text = `${GeneralLogStatistics.numEvents(this.dataset.EventLog)}`; */
    }

}
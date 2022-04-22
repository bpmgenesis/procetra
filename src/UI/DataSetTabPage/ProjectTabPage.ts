import { CGColor } from '@tuval/cg';
import { eBADatasetConnectorDialog } from './../Dialogs/ConnectorDialog/eBA/eBADatasetConnectorDialog';
import { ActivityDialog } from '../Dialogs/ActivityDialog/ActivityDialog';
import { TTabPage, GridColumn, ComboBox, LayoutPanel, ListMenu, TTabControl, Padding, PaddingApplies, VerticalLayout, BottomMenu, Dialog, FileUpload, ListMenuItem, ListMenuItemBase, FontIcon, TVirtualContainer, TLabel, TFlexContainer, TFlexColumnContainer } from '@tuval/forms';
import { GridView } from '@tuval/components/grids';
import { CsvImporter } from '../../Logic/objects/log/importer/csv/importer';
import { foreach, int, is, TStorage, Encoding, Convert, TString, HttpClient, Guid } from '@tuval/core';
import { XesImporter } from '../../Logic/objects/log/importer/xes/importer';
import { EventLog } from '../../Logic/objects/log/EventLog';
import { CsvExporter } from '../../Logic/objects/log/exporter/csv/exporter';
import { Resources } from '../../Resources/Resources';
import { EventBus } from '@tuval/core';
import { DatasetSettingDialog } from './DatasetSettingDialog';
import { IProject } from '../../Bussiness/IProject';
import { CvsToJson } from '../../Logic/utils/csv2json';
import { DataSetsBottomMenu } from './DataSetsBottomMenu';
import { DataSetTabPage } from './DataSetTabPage';
import { CSVImportDialog } from '../Dialogs/CSVImportDialog';
import { ExcelImportDialog } from '../Dialogs/ExcelImportDialog';
import { FilterDialog } from '../Dialogs/FilterDialog';
import { Tokens } from '../../Bussiness/Tokens';
import { ProcessMining } from '../../Application';
import { OpenProjectDialog } from '../Dialogs/OpenProjectDialog';
import { Services } from '../../Services/Services';
import { DataSet } from '../../Bussiness/DataSet';
import { IDataSet } from '../../Bussiness/IDataSet';
import { ConfigDialog } from '../Dialogs/ConfigDialog';
import { IActivityInfo } from '../../../dist_types/types/Bussiness/IActivityInfo';
import { ComparisonTabPage } from '../ComparisonTabPage/ComparisonTabPage';
import { ConnectorDialog } from '../Dialogs/ConnectorDialog/ConnectorDialog';
import { DPFlowDialog } from '../Dialogs/DPFlowDialog/DPFlowDialog';
import { json2CSV } from '../../Logic/utils/json2csv';
import { detectSeparator } from '../../Services/LocalProjectService';
import { GeneralLogStatistics } from '../../Logic/statistics/log/general';
import { TGauge } from '../Components/TGauge/TGauge';
import { EventDatasetMenuItem } from '../Components/ProjectItemsListMenu/ProjectItemsListMenuItem/EventDatasetMenuItem';

export class ProjectTabPage extends TTabPage {
    public project: IProject;
    private listMenu: ListMenu;
    private datasetSettingsDialog: DatasetSettingDialog;
    private bottomMenu: DataSetsBottomMenu;
    private csvSelectFile: FileUpload;
    private xesSelectFile: FileUpload;
    private excelSelectFile: FileUpload;
    private tabControl: TTabControl;
    private csvImportDialog: CSVImportDialog;

    private connectorDialog: ConnectorDialog;

    private excelImportDialog: ExcelImportDialog;
    private filterDialog: FilterDialog;
    private costDialog: ConfigDialog;
    private openProjectDialog: OpenProjectDialog;
    DPFlowDialog: DPFlowDialog;
    eBAConnectionDialog: eBADatasetConnectorDialog;
    private InitNanVisualComponents() {
        this.csvImportDialog = new CSVImportDialog();

        //this.Controls.Add(this.csvImportDialog);

        this.connectorDialog = new ConnectorDialog();
        // this.Controls.Add(this.connectorDialog);

        this.filterDialog = new FilterDialog();
        this.Controls.Add(this.filterDialog);

        this.costDialog = new ConfigDialog();
        this.Controls.Add(this.costDialog);

        this.excelImportDialog = new ExcelImportDialog();
        this.Controls.Add(this.excelImportDialog);

        this.csvSelectFile = new FileUpload();
        this.csvSelectFile.AllowedExtensions = '.csv,.txt';
        this.Controls.Add(this.csvSelectFile);


        this.xesSelectFile = new FileUpload();
        this.xesSelectFile.AllowedExtensions = '.xes';
        this.Controls.Add(this.xesSelectFile);

        this.excelSelectFile = new FileUpload();
        this.excelSelectFile.AllowedExtensions = '.xls,.xlsx';
        this.Controls.Add(this.excelSelectFile);

        this.DPFlowDialog = new DPFlowDialog();
        this.Controls.Add(this.DPFlowDialog);

        this.eBAConnectionDialog = new eBADatasetConnectorDialog();
        this.Controls.Add(this.eBAConnectionDialog);
    }

    //private fielsCombo: ComboBox;
    public override InitComponents() {
        this.InitNanVisualComponents();
        const layoutPanel = new LayoutPanel();
        this.Controls.Add(layoutPanel);
        // layoutPanel.Padding = new Padding(0, 10, 0, 0, PaddingApplies.Top);
        this.datasetSettingsDialog = new DatasetSettingDialog();
        this.Controls.Add(this.datasetSettingsDialog);

        const verticalLayout = new VerticalLayout();
        this.listMenu = new ListMenu();
        this.listMenu.HeaderText = 'Data sets';
        this.listMenu.ItemHeight = 50;
        this.listMenu.Appearance.Width = '250px';
        this.listMenu.Appearance.Height = `417px`;

        this.listMenu.BackgroundColor = '#E6E6E6';
        this.listMenu.ItemColor = '#FFFFFF';
        this.listMenu.SelectedItemColor = '#4071BB';
        this.listMenu.ItemBorder.AddBottomBorder('#DCDCDC');

        const caption = new TLabel();
        caption.Text = 'Project Items';
        caption.Appearance.Color = 'gray';
        caption.Appearance.Display = 'flex';
        caption.Appearance.AlignItems = 'center';
        caption.Appearance.JustifyContent = 'center';
        caption.Appearance.LineHeight = '20px';
        caption.Appearance.BackgroundImage = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAWCAYAAADq8U2pAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTZEaa/1AAAAUUlEQVQYV6XGwQlEIRBEwc4/nsnnKyoqKprBWzqGPRSU3nvYv7n3YjrnYNp7Y1prYZpzYhpjYOq9Y2qtYaq1YiqlYMo5Y0opYfq+D1NEEBH8ADoQo1dxAmQ+AAAAAElFTkSuQmCC')";

        this.listMenu.Controls.Add(caption);

        this.listMenu.SelectedIndexChanged = ((index) => {
            const selectedItem = this.listMenu.Items.Get(index);
            if (selectedItem.Tag) {

                Services.StateService.SetCurrentDataset(selectedItem.Tag.ProjectId, selectedItem.Tag.Id);

                if (selectedItem.Tag.ParentDataSetId) {
                    this.bottomMenu.btnCloneDataset.Disabled = true;
                    this.bottomMenu.btnFilterDataset.Disabled = false;
                } else {
                    this.bottomMenu.btnCloneDataset.Disabled = false;
                    this.bottomMenu.btnFilterDataset.Disabled = true;
                }
            }
        }) as any;

        this.listMenu.DragStart.add((event: any) => {
            const { item, dragEvent } = event;

            if (item.Tag) {
                dragEvent.dataTransfer.setData('text', item.Tag.ProjectId + ';' + item.Tag.Id);
            }
        });


        verticalLayout.Controls.Add(this.listMenu);

        this.bottomMenu = new DataSetsBottomMenu();
        this.bottomMenu.AddConnector.add(this.OnAddConnector.bind(this));
        this.bottomMenu.CsvFileSelect.add(this.OnCsvFileSelect.bind(this));
        this.bottomMenu.XesFileSelect.add(this.OnXesFileSelect.bind(this));
        this.bottomMenu.ExcelFileSelect.add(this.OnExcelFileSelect.bind(this));
        this.bottomMenu.AddComparison.add(this.OnAddComparison.bind(this));
        this.bottomMenu.CloneDataSet.add(this.OnCloneDataSet.bind(this));
        this.bottomMenu.FilterDataSet.add(this.OnFilterDataset.bind(this));
        this.bottomMenu.ConfigDataSet.add(this.OnConfigDataset.bind(this));

        this.connectorDialog.Selected.add(this.OnCsvFileSelect.bind(this));
        this.connectorDialog.XlsxSelected.add(this.OnExcelFileSelect.bind(this));

        this.connectorDialog.DPFSelected.add(this.OnDPFSelected.bind(this));

        this.connectorDialog.eBASelected.add(this.OneBASelected.bind(this));

        verticalLayout.Controls.Add(this.bottomMenu);

        layoutPanel.LeftControl = verticalLayout;
        layoutPanel.LeftSize = 250;


        this.tabControl = new TTabControl();
        this.tabControl.ShowHeader = false;
        layoutPanel.RightControl = this.tabControl;


        this.tabControl.ActiveIndex$ = this.listMenu.SelectedIndex$;

        /* this.Parent$.subscribe(() => {
            const form = this.GetForm();
            if (form != null) {
                console.log(form.ContentHeight);
                this.listMenu.Height = form.ContentHeight - 251;
            }
        }); */

        setTimeout(() => this.SendResizeRequest(), 100);

    }

    public Save(): void {
        Services.ProjectService.SaveProject(this.project.Id).then(e => {
            EventBus.Default.fire('tuval.desktop.toast',
                {
                    severity: 'info',
                    summary: this.project.Name,
                    detail: TString.Format('{0} succesfully saved.',
                        this.project.Name), life: 3000
                });
        });
    }

    public AddCvs(str: string) {
        const data = [];
        const array = CsvImporter.parseCSV(str);
        const columns = array[0];

        //this.grid.Columns.Clear();
        //  this.fielsCombo.Items.Clear();
        foreach(columns, (colName: string) => {
            const col = new GridColumn(colName, colName);
            //this.grid.Columns.Add(col);
            // this.fielsCombo.Items.Add(col.Header);
        });

        for (let i = 1; i < array.length; i++) {
            const row = {};
            for (let k = 0; k < array[i].length; k++) {
                row[array[0][k]] = array[i][k];
            }
            data.push(row);
        }
        // this.grid.DataSource = data;
    }
    public AddXes(str: string) {
        const log: EventLog = XesImporter.apply(str);
        str = CsvExporter.apply(log);
        const data = [];
        const array = CsvImporter.parseCSV(str);
        const columns = array[0];

        //this.grid.Columns.Clear();
        //this.fielsCombo.Items.Clear();
        foreach(columns, (colName: string) => {
            const col = new GridColumn(colName, colName);
            //this.grid.Columns.Add(col);
            // this.fielsCombo.Items.Add(col.Header);
        });

        for (let i = 1; i < array.length; i++) {
            const row = {};
            for (let k = 0; k < array[i].length; k++) {
                row[array[0][k]] = array[i][k];
            }
            data.push(row);
        }
        //this.grid.DataSource = data;
    }

    private setProject(project: IProject) {
        this.project = project;
        this.Text = project.Name;

    }

    public static Create(project: IProject): ProjectTabPage {
        const tab = new ProjectTabPage();
        tab.setProject(project);

        foreach(project.DataSets, (dataset) => {
            const item = new EventDatasetMenuItem(dataset);
            item.Text = dataset.Name;
            tab.listMenu.Items.Add(item);
            item.Tag = dataset;
            //this.grid.DataSource = dataset.Data;
            tab.listMenu.SelectedIndex = tab.listMenu.Items.Count - 1;

            const datasetTabPage = new DataSetTabPage();
            tab.tabControl.TabPages.Add(datasetTabPage);
            datasetTabPage.SetDataSet(dataset);
        });


        return tab;
    }

    public static CreateWithCsv(project: IProject): ProjectTabPage {
        const tab = new ProjectTabPage();
        tab.setProject(project);

        return tab;
    }

    public static CreateWithXes(project: IProject): ProjectTabPage {
        const tab = new ProjectTabPage();
        tab.setProject(project);
        setTimeout(() => tab.OnXesFileSelect(), 500);
        return tab;
    }

    public static CreateWithXlsx(project: IProject): ProjectTabPage {
        const tab = new ProjectTabPage();
        tab.setProject(project);
        setTimeout(() => tab.OnExcelFileSelect(), 500);
        return tab;
    }
    private OnListMenuSelectedIndexChanged() {
        if (this.listMenu.SelectedIndex > -1) {
            //this.grid.DataSource = this.listMenu.Items.Get(this.listMenu.SelectedIndex).Tag.Data;
        }
    }

    public AddFromCsv(name: string, csv: string, caseName: string, activityName: string, timestampName: string, startDateName: string) {
        Services.ProjectService.DataSetFromCvs(this.project.Id, Guid.NewGuid().ToString(), name, csv,
            caseName,
            activityName,
            timestampName,
            startDateName,
            null).then(dataset => {
                this.Text = name;
                const item = new EventDatasetMenuItem(dataset);
                item.Text = dataset.Name;
                this.listMenu.Items.Add(item);
                item.Tag = dataset;
                //this.grid.DataSource = dataset.Data;
                this.listMenu.SelectedIndex = this.listMenu.Items.Count - 1;

                const datasetTabPage = new DataSetTabPage();
                this.tabControl.TabPages.Add(datasetTabPage);
                datasetTabPage.SetDataSet(dataset);
            });
    }

    public OnAddConnector() {
        this.connectorDialog.ShowDialog();
    }

    public OnCsvFileSelect(setFileNameAsProjectName: boolean = false) {
        this.csvSelectFile.FileReady = ((file) => {
            setTimeout(() => { this.connectorDialog.Hide(); }, 10);
            const csv = this.csvSelectFile.GetFileContentAsString();

            this.csvImportDialog.SetCsvData(csv);
            this.csvImportDialog.OkButtonClicked = (log_id: string, csv: string,
                caseName: string, activityName: string, timestampName: string, startDateName: string) => {

                /* ProcessMining.RecentlyUploadedFilesStorage.SaveString(this.csvSelectFile.SelectedFileName + '.' + this.csvSelectFile.SelectedFileExt, JSON.stringify({
                    uploadeddate: new Date().getTime(),
                    caseName: caseName,
                    activityName: activityName,
                    timestampName: timestampName,
                    startDateName: startDateName,
                    rowsCount: csv.split('\n').length,
                    csv: Convert.ToBase64String(Encoding.UTF8.GetBytes(csv))
                })); */

                Services.ProjectService.DataSetFromCvs(this.project.Id, log_id, this.csvSelectFile.SelectedFileName, csv,
                    caseName,
                    activityName,
                    timestampName,
                    startDateName, null).then(dataset => {

                        Services.StateService.SetCurrentDataset(dataset.ProjectId, dataset.Id);

                        if (setFileNameAsProjectName) {
                            this.project.Name = this.csvSelectFile.SelectedFileName;
                            this.Text = this.csvSelectFile.SelectedFileName;
                        }
                        const item = new EventDatasetMenuItem(dataset);
                        item.Text = dataset.Name;
                        this.listMenu.Items.Add(item);
                        item.Tag = dataset;
                        //this.grid.DataSource = dataset.Data;
                        this.listMenu.SelectedIndex = this.listMenu.Items.Count - 1;

                        const datasetTabPage = new DataSetTabPage();
                        this.tabControl.TabPages.Add(datasetTabPage);
                        datasetTabPage.SetDataSet(dataset);
                    });
            }


            this.csvImportDialog.ShowDialog();
        }) as any;

        this.csvSelectFile.SelectFile();
    }

    public OnDPFSelected(setFileNameAsProjectName: boolean = false) {
        this.DPFlowDialog.OnOKClick.add((csv) => {
            //alert(csv);
            this.csvImportDialog.SetCsvData(csv);
            this.csvImportDialog.OkButtonClicked = (csv: string, caseName: string, activityName: string, timestampName: string, startDateName: string) => {

                ProcessMining.RecentlyUploadedFilesStorage.SaveString(this.csvSelectFile.SelectedFileName + '.' + this.csvSelectFile.SelectedFileExt, JSON.stringify({
                    uploadeddate: new Date().getTime(),
                    caseName: caseName,
                    activityName: activityName,
                    timestampName: timestampName,
                    startDateName: startDateName,
                    rowsCount: csv.split('\n').length,
                    csv: Convert.ToBase64String(Encoding.UTF8.GetBytes(csv))
                }));

                Services.ProjectService.DataSetFromCvs(this.project.Id, Guid.NewGuid().ToString(), this.csvSelectFile.SelectedFileName, csv,
                    caseName,
                    activityName,
                    timestampName,
                    startDateName, null).then(dataset => {

                        Services.StateService.SetCurrentDataset(dataset.ProjectId, dataset.Id);

                        if (setFileNameAsProjectName) {
                            this.project.Name = this.csvSelectFile.SelectedFileName;
                            this.Text = this.csvSelectFile.SelectedFileName;
                        }
                        const item = new EventDatasetMenuItem(dataset);
                        item.Text = dataset.Name;
                        this.listMenu.Items.Add(item);
                        item.Tag = dataset;
                        //this.grid.DataSource = dataset.Data;
                        this.listMenu.SelectedIndex = this.listMenu.Items.Count - 1;

                        const datasetTabPage = new DataSetTabPage();
                        this.tabControl.TabPages.Add(datasetTabPage);
                        datasetTabPage.SetDataSet(dataset);
                    });
                this.DPFlowDialog.Hide();
                this.connectorDialog.Hide();
            }
            this.csvImportDialog.ShowDialog();
        });
        this.DPFlowDialog.ShowDialog();
    }

    public OneBASelected(setFileNameAsProjectName: boolean = false) {
        this.eBAConnectionDialog.OkButtonClicked.add((_data: any) => {
            const { data, name } = _data;
            const csv = json2CSV(data);
            // alert(csv);
            this.csvImportDialog.SetCsvData(csv);
            this.csvImportDialog.OkButtonClicked = (log_id: string, csv: string, caseName: string, activityName: string, timestampName: string, startDateName: string) => {

                ProcessMining.RecentlyUploadedFilesStorage.SaveString(this.csvSelectFile.SelectedFileName + '.' + this.csvSelectFile.SelectedFileExt, JSON.stringify({
                    uploadeddate: new Date().getTime(),
                    caseName: caseName,
                    activityName: activityName,
                    timestampName: timestampName,
                    startDateName: startDateName,
                    rowsCount: csv.split('\n').length,
                    csv: Convert.ToBase64String(Encoding.UTF8.GetBytes(csv))
                }));

                Services.ProjectService.DataSetFromCvs(this.project.Id, log_id, name, csv,
                    caseName,
                    activityName,
                    timestampName,
                    startDateName, null).then(dataset => {

                        Services.StateService.SetCurrentDataset(dataset.ProjectId, dataset.Id);

                        if (setFileNameAsProjectName) {
                            this.project.Name = this.csvSelectFile.SelectedFileName;
                            this.Text = this.csvSelectFile.SelectedFileName;
                        }
                        const item = new EventDatasetMenuItem(dataset);
                        item.Text = dataset.Name;
                        this.listMenu.Items.Add(item);
                        item.Tag = dataset;
                        //this.grid.DataSource = dataset.Data;
                        this.listMenu.SelectedIndex = this.listMenu.Items.Count - 1;

                        const datasetTabPage = new DataSetTabPage();
                        this.tabControl.TabPages.Add(datasetTabPage);
                        datasetTabPage.SetDataSet(dataset);
                    });
                this.eBAConnectionDialog.Hide();
                this.connectorDialog.Hide();
            }
            this.csvImportDialog.ShowDialog();
        });
        this.eBAConnectionDialog.ShowDialog();
    }


    private OnXesFileSelect() {
        this.xesSelectFile.FileReady = (() => {
            const csv = this.xesSelectFile.GetFileContentAsString();
            Services.ProjectService.DataSetFromXes(this.project.Id, this.xesSelectFile.SelectedFileName, csv).then(dataset => {
                const item = new EventDatasetMenuItem(dataset);
                item.Text = dataset.Name;
                this.listMenu.Items.Add(item);
                item.Tag = dataset;
                //this.grid.DataSource = dataset.Data;
                this.listMenu.SelectedIndex = this.listMenu.Items.Count - 1;

                const datasetTabPage = new DataSetTabPage();
                this.tabControl.TabPages.Add(datasetTabPage);
                datasetTabPage.SetDataSet(dataset);
            });
        }) as any;

        this.xesSelectFile.SelectFile();
    }
    private OnExcelFileSelect() {
        this.excelSelectFile.FileReady = ((file) => {
            const excel = this.excelSelectFile.GetFileContentAsByteArray();
            this.excelImportDialog.SetExcelData(excel, file);
            this.excelImportDialog.OkButtonClicked = (log_id: string, csv: string, caseName: string, activityName: string, timestampName: string, startDateName: string) => {
                Services.ProjectService.DataSetFromCvs(this.project.Id, log_id, this.excelSelectFile.SelectedFileName, csv,
                    caseName,
                    activityName,
                    timestampName,
                    startDateName, null).then(dataset => {
                        const item = new EventDatasetMenuItem(dataset);
                        item.Text = dataset.Name;
                        this.listMenu.Items.Add(item);
                        item.Tag = dataset;
                        //this.grid.DataSource = dataset.Data;
                        this.listMenu.SelectedIndex = this.listMenu.Items.Count - 1;

                        const datasetTabPage = new DataSetTabPage();
                        this.tabControl.TabPages.Add(datasetTabPage);
                        datasetTabPage.SetDataSet(dataset);
                    });
                this.excelImportDialog.Hide();
                this.connectorDialog.Hide();
            }
            this.excelImportDialog.ShowDialog();
        }) as any;
        this.excelSelectFile.SelectFile();
    }

    private OnAddComparison() {
        const item = new EventDatasetMenuItem(null);
        item.Text = 'Comparison';
        this.listMenu.Items.Add(item);
        this.listMenu.SelectedIndex = this.listMenu.Items.Count - 1;
        const comparisonTabPage = new ComparisonTabPage();
        this.tabControl.TabPages.Add(comparisonTabPage);
    }
    private OnCloneDataSet() {
        if (this.listMenu.SelectedIndex > -1) {
            const item = this.listMenu.Items.Get(this.listMenu.SelectedIndex);
            if (item != null && item.Tag) {
                const dataset: DataSet = item.Tag;
                Services.ProjectService.CloneDataSet(this.project.Id, dataset.Id).then(newDataset => {
                    const new_item: any = this.listMenu.Items.Add(newDataset.Name/* , Resources.Icons.DataSetIcon, Resources.Icons.DataSetSelectedIcon */);
                    new_item.Tag = newDataset;
                    this.listMenu.SelectedIndex = this.listMenu.Items.Count - 1;
                    const datasetTabPage = new DataSetTabPage();
                    this.tabControl.TabPages.Add(datasetTabPage);
                    datasetTabPage.SetDataSet(newDataset);
                });


            }
        }
    }
    private OnFilterDataset() {
        if (this.listMenu.SelectedIndex > -1) {
            const item = this.listMenu.Items.Get(this.listMenu.SelectedIndex);
            if (item != null && item.Tag) {
                const dataset: IDataSet = item.Tag;
                this.filterDialog.SetDataset(this.project, dataset);
                this.filterDialog.OkButtonClicked = (filteredDataset: IDataSet) => {
                    if (this.tabControl.ActiveTabPage) {
                        const datasetTabPage: DataSetTabPage = this.tabControl.ActiveTabPage as DataSetTabPage;
                        datasetTabPage.SetDataSet(filteredDataset);
                    }
                };
                this.filterDialog.ShowDialog();
            }
        }
    }
    private OnConfigDataset() {
        if (this.listMenu.SelectedIndex > -1) {
            const item = this.listMenu.Items.Get(this.listMenu.SelectedIndex);
            if (item != null && item.Tag) {
                const dataset: IDataSet = item.Tag;
                this.costDialog.SetDataset(this.project.Id, dataset.Id);
                this.costDialog.OkButtonClicked = (activityInfos: IActivityInfo[]) => {
                    //alert(JSON.stringify(activityInfos));
                    Services.ProjectService.SetActivityInfo(dataset.ProjectId, dataset.Id, activityInfos).then(result => alert(result));;
                    /* if (this.tabControl.ActiveTabPage) {
                        const datasetTabPage: DataSetTabPage = this.tabControl.ActiveTabPage as DataSetTabPage;
                        datasetTabPage.SetDataSet(filteredDataset);
                    } */
                };
                this.costDialog.ShowDialog();
            }
        }
    }

    public override OnFormResized(w: int, h: int) {
        super.OnFormResized(w, h);

        this.listMenu.Appearance.Height = `${h - 220}px`;
        console.log('ListMenu height', this.listMenu.Appearance.Height);
    }
}
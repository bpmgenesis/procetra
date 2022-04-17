import { eBADatasetConnectorDialog } from './eBA/eBADatasetConnectorDialog';
import { AppAndServicesTabPage } from './AppAndServicesTabPage';
import { MSSQLConnectionDialog } from './MSSQL/MSSQLConnectionDialog';
import { ProductConnectorTabPage } from './ProductConnectorTabPage';
import { Event, Convert } from '@tuval/core';
import { Button, Dialog, FormLayout, RadioButtonGroup, TTabControl, TTextBox, LayoutPanel, ListMenu } from '@tuval/forms';
import { Services } from '../../../Services/Services';
import { CostTypes, IActivityInfo } from '../../../Bussiness/IActivityInfo';
import { ConnectorTabPage } from './ConnectorTabPage';
import { FileConnectorTabPage } from './FileConnectorTabPage';
import { MarketingConnectorTabPage } from './MarketingConnectorTabPage';
import { SalesConnectorTabPage } from './SalesConnectorTabPage';
import { OperationsConnectorTabPage } from './OperationsConnectorTabPage';
import { MYSQLConnectorDialog } from './MYSQL/MYSQLConnectionDialog';
import { PostgreConnectionDialog } from './PostgreSQL/PostgreSQLConnectionDialog';
import { OracleConnectionDialog } from './ORACLE/OracleConnectionDialog';
import { MONGODBConnectionDialog } from './MONGODB/MONGODBConnectionDialog';
import { DPFlowDialog } from '../DPFlowDialog/DPFlowDialog';
import { ConnectorDialogController } from './ConnectorDialogController';

export class ConnectorDialog extends Dialog {
    public OkButtonClicked: any = new Event();
    private activityInfo: IActivityInfo;
    public Selected: Event<any>;
    public XlsxSelected: Event<any>;
    public DPFSelected: Event<any>;
    public eBASelected: Event<any>;

    private eBAConnectorDialog: eBADatasetConnectorDialog;
    private MSSQLConnectorDialog: MSSQLConnectionDialog;
    private MYSQLConnectorDialog: MYSQLConnectorDialog;
    PostgreConnectionDialog: PostgreConnectionDialog;
    OracleConnectionDialog: OracleConnectionDialog;
    MONGODBConnectionDialog: MONGODBConnectionDialog;
    // DPFlowDialog: DPFlowDialog;
    private InitNonVisualComponent() {

        this.eBAConnectorDialog = new eBADatasetConnectorDialog();
        this.Controls.Add(this.eBAConnectorDialog);

        this.MSSQLConnectorDialog = new MSSQLConnectionDialog();
        this.Controls.Add(this.MSSQLConnectorDialog);

        this.MYSQLConnectorDialog = new MYSQLConnectorDialog();
        this.Controls.Add(this.MYSQLConnectorDialog);

        this.PostgreConnectionDialog = new PostgreConnectionDialog();
        this.Controls.Add(this.PostgreConnectionDialog);

        this.OracleConnectionDialog = new OracleConnectionDialog();
        this.Controls.Add(this.OracleConnectionDialog);

        this.MONGODBConnectionDialog = new MONGODBConnectionDialog();
        this.Controls.Add(this.MONGODBConnectionDialog);

        // this.DPFlowDialog = new DPFlowDialog();
        // this.Controls.Add(this.DPFlowDialog);
    }
    public override InitComponents() {
        //this.InitNonVisualComponent();
        this.Text = 'Select Item';
        this.Width = 1000;
        this.Height = 700;

        const controller = new ConnectorDialogController();
        controller.Bind(this);
        this.Controls.Add(controller);

      /*   this.Selected = new Event();
        this.XlsxSelected = new Event();
        this.DPFSelected = new Event();
        this.eBASelected = new Event();

        const layoutPanel = new LayoutPanel();
        layoutPanel.LeftSize = 200;

        const listMenu = new ListMenu();
        listMenu.Items.Add('Mining');

        layoutPanel.LeftControl = listMenu;

        const tabControl = new TTabControl();
        const databaseTabPage = new ConnectorTabPage();
        databaseTabPage.Text = 'Database';
        databaseTabPage.MSSQLConnectorSelected.add(() => {
            this.MSSQLConnectorDialog.ShowDialog();
        });

        databaseTabPage.MYSQLConnectorSelected.add(() => {
            this.MYSQLConnectorDialog.ShowDialog();
        });

        databaseTabPage.PostgreSQLConnectorSelected.add(() => {
            this.PostgreConnectionDialog.ShowDialog();
        });

         databaseTabPage.OracleConnectorSelected.add(() => {
            this.OracleConnectionDialog.ShowDialog();
        });

        databaseTabPage.MONGODBConnectorSelected.add(() => {
            this.MONGODBConnectionDialog.ShowDialog();
        });

        tabControl.TabPages.Add(databaseTabPage);

        const filesTabPage = new FileConnectorTabPage();
        filesTabPage.Text = 'Files';
        filesTabPage.CsvFileClick.add(() => this.Selected());
        filesTabPage.XlsxFileClick.add(() => this.XlsxSelected());
        tabControl.TabPages.Add(filesTabPage);

        const marketingTabPage = new MarketingConnectorTabPage();
        marketingTabPage.Text = 'Marketing';
        marketingTabPage.CsvFileClick.add(() => this.Selected());
        tabControl.TabPages.Add(marketingTabPage);

        const operationsTabPage = new OperationsConnectorTabPage();
        operationsTabPage.Text = 'Operations';
        operationsTabPage.CsvFileClick.add(() => this.Selected());
        tabControl.TabPages.Add(operationsTabPage);

        const productTabPage = new ProductConnectorTabPage();
        productTabPage.Text = 'Product';
        productTabPage.CsvFileClick.add(() => this.Selected());
        productTabPage.eBAConnectorSelected.add(() => this.eBASelected());
        tabControl.TabPages.Add(productTabPage);

        const salesTabPage = new SalesConnectorTabPage();
        salesTabPage.Text = 'Sales';
        salesTabPage.CsvFileClick.add(() => this.Selected());
        tabControl.TabPages.Add(salesTabPage);

        const appAndServicesTabPage = new AppAndServicesTabPage();
        appAndServicesTabPage.Text = 'BI and Analytics';
        appAndServicesTabPage.DPFSelected.add(() => this.DPFSelected());

        tabControl.TabPages.Add(appAndServicesTabPage);

        layoutPanel.RightControl = tabControl;
        this.Controls.Add(layoutPanel); */

       /*  const btnOK = new Button();
        btnOK.Text = 'OK';
        btnOK.Color = 2;
        btnOK.Clicked = (() => {
            this.OnOKClick();

        }) as any;

        const btnCancel = new Button();
        btnCancel.Text = 'Cancel';
        btnCancel.Color = 1;
        btnCancel.Clicked = (() => {

            this.Hide();
        }) as any;

        this.FooterControls.AddRange([btnOK, btnCancel]); */
    }

    private clearForm() {
        /*  this.costTabPage.chkFixedCost.Checked = false;
         this.costTabPage.chkAmount.Checked = false;
         this.costTabPage.txtAmount.Text = ''; */
    }
    public SetActivityInfo(activityInfo: IActivityInfo) {
        this.clearForm();
        this.activityInfo = activityInfo;
        // this.costTabPage.SetActivityInfo(activityInfo);
    }
    private OnOKClick() {

        this.OkButtonClicked();
        this.Hide();
    }

}
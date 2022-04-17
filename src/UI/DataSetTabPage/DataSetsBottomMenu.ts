import { BottomMenu, BottomMenuItem, FileUpload } from '@tuval/forms';
import { Event } from '@tuval/core';


export class DataSetsBottomMenu extends BottomMenu {
    public btnNewDataset: BottomMenuItem;
    public btnCloneDataset: BottomMenuItem;
    public btnFilterDataset: BottomMenuItem;
    public btnConfigDataset: BottomMenuItem;
    public btnDeleteDataset: BottomMenuItem;

    public CsvFileSelect: any = new Event();
    public XesFileSelect: any = new Event();
    public CloneDataSet: any = new Event();
    public FilterDataSet: any = new Event();
    public ExcelFileSelect:any = new Event();
    public AddComparison:Event<any> = new Event();

    public ConfigDataSet: any = new Event();
    public AddConnector: any = new Event();
    public override InitComponents() {

        this.btnNewDataset = this.Items.Add('pi pi-plus');
        this.btnNewDataset.OnClick = (()=> {
            this.AddConnector();
        }) as any;

       /*  this.btnNewDataset.MenuModel = [
            {
                label: 'File Import',
                items: [
                    {
                        label: 'Csv',
                        icon: 'pi pi-file',
                        command: () => {
                            this.CsvFileSelect();
                        }
                    },
                    {
                        label: 'Xes',
                        icon: 'pi pi-file',
                        command: () => {
                            this.XesFileSelect();
                        }
                    },
                    {
                        label: 'Excel',
                        icon: 'pi pi-file',
                        command: () => {
                            this.ExcelFileSelect();
                        }
                    },
                    {
                        label: 'Comparison',
                        icon: 'pi pi-file',
                        command: () => {
                            this.AddComparison();
                        }
                    }
                ]
            }
        ]; */

        this.btnCloneDataset = this.Items.Add('pi pi-clone');
        this.btnCloneDataset.OnClick = (()=> {
            this.CloneDataSet();
        }) as any;

        this.btnFilterDataset = this.Items.Add('pi pi-filter');
        this.btnFilterDataset.Disabled = true;
        this.btnFilterDataset.OnClick = (()=> {
            this.FilterDataSet();
        }) as any;

        this.btnConfigDataset = this.Items.Add('pi pi-cog');
        this.btnConfigDataset.OnClick = (()=> {
            this.ConfigDataSet();
        }) as any;

        this.btnDeleteDataset = this.Items.Add('pi pi-trash');
    }
}
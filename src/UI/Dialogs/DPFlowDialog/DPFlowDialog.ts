import { ConfigService } from './../../../Services/ConfigService';
import { CurrentActivityType } from './Activities/Activity';
import { DPFTreeView } from './DPFTreeView';
import { DPFPalette } from './DPFPalette';
import { DPFControl } from './DPFControl';
import { Dialog, Button, TTabControl, TTabPage, LayoutPanel } from '@tuval/forms';
import { HttpClient, Convert, Encoding, Event } from '@tuval/core';
import { GridView } from '@tuval/components/grids';
import { ImportCsv } from './Activities/ImportCsvActivity';
import { Start } from './Activities/Start';
import { LoadEventData } from './Activities/LoadEventData';
import { StateService } from '../../../Services/StateService';

export class DPFlowDialog extends Dialog {
    grid: GridView;
    private dpfControl: DPFControl;
    public OnOKClick: Event<any>;

    protected InitComponents(): void {
        this.Text = 'Data Preprocess Flow';
        this.Width = 1200;
        this.Height = 800;

        this.OnOKClick = new Event();
        const tab = new TTabControl();

        const tabpage1 = new TTabPage();
        tabpage1.Text = 'Flow';

        const layoutPanel = new LayoutPanel();
        layoutPanel.LeftSize = 250;


        this.dpfControl = new DPFControl();
        this.dpfControl.Activities.Add(new Start(this.dpfControl.Variables));
        //control.Activities.Add(new SelectLog(/* control.Variables */));
        //control.Activities.Add(new LoadEventData(/* control.Variables */));
        layoutPanel.RightControl = this.dpfControl;

        const dpfPalette = new DPFTreeView();
        dpfPalette.ItemDrag.add((e) => {
            //e.nativeEvent.dataTransfer.setData('text', e.node.Key);
            StateService.SetStateVariable('CurrentDraggingActivity', e.node.Key);
        });
        layoutPanel.LeftControl = dpfPalette;

        tabpage1.Controls.Add(layoutPanel);

        tab.TabPages.Add(tabpage1);


        const button1 = new Button();
        button1.Text = 'Refresh';
        button1.Clicked.add(() => {

            this.grid.RefreshColumns();
            this.grid.RefreshHeader();

        });

        this.Controls.Add(button1);

        const button = new Button();
        button.Text = 'Flow';
        this.Controls.Add(button);
        button.Clicked.add(async () => {

            const a = this.dpfControl.Serialize();
            const test3 = await HttpClient.Post(ConfigService.GetMiningBrokerUrl() +`/preprocessing/Execute`, this.dpfControl.Serialize());

            const columns = [];
            for (let col_name in test3.data.columns) {
                columns.push({ field: col_name, headerText: col_name, width: 140 });
            }

            this.grid.DataSource = JSON.parse(Encoding.UTF8.GetString(Convert.FromBase64String(test3.data.data)));
            this.grid.SetColumns(columns);
            this.grid.RefreshColumns();
            this.grid.RefreshHeader();

        });


        const tabpage2 = new TTabPage();
        tabpage2.Text = 'Data';

        this.grid = new GridView();
        this.grid.Height = 300;
        tabpage2.Controls.Add(this.grid);

        tab.TabPages.Add(tabpage2);
        this.Controls.Add(tab);

        const btnOK = new Button();
        btnOK.Text = 'OK';
        btnOK.Color = 2;
        btnOK.Clicked = (async () => {
            const test3 = await HttpClient.Post(ConfigService.GetMiningBrokerUrl() +`/preprocessing/ExecuteCsv`,
                this.dpfControl.Serialize());
            const csv = Encoding.UTF8.GetString(Convert.FromBase64String(test3.data.data));
            //alert(csv);
            this.OnOKClick(csv);

        }) as any;

        const btnCancel = new Button();
        btnCancel.Text = 'Cancel';
        btnCancel.Color = 1;
        btnCancel.Clicked = (() => {

            this.Hide();
        }) as any;

        this.FooterControls.AddRange([btnOK, btnCancel]);
    }

    public override ShowDialog() {
        this.dpfControl.Clear();
        super.ShowDialog();
    }
}
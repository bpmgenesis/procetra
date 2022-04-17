import { GridView } from '@tuval/components/grids';
import { ConfigService } from './../../../../Services/ConfigService';
import { HttpClient, Event } from '@tuval/core';
import { Dialog, ComboBox, Button } from '@tuval/forms';
import { EnsembleBrokerClient } from './EnsembleBrokerClient';
import { EnsembleProcessTreeView } from './EnsembleProcessTree';
import { EnsembleDataProviderControl } from './EnsembleDataProviderControl';

export class EnsembleDatasetProviderDialog extends Dialog {
  public OkButtonClicked: any = new Event();
    protected async InitComponents() {
        this.Width = 1200;
        this.Height = 600;

        this.Text = 'Select which Ensemble process you want to connect';

      /*   const projects = new ComboBox();
        projects.OnChanged.add(async (item) => {

        });
        this.Controls.Add(projects); */
       // const token = await EnsembleBrokerClient.Login();
       //alert(token);

       /*  const grid = new GridView();
        grid.Height = 400; */
        //this.Controls.Add(grid);

        const tree = new EnsembleDataProviderControl();
        tree.Height = 400;
        this.Controls.Add(tree);

        /* const processes: any[] = await EnsembleBrokerClient.GetProcesses(token);

        const columns = [];
        for (let col_name in processes[0]) {
            columns.push({ field: col_name, headerText: col_name, width: 140 });
        }

        tree.SetProcessData(processes); */
        //setTimeout(()=> tree.SetProcessData(processes), 2000);

      /*   grid.DataSource = processes;
        grid.SetColumns(columns);
        grid.RefreshColumns();
        grid.RefreshHeader(); */


        const btnOK = new Button();
        btnOK.Text = 'OK';
        btnOK.Color = 2;
        btnOK.Clicked = (() => {
            this.OkButtonClicked({
                name: tree.SelectedProcess.label,
                data:tree.ProcessHistory
            });
        }) as any;

        const btnCancel = new Button();
        btnCancel.Text = 'Cancel';
        btnCancel.Color = 1;
        btnCancel.Clicked = (() => {

            this.Hide();
        }) as any;

        this.FooterControls.AddRange([btnOK, btnCancel]);

    }
}
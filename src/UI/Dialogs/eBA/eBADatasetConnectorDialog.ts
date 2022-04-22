import { GridView } from '@tuval/components/grids';
import { eBABrokerClient } from './eBABrokerClient';
import { HttpClient, Event } from '@tuval/core';
import { Dialog, ComboBox, Button } from '@tuval/forms';
import { eBAProjectListControl } from './eBAProjectListControl';

export class eBADatasetConnectorDialog extends Dialog {
    eBAProjectsControl: eBAProjectListControl;
    public OkButtonClicked: any = new Event();
    protected async InitComponents() {
        this.Width = 1200;
        this.Height = 600;

        this.Text = 'Select which eBA process you want to connect';

        const projects = new ComboBox();
        projects.OnChanged.add(async (item) => {

            const processes: any[] = await eBABrokerClient.GetProcesses(item.Key);
            console.log(processes.length);
            const result = [];
            for (let i = 0; i < processes.length; i++) {
                const history: any[] = await eBABrokerClient.GetProcessHistory(processes[i].Id);
                history.forEach(item => result.push(item));
                console.log(i);
                //console.log(history);

            }
            console.log(result);

            //grid.DataSource = result;
        });
        //this.Controls.Add(projects);


        const grid = new GridView();
        //this.Controls.Add(grid);

        this.eBAProjectsControl = new eBAProjectListControl();
        this.Controls.Add(this.eBAProjectsControl);



        const btnOK = new Button();
        btnOK.Text = 'OK';
        btnOK.Color = 2;
        btnOK.Clicked = (() => {
            this.OkButtonClicked({
                name: this.eBAProjectsControl.SelectedProject.Caption,
                data:this.eBAProjectsControl.ProcessData
            });
        }) as any;

        const btnCancel = new Button();
        btnCancel.Text = 'Cancel';
        btnCancel.Color = 1;
        btnCancel.Clicked = (() => {

            this.Hide();
        }) as any;

        this.FooterControls.AddRange([btnOK, btnCancel]);
        /* const eBAProjects = await eBABrokerClient.GetProjects();
        eBAProjectsControl.SetProjects(eBAProjects);
        eBAProjects.forEach(project => {
            projects.Items.Add(project.Name, project.Caption);
        }); */

    }
}
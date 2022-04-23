import { Button, FileUpload, TForm, TTabPage, View, TApplication, ApplicationModes, Desktop } from '@tuval/forms';
import { Resources } from './Resources';
import { AppController } from './Domains/Application/Controllers/AppController';



declare var Viz;
declare var createjs;

class TestButton extends Button {
    constructor() {
        super();
        this.Clicked.add(() => {
            debugger;
            this.Text = 'dfsfsdf';
        });
    }

    public ShowText() {
        debugger;
        this.Text = 'asdsdsadsdasdasd';
    }
}

@View
export class MainView extends TForm {

    public override InitComponents() {
        this.Width = 1000;
        this.Height = 700;
        this.Name = 'ProcessMaining::MainForm';
        this.Text = 'Procetra';
        this.Icon = Resources.Icons.ApplicationIcon;


        const testController = new AppController();
        this.Controls.Add(testController);
        testController.LoadRecentFiles();
        testController.RequestDesktop.add(() => this.TopMaximize());
        // testController.LoadProjects();
        /*   const button = new TestButton();
          button.Text = 'Test';
          this.Controls.Add(button);
          setTimeout(()=> button.ShowText(),10000); */

        this.TopMaximizeChanged.add(topMaximized => {

            if (topMaximized) {
                TApplication.ApplicationMode = ApplicationModes.Portal;



            } else {
                TApplication.ApplicationMode = ApplicationModes.Desktop;

            }
        });
    }
}
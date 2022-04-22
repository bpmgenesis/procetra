import { Button, FileUpload, TForm, TTabPage, View, TApplication, ApplicationModes, Desktop } from '@tuval/forms';

import { MainController } from './MainController';
import { Resources } from './Resources';
import { Services } from './Services/Services';
import { ProjectTabView } from './UI/Components/ProjectTabControl/PropjectTabView';
import { AppController } from './UI/Controllers/AppController/AppController';
import { MainMenu } from './UI/MainMenu/MainMenu';
import { PmTabControl } from './UI/PmTabControl';

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
export class MainView extends TForm<MainController>{
    private topmenu: MainMenu;
    public pmTab: PmTabControl;

    private mainTabControl: ProjectTabView;

    private csvSelectFile: FileUpload;
    private xesSelectFile: FileUpload;


    public override InitComponents() {
        this.Width = 1000;
        this.Height = 700;
        this.Name = 'ProcessMaining::MainForm';
        this.Text = 'Procetra';
        this.Icon = Resources.Icons.ApplicationIcon;

        //#region ProjectItemsListMenu


        this.mainTabControl = new ProjectTabView();
        this.mainTabControl.TabPages.Add(new TTabPage());
        debugger;
        this.SendMessageToController('Ipcm_RequestController', this.mainTabControl);
        //this.Controls.Add(this.mainTabControl);


        //#endregion


        this.topmenu = new MainMenu();

        this.topmenu.ProjectTab.NewButtonClick.add(this.OnNewMenuClick.bind(this));
        this.topmenu.ProjectTab.CvsButtonClick.add(this.OnCvsSelectMenuClick.bind(this));
        this.topmenu.ProjectTab.XesButtonClick.add(this.OnXesSelectMenuClick.bind(this));
        this.topmenu.ProjectTab.XlsxButtonClick.add(this.OnXlsxSelectMenuClick.bind(this));

        this.topmenu.ProjectTab.SaveButtonClick.add(this.OnSave.bind(this));
        this.topmenu.ProjectTab.OpenButtonClick.add(this.OnOpenProject.bind(this));


        this.topmenu.ActiveTabIndex = 0;

        //this.Controls.Add(this.topmenu);


        const testController = new AppController();
        this.Controls.Add(testController);
        testController.LoadRecentFiles();
        testController.RequestDesktop.add(()=> this.TopMaximize());
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

    private OnNewMenuClick() {
        debugger;
        this.SendMessageToController('Ipcm_SelectNewProject');
    }

    private OnSave() {
        //this.pmTab.SaveProject();
        //this.Controller.Save();
    }

    private OnOpenProject() {
        //this.Controller.OpenProject();
        /* this.openProjectDialog.OkButtonClicked = (projectName: string) => {
            Services.ProjectService.LoadProject(projectName).then((project: IProject) => {
                this.pmTab.Visible = true;
                this.pmTab.AddProject(project);
            });
        }
        this.openProjectDialog.ShowDialog(); */
    }
    private OnCvsSelectMenuClick() {
        Services.ProjectService.CreateProject('New Project').then(project => {
            console.log('OnCvsSelectMenuClick');
            this.pmTab.Visible = true;
            this.pmTab.AddProjectFromCsvFile(project);
        });

    }

    private OnXesSelectMenuClick() {
        Services.ProjectService.CreateProject('New Project').then(project => {
            console.log('OnXesSelectMenuClick');
            this.pmTab.Visible = true;
            this.pmTab.AddProjectFromXes(project);
        });
    }

    private OnXlsxSelectMenuClick() {
        Services.ProjectService.CreateProject('New Project').then(project => {
            console.log('OnXlsxSelectMenuClick');
            this.pmTab.Visible = true;
            this.pmTab.AddProjectFromXlsx(project);
        });
    }

    /*    @IpcMessage
       private Ipcm_AddTab() {
           const tabPageView = new ProjectTabPageView();
           this.mainTabControl.TabPages.Add(tabPageView);
       } */
}
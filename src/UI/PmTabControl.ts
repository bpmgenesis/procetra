import { ProjectTabPage } from './DataSetTabPage/ProjectTabPage';
import { TabControlEx } from '@tuval/components/navigations';
import { IProject } from '../Bussiness/IProject';
import { WellcomeTabPage } from './WellcomeTabPage';
import { EventBus } from '@tuval/core';
import { IProjectService } from '../Services/IProjectService';
import { instance as container, TMath } from '@tuval/core';
import { Services } from '../Services/Services';

export class PmTabControl extends TabControlEx {
    public constructor() {
        super();
        this.Height = 500;
        this.Removing = (e) => {

            if (e.removedIndex === 0) {
                e.cancel = true;
            } else {
                const tabPage: ProjectTabPage = this.TabPages.Get(e.removedIndex) as ProjectTabPage;
                if (tabPage && tabPage.project) {
                    Services.ProjectService.CloseProject(tabPage.project.Id);
                }
            }
            console.log(e);
        }
    }
    public override OnLoaded() {
        const wellcome = new WellcomeTabPage();
        this.TabPages.Add(wellcome);

        EventBus.Default.on('P2M.C.ADD_CSV', this.OnCommandAddCsv.bind(this));

    }
    public override OnUnLoaded() {
        EventBus.Default.off('P2M.C.ADD_CSV', this.OnCommandAddCsv.bind(this));
    }

    private OnCommandAddCsv(e: any) {
        Services.ProjectService.CreateProject(e.name).then(project => {
            console.log('threadten geldi.');
            const tabpage = ProjectTabPage.CreateWithCsv(project);
            tabpage.Text = e.name;
            this.TabPages.Add(tabpage);
            tabpage.AddFromCsv(e.name, e.csv, e.caseName, e.activityName, e.timestampName, e.startDateName);
            this.ActiveIndex = this.TabPages.Count- 1;
        });
    }

    public AddProject(project: IProject) {
        const tabpage = ProjectTabPage.Create(project);
        this.TabPages.Add(tabpage);
        this.ActiveIndex = this.TabPages.Count - 1;
    }

    public AddProjectFromCsvFile(project: IProject) {
        const tabpage = ProjectTabPage.CreateWithCsv(project);
        this.TabPages.Add(tabpage);
        tabpage.OnCsvFileSelect(true);
        this.ActiveIndex = this.TabPages.Count - 1;
    }

    public AddProjectFromXes(project: IProject) {
        const tabpage = ProjectTabPage.CreateWithXes(project);
        this.TabPages.Add(tabpage);
        this.ActiveIndex = this.TabPages.Count - 1;
    }

    public AddProjectFromXlsx(project: IProject) {
        const tabpage = ProjectTabPage.CreateWithXlsx(project);
        this.TabPages.Add(tabpage);
        this.ActiveIndex = this.TabPages.Count - 1;
    }
    public LoadFromXes(projectName: string, str: string) {
        const dataset = new ProjectTabPage();
        dataset.Text = projectName;
        //this.AddTabPage(dataset);
        dataset.AddXes(str);
    }

    public SaveProject(): void {
        if (this.ActiveIndex > -1) {
            const activeTab = this.TabPages.Get(this.ActiveIndex);
            if (activeTab instanceof ProjectTabPage) {
                activeTab.Save();
            }
        }
    }
}
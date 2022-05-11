import { Event, foreach } from '@tuval/core';
import {
    Alignment,
    Context,
    HStack,
    Icon,
    If,
    Spacer,
    State,
    TApplication,
    Text,
    UIButton,
    UIController,
    UIImage,
    UIMotion,
    UIScene,
    UIView,
    VStack,
    UILink,
    UIRoutes
} from '@tuval/forms';

import { MVIAnalyseModel } from '../../../../dist_types/types/Domains/AnalyseModels/Models/MVIAnalyseModel';
import { ProcessMining } from '../../../Application';
import { IProject } from '../../../Bussiness/IProject';
import { Resources } from '../../../Resources';
import { Services } from '../../../Services/Services';
import { ProjectUIService } from '../../../UI/UIServices/ProjectUIService';
import { AnalyseModelsController } from '../../AnalyseModels/Controllers/AnalyseModelsController';
import { ProjectController } from '../../Project/Controllers/ProjectController';
import { MIProject } from '../../Project/Models/ProjectModel';
import { MenuButton } from '../Views/MenuButton';
import { PortalFilterBarView } from '../Views/PortalFilterBarView';
import { RecentProjects } from '../Views/RecentProjects';

export class AppController extends UIController {

    @State()
    public RequestDesktop: Event<any>;

    @State()
    private currentProject: any;

    @State()
    private currentController: UIController;

    @State()
    private recentFiles: any;

    protected InitController(): void {
        this.showAnim = false;
        this.RequestDesktop = new Event();

        this.test = 'Press'
    }

    private MainPage(): UIView {
        return (
            UIScene(
                HStack(
                    VStack({ spacing: 10 })(
                        MenuButton('', '\\d28c', () => this.OnNewProject()),
                        MenuButton('', '\\d295', () => this.OnOpenProject()),
                        MenuButton('', '\\d279', () => this.OnNewProject()),
                        MenuButton('', '\\d21d', () => this.OnNewProject()),
                        MenuButton('', '\\d272', () => this.OnNewProject())
                    ).width('120px'),
                    RecentProjects()
                )
                    // UIScene içerisine yayılması için
                    .width('100%')
            )
        )
    }

    private LoadPortalView(): UIView {
        return UIScene(
            VStack(
                VStack(
                    HStack(
                        UIImage(Resources.Icons.ApplicationIcon).width(24).height(24),
                        Text('Procetra').fontSize('16px').fontWeight('bold').foregroundColor('white'),
                        Spacer(),
                        Icon('\\f080').size(20).marginRight('10px').cursor('pointer').foregroundColor('white').onClick(() => this.RequestDesktop())
                    )
                        .fontFamily('verdana, arial, tahoma, helvetica, sans-serif')
                        .alignment(Alignment.leading)
                        .minHeight('50px')
                        .maxHeight('50px')
                        .background('rgb(208, 63, 64)'),
                    PortalFilterBarView({ projectName: this.currentProject?.project_name, selectProjectAction: () => this.OnOpenProject() })
                ).height(),
                this.currentController
            ).alignment(Alignment.topLeading)
        )
            .backgroundColor('white')
            .alignment(Alignment.topLeading)
    }

    @State()
    private showAnim: boolean;


    @State()
    private test: any;

    @Context()
    public onTextChanged() {
        alert(this.test);
    }

    @Context()
    public onCloseProject() {
        this.currentProject = null;
    }

    private getSubView() {
        return ({ onTextChanged }) => {
            return (
                HStack(
                    UIButton(
                        Text('click me')
                    ).cursor('pointer').action(() => { onTextChanged(); this.test = { fontSize: '50px' } }),
                    Text('Hello')
                )
            )
        }
    }
    private getContextView() {
        return ({ onTextChanged }) => {
            return (
                UIScene(
                    UIMotion(
                        this.getSubView() as any
                    ).animate(this.test)
                )
            )
        }
    }
    public override LoadView(): UIView {
        /*  return (
             UIScene(
                 UILink('test'),
                 UIRoutes('dfsdf')
             )
         ) */
        if (TApplication.IsDesktop) {
            return (
                If(this.currentProject == null)
                    (this.MainPage())
                    .else
                    (this.currentController as any)
            )
        } else if (TApplication.IsPortal) {
            return this.LoadPortalView();
        }
    }

    private OnNewProject() {
        ProjectUIService.NewProject().then((name: string)=>{
            const session_id = Services.StateService.GetSessionId();
            Services.ProjectService.CreateProject(name).then((project:MIProject)=>{
                this.currentProject = project;
                // this.controller = ProjectController(this, project);
                const controller = new AnalyseModelsController();
                controller.Bind(project);
                controller.AnalyseModelSelected.add((item: MVIAnalyseModel) => {
                    this.currentController = ProjectController(this, project);
                });
                this.currentController = controller;
            });
        });
    }

    private OnOpenProject() {
        ProjectUIService.OpenProjectDialog().then((project: MIProject) => {
            this.currentProject = project;
            // this.controller = ProjectController(this, project);
            const controller = new AnalyseModelsController();
            controller.Bind(project);
            controller.AnalyseModelSelected.add((item: MVIAnalyseModel) => {
                this.currentController = ProjectController(this, project);
            });
            this.currentController = controller;
        });
    }

    public CLoseProject() {
        this.currentProject = null;
    }

    public LoadRecentFiles() {
        const result = [];
        ProcessMining.RecentlyUploadedFilesStorage.Keys().then((keys) => {
            foreach(keys, key => {
                ProcessMining.RecentlyUploadedFilesStorage.GetString(key).then((str) => {
                    const obj = JSON.parse(str);
                    result.push(obj);
                    /*  const bi: BoxTileItem = new BoxTileItem(key, obj.rowsCount + ' rows');
                     const dateStr = moment(obj.uploadeddate).format('DD.MM.YYYY');
                     bi.FooterTitle = TString.Format('Uploaded at {0}', dateStr);
                     bi.OnClick = () => {
                         EventBus.Default.fire('P2M.C.ADD_CSV', {
                             name: key,
                             csv: Encoding.UTF8.GetString(Convert.FromBase64String(obj.csv)),
                             caseName: obj.caseName,
                             activityName: obj.activityName,
                             timestampName: obj.timestampName,
                             startDateName: obj.startDateName
                         });
                     };
                     bt.Items.Add(bi); */
                });

            });
            this.recentFiles = result;
            console.log(this.recentFiles);
        });
    }
}


import { Event, foreach, int } from '@tuval/core';
import {
    cLeading,
    Context,
    cTopLeading,
    HStack,
    Icon,
    If,
    Spacer,
    State,
    TApplication,
    Text,
    TextField,
    UIButton,
    UIController,
    UIImage,
    UIMotion,
    UIScene,
    UIView,
    VStack,
} from '@tuval/forms';

import { ProcessMining } from '../../../Application';
import { Resources } from '../../../Resources';
import { Services } from '../../../Services/Services';
import { ProjectUIService } from '../../../UI/UIServices/ProjectUIService';
import { EmptyProjectController } from '../../EmptyProject/Controllers/EmptyProjectController';
import { MiningModelController } from '../../MiningModel/Controllers/MiningModelController';
import { MIProject } from '../../../models/MIProject';
import { ProjectController } from '../../Project/Controllers/ProjectController';
import { MVIMiningModel } from '../../Project/Models/MVIAnalyseModel';
import { MenuButton } from '../Views/MenuButton';
import { PortalFilterBarView } from '../Views/PortalFilterBarView';
import { RecentProjects } from '../Views/RecentProjects';
import { ForEach } from '@tuval/forms';

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
            VStack({ alignment: cTopLeading })(
                VStack(
                    HStack({ alignment: cLeading })(
                        UIImage(Resources.Icons.ApplicationIcon).width(24).height(24),
                        Text('Procetra').fontSize('16px').fontWeight('bold').foregroundColor('white'),
                        Spacer(),
                        Icon('\\d2a8').size(20).marginRight('10px').cursor('pointer').foregroundColor('white').onClick(() => this.RequestDesktop())
                    )
                        .fontFamily('verdana, arial, tahoma, helvetica, sans-serif')
                        .minHeight('50px')
                        .maxHeight('50px')
                        .background('rgb(208, 63, 64)'),
                    PortalFilterBarView({ projectName: this.currentProject?.project_name, selectProjectAction: () => this.OnOpenProject() })
                ).height(),
                this.currentController as any
            )
        )
            .backgroundColor('white')
            .alignment(cTopLeading)
    }

    @State()
    private showAnim: boolean;


    @State()
    private test: any;

    @Context()
    public onTextChanged() {
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
                        TextField()
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

    @State()
    private data: any[];

    @State()
    private testCounter: int;
    public override LoadView(): UIView {
       /*  const result: any[] = [];
        for (let i = 0; i < 1000; i++) {
            result.push(i);
        }

        return UIScene(
            HStack(
                Text('Hello world ' + this.testCounter),
                VStack(
                    ...ForEach(result)(item =>
                        HStack(
                            Text('Test için yapıldı.' + this.testCounter)
                        )
                    )
                ).useCache(true).alias('cache stack')
            ).alias('normal stack'),
            UIButton(
                Text('Increse')
            ).action(() => { const a = (this.testCounter === undefined ? 0 : this.testCounter); this.testCounter = a + 1; })
        ) */
        /*     const result: any[] = [];
         for (let i = 0; i < 10000; i++) {
             result.push(i);
         }

         return (
             VStack(
                 UIButton(
                     HStack(
                         Text(this.data == null ? 'Click Me' : 'OK')
                     )
                 ).action(() => this.data = result),
                 ...ForEach(this.data)(item =>
                     HStack(
                         _Text('Test için yapıldı.')
                     )
                 )
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
        ProjectUIService.NewProject().then((name: string) => {
            const session_id = Services.StateService.GetSessionId();

            Services.ProjectService.CreateProject(name, 'api@procetra.com', true, false).then((project: MIProject) => {
                this.currentProject = project;
                const controller = new EmptyProjectController();
                controller.Bind(project);
                this.currentController = controller;
            });
        });
    }

    private OnOpenProject() {
        ProjectUIService.OpenProjectDialog().then((project: MIProject) => {
            this.currentProject = project;

            if (project.is_data_loaded) {
                const controller = new ProjectController();
                controller.Bind(project);
                controller.AnalyseModelSelected.add((item: MVIMiningModel) => {
                    item.project = project;

                    const miningModelController = MiningModelController(this, item);
                    miningModelController.MiningModelClosed.add(() => { this.currentController = controller });
                    this.currentController = miningModelController;

                });
                this.currentController = controller;
            } else {
                const controller = new EmptyProjectController();
                controller.Bind(project);
                this.currentController = controller;
            }
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


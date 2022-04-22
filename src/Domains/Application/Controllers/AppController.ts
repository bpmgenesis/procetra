import { Event, foreach } from '@tuval/core';
import {
    Alignment,
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
    UIScene,
    UIView,
    VStack,
} from '@tuval/forms';

import { ProcessMining } from '../../../Application';
import { Resources } from '../../../Resources';
import { ProjectUIService } from '../../../UI/UIServices/ProjectUIService';
import { ProjectController, ProjectControllerClass } from '../../Project/Controllers/ProjectController';
import { MIProject } from '../../Project/Models/ProjectModel';
import { MenuButton } from '../Views/MenuButton';
import { PortalFilterBarView } from '../Views/PortalFilterBarView';
import { RecentProjects } from '../Views/RecentProjects';

export class AppController extends UIController {

    @State()
    public RequestDesktop: Event<any>;

    @State()
    private currentProject: any;

    private controller: ProjectControllerClass;

    @State()
    private recentFiles: any;

    protected InitController(): void {
        this.showAnim = false;
        this.RequestDesktop = new Event();
    }

    private MainPage(): UIView {
        return (
            UIScene(
                HStack(
                    VStack({ spacing: 10 })(
                        MenuButton('', '\\f064', () => this.OnNewProject()),
                        MenuButton('', '\\f06d', () => this.OnOpenProject()),
                        MenuButton('', '\\f051', () => this.OnNewProject()),
                        MenuButton('', '\\f183', () => this.OnNewProject()),
                        MenuButton('', '\\f04a', () => this.OnNewProject())
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
                this.controller
            ).alignment(Alignment.topLeading)
        )
            .backgroundColor('white')
            .alignment(Alignment.topLeading)
    }

    @State()
    private showAnim: boolean;

    public override LoadView(): UIView {
        if (TApplication.IsDesktop) {
            return (
                If(this.currentProject == null, this.MainPage(), this.controller) as any
            )
        } else if (TApplication.IsPortal) {
            return this.LoadPortalView();
        }
    }

    private OnNewProject() {
        ProjectUIService.NewProject();
    }

    private OnOpenProject() {
        ProjectUIService.OpenProjectDialog().then((project: MIProject) => {
            this.currentProject = project;
            this.controller = ProjectController(this, project);
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


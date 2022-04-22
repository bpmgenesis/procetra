import { UIController, UIView, Text, UIScene, Fonts, UIButton, VStack, HDivider, Alignment, HStack, Icon, State, If, UIAnimation, TApplication, ApplicationModes, TwoColumnWithHeaderLayout, UIImage, Spacer } from '@tuval/forms';
import { ProjectUIService } from '../../UIServices/ProjectUIService';
import { ProcessMining } from '../../../Application';
import { foreach, Event } from '@tuval/core';
import { ProjectController, ProjectControllerClass } from '../ProjectController/ProjectController';
import { RecentProjects } from './Views/RecentProjects';
import { MIProject } from '../../Models/ProjectModel';
import { Resources } from '../../../Resources';
import { PortalFilterBarView } from './Views/PortalFilterBarView';

/* VStack(
    Text('Simple Swift Guide to largeTitle ').font(Fonts.largeTitle),
    Text('Simple Swift Guide to title').font(Fonts.title),
    Text('Simple Swift Guide to title2').font(Fonts.title2),
    Text('Simple Swift Guide to title3').font(Fonts.title3),
    Text('Simple Swift Guide to headline').font(Fonts.headline),
    Text('Simple Swift Guide to body').font(Fonts.body),
    Text('Simple Swift Guide to callout').font(Fonts.callout),
    Text('Simple Swift Guide to subhead').font(Fonts.subhead),
    Text('Simple Swift Guide to footnote').font(Fonts.footnote),
    UIButton(
        Text('New')
    ).cornerRadius('50%').shadow('rgba(100, 100, 111, 0.2) 0px 7px 29px 0px')
)
) */

function MenuButton(title: string, icon: string, action: Function): UIView {
    const view =
        UIButton(
            VStack(
                Icon(icon).size(30),
            )
        )
            .width('64px').height('64px')
            .transition('all 0.35s')
            .background('rgb(255,255,255,50%)')
            .padding('8px')
            .border('solid 1px rgb(120,120,120,20%)')
            .cornerRadius('12px')
            .shadow('rgba(100, 100, 111, 0.2) 0px 7px 29px 0px')
            .action(() => action())

    return view;
}



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
        /*  this.controller = new ProjectController();
         this.controller.SetParentAppController(this); */
    }

    private MainPage(): UIView {
        return UIScene(
            HStack(
                VStack(
                    MenuButton('', '\\f064', () => this.OnNewProject()),
                    MenuButton('', '\\f06d', () => this.OnOpenProject()),
                    MenuButton('', '\\f051', () => this.OnNewProject()),
                    MenuButton('', '\\f183', () => this.OnNewProject()),
                    MenuButton('', '\\f04a', () => this.OnNewProject())
                ).width('120px').spacing('10px'),
                RecentProjects()
            )
                // UIScene içerisine yayılması için
                .width('100%')
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
                        Icon('\\f080').size(20).marginRight('10px').cursor('pointer').foregroundColor('white').onClick(()=> this.RequestDesktop())
                    )
                        .fontFamily('verdana, arial, tahoma, helvetica, sans-serif')
                        .alignment(Alignment.leading)
                        .minHeight('50px')
                        .maxHeight('50px')
                        .background('rgb(208, 63, 64)'),
                    PortalFilterBarView({projectName:this.currentProject?.project_name, selectProjectAction: () => this.OnOpenProject() })
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
        if (TApplication.ApplicationMode === ApplicationModes.Desktop) {
            return (If(this.currentProject == null, this.MainPage(), this.controller) as any
                /*  VStack(
                     UIButton(
                         Text('Show')
                     ).action(()=> this.showAnim = true),
                     UIButton(
                         Text('Hide')
                     ).action(()=> this.showAnim = false),
                     UIAnimation(
                         Text('fsdfsdfsd')
                     ).start(this.showAnim)
                 ) */
            )
        } else if (TApplication.ApplicationMode === ApplicationModes.Portal) {
            return this.LoadPortalView();
        }
    }

    private OnNewProject() {
        ProjectUIService.NewProject();
    }

    private OnOpenProject() {
        /* this.currentProject = 'sd';
        this.controller.LoadProjects(); */
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


import { Services } from './../../Services/Services';
import { StateService } from './../../Services/StateService';
import { UIController, UIView, Text, State, UIScene, ForEach, VStack, HStack, Alignment, UIButton, Icon, Fonts, TApplication, HDivider, cCenter, cTrailing } from '@tuval/forms';
import { MiningBrokerClient } from './ConnectorDialog/eBA/MiningBrokerClient';
import { MIProjectItem } from '../Models/MIProjectItem';
import { ListView, ListViewItem } from '../Views/ListView';
import { MIProject } from '../Models/ProjectModel';
import { AcceptButton, CancelButton } from '../Views/Buttons';
import { OpenProjectDialog } from './OpenProjectDialog';
import { Font } from '@tuval/graphics';

export class OpenProjectDialogController extends UIController {

    private dialog: OpenProjectDialog;
    @State()
    private projects: MIProject[];

    @State()
    public selectedProject: MIProject;
    protected InitController() {

    }
    public LoadProjects() {
        const session_id = StateService.GetSessionId();
        if (session_id == null) {
            throw 'Invalid session.';
        }
        Services.ProjectService.GetProjects(session_id, 'bpmgenesis').then((projects: MIProject[]) => {
            this.projects = projects;
        });
    }
    public OnBindModel(model: OpenProjectDialog) {
        this.dialog = model;
    }

    public OnOK() {
        (this.dialog as any).ShowDialogAsyncResolve(this.selectedProject);
        this.dialog.Hide();
    }
    public OnCancel() {
        this.dialog.Hide();
    }
    public LoadView(): UIView {
        return (
            UIScene(
                VStack(
                    HStack(
                        Icon('\\efd5').size(30).foregroundColor(TApplication.IsPortal ? '#ddd' : ''),
                        Text('Select Project').font(Fonts.title).fontFamily('Ubuntu, sans-serif')
                        .fontWeight(TApplication.IsPortal ? '600' : '400').foregroundColor(TApplication.IsPortal ? '#ddd' : '')
                    ).alignment(Alignment.leading).spacing(10).height(),
                    HDivider().height(1).background(TApplication.IsPortal ? '#288ae2' : 'gray'),
                    ListView(
                        ...ForEach(this.projects, (project: MIProject) =>
                            ListViewItem(
                                Text(project.project_name).foregroundColor(TApplication.IsPortal ? '#bbb' : ''),
                            )
                                .minHeight('50px')
                                .background(this.selectedProject === project ? 'rgb(120,120,120,50%)' : { default: TApplication.IsPortal ? '' : 'white', hover: 'rgb(120,120,120,10%)' } as any)
                                .onSelected(() => this.selectedProject = project)
                        )
                    ).width('100%').backgroundColor('#2b3641'),
                    HStack({ alignment: TApplication.IsPortal ? cCenter : cTrailing })(
                        AcceptButton('OK').action(() => this.OnOK()),
                        CancelButton('Cancel').action(() => this.OnCancel())
                    ).height('50px')
                ).grow()
            )
                .background(TApplication.IsPortal ? '#212932' : '')
                .padding('10px')
        );
    }
}
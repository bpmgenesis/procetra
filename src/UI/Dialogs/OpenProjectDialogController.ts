import { Services } from './../../Services/Services';
import { StateService } from './../../Services/StateService';
import { UIController, UIView, Text, State, UIScene, ForEach, VStack, HStack, Alignment, UIButton, Icon, Fonts } from '@tuval/forms';
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
                        Icon('\\efd5').size(30),
                        Text('Select Project').font(Fonts.title)
                    ).alignment(Alignment.leading).spacing(10).height(),
                    ListView(
                        ...ForEach(this.projects, (project: MIProject) =>
                            ListViewItem(
                                Text(project.project_name)
                            )
                                .minHeight('50px')
                                .background(this.selectedProject === project ? 'rgb(120,120,120,50%)' : { default: 'white', hover: 'rgb(120,120,120,10%)' } as any)
                                .onSelected(() => this.selectedProject = project)
                        )
                    ).width('100%').cornerRadius('12px'),
                    HStack(
                        AcceptButton(
                            Text('OK')
                        ).action(() => this.OnOK()),
                        CancelButton(
                            Text('Cancel')
                        ).action(() => this.OnCancel())
                    ).alignment(Alignment.trailing).width('100%').height('50px')
                ).grow()
            ).padding('10px')
        );
    }
}
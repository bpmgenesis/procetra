import {
    Alignment,
    cCenter,
    cTrailing,
    Fonts,
    ForEach,
    HDivider,
    HStack,
    Icon,
    State,
    TApplication,
    Text,
    UIController,
    UIScene,
    UIView,
    VStack,
} from '@tuval/forms';

import { MIProject } from '../../Domains/Project/Models/ProjectModel';
import { AcceptButton, CancelButton } from '../Views/Buttons';
import { ListView, ListViewItem } from '../Views/ListView';
import { Services } from './../../Services/Services';
import { StateService } from './../../Services/StateService';
import { OpenProjectDialog } from './OpenProjectDialog';
import { cLeading, _ForEach } from '@tuval/forms';

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
                    HStack({ alignment: cLeading, spacing: 10 })(
                        Icon('\\efd5').size(30).foregroundColor(TApplication.IsPortal ? '#ddd' : ''),
                        Text('Select Project').font(Fonts.title).fontFamily('Ubuntu, sans-serif')
                            .fontWeight(TApplication.IsPortal ? '600' : '400').foregroundColor(TApplication.IsPortal ? '#ddd' : '')
                    ).height(),
                    HDivider().height(1).background(TApplication.IsPortal ? '#288ae2' : 'gray'),
                    ListView(
                        ..._ForEach(this.projects)((project: MIProject) =>
                            ListViewItem(
                                Text(project.project_name).foregroundColor(TApplication.IsPortal ? '#bbb' : '').fontWeight('500'),
                            )
                                .minHeight('50px')
                                .background(this.selectedProject === project ? 'rgb(120,120,120,50%)' : { default: TApplication.IsPortal ? '' : 'white', hover: 'rgb(120,120,120,10%)' } as any)
                                .onSelected(() => {this.selectedProject = project; })
                        )
                    ).width('100%').backgroundColor(TApplication.IsPortal ? '#2b3641' : 'white'),
                    HStack({ alignment: TApplication.IsPortal ? cCenter : cTrailing })(
                        AcceptButton('OK').action(() => this.OnOK()),
                        CancelButton('Cancel').action(() => this.OnCancel())
                    ).height(50)
                ).grow()
            )
                .background(TApplication.IsPortal ? '#212932' : '')
                .padding('10px')
        );
    }
}
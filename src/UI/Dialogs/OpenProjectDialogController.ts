import {
    cCenter,
    cLeading,
    cTopLeading,
    cTrailing,
    cVertical,
    FHStack,
    Fonts,
    ForEach,
    FVStack,
    HDivider,
    HStack,
    Icon,
    ScrollView,
    Spinner,
    State,
    TApplication,
    Text,
    UIController,
    UIScene,
    UIView,
    VStack,
} from '@tuval/forms';

import { IProjectModel } from '@procetra/common';
import { GridHeader, GridRow, IGridColumn } from '../../modules/Statistics/Views/CasesGrid';
import { AcceptButton, CancelButton } from '../Views/Buttons';
import { ListView, ListViewItem } from '../Views/ListView';
import { RegularText } from '../Views/Texts';
import { Services } from '@procetra/common';
import { StateService } from '@procetra/common';
import { OpenProjectDialog } from './OpenProjectDialog';


function detectBrowser() {
    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
        return 'Opera';
    } else if (navigator.userAgent.indexOf("Chrome") != -1) {
        return 'Chrome';
    } else if (navigator.userAgent.indexOf("Safari") != -1) {
        return 'Safari';
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
        return 'Firefox';
    } else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!(document as any).documentMode == true)) {
        return 'IE';//crap
    } else {
        return 'Unknown';
    }
}

const columns: IGridColumn[] = [
    {
        key: 'project_name',
        title: 'Name',
        width: 230
    },
    {
        key: 'flags',
        title: 'Flags',
        width: 80,
        builder: (row) =>
            FHStack({ alignment: cCenter })(
                RegularText(row['flags']).background('#2ca02c').fontSize(12).cornerRadius(3).textTransform('uppercase').foregroundColor('white').padding('2px 4px').fontFamily("'Source Sans Pro', Arial, sans-serif !important"),
            )
    },
    {
        key: 'owner',
        title: 'Project owner',
        width: 180
    },
    {
        key: 'stats',
        title: 'Stats',
        width: 100,
        builder: (row) =>
            FVStack({ alignment: cLeading })(
                FHStack({ alignment: cLeading, spacing: 5 })(
                    RegularText('0').fontFamily("'Source Sans Pro', Arial, sans-serif").foregroundColor('#cb5a25').fontSize('14px'),
                    RegularText('query').fontFamily("'Source Sans Pro', Arial, sans-serif").foregroundColor('#7f7f7f').fontSize('14px'),
                ),
                FHStack({ alignment: cLeading, spacing: 5 })(
                    RegularText('1.253').fontFamily("'Source Sans Pro', Arial, sans-serif").foregroundColor('#cb5a25').fontSize('14px'),
                    RegularText('cases').fontFamily("'Source Sans Pro', Arial, sans-serif").foregroundColor('#7f7f7f').fontSize('14px'),
                ),
            )
    },
    {
        key: 'updated',
        title: 'Updatete at',
    },
    {
        key: 'finished',
        title: 'Tags',
    },
    {
        key: 'duration',
        title: 'Actions',
        width: 80,
        builder: (row) =>
            FHStack(
                Icon('\\e3c9').size(24).padding(8),
                Icon('\\e92b').size(24).padding(8).foregroundColor('#A03B3B'),
            )
    }
]

/* const data = [
    {
        caseId: '1000-2645004',
        events: 5,
        variant: 'variant 5',
        started: '12/3/2019 16:17:43',
        finished: '01/02/2020 10:25:05',
        duration: '1 day, 18 hours'
    }
]
 */
export function ProjectGrid(data, onSelectedRow: Function): UIView {
    return (
        VStack({ alignment: cTopLeading })(
            GridHeader(columns),
            ...ForEach(data)((row =>
                GridRow(columns, row, onSelectedRow)
            ))
        )
    )
}
export class OpenProjectDialogController extends UIController {

    private dialog: OpenProjectDialog;

    @State()
    private projects: IProjectModel[];

    @State()
    public selectedProject: IProjectModel;

    protected InitController() {
        //this.projects = [];
    }

    public LoadProjects() {
        const session_id = StateService.GetSessionId();
        if (session_id == null) {
            throw 'Invalid session.';
        }
        Services.ProjectService.GetProjects(session_id, 'bpmgenesis').then((projects: IProjectModel[]) => {
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
        console.log(detectBrowser());
        this.dialog.Hide();
    }
    public LoadView(): UIView {
        console.log('View loaded');
        return (
            UIScene(
                VStack({ alignment: cTopLeading })(
                    HStack({ alignment: cLeading, spacing: 5 })(
                        Icon('\\e241').size(24).foregroundColor('#263238'),
                        RegularText('Project List').fontSize(20)
                    ).minHeight('64px').maxHeight('64px').background('#eceff1').foregroundColor('#263238').paddingLeft('10px'),
                    ScrollView({ axes: cVertical })(
                        /*  Text('dfesdfdsf'),
                         ...ForEach(this.projects)(item =>
                             HStack(
                                 ...ForEach([0, 1, 2, 3, 4, 5,6,7,8])(item_n =>
                                     Text(item.project_name)
                                 )
                             )
                         ) */

                        ProjectGrid(this.projects?.map(item => {
                            return {
                                project_name: item.project_name,
                                flags: 'Owner',
                                owner: item.admin,
                                updated: '09.05.2022',
                                tag: item
                            }
                        }), (row) => { this.selectedProject = row.tag; this.OnOK(); })
                    ).padding(15).visible(this.projects != null),
                    VStack(
                        /*  HDivider().height(20),
                         UISkeleton().height(20).paddingLeft('10').paddingRight('10'),
                         UISkeleton().height(20).paddingLeft('10').paddingRight('10'),
                         UISkeleton().height(20).paddingLeft('10').paddingRight('10'), */
                        Spinner().visible(detectBrowser() !== 'Chrome'),
                        RegularText('Loading Projects...').fontSize('16px').visible(detectBrowser() === 'Chrome')
                    ).visible(this.projects == null),
                    HStack({ alignment: TApplication.IsPortal ? cCenter : cTrailing })(
                        AcceptButton('OK').action(() => this.OnOK()),
                        CancelButton('Cancel').action(() => this.OnCancel())
                    ).height(50)
                ).visible(true),
                VStack(
                    HStack({ alignment: cLeading, spacing: 10 })(
                        Icon('\\d1fd').size(30).foregroundColor(TApplication.IsPortal ? '#ddd' : ''),
                        Text('Select Project').font(Fonts.title).fontFamily('Ubuntu, sans-serif')
                            .fontWeight(TApplication.IsPortal ? '600' : '400').foregroundColor(TApplication.IsPortal ? '#ddd' : '')
                    ).height(),
                    HDivider().height(1).background(TApplication.IsPortal ? '#288ae2' : 'gray'),
                    ListView(
                        ...ForEach(this.projects)((project: IProjectModel) =>
                            ListViewItem(
                                Text(project.project_name).foregroundColor(TApplication.IsPortal ? '#bbb' : '').fontWeight('500'),
                            )
                                .minHeight('50px')
                                .background(this.selectedProject === project ? 'rgb(120,120,120,50%)' : { default: TApplication.IsPortal ? '' : 'white', hover: 'rgb(120,120,120,10%)' } as any)
                                .onSelected(() => { this.selectedProject = project; })
                        )
                    ).width('100%').backgroundColor(TApplication.IsPortal ? '#2b3641' : 'white'),
                    HStack({ alignment: TApplication.IsPortal ? cCenter : cTrailing })(
                        AcceptButton('OK').action(() => this.OnOK()),
                        CancelButton('Cancel').action(() => this.OnCancel())
                    ).height(50)
                ).grow().visible(false)
            )
                .background(TApplication.IsPortal ? '#212932' : '')
            //.padding('10px')
        );
    }
}
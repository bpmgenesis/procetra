import { IProjectModel, PageButton, Services, IMiningModelModel } from '@procetra/common';
import { Event } from '@tuval/core';
import {
    cLeading,
    cTop,
    cTopLeading,
    ForEach,
    HDivider,
    HStack,
    Icon,
    RenderingTypes,
    Spacer,
    State,
    Text,
    UIContextMenu,
    UIController,
    UIScene,
    VStack,
} from '@tuval/forms';

import { AnalyseModelUIService } from '../../../UI/UIServices/AnalyseModelUIService';
import { HeadLineButton } from '../../../UI/Views/HeadLineButton';
import { AnimHeadline5, SectionHeadline } from '../../../UI/Views/Texts';
import { MVITitleMenu } from '../Models/MVITitleMenu';
import { AnalyseModelTileBox } from '../Views/AnalyseModelTileBox';

const infoText = `
To upload data you must first map the fields (columns) of your data file.
+ Map __required fields__ (Case ID, Timestamp and Event Name) by dragging the corresponding label to the desired column
+ Map __optional fields__ (columns) that you want to use for filtering your cases by dragging the New Attribute label to the desired column.
+ Once you have completed your mapping press the 'Confirm and start upload' button.
`;

export class ProjectControllerClass extends UIController {
    public AnalyseModelSelected: Event<any>;

    private menuItems: MVITitleMenu[];

    private newMenuItems: any;
    @State()
    private project: IProjectModel;

    @State()
    public model: IMiningModelModel[];

    @State()
    public selectedAnalyseModel: IMiningModelModel;

    protected InitController() {
        this.AnalyseModelSelected = new Event();
        this.menuItems = [
            {
                icon: '\\d2c8',
                iconColor: 'black',
                title: 'Rename',
                onClick: (item) => console.log(item)
            },
            {
                icon: '\\d2a4',
                iconColor: 'black',
                title: 'Permissions',
                onClick: (item) => console.log(item)
            },
            {
                icon: '\\d21b',
                iconColor: 'black',
                title: 'Publish',
                onClick: (item) => console.log(item)
            },
            {
                icon: '\\d3a4',
                iconColor: 'black',
                title: 'Duplicate',
                onClick: (item) => console.log(item)
            },
            {
                icon: '\\d2da',
                iconColor: 'black',
                title: 'Tags',
                onClick: (item) => console.log(item)
            },
            {
                icon: '\\d299',
                iconColor: 'black',
                title: 'Move To',
                onClick: (item) => console.log(item)
            },
            {
                icon: '\\d2a6',
                iconColor: 'red',
                title: 'Delete',
                onClick: (item) => console.log(item)
            }
        ]

        this.newMenuItems = [
            {
                icon: '\\d1fe',
                iconColor: 'black',
                title: 'Mining Model',
                onClick: (item) => this.OnAddEditAnalyseModelName()
            },
            {
                icon: '\\eff3',
                iconColor: 'black',
                title: 'Metric',
                onClick: (item) => console.log(item)
            },
            {
                icon: '\\e97b',
                iconColor: 'black',
                title: 'Chart',
                onClick: (item) => console.log(item)
            },
            {
                icon: '\\e856',
                iconColor: 'black',
                title: 'Alert',
                onClick: (item) => console.log(item)
            }
        ];
    }

    public OnBindModel(project: IProjectModel) {
        this.project = project;
        const session_id = Services.StateService.GetSessionId();
        Services.ProjectService.GetAnalyseModels(session_id, 'bpmgenesis', project.project_id).then((analyseModels: IMiningModelModel[]) => {
            console.log(analyseModels)
            this.model = analyseModels;
        });
    }
    private OnAddEditAnalyseModelName(): void {
        AnalyseModelUIService.AddEditAnalyseModelName().then((name: string) => {
            // Adding to our project
            const session_id = Services.StateService.GetSessionId();
            Services.ProjectService.CreateAnalyseModel(session_id, this.project.project_id, name).then(analyseModelInfo => {
                const models = Array.from(this.model); // for immutable array
                models.push(analyseModelInfo);
                this.model = models; // updating state
                //this.ForceUpdate();
            });

        });
    }

    private OnSelectedAnalyseModelChange(item: IMiningModelModel): void {
        this.selectedAnalyseModel = item;
    }

    private AnalyseModelView() {
        return ({ onCloseProject }) => {
            return (
                UIScene(
                    VStack({ alignment: cTopLeading })(
                        HStack({ alignment: cLeading, spacing: 10 })(
                            Icon('\\d277').size(30),
                            AnimHeadline5(this.project?.project_name).marginVertical(10),
                            Spacer(),
                            HStack({ spacing: 5 })(
                                UIContextMenu(
                                    ...ForEach(this.newMenuItems)((item: any) =>
                                        HStack({ alignment: cLeading, spacing: 10 })(
                                            Icon(item.icon).size(20).foregroundColor(item.iconColor),
                                            Text(item.title).foregroundColor(item.iconColor)
                                        ).onClick(() => item.onClick(item))
                                    )
                                )(
                                    HeadLineButton('', '\\e145'),
                                ).cursor('pointer').border('solid 1px var(--sub-border-color)').transition('border .3s'),
                                HeadLineButton('', '\\d2c8').action(() => this.OnAddEditAnalyseModelName()),
                                HeadLineButton('', '\\d2a4').action(() => this.OnAddEditAnalyseModelName()),
                                HeadLineButton('', '\\d34a').action(() => this.OnAddEditAnalyseModelName()),
                                HeadLineButton('', '\\d2da').action(() => this.OnAddEditAnalyseModelName()),
                                HeadLineButton('', '\\d299').action(() => this.OnAddEditAnalyseModelName()),
                                HeadLineButton('', '\\d2a6').action(() => this.OnAddEditAnalyseModelName()),
                                HeadLineButton('', '\\e5cd').action(() => onCloseProject())
                            ).width()
                        ).height(), //auto height
                        HStack({ alignment: cLeading, spacing: 10 })(
                            Icon('\\f109').size(20),
                            SectionHeadline('Analyse Models'),
                            Spacer(),
                            HStack(
                                HeadLineButton('New Analyse Model').action(() => this.OnAddEditAnalyseModelName())
                            ).width() //auto width
                        ).height().visible(false),
                        HDivider().marginVertical(10).height(1).background('rgb(120,120,120,50%)').visible(false),
                        // E??er model tan??mlanmam???? ise
                        (this.model == null || this.model.length === 0) ?
                            VStack({ alignment: cTop })(
                                Text(infoText).render(RenderingTypes.Markdown)
                                    .fontFamily("'Source Sans Pro', Arial, sans-serif")
                                    .fontSize('16px')
                                    .lineHeight('1.5'),
                                PageButton('Create Mining Model').width(235).onClick(() => this.OnAddEditAnalyseModelName()),
                            )
                            :
                            HStack({ alignment: cTopLeading })(
                                ...ForEach(this.model)(item =>
                                    AnalyseModelTileBox(item, this.menuItems).onDbClick(() => this.AnalyseModelSelected(item))
                                )
                            ).width().height().padding(10).wrap('wrap')
                    )
                )
            )
        }
    }

    public LoadView(): any {
        return this.AnalyseModelView();
    }
}

export function ProjectController(project: IProjectModel): ProjectControllerClass {
    return new ProjectControllerClass().Bind(project);
}
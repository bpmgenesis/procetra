import { UIController, UIView, Text, HDivider, VStack, cTopLeading, HStack, Icon, cLeading, Spacer, Color, ZStack, ForEach, UIScene, State, UIContextMenu } from '@tuval/forms';
import { HeadLineButton } from '../../../UI/Views/HeadLineButton';
import { Headline3, SectionHeadline, SectionSubHeadline, Headline5, RegularText, AnimHeadline5 } from '../../../UI/Views/Texts';
import { TileBox } from '../../../UI/Views/TileBox';
import { MVIAnalyseModel } from '../Models/MVIAnalyseModel';
import { AnalyseModelTileBox } from '../Views/AnalyseModelTileBox';
import { Event } from '@tuval/core';
import { AnalyseModelUIService } from '../../../UI/UIServices/AnalyseModelUIService';
import { Services } from '../../../Services/Services';
import { MIProject } from '../../Project/Models/ProjectModel';
import { MVITitleMenu } from '../Models/MVITitleMenu';
import { DatasetController } from '../../Dataset/Controllers/DatasetController';

export class AnalyseModelsController extends UIController {
    public AnalyseModelSelected: Event<any>;

    private menuItems: MVITitleMenu[];

    private newMenuItems: any;
    @State()
    private project: MIProject;

    @State()
    public model: MVIAnalyseModel[];

    @State()
    public selectedAnalyseModel: MVIAnalyseModel;

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

    public OnBindModel(project: MIProject) {
        this.project = project;
        const session_id = Services.StateService.GetSessionId();
        Services.ProjectService.GetAnalyseModels(session_id, 'bpmgenesis', project.project_id).then(analyseModels => {
            this.model = analyseModels;
        });
    }
    private OnAddEditAnalyseModelName(): void {
        AnalyseModelUIService.AddEditAnalyseModelName().then((name: string) => {

            // Adding to our project
            const session_id = Services.StateService.GetSessionId();
            Services.ProjectService.CreateAnalyseModel(session_id, 'bpmgenesis', this.project.project_id, name).then(analyseModelInfo => {
                debugger;
                const models = Array.from(this.model); // for immutable array
                models.push({ name: analyseModelInfo.name })
                this.model = models; // updating state
                //this.ForceUpdate();
            });

        });
    }

    private OnSelectedAnalyseModelChange(item: MVIAnalyseModel): void {
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
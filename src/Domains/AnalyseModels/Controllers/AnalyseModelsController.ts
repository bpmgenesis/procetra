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

const newMenuItems = [
    {
        icon: '\\efd5',
        iconColor: 'black',
        title: 'Add Mining Model',
        onClick: (item) => console.log(item)
    }
]
export class AnalyseModelsController extends UIController {
    public AnalyseModelSelected: Event<any>;

    private menuItems: MVITitleMenu[];
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
                icon: '\\f0a0',
                iconColor: 'black',
                title: 'Rename',
                onClick: (item) => console.log(item)
            },
            {
                icon: '\\f07c',
                iconColor: 'black',
                title: 'Permissions',
                onClick: (item) => console.log(item)
            },
            {
                icon: '\\eff3',
                iconColor: 'black',
                title: 'Publish',
                onClick: (item) => console.log(item)
            },
            {
                icon: '\\f122',
                iconColor: 'black',
                title: 'Duplicate',
                onClick: (item) => console.log(item)
            },
            {
                icon: '\\f0b2',
                iconColor: 'black',
                title: 'Tags',
                onClick: (item) => console.log(item)
            },
            {
                icon: '\\f071',
                iconColor: 'black',
                title: 'Move To',
                onClick: (item) => console.log(item)
            },
            {
                icon: '\\f07e',
                iconColor: 'red',
                title: 'Delete',
                onClick: (item) => console.log(item)
            }
        ]
    }

    public OnBindModel(project: MIProject) {
        debugger;
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
                            Icon('\\f04f').size(30),
                            AnimHeadline5('Ticket Management').marginVertical(10),
                            Spacer(),
                            HStack({ spacing: 5 })(
                                UIContextMenu(
                                    ...ForEach(newMenuItems)(item =>
                                        HStack({ alignment: cLeading, spacing: 10 })(
                                            Icon(item.icon).size(20).foregroundColor(item.iconColor),
                                            Text(item.title).foregroundColor(item.iconColor)
                                        )
                                    )
                                )(
                                    HeadLineButton('', '\\efff'),
                                ).cursor('pointer').border('solid 1px var(--sub-border-color)').transition('border .3s'),
                                HeadLineButton('', '\\f0a0').action(() => this.OnAddEditAnalyseModelName()),
                                HeadLineButton('', '\\f07c').action(() => this.OnAddEditAnalyseModelName()),
                                HeadLineButton('', '\\f122').action(() => this.OnAddEditAnalyseModelName()),
                                HeadLineButton('', '\\f0b2').action(() => this.OnAddEditAnalyseModelName()),
                                HeadLineButton('', '\\f071').action(() => this.OnAddEditAnalyseModelName()),
                                HeadLineButton('', '\\f07e').action(() => this.OnAddEditAnalyseModelName()),
                                HeadLineButton('', '\\f000').action(() => onCloseProject())
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
                                AnalyseModelTileBox(item, this.menuItems).onClick(() => this.AnalyseModelSelected(item))
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
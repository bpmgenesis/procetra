import { UIController, UIView, Text, HDivider, VStack, cTopLeading, HStack, Icon, cLeading, Spacer, Color, ZStack, _ForEach, UIScene, State, UIContextMenu } from '@tuval/forms';
import { HeadLineButton } from '../../../UI/Views/HeadLineButton';
import { Headline3, SectionHeadline, SectionSubHeadline, Headline5, RegularText } from '../../../UI/Views/Texts';
import { TileBox } from '../../../UI/Views/TileBox';
import { MVIAnalyseModel } from '../Models/MVIAnalyseModel';
import { AnalyseModelTileBox } from '../Views/AnalyseModelTileBox';
import { Event } from '@tuval/core';
import { AnalyseModelUIService } from '../../../UI/UIServices/AnalyseModelUIService';
import { Services } from '../../../Services/Services';
import { MIProject } from '../../Project/Models/ProjectModel';
import { MVITitleMenu } from '../Models/MVITitleMenu';

export class AnalyseModelsController extends UIController {
    public AnalyseModelSelected: Event<any>;

    private menuItems: MVITitleMenu[];
    @State()
    private project: MIProject;

    @State()
    public model: MVIAnalyseModel[];

    protected InitController() {
        this.AnalyseModelSelected = new Event();
        this.menuItems = [
            {
                icon: '\\f0a0',
                title: 'Rename',
                onClick: (item) => console.log(item)
            },
            {
                icon: '\\f07c',
                title: 'Permissions',
                onClick: (item) => console.log(item)
            },
            {
                icon: '\\f122',
                title: 'Duplicate',
                onClick: (item) => console.log(item)
            },
            {
                icon: '\\f0b2',
                title: 'Tags',
                onClick: (item) => console.log(item)
            },
            {
                icon: '\\f071',
                title: 'Move To',
                onClick: (item) => console.log(item)
            },
            {
                icon: '\\f07e',
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
    public LoadView(): UIView {
        return (
            UIScene(
                VStack({ alignment: cTopLeading })(
                    HStack({ alignment: cLeading, spacing: 10 })(
                        Icon('\\f04f').size(30),
                        Headline5('Ticket Management').marginVertical(10),
                        Spacer(),
                        HStack(
                            HeadLineButton('', '\\f0a0').action(() => this.OnAddEditAnalyseModelName()),
                            HeadLineButton('New Analyse Model').action(() => this.OnAddEditAnalyseModelName())
                        ).width()
                    ).height(), //auto height
                    HStack({ alignment: cLeading, spacing: 10 })(
                        Icon('\\f109').size(20),
                        SectionHeadline('Analyse Models'),
                        Spacer(),
                        HStack(
                            HeadLineButton('New Analyse Model').action(() => this.OnAddEditAnalyseModelName())
                        ).width() //auto width
                    ).height(),
                    HDivider().marginVertical(10).height(1).background('rgb(120,120,120,50%)'),
                    HStack({ alignment: cTopLeading })(
                        ..._ForEach(this.model)(item =>
                            AnalyseModelTileBox(item, this.menuItems)
                        )
                    ).width().height().padding(10).wrap('wrap')
                )
            )
        )
    }
}
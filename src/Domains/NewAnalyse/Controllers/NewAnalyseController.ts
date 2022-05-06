import { is } from '@tuval/core';
import { UIController, UIScene, Text, ForEach, HStack, cTopLeading, VStack, Icon, ScrollView, TextField, State, Context } from '@tuval/forms';
import { PageTitle } from '../../../UI/Views/PageHeader';
import { RegularText } from '../../../UI/Views/Texts';
import { AutomationController } from '../../Automation/Controllers/AutomationController';
import { CaseExplorerController } from '../../CaseExplorer/Controllers/CaseExplorerController';
import { ProcessDashboardController } from '../../Dashboard/Controllers/ProcessDashboardController';
import { ProcessExplorerController } from '../../Discovery/Controllers/ProcessExplorerController';
import { LoopsController } from '../../Loops/Controllers/LoopsController';
import { MonitoringController } from '../../Monitoring/Controllers/MonitoringController';
import { ProcessOverviewController } from '../../ProcessOverview/Controllers/ProcessOverviewController';
import { ProcessStatisticController } from '../../Statistics/Controllers/ProcessStatisticController';
import { VariantExplorerController } from '../../VariantExplorer/Controllers/VariantExplorerController';

export interface MVINewAnalyseModelSelection {
    icon?: string;
    title: string;
    description?: string;
    controller?: UIController
}
const NewAnalyseTypes: MVINewAnalyseModelSelection[] = [

    {
        icon: '\\f0b4',
        title: 'Process Overview',
        description: 'An overhead view of your process',
        controller: new ProcessOverviewController(),
    },
    {
        icon: '\\f0b3',
        title: 'New Dashboard',
        description: 'A new dashboard waiting to be built.',
        controller: new ProcessDashboardController(),
    },
    {
        icon: '\\f0f8',
        title: 'Discover',
        description: 'To understand and analyze your business',
        controller: new ProcessExplorerController(),
    },
    {
        icon: '\\f0a1',
        title: 'Monitoring',
        description: 'Follow the process indicators',
        controller: new MonitoringController(),
    },
    {
        icon: '\\f0f2',
        title: 'Statistics',
        description: 'General statistics of the process',
        controller: new ProcessStatisticController(),
    },
    {
        icon: '\\f13b',
        title: 'Variant Explorer',
        controller: new VariantExplorerController(),
    },
    {
        icon: '\\f096',
        title: 'Loops',
        controller: new LoopsController(),
    },
    {
        icon: '\\f049',
        title: 'Automation',
        controller: new AutomationController(),
    },
    {
        icon: '\\f033',
        title: 'Case Explorer',
        controller: new CaseExplorerController(),
    },
    {
        icon: '\\f07f',
        title: 'Difference Analyse'
    },
    {
        icon: '\\eff0',
        title: 'Benchmarking'
    },
    {
        icon: '\\f143',
        title: 'Lead Times'
    },
    {
        icon: '\\efe4',
        title: 'Process Steps'
    },
    {
        icon: '\\eff1',
        title: 'Complience Analyse'
    },
    {
        icon: '\\eff2',
        title: 'Comformance Check'
    },
    {
        icon: '\\eff4',
        title: 'Social'
    },
    {
        icon: '\\f04b',
        title: 'Process AI'
    },
    {
        icon: '\\f014',
        title: 'Cost'
    },
    {
        icon: '\\f001',
        title: 'Forecast'
    },
    {
        icon: '\\effa',
        title: 'Mosts'
    },
    {
        icon: '\\f01e',
        title: 'Bottlenecks'
    },
    {
        icon: '\\efdf',
        title: 'Durations'
    }
]

function NewAnalyseModelTitleBox(tag: string, { icon, title, description, controller }: MVINewAnalyseModelSelection) {
    return ({ OnNewAnalyse }) => {
        return (
            VStack(
                icon && Icon(icon).size(50).foregroundColor('#33333366').marginBottom('20px'),
                RegularText(title).fontSize('18px').searchWords([tag]),
                description && RegularText(description).fontSize('12px')
            )
                .marginTop('10px')
                .marginRight('10px')
                .cornerRadius(10)
                .width(240).height(150)
                .backgroundColor('rgba(255,255,255,0.3)')
                .shadow('rgb(0 0 0 / 2%) 0px 1px 3px 0px, rgb(27 31 35 / 15%) 0px 0px 0px 1px')
                .initial({ opacity: 0 }).animate({ opacity: 1 })
                .onClick(() => OnNewAnalyse({
                    icon: icon,
                    name: title,
                    controller: controller,
                    isVisible: () => true
                }))
        )
    }

}

function searchBox(): any {
    return ({ onSearchTextChanged }) => {
        return (
            HStack(
                HStack(
                    Icon('\\f004')
                        .size(20)
                        .paddingRight('10px')
                        .paddingLeft('10px'),
                    TextField().fontSize('1rem')
                        .backgroundColor('transparent')
                        .foregroundColor('#495057')
                        .padding('0.75rem 0.75rem 0.75rem 0rem')
                        .onTextChange((text) => { setTimeout(() => onSearchTextChanged(text), 100) })
                )
                    .width()
                    .initial({ width: '50%', backgroundColor: 'rgba(255,255,255,0.3)' }).animate({ width: '50%' }).focus({ width: '80%', backgroundColor: 'rgba(255,255,255,0.6)' })
                    .paddingRight('5px')
                    .overflow('hidden')
                    .cornerRadius(20)
                    .border({ default: '1px solid #ced4da', focus: 'solid 1px #6366F1' })
                    .shadow({ default: '', focus: '0 0 0 0.2rem #c7d2fe' })
                    //.transition('background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s')
                    //.backgroundColor('rgba(255,255,255,0.3)')
                    .height()
                    .tabIndex(0)
            ).height().marginVertical(20)
        )
    }

}
export class NewAnalyseController extends UIController {
    @State()
    private searchText: string;

    @Context()
    private onSearchTextChanged(value: string) {
        this.searchText = value;
    }
    public LoadView() {
        return (
            UIScene(
                VStack({ alignment: cTopLeading })(
                    PageTitle('\\f0a1', 'Add New Analyse'),
                    searchBox(),
                    ScrollView(
                        HStack({ alignment: cTopLeading, spacing: 10 })(
                            ...ForEach(NewAnalyseTypes)(item =>
                                (is.nullOrEmpty(this.searchText) ||
                                    item.title.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1)
                                && NewAnalyseModelTitleBox(this.searchText, item) as any
                            )
                        ).wrap('wrap').height().padding(10)
                    )
                )
            )
        )
    }
}
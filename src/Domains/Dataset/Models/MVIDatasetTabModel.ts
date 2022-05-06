import { UIController, TApplication } from '@tuval/forms';
import { AutomationController } from '../../Automation/Controllers/AutomationController';
import { CaseExplorerController } from '../../CaseExplorer/Controllers/CaseExplorerController';
import { ProcessDashboardController } from '../../Dashboard/Controllers/ProcessDashboardController';
import { ProcessExplorerController } from '../../Discovery/Controllers/ProcessExplorerController';
import { FilterController } from '../../Filter/Controllers/FilterController';
import { LoopsController } from '../../Loops/Controllers/LoopsController';
import { MonitoringController } from '../../Monitoring/Controllers/MonitoringController';
import { ProcessOverviewController } from '../../ProcessOverview/Controllers/ProcessOverviewController';
import { ProcessStatisticController } from '../../Statistics/Controllers/ProcessStatisticController';
import { VariantExplorerController } from '../../VariantExplorer/Controllers/VariantExplorerController';
import { NewAnalyseController } from '../../NewAnalyse/Controllers/NewAnalyseController';

export interface MVIDatasetTabModel {
    icon: string;
    name: string;
    controller: UIController;
    isVisible: () => boolean
}

export const topModels: MVIDatasetTabModel[] = [
    {
        icon: '\\efc2',
        name: 'New Analyse',
        controller: new NewAnalyseController(),
        isVisible: () => TApplication.IsDesktop
    },
   /*  {
        icon: '\\f0b4',
        name: 'Process Overview',
        controller: new ProcessOverviewController(),
        isVisible: () => true
    },
    {
        icon: '\\f0b3',
        name: 'Dashboard',
        controller: new ProcessDashboardController(),
        isVisible: () => true
    },
    {
        icon: '\\f0f8',
        name: 'Discovery',
        controller: new ProcessExplorerController(),
        isVisible: () => true
    },
    {
        icon: '\\f0a1',
        name: 'Monitoring',
        controller: new MonitoringController(),
        isVisible: () => true
    },
    {
        icon: '\\f0f2',
        name: 'Statistics',
        controller: new ProcessStatisticController(),
        isVisible: () => true
    },
    {
        icon: '\\f13b',
        name: 'Variant Explorer',
        controller: new VariantExplorerController(),
        isVisible: () => true
    },
    {
        icon: '\\f096',
        name: 'Loops',
        controller: new LoopsController(),
        isVisible: () => true
    },
    {
        icon: '\\f049',
        name: 'Automation',
        controller: new AutomationController(),
        isVisible: () => true
    },
    {
        icon: '\\f033',
        name: 'Case Explorer',
        controller: new CaseExplorerController(),
        isVisible: () => true
    },
    {
        icon: '\\f130',
        name: 'Filter',
        controller: new FilterController(),
        isVisible: () => true
    } */
];
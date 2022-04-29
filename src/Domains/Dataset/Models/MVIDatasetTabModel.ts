import { UIController } from '@tuval/forms';
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

export interface MVIDatasetTabModel {
    icon: string;
    name: string;
    controller: UIController;
}

export const topModels:MVIDatasetTabModel[] = [
    {
        icon: '\\efc2',
        name: 'New Analyse',
        controller: new ProcessOverviewController()
    },
    {
        icon: '\\f0b4',
        name: 'Process Overview',
        controller: new ProcessOverviewController()
    },
    {
        icon: '\\f0b3',
        name: 'Dashboard',
        controller: new ProcessDashboardController()
    },
    {
        icon: '\\f0f8',
        name: 'Discovery',
        controller: new ProcessExplorerController()
    },
    {
        icon: '\\f0a1',
        name: 'Monitoring',
        controller: new MonitoringController()
    },
    {
        icon: '\\f0f2',
        name: 'Statistics',
        controller: new ProcessStatisticController()
    },
    {
        icon: '\\f13b',
        name: 'Variant Explorer',
        controller: new VariantExplorerController()
    },
    {
        icon: '\\f096',
        name: 'Loops',
        controller: new LoopsController()
    },
    {
        icon: '\\f049',
        name: 'Automation',
        controller: new AutomationController()
    },
    {
        icon: '\\f033',
        name: 'Case Explorer',
        controller: new CaseExplorerController()
    },
    {
        icon: '\\f130',
        name: 'Filter',
        controller: new FilterController()
    }
];
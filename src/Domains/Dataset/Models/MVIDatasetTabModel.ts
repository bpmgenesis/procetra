import { TApplication, UIController } from '@tuval/forms';

import { NewAnalyseController } from '../../NewAnalyse/Controllers/NewAnalyseController';

export interface MVIDatasetTabModel {
    id: string;
    icon: string;
    name: string;
    isRight: boolean;
    controller: UIController;
    isVisible: () => boolean
}

export const topModels: MVIDatasetTabModel[] = [
    {
        id: 'new_analysis',
        icon: '\\d1ea',
        name: 'New Analysis',
        isRight: true,
        controller: new NewAnalyseController(),
        isVisible: () => TApplication.IsDesktop
    },
    {
        id: 'model_filters',
        icon: '\\ef4f',
        name: 'Model Filters',
        isRight: true,
        controller: new NewAnalyseController(),
        isVisible: () => TApplication.IsDesktop
    }
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
import { MVINewAnalyseModelSelection } from './MVINewAnalyseModelSelection';
import { ProcessOverviewController } from '@procetra/modules/processoverview';
import { ProcessDashboardController } from '../../../modules/Dashboard/Controllers/ProcessDashboardController';
import { ProcessExplorerController } from '../../../modules/Discovery/Controllers/ProcessExplorerController';
import { MonitoringController } from '../../../modules/Monitoring/Controllers/MonitoringController';
import { ProcessStatisticController } from '@procetra/modules/statistic';
import { VariantExplorerController } from '../../../modules/VariantExplorer/Controllers/VariantExplorerController';
import { LoopsController } from '../../../modules/Loops/Controllers/LoopsController';
import { AutomationController } from '../../../modules/Automation/Controllers/AutomationController';
import { CaseExplorerController } from '../../../modules/CaseExplorer/Controllers/CaseExplorerController';


export const NewAnalyseTypes: MVINewAnalyseModelSelection[] = [
    {
        id: 'process_overview',
        icon: '\\d2dc',
        title: 'Process Overview',
        description: 'An overhead view of your process',
        controller: new ProcessOverviewController(),
    },
    {
        id: 'dashboard',
        icon: '\\d2db',
        title: 'Dashboard',
        description: 'A new dashboard waiting to be built.',
        controller: new ProcessDashboardController(),
    },
    {
        id: 'process_discover',
        icon: '\\d320',
        title: 'Discover',
        description: 'To understand and analyze your business',
        controller: new ProcessExplorerController(),
    },
    {
        id: 'monitoring',
        icon: '\\d2c9',
        title: 'Monitoring',
        badge: 'New',
        description: 'Follow the process indicators',
        controller: new MonitoringController(),
    },
    {
        id: 'statistics',
        icon: '\\d31a',
        title: 'Statistics',
        badge: 'Updated',
        description: 'General statistics of the process',
        controller: new ProcessStatisticController(),
    },
    {
        id: 'variant_explorer',
        icon: '\\d203',
        title: 'Variant Explorer',
        badge: 'New',
        controller: new VariantExplorerController(),
    },
    {
        id: 'loops',
        icon: '\\e028',
        title: 'Loops',
        badge: 'Preview',
        controller: new LoopsController(),
    },
    {
        id: 'automation',
        icon: '\\d271',
        title: 'Automation',
        controller: new AutomationController(),
    },
    {
        id: 'case_explorer',
        icon: '\\d25b',
        title: 'Case Explorer',
        controller: new CaseExplorerController(),
    },
    {
        id: 'difference_analyse',
        icon: '\\d2a7',
        title: 'Difference Analyse'
    },
    {
        id: 'benchmarking',
        icon: '\\d218',
        title: 'Benchmarking'
    },
    {
        id: 'lead_times',
        icon: '\\d36b',
        title: 'Lead Times'
    },
    {
        id: 'process_steps',
        icon: '\\efe4',
        title: 'Process Steps'
    },
    {
        id: 'complience_analysis',
        icon: '\\d219',
        title: 'Complience Analysis'
    },
    {
        id: 'comformance_check',
        icon: '\\d21a',
        title: 'Comformance Check'
    },
    {
        id: 'social',
        icon: '\\d21c',
        title: 'Social'
    },
    {
        id: 'process_ai',
        icon: '\\d273',
        title: 'Process AI'
    },
    {
        id: 'costs',
        icon: '\\d23c',
        title: 'Cost'
    },
    {
        id: 'forecast',
        icon: '\\d229',
        title: 'Forecast'
    },
    {
        id: '',
        icon: '\\d222',
        title: 'Mosts'
    },
    {
        id: 'bottlenecks',
        icon: '\\d246',
        title: 'Bottlenecks'
    },
    {
        id: 'durations',
        icon: '\\d207',
        title: 'Durations'
    },
    {
        id: 'breakdown',
        icon: '\\d210',
        title: 'Breakdown'
    },
    {
        id: 'distribution',
        icon: '\\d27c',
        title: 'Distribution'
    },
    {
        id: 'metrics',
        icon: '\\d290',
        title: 'Metrics'
    }
]
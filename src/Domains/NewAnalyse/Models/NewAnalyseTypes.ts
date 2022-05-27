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
        icon: '\\d2dc',
        title: 'Process Overview',
        description: 'An overhead view of your process',
        controller: new ProcessOverviewController(),
    },
    {
        icon: '\\d2db',
        title: 'Dashboard',
        description: 'A new dashboard waiting to be built.',
        controller: new ProcessDashboardController(),
    },
    {
        icon: '\\d320',
        title: 'Discover',
        description: 'To understand and analyze your business',
        controller: new ProcessExplorerController(),
    },
    {
        icon: '\\d2c9',
        title: 'Monitoring',
        badge:'New',
        description: 'Follow the process indicators',
        controller: new MonitoringController(),
    },
    {
        icon: '\\d31a',
        title: 'Statistics',
        badge:'Updated',
        description: 'General statistics of the process',
        controller: new ProcessStatisticController(),
    },
    {
        icon: '\\d203',
        title: 'Variant Explorer',
        badge:'New',
        controller: new VariantExplorerController(),
    },
    {
        icon: '\\e028',
        title: 'Loops',
        badge:'Preview',
        controller: new LoopsController(),
    },
    {
        icon: '\\d271',
        title: 'Automation',
        controller: new AutomationController(),
    },
    {
        icon: '\\d25b',
        title: 'Case Explorer',
        controller: new CaseExplorerController(),
    },
    {
        icon: '\\d2a7',
        title: 'Difference Analyse'
    },
    {
        icon: '\\d218',
        title: 'Benchmarking'
    },
    {
        icon: '\\d36b',
        title: 'Lead Times'
    },
    {
        icon: '\\efe4',
        title: 'Process Steps'
    },
    {
        icon: '\\d219',
        title: 'Complience Analyse'
    },
    {
        icon: '\\d21a',
        title: 'Comformance Check'
    },
    {
        icon: '\\d21c',
        title: 'Social'
    },
    {
        icon: '\\d273',
        title: 'Process AI'
    },
    {
        icon: '\\d23c',
        title: 'Cost'
    },
    {
        icon: '\\d229',
        title: 'Forecast'
    },
    {
        icon: '\\d222',
        title: 'Mosts'
    },
    {
        icon: '\\d246',
        title: 'Bottlenecks'
    },
    {
        icon: '\\d207',
        title: 'Durations'
    },
    {
        icon: '\\d210',
        title: 'Breakdown'
    },
    {
        icon: '\\d27c',
        title: 'Distribution'
    },
    {
        icon: '\\d290',
        title: 'Metrics'
    }
]
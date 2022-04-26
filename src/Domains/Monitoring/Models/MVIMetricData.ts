import { SparklineModel } from '@tuval/components/charts';
export interface MVIMetricData {
    name: string,
    chart: SparklineModel,
    value: string,
    subValue: string
}
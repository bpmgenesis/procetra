import { int, Convert, TMath } from '@tuval/core';
export class ActivityStatistics {
    public static GetFrequencyDfgTotalActivities(frequencyDfg: any): int {
        let result = 0;
        for (let key in frequencyDfg.activities) {
            result += frequencyDfg.activities[key];
        }
        return result;
    }
    public static GetFrequencyDfgActivityWeight(frequencyDfg: any, activityCount: int, step: int): int {
        let result = ActivityStatistics.GetFrequencyDfgTotalActivities(frequencyDfg);
        const modula = Convert.ToInt32(result / step);
        const weight = Convert.ToInt32(activityCount / modula) + 1;
        return TMath.Clamp(weight, 1, step);
    }
}
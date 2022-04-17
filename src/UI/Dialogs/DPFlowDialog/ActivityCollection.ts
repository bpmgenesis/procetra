import { List, int } from '@tuval/core';
import { Activity } from './Activities/Activity';
import { DPFControl } from './DPFControl';
import { IDataSourceActivity } from './Activities/IDataSourceActivity';
export class ActivityCollection extends List<Activity> {
    public DPFControl: DPFControl = null as any;
    public constructor(DPFControl: DPFControl) {
        super();
        this.DPFControl = DPFControl;
    }

    public Add(treeNode: Activity): int {
        const result = super.Add(treeNode);
        if (this.DPFControl != null) {
            this.DPFControl.ForceUpdate();
        }
        return result;
    }
}

export class DataSourceActivityCollection extends List<IDataSourceActivity> {
    public DPFControl: DPFControl = null as any;
    public constructor(DPFControl: DPFControl) {
        super();
        this.DPFControl = DPFControl;
    }

    public Add(treeNode: IDataSourceActivity): int {
        const result = super.Add(treeNode);
        if (this.DPFControl != null) {
            this.DPFControl.ForceUpdate();
        }
        return result;
    }
}

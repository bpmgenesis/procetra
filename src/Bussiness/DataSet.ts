import { Guid, clone } from '@tuval/core';
import { IActivityInfoBag } from './IDataSet';
/* export abstract class DataSetBase implements IDataSet {
    public ProjectId: string;
    public Id: string;
    public DonorId: string;
    public Name: string;
    public CreatedDate: DateTime;
    public Data: any;
    public EventLog: EventLog;
    public ConditionRules: string;
} */


export class DataSet {
    public ProjectId: string;
    public Id: string;
    public ParentDataSetId: string;
    public Name: string;
    public EventLog: any;
    public Separator: string = ',';
    public CaseColumn: string = 'case:concept:name';
    public ActivityColumn: string = 'concept:name';
    public TimeStampColumn: string = 'time:timestamp';
    public StartDateColumn: string = 'time:startdate';
    public CostColumn: string = 'concept:cost';
    public DateFormat: string = 'd.M.yy H:mm';
    public ActivityInfo: IActivityInfoBag;
    public FilteredData: any[];
    public ConditionRules: string;


    public constructor(projectId: string);
    public constructor(projectId: string, parent:string);
    public constructor(...args: any[]) {
        if (args.length === 1) {
            this.ProjectId = args[0];
            this.Id = Guid.NewGuid().ToString();
        } else if (args.length === 2) {
            this.ProjectId = args[0];
            this.ParentDataSetId = args[1];
            this.Id = Guid.NewGuid().ToString();
        }
    }

}




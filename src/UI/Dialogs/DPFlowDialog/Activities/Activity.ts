import { Control, ContainerControl } from '@tuval/forms';
import type { DPFControl } from '../DPFControl';

export let CurrentActivityType: string = null;

export enum ActivityTypes {
    Start = 'Start',
    End = 'End',
    ImportCsv = 'ImportCsv',
    ImportXlsx = 'ImportXlsx',
    MSSql = "MSSql",
    eBA = 'eBA',
    Ensemble = 'Ensemble',
    SelectDataSource = 'SelectDataSource',
    LoadEventData = 'LoadEventData',
    DeleteDublucates = 'DeleteDublucates',
    ChangeCase = 'ChangeCase',
    JoinColumns = 'JoinColumns',
    ChangeType = 'ChangeType',
    CombineTimestamp = 'CombineTimestamp',
    CreateTimestamp = 'CreateTimestamp',
    DateDiff = 'DateDiff',
    DateAdd = 'DateAdd',
    Delete = 'Delete',
    DeriveField = 'DeriveField',
    RemoveSubstring = 'RemoveSubstring',
    ReplaceSubstring = 'ReplaceSubstring',
    RoundTimestamp = 'RoundTimestamp',
    Trim = 'Trim',
    MergeDataset = 'MergeDataset'
}

export abstract class Activity {
    public abstract Config();
    public abstract Init();
    public abstract Render();
    public Serialize() {

    }
    protected constructor() {

    }
}

export abstract class ActivityBase extends Activity {
    protected parent: DPFControl;
    protected Variables: any;
    public constructor(control: DPFControl) {
        super();
        this.parent = control;
        this.Variables = (control as any).Variables;
    }
}
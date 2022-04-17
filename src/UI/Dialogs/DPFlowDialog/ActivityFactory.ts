import { ImportEBAActivity } from './Activities/ImportEBAProcess';
import { Control, ContainerControl } from '@tuval/forms';
import { TrimActivity } from './Activities/Trim';
import { RoundTimestampActivity } from './Activities/RoundTimestamp';
import { ReplaceSubstringActivity } from './Activities/ReplaceSubstring';
import { RemoveSubstringActivity } from './Activities/RemoveSubstringActivity';
import { DeriveFieldActivity } from './Activities/DeriveFieldActivity';
import { DeleteActivity } from './Activities/DeleteActivity';
import { DateAddActivity } from './Activities/DateAddActivity';
import { DateDiffActivity } from './Activities/DateDiffActivity';
import { CreateTimestampActivity } from './Activities/CreateTimestampActivity';
import { CombineTimestampActivity } from './Activities/CombineTimestamp';
import { Activity, ActivityTypes } from './Activities/Activity';
import { ChangeCaseActivity } from './Activities/ChangeCase/ChangeCase';
import { ChangeTypeActivity } from './Activities/ChangeTypeActivity';
import { DeleteDublucatesActivity } from './Activities/DeleteDublicates';
import { JoinActivity } from './Activities/JoinColumns/JoinActivity';
import { LoadEventData } from './Activities/LoadEventData';
import { ImportCsv } from './Activities/ImportCsvActivity';
import type { DPFControl } from './DPFControl';
import { ImportXlsx } from './Activities/ImportXlsx';
import { MergeDatasetActivity } from './Activities/MergeDatasetActivity/MergeDatasetActivity';
import { MSSqlActivity } from './Activities/MSSqlActivity';
import { ImportEnsembleActivity } from './Activities/ImportEnsembleActivity';


export class ActivityFactory {
    public static Create(parent: DPFControl, activity_type: ActivityTypes) {
        let control: Activity = null;
        switch (activity_type) {
            case ActivityTypes.ImportCsv:
                control = new ImportCsv(parent);
                control.Init();
                return control;
            case ActivityTypes.ImportXlsx:
                control = new ImportXlsx(parent);
                control.Init();
                return control;
            case ActivityTypes.MSSql:
                control = new MSSqlActivity(parent);
                control.Init();
                return control;
            case ActivityTypes.eBA:
                control = new ImportEBAActivity(parent);
                control.Init();
                return control;
            case ActivityTypes.Ensemble:
                control = new ImportEnsembleActivity(parent);
                control.Init();
                return control;
            case ActivityTypes.LoadEventData:
                control = new LoadEventData(parent);
                control.Init();
                return control;
            case ActivityTypes.DeleteDublucates:
                control = new DeleteDublucatesActivity(parent);
                control.Init();
                return control;
            case ActivityTypes.ChangeCase:
                control = new ChangeCaseActivity(parent);
                control.Init();
                return control;
            case ActivityTypes.JoinColumns:
                control = new JoinActivity(parent);
                control.Init();
                return control;
            case ActivityTypes.ChangeType:
                control = new ChangeTypeActivity(parent);
                control.Init();
                return control;
            case ActivityTypes.CombineTimestamp:
                control = new CombineTimestampActivity(parent);
                control.Init();
                return control;
            case ActivityTypes.CreateTimestamp:
                control = new CreateTimestampActivity(parent);
                control.Init();
                return control;
            case ActivityTypes.DateDiff:
                control = new DateDiffActivity(parent);
                control.Init();
                return control;
            case ActivityTypes.DateAdd:
                control = new DateAddActivity(parent);
                control.Init();
                return control;
            case ActivityTypes.Delete:
                control = new DeleteActivity(parent);
                control.Init();
                return control;
            case ActivityTypes.DeriveField:
                control = new DeriveFieldActivity(parent);
                control.Init();
                return control;
            case ActivityTypes.RemoveSubstring:
                control = new RemoveSubstringActivity(parent);
                control.Init();
                return control;
            case ActivityTypes.ReplaceSubstring:
                control = new ReplaceSubstringActivity(parent);
                control.Init();
                return control;
            case ActivityTypes.RoundTimestamp:
                control = new RoundTimestampActivity(parent);
                control.Init();
                return control;
            case ActivityTypes.Trim:
                control = new TrimActivity(parent);
                control.Init();
                return control;
            case ActivityTypes.MergeDataset:
                control = new MergeDatasetActivity(parent);
                control.Init();
                return control;
        }
        return control;
    }
    public static CreateDatasource(parent: DPFControl, activity_type: ActivityTypes) {
        let control: Activity = null;
        switch (activity_type) {
            case ActivityTypes.ImportCsv:
                control = new ImportCsv(parent);
                control.Init();
                return control;
            case ActivityTypes.ImportXlsx:
                control = new ImportXlsx(parent);
                control.Init();
                return control;
            case ActivityTypes.MSSql:
                control = new MSSqlActivity(parent);
                control.Init();
                return control;
            case ActivityTypes.eBA:
                control = new ImportEBAActivity(parent);
                control.Init();
                return control;
            case ActivityTypes.Ensemble:
                control = new ImportEnsembleActivity(parent);
                control.Init();
                return control;
        }
        return control;
    }

}
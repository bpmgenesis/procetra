import { DataSet } from "./DataSet";
import { IDataSet } from "./IDataSet";
import { clone } from '@tuval/core';

export class DataSetUtils {
    public static Clone(dataset: IDataSet): DataSet {
        const clonedDataset = new DataSet(dataset.ProjectId, dataset.Id);
        clonedDataset.Name = dataset.Name + '_Copy';
        clonedDataset.EventLog = clone(dataset.EventLog);
        clonedDataset.Separator = dataset.Separator;
        clonedDataset.CaseColumn = dataset.CaseColumn;
        clonedDataset.ActivityColumn = dataset.ActivityColumn;
        clonedDataset.TimeStampColumn = dataset.TimeStampColumn;
        clonedDataset.StartDateColumn = dataset.StartDateColumn;
        return clonedDataset;
    }
}
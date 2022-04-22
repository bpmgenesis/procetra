import { List } from '@tuval/core';
import { IDataSet } from './IDataSet';
export interface IProject {
    Id: string;
    Name: string;
    DataSets?: IDataSet[];
}
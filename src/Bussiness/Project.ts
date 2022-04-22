import { List } from '@tuval/core';
import { IDataSet } from './IDataSet';
import { IProject } from './IProject';
import {Guid} from '@tuval/core';
export class Project implements IProject {
    Id: string;
    Name: string;
    DataSets: IDataSet[] = [];
    public constructor(name: string) {
        this.Id = Guid.NewGuid().ToString()
        this.Name = name;
    }
}
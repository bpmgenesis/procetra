import { Type } from '@tuval/core';
export abstract class IDataObject {
    abstract GetData(format: string): any;
    abstract GetData(format: Type): any;
    abstract GetData(format: string, autoConvert: boolean): any;
    abstract GetDataPresent(format: string): boolean;
    abstract GetDataPresent(format: Type): boolean;
    abstract GetDataPresent(format: string, autoConvert: boolean): boolean;
    abstract GetFormats(): string[];
    abstract GetFormats(autoConvert: boolean): string[];
    abstract SetData(data: any): void;
    abstract SetData(format: string, data: any): void;
    abstract SetData(format: Type, data: any): void;
    abstract SetData(format: string, autoConvert: boolean, data: any): void;
}
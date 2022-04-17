import { Type, Dictionary, Guid, is } from '@tuval/core';
import { IDataObject } from "./IDataObject";

const DragAndDropPool: Dictionary<string, Dictionary<string, any>> = new Dictionary();

export class DataObject implements IDataObject {
    public static CurrentDataObject: IDataObject;
    private dataTransfer: DataTransfer;
    private data: Dictionary<string, any>;
    private id: string;
    public constructor();
    public constructor(id: string, dataTransfer: DataTransfer);
    public constructor(dataTransfer: DataTransfer);
    public constructor(...args: any[]) {
        if (args.length === 0) {
            this.id = Guid.NewGuid().ToString();
            this.data = new Dictionary();
        } else if (args.length === 1 && args[0] instanceof DataTransfer) {
            const dataTransfer: DataTransfer = args[0];
            this.id = Guid.NewGuid().ToString();
            this.dataTransfer = dataTransfer;
            this.dataTransfer.setData('text', this.id);
            this.data = new Dictionary();
            DragAndDropPool.Set(this.id, this.data);
        } else {
            this.id = args[0];
            this.dataTransfer = args[1];
            this.data = DragAndDropPool.Get(this.id);
            if (this.data == null) {
                this.dataTransfer.effectAllowed = 'none';
            }
        }
    }
    GetData(format: string): void;
    GetData(format: Type): void;
    GetData(format: string, autoConvert: boolean): void;
    GetData(...args: any[]): void {
        if (args.length === 1 && args[0] instanceof Type) {
            const type: Type = args[0];
            if (this.data.ContainsKey(type.FullName)) {
                return this.data.Get(type.FullName);
            }
        } else if (args.length === 1 && is.string(args[0])) {
            const key: string = args[0];
            if (this.data.ContainsKey(key)) {
                return this.data.Get(key);
            }
        }
        return null;
    }
    GetDataPresent(format: string): boolean;
    GetDataPresent(format: Type): boolean;
    GetDataPresent(format: string, autoConvert: boolean): boolean;
    GetDataPresent(format: any, autoConvert?: any): boolean {
        throw new Error("Method not implemented.");
    }
    GetFormats(): string[];
    GetFormats(autoConvert: boolean): string[];
    GetFormats(autoConvert?: any): string[] {
        throw new Error("Method not implemented.");
    }
    SetData(data: any): void;
    SetData(format: string, data: any): void;
    SetData(format: Type, data: any): void;
    SetData(format: string, autoConvert: boolean, data: any): void;
    SetData(...args: any[]) {
        if (args.length === 2 && is.string(args[0])) {
            const key: string = args[0];
            const data: any = args[1];
            this.data.Set(key, data);
        } else if (args.length === 2 && args[0] instanceof Type) {
            const type: Type = args[0];
            this.data.Set(type.FullName, args[1]);
        }
    }



}
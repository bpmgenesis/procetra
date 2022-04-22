export interface IDataSourceActivity {
    GetColumns(): string[];
    GetDataSourceName(): string;
    IsReady(): boolean;
}
import { Control, Teact, DomHandler } from '@tuval/forms';
import { classNames, int, Convert } from '@tuval/core';

const css = require('./DataTable.css');
DomHandler.addCssToDocument(css);

export class DataTable extends Control<DataTable> {

    public get DataSource(): any[] {
        return this.GetProperty('DataSource');
    }
    public set DataSource(value: any[]) {
        this.SetProperty('DataSource', value);
    }

    private renderHeaders(): any {
        const items = [];

        const aa = (<div class='flex flex-shrink-0 justify-content-start align-items-center datatable-header' style='width:30px;padding:0px'></div>);
        items.push(aa);
        if (this.DataSource.length > 0) {
            const item = this.DataSource[0];
            for (let key in item) {
                const a = (<div class='flex flex-shrink-0 justify-content-start align-items-center datatable-header' style='width:200px;'><span>{key}</span></div>);
                items.push(a);
            }
        }

        return items;
    }
    private renderColumns(rowInfo: any, index:int): any {
        const items = [];
        const aa = (<div class='flex flex-shrink-0 justify-content-center align-items-center datatable-row-fixed' style='width:30px;'>{Convert.ToString(index)}</div>);
        items.push(aa);

        for (let key in rowInfo) {
            const a = (<div class='flex justify-content-start align-items-center datatable-column-item' style='width:200px;'><span>{rowInfo[key]}</span></div>);
            items.push(a);
        }
        return items;
    }
    private renderRows(): any {
        const items = [];
        if (this.DataSource.length > 0) {
            const item = this.DataSource[0];
            for (let i = 0; i < this.DataSource.length; i++) {
                const className = classNames('flex', 'justify-content-start', 'align-items-center', 'datatable-row',
                    {
                        'even-row': i % 2 === 1,
                        'odd-row': i % 2 === 0,
                    } as any);
                const a = (<div class={className}>
                    {this.renderColumns(this.DataSource[i],i)}
                </div>);
                items.push(a);
            }
        }
        return items;
    }
    public override CreateElements() {
        return (
            <div class='tuval-datatable'>
                <div class='flex justify-content-start align-items-center'>
                    {this.renderHeaders()}
                </div>
                <div>
                    {this.renderRows()}
                </div>
            </div>
        );
    }

}
import {
    UIController, UIView, UIScene, State, Text, VStack, cTopLeading, ForEach, ScrollView, HStack, RenderingTypes,
    RoundedRectangle, cLeading, DropDown, DataTable, Column, Icon, cHorizontal, OverlayPanel, TextField, Cache
} from '@tuval/forms';
import { GridHeader, GridRow, IGridColumn } from '../../../../modules/Statistics/Views/CasesGrid';
import { CvsToJson } from '../../../../utils/csv2json';
import { foreach, Convert, is } from '@tuval/core';
import { mapTypesModel } from '../Models/MapTypesModel';
import { RegularText } from '../../../Views/Texts';
import { ProjectUIService } from '../../../UIServices/ProjectUIService';
import { case_id_map_model } from '../Models/MapModels';
import { IUploadFileReady } from '@tuval/forms';

const infoText = `
To upload data you must first map the fields (columns) of your data file.
+ Map __required fields__ (Timeline ID, Timestamp and Event Name) by dragging the corresponding label to the desired column
+ Map __optional fields__ (columns) that you want to use for filtering your timelines by dragging the New Attribute label to the desired column.
+ Once you have completed your mapping press the 'Confirm and start upload' button.
`;
/* const columns: IGridColumn[] = [
    {
        key: 'project_name',
        title: 'Name',
        width: 230
    },

] */

interface IMapColumn extends IGridColumn {
    mappedData: any;
}


export function MapGridHeader(columnInfo: IMapColumn[]) {
    const width = Convert.ToInt32(100 / columnInfo.length);
    return (
        HStack({ alignment: cLeading })(
            ...ForEach(columnInfo)(cInfo =>
                HStack({ alignment: cLeading })(
                    RegularText(cInfo.title)
                        .fontFamily("'Source Sans Pro', Arial, sans-serif")
                        .fontSize('18px')
                        .fontWeight('500')
                        .foregroundColor('#1A1A1A')
                        //.textTransform('uppercase')
                        .whiteSpace('nowrap')
                        .width('80%')
                        .textOverflow('ellipsis')
                        .padding('0 10px')
                        .borderRight('2px solid transparent'),
                    cInfo.mappedData && Icon('\\e3c9').size(20).cursor('pointer').onClick(() => ProjectUIService.MapColumnSettingsDialog()),
                )
                    .width()
                    .minWidth(is.number(cInfo.width) ? `${cInfo.width}px` : width + '%')

            )
        ).height(40).borderBottom('2px solid #e4e4e4')
    )
}

export function MapColumnsGrid(columns, data, onSelectedRow: Function): UIView {
    return (

        VStack({ alignment: cTopLeading })(
            MapGridHeader(columns),
            Cache(true, () =>
                VStack({ alignment: cTopLeading })(
                    ...ForEach(data)((row =>
                        GridRow(columns, row, onSelectedRow)
                    ))
                ).useCache(true)
            )
        ).alias('Merhaba')

    )
}

export class MapColumnsController extends UIController {
    private csv: string;

    private csvData: any[];




    @State()
    public gridHeaders: IMapColumn[];

    public mappingFileName: string;
    public mappingName: string;

    @State()
    private selectedItem: any;

    protected InitController() {

    }

    public OnBindModel(fileInfo: IUploadFileReady) {
        const headers: IMapColumn[] = [];

        this.csv = fileInfo.GetFileContentAsString();
        this.csvData = CvsToJson.Convert(this.csv, { parseNumbers: true });
        this.mappingFileName = fileInfo.fileName + '.' + fileInfo.fileExt;
        this.mappingName = this.mappingFileName;

        const keys = Object.keys(this.csvData[0]);
        foreach(keys, (key) => {
            headers.push({
                key: key,
                title: key,
                width: 210,
                mappedData: null
            })
        });

        this.gridHeaders = headers;

    }

    private onColumnMapped(column: any, selectedItem: any) {
        column.mappedData = selectedItem;
        this.gridHeaders = [...this.gridHeaders];
    }

    public LoadView(): UIView {
        return (
            UIScene(
                VStack({ alignment: cLeading })(
                    HStack({ alignment: cLeading, spacing: 10 })(
                        Icon('\\e2c6').size(35).foregroundColor('#33333399'),
                        RegularText('Map').fontSize(24).fontWeight('500').lineHeight('1.25em').foregroundColor('#333').fontFamily("'Source Sans Pro', Arial, sans-serif"),
                        HStack(
                            TextField().fontSize('1rem')
                                .backgroundColor('transparent')
                                .foregroundColor('#495057')
                                .padding('0.75rem 0.75rem 0.75rem 0rem')
                                .value(this.mappingFileName)
                                .onTextChange((text) => { this.mappingName = text }),
                            Icon('\\e3c9')
                                .size(20)
                                .paddingRight('10px')
                                .paddingLeft('10px'),
                        )
                            .width()
                            .paddingRight('5px')
                            .overflow('hidden')
                            .borderBottom('1px solid #ced4da')
                            //.shadow({ default: '', focus: '0 0 0 0.2rem #c7d2fe' })
                            //.transition('background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s')
                            //.backgroundColor('rgba(255,255,255,0.3)')
                            .height()
                            .tabIndex(0)
                    ).height(),
                    Text(infoText).render(RenderingTypes.Markdown).
                        fontFamily("'Source Sans Pro', Arial, sans-serif")
                        .fontSize('16px')
                        .lineHeight('1.5'),
                    ScrollView(
                        HStack({ alignment: cLeading, spacing: 10 })(
                            ...ForEach(this.gridHeaders)(header =>
                                HStack({ alignment: cLeading })(
                                    DropDown().itemTemplate(option =>
                                        Text(option.name)
                                    )
                                        .fontSize('1rem')
                                        .placeholder('Click to map...')
                                        .model(mapTypesModel)
                                        .value((header as any).mappedData)
                                        .backgroundColor((header as any).mappedData?.color)
                                        .foregroundColor((header as any).mappedData?.foreColor)
                                        .onSelected(item => this.onColumnMapped(header, item))
                                ).width().minWidth('200px').border('2px dashed #e0e0e0').height(42).minHeight('18px').marginTop('8px').marginBottom('10px')
                            )
                        ),
                        /*     DataTable()
                              .columns(
                                 ...ForEach(this.gridHeaders)(item =>
                                     Column()
                                     .body(
                                         Text(item.title)
                                     )
                                     .field(item.key)
                                     .header(item.title)
                                     .width(`${item.width}px`) as any
                                 )

                             ).value(this.csvData.slice(0, 1000)) */
                        MapColumnsGrid(this.gridHeaders, this.csvData.slice(0, 5000), () => { })
                    )
                )
            )
        )
    }
}
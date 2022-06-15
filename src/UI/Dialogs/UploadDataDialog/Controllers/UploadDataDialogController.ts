import { UIController, UIScene, UIView, UIStep, VStack, cTop, UIFileUpload, Text, HStack, cLeading, Icon, RoundedRectangle, cTrailing, ForEach, If, State, IUploadFileReady } from '@tuval/forms';
import { AcceptButton, CancelButton } from '../../../Views/Buttons';
import { RegularText } from '../../../Views/Texts';
import { int, foreach } from '@tuval/core';
import { CvsToJson } from '../../../../utils/csv2json';
import { Steps } from '../Views/Steps';
import { SelectFileController } from './SelectFileController';
import { MapColumnsController } from './MapColumnsController';
import { case_id_map_model, event_id_map_model, mapping } from '../Models/MapModels';
import { IProjectModel } from '@procetra/common';
import { MiningBrokerClient, Services } from '@procetra/common';


export class UploadDataDialogController extends UIController {

    private project: IProjectModel;

    @State()
    private selectedIndex: int;

    private selectFileController: SelectFileController;
    private mapColumnsController: MapColumnsController;

    @State()
    private currentController: UIController;

    private fileData: IUploadFileReady;
    private mapping: mapping = { mapping: {} } as any;

    private OnPrepareColumnMapping() {
        this.mapping.mapping.case_id = [];
        this.mapping.mapping.event_id = [];
        this.mapping.mapping.resource_id = [];
        this.mapping.mapping.cost_id = [];

        this.mapping.mapping.case_attributes = [];
        this.mapping.mapping.event_attributes = [];

        foreach(this.mapColumnsController.gridHeaders, header => {
            if (header.mappedData != null) {
                if (header.mappedData.name === 'Case ID') {
                    this.mapping.mapping.case_id.push({
                        title: header.key,
                        index: 0
                    })
                } else if (header.mappedData.name === 'Activity') {
                    this.mapping.mapping.event_id.push({
                        title: header.key,
                        index: 0
                    })
                } else if (header.mappedData.name === 'Start Timestamp') {
                    this.mapping.mapping.start_timestamp = {
                        title: header.key,
                        index: 0,
                        dateFormat: {
                            type: "date",
                            format: "YYYY-M-D H:m:s.SSSS",
                            timeZone: false
                        }
                    }
                } else if (header.mappedData.name === 'End Timestamp') {
                    this.mapping.mapping.end_timestamp = {
                        title: header.key,
                        index: 0,
                        dateFormat: {
                            type: "date",
                            format: "YYYY-M-D H:m:s.SSSS",
                            timeZone: false
                        }
                    }
                } else if (header.mappedData.name === 'Other Timestamp') {
                    this.mapping.mapping.other_timestamp = {
                        title: header.key,
                        index: 0,
                        dateFormat: {
                            type: "date",
                            format: "YYYY-M-D H:m:s.SSSS",
                            timeZone: false
                        }
                    }
                } else if (header.mappedData.name === 'Resource') {
                    this.mapping.mapping.resource_id.push({
                        title: header.key,
                        alias: header.key,
                        index: 0
                    })
                } else if (header.mappedData.name === 'Cost') {
                    this.mapping.mapping.cost_id.push({
                        title: header.key,
                        alias: header.key,
                        index: 0
                    })
                } else if (header.mappedData.name === 'Case Attribute') {
                    this.mapping.mapping.case_attributes.push({
                        title: header.key,
                        alias: header.key,
                        index: 0
                    })
                } else if (header.mappedData.name === 'Event Attribute') {
                    this.mapping.mapping.event_attributes.push({
                        title: header.key,
                        alias: header.key,
                        index: 0
                    })
                }
            }
        })

        console.log(this.mapping);
        const session_id = Services.StateService.GetSessionId();

        Services.ProjectService.CreateMapping(session_id, 'bpmgenesis', this.project.project_id,
            this.mapColumnsController.mappingName,
            this.mapColumnsController.mappingFileName,
            JSON.stringify(this.mapping.mapping));


        MiningBrokerClient.ImportCsvFile(this.project.project_id, 'bpmgenesis', this.fileData.GetFileContentAsString(), this.mapping.mapping.case_id.map(item=> item.title).join(';'), this.mapping.mapping.event_id.map(item=> item.title).join(';'),
        this.mapping.mapping.start_timestamp.title, this.mapping.mapping.end_timestamp.title, '', '').then(() => {
            MiningBrokerClient.LoadEventData(session_id, this.project.project_id).then(()=>{
                 MiningBrokerClient.GetHappyPath(session_id, this.project.project_id).then( (info: any[])=>{
                   console.log(info);
                });
            });

        });

    }
    protected InitController(): void {
        this.selectedIndex = 0;
        this.selectFileController = new SelectFileController();
        this.selectFileController.OnFileSelected.add((e: IUploadFileReady) => {
            this.fileData = e;
            this.mapColumnsController = new MapColumnsController();
            this.mapColumnsController.Bind(e);
            this.currentController = this.mapColumnsController;
            this.selectedIndex = 1;
        });

        this.currentController = this.selectFileController;
    }

    public OnBindModel(project: IProjectModel) {
        this.project = project;
    }

    public LoadView(): UIView {
        console.log('test')
        return (
            UIScene(
                VStack({ alignment: cLeading })(
                    HStack({ alignment: cLeading, spacing: 5 })(
                        Icon('\\e241').size(24).foregroundColor('#263238'),
                        RegularText('Upload data').fontSize(20)
                    ).minHeight('64px').maxHeight('64px').background('#eceff1').foregroundColor('#263238').paddingLeft('10px'),
                    Steps(['Select File', 'Map Columns', 'Upload File', 'Data Analysis'], this.selectedIndex),
                    VStack({ alignment: cTop })(
                        this.currentController as any
                    ),
                    HStack({ alignment: cTrailing })(
                        AcceptButton('OK').action(() => this.OnPrepareColumnMapping()),
                        CancelButton('Cancel').action(() => this.selectedIndex = 2),
                        // AcceptButton('OK')
                    ).height()
                )
            )
        )
    }
}
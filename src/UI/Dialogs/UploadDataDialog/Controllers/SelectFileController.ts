
import { UIController, UIView, State, UIScene, cLeading, VStack, HStack, Icon, cTop, UIFileUpload, Text, IUploadFileReady } from '@tuval/forms';
import { int, Delegate } from '@tuval/core';
import { Steps } from '../Views/Steps';
import { RegularText } from '../../../Views/Texts';
import { CvsToJson } from '../../../../utils/csv2json';
import { CancelButton } from '../../../Views/Buttons';
import { Event } from '@tuval/core';

export class FileSelected extends Delegate<(e: IUploadFileReady) => void> { }

export class SelectFileController extends UIController {

    public OnFileSelected: Event<FileSelected>;

    protected InitController(): void {
        this.OnFileSelected = new Event();
    }
    public LoadView(): UIView {
        return (
            UIScene(
                VStack({ alignment: cTop })(
                    HStack({ alignment: cLeading, spacing: 10 })(
                        Icon('\\e2c6').size(35).foregroundColor('#33333399'),
                        RegularText('Select File').fontSize(24).fontWeight('500').lineHeight('1.25em').foregroundColor('#333').fontFamily("'Source Sans Pro', Arial, sans-serif")
                    ).height(),
                    UIFileUpload(
                        VStack(
                            VStack(
                                Text('Drop file here').fontSize('24px').foregroundColor('#333').fontFamily("'Source Sans Pro', Arial, sans-serif")
                            )
                                .cursor('copy')
                                .backgroundColor({ hover: '#f5f5f5' })
                                .border('2px dashed #2baab5'),
                            RegularText('Browse Files').foregroundColor('#2baab5').fontSize('18px').fontWeight('bold').lineHeight('20px').cursor('pointer').padding(10).fontFamily("'Source Sans Pro', Arial, sans-serif")
                        )
                    )
                        .marginTop('10px')
                        .width(400).height(200).onFileReady((e) => { this.OnFileSelected(e)/*  console.log(CvsToJson.Convert(e.GetFileContentAsString(), { parseNumbers: true })) */ })
                )
            )
        )
    }
}
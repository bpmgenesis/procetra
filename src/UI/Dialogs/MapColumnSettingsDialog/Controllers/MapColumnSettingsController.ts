import { UIController, UIScene, UIView, UIStep, VStack, cTop, UIFileUpload, Text, HStack, cLeading, Icon, RoundedRectangle, cTrailing, ForEach, If, State, IUploadFileReady, cTopLeading, TextField } from '@tuval/forms';
import { AcceptButton, CancelButton } from '../../../Views/Buttons';
import { RegularText } from '../../../Views/Texts';
import { int } from '@tuval/core';
import { CvsToJson } from '../../../../utils/csv2json';


export class MapColumnSettingsController extends UIController {


    protected InitController(): void {

    }

    public LoadView(): UIView {

        return (
            UIScene(
                VStack({ alignment: cTopLeading })(
                    HStack({ alignment: cLeading, spacing: 5 })(
                        Icon('\\e034').size(24).foregroundColor('#263238'),
                        RegularText('Column Info').fontSize(20)
                    ).minHeight('44px').maxHeight('44px').background('#eceff1').foregroundColor('#263238').paddingLeft('10px'),
                    VStack({ alignment: cTopLeading })(
                        HStack(
                            Text('Column Name').whiteSpace('nowrap').width(100),
                            TextField()
                        ).height(),
                        HStack(
                            Text('Title').whiteSpace('nowrap').width(100),
                            TextField()
                        ).height(),
                        HStack(
                            Text('Column Type').whiteSpace('nowrap').width(100),
                            TextField()
                        ).height()
                    ),
                    HStack({ alignment: cTrailing })(
                        AcceptButton('OK'),
                        CancelButton('Cancel'),
                        // AcceptButton('OK')
                    ).height()
                )
            )
        )
    }
}
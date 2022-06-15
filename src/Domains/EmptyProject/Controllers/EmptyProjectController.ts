import { UIController, Text, UIScene, HStack, VStack, cTop, TextAlignment, UIImage, Icon, HDivider } from '@tuval/forms';
import { PageButton } from '@procetra/common';
import { Resources } from '../../../Resources/Resources';
import { RegularText } from '../../../UI/Views/Texts';
import { ProjectUIService } from '../../../UI/UIServices/ProjectUIService';
import { IProjectModel } from '@procetra/common';

class EmptyProjectControllerClass extends UIController {
    private project: IProjectModel;
    private onUploadDataClick() {
        ProjectUIService.UploadDataDialog(this.project);
    }

    public OnBindModel(project: IProjectModel) {
        this.project = project;
    }

    public LoadView() {
        return (
            UIScene(
                VStack({ alignment: cTop, spacing: 20 })(
                    HDivider().height(70),
                    HStack({ spacing: 5 })(
                        Icon('\\d277').size(24),
                        RegularText(this.project.project_name).fontSize(24)
                    ).height(),
                    Text(`The project “${this.project.project_name}” has no data loaded. Please upload your data to continue or open another project which already has data loaded.`)
                        .width(700)
                        .margin('10px 0')
                        .foregroundColor('#7f7f7f')
                        .fontFamily("'Source Sans Pro', Arial, sans-serif")
                        .fontSize(16).multilineTextAlignment(TextAlignment.leading),
                    HStack({ spacing: 20 })(
                        VStack({ alignment: cTop, spacing: 10 })(
                            HStack(
                                UIImage(Resources.Icons.CsvFileIcon),
                                UIImage(Resources.Icons.XlsxFileIcon),
                                UIImage(Resources.Icons.XesFileIcon)
                            ),
                            PageButton('Upload data').width(235).onClick(() => this.onUploadDataClick()),
                            Text('Start by loading your own data from the file').fontFamily("'Source Sans Pro', Arial, sans-serif")
                                .fontSize(16).multilineTextAlignment(TextAlignment.leading)
                        ).width(235).height(200),
                        VStack({ alignment: cTop, spacing: 10 })(
                            HStack(
                                UIImage(Resources.Icons.DataExtractorIcon)
                            ),
                            PageButton('Select extractor').width(235),
                            Text('Edit project details and sharing options.').fontFamily("'Source Sans Pro', Arial, sans-serif")
                                .fontSize(16).multilineTextAlignment(TextAlignment.leading)
                        ).width(235).height(200),
                        VStack({ alignment: cTop, spacing: 10 })(
                            HStack(
                                UIImage(Resources.Icons.RepositoryIcon)
                            ),
                            PageButton('Select repository').width(235),
                            Text('If you would like to work with one of the available projects.').fontFamily("'Source Sans Pro', Arial, sans-serif")
                                .fontSize(16).multilineTextAlignment(TextAlignment.leading)
                        ).width(235).height(200)
                    ).height()
                )
            )
        )
    }
}

export function EmptyProjectController(project: IProjectModel): EmptyProjectControllerClass {
    return new EmptyProjectControllerClass().Bind(project);
}
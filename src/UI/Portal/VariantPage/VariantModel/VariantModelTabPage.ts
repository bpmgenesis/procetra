import { TTabPage, Property } from '@tuval/forms';
import { VariantDetailDialog } from '../../../DataSetTabPage/VariantsTabPage/VariantDetails/VariantDetailDialog';
import { VariantModelPage } from './VariantModelPage';


export class VariantModelTabPage extends TTabPage {

    private variantDetailDialog: VariantDetailDialog;
    private page: VariantModelPage;

    public override InitComponents() {
        this.InitNanVisualComponents();
        this.page = new VariantModelPage();
        this.Controls.Add(this.page);

        this.page.VariantClicked.add((event: any) => {
            this.variantDetailDialog.SetVariantInfo(event.dataset, event.variantsInfo);
            this.variantDetailDialog.ShowDialog();
        });
    }
    private InitNanVisualComponents() {
        this.variantDetailDialog = new VariantDetailDialog();
        this.variantDetailDialog.Position = 'right';
        this.Controls.Add(this.variantDetailDialog);
    }

    public SetDataSet(projectId: string, datasetId: string) {
        this.page.SetDataSet(projectId, datasetId);
    }
}
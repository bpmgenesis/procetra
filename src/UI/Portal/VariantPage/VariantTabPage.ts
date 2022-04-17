import { TTabPage, TTabControl } from '@tuval/forms';
import { GridView } from '@tuval/components/grids';
import { Services } from '../../../Services/Services';
import { CurrentDatasetChangedArgs } from '../../../Services/StateService';
import { VariantModelPage } from './VariantModel/VariantModelPage';
import { VariantModelTabPage } from './VariantModel/VariantModelTabPage';

export class VariantTabPage extends TTabPage {
    tabControl: TTabControl;
    variantModelTabPage: VariantModelTabPage;
    public override InitComponents() {

        this.tabControl = new TTabControl();
        this.tabControl.ShowHeader = false;
        this.Controls.Add(this.tabControl);

        this.variantModelTabPage = new VariantModelTabPage();
        this.tabControl.TabPages.Add(this.variantModelTabPage);
    }

    public SetDataSet(projectId: string, datasetId: string) {
       this.variantModelTabPage.SetDataSet(projectId, datasetId);
    }
}
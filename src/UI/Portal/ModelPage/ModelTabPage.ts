import { TTabPage, TTabControl, Property } from '@tuval/forms';
import { GridView } from '@tuval/components/grids';
import { Services } from '../../../Services/Services';
import { CurrentDatasetChangedArgs } from '../../../Services/StateService';
import { PerfModelTabPage } from './PerfModel/PerfModelTabPage';
import { FreqModelTabPage } from './FreqModel/FreqModelTabPage';
import { int } from '@tuval/core';
import { PetriModelTabPage } from './PetriModel/PetriModelTabPage';

export class ModelTabPage extends TTabPage {

    private tabControl: TTabControl;
    private perfModelTabPage: PerfModelTabPage;
    freqModelTabPage: FreqModelTabPage;
    petriModelTabPage: PetriModelTabPage;

    public override InitComponents() {
        this.tabControl = new TTabControl();
        this.tabControl.ShowHeader = false;
        this.Controls.Add(this.tabControl);


        this.perfModelTabPage = new PerfModelTabPage();
        this.tabControl.TabPages.Add(this.perfModelTabPage);

        this.freqModelTabPage = new FreqModelTabPage();
        this.tabControl.TabPages.Add(this.freqModelTabPage);

        this.petriModelTabPage = new PetriModelTabPage();
        this.tabControl.TabPages.Add(this.petriModelTabPage);
    }

    public SetPerfModelDataSet(projectId: string, datasetId: string) {
        this.tabControl.ActiveIndex = 0;
        this.perfModelTabPage.SetDataSet(projectId, datasetId);
      /*   setTimeout(()=> {
            this.freqModelTabPage.SetDataSet(projectId, datasetId);
        }, 100);

        setTimeout(()=> {
            this.petriModelTabPage.SetDataSet(projectId, datasetId);
        }, 200); */

    }
    public SetFreqModelDataSet(projectId: string, datasetId: string) {
        this.tabControl.ActiveIndex = 1;
        this.freqModelTabPage.SetDataSet(projectId, datasetId);
      /*   setTimeout(()=> {
            this.freqModelTabPage.SetDataSet(projectId, datasetId);
        }, 100);

        setTimeout(()=> {
            this.petriModelTabPage.SetDataSet(projectId, datasetId);
        }, 200); */

    }
    public SetPetriModelDataSet(projectId: string, datasetId: string) {
        this.tabControl.ActiveIndex = 2;
        this.petriModelTabPage.SetDataSet(projectId, datasetId);
      /*   setTimeout(()=> {
            this.freqModelTabPage.SetDataSet(projectId, datasetId);
        }, 100);

        setTimeout(()=> {
            this.petriModelTabPage.SetDataSet(projectId, datasetId);
        }, 200); */

    }
}
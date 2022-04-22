import { TTabPage, Property } from '@tuval/forms';
import { GridView } from '@tuval/components/grids';
import { PageBanner } from './PageBanner';

export class EmptyTabPage extends TTabPage {

    public override InitComponents() {
         const pageBanner = new PageBanner();
        this.Controls.Add(pageBanner);
    }

}
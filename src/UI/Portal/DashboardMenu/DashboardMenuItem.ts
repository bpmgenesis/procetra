import { DashboardSubMenuItemCollection } from './DashboardSubMenuItemCollection';
export class DashboardMenuItem {
    public Text: string = '';
    public Image: string = '';
    public Icon: string = '';
    public Tag: any;
    public SubMenuItems: DashboardSubMenuItemCollection;
    public constructor() {
        this.SubMenuItems = new DashboardSubMenuItemCollection(this);
    }
}
import { List, foreach, int, is, BREAK } from '@tuval/core';
import { DashboardMenuItem } from './DashboardMenuItem';
import { DashboardMenu } from './DashBoardMenu';

export class DashboardMenuItemCollection extends List<DashboardMenuItem> {
    public DashboardMenu: DashboardMenu = null as any;
    public constructor(dashboardMenu: DashboardMenu) {
        super();
        this.DashboardMenu = dashboardMenu;
    }

    public Add(text: string, icon: string): DashboardMenuItem;
    public Add(text: string, icon: string, selectedIcon: string): DashboardMenuItem;
    public Add(text: string, icon: string, selectedIcon: string,icon2: string, selectedIcon2: string ): DashboardMenuItem;
    public Add(treeNode: DashboardMenuItem): int
    public Add(...args: any[]): DashboardMenuItem | int {
        if (args.length === 2 && is.string(args[0]) && is.string(args[1])) {
            const text: string = args[0];
            const icon: string = args[1];
            const tab = new DashboardMenuItem();
            tab.Text = text;
            tab.Icon = icon;
            super.Add(tab);
            if (this.DashboardMenu != null) {
                this.DashboardMenu.ForceUpdate();
            }
            return tab;
        } else if (args.length === 3 && is.string(args[0]) && is.string(args[1]) && is.string(args[2])) {
            const text: string = args[0];
            const icon: string = args[1];
            const tab = new DashboardMenuItem();
            tab.Text = text;
            tab.Image = icon;
            super.Add(tab);
            if (this.DashboardMenu != null) {
                this.DashboardMenu.ForceUpdate();
            }
            return tab;
        } else if (args.length === 5 && is.string(args[0]) && is.string(args[1]) && is.string(args[2])) {
            const text: string = args[0];
            const icon: string = args[1];
            const iconSelected: string = args[2];
            const icon2: string = args[3];
            const iconSelected2: string = args[4];
            const tab = new DashboardMenuItem();
            tab.Text = text;
            tab.Image = icon;
            super.Add(tab);
            if (this.DashboardMenu != null) {
                this.DashboardMenu.ForceUpdate();
            }
            return tab;
        } else {
            const treeNode: DashboardMenuItem = args[0];
            const result = super.Add(treeNode);
            if (this.DashboardMenu != null) {
                this.DashboardMenu.ForceUpdate();
            }
            return result;
        }
    }
}

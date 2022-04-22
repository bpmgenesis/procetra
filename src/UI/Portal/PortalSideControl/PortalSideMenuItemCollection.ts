import { List, foreach, int, is, BREAK } from '@tuval/core';
import { PortalSideMenuItem } from './PortalSideMenuItem';
import { PortalSideFilterControl } from './PortalSideFilterControl';

export class PortalSideMenuItemCollection extends List<PortalSideMenuItem> {
    public ProtalSideControl: PortalSideFilterControl = null as any;
    public constructor(dashboardMenu: PortalSideFilterControl) {
        super();
        this.ProtalSideControl = dashboardMenu;
    }

    public Add(text: string, icon: string): PortalSideMenuItem;
    public Add(text: string, icon: string, selectedIcon: string): PortalSideMenuItem;
    public Add(text: string, icon: string, selectedIcon: string,icon2: string, selectedIcon2: string ): PortalSideMenuItem;
    public Add(treeNode: PortalSideMenuItem): int
    public Add(...args: any[]): PortalSideMenuItem | int {
        if (args.length === 2 && is.string(args[0]) && is.string(args[1])) {
            const text: string = args[0];
            const icon: string = args[1];
            const tab = new PortalSideMenuItem(this.ProtalSideControl);
            tab.Text = text;
            tab.Icon = icon;
            super.Add(tab);
            if (this.ProtalSideControl != null) {
                this.ProtalSideControl.ForceUpdate();
            }
            return tab;
        } else if (args.length === 3 && is.string(args[0]) && is.string(args[1]) && is.string(args[2])) {
            const text: string = args[0];
            const icon: string = args[1];
            const tab = new PortalSideMenuItem(this.ProtalSideControl);
            tab.Text = text;
            tab.Image = icon;
            super.Add(tab);
            if (this.ProtalSideControl != null) {
                this.ProtalSideControl.ForceUpdate();
            }
            return tab;
        } else if (args.length === 5 && is.string(args[0]) && is.string(args[1]) && is.string(args[2])) {
            const text: string = args[0];
            const icon: string = args[1];
            const iconSelected: string = args[2];
            const icon2: string = args[3];
            const iconSelected2: string = args[4];
            const tab = new PortalSideMenuItem(this.ProtalSideControl);
            tab.Text = text;
            tab.Image = icon;
            super.Add(tab);
            if (this.ProtalSideControl != null) {
                this.ProtalSideControl.ForceUpdate();
            }
            return tab;
        } else {
            const treeNode: PortalSideMenuItem = args[0];
            const result = super.Add(treeNode);
            if (this.ProtalSideControl != null) {
                this.ProtalSideControl.ForceUpdate();
            }
            return result;
        }
    }
}

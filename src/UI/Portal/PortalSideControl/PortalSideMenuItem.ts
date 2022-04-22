import { PortalSideMenuItemCollection } from "./PortalSideMenuItemCollection";
import { ControlCollection } from '@tuval/forms';
import { PortalSideFilterControl } from "./PortalSideFilterControl";
import { int } from '@tuval/core';

export class PortalSideMenuItem {
    public Text: string = '';
    public Image: string = '';
    public Icon: string = '';
    public Tag: any;
    public Controls: ControlCollection;
    public Width: int = 200;
    public constructor(contol: PortalSideFilterControl) {
        this.Controls = new ControlCollection(contol);
    }
}
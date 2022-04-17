import { Teact, DomHandler, Control, Property, React } from '@tuval/forms';
import { Delegate, int, Event, classNames } from '@tuval/core';
import { DashboardMenuItemCollection } from './DashboardMenuItemCollection';
import { DashboardMenuItem } from './DashboardMenuItem';

export interface DashboardMenuChangedArg {
    index: int;
}
export interface DashboardSubMenuChangedArg {
    index: int;
    subIndex: int;
}
export class DashboardMenuChangedHandler extends Delegate<(args: DashboardMenuChangedArg) => void> { };
export class DashboardSubMenuChangedHandler extends Delegate<(args: DashboardSubMenuChangedArg) => void> { };
export class DashboardMenu extends Control<DashboardMenu> {

    @Property()
    public DashboardMenuChanged: Event<DashboardMenuChangedHandler>;

    @Property()
    public DashboardSubMenuChanged: Event<DashboardSubMenuChangedHandler>;

    @Property()
    public Items: DashboardMenuItemCollection;

    @Property()
    public SelectedIndex: int;

    @Property()
    public SubMenuSelectedIndex: int;

    public SetupControlDefaults(): void {
        super.SetupControlDefaults();
        this.DashboardMenuChanged = new Event();
        this.DashboardSubMenuChanged = new Event();
        this.Items = new DashboardMenuItemCollection(this);
    }

    private renderItem(item: DashboardMenuItem, index: int): any {
        const itemClass = classNames('sidebar-menu-item', { 'active': this.SelectedIndex === index } as any);
        return (
            <li><a class={itemClass} href="javascript:void(0);" onclick={e => this.handleClick(index)}><i class={item.Icon}></i>{item.Text}</a></li>
        );
    }
    private renderItems(): any[] {
        return this.Items.ToArray().map((item, index) => {
            return this.renderItem(item, index);
        });
    }

    private renderSubItem(item: DashboardMenuItem, index: int, subIndex: int): any {
        const itemClass = classNames('sidebar-menu-item', { 'active': this.SubMenuSelectedIndex === subIndex } as any);
        return (
            <li><a class={itemClass} href="javascript:void(0);" onclick={e => this.handleSubClick(index, subIndex)}><i class={item.Icon}></i>{item.Text}</a></li>
        );
    }

    private renderSubItems(): any[] {
        const item: DashboardMenuItem = this.Items.Get(this.SelectedIndex);
        const classes = classNames('flyout', { 'show': item && item.SubMenuItems.Count > 0 } as any);
        return (
            <aside id="settings-sidebar" class={classes}>
                <ul class="nav collapse navbar-collapse primary-nav settings-nav">
                    {
                        item.SubMenuItems.ToArray().map((item, index) => {
                            return this.renderSubItem(item, this.SelectedIndex, index);
                        })
                    }
                    {/*   <li><a class="sidebar-menu-item " href="/Account"><i class="icon-profile"></i>Profile</a></li>
                    <li><a class="sidebar-menu-item " href="/Account/Organization"><i class="icon-account"></i>Account</a></li>
                    <li><a class="sidebar-menu-item " href="/Account/Applications"><i class="icon-applications"></i>Applications</a></li>
                    <li><a class="sidebar-menu-item " href="/Account/Notifications"><i class="icon-notifications"></i>Notifications</a></li>
                    <li><a class="sidebar-menu-item " href="/account/ignore"><i class="icon-ignore-rules"></i>Ignore Rules</a></li>
                    <li><a class="sidebar-menu-item " href="/Account/ErrorGrouping"><i class="icon-error-grouping-fade"></i>Error Grouping</a></li>
                    <li><a class="sidebar-menu-item " href="/Account/Billing"><i class="icon-billing"></i>Billing</a></li>
                    <li><a class="sidebar-menu-item " href="/Account/Team"><i class="icon-team"></i>Team</a></li>
                    <li><a class="sidebar-menu-item " href="/Shared/Errors"><i class="icon-share-error"></i>Shared Errors</a></li>
                    <li><a class="sidebar-menu-item " href="/install"><i class="icon-installation"></i>Install</a></li>
                    <li><a class="sidebar-menu-item  feedback-link" href="javascript:void(0);"><i class="icon-help"></i>Help</a></li> */}
                </ul>
            </aside>
        );
    }
    public CreateElements() {
        if (!this.Visible) {
            return;
        }
        return (
            <React.Fragment>
                <aside id="page-sidebar">
                    <ul class="nav collapse navbar-collapse primary-nav">
                        {this.renderItems()}

                        {/*  <li><a class="sidebar-menu-item  urls" href="/urls"><i class="icon-urls"></i>Urls</a></li>
                <li><a class="sidebar-menu-item  browsers" href="/browsers"><i class="icon-browsers"></i>Browsers</a></li>
                <li><a class="sidebar-menu-item  visitors" href="/users"><i class="icon-users"></i>Users</a></li>


                <li><a class="sidebar-menu-item  trends" href="/trends"><i class="icon-trends"></i>Trends</a></li>
                <li><a class="sidebar-menu-item  starred" href="/saved"><i class="icon-saved"></i>Saved</a></li>

                <li><a class="sidebar-menu-item  settings" href="/account/settings"><i class="icon-settings"></i>Settings</a></li>
                <li><a class="sidebar-menu-item mobile-nav" href="javascript:void(0);"><i class="fa fa-ellipsis-h"></i>More</a></li> */}
                    </ul>
                </aside>
                {this.renderSubItems()}

            </React.Fragment>
        );
    }
    private handleClick(index: int): void {
        if (this.SelectedIndex !== index) {
            this.SelectedIndex = index;
            this.SubMenuSelectedIndex = -1;
            this.DashboardMenuChanged({ index: index });
        }
    }
    private handleSubClick(index: int, subIndex: int): void {
        this.SubMenuSelectedIndex = subIndex;
        this.DashboardSubMenuChanged({ index: index, subIndex: subIndex });
    }

}
import { Control, ControlCollection, Property, Teact } from '@tuval/forms';
import { classNames, int } from '@tuval/core';
import { DashboardMenuItemCollection } from '../DashboardMenu/DashboardMenuItemCollection';
import { PortalSideMenuItemCollection } from './PortalSideMenuItemCollection';
import { PortalSideMenuItem } from './PortalSideMenuItem';

export class PortalSideFilterControl extends Control<PortalSideFilterControl> {

    @Property()
    private ActiveIndex: int;

    @Property()
    public Items: PortalSideMenuItemCollection;


    @Property()
    public ShowFilter: boolean;

    public SetupControlDefaults(): void {
        super.SetupControlDefaults();
        this.ShowFilter = false;
        this.Items = new PortalSideMenuItemCollection(this);
        this.ActiveIndex = 0;
    }

    private renderControls(): any[] {
        const activeItem = this.Items.Get(this.ActiveIndex);
        if (activeItem != null) {
            return activeItem.Controls.ToArray().map(control => {
                return (control as any).CreateMainElement();
            });
        }
    }

    private renderItem(item: PortalSideMenuItem, index: int): any {
        const style = {};
        style['top'] = `calc((50% - (52px * ${this.Items.Count - index})) + ${10 * (index + 1)}px)`;
        return (
            <button class="layout-config-button p-link" style={style} onclick={() => {
                this.ShowFilter = !this.ShowFilter;
                this.Width = item.Width;
                this.ActiveIndex = index;
            }}>
                <i class={item.Icon}></i>
            </button>
        );
    }
    private renderItems(): any[] {
        return this.Items.ToArray().map((item, index) => {
            return this.renderItem(item, index);
        });
    }
    public CreateElements() {
        const start = 52 * 3 / 2;
        const className = classNames('layout-config', { 'layout-config-active': this.ShowFilter } as any);
        return (


            <div class='layout-wrapper layout-news-active p-ripple-disabled'>
                <div class={className} style={{ width: this.Width + 'px' }}>
                    <div class="layout-config-content-wrapper">
                        {this.renderItems()}
                        {/* <button class="layout-config-button p-link" style='top:calc((50% - (52px * 3)) + 10px)' onclick={() => { this.ShowFilter = !this.ShowFilter; this.Width = 600; }}>
                        <i class="pi pi-filter"></i>
                    </button>
                    <button class="layout-config-button p-link" style='top:calc((50% - (52px * 2)) + 20px)' onclick={() => { this.ShowFilter = !this.ShowFilter; this.Width = 200; }}>
                        <i class="pi pi-filter"></i>
                    </button>
                    <button class="layout-config-button p-link" style='top:calc((50% - (52px * 1)) + 30px)' onclick={() => { this.ShowFilter = !this.ShowFilter; this.Width = 100; }}>
                        <i class="pi pi-filter"></i>
                    </button> */}


                        <button class="layout-config-close p-link" onclick={() => {
                            //alert(this.menuActive);
                            this.ShowFilter = false;
                        }}>
                            <i class="pi pi-times"></i>
                        </button>

                        <div class="layout-config-content">{this.renderControls()}<div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
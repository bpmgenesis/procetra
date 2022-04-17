import { UIView, VStack, IRenderable, ForEach, Alignment, HStack, Filter, IControl } from '@tuval/forms';
import { List, foreach, Event, int } from '@tuval/core';
import { Binding } from '../Controllers/Binding';

export interface TabViewItemParameters {
    name: string;
    header: UIView;
    content: UIView;
}
class TabViewItemClass extends UIView {
    private _name: string;

    private headerContent: IRenderable[];
    private _content: IRenderable[];
    private _onSelected: Event<any>;
    public get Header(): UIView {
        return HStack(
            ...(this.headerContent as any)
        ).onClick(() => this._onSelected()).spacing('5px')
    }
    public get Content(): UIView {
        return HStack(
            ...(this._content as any)
        )
    }
    public onSelected(func: Function): this {
        this._onSelected = func as any;
        return this;
    }
    public header(...content: (UIView | IControl)[]): this {
        this.headerContent = this.DoFlatten(...content);
        return this;
    }
    public content(...content: (UIView | IControl)[]): this {
        this._content = this.DoFlatten(...content);
        return this;
    }
    public name(value: string): this {
        this._name = value;;
        return this;
    }
}


export class TabViewClass extends UIView {
    private tabs: List<TabViewItemClass> = new List();
    private _selectedTabIndex: any;

    public constructor() {
        super();
        this.Appearance.Display = 'flex';
        this.Appearance.Width = '100%';
        this.Appearance.Height = '100%';
    }

    public Body(): UIView {
        this.SubViews.Add(
            VStack(

                ...ForEach(this.tabs, (tabItem, index) => {
                    if (index === this._selectedTabIndex) {
                        return tabItem._content;
                    }
                }),
                HStack(
                    ...ForEach(this.tabs, tabItem => tabItem.Header)
                ).height('auto').width('100%'),

            )
                .width('100%')
                /*  .spacing('10px') */
                .paddingLeft('5px')
                .alignment(Alignment.leading)
                .cursor('pointer')
        );
        return null;
    }
    public setChilds(...args: any[]) {
        const childs = this.DoFlatten(...args);
        foreach(childs, (item: IRenderable) => {
            if (item instanceof TabViewItemClass) {
                this.tabs.Add(item);
            }
        })
        return this;
    }
    public selectedTabIndex(value: int): this {
        this._selectedTabIndex = value;
        return this;
    }
    public Render() {
        this.Body();
        return super.Render();
    }
}

export function TabView(...subViews: UIView[]): TabViewClass {
    return new TabViewClass().setChilds(...subViews);
}

export function TabViewItem(params: TabViewItemParameters): TabViewItemClass {
    return new TabViewItemClass().name(params.name).header(params.header).content(params.content);
}
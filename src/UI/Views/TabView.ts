import { UIView, VStack, IRenderable, Alignment, HStack, Filter, IControl, UIController, viewFunc, getView, ForEach, ViewProperty, cLeading, cTrailing } from '@tuval/forms';
import { List, foreach, Event, int } from '@tuval/core';
import { Binding } from '../../domains/Binding';

export interface TabViewItemParameters {
    name: string;
    header: UIView;
    rightHeader: UIView;
    content: UIView;
}
class TabViewItemClass extends UIView {
    private _name: string;

    @ViewProperty()
    private headerContent: UIView | IControl;

    @ViewProperty()
    private rightHeaderContent: UIView | IControl;

    @ViewProperty()
    public _content: UIView | IControl;

    @ViewProperty()
    private _onSelected: Event<any>;

    public GetHeader(): UIView {
        return HStack({ spacing: 5 })(
            this.headerContent as any
        )
            .width() //auto
            .onClick(() => this._onSelected())
    }
    public GetRightHeader(): UIView {
        return HStack({ spacing: 5 })(
            this.rightHeaderContent as any
        )
            .width() //auto
            .onClick(() => this._onSelected())
    }
    public GetContent(): UIView {
        return HStack(
            this._content
        )
    }
    public onSelected(func: Function): this {
        this._onSelected = func as any;
        return this;
    }
    public header(content: UIView | IControl): this {
        this.headerContent = content;
        return this;
    }
    public rightHeader(content: UIView | IControl): this {
        this.rightHeaderContent = content;
        return this;
    }
    public content(content: UIView | IControl): this {
        this._content = content;
        return this;
    }
    public name(value: string): this {
        this._name = value;;
        return this;
    }
}


export class TabViewClass extends UIView {

    @ViewProperty()
    private tabs: List<TabViewItemClass>;

    @ViewProperty()
    private _selectedTabIndex: int;

    public constructor() {
        super();
        this.Appearance.Display = 'flex';
        this.Appearance.Width = '100%';
        this.Appearance.Height = '100%';
        this._selectedTabIndex = 0;
        this.tabs = new List();
    }

    public Body(): UIView {
        this.SubViews.Add(
            VStack(
                // Content
                ...ForEach(this.tabs.ToArray())((tabItem: TabViewItemClass, index) => {
                    if (index === this._selectedTabIndex) {
                        return (
                            VStack(
                                tabItem._content as any
                            )
                        )
                    }
                }),
                HStack(
                    // Header
                    HStack({ alignment: cLeading })(
                        ...ForEach(this.tabs.ToArray())(tabItem => tabItem.GetHeader())
                    ).height('auto').width('100%'),
                    // Right Header
                    HStack({ alignment: cTrailing })(
                        ...ForEach(this.tabs.ToArray())(tabItem => tabItem.GetRightHeader())
                    ).height('auto').width('100%')
                ).height()
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
            const tabItem = getView(this.controller, item);
            if (tabItem instanceof TabViewItemClass) {
                this.tabs.Add(tabItem);
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
    console.log(subViews);
    return viewFunc(TabViewClass, (controller, propertyBag) => {
        return new TabViewClass().setController(controller).PropertyBag(propertyBag).setChilds(...subViews);
    });
}

export function TabViewItem(params: TabViewItemParameters): TabViewItemClass {
    return viewFunc(TabViewItemClass, (controller, propertyBag) => {
        return new TabViewItemClass().setController(controller).PropertyBag(propertyBag).name(params.name).header(params.header).rightHeader(params.rightHeader).content(params.content);
    });
}
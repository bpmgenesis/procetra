import { UIView, HStack, Alignment, IControl, VStack, cLeading, viewFunc, ViewProperty } from '@tuval/forms';

export class ListViewItemClass extends UIView {

    @ViewProperty()
    private _tag: any;

    @ViewProperty()
    private _selected: Function;

    public constructor() {
        super();
        this._selected = () => { };
    }

    public onSelected(func: Function) {
        this._selected = func as any;
        return this;
    }
    public tag(value: any) {
        this._tag = value;
        return this;
    }
    public setChilds(...args: any[]) {
        this.SubViews.Add(
            HStack({ alignment: cLeading, spacing: 10 })(
                ...args
            )
                .width('100%')
                .paddingLeft('5px')
                .cursor('pointer')
                .onClick(() => this._selected())
        );
        return this;
    }

}

export function ListView(...subViews: (UIView | IControl)[]): UIView {
    return VStack(...subViews).justifyContent('start').overflowX('hidden').overflowY('auto');
}

export function ListViewItem(...content: (UIView | UIView[])[]): ListViewItemClass {
    return viewFunc(ListViewItemClass, (controller, propertyBag) => {
        return new ListViewItemClass().setController(controller).PropertyBag(propertyBag).setChilds(...content).width('100%');
    });
}
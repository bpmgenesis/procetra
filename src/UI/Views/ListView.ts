import { UIView, HStack, Alignment, IControl, VStack } from '@tuval/forms';

export class ListViewItemClass extends UIView {
    private _tag: any;
    private _selected: () => void;
    private children: any[] = [];
    public Body(): UIView {
        this.SubViews.Add(
            HStack(
                this.children as any
            )
                .width('100%')
                .spacing('10px')
                .paddingLeft('5px')
                .alignment(Alignment.leading)
                .cursor('pointer')
                .onClick(() => this._selected())
        );
        return null;
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
        this.children = args;
        return this;
    }
    public Render() {
        this.Body();
        return super.Render();
    }
}

export function ListView(...subViews: (UIView | IControl)[]): UIView {
    return VStack(...subViews).justifyContent('start').overflowX('hidden').overflowY('auto');
}

export function ListViewItem(...subViews: (UIView | UIView[])[]): ListViewItemClass {
    return new ListViewItemClass().setChilds(...subViews).width('100%');
}
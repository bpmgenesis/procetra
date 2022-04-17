import { foreach } from "@tuval/core";
import { UIView, TFlexColumnContainer, ListMenu, IControl } from '@tuval/forms';


export class UIProjectItemsListClass extends UIView {

    private renderer: any;

    public constructor() {
        super();

    }

    /*  public GetControl(): Control {
         return this.button;
     } */
    public Render() {
        return this.renderer.render();
    }
}

export function UIProjectItemsList(...subViews: (UIView | IControl)[]): UIProjectItemsListClass {
    return new UIProjectItemsListClass().setChilds(...subViews);
}
import { Control, Teact, DomHandler, TComponent, State, ComponentCollection } from '@tuval/forms';
import { Type } from '@tuval/core';
import { DataObject } from '../../../Svg/Forms/DataObject';

DomHandler.addCssToDocument(require('./ListPalette.css'));

class ListPaletteCategoryHeader extends TComponent {
    @State()
    public Text: string;
    protected CreateElements<T>(param?: T) {
        return (
            <div class="panel__header">
                <div class="panel__title uppercase">
                    <a>{this.Text}</a>
                </div>
            </div>
        );
    }

}

let element: HTMLElement;

class ListPaletteItem extends TComponent {
    @State()
    public Text: string;

    @State()
    public Icon: string;

    @State()
    public Type:  Type | { new(): any };

    protected CreateElements<T>(param?: T) {
        return (
            <div class="ce-item with-icon ng-binding ng-scope ng-isolate-scope" draggable="true" ondragstart={(event: DragEvent) => {
                event.dataTransfer.effectAllowed = "copy";
                DataObject.CurrentDataObject = new DataObject(event.dataTransfer);
                DataObject.CurrentDataObject.SetData('Type', this.Type);
                element = document.createElement('div');
                element.innerText = 'Dragging';
                element.style['width'] = '10px';
                element.style['height'] = '10px';
                element.style['opacity'] = '0';
                document.body.append(element);
                event.dataTransfer.setDragImage(element, 5, 5);
            }
            }
                ondragend={
                    () => {
                        element.remove();
                    }
                }>
                <i class={this.Icon}></i>{this.Text}
            </div>
        );
    }
}

class ListPaletteCategory extends TComponent {
    @State()
    public Header: ListPaletteCategoryHeader;

    /* @State()
    public Items: ComponentCollection<ListPaletteItem>; */

    protected ListPaletteCategory() {
        this.Header = new ListPaletteCategoryHeader();
        //this.Items = new ComponentCollection<ListPaletteItem>(this);
    }

    public AddItem(item: string, icon: string, type:  Type | { new(): any }) {
        const lpi = new ListPaletteItem();
        lpi.Text = item;
        lpi.Icon = icon;
        lpi.Type = type;
        this.Components.Add(lpi);
    }
    protected CreateElements<T>(param?: T) {
        return (
            <div class="panel panel-default">
                {this.Header}
                {this.Components}
            </div>
        );
    }


}
export class ListPalette extends Control<ListPalette> {
    @State()
    private categories: ComponentCollection<ListPaletteCategory>;

    protected InitComponents(): void {
        this.categories = new ComponentCollection<ListPaletteCategory>(this);
    }
    public Add(header: string, item: string, icon: string, type: Type | { new(): any }) {
        const cat = this.categories.Find(_item => _item.Header.Text === header);
        if (cat != null) {
            cat.AddItem(item, icon, type);
        } else {
            const cat = new ListPaletteCategory();
            cat.Header.Text = header;
            this.categories.Add(cat);
            cat.AddItem(item, icon, type);
        }
    }
    protected override CreateElements() {
        return (
            <div class="panel-group" style={{ height: this.Height + 'px' }} >
                {this.categories}
            </ div>
        );
    }
}
import { Control, Teact, DomHandler } from '@tuval/forms';
import { BoxItemCollection } from './BoxTileItemCollection';

DomHandler.addCssToDocument(require('./BoxTile.css'));

export class BoxTile extends Control<BoxTile> {

    public get Title(): string {
        return this.GetProperty('Title');
    }

    public set Title(value: string) {
        this.SetProperty('Title', value);
    }

    public get Description(): string {
        return this.GetProperty('Description');
    }

    public set Description(value: string) {
        this.SetProperty('Description', value);
    }


    public get Items(): BoxItemCollection {
        return this.GetProperty('Items');
    }

    public set Items(value: BoxItemCollection) {
        this.SetProperty('Items', value);
    }

    public SetupControlDefaults(): void {
        super.SetupControlDefaults();
        this.Items = new BoxItemCollection(this);
    }

    private renderItems() {
        return this.Items.ToArray().map(item => {
            return (
                <div class="tile-item col-12 md:col-6 lg:col-3" onclick={e => item.OnClick()}>
                    <div class="px-5 py-3 surface-card shadow-2 border-round">
                        <div class="text-blue-600 font-medium line-height-3 mb-2" style='white-space: nowrap;'>{item.Title}</div>
                        <div class="text-900 font-bold line-height-3 text-2xl mb-2">{item.SubTitle}</div>
                        <p class="text-700 line-height-3 m-0">{item.FooterTitle}</p>
                    </div>
                </div>
            )
        });
    }
    public override CreateElements() {
        return (
            <div class='tuval-tile-box'>
                <div class="block-content"><div class="surface-ground px-4 py-8 md:px-6 lg:px-8">
                    <div class="surface-ground">
                        <div class="text-900 font-bold text-2xl line-height-2 mb-3">{this.Title}</div>
                        <p class="text-600 line-height-3 text-lg m-0 mb-5">{this.Description}</p>
                        <div class="tile-container grid">
                            {this.renderItems()}
                        </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }

}
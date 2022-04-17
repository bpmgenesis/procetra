import { VariantListMenuItem } from './VariantListMenuItem';
import { ListMenu } from '@tuval/forms';
import { FilterListMenuItem } from './FilterListMenuItem';

export class VariantListMenu extends ListMenu {
    public constructor() {
        super();

        const filterItem = new FilterListMenuItem();

        this.Items.Add(filterItem as any);

        const variantItem = new VariantListMenuItem();
        this.Items.Add(variantItem);

        const variantItem1 = new VariantListMenuItem();
        this.Items.Add(variantItem1);

        const variantItem2 = new VariantListMenuItem();
        this.Items.Add(variantItem2);
    }
}
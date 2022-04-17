import { CGColor } from '@tuval/cg';
import { SelectFilterListMenuIten } from './FilterListMenuIten';
import { ListMenu } from '@tuval/forms';
export class SelectFilterListMenu extends ListMenu {
    public constructor() {
        super();

        this.Appearance.BackgroundColor = 'white';
        this.Appearance.Border = 'solid 1px gray';
        this.Appearance.Height = '500px';

        const item = new SelectFilterListMenuIten();
        item.Title = 'Attribute filter';
        item.Description = 'Select cases based on specified attributes.';
        item.IconColor = CGColor.FromRgba(0x87, 0xc9, 0x9b);
        item.Icon = '\\f07d';

        const item1 = new SelectFilterListMenuIten();
        item1.Icon = '\\f0e7';
        item1.Title = 'Activity filter';
        item1.Description = 'Select cases based on specified attributes.';
        item1.IconColor = CGColor.FromRgba(0x9c, 0x68, 0xcd);

        const item2 = new SelectFilterListMenuIten();
        item2.Icon = '\\f104';
        item2.Title = 'Timeframe filter';
        item2.Description = 'Select cases where duration between two activities is faster/slower than defined period of time.';
        item2.IconColor = CGColor.FromRgba(0xe3, 0xa9, 0x14);

        const item3 = new SelectFilterListMenuIten();
        item3.Icon = '\\f143';
        item3.Title = 'Performance filter';
        item3.Description = 'Select cases where duration between two activities is faster/slower than defined period of time.';
        item3.IconColor = CGColor.FromRgba(118, 186, 203);

        const item4 = new SelectFilterListMenuIten();
        item4.Icon = '\\f145';
        item4.Title = 'Variant filter';
        item4.Description = 'Select cases where duration between two activities is faster/slower than defined period of time.';
        item4.IconColor = CGColor.FromRgba(164, 157, 209);

        const item5 = new SelectFilterListMenuIten();
        item5.Icon = '\\f0eb';
        item5.Title = 'Process flow filter';
        item5.Description = 'Select cases where duration between two activities is faster/slower than defined period of time.';
        item5.IconColor = CGColor.FromRgba(0x14, 0xa9, 0xd5);



        this.Items.Add(item);
        this.Items.Add(item1);
        this.Items.Add(item2);
        this.Items.Add(item3);
        this.Items.Add(item4);
        this.Items.Add(item5);
    }


}
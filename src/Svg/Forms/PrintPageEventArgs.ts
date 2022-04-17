import { PageSettings } from './PageSettings';
import { Graphics } from '@tuval/graphics';
import { CGRectangle } from '@tuval/cg';
import { EventArgs } from './EventArgs';
export class PrintPageEventArgs extends EventArgs {
    public MarginBounds: CGRectangle;
    public Graphics: Graphics;
    public PageSettings: PageSettings;
    public HasMorePages: boolean;
}
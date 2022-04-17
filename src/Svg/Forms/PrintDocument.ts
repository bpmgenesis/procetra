import { PageSettings } from './PageSettings';
import { PrintPageEventHandler } from './PrintPageEventHandler';
import { Event } from '@tuval/core';

export class PrintDocument {
    public PrintPage: Event<PrintPageEventHandler>;
    public DocumentName: string;
    public DefaultPageSettings: PageSettings;

    public print() {

    }
}
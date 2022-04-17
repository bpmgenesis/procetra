import { EventArgs } from './EventArgs';
import { ScrollEventType } from './ScrollEventType';
import { ScrollOrientation } from './ScrollOrientation';

export class ScrollEventArgs extends EventArgs {
    public NewValue: number;
    public OldValue: number;
    public ScrollOrientation: ScrollOrientation;
    public Type: ScrollEventType;

    public constructor(type: ScrollEventType, newValue: number);
    public constructor(type: ScrollEventType, newValue: number, scroll: ScrollOrientation);
    public constructor(type: ScrollEventType, oldValue: number, newValue: number);
    public constructor(type: ScrollEventType, oldValue: number, newValue: number, scroll: ScrollOrientation);
    public constructor(...args: any[]) {
        super();
    }

}
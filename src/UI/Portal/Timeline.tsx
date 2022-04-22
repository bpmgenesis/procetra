import { Teact, Control } from '@tuval/forms';
import { TimelineInitialized } from './TimelineInitialized';
import { TimelineEventConsole } from './TimelineEventConsole';
import { TimelineEventError } from './TimelineEventError';


export class Timeline extends Control<Timeline> {
    public SetupControlDefaults(): void {
        super.SetupControlDefaults();

    }

    private renderItems(): any[] {
        return [new TimelineEventError(),new TimelineEventConsole(),new TimelineInitialized()].map(item=>{
            return (item as any).CreateMainElement();
        });
    }
    public CreateElements() {
        if (!this.Visible) {
            return;
        }
        return (
            <div class='entire-timeline'>
              {this.renderItems()}
            </div>
        );
    }
}
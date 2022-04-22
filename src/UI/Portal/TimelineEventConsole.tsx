import { Teact, Control } from '@tuval/forms';


export class TimelineEventConsole extends Control<TimelineEventConsole> {
    public SetupControlDefaults(): void {
        super.SetupControlDefaults();

    }
    public CreateElements() {
        if (!this.Visible) {
            return;
        }
        return (
            <div class="timeline-event clear-floats console">
                <div class="timeline-event-line">
                    <div class="outer-dot console"></div>
                    <div class="inner-dot console"></div>
                    <div class="vertical-line"></div>
                </div>
                <div class="timeline-event-container console">
                    <div class="timeline-event-header clear-floats">
                        <div class="event-logo console">
                            <i class="icon-console"></i>&nbsp;&nbsp;Console
                        </div>
                        <div class="event-timestamp" title="2021-09-15T13:47:50.5240000+00:00">
                            -0.01 sec
                        </div>
                    </div>
                    <div class="timeline-event-body clear-floats">
                        <div>
                            <div class="timeline-body-label">Severity:</div>
                            <div class="event-text"><span class="console-severity">log</span></div>
                        </div>
                        <div>
                            <div class="timeline-body-label">Message:</div>
                            <div class="event-text extreme-wrap-word">
                                <pre class="console-message-new ">Log 1</pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
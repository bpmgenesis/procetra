import { Teact, Control } from '@tuval/forms';


export class TimelineInitialized extends Control<TimelineInitialized> {
    public SetupControlDefaults(): void {
        super.SetupControlDefaults();

    }
    public CreateElements() {
        if (!this.Visible) {
            return;
        }
        return (
            <div class="timeline-event clear-floats script-init">
                <div class="timeline-event-line">
                    <div class="outer-dot script-init"></div>
                    <div class="inner-dot script-init"></div>
                    <div class="vertical-line"></div>
                </div>
                <div class="timeline-event-container script-init">
                    <div class="timeline-event-header clear-floats">
                        <div class="event-logo script-init">
                            <i class="fa fa-play"></i>&nbsp;&nbsp;Initialized
                        </div>
                        <div class="pull-left event-timestamp">&nbsp;&nbsp;&nbsp;Monitoring started</div>
                        <div class="event-timestamp" title="2021-09-15T13:47:50.5260000+00:00">
                            15.09.2021 16:47:50 (-0.00 sec before error)
                        </div>
                    </div>
                    <div class="timeline-event-body clear-floats">
                        <div>
                            <div class="timeline-body-label">Original Url:</div>
                            <div class="event-text extreme-wrap-word">
                                file:///D:/DemoApp/test/track.html
                                &nbsp;(<a href="file:///D:/DemoApp/test/track.html" target="_blank" data-no-ajax="true">External Link <i class="fa fa-external-link"></i></a>)
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
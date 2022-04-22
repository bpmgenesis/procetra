import { Teact, Control } from '@tuval/forms';


export class TimelineEventError extends Control<TimelineEventError> {
    public SetupControlDefaults(): void {
        super.SetupControlDefaults();

    }
    public CreateElements() {
        if (!this.Visible) {
            return;
        }
        return (
            <div class="timeline-event clear-floats error first">
                <div class="timeline-event-line">
                    <div class="outer-dot error"></div>
                    <div class="inner-dot error"></div>
                    <div class="vertical-line"></div>
                </div>
                <div class="timeline-event-container error">
                    <div class="timeline-event-header clear-floats">
                        <div class="event-logo error">
                            <i class="icon-messages"></i>&nbsp;&nbsp;Direct Error
                        </div>
                        <div class="event-timestamp" title="
                                    +0.00 sec
                                ">2021-09-15T13:09:46.6510000+00:00</div>
                    </div>
                    <div class="timeline-event-body clear-floats">

                        <div class="timeline-body-label">Message:</div>
                        <pre class="error-text extreme-wrap-word">Cannot read properties of undefined (reading 'mer')</pre>
                        <div>
                            <div class="timeline-body-label">Type:</div>
                            <div class="event-text">
                                Custom error <i class="fa fa-info-circle entry-info-icon"></i>
                                <div class="entry-info-message">
                                    <p>The message was</p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="timeline-event-footer clear-floats">
                        <a class="more-errors-with-message" href="/errors/filtered?hash=db99a286df217761">
                            <i class="icon-more"></i>&nbsp;More errors with this message
                        </a>
                        <a class="google-error" title="Google this error" href="http://www.google.com/search?q=Cannot+read+properties+of+undefined+(reading+%27mer%27)" target="_blank">
                            <i class="icon-google-logo"></i>&nbsp;Google error
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}
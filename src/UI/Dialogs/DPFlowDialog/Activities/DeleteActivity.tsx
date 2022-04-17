import { Control, Teact, DomHandler, Property } from '@tuval/forms';
import { Activity, ActivityBase } from './Activity';

export class DeleteActivity extends ActivityBase {
    public ConfigRequired: boolean = false;

    private Name: string = 'Delete';

    public Config() {

    }
    public Init() {

    }

    public Render() {
        return (
            <div class="grid" draggable="true">
                <div class="col"></div>
                <div class="col flex align-items-center justify-content-center">
                    <div class="shadow-block">
                        <div class="highest-impact">
                            <div id="highest-impact-chart"></div>
                            <h2 class="flex align-items-center justify-content-center">
                                <i class="fa fa-area-chart"></i>&nbsp;{this.Name}
                            </h2>
                        </div>
                    </div>
                </div>
                <div class="col"></div>
            </div>


        );
    }
}
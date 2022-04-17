import { Control, Teact } from '@tuval/forms';

export class DPFPalette extends Control<DPFPalette> {
    private drag(ev,activity_type ) {
        ev.dataTransfer.setData("text", activity_type);
    }

    CreateElements() {
        return (
            <div>
                <div draggable="true" ondragstart={(event) => this.drag(event,"CSVDataSource")} width="336" height="69">
                    CSV Data Source
                </div>
                <div  draggable="true" ondragstart={(event) => this.drag(event,"XESDataSource")} width="336" height="69">
                    XES Data Source
                </div>
            </div>
        );
    }

}
import { UIController } from '@tuval/forms';
import { CustomPageController } from '../../CustomPage/Controllers/CustomPageController';
import { DatasetController } from '../../Dataset/Controllers/DatasetController';
import { IProjectModel, IMiningModelModel } from '@procetra/common';


export interface MIProjectItem {
    project_item_id: string;
    name: string;
    type: string;
}

export interface MVIProjectItem extends MIProjectItem {
    icon: string;
    controller: UIController;
}

export function CreateMVIProjectItem(project: IProjectModel, miningModel: IMiningModelModel): MVIProjectItem {
    return {
        project_item_id: '',
        name: '',
        type: '',
        icon: '\\f050',
        controller: DatasetController(project, miningModel)
    }

}
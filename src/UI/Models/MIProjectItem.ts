import { UIController } from '@tuval/forms';
import { DatasetController } from '../Controllers/DatasetController/DatasetController';
import { CustomPageController } from '../Controllers/CustomPageController/CustomPageController';

export interface MIProjectItem {
    project_item_id: string;
    name: string;
    type: string;
}

export interface MVIProjectItem extends MIProjectItem {
   icon: string;
   controller:UIController;
}

export function CreateMVIProjectItem(model:MIProjectItem ):MVIProjectItem {
    if (model.type === 'Dataset') {
        return {
            project_item_id: model.project_item_id,
            name: model.name,
            type: model.type,
            icon: '\\f050',
            controller: new DatasetController()
        }
    } else  if (model.type === 'Dashboard') {
        return {
            project_item_id: model.project_item_id,
            name: model.name,
            type: model.type,
            icon: '\\f0b3',
            controller: new CustomPageController()
        }
    }
    return {} as any;
}
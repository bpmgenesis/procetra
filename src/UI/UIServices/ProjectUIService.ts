import { DialogResult } from '@tuval/forms';
import { NewProjectDialog } from '../Dialogs/NewProjectDialog';
import { IProject } from "../../Bussiness/IProject";
import { OpenProjectDialog } from '../Dialogs/OpenProjectDialog';
import { MIProject } from '../Models/ProjectModel';

export class ProjectUIService {
    public static NewProject(): Promise<any> {
        return new Promise((resolve, reject) => {
            const npd = new NewProjectDialog();
            npd.ShowDialogAsync().then(projectInfo => {
                alert(JSON.stringify(projectInfo));
                resolve(projectInfo);
            })
        });

    }
    public static OpenProjectDialog(): Promise<any> {
        return new Promise((resolve, reject) => {
            const npd = new OpenProjectDialog();
            npd.ShowDialogAsync().then((project:any) => {
                resolve(project);
            })
        });

    }
}
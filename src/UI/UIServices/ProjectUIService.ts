import { CreateNewProjectDialog } from './../Dialogs/CreateNewProjectDialog/CreateNewProjectDialog';
import { NewProjectDialog } from '../Dialogs/NewProjectDialog';
import { OpenProjectDialog } from '../Dialogs/OpenProjectDialog';

export class ProjectUIService {
    public static NewProject(): Promise<any> {
        return new Promise((resolve, reject) => {
            const npd = new CreateNewProjectDialog();
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
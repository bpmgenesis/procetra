import { AddEditAnalyseModelNameDialog } from '../Dialogs/AddEditAnalyseModelName/AddEditAnalyseModelNameController';


export class AnalyseModelUIService {
    public static AddEditAnalyseModelName(): Promise<string> {
        return new Promise((resolve, reject) => {
            const npd = new AddEditAnalyseModelNameDialog();
            npd.ShowDialogAsync().then((name: string) => {
                resolve(name);
            })
        });
    }
}
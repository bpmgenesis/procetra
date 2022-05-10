import { SelectFilterDialog } from '../Dialogs/SelectFilterDialog/SelectFilterDialog';

export class FilterUIService {
    public static SelectFilter(): Promise<string> {
        return new Promise((resolve, reject) => {
            const npd = new SelectFilterDialog();
            npd.ShowDialogAsync().then((name: string) => {
                resolve(name);
            })
        });
    }
}
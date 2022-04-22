import { Dialog, FileUpload } from '@tuval/forms';

export class CvsImportDialog extends Dialog {
    public override InitComponents() {

        const fileUpload = new FileUpload();
        this.Controls.Add(fileUpload);
    }
}
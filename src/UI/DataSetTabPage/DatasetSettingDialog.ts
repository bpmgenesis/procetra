import { Dialog } from '@tuval/forms';
export class DatasetSettingDialog extends Dialog {
    public override InitComponents() {
        this.Text = 'Dataset Settings';
        this.Width = 600;
        this.Height = 400;

    }
}
import { Dialog, FormLayout, FormLayoutModes, TTextBox, ComboBox, Button } from '@tuval/forms';
import { Event } from '@tuval/core';
import { DPFControl } from '../../DPFControl';

export class ConfigDialog extends Dialog {
    private cbDataSource: ComboBox;
    private cbFirstColumn: ComboBox;
    private cbSecondColumn: ComboBox;
    private cbTargetColumn: ComboBox;
    private txtSeperator: TTextBox;
    public OkButtonClicked: any = new Event();

    public get DataSourceName(): string {
        if (this.cbDataSource.SelectedItem != null) {
            return this.cbDataSource.SelectedItem.Text;
        }
        return null;
    }

    public get FirstColumnName(): string {
        if (this.cbFirstColumn.SelectedItem != null) {
            return this.cbFirstColumn.SelectedItem.Text;
        }
        return null;
    }

    public get SecondColumnName(): string {
        if (this.cbSecondColumn.SelectedItem != null) {
            return this.cbSecondColumn.SelectedItem.Text;
        }
        return null;
    }

    public get Seperator(): string {
        return this.txtSeperator.Text;
    }

    public get TargetColumnName(): string {
        if (this.cbTargetColumn.SelectedItem != null) {
            return this.cbTargetColumn.SelectedItem.Text;
        }

        return null;
    }

    protected InitComponents(): void {
        this.Width = 500;
        this.Height = 500;

        this.Text = 'Change Case Config';

        const formLayout = new FormLayout();
        formLayout.Layout = FormLayoutModes.Vertical;

        this.Controls.Add(formLayout);

        this.cbDataSource = new ComboBox();
        this.cbDataSource.Label = 'Data Source';

        this.cbFirstColumn = new ComboBox();
        this.cbFirstColumn.Label = 'First Column';

        this.cbSecondColumn = new ComboBox();
        this.cbSecondColumn.Label = 'Second Column';

        this.txtSeperator = new TTextBox();
        this.txtSeperator.Label = 'Seperator';

        this.cbTargetColumn = new ComboBox();
        this.cbTargetColumn.Label = 'Target Column';

        this.cbTargetColumn.Editable = true;

        formLayout.Controls.Add(this.cbDataSource);
        formLayout.Controls.Add(this.cbFirstColumn);
        formLayout.Controls.Add(this.cbSecondColumn);
        formLayout.Controls.Add(this.txtSeperator);
        formLayout.Controls.Add(this.cbTargetColumn);

        const btnOK = new Button();
        btnOK.Text = 'OK';
        btnOK.Color = 2;
        btnOK.Clicked = (() => {
            this.OnOKClick();

        }) as any;

        const btnCancel = new Button();
        btnCancel.Text = 'Cancel';
        btnCancel.Color = 1;
        btnCancel.Clicked = (() => {

            this.Hide();
        }) as any;

        this.FooterControls.AddRange([btnOK, btnCancel]);
    }
    public SetFlowVariables(dpf: DPFControl, variables: any) {

        this.cbDataSource.Items.Clear();
        this.cbFirstColumn.Items.Clear();
        this.cbSecondColumn.Items.Clear();
        this.cbTargetColumn.Items.Clear();

        const datasources = dpf.GetDataSources();
        if (datasources) {
            datasources.forEach(item => this.cbDataSource.Items.Add(item.GetDataSourceName()));
        }

        this.cbDataSource.OnChanged.add((selectedItem) => {
            const datasource = dpf.GetDataSource(selectedItem.Text);
            const cols = datasource.GetColumns();
            if (cols) {
                this.cbFirstColumn.Items.Clear();
                this.cbSecondColumn.Items.Clear();
                this.cbTargetColumn.Items.Clear();

               cols.forEach(item => this.cbFirstColumn.Items.Add(item));
               cols.forEach(item => this.cbSecondColumn.Items.Add(item));
               cols.forEach(item => this.cbTargetColumn.Items.Add(item));
            }
        });
    }
    private OnOKClick() {
        this.OkButtonClicked();
        this.Hide();
    }
}
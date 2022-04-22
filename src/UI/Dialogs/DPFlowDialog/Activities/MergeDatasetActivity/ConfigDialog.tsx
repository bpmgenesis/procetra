import { Dialog, FormLayout, FormLayoutModes, TTextBox, ComboBox, Button } from '@tuval/forms';
import { Event } from '@tuval/core';
import { DPFControl } from '../../DPFControl';

export class ConfigDialog extends Dialog {
    private cbDataSourceOne: ComboBox;
    private cbLeftColumn: ComboBox;
    private cbDatasourceTwo: ComboBox;
    private cbRightColumn: ComboBox;
    public OkButtonClicked: any = new Event();

    public get DatasourceOne(): string {
        if (this.cbDataSourceOne.SelectedItem != null) {
            return this.cbDataSourceOne.SelectedItem.Text;
        }
        return null;
    }

    public get LeftColumn(): string {
        if (this.cbLeftColumn.SelectedItem != null) {
            return this.cbLeftColumn.SelectedItem.Text;
        }
        return null;
    }

    public get DatasourceTwo(): string {
        if (this.cbDatasourceTwo.SelectedItem != null) {
            return this.cbDatasourceTwo.SelectedItem.Text;
        }
        return null;
    }

    public get RightColumn(): string {
        if (this.cbRightColumn.SelectedItem != null) {
            return this.cbRightColumn.SelectedItem.Text;
        }

        return null;
    }

    protected InitComponents(): void {
        this.Width = 500;
        this.Height = 500;

        this.Text = 'Merge Dataset Config';

        const formLayout = new FormLayout();
        formLayout.Layout = FormLayoutModes.Vertical;

        this.Controls.Add(formLayout);

        this.cbDataSourceOne = new ComboBox();
        this.cbDataSourceOne.Label = 'Data Source One';

        this.cbLeftColumn = new ComboBox();
        this.cbLeftColumn.Label = 'Left Column';

        this.cbDatasourceTwo = new ComboBox();
        this.cbDatasourceTwo.Label = 'Data Source Two';

        this.cbRightColumn = new ComboBox();
        this.cbRightColumn.Label = 'Right Column';

        formLayout.Controls.Add(this.cbDataSourceOne);
        formLayout.Controls.Add(this.cbLeftColumn);
        formLayout.Controls.Add(this.cbDatasourceTwo);
        formLayout.Controls.Add(this.cbRightColumn);

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

        this.cbDataSourceOne.Items.Clear();
        this.cbLeftColumn.Items.Clear();
        this.cbDatasourceTwo.Items.Clear();
        this.cbRightColumn.Items.Clear();

        const datasources = dpf.GetDataSources();
        if (datasources) {
            datasources.forEach(item => this.cbDataSourceOne.Items.Add(item.GetDataSourceName()));
            datasources.forEach(item => this.cbDatasourceTwo.Items.Add(item.GetDataSourceName()));
        }

        this.cbDataSourceOne.OnChanged.add((selectedItem) => {
            const datasource = dpf.GetDataSource(selectedItem.Text);
            const cols = datasource.GetColumns();
            if (cols) {
                this.cbLeftColumn.Items.Clear();
               cols.forEach(item => this.cbLeftColumn.Items.Add(item));
            }
        });

        this.cbDatasourceTwo.OnChanged.add((selectedItem) => {
            const datasource = dpf.GetDataSource(selectedItem.Text);
            const cols = datasource.GetColumns();
            if (cols) {
                this.cbRightColumn.Items.Clear();
               cols.forEach(item => this.cbRightColumn.Items.Add(item));
            }
        });
    }
    private OnOKClick() {
        this.OkButtonClicked();
        this.Hide();
    }
}
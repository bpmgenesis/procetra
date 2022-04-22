import { Dialog, FormLayout, FormLayoutModes, TTextBox, Button, LayoutPanel } from '@tuval/forms';
import { Info } from './Info';

export class MONGODBConnectionDialog extends Dialog {
    public override InitComponents() {
        this.Text = 'Set up MongoDB data source';
        this.Width = 1000;
        this.Height = 700;

        const mainLayout = new LayoutPanel();
        mainLayout.LeftSize = 500;

        const info = new Info();
        mainLayout.LeftControl = info;

        const layout = new FormLayout();
        layout.Layout = FormLayoutModes.Vertical;

        const txtConName = new TTextBox();
        txtConName.Label = 'Connection name*';
        layout.Controls.Add(txtConName);

        const txtHost = new TTextBox();
        txtHost.Label = 'Host*';
        layout.Controls.Add(txtHost);

        const txtReplica = new TTextBox();
        txtReplica.Label = 'Replica Set*';
        layout.Controls.Add(txtReplica);

        const txtSchema = new TTextBox();
        txtSchema.Label = 'Authentication Database*';
        txtSchema.Text = '';
        layout.Controls.Add(txtSchema);

        const txtDatabase = new TTextBox();
        txtDatabase.Label = 'Database*';
        layout.Controls.Add(txtDatabase);


        const txtUsername = new TTextBox();
        txtUsername.Label = 'Username*';
        layout.Controls.Add(txtUsername);

        const txtPassword = new TTextBox();
        txtPassword.Label = 'Password*';
        layout.Controls.Add(txtPassword);

        const txtPort = new TTextBox();
        txtPort.Text = '27017';
        txtPort.Label = 'Port*';
        layout.Controls.Add(txtPort);

        const txtAuthMec = new TTextBox();
        txtAuthMec.Text = 'SCRAM-SHA-1';
        txtAuthMec.Label = 'Authentication Mechanism*';
        layout.Controls.Add(txtAuthMec);

        const txtSSL = new TTextBox();
        txtSSL.Text = 'SSL*';
        txtSSL.Label = 'false';
        layout.Controls.Add(txtSSL);


        mainLayout.RightControl = layout;
        this.Controls.Add(mainLayout);

        const btnOK = new Button();
        btnOK.Text = 'OK';
        btnOK.Color = 2;
        btnOK.Clicked = (() => {


        }) as any;

        const btnCancel = new Button();
        btnCancel.Text = 'Cancel';
        btnCancel.Color = 1;
        btnCancel.Clicked = (() => {

            this.Hide();
        }) as any;

        this.FooterControls.AddRange([btnOK, btnCancel]);
    }
}
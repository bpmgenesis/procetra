import { Dialog, TTextBox, FormLayout, Button, Teact, DomHandler, Property, Panel, ControlHtmlRenderer, Desktop } from '@tuval/forms';
import { Delegate, Event, instance as container, classNames, EventBus } from '@tuval/core';
import { NewProjectListView } from './NewProjectListView';

DomHandler.addCssToDocument(`
    .tvl-control-MyButton {
            display: inline-block;
            margin-right: 8px
        }

    .tvl-control-MyButton button {
        position: relative;
        text-align: center;
        border-radius: 6px;
        padding: 7px 20px 8px;
        font-family: LatoMedium, sans-serif;
        display: inline-block;
        box-sizing: border-box;
        cursor: pointer;
        outline: 0;
        border-width: 1px;
        border-style: solid;
        margin-right: 0!important
    }

    .tvl-control-MyButton:disabled {
        cursor: not-allowed;
        opacity: 1;
        pointer-events: none
    }

    .tvl-control-MyButton .lyteDefaultBtn {
        padding: 6px 20px 7px;
        box-shadow: 0 -1px 0 0 #d0d4df inset;
        min-width: 31px;
        background: linear-gradient(#fcfdff 0, #eaeef5 100%) no-repeat padding-box;
        color: #222833;
        border: 1px solid #d0d4df
    }

    .tvl-control-MyButton .lyteDefaultBtn:hover {
        background: linear-gradient(#fcfdff 0, #dee5f1 100%) no-repeat padding-box;
        border: 1px solid #d0d4df
    }

    .tvl-control-MyButton .lytePrimaryBtn {
        box-shadow: 0 -2px 0 0 #0061ca inset;
        min-width: 31px;
        width: auto;
        text-decoration: none;
        text-align: center;
        appearance: none;
        background: linear-gradient(to top, #0279ff, #00a3f3) no-repeat padding-box;
        color: #fff;
        border: 0
    }

    .tvl-control-MyButton .lytePrimaryBtn:hover {
        box-shadow: 0 -2px 0 0 #0159b9 inset;
        background: linear-gradient(#02acff 0, #006be4 100%) no-repeat padding-box;
        color: #fff;
        border: 0
    }

`);



enum ButtonType {
    Primary = 0,
    Default = 1
}
class MyButton extends Button {
    @Property()
    private myButtonType;

    public get ButtonType(): ButtonType {
        return this.myButtonType;
    }
    public set ButtonType(value: ButtonType) {
        this.myButtonType = value;
    }
    protected SetupControlDefaults(): void {
        super.SetupControlDefaults();
        this.myButtonType = ButtonType.Default;
    }
    protected GetRenderer(): any {
        class Test extends ControlHtmlRenderer<MyButton> {
            public GenerateBody(obj: MyButton): void {
                const className = classNames('lyte-button', {
                    'lytePrimaryBtn': obj.ButtonType === ButtonType.Primary,
                    'lyteDefaultBtn': obj.ButtonType === ButtonType.Default,
                } as any);
                this.WriteComponent(
                    <button type="button" class={className} onClick={() => obj.Clicked()}>
                        {obj.Text}
                    </button>
                );
            }

        };
        return Test as any;
    }
}

export class BlankProjectDialog extends Dialog {
    public OKButtonClick: any = new Event();
    public txtName: TTextBox;
    public override InitComponents() {
        this.Text = 'New Project';
        this.Width = 300;
        this.Height = 300;


        const formLayout = new FormLayout();
        this.txtName = new TTextBox();
        this.txtName.Label = 'Name';
        this.txtName.Autofocus = true;
        this.txtName.KeyDown.add((e) => {
            if (e.keyCode === 13) {
                this.OKButtonClick();
                this.Hide();
            }
        });

        formLayout.Controls.Add(this.txtName);

        this.Controls.Add(formLayout);

        const panel = new Panel();
        const txtSurname = new TTextBox();
        txtSurname.Text = 'Test';
        panel.Controls.Add(txtSurname);

        //this.Controls.Add(panel);

        const btnOK = new MyButton();
        btnOK.ButtonType = ButtonType.Primary;
        btnOK.Text = 'OK';
        btnOK.Color = 2;
        btnOK.Clicked = (() => {
            this.OKButtonClick();
            this.Hide();
        }) as any;

        const btnCancel = new MyButton();
        btnCancel.Text = 'Cancel';
        btnCancel.Color = 1;
        btnCancel.Clicked = (() => {
            this.Hide();
        }) as any;

        this.FooterControls.AddRange([btnOK, btnCancel]);
    }

}
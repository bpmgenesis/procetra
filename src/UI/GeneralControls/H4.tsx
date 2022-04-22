import { Control, Teact } from '@tuval/forms';

export class H4 extends Control<H4> {
    public override CreateElements(): any {
        return (
            <div style={this.GetStyleObject()}>
                <h4>{this.Text}</h4>
            </div>
        );
    }
}
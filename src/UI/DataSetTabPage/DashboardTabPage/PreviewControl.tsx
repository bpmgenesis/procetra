import { Control, Teact, State } from '@tuval/forms';
export class PreviewControl extends Control<PreviewControl> {

    @State()
    public Title: string;

    @State()
    public SubTitle: string;

    @State()
    public ClassName: string;

    protected CreateElements(param: any) {

        const className = this.ClassName;
        return (
            <div style={{ display: 'block', textAlign: 'center' }}>
                <i style={{ display: 'inline-block' }} class={className}></i>
                <div style={{ fontSize: '20px', lineHeight: '20px', color: '#666', marginTop: '20px' }}>{this.Title}</div>
                <div style={{ fontSize: '14px', color: '#888' }}>{this.SubTitle}</div>
            </div>
        );
    }
}
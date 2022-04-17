/* import { Control, Teact, Property } from '@tuval/forms';
import { TuShape } from './TuShape';
import { TuGroup } from './TuGroup/TuGroup';
import { TuObject } from './TuObject';
import { TuDocument } from './TuDocument';
import { TuLayer } from './TuLayer/TuLayer';

export class _TuView extends Control<TuView> {
    Ref: any;

    public IsPrinting: boolean = false;

    @Property()
    public Document: TuDocument;

    @Property()
    private pathElementForCalc: SVGPathElement;

    public SetupControlDefaults() {
        super.SetupControlDefaults();
        this.Document = new TuDocument();
    }
    protected componentDidMount(): void {
        this.Document.ToArray().forEach((item: TuObject) => {
            item.SvgDocument = this.Ref;
            if (item instanceof TuGroup) {
                item.ToArray().forEach((item: TuObject) => {
                    item.SvgDocument = this.Ref;
                });
            }
        });
    }

    private renderLayer(layer: TuLayer) {
        return (layer as any).CreateMainElement();
    }
    private renderLayers() {
        return this.Document.Layers.ToArray().map(item => {
            return (<g>{this.renderLayer(item)}</g>)
        });
    }
    private renderDocumentLinksLayer() {
        return this.Document.LinksLayer.ToArray().map(item => {
            return (item as any).CreateMainElement();
        });
    }
    private renderDocumentDefaultLayer() {
        return (this.Document.DefaultLayer as any).CreateMainElements();
    }
    private renderDocument() {
        return [
            <g id="links-layer">{this.renderDocumentLinksLayer()}</g>,
            <g id="default-layer">{this.renderDocumentDefaultLayer()}</g>,
            this.renderLayers()
        ]
    }

    private renderControls() {
        return this.renderDocument();
    }
    public CreateElements() {
        return (
            <svg ref={(e) => this.Ref = e} viewBox="0 0 900 300" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="drop-shadow" height="200%" width="200%" x="-50%" y="-50%" filterUnits="objectBoundingBox">
                        <feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="1.5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.075 0" in="shadowBlurOuter1" type="matrix" result="shadowMatrixOuter1"></feColorMatrix>
                        <feMerge><feMergeNode in="shadowMatrixOuter1"></feMergeNode>
                            <feMergeNode in="SourceGraphic"></feMergeNode></feMerge>
                    </filter>
                </defs>
                {this.renderControls()}
            </svg>
        );
    }

} */
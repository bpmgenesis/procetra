import { Control, Teact, DomHandler, Fragment, Modes, React, State } from '@tuval/forms';
import { Encoding, Convert, Event } from '@tuval/core';
import UncontrolledReactSVGPanZoom from './components/svgviewer/uncontrolled-viewer';
import { ReactSvgPanZoomLoader } from './components/svgviewer/ReactSvgPanZoomLoader';

DomHandler.addCssToDocument(require('./SvgViewer.css'));

const Pannable = (EL) => {

    const EL_canvas = EL.firstElementChild;
    const initial = { x: 0, y: 0 };
    const offset = { x: 0, y: 0 }; // The transform offset (from center)
    let isPan = false;

    const getXY = ({ clientX, clientY }) => {
        const { left, top } = EL.getBoundingClientRect();
        return { x: clientX - left, y: clientY - top }
    };

    const panStart = (ev) => {
        ev.preventDefault();
        isPan = true;
        const { x, y } = getXY(ev);
        initial.x = x - offset.x;
        initial.y = y - offset.y;
    };

    const panMove = (ev) => {
        if (!isPan) return; // Do nothing
        const { x, y } = getXY(ev);
        offset.x = x - initial.x;
        offset.y = y - initial.y;
        EL_canvas.style.transform = `translate(${offset.x}px, ${offset.y}px)`;
    };

    const panEnd = (ev) => {
        isPan = false;
    };

    EL.addEventListener("mousedown", panStart);
    document.addEventListener("mousemove", panMove);
    document.addEventListener("mouseup", panEnd);
};

export class SvgViewer extends Control<SvgViewer> {
    viewerElement: HTMLElement;
    public SvgLoaded: Event<any>;
    private Viewer: any;

    refPanAndZoom: any;
    refSvg: SVGElement;

    public get SvgString(): string {
        return this.GetProperty('SvgString');
    }
    public set SvgString(value: string) {
        this.SetProperty('SvgString', value);
    }

    public SetupControlDefaults() {
        super.SetupControlDefaults();
        this.SvgString = '<svg></svg>';
        this.SvgLoaded = new Event();
        this.Width = 500;
    }
    public componentDidMount() {

        /*   document.querySelectorAll(".viewport").forEach(Pannable);
          if (this.SvgElement) {
              this.SvgElement.innerHTML = this.SvgString;
          } */
    }

    private parseSvg(stringContainingXMLSource: string) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(stringContainingXMLSource, "image/svg+xml");
        return doc;
    }
    public override CreateElements(): any {
        const encodedSvg = Convert.ToBase64String(Encoding.UTF8.GetBytes(this.SvgString));
        const imageUrl = 'data:image/svg+xml;base64,' + encodedSvg;
        /*  return (

              <div ref={(e) => this.viewerElement = e} id={this.Id} class="viewport" style={this.GetStyleObject()}>
                  <div id={this.Id + '_svg'} ref={e => this.SvgElement = e}></div>
              </div>
          ); */
        /*  return (<UncontrolledReactSVGPanZoom
             ref={(e) => this.Viewer = e}
             width={500} height={500}
             onZoom={e => console.log('zoom')}
             onPan={e => console.log('pan')}
             onClick={event => console.log('click', event.x, event.y, event.originalEvent)}
         >
             {this.SvgString}
         </UncontrolledReactSVGPanZoom>); */

        const width = this.Width < 0 ? Math.abs(this.Width) + '%' : this.Width;
        const height = this.Height < 0 ? Math.abs(this.Height) + '%' : this.Height;

        const result = (<ReactSvgPanZoomLoader svgXML={this.SvgString}
            render={content => (
                <UncontrolledReactSVGPanZoom ref={(e) => this.refPanAndZoom = e} tool='pan' background='#FFFFFF' width={width} height={height}>
                    <svg width={width} height={height}>
                        {content}
                    </svg>
                </UncontrolledReactSVGPanZoom>
            )}
        />);

        return result;
    }


    public GetStyleObject(): any {
        const obj = super.GetStyleObject();
        obj['overflow'] = 'auto';
        return obj;
    }

    public FitToViewer() {
        if (this.m_Component != null) {
            if (this.m_Component.refPanAndZoom != null) {
                this.m_Component.refPanAndZoom.fitToViewer();
            }
        }
    }

}
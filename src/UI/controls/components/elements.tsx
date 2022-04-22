import { React, Teact } from '@tuval/forms';
import { Utils } from './utils';

export class Paper extends React.Component {
    static defaultProps = { x: 0, y: 0, width: 100, height: 100, container: { style: { }, className: "" }, viewbox: "" };
    private myRef;
    constructor(props) {
        super(props);
        (this as any).state = {
            loaded: false
        };
        this.myRef = React.createRef();
    }
    componentDidMount() {
        const container = this.myRef.current;
        const paper = Utils.createPaper(container, (this as any).props);
        (this as any).paper = paper;
        setTimeout(() => {
            (this as any).setState({
                loaded: true,
                id: paper.id
            });
        });
    }
    componentDidUpdate() {
        Utils.updatePaper((this as any).paper, (this as any).props);
    }
    componentWillUnmount() {
        (this as any).paper.remove();
    }

    getPaper() {
        return (this as any).paper;
    }
    genElementsContainer() {
        if ((this as any).state.loaded) {
            return (<div className="svg-canvas" data-id={(this as any).state.id}>
                {(this as any).props.children}
            </div>);
        } else {
            return (<div className="svg-canvas" />);
        }
    }
    render() {
        const eleContainer = (this as any).genElementsContainer();
        const { style, className, ...others } = (this as any).props.container;
        return (<div className="tuval-svg-canvas">
            {eleContainer}
            <div ref={this.myRef} id={(this as any).props.id}  className={"svg-canvas-container " + className} style={style} {...others} />
        </div>);
    }
}


export class Set extends React.Component {
    private myRef;
    constructor(props) {
        super(props);
        (this as any).state = {
            loaded: false
        };
        this.myRef = React.createRef();

    }
    componentDidMount() {
        const root = this.myRef.current;
        const parentId = root.parentElement.getAttribute("data-id");
        const set = Utils.createSet(parentId, (this as any).props, (this as any).handleLoad.bind(this));
        (this as any).set = set;
        setTimeout(() => {
            (this as any).setState({
                loaded: true,
                id: set.id
            });
        });
    }
    getSet() {
        return (this as any).set;
    }
    handleLoad(set) {
        if ((this as any).props.load) {
            (this as any).props.load(set);
        }
    }
    componentWillUnmout() {
        Utils.removeSet((this as any).set);
    }
    render() {
        if ((this as any).state.loaded) {
            return (<div ref={this.myRef} className="raphael-set" data-id={(this as any).state.id}>{(this as any).props.children}</div>);
        } else {
            return (<div ref={this.myRef} className="raphael-set" data-id={(this as any).state.id} />);
        }
    }
}

export class Element extends React.Component {
    private myRef;
    constructor(props) {
        super(props);
        (this as any).state = {
            loaded: false
        };
        this.myRef = React.createRef();
    }
    componentDidMount() {
        const root = this.myRef.current;
        const parentId = root.parentElement.getAttribute("data-id");
        const element = Utils.createElement(parentId, (this as any).props.type, (this as any).props, (this as any).handleLoad.bind(this));
        (this as any).element = element;
        setTimeout(() => {
            (this as any).setState({
                loaded: true
            });
        });
    }
    componentDidUpdate() {
        Utils.updateElement((this as any).element, (this as any).props.type, (this as any).props, (this as any).handleUpdate.bind(this));
    }
    componentWillUnmount() {
        Utils.removeElement((this as any).element);
    }
    getElement() {
        return (this as any).element;
    }
    handleLoad(element) {
        if ((this as any).props.load) {
            (this as any).props.load(element);
        }
    }
    handleUpdate(element) {
        if ((this as any).props.update) {
            (this as any).props.update(element);
        }
    }
    render() {
        if ((this as any).state.loaded) return null;
        return (<div ref={this.myRef} className={"raphael-" + (this as any).props.type} />);
    }
}


export class CircleComponent extends React.Component {
    private myRef;
    static defaultProps = { x: 0, y: 0, r: 10 }
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }
    getElement() { return (this as any).refs.element.getElement(); }
    render() { return (<Element ref={this.myRef} type="circle" {...(this as any).props} />); }
}


export class EllipseComponent extends React.Component {
    private myRef;
    static defaultProps = { x: 0, y: 0, rx: 10, ry: 20 };
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }
    getElement() { return (this as any).refs.element.getElement(); }
    render() { return (<Element ref={this.myRef} type="ellipse" {...(this as any).props} />); }
}



export class Image extends React.Component {
    private myRef;
    static defaultProps = { x: 0, y: 0, src: "", width: 0, height: 0 };
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    getElement() { return (this as any).refs.element.getElement(); }
    render() { return (<Element ref={this.myRef} type="image" {...(this as any).props} />); }
}


export class PathComponent extends React.Component {
    private myRef;
    static defaultProps = { d: "M0,0L0,0Z" };
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }
    getElement() { return (this as any).refs.element.getElement(); }
    render() { return (<Element ref={this.myRef} type="path" {...(this as any).props} />); }
}

export class Rect extends React.Component {
    private myRef;
    static defaultProps = { x: 0, y: 0, width: 0, height: 0, r: 0 };
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }
    getElement() { return (this as any).refs.element.getElement(); }
    render() { return (<Element ref={this.myRef} type="rect" {...(this as any).props} />); }
}

export class PrintComponent extends React.Component {
    private myRef;
    static defaultProps = { x: 0, y: 0, text: "", fontFamily: "Arial" };
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }
    getElement() { return (this as any).refs.element.getElement(); }
    render() { return (<Element ref={this.myRef} type="print" {...(this as any).props} />); }
}

export class TextComponent extends React.Component {
    private myRef;
    static defaultProps = { x: 0, y: 0, text: "" };
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }
    getElement() { return (this as any).refs.element.getElement(); }
    render() { return (<Element ref={this.myRef} type="text" {...(this as any).props} />); }
}

export class LineComponent extends React.Component {
    private myRef;
    static defaultProps = { x1: 0, y1: 0, x2: 0, y2: 0 };
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }
    getElement() { return (this as any).refs.path.getElement(); }
    render() {
        const { x1, x2, y1, y2, animate, attr, ...others } = (this as any).props;
        if (animate) {
            if (animate.anim) {
                for (const key in animate.anim) {
                    animate.anim[key].x1 = animate.anim[key].x1 || x1;
                    animate.anim[key].x2 = animate.anim[key].x2 || x2;
                    animate.anim[key].y1 = animate.anim[key].y1 || y1;
                    animate.anim[key].y2 = animate.anim[key].y2 || y2;
                    animate.anim[key].path = ["M", animate.anim[key].x1, animate.anim[key].y1, "L", animate.anim[key].x2, animate.anim[key].y2];
                }
            } else {
                animate.x1 = animate.x1 || x1;
                animate.x2 = animate.x2 || x2;
                animate.y1 = animate.y1 || y1;
                animate.y2 = animate.y2 || y2;
                animate.path = ["M", animate.x1, animate.y1, "L", animate.x2, animate.y2];
            }
        }
        if (attr) {
            attr.x1 = attr.x1 || x1;
            attr.x2 = attr.x2 || x2;
            attr.y1 = attr.y1 || y1;
            attr.y2 = attr.y2 || y2;
            attr.path = ["M", attr.x1, attr.y1, "L", attr.x2, attr.y2];
        }
        return <PathComponent ref={this.myRef} d={["M", x1, y1, "L", x2, y2]} attr={attr} animate={animate}  {...others} />;
    }
}

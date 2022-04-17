import { Control, Teact, DomHandler, React, Modes } from '@tuval/forms';
import { Encoding, Convert, Event, int, Queue, is, float } from '@tuval/core';
import { TuvalSvg } from './../components/svg';

class AnimationQueue extends Queue<any> {
    private m_Element: any;
    public Last: any;
    public constructor(element: Shape<any>) {
        super();
        this.m_Element = element;
    }
    public to(...args: any[]) {
        this.Enqueue(args);
        return this;
    }
    public override Dequeue(): any {
        this.Last = super.Dequeue();
        if (is.array(this.Last)) {
            return this.Last;
        } else if (is.function(this.Last)) {
            return this.Last;
        } else {
            return null;
        }

    }
}
export abstract class Shape<T extends Control<any>> extends Control<T> {

    /*  private get AnimationRequire(): boolean {
         return this.GetPropertyInSlient('__AnimationRequire__');
     }
     private set AnimationRequire(value: boolean) {
         this.SetPropertyInSlient('__AnimationRequire__', value);
     } */


    private inAnimation: boolean = false;
    protected m_Element: Shape<any>;
    public get Element(): Shape<any> {
        if (this.__Mode__ === Modes.Control && this.m_Component != null) {
            return (this.m_Component as any).m_Element;
        } else {
            return this.m_Element;
        }
    }
    public get RElement(): any {
        if (this.Element != null) {
            if ((this.Element as any).myRef.current != null) {
                return (this.Element as any).myRef.current.element;
            }
        }
    }

    public get Click(): any {
        return this.GetProperty('Click');
    }
    public set Click(value: any) {
        this.SetProperty('Click', value);
    }

   /*  public get MouseMove(): any {
        return this.GetProperty('MouseMove');
    }
    public set MouseMove(value: any) {
        this.SetProperty('MouseMove', value);
    } */

    public get MouseOut(): any {
        return this.GetProperty('MouseOut');
    }
    public set MouseOut(value: any) {
        this.SetProperty('MouseOut', value);
    }



    public get OnAnimation(): any {
        return this.GetProperty('OnAnimation');
    }
    public set OnAnimation(value: any) {
        this.SetProperty('OnAnimation', value);
    }

    public get AfterRender(): any {
        return this.GetProperty('AfterRender');
    }
    public set AfterRender(value: any) {
        this.SetProperty('AfterRender', value);
    }

    protected get AnimationQueue(): AnimationQueue {
        return this.GetProperty('AnimationQueue');
    }
    protected set AnimationQueue(value: AnimationQueue) {
        this.SetProperty('AnimationQueue', value);
    }

    protected get Animate(): any {
        return this.GetProperty('Animate');
    }
    protected set Animate(value: any) {
        this.SetProperty('Animate', value);
    }

    public get ToBack(): boolean {
        return this.GetProperty('ToBack');
    }
    public set ToBack(value: boolean) {
        this.SetProperty('ToBack', value);
    }

    public get ToFront(): boolean {
        return this.GetProperty('ToFront');
    }
    public set ToFront(value: boolean) {
        this.SetProperty('ToFront', value);
    }

    public get x(): int {
        return this.GetProperty('x');
    }
    public set x(value: int) {
        this.SetProperty('x', value);
    }

    public get y(): int {
        return this.GetProperty('y');
    }
    public set y(value: int) {
        this.SetProperty('y', value);
    }
    public get width(): int {
        return this.GetProperty('width');
    }
    public set width(value: int) {
        this.SetProperty('width', value);
    }

    public get height(): int {
        return this.GetProperty('height');
    }
    public set height(value: int) {
        this.SetProperty('height', value);
    }

    public get translate(): any {
        return this.GetProperty('translate');
    }
    public set translate(value: any) {
        this.SetProperty('translate', value);
    }

    public get stroke(): string {
        return this.GetProperty('stroke');
    }
    public set stroke(value: string) {
        this.SetProperty('stroke', value);
    }

    public get fill(): string {
        return this.GetProperty('fill');
    }
    public set fill(value: string) {
        this.SetProperty('fill', value);
    }
    public get fill_opacity(): float {
        return this.GetProperty('fill-opacity');
    }
    public set fill_opacity(value: float) {
        this.SetProperty('fill-opacity', value);
    }


    public get stroke_width(): int {
        return this.GetProperty('StrokeWidth');
    }
    public set stroke_width(value: int) {
        this.SetProperty('StrokeWidth', value);
    }

    public get cursor(): string {
        return this.GetProperty('cursor');
    }
    public set cursor(value: string) {
        this.SetProperty('cursor', value);
    }
    public animate(...args: any[]) {
        this.Animate = TuvalSvg.animation(...args);
    }

    public to(...args: any[]) {
        this.AnimationQueue.Enqueue(args);
        return this;
    }
    public call(func: Function) {
        this.AnimationQueue.Enqueue(func);
        return this;
    }
    public UpdateFromAnimation() {

    }

    public componentDidMount() {
        this.AfterRender();
    }
    public componentDidUpdate() {
        /* if (this.RElement && this.RElement.__InAnimation__) {
            this.StartAnimation();
        } */
    }

    public shouldComponentUpdate(nextProps, nextState) {
        /*   console.log('shouldComponentUpdate');
          console.log(nextProps); */
        if (this.RElement) {
            return this.RElement.__InAnimation__ !== true;
        }
        return true;
    }
    public StartAnimation() {
        if (this.RElement) {
            this.RElement.__InAnimation__ = true;
        }

        /*   if (this.AnimationQueue.Last != null) {
              this.Animate = null;
              const attr = this.AnimationQueue.Last[0];
              this.UpdateFromAnimation();
              this.AnimationQueue.Last = null;
              setTimeout(this.StartAnimation.bind(this), 100);
          } else if (this.AnimationQueue.Count > 0) {
              const animation = this.AnimationQueue.Dequeue();
              if (is.array(animation)) {
                  if (animation != null) {
                      this.Animate = TuvalSvg.animation(...animation, this.StartAnimation.bind(this));
                  }
              } else if (is.function(animation)) {
                  debugger;
                  animation();
              }
          } */

        /*   this.Animate = null;
          this.UpdateFromAnimation(); */
        if (this.AnimationQueue.Count > 0) {
            const animation = this.AnimationQueue.Dequeue();
            if (is.array(animation)) {
                if (animation != null) {
                    if (this.RElement != null) {
                        this.RElement.animate(TuvalSvg.animation(...animation, this.StartAnimation.bind(this)));
                    }
                }
            } else if (is.function(animation)) {
                animation();
                this.StartAnimation();
            }
        } else {
            this.RElement.__InAnimation__ = false;
            this.UpdateFromAnimation();
        }

    }

    public SetupControlDefaults() {
        super.SetupControlDefaults();
        this.AnimationQueue = new AnimationQueue(this);
        this.Click = new Event();
        this.MouseMove = new Event();
        this.MouseOut = new Event();
        this.OnAnimation = new Event();
        this.AfterRender = new Event();
        this.cursor = 'auto';
        this.stroke = 'black';
        this.fill = 'white';
        this.fill_opacity = 1.0;
        this.ToBack = false;
        this.ToFront = false;
    }

    protected GetAttributeObject(): any {
        const attr = {};
        if (!is.nullOrEmpty(this.fill)) {
            attr['fill'] = this.fill;
        }

        attr['fill-opacity'] = this.fill_opacity;

        if (!is.nullOrEmpty(this.stroke)) {
            attr['stroke'] = this.stroke;
        }

        attr['stroke-width'] = this.stroke_width;
        attr['cursor'] = this.cursor;
        return attr;
    }

}
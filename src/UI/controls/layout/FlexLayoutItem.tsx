import { ContainerControl, Teact, ResizeSensor } from '@tuval/forms';
import { classNames, int, foreach, Event } from '@tuval/core';
import { JustifyContents } from './JustifyContents';

let wait = false;
let prevW;
let prevH;





var attachEvent = (document as any).attachEvent,
    stylesCreated = false;

const resetTriggers = (element) => {
    var triggers = element.__resizeTriggers__,
        expand = triggers.firstElementChild,
        contract = triggers.lastElementChild,
        expandChild = expand.firstElementChild;
    contract.scrollLeft = contract.scrollWidth;
    contract.scrollTop = contract.scrollHeight;
    expandChild.style.width = expand.offsetWidth + 1 + 'px';
    expandChild.style.height = expand.offsetHeight + 1 + 'px';
    expand.scrollLeft = expand.scrollWidth;
    expand.scrollTop = expand.scrollHeight;
};

const checkTriggers = (element) => {
    return element.offsetWidth != element.__resizeLast__.width ||
        element.offsetHeight != element.__resizeLast__.height;
}

const scrollListener = function (e) {
    var element = this;
    resetTriggers(this);
    if (this.__resizeRAF__) cancelFrame(this.__resizeRAF__);
    this.__resizeRAF__ = requestFrame(function () {
        if (checkTriggers(element)) {
            element.__resizeLast__.width = element.offsetWidth;
            element.__resizeLast__.height = element.offsetHeight;
            element.__resizeListeners__.forEach(function (fn) {
                fn.call(element, e);
            });
        }
    });
};

if (!attachEvent) {
    var requestFrame = (function () {
        var raf = window.requestAnimationFrame || (window as any).mozRequestAnimationFrame ||
            (window as any).webkitRequestAnimationFrame ||
            function (fn) { return window.setTimeout(fn, 20); };
        return function (fn) { return raf(fn); };
    })();

    var cancelFrame = (function () {
        var cancel = window.cancelAnimationFrame || (window as any).mozCancelAnimationFrame || (window as any).webkitCancelAnimationFrame ||
            window.clearTimeout;
        return function (id) { return cancel(id); };
    })();







    /* Detect CSS Animations support to detect element display/re-attach */
    var animation = false,
        animationstring = 'animation',
        keyframeprefix = '',
        animationstartevent = 'animationstart',
        domPrefixes = 'Webkit Moz O ms'.split(' '),
        startEvents = 'webkitAnimationStart animationstart oAnimationStart MSAnimationStart'.split(' '),
        pfx = '';
    {
        var elm = document.createElement('fakeelement');
        if (elm.style.animationName !== undefined) { animation = true; }

        if (animation === false) {
            for (var i = 0; i < domPrefixes.length; i++) {
                if (elm.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
                    pfx = domPrefixes[i];
                    animationstring = pfx + 'Animation';
                    keyframeprefix = '-' + pfx.toLowerCase() + '-';
                    animationstartevent = startEvents[i];
                    animation = true;
                    break;
                }
            }
        }
    }

    var animationName = 'resizeanim';
    var animationKeyframes = '@' + keyframeprefix + 'keyframes ' + animationName + ' { from { opacity: 0; } to { opacity: 0; } } ';
    var animationStyle = keyframeprefix + 'animation: 1ms ' + animationName + '; ';
}

function createStyles() {
    if (!stylesCreated) {
        //opacity:0 works around a chrome bug https://code.google.com/p/chromium/issues/detail?id=286360
        var css = (animationKeyframes ? animationKeyframes : '') +
            '.resize-triggers { ' + (animationStyle ? animationStyle : '') + 'visibility: hidden; opacity: 0; } ' +
            '.resize-triggers, .resize-triggers > div, .contract-trigger:before { content: \" \"; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }',
            head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style');

        style.type = 'text/css';
        if ((style as any).styleSheet) {
            (style as any).styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        head.appendChild(style);
        stylesCreated = true;
    }
}

const addResizeListener = function (element, fn) {
    if (attachEvent) element.attachEvent('onresize', fn);
    else {
        if (!element.__resizeTriggers__) {
            if (getComputedStyle(element).position == 'static') element.style.position = 'relative';
            createStyles();
            element.__resizeLast__ = {};
            element.__resizeListeners__ = [];
            (element.__resizeTriggers__ = document.createElement('div')).className = 'resize-triggers';
            element.__resizeTriggers__.innerHTML = '<div class="expand-trigger"><div></div></div>' +
                '<div class="contract-trigger"></div>';
            element.appendChild(element.__resizeTriggers__);
            resetTriggers(element);
            element.addEventListener('scroll', scrollListener, true);

            /* Listen for a css animation to detect element display/re-attach */
            animationstartevent && element.__resizeTriggers__.addEventListener(animationstartevent, function (e) {
                if (e.animationName == animationName)
                    resetTriggers(element);
            });
        }
        element.__resizeListeners__.push(fn);
    }
};

const removeResizeListener = function (element, fn) {
    if (attachEvent) element.detachEvent('onresize', fn);
    else {
        element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
        if (!element.__resizeListeners__.length) {
            element.removeEventListener('scroll', scrollListener);
            element.__resizeTriggers__ = !element.removeChild(element.__resizeTriggers__);
        }
    }
}

export class FlexLayoutItem extends ContainerControl<FlexLayoutItem>{
    refElement: HTMLElement;;

    public get ResizeEvent(): Event<any> {
        return this.GetProperty('ResizeEvent');
    }

    public set ResizeEvent(value: Event<any>) {
        this.SetProperty('ResizeEvent', value);
    }

    public get JustifyContent(): JustifyContents {
        return this.GetProperty('JustifyContent');
    }

    public set JustifyContent(value: JustifyContents) {
        this.SetProperty('JustifyContent', value);
    }

    public get Grow(): boolean {
        return this.GetProperty('Grow');
    }

    public set Grow(value: boolean) {
        this.SetProperty('Grow', value);
    }

    public get Shrink(): boolean {
        return this.GetProperty('Shrink');
    }

    public set Shrink(value: boolean) {
        this.SetProperty('Shrink', value);
    }

    protected SetupControlDefaults(): void {
        super.SetupControlDefaults();
        this.Grow = false;
        this.Shrink = false
        this.JustifyContent = JustifyContents.Start;
        this.ResizeEvent = new Event();
    }

    public componentDidMount(): void {
        super.componentDidMount();
        if (this.refElement) {
            new ResizeSensor(this.refElement, (size) => {
                this.ResizeEvent(size);
            });
           /*  const resizeListener = () => {
                const bbox = this.refElement.getBoundingClientRect();
                this.ResizeEvent({ width: bbox.width, height: bbox.height });
            };

            addResizeListener(this.refElement, resizeListener); */
        }
    }



    public CreateElements() {
        const className = classNames('flex', {
            'flex-grow-1': this.Grow,
            'flex-shrink-1': this.Shrink,
            'justify-content-start': this.JustifyContent === JustifyContents.Start,
            'justify-content-end': this.JustifyContent === JustifyContents.End,
            'justify-content-center': this.JustifyContent === JustifyContents.Center,
            'justify-content-between': this.JustifyContent === JustifyContents.Between,
            'justify-content-around': this.JustifyContent === JustifyContents.Around,
            'justify-content-evenly': this.JustifyContent === JustifyContents.Evenly

        } as any
        );
        return (
            <div ref={(e) => this.refElement = e} class={className} style={this.GetStyleObject()}>
                {this.CreateControls()}
            </div>
        );
    }

    public override OnFormResized(w: int, h: int) {
        foreach(this.Controls, (control) => {
            control.OnFormResized(w, h);
        });
    }
    protected override GetStyleObject(): any {
        const style = super.GetStyleObject();
        if (this.Width) {
            style['width'] = this.Width + 'px';
        }

        style['min-width'] = 0;
        return style;
    }
}
import { ClassInfo } from '@tuval/core';
import { Types } from "../types";
import { TuLayer } from "../TuLayer/TuLayer";

const now = (function () {
    if (window.performance && window.performance.now) {
        return function () {
            return window.performance.now();
        };
    }

    return function () {
        return new Date().getTime();
    };
})();

function FRAF(callback) {
    setTimeout(callback, 1000 / 60);
}

var RAF = (function () {
    return (
        window.requestAnimationFrame ||
        (window as any).webkitRequestAnimationFrame ||
        (<any>window).mozRequestAnimationFrame ||
        (<any>window).oRequestAnimationFrame ||
        (<any>window).msRequestAnimationFrame ||
        FRAF
    );
})();

function requestAnimFrame(...args: any[]) {
    return RAF.apply(window, arguments);
}

export function tuvalRequestAnimFrame(...args: any[]) {
    return RAF.apply(window, arguments);
}


@ClassInfo({
    fullName: Types.Animation,
    instanceof: [
        Types.Animation
    ]
})
export class Animation {
    public static animations: Animation[] = [];
    public static animIdCounter: number = 0;
    public static animRunning: boolean = false;
    private myFunc: Function;
    private id: number;
    private frame: any;
    private myLayers: TuLayer[] = [];
    public constructor(func: Function, layers: TuLayer[]) {
        this.myFunc = func;
        this.setLayers(layers);
        this.id = Animation.animIdCounter++;
        this.frame = {
            time: 0,
            timeDiff: 0,
            lastTime: now()
        };


    }
    public setLayers(layers: TuLayer[]) {
        var lays = [];
        // if passing in no layers
        if (!layers) {
            lays = [];
        } else if (layers.length > 0) {
            // if passing in an array of Layers
            // NOTE: layers could be an array or Konva.Collection.  for simplicity, I'm just inspecting
            // the length property to check for both cases
            lays = layers;
        } else {
            // if passing in a Layer
            lays = [layers];
        }

        this.myLayers = lays;
        return this;
    }

    public getLayers(): TuLayer[] {
        return this.myLayers;
    }
    public addLayer(layer): boolean {
        const layers: TuLayer[] = this.myLayers;
        const len: number = layers.length;
        // don't add the layer if it already exists
        for (let n = 0; n < len; n++) {
            if (layers[n] === layer) {
                return false;
            }
        }

        this.myLayers.push(layer);
        return true;
    }

    public isRunning(): boolean {
        const animations = Animation.animations;
        const len = animations.length;

        for (let n = 0; n < len; n++) {
            if (animations[n].id === this.id) {
                return true;
            }
        }
        return false;
    }
    public start() {
        this.stop();
        this.frame.timeDiff = 0;
        this.frame.lastTime = now();
        Animation._addAnimation(this);
        return this;
    }

    public stop() {
        Animation._removeAnimation(this);
        return this;
    }
    private _updateFrameObject(time: number) {
        this.frame.timeDiff = time - this.frame.lastTime;
        this.frame.lastTime = time;
        this.frame.time += this.frame.timeDiff;
        this.frame.frameRate = 1000 / this.frame.timeDiff;
    }

    private static _addAnimation(anim: Animation) {
        this.animations.push(anim);
        Animation._handleAnimation();
    }
    private static _removeAnimation(anim: Animation) {
        const id: number = anim.id;
        const animations: Animation[] = Animation.animations;
        const len: number = animations.length;

        for (let n = 0; n < len; n++) {
            if (animations[n].id === id) {
                this.animations.splice(n, 1);
                break;
            }
        }
    }

    private static _runFrames() {
        var layerHash = {},
            animations = Animation.animations,
            anim: Animation,
            layers,
            func,
            i,
            layersLen,
            layer: TuLayer,
            key,
            needRedraw;
        /*
         * loop through all animations and execute animation
         *  function.  if the animation object has specified node,
         *  we can add the node to the nodes hash to eliminate
         *  drawing the same node multiple times.  The node property
         *  can be the stage itself or a layer
         */
        /*
         * WARNING: don't cache animations.length because it could change while
         * the for loop is running, causing a JS error
         */

        for (let n = 0; n < animations.length; n++) {
            anim = animations[n];
            layers = anim.myLayers;
            func = anim.myFunc;

            anim._updateFrameObject(now());
            layersLen = layers.length;

            // if animation object has a function, execute it
            if (func) {
                // allow anim bypassing drawing
                needRedraw = func.call(anim, anim.frame) !== false;
            } else {
                needRedraw = true;
            }
            if (!needRedraw) {
                continue;
            }
            for (i = 0; i < layersLen; i++) {
                layer = layers[i];
                (layer as any).drawView(true);
                /*  if (layer._id !== undefined) {
                     layerHash[layer._id] = layer;
                 } */
            }
        }

        /*   for (key in layerHash) {
              if (!layerHash.hasOwnProperty(key)) {
                  continue;
              }
              layerHash[key].draw();
          } */
    };
    private static _animationLoop() {
        if (Animation.animations.length) {
            Animation._runFrames();
            requestAnimFrame(Animation._animationLoop);
        } else {
            Animation.animRunning = false;
        }
    }
    private static _handleAnimation() {
        if (!Animation.animRunning) {
            Animation.animRunning = true;
            requestAnimFrame(Animation._animationLoop);
        }
    }

}

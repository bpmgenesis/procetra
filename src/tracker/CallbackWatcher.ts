import { utils } from "./utils";

const _window: any = window;

export class CallbackWatcher {
    config: any;
    onError: any;
    public constructor(config: any, onError: any, onFault: any) {
        this.config = config;
        this.onError = onError;
        config.enabled && this.watch();
    }
    private watch() {
        utils.forEach(["EventTarget", "Node", "XMLHttpRequest"], (a) => {
            utils.has(_window, a + ".prototype.addEventListener") &&
                utils.hasOwn(_window[a].prototype, "addEventListener") &&
                this.wrapEventTarget(_window[a].prototype);
        }, this);
        this.wrapTimer("setTimeout");
        this.wrapTimer("setInterval")
    }
    private wrap(a: any) {
        function b() {
            try {
                return a.apply(this, arguments);
            }
            catch (b) {
                throw d.onError("catch", b, { bindTime: e, bindStack: f }),
                utils.wrapError(b);
            }
        }
        var d = this;
        try {
            if (!utils.isFunction(a) || utils.hasOwn(a, "__trackjs__"))
                return a;
            if (utils.hasOwn(a, "__trackjs_state__"))
                return a.__trackjs_state__;
        } catch (p) {
            return a;
        }
        var e, f;
        if (d.config.bindStack) {
            try {
                throw Error();
            } catch (p: any) {
                f = p.stack;
                e = utils.isoNow()
            }
        }
        for (var h in a) {
            utils.hasOwn(a, h) && (b[h] = a[h]);
        }
        b.prototype = a.prototype;
        b.__trackjs__ = true;
        return a.__trackjs_state__ = b
    }
    private wrapEventTarget(a) {
        var b = this;
        utils.has(a, "addEventListener.call") && utils.has(a, "removeEventListener.call") && (utils.patch(a, "addEventListener",
            (a: any) => {
                return function (e, f, h, p) {
                    try {
                        utils.has(f, "handleEvent") && (f.handleEvent = b.wrap(f.handleEvent))
                    } catch (g) { }
                    return a.call(this, e, b.wrap(f), h, p)
                }
            }), utils.patch(a, "removeEventListener", function (a) {
                return (b, f, c, g) => {
                    try {
                        f = f && (f.__trackjs_state__ || f)
                    } catch (k) {

                    }
                    return a.call(this, b, f, c, g);
                }
            }))
    }
    private wrapTimer(a) {
        var b = this;
        utils.patch(_window, a, function (a) {
            return function (e, f) {
                var h = Array.prototype.slice.call(arguments),
                    g = h[0];
                utils.isFunction(g) && (h[0] = b.wrap(g));
                return utils.has(a, "apply") ? a.apply(this, h) : a(h[0], h[1])
            }
        })
    }
}
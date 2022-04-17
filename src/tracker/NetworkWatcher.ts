import { utils } from "./utils";
var _window: any = window;
var oldOnError;
export class NetworkWatcher {
    util: any;
    log: any;
    onError: any;
    onFault: any;
    window: any;
    options: any;
    public constructor(utils, logger, onError, onFault, _window, options) {
        this.util = utils;
        this.log = logger;
        this.onError = onError;
        this.onFault = onFault;
        this.window = _window;
        this.options = options;
        options.enabled && this.initialize(_window)
    }
    private initialize(a) {
        a.XMLHttpRequest && this.util.hasFunction(a.XMLHttpRequest.prototype.open,
            "apply") && this.watchNetworkObject(a.XMLHttpRequest);
        a.XDomainRequest && this.util.hasFunction(a.XDomainRequest.prototype.open, "apply") && this.watchNetworkObject(a.XDomainRequest);
        this.options.fetch && utils.isWrappableFunction(a.fetch) && this.watchFetch()
    }
    private escapeUrl(a) {
        return ("" + a).replace(/ /gi, "%20").replace(/\t/gi, "%09");
    }
    private watchFetch() {
        var a = this,
            b = this.log,
            d = this.options,
            e = this.onError;
        utils.patch(_window, "fetch", function (f) {
            return function (h, p) {
                if (p && p.__trackjs__) return f.apply(_window, arguments);
                var k;
                try {
                    throw Error();
                } catch (E: any) {
                    k = E.stack
                }
                var m: any = h instanceof Request ? h.url : h,
                    n = h instanceof Request ? h.method : (p || {}).method || "GET",
                    m = a.escapeUrl(m) as any,
                    l = f.apply(_window, arguments);
                l.__trackjs_state__ = b.add("n", { type: "fetch", startedOn: utils.isoNow(), method: n, url: utils.truncate(m, 2E3) });
                return l.then(function (a) {
                    var f = b.get("n", l.__trackjs_state__);
                    if (f) {
                        utils.defaults(f, { completedOn: utils.isoNow(), statusCode: a.status, statusText: a.statusText });
                        var h = a.headers.get("trackjs-correlation-id");
                        h && (f.requestCorrelationId = h);
                        d.error &&
                            400 <= a.status && (f = Error(f.statusCode + " : " + f.method + " " + f.url), f.stack = k, e("ajax", f))
                    }
                    return a
                })["catch"](function (a) {
                    a = a || {};
                    var f = b.get("n", l.__trackjs_state__);
                    f && (utils.defaults(f, { completedOn: utils.isoNow(), statusCode: 0, statusText: a.toString() }), d.error && (e("ajax", { name: a.name, message: (a.message || "Failed") + ": " + f.method + " " + f.url, stack: a.stack || k }), a.__trackjs_state__ = true));
                    throw a;
                })
            }
        })
    }
    private watchNetworkObject(a: any) {
        var b = this,
            d = a.prototype.open,
            e = a.prototype.send;
        a.prototype.open = function (a, e) {
            var c =
                (e || "").toString();
            0 > c.indexOf("localhost:0") && (c = b.escapeUrl(c), this._trackJs = { method: a, url: c });
            return d.apply(this, arguments)
        };
        a.prototype.send = function () {
            if (!this._trackJs)
                try {
                    return e.apply(this, arguments)
                } catch (a) {
                    b.onError("ajax", a);
                    return
                }
            try {
                this._trackJs.logId = b.log.add("n", { type: "xhr", startedOn: b.util.isoNow(), method: this._trackJs.method, url: utils.truncate(this._trackJs.url, 2E3) }), b.listenForNetworkComplete(this)
            } catch (a) {
                b.onFault(a)
            }
            return e.apply(this, arguments)
        };
        return a;
    }
    private listenForNetworkComplete(a: any) {
        var b =
            this;
        b.window.ProgressEvent && a.addEventListener && a.addEventListener("readystatechange", function () { 4 === a.readyState && b.finalizeNetworkEvent(a) }, true);
        a.addEventListener ? a.addEventListener("load", function () {
            b.finalizeNetworkEvent(a);
            b.checkNetworkFault(a)
        }, true) : setTimeout(function () {
            try {
                var d = a.onload;
                a.onload = function () {
                    b.finalizeNetworkEvent(a);
                    b.checkNetworkFault(a);
                    "function" === typeof d && b.util.hasFunction(d, "apply") && d.apply(a, arguments)
                };
                var e = a.onerror;
                a.onerror = function () {
                    b.finalizeNetworkEvent(a);
                    b.checkNetworkFault(a);
                    "function" === typeof oldOnError && e.apply(a, arguments)
                }
            } catch (c) { b.onFault(c) }
        }, 0)
    }
    private finalizeNetworkEvent(a) {
        if (a._trackJs) {
            var b = this.log.get("n", a._trackJs.logId);
            b && (b.completedOn = this.util.isoNow(), a.getAllResponseHeaders && a.getResponseHeader && 0 <= (a.getAllResponseHeaders() || "").toLowerCase().indexOf("trackjs-correlation-id") && (b.requestCorrelationId = a.getResponseHeader("trackjs-correlation-id")), b.statusCode = 1223 == a.status ? 204 : a.status, b.statusText = 1223 == a.status ?
                "No Content" : a.statusText)
        }
    }
    private checkNetworkFault(a) {
        if (this.options.error && 400 <= a.status && 1223 != a.status) {
            var b = a._trackJs || {};
            this.onError("ajax", a.status + " : " + b.method + " " + b.url)
        }
    }
    private report() {
        return this.log.all("n");
    }
}
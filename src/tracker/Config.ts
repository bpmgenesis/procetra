import { utils } from './utils';
var n;
export class Config {
    private current = {};
    public initOnly;
    public defaults: any;
    public constructor(a) {
        this.initCurrent(a) || console.warn("[Tuval Traker] invalid config");
    }
    private initCurrent(a) {
        this.removeEmpty(a);
        if (this.validate(a, this.defaults, "[Tuval Traker] config", {}))
            return this.current = utils.defaultsDeep({}, a, this.defaults), true;
        this.current = utils.defaultsDeep({}, this.defaults);
        return false
    }
    private setCurrent(a) {
        return this.validate(a, this.defaults, "[Tuval Traker] config", this.initOnly) ? (this.current = utils.defaultsDeep({},
            a, this.current), true) : false;
    }
    private removeEmpty(a) {
        for (var b in a) {
            a.hasOwnProperty(b) && a[b] === n && delete a[b];
        }
    }
    private validate(a, b, d, e) {
        var f = true;
        d = d || "";
        e = e || {};
        for (var c in a)
            if (a.hasOwnProperty(c))
                if (b.hasOwnProperty(c)) {
                    var g = typeof b[c];
                    g !== typeof a[c] ? (console.warn(d + "." + c + ": property must be type " + g + "."), f = false) : "[object Array]" !== Object.prototype.toString.call(a[c]) || this.validateArray(a[c], b[c], d + "." + c) ? "[object Object]" === Object.prototype.toString.call(a[c]) ? f = this.validate(a[c], b[c], d + "." +
                        c, e[c]) : e.hasOwnProperty(c) && (console.warn(d + "." + c + ": property cannot be set after load."), f = false) : f = false
                } else console.warn(d + "." + c + ": property not supported."), f = false;
        return f;
    }
    private validateArray(a, b, d) {
        var e = true;
        d = d || "";
        for (var f = 0; f < a.length; f++) {
            utils.contains(b, a[f]) || (console.warn(d + "[" + f + "]: invalid value: " + a[f] + "."), e = false);
        }
        return e;
    }
}

(Config.prototype as any).current = {};
(Config.prototype as any).initOnly = {
    application: true,
    cookie: true,
    enabled: true,
    token: true,
    callback: { enabled: true },
    console: { enabled: true },
    navigation: { enabled: true },
    network: { enabled: true, fetch: true },
    visitor: { enabled: true },
    window: { enabled: true, promise: true }
};
(Config.prototype as any).defaults = {
    application: "",
    cookie: false,
    dedupe: true,
    dependencies: true,
    enabled: true,
    forwardingDomain: "",
    errorURL: "https://capture.trackjs.com/capture",
    errorNoSSLURL: "http://capture.trackjs.com/capture",
    faultURL: "https://usage.trackjs.com/fault.gif",
    usageURL: "https://usage.trackjs.com/usage.gif",
    onError: function () { return true },
    serialize: function (a) {
        function b(a) {
            var d = "<" + a.tagName.toLowerCase();
            a = a.attributes || [];
            for (var b = 0; b < a.length; b++) d += " " + a[b].name + '="' + a[b].value + '"';
            return d + ">"
        }
        if ("" === a) return "Empty String";
        if (a === n) return "undefined";
        if (utils.isString(a) || utils.isNumber(a) || utils.isBoolean(a) || utils.isFunction(a)) return "" + a;
        if (utils.isElement(a)) return b(a);
        if ("symbol" === typeof a) return Symbol.prototype.toString.call(a);
        var d;
        try { d = JSON.stringify(a, function (a, d) { return d === n ? "undefined" : utils.isNumber(d) && isNaN(d) ? "NaN" : utils.isError(d) ? { name: d.name, message: d.message, stack: d.stack } : utils.isElement(d) ? b(d) : d }) } catch (f) {
            d = "";
            for (var e in a)
                if (a.hasOwnProperty(e)) try { d += ',"' + e + '":"' + a[e] + '"' } catch (h) { }
            d = d ? "{" + d.replace(",", "") + "}" : "Unserializable Object"
        }
        return d.replace(/"undefined"/g, "undefined").replace(/"NaN"/g, "NaN")
    },
    sessionId: "",
    token: "",
    userId: "",
    version: "",
    callback: { enabled: true, bindStack: false },
    console: {
        enabled: true,
        display: true,
        error: true,
        warn: false,
        watch: ["log", "debug", "info", "warn", "error"]
    },
    navigation: { enabled: true },
    network: { enabled: true, error: true, fetch: true },
    visitor: { enabled: true },
    window: { enabled: true, promise: true }
};
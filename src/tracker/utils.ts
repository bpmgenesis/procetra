const _window: any = window;
const _document: any = window.document;
var n;

function func2(a) {
    return Object.prototype.toString.call(a)
}

function func1(d, e, f, h?) {
    f = f || false;
    h = h || 0;
    utils.forEach(e, function (e) {
        utils.forEach(utils.keys(e),
            function (c) {
                null === e[c] || e[c] === n ? d[c] = e[c] : f && 10 > h && "[object Object]" === func2(e[c]) ? (d[c] = d[c] || {}, func1(d[c], [e[c]], f, h + 1)) : d.hasOwnProperty(c) || (d[c] = e[c])
            });
    });
    return d;
}

export class utils {
    public static isBrowser: boolean = "undefined" !== typeof _window && "undefined" !== typeof _window.document;
    public static isWorker: boolean = "object" === typeof self && self.constructor && 0 <= (self.constructor.name || "").indexOf("WorkerGlobalScope");
    public static isNode: boolean = "undefined" !== typeof process && null != process.versions && null != process.versions.node;
    public static addEventListenerSafe(a: any, b: any, c: any, h?: any) {
        a.addEventListener ? a.addEventListener(b, c, h) : a.attachEvent && a.attachEvent("on" + b, c);
    }
    public static afterDocumentLoad(a: any) {
        if (utils.isWorker) {
            utils.defer(a);
        }
        else {
            var b = false;
            "complete" === _document.readyState ? utils.defer(a) : (utils.addEventListenerSafe(_document, "readystatechange",
                function () {
                    "complete" !== _document.readyState || b || (utils.defer(a), b = true)
                }), setTimeout(function () {
                    b || (utils.defer(a), b = true)
                }, 1E4))
        }
    }
    public static bind(a, b): any {
        return function () {
            return a.apply(b, Array.prototype.slice.call(arguments))
        }
    }
    public static contains(a, b) {
        return 0 <= a.indexOf(b);
    }
    public static defaults(d, ...args:any[]) {
        return func1(d, Array.prototype.slice.call(arguments, 1), false);
    }
    public static defaultsDeep(d,...args: any[]) {
        return func1(d, Array.prototype.slice.call(arguments, 1), true)
    }
    public static defer(a: any, b?: any) {
        setTimeout(function () { a.apply(b) });
    }
    public static forEach(a: any, b: any, f?: any) {
        if (utils.isArray(a)) {
            if (a.forEach) return a.forEach(b,
                f);
            for (var h = 0; h < a.length;) {
                b.call(f, a[h], h, a);
                h++;
            }
        }
    }
    public static getLocation() {
        return _window.location.toString().replace(/ /g, "%20");
    }
    public static getLocationURL() {
        return utils.parseURL(utils.getLocation());
    }
    public static has(a, b): boolean {
        try {
            for (var c = b.split("."), h = a, g = 0; g < c.length; g++)
                if (h[c[g]]) {
                    h = h[c[g]];
                }
                else {
                    return false;
                }
            return true;
        } catch (k) {
            return false;
        }
    }
    public static hasFunction(a, b): boolean {
        try {
            return !!a[b];
        } catch (c) {
            return false
        }
    }
    public static hasOwn(a, b): boolean {
        return Object.prototype.hasOwnProperty.call(a, b);
    }
    public static isArray(a): boolean {
        return "[object Array]" === func2(a);
    }
    public static isBoolean(a): boolean {
        return "boolean" === typeof a || utils.isObject(a) && "[object Boolean]" === func2(a);
    }
    public static isBrowserIE(a?): any {
        a = a || _window.navigator.userAgent;
        var b = a.match(/Trident\/([\d.]+)/);
        return b && "7.0" === b[1] ? 11 : (a = a.match(/MSIE ([\d.]+)/)) ? parseInt(a[1], 10) : false;
    }
    public static isBrowserSupported() {
        var a = this.isBrowserIE();
        return !a || 8 <= a;
    }
    public static isError(a) {
        if (!utils.isObject(a))
            return false;
        var e = func2(a);
        return "[object Error]" === e || "[object DOMException]" === e || utils.isString(a.name) && utils.isString(a.message);
    }
    public static isElement(a) {
        return utils.isObject(a) && 1 === a.nodeType;
    }
    public static isFunction(a) {
        return !(!a || "function" !== typeof a);
    }
    public static isNumber(a) {
        return "number" === typeof a || utils.isObject(a) && "[object Number]" === func2(a);
    }
    public static isObject(a) {
        return !(!a || "object" !== typeof a);
    }
    public static isString(a) {
        return "string" === typeof a || !utils.isArray(a) && utils.isObject(a) && "[object String]" === func2(a);
    }
    public static isWrappableFunction(a) {
        return this.isFunction(a) && this.hasFunction(a, "apply");
    }
    public static isoNow() {
        var a = new Date;
        return a.toISOString ? a.toISOString() : a.getUTCFullYear() + "-" +
            this.pad(a.getUTCMonth() + 1) + "-" + this.pad(a.getUTCDate()) + "T" + this.pad(a.getUTCHours()) + ":" + this.pad(a.getUTCMinutes()) + ":" + this.pad(a.getUTCSeconds()) + "." + String((a.getUTCMilliseconds() / 1E3).toFixed(3)).slice(2, 5) + "Z";
    }
    public static keys(a) {
        if (!utils.isObject(a))
            return [];
        var b = [], f;
        for (f in a) {
            a.hasOwnProperty(f) && b.push(f);
        }
        return b;
    }
    public static noop() {

    }
    public static pad(a) {
        a = String(a);
        1 === a.length && (a = "0" + a);
        return a;
    }
    public static parseURL(a) {
        var b = a.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
        if (!b) {
            return {};
        }
        b = { protocol: b[2], host: b[4], path: b[5], query: b[6], hash: b[8] };
        b.origin = (b.protocol || "") + "://" + (b.host || "");
        b.relative = (b.path || "") + (b.query || "") + (b.hash || "");
        b.href = a;
        return b;
    }
    public static patch(a, b, f) {
        a[b] = f(a[b] || utils.noop)
    }
    public static testCrossdomainXhr() {
        return utils.isBrowser && "withCredentials" in new XMLHttpRequest;
    }
    public static truncate(a, b) {
        a = "" + a;
        if (a.length <= b)
            return a;
        var c = a.length - b;
        return a.substr(0, b) + "...{" + c + "}";
    }
    public static tryGet(a, b) {
        try {
            return a[b]
        } catch (c) {

        }
    }
    public static uuid() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,
            function (a) { var b = 16 * Math.random() | 0; return ("x" === a ? b : b & 3 | 8).toString(16) });
    }
    public static wrapError(a) {
        var b = a || Object.prototype.toString.call(a);
        if (b && b.innerError) return a;
        var c: any = Error("Tuval Tracker Caught: " + (b.message || b));
        c.description = "Tuval Tracker Caught: " + b.description;
        c.file = b.file;
        c.line = b.line || b.lineNumber;
        c.column = b.column || b.columnNumber;
        c.stack = b.stack;
        c.innerError = a;
        return c
    }
}
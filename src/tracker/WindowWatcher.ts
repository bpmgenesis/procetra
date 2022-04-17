import { utils } from './utils';
var n;
export class WindowWatcher {
    onError: any;
    onFault: any;
    serialize: any;
    public constructor(a, b, d, c, f) {
        this.onError = a;
        this.onFault = b;
        this.serialize = d;
        f.enabled && this.watchWindowErrors(c);
        f.promise && this.watchPromiseErrors(c)
    }
    private watchPromiseErrors(a) {
        var b = this;
        a.addEventListener ? a.addEventListener("unhandledrejection", function (a) {
            try {
                a = a || {};
                var e = a.detail ? utils.tryGet(a.detail, "reason") : utils.tryGet(a, "reason");
                if (e !== n && null !== e && !e.__trackjs_state__) {
                    if (!utils.isError(e)) try {
                        throw Error(b.serialize(e));
                    } catch (f) { e = f }
                    b.onError("promise", e)
                }
            } catch (f) {
                b.onFault(f);
            }
        }) : utils.patch(a, "onunhandledrejection", function (a) {
            return function (c) {
                b.onError("promise", c);
                a.apply(this, arguments)
            }
        })
    }
    private watchWindowErrors(a) {
        var b = this;
        utils.patch(a, "onerror", function (a) {
            return function (message, source, lineno, colno, error) {
                try {
                    if (utils.isError(error)) {
                        b.onError("window", error);
                        a.apply(this, arguments);
                        return
                    }
                    error = error || {};
                    var m: any = {
                        message: error.message || b.serialize(message),
                        name: error.name || "Error",
                        line: error.line || parseInt(lineno, 10) || null,
                        column: error.column || parseInt(colno, 10) || null,
                        stack: error.stack || null
                    };
                    "[object Event]" !== Object.prototype.toString.call(message) || source ? m.file = error.file || b.serialize(source) : m.file = (message.target || {}).src;
                    b.onError("window", m)
                } catch (n) { b.onFault(n) }
                a.apply(this, arguments)
            }
        })
    }
}
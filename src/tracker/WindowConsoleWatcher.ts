import { utils } from './utils';
export class WindowConsoleWatcher {
    util: any;
    log: any;
    onError: any;
    onFault: any;
    serialize: any;
    public constructor(a, logger, d, e, c, trackObject, g) {
        this.util = a;
        this.log = logger;
        this.onError = d;
        this.onFault = e;
        this.serialize = c;
        g.enabled && (trackObject.console = this.wrapConsoleObject(trackObject.console, g))
    }
    private wrapConsoleObject(a, b) {
        a = a || {};
        var d = a.log || function () { },
            self = this,
            f;
        for (f = 0; f < b.watch.length; f++)
            (function (f) {
                var originalFunction = a[f] || d;
                a[f] = function () {
                    try {
                        var d = Array.prototype.slice.call(arguments);
                        self.log.add("c", { timestamp: self.util.isoNow(), severity: f, message: self.serialize(1 === d.length ? d[0] : d) });
                        if (b[f])
                            if (utils.isError(d[0]) && 1 === d.length) self.onError("console", d[0]);
                            else try { throw Error(self.serialize(1 === d.length ? d[0] : d)); } catch (m) { self.onError("console", m) }
                        b.display && (self.util.hasFunction(originalFunction, "apply") ? originalFunction.apply(a, d) :
                            originalFunction(d[0]))
                    } catch (m) { self.onFault(m) }
                }
            })(b.watch[f]);
        return a
    }
    private report() {
        return this.log.all("c");
    }
}
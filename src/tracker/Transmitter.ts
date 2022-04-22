import { Config } from './Config';
import { utils } from './utils';
import { instance as container } from '@tuval/core';
var _window: any = window;
var _document: any = window.document;
var n;
export class Transmitter {
    util: any;
    config: any;
    disabled: boolean;
    throttleStats: { attemptCount: number; throttledCount: number; lastAttempt: number; };
    public constructor(utils?, config?) {
        this.util = utils;
        this.config = config;
        this.disabled = false;
        this.throttleStats = { attemptCount: 0, throttledCount: 0, lastAttempt: (new Date).getTime() };
        _window.JSON && _window.JSON.stringify || (this.disabled = true);
    }
    private errorEndpoint(a) {
        var b = this.config.current,
            d = b.errorURL;
        utils.isBrowser && !utils.testCrossdomainXhr() && -1 === _window.location.protocol.indexOf("https") ? d = b.errorNoSSLURL : b.forwardingDomain && (d = "https://" + b.forwardingDomain + "/capture");
        return d + "?token=" + a + "&v=3.10.1"
    }
    private usageEndpoint(a) {
        var b = this.config.current,
            d = b.usageURL;
        b.forwardingDomain && (d = "https://" + b.forwardingDomain + "/usage.gif");
        return this.appendObjectAsQuery(a, d)
    }

    public trackerFaultEndpoint(a) {
        var b = (this.config || {}).current || Config.prototype.defaults,
            d = b.faultURL;
        b.forwardingDomain && (d = "https://" +
            b.forwardingDomain + "/fault.gif");
        return this.appendObjectAsQuery(a, d)
    }
    private appendObjectAsQuery(a, b) {
        b += "?";
        for (var d in a)
            a.hasOwnProperty(d) && (b += encodeURIComponent(d) + "=" + encodeURIComponent(a[d]) + "&"); return b;
    }
    private getCORSRequest(a, b):XMLHttpRequest {
        var d;
        this.util.testCrossdomainXhr() ? (d = new _window.XMLHttpRequest, d.open(a, b), d.setRequestHeader("Content-Type", "text/plain")) : "undefined" !== typeof _window.XDomainRequest ? (d = new _window.XDomainRequest, d.open(a, b)) : d = null;
        return d;
    }
    private sendTrackerFault(a) {
        this.throttle(a) ||
            (utils.isBrowser ? _document.createElement("img").src = this.trackerFaultEndpoint(a) : fetch(this.trackerFaultEndpoint(a), { mode: "no-cors", __trackjs__: true } as any))
    }
    private sendUsage(a) {
        utils.isBrowser ? _document.createElement("img").src = this.usageEndpoint(a) : fetch(this.usageEndpoint(a), { mode: "no-cors", __trackjs__: true } as any)
    }
    private sendError(a, b) {
        var d = this;
        if (!this.disabled && !this.throttle(a)) try {
            if (utils.isBrowser) {
                console.log(this.errorEndpoint(b));
                const e:XMLHttpRequest = this.getCORSRequest("POST", this.errorEndpoint(b));
                e.onreadystatechange = function () {
                    4 !== e.readyState || utils.contains([200, 202],
                        e.status) || (d.disabled = true)
                };
                (e as any)._trackJs = n;
                //e.send(_window.JSON.stringify(a))
                try {
                    const logReciever: any = container.resolve('ILogReciever');
                    logReciever.Add(a);
                } catch {
                    console.log('log reciever not found.');
                    console.log(_window.JSON.stringify(a));
                }
            } else if (utils.isWorker) {
                var f: any = { method: "POST", mode: "cors", body: _window.JSON.stringify(a), __trackjs__: 1 };
                fetch(this.errorEndpoint(b), f).then(function (a) { a.ok || (d.disabled = true) })["catch"](function (a) { d.disabled = true })
            }
        } catch (h) { throw this.disabled = true, h; }
    }
    private throttle(a) {
        var b = (new Date).getTime();
        this.throttleStats.attemptCount++;
        if (this.throttleStats.lastAttempt + 1E3 >= b) {
            if (this.throttleStats.lastAttempt = b, 10 < this.throttleStats.attemptCount)
                return this.throttleStats.throttledCount++, true;
        } else
            a.throttled = this.throttleStats.throttledCount, this.throttleStats.attemptCount = 0, this.throttleStats.lastAttempt = b, this.throttleStats.throttledCount = 0;
        return false;
    }
}
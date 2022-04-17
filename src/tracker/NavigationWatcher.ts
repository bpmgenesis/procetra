import { utils } from "./utils";

var _window: any = window;
export class NavigationWatcher {
    log: any;
    options: any;
    public constructor(log, options) {
        this.log = log;
        this.options = options;
        options.enabled && this.watch();
    }
    private isCompatible(a?) {
        a = a || _window;
        return !utils.has(a, "chrome.app.runtime") && utils.has(a, "addEventListener") && utils.has(a, "history.pushState");
    }
    private record(a, b, d) {
        this.log.add("h", { type: a, from: utils.truncate(b, 250), to: utils.truncate(d, 250), on: utils.isoNow() });
    }
    private report() {
        return this.log.all("h");
    }
    private watch() {
        if (this.isCompatible()) {
            var a = this,
                b = utils.getLocationURL().relative;
            _window.addEventListener("popstate",
                function () {
                    var d = utils.getLocationURL().relative;
                    a.record("popState", b, d);
                    b = d
                }, true);
            utils.forEach(["pushState", "replaceState"], function (d) {
                utils.patch(history, d, function (e) {
                    return function () {
                        b = utils.getLocationURL().relative;
                        var f = e.apply(this, arguments),
                            h = utils.getLocationURL().relative;
                        a.record(d, b, h);
                        b = h;
                        return f
                    }
                });
            });
        }
    }
}
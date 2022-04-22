import { utils } from './utils';

var _window: any = window;
var _document: any = window.document;

export class Environment {
    config: any;
    loadedOn: number;
    originalUrl: any;
    referrer: any;
    public constructor(a) {
        this.config = a;
        this.loadedOn = (new Date).getTime();
        this.originalUrl = utils.getLocation();
        this.referrer = utils.isBrowser ? _document.referrer : ""
    }
    private discoverDependencies() {
        var a: any = { TrackJS: "3.10.1" };
        _window.jQuery && _window.jQuery.fn && _window.jQuery.fn.jquery && (a.jQuery = _window.jQuery.fn.jquery);
        _window.jQuery && _window.jQuery.ui && _window.jQuery.ui.version && (a.jQueryUI = _window.jQuery.ui.version);
        _window.angular && _window.angular.version && _window.angular.version.full &&
            (a.angular = _window.angular.version.full);
        for (let b in _window)
            if ("_trackJs" !== b && "_trackJS" !== b && "_trackjs" !== b && "webkitStorageInfo" !== b && "webkitIndexedDB" !== b && "top" !== b && "parent" !== b && "frameElement" !== b)
                try {
                    if (_window[b]) {
                        const d = _window[b].version || _window[b].Version || _window[b].VERSION;
                        if (typeof d === "string") {
                            a[b] = d;
                        }
                    }
                } catch (e) { }
        a.TrackJS && a.trackJs && delete a.trackJs;
        return a
    }
    private report() {
        return {
            age: (new Date).getTime() - this.loadedOn,
            dependencies: this.config.current.dependencies ? this.discoverDependencies() : { trackJs: "3.10.1" },
            originalUrl: this.originalUrl,
            referrer: this.referrer,
            userAgent: _window.navigator.userAgent,
            viewportHeight: utils.isBrowser ? _window.document.documentElement.clientHeight : 0,
            viewportWidth: utils.isBrowser ? _window.document.documentElement.clientWidth : 0
        }
    }
}
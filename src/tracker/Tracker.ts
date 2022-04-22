import { utils } from './utils';
import { Logger } from './Logger';
import { Metadata } from './Metadata';
import { Config } from './Config';
import { Transmitter } from './Transmitter';
import { Environment } from './Environment';
import { Customer } from './Customer';
import { WindowConsoleWatcher } from './WindowConsoleWatcher';
import { CallbackWatcher } from './CallbackWatcher';
import { VisitorWatcher } from './VisitorWatcher';
import { NavigationWatcher } from './NavigationWatcher';
import { NetworkWatcher } from './NetworkWatcher';
import { WindowWatcher } from './WindowWatcher';
import { ErrorStackParser } from './StackFrame';
import { ModuleLoader } from '@tuval/core';
var _window: any = window;
var _document: any = window.document;
export class Tracker {
    hasInstalled: boolean;
    hasEnabled: boolean;
    window: any;
    document: any;
    util: any;
    log: any;
    metadata: any;
    config: any;
    transmitter: any;
    environment: any;
    customer: any;
    windowConsoleWatcher: any;
    callbackWatcher: any;
    visitorWatcher: any;
    navigationWatcher: any;
    networkWatcher: any;
    windowWatcher: any;
    public constructor() {
        this.hasInstalled = false;
        this.hasEnabled = true;
        this.window = _window;
        this.document = _document;
        this.util = utils;
        this.install = utils.bind(this.install, this);
        this.onError = utils.bind(this.onError, this);
        this.onFault = utils.bind(this.onFault, this);
        this.serialize = utils.bind(this.serialize, this);
        this.log = new Logger(utils);
        this.metadata = new Metadata(this.serialize);
        var a = _window && (_window._trackJs || _window._trackJS || _window._trackjs);
        a && this.install(a);
    }
    private install(options) {
        try {
            if (utils.isNode) return this.warn("monitoring disabled in node"), false;
            if (!utils.has(options, "token")) return this.warn("missing token"), false;
            if (this.hasInstalled) return this.warn("already installed"), false;
            this.config = new Config(options);
            this.transmitter = new Transmitter(this.util, this.config);
            this.environment = new Environment(this.config);
            this.customer = new Customer(this.config, this.util, this.log, this.window, this.document);
            if (!this.config.current.enabled) return this.hasEnabled = false;
            this.windowConsoleWatcher = new WindowConsoleWatcher(this.util, this.log, this.onError, this.onFault, this.serialize, this.window, this.config.current.console);
            if (!this.util.isBrowserSupported()) return false;
            this.callbackWatcher = new CallbackWatcher(this.config.current.callback, this.onError, this.onFault);
            this.visitorWatcher = new VisitorWatcher(this.util, this.log, this.onError, this.onFault, this.document, this.config.current.visitor);
            this.navigationWatcher = new NavigationWatcher(this.log, this.config.current.navigation);
            this.networkWatcher = new NetworkWatcher(this.util, this.log, this.onError,
                this.onFault, this.window, this.config.current.network);
            this.windowWatcher = new WindowWatcher(this.onError, this.onFault, this.serialize, this.window, this.config.current.window);
            var b = this;
            utils.afterDocumentLoad(function () { b.transmitter.sendUsage({ token: b.customer.token, correlationId: b.customer.correlationId, application: b.config.current.application, x: b.util.uuid() }) });
            return this.hasInstalled = true
        } catch (_error) {
            return this.onFault(_error), false
        }
    }
    public pub() {
        var a = this,
            trackObject = {
                addMetadata: this.metadata.addMetadata,
                attempt: function (b,
                    e) { try { var f = Array.prototype.slice.call(arguments, 2); return b.apply(e || this, f) } catch (g) { throw a.onError("catch", g), utils.wrapError(g); } },
                configure: function (b) { return !a.hasInstalled && a.hasEnabled ? (a.warn("agent must be installed"), false) : a.config.setCurrent(b) },
                hash: "fb090f9249a14e8440f317f57bd82ec8d6ea32a4",
                isInstalled: function () { return a.hasInstalled },
                install: this.install,
                removeMetadata: this.metadata.removeMetadata,
                track: function (b) {
                    if (!a.hasInstalled && a.hasEnabled) a.warn("agent must be installed");
                    else {
                        var e =
                            utils.isError(b) ? b.message : a.serialize(b);
                        b = b || {};
                        if (!b.stack) try { throw Error(e); } catch (f) { b = f }
                        a.onError("direct", b)
                    }
                },
                version: "3.10.1",
                watch: function (b, e) { return function () { try { var f = Array.prototype.slice.call(arguments, 0); return b.apply(e || this, f) } catch (g) { throw a.onError("catch", g), utils.wrapError(g); } } },
                watchAll: function (a) {
                    var b = Array.prototype.slice.call(arguments, 1),
                        f;
                    for (f in a) "function" !== typeof a[f] || utils.contains(b, f) || (a[f] = this.watch(a[f], a));
                    return a
                }
            };
        new WindowConsoleWatcher(utils, a.log, a.onError, a.onFault, a.serialize, trackObject, Config.prototype.defaults.console);
        return trackObject
    }
    private onError = (() => {
        var a, b = false;
        return function (d, e, f?) {
            if (this.hasInstalled && this.hasEnabled && utils.isBrowserSupported()) try {
                if (f = f || { bindStack: null, bindTime: null, force: false }, e && utils.isError(e) || (e = { name: "Error", message: this.serialize(e, f.force) }), -1 === e.message.indexOf("TrackJS Caught"))
                    if (b && -1 !== e.message.indexOf("Script error")) b = false;
                    else {
                        const arrayOfLines = ErrorStackParser.parse(e);
                        const tuvalApp = ModuleLoader.LoadedModules[arrayOfLines[0].fileName];

                        var h = utils.defaultsDeep({}, {
                            agentPlatform: utils.isBrowser ? "browser" : "worker",
                            bindStack: f.bindStack,
                            bindTime: f.bindTime,
                            column: e.column ||
                                e.columnNumber,
                            console: this.windowConsoleWatcher.report(),
                            customer: this.customer.report(),
                            entry: d,
                            environment: this.environment.report(),
                            file: e.file || e.fileName,
                            line: e.line || e.lineNumber,
                            message: e.message,
                            metadata: this.metadata.report(),
                            nav: this.navigationWatcher.report(),
                            network: this.networkWatcher.report(),
                            url: (_window.location || "").toString(),
                            stack: e.stack,
                            TuvalApp: tuvalApp,
                            timestamp: this.util.isoNow(),
                            visitor: this.visitorWatcher.report(),
                            version: "3.10.1"
                        });
                        if (!f.force) try { if (!this.config.current.onError(h, e)) return }
                            catch (m: any) {
                                h.console.push({
                                    timestamp: this.util.isoNow(),
                                    severity: "error",
                                    message: m.message
                                });
                                var l = this;
                                setTimeout(function () { l.onError("catch", m, { force: true }) }, 0)
                            }
                        if (this.config.current.dedupe) {
                            var k = (h.message + h.stack).substr(0, 1E4);
                            if (k === a) return;
                            a = k
                        }
                        (function () {
                            function a() {
                                var b = 0;
                                utils.forEach(h.console, function (a) {
                                    b += (a.message || "").length
                                });
                                return 8E4 <= b
                            }
                            for (var b = 0; a() && b < h.console.length;)
                                h.console[b].message = utils.truncate(h.console[b].message, 1E3), b++;
                        })();
                        this.log.clear();
                        setTimeout(function () { b = false });
                        b = true;
                        this.transmitter.sendError(h, this.customer.token)
                    }
            } catch (m) { this.onFault(m) }
        }
    })();
    private onFault(a) {
        var b = this.transmitter || new Transmitter;
        a = a || {};
        a = { token: (this.customer || {}).token, file: a.file || a.fileName, msg: a.message || "unknown", stack: (a.stack || "unknown").substr(0, 1E3), url: this.window.location, v: "3.10.1", h: "fb090f9249a14e8440f317f57bd82ec8d6ea32a4", x: this.util.uuid() };
        b.sendTrackerFault(a)
    }
    private serialize(a, b?) {
        if (this.hasInstalled && this.config.current.serialize && !b) try { return this.config.current.serialize(a) } catch (c) { this.onError("catch", c, { force: true }) }
        return Config.prototype.defaults.serialize(a)
    }
    private warn(a) {
        utils.has(_window, "console.warn") && _window.console.warn("Tuval Traker: " + a);
    }
}

export const TuvalTracker = new Tracker().pub();
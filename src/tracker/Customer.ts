export class Customer {
    config: any;
    util: any;
    log: any;
    window: any;
    document: any;
    correlationId: any;
    token: any;
    public constructor(a, b, d, e, c) {
        this.config = a;
        this.util = b;
        this.log = d;
        this.window = e;
        this.document = c;
        this.correlationId = this.token = null;
        this.initialize()
    }
    private initialize() {
        this.token = this.getCustomerToken();
        this.correlationId = this.getCorrelationId()
    }
    private getCustomerToken() {
        if (this.config.current.token) return this.config.current.token;
        var a = this.document.getElementsByTagName("script");
        return a[a.length - 1].getAttribute("data-token")
    }
    private getCorrelationId() {
        var a;
        if (!this.config.current.cookie)
            return this.util.uuid();
        try {
            a = this.document.cookie.replace(/(?:(?:^|.*;\s*)TrackJS\s*\=\s*([^;]*).*$)|^.*$/, "$1"), a || (a = this.util.uuid(), this.document.cookie = "TrackJS=" + a + "; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/")
        } catch (b) {
            a = this.util.uuid()
        }
        return a
    }
    private report() {
        return {
            application: this.config.current.application,
            correlationId: this.correlationId,
            sessionId: this.config.current.sessionId,
            token: this.token,
            userId: this.config.current.userId,
            version: this.config.current.version
        }
    }
}
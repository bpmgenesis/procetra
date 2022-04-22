export class Logger {
    util: any;
    appender: any[];
    maxLength: number;
    public constructor(a) {
        this.util = a;
        this.appender = [];
        this.maxLength = 30;
    }
    private all(a) {
        var b = [],
            d, e;
        for (e = 0; e < this.appender.length; e++)(d = this.appender[e]) && d.category === a && b.push(d.value);
        return b
    }
    private clear() {
        this.appender.length = 0;
    }
    private truncate() {
        this.appender.length > this.maxLength && (this.appender =
            this.appender.slice(Math.max(this.appender.length - this.maxLength, 0)))
    }
    private add(a, b) {
        var d = this.util.uuid();
        this.appender.push({ key: d, category: a, value: b });
        this.truncate();
        return d;
    }
    private get(a, b) {
        var d, e;
        for (e = 0; e < this.appender.length; e++) {
            if (d = this.appender[e], d.category === a && d.key === b) return d.value;
        }
        return false
    }
}
export class Metadata {
    public constructor(a) {
        var b = {};
        return {
            addMetadata: function (a, e) { b[a] = e },
            removeMetadata: function (a) { delete b[a] },
            report: function () {
                var d = [],
                    e;
                for (e in b) b.hasOwnProperty(e) && d.push({
                    key: e,
                    value: a(b[e])
                });
                return d
            },
            store: b
        };
    }
}
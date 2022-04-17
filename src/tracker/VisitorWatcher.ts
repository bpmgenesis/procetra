import { utils } from './utils';

var _window: any = window;
var _document: any = window.document;
var n;
export class VisitorWatcher {
    util: any;
    log: any;
    onError: any;
    onFault: any;
    options: any;
    document: any;
    public constructor(a, b, d, c, f, g) {
        this.util = a;
        this.log = b;
        this.onError = d;
        this.onFault = c;
        this.options = g;
        this.document = f;
        a.isBrowser &&
            g.enabled && this.initialize(f)
    }
    private initialize(a) {
        var b = this.util.bind(this.onDocumentClicked, this),
            d = this.util.bind(this.onInputChanged, this);
        a.addEventListener ? (a.addEventListener("click", b, true), a.addEventListener("blur", d, true)) : a.attachEvent && (a.attachEvent("onclick", b), a.attachEvent("onfocusout", d))
    }
    private onDocumentClicked(a) {
        try {
            var b = this.getElementFromEvent(a);
            b && b.tagName && (this.isDescribedElement(b, "a") || this.isDescribedElement(b, "button") || this.isDescribedElement(b, "input", ["button", "submit"]) ? this.writeVisitorEvent(b, "click") : this.isDescribedElement(b, "input", ["checkbox", "radio"]) && this.writeVisitorEvent(b, "input", b.value, b.checked))
        } catch (d) { this.onFault(d) }
    }
    private onInputChanged(a) {
        try {
            var b = this.getElementFromEvent(a);
            if (b && b.tagName)
                if (this.isDescribedElement(b, "textarea")) this.writeVisitorEvent(b, "input", b.value);
                else if (this.isDescribedElement(b, "select") && b.options && b.options.length) this.onSelectInputChanged(b);
                else this.isDescribedElement(b, "input") && !this.isDescribedElement(b,
                    "input", ["button", "submit", "hidden", "checkbox", "radio"]) && this.writeVisitorEvent(b, "input", b.value)
        } catch (d) { this.onFault(d) }
    }
    private onSelectInputChanged(a) {
        if (a.multiple)
            for (var b = 0; b < a.options.length; b++) a.options[b].selected && this.writeVisitorEvent(a, "input", a.options[b].value);
        else 0 <= a.selectedIndex && a.options[a.selectedIndex] && this.writeVisitorEvent(a, "input", a.options[a.selectedIndex].value)
    }
    private writeVisitorEvent(a, b, d?, c?) {
        "password" === this.getElementType(a) && (d = n);
        var f: any = this.getElementAttributes(a);
        a.innerText && (f.__trackjs_element_text = this.util.truncate(a.innerText, 500));
        this.log.add("v", { timestamp: this.util.isoNow(), action: b, element: { tag: a.tagName.toLowerCase(), attributes: f, value: this.getMetaValue(d, c) } })
    }
    private getElementFromEvent(a) {
        return a.target || _document.elementFromPoint(a.clientX, a.clientY);
    }
    private isDescribedElement(a, b, d?) {
        if (a.tagName.toLowerCase() !== b.toLowerCase()) return false;
        if (!d) return true;
        a = this.getElementType(a);
        for (b = 0; b < d.length; b++)
            if (d[b] === a) return true;
        return false;
    }
    private getElementType(a) {
        return (a.getAttribute("type") ||
            "").toLowerCase();
    }
    private getElementAttributes(a) {
        for (var b = {}, d = Math.min(a.attributes.length, 10), e = 0; e < d; e++) {
            var f = a.attributes[e];
            utils.contains(["data-value", "value"], f.name.toLowerCase()) || (b[f.name] = utils.truncate(f.value, 100))
        }
        return b
    }
    private getMetaValue(a, b) {
        return a === n ? n : { length: a.length, pattern: this.matchInputPattern(a), checked: b }
    }
    private matchInputPattern(a) {
        return "" === a ? "empty" : /^[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(a) ?
            "email" : /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(a) || /^(\d{4}[\/\-](0?[1-9]|1[012])[\/\-]0?[1-9]|[12][0-9]|3[01])$/.test(a) ? "date" : /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/.test(a) ? "usphone" : /^\s*$/.test(a) ? "whitespace" : /^\d*$/.test(a) ? "numeric" : /^[a-zA-Z]*$/.test(a) ?
                "alpha" : /^[a-zA-Z0-9]*$/.test(a) ? "alphanumeric" : "characters"
    }
    private report() {
        return this.log.all("v");
    }
}
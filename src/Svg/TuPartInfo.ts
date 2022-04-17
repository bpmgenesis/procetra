import { Types } from './types';
import { ClassInfo, IKeyValuePair, List, StringBuilder, TString, foreach } from '@tuval/core';

const indexOfAny = function (str: string, array: string[], start: number = 0): number {
    for (let i = 0; i < array.length; i++) {
        const index = String.prototype.indexOf.call(this, array[i], start);
        if (index > -1) {
            return index;
        }
    }
    return -1;
};

@ClassInfo({
    fullName: Types.TuPartInfo,
    instanceof: [
        Types.TuPartInfo
    ]
})
export class TuPartInfo {
    private static readonly myQuotables: string[];
    private myProperties: List<IKeyValuePair<string, any>> = new List<IKeyValuePair<string, any>>();

    public get ContextClick(): string {
        return this.getProperty("ContextClick") as string;
    }

    public set ContextClick(value: string) {
        this.setProperty("ContextClick", value);
    }

    public get DoubleClick(): string {
        return this.getProperty("DoubleClick") as string;
    }

    public set DoubleClick(value: string) {
        this.setProperty("DoubleClick", value);
    }

    public get ID(): string {
        return this.getProperty("ID") as string;
    }
    public set ID(value: string) {
        this.setProperty("ID", value);
    }

    public get(p: string): any {
        return this.getProperty(p);
    }
    public set(p: string, value: any) {
        this.setProperty(p, value);
    }

    public get SingleClick(): string {
        return this.getProperty("SingleClick") as string;
    }
    public set SingleClick(value: string) {
        this.setProperty("SingleClick", value);
    }

    public get Text(): string {
        return this.getProperty("Text") as string;
    }
    public set Text(value: string) {
        this.setProperty("Text", value);
    }

    private addProp(s: StringBuilder, p: string, v: any): void {
        if (p == null || p.length == 0 || v == null) {
            return;
        }
        if (s.Length > 0) {
            s.Append(",");
        }
        s.Append(TString.Concat(TuPartInfo.DQuote(p), ":"));
        this.addPropVal(s, v);
    }

    private addPropVal(s: StringBuilder, v: any): void {
        if (typeof v === 'string') {
            s.Append(TuPartInfo.DQuote(v));
            return;
        }
        if (typeof v === 'boolean') {
            const flag: boolean = v;
            s.Append((flag ? "true" : "false"));
            return;
        }
        if (typeof v === 'number') {
            const ınt32: number = v;
            s.Append(ınt32.toString());
            return;
        }

        if (!(Array.isArray(v))) {
            s.Append(v.toString());
            return;
        }
        const arrays: Array<any> = v;
        s.Append("[");
        foreach(arrays, (item: any) => {
            this.addPropVal(s, item);
        });

        s.Append("]");
    }

    public static DQuote(s: string): string {
        return TuPartInfo.Quote(s, '\"');
    }

    public /* override */ equals(goPartInfo: TuPartInfo): boolean {
        if (goPartInfo == null) {
            return false;
        }
        if (this.myProperties.Count !== goPartInfo.myProperties.Count) {
            return false;
        }
        for (let i = 0; i < this.myProperties.Count; i = (i + 1)) {
            if (this.myProperties[i].key !== goPartInfo.myProperties[i].key) {
                return false;
            }
            // TODO:  aşağıdaki eşitlik yerine equal konabilir.
            if (this.myProperties[i].value !== goPartInfo.myProperties[i].value) {
                return false;
            }
        }
        return true;
    }

    public getProperty(p: string): any {
        for (let i = 0; i < this.myProperties.Count; i = (i + 1)) {
            if (this.myProperties[i].key === p) {
                return this.myProperties[i].value;
            }
        }
        return null;
    }

    public static Quote(s: string, quote: string): string {
        let str: string = s;
        if (indexOfAny(str,TuPartInfo.myQuotables) >= 0) {
            // TODO: replace kontrol edilmeli.
            str = s.replace("\r\n", "\\n").replace("\n", "\\n").replace("\r", "\\n").replace("'", "\\'").replace("\"", "\\\"");
        }
        if (quote.charCodeAt(0) === 0) {
            return str;
        }
        return TString.Concat(quote.toString(), str, quote.toString());
    }

    public setProperty(p: string, v: any): void {
        for (let i = 0; i < this.myProperties.Count; i = (i + 1)) {
            if (this.myProperties[i].key === p) {
                this.myProperties[i] = { key: p, value: v };
                return;
            }
        }
        const keyValuePair: IKeyValuePair<string, any> = { key: p, value: v };
        this.myProperties.Add(keyValuePair);
    }
    public static SQuote(s: string): string {
        return TuPartInfo.Quote(s, '\'');
    }

    public /* override */  toString(): string {
        const stringBuilder: StringBuilder = new StringBuilder();
        for (let i = 0; i < this.myProperties.Count; i = (i + 1)) {
            let ıtem: IKeyValuePair<string, any> = this.myProperties[i];
            const key: string = ıtem.key;
            ıtem = this.myProperties[i];
            this.addProp(stringBuilder, key, ıtem.value);
        }
        return TString.Concat("{", stringBuilder.ToString(), "}");
    }
}

(function staticConstructor() {
    (<any>TuPartInfo).myQuotables = ['\'', '\"', '\n', '\r'];
})();
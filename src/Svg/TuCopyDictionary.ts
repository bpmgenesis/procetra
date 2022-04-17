import { Dictionary, as, foreach } from '@tuval/core';
import { ITuCollection } from './ITuCollection';
import { TuCopyDelayedsCollection } from './TuCopyDelayedsCollection';
import { TuDocument } from './TuDocument/TuDocument';
import { TuObject } from './TuObject/TuObject';
import { Types } from './types';

interface TuCopyDictionaryConfig {
    [key: string]: any;
}
export class TuCopyDictionary extends Dictionary<any, any> {
    private mySourceCollection: ITuCollection;
    private myDestinationDocument: TuDocument;
    private myDelayeds: TuCopyDelayedsCollection;

    public get Delayeds(): TuCopyDelayedsCollection {
        return this.getDelayeds();
    }
    protected /*virtual*/ getDelayeds(): TuCopyDelayedsCollection {
        if (this.myDelayeds == null) {
            this.myDelayeds = new TuCopyDelayedsCollection();
        }
        return this.myDelayeds;
    }

    public get DestinationDocument(): TuDocument {
        return this.getDestinationDocument();
    }
    protected /*virtual*/ getDestinationDocument(): TuDocument {
        return this.myDestinationDocument;
    }
    public set DestinationDocument(value: TuDocument) {
        this.setDestinationDocument(value);
    }
    protected /*virtual*/ setDestinationDocument(value: TuDocument) {
        this.myDestinationDocument = value;
    }

    public get SourceCollection(): ITuCollection {
        return this.getSourceCollection();
    }
    protected /*virtual*/ getSourceCollection(): ITuCollection {
        return this.mySourceCollection;
    }
    public set SourceCollection(value: ITuCollection) {
        this.setSourceCollection(value);
    }
    protected /*virtual*/ setSourceCollection(value: ITuCollection) {
        this.mySourceCollection = value;
    }

    public constructor(config?:TuCopyDictionaryConfig) {
        super();
        Object.assign(this, config);
    }
    public /*virtual*/ copy(obj: TuObject): TuObject {
        if (obj == null) {
            return undefined;
        }
        const node: TuObject = as(this.Get(obj), Types.TuObject);
        const ıtem: TuObject = node ? node : obj.CopyObject(this);
        return ıtem;
    }

    public CopyComplete(obj: TuObject): TuObject {
        if (obj == null) {
            return undefined;
        }
        const goObject = this.copy(obj);
        this.finishDelayedCopies();
        return goObject;
    }

    public /*virtual*/ finishDelayedCopies() {
        if (this.myDelayeds == null) {
            return;
        }

        foreach(this.Delayeds, (delayed: any) => {
            const goObject: TuObject = as(delayed, Types.TuObject);
            if (goObject == null) {
                return;
            }
            const ıtem: TuObject = as(this.Get(goObject), Types.TuObject);
            if (ıtem == null) {
                return;
            }
            goObject.CopyObjectDelayed(this, ıtem);
        });
        this.Delayeds.Clear();
    }

    public override Get(key: any) {
        if (this.ContainsKey(key)) {
            return super.Get(key);
        } else {
            return null;
        }
    }
}
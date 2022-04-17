import { TuLayer } from './../TuLayer/TuLayer';
import { GeomUtilities } from './../GeomUtilities';
import { CGPoint } from '@tuval/cg';
import { Types } from './../types';
import { ClassInfo, is, as, List, foreach, CONTINUE } from '@tuval/core';
import { TuGroup } from "../TuGroup/TuGroup";
import { TuNode } from '../TuNode/TuNode';
import { TuNodeLinkEnumerator } from '../TuNode/TuNodeLinkEnumerator';
import { TuNodeSearch } from '../TuNode/TuNodeSearch';
import { TuNodeNodeEnumerator } from '../TuNode/TuNodeNodeEnumerator';
import { TuObject } from '../TuObject/TuObject';
import { ITuCollection } from '../ITuCollection';
import { TuCollection } from '../TuCollection/TuCollection';
import { TuGroupEnumerator } from '../TuGroup/TuGroupEnumerator';
import { ITuNode } from '../TuNode/ITuNode';
import { ITuLink } from '../ITuLink';
import { ITuPort } from '../ITuPort';

@ClassInfo({
    fullName: Types.TuSubGraphBase,
    instanceof: [
        Types.TuSubGraphBase
    ]
})
export class TuSubGraphBase extends TuNode {

    public get ExternalDestinationLinks(): TuNodeLinkEnumerator {
        return this.getExternalDestinationLinks();
    }

    protected /*virtual*/ getExternalDestinationLinks(): TuNodeLinkEnumerator {
        return this.getLinkEnumerator(TuNodeSearch.LinksOut | TuNodeSearch.NotSelf);
    }

    public get ExternalDestinations(): TuNodeNodeEnumerator {
        return this.getExternalDestinations();
    }
    protected /*virtual*/  getExternalDestinations(): TuNodeNodeEnumerator {
        return this.getNodeEnumerator(TuNodeSearch.NodesOut | TuNodeSearch.NotSelf);
    }

    public get ExternalLinks(): TuNodeLinkEnumerator {
        return this.getExternalLinks();
    }
    protected /*virtual*/  getExternalLinks(): TuNodeLinkEnumerator {
        return this.getLinkEnumerator(TuNodeSearch.LinksIn | TuNodeSearch.LinksOut | TuNodeSearch.NotSelf);
    }

    public get ExternalNodes(): TuNodeNodeEnumerator {
        return this.getExternalNodes();
    }
    protected /*virtual*/  getExternalNodes(): TuNodeNodeEnumerator {
        return this.getNodeEnumerator(TuNodeSearch.NodesIn | TuNodeSearch.NodesOut | TuNodeSearch.NotSelf);
    }

    public get ExternalSourceLinks(): TuNodeLinkEnumerator {
        return this.getExternalSourceLinks();
    }
    protected /*virtual*/  getExternalSourceLinks(): TuNodeLinkEnumerator {
        return this.getLinkEnumerator(TuNodeSearch.LinksIn | TuNodeSearch.NotSelf);
    }

    public get ExternalSources(): TuNodeNodeEnumerator {
        return this.getExternalSources();
    }
    protected /*virtual*/  getExternalSources(): TuNodeNodeEnumerator {
        return this.getNodeEnumerator(TuNodeSearch.NodesIn | TuNodeSearch.NotSelf);
    }

    public static FindParentSubGraph(obj: TuObject): TuSubGraphBase {
        if (obj == null) {
            return undefined;
        }
        for (let i = obj.Parent; i != null; i = i.Parent) {
            if (is.typeof<TuSubGraphBase>(i, Types.TuSubGraphBase)) {
                return i;
            }
        }
        return undefined;
    }

    protected getLinkEnumerator(s: TuNodeSearch): TuNodeLinkEnumerator {
        return new TuNodeLinkEnumerator(this, s);
    }

    protected getNodeEnumerator(s: TuNodeSearch): TuNodeNodeEnumerator {
        return new TuNodeNodeEnumerator(this, s);
    }

    public /*override*/ pickObjects(p: CGPoint, selectableOnly: boolean, coll: ITuCollection, max: number): ITuCollection {
        let goCollections: ITuCollection;
        if (coll == null) {
            coll = new TuCollection();
        }
        if (coll.Count >= max) {
            return coll;
        }
        if (!GeomUtilities.ContainsRect(this.Bounds, p)) {
            return coll;
        }
        if (!this.CanView()) {
            return coll;
        }
        const enumerator: TuGroupEnumerator = this.Backwards.GetEnumerator();
        try {
            while (enumerator.MoveNext()) {
                const current: TuObject = enumerator.Current;
                const goSubGraphBase: TuSubGraphBase = as(current, Types.TuSubGraphBase);
                if (goSubGraphBase == null) {
                    const goObject: TuObject = current.Pick(p, selectableOnly);
                    if (goObject == null) {
                        continue;
                    }
                    coll.Add(goObject);
                    if (coll.Count < max) {
                        continue;
                    }
                    goCollections = coll;
                    return goCollections;
                }
                else {
                    goSubGraphBase.pickObjects(p, selectableOnly, coll, max);
                }
            }
            if (this.PickableBackground && (!selectableOnly || this.CanSelect())) {
                coll.Add(this);
            }
            return coll;
        }
        finally {
            enumerator.Dispose();
        }
        return goCollections;
    }

    public static ReparentAllLinksToSubGraphs(coll: List<TuObject>, behind: boolean, layer: TuLayer): void {
        const goCollections: List<TuObject> = new List<TuObject>();
        foreach(coll, (goObject: TuObject) => {
            goCollections.Add(goObject);
        });

        foreach(goCollections, (goCollection: TuObject) => {
            const goNode: ITuNode = as(goCollection, Types.ITuNode);
            if (goNode == null) {
                const goPort: ITuPort = as(goCollection, Types.ITuPort);
                if (goPort == null) {
                    const goLink: ITuLink = as(goCollection, Types.ITuLink);
                    if (goLink == null || goLink.FromPort == null || goLink.ToPort == null) {
                        return CONTINUE;
                    }
                    TuSubGraphBase.ReparentToCommonSubGraph(goLink.TuObject, goLink.FromPort.TuObject, goLink.ToPort.TuObject, behind, layer);
                }
                else {
                    foreach(goPort.Links, (link: ITuLink) => {
                        if (link == null || link.FromPort == null || link.ToPort == null) {
                            return CONTINUE;
                        }
                        TuSubGraphBase.ReparentToCommonSubGraph(link.TuObject, link.FromPort.TuObject, link.ToPort.TuObject, behind, layer);
                    });

                }
            }
            else {
                foreach(goNode.Links, (link1: ITuLink) => {
                    if (link1 == null || link1.FromPort == null || link1.ToPort == null) {
                        return CONTINUE;
                    }
                    TuSubGraphBase.ReparentToCommonSubGraph(link1.TuObject, link1.FromPort.TuObject, link1.ToPort.TuObject, behind, layer);
                });
            }
        });

    }

    public static ReparentToCommonSubGraph(obj: TuObject, child1: TuObject, child2: TuObject, behind: boolean, layer: TuLayer): void {
        let parent: TuObject = TuObject.FindCommonParent(TuSubGraphBase.FindParentSubGraph(child1), TuSubGraphBase.FindParentSubGraph(child2));
        while (parent != null && !(is.typeof<TuSubGraphBase>(parent, Types.TuSubGraphBase))) {
            parent = parent.Parent;
        }
        const goSubGraphBase: TuSubGraphBase = as(parent, Types.TuSubGraphBase);
        if (obj.Parent !== goSubGraphBase || obj.Layer == null) {
            if (obj.Parent == null && obj.Layer == null) {
                if (goSubGraphBase == null) {
                    layer.Add(obj);
                    return;
                }
                if (behind) {
                    goSubGraphBase.insertBefore(undefined, obj);
                    return;
                }
                goSubGraphBase.insertAfter(undefined, obj);
                return;
            }
            const goCollections: TuCollection = new TuCollection({
                entries: [obj]
            });

            if (goSubGraphBase != null) {
                goSubGraphBase.AddCollection(goCollections, false);
                return;
            }
            layer.AddCollection(goCollections, false);
        }
    }
}

(<any>TuGroup)._ReparentAllLinksToSubGraphs = TuSubGraphBase.ReparentAllLinksToSubGraphs;
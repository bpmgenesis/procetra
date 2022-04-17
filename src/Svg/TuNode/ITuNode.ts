import { ITuGraphPart } from "../ITuGraphPart";
import { IEnumerable } from '@tuval/core';
import { ITuLink } from "../ITuLink";
import { ITuPort } from "../ITuPort";

export interface ITuNode extends ITuGraphPart {
    DestinationLinks: IEnumerable<ITuLink>
    Destinations: IEnumerable<ITuNode>;
    Links: IEnumerable<ITuLink>;
    Nodes: IEnumerable<ITuNode>;
    Ports: IEnumerable<ITuPort>;
    SourceLinks: IEnumerable<ITuLink>;
    Sources: IEnumerable<ITuNode>;
}
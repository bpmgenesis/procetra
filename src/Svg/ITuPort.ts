import { ITuGraphPart } from "./ITuGraphPart";
import { IEnumerable } from '@tuval/core';
import { ITuLink } from "./ITuLink";
import { ITuNode } from "./TuNode/ITuNode";
import { CGRectangle } from '@tuval/cg';

export interface ITuPort extends ITuGraphPart {
    DestinationLinks: IEnumerable<ITuLink>
    DestinationLinksCount: number;
    Links: IEnumerable<ITuLink>;
    LinksCount: number;
    Node: ITuNode;
    SourceLinks: IEnumerable<ITuLink>;
    SourceLinksCount: number;
    addDestinationLink(l: ITuLink): void;
    addSourceLink(l: ITuLink): void;
    canLinkFrom(): boolean;
    canLinkTo(): boolean;
    clearLinks(): void;
    containsLink(l: ITuLink): boolean;
    copyLinksArray(): ITuLink[];
    isValidLink(toPort: ITuPort): boolean;
    onLinkChanged(link: ITuLink, subhint: number, oldI: number, oldVal: number, oldRect: CGRectangle, newI: number, newVal: any, newRect: CGRectangle): void;
    removeLink(l: ITuLink): void;
}
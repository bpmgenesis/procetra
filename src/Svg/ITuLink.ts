import { ITuGraphPart } from "./ITuGraphPart";
import { ITuPort } from "./ITuPort";
import { ITuNode } from "./TuNode/ITuNode";
import { CGRectangle } from '@tuval/cg';

export interface ITuLink extends ITuGraphPart {
    FromNode: ITuNode;
    FromPort: ITuPort;
    ToNode: ITuNode;
    ToPort: ITuPort;
    getOtherNode(n: ITuNode): ITuNode;
    getOtherPort(p: ITuPort): ITuPort;
    onPortChanged(port: ITuPort, subhint: number, oldI: number, oldVal: any, oldRect: CGRectangle, newI: number, newVal: any, newRect: CGRectangle): void;
    unlink(): void;
}
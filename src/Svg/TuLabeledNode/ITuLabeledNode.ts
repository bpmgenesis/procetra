import { TuText } from './../TuText/TuText';
import { ITuLabeledPart } from './ITuLabeledPart';
export interface ITuLabeledNode extends ITuLabeledPart {
    Label: TuText;
}
import { as } from '@tuval/core';
import { Types } from '../types';

export class TuImageInfo {
    public Source: any;
    public Index: number = 0;
    public Name: string;
    public Culture: any;

    public constructor(other?: TuImageInfo) {
        if (other != null) {
            this.Source = other.Source;
            this.Index = other.Index;
            this.Name = other.Name;
            this.Culture = other.Culture;
        }
    }
    public /*override*/  equals(obj: TuImageInfo): boolean {
        const goImageInfo: TuImageInfo = as(obj, Types.TuImageInfo);
        if (goImageInfo == null) {
            return false;
        }
        if (this.Source !== goImageInfo.Source || this.Index !== goImageInfo.Index || !(this.Name === goImageInfo.Name)) {
            return false;
        }
        return this.Culture === goImageInfo.Culture;
    }

}
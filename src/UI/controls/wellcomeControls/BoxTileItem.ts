import { Event } from '@tuval/core'
export class BoxTileItem {
    public Title: string;
    public SubTitle: string;
    public FooterTitle: string;
    public OnClick: any;
    public constructor(title: string, subTitle: string) {
        this.Title = title;
        this.SubTitle = subTitle;
        this.OnClick = new Event();
    }
}
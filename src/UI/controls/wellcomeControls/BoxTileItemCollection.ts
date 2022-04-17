import { BoxTile } from './BoxTile';
import { List, int } from '@tuval/core';
import { BoxTileItem } from './BoxTileItem';

export class BoxItemCollection extends List<BoxTileItem> {
    private m_Parent: BoxTile = null as any;
    public constructor(parent: BoxTile) {
        super();
        this.m_Parent = parent;
    }
    public Add(item: BoxTileItem): int {
        const result = super.Add(item);
        this.m_Parent.ForceUpdate();
        return result;
    }
    public RemoveAt(index: int): void {
        super.RemoveAt(index);
        this.m_Parent.ForceUpdate();
    }
    public Clear(): int {
        const result = super.Clear();
        this.m_Parent.ForceUpdate();
        return result;
    }
}
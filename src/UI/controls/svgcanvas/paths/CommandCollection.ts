import { List, int } from '@tuval/core';
import { _Path } from './Path';
import { Command } from './commands/Command';
export class CommandCollection extends List<any> {
    private m_Parent: _Path = null as any;
    public constructor(parent: _Path) {
        super();
        this.m_Parent = parent;
    }
    public Add(item: Command): int {
        const result = super.Add(item);
        this.m_Parent.ForceUpdate();
        return result;
    }
    public RemoveAt(index: int): void {
        super.RemoveAt(index);
        this.m_Parent.ForceUpdate();
    }
}
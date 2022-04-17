import { Control, Teact, DomHandler, React, Modes } from '@tuval/forms';
import { Encoding, Convert, Event, int, List } from '@tuval/core';
import { SvgCanvas } from './SvgCanvas';

export class ShapeCollection extends List<any> {
    private m_Parent: SvgCanvas = null as any;
    public constructor(parent: SvgCanvas) {
        super();
        this.m_Parent = parent;
    }
    public Add(item: Control<any>): int {
        const result = super.Add(item);
        item.Parent = this.m_Parent;
        item.OnAdoption(this.m_Parent);
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

    public _Clear(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.m_Parent.LastPromise = resolve;
            const result = super.Clear();
            this.m_Parent.ForceUpdate();
        });
    }
}
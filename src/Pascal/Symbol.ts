import { int } from '@tuval/core';
import { Node } from "./Node";

/**
    * Create a new symbol.
    *
    * name: name of symbol (original case is fine).
    * type: type of the symbol (Node.SIMPLE_TYPE, etc.).
    * address:
    *     if variable: address of symbol relative to mark pointer.
    *     if user procedure: address in istore.
    *     if system procedure: index into native array.
    * isNative: true if it's a native subprogram.
    * value: node of value if it's a constant.
    * byReference: whether this symbol is a reference or a value. This only applies
    *     to function/procedure parameters.
    */
export class Symbol {
    public name: string;
    public type: Node;
    public address: int;
    public isNative: boolean;
    public value: string;
    public byReference: string;
    public constructor(name, type: Node, address, byReference) {
        this.name = name;
        this.type = type;
        this.address = address;
        this.isNative = false;
        this.value = null;
        this.byReference = byReference;
    }
}

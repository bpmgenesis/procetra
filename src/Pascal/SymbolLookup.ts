import { int } from '@tuval/core';
export class SymbolLookup {
    private symbol: Symbol;
    private level: int;
    public constructor(symbol: Symbol, level: int) {
        // The symbol found.
        this.symbol = symbol;

        // The number of levels that had to be searched. Zero means it was
        // found in the innermost level.
        this.level = level;
    }
}
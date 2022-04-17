import { int } from '@tuval/core';
// Token types.

export enum TokenTypes {
    IDENTIFIER = 0,
    NUMBER = 1,
    SYMBOL = 2,
    COMMENT = 3,
    STRING = 4,
    EOF = 5,
    RESERVED_WORD = 6
}

export class Token {
    public value: any;
    public tokenType: TokenTypes;
    public lineNumber: int;
    public constructor(value, tokenType: TokenTypes) {
        this.value = value;
        this.tokenType = tokenType;
        this.lineNumber = -1;
    }
    // Returns whether this token is a reserved word, such as "for". These are
    // case-insensitive.
    public isReservedWord(reservedWord) {
        return this.tokenType === TokenTypes.RESERVED_WORD &&
            this.value.toLowerCase() === reservedWord.toLowerCase();
    }
    // Returns whether this token is equal to the specified token. The line
    // number is not taken into account; only the type and value.
    private isEqualTo(other) {
        return this.tokenType === other.tokenType && this.value === other.value;
    }

    // Returns whether this is the specified symbol.
    public isSymbol(symbol) {
        return this.tokenType === TokenTypes.SYMBOL && this.value === symbol;
    }
}
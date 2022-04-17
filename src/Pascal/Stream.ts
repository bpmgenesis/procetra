import { int } from '@tuval/core';
export class Stream {
    private input: string;
    private position: int;
    public lineNumber: int;

    public constructor(input) {
        this.input = input;
        this.position = 0;
        this.lineNumber = 1;
    }

    // Returns the next character, or -1 on end of file.
    public next() {
        var ch = this.peek();
        if (ch == "\n") {
            this.lineNumber++;
        }
        if (ch != -1) {
            this.position++;
        }
        return ch;
    }

    // Peeks at the next character, or -1 on end of file.
    public peek() {
        if (this.position >= this.input.length) {
            return -1;
        }
        return this.input[this.position];
    };

    // Inverse of "next()" method.
    public pushBack(ch) {
        if (this.position === 0) {
            throw "Can't push back at start of stream";
        }
        this.position--;
        // Sanity check.
        if (this.input[this.position] != ch) {
            throw "Pushed back character doesn't match";
        }
    }
}

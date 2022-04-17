import { Token } from './Token';
export class PascalError {
    private token: Token;
    private message: string;
    private stack: string;

    public constructor(token, message) {
    this.token = token;
    this.message = message;

    // Grab a stack trace.
    this.stack = new Error().stack;
}

public getMessage() {
    var message = "Error: " + this.message;

    // Add token info.
    if (this.token) {
        message += " (\"" + this.token.value + "\", line " + this.token.lineNumber + ")";
    }

    return message;
}
}
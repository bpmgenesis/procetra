import { TokenTypes } from './Token';
import { Lexer } from "./Lexer";

export class CommentStripper {
    private lexer: Lexer;
    public constructor(lexer: Lexer) {
        this.lexer = lexer;
    }

    // Returns the next token.
    public next() {
        while (true) {
            var token = this.lexer.next();
            if (token.tokenType != TokenTypes.COMMENT) {
                return token;
            }
        }
    }

    // Peeks at the next token.
    public peek() {
        while (true) {
            var token = this.lexer.peek();
            if (token.tokenType != TokenTypes.COMMENT) {
                return token;
            } else {
                // Skip the comment.
                this.lexer.next();
            }
        }
    }
}

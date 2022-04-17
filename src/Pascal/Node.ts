import { inst } from './inst';
import { NodeTypes } from './NodeTypes';
import { PascalError } from './PascalError';
import { TokenTypes, Token } from './Token';
export const Node = function (nodeType, token, additionalFields?) {
    // The type of node (e.g., Node.PROGRAM), see below.
    this.nodeType = nodeType;

    // The token that created this node.
    this.token = token;

    // Symbol table (for node types PROGRAM, PROCEDURE, and FUNCTION).
    this.symbolTable = null;

    // Type of this node (for expressions).
    this.expressionType = null;

    // Symbol in the symbol table (if VAR, CONST, etc.).
    this.symbol = null;

    // Symbol lookup in the symbol table (if IDENTIFIER, ARRAY, FUNCTION_CALL, etc.).
    this.symbolLookup = null;

    // Fold other fields into our own.
    for (var field in additionalFields) {
        this[field] = additionalFields[field];
    }
};


// Set the symbol table for this program, procedure, or function.
Node.prototype.setSymbolTable = function (symbolTable) {
    this.symbolTable = symbolTable;
};

// Logs the node in JSON format to the console.
Node.prototype.log = function () {
    console.log(JSON.stringify(this, null, 4));
};

// Returns whether the type is numeric (integer, character, or real).
Node.prototype.isNumericType = function () {
    return this !== null &&
        this.nodeType === NodeTypes.SIMPLE_TYPE &&
        (this.typeCode == inst.C ||
         this.typeCode == inst.I ||
         this.typeCode == inst.R);
};

// Returns whether the type is boolean.
Node.prototype.isBooleanType = function () {
    return this !== null &&
        this.nodeType === NodeTypes.SIMPLE_TYPE &&
        this.typeCode == inst.B;
};

// Returns whether the type is void (procedure return type).
Node.prototype.isVoidType = function () {
    return this !== null &&
        this.nodeType === NodeTypes.SIMPLE_TYPE &&
        this.typeCode == inst.P;
};

// If both are identifiers, and are the same identifier (case-insensitive), returns true.
// If identifiers and not equal, returns false. If either is not an identifier, throws.
Node.prototype.isSameIdentifier = function (other) {
    if (this.nodeType !== NodeTypes.IDENTIFIER || other.nodeType !== NodeTypes.IDENTIFIER) {
        throw new PascalError(this.token, "not an identifier");
    }
    return this.token.value.toLowerCase() === other.token.value.toLowerCase();
};

// Given a type, returns true if it's a simple type and of the specified type code.
Node.prototype.isSimpleType = function (typeCode) {
    return this.nodeType === NodeTypes.SIMPLE_TYPE && this.typeCode === typeCode;
};

// Given a NUMBER node, returns the value as a float.
Node.prototype.getNumber = function () {
    if (this.nodeType === NodeTypes.NUMBER) {
        return parseFloat(this.token.value);
    } else {
        throw new PascalError(this.token, "expected a number");
    }
};

// Given a BOOLEAN node, returns the value as a boolean.
Node.prototype.getBoolean = function () {
    if (this.nodeType === NodeTypes.BOOLEAN) {
        return this.token.value.toLowerCase() === "true";
    } else {
        throw new PascalError(this.token, "expected a boolean");
    }
};

// Given a SIMPLE_TYPE node, returns the type code.
Node.prototype.getSimpleTypeCode = function () {
    if (this.nodeType === NodeTypes.SIMPLE_TYPE) {
        return this.typeCode;
    } else {
        throw new PascalError(this.token, "expected a simple type");
    }
};

// Given a RANGE node, returns the lower bound as a number.
Node.prototype.getRangeLowBound = function () {
    if (this.nodeType === NodeTypes.RANGE) {
        return this.low.getNumber();
    } else {
        throw new PascalError(this.token, "expected a range");
    }
};

// Given a RANGE node, returns the high bound as a number.
Node.prototype.getRangeHighBound = function () {
    if (this.nodeType === NodeTypes.RANGE) {
        return this.high.getNumber();
    } else {
        throw new PascalError(this.token, "expected a range");
    }
};

// Given a RANGE node, returns the size (high minus low plus 1).
Node.prototype.getRangeSize = function () {
    if (this.nodeType === NodeTypes.RANGE) {
        return this.high.getNumber() - this.low.getNumber() + 1;
    } else {
        throw new PascalError(this.token, "expected a range");
    }
};

// Given a RECORD_TYPE node, returns the FIELD node for the given token.
Node.prototype.getField = function (fieldToken) {
    if (this.nodeType !== NodeTypes.RECORD_TYPE) {
        throw new PascalError(this.token, "expected a record");
    }

    if (fieldToken.tokenType !== TokenTypes.IDENTIFIER) {
        throw new PascalError(fieldToken, "expected a field name");
    }

    // We could use a dictionary for this instead of a linear lookup, but
    // it's not worth the complexity.
    for (var i = 0; i < this.fields.length; i++) {
        var field = this.fields[i];
        if (field.name.token.isEqualTo(fieldToken)) {
            return field;
        }
    }

    throw new PascalError(fieldToken, "field not found in record");
};

// Given any expression type, returns the value of the expression. The
// expression must evaluate to a scalar constant.
Node.prototype.getConstantValue = function () {
    switch (this.nodeType) {
        case NodeTypes.NUMBER:
            return this.getNumber();
        case NodeTypes.BOOLEAN:
            return this.getBoolean();
        case NodeTypes.STRING:
            return this.token.value;
        default:
            throw new PascalError(this.token, "cannot get constant value of node type " +
                                  this.nodeType);
    }
};

// Return the total parameter size of a function's parameters.
Node.prototype.getTotalParameterSize = function () {
    if (this.nodeType !== NodeTypes.SUBPROGRAM_TYPE) {
        throw new PascalError(this.token, "can't get parameter size of non-subprogram");
    }

    var size = 0;

    for (var i = 0; i < this.parameters.length; i++) {
        var parameter = this.parameters[i];
        size += parameter.byReference ? 1 : parameter.type.getTypeSize();
    }

    return size;
};

// Given a type node (SIMPLE_TYPE, ARRAY_TYPE, etc.), returns the size of that type.
Node.prototype.getTypeSize = function () {
    var size;

    switch (this.nodeType) {
        case NodeTypes.SIMPLE_TYPE:
            // They all have the same size.
            size = 1;
            break;
        /// case Node.ENUM_TYPE:
        case NodeTypes.RECORD_TYPE:
            size = 0;
            for (var i = 0; i < this.fields.length; i++) {
                size += this.fields[i].type.getTypeSize();
            }
            break;
        case NodeTypes.ARRAY_TYPE:
            // Start with size of element type.
            size = this.elementType.getTypeSize();

            // Multiply each range size.
            for (var i = 0; i < this.ranges.length; i++) {
                size *= this.ranges[i].getRangeSize();
            }
            break;
        /// case Node.SET_TYPE:
        default:
            throw new PascalError(this.token, "can't get size of type " + this.print());
    }

    return size;
};

// Useful types.
Node.pointerType = new Node(NodeTypes.SIMPLE_TYPE, null, {typeCode: inst.A});
Node.booleanType = new Node(NodeTypes.SIMPLE_TYPE, null, {typeCode: inst.B});
Node.charType = new Node(NodeTypes.SIMPLE_TYPE, null, {typeCode: inst.C});
Node.integerType = new Node(NodeTypes.SIMPLE_TYPE, null, {typeCode: inst.I});
Node.voidType = new Node(NodeTypes.SIMPLE_TYPE, null, {typeCode: inst.P});
Node.realType = new Node(NodeTypes.SIMPLE_TYPE, null, {typeCode: inst.R});
Node.stringType = new Node(NodeTypes.SIMPLE_TYPE, null, {typeCode: inst.S});

// Fluid method to set the expression type.
Node.prototype.withExpressionType = function (expressionType) {
    this.expressionType = expressionType;
    return this;
};
Node.prototype.withExpressionTypeFrom = function (node) {
    this.expressionType = node.expressionType;
    return this;
};

// Useful methods.
Node.makeIdentifierNode = function (name) {
    return new Node(NodeTypes.IDENTIFIER, new Token(name, TokenTypes.IDENTIFIER));
};
Node.makeNumberNode = function (value) {
    return new Node(NodeTypes.NUMBER, new Token("" + value, TokenTypes.NUMBER));
};
Node.makeBooleanNode = function (value) {
    return new Node(NodeTypes.BOOLEAN, new Token(value ? "True" : "False", TokenTypes.IDENTIFIER));
};
Node.makePointerNode = function (value) {
    // Nil is the only constant pointer.
    if (value !== null) {
        throw new PascalError(null, "nil is the only pointer constant");
    }
    return new Node(NodeTypes.POINTER, new Token("Nil", TokenTypes.IDENTIFIER));
};

// Maps a node type (e.g., Node.PROGRAM) to a string ("program", "procedure", or "function").
Node.nodeLabel = {}; // Filled below.

// Returns printed version of node.
Node.prototype.print = function (indent) {
    var s = "";

    // Allow caller to not set indent.
    indent = indent || "";

    switch (this.nodeType) {
        case NodeTypes.IDENTIFIER:
        case NodeTypes.NUMBER:
        case NodeTypes.BOOLEAN:
        case NodeTypes.POINTER:
            s += this.token.value;
            break;
        case NodeTypes.STRING:
            s += "'" + this.token.value + "'";
            break;
        case NodeTypes.PROGRAM:
        case NodeTypes.PROCEDURE:
        case NodeTypes.FUNCTION:
            // Nest procedures and functions.
            if (this.nodeType !== NodeTypes.PROGRAM) {
                indent += "    ";
                s += "\n";
            }

            s += indent + Node.nodeLabel[this.nodeType] + " " + this.name.token.value;

            // Print parameters and return type.
            s += this.expressionType.print() + ";\n\n";

            // Declarations.
            for (var i = 0; i < this.declarations.length; i++) {
                s += this.declarations[i].print(indent) + ";\n";
            }

            // Main block.
            s += "\n" + this.block.print(indent);

            if (this.nodeType === NodeTypes.PROGRAM) {
                s += ".\n";
            }
            break;
        case NodeTypes.USES:
            s += indent + "uses " + this.name.token.value;
            break;
        case NodeTypes.VAR:
            s += indent + "var " + this.name.print() + " : " + this.type.print();
            break;
        case NodeTypes.RANGE:
            s += this.low.print() + ".." + this.high.print();
            break;
        case NodeTypes.BLOCK:
            s += indent + "begin\n";
            for (var i = 0; i < this.statements.length; i++) {
                s += this.statements[i].print(indent + "    ") + ";\n";
            }
            s += indent + "end";
            break;
        case NodeTypes.PARAMETER:
            s += (this.byReference ? "var " : "") + this.name.print() +
                " : " + this.type.print();
            break;
        case NodeTypes.CAST:
            s += this.type.print() + "(" + this.expression.print() + ")";
            break;
        case NodeTypes.CONST:
            s += indent + "const " + this.name.print();
            if (this.type !== null) {
                s += " { : " + this.type.print() + " }";
            }
            s += " = " + this.value.print();
            break;
        case NodeTypes.ASSIGNMENT:
            s += indent + this.lhs.print() + " := " + this.rhs.print();
            break;
        case NodeTypes.PROCEDURE_CALL:
        case NodeTypes.FUNCTION_CALL:
            if (this.nodeType === NodeTypes.PROCEDURE_CALL) {
                s += indent;
            }
            s += this.name.print();
            var argumentList = [];
            for (var i = 0; i < this.argumentList.length; i++) {
                argumentList.push(this.argumentList[i].print(indent));
            }
            if (argumentList.length > 0) {
                s += "(" + argumentList.join(", ") + ")";
            }
            break;
        case NodeTypes.REPEAT:
            s += indent + "repeat\n";
            s += this.block.print(indent + "    ");
            s += "\n" + indent + "until " + this.expression.print();
            break;
        case NodeTypes.FOR:
            s += indent + "for " + this.variable.print() + " := " +
                this.fromExpr.print() + (this.downto ? " downto " : " to ") +
                this.toExpr.print() +
                " do\n";
            s += this.body.print(indent + "    ");
            break;
        case NodeTypes.IF:
            s += indent + "if " + this.expression.print() + " then\n";
            s += this.thenStatement.print(indent + "    ");
            if (this.elseStatement) {
                s += "\n" + indent + "else\n";
                s += this.elseStatement.print(indent + "    ");
            }
            break;
        case NodeTypes.EXIT:
            s += indent + "Exit";
            break;
        case NodeTypes.FIELD:
            s += indent + this.name.print() + " : " + this.type.print(indent);
            break;
        case NodeTypes.WHILE:
            s += indent + "while " + this.expression.print() + " do\n" +
                this.statement.print(indent + "    ");
            break;
        case NodeTypes.TYPED_CONST:
            s += indent + "const " + this.name.print();
            s += " : " + this.type.print();
            s += " = " + this.rawData.print();
            break;
        case NodeTypes.NOT:
            s += "Not " + this.expression.print();
            break;
        case NodeTypes.NEGATIVE:
            s += "-" + this.expression.print();
            break;
        case NodeTypes.ADDITION:
            s += this.lhs.print() + " + " + this.rhs.print();
            break;
        case NodeTypes.SUBTRACTION:
            s += this.lhs.print() + " - " + this.rhs.print();
            break;
        case NodeTypes.MULTIPLICATION:
            s += "(" + this.lhs.print() + "*" + this.rhs.print() + ")";
            break;
        case NodeTypes.DIVISION:
            s += this.lhs.print() + "/" + this.rhs.print();
            break;
        case NodeTypes.EQUALITY:
            s += this.lhs.print() + " = " + this.rhs.print();
            break;
        case NodeTypes.INEQUALITY:
            s += this.lhs.print() + " <> " + this.rhs.print();
            break;
        case NodeTypes.LESS_THAN:
            s += this.lhs.print() + " < " + this.rhs.print();
            break;
        case NodeTypes.GREATER_THAN:
            s += this.lhs.print() + " > " + this.rhs.print();
            break;
        case NodeTypes.LESS_THAN_OR_EQUAL_TO:
            s += this.lhs.print() + " <= " + this.rhs.print();
            break;
        case NodeTypes.GREATER_THAN_OR_EQUAL_TO:
            s += this.lhs.print() + " >= " + this.rhs.print();
            break;
        case NodeTypes.AND:
            s += this.lhs.print() + " and " + this.rhs.print();
            break;
        case NodeTypes.OR:
            s += this.lhs.print() + " or " + this.rhs.print();
            break;
        case NodeTypes.INTEGER_DIVISION:
            s += this.lhs.print() + " div " + this.rhs.print();
            break;
        case NodeTypes.MOD:
            s += this.lhs.print() + " mod " + this.rhs.print();
            break;
        case NodeTypes.FIELD_DESIGNATOR:
            s += this.variable.print() + "." + this.field.name.print();
            break;
        case NodeTypes.ARRAY:
            var indices = [];
            for (var i = 0; i < this.indices.length; i++) {
                indices.push(this.indices[i].print());
            }
            s += this.variable.print() + "[" + indices.join(",") + "]";
            break;
        case NodeTypes.TYPE:
            s += indent + "type " + this.name.print() + " = " + this.type.print();
            break;
        case NodeTypes.ADDRESS_OF:
            s += "@" + this.variable.print();
            break;
        case NodeTypes.DEREFERENCE:
            s += this.variable.print() + "^";
            break;
        case NodeTypes.SIMPLE_TYPE:
            if (this.typeCode === inst.A) {
                if (this.typeName) {
                    s += "^" + this.typeName.print();
                } else {
                    // Generic pointer.
                    s += "Pointer";
                }
            } else {
                s += inst.typeCodeToName(this.typeCode);
            }
            break;
        case NodeTypes.RECORD_TYPE:
            s += "record\n";
            for (var i = 0; i < this.fields.length; i++) {
                s += this.fields[i].print(indent + "    ") + ";\n";
            }
            s += indent + "end";
            break;
        case NodeTypes.ARRAY_TYPE:
            var ranges = [];
            for (var i = 0; i < this.ranges.length; i++) {
                ranges.push(this.ranges[i].print());
            }
            s += "array[" + ranges.join(",") + "] of " + this.elementType.print();
            break;
        case NodeTypes.SUBPROGRAM_TYPE:
            // Print parameters.
            var parameters = [];
            for (var i = 0; i < this.parameters.length; i++) {
                parameters.push(this.parameters[i].print());
            }
            if (parameters.length > 0) {
                s += "(" + parameters.join("; ") + ")";
            }

            // Functions only: return type.
            if (!this.returnType.isSimpleType(inst.P)) {
                s += " : " + this.returnType.print();
            }
            break;
        default:
            s = "<UNKNOWN>";
            break;
    }

    return s;
};

// Return a node that casts "this" to "type". Returns "this" if it's already
// of type "type". Throws if "this" can't be cast to "type".
Node.prototype.castToType = function (type) {
    // If the destination type is void and we're by reference, then do nothing
    // and allow anything. We're essentially passing into an untyped "var foo"
    // parameter.
    if (type.isVoidType() && this.byReference) {
        return this;
    }

    // Existing type.
    var nodeType = this.expressionType;

    // Must have type defined.
    if (!type) {
        throw new PascalError(this.token, "can't cast to null type");
    }
    if (!nodeType) {
        throw new PascalError(this.token, "can't cast from null type");
    }

    // Must be the same type of node. Can't cast between node types
    // (e.g., array to set).
    if (type.nodeType !== nodeType.nodeType) {
        throw new PascalError(this.token, "can't cast from " + nodeType.nodeType +
                             " to " + type.nodeType);
    }

    // Can cast between some simple types.
    if (type.nodeType === NodeTypes.SIMPLE_TYPE) {
        if (type.typeCode !== nodeType.typeCode) {
            // They're different simple types.
            var typeCode = type.typeCode;         // To Type
            var nodeTypeCode = nodeType.typeCode; // From Type

            if (typeCode === inst.A || nodeTypeCode === inst.A ||
                typeCode === inst.B || nodeTypeCode === inst.B ||
                typeCode === inst.T || nodeTypeCode === inst.T ||
                typeCode === inst.P || nodeTypeCode === inst.P ||
                typeCode === inst.X || nodeTypeCode === inst.X) {

                // These can't be cast.
                throw new PascalError(this.token, "can't cast from " +
                                     inst.typeCodeToName(nodeTypeCode) +
                                     " to " + inst.typeCodeToName(typeCode));
            }

            // Cast Char to String, just return the same node.
            if (typeCode === inst.S && nodeTypeCode === inst.C) {
                return this;
            }

            // Can always cast to a real.
            if (typeCode === inst.R ||
                (typeCode === inst.I && nodeTypeCode !== inst.R)) {

                var node = new Node(NodeTypes.CAST, type.token, {
                    type: type,
                    expression: this
                });
                node.expressionType = type;
                return node;
            }

            // Can't cast.
            throw new PascalError(this.token, "can't cast from " +
                                 inst.typeCodeToName(nodeTypeCode) +
                                 " to " + inst.typeCodeToName(typeCode));
        } else {
            // Same simple typeCode. If they're pointers, then they
            // must be compatible types or the source must be nil.
            if (type.typeCode === inst.A) {
                if (!nodeType.typeName) {
                    // Assigning from Nil, always allowed.
                } else if (!type.typeName) {
                    // Assigning to generic pointer, always allowed.
                } else if (type.typeName.isSameIdentifier(nodeType.typeName)) {
                    // Same pointer type.
                } else {
                    // Incompatible pointers, disallow. XXX test this.
                    throw new PascalError(this.token, "can't cast from pointer to " +
                                          nodeType.print() + " to pointer to " + type.print());
                }
            }
        }
    } else {
        // Complex type. XXX We should verify that they're of the same type.
    }

    // Nothing to cast, return existing node.
    return this;
};

// Fill in this label map.
Node.nodeLabel[NodeTypes.PROGRAM] = "program";
Node.nodeLabel[NodeTypes.PROCEDURE] = "procedure";
Node.nodeLabel[NodeTypes.FUNCTION] = "function";
export enum NodeTypes {

    // Basic types. These don't have additional fields, but their token usually has a value.
    IDENTIFIER = 0,
    NUMBER = 1,
    STRING = 2,
    BOOLEAN = 3,
    POINTER = 4,

    // Program, procedure, or function declaration.
    //     name: name of program, procedure, or function (identifier).
    //     declarations: functions, procedures, var, const, uses, etc.
    //     block: block.
    PROGRAM = 10,
    PROCEDURE = 11,
    FUNCTION = 12,

    // Uses declaration.
    //     name: module name (identifier).
    USES = 13,

    // Var declaration.
    //     name: variable name (identifier).
    //     type: variable type.
    VAR = 14,

    // Range of ordinals.
    //     low: lowest index (number).
    //     high: highest index (number).
    RANGE = 15,

    // Begin/end block.
    //     statements: statements.
    BLOCK = 16,

    // Function and procedure parameter.
    //     name: parameter name (identifier).
    //     type: type.
    //     byReference: whether this parameter is by reference.
    PARAMETER = 17,

    // Cast expression to type.
    //     type: destination type.
    //     expression: source node.
    CAST = 18,

    // Constant declaration.
    //     name: variable name (identifier).
    //     type: type.
    //     value: value.
    CONST = 19,

    // Assignment.
    //     lhs: variable being assigned to.
    //     rhs: expression to assign.
    ASSIGNMENT = 20,

    // Procedure call statement.
    //     name: procedure name.
    //     argumentList: procedure arguments.
    PROCEDURE_CALL = 21,

    // Repeat/until.
    //     block: block.
    //     expression: expression.
    REPEAT = 22,

    // For loop.
    //     variable: variable (identifier).
    //     fromExpr: from expression.
    //     toExpr: to expression.
    //     body: body statement.
    //     downto: whether it's a downto loop (true) or to (false).
    FOR = 23,

    // If.
    //     expression: expression.
    //     thenStatement: then statement.
    //     elseStatement: else statement or null.
    IF = 24,

    // Exit.
    //     No additional fields.
    EXIT = 25,

    // Record field.
    //     name: field name (identifier).
    //     type: type.
    //     offset: integer offset from base of record.
    FIELD = 26,

    // While loop.
    //     expression: expression.
    //     statement: statement to loop.
    WHILE = 27,

    // Typed constant. These are really pre-initialized variables.
    //     name: constant name (identifier).
    //     type: declared type.
    //     rawData: a RawData object.
    TYPED_CONST = 28,

    // Unary operators.
    //     expression: expression to act on.
    NOT = 30,
    NEGATIVE = 31,

    // Binary operators. Children are lhs and rhs.
    ADDITION = 40,
    SUBTRACTION = 41,
    MULTIPLICATION = 42,
    DIVISION = 43,
    EQUALITY = 44,
    INEQUALITY = 45,
    LESS_THAN = 46,
    GREATER_THAN = 47,
    LESS_THAN_OR_EQUAL_TO = 48,
    GREATER_THAN_OR_EQUAL_TO = 49,
    AND = 50,
    OR = 51,
    INTEGER_DIVISION = 52,
    MOD = 53,

    // Field designator (expression.fieldName).
    //     variable: the part before the dot, which evaluates to a record type.
    //     field: designated field (FIELD).
    FIELD_DESIGNATOR = 54,

    // Function call expression.
    //     name: function name (identifier).
    //     argumentList: arguments (expressions).
    FUNCTION_CALL = 60,

    // Array dereference.
    //     variable: expression that evaluates to an array.
    //     indices: expression for each index.
    ARRAY = 61,

    // Type definition.
    //     name: name of new type (identifier).
    //     type: aliased type.
    TYPE = 62,

    // Address-of (@) operator.
    //     variable: variable to take the address of.
    ADDRESS_OF = 63,

    // Dereference of a pointer (^).
    //     variable: variable to dereference.
    DEREFERENCE = 64,

    // Simple type.
    //     typeCode: one of inst.A, inst.B, inst.C, inst.I, inst.R, or inst.S.
    //     typeName: (inst.A only) name of the type being pointed to. This must be a name
    //         and not a type because we can point to ourselves or have
    //         mutually-referring types.
    //     type: (inst.A only) type being pointed to. This can initially be null, but is
    //         filled in once we have enough types to resolve the type name.
    SIMPLE_TYPE = 70,

    // Enumerated type.
    //     entries: each entry (identifier).
    ENUM_TYPE = 71,

    // Record type.
    //     fields: FIELD nodes.
    RECORD_TYPE = 73,

    // Array type.
    //     elementType: element type.
    //     ranges: RANGE nodes.
    ARRAY_TYPE = 74,

    // Set type.
    //     type: type of element (integral SIMPLE_TYPE or ENUM_TYPE).
    //     range: optional RANGE node.
    SET_TYPE = 75,

    // Procedure, function, or program type.
    //     parameters: parameters (Node.PARAMETER).
    //     returnType: return type (SIMPLE_TYPE inst.P if not function).
    SUBPROGRAM_TYPE = 76
}
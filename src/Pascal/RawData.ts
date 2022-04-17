export class RawData {
    length: number;
    data: any[];
    simpleTypeCodes: any[];
    public constructor() {
        this.length = 0;
        this.data = [];
        this.simpleTypeCodes = [];
    }

    // Adds a piece of data and its simple type (inst.I, etc.) to the list.
    public add(datum, simpleTypeCode) {
        this.length++;
        this.data.push(datum);
        this.simpleTypeCodes.push(simpleTypeCode);
    }

    // Adds a SIMPLE_TYPE node.
    public addNode(node) {
        this.add(node.getConstantValue(), node.expressionType.getSimpleTypeCode());
    }

// Print the array for human debugging.
public print() {
        return "(" + this.data.join(", ") + ")";
    }
}

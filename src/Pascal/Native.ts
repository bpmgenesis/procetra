import { NativeProcedure } from "./NativeProcedure";

export class Native {
    private nativeProcedures: NativeProcedure[];
    public constructor() {
        // List of NativeProcedure objects. The index within the array is the
        // number passed to the "CSP" instruction.
        this.nativeProcedures = [];
    }

    // Adds a native method, returning its index.
    public add(nativeProcedure: NativeProcedure) {
        var index = this.nativeProcedures.length;
        this.nativeProcedures.push(nativeProcedure);
        return index;
    }

    // Get a native method by index.
    public get(index: string) {
        return this.nativeProcedures[index];
    }
}

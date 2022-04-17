import {Node} from './Node';
export class NativeProcedure {
    private name: string;
    private returnType: string;
    private parameterTypes: Node[];
    private fn: Function;
    public constructor(name: string, returnType: string, parameterTypes: Node[], fn: Function) {
        this.name = name;
        this.returnType = returnType;
        this.parameterTypes = parameterTypes;
        this.fn = fn;
    }
}
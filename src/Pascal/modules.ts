import { builtin } from "./builtin";
import { crt } from "./crt";
import { graph } from "./graph";
import { mouse } from "./mouse";
import { PascalError } from "./PascalError";

var importModule = function (name, symbolTable) {
    switch (name.toLowerCase()) {
        case "__builtin__":
            builtin.importSymbols(symbolTable);
            break;
        case "crt":
            crt.importSymbols(symbolTable);
            break;
        case "dos":
            // I don't know what goes in here.
            break;
        case "graph":
            graph.importSymbols(symbolTable);
            break;
        case "mouse":
            mouse.importSymbols(symbolTable);
            break;
        case "printer":
            // I don't know what goes in here.
            break;
        default:
            throw new PascalError(null, "unknown module " + name);
    }
}

export const modules = {
    importModule: importModule
}
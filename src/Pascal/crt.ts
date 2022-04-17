import { Node } from './Node';

var importSymbols = function (symbolTable) {
    // Keyboard functions.
    symbolTable.addNativeFunction("KeyPressed", Node.booleanType, [], function (ctl) {
        return ctl.keyPressed();
    });
    symbolTable.addNativeFunction("ReadKey", Node.charType, [], function (ctl) {
        return ctl.readKey();
    });

    // Sound functions.
    symbolTable.addNativeFunction("Sound", Node.voidType, [Node.integerType],
        function (ctl, hz) {
            // Not implemented.
        });
    symbolTable.addNativeFunction("NoSound", Node.voidType, [], function (ctl) {
        // Not implemented.
    });
}

export const crt = {
    importSymbols: importSymbols
}
import { ConfigService } from '../Services/ConfigService';

export class SymbolBroker {
    public static GetSymbolUrl(category: string, subCategory: string, name: string): string {
        return `${ConfigService.GetSymbolBrokerUrl()}/GetSymbol/${category}/${subCategory}/${name}`;
    }
}
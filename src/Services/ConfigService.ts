
export class ConfigService {
    public static GetEbaBrokerUrl(): string {
        return 'https://bpmgenesis.com/broker/eba';
    }
    public static GetEnsembleUrl(): string {
        return 'https://bpmgenesis.com/broker/ensemble';
    }
    public static GetSymbolBrokerUrl(): string {
        //return 'http://apidera.com/symbol';
        return 'https://bpmgenesis.com/broker/symbol';
    }
    public static GetMiningBrokerUrl(): string {
       // return 'https://bpmgenesis.com/broker/mining/v1/';
        return 'http://127.0.0.1:5001/v1/';
    }
}
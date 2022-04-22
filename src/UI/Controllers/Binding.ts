export interface Binding {
    get<T>(): T;
    set<T>(value: T);
}
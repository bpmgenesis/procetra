import { UIController } from '@tuval/forms';
export class Bindable<T> {
    private value:T;
    private controller:UIController;
    public constructor(initValue:T, controller: UIController) {
        this.value = initValue;
        this.controller = controller;
    }
    public get(): T {
        return this.value;
    }
    public set(value:T) {
        this.value = value;
        this.controller.ForceUpdate();
    }
}
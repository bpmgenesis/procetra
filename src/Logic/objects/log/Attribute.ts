export class Attribute {
    private attributes: Attribute[];
    private value: any;
	constructor(value) {
		this.value = value;
		this.attributes = [];
	}
}
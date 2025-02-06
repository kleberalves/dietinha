export interface IBase {
    id: number;
}
export class Base extends HTMLElement {

    constructor() {
        super();
    }

    getProp(prop: string): any | undefined {

        var value = this.getAttribute(prop);
        if (value !== null) {
            if (isNaN(parseFloat(value))) {
                return value;
            } else {
                return parseFloat(value);
            }
        }
    }

}
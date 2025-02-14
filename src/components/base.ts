export interface IBase {
    id: number;
}
export class Base extends HTMLElement {

    constructor() {
        super();
    }

    p(prop: string): any | undefined {

        var value = this.getAttribute(prop);
        if (value !== null) {
            return value;
        }
    }

}
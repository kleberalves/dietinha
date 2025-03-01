export interface IBase {
    id: number;
}
export class Base extends HTMLElement {

    constructor() {
        super();
        //Obtém o innerHTML da tag com os elementos provenientes
        //do pai antes da própria renderização.
        this.childrenHTML = this.innerHTML;
    }
    debug:boolean = false;
    childrenHTML: string;

    p(prop: string): any | undefined {

        var value = this.getAttribute(prop);
        if (value !== null) {
            return value;
        }
    }

    renderChildren() {
        let children = this.querySelector("#children");
        if (children &&
            this.childrenHTML !== undefined &&
            this.childrenHTML !== null)
            children.innerHTML = this.childrenHTML;
    }

}
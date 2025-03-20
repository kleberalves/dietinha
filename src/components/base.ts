interface IBase {
    id: string;
    onChange?: (evt: (e: CustomEventInit) => void) => void;
}
export class Base extends HTMLElement implements IBase {

    constructor() {
        super();
        //Obtém o innerHTML da tag com os elementos provenientes
        //do pai antes da própria renderização.
        this.childrenHTML = this.innerHTML;
    }
    debug: boolean = false;
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
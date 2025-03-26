interface IBase {
    id: string;
    onChange?: (evt: (e: CustomEventInit) => void) => void;
    renderChildren: () => void;
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
    /** get property boolean */
    pb(prop: string): boolean {
        let value = this.p(prop);

        if (value === "true") {
            return true;
        } else {
            return false;
        }
    }

    renderChildren(): HTMLElement | undefined {
        let container = this.querySelector("#container") as HTMLElement;
        if (container &&
            this.childrenHTML !== undefined &&
            this.childrenHTML !== null) {
            container.innerHTML = this.childrenHTML;

            return container;
        }
    }

}
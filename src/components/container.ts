import { html, render } from "uhtml";
import { Base } from "./Base";
import { swapTheme } from "../service/config.service";

class AppContainer extends Base {

    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {

        render(this, html`
            <div>
              <span id="children"></span>
            </div>
        `);

        this.renderChildren();
    }
}

window.customElements.define("app-container", AppContainer);


class AppContainerItem extends Base {

    constructor() {
        super();
    }

    props: any;

    connectedCallback() {

        this.props = {
            text: this.p("text")
        }
        //Se for maior que 800gr, sugere 100g a porção.
        this.render();
    }

    render() {

        render(this, html`<button class="btn-mini" onclick=${() => swapTheme()}>${this.props.text}</button>`);

    }
}

window.customElements.define("app-container-item", AppContainerItem);
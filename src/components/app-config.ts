import { html, render } from "uhtml";
import { Base } from "./base";
import { swapTheme } from "../service/config.service";

class AppConfig extends Base {

    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {

        render(this, html`
         <div class="form">
            <div class="row">
                <h4> Tema do app </h4>
                <button class="btn-mini" onclick=${() => swapTheme()}>Trocar tema</button>
            </div>
        </div>
        `);

    }
}

window.customElements.define("app-config", AppConfig);
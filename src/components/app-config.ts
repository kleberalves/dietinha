import { html, render } from "uhtml";
import { Base } from "./base";
import { screens, stores, swapTheme } from "../service/config.service";
import { store } from "../service/store.service";
import { swapScreen } from "../lib/screens.lib";

class AppConfig extends Base {

    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    limparCache() {
        store.clearAll(stores);
        swapScreen(screens.Login);
    }

    reloadApp() {
        window.location.reload();
    }

    render() {

        render(this, html`
         <div class="form">
            <div class="row">
                <h4> Tema do app </h4>
                <button class="btn-mini" onclick=${() => swapTheme()}>Trocar tema</button>
            </div>

            <div class="row">
                <h4> Limpar cache </h4>
                <button class="btn-mini" onclick=${() => this.limparCache()}>Limpar cache</button>
            </div>

            <div class="row">
                <h4> Limpar cache </h4>
                <button class="btn-mini" onclick=${() => this.reloadApp()}>Forçar reload do app</button>
            </div>
        </div>
        `);

    }
}

window.customElements.define("app-config", AppConfig);
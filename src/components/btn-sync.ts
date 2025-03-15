import { html, render } from "uhtml";
import { Base } from "./base";
import { LOGIN_STORE } from "../service/config.service";
import { store } from "../service/store.service";
import { sync } from "../service/sync.service";

class BtnSync extends Base {

    classLoad: string = "btn-icon";
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    btnSync() {
        this.classLoad = "btn-icon rotate";
        this.render();

        sync().then(() => {
        }).catch((e) => {
            console.log(e);
        }).finally(() => {
            this.classLoad = "btn-icon";
            this.render();
        });
    }


    render() {

        var loginItem: any = store.getSingle(LOGIN_STORE);
        render(this, html`${loginItem !== null ? html`<img src="img/refresh.svg" class=${this.classLoad} @click=${e => this.btnSync()}/>` : null}
        `);

    }
}

window.customElements.define("btn-sync", BtnSync);
import { html, render } from "uhtml";
import { Base } from "./base";
import { stores } from "../service/config.service";
import { store } from "../service/store.service";
import { onSync, onSyncEnd, sync } from "../service/sync.service";
import { getDif } from "../lib/treatments";
import { getLastSync } from "../service/login.service";

class BtnSync extends Base {

    classLoad: string = "btn-icon";
    lastSync: string | undefined;

    constructor() {
        super();
    }

    time: string = "";

    connectedCallback() {

        onSync((e) => {
            this.classLoad = "btn-icon rotate";
            this.time = "Sincroni zando...";
            this.render();
        });
        onSyncEnd((e) => {

            if (e.detail.lastSync) {
                this.lastSync = e.detail.lastSync
            }

            this.time = "";
            this.classLoad = "btn-icon";
            this.render();
        })

        setInterval(() => {
            this.start();
        }, 75000);

        this.start();
    }

    start() {
        this.lastSync = getLastSync();
        this.render();
    }

    btnSync() {
        sync();
    }

    render() {

        if(this.time === ""){
            this.time = this.lastSync ? getDif(this.lastSync) : "";
        }

        var loginItem: any = store.getSingle(stores.Login);
        render(this, html`${loginItem !== null ? html`<img src="img/refresh.svg" title="Sincronizar dados..." class=${this.classLoad} @click=${e => this.btnSync()}/> <span>${this.time}</span>` : null}
        `);

    }
}

window.customElements.define("btn-sync", BtnSync);
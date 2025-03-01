import { Hole, html, render } from "uhtml";
import { Base } from "./Base";
import { store } from "../service/store.service";
import { CARDAPIO_STORE } from "../service/config.service";

class Cardapio extends Base {

    props: {
        idx: number;
        id: number;
    }

    list: CardapioItem[] = [];

    constructor() {
        super();

        store.onAddedItem(CARDAPIO_STORE, (e: CustomEventInit) => {
            this.list = e.detail.items;
            this.render();
        });

        store.onRemovedItem(CARDAPIO_STORE, (e: CustomEventInit) => {
            this.list = e.detail.items;
            this.render();
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} has changed.`);
    }

    connectedCallback() {

        this.props = {
            idx: this.p("idx"),
            id: this.p("id")
        }

        this.list = store.getItems(CARDAPIO_STORE);
        this.render();
    }

    render() {

        let listCA: Hole[] = [];
        let listAJ: Hole[] = [];
        let listLC: Hole[] = [];
        let listSM: Hole[] = [];

        for (var i = 0; i < this.list.length; i++) {

            let h = html`<app-cardapio-item 
                            idx=${i}
                            item=${JSON.stringify(this.list[i])} />`;

            switch (this.list[i].tipo) {
                case "CA":
                    listCA.push(h)
                    break;

                case "AJ":
                    listAJ.push(h)

                    break;
                case "LC":
                    listLC.push(h)

                    break;
                case "SM":
                    listSM.push(h)

                    break;
            }

            //contDelay++;
        }

        render(this, html`
            <style>
                .text-intro {
                    color: var(--destaque-color);
                }
                .total span{
                    color: var(--secondary-color);
                }
                </style>
            <h4>Café da manhã/tarde</h4>
            ${listCA.length === 0 ? html`<span class='text-intro'> Nenhum item adicionado nesta categoria. </span>` : html`<div class="list-space-around">${listCA.map((item, idx) => item)}</div>`}

            <h4>Almoço/jantar</h4>
            ${listAJ.length === 0 ? html`<span class='text-intro'> Nenhum item adicionado nesta categoria. </span>` : html`<div class="list-space-around">${listAJ.map((item, idx) => item)}</div>`}

            <h4>Lanches</h4>
            ${listLC.length === 0 ? html`<span class='text-intro'> Nenhum item adicionado nesta categoria. </span>` : html`<div class="list-space-around">${listLC.map((item, idx) => item)}</div>`}

            <h4>Sobremesas</h4>
            ${listSM.length === 0 ? html`<span class='text-intro'> Nenhum item adicionado nesta categoria. </span>` : html`<div class="list-space-around">${listSM.map((item, idx) => item)}</div>`}

            `);
    }
}

window.customElements.define("app-cardapio", Cardapio);
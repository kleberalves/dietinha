import { Hole, html, render } from "uhtml";
import { Base } from "./Base";
import { store } from "../service/store.service";
import { CARDAPIO_STORE } from "../app";

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
                            id=${this.list[i].id}
                            idx=${i}
                            itens=${JSON.stringify(this.list[i].itens)}
                            nome=${this.list[i].nome}
                            peso=${this.list[i].peso}
                            calorias=${this.list[i].calorias}
                            proteinas=${this.list[i].proteinas} />`;

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
            ${listCA.length === 0 ? html`<span class='text-intro'> Nenhum item adicionado nesta categoria. </span>` : listCA.map((item, idx) => item)}

            <h4>Almoço/jantar</h4>
            ${listAJ.length === 0 ? html`<span class='text-intro'> Nenhum item adicionado nesta categoria. </span>` : listAJ.map((item, idx) => item)}

            <h4>Lanches</h4>
            ${listLC.length === 0 ? html`<span class='text-intro'> Nenhum item adicionado nesta categoria. </span>` : listLC.map((item, idx) => item)}

            <h4>Sobremesas</h4>
            ${listSM.length === 0 ? html`<span class='text-intro'> Nenhum item adicionado nesta categoria. </span>` : listSM.map((item, idx) => item)}

            `);
    }
}

window.customElements.define("app-cardapio", Cardapio);
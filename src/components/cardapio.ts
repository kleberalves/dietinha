import { Hole, html, render } from "uhtml";
import { Base } from "./Base";
import { store } from "../service/store.service";
import { CARDAPIO_STORE } from "../app";
import { showConfirm } from "../service/message.service";

class Cardapio extends Base {

    props: {
        idx: number;
        id: number;
    }

    list: CardapioItem[] = [];

    constructor() {
        super();

        store.onAddedItem(CARDAPIO_STORE, (e: CustomEventInit) => {
            console.log(e);
            this.list = e.detail.items;
            this.render();
        });

        store.onRemovedItem(CARDAPIO_STORE, (e: CustomEventInit) => {
            console.log(e);
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

    removerItemCardapio(id: string) {

        showConfirm("Você tem certeza que deseja remover este item do seu cardário?", () => {
            store.removeItemById(CARDAPIO_STORE, id);
        })
    }

    render() {

        let listCA: Hole[] = [];
        let listAJ: Hole[] = [];
        let listLC: Hole[] = [];
        let listSM: Hole[] = [];

        for (var i = 0; i < this.list.length; i++) {

            let id = this.list[i].id;
            let h = html`
                <div class='listItem cardapio delay'>
                   <div class='title'>${this.list[i].nome}</div>
                        ${this.list[i].itens.map((item, idx) => {
                            var peso = item.peso === undefined ? "100" : item.peso;
                            var unidade = item.unidade === undefined ? "g" : item.unidade;
                            return html`<div class='list mini'>
                                            <div class='item mini'>
                                                    - <span> ${peso}  ${unidade} </span> de ${item.nome}
                                            </div>
                                        </div>` })}
                        
                <div class='total'> Total de <span> ${this.list[i].peso} g</span>, <span>${this.list[i].calorias} calorias </span> e <span> ${this.list[i].proteinas}g de proteínas</span>.</div>
                <div class='actions right'>
                <div class="btn-trash" @click=${() => this.removerItemCardapio(id)}></div>
                </div>
                </div>`;

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
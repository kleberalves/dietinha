import { Hole, html, render } from "uhtml";
import { Base } from "./base";
import { store } from "../service/store.service";
import { stores } from "../service/config.service";
import { searchList } from "../lib/search.lib";

class Cardapio extends Base {

    items: CardapioItem[] = [];
    itemsView: CardapioItem[] = [];
    showSearch: boolean = false;

    constructor() {
        super();

        store.onChanged(stores.Cardapio, (e: CustomEventInit) => {
            if (e.detail.items) {
                this.defineList(e.detail.items);
            } else {
                this.defineList([]);
            }
        });

    }

    defineList(items: CardapioItem[]): void {
        this.items = items;
        this.itemsView = this.items;
        this.render();
    }

    swapSearch(): void {
        this.showSearch = !this.showSearch;
        this.itemsView = this.items;
        this.render();
    }

    connectedCallback() {

        store.onReplacedAll((e: CustomEventInit) => {
            //Atualiza o cardápio quando o storage for atualizado via Sync
            this.getCardapio();
        });

        this.getCardapio();
    }

    getCardapio() {
        this.defineList(store.getItems<CardapioItem>(stores.Cardapio));
    }

    onTxtPesquisaInput(target: HTMLInputElement) {

        if (target.value === "") {
            this.itemsView = this.items;
        } else {
            this.itemsView = searchList<CardapioItem>(this.items, target.value, "nome");
        }

        this.render();
    }


    render() {

        let listCA: Hole[] = [];
        let listAJ: Hole[] = [];
        let listLC: Hole[] = [];
        let listSM: Hole[] = [];

        for (var i = 0; i < this.itemsView.length; i++) {

            let h = html`<app-cardapio-item 
                            idx=${i}
                            item=${JSON.stringify(this.itemsView[i])} />`;

            switch (this.itemsView[i].tipo) {
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

        }



        render(this, html`
                ${this.showSearch ? html`<input type="text" class="textForm" id="txtFiltro" placeholder="Pesquise no seu cardápio." oninput=${(e) => this.onTxtPesquisaInput(e.currentTarget)} />` : null}

            <h4>Café da manhã/tarde</h4>
            ${listCA.length === 0 ? html`<span class='text-intro'> Nenhum item encontrado nesta categoria. </span>` : html`<div class="list-space-around">${listCA.map((item, idx) => item)}</div>`}

            <h4>Almoço/jantar</h4>
            ${listAJ.length === 0 ? html`<span class='text-intro'> Nenhum item encontrado nesta categoria. </span>` : html`<div class="list-space-around">${listAJ.map((item, idx) => item)}</div>`}

            <h4>Lanches</h4>
            ${listLC.length === 0 ? html`<span class='text-intro'> Nenhum item encontrado nesta categoria. </span>` : html`<div class="list-space-around">${listLC.map((item, idx) => item)}</div>`}

            <h4>Sobremesas</h4>
            ${listSM.length === 0 ? html`<span class='text-intro'> Nenhum item encontrado nesta categoria. </span>` : html`<div class="list-space-around">${listSM.map((item, idx) => item)}</div>`}

            `);
    }
}

window.customElements.define("app-cardapio", Cardapio);
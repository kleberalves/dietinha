import { Hole, html, render } from "uhtml";
import { Base } from "./Base";
import { store, STORE_ADDED_ITEM, STORE_STORAGE_LOADED } from "../service/store.service";
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

    render() {

        let listCA: Hole[] = [];
        let listAJ: Hole[] = [];
        let listLC: Hole[] = [];
        let listSM: Hole[] = [];

        for (var i = 0; i < this.list.length; i++) {

            let h = html`<div class='listItem cardapio delay'>
              <div class='title'>${this.list[i].nome}<div> Total de <span> ${this.list[i].peso}</span>g, 
              <span>${this.list[i].calorias} </span> de calorias e <span> ${this.list[i].proteinas}</span> de proteínas</div></div>
            
            ${this.list[i].itens.map((item, idx) => {

                var peso = item.peso === undefined ? "100" : item.peso;
                var unidade = item.unidade === undefined ? "g" : item.unidade;

                return html`<div class='list mini'>
                              <div class='item mini'><span> ${peso}  ${unidade} </span> de ${item.nome}</div>
                            </div>` })}
            
                <div class='actions right'>
                <div class="btn-trash" onclick="removerItemCardapio(cardapio[i].id)"></div>
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
            <h4>Café da manhã/tarde</h4>
            ${listCA.map((item, idx) => item)}

            <h4>Almoço/jantar</h4>
            ${listAJ.map((item, idx) => item)}

            <h4>Lanches</h4>
            ${listLC.map((item, idx) => item)}

            <h4>Sobremesas</h4>
            ${listSM.map((item, idx) => item)}

            `);
    }
}

window.customElements.define("app-cardapio", Cardapio);
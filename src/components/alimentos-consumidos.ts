import { Hole, html, render } from "uhtml";
import { Base } from "./Base";
import { store } from "../service/store.service";
import { ALIMENTACAO_STORE } from "../app";

class AlimentosConsumidos extends Base {

    props: {
        idx: number;
        id: number;
    }

    lista: CardapioItem[] = [];

    constructor() {
        super();


        store.onAddedItem(ALIMENTACAO_STORE, (e: CustomEventInit) => {

            this.lista = e.detail.items;
            this.render();
        });

        store.onRemovedItem(ALIMENTACAO_STORE, (e: CustomEventInit) => {

            if (e.detail.items.length === 0) {
                this.lista = [];
                render(this, html``);
            } else {

                this.lista = [];
                this.render();

                this.lista = e.detail.items;
                this.render();
            }
        });

        store.onCleared(ALIMENTACAO_STORE, (e: CustomEventInit) => {

            this.lista = [];
            render(this, html``);
        });

    }

    connectedCallback() {

        this.props = {
            idx: this.p("idx"),
            id: this.p("id"),
        }

        this.lista = store.getItems<CardapioItem[]>(ALIMENTACAO_STORE);

        if (this.lista.length > 0) {
            this.render();
        }
    }

    render() {
        var totalCalorias = 0;
        var totalProteinas = 0;
        var totalPeso = 0;

        let items: Hole[] = [];

        for (var i = 0; i < this.lista.length; i++) {
            var itemCalculo = this.lista[i];

            items.push(html`
                <div class='listItem cardapio delay'>
                   <div class='title'>${this.lista[i].nome}</div>
                <div class='total'> Total de <span> ${this.lista[i].peso} g</span>, <span>${this.lista[i].calorias} calorias </span> e <span> ${this.lista[i].proteinas}g de proteínas</span>.</div>
                
                <div>${new Date(this.lista[i].created).toLocaleString()}</div>
                </div>`);

            totalCalorias += itemCalculo.calorias;
            totalProteinas += itemCalculo.proteinas;
            totalPeso += itemCalculo.peso;
        }

        render(this, html`
        <style>
            app-alimentos-consumidos {
                width:100%;
            }
        </style>
        <div class='list selecionados'>
            <div class='title'>Alimentos consumidos</div>
                    ${items.map(item => item)}
            <div class='cols total'>
                <div>Calorias <span class='text'> ${totalCalorias} </span></div>
                <div>Proteínas <span class='text'>${totalProteinas} </span></div>
                <div>Peso <span class='text'>${totalPeso} </span></div>
            </div>
            </div>
      `);

    }
}

window.customElements.define("app-alimentos-consumidos", AlimentosConsumidos);
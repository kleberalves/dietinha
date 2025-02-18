import { Hole, html, render } from "uhtml";
import { Base } from "./Base";
import { store } from "../service/store.service";
import { ALIMENTACAO_STORE } from "../service/config.service";
import { closeTab, openTab } from "../lib/tabs";
import { showConfirm } from "../service/message.service";

class AlimentosConsumidos extends Base {

    props: {
        idx: number;
        id: number;
    }

    lista: CardapioItem[] = [];
    itemsShow: Hole[] = [];

    constructor() {
        super();


        store.onAddedItem(ALIMENTACAO_STORE, (e: CustomEventInit) => {

            this.lista = e.detail.items;
            this.render();

            openTab("tabHomeLog");
            closeTab("tabHomeCardapio");

        });

        store.onRemovedItem(ALIMENTACAO_STORE, (e: CustomEventInit) => {

            if (e.detail.items.length === 0) {
                this.lista = [];
                render(this, html``);
            } else {

                //TODO: utilizar o observableAttributes
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
        this.render();
    }

    removerItemCardapio(id: string) {

        showConfirm("Você tem certeza que deseja remover este item do seu registro diário?", () => {
            store.removeItemById(ALIMENTACAO_STORE, id);
            this.render();
        })
    }

    render() {
        var totalCalorias = 0;
        var totalProteinas = 0;
        var totalPeso = 0;

        this.itemsShow = [];

        for (var i = 0; i < this.lista.length; i++) {
            var itemCalculo = this.lista[i];
            let itemIdCalculo = this.lista[i].id;

            this.itemsShow.push(html`
                <div class='listItem cardapio delay'>
                    <div class='title'>${itemCalculo.nome}</div>
                    <div class='total'> Total de <span> ${itemCalculo.peso} g</span>, <span>${itemCalculo.calorias} calorias </span> e <span> ${itemCalculo.proteinas}g de proteínas</span>.</div>
                
                    <div class="data">${new Date(itemCalculo.created).toLocaleTimeString()}</div>

                    <div class='actions right'>
                        <div class="btn-trash" @click=${() => this.removerItemCardapio(itemIdCalculo)}></div>
                    </div>
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

            app-alimentos-consumidos .cardapio .data {
                text-align: right;
                color: var(--destaque-color);
            }
        </style>
        <div class='list selecionados'>
            <!-- <div class='title'>Alimentos consumidos</div> -->
                    ${this.itemsShow.length === 0 ?
                html`<b> Nada aqui ainda. Utilize o seu cardápio para selecionar as refeições que você consumiu no dia.</b>`
                : html`${this.itemsShow.map(item => item)}
                                 <div class='cols total'>
                                    <div>Calorias <span class='text'> ${totalCalorias} </span></div>
                                    <div>Proteínas <span class='text'>${totalProteinas} </span></div>
                                    <div>Peso <span class='text'>${totalPeso} </span></div>
                                </div>`}
       
            </div>
      `);

    }
}

window.customElements.define("app-alimentos-consumidos", AlimentosConsumidos);
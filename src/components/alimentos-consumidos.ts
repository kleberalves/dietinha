import { html, render } from "uhtml";
import { Base } from "./Base";
import { store } from "../service/store.service";
import { ALIMENTACAO_STORE, META_DIARIA_STORE } from "../service/config.service";
import { closeTab, openTab } from "../lib/tabs";
import { agrupaDias } from "../service/registro-refeicoes.service";

class AlimentosConsumidos extends Base {

    props: {
        idx: number;
        id: number;
    }

    itemsShow: RefeicaoDia[] = [];

    constructor() {
        super();

        store.onAddedItem(ALIMENTACAO_STORE, (e: CustomEventInit) => {

            this.itemsShow = [];
            render(this, html``);
            
            this.render(e.detail.items);

            openTab("tabHomeLog");
            closeTab("tabHomeCardapio");

        });

        store.onRemovedItem(ALIMENTACAO_STORE, (e: CustomEventInit) => {

            this.itemsShow = [];
            render(this, html``);

            this.render(e.detail.items);

        });

        store.onCleared(ALIMENTACAO_STORE, (e: CustomEventInit) => {
            this.itemsShow = [];
            render(this, html``);
        });

    }

    connectedCallback() {

        this.props = {
            idx: this.p("idx"),
            id: this.p("id"),
        }

        this.render();
    }

    render(items?: CardapioItem[]) {

        if (items === undefined) {
            items = store.getItems<CardapioItem[]>(ALIMENTACAO_STORE);
        }

        this.itemsShow = agrupaDias(items);

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
                : html` <app-mini-slide total-slides=${this.itemsShow.length}>
                            ${this.itemsShow.map(item => html`<app-alimentos-consumidos-item class="mini-slide-item" refeicao-dia=${JSON.stringify(item)} />`)}
                    </app-mini-slide>`}
       
            </div>
      `);

    }
}

window.customElements.define("app-alimentos-consumidos", AlimentosConsumidos);
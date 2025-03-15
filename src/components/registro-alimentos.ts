import { html, render } from "uhtml";
import { Base } from "./base";
import { store } from "../service/store.service";
import { REGISTRO_REFEICAO_STORE } from "../service/config.service";
import { agrupaDias } from "../service/registro-refeicoes.service";
import { swapScreen } from "../lib/screens.lib";

class RegistroAlimentos extends Base {

    props: {
        idx: number;
        id: number;
    }

    itemsShow: RefeicaoDia[] = [];

    constructor() {
        super();

        store.onAddedItem(REGISTRO_REFEICAO_STORE, (e: CustomEventInit) => {

            this.itemsShow = [];
            render(this, html``);

            this.render(e.detail.items);
            
            //Redireciona apenas    se for o primeiro registro
            if (e.detail.items.length === 1) {
                swapScreen("registro");
            }

        });

        store.onRemovedItem(REGISTRO_REFEICAO_STORE, (e: CustomEventInit) => {

            this.itemsShow = [];
            render(this, html``);

            this.render(e.detail.items);
        });

        store.onCleared(REGISTRO_REFEICAO_STORE, (e: CustomEventInit) => {
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
            items = store.getItems<CardapioItem>(REGISTRO_REFEICAO_STORE);
        }

        this.itemsShow = agrupaDias(items);

        render(this, html`

        <div class='list selecionados'>
            <!-- <div class='title'>Alimentos consumidos</div> -->
                    ${this.itemsShow.length === 0 ?
                html`<b class="text"> Nada aqui ainda. Utilize o seu cardápio para selecionar as refeições que você consumiu no dia.</b>`
                : html` <app-mini-slide total-slides=${this.itemsShow.length} reverso="true">
                            ${this.itemsShow.map(item => html`<app-registro-alimentos-item class="mini-slide-item" refeicao-dia=${JSON.stringify(item)} />`)}
                    </app-mini-slide>`}
       
            </div>
      `);

    }
}

window.customElements.define("app-registro-alimentos", RegistroAlimentos);
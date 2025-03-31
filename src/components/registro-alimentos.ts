import { html, render } from "uhtml";
import { Base } from "./base";
import { store } from "../service/store.service";
import { screens, stores } from "../service/config.service";
import { agrupaDias } from "../service/registro-refeicoes.service";
import { swapScreen } from "../lib/screens.lib";
import { sync } from "../service/sync.service";

class RegistroAlimentos extends Base {

    props: {
        idx: number;
        id: number;
    }

    itemsShow: RefeicaoDia[] = [];
    itemsMeta: RegistroMeta[] = [];

    constructor() {
        super();
    }

    onCleared = (e: CustomEventInit) => {
        if (e.detail.store === stores.RegistroRefeicao) {
            this.itemsShow = [];
            this.itemsMeta = [];
            render(this, html``);
        }
    };

    onAddedItem = (e: CustomEventInit) => {

        if (e.detail.store === stores.RegistroMetas) {

        }

        if (e.detail.store === stores.RegistroRefeicao) {

            this.itemsShow = [];
            render(this, html``);
            this.render(e.detail.items);

            //Redireciona apenas se for o primeiro registro
            let cardapioItems = store.getItems<CardapioItem>(stores.Cardapio);
            if (cardapioItems.length === 1 && e.detail.items.length === 1) {
                swapScreen(screens.Registro);
            }
        }
    };

    onRemovedItem = (e: CustomEventInit) => {
        if (e.detail.store === stores.RegistroRefeicao) {

            this.itemsShow = [];
            render(this, html``);

            this.render(e.detail.items);
        }
    };

    connectedCallback() {

        this.props = {
            idx: this.p("idx"),
            id: this.p("id"),
        }

        store.onCleared(this.onCleared);
        store.onAddedItem(this.onAddedItem);
        store.onRemovedItem(this.onRemovedItem);
        store.onReplacedAll((e: CustomEventInit) => {
            this.itemsShow = [];
            this.itemsMeta = []; 
            render(this, html``);

            //Atualiza o registro quando o storage for atualizado via Sync
            this.render();
        });

        this.render();
    }

    render(items?: CardapioItem[]) {

        if (items === undefined) {
            items = store.getItems<CardapioItem>(stores.RegistroRefeicao);
        }

        if (this.itemsMeta.length === 0) {
            this.itemsMeta = store.getItems<RegistroMeta>(stores.RegistroMetas);
        }

        this.itemsShow = agrupaDias(items, this.itemsMeta);

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
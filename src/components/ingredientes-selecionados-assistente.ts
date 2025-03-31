import { html, render } from "uhtml";
import { Base } from "./base";
import { store } from "../service/store.service";
import { stores } from "../service/config.service";
import { showWarning } from "../lib/message.lib";
import { adicionaPreItems, sendAssistente } from "../service/assistente.service";
import { swapTabs } from "../lib/tabs";

class IngredientesSelecionadosAssistente extends Base implements IIngredientesSelecionadosAssistente {

    listaIngredientes: IngredienteAssistente[] = [];
    listaIngredientesCA: IngredienteAssistente[] = [];
    listaIngredientesAJ: IngredienteAssistente[] = [];
    listaCardapio: CardapioItem[] = [];
    cardapioItemEdit: CardapioItem | null = null;

    constructor() {
        super();
    }

    enviarAssistente() {
        if (this.listaIngredientes && this.listaIngredientes.length < 10) {
            showWarning("Selecione 10 ingredientes no mínimo.")
        } else {
            sendAssistente();
        }
    }

    insereIngredientesSugest() {
        store.clear(stores.IngredienteAssistente);
        this.listaIngredientes = adicionaPreItems();
        this.render();
    }

    onChangedIngredienteAssistente = (e: CustomEventInit) => {
        if (e.detail.store === stores.IngredienteAssistente) {
            this.listaIngredientes = e.detail.items;
            this.render();
        }
    };

    connectedCallback() {

        this.listaIngredientes = store.getItems(stores.IngredienteAssistente);
        store.onChanged(stores.IngredienteAssistente, this.onChangedIngredienteAssistente);

        this.render();
    }

    outputIDs(items: IngredienteAssistente[]) {
        console.log("----");
        items.forEach((i) => {
            console.log(`"${i.idProduto}",`);
        });
    }

    render() {

        if (!this.listaIngredientes) {
            return;
        }

        //Ordenar por categoria crescente
        this.listaIngredientes = this.listaIngredientes.sort((a, b) => {

            if (a.categoria && b.categoria) {
                return a.categoria < b.categoria ? -1 : 1
            }

            return 0
        })

        this.listaIngredientesCA = this.listaIngredientes.filter((item) => {
            return item.tipo === "CA";
        });

        //this.outputIDs(this.listaIngredientesCA);

        this.listaIngredientesAJ = this.listaIngredientes.filter((item) => {
            return item.tipo === "AJ";
        });

        //this.outputIDs(this.listaIngredientesAJ);

        render(this,
            html`<div class='selecionados tab open' id="tab1">
                    <div class="btn-tab-switch" onclick=${() => swapTabs("tab1")}>
                            <div class='title'>Para o café da manhã/tarde (${this.listaIngredientesCA.length})</div>
                            <div class="btn"></div>
                    </div>
                        <div class="list-space-around form">
                            ${this.listaIngredientesCA.map(item => html`<app-ingredientes-selecionados-item mode="simple" class="simple" ingrediente=${JSON.stringify(item)} />`)}
                        </div>
                    </div>
                </div>
                <div class='selecionados tab close' id="tab2">
                        <div class="btn-tab-switch" onclick=${() => swapTabs("tab2")}>
                                <div class='title'>Para o almoço e jantar (${this.listaIngredientesAJ.length})</div>
                                <div class="btn"></div>
                        </div>

                        <div class="list-space-around form">
                            ${this.listaIngredientesAJ.map(item => html`<app-ingredientes-selecionados-item mode="simple" class="simple" ingrediente=${JSON.stringify(item)} />`)}
                        </div>
                    </div>
                </div>`);

    }


}

window.customElements.define("app-ingredientes-selecionados-assistente", IngredientesSelecionadosAssistente);
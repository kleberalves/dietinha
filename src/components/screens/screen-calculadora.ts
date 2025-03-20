import { html, render } from "uhtml";
import { Base } from "../base";
import { screens, stores } from "../../service/config.service";
import { store } from "../../service/store.service";
import { swapScreen } from "../../lib/screens.lib";

class ScreenCalculadora extends Base {

    constructor() {
        super();
    }

    showEditCardapio: boolean = false;

    connectedCallback() {
       
        store.onChanged(stores.Ingrediente, (e: CustomEventInit) => {
            this.render();
        });

        store.onEditStarted((e: CustomEventInit) => {
            
            if (e.detail.store === stores.Cardapio) {
                this.showEditCardapio = true;
                this.render();
            }
        });

        store.onEditFinished((e: CustomEventInit) => {
            this.showEditCardapio = false;
            this.render();
        });

        //Este render precisa estar no final do connected pois é necessário
        //realizar os binds dos eventos antes de renderizar o componente
        this.render();
    }

    btnAdicionarIngredientesCardapio() {
        let element = this.querySelector<IIngredientesSelecionados>("#appIngredientesSelecionados");
        if (element) {
            element.salvarItemCardapio();
        }
    }
    btnLimparIngredientesCardapio() {
        store.editFinish();
        swapScreen(screens.Cardapio);
    }

    render() {

        var ingredientesItems: any[] = store.getItems(stores.Ingrediente);

        render(this, html`
         <div class="form">
                        <div class="full">
                            <app-pesquisa-alimento />
                        </div>
                           ${ingredientesItems.length > 0 ? html`<div class="full">
                                                                        <app-ingredientes-selecionados id="appIngredientesSelecionados" />
                                                                </div>` : null}
                    </div>

                    ${ingredientesItems.length > 0 || this.showEditCardapio === true ? html`<div class="action-bar-bottom"><button class='btn-main' onclick=${e => this.btnAdicionarIngredientesCardapio()}> Salvar no cardápio </button>
                         ${this.showEditCardapio === true ? html`<button class='btn-cancelar' onclick=${e => this.btnLimparIngredientesCardapio()}> Cancelar </button>` : null}
                    </div>` : null}
        `);

    }
}

window.customElements.define("screen-calculadora", ScreenCalculadora);
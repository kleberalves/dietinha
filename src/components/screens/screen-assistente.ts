import { html, render } from "uhtml";
import { Base } from "../base";
import { stores } from "../../service/config.service";
import { store } from "../../service/store.service";

class ScreenAssistente extends Base {

    constructor() {
        super();
    }

    showEditCardapio: boolean = false;
    ingredientesItems: Ingrediente[] | null;

    connectedCallback() {

        console.log("ok assistente");

        /**
            "524cf49c-c675-4808-bf2d-b1976d97e447",
            "20f80da3-3261-4caf-bc98-dc551bfaf78e",
            "0ec99cbe-f70c-4b54-a5f3-b261f91621b0",
            "2a1774c2-c8f6-4015-a0b3-a9a5a16436b1",
            "6e604173-d6b4-47eb-8b44-303dc207df9a",
            "5ee1a661-6090-4be8-80eb-a97e5a451183",
            "10be8214-5bb2-4e56-802d-8e4a26a9858e",
            "a5c3d8ce-35d5-4364-b23c-13c21e797ba2",
            "05084a61-3174-4dcf-bb29-06638c87cdbf"
         */

        store.onChanged(stores.IngredienteAssistente, (e: CustomEventInit) => {
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

    btnEnviarDeepSeek() {
        console.log(this.ingredientesItems);
    }
    btnLimparIngredientes() {
        store.clear(stores.IngredienteAssistente);
    }

    render() {

        this.ingredientesItems = store.getItems<Ingrediente>(stores.IngredienteAssistente);

        render(this, html`

        ${this.ingredientesItems.length === 0 ? html`<div class="wizard-message">
              <h1>Seu assistente moderno está aqui!</h1>
            <p>
                    O aplicativo Dietinha está integrado com a inteligência artificial "DeepSeek", uma concorrente direta do ChatGPT. <br/>
                    Agora podemos contar com a capacidade super inovadora para nos ajudar a montar o seu cardário dentro do seu perfil e objetivo.
                <br/> Escolha de 15 a 20 alimentos que você mais gosta para separarmos em opções nas seguintes categorias:<br/>
                <b>Café da manhã/tarde</b> - <b>Almoço/jantar</b> 
            </p>
        </div>` : null}
                                    
         <div class="form">
                        <div class="full">
                            <app-pesquisa-alimento mode="simple" />
                        </div>
                           ${this.ingredientesItems.length > 0 ? html`<div class="full">
                                                                        <app-ingredientes-selecionados mode="simple" />
                                                                </div>` : null}
                    </div>

                    ${this.ingredientesItems.length > 0 || this.showEditCardapio === true ? html`<div class="action-bar-bottom"><button class='btn-main-lg' onclick=${e => this.btnEnviarDeepSeek()}> Enviar para o seu assistente </button>
                         ${this.showEditCardapio === true ? html`<button class='btn-cancelar' onclick=${e => this.btnLimparIngredientes()}> Limpar </button>` : null}
                    </div>` : null}
        `);

    }
}

window.customElements.define("screen-assistente", ScreenAssistente);
import { html, render } from "uhtml";
import { Base } from "../base";
import { stores } from "../../service/config.service";
import { store } from "../../service/store.service";
import { adicionaPreItems, sendAssistente } from "../../service/assistente.service";
import { showWarning } from "../../lib/message.lib";
import { formatDate } from "../../lib/treatments";

class ScreenAssistente extends Base {

    constructor() {
        super();
    }

    showEditCardapio: boolean = false;
    ingredientesItems: IngredienteAssistente[] | null;
    processamentoItems: ProcessamentoAssistente[] | null;

    connectedCallback() {

        store.onChanged(stores.IngredienteAssistente, (e: CustomEventInit) => {
            this.render();
        });

        store.onReplacedAll((e: CustomEventInit) => {
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
        if (this.ingredientesItems && (this.ingredientesItems.length <= 10 || this.ingredientesItems.length >= 20)) {
            showWarning("Selecione entre 10 a 20 ingredientes.")
        } else {
            sendAssistente();
        }
    }
    btnLimparIngredientes() {
        store.clear(stores.IngredienteAssistente);
    }

    btnSelecionarSugestoes() {
        store.clear(stores.IngredienteAssistente);
        this.ingredientesItems = adicionaPreItems();
        this.render();
    }
    render() {

        this.ingredientesItems = store.getItems<IngredienteAssistente>(stores.IngredienteAssistente);
        this.processamentoItems = store.getItems<ProcessamentoAssistente>(stores.Processamento);

        if (this.processamentoItems.length === 0
            && this.ingredientesItems.length === 0) {
            this.ingredientesItems = adicionaPreItems();
        }

        render(this, html`

       ${this.processamentoItems === null || this.processamentoItems.length === 0 ? html`<wizard-message title="Seu assistente moderno está aqui!">
            O aplicativo <b>Dietinha</b> está integrado com a inteligência artificial <b>"DeepSeek"</b>. Saiba mais <a href="http://www.deepseek.com/" target="_blank">aqui</a>. 
            <br/> Agora podemos contar com a capacidade inovadora para nos ajudar a montar o seu cardário dentro do seu perfil e objetivo.
            <br/> Abaixo sugerimos alguns alimentos mais utilizados no Brasil. 
            <br/> Exclua os que não fazem parte do seu dia a dia e escolha outros que mais gosta, 
            <br/> mantendo de 15 a 20 itens que serão utilizados nestas categorias:
            <br/><b>Café da manhã/tarde</b> - <b>Almoço/jantar</b>.
        </wizard-message>
        ` : null}
                                    
         <div class="form">
                 ${this.processamentoItems.length > 0
                && this.processamentoItems[0].created !== undefined ? html`<div class="full bar-table">
                                <div>Solicitação: ${formatDate(this.processamentoItems[0].created, "dd/mm hh:MM")}</div>
                               ${this.processamentoItems[0].status === "Created"
                        || this.processamentoItems[0].status === "Active" ? html`<div class="progress">Em andamento...</div>` : null}
                               ${this.processamentoItems[0].status === "Finished" ? html`<div class="finished">Concluído.</div>` : null}
                          </div>
                          ` : null}

                ${(this.processamentoItems[0] !== undefined && this.processamentoItems[0].status === "Finished")
                || this.processamentoItems.length === 0 ?
                html`<div class="full">
                            <app-pesquisa-alimento mode="simple" />
                        </div>
                                        ${this.ingredientesItems.length > 0 ?
                        html`<div class="full">
                                     <app-ingredientes-selecionados mode="simple" />
                                </div>` : null}
                        ` : null}
            </div>

                ${this.ingredientesItems.length > 0 &&
                ((this.processamentoItems[0] !== undefined 
                        && this.processamentoItems[0].status === "Finished")
                    || this.processamentoItems.length === 0) ? html`<div class="action-bar-bottom"><button class='btn-main-lg' onclick=${e => this.btnEnviarDeepSeek()}> Enviar para o seu assistente </button>
                        <button class='btn-main' onclick=${e => this.btnSelecionarSugestoes()}> Selecionar sugestões </button>
                        <button class='btn-cancelar' onclick=${e => this.btnLimparIngredientes()}> Limpar </button>
                    </div>` : null}
        `);

    }
}

window.customElements.define("screen-assistente", ScreenAssistente);
import { html, render } from "uhtml";
import { Base } from "../base";
import { screens, stores } from "../../service/config.service";
import { store } from "../../service/store.service";
import { adicionaPreItems, sendAssistente } from "../../service/assistente.service";
import { showConfirm, showWarning } from "../../lib/message.lib";
import { formatDate } from "../../lib/treatments";
import { getLoginInfo } from "../../service/login.service";
import { swapScreen } from "../../lib/screens.lib";

class ScreenAssistente extends Base {

    constructor() {
        super();
    }

    showEditCardapio: boolean = false;
    processamentoItems: ProcessamentoAssistente[] = [];
    ingredientesItems: IngredienteAssistente[] = [];
    checkGuest: boolean = false;

    connectedCallback() {

        store.onChanged(stores.IngredienteAssistente, (e: CustomEventInit) => {
            this.render();
        });

        store.onChanged(stores.Login, (e: CustomEventInit) => {

            if (e.detail.item) {
                if (e.detail.item.email === "guest") {
                    this.checkGuest = true;
                } else {
                    this.checkGuest = false;
                }
            } else {
                this.checkGuest = false;
            }

            this.render();
        });

        store.onReplacedAll((e: CustomEventInit) => {
            this.render();
        });


        let loginInfo: AuthInfo | null = getLoginInfo();

        if (loginInfo === null || (loginInfo !== null && loginInfo.email === "guest")) {
            this.checkGuest = true;
        }

        //Este render precisa estar no final do connected pois é necessário
        //realizar os binds dos eventos antes de renderizar o componente
        this.render();

        //Se mesmo após renderizar, verifica se está vazia e preencher com as sugestões
        if (this.ingredientesItems.length === 0) {
            this.btnSelecionarSugestoes();
        }
        //Para adicionar eventos via DOM, é necessário renderizar antes.
        let box = this.querySelector<IWizardMessage>("#box");
        if (box) {
            box.onOk((e) => {
                swapScreen(screens.Login);
            });
        }
    }

    btnEnviarAssistente() {

        showConfirm("Você realmente deseja enviar para o assistente?", () => {
            let appIngredSelec = this.querySelector<IIngredientesSelecionadosAssistente>("#appIngredSelec");
            if (appIngredSelec) {
                appIngredSelec.enviarAssistente();
            }
        });

    }

    btnLimparIngredientes() {
        store.clear(stores.IngredienteAssistente);
    }

    btnSelecionarSugestoes() {
        let appIngredSelec = this.querySelector<IIngredientesSelecionadosAssistente>("#appIngredSelec");
        if (appIngredSelec) {
            appIngredSelec.insereIngredientesSugest();
        }
    }

    render() {

        this.ingredientesItems = store.getItems<IngredienteAssistente>(stores.IngredienteAssistente);
        this.processamentoItems = store.getItems<ProcessamentoAssistente>(stores.Processamento);

        render(this, html`

        ${this.checkGuest ? html`<wizard-message title="Acesso anônimo" id="box" supress-close="true">
            Para utilizar este módulo é necessário ter uma conta. Clique em "ok" para autenticar ou criar a sua.
        </wizard-message>
        ` : html`
            ${this.processamentoItems === null || this.processamentoItems.length === 0 ? html`<wizard-message title="Seu assistente moderno está aqui!">
                    O aplicativo <b>Dietinha</b> está integrado com a inteligência artificial <b>"DeepSeek"</b>. Saiba mais <a href="http://www.deepseek.com/" target="_blank">aqui</a>. 
                    <br/> Agora podemos contar com a capacidade inovadora para nos ajudar a montar o seu cardário dentro do seu perfil e objetivo.
                    <br/> Abaixo sugerimos alguns alimentos mais utilizados no Brasil. 
                    <br/> Exclua os que não fazem parte do seu dia a dia e escolha outros que mais gosta com o mínimo de 10 itens.
                </wizard-message>
                ` : null}
                                            
                <div class="form">
                        ${this.processamentoItems.length > 0
                    && this.processamentoItems[0].created !== undefined ? html`<div class="full bar-table">
                                        <div class="info"><b>Processamento: </b> ${formatDate(this.processamentoItems[0].created, "dd/mm hh:MM")}</div>
                                    ${this.processamentoItems[0].status === "Created"
                            || this.processamentoItems[0].status === "Active" ? html`<div class="progress">Em andamento...</div>` : null}
                                    ${this.processamentoItems[0].status === "Finished" ? html`<div class="finished">Concluído</div>` : null}
                                    ${this.processamentoItems[0].status === "Fail" ? html`<div class="fail">Falha</div>` : null}
                                </div>
                                ` : null}

                        ${(this.processamentoItems[0] !== undefined && (this.processamentoItems[0].status !== "Active" && this.processamentoItems[0].status !== "Created"))
                    || this.processamentoItems.length === 0 ?
                    html`<div class="full">
                                    <app-pesquisa-alimento mode="simple" />
                                </div>
                                        <div class="full">
                                            <app-ingredientes-selecionados-assistente id="appIngredSelec" />
                                        </div>
                                ` : null}
                    </div>

                    ${(this.processamentoItems[0] !== undefined
                    && (this.processamentoItems[0].status !== "Active" && this.processamentoItems[0].status !== "Created"))
                    || this.processamentoItems.length === 0 ? html`   
                        <div class="action-bar-bottom">
                            ${this.ingredientesItems.length >= 10 ? html`<button class='btn-main-lg' onclick=${e => this.btnEnviarAssistente()}> Enviar para o seu assistente </button>
                                ` : null}

                               ${this.ingredientesItems.length <= 1 ? html` <button class='btn-main' onclick=${e => this.btnSelecionarSugestoes()}> Selecionar sugestões </button> ` : null}
                                <button class='btn-cancelar' onclick=${e => this.btnLimparIngredientes()}> Limpar </button>
                        </div>
                    ` : null}
        `}
            
        `
        );



    }
}

window.customElements.define("screen-assistente", ScreenAssistente);
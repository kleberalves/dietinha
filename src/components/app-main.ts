import { html, render } from "uhtml";
import { Base } from "./base";
import { detectPathScreen, goBack, resizeScreens, swapScreen } from "../lib/screens.lib";
import { store } from "../service/store.service";
import { screens, stores } from "../service/config.service";
import { scrollBodyTop } from "../service/animation.service";
import { removeWindow, showLoading } from "../lib/message.lib";

class AppMain extends Base {

    constructor() {
        super();
    }

    perfilItem: Perfil | null;
    cardapioItems: any[];
    showEditCardapio: boolean = false;

    connectedCallback() {
        showLoading();

        this.render();


        window.addEventListener("resize", () => {
            resizeScreens();
        });

        window.addEventListener("load", () => {
            //app starts 

            removeWindow();
            if (window.location.hash === "") {
                if (this.perfilItem === null) {
                    swapScreen("perfil");
                } else if (this.cardapioItems.length > 0) {
                    swapScreen("cardapio");
                } else {
                    swapScreen("calculadora");
                }
            } else {
                detectPathScreen();
            }


        });

        window.addEventListener("popstate", e => {
            detectPathScreen();
        });

        store.onChanged(stores.Ingrediente, (e: CustomEventInit) => {
            this.render();
        });

        store.onAddedItem(stores.Perfil, (e: CustomEventInit) => {
            this.render();
        });

        //Added significa que a meta foi cadastrada pela primeira vez
        store.onAddedItem(stores.RegistroRefeicao, (e: CustomEventInit) => {
            this.render();
        });

        store.onAddedItem(stores.Cardapio, (e: CustomEventInit) => {
            this.render();

            //Executa esse evento apenas na primeira vez em que um item for
            //adicionado no cardápio
            if (e.detail.items.length === 1) {
                swapScreen("cardapio");

                scrollBodyTop(0);
            }
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

        store.onReplacedAll((e: CustomEventInit) => {
            this.render();
        });

        store.editCheck();

    }

    btnShowSearchCardapio() {
        let element = this.querySelector<ICardapio>("#appCardapio");
        if (element) {
            element.swapSearch();
        }
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

    btnPerfilSaveClick() {
        let element = this.querySelector<IAppPerfil>("#appPerfil");
        if (element) {
            element.save();
        }
    }

    render() {

        this.perfilItem = store.getSingle(stores.Perfil);
        this.cardapioItems = store.getItems(stores.Cardapio);
        var registroRefeicaoItems: any[] = store.getItems(stores.RegistroRefeicao);
        var ingredientesItems: any[] = store.getItems(stores.Ingrediente);

        render(this, html`
   
                <div id="main">
                
                ${(this.perfilItem !== null
                && this.cardapioItems.length >= 1) ? html`
                    <div 
                    class="screen close" 
                    id="cardapio">
                        <div class="screen-header">
                            <div>
                                <btn-sync />
                            </div>
                            <div class="title">Meu cardápio</div>
                            <div> 
                                <img src="img/busca.svg" class="btn-icon" title="Filtrar o cardápio" @click=${e => this.btnShowSearchCardapio()}/>
                            </div>
                        </div>

                            ${this.cardapioItems.length === 1
                        && registroRefeicaoItems.length === 0
                        ? html` <div class="wizard-message">
                                <h1>Último passo</h1>
                                <p>
                                    Após o cadastro da sua refeição, basta informar
                                    quais consumiu utilizando o botão "Consumi este alimento". 
                                    <br/>Faça diariamente para acompanhar e comparar com a sua meta 
                                    diária de calorias e de proteínas.
                                </p>
                            </div>` : null}
                            
                       
                    <div class="form">
                        <div class="full">
                            <app-cardapio id="appCardapio" />
                        </div>
                    </div>
                </div>
                `: null}

                 ${(registroRefeicaoItems.length > 0) ? html`
                <div class="screen close" id="registro">
                        <div class="screen-header">
                            <div>
                                <btn-sync />
                            </div>
                            <div class="title">Minhas refeições</div>
                            <div> 
                            </div>
                        </div>

                   <div class="form">
                        <app-registro-alimentos />
                    </div>
                </div>
                `: null}

           
                    <div 
                        class="screen close"
                        id="calculadora">

                         <div class="title">Calculadora de alimentos</div>

                          ${this.perfilItem !== null
                && ingredientesItems.length === 0
                && this.cardapioItems.length === 0
                ? html` <div class="wizard-message">
                                    <h1>Segundo passo</h1>
                                    <p>
                                        Faça consultas no campo abaixo para descobrir alimentos e compor 
                                        refeições que você mais consome. 
                                        <br/> Você pode separar em 4 categorias:<br/>
                                        <b>Café da manhã/tarde</b> -  <b>Almoço/jantar</b> -  <b>Lanches</b> -  <b>Sobremesas</b>. <br/>                        
                                        Depois do seu Cardápio pronto, basta registrar diariamente quais
                                        itens você consumiu.
                                    </p>
                                </div>` : null}
       

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
                    
                </div>

                <div class="screen close" id="perfil">
                        <div class="screen-header">
                                <div> 
                                    <btn-sync /> 
                                </div>
                                <div class="title">Perfil</div>
                                <div> 
                                <img src="img/login.svg" title="Autenticar" class="btn-icon" @click=${e => swapScreen("login")}/>
                                <img src="img/configuracoes.svg" title="Configurações" class="btn-icon" @click=${e => swapScreen("config")}/>
                                </div>
                            </div>

                        ${this.perfilItem === null
                ? html` <div class="wizard-message">
                            <h1>Primeiro passo</h1>
                            <p>
                                Vamos descobrir a sua meta de consumo de calorias e proteínas por dia. 
                                Insira as informações no formulário abaixo e pressione "<b>Calcular</b>". <br/>
                                Não se preocupe... você poderá atualizar depois.
                            </p>
                        </div>` : null}

                        <app-perfil id="appPerfil" class="form-bar-bottom" />

                        <div class="action-bar-bottom">
                            <button class="btn-main delay11" onclick=${() => this.btnPerfilSaveClick()}>Salvar</button>
                        </div>
                </div>

                <div class="screen close" id="config">
                    <div class="screen-header">
                            <div> 
                                <div class="btn-voltar" onclick=${e => goBack()}>
                                    Voltar
                                </div>
                            </div>
                            <div class="title">Configurações</div>
                            <div> 
                            </div>
                        </div>

                    <app-config />
                </div>

                <div class="screen close" id="login">

                         <div class="screen-header">
                            <div> 
                                <div class="btn-voltar" onclick=${e => goBack()}>
                                    Voltar
                                </div>
                            </div>
                            <div class="title">Login</div>
                            <div>
                                <btn-sync />
                            </div>
                        </div>
                    <app-login />
                </div>

                <div class="screen close" id="notfound">
                    <div class="form">
                        <div class="row">
                            <h4> 404 Seção não encontrada. </h4>
                        </div>
                    </div>
                </div>
            </div>
<!--  https://www.svgrepo.com/collection/solar-outline-icons/10 -->

        <div class="screens-nav">
            <span class="logo-main"> </span>
            <div>
                ${(this.perfilItem !== null && this.cardapioItems.length >= 1) ? html`<div class="btn-screen-switch open" id="cardapioNav" onclick=${e => swapScreen("cardapio")}>
                    <img src="img/cardapio.svg" /> 
                    <div class="btn">Cardápio</div>
                </div>` : null}

                 ${(registroRefeicaoItems.length > 0) ? html`<div class="btn-screen-switch" id="registroNav" onclick=${e => swapScreen("registro")}>
                    <img src="img/registro.svg" /> 
                    <div class="btn">Registro</div>
                </div>` : null}

                 ${this.perfilItem !== null ? html`<div class="btn-screen-switch" id="calculadoraNav" onclick=${e => swapScreen("calculadora")}>
                    <img src="img/calculadora.svg" /> 
                    <div class="btn">Calculadora</div>
                </div>` : null}

                <div class="btn-screen-switch" id="perfilNav" onclick=${e => swapScreen("perfil")}>     
                    <img src="img/perfil.svg" /> 
                    <div class="btn">Perfil</div>
                </div>
            </div>
        </div>
        `);
    }
}

window.customElements.define("app-main", AppMain);